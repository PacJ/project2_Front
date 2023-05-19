// BaseLayout.js
import Footer from 'components/Common/Footer';
import IndexNavbar from 'components/Common/IndexNavbar';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { pathname } = location;

  return (
    <>
      {pathname.startsWith('/admin') ? (
        <IndexNavbar transparent={isHome} isAdmin={true} />
      ) : (
        <IndexNavbar transparent={isHome} isAdmin={false} />
      )}
      <Outlet />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
