import { unstable_setRequestLocale } from 'next-intl/server';
import RegisterClient from './RegisterClient';

export default function RegisterPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return <RegisterClient />;
}
