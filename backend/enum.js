const Priorities = Object.freeze({
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
});

const Statuses = Object.freeze({
  TODO: "to-do",
  PENDING: "pending",
  COMPLETE: "complete",
});

module.exports = { Statuses, Priorities };
