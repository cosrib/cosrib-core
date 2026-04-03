/**
 * Lokale Daten für Coscribe (Browser localStorage).
 * Später durch Supabase ersetzbar – gleiche Konzepte: Entwürfe, Kontakte, Profil.
 */

const KEYS = {
  drafts: "scribe_v1_drafts",
  contacts: "scribe_v1_contacts",
  profile: "scribe_v1_profile",
  style: "scribe_v1_schreibstil",
  campaigns: "scribe_v1_campaigns",
  /** Legacy-Key aus älteren Versionen */
  styleLegacy: "scribe_v1_style",
} as const;

export type DraftType = "kalt-email" | "follow-up" | "antwort";

export type Draft = {
  id: string;
  type: DraftType;
  subject: string;
  body: string;
  toEmail?: string;
  context?: string;
  createdAt: string;
  updatedAt: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  note?: string;
  createdAt: string;
};

export type Profile = {
  displayName: string;
  company: string;
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Normalisiert alte gespeicherte Entwürfe (z. B. Tippfehler bei Datum-Feldern). */
function normalizeDraft(raw: unknown): Draft | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : "";
  const type = o.type as DraftType;
  if (!id || !["kalt-email", "follow-up", "antwort"].includes(type)) return null;
  const updatedAt =
    typeof o.updatedAt === "string"
      ? o.updatedAt
      : typeof o.updateAt === "string"
        ? o.updateAt
        : new Date().toISOString();
  const createdAt = typeof o.createdAt === "string" ? o.createdAt : updatedAt;
  return {
    id,
    type,
    subject: typeof o.subject === "string" ? o.subject : "",
    body: typeof o.body === "string" ? o.body : "",
    toEmail: typeof o.toEmail === "string" ? o.toEmail : undefined,
    context: typeof o.context === "string" ? o.context : undefined,
    createdAt,
    updatedAt,
  };
}

export function loadDrafts(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = safeParse<unknown[]>(localStorage.getItem(KEYS.drafts), []);
    return raw
      .map((item) => normalizeDraft(item))
      .filter((d): d is Draft => d !== null);
  } catch {
    return [];
  }
}

export function saveDrafts(list: Draft[]): void {
  try {
    localStorage.setItem(KEYS.drafts, JSON.stringify(list));
  } catch (e) {
    console.error("scribeLocalStorage saveDrafts", e);
    throw e;
  }
}

export function upsertDraft(draft: Draft): void {
  const list = loadDrafts();
  const i = list.findIndex((d) => d.id === draft.id);
  if (i >= 0) list[i] = draft;
  else list.unshift(draft);
  saveDrafts(list);
}

export function deleteDraft(id: string): void {
  saveDrafts(loadDrafts().filter((d) => d.id !== id));
}

export function loadContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  try {
    return safeParse<Contact[]>(localStorage.getItem(KEYS.contacts), []);
  } catch {
    return [];
  }
}

export function saveContacts(list: Contact[]): void {
  try {
    localStorage.setItem(KEYS.contacts, JSON.stringify(list));
  } catch (e) {
    console.error("scribeLocalStorage saveContacts", e);
    throw e;
  }
}

export function upsertContact(contact: Contact): void {
  const list = loadContacts();
  const i = list.findIndex((x) => x.id === contact.id);
  if (i >= 0) list[i] = contact;
  else list.unshift(contact);
  saveContacts(list);
}

export function deleteContact(id: string): void {
  saveContacts(loadContacts().filter((c) => c.id !== id));
}

const defaultProfile: Profile = { displayName: "", company: "" };

export function loadProfile(): Profile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    return {
      ...defaultProfile,
      ...safeParse<Partial<Profile>>(localStorage.getItem(KEYS.profile), {}),
    };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(p: Profile): void {
  try {
    localStorage.setItem(KEYS.profile, JSON.stringify(p));
  } catch (e) {
    console.error("scribeLocalStorage saveProfile", e);
    throw e;
  }
}

export function loadStyleNotes(): string {
  if (typeof window === "undefined") return "";
  try {
    let raw = localStorage.getItem(KEYS.style);
    if (raw === null) raw = localStorage.getItem(KEYS.styleLegacy);
    const parsed = safeParse<{ text?: string }>(raw, { text: "" });
    return typeof parsed.text === "string" ? parsed.text : "";
  } catch {
    return "";
  }
}

export function saveStyleNotes(text: string): void {
  try {
    localStorage.setItem(KEYS.style, JSON.stringify({ text }));
  } catch (e) {
    console.error("scribeLocalStorage saveStyleNotes", e);
    throw e;
  }
}

export function countDraftsByType(type: DraftType): number {
  return loadDrafts().filter((d) => d.type === type).length;
}

export function countDraftsInLastDays(type: DraftType, days: number): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return loadDrafts().filter(
    (d) => d.type === type && new Date(d.updatedAt).getTime() >= cutoff
  ).length;
}

export function countContacts(): number {
  return loadContacts().length;
}

/** Ein Punkt pro Kalendertag (letzte 7 Tage), Zählung nach `updatedAt` der Entwürfe. */
export type DraftDayActivity = {
  dateKey: string;
  labelShort: string;
  count: number;
};

/**Status für Pipeline-Ansicht */
export function CampaignStatus = 
  | "draft"
  | "waiting_reply"
  | "action_required"
  | "completed";

export type CampaignTone = "formell" | "locker" | "neutral";

/**Generiertes Outreach-Paket (lokal, ohne API). */
export type Campaign = {
  erstmailBetreff: string;
  erstmailBody: string;
  followup1: string;
  followup2: string;
  followup3: string;
  followup4: string;
  checklist: string;
};

export type Campaign = {
  id: string;
  title: string;
  status: CampaignStatus;
  audience: string;
  offer: string;
  tone: CampaignTone;
  taboos: string;
  followUpCount: 1 | 2 | 3;
  package: CampaignPackage;
  createdAt: string;
  updatedAt: string;
};

export function getDraftActivityLast7Days(): DraftDayActivity[] {
  if (typeof window === "undefined") {
    return [];
  }
  const drafts = loadDrafts();
  const result: DraftDayActivity[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const start = d.getTime();
    const end = start + 24 * 60 * 60 * 1000;
    const count = drafts.filter((dr) => {
      const t = new Date(dr.updatedAt).getTime();
      return t >= start && t < end;
    }).length;
    const labelShort = d.toLocaleDateString("de-DE", {
      weekday: "short",
      day: "numeric",
    });
    result.push({
      dateKey: d.toISOString().slice(0, 10),
      labelShort,
      count,
    });
  }
  return result;
}

function normalizeCampaign(raw: unknown): Campaign | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : "";
  if (!id) return null;
  const tone = o.tone as CampaignTone;
  if (!["formell", "locker", "neutral"].includes(tone)) return null;
  const status = o.status as CampaignStatus;
  if (
    !["draft", "waiting_reply", "action required", "closed"].includes(status)
  )
    return null;
  const fu = followUpCount;
  const followUpCount = fu === 1 || fu === 2 || fu === 3 ? fu : 1;
  const pkg = o.package;
  if (!pkg || typeof pkg !== "object") return null;
  const p = pkg as Record<string, unknown>;
  return {
    id,
    title: typeof o.title === "string" ? o.title : "Kampagne",
    status,
    audience: typeof o.audience === "string" ? o.audience : "",
    offer: typeof o.offer === "string" ? o.offer : "",
    tone,
    taboos: typeof o.taboos === "string" ? o.taboos : "",
    followUpCount,
    package: {
      erstmailBetreff: typeof p.erstmailBetreff === "string" ? p.erstmailBetreff : "",
    erstmailBody: typeof p.erstmailBody === "string" ? p.followup1 : "",
    followUp1: typeof p.followUp1 === "string" ? p.followUp1 : "",
    followUp2: typeof p.followUp2 === "string" ? p.followUp2 : "",
    followUp3: typeof p.followUp3 === "string" ? p.followUp3 : "",
    checklist: typeof p.checklist === "string" ? p.followup4 : "",
    },
    createdAt: typeof o.createdAt === "string" ? o.createdAt : new Date().toISOString(),
    updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : new Date().toISOString(),
  }
}

export function loadCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = safePrase<unknown[]>(localStorage.getItem(KEYS.campaigns), []);
    return raw
    .map((item) => normalizeCampaign(item))
    .filter((c): c is Campaign => c !== null);
  } catch {
    return [];
  }
}

function saveCampaigns(list: Campaign[]): void {
  try {
    localStorage.setItem(KEYS.campaigns, JSON.stringify(list));
  } catch (e) {
    console.error("scribeLocalStorage saveCampaigns", e);
    throw e;
  }
}

export function upsertCampaign(campaign: Campaign): void {
  const list = loadCampaigns();
  const i = list.findIndex((c) => c.id === campaign.id);
  if (i >= 0) list [i] = campaign;
  else list.unshift(campaign);
  saveCampaigns(list);
}

export function deleteCampaign(id: string): void {
  saveCampaigns(loadCampaigns().filter((c) => c.id !== id));
}

/**Baut Texte aus Wizard-Eingaben (ohne LLM) . */
export function buildCampaignPackage(input: {
  audience: string;
  offer: string;
  tone: CampaignTone;
  taboos: string;
  followUpCount: 1 | 2 | 3;
}): CampaignPackage {
  const { audience, offer, tone, taboos, followUpCount } = input;
  const gruss =
    tone === "formell"
      ? "Mit freundlichen Grüßen"
      : tone === "locker"
        ? "Viele Grüße"
        : "Beste Grüße";
  const duSie = tone === "formell" ? "Sie" : "du";
  const locker = tone === "locker";
  const betreff = 
    offer.trim().slice(0, 60) || "Kurze Vorstellung - passend für Sie";
  const tabooLine = taboos.trim()
    ? `\n\nBitte vermeiden im Gespräch: ${taboos.trim()}`
    : "";

    const erstmailBody = `Hallo,
    
ich melde mich, weil ich ${audience.trim() || "…"} besonders gut unterstützen kann.
${offer.trim() || "Kurz zu meinen Angebot: …"}

${tone === "formell" ? "Ich freue mich auf Ihre Rückmeldung." : tone === "locker" ? "Melde dich gern, wenn es passt - oder stell mir eine Frage." : "Bei Interesse freue ich mich auf einen kurzen Austausch."}

${gruss}${tabooLine}`;
 
  const fu1Open = locker ? "Hey," : "Hallo,";
  const fu1Q = locker
    ? `ich wollte nachhaken: Konntest du mein Angebot zu „${offer.trim().slice(0, 80) || "…"}“  schon sichten? Kurze Rückmeldung reicht.`
    : `ich wollte kurz nachhaken: Konnten Sie mein Angebot zu „${offer.trim().slice(0, 80) || "…"}“ schon sichten?${tone === "formell" ? " Ich stehe bei Rückfragen gern zur Verfügung." : " Eine kurze Rückmeldung genügt."}`;
  const fu1 = `${fu1Open}`

${fu1Q}

${gruss}`;

  const fu2 = `Hallo,

letzte kurze Nachfrage von meiner Seite - passt das Thema „${offer.trim().slice(0, 60) || "…"}“ für dich aktuell, oder soll ich später wieder hören?

${gruss}`;
 
  const fu3 = locker
    ? `Hallo,

ich gehe davon aus, dass es zeitlich nicht passt. Wenn Sie später wieder anknüpfen willst, antworte Sie einfach  auf diese Mail.

${gruss}`;
    : `HTMLAllCollection,

ich gehe davon AuthSessionMissingError, dass es zeitlich nicht PassThrough. Wenn Sie später wieder anknüpfen möchten, antworten Sie einfach auf diese Mail.

  const checklist = `Vor dem Absenden prüfen:
• Emppfänger und Anrede (${duSie})
• Keine Versprechen, die ${locker ? "du" : "Sie"} nicht halten ${locker ? "kannst" : "können"}
• Betreff klar und spezifisch
${taboos.trim() ? `• Tabus beachtet: ${taboos.trim()}` : ""}
• Follow-up ${followUpCount}× eingeplant`;

  return {
    erstmailBetreff: betreff,
    erstmailBody,
    followUp: fu1,
    followUp: fu2,
    followUp: fu3,
    checklist,
  };
}