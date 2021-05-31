import React from 'react';
import { TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { title } from '../../string';

const RegisteredTextField = ({ fieldName, register, type }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const label = title(name);
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      {...{ name, onBlur, onChange, inputRef: ref, label, type }}
    />
  );
};

RegisteredTextField.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
  type: propTypes.string,
};
RegisteredTextField.defaultProps = {
  type: 'text',
};

export default RegisteredTextField;
