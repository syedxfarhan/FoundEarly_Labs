"use client";

import * as React from "react";

import { OS_EQUIPMENT, getProjectName } from "@/data/contractorOs";
import { t } from "@/lib/content";
import {
  DataTable,
  ModuleToolbar,
  Reveal,
  StatusBadge,
  scheduleTone,
} from "@/features/contractor-os/ui";

export function EquipmentModule() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filtered = OS_EQUIPMENT.filter((item) => {
    const matchesSearch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6" data-os-module="equipment">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.equipment.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.equipment.support")}</p>
      </Reveal>

      <ModuleToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder={t("os.equipment.search")}
        filter={statusFilter}
        onFilter={setStatusFilter}
        filterLabel={t("os.filter.status")}
        filterOptions={[
          { value: "all", label: t("os.filter.all") },
          { value: "Assigned", label: "Assigned" },
          { value: "Available", label: "Available" },
          { value: "Maintenance", label: "Maintenance" },
        ]}
      />

      <Reveal>
        <DataTable
          headers={[
            t("os.equipment.col.asset"),
            t("os.equipment.col.type"),
            t("os.equipment.col.status"),
            t("os.equipment.col.location"),
            t("os.equipment.col.project"),
            t("os.equipment.col.maintenance"),
          ]}
        >
          {filtered.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border last:border-b-0 transition-colors duration-fast ease-enter hover:bg-surface-muted/60"
            >
              <td className="px-table-x py-3">
                <p className="type-body font-medium text-foreground">{item.name}</p>
                <p className="type-body-sm text-muted-foreground">{item.id}</p>
              </td>
              <td className="px-table-x py-3 type-body text-foreground">{item.type}</td>
              <td className="px-table-x py-3">
                <StatusBadge label={item.status} tone={scheduleTone(item.status)} />
              </td>
              <td className="px-table-x py-3 type-body text-muted-foreground">{item.location}</td>
              <td className="px-table-x py-3 type-body text-muted-foreground">
                {item.projectId ? getProjectName(item.projectId) : "—"}
              </td>
              <td className="px-table-x py-3 type-body text-foreground" data-numeric="true">
                {item.nextMaintenance}
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
