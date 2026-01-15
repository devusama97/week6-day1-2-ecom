'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Validate email format
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Simulate API call
            // In a real app: await authService.forgotPassword(email);
            await new Promise(resolve => setTimeout(resolve, 1500));

            setMessage({
                type: 'success',
                text: 'If an account exists with this email, you will receive password reset instructions.'
            });
            // Optional: Clear email on success
            setEmail('');

        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
                <div className="w-full p-6 sm:p-8 md:p-12">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                            Don't worry! It happens. Please enter the email address associated with your account.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {message && (
                                <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded text-sm ${message.type === 'success'
                                        ? 'bg-green-100 border border-green-400 text-green-700'
                                        : 'bg-red-100 border border-red-400 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="johndoe@maildomain.com"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-xs sm:text-sm text-gray-600">Remember your password? </span>
                            <Link href="/auth/login" className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 font-medium">
                                Login Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
