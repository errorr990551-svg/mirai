import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRedirectTarget } from '../data/redirects';

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = getRedirectTarget(location.pathname);
    if (target) {
      navigate(target, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectHandler;
