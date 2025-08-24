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
  CardActionArea,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllJobOpportunities } from '../../services/jobService';

const JobOpportunityList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobOpportunities();
        setJobs(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        setError('فشل تحميل فرص العمل.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>

      <Typography
        variant="h4"
        fontWeight="bold"
        className='my-10'
        sx={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)' }}
      >
        فرص العمل المتاحة
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" my={10} p={10}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container my={'24px'} spacing={3} justifyContent="start">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/jobOpportunity/${job.id}`)}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={job.images?.[0]?.image || 'https://via.placeholder.com/300x200?text=Job'}
                        alt={job.title}
                        sx={{
                          height: 250,
                          objectFit: "cover",
                          borderTopLeftRadius: 12, borderTopRightRadius: 12
                        }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          px: 2,
                          py: 1,
                        }}
                      >
                        <Typography variant="subtitle1" noWrap>
                          {job.title}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        mb={1}
                        justifyContent="center"
                        alignItems="center"
                        gap={4}
                        flexWrap="wrap"
                      >
                        {job.job_type_name && (
                          <Chip label={job.job_type_name} color="primary" size="small" />
                        )}
                        <Chip
                          label={job.is_expired ? '🔴 منتهية' : '🟢 فعالة'}
                          color={job.is_expired ? 'error' : 'success'}
                          size="small"
                        />
                      </Stack>

                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {job.created_at}
                      </Typography>

                      <Box textAlign="left">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          endIcon={<i className="fas fa-arrow-left"></i>}
                        >
                          عرض التفاصيل
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="text.secondary" sx={{ my: 4 }}>
                🚫 لا توجد وظائف متاحة حالياً
              </Typography>
            </Grid>
          )}

        </Grid>
      )}
    </div>
  );
};

export default JobOpportunityList;
