'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../../../../components/Spinner/Spinner';
import './UserRegistration.scss';

const UserRegistration = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push('/register');
  };

  return (
    <section className="user-registration">
      <button
        type="button"
        onClick={handleClick}
        className="user-registration__button"
        disabled={isLoading}
      >
        {isLoading ? <Spinner className="user-registration__spinner" /> : 'Create user'}
      </button>
    </section>
  );
};

export default UserRegistration;
