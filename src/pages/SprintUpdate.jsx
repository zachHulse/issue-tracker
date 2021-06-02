import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useParams } from 'react-location';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';
import SaveView from './generic/SaveView';
import Sprint from '../types/sprint';
import { useProject } from '../hooks/api/useProjects';
import { isoToStandardDate } from '../string';
import useSession from '../hooks/useSession';

const SprintUpdate = () => {
  const params = useParams();
  const { data = {} } = useProject(params.project_id);
  const { session } = useSession();

  const HeaderElement = ({ item }) => (
    <Typography variant="h2">
      Sprint {isoToStandardDate(item?.start)} - {isoToStandardDate(item?.finish)} for {data.name}
    </Typography>
  );

  HeaderElement.propTypes = {
    item: propTypes.shape(Sprint).isRequired,
  };
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

export default SprintUpdate;
