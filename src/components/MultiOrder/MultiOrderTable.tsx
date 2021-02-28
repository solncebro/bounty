import { Box, Grid, makeStyles, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { StyledTableCell } from '../shared/StyledTableCell';
import { StyledTableRow } from '../shared/StyledTableRow';
import { $Orders } from './MultiOrder.effector';

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
  const $orders = useStore($Orders);

  const renderCells = useMemo(
    () =>
      $orders.orders.map(({ price, volume }) => (
        <StyledTableRow key={price}>
          <StyledTableCell>{$orders.isPriceZerosVisible ? price.toFixed(8) : price}</StyledTableCell>
          <StyledTableCell>{$orders.isPriceZerosVisible ? volume.toFixed(8) : volume}</StyledTableCell>
        </StyledTableRow>
      )),
    [$orders.orders, $orders.isPriceZerosVisible]
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
          <Grid item>Orders: {$orders.totalCount}</Grid>
          <Grid item>
            <Box className={clsx($orders.isVolumeLess && classes.volume)}>Volume: {$orders.totalVolume}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
