import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import useSprints from '../../hooks/api/useSprints';

const SprintSelect = ({ fieldName, register, item }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const { data = [], isLoading } = useSprints();

  return isLoading ? (
    <Skeleton variant="text" />
  ) : (
    <TextField
      select
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      label="Sprint"
      defaultValue={item.sprint_id || ''}
      {...{ name, onBlur, onChange, inputRef: ref }}
    >
      {data.map((sprint) => (
        <MenuItem key={sprint.id} value={sprint.id}>
          {sprint.start} - {sprint.finish}
        </MenuItem>
      ))}
    </TextField>
  );
};

SprintSelect.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
  item: propTypes.shape({ id: propTypes.number, sprint_id: propTypes.number }),
};
SprintSelect.defaultProps = { item: {} };

export default SprintSelect;
