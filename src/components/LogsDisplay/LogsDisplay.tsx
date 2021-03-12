import React from 'react';
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

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    height: '150px',
  },
  cell: {
    fontSize: '0.7rem',
    padding: '3px',
  },
}));

const LogsDisplay = () => {
  const classes = useStyles();
  const $logs = useStore($Logs);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>Binance refresh time 3 sec</Grid>
      <Grid item>
        <Grid container justify="space-between">
          <Grid item>Requests: 234/1200</Grid>
          <Grid item>Orders: 435/10000</Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableContainer component={Paper} classes={{ root: classes.table }}>
          <Table stickyHeader>
            <TableBody>
              {$logs.map(({ time, message }) => (
                <TableRow key={time}>
                  <TableCell classes={{ root: classes.cell }}>{`${time} ${message}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default LogsDisplay;
