import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectDetails() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>PROJECT DETAILS</p>

            <h1 style={styles.title}>
              Smart Electricity Monitoring
            </h1>

            <p style={styles.subtitle}>
              SAM-PROJ-001 • Dhule City • Electricity
            </p>
          </div>

          <span style={styles.status}>
            In Progress
          </span>
        </div>

        <div style={styles.grid}>
          <div style={styles.mainCard}>
            <h2 style={styles.sectionTitle}>
              Societal Problem
            </h2>

            <p style={styles.text}>
              Frequent electricity interruptions are affecting
              households, small businesses and public facilities
              across selected areas of Dhule City.
            </p>

            <h2 style={styles.sectionTitle}>
              Proposed Solution
            </h2>

            <p style={styles.text}>
              The student team is developing a smart electricity
              monitoring system capable of collecting interruption
              data, identifying patterns and providing useful
              information for authorities and citizens.
            </p>

            <h2 style={styles.sectionTitle}>
              Project Objective
            </h2>

            <ul style={styles.list}>
              <li>Monitor electricity interruptions.</li>
              <li>Identify recurring interruption patterns.</li>
              <li>Generate useful reports.</li>
              <li>Support evidence-based decision making.</li>
              <li>Improve citizen awareness.</li>
            </ul>
          </div>

          <div>
            <div style={styles.infoCard}>
              <h2 style={styles.sectionTitle}>
                Project Information
              </h2>

              <Info label="Project ID" value="SAM-PROJ-001" />
              <Info label="Category" value="Electricity" />
              <Info label="Location" value="Dhule City" />
              <Info label="Priority" value="High" />
              <Info
                label="Status"
                value="In Progress"
              />
            </div>

            <div style={styles.infoCard}>
              <h2 style={styles.sectionTitle}>
                Team
              </h2>

              <Info label="Team" value="Team Volt" />
              <Info
                label="University"
                value="Dhule Engineering University"
              />
              <Info
                label="Faculty Mentor"
                value="Dr. Amit Patil"
              />
              <Info label="Members" value="5 Students" />
            </div>

            <button
              style={styles.workspaceButton}
              onClick={() =>
                navigate("/project-workspace")
              }
            >
              Open Project Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF5F5",
    color: "#4A4A4A",
    padding: "32px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
  },

  backButton: {
    border: "none",
    background: "transparent",
    color: "#777",
    fontWeight: "700",
    cursor: "pointer",
    padding: 0,
    marginBottom: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  },

  eyebrow: {
    margin: 0,
    color: "#9B6670",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: "7px 0",
    fontSize: "31px",
  },

  subtitle: {
    margin: 0,
    color: "#888",
    fontSize: "14px",
  },

  status: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    padding: "9px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "22px",
  },

  mainCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "25px",
  },

  infoCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "18px",
  },

  text: {
    margin: "0 0 25px",
    color: "#666",
    lineHeight: "1.7",
    fontSize: "14px",
  },

  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "#666",
    lineHeight: "1.9",
    fontSize: "14px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    padding: "12px 0",
    borderTop: "1px solid #F0E1E1",
    fontSize: "13px",
  },

  workspaceButton: {
    width: "100%",
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "13px",
    borderRadius: "9px",
    fontWeight: "800",
    cursor: "pointer",
  },
};

export default ProjectDetails;