import { Box, Grid, makeStyles, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import React from 'react';
import { StyledTableCell } from '../shared/StyledTableCell';
import { StyledTableRow } from '../shared/StyledTableRow';

interface PreviewData {
  price: number;
  volume: number;
}

interface MultiOrderTableProps {
  data: PreviewData[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '200px',
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export const MultiOrderTable: React.FC<MultiOrderTableProps> = ({ data }) => {
  const classes = useStyles();
  const data2 = data.length
    ? data
    : [
        { price: 0.0001, volume: 0.2 },
        { price: 0.000102, volume: 0.7 },
        { price: 0.00010003, volume: 21.2 },
        { price: 0.000107, volume: 15000.2 },
        { price: 0.000109, volume: 959 },
        { price: 0.00011, volume: 37 },
      ];

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
            <TableBody>
              {data2.map(({ price, volume }) => (
                <StyledTableRow key={price}>
                  <StyledTableCell>{price}</StyledTableCell>
                  <StyledTableCell>{volume}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box p={1}>
        <Grid container justify="space-between">
          <Grid item>Orders: {data2.length}</Grid>
          <Grid item>Volume: {data2.reduce((acc, item) => acc + item.volume, 0).toFixed(2)}</Grid>
        </Grid>
      </Box>
    </>
  );
};
