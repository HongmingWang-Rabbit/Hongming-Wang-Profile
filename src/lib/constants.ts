export const siteConfig = {
  name: "Hongming Wang",
  title: "Hongming Wang | Full-Stack Developer",
  description:
    "Full-Stack Developer with 4+ years of experience building production DeFi platforms, multi-tenant SaaS, and AI-powered applications. Built multi-chain DeFi ecosystem processing $90M+ trading volume with 53K+ users.",
  url: "https://wanghongming.xyz",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/HongmingWang-Rabbit",
    linkedin: "https://www.linkedin.com/in/hongming-wang-tech/",
    email: "hongmingwangrabbit@gmail.com",
  },
};

export const personalInfo = {
  name: "Hongming Wang",
  role: "Full-Stack Developer",
  location: "Vancouver, Canada",
  email: "hongmingwangrabbit@gmail.com",
  phone: "+1 778-861-1008",
  linkedin: "https://www.linkedin.com/in/hongming-wang-tech/",
  github: "https://github.com/HongmingWang-Rabbit",
  bio: "Full-Stack Developer with 4+ years of experience building production DeFi platforms, multi-tenant SaaS, and AI-powered applications. Core expertise in React/Next.js frontend with strong backend skills in Node.js, PostgreSQL, and API design. Built multi-chain DeFi ecosystem processing $90M+ trading volume with 53K+ users.",
  resumeUrl: "/Hongming_Wang_Resume.docx",
};

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const experiences = [
  {
    title: "Full-Stack Engineer",
    company: "Honeypot Finance",
    period: "2024 - Present",
    description: [
      "Multi-chain DeFi platform ecosystem: $90M+ trading volume, 53K+ active users, 1.9M+ trades executed",
      "Architected Nx monorepo with 6 interconnected Next.js applications: DEX, memecoin launchpad, IDO platform, governance token market, vault dashboard, and token vesting interface",
      "Built perpetual futures DEX on Orderly Network with TradingView charts, real-time order book, and live PnL tracking",
      "Designed pluggable multi-chain wallet architecture supporting Privy, Web3-Onboard, RainbowKit across EVM, Solana, and Cosmos ecosystems",
      "Built Subgraph integrations with Apollo GraphQL for real-time on-chain data indexing; developed tRPC APIs for type-safe internal communication",
    ],
    technologies: ["React 18", "Next.js 14", "TypeScript", "Vite", "Tailwind CSS", "MobX", "TanStack Query", "Wagmi v2", "Viem", "ethers.js", "Prisma", "tRPC", "Apollo GraphQL", "Nx"],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "2022 - 2023",
    description: [
      "VE Studio: Built full-stack e-commerce for luxury leather accessories with Stripe payment integration and Builder.io headless CMS",
      "Implemented Stripe payment intent creation, customer data management, webhook handling, and multi-step checkout flow with Zod validation",
      "Spark Kitchen & Bar: Built modern restaurant website with Next.js 13, Builder.io CMS, and TableAgent reservation system",
      "Applied atomic design patterns for scalable component architecture; implemented SEO with dynamic metadata and OpenGraph tags",
    ],
    technologies: ["Next.js 14", "Node.js", "Express", "TypeScript", "Stripe API", "Builder.io", "Redux Toolkit", "Zod", "Framer Motion"],
  },
  {
    title: "Software Developer / IT Admin",
    company: "Haidilao Hot Pot",
    period: "2021 - 2022",
    description: [
      "Built production automation system for multi-location restaurant chain (8 stores), replacing manual Excel workflows with database-driven reporting",
      "Designed end-to-end data pipeline: web scraping → data extraction → PostgreSQL storage → automated report generation",
      "Developed Excel report generators for business intelligence: gross margin analysis, YoY comparisons, inventory tracking",
      "Implemented Selenium-based web scraper for automated data collection; created bank transaction processing system for multiple Canadian banks",
    ],
    technologies: ["Python", "PostgreSQL", "Pandas", "Selenium", "OpenPyXL"],
  },
];

export const projects = [
  {
    title: "PlotEngine",
    description:
      "Cross-platform AI writing assistant for fiction writers. Features rich text editor with AI-powered entity recognition, knowledge base for narrative elements, multi-tab editor with auto-save, and multi-language support (EN/ZH/FR).",
    technologies: ["Flutter", "Dart", "Riverpod", "REST API", "OAuth", "Cloud Storage"],
    github: "https://github.com/HongmingWang-Rabbit/plot-engine",
    live: "https://plot-engine.com",
    featured: true,
  },
  {
    title: "Personal Skill Map",
    description:
      "AI-powered career development platform with skill tree visualization using React Flow. Features multi-format document import with GPT-4o vision, AI resume generation with ATS keyword injection, 10-locale i18n system, and credit-based billing with Stripe.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "React Flow", "Drizzle ORM", "Neon PostgreSQL", "Upstash Redis", "OpenAI GPT-4o", "Stripe"],
    github: "https://github.com/HongmingWang-Rabbit/ai-skill-tree-website",
    live: "https://personalskillmap.com",
    featured: true,
  },
  {
    title: "Point System SaaS",
    description:
      "Full-stack multi-tenant SaaS platform for tracking user rewards with pnpm monorepo architecture. Features isolated PostgreSQL databases per tenant, append-only ledger for immutable transactions, quest/campaign system, multi-level referral system, and anti-sybil protection.",
    technologies: ["TypeScript", "Next.js 15", "Fastify", "PostgreSQL", "Railway", "Vercel", "RainbowKit"],
    live: "https://point-system-monorepo-saas-web.vercel.app",
    featured: true,
  },
];

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Dart", "SQL"],
  frontend: [
    "React 18/19",
    "Next.js 14/15",
    "React Flow",
    "TanStack Query",
    "Redux Toolkit",
    "MobX",
    "Tailwind CSS",
    "Framer Motion",
  ],
  backend: ["Node.js", "Express", "Fastify", "tRPC", "REST APIs", "GraphQL", "Apollo", "Subgraph", "Webhooks"],
  databases: ["PostgreSQL", "Neon", "MySQL", "MongoDB", "Redis", "Upstash", "Drizzle ORM", "Prisma"],
  web3: ["Wagmi", "Viem", "ethers.js", "RainbowKit", "Privy", "Particle Network", "Multi-chain (EVM/Solana/Cosmos)"],
  ai: ["OpenAI GPT-4o", "Prompt Engineering", "RAG", "Entity Recognition", "Tavily Search"],
  devops: ["Vercel", "Railway", "AWS", "Docker", "CI/CD", "GitHub Actions", "Sentry", "Nx Monorepo"],
  payments: ["Stripe", "NextAuth.js", "OAuth (Google/Twitter/Discord/WeChat)", "Web3 SIWE"],
};

export const education = [
  {
    degree: "Software Development Diploma",
    school: "British Columbia Institute of Technology (BCIT)",
    year: "2023",
  },
];
