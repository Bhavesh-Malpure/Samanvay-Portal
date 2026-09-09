import React, { useState } from "react";

const initialMembers = [
  {
    id: 1,
    name: "Rahul Patil",
    role: "Team Lead",
    year: "3rd Year",
    branch: "Computer Engineering",
  },
  {
    id: 2,
    name: "Sneha Mahale",
    role: "Frontend Developer",
    year: "3rd Year",
    branch: "Information Technology",
  },
  {
    id: 3,
    name: "Akash Chaudhari",
    role: "AI / Data",
    year: "3rd Year",
    branch: "Computer Engineering",
  },
  {
    id: 4,
    name: "Pooja Shinde",
    role: "IoT Developer",
    year: "3rd Year",
    branch: "Electronics",
  },
  {
    id: 5,
    name: "Om Deshmukh",
    role: "Backend Developer",
    year: "3rd Year",
    branch: "Information Technology",
  },
];

const emptyMember = {
  name: "",
  role: "",
  year: "",
  branch: "",
};

function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMember, setNewMember] = useState(emptyMember);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewMember((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setNewMember(emptyMember);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (member) => {
    setEditingId(member.id);

    setNewMember({
      name: member.name,
      role: member.role,
      year: member.year,
      branch: member.branch,
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setNewMember(emptyMember);
    setError("");
  };

  const saveMember = (event) => {
    event.preventDefault();

    if (!newMember.name.trim()) {
      setError("Student name is required.");
      return;
    }

    if (!newMember.role.trim()) {
      setError("Student role is required.");
      return;
    }

    if (!newMember.year.trim()) {
      setError("Year is required.");
      return;
    }

    if (!newMember.branch.trim()) {
      setError("Branch is required.");
      return;
    }

    const cleanedMember = {
      name: newMember.name.trim(),
      role: newMember.role.trim(),
      year: newMember.year.trim(),
      branch: newMember.branch.trim(),
    };

    if (editingId !== null) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId
            ? {
                ...member,
                ...cleanedMember,
              }
            : member
        )
      );
    } else {
      setMembers((current) => [
        ...current,
        {
          id: Date.now(),
          ...cleanedMember,
        },
      ]);
    }

    closeForm();
  };

  const removeMember = (memberId) => {
    setMembers((current) =>
      current.filter((member) => member.id !== memberId)
    );

    if (editingId === memberId) {
      closeForm();
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Team Members</h2>

          <p style={styles.description}>
            Manage students working on Smart Electricity Monitoring.
          </p>

          <div style={styles.memberCount}>
            {members.length} team members
          </div>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          style={styles.addButton}
        >
          + Add Member
        </button>
      </div>

      {/* Faculty Mentor */}
      <div style={styles.mentorCard}>
        <div style={styles.avatar}>AP</div>

        <div>
          <div style={styles.mentorLabel}>Faculty Mentor</div>

          <div style={styles.mentorName}>
            Dr. Amit Patil
          </div>

          <div style={styles.mentorDetails}>
            Computer Engineering • IoT, AI & Smart Systems
          </div>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form onSubmit={saveMember} style={styles.form}>
          <div style={styles.formHeader}>
            <div>
              <h3 style={styles.formTitle}>
                {editingId !== null
                  ? "Edit Student Member"
                  : "Add Student Member"}
              </h3>

              <p style={styles.formDescription}>
                {editingId !== null
                  ? "Update the selected team member details."
                  : "Add a student to the project team."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              style={styles.closeButton}
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Student Name</label>

              <input
                name="name"
                value={newMember.name}
                onChange={handleChange}
                placeholder="Enter student name"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Role</label>

              <input
                name="role"
                value={newMember.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Year</label>

              <input
                name="year"
                value={newMember.year}
                onChange={handleChange}
                placeholder="e.g. 3rd Year"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Branch</label>

              <input
                name="branch"
                value={newMember.branch}
                onChange={handleChange}
                placeholder="e.g. Information Technology"
                style={styles.input}
              />
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.formActions}>
            <button
              type="submit"
              style={styles.saveButton}
            >
              {editingId !== null
                ? "Save Changes"
                : "Add Member"}
            </button>

            <button
              type="button"
              onClick={closeForm}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {members.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>👥</div>

          <h3 style={styles.emptyTitle}>
            No team members
          </h3>

          <p style={styles.emptyText}>
            Add students to start building your project team.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            style={styles.emptyButton}
          >
            + Add First Member
          </button>
        </div>
      ) : (
        /* Members */
        <div style={styles.membersGrid}>
          {members.map((member) => (
            <div
              key={member.id}
              style={styles.memberCard}
            >
              <div style={styles.memberTop}>
                <div style={styles.avatar}>
                  {getInitials(member.name)}
                </div>

                <span style={styles.memberRole}>
                  {member.role}
                </span>
              </div>

              <h3 style={styles.memberName}>
                {member.name}
              </h3>

              <div style={styles.memberInfo}>
                <span style={styles.infoLabel}>Year</span>
                {member.year}
              </div>

              <div style={styles.memberInfo}>
                <span style={styles.infoLabel}>Branch</span>
                {member.branch}
              </div>

              <div style={styles.cardActions}>
                <button
                  type="button"
                  onClick={() => openEditForm(member)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  title: {
    margin: "0 0 7px",
    fontSize: "23px",
    color: "#4A4A4A",
  },

  description: {
    margin: 0,
    color: "#6F6064",
    fontSize: "14px",
  },

  memberCount: {
    display: "inline-block",
    marginTop: "9px",
    padding: "5px 9px",
    borderRadius: "15px",
    background: "#F7D6D0",
    color: "#6F6064",
    fontSize: "11px",
    fontWeight: "600",
  },

  addButton: {
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

  mentorCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "20px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#E2B4BD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#4A4A4A",
    flexShrink: 0,
  },

  mentorLabel: {
    fontSize: "11px",
    color: "#8A777B",
    marginBottom: "3px",
  },

  mentorName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#4A4A4A",
  },

  mentorDetails: {
    fontSize: "12px",
    color: "#7A696D",
    marginTop: "3px",
  },

  form: {
    background: "#FFF5F5",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "18px",
    marginBottom: "20px",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "15px",
  },

  formTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#4A4A4A",
  },

  formDescription: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#8A777B",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    color: "#7A696D",
    fontSize: "24px",
    lineHeight: 1,
    cursor: "pointer",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6F6064",
  },

  input: {
    border: "1px solid #E2C7CB",
    borderRadius: "7px",
    padding: "10px",
    outline: "none",
    fontSize: "13px",
    background: "#FFFFFF",
    boxSizing: "border-box",
    width: "100%",
  },

  error: {
    marginTop: "12px",
    padding: "9px 11px",
    borderRadius: "7px",
    background: "#FDECEC",
    border: "1px solid #F2CACA",
    color: "#A33A3A",
    fontSize: "12px",
  },

  formActions: {
    display: "flex",
    gap: "8px",
    marginTop: "14px",
    flexWrap: "wrap",
  },

  saveButton: {
    border: "none",
    background: "#E2B4BD",
    color: "#4A4A4A",
    padding: "9px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  cancelButton: {
    border: "1px solid #E2C7CB",
    background: "#FFFFFF",
    color: "#6F6064",
    padding: "9px 14px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  membersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
  },

  memberCard: {
    background: "#FFFFFF",
    border: "1px solid #F0E1E1",
    borderRadius: "10px",
    padding: "16px",
    transition: "box-shadow 0.2s ease",
  },

  memberTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  memberRole: {
    fontSize: "10px",
    background: "#F7D6D0",
    borderRadius: "15px",
    padding: "5px 8px",
    color: "#6F6064",
    textAlign: "center",
  },

  memberName: {
    margin: "14px 0 10px",
    fontSize: "16px",
    color: "#4A4A4A",
  },

  memberInfo: {
    fontSize: "12px",
    color: "#7A696D",
    marginTop: "6px",
  },

  infoLabel: {
    display: "inline-block",
    minWidth: "45px",
    fontWeight: "600",
    color: "#8A777B",
  },

  cardActions: {
    display: "flex",
    gap: "7px",
    marginTop: "15px",
    paddingTop: "12px",
    borderTop: "1px solid #F3E6E6",
  },

  editButton: {
    flex: 1,
    border: "1px solid #E2C7CB",
    background: "#FFF5F5",
    color: "#6F6064",
    padding: "7px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  removeButton: {
    flex: 1,
    border: "1px solid #E2C7CB",
    background: "#FFFFFF",
    color: "#9B555F",
    padding: "7px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  emptyState: {
    textAlign: "center",
    background: "#FFF5F5",
    border: "1px dashed #E2C7CB",
    borderRadius: "10px",
    padding: "45px 20px",
  },

  emptyIcon: {
    fontSize: "30px",
    marginBottom: "10px",
  },

  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "17px",
    color: "#4A4A4A",
  },

  emptyText: {
    margin: "0 0 15px",
    fontSize: "13px",
    color: "#7A696D",
  },

  emptyButton: {
    border: "none",
    background: "#E2B4BD",
    color: "#4A4A4A",
    padding: "9px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default TeamMembers;