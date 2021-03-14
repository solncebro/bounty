import { Box, Grid, makeStyles, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { StyledTableCell } from '../shared/StyledTableCell';
import { StyledTableRow } from '../shared/StyledTableRow';
import { $PreOrders } from './MultiOrder.effector';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '200px',
    border: `1px solid ${theme.palette.divider}`,
  },
  volume: {
    color: theme.palette.error.main,
  },
}));

export const MultiOrderTable: React.FC = () => {
  const classes = useStyles();
  const $preOrders = useStore($PreOrders);

  const renderCells = useMemo(
    () =>
      $preOrders.orders.map(({ price, volume }) => (
        <StyledTableRow key={price}>
          <StyledTableCell>{$preOrders.isPriceZerosVisible ? price.toFixed(8) : price}</StyledTableCell>
          <StyledTableCell>{$preOrders.isPriceZerosVisible ? volume.toFixed(8) : volume}</StyledTableCell>
        </StyledTableRow>
      )),
    [$preOrders.orders, $preOrders.isPriceZerosVisible]
  );

  return (
    <>
      <Box>
        <TableContainer classes={{ root: classes.root }}>
          <Table stickyHeader size="small">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Volume</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>{renderCells}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box p={1}>
        <Grid container justify="space-between">
          <Grid item>Orders: {$preOrders.totalCount}</Grid>
          <Grid item>
            <Box className={clsx($preOrders.isVolumeLess && classes.volume)}>Volume: {$preOrders.totalVolume}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
