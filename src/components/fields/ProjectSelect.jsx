import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import useProjects from '../../hooks/api/useProjects';

const ProjectSelect = ({ fieldName, register }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const { data = [] } = useProjects();

  return (
    <TextField
      select
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      label="Project"
      {...{ name, onBlur, onChange, inputRef: ref }}
    >
      {data.map((project) => (
        <MenuItem key={project.id} value={project.id}>
          {project.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

ProjectSelect.propTypes = {
  fieldName: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
};

export default ProjectSelect;
