import React, { useState } from "react";

import ProjectOverview from "../../components/projects/ProjectOverview";
import Milestones from "../../components/projects/Milestones";
import TeamMembers from "../../components/projects/TeamMembers";
import Documents from "../../components/projects/Documents";
import ImpactMetrics from "../../components/projects/ImpactMetrics";

function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Milestones",
    "Team Members",
    "Documents",
    "Impact Metrics",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <ProjectOverview />;

      case "Milestones":
        return <Milestones />;

      case "Team Members":
        return <TeamMembers />;

      case "Documents":
        return <Documents />;

      case "Impact Metrics":
        return <ImpactMetrics />;

      default:
        return <ProjectOverview />;
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.backText}>← Project Workspace</div>

          <h1 style={styles.title}>Smart Electricity Monitoring</h1>

          <div style={styles.projectMeta}>
            <span>Project ID: SAM-PROJ-001</span>
            <span>•</span>
            <span>Dhule City</span>
            <span>•</span>
            <span>Electricity</span>
          </div>
        </div>

        <div style={styles.statusBadge}>In Progress</div>
      </div>

      {/* Project Summary */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Project Progress</div>

          <div style={styles.progressRow}>
            <strong style={styles.progressValue}>72%</strong>
            <span style={styles.progressText}>Complete</span>
          </div>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.progressFill,
                width: "72%",
              }}
            />
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Priority</div>
          <div style={styles.priorityValue}>High</div>
          <div style={styles.smallText}>Urgent societal problem</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Project Team</div>
          <div style={styles.summaryValue}>Team Volt</div>
          <div style={styles.smallText}>5 student members</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Faculty Mentor</div>
          <div style={styles.summaryValue}>Dr. Amit Patil</div>
          <div style={styles.smallText}>Computer Engineering</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>{renderTabContent()}</div>
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "25px",
  },

  backText: {
    fontSize: "14px",
    color: "#8C6F76",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "700",
    color: "#4A4A4A",
  },

  projectMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
    fontSize: "14px",
    color: "#7A696D",
  },

  statusBadge: {
    background: "#E2B4BD",
    color: "#4A4A4A",
    padding: "9px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "16px",
    marginBottom: "25px",
  },

  summaryCard: {
    background: "#FFFFFF",
    border: "1px solid #F0E1E1",
    borderRadius: "12px",
    padding: "18px",
    boxSizing: "border-box",
  },

  summaryLabel: {
    fontSize: "13px",
    color: "#8A777B",
    marginBottom: "8px",
  },

  summaryValue: {
    fontSize: "19px",
    fontWeight: "700",
    color: "#4A4A4A",
  },

  priorityValue: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#8B3F4F",
  },

  smallText: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#8A777B",
  },

  progressRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "10px",
  },

  progressValue: {
    fontSize: "25px",
    color: "#4A4A4A",
  },

  progressText: {
    fontSize: "13px",
    color: "#8A777B",
  },

  progressBackground: {
    width: "100%",
    height: "8px",
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#E2B4BD",
    borderRadius: "10px",
  },

  tabsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    background: "#FFFFFF",
    border: "1px solid #F0E1E1",
    borderRadius: "12px",
    padding: "8px",
    marginBottom: "20px",
  },

  tab: {
    border: "none",
    background: "transparent",
    color: "#6F6064",
    padding: "11px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },

  activeTab: {
    background: "#F7D6D0",
    color: "#4A4A4A",
    fontWeight: "700",
  },

  content: {
    background: "#FFFFFF",
    border: "1px solid #F0E1E1",
    borderRadius: "12px",
    padding: "24px",
    minHeight: "400px",
    boxSizing: "border-box",
  },
};

export default ProjectWorkspace;