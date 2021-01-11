import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Section } from '../shared/Section';
import { CustomInput } from '../shared/CustomInput';

const mockCurrencies = [
  { title: 'ETHBTC' },
  { title: 'MATICBTC' },
  { title: 'POWRBTC' },
  { title: 'VIABTC' },
  { title: 'BTCABCBTC' },
];

export const CoinInformer = () => {
  return (
    <Section title="Coin informer">
      <CustomInput title="Market" inputSize={9}>
        <Autocomplete
          autoComplete
          disableClearable
          options={mockCurrencies}
          getOptionLabel={(option) => option.title}
          fullWidth
          renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
        />
      </CustomInput>
    </Section>
  );
};
