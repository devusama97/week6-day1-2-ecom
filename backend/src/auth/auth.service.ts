import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HashUtil } from '../common/utils/hash.util';
import { UserDocument } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersService.create(registerDto) as UserDocument;
    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints,
        avatar: user.avatar,
        provider: user.provider,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !await HashUtil.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDoc = user as UserDocument;
    
    // Check if user is blocked
    if (userDoc.isBlocked) {
      throw new UnauthorizedException('Your account has been blocked. Please contact support.');
    }
    
    const payload = { email: userDoc.email, sub: userDoc._id.toString(), role: userDoc.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
        loyaltyPoints: userDoc.loyaltyPoints,
        avatar: userDoc.avatar,
        provider: userDoc.provider,
      },
    };
  }

  async oauthLogin(oauthUser: any) {
    let user = await this.usersService.findByEmail(oauthUser.email);
    
    if (!user) {
      // Create new user from OAuth data
      const newUserData = {
        name: oauthUser.name,
        email: oauthUser.email,
        provider: oauthUser.provider,
        providerId: oauthUser.providerId,
        avatar: oauthUser.avatar,
        // No password for OAuth users
      };
      user = await this.usersService.createOAuthUser(newUserData) as UserDocument;
    } else {
      // Update existing user with OAuth data if needed
      const userDoc = user as UserDocument;
      if (!userDoc.providerId || userDoc.provider === 'local') {
        await this.usersService.updateOAuthData(userDoc._id.toString(), {
          provider: oauthUser.provider,
          providerId: oauthUser.providerId,
          avatar: oauthUser.avatar,
        });
        user = await this.usersService.findByEmail(oauthUser.email);
      }
    }

    const userDoc = user as UserDocument;
    
    // Check if user is blocked
    if (userDoc.isBlocked) {
      throw new UnauthorizedException('Your account has been blocked. Please contact support.');
    }
    
    const payload = { email: userDoc.email, sub: userDoc._id.toString(), role: userDoc.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
        loyaltyPoints: userDoc.loyaltyPoints,
        avatar: userDoc.avatar,
        provider: userDoc.provider,
      },
    };
  }
}