import { NavLink } from 'react-router-dom';
import { profile } from '../data/profile';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/resume', label: 'Resume' },
];

function getNavClass({ isActive }) {
  return `mobile-nav-link${isActive ? ' mobile-nav-link--active' : ''}`;
}

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

export default function MobileHeader({
  isSidebarOpen = false,
  onToggleSidebar = () => {},
}) {
  return (
    <header className="mobile-header">
      <div className="mobile-header__top">
        <div>
          <p className="eyebrow">RESUME_01</p>
          <p className="mobile-header__title">{profile.name}</p>
        </div>
        <div className="mobile-header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-controls="primary-sidebar"
            aria-expanded={isSidebarOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isSidebarOpen ? 'close' : 'menu'}
            </span>
          </button>
          <a className="icon-button" href={resumeHref} download aria-label="Download">
            <span className="material-symbols-outlined">download</span>
          </a>
        </div>
      </div>

      <nav className="mobile-header__nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={getNavClass} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
