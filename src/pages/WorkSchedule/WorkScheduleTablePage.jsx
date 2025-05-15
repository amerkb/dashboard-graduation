import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkScheduleTable from '../../components/WorkSchedule/WorkScheduleTable';
import EditWorkScheduleModal from '../../components/WorkSchedule/EditWorkScheduleModal';
import { workSchedules, updateWorkSchedule } from '../../services/workSchedule';
import { Box, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function WorkScheduleTablePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const semester_id = params.get('semester_id');

  useEffect(() => {
    if (!semester_id) {
      setError('لم يتم تحديد الفصل الدراسي');
      return;
    }
    workSchedules(semester_id)
      .then((tableData) => {
        setData(tableData);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [semester_id]);

  const goBack = () => navigate('/academicYears');

  const handleEdit = (item) => {
    setSelectedRow(item);
    setEditDialogOpen(true);
  };

  const handleUpdateRow = async (updatedData) => {
    try {
      const response = await updateWorkSchedule(updatedData);
      const updated = response.data.data;

      setData((prev) => {
        const updatedData = { ...prev };
        Object.keys(updatedData).forEach((yearKey) => {
          if (Array.isArray(updatedData[yearKey])) {
            updatedData[yearKey] = updatedData[yearKey].map((item) =>
              item.id === updated.id ? updated : item,
            );
          } else {
            Object.keys(updatedData[yearKey]).forEach((spec) => {
              updatedData[yearKey][spec] = updatedData[yearKey][spec].map(
                (item) => (item.id === updated.id ? updated : item),
              );
            });
          }
        });
        return updatedData;
      });

      setSnackbar({
        open: true,
        message: 'تم تعديل الحصة بنجاح ✅',
        severity: 'success',
      });

      setEditDialogOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'فشل في تعديل الحصة ❌',
        severity: 'error',
      });
    }
  };

  return (
    <Box p={2}>
      <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 2 }}>
        رجوع إلى السنوات
      </Button>

      {data && (
        <WorkScheduleTable
          data={data}
          onEdit={handleEdit}
          onSave={handleUpdateRow}
        />
      )}

      <EditWorkScheduleModal
        open={editDialogOpen}
        data={selectedRow}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleUpdateRow}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
