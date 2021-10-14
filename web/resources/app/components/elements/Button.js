import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { getBorderRadius, getColorTheme } from '../../utils/styledComponent';

const ButtonBase = styled.button`
  display: block;
  padding: 15px;
  border: 0;
  color: white;
  cursor: pointer;

  width: ${props => (props.block ? '100%' : 'auto')};
  font-family: ${props => props.theme.fontPrimary};
  background: ${props => props.color};
  border-radius: ${props => props.borderRadius};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  &:hover {
    opacity: 0.8;
    transition: 300ms;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background: white;
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
`;

const ButtonComponent = props => {
  const { outline, children, ...others } = props;
  const color = getColorTheme(props, props.theme);
  const borderRadius = getBorderRadius(props, props.theme);

  const B = outline ? OutlineButton : ButtonBase;

  return (
    <B color={color} borderRadius={borderRadius} {...others}>
      {children}
    </B>
  );
};

ButtonComponent.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  theme: PropTypes.any,
  outline: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  value: null,
};

export const Button = withTheme(ButtonComponent);
