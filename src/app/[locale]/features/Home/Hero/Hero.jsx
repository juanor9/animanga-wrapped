import { useTranslations } from 'next-intl';
import LoginSignup from '../../user/components/LoginSignup/LoginSignup';
import './Hero.scss';

const Hero = () => {
  const t = useTranslations('home');

  return (
    <section className="hero">
      <div className="hero__copy">
        <h1 className="hero__title">{t('title')}</h1>
        <p className="hero__subtitle">{t('subtitle')}</p>
      </div>
      <div className="hero__forms">
        <LoginSignup />
      </div>
      <div className="hero__year" aria-hidden="true">
        2025
      </div>
    </section>
  );
};

export default Hero;
