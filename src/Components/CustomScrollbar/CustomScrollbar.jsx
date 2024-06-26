import React from 'react';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';
import 'simplebar/dist/simplebar.min.css';
import './index.scss';
const CustomScrollbar = (props) => {
  return (
    <div className='simplebar-block'>
      <SimpleBar {...props}>{props.children}</SimpleBar>
    </div>
  );
};
CustomScrollbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  ]),
};
export default CustomScrollbar;
