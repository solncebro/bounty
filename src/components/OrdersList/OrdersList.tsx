import React, { useCallback, useEffect, useMemo } from 'react';
import { Table, TableContainer, TableHead, TableBody, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactComponent as Cross } from '../../assets/cross.svg';
import { StyledTableRow } from '../shared/StyledTableRow';
import { StyledTableCell } from '../shared/StyledTableCell';
import { $Orders, getOrdersFx, resetOrders } from './OrdersList.effect';
import { useStore } from 'effector-react';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';
import SpotTradeService from '../../services/SpotTradeService';
import { OrderExtended } from '../../models/Order';
import { OrderStatusEnum } from '../../constants/Binance/OrderEnums';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    height: '220px',
  },
}));

const OrdersList = () => {
  const classes = useStyles();
  const $orders = useStore($Orders);

  useEffect(() => {
    getOrdersFx();

    return resetOrders;
  }, []);

  const cancelOrder = useCallback(({ orderId, symbol, price, quoteAssetQty }: OrderExtended) => {
    const orderInfo = `#${orderId} ${symbol} ${price} ${quoteAssetQty}`;
    addLog(`Cancel order ${orderInfo}: start`);
    SpotTradeService.cancelOrder({ orderId: String(orderId), symbol })
      .then((resolve) => {
        if (resolve.data.status === OrderStatusEnum.CANCELED) {
          addLog(`Cancel order ${orderInfo}: successeful`);
        }
      })
      .finally(() => getOrdersFx());
  }, []);

  const cancelAllOrder = useCallback(
    (symbol: string) => {
      addLog(`Cancel all orders ${symbol}: start`);
      SpotTradeService.cancelAllOrders({ symbol })
        .then((resolve) => {
          if (resolve.data.length === $orders.filter((order) => order.symbol === symbol).length) {
            addLog(`Cancel all orders ${symbol}: successeful`);
          }
        })
        .finally(() => getOrdersFx());
    },
    [$orders]
  );

  const renderOrders = useMemo(
    () =>
      $orders.map((order) => (
        <StyledTableRow key={order.orderId}>
          <StyledTableCell align="center">{order.symbol}</StyledTableCell>
          <StyledTableCell align="center">{order.side}</StyledTableCell>
          <StyledTableCell align="center">{order.price}</StyledTableCell>
          <StyledTableCell align="center">{order.quoteAssetQty}</StyledTableCell>
          <StyledTableCell align="center">
            <Grid container item justify="center" alignItems="center">
              <Cross onClick={() => cancelOrder(order)} />
            </Grid>
          </StyledTableCell>
        </StyledTableRow>
      )),
    [$orders, cancelOrder]
  );

  return (
    <TableContainer classes={{ root: classes.root }}>
      <Table stickyHeader size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sortDirection="desc" align="center">
              MARKET
            </StyledTableCell>
            <StyledTableCell>TYPE</StyledTableCell>
            <StyledTableCell>PRICE</StyledTableCell>
            <StyledTableCell>VOLUME</StyledTableCell>
            <StyledTableCell variant="head">
              <Grid container item justify="center" alignItems="center">
                <Cross onClick={() => cancelAllOrder('ETHBTC')} />
              </Grid>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>{renderOrders}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersList;
