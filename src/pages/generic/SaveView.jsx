import React from 'react';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import * as propTypes from 'prop-types';
import ItemSave from '../../components/ItemSave';

const SaveView = ({ useItem, id, fieldNames, HeaderElement, useSaveItem }) => {
  const { data: item, isLoading } = useItem(id, Boolean(id));

  const Placeholder = () => (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {fieldNames.map(() => (
                <Grid item xs={12}>
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

  return isLoading && Boolean(id) ? (
    <Placeholder />
  ) : (
    <Container>
      <HeaderElement {...{ item }} />
      <ItemSave {...{ item, fieldNames, useSaveItem }} />
    </Container>
  );
};

SaveView.propTypes = {
  fieldNames: propTypes.arrayOf(propTypes.string).isRequired,
  HeaderElement: propTypes.func.isRequired,
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  useItem: propTypes.func.isRequired,
  useSaveItem: propTypes.func.isRequired,
};
SaveView.defaultProps = {
  id: null,
};

export default SaveView;
