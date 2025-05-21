import React from 'react';
import Heading from './Heading';
import headingBackground from '../assets/images/header-image2.jpg';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <div>
      <div
        className="relative flex h-[60dvh] w-full items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${headingBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <Heading className="mb-12 font-poppins  font-bold text-white">
            {children}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.prototypes = {
  children: PropTypes.node.isRequired, // Accepts strings, elements, or any renderable content
};
