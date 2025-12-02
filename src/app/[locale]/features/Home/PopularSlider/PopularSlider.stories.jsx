import PopularSliderClient from './PopularSliderClient';

const popularAnime = [
  {
    id: 1,
    title: { romaji: 'Demon Slayer' },
    coverImage: { large: 'https://placehold.co/280x400?text=Anime' },
  },
  {
    id: 2,
    title: { romaji: 'Jujutsu Kaisen' },
    coverImage: { large: 'https://placehold.co/280x400?text=Anime+2' },
  },
];

const popularManga = [
  {
    id: 3,
    title: { romaji: 'One Piece' },
    coverImage: { large: 'https://placehold.co/280x400?text=Manga' },
  },
  {
    id: 4,
    title: { romaji: 'Spy x Family' },
    coverImage: { large: 'https://placehold.co/280x400?text=Manga+2' },
  },
];

const meta = {
  title: 'Features/Home/PopularSlider',
  component: PopularSliderClient,
  args: {
    popularAnime,
    popularManga,
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {};

export const AnimeOnly = {
  args: {
    popularAnime,
    popularManga: [],
  },
};
