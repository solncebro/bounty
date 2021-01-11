import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Body from '../Body/Body';
import { themeMain } from './theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 30px',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeMain}>
      <Grid container classes={{ root: classes.root }} spacing={2} direction="column" justify="space-between">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Body />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
