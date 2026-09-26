# 💪 FitLog — Workout Library

FitLog is a dark-themed gym companion web app built with Next.js. Browse a curated library of twelve lifts, lock them into today's plan, save favourites for later, and watch your weekly stats add up — all in a sleek, no-nonsense interface.

## 🌐 Live Site

[View Live Demo](https://your-deployment-url.vercel.app)

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Framework & routing |
| React 19 | UI rendering |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| DaisyUI 5 | Component library (dark theme) |
| Lucide React | Icon system |
| React Hot Toast | Toast notifications |
| Context API | Global state management |

## ✨ Key Features

1. **Workout Library** — Browse 12 exercises fetched from a REST API, displayed in a responsive 3-column grid with category tags, duration, calories, and rating stats.

2. **Exercise Detail Page** — View full workout breakdowns including equipment, difficulty, sets, reps, and step-by-step instructions in a two-column layout with dynamic metadata.

3. **Plan & Save System** — Add exercises to Today's Plan (capped at 5 lifts) or save them for later. Both lists persist across page reloads using localStorage.

4. **My Plan Dashboard** — Track your session with live stat cards (Exercises, Minutes, Calories), switch between Plan and Saved tabs, sort by Duration/Calories/Rating, and mark workouts as done.

5. **Dark Theme & Responsive Design** — Fully responsive across mobile, tablet, and desktop with a custom dark theme featuring neon green accents, Inter body font, and Oswald display headings.

## 📦 Getting Started

```bash
git clone https://github.com/your-username/fitlog.git
cd fitlog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── exercise/[id]/   # Dynamic detail page
│   ├── my-plan/          # Plan dashboard
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── loading.tsx       # Loading skeleton
│   └── not-found.tsx     # Custom 404
├── components/
│   ├── exerciseDetail/   # Detail page components
│   ├── homepage/         # Hero & Library
│   └── shared/           # Navbar, Footer, WorkoutCard
├── context/
│   └── PlanContext.tsx    # Global state provider
└── types/
    └── workout.type.ts   # TypeScript interfaces
```
