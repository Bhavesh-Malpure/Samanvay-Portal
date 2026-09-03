import React, { useState } from "react";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

function TeamManagement() {
  const [teams, setTeams] = useState([
    {
      id: "TEAM-001",
      name: "Team Volt",
      members: 4,
      mentor: "Dr. Anjali Patil",
      project: "Smart Electricity Issue Monitoring",
      status: "Active",
    },
    {
      id: "TEAM-002",
      name: "Team Jal",
      members: 4,
      mentor: "Prof. Rahul Deshmukh",
      project: "Water Supply Monitoring System",
      status: "Active",
    },
    {
      id: "TEAM-003",
      name: "Team Marg",
      members: 4,
      mentor: "Dr. Sneha Kulkarni",
      project: "Road Damage Reporting Platform",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mentor: "",
    project: "",
  });

  const createTeam = () => {
    if (!form.name.trim()) return;

    const newTeam = {
      id: `TEAM-${String(teams.length + 1).padStart(3, "0")}`,
      name: form.name,
      members: 0,
      mentor: form.mentor || "Not Assigned",
      project: form.project || "Not Assigned",
      status: "Active",
    };

    setTeams([...teams, newTeam]);

    setForm({
      name: "",
      mentor: "",
      project: "",
    });

    setShowForm(false);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Team Management</h1>
            <p style={{ opacity: 0.7 }}>
              Create and manage university project teams.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              border: "none",
              background: COLORS.accent,
              padding: "11px 16px",
              borderRadius: "9px",
              cursor: "pointer",
              color: COLORS.text,
              fontWeight: "600",
            }}
          >
            + Create Team
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <div
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: "16px",
              padding: "22px",
              marginTop: "22px",
            }}
          >
            <h2>Create New Team</h2>

            {[
              ["name", "Team Name"],
              ["mentor", "Faculty Mentor"],
              ["project", "Project"],
            ].map(([key, label]) => (
              <div key={key} style={{ marginBottom: "13px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </label>

                <input
                  value={form[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value,
                    })
                  }
                  placeholder={label}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px",
                    border: `1px solid ${COLORS.accent}`,
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </div>
            ))}

            <button
              onClick={createTeam}
              style={{
                padding: "10px 16px",
                background: COLORS.accent,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Create Team
            </button>
          </div>
        )}

        {/* Teams */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "18px",
            marginTop: "22px",
          }}
        >
          {teams.map((team) => (
            <div
              key={team.id}
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
                }}
              >
                <span style={{ fontSize: "11px", opacity: 0.5 }}>
                  {team.id}
                </span>

                <span
                  style={{
                    background: COLORS.light,
                    padding: "5px 9px",
                    borderRadius: "15px",
                    fontSize: "10px",
                  }}
                >
                  {team.status}
                </span>
              </div>

              <h2 style={{ margin: "10px 0" }}>{team.name}</h2>

              <p style={{ fontSize: "13px" }}>
                <strong>Members:</strong> {team.members}
              </p>

              <p style={{ fontSize: "13px" }}>
                <strong>Mentor:</strong> {team.mentor}
              </p>

              <p style={{ fontSize: "13px" }}>
                <strong>Project:</strong> {team.project}
              </p>

              <button
                style={{
                  marginTop: "8px",
                  padding: "9px 13px",
                  border: `1px solid ${COLORS.accent}`,
                  background: COLORS.background,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Manage Members
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;