import React from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#FFF5F5",
  light: "#F7D6D0",
  accent: "#E2B4BD",
  text: "#4A4A4A",
  white: "#FFFFFF",
};

const stats = [
  {
    title: "Active Projects",
    value: "12",
    subtitle: "Currently in progress",
    icon: "📋",
  },
  {
    title: "Students Involved",
    value: "48",
    subtitle: "Working on projects",
    icon: "🎓",
  },
  {
    title: "Faculty / Mentors",
    value: "14",
    subtitle: "Supporting students",
    icon: "👨‍🏫",
  },
  {
    title: "Active Teams",
    value: "10",
    subtitle: "Student teams",
    icon: "👥",
  },
];

const projectStats = [
  {
    title: "Awaiting Allocation",
    value: "4",
    description: "Validated problems ready for university allocation",
  },
  {
    title: "In Progress",
    value: "12",
    description: "Projects currently being worked on",
  },
  {
    title: "Completed",
    value: "6",
    description: "Projects completed by university teams",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "New project routed to university",
    description:
      "Frequent electricity interruptions — Dhule City",
    time: "Today, 10:30 AM",
  },
  {
    id: 2,
    title: "Team Samanvay-04 created",
    description:
      "4 students added and faculty mentor assigned",
    time: "Today, 09:15 AM",
  },
  {
    id: 3,
    title: "Project progress updated",
    description:
      "Water supply improvement project reached 65%",
    time: "Yesterday, 04:20 PM",
  },
  {
    id: 4,
    title: "Project completed",
    description:
      "Road damage reporting solution marked completed",
    time: "Yesterday, 12:45 PM",
  },
];

const activeProjects = [
  {
    id: "UNI-001",
    title: "Smart Electricity Issue Monitoring",
    category: "Electricity",
    location: "Dhule City",
    team: "Team Volt",
    mentor: "Dr. Anjali Patil",
    progress: 72,
    status: "In Progress",
  },
  {
    id: "UNI-002",
    title: "Water Supply Monitoring System",
    category: "Water & Sanitation",
    location: "Deopur, Dhule",
    team: "Team Jal",
    mentor: "Prof. Rahul Deshmukh",
    progress: 65,
    status: "In Progress",
  },
  {
    id: "UNI-003",
    title: "Road Damage Reporting Platform",
    category: "PWD & Roads",
    location: "Chalisgaon Road",
    team: "Team Marg",
    mentor: "Dr. Sneha Kulkarni",
    progress: 88,
    status: "Near Completion",
  },
];

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: "16px",
        padding: "22px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 4px 14px rgba(74, 74, 74, 0.06)",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: COLORS.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: COLORS.text,
            opacity: 0.7,
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "4px 0",
            color: COLORS.text,
            fontSize: "28px",
          }}
        >
          {value}
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: COLORS.text,
            opacity: 0.6,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function SectionCard({ title, children, action }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: "16px",
        padding: "22px",
        boxShadow: "0 4px 14px rgba(74, 74, 74, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: COLORS.text,
            fontSize: "18px",
          }}
        >
          {title}
        </h3>

        {action}
      </div>

      {children}
    </div>
  );
}

function ProgressBar({ progress }) {
  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        background: COLORS.light,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: COLORS.accent,
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

function UniversityDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          background: COLORS.white,
          borderBottom: `1px solid ${COLORS.accent}`,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: COLORS.text,
              fontSize: "21px",
            }}
          >
            Samanvay Portal
          </h2>

          <p
            style={{
              margin: "3px 0 0",
              fontSize: "12px",
              opacity: 0.65,
            }}
          >
            University Workspace
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "transparent",
              color: COLORS.text,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Home
          </button>

          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: COLORS.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            U
          </div>
        </div>
      </nav>

      {/* Main */}
      <main
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "32px 24px 50px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "14px",
              opacity: 0.65,
            }}
          >
            Dhule District
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              color: COLORS.text,
            }}
          >
            University Dashboard
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: COLORS.text,
              opacity: 0.7,
            }}
          >
            Coordinate students, faculty, teams and societal projects.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Project status */}
        <SectionCard title="Project Overview">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {projectStats.map((item) => (
              <div
                key={item.title}
                style={{
                  background: COLORS.background,
                  borderRadius: "12px",
                  padding: "18px",
                  border: `1px solid ${COLORS.light}`,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    opacity: 0.7,
                  }}
                >
                  {item.title}
                </p>

                <h2
                  style={{
                    margin: "8px 0",
                    fontSize: "26px",
                  }}
                >
                  {item.value}
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.5,
                    opacity: 0.65,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Two-column section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.7fr) minmax(280px, 1fr)",
            gap: "22px",
            marginTop: "22px",
          }}
        >
          {/* Active projects */}
          <SectionCard
            title="Active Projects"
            action={
              <button
                onClick={() => navigate("/university/projects")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: COLORS.text,
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                View All →
              </button>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    border: `1px solid ${COLORS.light}`,
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "11px",
                          opacity: 0.55,
                        }}
                      >
                        {project.id}
                      </p>

                      <h4
                        style={{
                          margin: "5px 0",
                          fontSize: "16px",
                        }}
                      >
                        {project.title}
                      </h4>

                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          opacity: 0.65,
                        }}
                      >
                        {project.category} • {project.location}
                      </p>
                    </div>

                    <span
                      style={{
                        height: "fit-content",
                        padding: "6px 10px",
                        borderRadius: "20px",
                        background: COLORS.light,
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginBottom: "6px",
                      }}
                    >
                      <span>Progress</span>
                      <strong>{project.progress}%</strong>
                    </div>

                    <ProgressBar progress={project.progress} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      fontSize: "12px",
                      opacity: 0.7,
                    }}
                  >
                    <span>Team: {project.team}</span>
                    <span>Mentor: {project.mentor}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Recent activity */}
          <SectionCard title="Recent Activity">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: COLORS.accent,
                      borderRadius: "50%",
                      marginTop: "5px",
                      flexShrink: 0,
                    }}
                  />

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "13px",
                      }}
                    >
                      {activity.title}
                    </h4>

                    <p
                      style={{
                        margin: "5px 0",
                        fontSize: "12px",
                        lineHeight: 1.45,
                        opacity: 0.65,
                      }}
                    >
                      {activity.description}
                    </p>

                    <span
                      style={{
                        fontSize: "10px",
                        opacity: 0.5,
                      }}
                    >
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Quick actions */}
        <SectionCard
          title="University Workspace"
          action={
            <span
              style={{
                fontSize: "12px",
                opacity: 0.55,
              }}
            >
              Quick Access
            </span>
          }
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            <button
              onClick={() => navigate("/university/projects")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.accent}`,
                background: COLORS.background,
                color: COLORS.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <strong>📋 Projects</strong>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  opacity: 0.65,
                }}
              >
                View university projects
              </p>
            </button>

            <button
              onClick={() => navigate("/university/admin")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.accent}`,
                background: COLORS.background,
                color: COLORS.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <strong>⚙️ Administration</strong>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  opacity: 0.65,
                }}
              >
                Manage university activities
              </p>
            </button>

            <button
              onClick={() => navigate("/university/teams")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.accent}`,
                background: COLORS.background,
                color: COLORS.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <strong>👥 Teams</strong>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  opacity: 0.65,
                }}
              >
                Manage student teams
              </p>
            </button>

            <button
              onClick={() => navigate("/university/allocation")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.accent}`,
                background: COLORS.background,
                color: COLORS.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <strong>🎯 Allocation</strong>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  opacity: 0.65,
                }}
              >
                Allocate projects to teams
              </p>
            </button>
          </div>
        </SectionCard>

        {/* Prototype note */}
        <div
          style={{
            marginTop: "24px",
            padding: "14px 16px",
            borderRadius: "12px",
            background: COLORS.light,
            fontSize: "12px",
            lineHeight: 1.5,
          }}
        >
          <strong>Prototype Data:</strong> University information shown here
          is synthetic and scoped to the Dhule District prototype. It will
          later be connected to the university database and backend.
        </div>
      </main>
    </div>
  );
}

export default UniversityDashboard;