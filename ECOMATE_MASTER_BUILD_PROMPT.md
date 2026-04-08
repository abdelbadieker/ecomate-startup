# ═══════════════════════════════════════════════════════════════════════════════
# ECOMATE v2.0 — MASTER BUILD PROMPT
# "Production-Ready SaaS + Agency Platform for Algerian E-Commerce"
# Supported by: Incubateur de l'Université de Bouira 🇩🇿
# ═══════════════════════════════════════════════════════════════════════════════
#
# HOW TO USE THIS PROMPT:
# 1. Open a fresh AI conversation (Claude, GPT-4, Gemini, etc.)
# 2. Copy everything below the separator line
# 3. Paste as your first message
# 4. Follow the phase-by-phase checkpoint protocol exactly
# 5. DO NOT ask the AI to skip phases or combine phases
#
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BEGIN PROMPT BELOW THIS LINE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are an Elite Senior Full-Stack Engineer and SaaS Architect. I am building **EcoMate v2.0** — a production-ready, all-in-one SaaS + Agency platform for Algerian e-commerce merchants — in a **brand-new, empty repository**. You must build this perfectly, phase by phase, following the strict checkpoint protocol defined below.

---

## PERSONA & MISSION

You are a Senior Principal Full-Stack Engineer specializing in:
- Next.js 15 App Router with TypeScript
- Supabase (Auth, PostgreSQL, RLS, Edge Functions)
- Tailwind CSS v3, Framer Motion, Glassmorphism UI
- Automation architecture (Make.com, n8n, webhook orchestration)
- i18n (next-intl v4), RTL/LTR bilingual apps
- Meta OAuth, Google OAuth, Chargily Payments

Your mission: Build EcoMate from zero to production-deployed, client-ready SaaS.

---

## STRICT EXECUTION PROTOCOL (NON-NEGOTIABLE)

**RULE 1 — NO MONOLITHIC RESPONSES:** You are forbidden from writing the entire app in one response. Build phase by phase only.

**RULE 2 — CHECKPOINT RULE:** After each phase, you MUST:
1. List the exact files you created/modified
2. Give me the exact terminal commands to run
3. Write: "✅ PHASE [N] COMPLETE — Run `npm run dev`, navigate to `localhost:3000`, confirm the UI looks correct, then reply `PHASE [N] CONFIRMED` to unlock the next phase."
4. **DO NOT write any Phase N+1 code until I reply with explicit confirmation.**

**RULE 3 — BEST PRACTICES ONLY:**
- Always `await cookies()` from `next/headers` (Next.js 15 requirement — cookies() returns a Promise)
- Use `@supabase/ssr` for all server-side Supabase clients
- All DB calls must be strongly typed using generated Supabase types
- Use `next-intl` v4 with config at `src/i18n/request.ts` (default export)
- In `next.config.mjs`, use the `path` module with an absolute path to prevent Vercel Webpack trace 500 errors
- `proxy.ts` (renamed from deprecated `middleware.ts`) handles all route protection

**RULE 4 — FILE NAMING:** Use the exact file structure defined in Section 6 of this prompt.

---

## SECTION 1: TECH STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^15.x |
| Language | TypeScript | ^5.x |
| Styling | Tailwind CSS | ^3.4 |
| Animation | Framer Motion | ^11.x |
| Backend/DB/Auth | Supabase | @supabase/ssr ^0.4, @supabase/supabase-js ^2.43 |
| i18n | next-intl | ^4.x |
| Payments | Chargily Pay | REST API v2 |
| Charts | Recharts | ^2.12 |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable | ^6.x |
| Forms | react-hook-form + zod | latest |
| Toasts | react-hot-toast | ^2.4 |
| Icons | lucide-react | ^0.383 |
| Utilities | clsx, tailwind-merge, date-fns | latest |
| Deployment | Vercel | — |

**Install Command (run in this exact order):**
```bash
npx create-next-app@latest ecomate --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ecomate
npm install @supabase/ssr @supabase/supabase-js next-intl framer-motion recharts @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-hook-form zod @hookform/resolvers react-hot-toast lucide-react clsx tailwind-merge date-fns
npm install -D @types/node
```

---

## SECTION 2: DESIGN SYSTEM (Extract from Existing HTML Blueprints)

### 2.1 Color Tokens

```css
/* Dark Mode (DEFAULT) */
--color-primary: #1E3A8A;        /* Deep blue */
--color-secondary: #2563EB;      /* Bright blue */
--color-accent: #10B981;         /* Emerald green */
--color-admin: #7C3AED;          /* Purple (admin only) */
--bg-body: #07101f;              /* Deepest background */
--bg-section: #0a1628;           /* Section background */
--bg-card: rgba(255,255,255,.028); /* Card background */
--text-main: #FFFFFF;
--text-sub: rgba(255,255,255,.45);
--text-muted: rgba(255,255,255,.28);
--border-c: rgba(255,255,255,.08);
--card-hover: rgba(255,255,255,.05);
--nav-bg: rgba(7,16,31,.55);
--footer-bg: rgba(5,10,20,1);

/* Light Mode ([data-theme="light"]) */
--bg-body: #F8FAFC;
--bg-section: #F1F5F9;
--bg-card: rgba(255,255,255,.9);
--text-main: #0F172A;
--text-sub: #475569;
--text-muted: #94A3B8;
--border-c: rgba(15,23,42,.1);
--card-hover: rgba(37,99,235,.04);
--nav-bg: rgba(248,250,252,.8);
--footer-bg: #0F172A;
```

### 2.2 Typography

```css
/* Headlines/Brand */
font-family: 'Poppins', sans-serif;
/* Body/UI */
font-family: 'Inter', sans-serif;

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@300;400;500;600&display=swap');
```

### 2.3 Component Patterns (copy these exactly from the HTML blueprint)

**Buttons:**
```css
/* Primary CTA */
.btn-primary {
  background: linear-gradient(135deg, #2563EB, #1d4ed8);
  border-radius: 12px; padding: 15px 32px;
  box-shadow: 0 0 30px rgba(37,99,235,.5);
  font-family: 'Poppins'; font-weight: 700; color: #fff;
}
/* Ghost */
.btn-ghost {
  background: rgba(255,255,255,.028);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 8px; padding: 8px 18px;
}
/* Admin Purple */
.btn-admin {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  box-shadow: 0 0 28px rgba(124,58,237,.4);
}
```

**Cards (Glassmorphism):**
```css
.card-glass {
  background: rgba(255,255,255,.028);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  transition: border-color .3s, transform .3s, box-shadow .3s;
}
.card-glass:hover {
  border-color: rgba(37,99,235,.3);
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(37,99,235,.1);
}
```

**Bento Grid:**
```css
.bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.b-span-5 { grid-column: span 5; }
.b-span-4 { grid-column: span 4; }
.b-span-3 { grid-column: span 3; }
.b-span-7 { grid-column: span 7; }
.b-span-full { grid-column: 1 / -1; }
```

**Badge/Tag:**
```css
.badge-green {
  background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.18);
  border-radius: 100px; padding: 3px 10px;
  font-size: 11px; font-weight: 700; color: #10B981;
}
.badge-blue {
  background: rgba(37,99,235,.1); border: 1px solid rgba(37,99,235,.18);
  color: #2563EB;
}
.badge-purple {
  background: rgba(124,58,237,.1); border: 1px solid rgba(124,58,237,.2);
  color: #a78bfa;
}
```

**Status Dots (animated):**
```css
.dot-green { width: 6px; height: 6px; border-radius: 50%; background: #10B981; animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
```

### 2.4 Scroll Reveal Pattern
```css
.sr { opacity: 0; transform: translateY(36px); transition: opacity .7s ease, transform .7s ease; }
.sr.vis { opacity: 1; transform: translateY(0); }
.d1 { transition-delay: .1s; } .d2 { transition-delay: .2s; }
.d3 { transition-delay: .3s; } .d4 { transition-delay: .4s; }
```

### 2.5 Admin Console Theme (Isolated Purple)
```css
--admin-accent: #7c3aed;
--admin-accent-dark: #5b21b6;
/* Admin cards glow on hover with purple, not blue */
.admin-card:hover { box-shadow: 0 0 20px rgba(124,58,237,.4); }
```

---

## SECTION 3: COMPLETE DATABASE SCHEMA

Run this SQL in **Supabase → SQL Editor → New Query**:

```sql
-- ═══════════════════════════════════════════════════════════
-- ECOMATE v2.0 — COMPLETE SUPABASE SCHEMA
-- ═══════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. PROFILES (auto-created on signup via trigger) ──────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT DEFAULT '',
  business_name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  wilaya TEXT DEFAULT '',
  avatar_url TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  role TEXT DEFAULT 'client',           -- client | admin | super_admin
  onboarded BOOLEAN DEFAULT false,
  locale TEXT DEFAULT 'fr',             -- fr | ar | en
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. PLANS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price_da INTEGER NOT NULL DEFAULT 0,
  billing_cycle TEXT DEFAULT 'monthly', -- monthly | yearly | one_time
  plan_type TEXT DEFAULT 'saas',        -- saas | creative | web_dev | fulfillment
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.plans (name, slug, price_da, billing_cycle, plan_type, features, sort_order) VALUES
-- SaaS Plans
('Starter',  'starter',  0,    'monthly', 'saas', '["AI Chatbot (basic)","50 orders/month","1 channel","20 products","Google Sheets export"]', 1),
('Growth',   'growth',   4900, 'monthly', 'saas', '["Full AI System","Unlimited orders","All channels","Delivery tracking","CRM","AI Growth Agent","Analytics"]', 2),
('Business', 'business', 0,    'monthly', 'saas', '["Everything in Growth","Advanced AI Agent","Custom targeting","Dedicated manager","Custom integrations"]', 3),
-- Creative Studio Plans
('Creative Starter', 'creative-starter', 9900,  'monthly', 'creative', '["4 short-form videos/month","Script writing","Basic montage","1 revision"]', 1),
('Creative Pro',     'creative-pro',     18900, 'monthly', 'creative', '["8 videos/month","Advanced scripts","Pro montage","2 revisions","Thumbnail design"]', 2),
('Creative Elite',   'creative-elite',   29900, 'monthly', 'creative', '["12 videos/month","Full creative direction","4 revisions","Analytics report"]', 3),
-- Web Dev (one-time)
('Landing Page',   'web-landing',  29000, 'one_time', 'web_dev', '["Single page","Mobile responsive","Contact form","SEO basic","2 revisions"]', 1),
('E-commerce Site','web-ecom',     89000, 'one_time', 'web_dev', '["Full store","Product catalog","Chargily payments","Admin panel","5 revisions"]', 2)
ON CONFLICT (slug) DO NOTHING;

-- ── 3. SUBSCRIPTIONS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.plans(id),
  status TEXT NOT NULL DEFAULT 'trial'
    CHECK (status IN ('trial','active','pending_payment','cancelled','expired','paused')),
  amount_da INTEGER DEFAULT 0,
  payment_method TEXT DEFAULT 'bank_transfer',
    -- bank_transfer | cib | edahabia | chargily | cash
  payment_reference TEXT,
  payment_confirmed BOOLEAN DEFAULT false,
  admin_notes TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. SOCIAL INTEGRATIONS (white-labeled) ───────────────────
-- CRITICAL: These tokens are NEVER exposed to the client UI.
-- Admin uses them to connect to ManyChat/Make.com/n8n internally.
CREATE TABLE IF NOT EXISTS public.social_integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL
    CHECK (platform IN ('facebook','instagram','whatsapp','telegram','tiktok','google')),
  account_name TEXT,
  account_id TEXT,
  page_id TEXT,
  page_name TEXT,
  access_token TEXT,              -- encrypted at rest via Supabase Vault ideally
  long_lived_token TEXT,
  token_expires_at TIMESTAMPTZ,
  scopes TEXT[],
  webhook_url TEXT,               -- the Make.com/n8n webhook endpoint for this client
  manychat_flow_id TEXT,          -- internal: which ManyChat flow serves this client
  status TEXT DEFAULT 'connected'
    CHECK (status IN ('connected','expired','revoked','pending')),
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'     -- platform-specific extra data
);

-- Admin can also store their own platform API keys here
CREATE TABLE IF NOT EXISTS public.platform_credentials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  api_key TEXT,
  api_secret TEXT,
  webhook_verify_token TEXT,
  app_id TEXT,
  app_secret TEXT,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. ORDERS ────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS order_seq START 10001;

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT DEFAULT ('EM-' || LPAD(NEXTVAL('order_seq')::TEXT, 6, '0')),
  -- Customer Info
  customer_name TEXT NOT NULL DEFAULT '',
  customer_phone TEXT DEFAULT '',
  customer_address TEXT DEFAULT '',
  customer_wilaya TEXT DEFAULT '',
  customer_commune TEXT DEFAULT '',
  -- Products
  products JSONB DEFAULT '[]',
    -- [{product_id, name, sku, quantity, unit_price, options: {size, color}}]
  subtotal_da INTEGER DEFAULT 0,
  delivery_fee_da INTEGER DEFAULT 0,
  total_da INTEGER DEFAULT 0,
  -- Status (maps to Kanban columns)
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','packaging','dispatched','in_delivery','delivered','returned','cancelled')),
  -- Payment
  payment_method TEXT DEFAULT 'cod',
    -- cod | cib | edahabia | chargily
  payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid','refunded','failed')),
  chargily_checkout_id TEXT,
  -- Delivery
  delivery_company TEXT DEFAULT '',
  tracking_code TEXT DEFAULT '',
  delivery_notes TEXT DEFAULT '',
  -- Source & AI
  source TEXT DEFAULT 'manual'
    CHECK (source IN ('manual','facebook','instagram','whatsapp','telegram','tiktok','website','api')),
  ai_confirmed BOOLEAN DEFAULT false,
  make_webhook_id TEXT,           -- for tracking Make.com scenario execution
  -- Fulfillment Stage (for agency fulfillment service)
  fulfillment_stage TEXT DEFAULT 'not_started'
    CHECK (fulfillment_stage IN ('not_started','warehoused','packaging','ready_to_ship','shipped','completed')),
  fulfillment_notes TEXT DEFAULT '',
  -- Timestamps
  confirmed_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. PRODUCTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price_da INTEGER DEFAULT 0,
  compare_price_da INTEGER,
  cost_price_da INTEGER,
  stock INTEGER DEFAULT 0,
  track_stock BOOLEAN DEFAULT true,
  sku TEXT DEFAULT '',
  category TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  images JSONB DEFAULT '[]',      -- [{url, alt}]
  variants JSONB DEFAULT '[]',
    -- [{name: "Size", options: ["S","M","L","XL"]}, {name: "Color", options: [...]}]
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  -- Sync to chatbot
  synced_to_chatbot BOOLEAN DEFAULT false,
  last_synced_at TIMESTAMPTZ,
  -- Algerian delivery pricing per wilaya (optional override)
  custom_delivery_fees JSONB DEFAULT '{}', -- {wilaya_code: fee_da}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. INVENTORY / WAREHOUSING (Fulfillment Service) ─────────
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,     -- denormalized for fast reads
  sku TEXT DEFAULT '',
  variant_label TEXT DEFAULT '',  -- e.g. "Size: L, Color: Black"
  quantity_received INTEGER DEFAULT 0,
  quantity_in_stock INTEGER DEFAULT 0,
  quantity_reserved INTEGER DEFAULT 0,
  quantity_shipped INTEGER DEFAULT 0,
  quantity_returned INTEGER DEFAULT 0,
  bin_location TEXT DEFAULT '',   -- physical shelf/bin in Ecomate warehouse
  received_at TIMESTAMPTZ DEFAULT NOW(),
  last_counted_at TIMESTAMPTZ,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 8. CUSTOMERS (CRM) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  wilaya TEXT DEFAULT '',
  address TEXT DEFAULT '',
  source TEXT DEFAULT 'manual',
  notes TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  total_orders INTEGER DEFAULT 0,
  total_spent_da INTEGER DEFAULT 0,
  average_order_da INTEGER DEFAULT 0,
  last_order_at TIMESTAMPTZ,
  customer_status TEXT DEFAULT 'active'
    CHECK (customer_status IN ('active','vip','blocked','inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. DELIVERY ZONES (58 Wilayas) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- null user_id = platform default (set by admin)
  wilaya_code INTEGER NOT NULL CHECK (wilaya_code BETWEEN 1 AND 58),
  wilaya_name_fr TEXT NOT NULL,
  wilaya_name_ar TEXT NOT NULL,
  home_delivery_fee INTEGER DEFAULT 600,  -- in DA
  office_pickup_fee INTEGER DEFAULT 400,
  express_fee INTEGER DEFAULT 900,
  delivery_days_estimate INTEGER DEFAULT 3,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default 58 wilayas
INSERT INTO public.delivery_zones (wilaya_code, wilaya_name_fr, wilaya_name_ar, home_delivery_fee, office_pickup_fee, express_fee, delivery_days_estimate)
VALUES
(1,'Adrar','أدرار',800,600,1100,5),
(2,'Chlef','الشلف',600,400,900,3),
(3,'Laghouat','الأغواط',700,500,1000,4),
(4,'Oum El Bouaghi','أم البواقي',600,400,900,3),
(5,'Batna','باتنة',600,400,900,3),
(6,'Béjaïa','بجاية',600,400,900,3),
(7,'Biskra','بسكرة',700,500,1000,4),
(8,'Béchar','بشار',800,600,1100,5),
(9,'Blida','البليدة',500,350,800,2),
(10,'Bouira','البويرة',500,350,800,2),
(11,'Tamanrasset','تمنراست',900,700,1200,6),
(12,'Tébessa','تبسة',650,450,950,3),
(13,'Tlemcen','تلمسان',600,400,900,3),
(14,'Tiaret','تيارت',600,400,900,3),
(15,'Tizi Ouzou','تيزي وزو',500,350,800,2),
(16,'Alger','الجزائر',450,300,700,1),
(17,'Djelfa','الجلفة',700,500,1000,4),
(18,'Jijel','جيجل',600,400,900,3),
(19,'Sétif','سطيف',600,400,900,3),
(20,'Saïda','سعيدة',650,450,950,4),
(21,'Skikda','سكيكدة',600,400,900,3),
(22,'Sidi Bel Abbès','سيدي بلعباس',600,400,900,3),
(23,'Annaba','عنابة',550,380,850,2),
(24,'Guelma','قالمة',600,400,900,3),
(25,'Constantine','قسنطينة',550,380,850,2),
(26,'Médéa','المدية',550,380,850,2),
(27,'Mostaganem','مستغانم',600,400,900,3),
(28,'M''Sila','المسيلة',650,450,950,4),
(29,'Mascara','معسكر',650,450,950,3),
(30,'Ouargla','ورقلة',800,600,1100,5),
(31,'Oran','وهران',500,350,800,2),
(32,'El Bayadh','البيض',750,550,1050,4),
(33,'Illizi','إليزي',950,750,1300,7),
(34,'Bordj Bou Arréridj','برج بوعريريج',600,400,900,3),
(35,'Boumerdès','بومرداس',500,350,800,2),
(36,'El Tarf','الطارف',600,400,900,3),
(37,'Tindouf','تندوف',950,750,1300,7),
(38,'Tissemsilt','تيسمسيلت',650,450,950,4),
(39,'El Oued','الوادي',750,550,1050,5),
(40,'Khenchela','خنشلة',650,450,950,4),
(41,'Souk Ahras','سوق أهراس',650,450,950,3),
(42,'Tipaza','تيبازة',500,350,800,2),
(43,'Mila','ميلة',600,400,900,3),
(44,'Aïn Defla','عين الدفلى',550,380,850,3),
(45,'Naâma','النعامة',750,550,1050,5),
(46,'Aïn Témouchent','عين تموشنت',600,400,900,3),
(47,'Ghardaïa','غرداية',750,550,1050,4),
(48,'Relizane','غليزان',600,400,900,3),
(49,'Timimoun','تيميمون',900,700,1200,6),
(50,'Bordj Badji Mokhtar','برج باجي مختار',950,750,1300,7),
(51,'Ouled Djellal','أولاد جلال',750,550,1050,5),
(52,'Béni Abbès','بني عباس',850,650,1150,6),
(53,'In Salah','عين صالح',900,700,1200,6),
(54,'In Guezzam','عين قزام',950,750,1300,7),
(55,'Touggourt','تقرت',750,550,1050,5),
(56,'Djanet','جانت',950,750,1300,7),
(57,'El M''Ghair','المغير',800,600,1100,5),
(58,'El Menia','المنيعة',850,650,1150,6)
ON CONFLICT DO NOTHING;

-- ── 10. REVIEWS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  business_name TEXT DEFAULT '',
  reviewer_wilaya TEXT DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT DEFAULT '',
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  admin_note TEXT DEFAULT '',
  plan_at_review TEXT DEFAULT 'trial',
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 11. PARTNERS (landing page — admin managed) ──────────────
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partner_key TEXT UNIQUE NOT NULL,
  logo TEXT DEFAULT '🤝',
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  row_num INTEGER DEFAULT 1 CHECK (row_num IN (1,2)),
  is_active BOOLEAN DEFAULT false,
  soon BOOLEAN DEFAULT true,
  website_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default 16 partner slots
INSERT INTO public.partners (partner_key,logo,name,category,row_num,is_active,soon,sort_order) VALUES
('p1','🚚','Delivery Partner','Logistics',1,false,true,1),
('p2','🏦','Banking Partner','Payments',1,false,true,2),
('p3','📱','Telecom Partner','Connectivity',1,false,true,3),
('p4','🏪','Commerce Partner','E-commerce',1,false,true,4),
('p5','🏛️','Incubator Partner','Institutional',1,false,true,5),
('p6','☁️','Cloud Partner','Infrastructure',1,false,true,6),
('p7','🤝','Reseller Partner','Distribution',1,false,true,7),
('p8','📦','Fulfillment Partner','COD & Shipping',1,false,true,8),
('p9','🎓','University Partner','Research',2,false,true,1),
('p10','📡','Media Partner','Marketing',2,false,true,2),
('p11','🔐','Security Partner','Compliance',2,false,true,3),
('p12','📊','Analytics Partner','Data Intel',2,false,true,4),
('p13','🛒','Marketplace Partner','Sales Channel',2,false,true,5),
('p14','🌍','Gov & Public Partner','Public Sector',2,false,true,6),
('p15','💳','Fintech Partner','Digital Pay',2,false,true,7),
('p16','🤖','AI Tech Partner','Technology',2,false,true,8)
ON CONFLICT (partner_key) DO NOTHING;

-- ── 12. ADMIN LOGS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 13. CREATIVE ASSETS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.creative_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  asset_type TEXT DEFAULT 'video'
    CHECK (asset_type IN ('video','thumbnail','script','report')),
  drive_url TEXT NOT NULL,         -- Google Drive shareable link
  drive_folder_id TEXT,            -- Google Drive folder ID for iframe embed
  month_year TEXT,                 -- e.g. "2025-01"
  is_delivered BOOLEAN DEFAULT false,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 14. MAKE.COM / AUTOMATION WEBHOOKS ───────────────────────
-- Track which automation scenarios are active for each client
CREATE TABLE IF NOT EXISTS public.automation_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_name TEXT NOT NULL,     -- "order_confirmation", "delivery_update", etc.
  webhook_url TEXT,                -- Make.com/n8n inbound webhook
  is_active BOOLEAN DEFAULT false,
  trigger_platform TEXT,           -- platform that fires this webhook
  last_triggered_at TIMESTAMPTZ,
  total_triggers INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_configs ENABLE ROW LEVEL SECURITY;

-- PROFILES: users see their own; admins see all
DROP POLICY IF EXISTS "profiles_self_all" ON public.profiles;
CREATE POLICY "profiles_self_all" ON public.profiles FOR ALL
  USING (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- PLANS: public read
DROP POLICY IF EXISTS "plans_public_read" ON public.plans;
CREATE POLICY "plans_public_read" ON public.plans FOR SELECT USING (true);

-- SUBSCRIPTIONS: own row; admin all
DROP POLICY IF EXISTS "subs_own" ON public.subscriptions;
CREATE POLICY "subs_own" ON public.subscriptions FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "subs_admin" ON public.subscriptions;
CREATE POLICY "subs_admin" ON public.subscriptions FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- SOCIAL INTEGRATIONS: ONLY admin can see tokens (security critical!)
DROP POLICY IF EXISTS "integrations_admin_only" ON public.social_integrations;
CREATE POLICY "integrations_admin_only" ON public.social_integrations FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));
-- Client can only see non-sensitive columns (status, platform, account_name)
DROP POLICY IF EXISTS "integrations_client_limited" ON public.social_integrations;
CREATE POLICY "integrations_client_limited" ON public.social_integrations FOR SELECT
  USING (auth.uid() = user_id);

-- ORDERS/PRODUCTS/CUSTOMERS/INVENTORY: own + admin
DO $$ 
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['orders','products','customers','inventory','creative_assets','automation_configs']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "%s_own" ON public.%s', t, t);
    EXECUTE format('CREATE POLICY "%s_own" ON public.%s FOR ALL USING (auth.uid() = user_id)', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "%s_admin" ON public.%s', t, t);
    EXECUTE format('CREATE POLICY "%s_admin" ON public.%s FOR ALL USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true))', t, t);
  END LOOP;
END $$;

-- DELIVERY ZONES: public read
DROP POLICY IF EXISTS "zones_public_read" ON public.delivery_zones;
CREATE POLICY "zones_public_read" ON public.delivery_zones FOR SELECT USING (true);
DROP POLICY IF EXISTS "zones_admin" ON public.delivery_zones;
CREATE POLICY "zones_admin" ON public.delivery_zones FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- REVIEWS: approved = public; own = self; all = admin
CREATE POLICY "reviews_approved_read" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "reviews_own_insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_own_select" ON public.reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reviews_admin" ON public.reviews FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- PARTNERS: public read (active only)
CREATE POLICY "partners_active_read" ON public.partners FOR SELECT USING (true);
CREATE POLICY "partners_admin" ON public.partners FOR ALL
  USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- ═══════════════════════════════════════════════════════════
-- TRIGGERS & FUNCTIONS
-- ═══════════════════════════════════════════════════════════

-- Auto-create profile on signup + assign 14-day trial
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  starter_plan_id UUID;
BEGIN
  INSERT INTO public.profiles (id, email, full_name, business_name, phone)
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)),
    COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  ) ON CONFLICT (id) DO NOTHING;

  SELECT id INTO starter_plan_id FROM public.plans WHERE slug = 'starter' LIMIT 1;

  INSERT INTO public.subscriptions (user_id, plan_id, status, expires_at, payment_confirmed)
  VALUES (NEW.id, starter_plan_id, 'trial', NOW() + INTERVAL '14 days', true)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_upd BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER subscriptions_upd BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER orders_upd BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER products_upd BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER customers_upd BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER inventory_upd BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- GRANT ADMIN ACCESS (run AFTER creating your admin account)
-- Replace email with your real admin email
-- ═══════════════════════════════════════════════════════════
-- UPDATE public.profiles
-- SET is_admin = true, role = 'super_admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'YOUR_ADMIN_EMAIL@gmail.com');
```

---

## SECTION 4: ENVIRONMENT VARIABLES

Create `.env.local` in the project root with these variables:

```env
# ── Supabase ──────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# ── App ───────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=EcoMate

# ── Google OAuth ──────────────────────────────────────────
# Get from: console.cloud.google.com → Credentials → OAuth 2.0
# Authorized redirect URI: https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# ── Meta (Facebook/Instagram) OAuth ──────────────────────
# Get from: developers.facebook.com → App Dashboard
# Redirect URI: http://localhost:3000/api/auth/callback/meta
NEXT_PUBLIC_META_APP_ID=YOUR_META_APP_ID
META_APP_SECRET=YOUR_META_APP_SECRET
META_WEBHOOK_VERIFY_TOKEN=ecomate_meta_webhook_2025_secure

# ── Chargily Pay ──────────────────────────────────────────
# Get from: chargily.com/developers
CHARGILY_API_KEY=YOUR_CHARGILY_API_KEY
CHARGILY_API_SECRET=YOUR_CHARGILY_WEBHOOK_SECRET
NEXT_PUBLIC_CHARGILY_MODE=test  # test | live

# ── Make.com / n8n Webhooks ───────────────────────────────
MAKE_WEBHOOK_SECRET=ecomate_make_secret_2025
# These are your Master Make.com webhook URLs (not per-client)
MAKE_ORDER_WEBHOOK=https://hook.eu1.make.com/YOUR_ORDER_SCENARIO_ID
MAKE_TRACKING_WEBHOOK=https://hook.eu1.make.com/YOUR_TRACKING_SCENARIO_ID

# ── Encryption (for storing social tokens) ───────────────
# Generate with: openssl rand -hex 32
TOKEN_ENCRYPTION_KEY=YOUR_32_BYTE_HEX_KEY_HERE
```

**Supabase Dashboard Setup:**
1. Authentication → Providers → Google: Enable, add Client ID + Secret
2. Authentication → URL Configuration:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`
3. Authentication → Email Templates: Set "EcoMate" as sender name

---

## SECTION 5: PROJECT FILE STRUCTURE

```
ecomate/
├── src/
│   ├── app/
│   │   ├── [locale]/                  # next-intl locale wrapper
│   │   │   ├── layout.tsx             # Root layout with ThemeProvider
│   │   │   ├── page.tsx               # Landing page (/)
│   │   │   ├── auth/
│   │   │   │   ├── callback/route.ts  # Supabase OAuth callback
│   │   │   │   └── page.tsx           # /auth — modal trigger redirect
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx           # Plan selection & payment
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx         # Dashboard shell (sidebar + topbar)
│   │   │   │   ├── page.tsx           # Overview / Analytics
│   │   │   │   ├── orders/page.tsx    # Kanban order board
│   │   │   │   ├── products/page.tsx  # Product catalog CRUD
│   │   │   │   ├── customers/page.tsx # CRM table
│   │   │   │   ├── analytics/page.tsx # Revenue & conversion charts
│   │   │   │   ├── ai-chatbot/page.tsx# Bot config & sync
│   │   │   │   ├── delivery/page.tsx  # Tracking & EcoTrack
│   │   │   │   ├── fulfillment/page.tsx# Warehouse inventory
│   │   │   │   ├── creative/page.tsx  # Google Drive iframe creative assets
│   │   │   │   ├── integrations/page.tsx # Social OAuth connections
│   │   │   │   └── settings/page.tsx  # Profile, password, plan
│   │   │   └── admin/                 # 🟣 PURPLE ADMIN ZONE
│   │   │       ├── layout.tsx         # Admin shell (purple sidebar)
│   │   │       ├── page.tsx           # Admin dashboard overview
│   │   │       ├── clients/page.tsx   # All clients table
│   │   │       ├── integrations/page.tsx # Client token manager
│   │   │       ├── subscriptions/page.tsx
│   │   │       ├── orders/page.tsx    # All orders across all clients
│   │   │       ├── fulfillment/page.tsx # Agency warehouse ops
│   │   │       ├── reviews/page.tsx   # Approve/reject reviews
│   │   │       ├── partners/page.tsx  # Landing page partners CRUD
│   │   │       ├── plans/page.tsx     # Plan management
│   │   │       ├── automation/page.tsx # Make.com scenario mappings
│   │   │       └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── callback/route.ts  # Google OAuth callback
│   │       │   └── meta/
│   │       │       ├── connect/route.ts   # Initiate Meta OAuth
│   │       │       └── callback/route.ts  # Handle Meta OAuth code exchange
│   │       ├── webhooks/
│   │       │   ├── make/route.ts      # Receive Make.com order webhooks
│   │       │   ├── meta/route.ts      # Meta Webhook verification + events
│   │       │   └── chargily/route.ts  # Payment confirmation webhooks
│   │       ├── delivery/
│   │       │   └── fee/route.ts       # Calculate delivery fee by wilaya
│   │       └── admin/
│   │           └── sync-chatbot/route.ts # Admin: sync product to ManyChat
│   │
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Nav.tsx                # Navbar (AR/EN toggle + theme toggle + auth modal)
│   │   │   ├── Hero.tsx               # Hero section + Three.js canvas
│   │   │   ├── Services.tsx           # 6 Service bento cards
│   │   │   ├── Integrations.tsx       # Social platform pills
│   │   │   ├── Partners.tsx           # Scrolling partner marquee (from DB)
│   │   │   ├── HowItWorks.tsx         # 4-step process
│   │   │   ├── DashboardPreview.tsx   # Mockup dashboard screenshot
│   │   │   ├── AIPreview.tsx          # Chat widget preview
│   │   │   ├── Pricing.tsx            # 3-tab pricing grid
│   │   │   ├── Reviews.tsx            # Testimonials (from DB)
│   │   │   ├── CTA.tsx                # Dark gradient CTA section
│   │   │   └── Footer.tsx
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx          # Full auth modal (sign in / sign up / forgot / OTP)
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── OTPForm.tsx
│   │   │   └── GoogleButton.tsx       # "Continue with Google" button
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx            # Collapsible sidebar with plan-aware menu
│   │   │   ├── TopBar.tsx             # Search + notifications + user menu
│   │   │   ├── StatCard.tsx           # Revenue/orders stat card
│   │   │   ├── OrderKanban.tsx        # DnD Kanban board
│   │   │   ├── OrderCard.tsx          # Kanban card component
│   │   │   ├── ProductForm.tsx        # Add/edit product modal
│   │   │   ├── DeliveryFeeTable.tsx   # 58 wilayas delivery fee editor
│   │   │   ├── SocialConnectCard.tsx  # Meta OAuth connect button
│   │   │   ├── CreativeIframe.tsx     # Google Drive folder iframe
│   │   │   └── UpgradeBanner.tsx      # "Upgrade to Growth" paywall
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx       # Purple sidebar
│   │   │   ├── ClientRow.tsx          # Client table row + token status
│   │   │   ├── TokenManager.tsx       # View/copy/revoke social tokens
│   │   │   ├── AutomationMapper.tsx   # Map client → Make.com scenario
│   │   │   └── WarehouseTable.tsx     # Cross-client inventory view
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Badge.tsx
│   │       ├── Toast.tsx
│   │       ├── ScrollReveal.tsx       # Intersection Observer wrapper
│   │       ├── ThemeToggle.tsx        # Dark/light toggle button
│   │       ├── LocaleToggle.tsx       # AR/EN toggle button
│   │       └── GlowCard.tsx           # Glassmorphism card with mouse glow
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Browser client
│   │   │   └── server.ts             # Server client (MUST await cookies())
│   │   ├── actions/
│   │   │   ├── auth.ts                # signIn, signUp, signOut server actions
│   │   │   ├── orders.ts              # CRUD order actions
│   │   │   ├── products.ts            # CRUD product actions
│   │   │   ├── integrations.ts        # Social OAuth server actions
│   │   │   └── admin.ts               # Admin-only actions
│   │   ├── utils/
│   │   │   ├── delivery.ts            # Calculate delivery fees
│   │   │   ├── encryption.ts          # Encrypt/decrypt social tokens
│   │   │   ├── chargily.ts            # Chargily Pay API wrapper
│   │   │   └── format.ts              # formatDA, formatDate, etc.
│   │   └── types/
│   │       └── database.types.ts      # Generated Supabase types
│   │
│   ├── i18n/
│   │   ├── request.ts                 # CRITICAL: default export, absolute path
│   │   └── routing.ts                 # locales, defaultLocale config
│   │
│   └── messages/
│       ├── en.json                    # English translations
│       └── ar.json                    # Arabic translations
│
├── proxy.ts                           # Route protection (NOT middleware.ts)
├── next.config.mjs                    # Uses path.resolve for i18n absolute path
├── tailwind.config.ts
├── .env.local
└── package.json
```

---

## SECTION 6: CRITICAL FILE IMPLEMENTATIONS

### 6.1 `src/i18n/request.ts` (CRITICAL — prevents Vercel 500 errors)
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

### 6.2 `next.config.mjs` (CRITICAL — absolute path prevents trace errors)
```javascript
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin(
  path.resolve(__dirname, './src/i18n/request.ts')
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dkoxruaonaedhqixgbud.supabase.co'],
  },
};

export default withNextIntl(nextConfig);
```

### 6.3 `src/lib/supabase/server.ts` (CRITICAL — Next.js 15 async cookies)
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies(); // MUST be awaited in Next.js 15

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* Server Component — ignore */ }
        },
      },
    }
  );
}

export async function createAdminClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* ignore */ }
        },
      },
    }
  );
}
```

### 6.4 `proxy.ts` (route protection)
```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const localeMatch = path.match(/^\/(en|fr|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'fr';
  const cleanPath = localeMatch ? path.replace(`/${locale}`, '') || '/' : path;

  // Protect /dashboard
  if (cleanPath.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL(`/${locale}/auth?modal=signin`, request.url));
  }

  // Protect /admin
  if (cleanPath.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL(`/${locale}/auth?modal=signin`, request.url));
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

---

## SECTION 7: FEATURE SPECIFICATIONS

### 7.1 Landing Page
Build every section using the CSS tokens from Section 2. Reference the HTML blueprint for exact layout. Key sections:

- **Navbar:** Logo + navigation links + AR/EN toggle + dark/light toggle + "Sign In" ghost button + "Try It Now" primary button. Sticky with blur backdrop. Scrolled state adds shadow.
- **Hero:** Left side text + Three.js interconnected orbs on right (7 nodes = 7 services, connected lines). Floating stat cards (revenue, order #, AI response rate).
- **Integration Ticker:** Three columns — Social Platforms (FB/IG/WA/Telegram/Snap) | Delivery Network (58 wilayas, COD) | Business Tools (Sheets/Drive/Excel/PDF). Pills with colored dots.
- **Partners Marquee:** Dual-row infinite scroll. Row 1 scrolls left, Row 2 scrolls right. Data from Supabase `partners` table. SOON shimmer effect on pending partners.
- **Services Bento (6 cards using exact emoji-only design):**
  1. 🤖 AI Sales Chatbot (multilingual Arabic/French/English demo chat)
  2. 🚚 EcoTrack Logistics (Yalidine integration, auto-tracking, 58 wilayas)
  3. 💳 ePayment Integration (CIB + Edahabia via Chargily)
  4. 📦 Ecomate Fulfillment (Warehousing → Packaging → Dispatch pipeline)
  5. 🎬 Creative Studio (TikTok/Reels content production)
  6. 💻 Web Development (landing pages + full e-commerce sites)
- **How It Works:** 4 steps with connecting line animation
- **Dashboard Preview:** Exact replica of the dashboard mockup (stat cards + Kanban preview + chart)
- **AI Preview:** Animated chat widget showing Arabic → product catalog → order confirmation flow
- **Pricing (3-Tab Toggle):**
  - Tab 1: SaaS Plans (Starter/Growth/Business)
  - Tab 2: One-Time Services (Web Dev, ePayment setup, Fulfillment per-order)
  - Tab 3: Creative Studio (4/8/12 videos/month packages)
- **Reviews:** Star ratings pulled from `reviews` table where `is_approved = true`
- **CTA:** Dark gradient section (always dark regardless of theme)
- **Footer:** Always dark

### 7.2 Auth System
- Full auth modal triggered by Navbar buttons AND `?modal=signin` URL param
- Left panel: EcoMate branding + feature list + badge
- Right panel: 5 panels (Sign In → Sign Up → Forgot → OTP → Success)
- **MUST HAVE:** "Continue with Google" OAuth button (prominent, above email/password)
- "Continue with Facebook" OAuth button
- OTP verification with 6 individual digit inputs (auto-advance, backspace, paste support)
- Password strength meter (3 bars: weak/good/strong)
- Terms of service checkbox

### 7.3 Client Dashboard
Build with Framer Motion page transitions and a collapsible sidebar:

**Sidebar items (with plan-aware locking):**
- 📊 Dashboard (all plans)
- 📦 Orders (all plans)
- 🛍️ Products (all plans)
- 👥 Customers **[Growth+]**
- 🤖 AI Chatbot **[Growth+]**
- 📊 Analytics **[Growth+]**
- 🚚 Delivery / EcoTrack (all plans)
- 📦 Fulfillment **[Growth+]**
- 🎬 Creative Assets **[Creative plan]**
- 🔗 Integrations (all plans)
- ⚙️ Settings (all plans)

**Locked items** show an `UpgradeBanner` component with plan name and "Upgrade" CTA.

**Orders Kanban:** 8 columns: Pending → Confirmed → Packaging → Dispatched → In Delivery → Delivered → Returned → Cancelled. Use `@dnd-kit` for drag-and-drop. Each card shows: order number, customer name, wilaya, total DA, source platform emoji, AI-confirmed badge.

**Products:** Table with inline edit. Each product has a "Sync to Chatbot" button (calls `/api/admin/sync-chatbot` which triggers a Make.com webhook). Product variants editor (sizes + colors as tag inputs).

**Delivery Fee Editor:** Table of all 58 wilayas showing home/office/express fees. Editable per-merchant override. Uses data from `delivery_zones` table.

**Creative Assets:** Google Drive folder embedded as iframe using the `drive_url` from `creative_assets` table. If no assets yet, show a friendly placeholder: "🎬 Your first videos are being created. Check back soon!"

**Integrations:** Cards for each platform (Facebook, Instagram, WhatsApp, Telegram, TikTok). Each card shows connection status (green dot = connected, grey = not connected). "Connect" button initiates OAuth. Critically: users NEVER see tokens — only platform name, account name, and connected status.

### 7.4 Meta OAuth Flow (White-Labeled)

```
Client clicks "Connect Facebook Page"
   ↓
/api/auth/meta/connect
   → Redirect to: https://www.facebook.com/v19.0/dialog/oauth
     ?client_id={META_APP_ID}
     &redirect_uri={APP_URL}/api/auth/callback/meta
     &scope=pages_manage_posts,pages_messaging,instagram_basic,instagram_manage_messages,whatsapp_business_messaging
     &state={user_id}_{csrf_token}
   ↓
User approves permissions on Facebook
   ↓
/api/auth/callback/meta
   → Exchange `code` for short-lived token
   → Exchange for long-lived token (60 days)
   → Get page list + page access tokens
   → Store in `social_integrations` table (encrypted)
   → Redirect to /dashboard/integrations?success=true
   ↓
Admin Console → Integrations Manager
   → Admin sees all client tokens
   → Admin copies page_access_token
   → Admin pastes into ManyChat/Make.com for this client's flows
   → Admin sets webhook_url + manychat_flow_id in DB
```

### 7.5 Make.com Webhook Integration

**Inbound webhook** (Make.com → EcoMate):
`POST /api/webhooks/make`
```json
{
  "event": "order_created",
  "user_id": "uuid-of-merchant",
  "scenario_id": "make-scenario-id",
  "data": {
    "customer_name": "Ahmed Yassine",
    "customer_phone": "0555123456",
    "customer_wilaya": "Bouira",
    "products": [{"name": "Black Hoodie L", "quantity": 1, "price": 3500}],
    "total": 4100,
    "source": "instagram"
  }
}
```

The API route verifies `MAKE_WEBHOOK_SECRET`, then inserts into `orders` table with `ai_confirmed: true`, fires `automation_configs` trigger count update.

**Outbound webhook** (EcoMate → Make.com):
When admin/client confirms an order status change, send to `automation_configs.webhook_url` for that merchant and scenario.

### 7.6 Chargily Payment Flow

```
Client selects Growth plan (4,900 DA)
   ↓
POST /api/checkout/create
   → Create Chargily checkout session
   → Store checkout_id in subscriptions table
   → Redirect to Chargily payment page
   ↓
Chargily POST /api/webhooks/chargily
   → Verify HMAC signature
   → Update subscription: status='active', payment_confirmed=true
   → Send welcome email via Supabase Edge Function
```

### 7.7 Admin Console (Purple Theme)

All admin pages use `--admin-accent: #7c3aed` as the primary color instead of blue.

**Client Integrations Manager (most important admin feature):**
- Table: Client name | Business | Plan | Facebook ✅/❌ | Instagram ✅/❌ | WhatsApp ✅/❌ | Last Sync
- Clicking a client row expands to show all their tokens with:
  - Platform accounts connected
  - Copy token button (admin can paste to ManyChat)
  - "Set Webhook URL" field (admin enters their Make.com webhook)
  - "Map to ManyChat Flow ID" field
  - Token expiry countdown
  - "Force Refresh Token" button

**Automation Mapper:**
- Drag-and-drop to assign Make.com scenarios to clients
- Visual pipeline diagram showing: Client → Social Account → Ecomate Webhook → Make.com Scenario → Order Created

---

## SECTION 8: i18n TRANSLATIONS

### `src/messages/en.json` (key structure)
```json
{
  "nav": {
    "features": "Features",
    "pricing": "Pricing",
    "how": "How It Works",
    "signIn": "Sign In",
    "tryNow": "Try It Now →"
  },
  "hero": {
    "badge": "All-in-One Agency Platform for Algerian E-Commerce",
    "line1": "Grow your",
    "line2": "Business",
    "line3": "without the complexity.",
    "sub": "EcoMate centralizes every tool Algerian SMEs need — AI chatbot automation, order management, fulfillment, and creative production. Real people, real results."
  },
  "dashboard": { "...": "..." },
  "auth": { "signIn": "Sign In", "signUp": "Create Account", "google": "Continue with Google" },
  "plans": { "monthly": "Monthly", "oneTime": "One-Time", "creative": "Creative Studio" }
}
```

### `src/messages/ar.json` (Arabic — RTL)
```json
{
  "nav": {
    "features": "الميزات",
    "pricing": "الأسعار",
    "how": "كيف يعمل",
    "signIn": "تسجيل الدخول",
    "tryNow": "جرّبه الآن ←"
  },
  "hero": {
    "badge": "منصة الوكالة الشاملة للتجارة الإلكترونية الجزائرية",
    "line1": "طوّر",
    "line2": "تجارتك",
    "line3": "بدون تعقيد.",
    "sub": "EcoMate يجمع كل الأدوات التي يحتاجها رواد الأعمال الجزائريون — أتمتة الدردشة الآلية، إدارة الطلبات، التسليم، والإنتاج الإبداعي."
  }
}
```

---

## SECTION 9: TAILWIND CONFIG

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#1E3A8A', light: '#2563EB' },
        accent:    { DEFAULT: '#10B981', light: '#34d399' },
        admin:     { DEFAULT: '#7C3AED', light: '#a78bfa' },
        dark:      { DEFAULT: '#07101f', section: '#0a1628' },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'blink':      'blink 2s infinite',
        'scan':       'scan 2.5s ease-in-out infinite',
        'float-1':    'float1 5s ease-in-out infinite',
        'float-2':    'float2 6.5s ease-in-out infinite',
        'scroll-l':   'scrollLeft 36s linear infinite',
        'scroll-r':   'scrollRight 42s linear infinite',
      },
      keyframes: {
        fadeUp:     { from: { opacity: '0', transform: 'translateY(32px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        scan:       { '0%,100%': { width: '0%', opacity: '1' }, '50%': { width: '90%' }, '100%': { opacity: '0' } },
        float1:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        float2:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(12px)' } },
        scrollLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        scrollRight:{ '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
      backdropBlur: { xl: '24px' },
    },
  },
  plugins: [],
};

export default config;
```

---

## SECTION 10: EXECUTION PHASES

### PHASE 0 — Scaffolding & Database (START HERE)
**Output:** Install commands + full schema.sql + .env.local template
- Run `npx create-next-app` command
- Run `npm install` command
- Provide complete schema.sql (above)
- Provide .env.local template
- Provide `src/i18n/request.ts`, `next.config.mjs`, `src/lib/supabase/server.ts`, `src/lib/supabase/client.ts`, `proxy.ts`
**Checkpoint:** Confirm `npm run dev` runs without TypeScript errors.

### PHASE 1 — Design System & Global Layout
**Output:** `globals.css`, `tailwind.config.ts`, `ThemeToggle.tsx`, `LocaleToggle.tsx`, `src/i18n/routing.ts`, messages JSON files, root `[locale]/layout.tsx`
**Checkpoint:** Dark/light toggle works. AR/EN toggle switches layout direction (RTL on Arabic).

### PHASE 2 — Landing Page (Full)
**Output:** All landing page components (Nav, Hero with Three.js, Services Bento, Partners Marquee, Pricing 3-tab, CTA, Footer)
**Checkpoint:** Landing page fully renders. Scroll reveal works. Three.js orbs animate. Partners scroll. Theme and locale toggles work everywhere.

### PHASE 3 — Auth System
**Output:** AuthModal with all 5 panels, Google OAuth setup, Supabase auth server actions, `/auth/callback/route.ts`
**Checkpoint:** Can sign up, sign in, sign out. Google OAuth redirects correctly. Protected routes redirect to auth.

### PHASE 4 — Client Dashboard Shell
**Output:** Dashboard layout with sidebar, `page.tsx` overview with stat cards and recharts charts, OrderKanban with DnD
**Checkpoint:** Dashboard loads after auth. Sidebar navigation works. Kanban columns render.

### PHASE 5 — Dashboard Feature Pages
**Output:** Products CRUD, Customers CRM, Delivery fee editor (58 wilayas), Creative Assets iframe, Settings page
**Checkpoint:** All pages render. CRUD operations work. Delivery zone table shows all 58 wilayas.

### PHASE 6 — Social Integrations
**Output:** `/dashboard/integrations` page, Meta OAuth API routes, token storage, `SocialConnectCard` component
**Checkpoint:** Meta OAuth flow initiates. Token is stored (encrypted) in DB. Status card shows "Connected".

### PHASE 7 — Admin Console
**Output:** Purple `/admin` shell, all admin pages, `TokenManager`, `AutomationMapper`, `ClientRow`
**Checkpoint:** Admin login works (is_admin gate). Can see all clients. Can view/copy tokens. Automation mapper renders.

### PHASE 8 — Webhooks & Automation
**Output:** Make.com webhook receiver, Meta webhook verifier, Chargily payment webhook, Checkout page with Chargily integration
**Checkpoint:** Test webhook endpoint with Postman. Chargily test payment creates subscription record.

### PHASE 9 — Checkout & Pricing
**Output:** Full checkout page with 3-tab pricing, plan selection, payment flow for all plan types
**Checkpoint:** Can select a plan, fill checkout form, initiate Chargily payment.

### PHASE 10 — Polish, i18n, Deployment
**Output:** Complete Arabic translations, RTL CSS fixes, Vercel config, production environment variables, README
**Checkpoint:** Deploy to Vercel. All routes work. Arabic RTL renders perfectly.

---

## YOUR FIRST TASK (PHASE 0)

Do NOT write any UI code. Start with:

1. The exact `npx create-next-app` command with all flags
2. The exact `npm install` command for all dependencies
3. The complete `schema.sql` as shown in Section 3 (copy verbatim)
4. The `.env.local` template from Section 4
5. These 5 critical files:
   - `src/i18n/request.ts`
   - `next.config.mjs`
   - `src/lib/supabase/server.ts`
   - `src/lib/supabase/client.ts`
   - `proxy.ts`

After writing Phase 0, stop completely and write:

> ✅ PHASE 0 COMPLETE — Run `npm run dev` and confirm there are no TypeScript build errors. Check that `http://localhost:3000` loads (even if blank). Run the schema.sql in your Supabase SQL Editor. Then reply `PHASE 0 CONFIRMED` to begin Phase 1.

Do you understand the full scope of EcoMate v2.0? Confirm by summarizing the key architectural decisions and the white-labeled social integration approach, then begin Phase 0.

---

## APPENDIX: EXISTING HTML BLUEPRINTS

The following HTML files exist as pixel-perfect design references. DO NOT generate new designs — extract and replicate these exactly:

- `ui_html.html` — Landing page (Hero, Services Bento, Dashboard Preview, AI Preview, Pricing, Partners, Integrations bar, CTA, Footer, AuthModal)
- `auth.html` — Standalone auth page (same panels as modal but full-page layout)
- `settings.html` — Settings page (Profile, Security, Subscription, Review, Danger Zone tabs)
- `checkout.html` — Plan selection + checkout form (3 plan cards + checkout box with Wilaya selector)
- `em-admin-x9k7.html` — Admin console (purple theme, Dashboard, Reviews, Partners, Clients, Subscriptions, Logs)

When building any component, reference these HTML files for:
- Exact class names and CSS patterns
- Exact emoji choices and label text
- Exact color values and opacity levels
- Exact animation timing and keyframe definitions
- Exact wilaya list (58 entries) for the checkout select

---

*EcoMate v2.0 — Built at the Incubateur de l'Université de Bouira 🇩🇿 | Founder: Abdelbadie Kertimi*
