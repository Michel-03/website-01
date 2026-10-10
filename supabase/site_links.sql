create table if not exists public.site_links (
  id bigint generated always as identity primary key,
  label text not null,
  href text not null,
  group_name text not null default 'Company',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.site_links enable row level security;
