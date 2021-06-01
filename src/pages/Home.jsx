import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-location';
import useProjects from '../hooks/api/useProjects';

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
          <Grid item lg>
            <Card raised>
              <Link to={`projects/${project.id}/update`} className={classes.link}>
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
    </Container>
  );
};

export default Home;
