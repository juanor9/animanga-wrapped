import { unstable_setRequestLocale } from 'next-intl/server';
import TermsContent from './TermsContent';
const TermsAndConditionsPage = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return <TermsContent />;
};
export default TermsAndConditionsPage;
