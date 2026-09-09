import React, { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function IndustryProfile() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    role: "",
  });

  // ============================================================
  // LOAD PROFILE
  // ============================================================

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("samanvay_token");

      if (!token) {
        setError("Your session has expired. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Your session has expired. Please login again."
            );
          }

          throw new Error("Failed to load profile.");
        }

        const data = await response.json();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          district: data.district || "",
          role: data.role || "",
        });
      } catch (err) {
        console.error("Profile loading failed:", err);
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const handleChange = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };

  // ============================================================
  // SAVE PROFILE
  // ============================================================

  const handleSave = async () => {
    const token = localStorage.getItem("samanvay_token");

    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profile.name,
            phone: profile.phone || null,
            district: profile.district || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update profile."
        );
      }

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        district: data.district || "",
        role: data.role || "",
      });

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    setMessage("");
    setError("");

    if (editing) {
      handleSave();
      return;
    }

    setEditing(true);
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>
              Loading your profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PROFILE
  // ============================================================

  const initials =
    profile.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "I";

  const roleLabel = profile.role
    ? profile.role.replaceAll("_", " ")
    : "Industry Partner";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INDUSTRY PROFILE</p>

            <h1 style={styles.title}>Industry Profile</h1>

            <p style={styles.subtitle}>
              Manage the information universities and project teams see.
            </p>
          </div>

          <button
            style={
              editing
                ? styles.saveButton
                : styles.editButton
            }
            onClick={handleEditToggle}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editing
              ? "Save Profile"
              : "Edit Profile"}
          </button>
        </div>

        {/* =====================================================
            SUCCESS / ERROR MESSAGE
        ====================================================== */}

        {message && (
          <div style={styles.successMessage}>
            ✓ {message}
          </div>
        )}

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* =====================================================
            PROFILE CARD
        ====================================================== */}

        <div style={styles.profileCard}>
          <div style={styles.profileTop}>
            <div style={styles.logo}>{initials}</div>

            <div>
              <h2 style={styles.companyName}>
                {profile.name || "Industry Partner"}
              </h2>

              <p style={styles.companyType}>
                {roleLabel}
              </p>

              <span style={styles.verified}>
                Verified Industry Partner
              </span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.formGrid}>
            {/* NAME */}

            <Field
              label="Name"
              value={profile.name}
              editing={editing}
              onChange={(value) =>
                handleChange("name", value)
              }
            />

            {/* EMAIL - READ ONLY */}

            <Field
              label="Email"
              value={profile.email}
              editing={false}
              readOnly
            />

            {/* PHONE */}

            <Field
              label="Phone"
              value={profile.phone}
              editing={editing}
              onChange={(value) =>
                handleChange("phone", value)
              }
              placeholder="Add phone number"
            />

            {/* DISTRICT */}

            <Field
              label="District"
              value={profile.district}
              editing={editing}
              onChange={(value) =>
                handleChange("district", value)
              }
              placeholder="Add district"
            />

            {/* ROLE - READ ONLY */}

            <Field
              label="Account Role"
              value={roleLabel}
              editing={false}
              readOnly
            />

            {/* PROFILE STATUS */}

            <Field
              label="Profile Status"
              value="Active"
              editing={false}
              readOnly
            />
          </div>

          {/* ===================================================
              PROFILE INFORMATION
          ==================================================== */}

          <div style={styles.descriptionBlock}>
            <label style={styles.label}>
              Profile Information
            </label>

            <p style={styles.description}>
              Your basic profile information is securely
              managed through your Samanvay Portal account.
              Universities and project teams can identify
              your organization through your registered
              account details.
            </p>
          </div>
        </div>

        {/* =====================================================
            SUPPORT AREAS
        ====================================================== */}

        <div style={styles.supportCard}>
          <h2 style={styles.supportTitle}>
            Areas of Support
          </h2>

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

// ============================================================
// FIELD COMPONENT
// ============================================================

function Field({
  label,
  value,
  editing,
  onChange,
  readOnly = false,
  placeholder = "",
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      {editing && !readOnly ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
        />
      ) : (
        <div
          style={
            readOnly
              ? {
                  ...styles.value,
                  ...styles.readOnlyValue,
                }
              : styles.value
          }
        >
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================

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
    gap: "20px",
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

  successMessage: {
    background: "#EEF8F0",
    border: "1px solid #B8DDBE",
    color: "#34723D",
    padding: "12px 15px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "13px",
    fontWeight: "600",
  },

  errorMessage: {
    background: "#FFF0F0",
    border: "1px solid #E5B4B4",
    color: "#A33A3A",
    padding: "12px 15px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "13px",
    fontWeight: "600",
  },

  loadingCard: {
    background: "#FFFFFF",
    border: "1px solid #E2B4BD",
    borderRadius: "18px",
    padding: "60px 30px",
    textAlign: "center",
  },

  spinner: {
    width: "28px",
    height: "28px",
    border: "3px solid #F7D6D0",
    borderTop: "3px solid #4A4A4A",
    borderRadius: "50%",
    margin: "0 auto 15px",
  },

  loadingText: {
    margin: 0,
    color: "#777",
    fontSize: "14px",
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
    textTransform: "capitalize",
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
    color: "#4A4A4A",
    fontSize: "14px",
  },

  value: {
    padding: "11px 0",
    fontSize: "14px",
    minHeight: "20px",
  },

  readOnlyValue: {
    color: "#777",
  },

  descriptionBlock: {
    marginTop: "24px",
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