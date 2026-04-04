import type { Locale } from "@/i18n/config";

export interface BlogPost {
  slug: string;
  date: string; // ISO date string
  readingTime: { en: number; zh: number };
  tags: string[];
  coverImage?: string;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string };
  content: { en: string; zh: string };
}

// Blog post registry — add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: "removing-ai-until-it-worked",
    date: "2025-06-15",
    readingTime: { en: 12, zh: 14 },
    tags: ["AI", "Architecture", "MCP", "Automation"],
    title: {
      en: "I Kept Removing AI Until It Worked",
      zh: "我一直在删 AI，直到它终于好使了",
    },
    subtitle: {
      en: "How I built an invoice automation system for Reno Stars by learning — the hard way — that more AI agents just means more problems.",
      zh: "给 Reno Stars 做报价系统的经历告诉我：AI agent 越多，麻烦越大。",
    },
    content: {
      en: `So I spent 5 days building an invoice automation system for Reno Stars, a renovation company. By the end, I'd rewritten the architecture 4 times. Each rewrite removed more AI. And each time, the system got more reliable.

This is the story of how I went from "let's use multiple AI agents to review each other's work" to "one smart LLM calling dumb, deterministic tools" — and why that turned out to be the answer all along.

## The Problem

Reno Stars generates renovation invoices — bathroom remodels, kitchen renovations, flooring, painting. Each invoice follows specific patterns: a tub-to-tiled-shower bathroom always has the same set of steps (demolition, drywall, shower wall, shower base, tile, glass door, vanity, fixtures...). But there are dozens of base configurations, each with optional add-ons and customizations.

A colleague had been writing these by hand, and all the patterns lived in their head. My job was to capture that knowledge and automate the whole thing.

## Day 1: Build the Knowledge Base

Before writing any code, I scraped 342 historical invoices from InvoiceSimple and converted them to markdown. Stripped all pricing — this system only handles scope of work, not numbers. Then I organized everything into 13 reference documents by trade: bathroom, kitchen, flooring, painting, electrical, plumbing, and so on.

This part was straightforward. I now had a structured knowledge base. The hard part was figuring out how to actually use it.

## Day 2: Composable Templates — Let AI Pick and Compose

My first real architecture: 35 base models (pre-written invoice templates), each with add-ons and replacement rules. The AI's job was simple — read the user's prompt, pick the right model, select the right add-ons, and a compose engine would mechanically stitch them together.

\`\`\`
User prompt → AI picks model + add-ons → Compose engine → Invoice
\`\`\`

This worked... kind of. The compose engine was deterministic, which was great. But the AI kept drifting from the templates. It'd add steps that didn't exist in any model. It'd rephrase things in subtle ways. Small hallucinations compounded into invoices that looked plausible but weren't quite right.

I thought: "The AI just needs more structure. More guardrails. More review."

That thought sent me down the wrong path for an entire day.

## Day 3: The Multi-Agent Rabbit Hole

This was the longest day. I rebuilt the entire system as a multi-agent pipeline:

1. **Extractor agent** — parses the user's prompt into a structured spec
2. **Reviewer agent** — validates the extraction, loops up to 4 times to correct mistakes
3. **Section agents** — one per trade, each doing a 2-turn conversation (review intake, then generate)
4. **Post-processor** — programmatic fixes to catch whatever the agents still got wrong
5. **Assembler** — stitches everything together

The idea was defense in depth. If one agent hallucinates, the next one catches it. More eyes on the problem. More layers of review.

**It made everything worse.**

The reviewer agent would "correct" things that were already right. The section agents would rephrase template text in ways that sounded fine but broke the format. Each layer of AI added its own hallucination surface. And debugging became a nightmare — when the output was wrong, which of the 4 AI stages caused it? Good luck figuring that out.

So I added a post-processor to programmatically fix common AI mistakes: strip hallucinated remarks, restore missing steps, enforce bold headings, remove duplicate entries. The post-processor kept growing. And at some point I stepped back and realized — I'm writing code to fix AI output... when I could just write code to generate the output correctly in the first place.

That was the turning point.

I disabled AI generation entirely and just used the preprocessed template directly. The section agent went from a 2-turn conversation (review + generate) to review only. Content generation became fully deterministic.

**The output immediately got more reliable.**

So I kept going. I built typed step objects — instead of AI modifying text, the system parsed templates into typed objects, applied modifications programmatically, and rendered back to markdown. No AI touches the content at all.

By the end of Day 3, most invoices generated with **zero AI tool calls**. The extraction still needed AI (you genuinely need language understanding to parse "I want a bathroom with a bench and double sink"), but everything after that was pure code.

## Day 4: The Final Architecture — MCP-First

Day 4 started with a big cleanup. I built a proper typed object model: step classes with \`build()\` methods, factory functions for base models, modifier functions for add-ons. Each step knows how to render itself. No central renderer, no parser, no compose engine.

\`\`\`
Factory function → SectionInvoice { steps: InvoiceStep[] }
→ Modifier functions mutate steps
→ buildSection() sorts by order, calls step.build()
→ Markdown output
\`\`\`

Then I deleted everything else. The entire multi-agent pipeline — extractor, reviewer, section agents, post-processor, AI client, trace logger — all gone. About 1,900 lines, just wiped.

In its place: an MCP server with 6 deterministic tools. (If you're not familiar with MCP — Model Context Protocol — think of it as a plugin system for LLMs. It lets an AI call external tools in a standardized way.)

\`\`\`
Claude Code Opus (the brain)
→ list_catalog — browse available models and modifiers
→ describe_item — inspect a model or modifier in detail
→ build_section — factory + modifiers + preferences → markdown
→ assemble_invoice — header + sections → final file
→ get_invoice — retrieve a saved invoice
→ list_invoices — list all saved invoices
\`\`\`

**Zero AI inside the server.** No API keys. No AI SDK dependencies. The MCP server is purely mechanical — structured input in, deterministic output out. Claude Code Opus is the only brain. It reads the user's prompt, reasons about what models and modifiers to use, and calls the tools.

Here's what I love about this: if a better LLM comes out tomorrow, I swap one thing. The tools don't change. The templates don't change. The step classes don't change. The intelligence is cleanly separated from the machinery.

The rest of Day 4 was pure expansion. I added 6 new bathroom models, 4 new sections (foyer, painting, flooring, rough-in), and a bunch of quality fixes. The typed architecture made this trivial — add a factory function, add some modifier functions, register them, done. No parser changes, no renderer changes, no prompt engineering. Just code.

## Day 5: E2E Testing and Polish

13 template fixes from end-to-end testing. Every single fix was localized to a specific step class or modifier function. No cascading failures. No "fixing this broke that."

Wrong output? Find the step class. Fix the \`build()\` method. Done.

That's it.

Compare that to Day 3 where a single wording change could ripple through the extractor, reviewer, section agent, and post-processor. Night and day.

## What I Learned

### More AI layers = more hallucination, not less

This was the big one. My gut told me that adding a reviewer agent would catch mistakes from the generator agent. In practice, each AI layer adds its own failure modes. The reviewer hallucinates corrections. The generator hallucinates content. You end up debugging interactions between AI agents instead of debugging your actual logic.

It's like playing a game of telephone — every retelling introduces distortion. Adding more people to the chain doesn't make the message clearer.

### One smart LLM + dumb tools > many AI agents

The final system has exactly one AI decision-maker: Claude Opus. It reads the prompt, picks the right models and modifiers, and calls deterministic tools. That's it.

**Don't distribute intelligence across multiple AI agents. Concentrate it in one capable model and give it well-defined, deterministic building blocks.**

This is the architecture I'd recommend to anyone building AI-powered automation right now.

### Code beats "AI review" every time

When I caught the AI hallucinating vanity types, I had two options: add another AI agent to review vanity selections, or write a 5-line function that maps user input to vanity type deterministically.

The function is faster, cheaper, 100% reliable, and debuggable. Not even close.

Every time I replaced an AI decision with a programmatic rule, reliability went up. Not because AI is bad — but because most of these decisions weren't actually ambiguous. "Double sink means vanity sink quantity = 2" doesn't need AI. It needs an if-statement.

### Bugs stay fixed with code. With prompts, they don't.

This one drove me crazy during the multi-agent phase.

With code, you find a bug, you fix it, and it's fixed forever. Done. Move on.

But with prompt engineering, fixing one thing often breaks something else. You tweak a prompt to stop hallucinating vanity types, and now it starts dropping fixture steps. You fix that, and suddenly the reviewer agent over-corrects in a different way. It's like whack-a-mole.

With the deterministic system, Day 5 was 13 bug fixes. Each one was surgical — change a step class, verify the output, done. None of them interfered with each other. That's just not possible when your logic lives in natural language prompts.

### Save AI for what's genuinely ambiguous

The one place AI genuinely earns its keep in this system: understanding user intent. "I want a master bathroom, tub to tiled shower, with a bench, double vanity, keep the existing exhaust fan" — parsing that into structured selections requires real language understanding. That's AI's job. Everything downstream is just code.

## The Numbers

| Metric | Multi-Agent Pipeline | MCP-First |
|--------|---------------------|-----------|
| AI calls per invoice | 4-8 | 0 (inside the server) |
| Lines of AI orchestration code | ~1,900 | 0 |
| AI dependencies | @ai-sdk/anthropic, @ai-sdk/openai, ai, dotenv | None |
| Debugging time per issue | 30-60 min (which agent?) | 5 min (which step class?) |
| Output reliability | ~85% (needed human review) | ~99% (deterministic) |

## Final Thoughts

I started this project thinking I'd build a sophisticated multi-agent system. I ended up building something way simpler — and way better. Reno Stars gets reliable invoices. I get a system I can maintain and extend without prompt engineering.

If you're building AI-powered automation, start by asking: "What parts of this actually need AI?" You might be surprised how small the answer is. Put your best model in charge of that small part, make everything else deterministic, and resist the urge to add more agents when something goes wrong.

The fix is almost never "more AI." It's usually "less AI, better code."`,
      zh: `花了 5 天，重写了 4 遍架构。每次重写都在干同一件事——删 AI。每次删完，系统都更靠谱。

这篇文章说的是：我怎么从「多个 AI agent 互相审核」折腾到「一个 LLM 调用一堆确定性工具」——以及为什么后者才是对的。

## 要解决什么问题

Reno Stars 做装修报价。卫生间改造、厨房翻新、地板、油漆，每种都有固定套路。比如「浴缸改瓷砖淋浴」的卫生间，步骤基本是死的：拆除、石膏板、淋浴墙、淋浴底盘、瓷砖、玻璃门、浴室柜、五金件……

但配置有好几十种基础版，每版还能加选项、做定制。

以前同事全靠脑子记。我的任务是：把这些东西弄出来，自动化。

## 第一天：搭知识库

先干了一件事：从 InvoiceSimple 拉了 342 张历史报价，转成 markdown。把价格全删了——这个系统只管工作范围，不管报价。然后按工种整理了 13 个参考文档：卫生间、厨房、地板、油漆、电气、水管……

知识库有了。难的是怎么用。

## 第二天：组合式模板——让 AI 挑和拼

第一个正式架构：35 个预写好的报价模板，每个都带附加项和替换规则。AI 只干一件事——读需求，选模板，选附加项。组合引擎机械地把它们拼起来。

\`\`\`
用户需求 → AI 选模板 + 附加项 → 组合引擎 → 报价
\`\`\`

勉强能用。组合引擎是确定性的，这块很稳。但 AI 老跑偏。它会加模板里不存在的步骤，会改措辞。小毛病一个接一个，最后生成的报价看着像那么回事，但其实不对。

我当时想的是：「AI 需要更多约束，更多护栏，更多审核。」

这个想法让我浪费了一整天。

## 第三天：多 Agent 的坑

最崩溃的一天。

我把系统拆成了多 agent 流水线：

1. **提取 agent** —— 把需求解析成结构化规格
2. **审核 agent** —— 校验提取结果，最多循环 4 次纠错
3. **分区 agent** —— 每个工种一个，各做两轮对话（先审输入，再出内容）
4. **后处理器** —— 用代码修 agent 还搞错的地方
5. **组装器** —— 拼在一起

思路是纵深防御。一个 agent 幻觉了，下一个能兜住。多几双眼睛，多几层审核。

**结果更烂了。**

审核 agent 会把对的东西「纠正」成错的。分区 agent 改着改着格式就乱了。每一层 AI 都带来自己的幻觉。调试更是噩梦——输出不对的时候，到底是 4 层里的哪一层搞的？鬼知道。

于是我加了后处理器，用代码修 AI 的常见毛病：删幻觉出来的备注、补丢失的步骤、强制格式、去重复条目。后处理器越写越长。

写着写着我突然想明白了——我在写代码修 AI 的输出……那我直接写代码生成正确的输出不就完了？

这就是转折点。

我把 AI 生成彻底关了，直接用预处理好的模板。分区 agent 从两轮对话（审核 + 生成）砍成只审核。内容生成变成纯确定性的。

**输出立刻就靠谱了。**

然后我继续往这个方向推。搭了类型化的步骤对象——系统把模板解析成带类型的对象，用代码改，再渲染回 markdown。AI 完全不碰内容。

第三天结束的时候，大部分报价已经是 **零 AI 调用** 了。提取环节还是要 AI（你确实需要语言理解来解析「我要一个带长凳和双水槽的卫生间」），但后面的全是纯代码。

## 第四天：最终架构——MCP 优先

第四天从大清理开始。搭了完整的类型化对象模型：步骤类带 \`build()\` 方法，工厂函数出基础模板，修改器函数处理附加项。每个步骤自己知道怎么渲染。没有中心渲染器，没有解析器，没有组合引擎。

\`\`\`
工厂函数 → SectionInvoice { steps: InvoiceStep[] }
→ 修改器函数操作步骤
→ buildSection() 按顺序排列，调用 step.build()
→ Markdown 输出
\`\`\`

然后其他东西全删了。多 agent 流水线——提取器、审核器、分区 agent、后处理器、AI 客户端、日志追踪——全没了。大约 1,900 行，直接清掉。

换上的是：一个有 6 个确定性工具的 MCP 服务器。（MCP 就是 Model Context Protocol，可以理解成 LLM 的插件系统，让 AI 标准化地调外部工具。）

\`\`\`
Claude Code Opus（大脑）
→ list_catalog — 看有哪些模板和修改器
→ describe_item — 查某个模板或修改器的详情
→ build_section — 工厂 + 修改器 + 偏好 → markdown
→ assemble_invoice — 表头 + 各分区 → 最终文件
→ get_invoice — 拿已保存的报价
→ list_invoices — 列出所有报价
\`\`\`

**服务器内部零 AI。** 不需要 API key，不需要任何 AI SDK。MCP 服务器就是个纯机械装置——结构化输入进去，确定性输出出来。Claude Code Opus 是唯一的大脑。它读需求，想清楚用什么模板和修改器，然后调工具。

这个架构我最喜欢的一点是：如果明天出了更好的 LLM，我只换一个组件。工具不变，模板不变，步骤类不变。智能和机械完全分离。

第四天剩下的时间就是纯扩展。加了 6 个新的卫生间模板、4 个新分区（门厅、油漆、地板、粗装），还有一堆质量修复。类型化架构让这些变得很简单——加个工厂函数，加几个修改器函数，注册一下，搞定。不用改解析器，不用改渲染器，不用调 prompt。就是写代码。

## 第五天：端到端测试

端到端测试发现了 13 个模板问题。每一个修复都精准定位到具体的步骤类或修改器函数。没有连锁反应，没有「修好这个那个又坏了」。输出有问题？找到那个步骤类，改 \`build()\` 方法，完事。

对比第三天，改一个措辞可能要动提取器、审核器、分区 agent 和后处理器。天壤之别。

## 我学到了什么

### 更多 AI 层 = 更多幻觉，不是更少

这是最大的教训。我以为加个审核 agent 能兜住生成 agent 的错误。实际上，每一层 AI 都有自己的故障模式。审核器会瞎纠正，生成器会瞎输出。最后你调试的不是业务逻辑，而是 AI agent 之间的互相干扰。

就像传话游戏——每传一次都走样。加更多人并不会让信息更准确。

### 一个聪明的 LLM + 笨工具 > 一堆 AI agent

最终系统里只有一个 AI 决策者：Claude Opus。它读需求，选模板和修改器，调确定性工具。就这样。

**不要把智能拆到多个 AI agent 里。集中在一个够强的模型上，给它清晰的确定性积木。**

这是我现在做 AI 自动化的标准架构。

### 代码永远赢「AI 审核」

当 AI 开始幻觉浴室柜类型的时候，我有两个选择：加一个 AI agent 来审核浴室柜的选择，或者写一个 5 行的函数把用户输入确定性映射到浴室柜类型。

函数更快、更便宜、100% 可靠、可调试。根本不在一个量级。

每次把一个 AI 决策换成代码规则，可靠性都在涨。不是因为 AI 不行——而是因为这些决策本来就不模糊。「双水槽意味着水槽数量 = 2」不需要 AI，需要的是 if 语句。

### 代码修了就是修了，prompt 修了还会坏

在多 agent 阶段，这事真的把我逼疯了。代码的 bug，你找到了，修了，就永远好了。但 prompt engineering 不一样，修一个东西经常搞坏另一个。你调了 prompt 不再幻觉浴室柜类型了，结果它开始漏五金件步骤。你修了那个，审核 agent 又开始在别的地方过度纠正。就像打地鼠。

用确定性系统的话，第五天的 13 个 bug 修复，每一个都是精准手术——改个步骤类，验证输出，完事。互不干扰。当你的逻辑活在自然语言 prompt 里时，这是不可能的。

### 把 AI 留给真正模糊的事

AI 在这个系统里真正发光的地方：理解用户意图。「我要一个主卫，浴缸改瓷砖淋浴，带长凳，双浴室柜，保留现有的排气扇」——把这句话解析成结构化选择，确实需要语言理解能力。这是 AI 的活。之后的一切都是代码。

## 数据对比

| 指标 | 多 Agent 流水线 | MCP 优先 |
| ---------------------- | ---------------- | --------------- |
| 每张报价的 AI 调用次数 | 4-8 | 0（服务器内部） |
| AI 编排代码行数 | ~1,900 | 0 |
| AI 依赖 | 4 个包 | 无 |
| 调试一个问题的时间 | 30-60 分钟 | 5 分钟 |
| 输出可靠性 | ~85%（需人工审） | ~99%（确定性） |

## 最后

我刚开始这个项目的时候，脑子里想的是搭一个精密的多 agent 系统。最后做出来的东西简单得多——也好用得多。

如果你在做 AI 自动化，先问自己：「这里面哪些部分真的需要 AI？」答案可能比你想的小得多。把你最好的模型放在那小块上，其他全做成确定性的。遇到问题的时候，忍住别加更多 agent。

解法几乎从来不是「更多 AI」，而是「更少 AI，更好的代码」。`,
    },
  },
  {
    slug: "wordpress-to-nextjs-migration",
    date: "2026-03-12",
    readingTime: { en: 8, zh: 9 },
    tags: ["Next.js", "WordPress", "Migration", "Freelance", "Case Study"],
    coverImage: "/blog/wordpress-to-nextjs/new-hero.jpg",
    title: {
      en: "WordPress → Next.js: Migrating a Renovation Company's Website",
      zh: "WordPress → Next.js：给装修公司做网站迁移",
    },
    subtitle: {
      en: "How I rebuilt Reno Stars from a sluggish WordPress site to a modern Next.js app — the real tradeoffs, challenges, and results.",
      zh: "我如何把 Reno Stars 从一个笨重的 WordPress 网站重建为现代 Next.js 应用——真实的取舍、挑战和结果。",
    },
    content: {
      en: `## Why Migrate?

My client [Reno Stars](https://reno-stars.com/) is a renovation company in Vancouver. Their WordPress site worked — it had content, SEO juice, and a decent design. But it was slow, hard to update, and plugin-heavy.

They came to me wanting something modern that actually loads fast on mobile (where most of their leads come from). Here's what I learned rebuilding it from scratch.

## The Old Stack vs New Stack

| | WordPress (Old) | Next.js (New) |
|---|---|---|
| **Framework** | WordPress + Elementor | Next.js 14 + Tailwind CSS |
| **CMS** | WordPress Admin + plugins | Custom Admin with AI + CRM |
| **Hosting** | Shared hosting | Vercel |
| **Load time** | ~4s | <1s |
| **Maintenance** | Plugin updates, security patches | Near zero |

## Visual Comparison

### Hero Section

The first thing visitors see. The old site had a generic Elementor layout. The new one is cleaner, more focused, and loads significantly faster.

**Before (WordPress):**
![Old hero section — WordPress + Elementor](/blog/wordpress-to-nextjs/old-hero.jpg)

**After (Next.js):**
![New hero section — Next.js + Tailwind CSS](/blog/wordpress-to-nextjs/new-hero.jpg)

### Services Section

Service cards got a complete redesign. Less visual clutter, better hierarchy, and the content is actually readable now.

**Before:**
![Old services page — heavy Elementor widgets](/blog/wordpress-to-nextjs/old-services.jpg)

**After:**
![New services section — clean card layout](/blog/wordpress-to-nextjs/new-services.jpg)

### Portfolio / Projects

The portfolio is where renovation companies win clients. The new version loads images lazily with Next.js Image optimization — no more waiting for a 3MB gallery to download.

**Before:**
![Old portfolio section](/blog/wordpress-to-nextjs/old-portfolio.jpg)

**After:**
![New portfolio with optimized images](/blog/wordpress-to-nextjs/new-portfolio.jpg)

### About & Testimonials

**Before:**
![Old about section](/blog/wordpress-to-nextjs/old-about.jpg)

**After:**
![New about section with stats and trust signals](/blog/wordpress-to-nextjs/new-about.jpg)

### Footer

Even the footer got cleaned up. Better information architecture, clear CTAs, and proper service area listing.

**Before:**
![Old WordPress footer](/blog/wordpress-to-nextjs/old-footer.jpg)

**After:**
![New streamlined footer](/blog/wordpress-to-nextjs/new-footer.jpg)

### Admin Panel

This is the biggest upgrade. WordPress gives you wp-admin — a generic dashboard with 30+ sidebar items, half of them from plugins, none of them branded. My client doesn't need to know what "Yoast SEO" or "Elementor Templates" means.

The new admin is purpose-built: clean dashboard with at-a-glance content counts, organized into Portfolio, Content, CRM, and Settings. Bilingual toggle (English/中文) right in the header — essential for a Vancouver renovation company serving Chinese-speaking clients. And it has AI-powered features for content generation baked right in.

**Before (WordPress wp-admin):**
![Generic WordPress login and admin](/blog/wordpress-to-nextjs/old-admin.jpg)

**After (Custom Admin Panel):**
![Custom Next.js admin dashboard — clean, branded, bilingual](/blog/wordpress-to-nextjs/new-admin.jpg)

The projects management page alone shows the difference. Instead of navigating WordPress's "Custom Post Types" with ACF fields, the client sees a clean table with all the fields that matter: PO number, title, city, featured status, published status — with search, tabs for filtering, and one-click actions.

![Project management — clean table with search, tabs, and inline actions](/blog/wordpress-to-nextjs/new-admin-projects.jpg)

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

I built a custom admin panel that goes beyond what WordPress offered:
- **Portfolio management** — Projects, Services, Service Areas, with batch upload for renovation photos
- **Content management** — Blog posts, FAQs, Gallery, Social Posts, Trust Badges, Partners
- **CRM** — Contact tracking (WordPress needed a separate plugin for this)
- **AI-powered features** — Content generation and optimization built directly into the workflow
- **Bilingual** — English/中文 toggle throughout, not a $99/year WPML plugin

It's simpler than WordPress admin, which is actually a feature — fewer things to break, and everything is relevant to running a renovation business.

### 3. Performance Wins

Next.js with server components and image optimization made a massive difference:

- **First Contentful Paint:** 4.2s → 0.8s
- **Largest Contentful Paint:** 6.1s → 1.2s
- **Total page weight:** 3.8MB → 890KB

For a renovation company, this matters. Someone searching on their phone at a job site doesn't wait 4 seconds.

### 4. Bilingual Support

Reno Stars serves both English and Chinese-speaking clients in Vancouver. WordPress handled this with WPML (expensive, buggy). In Next.js, I implemented i18n with \`next-intl\` — cleaner routing, no plugin conflicts.

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

If you're thinking about migrating a client from WordPress to Next.js — do it, but respect the SEO migration. That's where the real work is.`,
      zh: `## 为什么要迁移？

我的客户 [Reno Stars](https://reno-stars.com/) 是温哥华的一家装修公司。他们的 WordPress 网站能用——有内容、有 SEO 积累、设计也过得去。但它很慢，很难更新，插件一大堆。

他们找到我，想要一个在手机上加载快的现代网站（大部分客户都是手机端来的）。以下是我从零重建中学到的东西。

## 新旧技术栈对比

| | WordPress（旧） | Next.js（新） |
|---|---|---|
| **框架** | WordPress + Elementor | Next.js 14 + Tailwind CSS |
| **CMS** | WordPress 后台 + 插件 | 自建后台（AI + CRM） |
| **托管** | 共享主机 | Vercel |
| **加载时间** | ~4秒 | <1秒 |
| **维护** | 插件更新、安全补丁 | 几乎为零 |

## 视觉对比

### 首页 Hero 区域

访客看到的第一个东西。旧网站用的是 Elementor 通用模板，新版更干净、更聚焦，加载快得多。

**改版前（WordPress）：**
![旧 Hero 区域 — WordPress + Elementor](/blog/wordpress-to-nextjs/old-hero.jpg)

**改版后（Next.js）：**
![新 Hero 区域 — Next.js + Tailwind CSS](/blog/wordpress-to-nextjs/new-hero.jpg)

### 服务区域

服务卡片完全重新设计。视觉噪音更少，层次更清晰，内容终于能好好阅读了。

**改版前：**
![旧服务页面 — 笨重的 Elementor 组件](/blog/wordpress-to-nextjs/old-services.jpg)

**改版后：**
![新服务区域 — 干净的卡片布局](/blog/wordpress-to-nextjs/new-services.jpg)

### 作品集 / 项目展示

作品集是装修公司赢得客户的关键。新版用 Next.js Image 优化懒加载图片——不用再等 3MB 的图库下载了。

**改版前：**
![旧作品集](/blog/wordpress-to-nextjs/old-portfolio.jpg)

**改版后：**
![新作品集，图片已优化](/blog/wordpress-to-nextjs/new-portfolio.jpg)

### 关于我们 & 客户评价

**改版前：**
![旧关于页面](/blog/wordpress-to-nextjs/old-about.jpg)

**改版后：**
![新关于页面，带数据和信任标识](/blog/wordpress-to-nextjs/new-about.jpg)

### 页脚

页脚也清理了。更好的信息架构，清晰的 CTA，以及完善的服务区域列表。

**改版前：**
![旧 WordPress 页脚](/blog/wordpress-to-nextjs/old-footer.jpg)

**改版后：**
![新版精简页脚](/blog/wordpress-to-nextjs/new-footer.jpg)

### 后台管理面板

这是最大的升级。WordPress 的 wp-admin 是通用后台——30 多个侧边栏项目，一半来自插件，没有一个带品牌。我的客户不需要知道什么是"Yoast SEO"或"Elementor 模板"。

新后台是定制的：干净的仪表盘一目了然地显示内容数量，分为作品集、内容、CRM 和设置。标题栏有中英文切换——这对温哥华服务华人客户的装修公司来说至关重要。还内置了 AI 辅助内容生成功能。

**改版前（WordPress wp-admin）：**
![通用 WordPress 登录和后台](/blog/wordpress-to-nextjs/old-admin.jpg)

**改版后（自建管理后台）：**
![自建 Next.js 后台——干净、品牌化、双语](/blog/wordpress-to-nextjs/new-admin.jpg)

光是项目管理页面就能看出区别。不再需要在 WordPress 的"自定义文章类型"里用 ACF 字段导航，客户看到的是一个干净的表格：PO 编号、标题、城市、精选状态、发布状态——带搜索、标签过滤和一键操作。

![项目管理——干净的表格，带搜索、标签和内联操作](/blog/wordpress-to-nextjs/new-admin-projects.jpg)

## 真正重要的事

### 1. SEO 迁移才是硬活

装修行业靠的是 Google。Reno Stars 在"Vancouver renovation contractor"这类关键词上有排名——丢掉这些就是灾难。

我必须：
- 把每个旧 URL 映射到新的对应 URL
- 设置正确的重定向（301，不是 302）
- 保持相同的 meta 结构和 schema 标记
- 保留站点地图并重新提交

**经验：** 不要只重建前端。先审计每个 URL。

### 2. CMS 的问题

WordPress 最大的优势是后台。非技术客户可以自己更新内容。拿走这个等于降级，除非你替代它。

我建的自定义后台比 WordPress 的更强：
- **作品集管理** — 项目、服务、服务区域，支持装修照片批量上传
- **内容管理** — 博客、FAQ、图库、社交帖子、信任徽章、合作伙伴
- **CRM** — 联系人跟踪（WordPress 需要单独的插件）
- **AI 功能** — 内容生成和优化直接内置到工作流中
- **双语** — 全程中英文切换，不是 99 美元/年的 WPML 插件

它比 WordPress 后台简单，这其实是个优点——更少的东西会坏，所有功能都跟装修业务相关。

### 3. 性能提升

Next.js 的服务器组件和图片优化带来了巨大差异：

- **首次内容绘制：** 4.2秒 → 0.8秒
- **最大内容绘制：** 6.1秒 → 1.2秒
- **页面总大小：** 3.8MB → 890KB

对装修公司来说这很重要。工地上用手机搜索的人不会等 4 秒。

### 4. 双语支持

Reno Stars 同时服务温哥华的英语和中文客户。WordPress 用 WPML 处理（贵、bug 多）。在 Next.js 里，我用 \`next-intl\` 实现了 i18n——更干净的路由，没有插件冲突。

## 坦诚的取舍

不是所有方面都更好：

- **客户自助更难** — 即使有自建 CMS，WordPress 对非技术用户更友好
- **插件生态没了** — 需要联系表单？自己建。需要分析？自己接
- **开发成本更高** — 用 WordPress 主题做网站初期更快

但对于需要速度、可靠性和专业网络形象的企业来说，这个取舍值得。

## 如果重来

- 写任何代码之前先做 URL 审计
- CMS 功能和前端并行开发，不要之后再做
- 从第一天就用真实内容搭建 staging 环境（不要 lorem ipsum）

## 结果

新网站已在 [reno-stars-nextjs.vercel.app](https://reno-stars-nextjs.vercel.app/) 上线，即将替换生产站点。它更快、更干净，客户终于不用每周打电话找我了。

如果你在考虑把客户从 WordPress 迁移到 Next.js——做吧，但要尊重 SEO 迁移。那才是真正的工作量所在。`,
    },
  },
];

// Helper functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function getPostTitle(post: BlogPost, locale: Locale): string {
  return post.title[locale];
}

export function getPostSubtitle(post: BlogPost, locale: Locale): string {
  return post.subtitle[locale];
}

export function getPostContent(post: BlogPost, locale: Locale): string {
  return post.content[locale];
}

export function getReadingTime(post: BlogPost, locale: Locale): number {
  return post.readingTime[locale];
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
