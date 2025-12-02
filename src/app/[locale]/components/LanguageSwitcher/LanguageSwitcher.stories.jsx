import LanguageSwitcher from './LanguageSwitcher';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const English = {
  args: {
    locale: 'en',
    pathname: '/en/example',
  },
};

export const Spanish = {
  args: {
    locale: 'es',
    pathname: '/es/example',
  },
};
