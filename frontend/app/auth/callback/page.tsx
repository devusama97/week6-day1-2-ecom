'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    const handleCallback = async () => {
      const token = searchParams.get('token');

      if (token) {
        try {
          setProcessed(true);

          // Store token first
          localStorage.setItem('token', token);

          // Fetch user data using the token
          const response = await api.get('/auth/profile');

          // Extract actual user data from wrapped response
          const userData = response.data?.data || response.data || response;

          // Store auth data
          authService.setAuth(token, userData);

          // Refresh AuthContext and wait for it to complete
          await refreshUser();

          // Small delay to ensure state is updated
          await new Promise(resolve => setTimeout(resolve, 100));

          // Navigate to home
          router.push('/');
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          router.push('/auth/login?error=oauth_failed');
        }
      } else {
        router.push('/auth/login?error=oauth_failed');
      }
    };

    handleCallback();
  }, [router, searchParams, processed, refreshUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}