import React from 'react';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import * as propTypes from 'prop-types';
import { useParams } from 'react-location';
import ItemSave from '../../components/ItemSave';

const SaveView = ({ useItem, fields, HeaderElement, useSaveItem }) => {
  const params = useParams();
  const { data: item, isLoading } = useItem(params.id, Boolean(params.id));

  const Placeholder = () => (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {Object.keys(fields).map((fieldName) => (
                <Grid item xs={12} key={fieldName}>
                  <Skeleton variant="text" />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rect" height={75} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return isLoading && Boolean(params.id) ? (
    <Placeholder />
  ) : (
    <Container>
      <HeaderElement {...{ item }} />
      <ItemSave {...{ item, fields, useSaveItem }} />
    </Container>
  );
};

SaveView.propTypes = {
  fields: propTypes.objectOf(
    propTypes.shape({
      type: propTypes.string,
      component: propTypes.func,
    }),
  ).isRequired,
  HeaderElement: propTypes.func.isRequired,
  useItem: propTypes.func.isRequired,
  useSaveItem: propTypes.func.isRequired,
};

export default SaveView;
