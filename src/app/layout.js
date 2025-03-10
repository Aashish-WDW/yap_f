import React from 'react';
import "./globals.css";
import Nav from './Nav';

export const metadata = {
  title: "Yapping",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
