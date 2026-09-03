import React from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const faculty = {
  name: "Dr. Anjali Patil",
  department: "Computer Engineering",
  designation: "Faculty Mentor",
};

const stats = [
  ["Assigned Projects", "3"],
  ["Student Teams", "3"],
  ["Students", "12"],
  ["Completed Projects", "1"],
];

const projects = [
  {
    id: "UNI-001",
    title: "Smart Electricity Issue Monitoring",
    category: "Electricity",
    team: "Team Volt",
    students: 4,
    progress: 72,
    status: "In Progress",
  },
  {
    id: "UNI-006",
    title: "Citizen Water Complaint System",
    category: "Water & Sanitation",
    team: "Team Jal",
    students: 4,
    progress: 55,
    status: "In Progress",
  },
  {
    id: "UNI-008",
    title: "Smart Road Reporting",
    category: "PWD & Roads",
    team: "Team Marg",
    students: 4,
    progress: 100,
    status: "Completed",
  },
];

function Card({ title, children, action }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: "16px",
        padding: "22px",
        boxShadow: "0 4px 14px rgba(74,74,74,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        {action}
      </div>

      {children}
    </div>
  );
}

function FacultyDashboard() {
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
            Faculty / Mentor Workspace
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
          maxWidth: "1200px",
          margin: "auto",
          padding: "32px 24px",
        }}
      >
        <div style={{ marginBottom: "26px" }}>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.6 }}>
            Dhule District University
          </p>

          <h1 style={{ margin: "6px 0" }}>
            Welcome, {faculty.name}
          </h1>

          <p style={{ margin: 0, opacity: 0.7 }}>
            Monitor student teams and guide their societal innovation projects.
          </p>
        </div>

        <Card title="Faculty Profile">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "14px",
            }}
          >
            {[
              ["Department", faculty.department],
              ["Designation", faculty.designation],
              ["Role", "Project Mentor"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: COLORS.background,
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <small style={{ opacity: 0.55 }}>{label}</small>
                <strong style={{ display: "block", marginTop: "5px" }}>
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "16px",
            marginTop: "22px",
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
              <p style={{ margin: 0, fontSize: "13px", opacity: 0.65 }}>
                {title}
              </p>

              <h2 style={{ margin: "7px 0 0", fontSize: "28px" }}>
                {value}
              </h2>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "22px" }}>
          <Card
            title="Assigned Projects"
            action={
              <button
                onClick={() => navigate("/university/faculty/workspace")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: COLORS.text,
                }}
              >
                Open Workspace →
              </button>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    border: `1px solid ${COLORS.light}`,
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <small style={{ opacity: 0.5 }}>{project.id}</small>

                      <h3 style={{ margin: "5px 0" }}>
                        {project.title}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          opacity: 0.65,
                        }}
                      >
                        {project.category} • {project.team}
                      </p>
                    </div>

                    <span
                      style={{
                        height: "fit-content",
                        padding: "6px 10px",
                        background: COLORS.light,
                        borderRadius: "20px",
                        fontSize: "11px",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginBottom: "6px",
                      }}
                    >
                      <span>
                        {project.students} students
                      </span>

                      <strong>{project.progress}%</strong>
                    </div>

                    <div
                      style={{
                        height: "8px",
                        background: COLORS.light,
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: `${project.progress}%`,
                          height: "100%",
                          background: COLORS.accent,
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default FacultyDashboard;