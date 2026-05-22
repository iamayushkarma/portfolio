Ayush Karma - Portfolio

Personal portfolio website built from scratch to showcase my projects, skills, and experience as a frontend developer.

Live: [ayushkarma.vercel.app](https://ayushkarma.vercel.app)
---

Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Motion (animations)
- React Router DOM
- Lucide React + React Icons

---

Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, MainLayout
│   └── ui/            # Button, Ticker, ResumeModal, CodingStats
├── sections/          # HeroSection, AboutSection, SkillsSection,
│                      # ProjectSection, Experience, ContactSection
├── pages/             # HomePage, NotFound
├── data/              # Static data for projects, skills, experience, etc.
├── lib/               # GitHub & LeetCode API fetchers
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

---

Sections

- Hero - Introduction with animated entry
- About - Background and a brief overview
- Skills - Visual skill bubbles across 23+ technologies
- Projects - Showcase of 6 projects with tags, stats, and links
- Experience - Work and open source experience timeline
- Contact - Contact form and social links

---

Featured Projects

| Project                      | Description                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| HookLens                 | Multi-tenant webhook inspector with live capture, replay engine, and AI-powered payload explanations via Groq |
| Stash                    | Snippet manager + Chrome extension with JWT & Google OAuth                                                    |
| Tero                     | AI-powered ATS resume scorer with ~95% detection accuracy                                                     |
| MAP Aviation             | Full-stack aviation career platform with courses, jobs, and Paytm payments                                    |
| Gau Raksha Seva Sansthan | Full-stack NGO donation platform with admin CMS                                                               |

---

Getting Started

```bash
Clone the repo
git clone https://github.com/iamayushkarma/portfolio.git
cd portfolio

Install dependencies
npm install

Start dev server
npm run dev

Build for production
npm run build
```

---

Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start local dev server              |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview production build locally    |
| `npm run lint`    | Run ESLint                          |

---

License

This project is open source. Feel free to take inspiration, but please don't copy it directly  build your own version instead!
