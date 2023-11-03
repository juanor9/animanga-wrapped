'use client';

const Topnav = ({ update }) => (
  <nav className="user__topnav">
    <ul>
      <li>
        <button
          type="button"
          className="user__top-button"
          onClick={() => update('lists')}
        >Lists
        </button>
      </li>
      <li>
        <button
          type="button"
          className="user__top-button"
          onClick={() => update('stats')}
        >Stats
        </button>
      </li>
    </ul>
  </nav>
);
export default Topnav;
