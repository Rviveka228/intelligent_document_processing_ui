import React from 'react';
import PropTypes from 'prop-types';
import * as ExportedIcons from './Icons';
import {AllIcons} from './AllIcons';

const Icons = Object.values(ExportedIcons).reduce((accumulator, item) => {
  accumulator[item.iconType] = item;
  return accumulator;
}, {});

const detectUnknown = (type) => {
  // eslint-disable-next-line no-console
  console.error(`UnknownIconError:${type}`);
};

const UnknownIcon = () => <></>;

export function SVGIcons({type, ...props}) {
  const Icon = Icons[type] ?? detectUnknown(type) ?? UnknownIcon;
  return <Icon {...props} />;
}

SVGIcons.AllIcons = AllIcons;

SVGIcons.propTypes = {
  /**
   * svg icon type
   */
  type: PropTypes.string,
};
