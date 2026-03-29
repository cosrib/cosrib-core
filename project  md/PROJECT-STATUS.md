# Scribe / FreelancerOS – Stand & offene Punkte

*Stand: Übersicht was fertig ist und was noch fehlt.*

---

## Übersichtstabelle

| Bereich | Status | Was fehlt / nächster Schritt |
|---------|--------|------------------------------|
| **Next.js App (`src/`)** | Fertig (Grundgerüst) | — |
| **UI-Kit (Button, Input, Card, Sidebar)** | Fertig | Fokus-Ringe, `Card` unterstützt Tastatur |
| **Landing + Dashboard (Layout)** | Fertig (UI/UX-Pass) | Sticky Header, Footer, Modal-UX, Auth-Look |
| **Warteliste (Formular)** | Fertig | `POST /api/waitlist` → Supabase-Tabelle `waitlist` (nach SQL         in`project  md/waitlist-supabase.sql`) |
| **Warteliste → Supabase** | Fertig (nach SQL) | Ohne echte `.env.local` + SQL: API antwortet 503 mit Hinweis |
| **Login /auth** | Fertig (Grundgerüst) | Funktioniert mit echten Keys in `.env.local` |
| **Supabase Client** | Fertig | Ohne echte URL/Key: Platzhalter (Build geht, Auth nicht echt) |
| **„Anmelden“ auf Landing** | Teilweise | Wechselt nur zur **Dashboard-Ansicht** in der App, **kein** Link zu `/auth` |
| **„Abmelden“ im Dashboard** | Nur UI | Ruft **kein** `supabase.auth.signOut()` auf |
| **E-Mail in Sidebar** | Platzhalter | Fest `freelancer@example.de` – echte User-Mail aus Session |
| **Dashboard: Home** | Fertig (lokal) | KPIs + „Letzte Aktivitäten“ aus **localStorage** (`scribeLocalStorage`) |
| **Dashboard: Profil, Schreibstil, Kontakte** | UI + Speichern (lokal) | Komponenten in `src/app/components/sections/` |
| **Kalt-Email / Follow-up / Antwort / Verlauf** | UI + Entwürfe (lokal) | Kein KI-Text; Verlauf = gespeicherte Entwürfe |
| **API-Routen (`/api/...`)** | Keine | — |
| **KI/LLM für E-Mail-Text** | Nicht angebunden | Kein OpenAI o.ä. |
| **Vanilla-Version (`HTML/`, `CSS/`)** | Alt / parallel | Nicht mit Next synchronisiert |
| **Deployment (Vercel o.ä.)** | Offen | Lokal + GitHub, kein Produktions-Host im Dokument |

---

## Empfohlene Reihenfolge (wenn wir „endlich coden“)

1. **`.env.local`** mit echten `NEXT_PUBLIC_SUPABASE_*` Werten (Supabase Dashboard).
2. **Warteliste:** SQL-Tabelle + Insert aus LandingPage.
3. **Landing:** „Anmelden“ → Link zu **`/auth`** (oder eingeloggt → Dashboard).
4. **Dashboard:** echte Session + Abmelden + E-Mail aus User.
5. ~~**Erstes Tool**~~ – Kalt-Email & Co. haben UI + **localStorage**; nächster Schritt: **Supabase-Tabellen** + Sync.
6. Optional: **KI** später.

---

## Dateien als Referenz

| Thema | Wo |
|-------|-----|
| Startseite | `src/app/page.tsx` → `ScribeApp` |
| Warteliste | `src/app/components/LandingPage.tsx` |
| Dashboard | `src/app/components/Dashboard.tsx`, `DashboardSectionContent.tsx` |
| Lokale Daten (Entwürfe, Kontakte, Profil) | `src/lib/scribeLocalStorage.ts` |
| Bereichs-UI | `src/app/components/sections/*.tsx` |
| Auth | `src/app/auth/page.tsx` |
| Supabase | `src/lib/supabase.ts`, `.env.local` |
