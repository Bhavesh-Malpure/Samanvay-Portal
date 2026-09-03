import React, { useState } from "react";

const projectData = [
  {
    id: "IND-001",
    title: "Smart Electricity Monitoring",
    problem: "Frequent electricity interruptions",
    category: "Electricity",
    location: "Dhule City",
    priority: "High",
    team: "Team Volt",
    mentor: "Dr. Amit Patil",
    university: "Dhule Engineering University",
    progress: 72,
    status: "In Progress",
    support: "Technical Mentorship",
  },
  {
    id: "IND-002",
    title: "Water Leakage Detection",
    problem: "Irregular water supply and leakage",
    category: "Water & Sanitation",
    location: "Deopur, Dhule",
    priority: "Medium-High",
    team: "Team JalRakshak",
    mentor: "Prof. Sneha Deshmukh",
    university: "Dhule Engineering University",
    progress: 54,
    status: "In Progress",
    support: "Prototype Support",
  },
  {
    id: "IND-003",
    title: "Smart Road Safety System",
    problem: "Road damage near public school",
    category: "PWD & Roads",
    location: "Chalisgaon Road",
    priority: "Minimum",
    team: "Team RoadSafe",
    mentor: "Prof. Rahul Joshi",
    university: "Dhule Engineering University",
    progress: 35,
    status: "In Progress",
    support: "Industry Expertise",
  },
  {
    id: "IND-004",
    title: "Solar Street Infrastructure",
    problem: "Low visibility in selected public areas",
    category: "Electricity",
    location: "Shirpur",
    priority: "High",
    team: "Team SolarWatch",
    mentor: "Dr. Priya Kulkarni",
    university: "North Maharashtra Technical Institute",
    progress: 88,
    status: "Near Completion",
    support: "Implementation Support",
  },
  {
    id: "IND-005",
    title: "Accessible Public Infrastructure",
    problem: "Accessibility barriers for citizens",
    category: "PWD & Roads",
    location: "Dhule City",
    priority: "Minimum",
    team: "Team Access",
    mentor: "Prof. Rahul Joshi",
    university: "Dhule Engineering University",
    progress: 100,
    status: "Completed",
    support: "Technical Mentorship",
  },
];

function IndustryProjects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === "All"
      ? projectData
      : projectData.filter((project) => project.status === filter);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INDUSTRY PROJECTS</p>
            <h1 style={styles.title}>Supported Projects</h1>
            <p style={styles.subtitle}>
              Track projects where your industry is contributing expertise,
              resources or implementation support.
            </p>
          </div>
        </div>

        <div style={styles.toolbar}>
          <div style={styles.filters}>
            {["All", "In Progress", "Near Completion", "Completed"].map(
              (item) => (
                <button
                  key={item}
                  style={
                    filter === item
                      ? styles.activeFilter
                      : styles.filterButton
                  }
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <span style={styles.count}>
            {filteredProjects.length} projects
          </span>
        </div>

        <div style={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.projectId}>{project.id}</span>

                <span style={styles.status}>
                  {project.status}
                </span>
              </div>

              <h2 style={styles.projectTitle}>{project.title}</h2>

              <p style={styles.problem}>{project.problem}</p>

              <div style={styles.meta}>
                <span>{project.category}</span>
                <span>{project.location}</span>
              </div>

              <div style={styles.teamBox}>
                <strong>{project.team}</strong>
                <span>{project.university}</span>
                <span>Mentor: {project.mentor}</span>
              </div>

              <div style={styles.progressTop}>
                <span>Project Progress</span>
                <strong>{project.progress}%</strong>
              </div>

              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: project.progress + "%",
                  }}
                />
              </div>

              <div style={styles.support}>
                Industry support: <strong>{project.support}</strong>
              </div>

              <button
                style={styles.detailsButton}
                onClick={() => setSelectedProject(project)}
              >
                View Project Details
              </button>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <div>
                  <span style={styles.projectId}>
                    {selectedProject.id}
                  </span>
                  <h2 style={styles.modalTitle}>
                    {selectedProject.title}
                  </h2>
                </div>

                <button
                  style={styles.closeButton}
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
              </div>

              <div style={styles.modalBody}>
                <Info
                  label="Societal Problem"
                  value={selectedProject.problem}
                />
                <Info
                  label="Category"
                  value={selectedProject.category}
                />
                <Info
                  label="Location"
                  value={selectedProject.location}
                />
                <Info
                  label="Priority"
                  value={selectedProject.priority}
                />
                <Info
                  label="University"
                  value={selectedProject.university}
                />
                <Info
                  label="Student Team"
                  value={selectedProject.team}
                />
                <Info
                  label="Faculty Mentor"
                  value={selectedProject.mentor}
                />
                <Info
                  label="Industry Contribution"
                  value={selectedProject.support}
                />
              </div>

              <div style={styles.modalProgress}>
                <div style={styles.progressTop}>
                  <span>Overall Progress</span>
                  <strong>{selectedProject.progress}%</strong>
                </div>

                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: selectedProject.progress + "%",
                    }}
                  />
                </div>
              </div>

              <button
                style={styles.closeModalButton}
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.info}>
      <span style={styles.infoLabel}>{label}</span>
      <strong style={styles.infoValue}>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF5F5",
    padding: "32px",
    color: "#4A4A4A",
  },

  container: {
    maxWidth: "1250px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "25px",
  },

  eyebrow: {
    margin: 0,
    color: "#9B6670",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: "6px 0",
    fontSize: "30px",
  },

  subtitle: {
    margin: 0,
    color: "#888",
    fontSize: "14px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  filters: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  filterButton: {
    border: "1px solid #E2B4BD",
    background: "#FFFFFF",
    color: "#4A4A4A",
    padding: "9px 13px",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeFilter: {
    border: "1px solid #4A4A4A",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "9px 13px",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "700",
  },

  count: {
    fontSize: "13px",
    color: "#888",
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "21px",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  projectId: {
    fontSize: "11px",
    color: "#9B6670",
    fontWeight: "800",
  },

  status: {
    fontSize: "11px",
    background: "#F7D6D0",
    padding: "5px 9px",
    borderRadius: "10px",
    fontWeight: "700",
  },

  projectTitle: {
    margin: "9px 0 5px",
    fontSize: "19px",
  },

  problem: {
    margin: 0,
    color: "#777",
    fontSize: "13px",
  },

  meta: {
    display: "flex",
    gap: "8px",
    marginTop: "15px",
  },

  teamBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "15px",
    padding: "12px",
    background: "#FFF5F5",
    borderRadius: "9px",
    fontSize: "12px",
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    marginBottom: "7px",
    fontSize: "12px",
  },

  progressBar: {
    height: "8px",
    background: "#F7D6D0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4A4A4A",
    borderRadius: "10px",
  },

  support: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#777",
  },

  detailsButton: {
    marginTop: "15px",
    width: "100%",
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(74, 74, 74, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  modal: {
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "25px",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  modalTitle: {
    margin: "6px 0 0",
    fontSize: "22px",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalBody: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "22px",
  },

  info: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "9px",
    padding: "12px",
  },

  infoLabel: {
    display: "block",
    color: "#999",
    fontSize: "11px",
    marginBottom: "5px",
  },

  infoValue: {
    fontSize: "13px",
  },

  modalProgress: {
    marginTop: "20px",
  },

  closeModalButton: {
    marginTop: "22px",
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default IndustryProjects;