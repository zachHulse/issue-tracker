import React from 'react';
import useProjects from '../hooks/api/useProjects';
import ListView from './generic/ListView';

const Projects = () => {
  return (
    <ListView modelName="project" displayKeys={['name', 'description']} useData={useProjects} />
  );
};

export default Projects;
