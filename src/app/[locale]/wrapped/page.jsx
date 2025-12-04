import { redirect } from 'next/navigation';

import WrappedClient from './WrappedClient';

export const metadata = {
  title: 'Animanga Wrapped 2025',
  description: 'Your year in anime, wrapped up',
};

export default async function WrappedPage() {
  // TODO: Get user from session/auth
  // For now, redirect to login if not authenticated
  // This will be implemented with proper auth integration

  const isAuthenticated = false; // Replace with actual auth check
  const anilistId = null; // Replace with actual user data
  const userName = null; // Replace with actual user data

  if (!isAuthenticated || !anilistId) {
    redirect('/register');
  }

  return <WrappedClient anilistId={anilistId} userName={userName} />;
}
