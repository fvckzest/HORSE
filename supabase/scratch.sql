create extension if not exists pgcrypto;

create table if not exists public.scratch (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  date date not null,
  medium text not null default 'file scrap',
  status text not null default 'new',
  mood text,
  asset_url text not null,
  asset_path text,
  asset_type text not null default 'file',
  asset_mime text,
  asset_name text,
  excerpt text,
  tags text[] not null default '{}',
  href text,
  body text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint scratch_asset_type_check
    check (asset_type in ('image', 'video', 'audio', 'code', 'file'))
);

create index if not exists scratch_date_created_at_idx
  on public.scratch (date desc, created_at desc);

create or replace function public.set_scratch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_scratch_updated_at on public.scratch;

create trigger set_scratch_updated_at
before update on public.scratch
for each row
execute function public.set_scratch_updated_at();

alter table public.scratch enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.scratch to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'scratch'
      and policyname = 'scratch entries are public'
  ) then
    create policy "scratch entries are public"
      on public.scratch
      for select
      to anon, authenticated
      using (true);
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit)
values ('scratch', 'scratch', true, 524288000)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'scratch assets are public'
  ) then
    create policy "scratch assets are public"
      on storage.objects
      for select
      to anon, authenticated
      using (bucket_id = 'scratch');
  end if;
end
$$;
