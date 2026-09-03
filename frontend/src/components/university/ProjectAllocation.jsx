import React, { useState } from "react";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const initialProjects = [
  {
    id: "UNI-004",
    title: "Electricity Complaint Analytics",
    category: "Electricity",
    location: "Shirpur",
    priority: "High",
    status: "Awaiting Allocation",
  },
  {
    id: "UNI-005",
    title: "Community Sanitation Tracker",
    category: "Water & Sanitation",
    location: "Dhule City",
    priority: "Medium-High",
    status: "Awaiting Allocation",
  },
  {
    id: "UNI-006",
    title: "Local Road Safety Reporting",
    category: "PWD & Roads",
    location: "Dhule City",
    priority: "Minimum",
    status: "Awaiting Allocation",
  },
];

const teams = [
  "Team Volt",
  "Team Jal",
  "Team Marg",
  "Team Samanvay-04",
];

const mentors = [
  "Dr. Anjali Patil",
  "Prof. Rahul Deshmukh",
  "Dr. Sneha Kulkarni",
];

function ProjectAllocation() {
  const [projects, setProjects] = useState(initialProjects);

  const [selection, setSelection] = useState({});

  const updateSelection = (id, field, value) => {
    setSelection({
      ...selection,
      [id]: {
        ...selection[id],
        [field]: value,
      },
    });
  };

  const allocateProject = (id) => {
    const selected = selection[id];

    if (!selected?.team || !selected?.mentor) {
      alert("Please select both team and faculty mentor.");
      return;
    }

    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: "Allocated",
              team: selected.team,
              mentor: selected.mentor,
            }
          : project
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        padding: "30px 24px",
        color: COLORS.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1150px", margin: "auto" }}>
        <h1>Project Allocation</h1>

        <p style={{ opacity: 0.7 }}>
          Allocate validated and routed societal problems to university teams.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "24px",
          }}
        >
          {projects.map((project) => {
            const selected = selection[project.id] || {};

            return (
              <div
                key={project.id}
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: "16px",
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <div>
                    <small style={{ opacity: 0.5 }}>
                      {project.id}
                    </small>

                    <h2 style={{ margin: "6px 0" }}>
                      {project.title}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        opacity: 0.65,
                      }}
                    >
                      {project.category} • {project.location}
                    </p>
                  </div>

                  <span
                    style={{
                      height: "fit-content",
                      background: COLORS.light,
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    padding: "14px",
                    background: COLORS.background,
                    borderRadius: "10px",
                  }}
                >
                  <strong style={{ fontSize: "13px" }}>
                    Priority: {project.priority}
                  </strong>
                </div>

                {project.status !== "Allocated" ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                      gap: "14px",
                      marginTop: "18px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          marginBottom: "6px",
                        }}
                      >
                        Select Student Team
                      </label>

                      <select
                        value={selected.team || ""}
                        onChange={(e) =>
                          updateSelection(
                            project.id,
                            "team",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "11px",
                          borderRadius: "8px",
                          border: `1px solid ${COLORS.accent}`,
                          background: COLORS.white,
                        }}
                      >
                        <option value="">Select Team</option>

                        {teams.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          marginBottom: "6px",
                        }}
                      >
                        Select Faculty Mentor
                      </label>

                      <select
                        value={selected.mentor || ""}
                        onChange={(e) =>
                          updateSelection(
                            project.id,
                            "mentor",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "11px",
                          borderRadius: "8px",
                          border: `1px solid ${COLORS.accent}`,
                          background: COLORS.white,
                        }}
                      >
                        <option value="">Select Mentor</option>

                        {mentors.map((mentor) => (
                          <option key={mentor} value={mentor}>
                            {mentor}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: "18px", fontSize: "13px" }}>
                    <p>
                      <strong>Team:</strong> {project.team}
                    </p>

                    <p>
                      <strong>Mentor:</strong> {project.mentor}
                    </p>
                  </div>
                )}

                {project.status !== "Allocated" && (
                  <button
                    onClick={() => allocateProject(project.id)}
                    style={{
                      marginTop: "18px",
                      padding: "11px 18px",
                      border: "none",
                      borderRadius: "8px",
                      background: COLORS.accent,
                      color: COLORS.text,
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Allocate Project
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "22px",
            padding: "15px",
            background: COLORS.light,
            borderRadius: "12px",
            fontSize: "12px",
            lineHeight: 1.5,
          }}
        >
          <strong>Prototype Workflow:</strong> Government validates and routes
          the societal problem → University receives the project → University
          Admin selects a student team and faculty mentor → Project becomes
          allocated.
        </div>
      </div>
    </div>
  );
}

export default ProjectAllocation;