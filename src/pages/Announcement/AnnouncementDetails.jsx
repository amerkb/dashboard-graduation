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
  showAnnouncement,
  deleteAnnouncement,
} from '../../services/announcementService';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await showAnnouncement(id);
        setAnnouncement(res?.data?.data || null);
      } catch (err) {
        setError('فشل في تحميل بيانات الإعلان.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAnnouncement(id);
      navigate('/announcements');
    } catch (err) {
      alert('فشل في حذف الإعلان.');
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

  if (!announcement) return null;

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
            تفاصيل الإعلان
          </Typography>
          <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="warning"
              sx={{ borderRadius: 3, fontWeight: 'bold', px: 3 }}
              onClick={() => navigate(`/announcement/edit/${id}`)}
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
          </Stack>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {announcement.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {announcement.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          {announcement.academicYearName && (
            <Chip label={announcement.academicYearName} color="primary" />
          )}
          {announcement.specializationName &&
            !['عام', 'السنة الأولى', 'السنة الثانية', 'السنة الثالثة'].includes(
              announcement.academicYearName,
            ) && (
              <Chip label={announcement.specializationName} color="secondary" />
            )}
        </Box>

        <Typography variant="caption" color="text.secondary">
          تم النشر: {announcement.created_at}
        </Typography>

        <Grid container spacing={2} mt={2}>
          {announcement.images?.map((img, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={img.image}
                  alt={`announcement-image-${idx}`}
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
            هل أنت متأكد أنك تريد حذف هذا الإعلان؟ لا يمكن التراجع عن هذه
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

export default AnnouncementDetail;
