import { TableCell, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '4px',
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      padding: '4px',
      borderRight: 'none',
    },
    textAlign: 'center',
  },
  head: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  stickyHeader: {
    background: 'white',
  },
}))(TableCell);
