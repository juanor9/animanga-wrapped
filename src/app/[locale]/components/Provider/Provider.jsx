'use client';

import { Provider } from 'react-redux';
import { store } from '../../../../redux/store.ts';
import './Provider.scss';

const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    <div className="provider-wrapper">{children}</div>
  </Provider>
);

export default ReduxProvider;
