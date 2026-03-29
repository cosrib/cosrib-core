"use client";

import { Card } from "../Card";

/** Platzhalter fuer spaetere OAuth / Google / MCP. App-Id: "verbindungen". */
export function VerbindungenSection() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Verbindungen
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Hier kommen kuenftig Konto-Verknuepfungen (z. B. Google) – noch ohne OAuth-Flow.
        </p>
      </div>
      <Card className="p-6 border-border/80">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Keine Verbindungen aktiv. Secrets nur serverseitig / ueber env halten.
        </p>
      </Card>
    </div>
  );
}
