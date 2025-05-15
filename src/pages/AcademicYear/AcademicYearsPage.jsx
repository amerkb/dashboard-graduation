import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  getAcademicYears,
  deleteAcademicYear,
  addAcademicYear,
} from '../../services/academicYears';
import Table from '../../components/GTable/Table';

export default function AcademicYearsPage() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newYearName, setNewYearName] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const loadYears = () => {
    setLoading(true);
    getAcademicYears()
      .then((list) => {
        setYears(list);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'خطأ في التحميل');
        setYears([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadYears, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    setLoadingDelete(true);
    try {
      await deleteAcademicYear(selectedId);
      setConfirmOpen(false);
      loadYears();
    } catch (err) {
      alert('فشل في حذف العام.');
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleAddYear = async () => {
    if (!newYearName.trim()) return;
    setLoadingAdd(true);
    try {
      await addAcademicYear({ year_name: newYearName });
      setNewYearName('');
      setOpenDialog(false);
      loadYears();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdd(false);
    }
  };

  const headers = [
    { id: 'year_name', label: 'اسم العام' },
    { id: 'workSchedule', label: 'برامج الدوام' },
    { id: 'examSchedule', label: 'برامج الإمتحانات' },
  ];

  const formatRows = years.map((year) => ({
    ...year,
    workSchedule: (
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {year.semesters.map((sem) => (
          <Chip
            key={sem.id}
            label={sem.semesterName}
            onClick={() => navigate(`/workSchedules?semester_id=${sem.id}`)}
            sx={{ m: 0.5 }}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    ),
    examSchedule: (
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {year.semesters.map((sem) => (
          <Chip
            key={sem.id}
            label={sem.semesterName}
            onClick={() => navigate(`/examSchedules?semester_id=${sem.id}`)}
            sx={{ m: 0.5 }}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    ),
  }));

  const renderActions = (row) => (
    <Tooltip title="حذف العام">
      <IconButton color="error" onClick={() => handleOpenConfirm(row.id)}>
        <Delete />
      </IconButton>
    </Tooltip>
  );

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          السنوات الأكاديمية
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          إضافة عام جديد
        </Button>
      </Box>

      {loading ? (
        <Box textAlign="center" pt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box color="error.main" p={2}>
          {error}
        </Box>
      ) : (
        <Table
          headers={headers}
          rows={formatRows}
          rowKey="id"
          action={renderActions}
        />
      )}

      {/* Dialog لإضافة عام جديد */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          إضافة عام أكاديمي جديد
        </DialogTitle>
        <DialogContent dividers sx={{ px: 3 }}>
          <TextField
            autoFocus
            margin="normal"
            label="اسم العام الأكاديمي"
            placeholder="مثال: العام الدراسي 2024-2025"
            fullWidth
            value={newYearName}
            onChange={(e) => setNewYearName(e.target.value)}
            variant="outlined"
            sx={{ '.MuiInputBase-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            color="error"
            sx={{ borderRadius: 2 }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            onClick={handleAddYear}
            disabled={!newYearName.trim() || loadingAdd}
            sx={{ borderRadius: 2 }}
          >
            {loadingAdd ? 'جاري الإضافة...' : 'إضافة'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog لتأكيد الحذف */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle fontWeight="bold" textAlign="center">
          ⚠️ تأكيد الحذف
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center" py={1}>
            هل أنت متأكد أنك تريد حذف هذا العام؟ لا يمكن التراجع عن هذه العملية.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2, minWidth: 100 }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loadingDelete}
            sx={{ borderRadius: 5, minWidth: 100 }}
          >
            {loadingDelete ? 'جار الحذف...' : 'تأكيد'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
