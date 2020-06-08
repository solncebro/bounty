import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Header from '../Header/Header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 30px',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Grid container classes={{ root: classes.root }} spacing={2} direction="column" justify="space-between">
      <Grid item>
        <Header />
      </Grid>
      <Grid item>Основной блок с табами</Grid>
    </Grid>
  );
}

export default App;
