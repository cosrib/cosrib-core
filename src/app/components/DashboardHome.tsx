"use client";

import { Card } from "./Card";
import { Input } from "./Input";
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
        onClick: () => onGoTo("outreach"),
      },
      {
        id: "followups",
        label: "Follow-ups",
        value: kpi.followUpsOffen,
        hint: "Offen",
        icon: Reply,
        onClick: () => onGoTo("followups"),
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
                  Überscicht
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                    Wichtigste Zahlen auf einen Blick. Die Werte werden verbunden, sobald
                    Kontakte und E-Mails in Scribe gespeichert sind.
                </p>
            </div>

            <section ario-labelledby="kpi-heading">
                <h2 id="kpi-heading" className="sr-only">
                    Kennzahlen
                </h2>
                <div className= "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={s.onClick}
                              className="text-left rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <div className="flex items-start justify-between gap.2"
                            </button>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}