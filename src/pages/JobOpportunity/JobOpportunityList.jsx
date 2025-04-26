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
    <Container sx={{ mt: 5, direction: 'rtl' }}>
      <Typography variant="h4" align="center" fontWeight="bold" mb={3}>
        فرص العمل المتاحة
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {jobs.map((job) => (
            <Grid item key={job.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 50,
                  borderRadius: 5,
                  transition: '0.3s',
                  '&:hover': { boxShadow: 6 },
                }}
              >
                {job.images?.length > 0 && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={job.images[0].image}
                    alt={job.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" align="right" gutterBottom>
                    {job.title}
                  </Typography>

                  {job.job_type_name && (
                    <Chip
                      label={job.job_type_name}
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                  )}

                  <Chip
                    label={job.is_expired ? '🔴 منتهية' : '🟢 فعالة'}
                    color={job.is_expired ? 'error' : 'success'}
                    sx={{ mb: 1 }}
                  />

                  <Typography variant="caption" display="block" align="left">
                    {job.created_at}
                  </Typography>

                  <Box mt={2} textAlign="left">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/jobOpportunity/${job.id}`)}
                    >
                      عرض التفاصيل
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobOpportunityList;
