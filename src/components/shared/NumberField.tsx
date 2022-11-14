import React from 'react';
import { makeStyles, TextField, TextFieldProps, Theme } from '@material-ui/core';
import { SATOSHI } from '../../constants/common';

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
}));

export const NumberField = (props: TextFieldProps) => {
  const styles = useStyles();
  return (
    <TextField 
    {...props}
    variant="outlined"
    type='number'
    size='small'
    inputProps={{
      step: SATOSHI,
      className: styles.input
    }}
    />
  );
};
