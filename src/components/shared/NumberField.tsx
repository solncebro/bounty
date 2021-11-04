import React from 'react';
import { TextField } from '@material-ui/core';
import { ControllerRenderProps } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface NumberFieldProps {
  renderProps: ControllerRenderProps<Record<string, any>>;
  hasError: boolean;
  isDisabled?: boolean;
}

export const NumberField = ({ renderProps, hasError, isDisabled }: NumberFieldProps) => {
  const { onChange, ...restProps } = renderProps;
  return (
    <NumberFormat
      {...restProps}
      fullWidth
      customInput={TextField}
      InputProps={{ margin: 'dense' }}
      variant="outlined"
      disabled={isDisabled}
      allowLeadingZeros={false}
      decimalScale={8}
      allowNegative={false}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      error={hasError}
    />
  );
};
