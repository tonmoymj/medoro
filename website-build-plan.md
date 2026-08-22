# Doctor/Hospital Directory Website — Build Plan
**Stack:** Next.js (App Router) + Supabase (Postgres/Auth/Storage) + Vercel

---

## ১. টেক স্ট্যাক

| Layer | টুল | কেন |
|---|---|---|
| Frontend Framework | Next.js 14+ (App Router, TypeScript) | Vercel-এর নেটিভ ফ্রেমওয়ার্ক, SSR/SSG দুটোই সাপোর্ট করে, SEO-ফ্রেন্ডলি |
| Styling | Tailwind CSS | দ্রুত, রেসপনসিভ ডিজাইন সহজ |
| Database | Supabase (Postgres) | ফ্রি, Auth+Storage বিল্ট-ইন, SQL-ভিত্তিক (স্কেলেবল) |
| Auth (admin login) | Supabase Auth | অ্যাডমিন প্যানেল প্রোটেক্ট করার জন্য |
| Image storage | Supabase Storage | ডাক্তার/হাসপাতালের ছবি রাখার জন্য |
| Hosting | Vercel | Next.js-এর সাথে zero-config deploy |
| Maps | Google Maps Embed / OpenStreetMap (Leaflet) | চেম্বারের লোকেশন দেখানোর জন্য |
| Search | Postgres Full Text Search (শুরুতে), পরে দরকার হলে Algolia/Meilisearch | ডাক্তার/হাসপাতাল সার্চের জন্য |

---

## ২. ডেটাবেস স্কিমা (Supabase SQL)

```sql
-- বিভাগ/জেলা (দেশব্যাপী স্কেল করার জন্য শুরু থেকেই রাখা)
create table cities (
  id bigint generated always as identity primary key,
  name text not null,
  division text, -- e.g. Rajshahi
  slug text unique not null
);

-- স্পেশালিটি
create table specialties (
  id bigint generated always as identity primary key,
  name text not null,        -- e.g. "মেডিসিন", "গাইনি"
  slug text unique not null,
  icon text
);

-- হাসপাতাল/ক্লিনিক/ডায়াগনস্টিক সেন্টার
create table hospitals (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique not null,
  type text, -- 'hospital' | 'clinic' | 'diagnostic'
  city_id bigint references cities(id),
  address text,
  phone text,
  latitude double precision,
  longitude double precision,
  facilities text[],         -- array of facility tags
  cover_image text,
  description text,
  created_at timestamptz default now()
);

-- ডাক্তার
create table doctors (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique not null,
  specialty_id bigint references specialties(id),
  qualifications text,
  bio text,
  photo text,
  phone text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- ডাক্তারের চেম্বার (এক ডাক্তার একাধিক হাসপাতালে বসতে পারেন)
create table doctor_chambers (
  id bigint generated always as identity primary key,
  doctor_id bigint references doctors(id) on delete cascade,
  hospital_id bigint references hospitals(id) on delete cascade,
  visiting_hours text,     -- e.g. "শনি-বৃহ: ৫pm-৯pm"
  consultation_fee text,
  appointment_phone text
);

-- অ্যাপয়েন্টমেন্ট রিকোয়েস্ট (MVP-তে সরাসরি বুকিং না, শুধু রিকোয়েস্ট)
create table appointment_requests (
  id bigint generated always as identity primary key,
  doctor_id bigint references doctors(id),
  patient_name text not null,
  patient_phone text not null,
  message text,
  status text default 'pending', -- pending | contacted | closed
  created_at timestamptz default now()
);

-- ব্লগ/হেলথ আর্টিকেল (SEO ট্রাফিকের জন্য)
create table articles (
  id bigint generated always as identity primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  cover_image text,
  published_at timestamptz default now()
);

-- ইনডেক্স (সার্চ পারফরম্যান্সের জন্য)
create index idx_doctors_specialty on doctors(specialty_id);
create index idx_chambers_hospital on doctor_chambers(hospital_id);
create index idx_hospitals_city on hospitals(city_id);
```

> 🔒 Supabase-এ Row Level Security (RLS) অন করে রাখুন — পাবলিক টেবিলে শুধু `SELECT` অ্যালাউ করুন, `INSERT/UPDATE/DELETE` শুধু authenticated admin-দের জন্য রাখুন।

---

## ৩. সাইট রুট স্ট্রাকচার (Next.js App Router)

```
/                              → হোমপেজ (সার্চ বার, ফিচার্ড ডাক্তার/হাসপাতাল)
/doctors                       → ডাক্তার সার্চ ও ফিল্টার পেজ
/doctors/[slug]                → ডাক্তার প্রোফাইল
/hospitals                     → হাসপাতাল/ক্লিনিক লিস্টিং
/hospitals/[slug]              → হাসপাতাল প্রোফাইল
/specialties/[slug]            → স্পেশালিটি অনুযায়ী ডাক্তার লিস্ট (SEO landing page)
/city/[slug]                   → শহর অনুযায়ী লিস্ট (দেশব্যাপী স্কেলের জন্য জরুরি)
/blog                          → আর্টিকেল লিস্ট
/blog/[slug]                   → আর্টিকেল ডিটেইল
/contact                       → যোগাযোগ পেজ
/privacy, /terms, /disclaimer  → স্ট্যাটিক পেজ

/admin                         → লগইন প্রোটেক্টেড
/admin/doctors                 → ডাক্তার add/edit/delete
/admin/hospitals               → হাসপাতাল add/edit/delete
/admin/appointments            → অ্যাপয়েন্টমেন্ট রিকোয়েস্ট দেখা
```

---

## ৪. MVP ফিচার লিস্ট (v1 — যা নিয়ে লঞ্চ করবেন)

- [ ] হোমপেজ সার্চ (specialty/city/name দিয়ে)
- [ ] ডাক্তার লিস্টিং + ফিল্টার (specialty, city)
- [ ] ডাক্তার প্রোফাইল পেজ (চেম্বার, টাইমিং, ফি)
- [ ] হাসপাতাল লিস্টিং + প্রোফাইল
- [ ] অ্যাপয়েন্টমেন্ট রিকোয়েস্ট ফর্ম (শুধু নাম-ফোন-মেসেজ, ডেটাবেসে সেভ)
- [ ] অ্যাডমিন প্যানেল (CRUD for doctors/hospitals)
- [ ] মোবাইল রেসপনসিভ ডিজাইন
- [ ] বেসিক SEO (meta title/description, sitemap.xml, robots.txt)

## ৫. Phase 2 (ট্র্যাকশন পাওয়ার পর যোগ করার মতো)

- [ ] ব্লগ/আর্টিকেল সেকশন
- [ ] ইউজার রিভিউ/রেটিং সিস্টেম
- [ ] সরাসরি অনলাইন অ্যাপয়েন্টমেন্ট বুকিং (calendar সহ)
- [ ] Google Maps ইন্টিগ্রেশন
- [ ] হাসপাতাল/ডাক্তারদের জন্য নিজস্ব লগইন (self-service profile update)
- [ ] Paid/Premium listing সিস্টেম
- [ ] মাল্টি-সিটি এক্সপ্যানশন

---

## ৬. ডেভেলপমেন্ট ধাপ (সাজেস্টেড অর্ডার)

1. **Setup**: `npx create-next-app`, Tailwind config, Supabase প্রজেক্ট বানানো, `.env.local`-এ keys বসানো, GitHub repo → Vercel-এ কানেক্ট করা
2. **Database**: উপরের SQL Supabase SQL editor-এ রান করা, RLS পলিসি সেট করা
3. **Static pages**: হোমপেজ, নেভিগেশন, ফুটার, প্রাইভেসি/টার্মস পেজ
4. **Doctor & Hospital listing + profile pages**: Supabase client দিয়ে ডেটা fetch, dynamic route (`[slug]`)
5. **Search & filter**: URL query params দিয়ে ফিল্টার (e.g. `/doctors?specialty=medicine&city=rajshahi`)
6. **Admin panel**: Supabase Auth দিয়ে লগইন, protected route middleware, CRUD ফর্ম
7. **Appointment request form**: সহজ ফর্ম → Supabase insert
8. **SEO setup**: `next/metadata` API দিয়ে প্রতি পেজে dynamic title/description, `sitemap.ts`, `robots.ts`
9. **Testing**: মোবাইলে টেস্ট, ভুল ডেটা এন্ট্রি হ্যান্ডলিং, Lighthouse স্কোর চেক
10. **Seed data**: প্রথম ১০০-২০০ ডাক্তার/হাসপাতাল ঢুকিয়ে লঞ্চ

---

## ৭. Environment Variables (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # শুধু server-side/admin action-এ ব্যবহার করুন, কখনো client-এ expose করবেন না
```

---

## ৮. Supabase Free-tier ঘুমিয়ে না পড়ার জন্য

GitHub Actions দিয়ে প্রতি ৩ দিনে একটা lightweight ping cron সেট করুন, যাতে ৭ দিনের ইনঅ্যাক্টিভিটি পজ এড়ানো যায়। শুরু করার সময় এটা `.github/workflows/keep-alive.yml` হিসেবে যোগ করে দেবেন।

---

## দ্রুত রেফারেন্স — চেকলিস্ট (কপি করে ট্র্যাক করুন)

- [ ] Next.js + Tailwind সেটআপ
- [ ] Supabase প্রজেক্ট তৈরি ও SQL রান
- [ ] Vercel-এ ডিপ্লয় কানেক্ট
- [ ] হোমপেজ + লিস্টিং পেজ
- [ ] প্রোফাইল পেজ (doctor/hospital)
- [ ] সার্চ/ফিল্টার
- [ ] অ্যাডমিন CRUD প্যানেল
- [ ] অ্যাপয়েন্টমেন্ট ফর্ম
- [ ] SEO metadata + sitemap
- [ ] প্রথম ডেটা এন্ট্রি (১০০-২০০ ডাক্তার)
- [ ] লঞ্চ
