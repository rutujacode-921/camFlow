# 🌊 CamFlow — Influencer Marketing Ecosystem

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern full-stack MERN application engineered to fix the structural friction points in influencer marketing. CamFlow eliminates fake influencers and ghosting for brands, while protecting creators against delayed payments and content theft.

---

## ✨ Features & Innovation

### 1. 🎯 AI-Powered "Match Score" Algorithm
- Computes real-time compatibility (0–100%) between brand campaign briefs and creator profiles.
- Evaluates 4 weighted pillars: Niche tag overlap, category taxonomy fit, target audience demographic intersection, and audience authenticity.

### 2. 🛡️ Escrow-Lite Milestone Payment Tracker
- A visual Finite State Machine (FSM) where campaign budgets are locked into a simulated smart escrow upon contract agreement.
- Funds disburse to the creator's wallet automatically when milestones (*Moodboard Approved* &rarr; *Draft Review* &rarr; *Live Reel Posted*) are verified.

### 3. 🔒 Content Watermarking & Secure Media Vault
- Draft videos and high-res photos are automatically overlaid with dynamic, timestamped watermarks during brand review.
- High-resolution unwatermarked 4K master files unlock immediately once the brand approves the milestone.

### 4. 📊 Automated Demographics & Fake Follower Scanner
- Profiles are scanned for engagement anomalies, comment-to-like variances, and sudden bot follower spikes.
- Generates a verified **Trust Badge (e.g. 98% Authentic Audience)** with demographic insights.

### 5. ⚡ Built-In AI Pitch & Digital Media Kit Generator
- Micro-creators can instantly generate high-converting, professional partnership pitches tailored to brand goals.
- Auto-generates an exportable, digital media kit summarizing verified metrics and package pricing.

---

## 🎨 Editorial Design System (Light Mode)

CamFlow uses a **luxury editorial magazine aesthetic** (no dark mode):
- **Canvas Light**: `#FAFAF8` (Off-white silk finish)
- **Soft Matcha / Sage**: `#EBF3EA` & `#D7E7D5` (Harmonious pastel product cards)
- **Subtle Blush Accent**: `#FDF1F2` & `#E56B6F` (Call to action highlights)
- **Editorial Typography**: Serif headings paired with geometric sans-serif body copy
- **Kinetic Motion**: Rotating SVG stamp badge (`MY PROJECTS • MY PROJECTS • `), GPU-accelerated floating glassmorphism stat chips, and dynamic ticker marquee.

---

## 📁 Repository Structure

```
creator-connector/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIPitchGeneratorModal.jsx    # AI Pitch & Media Kit Generator
│   │   │   ├── BrandDirectory.jsx           # Creator Discovery & AI Match Scoring
│   │   │   ├── CreatorPortfolio.jsx         # 1:1 Editorial Reference Portfolio
│   │   │   ├── EscrowMilestoneTracker.jsx   # Escrow-Lite Milestone Pipeline
│   │   │   ├── FakeFollowerScannerModal.jsx # Bot & Demographic Scanner
│   │   │   ├── FloatingElements.jsx         # Kinetic Motion Pills & Marquee
│   │   │   ├── MatchScoreModal.jsx          # Algorithmic Match Score Breakdown
│   │   │   ├── MediaVaultModal.jsx          # Watermarked Content Vault
│   │   │   ├── Navbar.jsx                   # Navigation & Role Switcher
│   │   │   └── RotatingStamp.jsx            # SVG Circular Spinning Badge
│   │   ├── App.jsx             # Main Application Controller
│   │   ├── index.css           # Tailwind Directives & Custom Shapes
│   │   └── main.jsx            # Application Mount
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend (Node.js + Express REST API)
│   ├── src/
│   │   ├── data/
│   │   │   └── mockStore.js    # Seed Data Store & MongoDB Models
│   │   ├── routes/
│   │   │   ├── ai.js           # Pitch & Media Kit Generation Endpoints
│   │   │   ├── campaigns.js    # Brand Campaign Briefs
│   │   │   ├── creators.js     # Creators & AI Match Algorithm
│   │   │   ├── escrow.js       # Milestone State Machine & Payouts
│   │   │   └── scanner.js      # Demographic & Bot Scanner Audit
│   │   └── index.js            # Express Server Entrypoint
│   └── package.json
├── docs/                       # Private Documentation & Technical Study
│   └── CAMFLOW_MASTER_NOTES.md # Day-by-Day Technical Guide & Interview Mastery
├── scripts/
│   └── start-dev.js            # Concurrent development runner
├── .gitignore                  # Git ignore rules for node_modules and builds
├── package.json                # Monorepo Scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/camflow.git
   cd camflow
   ```

2. **Install all dependencies (both backend and frontend)**:
   ```bash
   npm run install:all
   ```

3. **Start development servers**:
   ```bash
   npm run dev
   ```
   - **Frontend App**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000`

---

## 👩‍💻 Author
- **Rutuja** — Project Creator & Lead Full-Stack Engineer

---

## 📄 License
This project is licensed under the MIT License.
