'use client';

import Link from 'next/link';
import './UserRegistration.scss';

const UserRegistration = () => (
  <section className="user-registration">
    <Link href="/register" className="user-registration__button">
      Create user
    </Link>
  </section>
);

export default UserRegistration;
