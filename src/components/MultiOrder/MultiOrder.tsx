import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Section } from '../shared/Section';
import { MultiOrderForm } from './MultiOrderForm';
import { MultiOrderTable } from './MultiOrderTable';
import { $Orders, resetOrders } from './MultiOrder.effector';
import { useStore } from 'effector-react';

export const MultiOrder = () => {
  const $orders = useStore($Orders);

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
              <Button variant="contained" color="primary" onClick={() => resetOrders()} fullWidth>
                Clear
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={$orders.totalCount === 0 || $orders.isVolumeLess}
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
