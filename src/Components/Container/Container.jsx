import React, { Component } from 'react';
import PropType from 'prop-types';
import cn from './Container.module.scss';
export default class Container extends Component {
  setStyle = () => (this.props.fluid ? cn.containerFluid : cn.container);
  render() {
    return <div className={this.setStyle()}>{this.props.children}</div>;
  }
}
Container.propTypes = {
  children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node,PropType.any]),
  fluid: PropType.bool,
};
Container.defaultValue = {
  children: null,
};
