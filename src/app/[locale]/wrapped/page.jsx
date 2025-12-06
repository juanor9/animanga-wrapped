import WrappedClient from './WrappedClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Animanga Wrapped 2025',
  description: 'Your year in anime, wrapped up',
};

export default function WrappedPage() {
  // Authentication and data fetching will be handled client-side in WrappedClient
  // since the auth token is stored in localStorage (client-only)
  return <WrappedClient />;
}
