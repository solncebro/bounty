import React, { useCallback } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Section } from '../shared/Section';
import { MultiOrderForm } from './MultiOrderForm';
import { MultiOrderTable } from './MultiOrderTable';
import { $MultiOrders, resetMultiOrders } from './MultiOrder.effector';
import { useStore } from 'effector-react';
import { $Application } from '../App/App.effect';
import { addLog, addLogCritical } from '../LogsDisplay/LogsDisplay.effect';
import { OrderTypesEnum, TimeInForceEnum } from '../../constants/Binance/OrderEnums';
import SpotTradeService from '../../services/SpotTradeService';
import { getOrdersFx } from '../OrdersList/OrdersList.effect';
import { FilterTypesEnum } from '../../constants/Binance/FilterTypesEnum';
import { cutEpsilon } from '../utils';

const calcQuantity = (quoteVolume: number, basePrice: number, stepSizeBaseSize?: string) => {
  return quoteVolume;
};

export const MultiOrder = () => {
  const $multiOrders = useStore($MultiOrders);
  const $application = useStore($Application);
  const currentSymbol = $application.currentSymbol;

  const creareOrders = useCallback(() => {
    if (!currentSymbol) {
      return addLogCritical({ code: 0, msg: 'Symbol not selected' });
    }

    const { preOrders, side } = $multiOrders;
    const [lotSize] = currentSymbol.filters.filter(({ filterType }) => filterType === FilterTypesEnum.LOT_SIZE);
    const stepSize = lotSize?.stepSize && parseFloat(lotSize.stepSize);

    if (!stepSize) {
      addLogCritical({ code: 0, msg: 'Stepsize of lotsize unknown' });

      return;
    }

    const extendedPreOrders = preOrders.map((preorder) => {
      const preQuantity = preorder.volume / preorder.price;
      const steppedQuantity = cutEpsilon(preQuantity - (preQuantity % stepSize));

      const params = {
        side,
        symbol: currentSymbol.symbol,
        type: OrderTypesEnum.LIMIT,
        timeInForce: TimeInForceEnum.GTC,
        price: preorder.price,
        quantity: steppedQuantity,
      };
      console.log({ params });
      // return params;
      return SpotTradeService.createOrder(params);
    });
    console.log({ currentSymbol, lotSize, multiOrders: $multiOrders, extendedPreOrders });
    addLog('Creation orders: start');
    Promise.all(extendedPreOrders)
      .then((resolve) => console.log(resolve))
      .catch((reject) => console.log(reject))
      .finally(() => {
        addLog('Creation orders: end');
        getOrdersFx();
      });
  }, [currentSymbol, $multiOrders]);

  return (
    <Section title="Multi Order">
      <Grid container spacing={1} direction="column">
        <Grid item>
          <MultiOrderForm />
        </Grid>
        <Grid item>
          <MultiOrderTable />
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={() => resetMultiOrders()} fullWidth>
                Clear
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={$multiOrders.totalCount === 0 || $multiOrders.isVolumeLess}
                onClick={creareOrders}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
};
