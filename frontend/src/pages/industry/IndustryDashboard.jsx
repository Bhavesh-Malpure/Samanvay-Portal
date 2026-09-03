import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Active Projects",
    value: "4",
    description: "Currently supported",
  },
  {
    title: "Collaboration Requests",
    value: "3",
    description: "Awaiting response",
  },
  {
    title: "Student Teams",
    value: "6",
    description: "Under industry support",
  },
  {
    title: "Completed Projects",
    value: "2",
    description: "Successfully completed",
  },
];

const projects = [
  {
    id: "IND-001",
    title: "Smart Electricity Monitoring",
    category: "Electricity",
    team: "Team Volt",
    university: "Dhule Engineering University",
    progress: 72,
    status: "In Progress",
  },
  {
    id: "IND-002",
    title: "Water Leakage Detection",
    category: "Water & Sanitation",
    team: "Team JalRakshak",
    university: "Dhule Engineering University",
    progress: 54,
    status: "In Progress",
  },
  {
    id: "IND-003",
    title: "Smart Road Safety System",
    category: "PWD & Roads",
    team: "Team RoadSafe",
    university: "Dhule Engineering University",
    progress: 35,
    status: "In Progress",
  },
];

const requests = [
  {
    id: "REQ-001",
    university: "Dhule Engineering University",
    project: "Solar-powered Street Monitoring",
    students: 5,
    status: "Pending",
  },
  {
    id: "REQ-002",
    university: "North Maharashtra Technical Institute",
    project: "Smart Water Management",
    students: 4,
    status: "Pending",
  },
  {
    id: "REQ-003",
    university: "Dhule Engineering University",
    project: "Accessible Road Navigation",
    students: 5,
    status: "Pending",
  },
];

function IndustryDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>SAMANVAY PORTAL</p>
            <h1 style={styles.title}>Industry Dashboard</h1>
            <p style={styles.subtitle}>
              Connect with universities and support solutions for societal
              problems in Dhule.
            </p>
          </div>

          <div style={styles.headerActions}>
            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/industry/profile")}
            >
              Industry Profile
            </button>

            <button
              style={styles.primaryButton}
              onClick={() => navigate("/industry/projects")}
            >
              View Projects
            </button>
          </div>
        </div>

        {/* Industry Identity */}
        <div style={styles.identityCard}>
          <div style={styles.logoCircle}>D</div>

          <div>
            <h2 style={styles.identityTitle}>
              Dhule Industrial Solutions Pvt. Ltd.
            </h2>
            <p style={styles.identityText}>
              Technology & Infrastructure Solutions • Dhule District
            </p>
          </div>

          <div style={styles.verifiedBadge}>Verified Industry</div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.title} style={styles.statCard}>
              <p style={styles.statTitle}>{stat.title}</p>
              <h2 style={styles.statValue}>{stat.value}</h2>
              <p style={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={styles.mainGrid}>
          {/* Projects */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Active Projects</h2>
                <p style={styles.sectionSubtitle}>
                  Projects currently receiving industry support
                </p>
              </div>

              <button
                style={styles.linkButton}
                onClick={() => navigate("/industry/projects")}
              >
                View all
              </button>
            </div>

            <div>
              {projects.map((project) => (
                <div key={project.id} style={styles.projectRow}>
                  <div style={styles.projectInfo}>
                    <span style={styles.projectId}>{project.id}</span>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <p style={styles.projectMeta}>
                      {project.category} • {project.team}
                    </p>
                    <p style={styles.projectUniversity}>
                      {project.university}
                    </p>
                  </div>

                  <div style={styles.progressSection}>
                    <div style={styles.progressTop}>
                      <span>Progress</span>
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

                    <span style={styles.statusBadge}>{project.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Requests */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Collaboration Requests</h2>
                <p style={styles.sectionSubtitle}>
                  Requests from university teams
                </p>
              </div>

              <button
                style={styles.linkButton}
                onClick={() =>
                  navigate("/industry/collaboration-requests")
                }
              >
                Manage
              </button>
            </div>

            {requests.map((request) => (
              <div key={request.id} style={styles.requestCard}>
                <div style={styles.requestTop}>
                  <span style={styles.requestId}>{request.id}</span>
                  <span style={styles.pendingBadge}>{request.status}</span>
                </div>

                <h3 style={styles.requestTitle}>{request.project}</h3>

                <p style={styles.requestUniversity}>
                  {request.university}
                </p>

                <p style={styles.requestStudents}>
                  {request.students} students requesting collaboration
                </p>

                <button
                  style={styles.reviewButton}
                  onClick={() =>
                    navigate("/industry/collaboration-requests")
                  }
                >
                  Review Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Industry contribution */}
        <div style={styles.contributionCard}>
          <div>
            <p style={styles.eyebrow}>INDUSTRY CONTRIBUTION</p>
            <h2 style={styles.contributionTitle}>
              Turn local problems into practical solutions.
            </h2>
            <p style={styles.contributionText}>
              Industry partners can provide mentorship, technical expertise,
              infrastructure, resources and implementation support to student
              teams.
            </p>
          </div>

          <button
            style={styles.primaryButton}
            onClick={() => navigate("/industry/collaboration-requests")}
          >
            Explore Collaborations
          </button>
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
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "28px",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#9B6670",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
  },

  subtitle: {
    margin: "10px 0 0",
    color: "#777",
    fontSize: "15px",
  },

  headerActions: {
    display: "flex",
    gap: "12px",
  },

  primaryButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    color: "#4A4A4A",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  identityCard: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    borderRadius: "18px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },

  logoCircle: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    background: "#4A4A4A",
    color: "#FFF5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "800",
  },

  identityTitle: {
    margin: 0,
    fontSize: "19px",
  },

  identityText: {
    margin: "5px 0 0",
    color: "#777",
    fontSize: "14px",
  },

  verifiedBadge: {
    marginLeft: "auto",
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "24px",
  },

  statCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "15px",
    padding: "20px",
  },

  statTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#777",
  },

  statValue: {
    margin: "8px 0 4px",
    fontSize: "30px",
  },

  statDescription: {
    margin: 0,
    fontSize: "12px",
    color: "#999",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "22px",
  },

  sectionCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "22px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
  },

  sectionSubtitle: {
    margin: "5px 0 0",
    fontSize: "13px",
    color: "#888",
  },

  linkButton: {
    border: "none",
    background: "transparent",
    color: "#9B6670",
    fontWeight: "700",
    cursor: "pointer",
  },

  projectRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "18px 0",
    borderTop: "1px solid #F0E1E1",
  },

  projectInfo: {
    flex: 1,
  },

  projectId: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#9B6670",
  },

  projectTitle: {
    margin: "5px 0",
    fontSize: "16px",
  },

  projectMeta: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },

  projectUniversity: {
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#999",
  },

  progressSection: {
    width: "180px",
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    marginBottom: "7px",
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

  statusBadge: {
    display: "inline-block",
    marginTop: "8px",
    padding: "5px 9px",
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700",
  },

  requestCard: {
    borderTop: "1px solid #F0E1E1",
    padding: "16px 0",
  },

  requestTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  requestId: {
    fontSize: "11px",
    color: "#9B6670",
    fontWeight: "800",
  },

  pendingBadge: {
    fontSize: "11px",
    padding: "4px 8px",
    borderRadius: "10px",
    background: "#F7D6D0",
    fontWeight: "700",
  },

  requestTitle: {
    fontSize: "15px",
    margin: "8px 0 5px",
  },

  requestUniversity: {
    margin: 0,
    fontSize: "12px",
  },

  requestStudents: {
    margin: "5px 0 12px",
    color: "#888",
    fontSize: "12px",
  },

  reviewButton: {
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    borderRadius: "8px",
    padding: "7px 11px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  contributionCard: {
    marginTop: "24px",
    background: "#4A4A4A",
    color: "#FFF5F5",
    borderRadius: "18px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
  },

  contributionTitle: {
    margin: "4px 0 8px",
    fontSize: "22px",
  },

  contributionText: {
    margin: 0,
    maxWidth: "700px",
    fontSize: "14px",
    lineHeight: "1.6",
    opacity: 0.85,
  },
};

export default IndustryDashboard;