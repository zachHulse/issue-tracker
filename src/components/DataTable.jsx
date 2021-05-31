import React from 'react';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-location';
import * as propTypes from 'prop-types';
import { Edit } from '@material-ui/icons';
import { title } from '../string';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';

const DataTable = ({ useData, displayKeys, rowLink, formattedCells }) => {
  const { data = [], isLoading } = useData();
  const getCell = (key, item) => {
    const Component = formattedCells[key];
    return Component ? (
      <Component {...{ item, key }} />
    ) : (
      <StyledTableCell key={key}>{item[key]}</StyledTableCell>
    );
  };
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
              {displayKeys.map((key) => getCell(key, item))}
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
  displayKeys: propTypes.arrayOf(propTypes.string).isRequired,
  formattedCells: propTypes.shape({ [propTypes.string]: propTypes.func }),
  rowLink: propTypes.bool,
  useData: propTypes.func.isRequired,
};
DataTable.defaultProps = {
  rowLink: true,
  formattedCells: {},
};

export default DataTable;
