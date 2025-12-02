import { unstable_setRequestLocale } from 'next-intl/server';
import PrivacyPolicyContent from './PrivacyPolicyContent';

const PrivacyPolicyPage = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return <PrivacyPolicyContent />;
};
export default PrivacyPolicyPage;
