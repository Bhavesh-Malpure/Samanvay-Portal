import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

function ProblemFilters({ filters, onChange }) {
  const update = (name, value) => {
    onChange({
      ...filters,
      [name]: value,
    });
  };

  const reset = () => {
    onChange({
      search: "",
      category: "All",
      status: "All",
      priority: "All",
    });
  };

  return (
    <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={18} />

        <p className="text-sm font-bold">
          Filter Problems
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative lg:col-span-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
          />

          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              update("search", event.target.value)
            }
            placeholder="Search problems..."
            className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#4A4A4A]"
          />
        </div>

        <Select
          value={filters.category}
          onChange={(value) => update("category", value)}
          options={[
            "All",
            "Electricity",
            "Water & Sanitation",
            "PWD & Roads",
          ]}
          placeholder="Category"
        />

        <Select
          value={filters.status}
          onChange={(value) => update("status", value)}
          options={[
            "All",
            "Submitted",
            "Under Review",
            "Validated",
            "Resolved",
          ]}
          placeholder="Status"
        />

        <Select
          value={filters.priority}
          onChange={(value) => update("priority", value)}
          options={[
            "All",
            "High",
            "Medium-High",
            "Minimum",
          ]}
          placeholder="Priority"
        />
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#4A4A4A]/60 hover:text-[#4A4A4A]"
      >
        <RotateCcw size={14} />
        Reset filters
      </button>
    </div>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={placeholder}
      className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-3 py-3 text-sm outline-none focus:border-[#4A4A4A]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "All"
            ? `All ${placeholder}`
            : option}
        </option>
      ))}
    </select>
  );
}

export default ProblemFilters;