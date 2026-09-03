import React from "react";

function ProjectOverview() {
  return (
    <div>
      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.label}>PROJECT DESCRIPTION</p>

          <h2 style={styles.title}>
            Smart Electricity Monitoring
          </h2>

          <p style={styles.text}>
            A technology-driven solution designed to monitor
            electricity interruptions and generate useful insights
            for local authorities and citizens in Dhule.
          </p>
        </div>

        <div style={styles.card}>
          <p style={styles.label}>CURRENT STATUS</p>

          <div style={styles.statusRow}>
            <strong>72%</strong>
            <span>Overall completion</span>
          </div>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: "72%",
              }}
            />
          </div>

          <p style={styles.smallText}>
            Development and field testing are currently underway.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          Project Objectives
        </h2>

        <div style={styles.objectiveGrid}>
          <Objective
            number="01"
            title="Monitor"
            text="Collect electricity interruption information."
          />

          <Objective
            number="02"
            title="Analyse"
            text="Identify patterns and recurring issues."
          />

          <Objective
            number="03"
            title="Inform"
            text="Provide useful information to stakeholders."
          />

          <Objective
            number="04"
            title="Improve"
            text="Support better local infrastructure decisions."
          />
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          Current Project Activity
        </h2>

        <div style={styles.activity}>
          <span style={styles.dot} />
          <div>
            <strong>Field testing started</strong>
            <p>Testing the monitoring prototype in Dhule City.</p>
          </div>
          <span style={styles.date}>Today</span>
        </div>

        <div style={styles.activity}>
          <span style={styles.dot} />
          <div>
            <strong>Prototype updated</strong>
            <p>Sensor data processing module was improved.</p>
          </div>
          <span style={styles.date}>2 days ago</span>
        </div>

        <div style={styles.activity}>
          <span style={styles.dot} />
          <div>
            <strong>Industry review completed</strong>
            <p>Technical feedback received from industry mentor.</p>
          </div>
          <span style={styles.date}>5 days ago</span>
        </div>
      </div>
    </div>
  );
}

function Objective({ number, title, text }) {
  return (
    <div style={styles.objective}>
      <span style={styles.number}>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "18px",
    marginBottom: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "18px",
  },

  label: {
    margin: "0 0 8px",
    color: "#9B6670",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "0 0 10px",
    fontSize: "21px",
  },

  text: {
    margin: 0,
    color: "#666",
    lineHeight: "1.7",
    fontSize: "14px",
  },

  statusRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginBottom: "12px",
  },

  statusRowStrong: {
    fontSize: "30px",
  },

  progressBar: {
    height: "9px",
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4A4A4A",
  },

  smallText: {
    fontSize: "12px",
    color: "#888",
    margin: "10px 0 0",
  },

  sectionTitle: {
    margin: "0 0 18px",
    fontSize: "19px",
  },

  objectiveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },

  objective: {
    display: "flex",
    gap: "12px",
    padding: "15px",
    background: "#FFF5F5",
    borderRadius: "10px",
  },

  number: {
    color: "#9B6670",
    fontWeight: "800",
    fontSize: "12px",
  },

  activity: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "15px 0",
    borderTop: "1px solid #F0E1E1",
  },

  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#4A4A4A",
    marginTop: "5px",
    flexShrink: 0,
  },

  date: {
    marginLeft: "auto",
    fontSize: "11px",
    color: "#999",
    whiteSpace: "nowrap",
  },
};

export default ProjectOverview;