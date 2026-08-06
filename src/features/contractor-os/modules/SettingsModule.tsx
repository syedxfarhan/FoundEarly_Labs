"use client";

import * as React from "react";

import { t, type ContentKey } from "@/lib/content";
import { Reveal, primaryButtonClassName, secondaryButtonClassName } from "@/features/contractor-os/ui";
import { cn } from "@/utils/cn";

const SECTIONS = [
  "branding",
  "notifications",
  "language",
  "theme",
  "roles",
  "permissions",
] as const;

type SettingsSection = (typeof SECTIONS)[number];

const NAV_KEYS: Record<SettingsSection, ContentKey> = {
  branding: "os.settings.nav.branding",
  notifications: "os.settings.nav.notifications",
  language: "os.settings.nav.language",
  theme: "os.settings.nav.theme",
  roles: "os.settings.nav.roles",
  permissions: "os.settings.nav.permissions",
};

const SUPPORT_KEYS: Record<SettingsSection, ContentKey> = {
  branding: "os.settings.branding.support",
  notifications: "os.settings.notifications.support",
  language: "os.settings.language.support",
  theme: "os.settings.theme.support",
  roles: "os.settings.roles.support",
  permissions: "os.settings.permissions.support",
};

export function SettingsModule() {
  const [active, setActive] = React.useState<SettingsSection>("branding");
  const [saved, setSaved] = React.useState(false);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="flex flex-col gap-6" data-os-module="settings">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.settings.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.settings.support")}</p>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <nav className="rounded-lg border border-border bg-surface p-2" aria-label={t("os.settings.nav")}>
            <ul className="space-y-1">
              {SECTIONS.map((section) => (
                <li key={section}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(section);
                      setSaved(false);
                    }}
                    className={cn(
                      "flex w-full min-h-touch items-center rounded-md px-3 type-body",
                      active === section
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-foreground hover:bg-surface-muted",
                    )}
                    aria-current={active === section ? "page" : undefined}
                  >
                    {t(NAV_KEYS[section])}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal className="lg:col-span-9" delay={0.03}>
          <form
            onSubmit={handleSave}
            className="rounded-lg border border-border bg-surface p-5 md:p-6"
          >
            <h3 className="type-h3 text-foreground">{t(NAV_KEYS[active])}</h3>
            <p className="mt-2 type-body text-muted-foreground">{t(SUPPORT_KEYS[active])}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {active === "branding" ? (
                <>
                  <Field
                    label={t("os.settings.branding.company")}
                    defaultValue="Al-Buraq Horizon Contracting Co."
                  />
                  <Field label={t("os.settings.branding.short")} defaultValue="Al-Buraq Horizon" />
                  <Field label={t("os.settings.branding.mark")} defaultValue="AH" />
                  <Field label={t("os.settings.branding.accent")} defaultValue="Brand primary" />
                </>
              ) : null}

              {active === "notifications" ? (
                <>
                  <Toggle label={t("os.settings.notifications.approvals")} defaultChecked />
                  <Toggle label={t("os.settings.notifications.rfis")} defaultChecked />
                  <Toggle label={t("os.settings.notifications.maintenance")} defaultChecked />
                  <Toggle label={t("os.settings.notifications.weekly")} />
                </>
              ) : null}

              {active === "language" ? (
                <>
                  <Select
                    label={t("os.settings.language.ui")}
                    options={["English", "Arabic (preview)"]}
                  />
                  <Select
                    label={t("os.settings.language.dates")}
                    options={["DD MMM YYYY", "YYYY-MM-DD"]}
                  />
                </>
              ) : null}

              {active === "theme" ? (
                <>
                  <Select
                    label={t("os.settings.theme.mode")}
                    options={["System", "Light", "Dark"]}
                  />
                  <Select
                    label={t("os.settings.theme.density")}
                    options={["Comfortable", "Compact"]}
                  />
                </>
              ) : null}

              {active === "roles" ? (
                <>
                  <RoleRow role="Project Director" access="Full portfolio" />
                  <RoleRow role="Project Manager" access="Assigned projects" />
                  <RoleRow role="Procurement Lead" access="POs and vendors" />
                  <RoleRow role="Document Controller" access="Registers and drawings" />
                </>
              ) : null}

              {active === "permissions" ? (
                <>
                  <Toggle label={t("os.settings.permissions.export")} defaultChecked />
                  <Toggle label={t("os.settings.permissions.approvePo")} defaultChecked />
                  <Toggle label={t("os.settings.permissions.editDocs")} />
                  <Toggle label={t("os.settings.permissions.manageUsers")} />
                </>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="submit" className={primaryButtonClassName()}>
                {t("os.settings.save")}
              </button>
              <button
                type="button"
                className={secondaryButtonClassName()}
                onClick={() => setSaved(false)}
              >
                {t("os.settings.reset")}
              </button>
              {saved ? (
                <p className="type-body text-semantic-success" role="status">
                  {t("os.settings.saved")}
                </p>
              ) : (
                <p className="type-body-sm text-muted-foreground">{t("os.settings.note")}</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block space-y-2 sm:col-span-1">
      <span className="type-label text-muted-foreground">{label}</span>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 type-body text-foreground"
      />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block space-y-2 sm:col-span-1">
      <span className="type-label text-muted-foreground">{label}</span>
      <select className="w-full rounded-md border border-border bg-background px-3 py-2.5 type-body text-foreground">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-touch items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 sm:col-span-1">
      <span className="type-body text-foreground">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 rounded-sm border-border text-brand"
      />
    </label>
  );
}

function RoleRow({ role, access }: { role: string; access: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 sm:col-span-2">
      <div>
        <p className="type-body font-medium text-foreground">{role}</p>
        <p className="type-body-sm text-muted-foreground">{access}</p>
      </div>
      <span className="type-label text-muted-foreground">{t("os.settings.roles.illustrative")}</span>
    </div>
  );
}
