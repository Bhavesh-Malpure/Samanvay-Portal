import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { NotificationProvider } from "./context/NotificationContext";

import LocationGate from "./pages/LocationGate";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Citizen
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitProblem from "./pages/citizen/SubmitProblem";
import MyProblems from "./pages/citizen/MyProblems";
import ProblemDetails from "./pages/citizen/ProblemDetails";

// Government
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import ProblemValidation from "./pages/government/ProblemValidation";
import ProblemRouting from "./pages/government/ProblemRouting";

// University
import UniversityDashboard from "./pages/university/UniversityDashboard";
import StudentDashboard from "./pages/university/StudentDashboard";
import FacultyDashboard from "./pages/university/FacultyDashboard";
import UniversityAdminDashboard from "./pages/university/UniversityAdminDashboard";
import Projects from "./pages/university/Projects";

// University Workspaces
import StudentWorkspace from "./components/university/StudentWorkspace";
import FacultyWorkspace from "./components/university/FacultyWorkspace";
import UniversityAdmin from "./components/university/UniversityAdmin";
import TeamManagement from "./components/university/TeamManagement";
import ProjectAllocation from "./components/university/ProjectAllocation";

// Industry
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import IndustryProjects from "./pages/industry/IndustryProjects";

// Industry Components
import IndustryProfile from "./components/industry/IndustryProfile";
import CollaborationRequests from "./components/industry/CollaborationRequests";

// Project System
import ProjectWorkspace from "./pages/projects/ProjectWorkspace";
import ProjectDetails from "./pages/projects/ProjectDetails";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <Routes>

            {/* =================================================
                ENTRY
                ================================================= */}

            <Route
              path="/location"
              element={<LocationGate />}
            />

            <Route
              path="/"
              element={<LandingPage />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* =================================================
                CITIZEN
                ================================================= */}

            <Route
              path="/citizen"
              element={<CitizenDashboard />}
            />

            <Route
              path="/citizen/submit"
              element={<SubmitProblem />}
            />

            <Route
              path="/citizen/problems"
              element={<MyProblems />}
            />

            <Route
              path="/citizen/problems/:id"
              element={<ProblemDetails />}
            />

            {/* =================================================
                GOVERNMENT
                ================================================= */}

            <Route
              path="/government"
              element={<GovernmentDashboard />}
            />

            <Route
              path="/government/validation"
              element={<ProblemValidation />}
            />

            <Route
              path="/government/routing"
              element={<ProblemRouting />}
            />

            {/* =================================================
                UNIVERSITY
                ================================================= */}

            <Route
              path="/university"
              element={<UniversityDashboard />}
            />

            <Route
              path="/university/student"
              element={<StudentDashboard />}
            />

            <Route
              path="/university/faculty"
              element={<FacultyDashboard />}
            />

            <Route
              path="/university/admin"
              element={<UniversityAdminDashboard />}
            />

            <Route
              path="/university/projects"
              element={<Projects />}
            />

            {/* =================================================
                UNIVERSITY WORKSPACES
                ================================================= */}

            <Route
              path="/university/student/workspace"
              element={<StudentWorkspace />}
            />

            <Route
              path="/university/faculty/workspace"
              element={<FacultyWorkspace />}
            />

            <Route
              path="/university/admin/workspace"
              element={<UniversityAdmin />}
            />

            <Route
              path="/university/teams"
              element={<TeamManagement />}
            />

            <Route
              path="/university/allocation"
              element={<ProjectAllocation />}
            />

            {/* =================================================
                INDUSTRY
                ================================================= */}

            <Route
              path="/industry"
              element={<IndustryDashboard />}
            />

            <Route
              path="/industry/projects"
              element={<IndustryProjects />}
            />

            <Route
              path="/industry/profile"
              element={<IndustryProfile />}
            />

            <Route
              path="/industry/collaboration-requests"
              element={<CollaborationRequests />}
            />

            {/* =================================================
                PROJECT SYSTEM
                ================================================= */}

            <Route
              path="/project-workspace"
              element={<ProjectWorkspace />}
            />

            <Route
              path="/project-details"
              element={<ProjectDetails />}
            />

            {/* =================================================
                FUTURE MODULES / FALLBACK
                ================================================= */}

            <Route
              path="*"
              element={<Navigate to="/location" replace />}
            />

          </Routes>
        </NotificationProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;