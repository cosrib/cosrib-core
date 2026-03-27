"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "../Card";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  fetchLeads,
  createLead,
  updateLeadStage,
  deleteLead,
  type ScribeLead,
  type LeadPipelineStage,
} from "@/lib/scribeLeadsApi";

const COLUMNS: { stage: LeadPipelineStage; title: string; hint: string }[] = [
  { stage: "found", title: "Gefunden", hint: "Neu oder noch nicht angeschrieben" },
  { stage: "contacted", title: "Kontaktiert", hint: "Outreach gesendet" },
  { stage: "replied", title: "Antwort erhalten", hint: "Lead hat geantwortet" },
];

export function CrmBoardSection() {
  const [leads, setLeads] = useState<ScribeLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [pain, setPain] = useState("");
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    setError(null);
    setLoading(true);
    const { data, error: err } = await fetchLeads();
    setLoading(false);
    if (err) {
      setError(err.message);
      setLeads([]);
      return;
    }
    setLeads(data ?? []);
  }, []);

  useEffect(() => {
    queueMicrotask(() => void reload());
  }, [reload]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);
    const { error: err } = await createLead({
      name,
      email,
      company,
      website_url: website,
      lead_pain_point: pain,
    });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setName("");
    setEmail("");
    setCompany("");
    setWebsite("");
    setPain("");
    void reload();
  }

  async function moveTo(lead: ScribeLead, stage: LeadPipelineStage) {
    setError(null);
    const { error: err } = await updateLeadStage(lead.id, stage);
    if (err) {
      setError(err.message);
      return;
    }
    void reload();
  }

  async function handleDelete(id: string) {
    setError(null);
    const { error: err } = await deleteLead(id);
    if (err) {
      setError(err.message);
      return;
    }
    void reload();
  }

  const byStage = (stage: LeadPipelineStage) =>
    leads.filter((l) => l.pipeline_stage === stage);

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">CRM / Pipeline</h1>
        <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
          Einfaches Board – Leads in Supabase (
          <code className="text-xs bg-secondary px-1 rounded">scribe_leads</code>). Zuerst SQL aus{" "}
          <code className="text-xs bg-secondary px-1 rounded">supabase/mvp-schema.sql</code>{" "}
          ausführen.
        </p>
      </div>

      {error && (
        <p
          className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3"
          role="alert"
        >
          {error}
        </p>
      )}

      <Card>
        <h2 className="font-semibold mb-4">Neuer Lead</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input label="Firma" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Input
            label="Website"
            type="url"
            placeholder="https://…"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Pain Point / Notiz</label>
            <textarea
              className="mt-1.5 w-full min-h-[80px] px-4 py-2.5 bg-input-background border border-border rounded-lg text-sm"
              value={pain}
              onChange={(e) => setPain(e.target.value)}
              placeholder="z. B. langsame Seite, fehlendes Impressum …"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Speichern…" : "Lead anlegen"}
            </Button>
          </div>
        </form>
      </Card>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lädt Leads…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {COLUMNS.map((col) => (
            <div key={col.stage} className="flex flex-col min-h-[200px]">
              <div className="mb-3">
                <h3 className="font-semibold text-foreground">{col.title}</h3>
                <p className="text-xs text-muted-foreground">{col.hint}</p>
                <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                  {byStage(col.stage).length} Lead(s)
                </p>
              </div>
              <div className="space-y-2 flex-1">
                {byStage(col.stage).map((lead) => (
                  <Card key={lead.id} padding="sm" className="border-border/80">
                    <p className="font-medium text-foreground text-sm">{lead.name}</p>
                    {lead.email && (
                      <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                    )}
                    {lead.company && (
                      <p className="text-xs text-muted-foreground">{lead.company}</p>
                    )}
                    {lead.lead_pain_point && (
                      <p className="text-xs text-foreground/80 mt-2 line-clamp-3">{lead.lead_pain_point}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {COLUMNS.filter((c) => c.stage !== lead.pipeline_stage).map((c) => (
                        <Button
                          key={c.stage}
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                          onClick={() => void moveTo(lead, c.stage)}
                        >
                          → {c.title}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-destructive"
                        onClick={() => void handleDelete(lead.id)}
                      >
                        Löschen
                      </Button>
                    </div>
                  </Card>
                ))}
                {byStage(col.stage).length === 0 && (
                  <p className="text-xs text-muted-foreground border border-dashed border-border rounded-lg p-4 text-center">
                    Keine Leads
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
