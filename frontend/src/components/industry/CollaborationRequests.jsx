import React, { useState } from "react";

const initialRequests = [
  {
    id: "REQ-001",
    project: "Solar-powered Street Monitoring",
    category: "Electricity",
    university: "Dhule Engineering University",
    team: "Team SolarWatch",
    students: 5,
    mentor: "Dr. Amit Patil",
    description:
      "The team is developing a low-cost solar-powered monitoring system for street infrastructure.",
    status: "Pending",
  },
  {
    id: "REQ-002",
    project: "Smart Water Management",
    category: "Water & Sanitation",
    university: "North Maharashtra Technical Institute",
    team: "Team JalSetu",
    students: 4,
    mentor: "Prof. Sneha Deshmukh",
    description:
      "A monitoring and alert system for identifying abnormal water usage and possible leakage.",
    status: "Pending",
  },
  {
    id: "REQ-003",
    project: "Accessible Road Navigation",
    category: "PWD & Roads",
    university: "Dhule Engineering University",
    team: "Team RoadSafe",
    students: 5,
    mentor: "Prof. Rahul Joshi",
    description:
      "A digital platform designed to identify accessibility barriers and unsafe road sections.",
    status: "Pending",
  },
];

function CollaborationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const updateStatus = (id, status) => {
    setRequests(
      requests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: status,
            }
          : request
      )
    );

    setSelectedRequest(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INDUSTRY COLLABORATION</p>
            <h1 style={styles.title}>Collaboration Requests</h1>
            <p style={styles.subtitle}>
              Review requests from university teams seeking industry support.
            </p>
          </div>

          <div style={styles.summary}>
            {requests.filter((item) => item.status === "Pending").length}{" "}
            Pending
          </div>
        </div>

        <div style={styles.requestList}>
          {requests.map((request) => (
            <div key={request.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <span style={styles.requestId}>{request.id}</span>
                  <h2 style={styles.projectTitle}>{request.project}</h2>
                </div>

                <span
                  style={{
                    ...styles.status,
                    background:
                      request.status === "Accepted"
                        ? "#E8F3EA"
                        : request.status === "Rejected"
                        ? "#F5E5E5"
                        : "#F7D6D0",
                  }}
                >
                  {request.status}
                </span>
              </div>

              <div style={styles.detailsGrid}>
                <div>
                  <span style={styles.label}>University</span>
                  <strong>{request.university}</strong>
                </div>

                <div>
                  <span style={styles.label}>Team</span>
                  <strong>{request.team}</strong>
                </div>

                <div>
                  <span style={styles.label}>Students</span>
                  <strong>{request.students}</strong>
                </div>

                <div>
                  <span style={styles.label}>Faculty Mentor</span>
                  <strong>{request.mentor}</strong>
                </div>

                <div>
                  <span style={styles.label}>Category</span>
                  <strong>{request.category}</strong>
                </div>
              </div>

              <p style={styles.description}>{request.description}</p>

              {request.status === "Pending" && (
                <button
                  style={styles.reviewButton}
                  onClick={() => setSelectedRequest(request)}
                >
                  Review Request
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedRequest && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <div>
                  <span style={styles.requestId}>
                    {selectedRequest.id}
                  </span>
                  <h2 style={styles.modalTitle}>
                    {selectedRequest.project}
                  </h2>
                </div>

                <button
                  style={styles.closeButton}
                  onClick={() => setSelectedRequest(null)}
                >
                  ×
                </button>
              </div>

              <p style={styles.modalText}>
                {selectedRequest.description}
              </p>

              <div style={styles.modalInfo}>
                <p>
                  <strong>University:</strong>{" "}
                  {selectedRequest.university}
                </p>
                <p>
                  <strong>Team:</strong> {selectedRequest.team}
                </p>
                <p>
                  <strong>Mentor:</strong> {selectedRequest.mentor}
                </p>
                <p>
                  <strong>Students:</strong> {selectedRequest.students}
                </p>
              </div>

              <div style={styles.modalActions}>
                <button
                  style={styles.rejectButton}
                  onClick={() =>
                    updateStatus(selectedRequest.id, "Rejected")
                  }
                >
                  Reject
                </button>

                <button
                  style={styles.acceptButton}
                  onClick={() =>
                    updateStatus(selectedRequest.id, "Accepted")
                  }
                >
                  Accept Collaboration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF5F5",
    padding: "32px",
    color: "#4A4A4A",
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  },

  eyebrow: {
    margin: 0,
    color: "#9B6670",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: "6px 0",
    fontSize: "30px",
  },

  subtitle: {
    margin: 0,
    color: "#888",
    fontSize: "14px",
  },

  summary: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    padding: "10px 15px",
    borderRadius: "10px",
    fontWeight: "700",
  },

  requestList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "22px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },

  requestId: {
    fontSize: "11px",
    color: "#9B6670",
    fontWeight: "800",
  },

  projectTitle: {
    margin: "6px 0 0",
    fontSize: "19px",
  },

  status: {
    height: "fit-content",
    padding: "6px 11px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700",
  },

  detailsGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
  },

  label: {
    display: "block",
    fontSize: "11px",
    color: "#999",
    marginBottom: "5px",
  },

  description: {
    margin: "20px 0",
    color: "#666",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  reviewButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "10px 15px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(74, 74, 74, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  modal: {
    width: "100%",
    maxWidth: "550px",
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "25px",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  modalTitle: {
    margin: "6px 0 0",
    fontSize: "21px",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalText: {
    color: "#666",
    lineHeight: "1.6",
    fontSize: "14px",
    marginTop: "20px",
  },

  modalInfo: {
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    borderRadius: "10px",
    padding: "15px",
    fontSize: "13px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },

  rejectButton: {
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    padding: "10px 15px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  acceptButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "10px 15px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default CollaborationRequests;