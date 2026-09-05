import React, { useState } from "react";

function Milestones() {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Problem Analysis",
      description: "Study the electricity-related societal problem.",
      status: "Completed",
      progress: 100,
    },
    {
      id: 2,
      title: "Requirement Gathering",
      description: "Identify technical and field requirements.",
      status: "Completed",
      progress: 100,
    },
    {
      id: 3,
      title: "Prototype Development",
      description: "Develop the initial IoT monitoring prototype.",
      status: "Completed",
      progress: 100,
    },
    {
      id: 4,
      title: "Field Testing",
      description: "Test the prototype at selected Dhule locations.",
      status: "In Progress",
      progress: 65,
    },
    {
      id: 5,
      title: "Final Deployment",
      description: "Prepare the system for final deployment.",
      status: "Pending",
      progress: 0,
    },
  ]);

  const markComplete = (id) => {
    setMilestones((current) =>
      current.map((milestone) =>
        milestone.id === id
          ? {
              ...milestone,
              status: "Completed",
              progress: 100,
            }
          : milestone
      )
    );
  };

  return (
    <div>
      <h2 style={styles.title}>Project Milestones</h2>

      <p style={styles.description}>
        Track the major stages of the project from problem analysis
        to final deployment.
      </p>

      <div style={styles.timeline}>
        {milestones.map((milestone, index) => (
          <div key={milestone.id} style={styles.milestone}>
            <div style={styles.timelineLeft}>
              <div
                style={{
                  ...styles.circle,
                  ...(milestone.status === "Completed"
                    ? styles.completedCircle
                    : {}),
                }}
              >
                {milestone.status === "Completed"
                  ? "✓"
                  : index + 1}
              </div>

              {index !== milestones.length - 1 && (
                <div style={styles.line} />
              )}
            </div>

            <div style={styles.milestoneCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.milestoneTitle}>
                    {milestone.title}
                  </h3>

                  <p style={styles.milestoneDescription}>
                    {milestone.description}
                  </p>
                </div>

                <span
                  style={{
                    ...styles.status,
                    ...(milestone.status === "Completed"
                      ? styles.completedStatus
                      : milestone.status === "In Progress"
                      ? styles.progressStatus
                      : styles.pendingStatus),
                  }}
                >
                  {milestone.status}
                </span>
              </div>

              <div style={styles.progressRow}>
                <div style={styles.progressBackground}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: milestone.progress + "%",
                    }}
                  />
                </div>

                <span style={styles.progressText}>
                  {milestone.progress}%
                </span>
              </div>

              {milestone.status === "In Progress" && (
                <button
                  onClick={() => markComplete(milestone.id)}
                  style={styles.completeButton}
                >
                  Mark Complete
                </button>
              )}

              {milestone.status === "Pending" && (
                <span style={styles.pendingText}>
                  This milestone has not started yet.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title: {
    margin: "0 0 8px",
    fontSize: "23px",
    color: "#4A4A4A",
  },

  description: {
    margin: 0,
    color: "#6F6064",
    fontSize: "14px",
  },

  timeline: {
    marginTop: "25px",
  },

  milestone: {
    display: "flex",
    gap: "15px",
  },

  timelineLeft: {
    width: "35px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#F7D6D0",
    color: "#6F6064",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },

  completedCircle: {
    background: "#E2B4BD",
    color: "#4A4A4A",
  },

  line: {
    width: "2px",
    flex: 1,
    minHeight: "45px",
    background: "#F0D6DA",
  },

  milestoneCard: {
    flex: 1,
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "15px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  milestoneTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#4A4A4A",
  },

  milestoneDescription: {
    margin: "5px 0 0",
    fontSize: "13px",
    color: "#7A696D",
  },

  status: {
    height: "fit-content",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  completedStatus: {
    background: "#E2B4BD",
  },

  progressStatus: {
    background: "#F7D6D0",
  },

  pendingStatus: {
    background: "#EEEEEE",
    color: "#777777",
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },

  progressBackground: {
    flex: 1,
    height: "7px",
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#E2B4BD",
    borderRadius: "10px",
  },

  progressText: {
    fontSize: "12px",
    color: "#7A696D",
    width: "35px",
  },

  completeButton: {
    marginTop: "12px",
    border: "none",
    background: "#E2B4BD",
    color: "#4A4A4A",
    borderRadius: "7px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  pendingText: {
    display: "block",
    marginTop: "10px",
    fontSize: "12px",
    color: "#918085",
  },
};

export default Milestones;