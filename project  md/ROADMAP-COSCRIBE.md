# Coscribe / Scribe – Roadmap & was wir bauen

*Zentrale Produkt-Roadmap. Technischer Feinschlamm: **`PROJECT-STATUS.md`**. Kontext & Abgrenzung: **`PRODUKT-ENTSCHEIDUNGEN.md`**.*

**Hinweis:** Liegt auch im Hauptprojekt unter `Documents\Ordnung app\FreelancerOS\project  md\`, wenn dort synchronisiert.

---

## Produktthese (Stand)

**Coscribe** hilft Freelancern, **schneller** von „ich brauch Aufträge“ zu einem **fertigen Outreach-Paket** (Erstmail + Follow-ups + Checkliste) – mit **geführtem Ablauf**, **gespeichertem Kontext** und **klarem Ergebnis**, nicht mit leerem Chat und Prompt-Stress.

- **Preis-Idee:** ca. **20 €/Monat** (Hypothese; validieren mit Nutzern).
- **Technik:** **kein eigenes LLM** – Nutzer können **API wählen und eigenen Key eintragen (BYOK)**; wir liefern **Workflow, UI, Speicher, Ergebnisformat**.
- **Zielgruppe:** Freelancer, Fokus **mehr Sales** durch **weniger Reibung** bei Akquise/Follow-up (kein Garantie-Versprechen wie „20 neue Kunden“).

---

## Positionierung: 5 Säulen (besser/anders als generischer Chat / Claude)

**Kurz:** Wir bündeln **Struktur + Ergebnis + Speicher + Preislogik + Rhythmus** – nicht dasselbe Chat-Erlebnis nachbauen. **„24/7“** verkaufen wir als **App + Erinnerungen + Verfügbarkeit**, nicht als endlos laufenden Agenten.

### 1. Ein fester Job, kein offener Chat

- **Anders:** Start = **„Neue Kampagne“** → max. **X Fragen** → **Lieferpaket** (Erstmail + Follow-ups + Checkliste).
- **Besser:** Nutzer müssen **kein** Prompt-Profi sein.
- **24/7:** Eure App ist **erreichbar**; der Ablauf ist **jederzeit wiederholbar**.

### 2. Artefakt in der Mitte, Chat nur rechts

- **Anders:** **Ergebnis** steht **zentral** (kopierbar, strukturiert), Chat ist **Werkzeug** – nicht Vollbild wie im Chat-Produkt.
- **Besser:** Klarer **„fertig“**-Moment statt endlosem Thread.
- **24/7:** Gespeicherte **Kampagnen / Entwürfe** immer abrufbar.

### 3. BYOK + klarer App-Preis

- **Anders:** Nutzer zahlt **Anbieter** (Claude/OpenAI/…) **selbst** + **kleinen** Betrag für **eure** Software – nicht „noch ein großes KI-Abo“.
- **Besser:** **Kostenkontrolle** und **Transparenz** („wofür zahle ich was?“).
- **24/7:** **Kein** Abhängigkeitskonflikt mit **einem** Modell-Anbieter für **alles**.

### 4. Freelancer-Defaults & Wiederholung

- **Anders:** **Ton, Tabus, Angebot, Presets** bleiben **gespeichert** – nicht jedes Mal neu erklären.
- **Besser:** **Schneller** bei der **nächsten** Kampagne als ein **leerer** Claude-Tab.
- **24/7:** Daten liegen **in eurer App**, nicht nur im **Chat-Verlauf** woanders.

### 5. Geplante Automation (Erinnerung / nächster Schritt)

- **Anders:** **„Follow-up in 3 Tagen“** als **Plan + Erinnerung** (E-Mail an euch, Push, Discord, Kalenderexport) – **Produkt** für **Rhythmus**, nicht nur Text.
- **Besser:** Weniger **„vergessen nachzufassen“** – ein **konkreter** Sales-Hebel.
- **24/7:** **Scheduler / Jobs** laufen **serverseitig** – **nicht** „LLM 24h am Stück“, sondern **Zuverlässigkeit** der **Kette**.

---

## Ideen-Backlog (Gemini / spätere Phasen)

*Konkrete Produkt-Ideen, die zur Positionierung passen; viele brauchen **E-Mail-Anbindung** oder **Inbox-Logik** – nicht alles v1.*

| Idee | Kurz | v1 möglich? |
|------|------|-------------|
| **„Set & Forget“** | Angebot erkannt (KI/Markierung) → Frage: „In 3 Tagen nachhaken, wenn keine Antwort?“ → ein Klick, System plant Erinnerung. Claude/Cowork ist dafür oft zu umständlich einzurichten. | Teilweise: **manuelle** Kampagne + Datum ohne Postfach-Magie. |
| **Kontext-sensitive Follow-ups** | Follow-up bezieht sich auf **ursprüngliches Angebot** (Name, Projekt-Thema aus Kontext) statt Standardfloskeln – weniger Tippen. | Ja, wenn Kontext **in der App** liegt. |
| **„Anti-Spam“ / Kette stoppen** | Wenn **Kunde geantwortet** hat → Follow-up-Kette **automatisch** stoppen (nicht peinlich nach „Ja“ nachhaken). | Erst **manuell** „erledigt“; später mit **E-Mail-/Webhook-Integration**. |
| **Freelancer-Pipeline (2 Spalten)** | Dashboard nur: **„Warten auf Antwort“** | **„Action erforderlich“** – Rest ausblenden; Gegenteil „E-Mail-Hölle“. | Als **Ansicht** / Mini-Übersicht roadmap-tauglich (kein volles CRM). |

---

## Layout v1 (beschlossen): **A – drei Zonen**

| Zone | Rolle |
|------|--------|
| **Links** | Sidebar: Navigation, später **Kampagnen / Kontext**, „was passiert hier“. |
| **Mitte** | **Artefakt / Kampagne:** fertiges **Paket** (Mails, Follow-ups, Checkliste) – **Wert zentral**, nicht im Chat versteckt. |
| **Rechts** | **Chat** mit Agent: Rückfragen, Feinschliff – **nicht** Vollbild wie generischer ChatGPT. |

**Kompass beim Coden:** Wenn es sich wie „nur ein weiterer Chat-Tab“ anfühlt → Mitte stärken, Start = „Neue Kampagne“, nicht leeres Chat-Fenster.

---

## v1 – Haupt-Use-Case (ein Job)

**Kaltakquise inkl. Follow-up-Kette** für Freelancer-Dienstleistungen:

- Nach einem Durchlauf: **Erstmail + nummerierte Follow-ups + kurzer Zeitplan + Checkliste vor dem Senden** (kopierbar / exportierbar).
- **Max. 5–8 Rückfragen**, dann **Lieferphase** – kein endloser Dialog.

---

## CRM

- **Nicht v1:** volles CRM (Pipeline, Deals, schwere Automation).
- **Erlaubt / später oder mini:** **Kampagnen-Übersicht** oder **sehr einfache Liste** (wer, Status Entwurf/gesendet) – klein halten.

---

## „24/7“ – was gemeint ist

| Bedeutung | Umsetzung |
|-----------|-----------|
| **App immer erreichbar** | Hosting (z. B. Vercel) – **Muss** für SaaS. |
| **Geplante Automatik** | Cron / Queue / Erinnerungen (z. B. Follow-up in X Tagen) – **nicht** „LLM denkt 24 Stunden endlos“. |
| **Endloser KI-Agent ohne Pause** | **Kein** realistisches v1-Ziel (Kosten, Nutzen). |

---

## Phasen (Checklisten)

### Phase A – Produktkern

- [ ] Fester Chat-Flow: max. **5–8 Fragen** → **Lieferung**.
- [ ] Endprodukt immer gleich strukturiert (Mails, Follow-ups, optional Abstände, Checkliste).
- [ ] Speicher: Ton, Tabus, Angebot (nicht bei jeder Kampagne bei Null).
- [ ] KI per API anbinden; strukturierter Output.

### Phase B – Oberfläche

- [x] **Layout A** (links / mitte / rechts) im Dashboard für **Kalt-Email** umgesetzt (`CampaignWorkspace` + Platzhalter Agent; Sidebar bleibt links).
- [ ] Ein Chat ≈ eine **Kampagne**.
- [ ] Liste „Kampagnen / letzte Chats“; Einstellungen (Ton, Tabus, …).
- [ ] Einstieg: **„Neue Kampagne“** mit klarem Start.

### Phase C – Mehr als „nur KI“

- [ ] **2–3 Presets** (Branche/Ton).
- [ ] **Export** / kopierbares Paket (Markdown o. Ä.).
- [ ] Kommunikation: **unterstützt durch [Modell]** – keine „eigene KI“-Story.

### Phase D – danach

- [ ] Auth + serverseitiger Speicher durchgängig.
- [ ] **Eine** Integration: Sheet **oder** CSV.
- [ ] E-Mail-Versand, MCP, Canva, Dateien: **Roadmap**, nicht v1.
- [ ] **Set & Forget** / geplante Nachhake-Erinnerungen (serverseitig), sobald Kampagne + Datum sauber modelliert sind.
- [ ] **Anti-Spam:** Kette stoppen bei Antwort (zuerst manuell, später mit Postfach/Integration) – siehe **Ideen-Backlog**.
- [ ] **Pipeline-Ansicht** „Warten auf Antwort“ / „Action erforderlich“ (schlanke 2-Spalten-Übersicht).

---

## Bewusst nicht zuerst

- Volles CRM in der App.
- Viele Agent-Typen parallel.
- „Agent läuft endlos“ ohne Deliverable.
- Mit Cowork **Feature für Feature** vergleichen – wir verkaufen **einen eingebauten Freelancer-Workflow**.

---

## Verknüpfung

| Datei | Inhalt |
|--------|--------|
| `PRODUKT-ENTSCHEIDUNGEN.md` | Abgrenzung zu Cowork, Differenzierungs-Hebel, Notizen |
| `PROJECT-STATUS.md` | Technischer Stand im Code |
