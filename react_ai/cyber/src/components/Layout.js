import React from 'react';
import Header from './header';
// import Section from './section';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Section /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

