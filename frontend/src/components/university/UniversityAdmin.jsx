import React, { useState } from "react";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

function UniversityAdmin() {
  const [activeSection, setActiveSection] = useState("Overview");

  const sections = [
    "Overview",
    "Students",
    "Faculty",
    "Teams",
    "Projects",
    "Collaboration",
  ];

  const data = {
    Students: [
      ["Aarav Patil", "Computer Engineering", "Team Volt"],
      ["Riya Joshi", "Computer Engineering", "Team Volt"],
      ["Vedant More", "Information Technology", "Team Volt"],
      ["Ishita Shah", "Computer Engineering", "Team Volt"],
    ],
    Faculty: [
      ["Dr. Anjali Patil", "Computer Engineering", "3 Projects"],
      ["Prof. Rahul Deshmukh", "Civil Engineering", "2 Projects"],
      ["Dr. Sneha Kulkarni", "Information Technology", "3 Projects"],
    ],
    Teams: [
      ["Team Volt", "4", "Electricity", "In Progress"],
      ["Team Jal", "4", "Water & Sanitation", "In Progress"],
      ["Team Marg", "4", "PWD & Roads", "Completed"],
    ],
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
        <h1>University Administration</h1>

        <p style={{ opacity: 0.7 }}>
          Manage university resources and collaboration activities.
        </p>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "22px",
          }}
        >
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                padding: "9px 14px",
                borderRadius: "20px",
                border: `1px solid ${COLORS.accent}`,
                background:
                  activeSection === section
                    ? COLORS.accent
                    : COLORS.white,
                color: COLORS.text,
                cursor: "pointer",
              }}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeSection === "Overview" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(200px,1fr))",
              gap: "16px",
              marginTop: "22px",
            }}
          >
            {[
              ["Total Students", "248"],
              ["Faculty", "32"],
              ["Teams", "42"],
              ["Projects", "26"],
              ["Completed", "8"],
              ["Collaborations", "5"],
            ].map(([title, value]) => (
              <div
                key={title}
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <p style={{ margin: 0, opacity: 0.65 }}>{title}</p>
                <h2 style={{ margin: "8px 0 0" }}>{value}</h2>
              </div>
            ))}
          </div>
        )}

        {/* Tables */}
        {data[activeSection] && (
          <div
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: "16px",
              padding: "22px",
              marginTop: "22px",
              overflowX: "auto",
            }}
          >
            <h2>{activeSection}</h2>

            {data[activeSection].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,minmax(160px,1fr))",
                  gap: "15px",
                  padding: "14px 0",
                  borderBottom: `1px solid ${COLORS.light}`,
                  fontSize: "13px",
                }}
              >
                {row.map((value, valueIndex) => (
                  <span key={valueIndex}>{value}</span>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeSection === "Projects" && (
          <div
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: "16px",
              padding: "22px",
              marginTop: "22px",
            }}
          >
            <h2>Project Management</h2>

            <p style={{ opacity: 0.7 }}>
              Projects can be reviewed, monitored and allocated to student
              teams from the University Administration workspace.
            </p>
          </div>
        )}

        {activeSection === "Collaboration" && (
          <div
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: "16px",
              padding: "22px",
              marginTop: "22px",
            }}
          >
            <h2>Collaboration Monitoring</h2>

            {[
              "Government Department + University",
              "University + Local Industry",
              "University + Community Organization",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "14px",
                  background: COLORS.background,
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UniversityAdmin;