import { NavLink } from 'react-router-dom';
import { profile } from '../data/profile';

const navItems = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/resume', label: 'Resume', icon: 'description' },
];

function getNavClass({ isActive }) {
  return `nav-link${isActive ? ' nav-link--active' : ''}`;
}

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

function AvatarMark() {
  return (
    <svg viewBox="0 0 64 64" className="avatar-mark" aria-hidden="true">
      <circle cx="32" cy="24" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M18 54c2-11 10-18 14-18s12 7 14 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 28h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Sidebar({
  isCollapsed = false,
  isMobile = false,
  isMobileOpen = false,
  onToggle,
  onNavigate,
}) {
  const sidebarStateClass = isMobile
    ? `sidebar--mobile${isMobileOpen ? ' sidebar--mobile-open' : ' sidebar--mobile-closed'}`
    : isCollapsed
      ? 'sidebar--collapsed'
      : 'sidebar--expanded';

  const toggleLabel = isMobile
    ? isMobileOpen
      ? 'Close sidebar'
      : 'Open sidebar'
    : isCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar';

  const toggleIcon = isMobile ? 'close' : isCollapsed ? 'chevron_right' : 'chevron_left';

  return (
    <aside
      id="primary-sidebar"
      className={`sidebar ${sidebarStateClass}`.trim()}
      aria-hidden={isMobile && !isMobileOpen}
      inert={isMobile && !isMobileOpen ? '' : undefined}
    >
      <div className="sidebar__header">
        <button
          type="button"
          className="icon-button sidebar__toggle"
          onClick={onToggle}
          aria-label={toggleLabel}
          aria-controls="primary-sidebar"
          aria-expanded={isMobile ? isMobileOpen : !isCollapsed}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {toggleIcon}
          </span>
        </button>
        <div className="sidebar__profile-card">
          <div className="sidebar__profile-figure">
            <AvatarMark />
          </div>
          <div className="sidebar__profile-copy">
            <p className="sidebar__profile-name">{profile.name}</p>
            <p className="sidebar__profile-meta">{profile.contact.location}</p>
          </div>
        </div>

        <a
          className="cta cta--sidebar"
          href={resumeHref}
          download
          aria-label="Download"
          onClick={onNavigate}
        >
          <span className="material-symbols-outlined">download</span>
          <span className="sidebar__cta-label">DOWNLOAD</span>
        </a>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={getNavClass}
            end={item.to === '/'}
            aria-label={item.label}
            onClick={onNavigate}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {item.icon}
            </span>
            <span className="sidebar__nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <a href={resumeHref} download aria-label="Resume" onClick={onNavigate}>
          <span className="material-symbols-outlined" aria-hidden="true">
            download
          </span>
          <span className="sidebar__footer-label">Resume</span>
        </a>
      </div>
    </aside>
  );
}
