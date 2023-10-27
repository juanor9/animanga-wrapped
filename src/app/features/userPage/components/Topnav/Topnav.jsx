'use client';

import { useState } from 'react';

const Topnav = () => {
  const [tabValue, setTabValue] = useState('lists');
  console.log('🚀 ~ file: Topnav.jsx:7 ~ Topnav ~ tabValue:', tabValue);
  return (
    <nav className="user__topnav">
      <ul>
        <li>
          <button
            type="button"
            className="user__top-button"
            onClick={() => setTabValue('lists')}
          >Lists
          </button>
        </li>
        <li>
          <button
            type="button"
            className="user__top-button"
            onClick={() => setTabValue('stats')}
          >Stats
          </button>
        </li>
        <li>
          <button
            type="button"
            className="user__top-button"
            onClick={() => setTabValue('settings')}
          >Settings
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Topnav;
