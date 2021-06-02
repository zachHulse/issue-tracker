import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-location';
import { AddCircle } from '@material-ui/icons';
import useProjects from '../hooks/api/useProjects';
import useSession from '../hooks/useSession';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
  item: {
    height: '25vh',
  },
}));

const Home = () => {
  const { data = [] } = useProjects();
  const classes = useStyles();
  const { session } = useSession();
  return (
    <Container>
      <Typography variant="h2" color="textSecondary" align="center" gutterBottom>
        Issue Tracker
      </Typography>
      <Typography variant="h3" color="textSecondary" align="center" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={5}>
        {data.map((project) => (
          <Grid item lg key={project.id}>
            <Card raised>
              <Link to={`/projects/${project.id}`} className={classes.link}>
                <CardActionArea>
                  <CardContent className={classes.item}>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                      {project.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        {session.isAdmin && (
          <Link to="/projects/create" className={classes.link}>
            <Button variant="contained" color="default" startIcon={<AddCircle />} fullWidth>
              Create Project
            </Button>
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default Home;
