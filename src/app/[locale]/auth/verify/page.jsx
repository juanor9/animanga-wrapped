'use client';

import { useEffect, useState } from 'use';
import { useSearchParams, useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

export default function VerifyMagicLink() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setError('No verification token provided');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/magic-link/verify?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        // Store tokens
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        setStatus('success');

        // Redirect to user page after 2 seconds
        setTimeout(() => {
          router.push(`/user/${data.user.anilistUsername}`);
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {status === 'verifying' && (
        <>
          <div
            className="spinner"
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #e43543',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px',
            }}
          />
          <h1>Verifying your magic link...</h1>
          <p>Please wait while we log you in.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
          <h1>Login Successful!</h1>
          <p>Redirecting you to your profile...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>❌</div>
          <h1>Verification Failed</h1>
          <p style={{ color: '#e43543', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => router.push('/login')}
            style={{
              background: '#e43543',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Back to Login
          </button>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
