export const priorityConfig = {
  High: {
    label: "High",
    description: "Urgent issues requiring faster attention",
    score: 3,
  },

  "Medium-High": {
    label: "Medium-High",
    description: "Important issues requiring timely attention",
    score: 2,
  },

  Minimum: {
    label: "Minimum",
    description: "Issues that can be addressed through planned intervention",
    score: 1,
  },
};

export function getPriorityConfig(priority) {
  return (
    priorityConfig[priority] || {
      label: priority || "Unknown",
      description: "Priority not available",
      score: 0,
    }
  );
}

export function getPriorityScore(priority) {
  const config = priorityConfig[priority];

  if (!config) {
    return 0;
  }

  return config.score;
}

export function getPriorityLabel(priority) {
  const config = priorityConfig[priority];

  if (!config) {
    return "Unknown";
  }

  return config.label;
}