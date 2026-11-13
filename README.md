# Karthavya S (Karthuu) — Personal Portfolio Website

A fast, interactive, and recruiter-optimized portfolio website built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, and **Framer Motion**. Designed for software engineering recruiters, hiring managers, and peer engineers.

---

## 🌟 Key Features

- **Hero Experience:** High-impact typography ("HI, I'M KARTHUU") overlapping a 3D cartoon avatar with smooth cursor parallax and magnetic gradient pill CTA.
- **Projects Showcase:** Case-study cards with 3D tilt effects, category filter chips, and interactive deep-dive modals detailing Problem, Approach, Result, Tech Stack, and Role.
  - Featured Projects: **Unscramble** (IEEE Dyslexia-Friendly Learning Platform), **Airfare Price Index (APIx)**, **LOGIC COURTROOM** (Symbolic AI Game), and **FloodGuard** (Disaster Prediction).
- **Skills Matrix:** Two-row infinite marquee pausing on hover, plus categorized skill cards (Languages, AI/ML, Data & Analytics, Systems & Web, Tools).
- **Experience Timeline:** Vertical animated timeline covering academic history at Rajalakshmi Engineering College (9.0 CGPA), IEEE research, and hackathon innovations.
- **Recruiter Mode:** Toggle in navbar for an instant, clean, single-column ATS resume view with print and download controls (saved in `localStorage`).
- **Command Palette:** Keyboard-accessible spotlight modal on `Ctrl+K` or `⌘K` for instant section jumping, resume downloads, email copy, and feature access.
- **Easter Egg Mini-Terminal:** Integrated retro CLI (commands: `help`, `about`, `projects`, `skills`, `contact`, `sudo`, `clear`, `exit`).
- **Interactive Contact:** Form with client-side validation and Next.js route handler (`/api/contact`), direct email, LinkedIn, and GitHub links.
- **Full SEO & Accessibility:** OpenGraph metadata, Twitter cards, JSON-LD Person schema, WCAG-compliant contrasts, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.17+ or v20+)
- pnpm (`npm install -g pnpm`)

### Setup & Run
```bash
# 1. Clone or navigate to the project directory
cd portfolio

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev

# 4. Open http://localhost:3000 in your browser
```

### Production Build
```bash
# Build optimized static production bundle
pnpm run build

# Preview production build locally
pnpm start
```

---

## 📝 Content & Asset Customization

### 1. Editing Profile & Project Content
All text content is cleanly separated from UI components:
- Master text spec: [`content.md`](./content.md)
- Structured data file: [`src/data/portfolio.ts`](./src/data/portfolio.ts)

To change project details, add metrics, or update links:
1. Open [`src/data/portfolio.ts`](./src/data/portfolio.ts).
2. Edit the corresponding entry under `projects`, `personal`, or `skillGroups`.
3. Save the file — Next.js will hot-reload automatically.

### 2. Updating Resume & Avatar Assets
All static files are stored in [`/public`](./public/):
- **Resume:** Replace `public/resume.pdf` with your updated ATS resume.
- **Avatar:** Replace `public/avatar.png` with any transparent-background 3D cartoon or photo. Recommended resolution: 800×800 to 1024×1024 px.

---

## 🌐 Deploying to Vercel

### Option A: Via GitHub (Recommended)
1. Initialize a remote GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/KarthavyaS/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
3. Click **"Add New Project"** and select your `portfolio` repository.
4. Leave build settings as default:
   - Framework Preset: `Next.js`
   - Build Command: `pnpm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**. Vercel will build and assign you a live production URL (`https://your-portfolio.vercel.app`).

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy directly from terminal
vercel
```

### Connecting a Custom Domain
1. In your Vercel project dashboard, navigate to **Settings > Domains**.
2. Enter your custom domain (e.g., `karthavya.dev` or `karthuu.tech`).
3. Follow the DNS instructions provided by Vercel to configure `CNAME` or `A` records at your domain registrar.

---

## 📄 License
MIT © 2026 Karthavya S (Karthuu).
