import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Landmark,
  UserRound,
  Loader2,
  AlertCircle,
  LockKeyhole,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CITIZEN",
    phone: "",
    district: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      value: "CITIZEN",
      label: "Citizen",
      description: "Report and track local problems.",
      icon: UserRound,
    },
    {
      value: "GOVERNMENT",
      label: "Government",
      description: "Validate and route problems.",
      icon: Landmark,
    },
    {
      value: "UNIVERSITY_STUDENT",
      label: "University",
      description: "Develop and manage solutions.",
      icon: GraduationCap,
    },
    {
      value: "INDUSTRY",
      label: "Industry",
      description: "Collaborate and support projects.",
      icon: Building2,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /*
   * Decide which login portal should open
   * after registration.
   */
  const getLoginPortal = (role) => {
    switch (role) {
      case "CITIZEN":
        return "citizen";

      case "GOVERNMENT":
        return "government";

      case "UNIVERSITY_STUDENT":
      case "UNIVERSITY_MENTOR":
      case "UNIVERSITY_AUTHORITY":
        return "university";

      case "INDUSTRY":
        return "industry";

      default:
        return "citizen";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const createdUser = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || null,
        role: formData.role,
        district: formData.district || null,
      });

      /*
       * Registration creates the account.
       *
       * Backend registration does not currently return
       * a JWT token, so the user must login separately.
       *
       * We send them directly to the correct portal.
       */

      const loginPortal = getLoginPortal(formData.role);

      navigate(`/login/${loginPortal}`, {
        replace: true,
        state: {
          registered: true,
          email: createdUser.email,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);

      setError(
        error.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Back */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A]/60 transition hover:text-[#4A4A4A]"
      >
        <ArrowLeft size={16} />
        Back to Samanvay
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
        {/* Header */}
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2B4BD] font-bold text-[#4A4A4A]">
            S
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#4A4A4A]">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
            Join the Samanvay ecosystem and contribute to
            local solutions.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Enter your full name"
              disabled={loading}
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="you@example.com"
              disabled={loading}
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              Phone Number
              <span className="ml-1 font-normal text-[#4A4A4A]/40">
                (optional)
              </span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="Enter your phone number"
              disabled={loading}
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* District */}
          <div>
            <label
              htmlFor="district"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              District
              <span className="ml-1 font-normal text-[#4A4A4A]/40">
                (optional)
              </span>
            </label>

            <input
              id="district"
              name="district"
              type="text"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Dhule"
              disabled={loading}
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#4A4A4A]">
              I am joining as
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((role) => {
                const Icon = role.icon;

                return (
                  <label
                    key={role.value}
                    className="cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      disabled={loading}
                      className="peer sr-only"
                    />

                    <div className="rounded-2xl border border-[#E2B4BD]/50 p-4 transition hover:bg-[#FFF5F5] peer-checked:border-[#4A4A4A] peer-checked:bg-[#F7D6D0]">
                      <Icon
                        size={20}
                        className="text-[#4A4A4A]"
                      />

                      <p className="mt-3 text-sm font-semibold text-[#4A4A4A]">
                        {role.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/55">
                        {role.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Create a password"
              disabled={loading}
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-[#4A4A4A]/45">
              Use at least 6 characters.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#4A4A4A] underline underline-offset-4 transition hover:opacity-70"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Security */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4A4A4A]/45">
        <LockKeyhole size={13} />
        Your password is securely protected
      </div>
    </AuthLayout>
  );
}

export default Register;