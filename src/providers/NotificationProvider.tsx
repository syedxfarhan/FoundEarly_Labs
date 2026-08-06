"use client";

import * as React from "react";

export type NotificationKind = "info" | "success" | "warning" | "danger" | "neutral";

export type AppNotification = {
  id: string;
  title: string;
  description?: string;
  kind: NotificationKind;
  createdAt: string;
  read: boolean;
};

type NotificationContextValue = {
  notifications: readonly AppNotification[];
  unreadCount: number;
  addNotification: (input: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
};

const NotificationContext = React.createContext<NotificationContextValue | null>(null);

/**
 * Notification architecture shell — empty by default (no business noise).
 * Toast host remains in ToastProvider (sonner).
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);

  const addNotification = React.useCallback(
    (input: Omit<AppNotification, "id" | "createdAt" | "read">) => {
      const next: AppNotification = {
        ...input,
        id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [next, ...prev].slice(0, 50));
    },
    [],
  );

  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = React.useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = React.useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      addNotification,
      markRead,
      markAllRead,
      clearAll,
    }),
    [notifications, unreadCount, addNotification, markRead, markAllRead, clearAll],
  );

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const ctx = React.useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return ctx;
}
