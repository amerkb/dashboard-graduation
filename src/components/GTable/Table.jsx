import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function aTable({ headers, rows, rowKey, action }) {
  return (
    <TableContainer sx={{
      my: 2,
      boxShadow: 3,
      borderRadius: 2,
      overflow: "hidden"
    }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell
                key={header.id}
                align={'center'}
              >
                {header.label}
              </StyledTableCell>
            ))}
            <StyledTableCell
              align={'center'}
            >
              الخيارات
            </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row[rowKey]}>
              {headers.map((header, index) => (
                <StyledTableCell
                  key={`${row[rowKey]}-${header.id}`}
                  align={'center'}
                  component={index === 0 ? 'th' : 'td'}
                  scope={index === 0 ? 'row' : undefined}
                >

                  {row[header.id]}
                </StyledTableCell>
              ))}
              <StyledTableCell
                align={'center'}
                component={'td'}
              >
                {action && action(row)}
              </StyledTableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer >
  );
}