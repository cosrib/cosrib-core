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
        onClick: () => onGoTo("outreach")
      },
      {
        id: "followups",
        label: "Follow-ups",
        value: kpi.followUpsOffen,
      }
    ]
}