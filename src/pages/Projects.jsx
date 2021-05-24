import React from 'react';

import { Container, List, ListItem, Typography } from '@material-ui/core';
import useProjects from '../hooks/api/useProjects';

const Projects = () => {
  const { data = [], isLoading } = useProjects();
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Projects
      </Typography>
      <List>
        {data.map((project) => (
          <ListItem button>{project.name}</ListItem>
        ))}
      </List>
      {isLoading && <Typography variant="overline">Loading . . .</Typography>}
    </Container>
  );
};

export default Projects;
