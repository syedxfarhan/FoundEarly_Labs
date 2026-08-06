"use client";

import * as React from "react";

import { OS_EMPLOYEES, getProjectName } from "@/data/contractorOs";
import {
  projectNameKey,
  projectNameShortKey,
  resolveContentKey,
  translateJobRole,
  translateLocation,
  translateStatus,
  useT,
} from "@/lib/content";
import {
  Avatar,
  DataTable,
  ModuleToolbar,
  Reveal,
  StatusBadge,
  scheduleTone,
} from "@/features/contractor-os/ui";

function translateOsProjectName(id: string, fallback: string, t: ReturnType<typeof useT>) {
  return resolveContentKey(
    projectNameShortKey(id),
    resolveContentKey(projectNameKey(id), fallback, t),
    t,
  );
}

export function WorkforceModule() {
  const t = useT();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filtered = OS_EMPLOYEES.filter((employee) => {
    const matchesSearch =
      search.trim() === "" ||
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.role.toLowerCase().includes(search.toLowerCase()) ||
      employee.site.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6" data-os-module="workforce">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.workforce.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.workforce.support")}</p>
      </Reveal>

      <ModuleToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder={t("os.workforce.search")}
        filter={statusFilter}
        onFilter={setStatusFilter}
        filterLabel={t("os.filter.status")}
        filterOptions={[
          { value: "all", label: t("os.filter.all") },
          { value: "On Site", label: translateStatus("On Site", t) },
          { value: "Off Shift", label: translateStatus("Off Shift", t) },
          { value: "Leave", label: translateStatus("Leave", t) },
        ]}
      />

      <Reveal>
        <DataTable
          headers={[
            t("os.workforce.col.employee"),
            t("os.workforce.col.role"),
            t("os.workforce.col.site"),
            t("os.workforce.col.status"),
            t("os.workforce.col.shift"),
            t("os.workforce.col.project"),
          ]}
        >
          {filtered.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-border last:border-b-0 transition-colors duration-fast ease-enter hover:bg-surface-muted/60"
            >
              <td className="px-table-x py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={employee.name} />
                  <div>
                    <p className="type-body font-medium text-foreground">{employee.name}</p>
                    <p className="type-body-sm text-muted-foreground">{employee.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-table-x py-3 type-body text-foreground">
                {translateJobRole(employee.role, t)}
              </td>
              <td className="px-table-x py-3 type-body text-muted-foreground">
                {translateLocation(employee.site, t)}
              </td>
              <td className="px-table-x py-3">
                <StatusBadge
                  label={translateStatus(employee.status, t)}
                  tone={scheduleTone(employee.status)}
                />
              </td>
              <td className="px-table-x py-3 type-body text-foreground">
                {translateStatus(employee.shift, t)}
              </td>
              <td className="px-table-x py-3 type-body text-muted-foreground">
                {employee.projectId
                  ? translateOsProjectName(employee.projectId, getProjectName(employee.projectId), t)
                  : "—"}
              </td>
            </tr>
          ))}
        </DataTable>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="type-body text-muted-foreground">{t("os.empty.filtered")}</p>
      ) : null}
    </div>
  );
}
