import React from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const student = {
  name: "Aarav Patil",
  prn: "2024CS1042",
  branch: "Computer Engineering",
  year: "Third Year",
};

const project = {
  id: "UNI-001",
  title: "Smart Electricity Issue Monitoring",
  category: "Electricity",
  location: "Dhule City",
  status: "In Progress",
  progress: 72,
  mentor: "Dr. Anjali Patil",
};

const team = {
  name: "Team Volt",
  members: 4,
  role: "Frontend Developer",
};

const tasks = [
  {
    id: 1,
    title: "Design citizen reporting interface",
    status: "Completed",
  },
  {
    id: 2,
    title: "Connect problem status workflow",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Prepare project demonstration",
    status: "Pending",
  },
];

const availableProjects = [
  {
    id: "UNI-004",
    title: "Water Supply Monitoring System",
    category: "Water & Sanitation",
    location: "Deopur, Dhule",
    priority: "Medium-High",
  },
  {
    id: "UNI-005",
    title: "Road Damage Reporting Platform",
    category: "PWD & Roads",
    location: "Chalisgaon Road",
    priority: "Minimum",
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
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px" }}>{title}</h3>
        {action}
      </div>

      {children}
    </div>
  );
}

function StudentDashboard() {
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
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Samanvay Portal</h2>
          <p style={{ margin: "4px 0 0", fontSize: "12px", opacity: 0.65 }}>
            Student Workspace
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",
            background: "transparent",
            color: COLORS.text,
            cursor: "pointer",
          }}
        >
          Home
        </button>
      </nav>

      <main
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "32px 24px 50px",
        }}
      >
        <div style={{ marginBottom: "26px" }}>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.6 }}>
            Dhule District University
          </p>

          <h1 style={{ margin: "6px 0", fontSize: "30px" }}>
            Welcome, {student.name}
          </h1>

          <p style={{ margin: 0, opacity: 0.7 }}>
            Track your project, team activities and contribution progress.
          </p>
        </div>

        {/* Profile */}
        <Card title="Student Profile">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "16px",
            }}
          >
            {[
              ["PRN", student.prn],
              ["Branch", student.branch],
              ["Year", student.year],
              ["Role", team.role],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: "14px",
                  background: COLORS.background,
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    opacity: 0.55,
                  }}
                >
                  {label}
                </p>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                    fontSize: "14px",
                  }}
                >
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.5fr) minmax(280px,1fr)",
            gap: "22px",
            marginTop: "22px",
          }}
        >
          {/* Project */}
          <Card
            title="My Assigned Project"
            action={
              <span
                style={{
                  background: COLORS.light,
                  padding: "6px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                }}
              >
                {project.status}
              </span>
            }
          >
            <p style={{ fontSize: "11px", opacity: 0.55 }}>{project.id}</p>

            <h2 style={{ margin: "5px 0", fontSize: "21px" }}>
              {project.title}
            </h2>

            <p style={{ opacity: 0.7, fontSize: "13px" }}>
              {project.category} • {project.location}
            </p>

            <div style={{ marginTop: "22px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                  fontSize: "12px",
                }}
              >
                <span>Project Progress</span>
                <strong>{project.progress}%</strong>
              </div>

              <div
                style={{
                  height: "9px",
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

            <p style={{ marginTop: "18px", fontSize: "13px" }}>
              <strong>Mentor:</strong> {project.mentor}
            </p>
          </Card>

          {/* Team */}
          <Card title="My Team">
            <div
              style={{
                background: COLORS.background,
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <h2 style={{ margin: 0 }}>{team.name}</h2>

              <p style={{ fontSize: "13px", opacity: 0.7 }}>
                {team.members} members
              </p>

              <p style={{ fontSize: "13px" }}>
                <strong>Your Role:</strong> {team.role}
              </p>

              <button
                onClick={() => navigate("/university/student/workspace")}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "11px",
                  border: "none",
                  borderRadius: "9px",
                  background: COLORS.accent,
                  color: COLORS.text,
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Open Workspace
              </button>
            </div>
          </Card>
        </div>

        {/* Tasks */}
        <div style={{ marginTop: "22px" }}>
          <Card title="My Tasks">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px",
                    background: COLORS.background,
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>{task.title}</span>

                  <span
                    style={{
                      fontSize: "11px",
                      padding: "5px 9px",
                      borderRadius: "15px",
                      background: COLORS.light,
                    }}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Available */}
        <div style={{ marginTop: "22px" }}>
          <Card
            title="Available Projects"
            action={
              <button
                onClick={() => navigate("/university/projects")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: COLORS.text,
                }}
              >
                View All →
              </button>
            }
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "14px",
              }}
            >
              {availableProjects.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: `1px solid ${COLORS.light}`,
                    padding: "16px",
                    borderRadius: "12px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "11px", opacity: 0.55 }}>
                    {item.id}
                  </p>

                  <h4 style={{ margin: "7px 0" }}>{item.title}</h4>

                  <p style={{ margin: 0, fontSize: "12px", opacity: 0.65 }}>
                    {item.category} • {item.location}
                  </p>

                  <p style={{ fontSize: "12px" }}>
                    Priority: <strong>{item.priority}</strong>
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;