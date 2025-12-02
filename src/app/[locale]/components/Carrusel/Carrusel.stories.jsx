import Carrusel from './Carrusel';
import './Carrusel.scss';

const meta = {
  title: 'Components/Carrusel',
  component: Carrusel,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  render: () => (
    <Carrusel>
      <div className="carrusel__slide">Slide 1</div>
      <div className="carrusel__slide">Slide 2</div>
      <div className="carrusel__slide">Slide 3</div>
    </Carrusel>
  ),
};
