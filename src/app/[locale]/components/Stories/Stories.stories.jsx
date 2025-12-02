import Stories from './Stories';

const meta = {
  title: 'Components/Stories',
  component: Stories,
  tags: ['autodocs'],
};

export default meta;

const sampleStories = [
  { id: '1', user: 'A', title: 'Story A', description: 'First story' },
  { id: '2', user: 'B', title: 'Story B', description: 'Second story' },
];

export const Default = {
  args: {
    stories: sampleStories,
    loading: false,
  },
};

export const Loading = {
  args: {
    stories: [],
    loading: true,
  },
};
