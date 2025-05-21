import PropTypes from "prop-types";
const SubHeading = ({ children, className }) => {
  return (
    <div
      className={`yleading-tight text-xs uppercase tracking-normal md:text-sm lg:text-sub-heading ${className}`}
    >
      {children}
    </div>
  );
};
SubHeading.propTypes = {
  children: PropTypes.node.isRequired, // Accepts strings, elements, or any renderable content
  className: PropTypes.string,
};
export default SubHeading;
