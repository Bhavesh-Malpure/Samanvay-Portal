import {
  AlertCircle,
  CheckCircle2,
  LocateFixed,
  MapPin,
  X,
} from "lucide-react";
import { useLocation } from "../context/LocationContext";

function LocationGate() {
  const {
    locationStatus,
    requestLocation,
    hasLocation,
  } = useLocation();

  // Location successfully granted
  if (hasLocation && locationStatus === "granted") {
    return null;
  }

  const hasError =
    locationStatus === "denied" ||
    locationStatus === "unsupported" ||
    locationStatus === "unavailable" ||
    locationStatus === "timeout" ||
    locationStatus === "error";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Top Section */}
        <div className="bg-[#E2B4BD] px-6 py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80">
            <LocateFixed
              size={30}
              className="text-[#4A4A4A]"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#4A4A4A]">
            Location Access Required
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/70">
            Allow your location to get local problems, projects
            and opportunities relevant to your area.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {locationStatus === "loading" ? (
            <div className="py-5 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E2B4BD] border-t-[#4A4A4A]" />

              <p className="mt-4 font-semibold text-[#4A4A4A]">
                Detecting your location...
              </p>

              <p className="mt-1 text-sm text-[#4A4A4A]/60">
                Please allow location access in your browser.
              </p>
            </div>
          ) : (
            <>
              {/* Error */}
              {hasError && (
                <div className="mb-5 flex gap-3 rounded-2xl border border-[#E2B4BD] bg-[#FFF5F5] p-4">
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-[#4A4A4A]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      Location permission is required
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/65">
                      {locationStatus === "denied"
                        ? "You denied location access. Please allow it from your browser settings and try again."
                        : "We couldn't access your location. Please try again."}
                    </p>
                  </div>
                </div>
              )}

              {/* Location Info */}
              <div className="flex items-center gap-3 rounded-2xl bg-[#FFF5F5] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2B4BD]">
                  <MapPin size={20} className="text-[#4A4A4A]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#4A4A4A]">
                    Why do we need your location?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#4A4A4A]/60">
                    To show you relevant local problems,
                    initiatives and opportunities.
                  </p>
                </div>
              </div>

              {/* Allow Button */}
              <button
                type="button"
                onClick={requestLocation}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#333333]"
              >
                <MapPin size={18} />

                {hasError
                  ? "Allow Location & Try Again"
                  : "Allow Location"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#4A4A4A]/50">
                Location access is required to continue using
                Samanvay Portal.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationGate;