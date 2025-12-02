import AuthButtons from './AuthButtons';

const meta = {
  title: 'Home/AuthButtons',
  component: AuthButtons,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    ALClientId: 'demo-AL-client',
    MALClientId: 'demo-MAL-client',
    MALCodeChallenge: 'demo-challenge',
  },
};
