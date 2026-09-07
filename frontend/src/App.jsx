import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider, useLocation } from "./context/LocationContext";
import { NotificationProvider } from "./context/NotificationContext";

import ProtectedRoute from "./components/common/ProtectedRoute";

// Public
import LocationGate from "./pages/LocationGate";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";

// Citizen
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitProblem from "./pages/citizen/SubmitProblem";
import MyProblems from "./pages/citizen/MyProblems";
import ProblemDetails from "./pages/citizen/ProblemDetails";

// Government
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import GovernmentAnalytics from "./pages/government/GovernmentAnalytics";
import ProblemValidation from "./pages/government/ProblemValidation";
import ProblemRouting from "./pages/government/ProblemRouting";

// University
import UniversityDashboard from "./pages/university/UniversityDashboard";
import StudentDashboard from "./pages/university/StudentDashboard";
import FacultyDashboard from "./pages/university/FacultyDashboard";
import UniversityAdminDashboard from "./pages/university/UniversityAdminDashboard";
import Projects from "./pages/university/Projects";

// Industry
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import IndustryProjects from "./pages/industry/IndustryProjects";

// Projects
import ProjectDetails from "./pages/projects/ProjectDetails";
import ProjectWorkspace from "./pages/projects/ProjectWorkspace";


function AppContent() {
  const { isGranted } = useLocation();

  return (
    <>
      {/* Main Portal */}
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/login/:portal"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* CITIZEN */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/citizen/submit"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <SubmitProblem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/citizen/problems"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <MyProblems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/citizen/problems/:id"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <ProblemDetails />
            </ProtectedRoute>
          }
        />

        {/* GOVERNMENT */}
        <Route
          path="/government"
          element={
            <ProtectedRoute allowedRoles={["GOVERNMENT"]}>
              <GovernmentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government/analytics"
          element={
            <ProtectedRoute allowedRoles={["GOVERNMENT"]}>
              <GovernmentAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government/validation"
          element={
            <ProtectedRoute allowedRoles={["GOVERNMENT"]}>
              <ProblemValidation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government/routing"
          element={
            <ProtectedRoute allowedRoles={["GOVERNMENT"]}>
              <ProblemRouting />
            </ProtectedRoute>
          }
        />

        {/* UNIVERSITY */}
        <Route
          path="/university"
          element={
            <ProtectedRoute
              allowedRoles={[
                "UNIVERSITY_STUDENT",
                "UNIVERSITY_MENTOR",
                "UNIVERSITY_AUTHORITY",
              ]}
            >
              <UniversityDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/university/student"
          element={
            <ProtectedRoute allowedRoles={["UNIVERSITY_STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/university/faculty"
          element={
            <ProtectedRoute allowedRoles={["UNIVERSITY_MENTOR"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/university/admin"
          element={
            <ProtectedRoute allowedRoles={["UNIVERSITY_AUTHORITY"]}>
              <UniversityAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/university/projects"
          element={
            <ProtectedRoute
              allowedRoles={[
                "UNIVERSITY_STUDENT",
                "UNIVERSITY_MENTOR",
                "UNIVERSITY_AUTHORITY",
              ]}
            >
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* INDUSTRY */}
        <Route
          path="/industry"
          element={
            <ProtectedRoute allowedRoles={["INDUSTRY"]}>
              <IndustryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/industry/projects"
          element={
            <ProtectedRoute allowedRoles={["INDUSTRY"]}>
              <IndustryProjects />
            </ProtectedRoute>
          }
        />

        {/* PROJECTS */}
        <Route
          path="/project-details"
          element={
            <ProtectedRoute
              allowedRoles={[
                "UNIVERSITY_STUDENT",
                "UNIVERSITY_MENTOR",
                "UNIVERSITY_AUTHORITY",
                "INDUSTRY",
              ]}
            >
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project-workspace"
          element={
            <ProtectedRoute
              allowedRoles={[
                "UNIVERSITY_STUDENT",
                "UNIVERSITY_MENTOR",
                "UNIVERSITY_AUTHORITY",
                "INDUSTRY",
              ]}
            >
              <ProjectWorkspace />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      {/* Location Popup */}
      {!isGranted && <LocationGate />}
    </>
  );
}


function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;