import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
const animation = (width) => keyframes`
    0%{
          transform: translate(-${width}px);
      }
      50%{
          transform: translate(0);
      }
      100%{
          transform: translate(${width}px);
      }
`;
const commonStyle = {
  margin: 'auto',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const Container = styled.div`
  width: ${(props) =>
    props.size === 'small' ? 60 : props.size === 'large' ? 150 : 20}px;
  height: 3px;
  overflow: hidden;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  background: #fff;
  overflow: hidden;
`;
const ItemSpan = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: ${(props) => props.color || '#fe6c4c'};
  animation: ${(props) =>
      animation(
        props.size === 'small' ? 60 : props.size === 'large' ? 100 : 80
      )}
    ${(props) => props.speed || 2}s linear infinite;
`;

export const SuspenseLoader = ({speed, color, style, size}) => {
  return (
    <Container style={style} color={color} size={size}>
      <ItemSpan speed={speed} style={style} color={color} size={size} />
    </Container>
  );
};

SuspenseLoader.propTypes = {
  /**
   * The speed of the spinner
   */
  speed: PropTypes.number,
  /**
   * The color of the spinner
   */
  color: PropTypes.string,
  /**
   * additional style property
   */
  style: PropTypes.any,
  /**
   * Size of the spinner
   */
  size: PropTypes.string,
};

SuspenseLoader.defaultProps = {
  style: commonStyle,
  size: 'default',
};
