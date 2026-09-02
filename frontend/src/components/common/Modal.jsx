import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!isOpen) {
    return null;
  }

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A4A4A]/40 px-4 py-8">
      <div
        className={`relative w-full ${sizes[size]} rounded-2xl bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-[#E2B4BD]/40 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#4A4A4A]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-[#FFF5F5]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;