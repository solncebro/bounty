import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Grid, Button } from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';

const StyledTableRow = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    heigth: '10px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    padding: '6px',
    '&:last-child': {
      padding: '6px',
    },
  },
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
  },
  checkBox: { padding: '0px' },
}));

function createData(symbol: string, balance: number) {
  return { symbol, balance };
}

const rows = [
  createData('BTC', 0.12030001),
  createData('ETH', 0.12030001),
  createData('MATIC', 0.12030001),
  createData('BCHABC', 0.12030001),
];

const BalanceList = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary">
          Estimated balance
        </Button>
      </Grid>
      <Grid item>
        <TableContainer component="div">
          <Table className={classes.root} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">SYMBOL</StyledTableCell>
                <StyledTableCell align="center">BALANCE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                  <StyledTableCell align="center">{row.balance}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default BalanceList;
