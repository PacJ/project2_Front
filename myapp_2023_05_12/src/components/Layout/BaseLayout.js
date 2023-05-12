// BaseLayout.js
import Footer from 'components/Common/Footer';
import IndexNavbar from 'components/Common/IndexNavbar';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <IndexNavbar transparent={isHome}/>
      <Outlet />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
