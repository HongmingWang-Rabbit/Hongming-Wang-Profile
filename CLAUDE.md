# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
npm start       # Run production server
```

## Architecture Overview

This is a **Next.js 14 App Router** single-page portfolio with:
- **Three.js/R3F** for 3D point cloud visualization in hero section
- **Framer Motion** for scroll-triggered animations
- **Tailwind CSS** with custom design tokens
- **next-themes** for dark mode

### Key Directories

```
src/
├── app/                    # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── sections/           # Full page sections (hero, about, experience, projects, contact)
│   ├── ui/                 # Reusable components (navbar, footer, splat-scene)
│   └── providers/          # Theme provider wrapper
└── lib/
    └── constants.ts        # ALL site content centralized here
```

### Data Pattern

**All text content lives in `src/lib/constants.ts`** - exports `siteConfig`, `personalInfo`, `navItems`, `experiences`, `projects`, `skills`, `education`. Update content here, not in components.

### Component Pattern

All section components follow this pattern:
```typescript
"use client";
import { motion, useInView } from "framer-motion";

export function Section() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

### 3D Point Cloud (`splat-scene.tsx`)

The hero section features an interactive PLY point cloud with:
- **Cursor-following reveal**: Particles appear near mouse position
- **Scan line animation**: Left-to-right sweep when idle
- **Configurable via `POINT_CLOUD_CONFIG`**: All values (scale, speed, colors, etc.) in one object at top of file

### Styling

Custom classes defined in `globals.css`:
- `.container-custom` - Max-width container
- `.section-padding` - Consistent vertical spacing
- `.gradient-text` - Primary gradient text
- `.btn-primary`, `.btn-secondary` - Button styles
- `.card`, `.skill-badge` - Card and badge components

Dark mode uses `dark:` prefix with custom colors: `dark-bg`, `dark-card`, `dark-border`

### Animation Conventions

- Initial: `{ opacity: 0, y: 20 }`
- Stagger delay: `0.2 + index * 0.15`
- Hover: `whileHover={{ scale: 1.05, y: -2 }}`

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)
