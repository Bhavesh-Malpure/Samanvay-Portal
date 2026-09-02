function Loading({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#F7D6D0] border-t-[#4A4A4A]" />

      <p className="text-sm text-[#4A4A4A]/70">
        {message}
      </p>
    </div>
  );
}

export default Loading;