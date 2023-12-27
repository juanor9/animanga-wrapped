import './app.scss';
import Hero from './features/Home/Hero/Hero';
import PopularSlider from './features/Home/PopularSlider/PopularSlider';

const Home = () => (
  <main className="home">
    <Hero className="home__hero" />
    <PopularSlider />
  </main>
);

export default Home;
