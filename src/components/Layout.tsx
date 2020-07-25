import * as React from 'react';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface IProps {
  children: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
};
