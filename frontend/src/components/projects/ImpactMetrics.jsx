import React from "react";

function ImpactMetrics() {
  const metrics = [
    {
      label: "Citizens Potentially Impacted",
      value: "1,240",
      description: "Estimated citizens benefiting from improved monitoring.",
    },
    {
      label: "Target Locations",
      value: "8",
      description: "Locations identified for monitoring.",
    },
    {
      label: "Problems Addressed",
      value: "12",
      description: "Electricity-related issues targeted.",
    },
    {
      label: "Expected Improvement",
      value: "25%",
      description: "Expected improvement in service reliability.",
    },
  ];

  const impactAreas = [
    {
      title: "Reliability",
      description:
        "Better identification of electricity interruptions and voltage fluctuations.",
    },
    {
      title: "Decision Making",
      description:
        "Data can help departments identify frequently affected locations.",
    },
    {
      title: "Citizen Awareness",
      description:
        "Improved information about electricity-related issues.",
    },
    {
      title: "Infrastructure",
      description:
        "Supports better planning of electricity infrastructure.",
    },
  ];

  return (
    <div>
      <h2 style={styles.title}>Impact Metrics</h2>

      <p style={styles.description}>
        Estimated societal impact of the Smart Electricity Monitoring
        project in Dhule District.
      </p>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} style={styles.metricCard}>
            <div style={styles.metricLabel}>
              {metric.label}
            </div>

            <div style={styles.metricValue}>
              {metric.value}
            </div>

            <div style={styles.metricDescription}>
              {metric.description}
            </div>
          </div>
        ))}
      </div>

      {/* Impact Areas */}
      <div style={styles.section}>
        <h3 style={styles.heading}>Impact Areas</h3>

        <div style={styles.impactGrid}>
          {impactAreas.map((area) => (
            <div key={area.title} style={styles.impact}>
              <h4 style={styles.impactTitle}>
                {area.title}
              </h4>

              <p style={styles.impactText}>
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype Note */}
      <div style={styles.note}>
        <strong>Prototype note:</strong> These impact values are
        synthetic estimates created for the Samanvay Portal prototype.
        Real impact metrics will be calculated from actual project
        and government data after backend integration.
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

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
    marginTop: "25px",
  },

  metricCard: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "18px",
  },

  metricLabel: {
    fontSize: "12px",
    color: "#7A696D",
    lineHeight: "1.4",
    minHeight: "34px",
  },

  metricValue: {
    fontSize: "27px",
    fontWeight: "700",
    color: "#4A4A4A",
    margin: "8px 0",
  },

  metricDescription: {
    fontSize: "11px",
    color: "#918085",
    lineHeight: "1.5",
  },

  section: {
    marginTop: "30px",
  },

  heading: {
    margin: "0 0 14px",
    fontSize: "18px",
    color: "#4A4A4A",
  },

  impactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },

  impact: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "16px",
  },

  impactTitle: {
    margin: "0 0 7px",
    fontSize: "15px",
    color: "#4A4A4A",
  },

  impactText: {
    margin: 0,
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#7A696D",
  },

  note: {
    marginTop: "25px",
    background: "#F7D6D0",
    borderRadius: "10px",
    padding: "15px",
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#5F5256",
  },
};

export default ImpactMetrics;