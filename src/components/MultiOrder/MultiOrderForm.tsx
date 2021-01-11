import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomInput } from '../shared/CustomInput';
import { MultiOrderTable } from './MultiOrderTable';

enum ChangePriceDirectionEnum {
  both = 'both',
  up = 'up',
  down = 'down',
}

enum ChangeVolumeDirectionEnum {
  same = 'same',
  higher = 'higher',
  lower = 'lower',
}

interface MultiOrderFormProps {
  initialPrice: number;
  changePriceStep: number;
  changePriceDirection: ChangePriceDirectionEnum;
  volume: number;
  isSplitByVolume: boolean;
  orderSize: number;
  orderSizeDirection: ChangeVolumeDirectionEnum;
  orderSizeDeviation: number;
  orderQuantity: number;
}

const defaultValues = {
  initialPrice: 0,
  changePriceStep: 0,
  changePriceDirection: ChangePriceDirectionEnum.both,
  volume: 0,
  isSplitByVolume: true,
  orderSize: 0,
  orderSizeDirection: ChangeVolumeDirectionEnum.same,
  orderSizeDeviation: 0,
  orderQuantity: 0,
};

export const MultiOrderForm = () => {
  const { handleSubmit, control, watch } = useForm<MultiOrderFormProps>({ defaultValues });
  const { isSplitByVolume } = watch();

  const onSubmit = (data: MultiOrderFormProps) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <CustomInput title="Price" inputSize={9}>
            <Controller as={<TextField size="small" variant="outlined" />} control={control} name="initialPrice" />
          </CustomInput>
        </Grid>

        <Grid item>
          <CustomInput title="Step" inputSize={9}>
            <Controller as={<TextField size="small" variant="outlined" />} control={control} name="changePriceStep" />
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
                <Controller as={<TextField size="small" variant="outlined" />} control={control} name="volume" />
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
              render={({ onChange, ...restProps }) => (
                <RadioGroup
                  row
                  {...restProps}
                  onChange={(event, value) => {
                    onChange(value === 'true' ? true : false);
                  }}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Volume" />
                  <FormControlLabel value={false} control={<Radio />} label="Quantity" />
                </RadioGroup>
              )}
              control={control}
              name="isSplitByVolume"
            />
          </CustomInput>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}>
              <CustomInput title="Size" inputSize={8}>
                <Controller
                  as={<TextField size="small" variant="outlined" disabled={!isSplitByVolume} />}
                  control={control}
                  name="orderSize"
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <Controller
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
                control={control}
                name="orderSizeDirection"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}>
              <CustomInput title="Quantity" inputSize={6}>
                <Controller
                  as={<TextField size="small" variant="outlined" disabled={isSplitByVolume} />}
                  control={control}
                  name="orderQuantity"
                />
              </CustomInput>
            </Grid>
            <Grid item xs={5}>
              <CustomInput title="Dev %" inputSize={5}>
                <Controller
                  as={<TextField size="small" variant="outlined" disabled={isSplitByVolume} />}
                  control={control}
                  name="orderSizeDeviation"
                />
              </CustomInput>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={7}></Grid>
            <Grid item xs={5}>
              <Box>
                <Button variant="contained" color="primary" fullWidth>
                  Preview
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <MultiOrderTable data={[]} />
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Box>
                <Button variant="contained" color="primary" fullWidth>
                  Clear
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Button variant="contained" color="secondary" fullWidth>
                  Create
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
