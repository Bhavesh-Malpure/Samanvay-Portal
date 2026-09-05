import React, { useState } from "react";

function Documents() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Project Proposal.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploaded: "20 Aug 2026",
    },
    {
      id: 2,
      name: "System Architecture.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploaded: "22 Aug 2026",
    },
    {
      id: 3,
      name: "Field Testing Report.docx",
      type: "DOCX",
      size: "1.2 MB",
      uploaded: "28 Aug 2026",
    },
    {
      id: 4,
      name: "Prototype Documentation.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploaded: "30 Aug 2026",
    },
  ]);

  const handleUpload = () => {
    const newDocument = {
      id: Date.now(),
      name: "New Project Document.pdf",
      type: "PDF",
      size: "1.0 MB",
      uploaded: "04 Sep 2026",
    };

    setDocuments((current) => [
      ...current,
      newDocument,
    ]);
  };

  const removeDocument = (id) => {
    setDocuments((current) =>
      current.filter((document) => document.id !== id)
    );
  };

  const viewDocument = (document) => {
    alert(
      "Preview simulation\n\n" +
        document.name +
        "\n\nActual document preview will be available after backend and file storage integration."
    );
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Project Documents</h2>

          <p style={styles.description}>
            Project proposals, architecture documents, reports and
            other supporting files.
          </p>
        </div>

        <button
          onClick={handleUpload}
          style={styles.uploadButton}
        >
          + Upload Document
        </button>
      </div>

      <div style={styles.note}>
        <strong>Prototype mode:</strong> document upload is simulated
        using local React state. Actual file storage will be connected
        during backend integration.
      </div>

      <div style={styles.documents}>
        {documents.map((document) => (
          <div key={document.id} style={styles.documentCard}>
            <div style={styles.fileIcon}>
              {document.type}
            </div>

            <div style={styles.fileInfo}>
              <div style={styles.fileName}>
                {document.name}
              </div>

              <div style={styles.fileMeta}>
                {document.size} • Uploaded {document.uploaded}
              </div>
            </div>

            <div style={styles.actions}>
              <button
                onClick={() => viewDocument(document)}
                style={styles.viewButton}
              >
                View
              </button>

              <button
                onClick={() => removeDocument(document.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div style={styles.empty}>
          No documents available.
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "18px",
  },

  title: {
    margin: "0 0 7px",
    fontSize: "23px",
    color: "#4A4A4A",
  },

  description: {
    margin: 0,
    fontSize: "14px",
    color: "#6F6064",
  },

  uploadButton: {
    border: "none",
    background: "#E2B4BD",
    color: "#4A4A4A",
    borderRadius: "8px",
    padding: "10px 15px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  note: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "9px",
    padding: "13px",
    fontSize: "12px",
    color: "#7A696D",
    marginBottom: "18px",
    lineHeight: "1.5",
  },

  documents: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  documentCard: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "14px",
    background: "#FFFFFF",
  },

  fileIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    background: "#F7D6D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "700",
    color: "#6F6064",
    flexShrink: 0,
  },

  fileInfo: {
    flex: 1,
    minWidth: 0,
  },

  fileName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4A4A4A",
    wordBreak: "break-word",
  },

  fileMeta: {
    marginTop: "4px",
    fontSize: "11px",
    color: "#8A777B",
  },

  actions: {
    display: "flex",
    gap: "7px",
  },

  viewButton: {
    border: "1px solid #E2C7CB",
    background: "#FFF5F5",
    color: "#4A4A4A",
    borderRadius: "6px",
    padding: "7px 10px",
    cursor: "pointer",
    fontSize: "11px",
  },

  removeButton: {
    border: "none",
    background: "#F7D6D0",
    color: "#7E3545",
    borderRadius: "6px",
    padding: "7px 10px",
    cursor: "pointer",
    fontSize: "11px",
  },

  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#8A777B",
    background: "#FFF5F5",
    borderRadius: "10px",
  },
};

export default Documents;