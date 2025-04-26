import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobOpportunityForm from '../../components/JobOpportunity/AddJobOpportunityForm';
import { showJobOpportunity } from '../../services/jobService';

const EditJobOpportunityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobTypeMap = {
      'دوام كامل': '1',
      'دوام جزئي': '2',
      تدريب: '3',
      'عمل حر': '4',
      مؤقت: '5',
      'عن بُعد': '6',
    };

    const fetchData = async () => {
      try {
        const res = await showJobOpportunity(id);
        const data = res?.data?.data;

        if (data) {
          setJob({
            title: data.title || '',
            description: data.description || '',
            company: data.company || '',
            location: data.location || '',
            job_type: jobTypeMap[data.job_type_name] || '',
            images: data.images || [],
          });
        }
      } catch (err) {
        console.error('Failed to fetch job opportunity', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return null;
  if (!job) return null;

  return <JobOpportunityForm editMode={true} defaultData={job} />;
};

export default EditJobOpportunityPage;
