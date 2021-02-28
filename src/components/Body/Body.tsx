import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CoinInformer } from '../CoinInformer/CoinInformer';
import TradingViewWidget from 'react-tradingview-widget';
import { MultiOrder } from '../MultiOrder/MultiOrder';
import { HistoryOrder } from '../HistoryOrder/HistoryOrder';
import { BuyControl } from '../BuyControl/BuyControl';
import { SellControl } from '../SellControl/SellControl';
import { Bids } from '../Bids/Bids';
import { Asks } from '../Asks/Asks';

const useStyles = makeStyles((theme: Theme) => ({
  mainBlock: {
    height: '600px',
  },
}));

const Body = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="space-between" alignItems="flex-start">
      <Grid item xs={10}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box className={classes.mainBlock}>
                  <CoinInformer />
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box className={classes.mainBlock}>
                  <TradingViewWidget symbol="BINANCE:BTCUSDT" locale="ru" interval="30" autosize />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <BuyControl />
              </Grid>
              <Grid item xs={6}>
                <SellControl />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Bids />
              </Grid>
              <Grid item xs={6}>
                <Asks />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <MultiOrder />
          </Grid>
          <Grid item>
            <HistoryOrder />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Body;
