import {
  Bell,
  Check,
  CheckCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useNotifications } from "../../context/NotificationContext";

function NotificationBell() {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    await markAllAsRead();
  };

  const formatDate = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    return notificationDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      ref={notificationRef}
      className="relative"
    >
      {/* Notification Bell */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`relative rounded-xl p-2.5 text-[#4A4A4A] transition-all duration-200 hover:bg-[#F7D6D0] ${
          isOpen ? "bg-[#F7D6D0]" : ""
        }`}
        aria-label={`Notifications${
          unreadCount > 0
            ? `, ${unreadCount} unread`
            : ""
        }`}
        aria-expanded={isOpen}
      >
        <Bell
          size={21}
          strokeWidth={2}
        />

        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A4A4A] px-1 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
       <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#E8D9D5] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.15)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F0E5E2] px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-[#2F2F2F]">
                Notifications
              </h3>

              <p className="mt-0.5 text-xs text-[#8A8A8A]">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount > 1 ? "s" : ""
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-[#777] transition hover:bg-[#F7F1EF] hover:text-[#333]"
              aria-label="Close notifications"
            >
              <X size={17} />
            </button>
          </div>

          {/* Mark All As Read */}
          {notifications.length > 0 && (
            <div className="flex justify-end border-b border-[#F5ECEA] px-4 py-2">
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className={`flex items-center gap-1.5 text-xs font-semibold transition ${
                  unreadCount > 0
                    ? "text-[#7A4E48] hover:text-[#4A302C]"
                    : "cursor-not-allowed text-[#BDB5B2]"
                }`}
              >
                <CheckCheck size={15} />
                Mark all as read
              </button>
            </div>
          )}

          {/* Notification List */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center px-5 py-10">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#E8D9D5] border-t-[#7A4E48]" />

                <p className="mt-3 text-sm text-[#888]">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F1EF]">
                  <Bell
                    size={22}
                    className="text-[#9A7770]"
                  />
                </div>

                <p className="text-sm font-semibold text-[#555]">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-[#999]">
                  You'll see updates about your problems here.
                </p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() =>
                      handleNotificationClick(notification)
                    }
                    className={`group flex w-full gap-3 border-b border-[#F3EAE8] px-4 py-3 text-left transition last:border-b-0 hover:bg-[#FCF8F7] ${
                      !notification.read
                        ? "bg-[#FFF8F6]"
                        : "bg-white"
                    }`}
                  >
                    {/* Unread Indicator */}
                    <div className="flex shrink-0 pt-1">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          !notification.read
                            ? "bg-[#7A4E48]"
                            : "bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Notification Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${
                            !notification.read
                              ? "font-bold text-[#3A302E]"
                              : "font-semibold text-[#5A5553]"
                          }`}
                        >
                          {notification.title}
                        </p>

                        {!notification.read && (
                          <span className="shrink-0 rounded-full bg-[#F0D7D1] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#70453E]">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#777]">
                        {notification.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#A09A98]">
                          {formatDate(
                            notification.createdAt
                          )}
                        </span>

                        {notification.read && (
                          <span className="flex items-center gap-1 text-[10px] text-[#999]">
                            <Check size={12} />
                            Read
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-[#F0E5E2] bg-[#FCFAF9] px-4 py-2.5">
              <p className="text-center text-[10px] text-[#9A9390]">
                Showing your latest notifications
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;