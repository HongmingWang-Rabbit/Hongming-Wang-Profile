# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev        # Start development server (localhost:3000)
pnpm build      # Production build
pnpm lint       # ESLint
pnpm start      # Run production server
```

## Architecture Overview

This is a **Next.js 16 App Router** portfolio with **i18n (EN/ZH)** support:
- **Three.js/R3F** for 3D point cloud visualization (dynamically imported, SSR disabled)
- **Framer Motion** for scroll-triggered animations
- **Tailwind CSS** with custom design tokens
- **next-themes** forced to dark mode
- **i18n** via dictionary-provider pattern (cookie + Accept-Language detection)

### Key Directories

```
src/
├── app/
│   ├── [locale]/              # i18n routes (en, zh)
│   │   ├── api/chat/          # Re-exports root chat API
│   │   ├── blog/              # Blog listing + [slug] pages
│   │   ├── layout.tsx         # Locale layout with metadata, JSON-LD, providers
│   │   └── page.tsx           # Homepage sections
│   ├── api/chat/              # Groq-powered chatbot API route
│   ├── layout.tsx             # Root layout (minimal pass-through)
│   ├── globals.css            # Global styles & CSS variables
│   ├── robots.ts              # SEO robots
│   └── sitemap.ts             # SEO sitemap
├── components/
│   ├── sections/              # Page sections (hero, about, experience, projects, contact, blog-listing, blog-post)
│   ├── ui/                    # Reusable components (navbar, footer, splat-scene, loading-screen, custom-cursor, chatbot)
│   └── providers/             # Theme provider wrapper
├── i18n/
│   ├── config.ts              # Locale definitions
│   ├── dictionaries/          # en.json, zh.json
│   ├── dictionary-provider.tsx # React context for translations
│   └── get-dictionary.ts      # Server-side dictionary loader
├── lib/
│   ├── constants.ts           # Site config, personal info, experiences, projects, skills, chatbot config
│   └── blog.ts                # Blog post registry with bilingual content + helpers
└── middleware.ts               # Locale detection & redirect
```

### Data Pattern

- **Static content**: `src/lib/constants.ts` — `siteConfig`, `personalInfo`, `experiences`, `projects`, `skills`, `chatbotConfig`, `generateChatSystemPrompt()`
- **Translated UI strings**: `src/i18n/dictionaries/{en,zh}.json`
- **Blog posts**: `src/lib/blog.ts` — bilingual inline content with custom markdown-to-HTML renderer (no external markdown deps)

### Blog System

Blog uses an inline bilingual model in `src/lib/blog.ts`. Each post has `title`, `subtitle`, `content` as `{ en: string, zh: string }` objects. The `BlogPostClient` component includes a custom markdown-to-HTML converter — no react-markdown or similar deps needed. Blog routes are under `/{locale}/blog`.

### i18n

- Middleware detects locale from cookie → Accept-Language header → default (en)
- URLs follow `/{locale}/...` pattern
- `DictionaryProvider` (React context) provides `dictionary` and `locale` to client components
- Use `useDictionary()` hook in client components

### 3D Point Cloud (`splat-scene.tsx`)

Dynamically imported (`next/dynamic`, SSR disabled) to avoid blocking initial page load. Features:
- **Cursor-following reveal**: Particles appear near mouse position
- **Scan line animation**: Left-to-right sweep when idle
- **Configurable via `POINT_CLOUD_CONFIG`**: All values in one object at top of file
- **PLY file**: Hosted on Google Cloud Storage

### Styling

Custom classes defined in `globals.css`:
- `.container-custom` - Max-width container
- `.section-padding` - Consistent vertical spacing
- `.gradient-text` - Primary gradient text
- `.btn-primary`, `.btn-secondary` - Button styles
- `.card`, `.skill-badge` - Card and badge components

Dark mode forced via `forcedTheme="dark"`. Custom colors: `dark-bg`, `dark-card`, `dark-border`

### AI Chatbot (`chatbot.tsx` + `api/chat/route.ts`)

Groq-powered AI assistant with input validation (max 20 messages, 2000 chars each):
- **Configuration**: `chatbotConfig` in `constants.ts`
- **System prompt**: Auto-generated from `constants.ts` data
- **Environment variable**: `GROQ_API_KEY` required

## Environment Variables

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=xxx  # Contact form
GROQ_API_KEY=xxx               # AI Chatbot (optional, chatbot hidden if not set)
```

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)
