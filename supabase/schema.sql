-- Byte Analytics website schema. Safe to run more than once.

create table if not exists public.job (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  department text,
  location text,
  salary text,
  experience text,
  skills text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  job_id bigint references public.job(id) on delete set null,
  job_title text,
  job_slug text,
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text,
  current_role_name text,
  total_experience text,
  skills text,
  expected_salary text,
  cover_letter text,
  resume_url text,
  stage text not null default 'applied',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_form (
  id bigint generated always as identity primary key,
  first_name text,
  last_name text,
  email text not null,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.site_links (
  id bigint generated always as identity primary key,
  label text not null,
  href text not null,
  group_name text not null default 'Company',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id bigint generated always as identity primary key,
  email text not null unique,
  password text not null,
  created_at timestamptz not null default now()
);

alter table public.job enable row level security;
alter table public.applications enable row level security;
alter table public.contact_form enable row level security;
alter table public.site_links enable row level security;
alter table public.admin_users enable row level security;

create table if not exists public.blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  category text not null default 'LinkedIn',
  author text,
  published_at date,
  read_time text,
  cover_image text,
  content text,
  source_url text unique,
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

-- Public visitors may read published jobs and active links. Everything else stays server-only.
drop policy if exists "Public can read jobs" on public.job;
create policy "Public can read jobs" on public.job for select to anon using (true);

drop policy if exists "Public can read active links" on public.site_links;
create policy "Public can read active links" on public.site_links for select to anon using (is_active);

drop policy if exists "Public can read published blogs" on public.blog_posts;
create policy "Public can read published blogs" on public.blog_posts for select to anon using (is_published);

-- Push row changes for public tables to the browser instantly.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'job'
  ) then
    alter publication supabase_realtime add table public.job;
  end if;
  if not exists (
    select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'site_links'
  ) then
    alter publication supabase_realtime add table public.site_links;
  end if;
end $$;

-- Resumes contain personal data: keep the bucket private; admins receive short-lived signed links.
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do update set public = false;
