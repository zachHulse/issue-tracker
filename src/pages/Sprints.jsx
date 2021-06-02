import React from 'react';
import * as propTypes from 'prop-types';
import { useParams } from 'react-location';
import useSprints from '../hooks/api/useSprints';
import ListView from './generic/ListView';
import { useProject } from '../hooks/api/useProjects';
import StyledTableCell from '../components/StyledTableCell';
import Project from '../types/project';
import useSession from '../hooks/useSession';

const ProjectCell = ({ item }) => {
  const { data = {} } = useProject(item.project_id);
  return <StyledTableCell>{data.name}</StyledTableCell>;
};

const Sprints = () => {
  const params = useParams();
  const { session } = useSession();
  return (
    <ListView
      canAdd={session.isAdmin}
      modelName="sprint"
      displayKeys={['project', 'start', 'finish']}
      formattedCells={{ project: ProjectCell }}
      useData={() => useSprints(params.project_id)}
    />
  );
};

ProjectCell.propTypes = {
  item: propTypes.shape(Project).isRequired,
};

export default Sprints;
