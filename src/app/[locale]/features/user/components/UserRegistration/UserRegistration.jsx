'use client';

import Link from 'next/link';
import './UserRegistration.scss';

const UserRegistration = () => (
  <section className="user-registration">
    <Link href="/register">
      <button type="submit" className="user-registration__button">
        Create user
      </button>
    </Link>
  </section>
);

export default UserRegistration;
