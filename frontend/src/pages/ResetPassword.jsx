import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError(
        "This password reset link is invalid or incomplete."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to reset password."
        );
      }

      setSuccess(
        "Your password has been successfully updated."
      );

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f8] px-5 py-8 text-[#4b4b4b]">
      <div className="mx-auto w-full max-w-[608px]">
        {/* Back */}
        <div className="mb-11">
          <Link
            to="/login"
            className="inline-flex items-center gap-3 text-[17px] font-medium text-[#353535] transition hover:text-[#111111]"
          >
            <ArrowLeft size={20} strokeWidth={1.8} />
            Choose another portal
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-[34px] border border-[#eee5e5] bg-white px-10 py-12 shadow-[0_8px_30px_rgba(80,50,50,0.05)] sm:px-12 sm:py-12">
          {/* Icon */}
          <div className="mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-[22px] bg-[#f8d8d2]">
            <Lock
              size={31}
              strokeWidth={1.8}
              className="text-[#555555]"
            />
          </div>

          {/* Portal Label */}
          <div className="mb-5 flex items-center gap-2 text-[16px] font-medium tracking-[0.04em] text-[#999999]">
            <ShieldCheck
              size={19}
              strokeWidth={1.8}
            />
            ACCOUNT SECURITY
          </div>

          {/* Heading */}
          <h1 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#3f3f3f]">
            Reset your password
          </h1>

          <p className="mt-4 max-w-[500px] text-[18px] leading-8 text-[#999999]">
            Create a new password for your Samanvay Portal
            account and get back to your account.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-7 flex gap-3 rounded-[16px] border border-red-200 bg-red-50 px-4 py-4 text-[14px] leading-6 text-red-600">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success ? (
            <div className="mt-8">
              <div className="flex gap-3 rounded-[16px] border border-green-200 bg-green-50 px-5 py-5 text-green-700">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold">
                    Password reset successful
                  </p>

                  <p className="mt-1 text-sm leading-6 text-green-600">
                    {success} You can now sign in using your
                    new password.
                  </p>
                </div>
              </div>

              <Link
                to="/login"
                className="mt-6 flex h-[70px] w-full items-center justify-center gap-3 rounded-[17px] bg-[#4d4d4d] text-[18px] font-medium text-white transition hover:bg-[#3f3f3f]"
              >
                Continue to Login
                <ArrowRight size={22} strokeWidth={1.8} />
              </Link>
            </div>
          ) : !token ? (
            <div className="mt-8">
              <div className="rounded-[16px] border border-red-200 bg-red-50 px-5 py-5 text-sm leading-6 text-red-600">
                This password reset link is invalid or
                incomplete. Please request a new reset link.
              </div>

              <Link
                to="/login"
                className="mt-6 flex h-[70px] w-full items-center justify-center gap-3 rounded-[17px] bg-[#4d4d4d] text-[18px] font-medium text-white transition hover:bg-[#3f3f3f]"
              >
                Back to Login
                <ArrowRight size={22} strokeWidth={1.8} />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-7"
            >
              {/* New Password */}
              <div>
                <label className="mb-3 block text-[17px] font-medium text-[#353535]">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={22}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter your new password"
                    disabled={loading}
                    className="h-[68px] w-full rounded-[17px] border border-[#f1cccc] bg-[#fff8f8] pl-[55px] pr-[55px] text-[17px] text-[#444] outline-none transition placeholder:text-[#bdb5b5] focus:border-[#dfaaa4] focus:ring-2 focus:ring-[#f8d8d2]/50 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] transition hover:text-[#555]"
                  >
                    {showPassword ? (
                      <EyeOff size={21} />
                    ) : (
                      <Eye size={21} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-[13px] text-[#aaa]">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-3 block text-[17px] font-medium text-[#353535]">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={22}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your new password"
                    disabled={loading}
                    className="h-[68px] w-full rounded-[17px] border border-[#f1cccc] bg-[#fff8f8] pl-[55px] pr-[55px] text-[17px] text-[#444] outline-none transition placeholder:text-[#bdb5b5] focus:border-[#dfaaa4] focus:ring-2 focus:ring-[#f8d8d2]/50 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] transition hover:text-[#555]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={21} />
                    ) : (
                      <Eye size={21} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-[70px] w-full items-center justify-center gap-3 rounded-[17px] bg-[#4d4d4d] text-[18px] font-medium text-white transition hover:bg-[#3f3f3f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight
                      size={22}
                      strokeWidth={1.8}
                    />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Login Link */}
          {!success && (
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="text-[15px] text-[#888] transition hover:text-[#333]"
              >
                ← Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="mt-7 flex items-center justify-center gap-2 text-[13px] text-[#aaa]">
          <ShieldCheck
            size={16}
            strokeWidth={1.7}
          />
          Secure password recovery
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;