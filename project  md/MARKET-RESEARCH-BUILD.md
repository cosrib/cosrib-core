# Market Research „bauen“ – einfacher Plan + Gemini

*Ziel: **Klarheit für Coscribe**, nicht McKinsey. **Gemini** hilft beim **Texte sortieren**, **nicht** statt echter Gespräche.*

---

## Was „bauen“ heißt (3 Teile)

| Teil | Was | Braucht ihr |
|------|-----|-------------|
| **A. Prozess** | 5 × 15 Min Interviews + Notizen | Kalender, Leitfaden (unten) |
| **B. Gemini (manuell)** | Notizen einfügen → **Themen, Zitate, Risiken** ziehen | API/AI Studio, **kein** Web-Spider nötig |
| **C. Optional später** | n8n: Text → Gemini → Discord/Datei | n8n + Gemini HTTP + Credentials |

**Ohne A** (echte Leute) ist B+C nur **schöne Worte** – deshalb zuerst **Gespräche**.

---

## A. Interviews (High-ROI, wie besprochen)

**Einladung (Copy-Paste):**

> Hey, wir bauen ein Tool für Freelancer-Akquise (Texte + Follow-ups) und wollen nicht ins Leere bauen. Hättest du **15 Min** (Video/Telefon)? Kein Verkauf, nur Fragen. Wann passt grob?

**5 Fragen:**

1. Wie sieht deine Akquise **diese Woche** konkret aus?  
2. Was kostet dich am meisten Zeit/Nerven – **ein** Ding?  
3. Nutzt du ChatGPT/Cowork/sonstwas – **was** nervt?  
4. Stell dir: ein Satz → Rückfragen → Erstmail + Follow-ups + Checkliste. **~20 €/Monat** – **ja/nein** und **warum**?  
5. Was darf so ein Tool **nicht** tun?

**Pro Gespräch:** 5 Stichpunkte + **ein Zitat** (roh in Notepad/Docs).

---

## B. Gemini – wofür es **Sinn** hat

| Aufgabe | Prompt-Idee (anpassen) |
|---------|-------------------------|
| **Nach einem Interview** | „Hier sind Ro-Notizen: … Fasse in 5 Bulletpoints: Schmerz, Tools, Zahlungsbereitschaft, Sorge, bestes Zitat.“ |
| **Nach allen 5** | „Hier sind 5 Zusammenfassungen: … Extrahiere: 3 gemeinsame Schmerzen, 2 Einwände gegen 20 €, 1 Satz Produktversprechen-Vorschlag.“ |
| **Konkurrenz (Text von euch)** | Ihr **kopiert** öffentliche Texte von 3 Landingpages **in den Prompt** – „Vergleiche neutral, keine Halluzinationen über Preise die nicht im Text stehen.“ |

**Wichtig:** Gemini **ersetzt nicht** Recherche im Web – ihr gebt **Text ein**, den ihr habt (Notizen, Copy-Paste von Seiten).

---

## C. Optional: n8n (später)

1. **Manuell** oder **Formular** → Text in **Google Doc** / **Datei** / **Webhook**  
2. **HTTP Request** → Gemini `generateContent`  
3. Ausgabe → **Discord** oder **Markdown-Datei**

Details erst sinnvoll, wenn **A** läuft und ihr **echte Notizen** habt.

---

## API-Key

- Gemini-Key in **AI Studio** / Google Cloud – **nie** in Git, **nur** in n8n Credentials oder `.env` (nicht committen).

---

## Ergebnis „fertig“

- **1 Seite:** größter Schmerz | Zahlungsbereitschaft (Tendenz) | 1 klare Produkt-These für v1  

*Erste Version: gemeinsame Absprache (Gemini = Hilfe beim Sortieren, nicht Ersatz für Interviews).*
