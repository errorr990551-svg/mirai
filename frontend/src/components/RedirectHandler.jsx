import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRedirectTarget } from '../data/redirects';

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Enforce strict single canonical URL without trailing slashes (except root '/')
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      const cleanPath = location.pathname.replace(/\/+$/, '');
      navigate(cleanPath + location.search + location.hash, { replace: true });
      return;
    }

    // 2. Check for mapped redirects (aliases, legacy paths, category consolidations)
    const target = getRedirectTarget(location.pathname);
    if (target) {
      navigate(target, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
};

export default RedirectHandler;
