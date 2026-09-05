import React from "react";

function ProjectOverview() {
  const objectives = [
    "Monitor electricity interruptions in real time.",
    "Track voltage fluctuations in selected locations.",
    "Identify frequently affected areas.",
    "Support government decision-making using collected data.",
    "Improve reliability of electricity services.",
  ];

  return (
    <div>
      <h2 style={styles.title}>Project Overview</h2>

      <p style={styles.description}>
        Smart Electricity Monitoring is an IoT-based project designed
        to monitor electricity interruptions and voltage fluctuations
        in Dhule City. The project aims to provide useful information
        for identifying frequently affected locations and supporting
        better infrastructure decisions.
      </p>

      {/* Progress */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.heading}>Overall Progress</h3>
          <strong style={styles.percentage}>72%</strong>
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

      {/* Objectives */}
      <div style={styles.section}>
        <h3 style={styles.heading}>Objectives</h3>

        <div style={styles.objectives}>
          {objectives.map((objective, index) => (
            <div key={index} style={styles.objective}>
              <div style={styles.number}>{index + 1}</div>

              <div style={styles.objectiveText}>
                {objective}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Activity */}
      <div style={styles.activity}>
        <h3 style={styles.heading}>Current Activity</h3>

        <p style={styles.activityText}>
          The team is currently conducting field testing of the
          electricity monitoring prototype at selected locations
          in Dhule City.
        </p>

        <div style={styles.activityMeta}>
          Last updated: 02 September 2026
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    margin: "0 0 12px",
    fontSize: "23px",
    color: "#4A4A4A",
  },

  description: {
    margin: 0,
    color: "#6F6064",
    lineHeight: "1.7",
    fontSize: "14px",
    maxWidth: "900px",
  },

  section: {
    marginTop: "28px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  heading: {
    margin: 0,
    fontSize: "17px",
    color: "#4A4A4A",
  },

  percentage: {
    fontSize: "20px",
    color: "#7E3545",
  },

  progressBackground: {
    width: "100%",
    height: "10px",
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#E2B4BD",
    borderRadius: "10px",
  },

  objectives: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "12px",
  },

  objective: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#FFF5F5",
    borderRadius: "9px",
    padding: "12px",
  },

  number: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#E2B4BD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },

  objectiveText: {
    fontSize: "14px",
    color: "#5F5256",
  },

  activity: {
    marginTop: "28px",
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "18px",
  },

  activityText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#6F6064",
    margin: "10px 0",
  },

  activityMeta: {
    fontSize: "12px",
    color: "#918085",
  },
};

export default ProjectOverview;