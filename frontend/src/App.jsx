import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { NotificationProvider } from "./context/NotificationContext";

import LocationGate from "./pages/LocationGate";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitProblem from "./pages/citizen/SubmitProblem";
import MyProblems from "./pages/citizen/MyProblems";
import ProblemDetails from "./pages/citizen/ProblemDetails";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <Routes>
            {/* Entry */}
            <Route path="/location" element={<LocationGate />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Citizen */}
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

            {/* Future modules */}
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