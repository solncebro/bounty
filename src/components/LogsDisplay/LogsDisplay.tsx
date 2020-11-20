import React from 'react';
import { Grid, makeStyles, Paper, Table, TableCell, TableContainer, TableRow, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    height: '150px',
  },
  cell: {
    fontSize: '0.7rem',
    padding: '3px',
  },
}));

const logs = [
  { time: '14:19 21.10.20', message: 'Создание ордена 2312523 - успешно создано' },
  { time: '13:07 21.10.20', message: 'Отмена ордера 123123 - успешно' },
  { time: '12:41 21.10.20', message: 'Создание ордена 2312523 - успешно создано' },
  { time: '12:35 21.10.20', message: 'Отмена ордера 123123 - успешно' },
  { time: '12:21 21.10.20', message: 'Отмена ордера 123123 - провал' },
  { time: '12:17 21.10.20', message: 'Создание ордена 2312523 - успешно создано' },
];

const LogsDisplay = () => {
  const classes = useStyles();

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
            {logs.map(({ time, message }) => (
              <TableRow>
                <TableCell classes={{ root: classes.cell }}>{`${time} ${message}`}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default LogsDisplay;
