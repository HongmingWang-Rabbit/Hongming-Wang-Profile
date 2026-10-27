import type { Locale } from "@/i18n/config";

export interface Bilingual {
  en: string;
  zh: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: Bilingual;
}

export interface ProjectFeature {
  title: Bilingual;
  description: Bilingual;
}

export interface Project {
  slug: string;
  /** lucide-react icon name, resolved in the UI via the icon map */
  icon: string;
  /** Brand name — not translated */
  title: string;
  tagline: Bilingual;
  /** Short blurb for the project card */
  description: Bilingual;
  /** Long-form markdown for the detail page */
  overview: Bilingual;
  features: ProjectFeature[];
  technologies: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  award?: Bilingual;
  year?: string;
  screenshots: ProjectScreenshot[];
}

// Project registry — the single source of truth for the projects section
// and the per-project detail pages. Add new projects here.
export const projects: Project[] = [
  {
    slug: "enter-os",
    icon: "Network",
    title: "Enter OS",
    tagline: {
      en: "The operating system for AI agent organizations.",
      zh: "面向 AI agent 组织的操作系统。",
    },
    description: {
      en: "Compose multi-agent teams the way you'd staff a company — visual org topology, an A2A protocol, three-tier memory, runtime portability, and a marketplace for tools, agents, and whole departments.",
      zh: "像组建公司团队一样编排多智能体团队——可视化组织架构、A2A 协议、三层记忆、运行时可移植，以及面向工具、智能体乃至整个部门的市场。",
    },
    award: {
      en: "🏆 1st place — NVIDIA DGX Spark Hackathon (China, 2026)",
      zh: "🏆 NVIDIA DGX Spark 黑客松（中国，2026）第一名",
    },
    overview: {
      en: `Enter OS (formerly Molecules AI) is the platform layer for the multi-agent era. Instead of wiring agents together with brittle workflow logic, you model them as an **organization** — roles, reporting lines, memory scopes, and approval ladders — and the control plane handles coordination.

I'm the **Co-Founder**, and the bet is simple: the unit of intelligence isn't the model, it's the org. As teams go from one agent to dozens, the bottleneck stops being the model and becomes how agents coordinate, who can approve what, and how knowledge accumulates across runs.

The product is open-core. The **Canvas** runs in your browser as a visual topology editor with a live A2A trace overlay; the **Control Plane** runs on your own tenant with a JSON-RPC 2.0 A2A router, a three-tier memory store, and enterprise governance. Bring whatever runtime you already trust — Hermes, OpenClaw, Claude Code, LangGraph, CrewAI, AutoGen — the topology never changes.

Originally conceived as "Starfire", it won **1st place at the NVIDIA DGX Spark Hackathon (China, 2026)**.`,
      zh: `Enter OS（原 Molecules AI）是面向多智能体时代的平台层。与其用脆弱的工作流逻辑把 agent 拼在一起，不如把它们建模成一个**组织**——角色、汇报线、记忆范围、审批阶梯——由控制平面负责协调。

我是这个项目的**联合创始人**，核心判断很简单：智能的单位不是模型，而是组织。当团队从一个 agent 扩张到几十个，瓶颈不再是模型本身，而是 agent 之间如何协调、谁能批准什么、知识如何在多次运行中沉淀。

产品采用 open-core 模式。**Canvas** 在浏览器里运行，是带实时 A2A 轨迹叠加的可视化拓扑编辑器；**Control Plane** 运行在你自己的租户上，提供 JSON-RPC 2.0 的 A2A 路由、三层记忆存储和企业级治理。沿用你已经信任的任意运行时——Hermes、OpenClaw、Claude Code、LangGraph、CrewAI、AutoGen——拓扑始终不变。

项目最初以“Starfire”为代号，荣获 **NVIDIA DGX Spark 黑客松（中国，2026）第一名**。`,
    },
    features: [
      {
        title: { en: "Role > Task", zh: "角色 > 任务" },
        description: {
          en: "Model the org chart, not the workflow. Roles inherit tools, memory scope, and an HITL ladder.",
          zh: "建模组织架构，而非工作流。角色继承工具、记忆范围和人类在环审批阶梯。",
        },
      },
      {
        title: { en: "Distributed A2A protocol", zh: "分布式 A2A 协议" },
        description: {
          en: "Agents speak JSON-RPC 2.0 directly. The platform routes; it's never a single bottleneck.",
          zh: "agent 之间直接用 JSON-RPC 2.0 通信。平台只做路由，绝不成为单点瓶颈。",
        },
      },
      {
        title: { en: "Three-tier memory", zh: "三层记忆" },
        description: {
          en: "LOCAL (what an agent saw), TEAM (what the squad agreed), GLOBAL (what the org learned) — one continuous, versioned memory.",
          zh: "LOCAL（agent 看到的）、TEAM（团队约定的）、GLOBAL（组织学到的）——一套连续、带版本的记忆。",
        },
      },
      {
        title: { en: "Runtime-portable", zh: "运行时可移植" },
        description: {
          en: "Swap runtimes — Hermes, OpenClaw, Claude Code, LangGraph, CrewAI, AutoGen — without touching the topology.",
          zh: "在 Hermes、OpenClaw、Claude Code、LangGraph、CrewAI、AutoGen 之间切换运行时，无需改动拓扑。",
        },
      },
      {
        title: { en: "Governance built in", zh: "内建治理" },
        description: {
          en: "Tiered HITL approvals, audit trails, RBAC, AES-256-GCM encryption, and EU AI Act readiness.",
          zh: "分级人类在环审批、审计追踪、RBAC、AES-256-GCM 加密，并面向 EU AI Act 合规。",
        },
      },
      {
        title: { en: "Three-layer marketplace", zh: "三层市场" },
        description: {
          en: "Buy or sell a plugin, hire a pre-trained agent, or import an entire department as a signed bundle.",
          zh: "买卖插件、雇佣预训练 agent，或以签名 bundle 的形式导入整个部门。",
        },
      },
    ],
    technologies: [
      "Next.js 15",
      "React Flow",
      "Zustand",
      "Go",
      "Gin",
      "PostgreSQL",
      "Python",
      "MCP",
      "JSON-RPC 2.0",
      "OpenTelemetry",
      "WorkOS",
      "Kubernetes",
    ],
    live: "https://enteros.ai",
    featured: true,
    year: "2026",
    screenshots: [
      {
        src: "/projects/molecules-ai/hero.png",
        caption: {
          en: "The Canvas — compose an agent org chart, with a live A2A trace overlay.",
          zh: "Canvas——编排 agent 组织架构，叠加实时 A2A 轨迹。",
        },
      },
      {
        src: "/projects/molecules-ai/features.png",
        caption: {
          en: "The thesis and a live Fintech topology defined as versionable code.",
          zh: "产品论点，以及以可版本化代码定义的实时 Fintech 拓扑。",
        },
      },
    ],
  },
  {
    slug: "agentaccord",
    icon: "ShieldCheck",
    title: "AgentAccord",
    tagline: {
      en: "Organization-scoped runtime governance for multi-agent delegation.",
      zh: "面向多智能体委派的组织级运行时治理架构。",
    },
    description: {
      en: "Co-authored research paper introducing an executable multi-agent governance runtime — single-use state-bound delegation credentials, linearizable receiver admission, contract-verified completion, and hash-chained causal logs.",
      zh: "联合署名研究论文：提出可执行的多智能体组织治理运行时——单次状态绑定委派凭证、线性化接收端准入、合约验证的完成提交，以及哈希链因果审计日志。",
    },
    award: {
      en: "📄 Research Paper — OpenReview (2026)",
      zh: "📄 研究论文 — OpenReview（2026）",
    },
    overview: {
      en: `LLM agents increasingly operate as persistent organizations with evolving membership, roles, and delegation. Existing multi-agent frameworks coordinate who should act and where requests may flow, but do not ensure that a delegation remains authorized when it reaches the receiver or that a claimed completion is backed by a verified artifact.

I co-authored **AgentAccord** (with Zhanlin Cui, Xuanhua Yin, and Boyu Wei) to make multi-agent organizations executable by treating every privileged delegation as a **governed transaction**. Each delegation request carries a short-lived, single-use credential binding its caller, receiver, intent digest, runtime-derived authorization path witness, current authority epoch digests, and completion contract.

Immediately before execution, the receiver gateway revalidates current authority state and atomically consumes the credential nonce once, failing closed on role revocations, edge edits, or stale endpoints. Terminal success is committed only after the produced artifact satisfies the bound verifier contract, and every authorization, execution, recovery, and completion event is recorded in a causally linked, hash-chained log.

Across six normalized defenses, five unaugmented official framework paths (AutoGen, CrewAI, LangGraph, MetaGPT, OpenAI Agents SDK), and **A2ASecBench**, AgentAccord is the only evaluated method that jointly preserves authorized task delivery (18/18 benign artifacts valid) while blocking 100% of stale receivers (6/6), illegal delegations (6/6), unauthorized effects under prompt injection (24/24), and artifact-free completion claims (6/6) — while improving failure-class attribution by **+26.7 percentage points** over output-only evidence.`,
      zh: `大语言模型智能体正越来越多地作为具有动态成员、角色和委派关系的持久组织运行。现有的多智能体框架虽然能协调“由谁执行”以及“请求流向何处”，却无法保证委派请求到达接收端时权限依然有效，也无法确保智能体声称的“任务完成”有经过验证的真实产物支撑。

我与崔湛林（Zhanlin Cui）、Xuanhua Yin、Boyu Wei 联合撰写了 **AgentAccord**，通过将每一次特权委派视为**受治理的事务（Governed Transaction）**，使多智能体组织真正具备可执行性与安全性。每次委派请求都携带一枚短期、单次使用的加密凭证，绑定调用方、接收方、意图摘要、运行时授权路径见证、当前权限状态纪元摘要以及完成合约。

在接收端派发执行前的瞬间，网关会重新校验实时组织权限状态并原子化消费单次 nonce；一旦期间发生角色撤销、拓扑边修改或端点替换，准入即刻安全拒绝（fail-closed）。终端状态仅在产出物通过绑定校验器验证后才会提交完成，并将授权、执行、恢复与完成全流程记录在因果关联的哈希链日志中。

在六种标准化防御方案、五种主流原生框架路径（AutoGen、CrewAI、LangGraph、MetaGPT、OpenAI Agents SDK）以及 **A2ASecBench** 基准测试中，AgentAccord 是唯一在保持正常任务 100% 交付（18/18）的同时，100% 拦截过期接收端（6/6）、越权委派（6/6）、提示词注入下的未授权副作用（24/24）以及无产物虚假完成（6/6）的方案，并将故障归因准确率较仅靠输出证据提升了 **26.7 个百分点**。`,
    },
    features: [
      {
        title: { en: "State-bound single-use credentials", zh: "状态绑定的单次委派凭证" },
        description: {
          en: "Cryptographically binds caller, receiver, intent digest, authorization path witness, authority epochs, and completion contract to a single-use nonce.",
          zh: "将调用方、接收方、意图摘要、授权路径见证、权限纪元与完成合约加密绑定至单次 nonce。",
        },
      },
      {
        title: { en: "Linearizable receiver admission", zh: "线性化接收端准入控制" },
        description: {
          en: "Revalidates live authority digests and policy slices at delivery time and atomically consumes the nonce (#Dispatch <= 1), blocking replay and TOCTOU drift.",
          zh: "在投递时刻实时重验权限摘要与策略切片，并原子化消费 nonce（#Dispatch <= 1），阻断重放与状态漂移攻击。",
        },
      },
      {
        title: { en: "Contract-relative completion soundness", zh: "基于合约验证的完成完备性" },
        description: {
          en: "Separates permission to start from proof of completion — rejects hallucinated or artifact-free completions unless the bound verifier accepts the artifact.",
          zh: "将“准许执行”与“完成证明”解耦——除非绑定校验器验证产物合规，否则一律拒绝无产物的虚假完成声明。",
        },
      },
      {
        title: { en: "Hash-chained causal audit log", zh: "哈希链因果审计追踪" },
        description: {
          en: "Links authorization, execution, recovery, and verification into a tamper-evident causal graph — boosting failure-class attribution by +26.7 pp (30/30 exact recovery).",
          zh: "将授权、执行、恢复与验证串联为防篡改因果图，使故障类型归因准确率提升 26.7 个百分点（30/30 精确还原关键事件）。",
        },
      },
      {
        title: { en: "Zero boundary violations across 6 defenses", zh: "六种防御对比下零边界失守" },
        description: {
          en: "18/18 benign utility preserved while blocking 6/6 stale receivers, 6/6 illegal delegations, 24/24 injection side-effects, and 6/6 unsupported completions.",
          zh: "在 18/18 正常任务完全通过的同时，实现 6/6 过期接收端、6/6 越权委派、24/24 注入副作用及 6/6 虚假完成的零失守拦截。",
        },
      },
      {
        title: { en: "A2ASecBench & 5-framework evaluation", zh: "A2ASecBench 与五框架跨平台验证" },
        description: {
          en: "Outperforms baselines across all 13 A2ASecBench endpoints (88% authentic agent-card selection vs. 34% baseline) and 486 cross-framework runs.",
          zh: "在 A2ASecBench 全部 13 项指标上领先基线（真实 Agent Card 识别率达 88%，对比最强基线 34%），并通过 486 次跨框架实验验证。",
        },
      },
    ],
    technologies: [
      "Multi-Agent Systems",
      "A2A Protocol",
      "Runtime Governance",
      "Cryptographic Credentials",
      "Causal Tracing",
      "A2ASecBench",
      "LangGraph",
      "AutoGen",
      "CrewAI",
      "Python",
    ],
    live: "https://openreview.net/forum?id=ntHygt1Cvc",
    featured: true,
    year: "2026",
    screenshots: [
      {
        src: "/projects/agentaccord/hero.png",
        caption: {
          en: "AgentAccord governed delegation lifecycle — state-bound issuance, linearizable admission, and evidence-bound completion.",
          zh: "AgentAccord 受治理委派生命周期——状态绑定签发、线性化准入与证据绑定完成提交。",
        },
      },
      {
        src: "/projects/agentaccord/features.png",
        caption: {
          en: "Matched six-defense boundary comparison, causal attribution gains (+26.7 pp), and A2ASecBench evaluation.",
          zh: "六种防御方案的边界对比、因果故障归因提升（+26.7 个百分点）以及 A2ASecBench 评测结果。",
        },
      },
    ],
  },
  {
    slug: "plotengine",
    icon: "PenLine",
    title: "PlotEngine",
    tagline: {
      en: "An AI-powered writing companion for fiction writers.",
      zh: "面向小说作家的 AI 写作助手。",
    },
    description: {
      en: "A cross-platform writing app that keeps long-form stories consistent — AI entity recognition, a narrative knowledge base, and an auto-saving multi-chapter editor.",
      zh: "一款让长篇故事保持连贯的跨平台写作应用——AI 实体识别、叙事知识库，以及自动保存的多章节编辑器。",
    },
    overview: {
      en: `PlotEngine is a cross-platform writing assistant built for fiction writers wrestling with long, complex narratives. The hard part of a novel isn't the prose — it's keeping a hundred-thousand-word world consistent. Who has the scar? Which town burned down in chapter 3? PlotEngine tracks all of it.

As you write, it automatically recognizes characters, locations, objects, and events, and surfaces them so you never lose the thread. A structured knowledge base stores profiles and worldbuilding details; an AI consistency checker flags plot holes and timeline contradictions across hundreds of pages.

Built with Flutter for a single codebase across desktop and mobile, with a distraction-free rich text editor, automatic saving, and full multi-language support (EN/ZH/FR).`,
      zh: `PlotEngine 是一款面向小说作家的跨平台写作助手，专为应对又长又复杂的叙事而生。写小说真正难的不是文笔，而是让一部十万字的世界保持连贯——谁脸上有疤？第三章烧掉的是哪座小镇？这些 PlotEngine 都帮你记着。

在你写作时，它会自动识别角色、地点、物件和事件并随手呈现，让你不丢线索。结构化的知识库存储人物档案和世界观细节；AI 一致性检查器能在数百页范围内标记情节漏洞和时间线矛盾。

基于 Flutter 构建，桌面端和移动端共用一套代码，配备无干扰富文本编辑器、自动保存以及完整的多语言支持（中/英/法）。`,
    },
    features: [
      {
        title: { en: "AI entity recognition", zh: "AI 实体识别" },
        description: {
          en: "Automatically detects and tracks characters, locations, objects, and events as you write.",
          zh: "在你写作时自动检测并追踪角色、地点、物件和事件。",
        },
      },
      {
        title: { en: "Knowledge base", zh: "知识库" },
        description: {
          en: "A searchable database of character profiles, location details, and plot events for your whole story world.",
          zh: "一个可搜索的数据库，收纳整个故事世界的人物档案、地点细节和情节事件。",
        },
      },
      {
        title: { en: "Story consistency checking", zh: "故事一致性检查" },
        description: {
          en: "AI analysis flags plot holes, timeline inconsistencies, and character discrepancies across hundreds of pages.",
          zh: "AI 分析在数百页范围内标记情节漏洞、时间线矛盾和人物前后不一致。",
        },
      },
      {
        title: { en: "Rich text editor", zh: "富文本编辑器" },
        description: {
          en: "A distraction-free, multi-chapter editor with automatic saving so you never lose work.",
          zh: "无干扰的多章节编辑器，自动保存，绝不丢失你的成果。",
        },
      },
      {
        title: { en: "Character tracking", zh: "角色追踪" },
        description: {
          en: "Detailed profiles — physical descriptions, traits, relationships, and appearance history.",
          zh: "详尽的角色档案——外貌描写、性格特征、人物关系和出场历史。",
        },
      },
      {
        title: { en: "Worldbuilding tools", zh: "世界观构建工具" },
        description: {
          en: "Build immersive, internally consistent settings with location databases and cultural notes.",
          zh: "借助地点数据库和文化笔记，构建沉浸且自洽的设定。",
        },
      },
    ],
    technologies: ["Flutter", "Dart", "Riverpod", "REST API", "OAuth", "Cloud Storage"],
    live: "https://plot-engine.com",
    github: "https://github.com/HongmingWang-Rabbit/plot-engine",
    featured: true,
    screenshots: [
      {
        src: "/projects/plotengine/hero.png",
        caption: {
          en: "PlotEngine — your AI-powered writing companion.",
          zh: "PlotEngine——你的 AI 写作伙伴。",
        },
      },
      {
        src: "/projects/plotengine/features.png",
        caption: {
          en: "Six tools built for storytellers, from entity recognition to worldbuilding.",
          zh: "为讲故事的人打造的六大工具，从实体识别到世界观构建。",
        },
      },
    ],
  },
  {
    slug: "personal-skill-map",
    icon: "Waypoints",
    title: "Personal Skill Map",
    tagline: {
      en: "An AI career-development platform with an interactive skill tree.",
      zh: "一个带交互式技能树的 AI 职业发展平台。",
    },
    description: {
      en: "Build your career roadmap as a visual skill tree — import skills from your resume, explore any career path, and generate ATS-tuned resumes.",
      zh: "把你的职业路线图变成一棵可视化技能树——从简历导入技能、探索任意职业路径，并生成面向 ATS 优化的简历。",
    },
    overview: {
      en: `Personal Skill Map turns career growth into something you can actually see. Instead of a flat list of skills, it renders your competencies as an interactive skill tree (built with React Flow) — branches you've grown, gaps to fill, and the paths between roles.

Import your existing skills by uploading a resume — multi-format document parsing runs through GPT-4o vision — or explore any career path from a prompt like "I want to work remotely." From there it generates tailored, ATS-keyword-tuned resumes so your applications actually clear the filters.

It's a full SaaS: a 10-locale i18n system, credit-based billing with Stripe, and a modern Next.js 15 / React 19 stack on Neon Postgres and Upstash Redis.`,
      zh: `Personal Skill Map 把职业成长变成看得见的东西。它不是一份扁平的技能清单，而是用 React Flow 把你的能力渲染成一棵交互式技能树——你已长成的分枝、待补的缺口，以及角色之间的路径。

上传简历即可导入已有技能——多格式文档解析由 GPT-4o 视觉完成——或者从一句 "我想远程办公" 这样的提示出发探索任意职业路径。在此基础上，它生成量身定制、针对 ATS 关键词优化的简历，让你的申请真正能通过筛选。

这是一个完整的 SaaS：10 种语言的国际化系统、基于 Stripe 的信用计费，以及构建于 Neon Postgres 与 Upstash Redis 之上的现代 Next.js 15 / React 19 技术栈。`,
    },
    features: [
      {
        title: { en: "Interactive skill tree", zh: "交互式技能树" },
        description: {
          en: "Visualize competencies and career paths as a navigable React Flow graph.",
          zh: "用可导航的 React Flow 图把能力与职业路径可视化。",
        },
      },
      {
        title: { en: "Resume import (GPT-4o vision)", zh: "简历导入（GPT-4o 视觉）" },
        description: {
          en: "Multi-format document import extracts your skills automatically from an uploaded resume.",
          zh: "多格式文档导入，从上传的简历中自动提取你的技能。",
        },
      },
      {
        title: { en: "AI resume generation", zh: "AI 简历生成" },
        description: {
          en: "Generate tailored resumes with ATS keyword injection so applications clear the filters.",
          zh: "生成量身定制的简历并注入 ATS 关键词，让申请顺利通过筛选。",
        },
      },
      {
        title: { en: "Career-path exploration", zh: "职业路径探索" },
        description: {
          en: "Explore any role from a natural-language prompt and see the skills it requires.",
          zh: "从自然语言提示出发探索任意角色，看清它所需的技能。",
        },
      },
      {
        title: { en: "10-locale i18n", zh: "10 种语言国际化" },
        description: {
          en: "Fully localized across ten languages out of the box.",
          zh: "开箱即用，完整本地化覆盖十种语言。",
        },
      },
      {
        title: { en: "Credit-based billing", zh: "信用计费" },
        description: {
          en: "Stripe-powered metered billing for AI generation and imports.",
          zh: "基于 Stripe 的按量计费，覆盖 AI 生成与导入。",
        },
      },
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "React Flow",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "Upstash Redis",
      "OpenAI GPT-4o",
      "Stripe",
    ],
    live: "https://personalskillmap.com",
    github: "https://github.com/HongmingWang-Rabbit/ai-skill-tree-website",
    featured: true,
    screenshots: [
      {
        src: "/projects/personal-skill-map/hero.png",
        caption: {
          en: "Start from your resume or a prompt — build your career roadmap.",
          zh: "从你的简历或一句提示出发——构建你的职业路线图。",
        },
      },
    ],
  },
  {
    slug: "point-system",
    icon: "Trophy",
    title: "Point System SaaS",
    tagline: {
      en: "A white-label rewards and loyalty platform.",
      zh: "一个白标积分与忠诚度平台。",
    },
    description: {
      en: "Launch a gamified loyalty program in minutes — multi-tenant, with isolated databases per tenant, an append-only ledger, quests, referrals, and anti-sybil protection.",
      zh: "几分钟上线一个游戏化忠诚度系统——多租户、每租户独立数据库、追加式账本、任务、推荐与防女巫保护。",
    },
    overview: {
      en: `Point System is a white-label platform for launching points, rewards, and community-engagement programs without writing code. Pick a handle, connect a wallet, and a fully isolated tenant — its own PostgreSQL database and configuration — spins up in minutes.

Under the hood it's a proper multi-tenant SaaS on a pnpm monorepo. Every transaction lands in an **append-only ledger**, so balances are immutable and auditable. A quest/campaign engine, a multi-level referral system, and anti-sybil protection keep programs fair as they grow.

Rewards can be boosted by multipliers for NFT holders, Discord roles, or wallet tiers, and real-time leaderboards drive competition. Built on Fastify and PostgreSQL, deployed across Railway and Vercel.`,
      zh: `Point System 是一个白标平台，无需写代码即可上线积分、奖励和社区互动系统。选个名称、连接钱包，一个完全隔离的租户——拥有自己的 PostgreSQL 数据库和配置——就会在几分钟内启动。

底层是一个规范的多租户 SaaS，构建在 pnpm monorepo 上。每一笔交易都写入**追加式账本**，因此余额不可篡改、可审计。任务/活动引擎、多级推荐系统和防女巫保护，让系统在扩张时依然公平。

奖励可针对 NFT 持有者、Discord 角色或钱包等级叠加倍率，实时排行榜驱动竞争。基于 Fastify 与 PostgreSQL 构建，部署在 Railway 与 Vercel 上。`,
    },
    features: [
      {
        title: { en: "Instant setup", zh: "即时上线" },
        description: {
          en: "Pick a handle, connect a wallet, and launch with your own isolated database and config.",
          zh: "选个名称、连接钱包，用你专属的隔离数据库与配置即刻上线。",
        },
      },
      {
        title: { en: "Wallet authentication", zh: "钱包认证" },
        description: {
          en: "Secure, passwordless access via wallet signatures — full control over your data.",
          zh: "通过钱包签名实现安全、免密访问——完全掌控你的数据。",
        },
      },
      {
        title: { en: "Real-time leaderboards", zh: "实时排行榜" },
        description: {
          en: "Drive competition and engagement; track points by source and time period.",
          zh: "驱动竞争与参与；按来源和时间段追踪积分。",
        },
      },
      {
        title: { en: "Quests & campaigns", zh: "任务与活动" },
        description: {
          en: "Create daily, weekly, or one-time quests with Twitter and Discord verification built in.",
          zh: "创建每日、每周或一次性任务，内置 Twitter 与 Discord 验证。",
        },
      },
      {
        title: { en: "Referral system", zh: "推荐系统" },
        description: {
          en: "Multi-level referral bonuses with configurable percentages to grow communities organically.",
          zh: "多级推荐奖励，百分比可配置，让社区有机增长。",
        },
      },
      {
        title: { en: "Append-only ledger", zh: "追加式账本" },
        description: {
          en: "Immutable, auditable transactions per tenant, with anti-sybil protection.",
          zh: "每租户不可篡改、可审计的交易记录，并带防女巫保护。",
        },
      },
    ],
    technologies: [
      "TypeScript",
      "Next.js 15",
      "Fastify",
      "PostgreSQL",
      "Railway",
      "Vercel",
      "RainbowKit",
    ],
    live: "https://point-system-monorepo-saas-web.vercel.app",
    featured: true,
    screenshots: [
      {
        src: "/projects/point-system/hero.png",
        caption: {
          en: "Launch your own points & rewards system — no coding required.",
          zh: "上线你自己的积分与奖励系统——无需写代码。",
        },
      },
      {
        src: "/projects/point-system/features.png",
        caption: {
          en: "Everything you need to run a rewards program, out of the box.",
          zh: "运营一个奖励系统所需的一切，开箱即用。",
        },
      },
    ],
  },
];

// Helpers
export function getAllProjects(): Project[] {
  return projects;
}

const LEGACY_PROJECT_SLUGS: Record<string, string> = {
  "molecules-ai": "enter-os",
};

export function getProjectBySlug(slug: string): Project | undefined {
  const canonical = LEGACY_PROJECT_SLUGS[slug] ?? slug;
  return projects.find((p) => p.slug === canonical);
}

export function getAllProjectSlugs(): string[] {
  return [...projects.map((p) => p.slug), ...Object.keys(LEGACY_PROJECT_SLUGS)];
}

export function localized(value: Bilingual, locale: Locale): string {
  return value[locale];
}
