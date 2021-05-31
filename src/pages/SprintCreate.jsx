import React from 'react';
import { Typography } from '@material-ui/core';
import SaveView from './generic/SaveView';
import ProjectSelect from '../components/fields/ProjectSelect';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';

const SprintCreate = () => {
  const HeaderElement = () => <Typography variant="h2">Create Sprint</Typography>;
  const fields = {
    project_id: {
      component: ProjectSelect,
    },
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView useItem={useSprint} useSaveItem={useSprintSave} {...{ HeaderElement, fields }} />
  );
};

export default SprintCreate;
