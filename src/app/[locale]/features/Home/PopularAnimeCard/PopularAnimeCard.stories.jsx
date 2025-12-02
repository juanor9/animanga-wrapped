import PopularAnimeCard from './PopularAnimeCard';

const sampleItem = {
  id: 1,
  title: { romaji: 'Fullmetal Alchemist: Brotherhood' },
  coverImage: { large: 'https://placehold.co/300x420' },
};

const meta = {
  title: 'Features/Home/PopularAnimeCard',
  component: PopularAnimeCard,
  args: {
    item: sampleItem,
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {};

export const LongTitle = {
  args: {
    item: {
      ...sampleItem,
      title: { romaji: 'A Very Long Anime Title That Should Truncate For Display Purposes' },
    },
  },
};
