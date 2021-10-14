import React from 'react';
import { PropTypes } from 'prop-types';
import { FormLabel } from '../elements/FormLabel';
import { Input } from '../elements/TextInput';
import { TextInputIcon } from '../elements/TextInputIcon';

export const TextInputField = props => {
  const { type, name, label, value, onChange, placeholder, icon, ...rest } = props;

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        defaultValue={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      <TextInputIcon icon={icon} />
    </>
  );
};

TextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  type: PropTypes.oneOf(['text', 'password']),
};

TextInputField.defaultProps = {
  type: 'text',
};
