'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const AxeDevTool = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000);
      });
    }
  }, []);

  return null;
};

export default AxeDevTool;
