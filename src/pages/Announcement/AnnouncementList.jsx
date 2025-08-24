import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Alert,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { getAllAnnouncements } from '../../services/announcementService';
import { useNavigate } from 'react-router-dom';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAllAnnouncements();
        setAnnouncements(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        setError('فشل تحميل الإعلانات.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div >
      <Typography
        variant="h4"
        fontWeight="bold"
        className='my-10'
        sx={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)' }}
      >
        الإعلانات المنشورة
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={10} p={10}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4} my={'24px'} justifyContent="center">
          {announcements.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                sx={{ mt: 4, py: 10 }}
              >
                لا يوجد إعلانات متاحة حالياً
              </Typography>
            </Grid>
          ) : (
            announcements.map((announcement) => (
              <Grid item key={announcement.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 5,
                    boxShadow: 50,
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6 },
                  }}
                >
                  {announcement.images?.length > 0 && (
                    <CardMedia
                      component="img"
                      sx={{
                        height: 250,
                        objectFit: "cover",
                         borderTopLeftRadius: 12, borderTopRightRadius: 12 
                      }} image={announcement.images[0].image}
                      alt={announcement.title}
                    />
                  )}

                  <CardContent sx={{ px: 3, py: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {announcement.title}
                    </Typography>

                    <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                      {announcement.academicYearName && (
                        <Chip
                          label={announcement.academicYearName}
                          color="primary"
                          size="small"
                        />
                      )}

                      {announcement.specializationName &&
                        !['عام', 'السنة الأولى', 'السنة الثانية', 'السنة الثالثة'].includes(
                          announcement.academicYearName
                        ) && (
                          <Chip
                            label={announcement.specializationName}
                            color="secondary"
                            size="small"
                          />
                        )}
                    </Stack>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={2}
                    >
                      تم النشر: {announcement.created_at}
                    </Typography>

                    <Box textAlign="left">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/announcement/${announcement.id}`)}
                      >
                        عرض التفاصيل
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}

        </Grid>
      )}
    </div>
  );
};

export default AnnouncementList;
