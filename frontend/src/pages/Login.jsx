import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  AlertCircle,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const portalConfig = {
  citizen: {
    role: "CITIZEN",
    title: "Citizen Portal",
    heading: "Welcome back, Citizen",
    description:
      "Sign in to report problems, track complaints, and stay connected with your local government.",
    icon: UserRound,
    accent: "Citizen",
    dashboard: "/citizen",
  },

  government: {
    role: "GOVERNMENT",
    title: "Government Portal",
    heading: "Government Access",
    description:
      "Sign in to review citizen problems, validate reports, and manage civic workflows.",
    icon: Landmark,
    accent: "Government",
    dashboard: "/government",
  },

  university: {
    role: "UNIVERSITY",
    title: "University Portal",
    heading: "University Workspace",
    description:
      "Sign in to collaborate on civic projects, manage solutions, and connect with government.",
    icon: GraduationCap,
    accent: "University",
    dashboard: "/university/student",

    roles: [
      {
        role: "UNIVERSITY_STUDENT",
        label: "Student",
        description:
          "Work on civic projects, manage tasks, and collaborate with your team.",
        dashboard: "/university/student",
      },
      {
        role: "UNIVERSITY_MENTOR",
        label: "Faculty / Mentor",
        description:
          "Guide student teams, review projects, and support solutions.",
        dashboard: "/university/faculty",
      },
      {
        role: "UNIVERSITY_AUTHORITY",
        label: "Higher Authority",
        description:
          "Manage university activities, projects, and institutional coordination.",
        dashboard: "/university/admin",
      },
    ],
  },

  industry: {
    role: "INDUSTRY",
    title: "Industry Portal",
    heading: "Industry Workspace",
    description:
      "Sign in to discover projects, collaborate with institutions, and contribute industry expertise.",
    icon: Building2,
    accent: "Industry",
    dashboard: "/industry",
  },
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  /*
   * URL format:
   * /login
   * /login/citizen
   * /login/government
   * /login/university
   * /login/industry
   */

  const portalKey = location.pathname.split("/")[2];

  const portal = portalConfig[portalKey];
  const PortalIcon = portal?.icon;

  /*
   * University role can be selected using:
   * /login/university?role=UNIVERSITY_STUDENT
   * /login/university?role=UNIVERSITY_MENTOR
   * /login/university?role=UNIVERSITY_AUTHORITY
   */

  const selectedUniversityRole =
    new URLSearchParams(location.search).get("role");

  const registeredSuccessfully =
    location.state?.registered === true;

  const registeredEmail =
    location.state?.email || "";

  const [formData, setFormData] = useState({
    email: registeredEmail,
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
   * University has 3 different roles.
   * All of them enter through the same University Portal.
   */

  const isAllowedRole = (userRole) => {
    if (!portal) {
      return false;
    }

    if (portalKey === "university") {
      /*
       * If a specific University role was selected,
       * only that role is allowed.
       */
      if (selectedUniversityRole) {
        return userRole === selectedUniversityRole;
      }

      /*
       * Otherwise all University roles are allowed.
       */
      return [
        "UNIVERSITY_STUDENT",
        "UNIVERSITY_MENTOR",
        "UNIVERSITY_AUTHORITY",
      ].includes(userRole);
    }

    return userRole === portal.role;
  };

  /*
   * Redirect user to the correct dashboard
   * after successful authentication.
   */

  const getDashboardPath = (role) => {
    switch (role) {
      case "CITIZEN":
        return "/citizen";

      case "GOVERNMENT":
        return "/government";

      case "UNIVERSITY_STUDENT":
        return "/university/student";

      case "UNIVERSITY_MENTOR":
        return "/university/faculty";

      case "UNIVERSITY_AUTHORITY":
        return "/university/admin";

      case "INDUSTRY":
        return "/industry";

      default:
        return "/";
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case "CITIZEN":
        return "Citizen";

      case "GOVERNMENT":
        return "Government";

      case "UNIVERSITY_STUDENT":
        return "University Student";

      case "UNIVERSITY_MENTOR":
        return "University Mentor";

      case "UNIVERSITY_AUTHORITY":
        return "University Authority";

      case "INDUSTRY":
        return "Industry";

      default:
        return "Unknown";
    }
  };

  const getUniversityRoleLabel = (role) => {
    switch (role) {
      case "UNIVERSITY_STUDENT":
        return "Student";

      case "UNIVERSITY_MENTOR":
        return "Faculty / Mentor";

      case "UNIVERSITY_AUTHORITY":
        return "Higher Authority";

      default:
        return "University";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("LOGIN USER:", user);

      /*
       * Authentication succeeded, but we still verify
       * whether the account belongs to this portal.
       */

      if (!isAllowedRole(user.role)) {
        const actualRole = getRoleName(user.role);

        if (
          portalKey === "university" &&
          selectedUniversityRole
        ) {
          setError(
            `This account is registered as ${actualRole}. Please select ${getUniversityRoleLabel(
              user.role
            )} from the University portal.`
          );
        } else {
          setError(
            `This account is registered as ${actualRole}. Please use the ${actualRole} login portal.`
          );
        }

        return;
      }

      /*
       * Only store authenticated user after
       * portal verification succeeds.
       */

      login(user);

      const dashboardPath = getDashboardPath(
        user.role
      );

      navigate(dashboardPath, {
        replace: true,
      });
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * /login = Portal Selector
   */

  if (!portal) {
    return (
      <AuthLayout>
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
              Sign in to Samanvay
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
              Choose your portal to continue.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid gap-3">
            {Object.entries(portalConfig).map(
              ([key, item]) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={key}
                    to={`/login/${key}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[#E2B4BD]/50 p-4 transition hover:border-[#4A4A4A] hover:bg-[#FFF5F5]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7D6D0] text-[#4A4A4A] transition group-hover:bg-[#E2B4BD]">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#4A4A4A]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/55">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="shrink-0 text-[#4A4A4A]/30 transition group-hover:translate-x-1 group-hover:text-[#4A4A4A]"
                    />
                  </Link>
                );
              }
            )}
          </div>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#4A4A4A] underline underline-offset-4 transition hover:opacity-70"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Security */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4A4A4A]/45">
          <LockKeyhole size={13} />
          Secure authentication
        </div>
      </AuthLayout>
    );
  }

  /*
   * Portal-specific Login Page
   */

  return (
    <AuthLayout>
      {/* Back */}
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A]/60 transition hover:text-[#4A4A4A]"
      >
        <ArrowLeft size={16} />
        Choose another portal
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
        {/* Header */}
        <div className="mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7D6D0] text-[#4A4A4A]">
            <PortalIcon size={25} />
          </div>

          <div className="mt-5 flex items-center gap-2">
            <ShieldCheck
              size={15}
              className="text-[#4A4A4A]/50"
            />

            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A]/50">
              {portal.title}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#4A4A4A]">
            {portal.heading}
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
            {portal.description}
          </p>
        </div>

        {/* University Role Selection */}
        {portalKey === "university" && (
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-[#4A4A4A]">
              Select your role
            </p>

            <div className="grid gap-3">
              {portal.roles.map((item) => {
                const isSelected =
                  selectedUniversityRole === item.role;

                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => {
                      setError("");

                      navigate(
                        `/login/university?role=${item.role}`
                      );
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-[#4A4A4A] bg-[#F7D6D0]"
                        : "border-[#E2B4BD]/60 bg-[#FFF5F5] hover:border-[#4A4A4A] hover:bg-[#F7D6D0]"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#4A4A4A]">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/55">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className={`ml-3 shrink-0 text-[#4A4A4A]/40 transition ${
                        isSelected
                          ? "translate-x-1 text-[#4A4A4A]"
                          : ""
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {selectedUniversityRole && (
              <p className="mt-3 text-xs text-[#4A4A4A]/55">
                Signing in as{" "}
                <strong>
                  {getUniversityRoleLabel(
                    selectedUniversityRole
                  )}
                </strong>
              </p>
            )}
          </div>
        )}

        {/* Registration Success */}
        {registeredSuccessfully && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Account created successfully!
              </p>

              <p className="mt-1 text-green-700/80">
                Your account is ready. Sign in using your
                password to continue.
              </p>
            </div>
          </div>
        )}

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

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
              />

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
                className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-4 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#4A4A4A]"
              >
                Password
              </label>

              {/* Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#4A4A4A]/60 transition hover:text-[#4A4A4A]"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
              />

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
                className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-4 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              (portalKey === "university" &&
                !selectedUniversityRole)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Signing in...
              </>
            ) : (
              <>
                Sign In to{" "}
                {portalKey === "university" &&
                selectedUniversityRole
                  ? getUniversityRoleLabel(
                      selectedUniversityRole
                    )
                  : portal.accent}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#4A4A4A] underline underline-offset-4 transition hover:opacity-70"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Security */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4A4A4A]/45">
        <LockKeyhole size={13} />
        Secure authentication
      </div>
    </AuthLayout>
  );
}

export default Login;