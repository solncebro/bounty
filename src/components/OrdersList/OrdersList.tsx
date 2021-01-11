import React from 'react';
import { Table, TableContainer, TableHead, TableBody, Checkbox } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactComponent as Cross } from '../../assets/cross.svg';
import { StyledTableRow } from '../shared/StyledTableRow';
import { StyledTableCell } from '../shared/StyledTableCell';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    height: '220px',
  },
  checkBox: { padding: theme.spacing(0) },
}));

function createData(market: string, type: string, price: number, volume: number, cancel: boolean, sell: boolean) {
  return { market, type, price, volume, cancel, sell };
}

const rows = [
  createData('BTC-BCC', 'Buy', 0.12030001, 0.05, false, false),
  createData('BTC-ETH', 'Buy', 0.12040002, 0.05, false, false),
  createData('BTC-MCO', 'Buy', 0.12050003, 0.05, false, false),
  createData('BTC-MATIC', 'Sell', 0.12060004, 0.05, false, false),
  createData('BTC-BCHABC', 'Buy', 0.12070008, 0.05, false, false),
  createData('BTC-BCH', 'Buy', 0.12070008, 0.05, false, false),
  createData('BTC-VIB', 'Buy', 0.12070008, 0.05, false, false),
];

const OrdersList = () => {
  const classes = useStyles();

  return (
    <TableContainer classes={{ root: classes.root }}>
      <Table stickyHeader size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sortDirection="desc" align="center">
              MARKET
            </StyledTableCell>
            <StyledTableCell align="center">TYPE</StyledTableCell>
            <StyledTableCell align="center">PRICE</StyledTableCell>
            <StyledTableCell align="center">VOLUME</StyledTableCell>
            <StyledTableCell align="center">
              <Cross onClick={() => console.log('click')} />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Cross onClick={() => console.log('click')} />
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.market}</StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{row.volume}</StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox checked={false} classes={{ root: classes.checkBox }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox checked={false} className={classes.checkBox} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersList;
