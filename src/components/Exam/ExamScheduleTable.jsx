import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditExamScheduleModal from './EditExamScheduleModal';

export default function ExamScheduleTable({ data = [], onSave }) {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: 4, overflowX: 'auto' }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#7d224b' }}>
              {['المادة', 'اليوم', 'التاريخ', 'من - إلى', 'تعديل'].map(
                (head) => (
                  <TableCell
                    key={head}
                    align="center"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                    }}
                  >
                    {head}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: item.status === 0 ? '#f5f5f5' : 'white',
                  opacity: item.status === 0 ? 0.8 : 1,
                  '& td': {
                    border: '1px solid #e0e0e0',
                    fontSize: '1rem',
                    fontWeight: item.status === 0 ? 'normal' : 'medium',
                    color: item.status === 0 ? '#666' : '#333',
                    padding: '12px',
                  },
                }}
              >
                <TableCell align="center">{item.subject_name}</TableCell>
                <TableCell align="center">{item.day}</TableCell>
                <TableCell align="center">{item.date}</TableCell>
                <TableCell align="center">
                  {item.start_time} - {item.end_time}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="تعديل الامتحان">
                    <IconButton onClick={() => setSelectedRow(item)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditExamScheduleModal
        open={Boolean(selectedRow)}
        data={selectedRow}
        onClose={() => setSelectedRow(false)}
        onSave={async (updatedRow) => {
          await onSave(updatedRow);
          setSelectedRow(null);
        }}
      />
    </Box>
  );
}
