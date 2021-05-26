import React from 'react';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import * as propTypes from 'prop-types';
import { useParams } from 'react-location';
import ItemSave from '../../components/ItemSave';

const SaveView = ({ useItem, fieldNames, HeaderElement, useSaveItem, fieldComponents }) => {
  const params = useParams();
  const { data: item, isLoading } = useItem(params.id, Boolean(params.id));

  const Placeholder = () => (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {fieldNames.map((fieldName) => (
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
      <ItemSave {...{ item, fieldNames, useSaveItem, fieldComponents }} />
    </Container>
  );
};

SaveView.propTypes = {
  fieldComponents: propTypes.shape({ [propTypes.string]: propTypes.func }),
  fieldNames: propTypes.arrayOf(propTypes.string).isRequired,
  HeaderElement: propTypes.func.isRequired,
  useItem: propTypes.func.isRequired,
  useSaveItem: propTypes.func.isRequired,
};

SaveView.defaultProps = {
  fieldComponents: {},
};

export default SaveView;
