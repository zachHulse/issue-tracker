import React from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-location';
import SaveView from './generic/SaveView';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';
import { useProject } from '../hooks/api/useProjects';
import useSession from '../hooks/useSession';

const SprintCreate = () => {
  const params = useParams();
  const { data = {} } = useProject(params.project_id);
  const { session } = useSession();
  const HeaderElement = () => <Typography variant="h2">Create Sprint for {data.name}</Typography>;
  const fields = {
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView
      useItem={(id, enabled) => useSprint(id, params.id, enabled)}
      useSaveItem={() => useSprintSave(params.project_id)}
      disabled={!session.isAdmin}
      {...{ HeaderElement, fields }}
    />
  );
};

export default SprintCreate;
