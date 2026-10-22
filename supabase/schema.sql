create table if not exists public.leads (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  company text not null default '',
  service text not null default '',
  budget text not null default '',
  timeline text not null default '',
  message text not null check (char_length(message) between 10 and 5000),
  delivery_status text not null default 'pending'
    check (delivery_status in ('pending', 'sent', 'failed'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
