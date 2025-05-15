import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditWorkScheduleModal from './EditWorkScheduleModal';

const DAYS_ORDER = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

export default function ScheduleTable({ items, onEdit, onSave }) {
  const theme = useTheme();
  const data = items || [];

  const [editingRow, setEditingRow] = useState(null);

  const showBranchColumn = data.some(
    (row) => row.branch != null && row.branch !== '',
  );

  const sorted = [...data].sort((a, b) => {
    const dayA = DAYS_ORDER.indexOf(a.day);
    const dayB = DAYS_ORDER.indexOf(b.day);
    if (dayA !== dayB) return dayA - dayB;

    const branchA = showBranchColumn ? Number(a.branch) : 0;
    const branchB = showBranchColumn ? Number(b.branch) : 0;
    if (branchA !== branchB) return branchA - branchB;

    return a.start_time.localeCompare(b.start_time);
  });

  const dayCounts = {};
  const branchCounts = {};
  sorted.forEach((row) => {
    dayCounts[row.day] = (dayCounts[row.day] || 0) + 1;
    if (showBranchColumn) {
      const key = `${row.day}_${row.branch}`;
      branchCounts[key] = (branchCounts[key] || 0) + 1;
    }
  });

  const seenDay = {};
  const seenBranch = {};

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: theme.shadows[4], overflowX: 'auto' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#7d224b' }}>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                اليوم
              </TableCell>
              {showBranchColumn && (
                <TableCell
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  الشعبة
                </TableCell>
              )}
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                المادة
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                المدرس
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                القاعة
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                من
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                إلى
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                تعديل
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row, idx) => {
              const isFirstDay = !seenDay[row.day];
              if (isFirstDay) seenDay[row.day] = true;

              const branchKey = `${row.day}_${row.branch}`;
              const isFirstBranch = showBranchColumn && !seenBranch[branchKey];
              if (isFirstBranch) seenBranch[branchKey] = true;

              return (
                <TableRow
                  key={idx}
                  hover
                  sx={{
                    backgroundColor:
                      idx % 2 === 0 ? 'white' : theme.palette.grey[50],
                  }}
                >
                  {isFirstDay && (
                    <TableCell
                      rowSpan={dayCounts[row.day]}
                      align="center"
                      sx={{
                        backgroundColor: theme.palette.grey[100],
                        fontWeight: 500,
                      }}
                    >
                      {row.day}
                    </TableCell>
                  )}
                  {showBranchColumn && isFirstBranch && (
                    <TableCell
                      rowSpan={branchCounts[branchKey]}
                      align="center"
                      sx={{ backgroundColor: theme.palette.grey[50] }}
                    >
                      {row.branch}
                    </TableCell>
                  )}
                  <TableCell align="center">{row.course_name}</TableCell>
                  <TableCell align="center">{row.instructor_name}</TableCell>
                  <TableCell align="center">{row.room}</TableCell>
                  <TableCell align="center">{row.start_time}</TableCell>
                  <TableCell align="center">{row.end_time}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="تعديل الحصة">
                      <IconButton onClick={() => setEditingRow(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <EditWorkScheduleModal
        open={Boolean(editingRow)}
        onClose={() => setEditingRow(null)}
        data={editingRow}
        onSave={async (updatedRow) => {
          await onSave(updatedRow);
          setEditingRow(null);
        }}
      />
    </>
  );
}
