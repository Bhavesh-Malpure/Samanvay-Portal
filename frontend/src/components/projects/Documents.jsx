import React, { useState } from "react";

const initialDocuments = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    type: "PDF",
    uploadedBy: "Rahul Patil",
    date: "28 Aug 2026",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "System Architecture.pdf",
    type: "PDF",
    uploadedBy: "Akash Chaudhari",
    date: "30 Aug 2026",
    size: "2.4 MB",
  },
  {
    id: 3,
    name: "Field Testing Report.docx",
    type: "DOC",
    uploadedBy: "Pooja Shinde",
    date: "02 Sep 2026",
    size: "860 KB",
  },
  {
    id: 4,
    name: "Prototype Documentation.pdf",
    type: "PDF",
    uploadedBy: "Sneha Mahale",
    date: "03 Sep 2026",
    size: "3.1 MB",
  },
];

function Documents() {
  const [documents, setDocuments] = useState(initialDocuments);

  const uploadDocument = () => {
    const newDocument = {
      id: Date.now(),
      name: "New Project Document.pdf",
      type: "PDF",
      uploadedBy: "Current User",
      date: "03 Sep 2026",
      size: "1.2 MB",
    };

    setDocuments([...documents, newDocument]);
  };

  const removeDocument = (id) => {
    setDocuments(
      documents.filter((document) => document.id !== id)
    );
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Project Documents</h2>
          <p style={styles.subtitle}>
            Important files and documentation for the project.
          </p>
        </div>

        <button
          style={styles.uploadButton}
          onClick={uploadDocument}
        >
          + Upload Document
        </button>
      </div>

      <div style={styles.notice}>
        Prototype mode: document upload is simulated locally.
      </div>

      <div>
        {documents.map((document) => (
          <div key={document.id} style={styles.document}>
            <div style={styles.fileIcon}>
              {document.type}
            </div>

            <div style={styles.fileInfo}>
              <h3>{document.name}</h3>

              <p>
                Uploaded by {document.uploadedBy} •{" "}
                {document.date}
              </p>
            </div>

            <span style={styles.size}>
              {document.size}
            </span>

            <button
              style={styles.actionButton}
              onClick={() =>
                alert("Document preview is available in the prototype.")
              }
            >
              View
            </button>

            <button
              style={styles.deleteButton}
              onClick={() => removeDocument(document.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "24px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#888",
    fontSize: "13px",
  },

  uploadButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  notice: {
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    padding: "10px 13px",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "15px",
  },

  document: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderTop: "1px solid #F0E1E1",
  },

  fileIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "9px",
    background: "#F7D6D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "800",
  },

  fileInfo: {
    flex: 1,
  },

  size: {
    fontSize: "11px",
    color: "#999",
  },

  actionButton: {
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    padding: "7px 10px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },

  deleteButton: {
    border: "none",
    background: "transparent",
    color: "#9B6670",
    padding: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Documents;