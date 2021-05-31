import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { title } from '../../string';
import useSprints from '../../hooks/api/useSprints';

const SprintSelect = ({ fieldName, register }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const label = title(name);
  const { data = [] } = useSprints();

  return (
    <TextField
      select
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      {...{ name, onBlur, onChange, inputRef: ref, label }}
    >
      {data.map((sprint) => (
        <MenuItem value={sprint.id}>
          {sprint.start} - {sprint.finish}
        </MenuItem>
      ))}
    </TextField>
  );
};

SprintSelect.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
};

export default SprintSelect;
