

# Job-A-Gotchi 🐱 Implementation Plan

## Overview
A Tamagotchi-inspired job application tracker where a pixel-art cat evolves based on your job search activity. Multi-user with authentication via Supabase.

---

## 1. Authentication
- **Sign up / Login page** with email & password
- User profiles table auto-created on signup
- Protected routes — redirect to login if not authenticated
- Password reset flow included

## 2. Database (Supabase)
- **profiles** table: `id`, `user_id`, `display_name`, `created_at`
- **jobs** table: `id`, `user_id`, `company`, `job_title`, `status` (Applied/Screen/Interview/Offer/Rejected), `date_applied`, `points_contributed`, `created_at`
- **user_roles** table for secure role management
- RLS policies so each user only sees their own data

## 3. Dashboard (Main Screen)
- **PetDisplay component** — the star of the show:
  - CSS/SVG pixel-art black cat rendered in a retro Game Boy-style frame (inspired by your reference image)
  - **3 evolution stages** based on total applications:
    - 🥚 **Egg** (0–5 apps) — simple egg sprite
    - 🟢 **Intern Blob** (6–15 apps) — small cat, curious expression
    - 🔵 **Junior Associate** (16+ apps) — confident cat with sparkles
  - **Hunger bar** (green → red) — fills when you add jobs, decays over time
  - **Career Growth bar** (blue) — increases when you advance job statuses
  - **Sad/hungry state** — if no jobs added for 3+ days, cat looks sad with red hunger bar
- **"Quick Add" button** opens the AddJobModal
- Dark mode toggle in the header

## 4. Job Tracker View
- **JobTable component** — sortable list of all applications
  - Columns: Company Name, Job Title, Date Applied, Status
  - **Status dropdown** inline — changing status triggers career growth points + pet animation
  - Delete option for removing entries

## 5. AddJobModal
- Modal form with fields: Company Name, Job Title, Status (defaults to "Applied")
- On submit: saves to Supabase, increments hunger bar, triggers happy pet animation

## 6. Pet Mechanics (Client-side Logic)
- **Hunger decay**: `useEffect` checks `last job added timestamp` — if >72 hours, pet enters "starving" state
- **Evolution**: Calculated from total job count, swaps the cat SVG/CSS
- **Career Growth**: Each status upgrade contributes points (Applied→Screen = 5pts, Screen→Interview = 10pts, etc.)

## 7. UI & Styling
- Playful, pixel-art inspired design with Tailwind CSS
- Dark/light mode via `next-themes`
- Retro Game Boy frame around the pet display (CSS recreation of reference image)
- Navigation between Dashboard and Job Tracker views
- Responsive design for mobile and desktop

