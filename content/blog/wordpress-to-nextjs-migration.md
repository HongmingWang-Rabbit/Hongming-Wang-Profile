---
title: "WordPress → Next.js: Migrating a Renovation Company's Website"
description: "How I rebuilt Reno Stars from a sluggish WordPress site to a modern Next.js app — the real tradeoffs, challenges, and results."
date: "2026-03-12"
tags: ["Next.js", "WordPress", "Migration", "Freelance", "Case Study"]
featured: true
---

## Why Migrate?

My client [Reno Stars](https://reno-stars.com/) is a renovation company in Vancouver. Their WordPress site worked — it had content, SEO juice, and a decent design. But it was slow, hard to update, and plugin-heavy.

They came to me wanting something modern that actually loads fast on mobile (where most of their leads come from). Here's what I learned rebuilding it from scratch.

## The Old Stack vs New Stack

| | WordPress (Old) | Next.js (New) |
|---|---|---|
| **Framework** | WordPress + Elementor | Next.js 14 + Tailwind CSS |
| **CMS** | WordPress Admin | Custom Admin CMS |
| **Hosting** | Shared hosting | Vercel |
| **Load time** | ~4s | <1s |
| **Maintenance** | Plugin updates, security patches | Near zero |

## What Actually Mattered

### 1. SEO Migration is the Hard Part

The renovation industry lives on Google. Reno Stars ranks for keywords like "Vancouver renovation contractor" — losing that would be a disaster.

I had to:
- Map every old URL to its new equivalent
- Set up proper redirects (301, not 302)
- Keep the same meta structure and schema markup
- Preserve the sitemap and submit it fresh

**Lesson:** Don't just rebuild the frontend. Audit every URL first.

### 2. The CMS Question

WordPress's biggest advantage is its admin panel. Non-technical clients can update content without calling you. Taking that away is a downgrade unless you replace it.

I built a custom admin CMS that lets them:
- Update project photos and descriptions
- Edit service pages
- Manage blog posts
- Update team info

It's simpler than WordPress admin, which is actually a feature — fewer things to break.

### 3. Performance Wins

Next.js with server components and image optimization made a massive difference:

- **First Contentful Paint:** 4.2s → 0.8s
- **Largest Contentful Paint:** 6.1s → 1.2s  
- **Total page weight:** 3.8MB → 890KB

For a renovation company, this matters. Someone searching on their phone at a job site doesn't wait 4 seconds.

### 4. Bilingual Support

Reno Stars serves both English and Chinese-speaking clients in Vancouver. WordPress handled this with WPML (expensive, buggy). In Next.js, I implemented i18n with `next-intl` — cleaner routing, no plugin conflicts.

## Tradeoffs I'd Be Honest About

Not everything is better:

- **Client self-service is harder** — even with a custom CMS, WordPress is more plug-and-play for non-technical users
- **Plugin ecosystem is gone** — need a contact form? Build it. Need analytics? Wire it up yourself
- **Development cost is higher** — a WordPress site with a theme is faster to ship initially

But for a business that needs speed, reliability, and a professional web presence, the tradeoff is worth it.

## What I'd Do Differently

- Start with the URL audit before writing any code
- Build the CMS features in parallel, not after the frontend
- Set up staging with real content from day one (not lorem ipsum)

## The Result

The new site is live at [reno-stars-nextjs.vercel.app](https://reno-stars-nextjs.vercel.app/) and will replace the production site soon. It's faster, cleaner, and the client can actually manage it without calling me every week.

If you're thinking about migrating a client from WordPress to Next.js — do it, but respect the SEO migration. That's where the real work is.

---

*Building something similar? I'm a freelance full-stack developer in Vancouver. [Get in touch](/contact).*
