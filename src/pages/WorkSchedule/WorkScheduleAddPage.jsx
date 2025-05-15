import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Alert,
  Grid,
  Snackbar,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { getAcademicYears } from '../../services/academicYears';
import { addWorkSchedules } from '../../services/workSchedule';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const BRANCHES = [
  { value: '1', label: 'الشعبة الأولى' },
  { value: '2', label: 'الشعبة الثانية' },
  { value: '3', label: 'الشعبة الثالثة' },
  { value: '', label: 'بدون شعبة' },
];

const createEmptyRow = () => ({
  course_name: '',
  instructor_name: '',
  day: '',
  start_time: '',
  end_time: '',
  room: '',
  branch: '',
});

export default function WorkScheduleAddPage() {
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState('');
  const [academicLevel, setAcademicLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [rows, setRows] = useState([createEmptyRow()]);
  const [skippedRows, setSkippedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    getAcademicYears().then((data) => setAcademicYears(data));
  }, []);

  const handleYearChange = (e) => {
    const yearId = e.target.value;
    setSelectedYearId(yearId);
    const yearObj = academicYears.find((y) => y.id === yearId);
    setSemesters(yearObj?.semesters || []);
    setSelectedSemesterId('');
  };

  const handleAddRow = () => {
    setRows([...rows, createEmptyRow()]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChangeRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async () => {
    if (!selectedSemesterId || !academicLevel) {
      setSnackbar({
        open: true,
        message: 'يجب تحديد الفصل والسنة الدراسية',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        semester_id: selectedSemesterId,
        academic_level: academicLevel,
        specialization: specialization || null,
        course_name: rows.map((r) => r.course_name),
        instructor_name: rows.map((r) => r.instructor_name),
        day: rows.map((r) => r.day),
        start_time: rows.map((r) => r.start_time),
        end_time: rows.map((r) => r.end_time),
        room: rows.map((r) => r.room),
        branch: rows.map((r) => r.branch || null),
      };

      const response = await addWorkSchedules(payload);

      // ✅ عرض الحصص المتجاهلة إذا وجدت (حتى لو في 201)
      if (response?.data?.skipped_conflicts?.length) {
        setSkippedRows(response.data.skipped_conflicts);
      } else {
        setSkippedRows([]);
      }

      setSnackbar({
        open: true,
        message: response?.data?.message || 'تم الإضافة بنجاح',
        severity: 'success',
      });
      setRows([createEmptyRow()]);
    } catch (error) {
      if (error?.data?.skipped_conflicts?.length) {
        setSkippedRows(error.data.skipped_conflicts);
      }
      setSnackbar({
        open: true,
        message: error?.data?.message || 'حدث خطأ أثناء الإرسال',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box p={3}>
      <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
        إضافة برنامج دوام جديد
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>📚 العام الدراسي</InputLabel>
            <Select
              value={selectedYearId}
              onChange={handleYearChange}
              label="العام الدراسي"
            >
              {academicYears.map((year) => (
                <MenuItem key={year.id} value={year.id}>
                  {year.year_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth disabled={!semesters.length}>
            <InputLabel>📖 الفصل الدراسي</InputLabel>
            <Select
              value={selectedSemesterId}
              onChange={(e) => setSelectedSemesterId(e.target.value)}
              label="الفصل الدراسي"
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.semesterName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>🎓 السنة الدراسية</InputLabel>
            <Select
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value)}
              label="السنة الدراسية"
            >
              {[1, 2, 3, 4, 5].map((y) => (
                <MenuItem key={y} value={y}>{`السنة ${y}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>🔧 الاختصاص</InputLabel>
            <Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              label="الاختصاص"
            >
              <MenuItem value="1">هندسة برمجيات</MenuItem>
              <MenuItem value="2">ذكاء اصطناعي</MenuItem>
              <MenuItem value="3">شبكات</MenuItem>
              <MenuItem value="">لا يوجد</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'اسم المادة',
                'اسم المدرس',
                'اليوم',
                'من',
                'إلى',
                'القاعة',
                'الشعبة',
                'خيارات',
              ].map((h) => (
                <TableCell key={h} align="center" sx={{ fontWeight: 'bold' }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {[
                  'course_name',
                  'instructor_name',
                  'day',
                  'start_time',
                  'end_time',
                  'room',
                  'branch',
                ].map((field, fieldIdx) => (
                  <TableCell key={fieldIdx} align="center">
                    <TextField
                      value={row[field]}
                      onChange={(e) =>
                        handleChangeRow(idx, field, e.target.value)
                      }
                      size="small"
                      select={field === 'day' || field === 'branch'}
                      type={
                        field === 'start_time' || field === 'end_time'
                          ? 'time'
                          : 'text'
                      }
                    >
                      {field === 'day' &&
                        DAYS.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      {field === 'branch' &&
                        BRANCHES.map((branch) => (
                          <MenuItem key={branch.value} value={branch.value}>
                            {branch.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(idx)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddRow}
                >
                  إضافة صف جديد
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        size="large"
        disabled={loading}
      >
        {loading ? 'جاري الحفظ...' : 'حفظ البرنامج'}
      </Button>

      {skippedRows.length > 0 && (
        <Box mt={4}>
          <Alert
            severity="error"
            variant="outlined"
            sx={{ alignItems: 'flex-start', borderRadius: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setSkippedRows([])}
              >
                إخفاء
              </Button>
            }
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ⚠️ لم يتم إضافة الحصص التالية بسبب التعارض:
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {skippedRows.map((item, idx) => (
                <Paper
                  key={idx}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#fff8f8',
                    borderColor: '#f44336',
                  }}
                >
                  <Typography>
                    <strong>📚 المادة:</strong> {item.course_name}
                  </Typography>
                  <Typography>
                    <strong>👨‍🏫 المدرس:</strong> {item.instructor}
                  </Typography>
                  <Typography>
                    <strong>📅 اليوم:</strong> {item.day}
                  </Typography>
                  <Typography>
                    <strong>⏰ الوقت:</strong> {item.start_time} -{' '}
                    {item.end_time}
                  </Typography>
                  <Typography>
                    <strong>🏫 القاعة:</strong> {item.room}
                  </Typography>
                  <Typography color="error" fontWeight="bold">
                    🚫 السبب: {item.reason}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Alert>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbar.message}
      />
    </Box>
  );
}
