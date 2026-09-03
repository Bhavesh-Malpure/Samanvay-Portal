import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const projectsData = [
  {
    id: "UNI-001",
    title: "Smart Electricity Issue Monitoring",
    problem: "Frequent electricity interruptions",
    category: "Electricity",
    location: "Dhule City",
    priority: "High",
    team: "Team Volt",
    mentor: "Dr. Anjali Patil",
    status: "In Progress",
    progress: 72,
  },
  {
    id: "UNI-002",
    title: "Water Supply Monitoring System",
    problem: "Irregular water supply",
    category: "Water & Sanitation",
    location: "Deopur, Dhule",
    priority: "Medium-High",
    team: "Team Jal",
    mentor: "Prof. Rahul Deshmukh",
    status: "In Progress",
    progress: 65,
  },
  {
    id: "UNI-003",
    title: "Road Damage Reporting Platform",
    problem: "Road damage near public school",
    category: "PWD & Roads",
    location: "Chalisgaon Road",
    priority: "Minimum",
    team: "Team Marg",
    mentor: "Dr. Sneha Kulkarni",
    status: "Completed",
    progress: 100,
  },
  {
    id: "UNI-004",
    title: "Electricity Complaint Analytics",
    problem: "Repeated local power complaints",
    category: "Electricity",
    location: "Shirpur",
    priority: "High",
    team: "Not Assigned",
    mentor: "Not Assigned",
    status: "Awaiting Allocation",
    progress: 0,
  },
  {
    id: "UNI-005",
    title: "Community Sanitation Tracker",
    problem: "Sanitation service reporting",
    category: "Water & Sanitation",
    location: "Dhule City",
    priority: "Medium-High",
    team: "Not Assigned",
    mentor: "Not Assigned",
    status: "Awaiting Allocation",
    progress: 0,
  },
];

function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((project) => project.status === filter);

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
            University Projects
          </p>
        </div>

        <button
          onClick={() => navigate("/university")}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: COLORS.text,
          }}
        >
          Dashboard
        </button>
      </nav>

      <main
        style={{
          maxWidth: "1250px",
          margin: "auto",
          padding: "32px 24px",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <h1 style={{ margin: 0 }}>University Projects</h1>
          <p style={{ opacity: 0.7 }}>
            View societal problems converted into university projects.
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {[
            "All",
            "Awaiting Allocation",
            "In Progress",
            "Completed",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                border: `1px solid ${COLORS.accent}`,
                background:
                  filter === item
                    ? COLORS.accent
                    : COLORS.white,
                color: COLORS.text,
                padding: "9px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "18px",
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.accent}`,
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    opacity: 0.5,
                  }}
                >
                  {project.id}
                </span>

                <span
                  style={{
                    fontSize: "10px",
                    padding: "5px 8px",
                    borderRadius: "15px",
                    background: COLORS.light,
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h3 style={{ margin: "10px 0 6px" }}>
                {project.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  opacity: 0.65,
                }}
              >
                {project.problem}
              </p>

              <div
                style={{
                  marginTop: "15px",
                  fontSize: "12px",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  <strong>Category:</strong> {project.category}
                </div>

                <div>
                  <strong>Location:</strong> {project.location}
                </div>

                <div>
                  <strong>Priority:</strong> {project.priority}
                </div>

                <div>
                  <strong>Team:</strong> {project.team}
                </div>

                <div>
                  <strong>Mentor:</strong> {project.mentor}
                </div>
              </div>

              <div style={{ marginTop: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginBottom: "5px",
                  }}
                >
                  <span>Progress</span>
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
      </main>
    </div>
  );
}

export default Projects;