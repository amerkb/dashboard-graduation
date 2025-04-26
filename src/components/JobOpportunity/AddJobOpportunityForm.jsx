import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Modal,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  createJobOpportunity,
  updateJobOpportunity,
} from '../../services/jobService';

const jobTypes = {
  1: 'دوام كامل',
  2: 'دوام جزئي',
  3: 'تدريب',
  4: 'عمل حر',
  5: 'مؤقت',
  6: 'عن بُعد',
};

const JobOpportunityForm = ({ editMode = false, defaultData = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    job_type: '',
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImageIndex, setPreviewImageIndex] = useState(null); // 👈 بدلاً من صورة واحدة، نخزن رقم الصورة
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && defaultData) {
      setForm({
        title: defaultData.title || '',
        description: defaultData.description || '',
        company: defaultData.company || '',
        location: defaultData.location || '',
        job_type: String(defaultData.job_type || ''),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    images.forEach((img) => formData.append('images[]', img));

    if (editMode) {
      formData.append('_method', 'post');
      existingImages.forEach((img) => {
        formData.append('keepImages[]', img.id);
      });
    }

    try {
      if (editMode) {
        await updateJobOpportunity(id, formData);
        setSnackbar({
          open: true,
          message: '✅ تم تحديث الفرصة بنجاح',
          severity: 'success',
        });
      } else {
        await createJobOpportunity(formData);
        setSnackbar({
          open: true,
          message: '✅ تم إضافة الفرصة بنجاح',
          severity: 'success',
        });
      }
      setTimeout(() => navigate('/jobOpportunities'), 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: '❌ حدث خطأ أثناء الحفظ',
        severity: 'error',
      });
    }
  };

  const openPreview = (index) => {
    setPreviewImageIndex(index);
  };

  const closePreview = () => {
    setPreviewImageIndex(null);
  };

  const nextImage = () => {
    const total = existingImages.length + images.length;
    setPreviewImageIndex((prev) => (prev + 1) % total);
  };

  const prevImage = () => {
    const total = existingImages.length + images.length;
    setPreviewImageIndex((prev) => (prev - 1 + total) % total);
  };

  const getAllImages = () => {
    return [
      ...existingImages.map((img) => img.image),
      ...images.map((img) => URL.createObjectURL(img)),
    ];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{ p: 5, maxWidth: 850, mx: 'auto', my: 5, direction: 'rtl' }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        {editMode ? '✏️ تعديل فرصة العمل' : '🧾 إضافة فرصة عمل جديدة'}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="عنوان الفرصة"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="الوصف"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            label="اسم الشركة"
            name="company"
            fullWidth
            value={form.company}
            onChange={handleChange}
          />
          <TextField
            label="الموقع"
            name="location"
            fullWidth
            value={form.location}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel>نوع الفرصة</InputLabel>
            <Select
              name="job_type"
              value={form.job_type}
              onChange={handleChange}
              label="نوع الفرصة"
            >
              {Object.entries(jobTypes).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            component="label"
            color="secondary"
            startIcon={<AddPhotoAlternateIcon />}
          >
            رفع الصور ({images.length})
            <input hidden multiple type="file" onChange={handleImageChange} />
          </Button>

          {/* عرض جميع الصور */}
          <Grid container spacing={2}>
            {existingImages.map((img, idx) => (
              <Grid item xs={4} sm={3} md={2} key={`existing-${idx}`}>
                <Box position="relative">
                  <img
                    src={img.image}
                    alt={`existing-img-${idx}`}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                    onClick={() => openPreview(idx)}
                  />
                  <IconButton
                    onClick={() => removeExistingImage(idx)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: 'red',
                      backgroundColor: 'white',
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
                    alt={`new-img-${idx}`}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                    onClick={() => openPreview(existingImages.length + idx)}
                  />
                  <IconButton
                    onClick={() => removeNewImage(idx)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: 'red',
                      backgroundColor: 'white',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
          >
            {editMode ? '✅ تحديث الفرصة' : '✅ نشر الفرصة'}
          </Button>
        </Stack>
      </Box>

      {/* مودال عرض الصور */}
      <Modal open={previewImageIndex !== null} onClose={closePreview}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            outline: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        >
          {previewImageIndex !== null && (
            <Box position="relative">
              <img
                src={getAllImages()[previewImageIndex]}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block',
                  borderRadius: 8,
                  margin: 'auto',
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

export default JobOpportunityForm;
