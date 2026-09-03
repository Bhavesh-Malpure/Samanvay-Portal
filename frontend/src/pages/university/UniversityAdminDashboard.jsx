import React from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const stats = [
  ["Students", "248"],
  ["Faculty / Mentors", "32"],
  ["Teams", "42"],
  ["Projects", "26"],
  ["Completed", "8"],
  ["Awaiting Allocation", "5"],
];

const activities = [
  "New societal problem routed to university",
  "Team Volt project allocation updated",
  "Dr. Anjali Patil assigned as mentor",
  "Team Jal created by students",
  "Project UNI-008 marked completed",
];

function UniversityAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav
        style={{
          background: COLORS.white,
          borderBottom: `1px solid ${COLORS.accent}`,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Samanvay Portal</h2>
          <p style={{ margin: "4px 0", fontSize: "12px", opacity: 0.6 }}>
            University Administration
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: COLORS.text,
          }}
        >
          Home
        </button>
      </nav>

      <main
        style={{
          maxWidth: "1250px",
          margin: "auto",
          padding: "32px 24px 50px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <p style={{ margin: 0, opacity: 0.6, fontSize: "13px" }}>
            Dhule District
          </p>

          <h1 style={{ margin: "6px 0" }}>
            University Administration
          </h1>

          <p style={{ margin: 0, opacity: 0.7 }}>
            Manage university participation in societal problem solving.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(170px,1fr))",
            gap: "16px",
          }}
        >
          {stats.map(([title, value]) => (
            <div
              key={title}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.accent}`,
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  opacity: 0.65,
                }}
              >
                {title}
              </p>

              <h2 style={{ margin: "8px 0 0", fontSize: "27px" }}>
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* Management */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {[
            [
              "👥",
              "Team Management",
              "Create and manage student teams.",
              "/university/teams",
            ],
            [
              "🎯",
              "Project Allocation",
              "Allocate routed problems to teams.",
              "/university/allocation",
            ],
            [
              "📋",
              "Projects",
              "Monitor university projects.",
              "/university/projects",
            ],
            [
              "⚙️",
              "Administration",
              "Manage university workspace.",
              "/university/admin",
            ],
          ].map(([icon, title, description, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              style={{
                border: `1px solid ${COLORS.accent}`,
                background: COLORS.white,
                borderRadius: "14px",
                padding: "20px",
                textAlign: "left",
                cursor: "pointer",
                color: COLORS.text,
              }}
            >
              <div style={{ fontSize: "25px" }}>{icon}</div>

              <h3 style={{ margin: "10px 0 5px" }}>{title}</h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  opacity: 0.65,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            </button>
          ))}
        </div>

        {/* Activity */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Recent University Activity</h3>

          {activities.map((activity, index) => (
            <div
              key={index}
              style={{
                padding: "13px 0",
                borderBottom:
                  index !== activities.length - 1
                    ? `1px solid ${COLORS.light}`
                    : "none",
                fontSize: "13px",
              }}
            >
              <span style={{ marginRight: "10px" }}>●</span>
              {activity}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "22px",
            padding: "15px",
            borderRadius: "12px",
            background: COLORS.light,
            fontSize: "12px",
            lineHeight: 1.5,
          }}
        >
          <strong>Prototype:</strong> University statistics and records are
          synthetic data created for the Dhule District Samanvay Portal
          demonstration.
        </div>
      </main>
    </div>
  );
}

export default UniversityAdminDashboard;