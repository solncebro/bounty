import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { useStore, useStoreMap } from 'effector-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OrderSideEnum } from '../../constants/Binance/OrderEnums';
import { SATOSHI } from '../../constants/common';
import { ChangePriceDirectionEnum, ChangeVolumeDirectionEnum } from '../../constants/enums';
import { $Application } from '../App/App.effect';
import { $Balances } from '../Balances/Balances.effects';
import { CustomInput } from '../shared/CustomInput';
import { NumberField } from '../shared/NumberField';
import { cutEpsilon } from '../utils';
import { greaterThanSatoshi } from '../validators';
import { $MultiOrders, resetMultiOrders, setIsPriceZerosVisible, setMultiOrders } from './MultiOrder.effector';
import { splitByVolume } from './utils/splitByVolume';

interface CurrentSymbolFreeBalances {
  freeBalanceBaseAsset: number;
  freeBalanceQuoteAsset: number;
}

export interface MultiOrderFormProps {
  isBuyAction: boolean;
  initialPrice: Nullable<number>;
  changePriceStep: Nullable<number>;
  changePriceDirection: ChangePriceDirectionEnum;
  volumeLimit: Nullable<number>;
  volumeLimitPercent: Nullable<number>;
  isSplitByVolume: boolean;
  orderSize: Nullable<number>;
  orderSizeDirection: ChangeVolumeDirectionEnum;
  orderSizeDeviation: Nullable<number>;
  orderQuantity: Nullable<number>;
  isPriceZerosVisible: boolean;
}

const defaultValues = {
  isBuyAction: true,
  initialPrice: null,
  changePriceStep: null,
  changePriceDirection: ChangePriceDirectionEnum.both,
  volumeLimit: null,
  volumeLimitPercent: null,
  isSplitByVolume: true,
  orderSize: null,
  orderSizeDirection: ChangeVolumeDirectionEnum.same,
  orderSizeDeviation: null,
  orderQuantity: null,
  isPriceZerosVisible: true,
};

const useStyles = makeStyles((theme: Theme) => ({
  buy: {
    color: theme.palette.common.white,
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
  sell: {
    color: theme.palette.common.white,
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));

export const MultiOrderForm = () => {
  const classes = useStyles();
  const $multiOrders = useStore($MultiOrders);
  const $application = useStore($Application);
  const currentSymbol = $application.currentSymbol;
  const { freeBalanceBaseAsset, freeBalanceQuoteAsset } = useStoreMap({
    store: $Balances,
    keys: [currentSymbol],
    fn: (balances) => {
      const initialBalances: CurrentSymbolFreeBalances = { freeBalanceBaseAsset: 0, freeBalanceQuoteAsset: 0 };
      if (currentSymbol) {
        return balances.reduce((result, symbol) => {
          if (currentSymbol?.baseAsset === symbol.asset) {
            result.freeBalanceBaseAsset = symbol.free;
          }

          if (currentSymbol?.quoteAsset === symbol.asset) {
            result.freeBalanceQuoteAsset = symbol.free;
          }

          return result;
        }, initialBalances);
      }

      return initialBalances;
    },
  });

  const { handleSubmit, control, watch, formState: { errors }, setValue } = useForm<MultiOrderFormProps>({ defaultValues });
  const { isSplitByVolume, isBuyAction, volumeLimitPercent } = watch();

  const currentActionFreeLimitVolume = isBuyAction ? freeBalanceQuoteAsset : freeBalanceBaseAsset;

  const onSubmit = ({
    isBuyAction,
    initialPrice,
    changePriceStep,
    changePriceDirection,
    volumeLimit,
    isSplitByVolume,
    orderSize,
    orderSizeDirection,
    orderSizeDeviation,
    orderQuantity,
  }: MultiOrderFormProps) => {
    resetMultiOrders();
    if (isSplitByVolume && initialPrice && changePriceStep && volumeLimit && orderSize) {
      console.log('submit')
      const preOrdersSplitByVolume = splitByVolume({
        initialPrice,
        changePriceStep,
        changePriceDirection,
        volumeLimit,
        orderSize,
      });

      const totalVolume = cutEpsilon(preOrdersSplitByVolume.reduce((acc, item) => acc + item.volume, 0));
      setMultiOrders({
        preOrders: preOrdersSplitByVolume,
        totalVolume,
        totalCount: preOrdersSplitByVolume.length,
        side: isBuyAction ? OrderSideEnum.BUY : OrderSideEnum.SELL,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Controller
            render={({field}) => (
              <ButtonGroup disableElevation fullWidth>
                <Button
                  variant="outlined"
                  className={clsx(isBuyAction && classes.buy)}
                  onClick={() => {
                    setValue('initialPrice', null, {shouldValidate: true});
                    field.onChange(true)
                  }}
                >
                  {OrderSideEnum.BUY}
                </Button>
                <Button
                  variant="outlined"
                  className={clsx(!isBuyAction && classes.sell)}
                  onClick={() => {
                    console.log('change')
                    setValue('initialPrice', null, { shouldValidate: true });
                    field.onChange(true)
                  }
                  }
                >
                  {OrderSideEnum.SELL}
                </Button>
              </ButtonGroup>
            )}
            control={control}
            name="isBuyAction"
          />
        </Grid>
        <Grid item>
          <CustomInput title="Price" inputSize={9}>
            <Controller
              name="initialPrice"
              control={control}
              render={({field}) => <NumberField {...field} error={!!errors.initialPrice} />}
              rules={{ required: true, min: SATOSHI }}
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <CustomInput title="Step" inputSize={9}>
            <Controller
              name="changePriceStep"
              control={control}
              render={({field}) => <NumberField {...field} error={!!errors.changePriceStep} />}
              rules={{ required: true, min: SATOSHI }}
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <CustomInput title="Direction" inputSize={8}>
            <Controller
              render={({field}) => (
                <FormControl size="small" variant="outlined" fullWidth>
                  <Select {...field}>
                    {Object.values(ChangePriceDirectionEnum).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              control={control}
              name="changePriceDirection"
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <CustomInput title="Volume" inputSize={8}>
                <Controller
                  name="volumeLimit"
                  control={control}
                  render={({field}) => <NumberField {...field} error={!!errors.volumeLimit} />}
                  rules={{ required: true, min: SATOSHI }}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={4}>
              <Box></Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <Controller
                name="volumeLimitPercent"
                control={control}
                render={({field}) => (
                  <Slider
                    {...field}
                    value={Number(field.value)}
                    disabled={!currentSymbol}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'number' && currentActionFreeLimitVolume) {
                        if (volumeLimitPercent !== newValue) {
                          const newLimit = (newValue * currentActionFreeLimitVolume) / 100;
                          field.onChange(newValue);
                          setValue('volumeLimit', newLimit, {shouldValidate: true});
                        }
                      }
                    }}
                    step={1}
                    marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
                    min={0}
                    max={100}
                    orientation="horizontal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setValue('volumeLimit', currentActionFreeLimitVolume, {shouldValidate: true})}
                >
                  Max
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <CustomInput title="Split" inputSize={10}>
            <Controller
              name="isSplitByVolume"
              control={control}
              render={({field}) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value === 'true' ? true : false);
                  }}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Volume" />
                  <FormControlLabel value={false} control={<Radio />} label="Quantity" disabled />
                </RadioGroup>
              )}
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}>
              <CustomInput title="Size" inputSize={8}>
                <Controller
                  name="orderSize"
                  control={control}
                  render={({field}) => (
                    <NumberField {...field} error={!!errors.orderSize} disabled={!isSplitByVolume} />
                  )}
                  rules={isSplitByVolume ? { required: true, validate: greaterThanSatoshi } : {}}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <Controller
                name="orderSizeDirection"
                control={control}
                render={({field}) => (
                  <FormControl size="small" variant="outlined" fullWidth>
                    <Select {...field} disabled={isSplitByVolume}>
                      {Object.values(ChangeVolumeDirectionEnum).map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}>
              <CustomInput title="Quantity" inputSize={6}>
                <Controller
                  name="orderQuantity"
                  control={control}
                  render={({field}) => (
                    <NumberField {...field} error={!!errors.orderQuantity} disabled={isSplitByVolume} />
                  )}
                  rules={!isSplitByVolume ? { required: true, validate: greaterThanSatoshi } : {}}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <CustomInput title="Dev %" inputSize={5}>
                <Controller
                  name="orderSizeDeviation"
                  control={control}
                  render={({field}) => (
                    <NumberField {...field} error={!!errors.orderSizeDeviation} disabled={isSplitByVolume} />
                  )}
                  rules={!isSplitByVolume ? { required: true, validate: greaterThanSatoshi } : {}}
                />
              </CustomInput>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}>
              <CustomInput title="Zeros" inputSize={10}>
                <Controller
                  name="isPriceZerosVisible"
                  control={control}
                  render={({field}) => (
                    <Checkbox
                      {...field}
                      checked={$multiOrders.isPriceZerosVisible}
                      onChange={(_, checked) => {
                        setIsPriceZerosVisible(!$multiOrders.isPriceZerosVisible);
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Preview
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
