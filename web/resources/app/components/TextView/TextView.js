import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

export const TextView = props => {
  const { title, value, className } = props;
  return (
    <div className={`text-view ${className}`}>
      <span className="label">{title}</span>
      <span className="value">{value === 'null' || !value ? `---` : value}</span>
    </div>
  );
};

TextView.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

TextView.defaultProps = {};
