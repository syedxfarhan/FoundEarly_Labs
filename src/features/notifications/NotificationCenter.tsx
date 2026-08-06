"use client";

import { Bell } from "lucide-react";

import { EmptyState } from "@/components/empty/EmptyState";
import { OverlayLayer } from "@/components/layout/OverlayLayer";
import { ShellControl } from "@/components/layout/ShellControl";
import { overlayIds } from "@/config/constants";
import { t } from "@/lib/content";
import { useNotifications } from "@/providers/NotificationProvider";
import { useShellUi } from "@/providers/ShellUiProvider";
import { cn } from "@/utils/cn";

export function NotificationBadge() {
  const { unreadCount } = useNotifications();
  const { toggleOverlay, isOverlayOpen } = useShellUi();

  return (
    <ShellControl
      aria-label={t("nav.openNotifications")}
      active={isOverlayOpen(overlayIds.notificationCenter)}
      onClick={() => toggleOverlay(overlayIds.notificationCenter)}
      className="relative"
    >
      <Bell className="size-icon-md" strokeWidth={1.5} aria-hidden />
      {unreadCount > 0 ? (
        <span
          className="absolute end-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-brand-foreground"
          aria-label={t("notifications.badge")}
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      ) : null}
    </ShellControl>
  );
}

export function NotificationCenter() {
  const { isOverlayOpen, closeOverlay } = useShellUi();
  const open = isOverlayOpen(overlayIds.notificationCenter);
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();

  return (
    <OverlayLayer
      open={open}
      onClose={closeOverlay}
      dismissOnBackdrop
      className="fixed inset-y-0 end-0 flex w-full max-w-sm"
      labelledBy="notification-center-title"
    >
      <div className="flex h-full w-full flex-col border-s border-border bg-surface shadow-elevation_3">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
          <h2 id="notification-center-title" className="type-h3">
            {t("notifications.title")}
          </h2>
          {unreadCount > 0 ? (
            <button
              type="button"
              className="type-body-sm text-brand hover:underline"
              onClick={markAllRead}
            >
              {t("notifications.markAllRead")}
            </button>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          {notifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title={t("empty.notifications.title")}
              description={t("empty.notifications.description")}
              size="sm"
              action={
                <p className="type-body-sm text-muted-foreground">
                  {t("notifications.emptyAction")}
                </p>
              }
            />
          ) : (
            <ul className="space-y-2">
              {notifications.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className={cn(
                      "w-full rounded-md border border-border px-3 py-3 text-start",
                      "hover:bg-surface-muted",
                      !item.read && "border-brand/30 bg-brand/5",
                    )}
                  >
                    <p className="type-body font-medium text-foreground">{item.title}</p>
                    {item.description ? (
                      <p className="mt-1 type-body-sm text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </OverlayLayer>
  );
}
