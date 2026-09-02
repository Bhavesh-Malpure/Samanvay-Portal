import {
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

function ProblemMap({
  location = "Dhule District",
  latitude = 20.9042,
  longitude = 74.7749,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2B4BD]/40">
      {/* Map area */}
      <div className="relative h-[320px] overflow-hidden bg-[#F7D6D0]">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#E2B4BD 1px, transparent 1px), linear-gradient(90deg, #E2B4BD 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative roads */}
        <div className="absolute left-[-10%] top-[45%] h-5 w-[120%] rotate-[-12deg] bg-[#FFF5F5]/80" />

        <div className="absolute left-[20%] top-[-20%] h-[150%] w-4 rotate-[28deg] bg-[#FFF5F5]/70" />

        <div className="absolute bottom-[20%] left-[-10%] h-3 w-[120%] rotate-[22deg] bg-[#FFF5F5]/70" />

        {/* Location marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#E2B4BD]/50" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#4A4A4A] text-white shadow-lg">
              <MapPin size={22} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-[#E2B4BD]/50 bg-white shadow-sm">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center hover:bg-[#F7D6D0]"
            aria-label="Zoom in"
          >
            <ZoomIn size={17} />
          </button>

          <div className="border-t border-[#E2B4BD]/40" />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center hover:bg-[#F7D6D0]"
            aria-label="Zoom out"
          >
            <ZoomOut size={17} />
          </button>
        </div>

        {/* Center location */}
        <button
          type="button"
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2B4BD]/50 bg-white shadow-sm hover:bg-[#F7D6D0]"
          aria-label="Center map"
        >
          <Navigation size={17} />
        </button>

        {/* Map label */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold">
            {location}
          </p>

          <p className="mt-1 text-[10px] text-[#4A4A4A]/45">
            Dhule District
          </p>
        </div>
      </div>

      {/* Coordinates */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3">
        <p className="text-xs text-[#4A4A4A]/50">
          Location coordinates
        </p>

        <p className="text-xs font-medium">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
      </div>
    </div>
  );
}

export default ProblemMap;