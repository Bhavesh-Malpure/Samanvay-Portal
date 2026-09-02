function EmptyState({
  title = "Nothing here yet",
  description = "There is no information to display.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2B4BD]/50 bg-white p-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7D6D0] text-2xl">
        —
      </div>

      <h3 className="text-lg font-semibold text-[#4A4A4A]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-[#4A4A4A]/65">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;