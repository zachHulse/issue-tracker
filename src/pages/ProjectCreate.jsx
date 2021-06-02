import React from 'react';
import { Typography } from '@material-ui/core';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import useSession from '../hooks/useSession';

const ProjectCreate = () => {
  const HeaderElement = () => <Typography variant="h2">Create Project</Typography>;
  const fields = {
    name: {},
    description: {},
    abbreviation: {},
  };
  const { session } = useSession();

  return (
    <SaveView
      useItem={useProject}
      useSaveItem={useProjectSave}
      disabled={!session.isAdmin}
      {...{ HeaderElement, fields }}
    />
  );
};

export default ProjectCreate;
