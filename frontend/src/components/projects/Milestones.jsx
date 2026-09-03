import React, { useState } from "react";

const initialMilestones = [
  {
    id: 1,
    title: "Problem Analysis",
    description: "Study the electricity interruption problem.",
    status: "Completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Requirement Gathering",
    description: "Identify technical and user requirements.",
    status: "Completed",
    progress: 100,
  },
  {
    id: 3,
    title: "Prototype Development",
    description: "Develop the initial monitoring prototype.",
    status: "Completed",
    progress: 100,
  },
  {
    id: 4,
    title: "Field Testing",
    description: "Test the prototype in selected Dhule locations.",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 5,
    title: "Final Deployment",
    description: "Prepare the solution for practical deployment.",
    status: "Pending",
    progress: 0,
  },
];

function Milestones() {
  const [milestones, setMilestones] = useState(initialMilestones);

  const markComplete = (id) => {
    setMilestones(
      milestones.map((milestone) =>
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
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Project Milestones</h2>
          <p style={styles.subtitle}>
            Track important stages of project development.
          </p>
        </div>

        <span style={styles.count}>
          {milestones.filter(
            (item) => item.status === "Completed"
          ).length}{" "}
          / {milestones.length} completed
        </span>
      </div>

      <div>
        {milestones.map((milestone, index) => (
          <div key={milestone.id} style={styles.milestone}>
            <div style={styles.timeline}>
              <div
                style={{
                  ...styles.circle,
                  background:
                    milestone.status === "Completed"
                      ? "#4A4A4A"
                      : "#F7D6D0",
                  color:
                    milestone.status === "Completed"
                      ? "#FFF5F5"
                      : "#4A4A4A",
                }}
              >
                {milestone.status === "Completed"
                  ? "✓"
                  : milestone.id}
              </div>

              {index < milestones.length - 1 && (
                <div style={styles.line} />
              )}
            </div>

            <div style={styles.content}>
              <div style={styles.top}>
                <div>
                  <h3 style={styles.milestoneTitle}>
                    {milestone.title}
                  </h3>

                  <p style={styles.description}>
                    {milestone.description}
                  </p>
                </div>

                <span style={styles.status}>
                  {milestone.status}
                </span>
              </div>

              <div style={styles.progressRow}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: milestone.progress + "%",
                    }}
                  />
                </div>

                <span>{milestone.progress}%</span>
              </div>

              {milestone.status !== "Completed" && (
                <button
                  style={styles.completeButton}
                  onClick={() => markComplete(milestone.id)}
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "24px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#888",
    fontSize: "13px",
  },

  count: {
    background: "#F7D6D0",
    padding: "7px 11px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "700",
    height: "fit-content",
  },

  milestone: {
    display: "flex",
    gap: "16px",
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30px",
  },

  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "800",
    flexShrink: 0,
  },

  line: {
    width: "2px",
    flex: 1,
    minHeight: "70px",
    background: "#E2B4BD",
  },

  content: {
    flex: 1,
    paddingBottom: "28px",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },

  milestoneTitle: {
    margin: 0,
    fontSize: "16px",
  },

  description: {
    margin: "5px 0 12px",
    color: "#888",
    fontSize: "12px",
  },

  status: {
    height: "fit-content",
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    padding: "5px 8px",
    borderRadius: "10px",
    fontSize: "10px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "11px",
  },

  progressBar: {
    height: "7px",
    flex: 1,
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4A4A4A",
  },

  completeButton: {
    marginTop: "10px",
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    padding: "6px 10px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Milestones;