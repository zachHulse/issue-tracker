import React from 'react';
import { Typography } from '@material-ui/core';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import ProjectSelect from '../components/fields/ProjectSelect';

const SprintCreate = () => {
  const HeaderElement = () => <Typography variant="h2">Create Sprint</Typography>;
  const fields = {
    project: {
      component: ProjectSelect,
    },
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView useItem={useProject} useSaveItem={useProjectSave} {...{ HeaderElement, fields }} />
  );
};

export default SprintCreate;
