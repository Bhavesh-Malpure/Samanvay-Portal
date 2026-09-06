import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
    const token = localStorage.getItem("samanvay_token");

    if (!token) {
      setNotifications([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/api/notifications/");

      const backendNotifications = Array.isArray(response.data)
        ? response.data
        : [];

      const formattedNotifications = backendNotifications.map(
        (notification) => ({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          read: notification.is_read,
          createdAt: notification.created_at,
        })
      );

      setNotifications(formattedNotifications);
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();

    const handleFocus = () => {
      loadNotifications();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadNotifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      createdAt: new Date(),
      ...notification,
    };

    setNotifications((current) => [
      newNotification,
      ...current,
    ]);
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(
        `/api/notifications/${notificationId}/read`
      );

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/api/notifications/read-all");

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const value = {
    notifications,
    unreadCount,
    loading,
    addNotification,
    markAsRead,
    markAllAsRead,
    loadNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}