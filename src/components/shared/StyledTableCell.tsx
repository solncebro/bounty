import { TableCell, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '6px',
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      padding: '6px',
      borderRight: 'none',
    },
  },
  head: {
    fontSize: '1rem',
    textAlign: 'center',
  },
  stickyHeader: {
    background: 'white',
  },
}))(TableCell);
