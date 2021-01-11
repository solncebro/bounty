import { Box, Grid, Typography } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';

interface CustomInputProps {
  title: string;
  inputSize?: boolean | 'auto' | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const CustomInput: React.FC<PropsWithChildren<CustomInputProps>> = ({ children, title, inputSize }) => {
  return (
    <Grid container spacing={1} direction="row" alignItems="center" justify="space-between" wrap="nowrap">
      <Grid item>
        <Box>
          <Typography>{title}:</Typography>
        </Box>
      </Grid>
      <Grid item xs={inputSize}>
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};
