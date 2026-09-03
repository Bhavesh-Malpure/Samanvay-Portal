import React, { useState } from "react";

const initialMembers = [
  {
    name: "Rahul Patil",
    role: "Team Lead",
    year: "Final Year",
    branch: "Computer Engineering",
  },
  {
    name: "Sneha Mahale",
    role: "Frontend Developer",
    year: "Third Year",
    branch: "Information Technology",
  },
  {
    name: "Akash Chaudhari",
    role: "Backend Developer",
    year: "Third Year",
    branch: "Computer Engineering",
  },
  {
    name: "Pooja Shinde",
    role: "Data Analyst",
    year: "Third Year",
    branch: "AI & Data Science",
  },
  {
    name: "Om Deshmukh",
    role: "Hardware Developer",
    year: "Final Year",
    branch: "Electronics Engineering",
  },
];

function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [showAdd, setShowAdd] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    year: "",
    branch: "",
  });

  const addMember = () => {
    if (!newMember.name || !newMember.role) {
      return;
    }

    setMembers([...members, newMember]);

    setNewMember({
      name: "",
      role: "",
      year: "",
      branch: "",
    });

    setShowAdd(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Team Members</h2>
          <p style={styles.subtitle}>
            Students and mentors working on this project.
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={() => setShowAdd(!showAdd)}
        >
          + Add Member
        </button>
      </div>

      {showAdd && (
        <div style={styles.addBox}>
          <input
            placeholder="Student name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                name: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Role"
            value={newMember.role}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                role: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Year"
            value={newMember.year}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                year: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Branch"
            value={newMember.branch}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                branch: e.target.value,
              })
            }
            style={styles.input}
          />

          <button
            style={styles.saveButton}
            onClick={addMember}
          >
            Add
          </button>
        </div>
      )}

      <div>
        {members.map((member, index) => (
          <div key={index} style={styles.member}>
            <div style={styles.avatar}>
              {member.name.charAt(0).toUpperCase()}
            </div>

            <div style={styles.memberInfo}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>

            <div style={styles.memberDetails}>
              <span>{member.year}</span>
              <span>{member.branch}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mentor}>
        <div style={styles.mentorAvatar}>A</div>

        <div>
          <span style={styles.mentorLabel}>FACULTY MENTOR</span>
          <h3>Dr. Amit Patil</h3>
          <p>Faculty Mentor • Dhule Engineering University</p>
        </div>
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
    marginBottom: "20px",
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

  addButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "9px 13px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  addBox: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    padding: "15px",
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    borderRadius: "10px",
    marginBottom: "18px",
  },

  input: {
    padding: "9px",
    border: "1px solid #E2B4BD",
    borderRadius: "7px",
    background: "#FFFFFF",
    boxSizing: "border-box",
  },

  saveButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    borderRadius: "7px",
    fontWeight: "700",
    cursor: "pointer",
  },

  member: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderTop: "1px solid #F0E1E1",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#F7D6D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  memberInfo: {
    flex: 1,
  },

  memberDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
    color: "#888",
    fontSize: "11px",
  },

  mentor: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginTop: "15px",
    padding: "17px",
    background: "#F7D6D0",
    borderRadius: "10px",
  },

  mentorAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#4A4A4A",
    color: "#FFF5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  mentorLabel: {
    color: "#9B6670",
    fontSize: "10px",
    fontWeight: "800",
  },
};

export default TeamMembers;