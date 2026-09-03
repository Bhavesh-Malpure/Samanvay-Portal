import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  GraduationCap,
  MapPin,
  Network,
  Route as RouteIcon,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import EmptyState from "../../components/common/EmptyState";

const initialValidatedProblems = [
  {
    id: "SAM-001",
    title: "Frequent electricity interruptions in residential area",
    description:
      "Residents have reported frequent power interruptions in the area, especially during evening hours. The issue is affecting households, students, and small businesses.",
    category: "Electricity",
    priority: "High",
    location: "Deopur, Dhule",
    validatedDate: "01 Sep 2026",

    department: "Maharashtra State Electricity Distribution Company Limited",
    authority: "Local Electricity Division, Dhule",

    university: "Government College of Engineering, Dhule",
    universityArea: "Electrical Engineering / Energy Systems",
    universityReason:
      "A university team can support technical analysis, power-quality assessment, and data-based identification of recurring interruption patterns.",

    industry: "Local Energy & Infrastructure Partner",
    industryArea: "Power Infrastructure",
    industryReason:
      "Industry collaboration can support infrastructure assessment and practical recommendations for improving electricity reliability.",

    routingStatus: "Pending Routing",
  },

  {
    id: "SAM-004",
    title: "Irregular water supply in residential locality",
    description:
      "Residents are receiving water supply at irregular intervals. The inconsistent schedule is creating difficulties for households and increasing dependence on private water sources.",
    category: "Water & Sanitation",
    priority: "Medium-High",
    location: "Chalisgaon Road Area, Dhule",
    validatedDate: "01 Sep 2026",

    department: "Dhule Municipal Corporation",
    authority: "Water Supply Department, Dhule",

    university: "Government College of Engineering, Dhule",
    universityArea: "Civil Engineering / Environmental Engineering",
    universityReason:
      "Students and faculty can support water-distribution analysis, infrastructure mapping, and potential conservation or monitoring solutions.",

    industry: "Local Water Infrastructure Partner",
    industryArea: "Water Management",
    industryReason:
      "An industry partner can contribute practical expertise in water infrastructure, monitoring systems, and distribution improvements.",

    routingStatus: "Pending Routing",
  },

  {
    id: "SAM-006",
    title: "Damaged road surface near public access area",
    description:
      "A section of road has developed multiple damaged patches, creating difficulty for two-wheelers, pedestrians, and other vehicles using the route.",
    category: "PWD & Roads",
    priority: "Minimum",
    location: "MIDC Area, Dhule",
    validatedDate: "02 Sep 2026",

    department: "Public Works Department",
    authority: "PWD Dhule Division",

    university: "Government College of Engineering, Dhule",
    universityArea: "Civil Engineering / Infrastructure",
    universityReason:
      "A civil engineering team can support road-condition assessment, mapping, documentation, and technical recommendations.",

    industry: "Local Construction & Infrastructure Partner",
    industryArea: "Road Development",
    industryReason:
      "Industry participation can support implementation feasibility, material assessment, and infrastructure execution planning.",

    routingStatus: "Pending Routing",
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
  switch (category) {
    case "Electricity":
      return {
        background: "#FFF1F1",
        color: "#A33A3A",
      };

    case "Water & Sanitation":
      return {
        background: "#F7E9EC",
        color: "#7B4A57",
      };

    case "PWD & Roads":
    default:
      return {
        background: "#F2F2F2",
        color: "#5E5E5E",
      };
  }
}

function ProblemRouting() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState(initialValidatedProblems);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [message, setMessage] = useState(null);

  const pendingProblems = useMemo(
    () =>
      problems.filter(
        (problem) => problem.routingStatus === "Pending Routing"
      ),
    [problems]
  );

  const routedProblems = useMemo(
    () =>
      problems.filter(
        (problem) => problem.routingStatus === "Routed"
      ),
    [problems]
  );

  const handleRoute = (problem) => {
    setProcessingId(problem.id);

    setTimeout(() => {
      setProblems((currentProblems) =>
        currentProblems.map((item) =>
          item.id === problem.id
            ? {
                ...item,
                routingStatus: "Routed",
              }
            : item
        )
      );

      setSelectedProblem(null);
      setProcessingId(null);

      setMessage({
        type: "success",
        text: `${problem.id} has been routed successfully to the suggested authority.`,
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
            <div style={{ maxWidth: "780px" }}>
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
                <RouteIcon size={15} />
                GOVERNMENT ROUTING WORKSPACE
              </div>

              <h1
                style={{
                  margin: "0 0 10px",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: 1.1,
                  color: "#4A4A4A",
                }}
              >
                Problem Routing
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#666666",
                }}
              >
                Route validated societal problems to the appropriate
                government department while identifying potential
                university and industry collaboration opportunities.
              </p>
            </div>

            {/* Summary */}
            <div
              style={{
                minWidth: "205px",
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
                <Network size={17} />
                Pending Routing
              </div>

              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  color: "#4A4A4A",
                }}
              >
                {pendingProblems.length}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#777777",
                  marginTop: "3px",
                }}
              >
                Validated problems
              </div>
            </div>
          </div>
        </section>

        {/* Message */}
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
              backgroundColor: "#EDF8F1",
              border: "1px solid #B7DEC2",
              color: "#24663B",
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
              <CheckCircle2 size={19} />
              {message.text}
            </div>

            <button
              onClick={() => setMessage(null)}
              style={{
                border: "none",
                background: "transparent",
                color: "#24663B",
                fontWeight: 900,
                fontSize: "20px",
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
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
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
              Awaiting Routing
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {pendingProblems.length}
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
              <CheckCircle2 size={17} />
              Routed
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {routedProblems.length}
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
                color: "#7B4A57",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              <Users size={17} />
              Collaboration
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                marginTop: "12px",
              }}
            >
              {problems.length * 2}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777777",
                marginTop: "3px",
              }}
            >
              Prototype suggestions
            </div>
          </div>
        </section>

        {/* Pending problems */}
        <section>
          <div style={{ marginBottom: "18px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                color: "#4A4A4A",
              }}
            >
              Validated Problems
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#777777",
                fontSize: "14px",
              }}
            >
              Review the suggested routing and collaboration options before
              forwarding each problem.
            </p>
          </div>

          {pendingProblems.length === 0 ? (
            <EmptyState
              title="No problems awaiting routing"
              description="All validated problems have been routed."
            />
          ) : (
            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {pendingProblems.map((problem) => {
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
                      boxShadow:
                        "0 6px 20px rgba(74, 74, 74, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "18px",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Problem information */}
                      <div style={{ flex: "1 1 420px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "12px",
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

                          <span
                            style={{
                              fontSize: "11px",
                              padding: "4px 8px",
                              borderRadius: "999px",
                              backgroundColor: priority.background,
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
                            margin: "0 0 8px",
                            fontSize: "19px",
                            lineHeight: 1.35,
                          }}
                        >
                          {problem.title}
                        </h3>

                        <p
                          style={{
                            margin: "0 0 13px",
                            fontSize: "13px",
                            lineHeight: 1.65,
                            color: "#6F6F6F",
                          }}
                        >
                          {problem.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#666666",
                            fontSize: "12px",
                          }}
                        >
                          <MapPin size={15} />
                          {problem.location}
                        </div>
                      </div>

                      {/* Routing status */}
                      <div
                        style={{
                          minWidth: "190px",
                          padding: "16px",
                          borderRadius: "15px",
                          backgroundColor: "#FFF8F8",
                          border: "1px solid #F0D4D8",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            color: "#7B4A57",
                            fontSize: "11px",
                            fontWeight: 900,
                            marginBottom: "8px",
                          }}
                        >
                          <Clock3 size={14} />
                          ROUTING STATUS
                        </div>

                        <strong
                          style={{
                            fontSize: "13px",
                            color: "#4A4A4A",
                          }}
                        >
                          {problem.routingStatus}
                        </strong>

                        <div
                          style={{
                            marginTop: "7px",
                            fontSize: "11px",
                            color: "#888888",
                          }}
                        >
                          Validated on {problem.validatedDate}
                        </div>
                      </div>
                    </div>

                    {/* Suggested department */}
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "18px",
                        borderRadius: "16px",
                        backgroundColor: "#FFF5F5",
                        border: "1px solid #E2B4BD",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#7B4A57",
                          fontWeight: 900,
                          fontSize: "13px",
                          marginBottom: "12px",
                        }}
                      >
                        <Building2 size={17} />
                        SUGGESTED GOVERNMENT ROUTING
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                          gap: "16px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#888888",
                              fontWeight: 800,
                              marginBottom: "5px",
                            }}
                          >
                            DEPARTMENT
                          </div>

                          <strong
                            style={{
                              fontSize: "14px",
                              lineHeight: 1.5,
                            }}
                          >
                            {problem.department}
                          </strong>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#888888",
                              fontWeight: 800,
                              marginBottom: "5px",
                            }}
                          >
                            RESPONSIBLE AUTHORITY
                          </div>

                          <strong
                            style={{
                              fontSize: "14px",
                              lineHeight: 1.5,
                            }}
                          >
                            {problem.authority}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Collaboration suggestions */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "14px",
                        marginTop: "14px",
                      }}
                    >
                      {/* University */}
                      <div
                        style={{
                          padding: "17px",
                          borderRadius: "16px",
                          border: "1px solid #E2B4BD",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#7B4A57",
                            fontWeight: 900,
                            fontSize: "13px",
                            marginBottom: "11px",
                          }}
                        >
                          <GraduationCap size={18} />
                          UNIVERSITY COLLABORATION
                        </div>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "14px",
                            marginBottom: "4px",
                          }}
                        >
                          {problem.university}
                        </strong>

                        <div
                          style={{
                            fontSize: "11px",
                            color: "#7B4A57",
                            fontWeight: 700,
                            marginBottom: "9px",
                          }}
                        >
                          {problem.universityArea}
                        </div>

                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: 1.6,
                            color: "#707070",
                          }}
                        >
                          {problem.universityReason}
                        </p>
                      </div>

                      {/* Industry */}
                      <div
                        style={{
                          padding: "17px",
                          borderRadius: "16px",
                          border: "1px solid #E2B4BD",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#7B4A57",
                            fontWeight: 900,
                            fontSize: "13px",
                            marginBottom: "11px",
                          }}
                        >
                          <Factory size={18} />
                          INDUSTRY COLLABORATION
                        </div>

                        <strong
                          style={{
                            display: "block",
                            fontSize: "14px",
                            marginBottom: "4px",
                          }}
                        >
                          {problem.industry}
                        </strong>

                        <div
                          style={{
                            fontSize: "11px",
                            color: "#7B4A57",
                            fontWeight: 700,
                            marginBottom: "9px",
                          }}
                        >
                          {problem.industryArea}
                        </div>

                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: 1.6,
                            color: "#707070",
                          }}
                        >
                          {problem.industryReason}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "18px",
                      }}
                    >
                      <button
                        onClick={() => setSelectedProblem(problem)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "11px 18px",
                          borderRadius: "12px",
                          border: "1px solid #4A4A4A",
                          backgroundColor: "#4A4A4A",
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "13px",
                        }}
                      >
                        <RouteIcon size={16} color="#FFFFFF" />

                        <span style={{ color: "#FFFFFF" }}>
                          Review & Route
                        </span>

                        <ChevronRight size={16} color="#FFFFFF" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Routing modal */}
      {selectedProblem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(40, 30, 30, 0.48)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
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
                gap: "18px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "9px",
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
                  }}
                >
                  Route {selectedProblem.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedProblem(null)}
                style={{
                  width: "36px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "1px solid #E2B4BD",
                  backgroundColor: "#FFF5F5",
                  color: "#4A4A4A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close routing modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "26px" }}>
              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  backgroundColor: "#FFF5F5",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888888",
                    fontWeight: 800,
                    marginBottom: "6px",
                  }}
                >
                  PROBLEM
                </div>

                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    lineHeight: 1.4,
                    marginBottom: "8px",
                  }}
                >
                  {selectedProblem.title}
                </strong>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    fontSize: "12px",
                    color: "#666666",
                  }}
                >
                  <MapPin size={14} />
                  {selectedProblem.location}
                </div>
              </div>

              {/* Government route */}
              <section style={{ marginBottom: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 900,
                    marginBottom: "12px",
                  }}
                >
                  <Building2 size={18} />
                  Suggested Government Route
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "15px",
                      borderRadius: "13px",
                      border: "1px solid #E2B4BD",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#888888",
                        fontWeight: 800,
                        marginBottom: "6px",
                      }}
                    >
                      DEPARTMENT
                    </div>

                    <strong style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {selectedProblem.department}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "15px",
                      borderRadius: "13px",
                      border: "1px solid #E2B4BD",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#888888",
                        fontWeight: 800,
                        marginBottom: "6px",
                      }}
                    >
                      RESPONSIBLE AUTHORITY
                    </div>

                    <strong style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {selectedProblem.authority}
                    </strong>
                  </div>
                </div>
              </section>

              {/* Collaboration */}
              <section style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 900,
                    marginBottom: "12px",
                  }}
                >
                  <Network size={18} />
                  Collaboration Suggestions
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "15px",
                      borderRadius: "13px",
                      backgroundColor: "#FFF8F8",
                      border: "1px solid #F0D4D8",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "#7B4A57",
                        fontSize: "11px",
                        fontWeight: 900,
                        marginBottom: "8px",
                      }}
                    >
                      <GraduationCap size={15} />
                      UNIVERSITY
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      {selectedProblem.university}
                    </strong>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        lineHeight: 1.55,
                        color: "#6F6F6F",
                      }}
                    >
                      {selectedProblem.universityReason}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "15px",
                      borderRadius: "13px",
                      backgroundColor: "#FFF8F8",
                      border: "1px solid #F0D4D8",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "#7B4A57",
                        fontSize: "11px",
                        fontWeight: 900,
                        marginBottom: "8px",
                      }}
                    >
                      <Factory size={15} />
                      INDUSTRY
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      {selectedProblem.industry}
                    </strong>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        lineHeight: 1.55,
                        color: "#6F6F6F",
                      }}
                    >
                      {selectedProblem.industryReason}
                    </p>
                  </div>
                </div>
              </section>

              {/* Route action */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setSelectedProblem(null)}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "1px solid #E2B4BD",
                    backgroundColor: "#FFFFFF",
                    color: "#4A4A4A",
                    fontWeight: 800,
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleRoute(selectedProblem)}
                  disabled={processingId === selectedProblem.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    border: "1px solid #4A4A4A",
                    backgroundColor: "#4A4A4A",
                    color: "#FFFFFF",
                    fontWeight: 900,
                    opacity:
                      processingId === selectedProblem.id ? 0.6 : 1,
                  }}
                >
                  <ShieldCheck size={17} color="#FFFFFF" />

                  <span style={{ color: "#FFFFFF" }}>
                    {processingId === selectedProblem.id
                      ? "Routing..."
                      : "Route Problem"}
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

export default ProblemRouting;