import ReduxProvider from './Provider';

const meta = {
  title: 'Components/Provider',
  component: ReduxProvider,
  tags: ['autodocs'],
};

export default meta;

export const WithContent = {
  args: {
    children: <div>Content inside the Redux provider</div>,
  },
  render: ({ children }) => <ReduxProvider>{children}</ReduxProvider>,
};
