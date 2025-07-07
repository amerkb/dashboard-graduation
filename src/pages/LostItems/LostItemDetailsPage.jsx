import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getLostItemById,
  deleteLostItem,
  updateLostItem,
} from '../../services/lostItems';
import { px } from 'framer-motion';

const StatusChip = ({ status }) => {
  let label = 'مفقود';
  let color = 'warning';
  if (status === 'Found') {
    label = 'تم العثور عليه';
    color = 'success';
  } else if (status === 'itWasReceived') {
    label = 'تم استلامه';
    color = 'info';
  }
  return <Chip label={label} color={color} sx={{ mb: 1 }} />;
};

const CommentItem = ({ comment, isReply = false }) => (
  <Box
    mt={isReply ? 1 : 2}
    ml={isReply ? 4 : 0}
    p={2}
    sx={{
      bgcolor: '#fdfdfd',
      border: '1px solid #eee',
      borderRadius: 2,
      boxShadow: isReply ? 0 : 1,
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2} mb={1}>
      <Avatar src={comment.profileImage} alt={comment.full_name} />
      <Box>
        <Typography fontWeight="bold">{comment.full_name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {comment.created_at}
        </Typography>
      </Box>
    </Stack>

    <Typography mb={1} sx={{ whiteSpace: 'pre-line' }}>
      {comment.comment}
    </Typography>

    {comment.image && (
      <CardMedia
        component="img"
        image={comment.image}
        alt="comment attachment"
        sx={{
          borderRadius: 2,
          border: '1px solid #ddd',
          maxHeight: 250,
          maxWidth: '100%',
          objectFit: 'contain',
          mb: 1,
        }}
      />
    )}

    {comment.replies?.length > 0 && (
      <Box mt={2}>
        {comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </Box>
    )}
  </Box>
);

export default function LostItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_of_loss: '',
    status: '',
    image: null,
    existingImage: '',
  });
  const [saving, setSaving] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    getLostItemById(id)
      .then((res) => {
        const data = res.data.data;
        setItem(data);
        setFormData({
          title: data.title,
          description: data.description,
          date_of_loss: data.date_of_loss,
          status: data.status,
          image: null,
          existingImage: data.image,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteLostItem(id);
      setSnackbarMessage('تم الحذف بنجاح');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/lostItems'), 2000);
    } catch {
      setSnackbarMessage('فشل في الحذف');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date_of_loss', formData.date_of_loss);
    data.append('status', formData.status);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await updateLostItem(id, data);
      const updated = await getLostItemById(id);
      setItem(updated.data.data);
      setEditOpen(false);
      setSnackbarMessage('تم التعديل بنجاح');
      setSnackbarSeverity('success');
    } catch {
      setSnackbarMessage('فشل التعديل');
      setSnackbarSeverity('error');
    } finally {
      setSaving(false);
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemovePreview = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Typography textAlign="center">❌ لم يتم العثور على المفقود</Typography>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden' }}>
            {item.image ? (
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ maxHeight: 350, objectFit: 'cover' }}
              />
            ) : (
              <Box
                height={200}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ bgcolor: '#f0f0f0' }}
              >
                <ImageIcon sx={{ fontSize: 60, color: 'gray' }} />
              </Box>
            )}

            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>
              <StatusChip status={item.status} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                📅 تاريخ الفقدان: {item.date_of_loss}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🕒 تم الإضافة: {item.created_at}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography>{item.description}</Typography>

              <Box mt={3} display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon sx={{ ml: 1 }} />}
                  onClick={() => setEditOpen(true)}
                >
                  تعديل
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon sx={{ ml: 1 }} />}
                  onClick={() => setConfirmOpen(true)}
                >
                  حذف
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2} fontSize={'90px'} textAlign={"center"} >
            💬 التعليقات
          </Typography>
          {item.comments?.length > 0 ? (
            item.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <Typography color="text.secondary">لا توجد تعليقات بعد.</Typography>
          )}
        </Grid>
      </Grid>

      {/* Dialog التأكيد */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle fontWeight="bold">⚠️ تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>هل أنت متأكد أنك تريد حذف هذا العنصر؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined" sx={{ ml: 2 }}>
            إلغاء
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog التعديل */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>
          تعديل المفقود
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleEditSubmit}
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              mt: 1,
            }}
          >
            <TextField
              label="العنوان"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="date"
              name="date_of_loss"
              value={formData.date_of_loss}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="الوصف"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              sx={{ gridColumn: '1 / -1' }}
            />
            <TextField
              select
              name="status"
              label="الحالة"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="notFound">مفقود</MenuItem>
              <MenuItem value="Found">تم العثور عليه</MenuItem>
              <MenuItem value="itWasReceived">تم استلامه</MenuItem>
            </TextField>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="subtitle2" gutterBottom>
                الصورة الحالية:
              </Typography>

              {previewImage ? (
                <Box>
                  <Card sx={{ maxWidth: 300, position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={previewImage}
                      sx={{ maxHeight: 150, objectFit: 'contain' }}
                    />
                  </Card>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleRemovePreview}
                    sx={{ mt: 1 }}
                  >
                    🗑 إلغاء الصورة المختارة
                  </Button>
                </Box>
              ) : formData.existingImage ? (
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    image={formData.existingImage}
                    sx={{ maxHeight: 150, objectFit: 'contain' }}
                  />
                </Card>
              ) : (
                <Typography color="text.secondary">لا توجد صورة</Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              component="label"
              sx={{ gridColumn: '1 / -1' }}
            >
              اختر صورة جديدة
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2  }}>
          <Button
            onClick={() => setEditOpen(false)}
            color="error"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            onClick={handleEditSubmit}
            color="primary"
            variant="contained"
            disabled={saving}
          >
            {saving ? 'جاري التعديل...' : 'حفظ التعديلات'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}