import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Landmark,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    {
      value: "citizen",
      label: "Citizen",
      description: "Report and track local problems.",
      icon: UserRound,
    },
    {
      value: "government",
      label: "Government",
      description: "Validate and route problems.",
      icon: Landmark,
    },
    {
      value: "university",
      label: "University",
      description: "Develop and manage solutions.",
      icon: GraduationCap,
    },
    {
      value: "industry",
      label: "Industry",
      description: "Collaborate and support projects.",
      icon: Building2,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const role = formData.get("role");

    login({
      id: "new-demo-user",
      name: formData.get("name"),
      email: formData.get("email"),
      role,
    });

    navigate(role === "citizen" ? "/citizen" : "/");
  };

  return (
    <AuthLayout>
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A]/60 hover:text-[#4A4A4A]"
      >
        <ArrowLeft size={16} />
        Back to Samanvay
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2B4BD] font-bold">
            S
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
            Join the Samanvay ecosystem and contribute to local
            solutions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm outline-none focus:border-[#4A4A4A]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm outline-none focus:border-[#4A4A4A]"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold">
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
                      defaultChecked={role.value === "citizen"}
                      className="peer sr-only"
                    />

                    <div className="rounded-2xl border border-[#E2B4BD]/50 p-4 transition peer-checked:border-[#4A4A4A] peer-checked:bg-[#F7D6D0] hover:bg-[#FFF5F5]">
                      <Icon size={20} />

                      <p className="mt-3 text-sm font-semibold">
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

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Create a password"
              className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm outline-none focus:border-[#4A4A4A]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#4A4A4A] py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#4A4A4A] underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;