import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-location';
import * as propTypes from 'prop-types';
import RegisteredTextField from './RegisteredTextField';

const ItemSave = ({ item, fieldNames, useSaveItem }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...item, id: undefined },
  });
  const navigate = useNavigate();
  const { mutate } = useSaveItem();

  const save = async (variables) => {
    await mutate(variables);
    navigate('../');
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {fieldNames.map((fieldName) => (
                  <Grid item xs={12}>
                    <RegisteredTextField {...{ fieldName, register }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ItemSave.propTypes = {
  item: propTypes.shape({ id: propTypes.number }),
  fieldNames: propTypes.arrayOf(propTypes.string).isRequired,
  useSaveItem: propTypes.func.isRequired,
};
ItemSave.defaultProps = {
  item: {},
};

export default ItemSave;
