"use client";

import * as React from "react";

import { OS_PURCHASE_ORDERS, getProjectName } from "@/data/contractorOs";
import { formatSar } from "@/lib/formatters";
import { t } from "@/lib/content";
import {
  DataTable,
  ModuleToolbar,
  Reveal,
  StatusBadge,
  scheduleTone,
} from "@/features/contractor-os/ui";

export function PurchaseOrdersModule() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filtered = OS_PURCHASE_ORDERS.filter((po) => {
    const matchesSearch =
      search.trim() === "" ||
      po.id.toLowerCase().includes(search.toLowerCase()) ||
      po.vendor.toLowerCase().includes(search.toLowerCase()) ||
      getProjectName(po.projectId).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6" data-os-module="purchase-orders">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.pos.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.pos.support")}</p>
      </Reveal>

      <ModuleToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder={t("os.pos.search")}
        filter={statusFilter}
        onFilter={setStatusFilter}
        filterLabel={t("os.filter.status")}
        filterOptions={[
          { value: "all", label: t("os.filter.all") },
          { value: "Draft", label: "Draft" },
          { value: "Pending Approval", label: "Pending Approval" },
          { value: "Approved", label: "Approved" },
          { value: "Issued to Vendor", label: "Issued to Vendor" },
          { value: "Delivered", label: "Delivered" },
          { value: "On Hold", label: "On Hold" },
        ]}
      />

      <Reveal>
        <DataTable
          headers={[
            t("os.pos.col.number"),
            t("os.pos.col.vendor"),
            t("os.pos.col.amount"),
            t("os.pos.col.status"),
            t("os.pos.col.approval"),
            t("os.pos.col.project"),
          ]}
        >
          {filtered.map((po) => (
            <tr
              key={po.id}
              className="border-b border-border last:border-b-0 transition-colors duration-fast ease-enter hover:bg-surface-muted/60"
            >
              <td className="px-table-x py-3 type-body font-medium text-foreground">{po.id}</td>
              <td className="px-table-x py-3 type-body text-foreground">{po.vendor}</td>
              <td className="px-table-x py-3 type-body text-foreground" data-numeric="true">
                {formatSar(po.amountSar)}
              </td>
              <td className="px-table-x py-3">
                <StatusBadge label={po.status} tone={scheduleTone(po.status)} />
              </td>
              <td className="px-table-x py-3 type-body text-muted-foreground">{po.approval}</td>
              <td className="px-table-x py-3 type-body text-muted-foreground">
                {getProjectName(po.projectId)}
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
