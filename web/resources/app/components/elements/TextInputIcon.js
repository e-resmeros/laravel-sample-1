import styled, { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const IconWrapper = styled.i`
  position: absolute;
  margin-left: -20px;
  margin-top: -5px;
  color: 'yellow';
  font-size: 22px;
`;

const TextInputIconComponent = ({ icon }) =>
  icon ? <IconWrapper style={{ color: '#7a7a7a' }}>{icon}</IconWrapper> : null;

TextInputIconComponent.propTypes = {
  icon: PropTypes.any.isRequired,
};

export const TextInputIcon = withTheme(TextInputIconComponent);
