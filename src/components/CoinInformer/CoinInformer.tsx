import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Section } from '../shared/Section';
import { CustomInput } from '../shared/CustomInput';
import { $SymbolsTickers } from '../Header/Header.effect';
import { useStoreMap } from 'effector-react';
import { TRADING_QUOTE_SYMBOLS } from '../../constants/common';
import { setCurrentSymbol } from '../App/App.effect';

export const CoinInformer = () => {
  const coinList = useStoreMap({
    store: $SymbolsTickers,
    keys: [],
    fn: (symbolsTickers) =>
      symbolsTickers.filter(({ symbol }) =>
        TRADING_QUOTE_SYMBOLS.some((quoteSymbol) => symbol.match(new RegExp(quoteSymbol)))
      ),
  });

  return (
    <Section title="Coin informer">
      <CustomInput title="Market" inputSize={9}>
        <Autocomplete
          autoComplete
          disableClearable
          options={coinList}
          getOptionLabel={(option) => option.symbol}
          fullWidth
          renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
          onChange={(_, newValue) => setCurrentSymbol(newValue.symbol)}
        />
      </CustomInput>
    </Section>
  );
};
