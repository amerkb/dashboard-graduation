import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const BRANCHES = [
  { value: '1', label: 'الشعبة الأولى' },
  { value: '2', label: 'الشعبة الثانية' },
  { value: '3', label: 'الشعبة الثالثة' },
  { value: '', label: 'بدون شعبة' },
];

export default function EditWorkScheduleModal({ open, onClose, onSave, data }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (typeof onSave === 'function') {
      setLoading(true);
      try {
        await onSave(form);
      } catch (e) {
        console.error('فشل أثناء التعديل:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold" textAlign="center">
        تعديل الحصة
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم المادة"
              value={form.course_name || ''}
              onChange={(e) => handleChange('course_name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم المدرس"
              value={form.instructor_name || ''}
              onChange={(e) => handleChange('instructor_name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>اليوم</InputLabel>
              <Select
                value={form.day || ''}
                label="اليوم"
                onChange={(e) => handleChange('day', e.target.value)}
              >
                {DAYS.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="من"
              type="time"
              value={form.start_time || ''}
              onChange={(e) => handleChange('start_time', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="إلى"
              type="time"
              value={form.end_time || ''}
              onChange={(e) => handleChange('end_time', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="القاعة"
              value={form.room || ''}
              onChange={(e) => handleChange('room', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>الشعبة</InputLabel>
              <Select
                value={form.branch || ''}
                label="الشعبة"
                onChange={(e) => handleChange('branch', e.target.value)}
              >
                {BRANCHES.map((b) => (
                  <MenuItem key={b.value} value={b.value}>
                    {b.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button variant="outlined" color="error" onClick={onClose}>
          {' '}
          إلغاء{' '}
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'جاري التعديل...' : 'حفظ التعديلات'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
