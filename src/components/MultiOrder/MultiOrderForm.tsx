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
  TextField,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SATOSHI } from '../../constants/common';
import { ChangePriceDirectionEnum, ChangeVolumeDirectionEnum } from '../../constants/enums';
import { CustomInput } from '../shared/CustomInput';
import { cutEpsilon } from '../utils';
import { $Orders, resetOrders, setIsPriceZerosVisible, setOrders } from './MultiOrder.effector';
import { calcOrders } from './utils/calcOrders';
import { splitByVolume } from './utils/splitByVolume';

interface MultiOrderFormProps {
  isBuyAction: boolean;
  initialPrice: number;
  changePriceStep: number;
  changePriceDirection: ChangePriceDirectionEnum;
  volumeLimit: number;
  isSplitByVolume: boolean;
  orderSize: number;
  orderSizeDirection: ChangeVolumeDirectionEnum;
  orderSizeDeviation: number;
  orderQuantity: number;
  isPriceZerosVisible: boolean;
}

const defaultValues = {
  isBuyAction: true,
  initialPrice: 0,
  changePriceStep: 0,
  changePriceDirection: ChangePriceDirectionEnum.both,
  volumeLimit: 0,
  isSplitByVolume: true,
  orderSize: 0,
  orderSizeDirection: ChangeVolumeDirectionEnum.same,
  orderSizeDeviation: 0,
  orderQuantity: 0,
  isPriceZerosVisible: true,
};

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      margin: 0,
    },
    '&[type=number]': {
      '-webkit-appearance': 'textfield',
      '-moz-appearance': 'textfield',
    },
  },
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
  const $orders = useStore($Orders);
  const { handleSubmit, control, watch, errors } = useForm<MultiOrderFormProps>({ defaultValues });
  const { isSplitByVolume, isBuyAction } = watch();

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
    resetOrders();

    if (isSplitByVolume) {
      const allOrders = splitByVolume({
        initialPrice,
        changePriceStep,
        changePriceDirection,
        volumeLimit,
        orderSize,
      });

      const totalVolume = cutEpsilon(allOrders.reduce((acc, item) => acc + item.volume, 0));
      setOrders({ orders: allOrders, totalVolume, totalCount: allOrders.length });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Controller
            render={({ onChange }) => (
              <Box>
                <ButtonGroup disableElevation fullWidth>
                  <Button
                    variant="outlined"
                    className={clsx(isBuyAction && classes.buy)}
                    onClick={() => onChange(true)}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outlined"
                    className={clsx(!isBuyAction && classes.sell)}
                    onClick={() => onChange(false)}
                  >
                    Sell
                  </Button>
                </ButtonGroup>
              </Box>
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
              render={({ onChange, ...restProps }) => (
                <TextField
                  {...restProps}
                  onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                  type="number"
                  size="small"
                  variant="outlined"
                  error={!!errors.initialPrice}
                  inputProps={{ className: classes.input }}
                />
              )}
              rules={{ required: true, min: SATOSHI }}
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <CustomInput title="Step" inputSize={9}>
            <Controller
              name="changePriceStep"
              control={control}
              render={({ onChange, ...restProps }) => (
                <TextField
                  {...restProps}
                  onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                  type="number"
                  size="small"
                  variant="outlined"
                  error={!!errors.changePriceStep}
                  inputProps={{ className: classes.input }}
                />
              )}
              rules={{ required: true, min: SATOSHI }}
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <CustomInput title="Direction" inputSize={8}>
            <Controller
              render={(props) => (
                <FormControl size="small" variant="outlined" fullWidth>
                  <Select {...props}>
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
                  render={({ onChange, ...restProps }) => (
                    <TextField
                      {...restProps}
                      onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                      type="number"
                      size="small"
                      variant="outlined"
                      error={!!errors.volumeLimit}
                      inputProps={{ className: classes.input }}
                    />
                  )}
                  rules={{ required: true, min: SATOSHI }}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Button variant="contained" color="primary" fullWidth>
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
              render={({ onChange, ...restProps }) => (
                <RadioGroup
                  row
                  {...restProps}
                  onChange={(_, value) => {
                    onChange(value === 'true' ? true : false);
                  }}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Volume" />
                  <FormControlLabel value={false} control={<Radio />} label="Quantity" />
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
                  render={({ onChange, ...restProps }) => (
                    <TextField
                      {...restProps}
                      onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                      type="number"
                      size="small"
                      variant="outlined"
                      error={!!errors.orderSize}
                      inputProps={{ className: classes.input }}
                      disabled={!isSplitByVolume}
                    />
                  )}
                  rules={isSplitByVolume ? { required: true, validate: (value) => value > SATOSHI } : {}}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <Controller
                name="orderSizeDirection"
                control={control}
                render={(props) => (
                  <FormControl size="small" variant="outlined" fullWidth>
                    <Select {...props} disabled={isSplitByVolume}>
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
                  render={({ onChange, ...restProps }) => (
                    <TextField
                      {...restProps}
                      onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                      type="number"
                      size="small"
                      variant="outlined"
                      error={!!errors.orderQuantity}
                      inputProps={{ className: classes.input }}
                      disabled={isSplitByVolume}
                    />
                  )}
                  rules={!isSplitByVolume ? { required: true, validate: (value) => value > SATOSHI } : {}}
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <CustomInput title="Dev %" inputSize={5}>
                <Controller
                  name="orderSizeDeviation"
                  control={control}
                  render={({ onChange, ...restProps }) => (
                    <TextField
                      {...restProps}
                      onChange={({ currentTarget: { value } }) => onChange(parseFloat(value))}
                      type="number"
                      size="small"
                      variant="outlined"
                      error={!!errors.orderSizeDeviation}
                      inputProps={{ className: classes.input }}
                      disabled={isSplitByVolume}
                    />
                  )}
                  rules={!isSplitByVolume ? { required: true, validate: (value) => value > SATOSHI } : {}}
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
                  render={({ onChange, ...restProps }) => (
                    <Checkbox
                      {...restProps}
                      checked={$orders.isPriceZerosVisible}
                      onChange={(_, checked) => {
                        setIsPriceZerosVisible(!$orders.isPriceZerosVisible);
                        onChange(checked);
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
