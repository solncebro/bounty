import React from 'react';
import { Grid } from '@material-ui/core';

const logs = [
  'Создание ордена 2312523 - успешно создано',
  'Отмена ордера 123123 - провал',
  'Отмена ордера 123123 - успешно',
];

const LogsDisplay = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>{logs.join('\n')}</Grid>
    </Grid>
  );
};

export default LogsDisplay;
