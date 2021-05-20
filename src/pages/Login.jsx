import React from 'react';
import { Button, Card, CardContent, Container, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import RegisteredTextField from '../components/RegisteredTextField';
import useLogin from '../hooks/api/useLogin';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { mutate: login } = useLogin();

  return (
    <Container>
      <form onSubmit={handleSubmit(login)}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <RegisteredTextField fieldName="email" register={register} />
                  </Grid>
                  <Grid item xs={12}>
                    <RegisteredTextField fieldName="password" register={register} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" fullWidth type="submit" variant="contained">
                  Log in
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export default Login;