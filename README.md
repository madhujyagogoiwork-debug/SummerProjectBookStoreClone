# BookVerse - Premium AI-Powered Smart Digital Bookstore

BookVerse is a world-class, high-fidelity digital bookstore marketplace featuring modular state-management, glassmorphic design highlights, a premium cherry/blossom-pink color palette, advanced micro-animations, and AI-powered book recommendations.

## 🛠️ Technology Stack
- **Frontend Core**: React 19 (TypeScript)
- **Tooling**: Vite (Ultra-fast build and bundling)
- **Styling**: Tailwind CSS v4 (Harmonious pastel blue and cherry pink system)
- **Database Schema**: Prisma ORM with MongoDB model structure
- **Deployments**: Vercel & SPA routing rewrite rules configured

---

## 📂 Complete Folder Hierarchy
```text
BookVerse/
├── db/                       # Database specifications & Schemas
│   └── schema.prisma         # Prisma MongoDB schema declarations
├── public/                   # Static icons & vectors
├── src/
│   ├── api/
│   │   └── routes.ts         # Mock backend route endpoints & type safety
│   ├── components/
│   │   ├── Header.tsx        # Glassmorphic header with sun/moon theme transition
│   │   ├── Footer.tsx        # Styled editorial links footer
│   │   ├── BottomNav.tsx     # Responsive bottom navigation bar
│   │   ├── HomeScreen.tsx    # Hero banners, recommendations, new releases grid
│   │   ├── BrowseScreen.tsx  # Product catalog, filter chips, skeletons, search debounce
│   │   ├── CartScreen.tsx    # Checkout progress stepper, billing details mask, promo sums
│   │   ├── ProfileScreen.tsx # Streams tracker, streaks dashboard, accomplishments log
│   │   ├── AdminDashboard.tsx# Live inventory manager, metrics panel, new book creator
│   │   ├── AIChatbot.tsx     # Floating chatbot recommendations and book summaries
│   │   └── ErrorBoundary.tsx # Crash recovery card preventing white-screen freezes
│   ├── App.tsx               # State coordinator (localStorage sync, notification toast systems)
│   ├── main.tsx              # Mount client node
│   ├── data.ts               # Seed catalog mockups, book structures, user records
│   ├── types.ts              # Type declarations & schema interfaces
│   └── index.css             # HSL theme declarations, 3D card rotations, keyframe drawings
├── tsconfig.json             # TypeScript compiler parameters
├── vite.config.ts            # Vite compile plugins configuration
├── vercel.json               # SPA routing rewrite rules for deployment
└── package.json              # App dependency lists
```

---

## 🚀 Key Features

### 1. Advanced Animation Architecture
- **Pulsing Skeletons & Shimmer**: Integrated shimmer gradients (`animate-shimmer`) to load catalog placeholders smoothly instead of layout pops.
- **Micro-Interactions**: Bouncy heart pops (`animate-heart-pop`) on wishlisting and cart bumps (`animate-badge-bump`) on checkout totals.
- **Theme Transitions**: Spinning Sun/Moon transitions when switching from Light to Dark mode.

### 2. AI Recommendation Copilot
- Floating glassmorphic AI chat widget.
- Interactive question-and-answer interface that recommends items in real-time, displays live buy-now cards, and creates custom reading lists.

### 3. Bookstore Admin Dashboard
- Metrics tracking cards (Gross revenues, catalog sizes, active users).
- Live catalog creator allowing administrators to append new books, select categories, format types, and cover URLs, reflecting updates globally in the app state.

### 4. Vercel SPA Routing Configuration
- Custom `vercel.json` rewrite routing ensuring direct links to secondary paths are dynamically resolved to `index.html`, eliminating the common Vercel empty root crash.

---

## 💻 Local Setup & Execution

### 1. Prerequisites
Ensure you have **Node.js** installed on your system.

### 2. Installation
Clone the repository and install all node packages:
```bash
npm install
```

### 3. Environment Variables
Add your Gemini Key inside your environment setup:
```env
GEMINI_API_KEY="your_api_key_here"
```

### 4. Running the Dev Server
Launch Vite development server:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 5. Build for Production
To bundle and compile optimized files for static hostings (Vercel, Netlify):
```bash
npm run build
```
The compiled output will compile inside the `/dist` directory.
