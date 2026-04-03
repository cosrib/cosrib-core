"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { 
    buildCampaignPackage,
    upsertCampaign,
    type Campaign,
    type CampaignTone,
}   from "@/lib/scribeLocalStorage";

const textareaClass = 
  "w-full min-h-[220px] px-4 px-2.5 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-y";

const ste