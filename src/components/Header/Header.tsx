import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OrderList from '../OrdersList/OrdersList';
import Balances from '../Balances/Balances';
import Chart from '../Chart/Chart';
import LogsDisplay from '../LogsDisplay/LogsDisplay';
import TradingViewWidget from 'react-tradingview-widget';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: '240px',
  },
  innerContainer: {
    height: '100%',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.header} spacing={2} justify="space-between" alignItems="flex-end">
      <Grid item xs={3}>
        <OrderList />
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={5}>
            <Balances />
          </Grid>
          <Grid item xs={7}>
            <Chart />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5} className={classes.innerContainer}>
        <Grid container className={classes.innerContainer}>
          <Grid item xs={7}>
            <TradingViewWidget
              symbol="BINANCE:BTCUSDT"
              locale="ru"
              interval="30"
              hide_top_toolbar={true}
              hide_legend={true}
              save_image={false}
              autosize
            />
          </Grid>
          <Grid item xs={5}>
            <LogsDisplay />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
