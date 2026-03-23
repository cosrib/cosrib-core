"use client";

import { Card } from "./Card";
import { Button } from "./Button";
import { 
    Users,
    Mail,
    Reply,
    UserCheck,
    ArrowRight,
    Inbox,
}   from "lucide-react";

type Props = {
    onGoTo: (id: string) => void;
};

/**Platzhalter-später aus Supabase laden */
export const DASHBOARD_STATS_PLACEHOLDER = {
    kontakte: 0,
    outreachDieseWoche: 0,
    followUpsOffen: 0,
    kundenAusEmail: 0,
}   as const;

export function DashboardHome({ onGoTo }: Props) {
    const kpi = DASHBOARD_STATS_PLACEHOLDER;

    const stats = [
      {
        id: "kontakte",
        label: "Kontakte",
        value: kpi.kontakte,
        hint: "In deiner Liste",
        icon: Users,
        onClick: () => onGoTo("kontakte"),
      },
      {
        id: "outreach",
        label: "Outreach",
        value: kpi.outreachDieseWoche,
        hint: "Diese Woche",
        icon: Mail,
        onClick: () => onGoTo("kalt-email"),
      },
      {
        id: "followups",
        label: "Follow-ups",
        value: kpi.followUpsOffen,
        hint: "Offen",
        icon: Reply,
        onClick: () => onGoTo("follow-up"),
      },
      {
        id: "kunden",
        label: "Kunden",
        value: kpi.kundenAusEmail,
        hint: "Als Kunde gewonnen",
        icon: UserCheck,
        onClick: () => onGoTo("kontakte"),
      },
    ] as const;

    return (
        <div className="space-y-10 max-w-6xl mx-auto">
            <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-1">
                  Übersicht
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                    Wichtigste Zahlen auf einen Blick. Die Werte werden verbunden, sobald
                    Kontakte und E-Mails in Scribe gespeichert sind.
                </p>
            </div>

            <section aria-labelledby="kpi-heading">
                <h2 id="kpi-heading" className="sr-only">
                    Kennzahlen
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={s.onClick}
                              className="text-left rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    {s.label}
                                  </span>
                                  <span className="rounded-lg bg-accent p-2 text-accent-foreground shrink-0">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                                  </span>
                                </div>
                                <p className="text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-foreground">
                                  {s.value}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.hint}</p>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section aria-labelledby="quick-heading">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 id="quick-heading" className="text-lg font-semibold">
                  Schnellaktionen
                </h2>
              </div>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <Card
                  className="cursor-pointer transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
                  onClick={() => onGoTo("kalt-email")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onGoTo("kalt-email");
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Mail className="w-8 h-8 text-primary shrink-0" aria-hidden />
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" aria-hidden />
                  </div>
                  <h3 className="mt-3 mb-2 font-semibold">Neue Kalt-Email</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Outreach-E-Mail für potenzielle Kunden.
                  </p>
                </Card>

                <Card
                  className="cursor-pointer transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
                  onClick={() => onGoTo("follow-up")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onGoTo("follow-up");
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Reply className="w-8 h-8 text-primary shrink-0" aria-hidden />
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" aria-hidden />
                  </div>
                  <h3 className="mt-3 mb-2 font-semibold">Follow-up schreiben</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nachfass-E-Mail nach vorherigem Kontakt.
                  </p>
                </Card>
              </div>
            </section>

            <section aria-labelledby="recent-heading">
              <h2 id="recent-heading" className="text-lg font-semibold mb-2">
                Letzte Aktivitäten
              </h2>
              <Card className="border-dashed bg-secondary/20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                  <div className="rounded-lg bg-card p-3 border border-border shrink-0 self-start">
                    <Inbox className="w-6 h-6 text-muted-foreground" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">Noch keine Einträge</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Sobald du E-Mails und Kontakte speicherst, werden hier Aktivitäten angezeigt.
                    </p>
                  </div>
                  <Button type="button" variant="secondary" className="shrink-0 w-full sm:w-auto" onClick={() => onGoTo("verlauf")}>
                    Zum Verlauf
                  </Button>
                </div>
              </Card>
            </section>
        </div>
    );
}