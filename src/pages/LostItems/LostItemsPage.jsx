import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getLostItems, addLostItem } from '../../services/lostItems';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FullWidthButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  fontSize: '1rem',
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export default function LostItemsPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date_of_loss: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [items, setItems] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getLostItems().then((res) => setItems(res.data));
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    setErrors({});
    const newErrors = {};
    if (!form.title) newErrors.title = 'العنوان مطلوب';
    if (!form.description) newErrors.description = 'الوصف مطلوب';
    if (!form.date_of_loss) newErrors.date_of_loss = 'تاريخ الفقدان مطلوب';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      await addLostItem(data);
      const updated = await getLostItems();
      setItems(updated.data);

      setSnackbar({
        open: true,
        message: '✅ تم إضافة المفقود بنجاح',
        severity: 'success',
      });

      setForm({ title: '', description: '', date_of_loss: '', image: null });
      setImagePreview(null);
    } catch (err) {
      setSnackbar({
        open: true,
        message: '❌ فشل في الإضافة',
        severity: 'error',
      });
      console.error('فشل الإضافة:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        إضافة مفقودات جديدة
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="العنوان"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title}
            InputProps={{ style: { fontSize: '1rem' } }}
            InputLabelProps={{ style: { fontSize: '1rem' } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="تاريخ الفقدان"
            type="date"
            value={form.date_of_loss}
            onChange={(e) => handleChange('date_of_loss', e.target.value)}
            fullWidth
            variant="outlined"
            error={!!errors.date_of_loss}
            helperText={errors.date_of_loss}
            InputLabelProps={{ shrink: true, style: { fontSize: '1rem' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="الوصف"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description}
            InputProps={{ style: { fontSize: '1rem' } }}
            InputLabelProps={{ style: { fontSize: '1rem' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button component="label" variant="outlined" fullWidth>
            اختر صورة
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imagePreview && (
            <Box mt={2} position="relative">
              <ImagePreview src={imagePreview} alt="Preview" />
              <IconButton
                size="small"
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#fff',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <FullWidthButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'جاري الإضافة...' : 'إضافة المفقود'}
          </FullWidthButton>
        </Grid>
      </Grid>

      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign={'center'}>
          قائمة المفقودات
        </Typography>

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                    image={item.image}
                    alt={item.title}
                  />

                )}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Chip
                    label={
                      item.status === 'Found'
                        ? 'تم العثور عليه'
                        : item.status === 'itWasReceived'
                          ? 'تم استلامه'
                          : 'مفقود'
                    }
                    color={
                      item.status === 'Found'
                        ? 'success'
                        : item.status === 'itWasReceived'
                          ? 'info'
                          : 'warning'
                    }
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    📅 {item.created_at}
                  </Typography>
                  <Box mt={2} textAlign="left">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/showLostItem/${item.id}`)}
                    >
                      عرض التفاصيل
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
