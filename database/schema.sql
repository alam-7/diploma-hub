-- ============================================================
-- DIPLOMA HUB — SUPABASE DATABASE SCHEMA
-- File: database/schema.sql
-- Version: 2.0.0
-- Updated: 2026-09
--
-- HOW TO RUN:
--   1. Open https://supabase.com → your project
--   2. Left sidebar → SQL Editor
--   3. Paste this whole file → click "Run"
--   4. (Optional) promote yourself to admin at the end
--
-- This file is idempotent — safe to run multiple times.
-- ============================================================

-- ------------------------------------------------------------
-- 0. EXTENSIONS
-- ------------------------------------------------------------
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILES
-- Linked to auth.users. Auto-created on signup via trigger.
-- ============================================================
create table if not exists public.profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    email       text,
    name        text,
    role        text default 'student'
                check (role in ('student', 'moderator', 'admin')),
    branch      text,
    semester    integer check (semester is null or (semester between 1 and 6)),
    bio         text,
    avatar_url  text,
    verified    boolean default false,
    blocked     boolean default false,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_email on public.profiles(email);

alter table public.profiles enable row level security;

-- Policies
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
    on public.profiles for select
    using (auth.uid() = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
    on public.profiles for update
    using (auth.uid() = id);

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
    on public.profiles for select
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles"
    on public.profiles for update
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 2. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, email, name, branch, semester)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'branch',
        nullif(new.raw_user_meta_data->>'semester', '')::integer
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ============================================================
-- 3. COURSES (optional — data may stay in JS file)
-- ============================================================
create table if not exists public.courses (
    slug        text primary key,
    name        text not null,
    code        text,
    icon        text,
    description text,
    data        jsonb,       -- full course JSON (semesters, subjects…)
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

alter table public.courses enable row level security;

drop policy if exists "Anyone reads courses" on public.courses;
create policy "Anyone reads courses"
    on public.courses for select
    using (true);

drop policy if exists "Admins manage courses" on public.courses;
create policy "Admins manage courses"
    on public.courses for all
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 4. PROGRESS (per-user, per-subject)
-- ============================================================
create table if not exists public.progress (
    id              uuid default gen_random_uuid() primary key,
    user_id         uuid not null references auth.users(id) on delete cascade,
    subject_code    text not null,
    units_done      jsonb default '[]'::jsonb,
    last_unit       integer,
    updated_at      timestamptz default now(),
    created_at      timestamptz default now(),
    unique (user_id, subject_code)
);

create index if not exists idx_progress_user on public.progress(user_id);
create index if not exists idx_progress_subject on public.progress(subject_code);

alter table public.progress enable row level security;

drop policy if exists "Users manage own progress" on public.progress;
create policy "Users manage own progress"
    on public.progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

drop policy if exists "Admins read all progress" on public.progress;
create policy "Admins read all progress"
    on public.progress for select
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 5. BOOKMARKS
-- ============================================================
create table if not exists public.bookmarks (
    id          uuid default gen_random_uuid() primary key,
    user_id     uuid not null references auth.users(id) on delete cascade,
    type        text not null,   -- note | book | paper | question | answer | practical | quiz | equipment | msbte
    item_id     text not null,
    meta        jsonb,
    created_at  timestamptz default now(),
    unique (user_id, type, item_id)
);

create index if not exists idx_bookmarks_user on public.bookmarks(user_id);
create index if not exists idx_bookmarks_type on public.bookmarks(type);

alter table public.bookmarks enable row level security;

drop policy if exists "Users manage own bookmarks" on public.bookmarks;
create policy "Users manage own bookmarks"
    on public.bookmarks for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ============================================================
-- 6. QUIZ ATTEMPTS
-- ============================================================
create table if not exists public.attempts (
    id              uuid default gen_random_uuid() primary key,
    user_id         uuid not null references auth.users(id) on delete cascade,
    quiz_id         text not null,
    subject_code    text,
    score           integer not null default 0,
    correct_count   integer default 0,
    wrong_count     integer default 0,
    skipped_count   integer default 0,
    total_count     integer default 0,
    time_taken      integer,   -- seconds
    attempted_at    timestamptz default now()
);

create index if not exists idx_attempts_user on public.attempts(user_id);
create index if not exists idx_attempts_quiz on public.attempts(quiz_id);
create index if not exists idx_attempts_score on public.attempts(score desc);

alter table public.attempts enable row level security;

drop policy if exists "Users manage own attempts" on public.attempts;
create policy "Users manage own attempts"
    on public.attempts for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Public read so leaderboard works
drop policy if exists "Anyone reads attempts for leaderboard" on public.attempts;
create policy "Anyone reads attempts for leaderboard"
    on public.attempts for select
    using (true);

-- ============================================================
-- 7. EQUIPMENT
-- ============================================================
create table if not exists public.equipment (
    id              uuid default gen_random_uuid() primary key,
    name            text not null,
    slug            text unique not null,
    category        text,
    icon            text,
    image           text,
    purpose         text,
    principle       text,
    parts           jsonb default '[]'::jsonb,
    applications    jsonb default '[]'::jsonb,
    safety          jsonb default '[]'::jsonb,
    specs           jsonb default '{}'::jsonb,
    course          jsonb default '[]'::jsonb,
    status          text default 'pending'
                    check (status in ('pending','verified','featured')),
    submitted_by    uuid references auth.users(id) on delete set null,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

create index if not exists idx_equipment_slug on public.equipment(slug);
create index if not exists idx_equipment_category on public.equipment(category);
create index if not exists idx_equipment_status on public.equipment(status);

alter table public.equipment enable row level security;

drop policy if exists "Anyone reads published equipment" on public.equipment;
create policy "Anyone reads published equipment"
    on public.equipment for select
    using (status in ('verified','featured'));

drop policy if exists "Admins read all equipment" on public.equipment;
create policy "Admins read all equipment"
    on public.equipment for select
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

drop policy if exists "Admins manage equipment" on public.equipment;
create policy "Admins manage equipment"
    on public.equipment for all
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

drop policy if exists "Anyone submits equipment" on public.equipment;
create policy "Anyone submits equipment"
    on public.equipment for insert
    with check (auth.uid() = submitted_by or submitted_by is null);

-- ============================================================
-- 8. VERIFICATIONS (content submission queue)
-- ============================================================
create table if not exists public.verifications (
    id                  uuid default gen_random_uuid() primary key,
    type                text not null,   -- note | paper | question | practical | equipment | quiz
    title               text not null,
    description         text,
    subject             text,
    unit                text,
    resource_url        text,
    submitted_by        uuid references auth.users(id) on delete set null,
    submitter_name      text,
    submitter_email     text,
    status              text default 'pending'
                        check (status in ('pending','approved','rejected')),
    reject_reason       text,
    reject_message      text,
    reviewed_by         uuid references auth.users(id) on delete set null,
    submitted_at        timestamptz default now(),
    reviewed_at         timestamptz
);

create index if not exists idx_verifications_status on public.verifications(status);
create index if not exists idx_verifications_type on public.verifications(type);

alter table public.verifications enable row level security;

drop policy if exists "Anyone submits verifications" on public.verifications;
create policy "Anyone submits verifications"
    on public.verifications for insert
    with check (auth.uid() = submitted_by or submitted_by is null);

drop policy if exists "Users read own submissions" on public.verifications;
create policy "Users read own submissions"
    on public.verifications for select
    using (auth.uid() = submitted_by);

drop policy if exists "Admins manage verifications" on public.verifications;
create policy "Admins manage verifications"
    on public.verifications for all
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 9. CONTACT MESSAGES
-- ============================================================
create table if not exists public.contact_messages (
    id          uuid default gen_random_uuid() primary key,
    name        text not null,
    email       text not null,
    subject     text,
    message     text not null,
    status      text default 'new'
                check (status in ('new','read','replied','archived')),
    created_at  timestamptz default now()
);

create index if not exists idx_contact_status on public.contact_messages(status);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone submits contact" on public.contact_messages;
create policy "Anyone submits contact"
    on public.contact_messages for insert
    with check (true);

drop policy if exists "Admins read contact" on public.contact_messages;
create policy "Admins read contact"
    on public.contact_messages for select
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 10. DOWNLOAD STATS
-- ============================================================
create table if not exists public.download_stats (
    resource_type   text not null,
    resource_id     text not null,
    count           integer default 0,
    updated_at      timestamptz default now(),
    primary key (resource_type, resource_id)
);

alter table public.download_stats enable row level security;

drop policy if exists "Anyone reads download stats" on public.download_stats;
create policy "Anyone reads download stats"
    on public.download_stats for select
    using (true);

drop policy if exists "Admins manage download stats" on public.download_stats;
create policy "Admins manage download stats"
    on public.download_stats for all
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('admin','moderator')
        )
    );

-- ============================================================
-- 11. RPC — increment_download
-- ============================================================
create or replace function public.increment_download(
    p_resource_type text,
    p_resource_id   text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.download_stats (resource_type, resource_id, count, updated_at)
    values (p_resource_type, p_resource_id, 1, now())
    on conflict (resource_type, resource_id)
    do update set count = public.download_stats.count + 1, updated_at = now();
end;
$$;

grant execute on function public.increment_download(text, text) to anon, authenticated;

-- ============================================================
-- 12. RPC — get_leaderboard
-- ============================================================
create or replace function public.get_leaderboard(max_rows integer default 20)
returns table (
    user_id     uuid,
    name        text,
    best_score  integer,
    attempts    integer
)
language sql
security definer
set search_path = public
as $$
    select
        a.user_id,
        coalesce(p.name, 'Anonymous') as name,
        max(a.score)::integer as best_score,
        count(a.id)::integer as attempts
    from public.attempts a
    left join public.profiles p on p.id = a.user_id
    group by a.user_id, p.name
    order by best_score desc, attempts desc
    limit max_rows;
$$;

grant execute on function public.get_leaderboard(integer) to anon, authenticated;

-- ============================================================
-- 13. UPDATED_AT TRIGGERS
-- ============================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
    before update on public.profiles
    for each row execute function public.touch_updated_at();

drop trigger if exists trg_equipment_updated on public.equipment;
create trigger trg_equipment_updated
    before update on public.equipment
    for each row execute function public.touch_updated_at();

drop trigger if exists trg_courses_updated on public.courses;
create trigger trg_courses_updated
    before update on public.courses
    for each row execute function public.touch_updated_at();

-- ============================================================
-- 14. STORAGE (optional — for equipment images / notes PDFs)
-- ============================================================
-- Run once per project:
insert into storage.buckets (id, name, public)
values ('equipment', 'equipment', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('notes', 'notes', true)
on conflict (id) do nothing;

-- Allow public read of storage
drop policy if exists "Public read equipment bucket" on storage.objects;
create policy "Public read equipment bucket"
    on storage.objects for select
    using (bucket_id = 'equipment');

drop policy if exists "Public read notes bucket" on storage.objects;
create policy "Public read notes bucket"
    on storage.objects for select
    using (bucket_id = 'notes');

-- Allow authenticated uploads
drop policy if exists "Authenticated upload equipment" on storage.objects;
create policy "Authenticated upload equipment"
    on storage.objects for insert
    with check (bucket_id = 'equipment' and auth.uid() is not null);

-- ============================================================
-- 15. BULK UPDATE trigger for equipment verification status
-- ============================================================
create or replace function public.notify_equipment_publish()
returns trigger
language plpgsql
as $$
begin
    if new.status <> old.status and new.status in ('verified','featured') then
        -- placeholder for future notification hook
        perform pg_notify('equipment_published', new.slug);
    end if;
    return new;
end;
$$;

drop trigger if exists trg_equipment_publish on public.equipment;
create trigger trg_equipment_publish
    after update on public.equipment
    for each row execute function public.notify_equipment_publish();

-- ============================================================
-- 16. VERIFY
-- ============================================================
select
    'profiles'        as table_name, count(*) as rows from public.profiles
union all select 'courses',        count(*) from public.courses
union all select 'progress',       count(*) from public.progress
union all select 'bookmarks',      count(*) from public.bookmarks
union all select 'attempts',       count(*) from public.attempts
union all select 'equipment',      count(*) from public.equipment
union all select 'verifications',  count(*) from public.verifications
union all select 'contact_messages',count(*) from public.contact_messages
union all select 'download_stats', count(*) from public.download_stats;

-- ============================================================
-- 17. PROMOTE YOURSELF TO ADMIN
-- ============================================================
-- 1) Sign up through your app.
-- 2) Then run (replace with your email):
--
--    update public.profiles
--    set role = 'admin', verified = true
--    where email = 'your-email@example.com';
--
--    select id, email, role, verified from public.profiles where role = 'admin';

-- ============================================================
-- 18. OPTIONAL — SEED DEMO COURSE
-- ============================================================
-- insert into public.courses (slug, name, code, icon, description, data)
-- values (
--   'computer-engineering',
--   'Computer Engineering',
--   'CO',
--   '💻',
--   'Study of computers, programming and software development.',
--   '{}'::jsonb
-- )
-- on conflict (slug) do nothing;

-- ============================================================
-- END
-- ============================================================