import React from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  MapPin,
  Route,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";

/*
 * Government Analytics
 * --------------------
 * Frontend-only prototype.
 * All analytics data below is mock/static data for Dhule District.
 */

// --------------------------------------------------
// MOCK ANALYTICS DATA
// --------------------------------------------------

const categoryData = [
  {
    name: "Electricity",
    count: 12,
    percentage: 48,
  },
  {
    name: "Water & Sanitation",
    count: 8,
    percentage: 32,
  },
  {
    name: "PWD & Roads",
    count: 5,
    percentage: 20,
  },
];

const priorityData = [
  {
    name: "High",
    count: 12,
    percentage: 48,
    description: "Electricity-related issues",
  },
  {
    name: "Medium-High",
    count: 8,
    percentage: 32,
    description: "Water & sanitation issues",
  },
  {
    name: "Minimum",
    count: 5,
    percentage: 20,
    description: "PWD & road development",
  },
];

const statusData = [
  {
    name: "Under Review",
    count: 5,
    icon: Clock3,
  },
  {
    name: "Validated",
    count: 7,
    icon: CheckCircle2,
  },
  {
    name: "Routed",
    count: 6,
    icon: Route,
  },
  {
    name: "Resolved",
    count: 5,
    icon: CheckCircle2,
  },
  {
    name: "Rejected",
    count: 2,
    icon: XCircle,
  },
];

const localityData = [
  {
    name: "Dhule City",
    count: 10,
  },
  {
    name: "Deopur",
    count: 6,
  },
  {
    name: "Chalisgaon Road",
    count: 4,
  },
  {
    name: "Shirpur",
    count: 3,
  },
  {
    name: "Other Areas",
    count: 2,
  },
];

// --------------------------------------------------
// REUSABLE COMPONENTS
// --------------------------------------------------

function MetricCard({ icon: Icon, label, value, description }) {
  return (
    <div
      style={{
        background: "#FFF5F5",
        border: "1px solid #E2B4BD",
        borderRadius: "18px",
        padding: "22px",
        minHeight: "150px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "#F7D6D0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={22} color="#4A4A4A" />
      </div>

      <div
        style={{
          fontSize: "30px",
          fontWeight: "800",
          color: "#4A4A4A",
          lineHeight: "1",
          marginBottom: "8px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#4A4A4A",
          marginBottom: "5px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#777",
        }}
      >
        {description}
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children }) {
  return (
    <section
      style={{
        background: "#FFF5F5",
        border: "1px solid #E2B4BD",
        borderRadius: "20px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            minWidth: "42px",
            borderRadius: "12px",
            background: "#F7D6D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={21} color="#4A4A4A" />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "800",
              color: "#4A4A4A",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: "13px",
              color: "#777",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

// --------------------------------------------------
// CATEGORY DISTRIBUTION
// --------------------------------------------------

function CategoryDistribution() {
  const maxCount = Math.max(...categoryData.map((item) => item.count));

  return (
    <SectionCard
      title="Problem Category Distribution"
      subtitle="Distribution of reported societal problems in Dhule District"
      icon={BarChart3}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {categoryData.map((item) => (
          <div key={item.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#4A4A4A",
                }}
              >
                {item.name}
              </span>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#777",
                }}
              >
                {item.count} problems ({item.percentage}%)
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "11px",
                background: "#F7D6D0",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  height: "100%",
                  background: "#E2B4BD",
                  borderRadius: "20px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "22px",
          padding: "14px 16px",
          background: "#F7D6D0",
          borderRadius: "12px",
          fontSize: "13px",
          color: "#4A4A4A",
          lineHeight: "1.5",
        }}
      >
        <strong>Insight:</strong> Electricity-related problems currently
        represent the largest share of reported issues in the prototype
        dataset.
      </div>
    </SectionCard>
  );
}

// --------------------------------------------------
// PRIORITY DISTRIBUTION
// --------------------------------------------------

function PriorityDistribution() {
  return (
    <SectionCard
      title="Priority Distribution"
      subtitle="Problems grouped according to the defined Samanvay priority structure"
      icon={AlertTriangle}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {priorityData.map((item) => (
          <div
            key={item.name}
            style={{
              border: "1px solid #E2B4BD",
              borderRadius: "14px",
              padding: "16px",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginBottom: "7px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                {item.name}
              </span>

              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "20px",
                  background: "#F7D6D0",
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                {item.count}
              </span>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
                marginBottom: "12px",
              }}
            >
              {item.description}
            </div>

            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#F7D6D0",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${item.percentage}%`,
                  height: "100%",
                  background: "#E2B4BD",
                  borderRadius: "20px",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "right",
                marginTop: "6px",
                fontSize: "11px",
                color: "#777",
              }}
            >
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// --------------------------------------------------
// STATUS OVERVIEW
// --------------------------------------------------

function StatusOverview() {
  return (
    <SectionCard
      title="Status Overview"
      subtitle="Current processing status of reported problems"
      icon={Activity}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {statusData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2B4BD",
                borderRadius: "14px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <Icon
                size={20}
                color="#4A4A4A"
                style={{ marginBottom: "10px" }}
              />

              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                {item.count}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#777",
                  marginTop: "4px",
                }}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// --------------------------------------------------
// LOCALITY INSIGHTS
// --------------------------------------------------

function DhuleInsights() {
  const maxCount = Math.max(...localityData.map((item) => item.count));

  return (
    <SectionCard
      title="Dhule District Insights"
      subtitle="Location-level view of reported problems within the prototype scope"
      icon={MapPin}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {localityData.map((item, index) => (
          <div key={item.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "7px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                }}
              >
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#F7D6D0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                    color: "#4A4A4A",
                  }}
                >
                  {index + 1}
                </span>

                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#4A4A4A",
                  }}
                >
                  {item.name}
                </span>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                {item.count}
              </span>
            </div>

            <div
              style={{
                marginLeft: "34px",
                height: "8px",
                background: "#F7D6D0",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  height: "100%",
                  background: "#E2B4BD",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

export default function GovernmentAnalytics() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFF5F5",
        color: "#4A4A4A",
      }}
    >
      <Navbar />

      <main
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 28px 50px",
          boxSizing: "border-box",
        }}
      >
        {/* PAGE HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "30px",
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
                borderRadius: "20px",
                background: "#F7D6D0",
                fontSize: "12px",
                fontWeight: "800",
                color: "#4A4A4A",
                marginBottom: "12px",
              }}
            >
              <MapPin size={14} />
              Dhule District
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "850",
                color: "#4A4A4A",
                letterSpacing: "-0.5px",
              }}
            >
              Government Analytics
            </h1>

            <p
              style={{
                margin: "9px 0 0",
                fontSize: "14px",
                color: "#777",
                maxWidth: "650px",
                lineHeight: "1.6",
              }}
            >
              Monitor societal problems, priorities, resolution progress and
              community impact across Dhule District.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #E2B4BD",
              background: "#FFFFFF",
              borderRadius: "14px",
              padding: "12px 16px",
              fontSize: "12px",
              color: "#777",
            }}
          >
            <strong style={{ color: "#4A4A4A" }}>Prototype Dataset</strong>
            <br />
            32 reported problems
          </div>
        </div>

        {/* OVERVIEW METRICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <MetricCard
            icon={Activity}
            value="32"
            label="Total Problems"
            description="Reported across Dhule"
          />

          <MetricCard
            icon={CheckCircle2}
            value="25"
            label="Processed"
            description="Validated, routed or resolved"
          />

          <MetricCard
            icon={CheckCircle2}
            value="5"
            label="Resolved"
            description="Successfully resolved"
          />

          <MetricCard
            icon={TrendingUp}
            value="15.6%"
            label="Resolution Rate"
            description="Resolved / total problems"
          />

          <MetricCard
            icon={Users}
            value="124"
            label="People Impacted"
            description="Estimated community impact"
          />
        </div>

        {/* ANALYTICS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "22px",
            marginBottom: "22px",
          }}
        >
          <CategoryDistribution />
          <PriorityDistribution />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "22px",
            marginBottom: "22px",
          }}
        >
          <StatusOverview />
          <DhuleInsights />
        </div>

        {/* RESOLUTION / IMPACT */}
        <SectionCard
          title="Resolution & Impact Metrics"
          subtitle="Prototype indicators showing how reported problems are progressing toward resolution"
          icon={TrendingUp}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #E2B4BD",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "8px",
                }}
              >
                Validated Problems
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                7
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                Ready for routing
              </div>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #E2B4BD",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "8px",
                }}
              >
                Routed Problems
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                6
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                Assigned to authorities
              </div>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #E2B4BD",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "8px",
                }}
              >
                Resolved Problems
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                5
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                Closed successfully
              </div>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #E2B4BD",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "8px",
                }}
              >
                Community Impact
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                124
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                People estimated to benefit
              </div>
            </div>
          </div>

          {/* RESOLUTION PROGRESS */}
          <div
            style={{
              marginTop: "24px",
              padding: "18px",
              background: "#F7D6D0",
              borderRadius: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "9px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                Overall Resolution Progress
              </span>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#4A4A4A",
                }}
              >
                15.6%
              </span>
            </div>

            <div
              style={{
                height: "12px",
                width: "100%",
                background: "#FFF5F5",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "15.6%",
                  height: "100%",
                  background: "#E2B4BD",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        </SectionCard>

        {/* KEY INSIGHTS */}
        <div
          style={{
            marginTop: "22px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "#F7D6D0",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2B4BD",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "9px",
              }}
            >
              Highest Reported Category
            </div>

            <div
              style={{
                fontSize: "21px",
                fontWeight: "800",
                marginBottom: "5px",
              }}
            >
              Electricity
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
                lineHeight: "1.5",
              }}
            >
              48% of the prototype problems are related to electricity
              interruptions and supply issues.
            </div>
          </div>

          <div
            style={{
              background: "#F7D6D0",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2B4BD",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "9px",
              }}
            >
              Highest Priority
            </div>

            <div
              style={{
                fontSize: "21px",
                fontWeight: "800",
                marginBottom: "5px",
              }}
            >
              Electricity Issues
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
                lineHeight: "1.5",
              }}
            >
              Electricity problems are treated as high priority under the
              defined Samanvay framework.
            </div>
          </div>

          <div
            style={{
              background: "#F7D6D0",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2B4BD",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "9px",
              }}
            >
              Dhule Focus Area
            </div>

            <div
              style={{
                fontSize: "21px",
                fontWeight: "800",
                marginBottom: "5px",
              }}
            >
              Dhule City
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
                lineHeight: "1.5",
              }}
            >
              Dhule City currently has the highest number of reported problems
              in the prototype dataset.
            </div>
          </div>
        </div>

        {/* PROTOTYPE NOTE */}
        <div
          style={{
            marginTop: "24px",
            padding: "14px 16px",
            border: "1px dashed #E2B4BD",
            borderRadius: "12px",
            background: "#FFFFFF",
            fontSize: "12px",
            color: "#777",
            lineHeight: "1.5",
          }}
        >
          <strong style={{ color: "#4A4A4A" }}>Prototype Note:</strong>{" "}
          Analytics shown on this page use synthetic Dhule District data for
          demonstration purposes. In the future, these values can be
          generated dynamically from actual problem, routing, resolution and
          impact records.
        </div>
      </main>
    </div>
  );
}
