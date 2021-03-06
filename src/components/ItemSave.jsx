import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-location';
import * as propTypes from 'prop-types';
import RegisteredTextField from './fields/RegisteredTextField';

const ItemSave = ({ item, fields, useSaveItem, disabled }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...item },
  });
  const navigate = useNavigate();
  const { mutate } = useSaveItem();

  const save = async (variables) => {
    await mutate(variables);
    navigate('../');
  };

  const getField = (fieldName, fieldProps) => {
    const { component: Component, type } = fieldProps;
    return Component ? (
      <Component {...{ fieldName, register, type, item }} />
    ) : (
      <RegisteredTextField {...{ fieldName, register, type, item }} />
    );
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {Object.entries(fields).map(([fieldName, fieldProps]) => (
                  <Grid item xs={12} key={fieldName}>
                    {getField(fieldName, fieldProps)}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
                disabled={disabled}
              >
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
  disabled: propTypes.bool,
  fields: propTypes.objectOf(
    propTypes.shape({
      type: propTypes.string,
      component: propTypes.func,
    }),
  ).isRequired,
  item: propTypes.shape({ id: propTypes.number }),
  useSaveItem: propTypes.func.isRequired,
};
ItemSave.defaultProps = {
  disabled: false,
  item: {},
};

export default ItemSave;
