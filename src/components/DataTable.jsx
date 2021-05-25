import React from 'react';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-location';
import * as propTypes from 'prop-types';
import { Edit } from '@material-ui/icons';
import { title } from '../string';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const DataTable = ({ useData, displayKeys, rowLink }) => {
  const { data = [], isLoading } = useData();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {displayKeys.map((key) => (
              <StyledTableCell key={key}>{title(key)}</StyledTableCell>
            ))}
            {rowLink && <StyledTableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.id}>
              {displayKeys.map((key) => (
                <StyledTableCell key={key}>{item[key]}</StyledTableCell>
              ))}
              {rowLink && (
                <StyledTableCell>
                  <Link to={`${item.id}/update`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <Typography variant="overline">Loading . . .</Typography>}
    </TableContainer>
  );
};

DataTable.propTypes = {
  useData: propTypes.func.isRequired,
  displayKeys: propTypes.arrayOf(propTypes.string).isRequired,
  rowLink: propTypes.bool,
};
DataTable.defaultProps = {
  rowLink: true,
};

export default DataTable;
