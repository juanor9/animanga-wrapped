/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const Providers = (
  { children }:
    { children: React.ReactNode },
) => <Provider store={store}>{children}</Provider>;

export default Providers;
