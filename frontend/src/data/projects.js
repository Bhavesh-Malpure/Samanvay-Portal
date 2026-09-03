const projects = [
  {
    id: "SAM-PROJ-001",

    title: "Smart Electricity Monitoring",

    problemId: "SAM-001",

    category: "Electricity",

    location: "Dhule City",

    priority: "High",

    status: "In Progress",

    progress: 72,

    universityId: "UNI-001",

    industryId: "IND-001",

    mentorId: "FAC-001",

    teamId: "TEAM-001",

    description:
      "Development of an IoT-based system for monitoring electricity interruptions and voltage fluctuations in selected areas of Dhule.",

    objectives: [
      "Monitor electricity availability",
      "Detect voltage fluctuations",
      "Generate monitoring reports",
      "Support authorities with useful data",
    ],

    milestones: [
      {
        id: "MS-001",
        title: "Problem Analysis",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-002",
        title: "Requirement Gathering",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-003",
        title: "Prototype Development",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-004",
        title: "Field Testing",
        status: "In Progress",
        progress: 65,
      },
      {
        id: "MS-005",
        title: "Final Deployment",
        status: "Pending",
        progress: 0,
      },
    ],

    teamMembers: [
      "STU-001",
      "STU-002",
      "STU-003",
      "STU-004",
      "STU-005",
    ],

    documents: [
      "Project Proposal.pdf",
      "System Architecture.pdf",
      "Field Testing Report.docx",
      "Prototype Documentation.pdf",
    ],

    impact: {
      citizensPotentiallyImpacted: 1240,
      targetLocations: 8,
      problemsAddressed: 12,
      expectedImprovement: 25,
    },

    createdDate: "2026-08-10",
    expectedCompletion: "2026-10-30",
  },

  {
    id: "SAM-PROJ-002",

    title: "Water Leakage Detection",

    problemId: "SAM-002",

    category: "Water & Sanitation",

    location: "Deopur, Dhule",

    priority: "Medium-High",

    status: "In Progress",

    progress: 48,

    universityId: "UNI-001",

    industryId: "IND-003",

    mentorId: "FAC-002",

    teamId: "TEAM-002",

    description:
      "A smart monitoring solution for identifying water pipeline leakage and reducing water wastage.",

    objectives: [
      "Detect pipeline leakage",
      "Reduce water wastage",
      "Monitor water flow",
      "Generate alerts for authorities",
    ],

    milestones: [
      {
        id: "MS-006",
        title: "Problem Analysis",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-007",
        title: "Sensor Selection",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-008",
        title: "Prototype Development",
        status: "In Progress",
        progress: 55,
      },
      {
        id: "MS-009",
        title: "Field Testing",
        status: "Pending",
        progress: 0,
      },
    ],

    teamMembers: [
      "STU-006",
      "STU-008",
    ],

    documents: [
      "Water Project Proposal.pdf",
      "Sensor Specification.pdf",
    ],

    impact: {
      citizensPotentiallyImpacted: 850,
      targetLocations: 5,
      problemsAddressed: 8,
      expectedImprovement: 30,
    },

    createdDate: "2026-08-15",
    expectedCompletion: "2026-11-15",
  },

  {
    id: "SAM-PROJ-003",

    title: "Smart Road Safety System",

    problemId: "SAM-003",

    category: "PWD & Roads",

    location: "Chalisgaon Road",

    priority: "Minimum",

    status: "Planning",

    progress: 25,

    universityId: "UNI-002",

    industryId: "IND-002",

    mentorId: "FAC-003",

    teamId: "TEAM-003",

    description:
      "A smart road monitoring and safety system designed to identify road damage and support maintenance planning.",

    objectives: [
      "Identify damaged road sections",
      "Record road conditions",
      "Support maintenance planning",
      "Improve road safety",
    ],

    milestones: [
      {
        id: "MS-010",
        title: "Problem Analysis",
        status: "Completed",
        progress: 100,
      },
      {
        id: "MS-011",
        title: "Requirement Gathering",
        status: "In Progress",
        progress: 50,
      },
      {
        id: "MS-012",
        title: "Prototype Development",
        status: "Pending",
        progress: 0,
      },
      {
        id: "MS-013",
        title: "Field Testing",
        status: "Pending",
        progress: 0,
      },
    ],

    teamMembers: [
      "STU-007",
    ],

    documents: [
      "Road Safety Proposal.pdf",
    ],

    impact: {
      citizensPotentiallyImpacted: 650,
      targetLocations: 4,
      problemsAddressed: 6,
      expectedImprovement: 20,
    },

    createdDate: "2026-08-20",
    expectedCompletion: "2026-12-01",
  },
];

export default projects;