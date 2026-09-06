import React, { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock3,
  FileCheck2,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";
import StatCard from "../../components/dashboard/StatCard";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import PriorityChart from "../../components/dashboard/PriorityChart";
import ImpactCard from "../../components/dashboard/ImpactCard";
import api from "../../services/api";

/* =========================================================
   SAMANVAY PORTAL
   GOVERNMENT DASHBOARD
   Prototype scope: Dhule District
   ========================================================= */

const incomingProblems = [
  {
    id: "SAM-001",
    title: "Frequent electricity interruptions",
    category: "Electricity",
    location: "Dhule City",
    priority: "High",
    status: "Validated",
    department: "MSEDCL",
  },
  {
    id: "SAM-002",
    title: "Irregular water supply in residential area",
    category: "Water & Sanitation",
    location: "Deopur, Dhule",
    priority: "Medium-High",
    status: "Under Review",
    department: "Water Supply",
  },
  {
    id: "SAM-003",
    title: "Road damage near public school",
    category: "PWD & Roads",
    location: "Chalisgaon Road",
    priority: "Minimum",
    status: "Routed",
    department: "PWD",
  },
];

const priorityStyles = {
  High: {
    background: "#F7D6D0",
    color: "#4A4A4A",
    border: "#E2B4BD",
  },
  "Medium-High": {
    background: "#FFF5F5",
    color: "#4A4A4A",
    border: "#E2B4BD",
  },
  Minimum: {
    background: "#FFFFFF",
    color: "#4A4A4A",
    border: "#E2B4BD",
  },
};

const statusStyles = {
  Validated: {
    background: "#F7D6D0",
    color: "#4A4A4A",
  },
  "Under Review": {
    background: "#FFF5F5",
    color: "#4A4A4A",
  },
  Routed: {
    background: "#E2B4BD",
    color: "#4A4A4A",
  },
};

function GovernmentDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    validated: 0,
    rejected: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  const loadGovernmentStats = useCallback(async () => {
    try {
      setLoadingStats(true);

      console.log("Loading government stats...");

      const response = await api.get("/api/government/stats");

      console.log(
        "Government stats response:",
        response.data
      );

      if (response.data) {
        setStats({
          total: Number(response.data.total ?? 0),
          pending: Number(response.data.pending ?? 0),
          validated: Number(response.data.validated ?? 0),
          rejected: Number(response.data.rejected ?? 0),
        });
      }
    } catch (error) {
      console.error(
        "Failed to load government dashboard stats:",
        error
      );

      /*
       * Important:
       * Do NOT reset stats to zero when API fails.
       * Existing values should remain visible.
       */
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadGovernmentStats();

    // Refresh when browser/tab becomes active
    const handleFocus = () => {
      loadGovernmentStats();
    };

    // Refresh when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadGovernmentStats();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadGovernmentStats]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5F5",
        color: "#4A4A4A",
      }}
    >
      <Navbar />

      <main
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 24px 60px",
        }}
      >
        {/* =================================================
            HEADER
            ================================================= */}
        <section
          style={{
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  backgroundColor: "#F7D6D0",
                  border: "1px solid #E2B4BD",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#4A4A4A",
                  marginBottom: "14px",
                }}
              >
                <ShieldCheck size={16} />

                <span style={{ color: "#4A4A4A" }}>
                  Government Authority Workspace
                </span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: 1.15,
                  fontWeight: 800,
                  letterSpacing: "-0.8px",
                  color: "#4A4A4A",
                }}
              >
                Dhule District Dashboard
              </h1>

              <p
                style={{
                  margin: "12px 0 0",
                  maxWidth: "720px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#4A4A4A",
                }}
              >
                Monitor citizen-reported problems, validate submissions,
                review AI-assisted priorities, and coordinate the right
                departments for action.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "11px 15px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2B4BD",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow:
                  "0 5px 18px rgba(74, 74, 74, 0.05)",
              }}
            >
              <MapPin size={17} />

              <span style={{ color: "#4A4A4A" }}>
                Dhule District · Maharashtra
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            STATS
            ================================================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            title="Problems Received"
            value={
              loadingStats && stats.total === 0
                ? "..."
                : String(stats.total)
            }
            description="Citizen reports in prototype"
            icon={Activity}
            trend="+2 this week"
            trendType="positive"
          />

          <StatCard
            title="Pending Review"
            value={
              loadingStats && stats.pending === 0
                ? "..."
                : String(stats.pending)
            }
            description="Requires authority validation"
            icon={Clock3}
            trend={
              stats.pending > 0
                ? "Needs attention"
                : "All reviewed"
            }
            trendType={
              stats.pending > 0
                ? "neutral"
                : "positive"
            }
          />

          <StatCard
            title="High Priority"
            value="1"
            description="Electricity-related issue"
            icon={AlertTriangle}
            trend="Priority action"
            trendType="negative"
          />

          <StatCard
            title="Validated"
            value={
              loadingStats && stats.validated === 0
                ? "..."
                : String(stats.validated)
            }
            description="Successfully verified"
            icon={FileCheck2}
            trend={
              stats.total > 0
                ? `${Math.round(
                    (stats.validated / stats.total) * 100
                  )}% of reports`
                : "0% of reports"
            }
            trendType="positive"
          />

          <StatCard
            title="Rejected"
            value={
              loadingStats && stats.rejected === 0
                ? "..."
                : String(stats.rejected)
            }
            description="Rejected after government review"
            icon={XCircle}
            trend={
              stats.rejected > 0
                ? "Review outcome"
                : "No rejected reports"
            }
            trendType={
              stats.rejected > 0
                ? "negative"
                : "neutral"
            }
          />
        </section>

        {/* =================================================
            PRIORITY + IMPACT
            ================================================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.15fr) minmax(300px, 0.85fr)",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <PriorityChart
            high={1}
            mediumHigh={1}
            minimum={1}
          />

          <ImpactCard
            projects={3}
            people={12}
            resolved={stats.validated}
          />
        </section>

        {/* =================================================
            WORKFLOW OVERVIEW
            ================================================= */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2B4BD",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow:
              "0 8px 25px rgba(74, 74, 74, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#4A4A4A",
                }}
              >
                Government Response Workflow
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "14px",
                  color: "#4A4A4A",
                }}
              >
                From citizen report to coordinated action.
              </p>
            </div>

            <TrendingUp size={21} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                number: "01",
                title: "Incoming",
                text: "Citizen report",
              },
              {
                number: "02",
                title: "Validate",
                text: "Verify problem",
              },
              {
                number: "03",
                title: "Prioritize",
                text: "AI + framework",
              },
              {
                number: "04",
                title: "Route",
                text: "Assign department",
              },
              {
                number: "05",
                title: "Track",
                text: "Monitor impact",
              },
            ].map((step) => (
              <div
                key={step.number}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: "#FFF5F5",
                  border: "1px solid #E2B4BD",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9px",
                    backgroundColor: "#E2B4BD",
                    fontSize: "12px",
                    fontWeight: 800,
                    marginBottom: "11px",
                    color: "#4A4A4A",
                  }}
                >
                  {step.number}
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#4A4A4A",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: "12px",
                    lineHeight: 1.5,
                    color: "#4A4A4A",
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
            ================================================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.55fr) minmax(300px, 0.85fr)",
            gap: "20px",
          }}
        >
          {/* -----------------------------------------------
              INCOMING PROBLEMS
              ----------------------------------------------- */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2B4BD",
              borderRadius: "18px",
              padding: "24px",
              boxShadow:
                "0 8px 25px rgba(74, 74, 74, 0.05)",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#4A4A4A",
                  }}
                >
                  Incoming Problems
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "14px",
                    color: "#4A4A4A",
                  }}
                >
                  Review and coordinate citizen-reported issues.
                </p>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  backgroundColor: "#F7D6D0",
                  border: "1px solid #E2B4BD",
                  fontSize: "12px",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  color: "#4A4A4A",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#4A4A4A",
                  }}
                />

                {stats.pending} Active
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {incomingProblems.map((problem) => {
                const priority =
                  priorityStyles[problem.priority] ||
                  priorityStyles.Minimum;

                const status =
                  statusStyles[problem.status] ||
                  statusStyles["Under Review"];

                return (
                  <div
                    key={problem.id}
                    style={{
                      border: "1px solid #E2B4BD",
                      borderRadius: "14px",
                      padding: "17px",
                      backgroundColor: "#FFF5F5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "7px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 800,
                              color: "#4A4A4A",
                            }}
                          >
                            {problem.id}
                          </span>

                          <span
                            style={{
                              fontSize: "11px",
                              padding: "4px 8px",
                              borderRadius: "999px",
                              backgroundColor:
                                priority.background,
                              color: priority.color,
                              border: `1px solid ${priority.border}`,
                              fontWeight: 800,
                            }}
                          >
                            {problem.priority}
                          </span>
                        </div>

                        <h3
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            lineHeight: 1.4,
                            fontWeight: 800,
                            color: "#4A4A4A",
                          }}
                        >
                          {problem.title}
                        </h3>

                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginTop: "9px",
                            fontSize: "12px",
                            color: "#4A4A4A",
                          }}
                        >
                          <span>{problem.category}</span>
                          <span>•</span>
                          <span>{problem.location}</span>
                          <span>•</span>
                          <span>{problem.department}</span>
                        </div>
                      </div>

                      <span
                        style={{
                          flexShrink: 0,
                          padding: "6px 9px",
                          borderRadius: "8px",
                          backgroundColor: status.background,
                          color: status.color,
                          fontSize: "11px",
                          fontWeight: 800,
                          border: "1px solid #E2B4BD",
                        }}
                      >
                        {problem.status}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "14px",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "7px",
                          border: "none",
                          borderRadius: "9px",
                          padding: "9px 13px",
                          backgroundColor: "#4A4A4A",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: 800,
                        }}
                      >
                        <span style={{ color: "#FFFFFF" }}>
                          Review Problem
                        </span>

                        <ArrowRight
                          size={15}
                          style={{ color: "#FFFFFF" }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -----------------------------------------------
              ACTIVITY
              ----------------------------------------------- */}
          <div style={{ minWidth: 0 }}>
            <ActivityFeed />
          </div>
        </section>

        {/* =================================================
            QUICK INSIGHT
            ================================================= */}
        <section
          style={{
            marginTop: "24px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "#E2B4BD",
            border: "1px solid #E2B4BD",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              flexShrink: 0,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Users size={20} />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: "220px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 800,
                color: "#4A4A4A",
              }}
            >
              Collaboration opportunity detected
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: "13px",
                lineHeight: 1.5,
                color: "#4A4A4A",
              }}
            >
              SAM-001 may benefit from university technical support and
              industry collaboration after government validation.
            </p>
          </div>

          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              border: "1px solid #4A4A4A",
              borderRadius: "9px",
              padding: "9px 13px",
              backgroundColor: "#FFFFFF",
              color: "#4A4A4A",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            <span style={{ color: "#4A4A4A" }}>
              View Opportunity
            </span>

            <ArrowRight
              size={15}
              style={{ color: "#4A4A4A" }}
            />
          </button>
        </section>
      </main>
    </div>
  );
}

export default GovernmentDashboard;