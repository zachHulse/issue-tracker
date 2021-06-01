import React from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-location';
import SaveView from './generic/SaveView';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';

const SprintCreate = () => {
  const params = useParams();
  const HeaderElement = () => <Typography variant="h2">Create Sprint</Typography>;
  const fields = {
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView
      useItem={(id, enabled) => useSprint(id, params.id, enabled)}
      useSaveItem={() => useSprintSave(params.project_id)}
      {...{ HeaderElement, fields }}
    />
  );
};

export default SprintCreate;
