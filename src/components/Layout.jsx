import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

const MOBILE_BREAKPOINT = 720;
const TABLET_COLLAPSE_BREAKPOINT = 1024;
const STORAGE_KEY = 'portfolio-sidebar-state';

function readInitialSidebarState() {
  if (typeof window === 'undefined') {
    return 'expanded';
  }

  try {
    const storedState = window.localStorage.getItem(STORAGE_KEY);
    if (storedState === 'collapsed' || storedState === 'expanded') {
      return storedState;
    }
  } catch {
    // Ignore storage access failures and fall back to viewport-based defaults.
  }

  return window.innerWidth < TABLET_COLLAPSE_BREAKPOINT ? 'collapsed' : 'expanded';
}

export default function Layout() {
  const location = useLocation();
  const [sidebarState, setSidebarState] = useState(readInitialSidebarState);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth <= MOBILE_BREAKPOINT;
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (!isMobile || !isMobileSidebarOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, isMobileSidebarOpen]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, sidebarState);
    } catch {
      // Ignore persistence failures.
    }
  }, [sidebarState]);

  useEffect(() => {
    document.body.style.overflow = isMobile && isMobileSidebarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMobileSidebarOpen]);

  const isSidebarCollapsed = !isMobile && sidebarState === 'collapsed';
  const shellState = isMobile
    ? isMobileSidebarOpen
      ? 'mobile-open'
      : 'mobile-closed'
    : sidebarState;

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen((current) => !current);
      return;
    }

    setSidebarState((current) => (current === 'expanded' ? 'collapsed' : 'expanded'));
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="app-shell" data-sidebar-state={shellState}>
      {isMobile && isMobileSidebarOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-label="Close sidebar"
          tabIndex={-1}
        />
      ) : null}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={toggleSidebar}
        onNavigate={closeSidebar}
      />
      <MobileHeader
        isSidebarOpen={isMobileSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <main
        className="app-main"
        aria-hidden={isMobile && isMobileSidebarOpen}
        inert={isMobile && isMobileSidebarOpen ? '' : undefined}
      >
        <div className="app-main__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
