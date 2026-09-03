import React, { useState } from "react";

import ProjectOverview from "../components/projects/ProjectOverview";
import Milestones from "../components/projects/Milestones";
import TeamMembers from "../components/projects/TeamMembers";
import Documents from "../components/projects/Documents";
import ImpactMetrics from "../components/projects/ImpactMetrics";

function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "milestones", label: "Milestones" },
    { id: "team", label: "Team Members" },
    { id: "documents", label: "Documents" },
    { id: "impact", label: "Impact Metrics" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>SAMANVAY PROJECT WORKSPACE</p>

            <h1 style={styles.title}>
              Smart Electricity Monitoring
            </h1>

            <p style={styles.subtitle}>
              Project ID: SAM-PROJ-001 • Dhule City • Electricity
            </p>
          </div>

          <div style={styles.statusBadge}>
            In Progress
          </div>
        </div>

        {/* Project Summary */}
        <div style={styles.summaryCard}>
          <div>
            <span style={styles.summaryLabel}>Project Progress</span>

            <div style={styles.progressRow}>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: "72%",
                  }}
                />
              </div>

              <strong>72%</strong>
            </div>
          </div>

          <div style={styles.summaryItem}>
            <span>Priority</span>
            <strong>High</strong>
          </div>

          <div style={styles.summaryItem}>
            <span>Student Team</span>
            <strong>Team Volt</strong>
          </div>

          <div style={styles.summaryItem}>
            <span>Faculty Mentor</span>
            <strong>Dr. Amit Patil</strong>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={
                activeTab === tab.id
                  ? styles.activeTab
                  : styles.tab
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Workspace */}
        <div style={styles.workspace}>
          {activeTab === "overview" && <ProjectOverview />}

          {activeTab === "milestones" && <Milestones />}

          {activeTab === "team" && <TeamMembers />}

          {activeTab === "documents" && <Documents />}

          {activeTab === "impact" && <ImpactMetrics />}
        </div>
      </div>
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
    maxWidth: "1250px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "22px",
  },

  eyebrow: {
    margin: "0 0 7px",
    color: "#9B6670",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#888",
    fontSize: "14px",
  },

  statusBadge: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    padding: "9px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
  },

  summaryCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "1.5fr repeat(3, 1fr)",
    gap: "20px",
    alignItems: "center",
    marginBottom: "22px",
  },

  summaryLabel: {
    display: "block",
    fontSize: "11px",
    color: "#888",
    marginBottom: "8px",
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  progressBar: {
    height: "9px",
    flex: 1,
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4A4A4A",
    borderRadius: "10px",
  },

  summaryItem: {
    borderLeft: "1px solid #F0E1E1",
    paddingLeft: "20px",
  },

  tabs: {
    display: "flex",
    gap: "5px",
    background: "#F7D6D0",
    padding: "6px",
    borderRadius: "12px",
    marginBottom: "20px",
    overflowX: "auto",
  },

  tab: {
    border: "none",
    background: "transparent",
    color: "#666",
    padding: "11px 17px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  activeTab: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "11px 17px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  workspace: {
    minHeight: "400px",
  },
};

export default ProjectWorkspace;