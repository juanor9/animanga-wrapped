import './Hero.scss';
import LoginSignup from '../../user/components/LoginSignup/LoginSignup';

const Hero = () => (
  <section className="hero">
    <article className="hero__copy">
      <h1 className="hero__header">Your Anime and Manga Year Wrapped</h1>
      <p>
        Get relevant statiscics on your watched anime or read manga.
        Share with everyone what is important for you
      </p>
    </article>
    <article className="hero__forms">
      <LoginSignup />
    </article>
  </section>
);

export default Hero;
