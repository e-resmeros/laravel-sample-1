import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './styles.scss';

export const Header = ({ title, icon }) => (
  <div className="header-container">
    <Icon type={icon} />
    <span className="title">{title}</span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
