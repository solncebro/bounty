import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Grid, makeStyles, Theme } from '@material-ui/core';
import { Section } from '../shared/Section';
import clsx from 'clsx';
import { MultiOrderForm } from './MultiOrderForm';

const useStyles = makeStyles((theme: Theme) => ({
  buy: {
    color: theme.palette.common.white,
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
  sell: {
    color: theme.palette.common.white,
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));

export const MultiOrder = () => {
  const classes = useStyles();
  const [isBuyAction, setBuyAction] = useState(true);

  return (
    <Section title="Multi Order">
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Box>
            <ButtonGroup disableElevation fullWidth>
              <Button
                variant="outlined"
                className={clsx(isBuyAction && classes.buy)}
                onClick={() => setBuyAction(true)}
              >
                Buy
              </Button>
              <Button
                variant="outlined"
                className={clsx(!isBuyAction && classes.sell)}
                onClick={() => setBuyAction(false)}
              >
                Sell
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <MultiOrderForm />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};
