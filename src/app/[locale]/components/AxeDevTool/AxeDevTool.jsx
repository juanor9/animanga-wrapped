'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './AxeDevTool.scss';

const AxeDevTool = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('@axe-core/react')
        .then((axe) => {
          axe.default(React, ReactDOM, 1000, {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
            },
            rules: [
              { id: 'color-contrast', enabled: true },
              { id: 'heading-order', enabled: true },
              { id: 'image-alt', enabled: true },
              { id: 'label', enabled: true },
              { id: 'link-name', enabled: true },
              { id: 'button-name', enabled: true },
              { id: 'region', enabled: true },
              { id: 'keyboard-access', enabled: true },
              { id: 'focus-visible', enabled: true },
            ],
            resultTypes: ['violations', 'incomplete'],
          });

          // eslint-disable-next-line no-console
          console.log(
            '%c[axe-core] Accessibility testing enabled',
            'color: #4CAF50; font-weight: bold;'
          );
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[axe-core] Failed to load:', error);
        });
    }
  }, []);

  return <span aria-hidden="true" className="axe-devtool__message">Axe DevTool Active</span>;
};

export default AxeDevTool;
