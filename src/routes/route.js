import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/login';
import Students from '../pages/students/index.jsx';
import Statistics from '../pages/statistics/index.jsx';
import Container from '../ui/layout/Container.jsx';
import AddAnnouncementPage from '../pages/Announcement/AddAnnouncementPage';
import AnnouncementList from '../pages/Announcement/AnnouncementList.jsx';
import AnnouncementDetailsPage from '../pages/Announcement/AnnouncementDetails.jsx';
import EditAnnouncementPage from '../pages/Announcement/EditAnnouncementPage.jsx';
import AddJobOpportunityPage from '../pages/JobOpportunity/AddJobOpportunityPage.jsx';
import JobOpportunityList from '../pages/JobOpportunity/JobOpportunityList.jsx';
import JobOpportunityDetail from '../pages/JobOpportunity/JobOpportunityDetail.jsx';
import EditJobOpportunityPage from '../pages/JobOpportunity/EditJobOpportunity.jsx';
import WorkScheduleTablePage from '../pages/WorkSchedule/WorkScheduleTablePage';
import AcademicYearsPage from '../pages/AcademicYear/AcademicYearsPage.jsx';
import WorkScheduleAddPage from '../pages/WorkSchedule/WorkScheduleAddPage.jsx';
import ExamScheduleTable from '../components/Exam/ExamScheduleTable.jsx';
import ExamSchedulePage from '../pages/Exam/ExamSchedulePage.jsx';
import ExamScheduleAddPage from '../pages/Exam/ExamScheduleAddPage.jsx';

export default function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Statistics />} />
      <Route path="/students" element={<Container content={<Students />} />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/announcements/add" element={<AddAnnouncementPage />} />
      <Route path="/announcements" element={<AnnouncementList />} />
      <Route path="/announcement/:id" element={<AnnouncementDetailsPage />} />
      <Route path="/announcement/edit/:id" element={<EditAnnouncementPage />} />

      <Route path="/jobOpportunity/add" element={<AddJobOpportunityPage />} />
      <Route path="/jobOpportunities" element={<JobOpportunityList />} />
      <Route path="/jobOpportunity/:id" element={<JobOpportunityDetail />} />
      <Route
        path="/jobOpportunity/edit/:id"
        element={<EditJobOpportunityPage />}
      />

      <Route path="/academicYears" element={<AcademicYearsPage />} />
      <Route path="/workSchedules" element={<WorkScheduleTablePage />} />
      <Route path="/workSchedules/add" element={<WorkScheduleAddPage />} />

      <Route path="/examSchedules" element={<ExamSchedulePage />} />
      <Route path="/examSchedules/add" element={<ExamScheduleAddPage />} />
    </Routes>
  );
}
