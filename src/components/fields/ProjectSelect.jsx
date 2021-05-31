import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import useProjects from '../../hooks/api/useProjects';

const ProjectSelect = ({ fieldName, register, item }) => {
  const inputProps = register(fieldName);
  const { name, onBlur, onChange, ref } = inputProps;
  const { data = [], isLoading } = useProjects();

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
      label="Project"
      defaultValue={item.project_id}
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
  item: propTypes.shape({ id: propTypes.number, project_id: propTypes.number }),
};
ProjectSelect.defaultProps = {
  item: {},
};

export default ProjectSelect;
