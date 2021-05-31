import React from 'react';
import { TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { title } from '../../string';

const RegisteredTextField = ({ fieldName, register }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const label = title(name);
  return (
    <TextField fullWidth variant="outlined" {...{ name, onBlur, onChange, inputRef: ref, label }} />
  );
};

RegisteredTextField.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
};

export default RegisteredTextField;
