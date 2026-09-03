import React, { useState } from "react";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

function StudentWorkspace() {
  const [progress, setProgress] = useState(72);

  const members = [
    ["Aarav Patil", "Frontend Developer"],
    ["Riya Joshi", "Backend Developer"],
    ["Vedant More", "AI / Data"],
    ["Ishita Shah", "UI / Documentation"],
  ];

  const tasks = [
    ["Citizen reporting interface", "Completed"],
    ["Problem status workflow", "In Progress"],
    ["Analytics dashboard", "Pending"],
    ["Final demonstration", "Pending"],
  ];

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
      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <h1>Student Workspace</h1>

        <p style={{ opacity: 0.7 }}>
          Team Volt • Smart Electricity Issue Monitoring
        </p>

        {/* Project */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "22px",
          }}
        >
          <h2>Project Progress</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <span>Overall Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div
            style={{
              marginTop: "8px",
              height: "10px",
              background: COLORS.light,
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: COLORS.accent,
                borderRadius: "10px",
              }}
            />
          </div>

          <button
            onClick={() =>
              setProgress((value) =>
                value >= 100 ? 100 : value + 5
              )
            }
            style={{
              marginTop: "15px",
              padding: "10px 14px",
              border: "none",
              borderRadius: "8px",
              background: COLORS.accent,
              cursor: "pointer",
              color: COLORS.text,
            }}
          >
            Update Progress
          </button>
        </div>

        {/* Team */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "22px",
          }}
        >
          <h2>Team Members</h2>

          {members.map(([name, role]) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "13px 0",
                borderBottom: `1px solid ${COLORS.light}`,
                fontSize: "13px",
              }}
            >
              <strong>{name}</strong>
              <span style={{ opacity: 0.65 }}>{role}</span>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: "16px",
            padding: "22px",
            marginTop: "22px",
          }}
        >
          <h2>Project Tasks</h2>

          {tasks.map(([task, status]) => (
            <div
              key={task}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "13px",
                marginBottom: "8px",
                background: COLORS.background,
                borderRadius: "9px",
              }}
            >
              <span>{task}</span>

              <span
                style={{
                  background: COLORS.light,
                  padding: "5px 9px",
                  borderRadius: "15px",
                  fontSize: "11px",
                }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* Mentor */}
        <div
          style={{
            background: COLORS.light,
            borderRadius: "14px",
            padding: "18px",
            marginTop: "22px",
          }}
        >
          <strong>Faculty Mentor</strong>

          <p style={{ marginBottom: 0 }}>
            Dr. Anjali Patil • Computer Engineering
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentWorkspace;