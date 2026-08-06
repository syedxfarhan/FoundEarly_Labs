"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { slideUpVariants } from "@/animations/presets";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { durationSeconds, prefersReducedMotion } = useMotion();

  return (
    <motion.div
      className={className}
      variants={slideUpVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.12 }}
      transition={
        prefersReducedMotion
          ? { duration: durationSeconds("instant") }
          : { duration: durationSeconds("base"), delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const toneClass =
    tone === "success"
      ? "border-semantic-success/30 bg-semantic-success/10 text-semantic-success"
      : tone === "warning"
        ? "border-semantic-warning/30 bg-semantic-warning/10 text-semantic-warning"
        : tone === "danger"
          ? "border-semantic-danger/30 bg-semantic-danger/10 text-semantic-danger"
          : tone === "info"
            ? "border-semantic-info/30 bg-semantic-info/10 text-semantic-info"
            : "border-border bg-surface-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 type-label",
        toneClass,
      )}
    >
      {label}
    </span>
  );
}

export function scheduleTone(
  status: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  switch (status) {
    case "On Track":
    case "Complete":
    case "Approved":
    case "Delivered":
    case "Issued to Vendor":
    case "Current":
    case "Available":
    case "On Site":
      return "success";
    case "At Risk":
    case "Pending Approval":
    case "Watch":
    case "Maintenance":
    case "Off Shift":
    case "Under Revision":
      return "warning";
    case "Delayed":
    case "Overdue":
    case "On Hold":
    case "Leave":
      return "danger";
    case "Draft":
    case "Assigned":
    case "Open":
      return "info";
    default:
      return "neutral";
  }
}

export function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-colors duration-fast ease-enter hover:border-border-strong">
      <p className="type-label text-muted-foreground">{label}</p>
      <p className="mt-3 type-numeric-lg text-foreground" data-numeric="true">
        {value}
      </p>
      {hint ? <p className="mt-2 type-body-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="type-body-sm text-muted-foreground">Progress</span>
        <span className="type-body-sm font-medium text-foreground" data-numeric="true">
          {clamped}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-moderate ease-enter"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  const mark = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-muted type-label text-foreground"
      aria-hidden
    >
      {mark}
    </span>
  );
}

export function ModuleToolbar({
  search,
  onSearch,
  searchPlaceholder,
  filter,
  onFilter,
  filterOptions,
  filterLabel,
  actions,
}: {
  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder: string;
  filter?: string;
  onFilter?: (value: string) => void;
  filterOptions?: readonly { value: string; label: string }[];
  filterLabel?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="min-w-[200px] flex-1">
        <span className="sr-only">{searchPlaceholder}</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className={cn(
            "w-full rounded-md border border-border bg-background px-3 py-2.5 type-body text-foreground",
            "placeholder:text-muted-foreground",
            "transition-colors duration-fast ease-enter",
          )}
        />
      </label>
      {filterOptions && onFilter ? (
        <label className="flex items-center gap-2">
          <span className="type-label text-muted-foreground">{filterLabel}</span>
          <select
            value={filter}
            onChange={(e) => onFilter(e.target.value)}
            className="min-h-touch rounded-md border border-border bg-background px-3 type-body text-foreground"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {actions}
    </div>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: readonly string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[720px] border-collapse text-start">
        <thead className="sticky top-0 bg-surface-muted">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-border px-table-x py-3 text-start type-label text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function primaryButtonClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md bg-brand px-4",
    "type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter",
    "hover:bg-brand-hover",
  );
}

export function secondaryButtonClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md border border-border px-4",
    "type-body font-medium text-foreground transition-colors duration-fast ease-enter",
    "hover:bg-surface-muted",
  );
}
