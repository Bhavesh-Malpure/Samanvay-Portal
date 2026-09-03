import React from "react";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  GitPullRequest,
  MapPin,
  Send,
} from "lucide-react";

const defaultActivities = [
  {
    id: 1,
    type: "validation",
    title: "Problem SAM-001 validated",
    description: "Street lighting issue in Dhule city",
    time: "18 minutes ago",
  },
  {
    id: 2,
    type: "routing",
    title: "Problem SAM-002 routed",
    description: "Water supply issue assigned for review",
    time: "42 minutes ago",
  },
  {
    id: 3,
    type: "submission",
    title: "New problem received",
    description: "Road damage reported by a citizen",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "project",
    title: "Project collaboration initiated",
    description: "University team matched with a societal problem",
    time: "2 hours ago",
  },
];

const iconMap = {
  validation: CheckCircle2,
  routing: Send,
  submission: MapPin,
  project: GitPullRequest,
};

const ActivityFeed = ({ activities = defaultActivities }) => {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2B4BD",
      }}
    >
      <div className="mb-5">
        <h2
          className="text-lg font-bold"
          style={{ color: "#4A4A4A" }}
        >
          Recent Activity
        </h2>

        <p
          className="mt-1 text-sm"
          style={{ color: "#777777" }}
        >
          Latest actions across the Dhule problem network
        </p>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: "#FFF5F5" }}
          >
            <Clock3
              size={24}
              className="mx-auto mb-2"
              style={{ color: "#4A4A4A" }}
            />

            <p
              className="text-sm"
              style={{ color: "#777777" }}
            >
              No recent activity.
            </p>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = iconMap[activity.type] || FileCheck2;

            return (
              <div
                key={activity.id}
                className="flex gap-3"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#F7D6D0",
                    color: "#4A4A4A",
                  }}
                >
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#4A4A4A" }}
                  >
                    {activity.title}
                  </p>

                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "#777777" }}
                  >
                    {activity.description}
                  </p>

                  <p
                    className="mt-1 text-[11px]"
                    style={{ color: "#999999" }}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;