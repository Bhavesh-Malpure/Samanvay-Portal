import React, { useState } from "react";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

function FacultyWorkspace() {
  const [selectedTeam, setSelectedTeam] = useState("Team Volt");

  const teams = [
    {
      name: "Team Volt",
      project: "Smart Electricity Issue Monitoring",
      progress: 72,
      students: 4,
    },
    {
      name: "Team Jal",
      project: "Water Supply Monitoring System",
      progress: 65,
      students: 4,
    },
    {
      name: "Team Marg",
      project: "Smart Road Reporting",
      progress: 100,
      students: 4,
    },
  ];

  const currentTeam = teams.find(
    (team) => team.name === selectedTeam
  );

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
        <h1>Faculty Workspace</h1>

        <p style={{ opacity: 0.7 }}>
          Monitor assigned projects, teams and student progress.
        </p>

        {/* Team selector */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "22px",
          }}
        >
          {teams.map((team) => (
            <button
              key={team.name}
              onClick={() => setSelectedTeam(team.name)}
              style={{
                padding: "10px 14px",
                borderRadius: "20px",
                border: `1px solid ${COLORS.accent}`,
                background:
                  selectedTeam === team.name
                    ? COLORS.accent
                    : COLORS.white,
                cursor: "pointer",
                color: COLORS.text,
              }}
            >
              {team.name}
            </button>
          ))}
        </div>

        {/* Selected team */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "22px",
          }}
        >
          <small style={{ opacity: 0.55 }}>Selected Team</small>

          <h2>{currentTeam.name}</h2>

          <p>{currentTeam.project}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                background: COLORS.background,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <small>Students</small>
              <h3>{currentTeam.students}</h3>
            </div>

            <div
              style={{
                background: COLORS.background,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <small>Progress</small>
              <h3>{currentTeam.progress}%</h3>
            </div>

            <div
              style={{
                background: COLORS.background,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <small>Status</small>
              <h3>
                {currentTeam.progress === 100
                  ? "Completed"
                  : "In Progress"}
              </h3>
            </div>
          </div>
        </div>

        {/* Students */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "22px",
          }}
        >
          <h2>Student Monitoring</h2>

          {[
            ["Aarav Patil", "Frontend Developer", "On Track"],
            ["Riya Joshi", "Backend Developer", "On Track"],
            ["Vedant More", "AI / Data", "Needs Review"],
            ["Ishita Shah", "Documentation", "On Track"],
          ].map(([name, role, status]) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: `1px solid ${COLORS.light}`,
              }}
            >
              <div>
                <strong>{name}</strong>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "12px",
                    opacity: 0.65,
                  }}
                >
                  {role}
                </p>
              </div>

              <span
                style={{
                  background: COLORS.light,
                  padding: "6px 10px",
                  borderRadius: "15px",
                  fontSize: "11px",
                }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* Mentor note */}
        <div
          style={{
            background: COLORS.light,
            padding: "18px",
            borderRadius: "14px",
            marginTop: "22px",
          }}
        >
          <strong>Mentor Actions</strong>

          <p style={{ marginBottom: 0, fontSize: "13px" }}>
            Review project progress, guide students, provide feedback and
            monitor project completion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyWorkspace;