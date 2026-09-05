import React, { useState } from "react";

function TeamMembers() {
  const [members, setMembers] = useState([
    {
      name: "Rahul Patil",
      role: "Team Lead",
      year: "3rd Year",
      branch: "Computer Engineering",
    },
    {
      name: "Sneha Mahale",
      role: "Frontend Developer",
      year: "3rd Year",
      branch: "Information Technology",
    },
    {
      name: "Akash Chaudhari",
      role: "AI / Data",
      year: "3rd Year",
      branch: "Computer Engineering",
    },
    {
      name: "Pooja Shinde",
      role: "IoT Developer",
      year: "3rd Year",
      branch: "Electronics",
    },
    {
      name: "Om Deshmukh",
      role: "Backend Developer",
      year: "3rd Year",
      branch: "Information Technology",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    year: "",
    branch: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewMember((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const addMember = (event) => {
    event.preventDefault();

    if (!newMember.name.trim()) {
      return;
    }

    setMembers((current) => [
      ...current,
      {
        ...newMember,
      },
    ]);

    setNewMember({
      name: "",
      role: "",
      year: "",
      branch: "",
    });

    setShowForm(false);
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Team Members</h2>

          <p style={styles.description}>
            Student members working on Smart Electricity Monitoring.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
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

      {/* Add Member Form */}
      {showForm && (
        <form onSubmit={addMember} style={styles.form}>
          <h3 style={styles.formTitle}>Add Student Member</h3>

          <div style={styles.formGrid}>
            <input
              name="name"
              value={newMember.name}
              onChange={handleChange}
              placeholder="Student name"
              style={styles.input}
            />

            <input
              name="role"
              value={newMember.role}
              onChange={handleChange}
              placeholder="Role"
              style={styles.input}
            />

            <input
              name="year"
              value={newMember.year}
              onChange={handleChange}
              placeholder="Year"
              style={styles.input}
            />

            <input
              name="branch"
              value={newMember.branch}
              onChange={handleChange}
              placeholder="Branch"
              style={styles.input}
            />
          </div>

          <div style={styles.formActions}>
            <button
              type="submit"
              style={styles.saveButton}
            >
              Add Member
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Members */}
      <div style={styles.membersGrid}>
        {members.map((member, index) => (
          <div key={index} style={styles.memberCard}>
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
              {member.year}
            </div>

            <div style={styles.memberInfo}>
              {member.branch}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
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

  formTitle: {
    margin: "0 0 15px",
    fontSize: "16px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
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

  formActions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },

  saveButton: {
    border: "none",
    background: "#E2B4BD",
    padding: "9px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  cancelButton: {
    border: "1px solid #E2C7CB",
    background: "#FFFFFF",
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
  },

  memberName: {
    margin: "14px 0 8px",
    fontSize: "16px",
  },

  memberInfo: {
    fontSize: "12px",
    color: "#7A696D",
    marginTop: "4px",
  },
};

export default TeamMembers;