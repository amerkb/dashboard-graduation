import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  Paper,
  Divider,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  showJobOpportunity,
  deleteJobOpportunity,
  switchJobIsExpired,
} from '../../services/jobService';

const JobOpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await showJobOpportunity(id);
        setJob(res?.data?.data || null);
      } catch (err) {
        setError('فشل في تحميل بيانات الفرصة.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteJobOpportunity(id);
      navigate('/jobOpportunities');
    } catch (err) {
      alert('فشل في حذف الفرصة.');
    }
  };

  const handleToggleExpired = async () => {
    try {
      await switchJobIsExpired(id);

      const res = await showJobOpportunity(id);
      setJob(res?.data?.data || null);
    } catch (err) {
      alert('فشل في تحديث حالة الفرصة.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!job) return null;

  return (
    <Container sx={{ mt: 5, direction: 'rtl' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            تفاصيل الفرصة
          </Typography>
          <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="warning"
              sx={{ borderRadius: 3, fontWeight: 'bold', px: 3 }}
              onClick={() => navigate(`/jobOpportunity/edit/${id}`)}
            >
              ✏️ تعديل
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: 3, fontWeight: 'bold', px: 3 }}
              onClick={() => setConfirmOpen(true)}
            >
              🗑️ حذف
            </Button>
            <Button
              variant="contained"
              color={job.is_expired ? 'error' : 'success'}
              sx={{ borderRadius: 3, fontWeight: 'bold', px: 3 }}
              onClick={handleToggleExpired}
            >
              {job.is_expired ? '🔴 منتهية - تفعيل' : '🟢 فعّالة - تعطيل'}
            </Button>
          </Stack>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {job.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          {job.company && <Chip label={`🏢 ${job.company}`} color="primary" />}
          {job.location && (
            <Chip label={`📍 ${job.location}`} color="secondary" />
          )}
          {job.job_type_name && <Chip label={job.job_type_name} color="info" />}
        </Box>

        <Typography variant="caption" color="text.secondary">
          تم النشر: {job.created_at}
        </Typography>

        <Grid container spacing={2} mt={2}>
          {job.images?.map((img, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={img.image}
                  alt={`job-image-${idx}`}
                  sx={{ borderRadius: 2, height: 300, objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle fontWeight="bold">⚠️ تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد أنك تريد حذف هذه الفرصة؟ لا يمكن التراجع عن هذه
            العملية.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">
            إلغاء
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobOpportunityDetail;
