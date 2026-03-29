import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return false;
  if (url.includes("deine-url") || url.includes("placeholder.supabase.co")) return false;
  if (key.includes("dein-key") || key.includes("placeholder")) return false;
  return true;
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Supabase ist nicht konfiguriert (.env.local mit NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const name =
    typeof body === "object" && body && "name" in body
      ? String((body as { name: unknown }).name)
      : "";
  const email =
    typeof body === "object" && body && "email" in body
      ? String((body as { email: unknown }).email)
      : "";

  const nameTrim = name.trim();
  const emailTrim = email.trim().toLowerCase();
  if (!nameTrim || nameTrim.length > 200) {
    return NextResponse.json(
      { ok: false, message: "Bitte einen gültigen Namen angeben." },
      { status: 400 }
    );
  }
  if (!emailTrim || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E-Mail angeben." },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, key);

  const { error } = await supabase.from("waitlist").insert({ name: nameTrim, email: emailTrim });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, message: "Diese E-Mail steht bereits auf der Warteliste." },
        { status: 409 }
      );
    }
    console.error("waitlist insert", error);
    return NextResponse.json(
      { ok: false, message: "Speichern fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
