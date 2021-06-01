import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';

const SprintSelect = ({ fieldName, register, item }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;

  return (
    <TextField
      select
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      label="Story Points"
      defaultValue={item.story_points || 1}
      {...{ name, onBlur, onChange, inputRef: ref }}
    >
      {[...Array(5).keys()].map((num) => (
        <MenuItem key={num} value={num + 1}>
          {num + 1}
        </MenuItem>
      ))}
    </TextField>
  );
};

SprintSelect.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
  item: propTypes.shape({ story_points: propTypes.number }),
};
SprintSelect.defaultProps = { item: {} };

export default SprintSelect;
