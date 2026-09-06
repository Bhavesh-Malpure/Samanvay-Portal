import { Menu, X, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import NotificationBell from "./NotificationBell";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  // =========================
  // PORTAL DETECTION
  // =========================

  const isCitizenArea = location.pathname.startsWith("/citizen");
  const isGovernmentArea =
    location.pathname.startsWith("/government");
  const isUniversityArea =
    location.pathname.startsWith("/university");
  const isIndustryArea =
    location.pathname.startsWith("/industry");

  const isPortalArea =
    isCitizenArea ||
    isGovernmentArea ||
    isUniversityArea ||
    isIndustryArea;

  // =========================
  // USER NAME
  // =========================

  const userName =
    user?.full_name ||
    user?.name ||
    user?.fullName ||
    user?.email ||
    "User";

  // =========================
  // NAVIGATION
  // =========================

  const publicNavigation = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "How It Works",
      path: "/#how-it-works",
    },
    {
      name: "About",
      path: "/#about",
    },
  ];

  const citizenNavigation = [
    {
      name: "Dashboard",
      path: "/citizen",
    },
    {
      name: "Submit Problem",
      path: "/citizen/submit",
    },
    {
      name: "My Problems",
      path: "/citizen/problems",
    },
  ];

  const governmentNavigation = [
    {
      name: "Dashboard",
      path: "/government",
    },
    {
      name: "Validation",
      path: "/government/validation",
    },
    {
      name: "Routing",
      path: "/government/routing",
    },
    {
      name: "Analytics",
      path: "/government/analytics",
    },
  ];

  const universityNavigation = [
    {
      name: "Dashboard",
      path: "/university",
    },
    {
      name: "Projects",
      path: "/university/projects",
    },
  ];

  const industryNavigation = [
    {
      name: "Dashboard",
      path: "/industry",
    },
    {
      name: "Projects",
      path: "/industry/projects",
    },
  ];

  let navigation = publicNavigation;

  if (isCitizenArea) {
    navigation = citizenNavigation;
  } else if (isGovernmentArea) {
    navigation = governmentNavigation;
  } else if (isUniversityArea) {
    navigation = universityNavigation;
  } else if (isIndustryArea) {
    navigation = industryNavigation;
  }

  // =========================
  // ACTIVE LINK
  // =========================

  const isActive = (path) => {
    if (path.includes("#")) {
      return false;
    }

    if (path === "/citizen") {
      return (
        location.pathname === "/citizen" ||
        location.pathname === "/citizen/"
      );
    }

    if (path === "/citizen/problems") {
      return (
        location.pathname === "/citizen/problems" ||
        location.pathname.startsWith("/citizen/problems/")
      );
    }

    if (path === "/government") {
      return location.pathname === "/government";
    }

    if (path === "/university") {
      return location.pathname === "/university";
    }

    if (path === "/industry") {
      return location.pathname === "/industry";
    }

    return location.pathname === path;
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    logoutUser();

    if (logout) {
      logout();
    }

    closeMobileMenu();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2B4BD]/40 bg-[#FFF5F5]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to={
            isCitizenArea
              ? "/citizen"
              : isGovernmentArea
              ? "/government"
              : isUniversityArea
              ? "/university"
              : isIndustryArea
              ? "/industry"
              : "/"
          }
          className="flex items-center gap-3"
          onClick={closeMobileMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2B4BD] font-bold text-[#4A4A4A]">
            S
          </div>

          <div>
            <p className="text-lg font-bold leading-tight text-[#4A4A4A]">
              Samanvay
            </p>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#4A4A4A]/60">
              Portal
            </p>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                color: isActive(item.path)
                  ? "#4A4A4A"
                  : "rgba(74, 74, 74, 0.65)",
              }}
              className={`text-sm font-medium transition hover:text-[#4A4A4A] ${
                isActive(item.path)
                  ? "font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* =========================
            DESKTOP ACTIONS
        ========================== */}

        <div className="hidden items-center gap-3 md:flex">

          <NotificationBell />

          {/* =========================
              LOGGED IN USER
          ========================== */}

          {isAuthenticated && isPortalArea ? (
            <>
              {/* User Name */}

              <div className="flex items-center gap-2 rounded-xl border border-[#E2B4BD]/70 bg-white/60 px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2B4BD]">
                  <UserRound
                    size={16}
                    style={{ color: "#4A4A4A" }}
                  />
                </div>

                <div className="max-w-[150px]">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: "#4A4A4A" }}
                  >
                    {userName}
                  </p>
                </div>
              </div>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#4A4A4A",
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
              >
                <LogOut size={16} />

                <span style={{ color: "#FFFFFF" }}>
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link
                to="/login"
                style={{
                  color: "#4A4A4A",
                  backgroundColor: "#FFF5F5",
                }}
                className="inline-flex items-center justify-center rounded-xl border border-[#E2B4BD] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#F7D6D0]"
              >
                <span style={{ color: "#4A4A4A" }}>
                  Login
                </span>
              </Link>

              {/* Register */}

              <Link
                to="/register"
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#4A4A4A",
                }}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
              >
                <span style={{ color: "#FFFFFF" }}>
                  Register
                </span>
              </Link>
            </>
          )}
        </div>

        {/* =========================
            MOBILE BUTTON
        ========================== */}

        <button
          type="button"
          style={{
            color: "#4A4A4A",
          }}
          className="rounded-xl p-2 md:hidden"
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X
              size={23}
              style={{ color: "#4A4A4A" }}
            />
          ) : (
            <Menu
              size={23}
              style={{ color: "#4A4A4A" }}
            />
          )}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

      {mobileMenuOpen && (
        <div className="border-t border-[#E2B4BD]/40 px-5 py-5 md:hidden">

          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                style={{
                  color: "#4A4A4A",
                  backgroundColor: isActive(item.path)
                    ? "#F7D6D0"
                    : "transparent",
                }}
                className="rounded-xl px-4 py-3 text-sm font-medium"
              >
                <span style={{ color: "#4A4A4A" }}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-3">

            <NotificationBell />

            {/* =========================
                MOBILE LOGGED IN
            ========================== */}

            {isAuthenticated && isPortalArea ? (
              <div className="flex flex-1 items-center gap-2">

                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#E2B4BD] bg-white/60 px-3 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2B4BD]">
                    <UserRound
                      size={15}
                      style={{ color: "#4A4A4A" }}
                    />
                  </div>

                  <span
                    className="truncate text-sm font-semibold"
                    style={{ color: "#4A4A4A" }}
                  >
                    {userName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#4A4A4A",
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  <LogOut size={16} />

                  <span style={{ color: "#FFFFFF" }}>
                    Logout
                  </span>
                </button>

              </div>
            ) : (
              <>
                {/* Mobile Login */}

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  style={{
                    color: "#4A4A4A",
                    backgroundColor: "#FFF5F5",
                  }}
                  className="flex-1 rounded-xl border border-[#E2B4BD] py-3 text-center text-sm font-semibold"
                >
                  <span style={{ color: "#4A4A4A" }}>
                    Login
                  </span>
                </Link>

                {/* Mobile Register */}

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#4A4A4A",
                  }}
                  className="flex-1 rounded-xl py-3 text-center text-sm font-semibold"
                >
                  <span style={{ color: "#FFFFFF" }}>
                    Register
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;