import React, { useEffect, useMemo } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableBody, Grid, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { $Balances, getBalanceFx, resetBalances } from './Balances.effects';
import { useStore } from 'effector-react';
import { StyledTableRow } from '../shared/StyledTableRow';
import { StyledTableCell } from '../shared/StyledTableCell';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    height: '169px',
    border: `1px solid ${theme.palette.divider}`,
  },
  checkBox: { padding: '0px' },
}));

const BalanceList = () => {
  const classes = useStyles();
  const $balances = useStore($Balances);
  console.log({ balances: $balances });

  useEffect(() => {
    getBalanceFx();

    return resetBalances;
  }, []);

  const renderRows = useMemo(
    () =>
      $balances.map(({ asset, summary, free }) => (
        <StyledTableRow key={asset}>
          <StyledTableCell align="center">{asset}</StyledTableCell>
          <StyledTableCell align="center">{summary}</StyledTableCell>
          <StyledTableCell align="center">{free}</StyledTableCell>
        </StyledTableRow>
      )),
    [$balances]
  );

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary">
          Estimated balance
        </Button>
      </Grid>
      <Grid item>
        <TableContainer component="div" className={classes.tableContainer}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">SYMBOL</StyledTableCell>
                <StyledTableCell align="center">TOTAL</StyledTableCell>
                <StyledTableCell align="center">FREE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default BalanceList;
