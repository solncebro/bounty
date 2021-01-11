import { TableRow, withStyles } from '@material-ui/core';

export const StyledTableRow = withStyles((theme) => ({
  root: {
    border: `1px solid black`,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
