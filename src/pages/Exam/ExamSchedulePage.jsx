import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  getExamSchedule,
  updateExamSchedule,
} from '../../services/examSchedules';
import ExamScheduleTable from '../../components/Exam/ExamScheduleTable';
import EditExamScheduleModal from '../../components/Exam/EditExamScheduleModal';

export default function ExamSchedulePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const semester_id = params.get('semester_id');

  useEffect(() => {
    if (!semester_id) {
      setError('لم يتم تحديد الفصل الدراسي');
      setLoading(false);
      return;
    }

    getExamSchedule(semester_id)
      .then((tableData) => {
        setData(tableData);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [semester_id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await updateExamSchedule(formData);
      const updated = response.data.data;

      setData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(updatedData).forEach((level) => {
          if (Array.isArray(updatedData[level])) {
            updatedData[level] = updatedData[level].map((item) =>
              item.id === updated.id ? updated : item,
            );
          } else {
            Object.keys(updatedData[level]).forEach((spec) => {
              updatedData[level][spec] = updatedData[level][spec].map((item) =>
                item.id === updated.id ? updated : item,
              );
            });
          }
        });
        return updatedData;
      });

      setSnackbar({
        open: true,
        message: 'تم التعديل بنجاح ✅',
        severity: 'success',
      });
      setSelectedRow(null);
    } catch (err) {
      console.error('فشل التعديل', err);
      setSnackbar({
        open: true,
        message: 'فشل في التعديل ❌',
        severity: 'error',
      });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        📅 برنامج الإمتحانات
      </Typography>

      {loading && (
        <Box textAlign="center" py={5}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && !data && (
        <Typography textAlign="center" color="text.secondary">
          لا توجد بيانات متاحة
        </Typography>
      )}

      {data &&
        Object.keys(data).map((level) => (
          <Box
            key={level}
            mb={5}
            p={2}
            border="1px solid #ddd"
            borderRadius={2}
          >
            <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
              🎓 المستوى: {level}
            </Typography>

            {Array.isArray(data[level]) ? (
              <ExamScheduleTable data={data[level]} onSave={setSelectedRow} />
            ) : (
              Object.keys(data[level]).map((specialization) => (
                <Box
                  key={specialization}
                  mb={3}
                  p={2}
                  bgcolor="#f9f9f9"
                  borderRadius={1}
                >
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    🎯 الاختصاص: {specialization}
                  </Typography>
                  <ExamScheduleTable
                    data={data[level][specialization]}
                    onSave={setSelectedRow}
                  />
                </Box>
              ))
            )}
          </Box>
        ))}

      <EditExamScheduleModal
        open={Boolean(selectedRow)}
        data={selectedRow}
        onClose={() => setSelectedRow(false)}
        onSave={handleUpdate}
      />

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbar.message}
      />
    </Box>
  );
}
