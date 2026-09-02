import { Bell } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <button
      type="button"
      className="relative rounded-xl p-2.5 text-[#4A4A4A] transition hover:bg-[#F7D6D0]"
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
    >
      <Bell size={21} />

      {unreadCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A4A4A] px-1 text-[10px] font-bold text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;