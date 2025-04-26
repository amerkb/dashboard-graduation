import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
  Modal,
  Grid,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  createAnnouncement,
  updateAnnouncement,
} from '../../services/announcementService';
import { useParams, useNavigate } from 'react-router-dom';

const AddAnnouncementForm = ({ editMode = false, defaultData = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    academic_year: '',
    specialization: '',
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [previewType, setPreviewType] = useState('existing');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (editMode && defaultData) {
      setForm({
        title: defaultData.title || '',
        description: defaultData.description || '',
        academic_year: String(defaultData.academic_year || ''),
        specialization: String(defaultData.specialization || ''),
      });
      setExistingImages(defaultData.images || []);
    }
  }, [editMode, defaultData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openPreview = (index, type) => {
    setPreviewIndex(index);
    setPreviewType(type);
  };

  const closePreview = () => {
    setPreviewIndex(null);
  };

  const nextImage = () => {
    if (previewType === 'existing') {
      if (previewIndex < existingImages.length - 1) {
        setPreviewIndex(previewIndex + 1);
      }
    } else {
      if (previewIndex < images.length - 1) {
        setPreviewIndex(previewIndex + 1);
      }
    }
  };

  const prevImage = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  const getPreviewImage = () => {
    if (previewType === 'existing') {
      return existingImages[previewIndex]?.image || '';
    } else {
      return images[previewIndex]
        ? URL.createObjectURL(images[previewIndex])
        : '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== '') formData.append(key, value);
    });

    images.forEach((img) => {
      formData.append('images[]', img);
    });

    if (editMode) {
      formData.append('_method', 'post');
      existingImages.forEach((img) => {
        formData.append('keepImages[]', img.id);
      });
    }

    try {
      if (editMode) {
        await updateAnnouncement(id, formData);
        setSnackbar({
          open: true,
          message: '✅ تم تعديل الإعلان بنجاح',
          severity: 'success',
        });
      } else {
        await createAnnouncement(formData);
        setSnackbar({
          open: true,
          message: '✅ تم إرسال الإعلان بنجاح',
          severity: 'success',
        });
      }

      setForm({
        title: '',
        description: '',
        academic_year: '',
        specialization: '',
      });
      setImages([]);
      setExistingImages([]);
      setTimeout(() => navigate('/announcements'), 1000);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: '❌ حدث خطأ أثناء الإرسال',
        severity: 'error',
      });
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{ p: 5, maxWidth: 850, mx: 'auto', mt: 5, direction: 'rtl' }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        {editMode ? '📝 تعديل الإعلان' : '📝 إضافة إعلان جديد'}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="title"
            label="📌 عنوان الإعلان"
            value={form.title}
            onChange={handleChange}
            dir="rtl"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="📝 وصف الإعلان"
            value={form.description}
            onChange={handleChange}
            dir="rtl"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>🎓 السنة الدراسية</InputLabel>
                <Select
                  name="academic_year"
                  value={form.academic_year}
                  onChange={handleChange}
                  label="السنة الدراسية"
                >
                  <MenuItem value="1">السنة الأولى</MenuItem>
                  <MenuItem value="2">السنة الثانية</MenuItem>
                  <MenuItem value="3">السنة الثالثة</MenuItem>
                  <MenuItem value="4">السنة الرابعة</MenuItem>
                  <MenuItem value="5">السنة الخامسة</MenuItem>
                  <MenuItem value="6">عام</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>🔧 الاختصاص</InputLabel>
                <Select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  label="الاختصاص"
                >
                  <MenuItem value="1">هندسة برمجيات</MenuItem>
                  <MenuItem value="2">ذكاء اصطناعي</MenuItem>
                  <MenuItem value="3">شبكات</MenuItem>
                  <MenuItem value="4">عام</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button variant="contained" component="label" color="secondary">
            📷 رفع الصور ({images.length})
            <input hidden multiple type="file" onChange={handleImageChange} />
          </Button>

          {/* عرض الصور */}
          <Grid container spacing={2}>
            {existingImages.map((img, idx) => (
              <Grid item xs={4} sm={3} md={2} key={`existing-${idx}`}>
                <Box position="relative">
                  <img
                    src={img.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                    }}
                    onClick={() => openPreview(idx, 'existing')}
                  />
                  <IconButton
                    onClick={() => removeExistingImage(idx)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: 'red',
                      bgcolor: 'white',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
            {images.map((img, idx) => (
              <Grid item xs={4} sm={3} md={2} key={`new-${idx}`}>
                <Box position="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    style={{
                      width: '100%',
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                    }}
                    onClick={() => openPreview(idx, 'new')}
                  />
                  <IconButton
                    onClick={() => removeNewImage(idx)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: 'red',
                      bgcolor: 'white',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            size="large"
          >
            {editMode ? '💾 تعديل الإعلان' : '📢 نشر الإعلان'}
          </Button>
        </Stack>
      </Box>

      {/* Modal معاينة الصورة */}
      <Modal open={previewIndex !== null} onClose={closePreview}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 2,
            boxShadow: 24,
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        >
          {previewIndex !== null && (
            <Box position="relative">
              <img
                src={getPreviewImage()}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block',
                  margin: 'auto',
                  borderRadius: 10,
                }}
              />
              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddAnnouncementForm;
