import React from 'react';
import PropTypes from 'prop-types';
const Paragraph = ({ children, className }) => {
  return (
    <div
      className={`mt-2 text-justify font-poppins text-[1.2rem] leading-[1.87rem] tracking-normal ${className}`}
    >
      {children}
    </div>
  );
};
Paragraph.propTypes = {
  children: PropTypes.node.isRequired, // Accepts strings, elements, or any renderable content
  className: PropTypes.string,
};
export default Paragraph;
