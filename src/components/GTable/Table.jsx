import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

export default function CustomTable({ headers, rows, rowKey, action }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Table */}
      <TableContainer sx={{
        my: 3,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden"
      }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header.id} align="center">
                  {header.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">الخيارات</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row[rowKey]}>
                {headers.map((header, index) => (
                  <StyledTableCell
                    key={`${row[rowKey]}-${header.id}`}
                    align="center"
                    component={index === 0 ? 'th' : 'td'}
                    scope={index === 0 ? 'row' : undefined}
                  >
                    {header.image ? (
                      <img
                        className='w-16 h-16 m-auto rounded-lg cursor-pointer  '
                        src={row[header.id]}
                        alt={header.label}
                        onClick={() => handleOpen(row[header.id])}
                      />
                    ) : (
                      row[header.id]
                    )}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  {action && action(row)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Image Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            outline: 'none',
            borderRadius: 2,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 8,
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
