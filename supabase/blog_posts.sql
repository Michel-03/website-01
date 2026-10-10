-- LinkedIn articles imported from the admin blog page.

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

drop policy if exists "Public can read published blogs" on public.blog_posts;
create policy "Public can read published blogs"
  on public.blog_posts for select to anon
  using (is_published);
