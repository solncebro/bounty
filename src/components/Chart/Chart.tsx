import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';

const StyledTableRow = withStyles((theme) => ({
  root: {
    border: '1px solid #e0e0e0',
    heigth: '10px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    border: '1px solid #e0e0e0',
    padding: '6px',
    '&:last-child': {
      padding: '6px',
    },
  },
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '1px solid #e0e0e0',
  },
  checkBox: { padding: '0px' },
}));

function createData(market: string, price: number, change: number) {
  return { market, price, change };
}

const rows = [
  createData('BTC-BCC', 0.12030001, 0.05),
  createData('BTC-ETH', 0.12030001, 0.05),
  createData('BTC-MATIC', 0.12030001, 0.05),
  createData('BTC-BCHABC', 0.12030001, 0.05),
];

const Chart = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <RadioGroup row name="sorting" defaultValue="change">
          <FormControlLabel value="change" control={<Radio size="small" color="primary" />} label="CHANGE" />
          <FormControlLabel value="volume" control={<Radio size="small" color="primary" />} label="VOLUME" />
        </RadioGroup>
      </Grid>
      <Grid item>
        <TableContainer component={'div'}>
          <Table className={classes.root} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell sortDirection="desc" align="center">
                  MARKET
                </StyledTableCell>
                <StyledTableCell align="center">PRICE</StyledTableCell>
                <StyledTableCell align="center">CHANGE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.market}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">{row.change}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Chart;
