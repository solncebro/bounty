import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Section } from '../shared/Section';
import { MultiOrderForm } from './MultiOrderForm';
import { MultiOrderTable } from './MultiOrderTable';
import { $PreOrders, resetPreOrders } from './MultiOrder.effector';
import { useStore } from 'effector-react';

export const MultiOrder = () => {
  const $preOrders = useStore($PreOrders);

  return (
    <Section title="Multi Order">
      <Grid container spacing={1} direction="column">
        <Grid item>
          <MultiOrderForm />
        </Grid>
        <Grid item>
          <MultiOrderTable />
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={() => resetPreOrders()} fullWidth>
                Clear
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={$preOrders.totalCount === 0 || $preOrders.isVolumeLess}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
};
