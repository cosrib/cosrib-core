--Supabase: SQL Editor  -> New query -> ausführen
--Danach funktioniert Post /api/waitlist (Landing "Wartelist").--


create table if not exists waitlist (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    created_at timestamptz not null default now()
);

create unique index if not exists waitlist_email_lower on public.waitlist (lower(trim( email)));

alter table public.waitlist enable row level security;

drop policy if exists "waitlist_insert_anon" on public.waitlist;
create policy "waitlist_insert_anon"
   on public.waitlist 
   for insert
   to anon 
   with check (true);

   --Kein öffentliches Select (Daten nur im Dashboard/Admin),