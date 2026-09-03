import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  MapPin,
  MessageSquareText,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import EmptyState from "../../components/common/EmptyState";

const initialProblems = [
  {
    id: "SAM-001",
    title: "Frequent electricity interruptions in residential area",
    description:
      "Residents have reported frequent power interruptions in the area, especially during evening hours. The issue is affecting households, students, and small businesses.",
    category: "Electricity",
    priority: "High",
    status: "Under Review",
    location: "Deopur, Dhule",
    submittedDate: "28 Aug 2026",
    submittedBy: "Citizen",
    aiSummary:
      "Residents in Deopur are experiencing repeated electricity interruptions during evening hours. The issue may be affecting households, students, and local businesses and requires attention from the electricity authority.",
    department: "Maharashtra State Electricity Distribution Company Limited",
    authority: "Local Electricity Division, Dhule",
  },
  {
    id: "SAM-004",
    title: "Irregular water supply in residential locality",
    description:
      "Residents are receiving water supply at irregular intervals. The inconsistent schedule is creating difficulties for households and increasing dependence on private water sources.",
    category: "Water & Sanitation",
    priority: "Medium-High",
    status: "Under Review",
    location: "Chalisgaon Road Area, Dhule",
    submittedDate: "30 Aug 2026",
    submittedBy: "Citizen",
    aiSummary:
      "The reported locality is facing irregular municipal water supply. The issue may be affecting multiple households and requires verification of the current supply schedule and local water infrastructure.",
    department: "Dhule Municipal Corporation",
    authority: "Water Supply Department, Dhule",
  },
  {
    id: "SAM-005",
    title: "Damaged road surface near public access area",
    description:
      "A section of road has developed multiple damaged patches, creating difficulty for two-wheelers, pedestrians, and other vehicles using the route.",
    category: "PWD & Roads",
    priority: "Minimum",
    status: "Under Review",
    location: "MIDC Area, Dhule",
    submittedDate: "31 Aug 2026",
    submittedBy: "Citizen",
    aiSummary:
      "A damaged road section has been reported near the MIDC area. The issue may affect local transportation and pedestrian movement and should be inspected by the responsible road authority.",
    department: "Public Works Department",
    authority: "PWD Dhule Division",
  },
];

function getPriorityStyle(priority) {
  switch (priority) {
    case "High":
      return {
        background: "#FDECEC",
        color: "#B42318",
        border: "#F3B7B2",
      };

    case "Medium-High":
      return {
        background: "#FFF4E5",
        color: "#A15C00",
        border: "#E8C48A",
      };

    case "Minimum":
    default:
      return {
        background: "#F5F5F5",
        color: "#666666",
        border: "#D5D5D5",
      };
  }
}

function getCategoryStyle(category) {
  if (category === "Electricity") {
    return {
      background: "#FFF1F1",
      color: "#A33A3A",
    };
  }

  if (category === "Water & Sanitation") {
    return {
      background: "#F7E9EC",
      color: "#7B4A57",
    };
  }

  return {
    background: "#F2F2F2",
    color: "#5E5E5E",
  };
}

function ProblemValidation() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState(initialProblems);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [message, setMessage] = useState(null);

  const awaitingProblems = useMemo(
    () => problems.filter((problem) => problem.status === "Under Review"),
    [problems]
  );

  const validatedCount = problems.filter(
    (problem) => problem.status === "Validated"
  ).length;

  const rejectedCount = problems.filter(
    (problem) => problem.status === "Rejected"
  ).length;

  const handleValidate = (problem) => {
    setProcessingId(problem.id);

    setTimeout(() => {
      setProblems((currentProblems) =>
        currentProblems.map((item) =>
          item.id === problem.id
            ? {
                ...item,
                status: "Validated",
              }
            : item
        )
      );

      setSelectedProblem(null);
      setProcessingId(null);

      setMessage({
        type: "success",
        text: `${problem.id} has been validated successfully.`,
      });
    }, 500);
  };

  const handleReject = (problem) => {
    setProcessingId(problem.id);

    setTimeout(() => {
      setProblems((currentProblems) =>
        currentProblems.map((item) =>
          item.id === problem.id
            ? {
                ...item,
                status: "Rejected",
              }
            : item
        )
      );

      setSelectedProblem(null);
      setProcessingId(null);

      setMessage({
        type: "error",
        text: `${problem.id} has been rejected.`,
      });
    }, 500);
  };

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
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        {/* Back */}
        <button
          onClick={() => navigate("/government")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            color: "#4A4A4A",
            fontWeight: 700,
            padding: 0,
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={18} />
          Back to Government Dashboard
        </button>

        {/* Header */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #F7D6D0 0%, #FFF5F5 70%)",
            border: "1px solid #E2B4BD",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "760px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2B4BD",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginBottom: "14px",
                }}
              >
                <ShieldAlert size={15} />
                GOVERNMENT VALIDATION WORKSPACE
              </div>

              <h1
                style={{
                  margin: "0 0 10px",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: 1.1,
                  color: "#4A4A4A",
                }}
              >
                Problem Validation
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#666666",
                }}
              >
                Review citizen-reported problems, verify the information,
                inspect AI-generated insights, and validate genuine issues
                before they are routed to the responsible authority.
              </p>
            </div>

            <div
              style={{
                minWidth: "190px",
                padding: "18px",
                borderRadius: "18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2B4BD",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#7B4A57",
                  fontWeight: 800,
                  fontSize: "13px",
                  marginBottom: "8px",
                }}
              >
                <Clock3 size={17} />
                Awaiting Review
              </div>

              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  color: "#4A4A4A",
                }}
              >
                {awaitingProblems.length}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#777777",
                  marginTop: "3px",
                }}
              >
                Problems require validation
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        {message && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "14px 16px",
              marginBottom: "22px",
              borderRadius: "14px",
              backgroundColor:
                message.type === "success" ? "#EDF8F1" : "#FDECEC",
              border: `1px solid ${
                message.type === "success" ? "#B7DEC2" : "#F1B8B4"
              }`,
              color:
                message.type === "success" ? "#24663B" : "#9B2C27",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              {message.type === "success" ? (
                <CheckCircle2 size={19} />
              ) : (
                <XCircle size={19} />
              )}

              {message.text}
            </div>

            <button
              onClick={() => setMessage(null)}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                fontWeight: 800,
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2B4BD",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                color: "#7B4A57",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              <Clock3 size={17} />
              Awaiting Validation
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {awaitingProblems.length}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2B4BD",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                color: "#24663B",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              <FileCheck2 size={17} />
              Validated
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {validatedCount}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2B4BD",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                color: "#9B2C27",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              <XCircle size={17} />
              Rejected
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {rejectedCount}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section>
          <div style={{ marginBottom: "18px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                color: "#4A4A4A",
              }}
            >
              Problems Awaiting Validation
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#777777",
                fontSize: "14px",
              }}
            >
              Review each report before it enters the government routing
              workflow.
            </p>
          </div>

          {awaitingProblems.length === 0 ? (
            <EmptyState
              title="No problems awaiting validation"
              description="All currently submitted problems have been processed."
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "18px",
              }}
            >
              {awaitingProblems.map((problem) => {
                const priority = getPriorityStyle(problem.priority);
                const category = getCategoryStyle(problem.category);

                return (
                  <article
                    key={problem.id}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2B4BD",
                      borderRadius: "20px",
                      padding: "22px",
                      boxShadow: "0 6px 20px rgba(74, 74, 74, 0.05)",
                    }}
                  >
                    {/* Top row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            borderRadius: "999px",
                            backgroundColor: "#F7D6D0",
                            color: "#4A4A4A",
                            fontWeight: 900,
                          }}
                        >
                          {problem.id}
                        </span>

                        <span
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            borderRadius: "999px",
                            backgroundColor: category.background,
                            color: category.color,
                            fontWeight: 800,
                          }}
                        >
                          {problem.category}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          backgroundColor: priority.background,
                          color: priority.color,
                          border: `1px solid ${priority.border}`,
                          fontWeight: 800,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {problem.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        margin: "0 0 9px",
                        fontSize: "18px",
                        lineHeight: 1.35,
                        color: "#4A4A4A",
                      }}
                    >
                      {problem.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        margin: "0 0 16px",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "#6F6F6F",
                      }}
                    >
                      {problem.description}
                    </p>

                    {/* Location */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12px",
                        color: "#666666",
                        marginBottom: "18px",
                      }}
                    >
                      <MapPin size={15} />
                      {problem.location}
                    </div>

                    {/* AI summary preview */}
                    <div
                      style={{
                        backgroundColor: "#FFF8F8",
                        border: "1px solid #F0D4D8",
                        borderRadius: "14px",
                        padding: "14px",
                        marginBottom: "18px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                          fontSize: "12px",
                          fontWeight: 900,
                          color: "#7B4A57",
                          marginBottom: "7px",
                        }}
                      >
                        <MessageSquareText size={15} />
                        AI-GENERATED SUMMARY
                      </div>

                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          lineHeight: 1.6,
                          color: "#666666",
                        }}
                      >
                        {problem.aiSummary}
                      </p>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => setSelectedProblem(problem)}
                      style={{
                        width: "100%",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 15px",
                        borderRadius: "12px",
                        border: "1px solid #4A4A4A",
                        backgroundColor: "#4A4A4A",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "13px",
                      }}
                    >
                      <FileCheck2 size={16} color="#FFFFFF" />
                      <span style={{ color: "#FFFFFF" }}>
                        Review Problem
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Review Modal */}
      {selectedProblem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(40, 30, 30, 0.48)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setSelectedProblem(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "820px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1px solid #E2B4BD",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.18)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal header */}
            <div
              style={{
                padding: "24px 26px",
                borderBottom: "1px solid #F0DDE0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      padding: "5px 9px",
                      borderRadius: "999px",
                      backgroundColor: "#F7D6D0",
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    {selectedProblem.id}
                  </span>

                  <span
                    style={{
                      padding: "5px 9px",
                      borderRadius: "999px",
                      backgroundColor: getPriorityStyle(
                        selectedProblem.priority
                      ).background,
                      color: getPriorityStyle(
                        selectedProblem.priority
                      ).color,
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    {selectedProblem.priority} Priority
                  </span>
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    lineHeight: 1.3,
                    color: "#4A4A4A",
                  }}
                >
                  {selectedProblem.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedProblem(null)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid #E2B4BD",
                  backgroundColor: "#FFF5F5",
                  color: "#4A4A4A",
                  fontSize: "22px",
                  lineHeight: 1,
                }}
                aria-label="Close review"
              >
                ×
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "26px" }}>
              {/* Details */}
              <section style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "16px",
                  }}
                >
                  Problem Details
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#666666",
                  }}
                >
                  {selectedProblem.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    marginTop: "18px",
                  }}
                >
                  <div
                    style={{
                      padding: "13px",
                      borderRadius: "12px",
                      backgroundColor: "#FFF5F5",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "5px",
                      }}
                    >
                      CATEGORY
                    </div>
                    <strong style={{ fontSize: "13px" }}>
                      {selectedProblem.category}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "13px",
                      borderRadius: "12px",
                      backgroundColor: "#FFF5F5",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "5px",
                      }}
                    >
                      LOCATION
                    </div>
                    <strong style={{ fontSize: "13px" }}>
                      {selectedProblem.location}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "13px",
                      borderRadius: "12px",
                      backgroundColor: "#FFF5F5",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "5px",
                      }}
                    >
                      SUBMITTED
                    </div>
                    <strong style={{ fontSize: "13px" }}>
                      {selectedProblem.submittedDate}
                    </strong>
                  </div>
                </div>
              </section>

              {/* AI Analysis */}
              <section
                style={{
                  padding: "20px",
                  backgroundColor: "#FFF8F8",
                  border: "1px solid #E2B4BD",
                  borderRadius: "18px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "14px",
                    color: "#7B4A57",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  <MessageSquareText size={18} />
                  AI ANALYSIS
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      color: "#888888",
                      marginBottom: "6px",
                    }}
                  >
                    GENERATED SUMMARY
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "#5F5F5F",
                    }}
                  >
                    {selectedProblem.aiSummary}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #F0D4D8",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "5px",
                      }}
                    >
                      CLASSIFICATION
                    </div>

                    <strong style={{ fontSize: "14px" }}>
                      {selectedProblem.category}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #F0D4D8",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "5px",
                      }}
                    >
                      AI PRIORITY
                    </div>

                    <strong style={{ fontSize: "14px" }}>
                      {selectedProblem.priority}
                    </strong>
                  </div>
                </div>
              </section>

              {/* Suggested authority */}
              <section
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  border: "1px solid #E2B4BD",
                  marginBottom: "26px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  <AlertTriangle size={18} />
                  Suggested Responsible Authority
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "4px",
                      }}
                    >
                      DEPARTMENT
                    </div>

                    <strong style={{ fontSize: "13px" }}>
                      {selectedProblem.department}
                    </strong>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888888",
                        marginBottom: "4px",
                      }}
                    >
                      AUTHORITY
                    </div>

                    <strong style={{ fontSize: "13px" }}>
                      {selectedProblem.authority}
                    </strong>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleReject(selectedProblem)}
                  disabled={processingId === selectedProblem.id}
                  style={{
                    flex: "1 1 180px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 18px",
                    borderRadius: "12px",
                    border: "1px solid #C94B45",
                    backgroundColor: "#FFFFFF",
                    color: "#B42318",
                    fontWeight: 900,
                    opacity:
                      processingId === selectedProblem.id ? 0.6 : 1,
                  }}
                >
                  <XCircle size={17} color="#B42318" />
                  <span style={{ color: "#B42318" }}>
                    {processingId === selectedProblem.id
                      ? "Processing..."
                      : "Reject Problem"}
                  </span>
                </button>

                <button
                  onClick={() => handleValidate(selectedProblem)}
                  disabled={processingId === selectedProblem.id}
                  style={{
                    flex: "1 1 220px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 18px",
                    borderRadius: "12px",
                    border: "1px solid #4A4A4A",
                    backgroundColor: "#4A4A4A",
                    color: "#FFFFFF",
                    fontWeight: 900,
                    opacity:
                      processingId === selectedProblem.id ? 0.6 : 1,
                  }}
                >
                  <CheckCircle2 size={17} color="#FFFFFF" />

                  <span style={{ color: "#FFFFFF" }}>
                    {processingId === selectedProblem.id
                      ? "Validating..."
                      : "Validate Problem"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemValidation;