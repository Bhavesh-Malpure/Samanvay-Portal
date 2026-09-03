import React from "react";

const metrics = [
  {
    label: "Citizens Potentially Impacted",
    value: "1,240",
    description: "Estimated population in target areas",
  },
  {
    label: "Target Locations",
    value: "8",
    description: "Locations identified for monitoring",
  },
  {
    label: "Problems Addressed",
    value: "12",
    description: "Related electricity complaints",
  },
  {
    label: "Expected Improvement",
    value: "25%",
    description: "Estimated improvement after deployment",
  },
];

function ImpactMetrics() {
  return (
    <div>
      <div style={styles.intro}>
        <div>
          <p style={styles.eyebrow}>SOCIAL IMPACT</p>

          <h2 style={styles.title}>
            Project Impact Metrics
          </h2>

          <p style={styles.subtitle}>
            Track the expected and measurable impact of the
            project on the Dhule community.
          </p>
        </div>
      </div>

      <div style={styles.grid}>
        {metrics.map((metric) => (
          <div key={metric.label} style={styles.card}>
            <p style={styles.label}>{metric.label}</p>

            <h2 style={styles.value}>{metric.value}</h2>

            <p style={styles.description}>
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>
          Impact Areas
        </h2>

        <div style={styles.impactGrid}>
          <Impact
            title="Reliability"
            value="Improved"
            text="Better visibility into recurring electricity interruptions."
          />

          <Impact
            title="Decision Making"
            value="Data Driven"
            text="Authorities can use collected information for planning."
          />

          <Impact
            title="Citizen Awareness"
            value="Increased"
            text="Citizens can receive clearer information about issues."
          />

          <Impact
            title="Infrastructure"
            value="Supported"
            text="Problem patterns can help identify infrastructure priorities."
          />
        </div>
      </div>

      <div style={styles.note}>
        <strong>Prototype metric:</strong> These values are
        synthetic demonstration data for the Samanvay Portal
        prototype and are not real government measurements.
      </div>
    </div>
  );
}

function Impact({ title, value, text }) {
  return (
    <div style={styles.impact}>
      <div style={styles.impactTop}>
        <h3>{title}</h3>
        <span>{value}</span>
      </div>

      <p>{text}</p>
    </div>
  );
}

const styles = {
  intro: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "18px",
  },

  eyebrow: {
    margin: "0 0 6px",
    color: "#9B6670",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: 0,
    fontSize: "21px",
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#666",
    fontSize: "13px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "18px",
  },

  label: {
    margin: 0,
    fontSize: "12px",
    color: "#777",
    lineHeight: "1.4",
  },

  value: {
    margin: "10px 0 5px",
    fontSize: "29px",
  },

  description: {
    margin: 0,
    color: "#999",
    fontSize: "11px",
  },

  sectionTitle: {
    margin: "0 0 18px",
    fontSize: "19px",
  },

  impactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },

  impact: {
    background: "#FFF5F5",
    borderRadius: "10px",
    padding: "16px",
  },

  impactTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  impact: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "16px",
  },

  note: {
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "12px",
    lineHeight: "1.6",
  },
};

export default ImpactMetrics;