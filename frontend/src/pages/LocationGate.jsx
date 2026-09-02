import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LocateFixed,
  MapPin,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
import Loading from "../components/common/Loading";

function LocationGate() {
  const navigate = useNavigate();

  const {
    location,
    locationStatus,
    requestLocation,
    hasLocation,
  } = useLocation();

  if (hasLocation && locationStatus === "granted") {
    return (
      <div className="min-h-screen bg-[#FFF5F5]">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7D6D0]">
              <CheckCircle2
                size={38}
                className="text-[#4A4A4A]"
              />
            </div>

            <h1 className="mt-7 text-3xl font-bold text-[#4A4A4A]">
              Location detected
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-[#4A4A4A]/65">
              Samanvay will use your location to connect you with
              relevant local problems, initiatives and opportunities.
            </p>

            <div className="mx-auto mt-7 flex max-w-sm items-center gap-3 rounded-2xl bg-[#FFF5F5] p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2B4BD]">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Location access granted
                </p>

                <p className="text-xs text-[#4A4A4A]/60">
                  Coordinates captured successfully
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#4A4A4A] px-6 py-3 font-semibold text-white transition hover:bg-[#4A4A4A]/90"
            >
              Continue to Samanvay
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (locationStatus === "loading") {
    return (
      <div className="min-h-screen bg-[#FFF5F5]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="w-full rounded-3xl bg-white p-10 text-center shadow-sm">
            <Loading message="Detecting your location..." />

            <p className="mt-2 text-sm text-[#4A4A4A]/60">
              Please allow location access when your browser asks for permission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasError =
    locationStatus === "denied" ||
    locationStatus === "unsupported" ||
    locationStatus === "unavailable" ||
    locationStatus === "timeout" ||
    locationStatus === "error";

  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">
          {/* Visual section */}
          <div className="relative hidden min-h-[560px] overflow-hidden bg-[#E2B4BD] p-10 md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF5F5] font-bold text-[#4A4A4A]">
                S
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#4A4A4A]/60">
                Samanvay Portal
              </p>

              <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight text-[#4A4A4A]">
                Local problems deserve local solutions.
              </h2>
            </div>

            <div>
              <div className="flex items-center gap-3 text-[#4A4A4A]">
                <MapPin size={20} />

                <span className="text-sm font-medium">
                  Starting with Dhule District
                </span>
              </div>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#4A4A4A]/65">
                Your location helps Samanvay understand which local
                ecosystem you belong to.
              </p>
            </div>
          </div>

          {/* Main section */}
          <div className="flex min-h-[560px] flex-col justify-center p-8 sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7D6D0]">
              <LocateFixed size={30} />
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#4A4A4A]/50">
              Welcome
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#4A4A4A] sm:text-4xl">
              Enable your location
            </h1>

            <p className="mt-4 leading-7 text-[#4A4A4A]/65">
              Samanvay uses your location to connect you with
              societal problems, projects and opportunities relevant
              to your area.
            </p>

            {hasError && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-[#E2B4BD] bg-[#FFF5F5] p-4">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Location access could not be completed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/65">
                    {locationStatus === "denied"
                      ? "Location permission was denied. Please allow location access in your browser settings and try again."
                      : "We couldn't retrieve your location. Please try again."}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={requestLocation}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90"
            >
              <MapPin size={18} />
              {hasError ? "Try Again" : "Allow Location & Continue"}
            </button>

            <p className="mt-5 text-center text-xs leading-5 text-[#4A4A4A]/50">
              Your browser will ask for permission. Samanvay only
              requests location access to support local discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationGate;