import React, { PropsWithChildren } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface SectionProps {
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
  },
  header: {
    background: theme.palette.action.hover,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

export const Section: React.FC<PropsWithChildren<SectionProps>> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <Box p={1} className={classes.header}>
            {title}
          </Box>
        </Grid>
        <Grid item>
          <Box p={1}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};
