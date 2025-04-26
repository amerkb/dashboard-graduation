import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddAnnouncementForm from '../../components/Announcement/AddAnnouncementForm';
import { showAnnouncement } from '../../services/announcementService';

const EditAnnouncementPage = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const yearMap = {
      'السنة الأولى': '1',
      'السنة الثانية': '2',
      'السنة الثالثة': '3',
      'السنة الرابعة': '4',
      'السنة الخامسة': '5',
      عام: '6',
    };

    const specializationMap = {
      'هندسة برمجيات': '1',
      'ذكاء اصطناعي': '2',
      شبكات: '3',
      عام: '4',
    };
    const fetchData = async () => {
      try {
        const res = await showAnnouncement(id);
        const data = res?.data?.data;

        if (data) {
          setAnnouncement({
            title: data.title || '',
            description: data.description || '',
            academic_year: yearMap[data.academicYearName] || '',
            specialization: specializationMap[data.specializationName] || '',
            images: data.images || [],
          });
        }
      } catch (err) {
        console.error('Failed to fetch announcement', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return null;
  if (!announcement) return null;

  return <AddAnnouncementForm editMode={true} defaultData={announcement} />;
};

export default EditAnnouncementPage;
