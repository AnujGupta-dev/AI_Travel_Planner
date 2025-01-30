import React from 'react';
import { Outlet } from 'react-router';
import Header from '../custom/Header'

const Layout = () => {
  return (
    <>
        <div>
            <Header/>
            <Outlet />
        </div>
    </>
  );
};

export default Layout;
