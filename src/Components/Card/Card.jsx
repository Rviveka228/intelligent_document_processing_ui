import React from 'react';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { CardCover } from './CardCover';
import { CardFooter } from './CardFooter';
import PropTypes from 'prop-types';

import cn from './Card.module.scss';

export function Card(props) {
  return (
    <section className={`${cn.card} ${props.className}`}>
      {props.children}
    </section>
  );
}
Card.Body = CardBody;
Card.Header = CardHeader;
Card.Cover = CardCover;
Card.Footer = CardFooter;

Card.propTypes = {
  /**
   * children
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  /**
   * onClick
   */
  onClick: PropTypes.func,
  /**
   * className
   */
  className: PropTypes.string,
};

Card.defaultProps = {};
