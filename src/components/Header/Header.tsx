import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container classes={{ root: classes.root }} spacing={2} justify="space-between">
      <Grid item>Список ордеров</Grid>
      <Grid item>Баланс</Grid>
      <Grid item>Чарт</Grid>
      <Grid item>График битка</Grid>
      <Grid item>Логи</Grid>
    </Grid>
  );
};

export default Header;
