import React from 'react';
import { Typography } from '@material-ui/core';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';

const ProjectCreate = () => {
  const HeaderElement = () => <Typography variant="h2">Create Project</Typography>;

  return <SaveView useItem={useProject} useSaveItem={useProjectSave} {...{ HeaderElement }} />;
};

export default ProjectCreate;
