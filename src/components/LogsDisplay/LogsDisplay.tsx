import React, { useMemo } from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
} from '@material-ui/core';
import { useStore } from 'effector-react';
import { $Logs } from './LogsDisplay.effect';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    height: '150px',
  },
  cell: {
    fontSize: '0.7rem',
    padding: '3px',
  },
  critical: {
    color: theme.palette.error.main,
  },
}));

const LogsDisplay = () => {
  const classes = useStyles();
  const $logs = useStore($Logs);

  const renderLogs = useMemo(
    () =>
      $logs.map(({ time, message, isCritical }) => (
        <TableRow key={time}>
          <TableCell className={clsx(classes.cell, isCritical && classes.critical)}>{`${time} ${message}`}</TableCell>
        </TableRow>
      )),
    [$logs, classes]
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>Binance refresh time 3 sec</Grid>
      <Grid item>
        <Grid container justify="space-between">
          <Grid item>R: 234/1200</Grid>
          <Grid item>O: 435/10000</Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableContainer component={Paper} classes={{ root: classes.table }}>
          <Table stickyHeader>
            <TableBody>{renderLogs}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default LogsDisplay;
