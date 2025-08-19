import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import Students from "../pages/students";
import Statistics from "../pages/statistics";
import Container from "../ui/layout/Container";
import AddAnnouncementPage from "../pages/Announcement/AddAnnouncementPage";
import AnnouncementList from "../pages/Announcement/AnnouncementList";
import AnnouncementDetailsPage from "../pages/Announcement/AnnouncementDetails";
import EditAnnouncementPage from "../pages/Announcement/EditAnnouncementPage";
import AddJobOpportunityPage from "../pages/JobOpportunity/AddJobOpportunityPage";
import JobOpportunityList from "../pages/JobOpportunity/JobOpportunityList";
import JobOpportunityDetail from "../pages/JobOpportunity/JobOpportunityDetail";
import EditJobOpportunityPage from "../pages/JobOpportunity/EditJobOpportunity";
import WorkScheduleTablePage from "../pages/WorkSchedule/WorkScheduleTablePage";
import AcademicYearsPage from "../pages/AcademicYear/AcademicYearsPage";
import WorkScheduleAddPage from "../pages/WorkSchedule/WorkScheduleAddPage";
import ExamSchedulePage from "../pages/Exam/ExamSchedulePage";
import ExamScheduleAddPage from "../pages/Exam/ExamScheduleAddPage";
import LostItemsPage from "../pages/LostItems/LostItemsPage";
import LostItemDetailsPage from "../pages/LostItems/LostItemDetailsPage";
import ProtectedRoute from "./ProtectedRoute"; // ✅ import

function ContainerLayout() {
  return <Container content={<Outlet />} />;
}

export default function ApplicationRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ContainerLayout />}>
          <Route path="/" element={<Statistics />} />
          <Route path="/students" element={<Students />} />

          <Route path="/announcements/add" element={<AddAnnouncementPage />} />
          <Route path="/announcements" element={<AnnouncementList />} />
          <Route path="/announcement/:id" element={<AnnouncementDetailsPage />} />
          <Route path="/announcement/edit/:id" element={<EditAnnouncementPage />} />

          <Route path="/jobOpportunity/add" element={<AddJobOpportunityPage />} />
          <Route path="/jobOpportunities" element={<JobOpportunityList />} />
          <Route path="/jobOpportunity/:id" element={<JobOpportunityDetail />} />
          <Route path="/jobOpportunity/edit/:id" element={<EditJobOpportunityPage />} />

          <Route path="/academicYears" element={<AcademicYearsPage />} />
          <Route path="/workSchedules" element={<WorkScheduleTablePage />} />
          <Route path="/workSchedules/add" element={<WorkScheduleAddPage />} />

          <Route path="/examSchedules" element={<ExamSchedulePage />} />
          <Route path="/examSchedules/add" element={<ExamScheduleAddPage />} />

          <Route path="/lostItems" element={<LostItemsPage />} />
          <Route path="/showLostItem/:id" element={<LostItemDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
