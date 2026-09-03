export function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatPercentage(value) {
  if (value === null || value === undefined) {
    return "0%";
  }

  return value + "%";
}

export function formatNumber(value) {
  if (value === null || value === undefined) {
    return "0";
  }

  return Number(value).toLocaleString("en-IN");
}

export function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return status;
}

export function formatCategory(category) {
  if (!category) {
    return "-";
  }

  return category;
}

export function getInitials(name) {
  if (!name) {
    return "?";
  }

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
}