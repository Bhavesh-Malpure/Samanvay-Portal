import React, { useState } from "react";

function IndustryProfile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dhule Industrial Solutions Pvt. Ltd.",
    industry: "Technology & Infrastructure",
    location: "Dhule, Maharashtra",
    contactPerson: "Industry Partnership Manager",
    email: "partnerships@dhuleindustries.example",
    phone: "+91 98765 43210",
    website: "www.dhuleindustries.example",
    description:
      "Technology and infrastructure company supporting practical solutions for local societal and civic challenges.",
  });

  const handleChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INDUSTRY PROFILE</p>
            <h1 style={styles.title}>Industry Profile</h1>
            <p style={styles.subtitle}>
              Manage the information universities and project teams see.
            </p>
          </div>

          <button
            style={editing ? styles.saveButton : styles.editButton}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.profileTop}>
            <div style={styles.logo}>D</div>

            <div>
              <h2 style={styles.companyName}>{profile.name}</h2>
              <p style={styles.companyType}>{profile.industry}</p>
              <span style={styles.verified}>Verified Industry Partner</span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.formGrid}>
            <Field
              label="Company Name"
              value={profile.name}
              editing={editing}
              onChange={(value) => handleChange("name", value)}
            />

            <Field
              label="Industry"
              value={profile.industry}
              editing={editing}
              onChange={(value) => handleChange("industry", value)}
            />

            <Field
              label="Location"
              value={profile.location}
              editing={editing}
              onChange={(value) => handleChange("location", value)}
            />

            <Field
              label="Contact Person"
              value={profile.contactPerson}
              editing={editing}
              onChange={(value) => handleChange("contactPerson", value)}
            />

            <Field
              label="Email"
              value={profile.email}
              editing={editing}
              onChange={(value) => handleChange("email", value)}
            />

            <Field
              label="Phone"
              value={profile.phone}
              editing={editing}
              onChange={(value) => handleChange("phone", value)}
            />

            <Field
              label="Website"
              value={profile.website}
              editing={editing}
              onChange={(value) => handleChange("website", value)}
            />
          </div>

          <div style={styles.descriptionBlock}>
            <label style={styles.label}>About the Industry</label>

            {editing ? (
              <textarea
                value={profile.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                style={styles.textarea}
              />
            ) : (
              <p style={styles.description}>{profile.description}</p>
            )}
          </div>
        </div>

        <div style={styles.supportCard}>
          <h2 style={styles.supportTitle}>Areas of Support</h2>

          <div style={styles.tags}>
            {[
              "Technical Mentorship",
              "Infrastructure",
              "Industry Experts",
              "Prototype Support",
              "Implementation",
              "Career Guidance",
            ].map((item) => (
              <span key={item} style={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, editing, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
        />
      ) : (
        <div style={styles.value}>{value}</div>
      )}
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
    maxWidth: "1100px",
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

  editButton: {
    border: "1px solid #E2B4BD",
    background: "#FFF5F5",
    padding: "11px 18px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  saveButton: {
    border: "none",
    background: "#4A4A4A",
    color: "#FFF5F5",
    padding: "11px 18px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  profileCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "18px",
    padding: "28px",
  },

  profileTop: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    background: "#F7D6D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "800",
  },

  companyName: {
    margin: 0,
    fontSize: "22px",
  },

  companyType: {
    margin: "5px 0 9px",
    color: "#777",
  },

  verified: {
    display: "inline-block",
    background: "#F7D6D0",
    padding: "5px 9px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700",
  },

  divider: {
    height: "1px",
    background: "#F0E1E1",
    margin: "28px 0",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "22px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "12px",
    fontWeight: "800",
    color: "#777",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #E2B4BD",
    borderRadius: "8px",
    outline: "none",
    background: "#FFF5F5",
  },

  value: {
    padding: "11px 0",
    fontSize: "14px",
  },

  descriptionBlock: {
    marginTop: "24px",
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #E2B4BD",
    borderRadius: "8px",
    resize: "vertical",
    background: "#FFF5F5",
  },

  description: {
    margin: 0,
    lineHeight: "1.7",
    color: "#666",
    fontSize: "14px",
  },

  supportCard: {
    marginTop: "22px",
    background: "#F7D6D0",
    border: "1px solid #E2B4BD",
    borderRadius: "16px",
    padding: "24px",
  },

  supportTitle: {
    margin: "0 0 15px",
    fontSize: "18px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "9px",
  },

  tag: {
    background: "#FFF5F5",
    border: "1px solid #E2B4BD",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
};

export default IndustryProfile;