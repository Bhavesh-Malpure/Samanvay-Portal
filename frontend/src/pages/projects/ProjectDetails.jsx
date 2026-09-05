import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectDetails() {
  const navigate = useNavigate();

  const project = {
    id: "SAM-PROJ-001",
    title: "Smart Electricity Monitoring",
    category: "Electricity",
    location: "Dhule City",
    priority: "High",
    status: "In Progress",

    problem:
      "Residents of Dhule City are experiencing frequent electricity interruptions and voltage fluctuations, affecting homes, educational institutions and small businesses.",

    solution:
      "Develop an IoT-based electricity monitoring system that collects real-time information about power interruptions and voltage variations and provides useful information for decision-making.",

    objectives: [
      "Monitor electricity interruptions in real time.",
      "Track voltage fluctuations across selected locations.",
      "Identify frequently affected areas.",
      "Provide useful data to government departments.",
      "Improve electricity service reliability.",
    ],

    university: "North Maharashtra Institute of Technology",
    faculty: "Dr. Amit Patil",
    team: "Team Volt",
    industry: "Dhule Industrial Solutions Pvt. Ltd.",
  };

  return (
    <div style={styles.page}>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        ← Back
      </button>

      <div style={styles.header}>
        <div>
          <div style={styles.category}>{project.category}</div>

          <h1 style={styles.title}>{project.title}</h1>

          <div style={styles.meta}>
            <span>{project.id}</span>
            <span>•</span>
            <span>{project.location}</span>
          </div>
        </div>

        <div style={styles.statusContainer}>
          <span style={styles.priorityBadge}>
            {project.priority} Priority
          </span>

          <span style={styles.statusBadge}>
            {project.status}
          </span>
        </div>
      </div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Societal Problem</h2>

          <p style={styles.paragraph}>{project.problem}</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Proposed Solution</h2>

          <p style={styles.paragraph}>{project.solution}</p>
        </section>
      </div>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Project Objectives</h2>

        <ul style={styles.list}>
          {project.objectives.map((objective, index) => (
            <li key={index} style={styles.listItem}>
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Project Information</h2>

        <div style={styles.infoGrid}>
          <InfoItem
            label="University"
            value={project.university}
          />

          <InfoItem
            label="Faculty Mentor"
            value={project.faculty}
          />

          <InfoItem
            label="Student Team"
            value={project.team}
          />

          <InfoItem
            label="Industry Partner"
            value={project.industry}
          />

          <InfoItem
            label="Category"
            value={project.category}
          />

          <InfoItem
            label="Location"
            value={project.location}
          />
        </div>
      </section>

      <div style={styles.actionContainer}>
        <button
          onClick={() => navigate("/project-workspace")}
          style={styles.primaryButton}
        >
          Open Project Workspace →
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF5F5",
    padding: "30px",
    boxSizing: "border-box",
    color: "#4A4A4A",
  },

  backButton: {
    border: "none",
    background: "transparent",
    color: "#6F6064",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
    marginBottom: "25px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "25px",
  },

  category: {
    display: "inline-block",
    background: "#F7D6D0",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#4A4A4A",
  },

  meta: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    color: "#7A696D",
    fontSize: "14px",
  },

  statusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-end",
  },

  priorityBadge: {
    background: "#F7D6D0",
    color: "#7E3545",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  statusBadge: {
    background: "#E2B4BD",
    color: "#4A4A4A",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #F0E1E1",
    borderRadius: "12px",
    padding: "22px",
    marginBottom: "18px",
    boxSizing: "border-box",
  },

  sectionTitle: {
    margin: "0 0 14px",
    fontSize: "19px",
    color: "#4A4A4A",
  },

  paragraph: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#6F6064",
  },

  list: {
    margin: 0,
    paddingLeft: "20px",
  },

  listItem: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#6F6064",
    lineHeight: "1.5",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  infoItem: {
    background: "#FFF5F5",
    borderRadius: "10px",
    padding: "15px",
  },

  infoLabel: {
    fontSize: "12px",
    color: "#8A777B",
    marginBottom: "5px",
  },

  infoValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4A4A4A",
  },

  actionContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },

  primaryButton: {
    border: "none",
    background: "#E2B4BD",
    color: "#4A4A4A",
    padding: "13px 22px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default ProjectDetails;