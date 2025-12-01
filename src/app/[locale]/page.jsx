import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from './features/Home/Hero/Hero';
import PopularSlider from './features/Home/PopularSlider/PopularSlider';
import '../app.scss';

const Home = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return (
    <main className="home">
      <Hero className="home__hero" />
      <PopularSlider />
    </main>
  );
};

export default Home;
