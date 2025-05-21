import React from 'react';
import PropTypes from 'prop-types';
const Heading = ({ children, className }) => {
  return (
    <div
      className={`text-3xl uppercase leading-tight tracking-normal sm:text-4xl lg:text-heading ${className}`}
    >
      {children}
    </div>
  );
};
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
export default Heading;
