/**
 * CRM-Leads über Supabase (Tabelle public.scribe_leads).
 * SQL: supabase/mvp-schema.sql im Supabase SQL Editor ausführen.
 */

import { supabase } from "@/lib/supabase";

export type LeadPipelineStage = "found" | "contacted" | "replied";

export type ScribeLead = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  company: string | null;
  website_url: string | null;
  source_type: string | null;
  source_url: string | null;
  source_content: string | null;
  lead_pain_point: string | null;
  generated_message: string | null;
  pipeline_stage: LeadPipelineStage;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchLeads(): Promise<{ data: ScribeLead[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("scribe_leads")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) return { data: null, error: new Error(error.message) };
    return { data: data as ScribeLead[], error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e : new Error("Leads konnten nicht geladen werden."),
    };
  }
}

export async function createLead(input: {
  name: string;
  email?: string;
  company?: string;
  website_url?: string;
  lead_pain_point?: string;
}): Promise<{ data: ScribeLead | null; error: Error | null }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error("Nicht angemeldet.") };

    const { data, error } = await supabase
      .from("scribe_leads")
      .insert({
        user_id: user.id,
        name: input.name.trim() || "Ohne Namen",
        email: input.email?.trim() || null,
        company: input.company?.trim() || null,
        website_url: input.website_url?.trim() || null,
        lead_pain_point: input.lead_pain_point?.trim() || null,
        pipeline_stage: "found",
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data: data as ScribeLead, error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e : new Error("Lead konnte nicht angelegt werden."),
    };
  }
}

export async function updateLeadStage(
  id: string,
  pipeline_stage: LeadPipelineStage
): Promise<{ error: Error | null }> {
  try {
    const patch: Record<string, unknown> = {
      pipeline_stage,
      updated_at: new Date().toISOString(),
    };
    if (pipeline_stage === "replied") {
      patch.replied_at = new Date().toISOString();
    }

    const { error } = await supabase.from("scribe_leads").update(patch).eq("id", id);

    if (error) return { error: new Error(error.message) };
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e : new Error("Status konnte nicht gespeichert werden."),
    };
  }
}

export async function deleteLead(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.from("scribe_leads").delete().eq("id", id);
    if (error) return { error: new Error(error.message) };
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e : new Error("Lead konnte nicht gelöscht werden."),
    };
  }
}
