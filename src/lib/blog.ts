import type { Locale } from "@/i18n/config";

export interface BlogPost {
  slug: string;
  date: string; // ISO date string
  readingTime: { en: number; zh: number };
  tags: string[];
  coverImage?: string;
  youtubeId?: string;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string };
  content: { en: string; zh: string };
}

// Blog post registry — add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: "ai-is-just-a-hack",
    date: "2026-06-15",
    readingTime: { en: 5, zh: 5 },
    tags: ["AI", "LLM", "Loop Engineering", "George Hotz"],
    coverImage: "/blog/ai-is-just-a-hack/cover.png",
    youtubeId: "FrJbyYUlRAQ",
    title: {
      en: "AI Is Just a Hack. So Was Newton.",
      zh: "AI 只是个 hack\u2014\u2014牛顿力学也是",
    },
    subtitle: {
      en: "George Hotz says the whole AI route is a hack. He's right about the diagnosis \u2014 and wrong about the conclusion. Here's why a bounded, imperfect hack is exactly how progress works.",
      zh: "George Hotz 说整条 AI 路线就是个 hack。诊断没错，结论错了\u2014\u2014为什么一个有边界、不完美的 hack，恰恰就是进步本来的样子。",
    },
    content: {
      en: `George Hotz — the guy who jailbroke the original iPhone and built tinygrad — set AI Twitter on fire by saying the whole AI direction is wrong: large models are just a hack, cobbled together, not a rigorous technical system.

He's not wrong about the diagnosis. Anyone who's looked under the hood knows today's LLMs are a giant probability game. They don't understand logic or the rules of the real world; they fit a distribution over text from massive data and statistically *guess* output that looks fluent and correct. Architecturally it really is an improvised hack — there's no complete, self-consistent theory of intelligence underneath.

Where I disagree is the conclusion: that we should therefore throw the whole route out.

## A hack that still moves the world

Even if AI is only a stage hack, it has genuinely raised productivity across industries and solved real problems that were stuck for years. That counts.

Look at the history of science: there has never been a perfect, one-shot ultimate technology. The flawed, approximate, even "wrong" temporary solutions are exactly the stepping stones to the next, more rigorous thing. Without those imperfect intermediate steps to accumulate practice, we never find the direction closer to the truth.

## Newton was a hack too

Take the physics everyone learned. Newtonian mechanics, viewed from relativity and quantum mechanics, is a bounded, incomplete approximation — in a sense, its own way of simplifying the world. At high speed, strong gravity, or the quantum scale, Newton's laws break down completely and can't describe reality.

And yet — even though Einstein overturned its underlying logic — engineering, aerospace, mechanical, and civil work still run on Newtonian mechanics today. Why? Because in the overwhelming majority of everyday situations the approximation is precise *enough*, cheaper, and simpler to compute. Its flaws only show up at extreme, special conditions that don't touch the value it creates every day.

AI is exactly the same.

## Manage the hack — don't worship or trash it

We fully admit current LLMs and agents are probability-fitting stage hacks with inherent flaws and blind spots you can't fully remove. But you don't discard something just because it isn't perfect.

This is the whole logic behind what I've been calling **loop engineering** — and the three production AI loops we run on Molecule AI. We *know* AI has limits, so we wrap it in a closed loop of safeguards: multi-layer verification, human oversight on top, heterogeneous model cross-review, and objective tests as the hard backstop. Engineering patches the hack's weaknesses and plays to its strengths.

If we insist on chasing a flawless ultimate technology and reject every imperfect transition, progress simply stops. Every efficiency gain, every round of trial and error — flaws and all — paves the road to the more rigorous tech that comes next.

Hotz pointing at AI's foundational flaws is a valuable, clear-eyed reminder: don't blindly hand everything to AI, and don't let autonomous loops run unattended. But we shouldn't swing to the other extreme and write off the productivity revolution this stage of AI is delivering.

See clearly that it's a hack, hold the engineering line, and use the leverage it gives you. That's the more honest — and more useful — position.`,
      zh: `破解过初代 iPhone、写出 tinygrad 的 George Hotz，最近一句话引爆了 AI 圈：整条 AI 路线根本就是错的，大模型只是一套取巧拼凑出来的 hack，算不上正经严谨的技术体系。

平心而论，他这句话没说错。但凡稍微摸透 AI 底层原理的人都清楚，当前主流大模型的本质就是一场巨型概率游戏：它不理解逻辑、不懂真实世界规则，只是靠海量数据拟合文字分布，用统计概率"猜"出看起来通顺、正确的输出。从底层架构来说，它确实是临时凑出来的 hack，没有完整、自洽的底层智能理论支撑。

但我不认同他全盘否定这条路线的结论。

## 一个 hack，照样推动世界

就算 AI 只是个阶段性 hack，它也实实在在拉高了各行各业的生产效率，落地解决了大量过去难以推进的问题。

回看整个科技史，从来不存在一步到位、完美无缺的终极技术。无数在后世看来有缺陷、近似、甚至"错误"的临时方案，恰恰是推动下一代更严谨科技诞生的垫脚石。没有这些不完美的过渡做实践积累，我们根本摸不到更接近真理的方向。

## 牛顿力学也是个 hack

举个所有人都学过的例子。牛顿经典力学，放到相对论、量子力学的维度看，本身就是一套有适用边界、不够完整的近似模型——某种意义上，也是简化世界的 hack。在高速、强引力、微观粒子的场景下，牛顿定律会完全失效。

可哪怕爱因斯坦颠覆了它的底层逻辑，时至今日，工程、航天、机械、建筑领域依然在大规模使用牛顿力学。为什么？因为在日常绝大多数场景里，这套近似精度完全够用，成本更低、计算更简单。它的缺陷只出现在极端条件下，完全不影响日常创造价值。

AI 也一模一样。

## 管好这个 hack，而不是神化或抛弃它

我们完全承认，当前 LLM、AI 智能体只是概率拟合的阶段性 hack，有固有缺陷、有无法根除的盲区。但不能因为它不完美，就否定它当下的价值。

这正是我一直在讲的**循环工程**、以及我们在 Molecule AI 上落地三套企业级 AI 循环的核心逻辑：我们清楚 AI 有局限，所以用多层校验、人工上层监管、异构模型互审、客观测试兜底的闭环系统，去弥补这个 hack 的缺陷，扬长避短。

如果一味追求底层绝对完美、拒绝一切有缺陷的过渡方案，人类科技只会停滞不前。每一次效率提升、每一轮试错，哪怕有短板，都是在为未来更严谨的科技铺路。

George Hotz 指出 AI 底层的缺陷，是非常珍贵、清醒的提醒：警惕盲目全量依赖 AI、放任无人自主循环。但我们不该走向另一个极端，全盘否定现阶段 AI 的生产力革命。

看清它只是个 hack、守住工程管控的底线，同时用好它的效率杠杆——这才是更客观、更务实的选择。`,
    },
  },

  {
    slug: "loop-engineering-promotes-the-human",
    date: "2026-06-14",
    readingTime: { en: 7, zh: 8 },
    tags: ["AI", "Agents", "Loop Engineering", "AI Governance"],
    coverImage: "/blog/loop-engineering/cover.png",
    youtubeId: "irSJWiU-1IA",
    title: {
      en: "Loop Engineering Doesn't Remove the Human. It Promotes One.",
      zh: "循环工程不是去掉人，而是给人升职",
    },
    subtitle: {
      en: "Everyone read \"loops mean no humans, agents running 24/7.\" That's the part they got wrong \u2014 and the honest catch nobody mentions about agents checking agents.",
      zh: "所有人都读成了\u201c循环意味着没有人、agent 7\u00d724 自动跑\u201d\u2014\u2014这恰恰是他们搞错的地方，以及 agent 检查 agent 这件事里没人提的那个诚实的坑。",
    },
    content: {
      en: `There's a sentence that broke AI-coding Twitter in June 2026. Peter Steinberger — the creator of OpenClaw — posted that you shouldn't be prompting coding agents anymore; you should be designing loops that prompt your agents. A few days earlier Boris Cherny, who runs Claude Code at Anthropic, had said almost the same thing from the inside: he doesn't prompt Claude anymore, he writes loops, and the loops do the prompting.

Two sentences, millions of views, and a week of people arguing about what a "loop" actually was. Here's the version that actually holds up — and the part almost everyone gets wrong.

## What loop engineering actually is

For about two years, getting work out of a coding agent meant holding it the whole time. You write a prompt, read what comes back, write the next one. You are the loop. You are the thing deciding what happens on every turn.

Loop engineering is the move from *being* the loop to *building* it. You design a small system that finds the work, hands it to an agent, checks the result, writes down what's done, and decides the next action — on a schedule, or until a goal is actually met. Then you let that system poke the agents instead of doing it yourself.

Addy Osmani, who wrote the reference piece on this, breaks a working loop into five pieces plus one:

1. **Automations** — something fires on a schedule and does discovery and triage on its own.
2. **Worktrees** — isolated checkouts so two agents working in parallel don't overwrite each other.
3. **Skills** — your project knowledge written down once, so the agent stops re-guessing it every session.
4. **Connectors** — the agent reaches your real tools: the issue tracker, the database, Slack, the staging API.
5. **Sub-agents** — one agent has the idea, a *different* one checks it.

And the sixth, the one that quietly makes or breaks everything: **persistent state**. A markdown file, a Linear board, anything that lives outside the single conversation. The model forgets everything between runs. The repo doesn't. The state file is the spine — tomorrow's run picks up exactly where today's stopped.

That's loop engineering. Not a bigger prompt. A system that discovers, assigns, verifies, remembers, and knows when to stop.

## The part everyone gets wrong

The popular summary is "loop engineering means no humans — agents running 24/7, fully autonomous." That's the misconception, and it's worth killing carefully, because the truth is more useful.

Loop engineering removes the human from *one specific position*: the per-prompt driver's seat. You stop being the one poking the agent turn by turn. It does **not** remove human oversight. Osmani is blunt about this — a loop running unattended is also a loop making *mistakes* unattended. Verification doesn't disappear. It moves up a level.

The cleanest way to say it borrows language the AI-governance world has been using all year:

- **Human-in-the-loop (HITL):** a human approves before anything happens. Slow, safe, doesn't scale.
- **Human-on-the-loop (HOTL):** agents run autonomously through their own decide-act cycle; the human monitors via dashboards and alerts and steps in only on exceptions — one person overseeing many agents in parallel instead of micromanaging each step.
- **Human-out-of-the-loop:** fully autonomous, fine for low-risk reversible actions.

So loop engineering isn't "remove the human." It's **relocation, not elimination.** You move from in-the-loop to on-the-loop. You stop approving every step and start designing the system and owning the exceptions. That distinction is also the honest answer to the "isn't this dangerous / isn't this hype" objection: the human never leaves. They get promoted from operator to architect.

## The design that actually works

If the human is on the loop, two things have to be true: agents have to check each other, and the human needs a single place to handle what the agents can't.

**Agents reviewing agents** is the most-endorsed structural pattern in the whole conversation, and the logic is simple: the model that wrote the code is far too generous grading its own homework. A second agent — different instructions, ideally a different model — catches what the first one talked itself into. The reason this matters specifically *inside a loop* is that the loop runs while you're not watching. A verifier you actually trust is the only reason you can walk away.

There's a great line from the original thread: a loop with nothing in it that can say *no* is just the agent agreeing with itself on repeat.

**The human dashboard** is the other half. Anything the loop can't resolve lands in a triage inbox — an approval queue the human works through when they have time, instead of being interrupted on every action. That's your HOTL realization: the agents handle the routine, the dashboard surfaces the exceptions, the human spends their attention only where judgment is actually required.

Picture an airline rebooking agent. Most passengers get rebooked automatically — out of the loop. A first-class international itinerary with a loyalty override hits a policy boundary, so the agent pauses, packages the context, and routes an approval request to a senior human — in the loop. Meanwhile a supervisor agent watches the whole flow for anomalies like unusual cost spikes. All three oversight levels, one system.

## The catch nobody mentions (and the fix)

Here's where most takes stop, and where the credibility actually lives: **agents checking agents is not a free lunch.**

The core failure is correlated error. If your worker and your reviewer are the same model, they share the same blind spots — models even score their own output higher when they recognize it. Stack several agents voting and it gets worse: they can converge on the same wrong answer with total confidence, and a judge model facing a 3-against-1 split will often side with the majority even when the lone dissenter is right. The raw numbers are sobering — LLM-as-judge error rates climb past 50% on genuinely complex tasks, and most teams still keep humans involved in evaluation for exactly this reason.

So the verifier can't just be "another opinion." Two fixes make it real:

1. **Anchor verification in something objective.** A test that passes, a type checker, a real API response, a build that actually compiles — something external that can say *no* regardless of what any model believes. Agent-as-reviewer *plus* a hard external check beats agent-reviewing-agent alone every time.
2. **Use a different, stronger model as the reviewer.** Different family, different blind spots. This single change kills most of the correlated-error problem.

And watch for the dashboard's own failure mode: **governance theater** — a human nominally approving actions they don't have the context to actually evaluate, rubber-stamping a queue and calling it oversight. A dashboard that floods you with approvals you can't meaningfully judge is *worse* than no dashboard, because it manufactures false confidence. Real HOTL means the human sees enough — the trace, the reasoning, the cost — to make the call count.

## Where this is heading

This isn't just an architecture preference anymore. The EU AI Act (Article 14) and NIST's risk framework now write human oversight into law. "Audit, HITL, RBAC" has gone from nice-to-have to a buying gate. The teams that designed oversight in from the start are about to have a real advantage over the ones bolting it on.

This is the bet I'm making with what I'm building — a control plane where agents are organized like a company, every cross-agent call lands in one observable timeline, and the HITL ladder (no-approval, single-reviewer, dual-reviewer) is configured per role and graded by risk. Because the platform is model-agnostic per role, you can wire a stronger model as the reviewer for exactly the correlated-error reason above. The loop runs; you stay on it.

## The one line to remember

Osmani put it best: two people can build the identical loop and get opposite results. One uses it to move faster on work they understand deeply. The other uses it to avoid understanding the work at all. The loop can't tell the difference. You can.

So build the loop. Just build it like someone who plans to stay the engineer — not the person who presses go. The work didn't get easier. The leverage point moved.`,
      zh: `2026 年 6 月，有一句话引爆了 AI 编程圈。OpenClaw 的作者 Peter Steinberger 发帖说：你不该再去给编程 agent 写提示词了，你该去设计那个替你给 agent 写提示词的循环。几天前，在 Anthropic 负责 Claude Code 的 Boris Cherny 从内部说了几乎一样的话：他已经不再给 Claude 写提示词了，他写循环，循环来写提示词。

两句话，几百万次浏览，然后是整整一周关于"循环到底是什么"的争论。下面是真正站得住脚的那个版本——以及几乎所有人都搞错的那一部分。

## 循环工程到底是什么

差不多两年来，想让一个编程 agent 干活，意味着你得全程盯着它。你写一个提示词，读它返回的东西，再写下一个。你就是那个循环。每一轮发生什么，都是你在决定。

循环工程，就是从"**当**这个循环"转向"**搭建**这个循环"。你设计一个小系统：它去发现要做的活、交给 agent、检查结果、记下做完了什么、决定下一步——按计划执行，或者一直跑到目标真正达成为止。然后你让这个系统去戳 agent，而不是你自己去戳。

写下这个领域参考文章的 Addy Osmani，把一个能用的循环拆成五块加一块：

1. **自动化（Automations）**——某个东西按计划触发，自己完成发现和分诊。
2. **工作树（Worktrees）**——隔离的代码检出，让两个并行干活的 agent 不会互相覆盖。
3. **技能（Skills）**——把你的项目知识写下来一次，让 agent 不用每个会话都重新猜。
4. **连接器（Connectors）**——让 agent 够得到你真实的工具：问题追踪、数据库、Slack、预发布 API。
5. **子 agent（Sub-agents）**——一个 agent 出主意，另一个**不同的** agent 去检查它。

还有第六块，那个悄无声息却决定成败的：**持久化状态**。一个 markdown 文件、一块 Linear 看板，任何活在单次对话之外的东西。模型在每次运行之间会忘掉一切，但仓库不会。状态文件就是脊柱——明天的运行从今天停下的地方精确接上。

这就是循环工程。不是更大的提示词，而是一个会发现、会分派、会验证、会记忆、并且知道何时该停的系统。

## 所有人都搞错的那部分

流行的总结是"循环工程意味着没有人——agent 7×24 全自动跑"。这就是那个误解，值得仔细把它杀掉，因为真相更有用。

循环工程把人从**一个特定的位置**上移走了：逐条提示词的驾驶座。你不再是那个一轮一轮去戳 agent 的人。但它**并没有**移走人的监督。Osmani 说得很直白——一个无人值守地运行的循环，也是一个无人值守地**犯错**的循环。验证没有消失，它往上挪了一层。

要说清楚这件事，最干净的办法是借用 AI 治理圈这一年一直在用的语言：

- **人在环内（HITL）：** 任何事发生之前都要人先批准。慢、安全、不可规模化。
- **人在环上（HOTL）：** agent 自主地跑完自己的"决策—行动"循环；人通过看板和告警来监控，只在异常时介入——一个人同时监督许多并行的 agent，而不是对每一步都微观管理。
- **人在环外：** 完全自主，对低风险、可逆的操作没问题。

所以循环工程不是"去掉人"，而是**重新安置，不是消除。**你从环内挪到环上。你不再批准每一步，而是开始设计这个系统、并对异常负责。这个区分，也是对"这不危险吗 / 这不是炒作吗"的诚实回答：人从未离开，他只是从操作员被**提拔**成了架构师。

## 真正有效的设计

如果人在环上，那有两件事必须成立：agent 必须互相检查，而且人需要一个统一的地方来处理 agent 搞不定的事。

**agent 审查 agent**是整场讨论里被最多人背书的结构性模式，逻辑很简单：写出这段代码的模型，给自己的作业打分时太宽容了。第二个 agent——不同的指令，最好是不同的模型——能抓到第一个 agent 自己说服了自己的地方。这件事**在循环内部**之所以尤其重要，是因为循环在你不看的时候照样跑。一个你真正信得过的验证者，是你敢走开的唯一理由。

原帖里有一句很妙的话：一个里面没有任何东西能说**不**的循环，不过是 agent 在反复地同意自己。

**人的看板**是另一半。任何循环解决不了的事，都落进一个分诊收件箱——一个人有空时才处理的审批队列，而不是每个动作都来打断你。这就是你的 HOTL 落地：agent 处理常规，看板浮出异常，人只把注意力花在真正需要判断的地方。

想象一个航空改签 agent。大多数乘客被自动改签——环外。一段触发了忠诚度覆盖规则的头等舱国际行程撞上了政策边界，于是 agent 暂停、打包上下文、把审批请求路由给一位资深人类——环内。与此同时，一个监督 agent 盯着整个流程，看有没有成本异常飙升之类的反常。三个监督层级，一个系统。

## 没人提的那个坑（以及解法）

大多数观点到这里就停了，而可信度恰恰活在这里：**agent 检查 agent 不是免费的午餐。**

核心的失败是相关性错误。如果你的执行者和你的审查者是同一个模型，它们共享同样的盲区——模型甚至会给它认出来是自己写的输出打更高的分。叠几个 agent 来投票会更糟：它们会带着十足的自信收敛到同一个错误答案上，而一个面对 3 比 1 分裂的裁判模型，往往会站在多数那边，哪怕那个孤独的反对者才是对的。原始数字令人清醒——在真正复杂的任务上，LLM-as-judge 的错误率会爬过 50%，而大多数团队至今仍让人参与评估，正是因为这个。

所以验证者不能只是"另一个意见"。两个修复让它变真：

1. **把验证锚在客观的东西上。**一个通过的测试、一个类型检查器、一个真实的 API 响应、一次真的能编译通过的构建——某个外部的、不管任何模型怎么相信都能说**不**的东西。agent 当审查者**加上**一道硬性外部检查，每次都胜过单靠 agent 审 agent。
2. **用一个不同的、更强的模型当审查者。**不同家族，不同盲区。这一个改动就能消掉相关性错误的大部分问题。

还要提防看板自己的失败模式：**治理表演**——一个人名义上在批准他根本没有上下文去真正评估的操作，把队列橡皮图章一盖，就管这叫监督。一个用你无法有意义判断的审批把你淹没的看板，比没有看板**更糟**，因为它制造了虚假的信心。真正的 HOTL 意味着人看得到足够的东西——轨迹、推理、成本——让这一次裁决算数。

## 这件事会走向哪里

这已经不只是一种架构偏好了。欧盟《AI 法案》（第 14 条）和 NIST 的风险框架，现在把人的监督写进了法律。"审计、HITL、RBAC"已经从锦上添花变成了采购的硬门槛。那些从一开始就把监督设计进去的团队，即将对那些事后才往上焊的团队，握有一个真实的优势。

这就是我正在搭建的东西所押的注——一个把 agent 像一家公司一样组织起来的控制平面：每一次跨 agent 的调用都落进同一条可观测的时间线，而 HITL 阶梯（不审批、单审查者、双审查者）按角色配置、按风险分级。因为这个平台在每个角色上都是模型无关的，你可以正是出于上面那个相关性错误的理由，给审查者接一个更强的模型。循环在跑，你在环上。

## 一句话记住它

Osmani 说得最好：两个人可以搭出一模一样的循环，得到相反的结果。一个人用它在自己深刻理解的工作上跑得更快，另一个人用它来彻底逃避理解这份工作。循环分不出这两者的区别。你能。

所以，去搭那个循环。只是，要像一个打算继续当工程师的人那样去搭——而不是那个只负责按"开始"的人。工作没有变得更容易，是杠杆的支点挪了位置。`,
    },
  },

  {
    slug: "cognitive-gap-is-the-opportunity",
    date: "2026-06-11",
    readingTime: { en: 5, zh: 6 },
    tags: ["AI", "Entrepreneurship", "Business", "Opportunity"],
    coverImage: "/blog/cognitive-gap-is-the-opportunity/cover.png",
    title: {
      en: "Most People Still Can't Use AI. That Gap Is Your Business.",
      zh: "大部分人还不会用AI，这个差距就是你的生意",
    },
    subtitle: {
      en: "Half the world has never touched AI. You use it daily. Two small client stories about why that asymmetry is the clearest business opportunity since the early internet.",
      zh: "世界上一半的人从没碰过 AI，而你每天都在用。两个真实的客户故事，讲清楚为什么这个不对称是互联网早期以来最清晰的商业机会。",
    },
    content: {
      en: `Most people on this planet have not used AI in any real way. Half of them have never touched it at all. Meanwhile, you — reading this — probably use it every day.

That difference is not a fun fact. It is a market.

## The internet déjà vu

Think back to the late 90s. The internet had just arrived, and most people called it a bubble. Almost nobody predicted that selling things online — e-commerce, livestream shopping, creator economies — would mint fortunes. It all sounded absurd. Then the internet deleted a generation of old jobs and invented a generation of new ones nobody had imagined.

Today's AI is at exactly that point on the curve. The infrastructure has just matured: the frontier models from OpenAI and Anthropic crossed the threshold from impressive demo to genuinely usable tool, and inference prices keep falling. The models ordinary people can afford today already handle most everyday work.

Jensen Huang put it bluntly: AI made his company's productivity explode — and they are hiring more people because of it, not fewer. The same week I heard founders quietly say the opposite about their industries. Both things are true. That is what a platform shift looks like.

## Stuck at the chat box

Steve Jobs had a product philosophy that sounded arrogant and turned out to be right: people do not know what they want until you show them. The iPhone redefined what a phone was, and the whole world followed.

AI is in its pre-iPhone moment. If you are reading this, you have probably gone deep — agents, automation, real workflows. Now look around: most people are still typing questions into a single chat box. They have no idea that today's AI can build a complete website, edit videos, write songs, run marketing, and answer customers around the clock.

They are not stupid. Nobody has brought AI to them yet.

## Two small, real examples

**Case one.** A client had an aging WordPress site. He spent days trying to add a single page and failed — those tools were never built for him. I rebuilt his front end, added a proper admin, and deployed an SEO agent on my platform that works on his organic traffic 24/7. Now when he wants two new pages, he tells the agent in one sentence. It costs him cents. After the first time he said: I had no idea it could be this easy.

**Case two.** Another client wanted SMS marketing for an event. Register a Twilio account, let AI write the script, send to every customer with a full delivery report — under half an hour, end to end, even for someone who cannot code.

The pattern: for anyone fluent in AI, both jobs were trivial. For the clients, they were impossible. They were never unwilling to pay. They simply did not know this was possible.

## The gap is the business

Why do most people stay on the surface? Two honest reasons. First, people are exhausted by their own lives; nobody has spare energy for new things until the new thing is shoved in front of their face. Second, good AI tools cost money, and a normal person will not pay tens or hundreds of dollars a month for a toy they have no clear use for.

Stack those two barriers and you get a massive cognitive gap — and if you are fluent in AI, you are standing on the profitable side of it.

You do not need to invent anything. No new model, no new product, no infrastructure. Take what already exists and package it as a service a normal person can buy: copywriting, design, code, customer support, marketing, data analysis, even bulk SMS. Every niche is full of pain points waiting for someone to solve them with AI.

## The window

Honestly: I think AI eventually replaces nearly all of this work — maybe in five years, maybe ten, maybe a bit longer. But between now and then there is a long window, and that window is full of information asymmetry. Asymmetry is opportunity.

The people who got rich in the early internet were rarely the protocol inventors. They were the ones who brought the internet to people who did not have it yet. The same role is open again. Look at your clients, your friends, your family: what problem of theirs have you already solved with AI — that they do not even know is solvable?

Bring it to them. That is the whole business.

*The full story, with both client cases on screen, is in the video — Chinese with subtitles.*

[Watch on YouTube](https://youtu.be/JDXL3jpUmkE)`,
      zh: `这个星球上的大部分人，还没有真正用过 AI。有一半人甚至从来没碰过。而正在读这篇文章的你，可能每天都在用。

这个差距不是一个有趣的冷知识，它是一个市场。

## 90 年代的既视感

回想 90 年代末，互联网刚刚出现的时候，多少人觉得那是一个泡沫。几乎没有人能预见到，在网上卖东西——电商、直播、内容创作——能造就这么多财富。当时听起来全是天方夜谭。然后互联网消灭了一代旧工作，又创造了一代谁都没想到过的新工作。

今天的 AI 正处在曲线上完全相同的位置。基础设施刚刚成熟：OpenAI 和 Anthropic 的前沿模型刚刚跨过「能用」的门槛，推理价格还在不断下降。普通人现在用得起的模型，已经能处理生活中绝大部分的工作。

黄仁勋说得很直接：AI 让他们公司的生产力暴涨——结果是他们反而在招更多的人。同一周里，我也听到另一些行业的人在悄悄说相反的话。两件事都是真的，平台级变革就长这个样子。

## 停留在对话框

乔布斯有一个听起来傲慢、事后证明正确的产品哲学：用户并不知道自己想要什么，直到你把东西做出来给他看。iPhone 重新定义了手机，然后全世界都跟着学。

AI 正处在它的「iPhone 之前」时刻。你既然在读这篇文章，大概率已经走得很深——智能体、自动化、真实的工作流。但看看周围：大部分人还停留在往一个对话框里打字的阶段。他们完全不知道，今天的 AI 已经可以做出完整的网站、剪视频、写歌、做营销、24 小时回复客户。

他们不笨。只是还没有人把 AI 带到他们面前。

## 两个很小但真实的案例

**案例一。** 一个客户有个老旧的 WordPress 网站，自己折腾了好几天想加一个页面，死活加不上去——那些工具本来就不是为他设计的。我帮他重做了前端、加了一个像样的后台，然后在平台上给他部署了一个 SEO 智能体，24 小时不间断地优化他的自然流量。现在他想加两个新页面，跟智能体说一句话就行，花费几毛钱。他用完之后说：原来还可以这么简单。

**案例二。** 另一个客户想给活动做短信营销。注册一个 Twilio 账号，让 AI 写好脚本，给所有客户发送并生成完整的送达报告——前后不到半小时，即使完全不会写代码也能完成。

规律很明显：对会用 AI 的人来说，这两件事都是举手之劳；对客户来说，却是不可能完成的任务。他们从来不是不愿意付钱，他们只是不知道这件事是可能的。

## 认知差就是生意

为什么大部分人停留在表面？两个很诚实的原因。第一，人们已经被自己的生活耗尽了精力，没有人有余力去拥抱新事物——直到新事物被怼到脸上。第二，好用的 AI 工具要花钱，一个普通上班族不会为一个「可能只是拿来玩玩」的东西每月花几十几百美金。

这两道门槛叠在一起，就形成了巨大的认知差——而如果你熟悉 AI，你就站在这个差距有利可图的那一侧。

你不需要发明任何东西。不需要新模型、新产品、新基建。把已经存在的能力封装成普通人能买单的服务就够了：文案、设计、编程、客服、营销、数据分析，甚至短信群发。每一个细分领域里，都是等着被 AI 解决的痛点。

## 窗口期

说实话：我认为 AI 最终会替代掉几乎所有这些工作——可能五年，可能十年，也可能再长一点。但在那一天到来之前，有一个很长的窗口期，窗口里到处都是信息差。信息差就是机遇。

互联网早期赚到钱的人，很少是发明协议的人，而是把互联网带给还没有互联网的人。同样的角色现在再次空缺。看看你的客户、朋友、家人：他们有什么问题，是你已经能用 AI 解决、而他们甚至不知道可以解决的？

把 AI 带到他们面前。这就是全部的生意。

*完整的故事和两个案例的实操画面都在视频里（中文，带字幕）。*

[在 YouTube 观看](https://youtu.be/JDXL3jpUmkE)`,
    },
  },

  {
    slug: "ai-engineering-team-four-providers",
    date: "2026-06-07",
    readingTime: { en: 6, zh: 7 },
    tags: ["AI", "Agents", "LLM", "Architecture"],
    coverImage:
      "/blog/ai-engineering-team-four-providers/agent-org-chart.png",
    title: {
      en: "Stop Paying Genius Rates for Junior Work: My 24/7 AI Team Across Four Providers",
      zh: "别用天才的价格做初级的活：我横跨四家供应商的 24/7 AI 团队",
    },
    subtitle: {
      en: "One Claude Max subscription used to run my whole agent team — until they went always-on. Here's the org chart I built instead, matching each LLM to the role it deserves.",
      zh: "一个 Claude Max 订阅曾经撑起我整个 agent 团队——直到它们开始 24/7 运转。于是我搭了一张组织架构图，给每个角色分配它配得上的 LLM。",
    },
    content: {
      en: `For a while, one Claude Max subscription ran my entire AI engineering team. It was glorious. Flat fee, all-you-can-eat tokens, no meter ticking in the back of my head. Then the team grew past five agents and started running around the clock — and the honeymoon ended fast.

## The subscription cliff

Here's the thing nobody tells you about scaling an agent team: a subscription is a buffet, but the API is a taxi with the meter running.

While my agents were occasional and bursty, the subscription absorbed everything. The moment they became *always-on* — 24/7, dozens of PRs, continuous review loops — I was no longer snacking. I was running a factory. This is what that looks like by mid-week:

![Weekly usage limit at 100%](/blog/ai-engineering-team-four-providers/weekly-usage-limit.png)

*Weekly limit: 100% used, and the session meter already climbing again. Once agents run around the clock, you hit this wall fast.*

So I did the math on "just buy API credits." For the same workload, metered API cost me roughly **50x** what the subscription did. Scaled across a 24/7 team, that's a couple thousand USD a month flowing to one vendor. Hard no. Not at pre-revenue, not for grunt work, not when there's a smarter way to spend.

## The reframe: I don't have a model, I have an org

The expensive mistake is treating every agent as an identical clone, all dialing the same premium model for every keystroke.

Real companies don't do this. You don't hire a principal architect to do data entry. You don't put your most creative thinker on QA. You match the person to the role, and you match the role to the budget. Headcount is allocated, not maximized.

So I stopped buying "the best model" and built an actual org chart — then assigned a different LLM to each role based on what that role genuinely needs.

![The agent org chart](/blog/ai-engineering-team-four-providers/agent-org-chart.png)

*The real org chart: a CEO Assistant up top, a Production Manager coordinating dev engineers running Kimi and MiniMax, codex-based reviewers and a root-cause researcher off to the side. Every box is a role, and every role gets the model it deserves.*

## Leadership → Claude Opus

The planners and leads — the agents deciding *what* to build and *how* the pieces fit together — run on Claude Opus.

This is where you want the model that holds the whole board in its head and thinks divergently. In my experience Claude is the strongest at big-picture reasoning and generating options before committing to one. It's also the most expensive model I use — and that's fine, because leadership is a *small* headcount. You have one architect, not twenty. Spending premium tokens on the decisions that steer everything downstream is exactly where premium tokens belong.

## Labor → Kimi & MiniMax

The bulk of any engineering team's work is just... writing the code. Implementing a spec that somebody smarter already designed.

For that, I use Kimi and MiniMax. They're not as sharp as Claude or GPT — I won't pretend otherwise — but they write code like a competent junior, and they're *dramatically* cheaper. Each one has exactly one job and a hard boundary around it.

![MiniMax dev engineer executing a spec](/blog/ai-engineering-team-four-providers/minimax-dev-engineer.png)

*Dev Engineer B runs MiniMax and is scoped to "implements specs only; NO review / RCA / decisions / delegation." Here it notices its own PR was already superseded by two others and closes it instead of blindly rebasing in a duplicate. Junior — but not careless.*

When the hard thinking has already happened upstream, you don't need a genius to type out the implementation. You need throughput at a price you can afford to run nonstop. This is where the volume lives, so this is where the cost discipline matters most.

## QA → OpenAI GPT

Review is a completely different skill from creation. For a reviewer you don't want creative; you want careful, rule-following, allergic to shortcuts.

GPT models (running on the codex runtime) follow the SOP. I give them a tight, boring mandate and they stick to it instead of wandering off to redesign things.

![Codex reviewer following a strict SOP](/blog/ai-engineering-team-four-providers/codex-reviewer-sop.png)

*The Code Reviewer's standing orders: review PRs, file concrete issues if it spots a gap, report idle — and explicitly NEVER triage backlog, implement features, or file RFCs that aren't direct PR follow-ups. Discipline over creativity.*

And this isn't theater. Here's the loop catching a real security bug, end to end, with me nowhere in the room:

![Reviewer catching a plaintext-secrets bug](/blog/ai-engineering-team-four-providers/reviewer-secrets-bug.png)

*The reviewer blocks the PR because the production create-path was storing bot tokens and webhook secrets in plaintext — the encryption call had been dropped before persistence. The dev agent goes back, restores the single \`EncryptSensitiveFields\` call, and re-submits. A genuine plaintext-secrets leak, caught and fixed without me touching it.*

A good reviewer doesn't need to be the most imaginative agent in the room. It needs to be the most disciplined. Pairing a divergent planner with a convergent reviewer is half the reason the whole thing stays stable.

## What this actually buys me

Three things, and they compound.

**Cost falls off a cliff — in the right direction.** The expensive model only runs where the expense is justified. Everything else runs cheap. The bill stops scaling linearly with team size.

**Specialization.** Each layer does what it's actually good at — divergent thinking up top, raw throughput in the middle, disciplined review at the gate.

**Resilience.** No single provider holds my entire operation hostage. After getting my GitHub org banned two days before an investor demo, I learned that lesson the expensive way: redundancy isn't overhead, it's insurance. The same logic applies to model vendors.

## The takeaway

Stop asking "which model is the best." Start asking "which model for which job."

The unit of intelligence isn't the model — it's the org. Once you see your agents as a company with roles and a budget instead of a swarm of identical geniuses, the architecture and the economics both fall into place.

That, incidentally, is the whole bet behind what I'm building at [Molecules AI](https://moleculesai.app) — an operating system for organizations of AI agents, where composing a team like this is the default, not a hack I had to invent under cost pressure.`,
      zh: `有那么一段时间，一个 Claude Max 订阅就撑起了我整个 AI 工程团队。那感觉太爽了：固定月费、token 随便用、脑子后面没有计价表在跳。然后团队规模超过五个 agent，开始全天候运转——蜜月期飞快地结束了。

## 订阅的悬崖

关于扩张 agent 团队，有件事没人会告诉你：订阅是自助餐，而 API 是打着表的出租车。

当我的 agent 还只是偶尔、突发地工作时，订阅把一切都吸收了。可一旦它们变成*常驻在线*——24/7、几十个 PR、不间断的 review 循环——我就不再是在吃点心了，我是在开工厂。一周过到一半，画面是这样的：

![每周用量已达 100%](/blog/ai-engineering-team-four-providers/weekly-usage-limit.png)

*每周额度：100% 用完，而本次会话的计量表又开始往上爬了。一旦 agent 全天候运转，你很快就会撞上这堵墙。*

于是我算了一笔"直接买 API 额度"的账。同样的工作量，按量计费的 API 大约是订阅价格的 **50 倍**。摊到一支 24/7 的团队上，就是每月几千美元流向同一家供应商。坚决不行。在没有收入的阶段不行，为了打杂的活不行，在有更聪明的花钱方式时更不行。

## 重新框定：我有的不是一个模型，而是一家公司

最烧钱的错误，是把每个 agent 都当成一模一样的克隆体，让它们对每一次敲键都去调同一个高端模型。

真正的公司不会这么干。你不会雇一个首席架构师去录数据，也不会把最有创造力的人放去做 QA。你把人和角色匹配，把角色和预算匹配。人头是分配出来的，不是越多越好。

所以我不再追着买"最好的模型"，而是搭了一张真正的组织架构图——再根据每个角色真正需要什么，给它分配一个不同的 LLM。

![Agent 组织架构图](/blog/ai-engineering-team-four-providers/agent-org-chart.png)

*真实的组织架构图：最上面是 CEO 助理，下面是一个 Production Manager，协调着跑 Kimi 和 MiniMax 的开发工程师，旁边还有基于 codex 的 reviewer 和一个根因研究员。每一个方框都是一个角色，而每个角色都拿到它配得上的模型。*

## 领导层 → Claude Opus

负责规划和带队的 agent——决定要*做什么*、各部分*如何*拼在一起的那些——跑在 Claude Opus 上。

这正是你需要"能把整盘棋装进脑子里、并且发散思考"的模型的地方。以我的经验，Claude 在大局推理、在收敛到某个方案之前生成多种选项这件事上最强。它也是我用的最贵的模型——这没关系，因为领导层是*小*编制。你只有一个架构师，不是二十个。把高端 token 花在那些会左右下游一切的决策上，正是高端 token 该去的地方。

## 劳动力 → Kimi 和 MiniMax

任何工程团队的大部分工作，其实就是……把代码写出来。实现一份更聪明的人已经设计好的 spec。

为此我用 Kimi 和 MiniMax。它们没有 Claude 或 GPT 那么犀利——我不假装它们有——但它们写代码像个称职的初级工程师，而且*便宜得多*。每一个都只有一份工作，外加一条硬边界。

![MiniMax 开发工程师在执行一份 spec](/blog/ai-engineering-team-four-providers/minimax-dev-engineer.png)

*开发工程师 B 跑的是 MiniMax，职责被限定为"只实现 spec；不做 review / 根因分析 / 决策 / 派活"。这里它注意到自己的 PR 已经被另外两个 PR 取代，于是把它关掉，而不是傻乎乎地 rebase 进一个重复版本。初级——但不马虎。*

当难想的部分已经在上游想完了，你就不需要一个天才来把实现敲出来。你需要的是能不间断跑、价格又扛得住的吞吐量。体量都在这一层，所以成本纪律最该在这一层。

## QA → OpenAI GPT

Review 和创作是完全不同的两种技能。对一个 reviewer，你要的不是有创造力；你要的是细致、守规矩、对走捷径过敏。

GPT 模型（跑在 codex 运行时上）会遵守 SOP。我给它一份紧凑、无聊的任务说明，它就老老实实照做，而不会跑偏去重新设计东西。

![遵守严格 SOP 的 Codex reviewer](/blog/ai-engineering-team-four-providers/codex-reviewer-sop.png)

*Code Reviewer 的常驻指令：review PR，发现缺口就提具体 issue，空闲时上报——并且明确规定永远不要去整理 backlog、不要实现功能、不要提那些并非直接由 PR 衍生的 RFC。纪律高于创造力。*

而且这不是做样子。下面是这个循环抓到一个真实安全漏洞的全过程，从头到尾，全程没我在场：

![Reviewer 抓到明文密钥的 bug](/blog/ai-engineering-team-four-providers/reviewer-secrets-bug.png)

*reviewer 拦下了这个 PR，因为生产环境的创建路径把 bot token 和 webhook 密钥以明文存了下来——加密调用在落库前被丢掉了。开发 agent 回去把那一行 \`EncryptSensitiveFields\` 调用补回来，重新提交。一个货真价实的明文密钥泄漏，在我没碰一下的情况下被发现并修好。*

一个好的 reviewer 不需要是房间里最有想象力的 agent。它需要是最有纪律的那个。把发散的规划者和收敛的 reviewer 配在一起，是整套系统能保持稳定的一半原因。

## 这到底给我带来了什么

三件事，而且会叠加。

**成本断崖式下降——往对的方向。** 贵的模型只在花得值的地方运行。其余一切都跑便宜的。账单不再随团队规模线性增长。

**专业化。** 每一层都做它真正擅长的事——上层发散思考，中层纯吞吐，关口处是有纪律的 review。

**韧性。** 没有任何单一供应商能挟持我的整套运营。在投资人 demo 前两天被封掉 GitHub org 之后，我用很贵的方式学到了这一课：冗余不是开销，是保险。同样的逻辑也适用于模型供应商。

## 收获

别再问"哪个模型最好"。开始问"哪个模型适合哪份活"。

智能的单位不是模型——是组织。一旦你把你的 agent 看成一家有角色、有预算的公司，而不是一群一模一样的天才，架构和经济账就都各就各位了。

顺带一提，这正是我在做的 [Molecules AI](https://moleculesai.app) 背后的整个赌注——一个面向 AI agent 组织的操作系统，在那里，像这样组建一支团队是默认能力，而不是我在成本压力下不得不发明的奇技淫巧。`,
    },
  },
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
  {
    slug: "openclaw-to-claude-code",
    date: "2026-04-04",
    readingTime: { en: 10, zh: 12 },
    tags: ["Claude Code", "OpenClaw", "Migration", "MCP", "Automation"],
    title: {
      en: "Your OpenClaw + Claude Setup Just Broke. Here\u2019s How to Keep Using Opus & Sonnet Without Extra Costs.",
      zh: "\u4f60\u7684 OpenClaw + Claude \u65b9\u6848\u6302\u4e86\u3002\u8fd9\u6837\u505a\u53ef\u4ee5\u7ee7\u7eed\u514d\u8d39\u7528 Opus \u548c Sonnet\u3002",
    },
    subtitle: {
      en: "A complete guide to migrating from OpenClaw to Claude Code\u2019s native tools \u2014 done in one day, using your existing Claude subscription.",
      zh: "\u4ece OpenClaw \u8fc1\u79fb\u5230 Claude Code \u539f\u751f\u5de5\u5177\u7684\u5b8c\u6574\u6307\u5357\u2014\u2014\u4e00\u5929\u641e\u5b9a\uff0c\u7528\u4f60\u73b0\u6709\u7684 Claude \u8ba2\u9605\u3002",
    },
    content: {
      en: `## What Happened on April 4, 2026

Anthropic changed their billing so Claude Pro/Max subscription limits no longer cover third-party tools like OpenClaw. If you were running OpenClaw with Claude, all your cron jobs, Telegram bots, and automations stopped with:

> "Third-party apps now draw from your extra usage, not your plan limits."

Your options now:
1. **Pay extra** — opt into Anthropic's pay-as-you-go "extra usage" billing
2. **Switch models** — run OpenClaw with Kimi, Llama, or other providers instead of Claude
3. **Go native** — use Claude Code (Anthropic's own CLI), which IS covered by your subscription

I went with option 3. By the end of the day, I had everything rebuilt — cron jobs, Telegram bot, browser automation, memory system — all running on Claude Code with my existing Claude subscription. No extra costs.

Here's the complete playbook.

## What You're Replacing

| Feature | OpenClaw | Claude Code Native |
|---|---|---|
| Cron jobs | Built-in scheduler | macOS \`launchd\` + \`claude --print\` CLI |
| Telegram bot (DMs + groups) | Built-in channel | Official Telegram plugin (\`--channels\`) |
| Browser automation | Playwright MCP | Same — Playwright MCP works in both |
| Memory across sessions | Workspace files | File-based memory in a git repo |
| Heartbeat checks | HEARTBEAT.md | Cron job with \`--model sonnet\` (cheaper) |
| MCP servers | Built-in config | \`~/.claude.json\` config |

**Key point:** Claude Code uses the same Opus and Sonnet models, covered by your existing subscription. The \`claude --print\` CLI is a first-party tool — Anthropic can't cut it off.

## The Architecture

Everything lives in one git repo:

\`\`\`
my-business-intelligent/
├── config/env.json           # Machine paths, credentials (gitignored)
├── claude-config/
│   ├── CLAUDE.md             # AI instructions (symlinked to ~/.claude/)
│   └── settings.json         # MCP servers, hooks (symlinked to ~/.claude/)
├── memory/                   # Persistent AI memory (symlinked to ~/.claude/)
├── prompts/                  # Cron job prompts
├── hooks/                    # Safety hooks
├── src/
│   ├── server.ts             # MCP server (11 tools)
│   └── setup.ts              # One command installs everything
└── data/cron-logs/           # Cron output
\`\`\`

Config is symlinked into \`~/.claude/\` so Claude Code reads from the repo. Everything is version-controlled. To move to a new machine: clone the repo, edit one config file, run \`pnpm run setup\`.

## Step 1: Read Your OpenClaw Config (20 min)

Before building anything, read everything in \`~/.openclaw/\`:

\`\`\`
# The important files
cat ~/.openclaw/openclaw.json          # Main config
cat ~/.openclaw/cron/jobs.json         # All your cron jobs + prompts
cat ~/.openclaw/workspace/SOUL.md      # AI personality
cat ~/.openclaw/workspace/TOOLS.md     # Tool notes
cat ~/.openclaw/workspace/TODO.md      # Outstanding tasks
ls  ~/.openclaw/workspace/memory/      # Memory files
\`\`\`

Copy down your cron job prompts, Telegram bot token, user ID, and any project paths.

## Step 2: Create the Repo (5 min)

\`\`\`
mkdir ~/my-business-intelligent && cd $_
git init && pnpm init
pnpm add @modelcontextprotocol/sdk zod
pnpm add -D tsx typescript @types/node
\`\`\`

Create \`config/env.json\` (gitignored) with your machine-specific paths:

\`\`\`
{
  "machine": { "home": "/Users/me" },
  "paths": { "repo": "/Users/me/my-business-intelligent" },
  "projects": { "my_app": "/path/to/app" },
  "telegram": { "bot_token": "YOUR_TOKEN", "owner_chat_id": "YOUR_ID" },
  "git": { "email": "me@example.com", "name": "myuser" }
}
\`\`\`

## Step 3: Create CLAUDE.md (10 min)

Combine OpenClaw's SOUL.md + USER.md + AGENTS.md + TOOLS.md into one file at \`claude-config/CLAUDE.md\`. This loads automatically every session:

\`\`\`
# Standing Orders

## Who You're Working With
- Name, business, projects...

## Core Rules
- Your rules from SOUL.md...

## Infrastructure
- Database, APIs, services...

## Active Cron Jobs
| Job | Schedule | What |
|---|---|---|
| ... | ... | ... |
\`\`\`

Symlink it: \`ln -sf ~/my-business-intelligent/claude-config/CLAUDE.md ~/.claude/CLAUDE.md\`

## Step 4: Migrate Cron Jobs to launchd (30 min)

This is the big one. For each cron job in \`~/.openclaw/cron/jobs.json\`:

1. **Copy the prompt** — the \`payload.message\` field is the full prompt. Save it to \`prompts/<job-name>.md\`
2. **Update paths** — replace \`~/.openclaw/workspace/\` with your new repo paths
3. **Create a LaunchAgent plist** that runs:

\`\`\`
claude --print --dangerously-skip-permissions -p "$(cat prompts/<job>.md)"
\`\`\`

I automated this with a setup script. Define jobs in TypeScript:

\`\`\`
const jobs = [
  { name: 'my-job', label: 'com.mybiz.my-job',
    schedule: { interval: 3600 }, // every hour
    prompt_file: 'prompts/my-job.md',
    timeout: 300 },
];
\`\`\`

The script generates plists and installs them into \`~/Library/LaunchAgents/\`. Run \`pnpm run setup\` and you're done.

**Cost tip:** Use \`--model sonnet\` for lightweight jobs (heartbeat, memory checks). Sonnet is faster, cheaper, and good enough for "check if things are ok" work. Save Opus for heavy tasks like code generation and SEO building.

### Recommended Standard Jobs

| Job | Schedule | Model | Purpose |
|---|---|---|---|
| health-check | Every 1h | Opus | Check crons, Chrome, MCP servers. Auto-fix issues. |
| heartbeat | Every 30m | Sonnet | Quick TODO review, rotate checks, proactive tasks |
| memory-compactor | Every 6h | Opus | Review and consolidate memory files |

## Step 5: Set Up Telegram (15 min)

Claude Code shipped official Telegram support with group @mention detection — this replaces OpenClaw's built-in channel.

\`\`\`
# Install bun (required by the plugin)
curl -fsSL https://bun.sh/install | bash

# Install plugin deps
cd ~/.claude/plugins/marketplaces/claude-plugins-official/external_plugins/telegram
bun install

# Configure bot token (use your existing token from OpenClaw)
mkdir -p ~/.claude/channels/telegram
echo "TELEGRAM_BOT_TOKEN=your-token" > ~/.claude/channels/telegram/.env
\`\`\`

Add to settings.json: \`"enabledPlugins": { "telegram@claude-plugins-official": true }\`

Make it default with an alias in \`~/.zshrc\`:
\`\`\`
alias claude="$HOME/.local/bin/claude --dangerously-skip-permissions --channels plugin:telegram@claude-plugins-official"
\`\`\`

**Important:** Stop the OpenClaw gateway first — it will steal your bot's messages:
\`\`\`
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.openclaw.gateway.plist
\`\`\`

**For group mentions:** Disable privacy mode via @BotFather (\`/setprivacy\` then Disable), then add the group ID to \`access.json\`.

## Step 6: Build an MCP Server (30 min)

Give Claude Code tools to manage itself. Create \`src/server.ts\` with:

- **Memory tools** — list, read, write, search memory files
- **Cron tools** — list jobs, read logs, trigger runs
- **Project tools** — git status across repos
- **Telegram** — send messages via bot
- **Config** — read config values (with denylist for secrets)

11 tools total. Claude can now check on itself, send you alerts, and manage its own memory.

## Step 7: Symlink Everything (2 min)

\`\`\`
ln -sf ~/my-business-intelligent/claude-config/CLAUDE.md ~/.claude/CLAUDE.md
ln -sf ~/my-business-intelligent/claude-config/settings.json ~/.claude/settings.json
ln -sf ~/my-business-intelligent/memory ~/.claude/memory/repo
\`\`\`

The setup script does this automatically.

## Step 8: Security (10 min)

Add a pre-commit hook that scans for secrets (API keys, tokens, DB passwords, private keys). Add PreToolUse hooks that block \`git --no-verify\` and protect linter configs from modification. Gitignore your \`config/env.json\`, \`.env\` files, and generated plists.

If you committed secrets during setup (easy to do), scrub them:
\`\`\`
brew install git-filter-repo
git filter-repo --replace-text <(echo "your-secret==>REDACTED")
git push --force
\`\`\`

## Step 9: Stop OpenClaw (1 min)

\`\`\`
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.openclaw.gateway.plist
\`\`\`

Keep \`~/.openclaw/workspace/\` as a read-only archive — you may need to reference old configs or docs. Keep the chrome-debug LaunchAgent if you use Playwright.

## Step 10: Verify

\`\`\`
launchctl list | grep com.mybiz    # All crons loaded?
claude --version                    # CLI works?
curl -s http://127.0.0.1:9222/json/version  # Chrome CDP alive?
\`\`\`

Send a test Telegram DM to your bot. Trigger a health check cron. Check that memory loads on a fresh session.

## The Bonus: It's Actually Better Now

Once I finished the migration, I realized the new setup has real advantages I didn't have with OpenClaw:

**Portability.** One git repo. Clone to a new machine, edit one JSON file, run setup. With OpenClaw, migration meant reinstalling the framework, running onboard, reconfiguring browser profiles, re-pairing Telegram.

**Version control.** Every config change is a git commit. With OpenClaw, config lived in a sprawl of JSON files, SQLite databases, and binary blobs — no history, no review.

**Cost control.** I can use Sonnet for lightweight crons and Opus for heavy work. With OpenClaw, the gateway burned tokens just to stay alive — heartbeat polling, context maintenance, session state.

**No single point of failure.** Each cron job is an independent launchd invocation. If one fails, the others keep running. OpenClaw's gateway was one process — when it crashed, everything went down.

**You own it.** No framework updates breaking your setup. No middleman getting cut off by a provider. No malicious skills from a community marketplace. Every line of code is yours.

## Common Gotchas

1. **MCP servers go in \`~/.claude.json\`**, not \`settings.json\` — Claude Code reads MCP config from \`.claude.json\`
2. **Use absolute paths** for MCP server scripts — \`cwd\` is not reliably honored
3. **pnpm strict hoisting** breaks \`node --import tsx/esm\` — use \`npx tsx\` instead
4. **\`--print\` mode can't write to \`~/.claude/memory/\`** — keep memory in your repo
5. **OpenClaw gateway steals your Telegram bot** if still running — stop it first
6. **Hook type must be \`"command"\`** not \`"intercept"\`
7. **Shell alias needs full binary path** — \`alias claude="$HOME/.local/bin/claude ..."\`
8. **MCP env vars set at spawn time** — add \`env\` field to config, not \`.env\` file
9. **\`enabledPlugins\`** must include \`"telegram@claude-plugins-official": true\`

## Open Source Migration Skill

I turned this entire process into a reusable skill prompt (300 lines, 11 phases). Give it to any Claude Code agent on a machine with OpenClaw and it'll follow the same playbook:

[github.com/HongmingWang-Rabbit/skill-migrate-openclaw-to-cc](https://github.com/HongmingWang-Rabbit/skill-migrate-openclaw-to-cc)`,
      zh: `## 2026 \u5e74 4 \u6708 4 \u65e5\u53d1\u751f\u4e86\u4ec0\u4e48

Anthropic \u6539\u4e86\u8ba1\u8d39\u65b9\u5f0f\uff0cClaude Pro/Max \u8ba2\u9605\u989d\u5ea6\u4e0d\u518d\u8986\u76d6 OpenClaw \u8fd9\u7c7b\u7b2c\u4e09\u65b9\u5de5\u5177\u3002\u5982\u679c\u4f60\u7528 OpenClaw \u8dd1 Claude\uff0c\u4f60\u7684\u5b9a\u65f6\u4efb\u52a1\u3001Telegram \u673a\u5668\u4eba\u548c\u81ea\u52a8\u5316\u5168\u505c\u4e86\uff1a

> \u201c\u7b2c\u4e09\u65b9\u5e94\u7528\u73b0\u5728\u6d88\u8017\u989d\u5916\u7528\u91cf\uff0c\u4e0d\u518d\u7b97\u5728\u8ba1\u5212\u989d\u5ea6\u5185\u3002\u201d

\u73b0\u5728\u4f60\u6709\u4e09\u4e2a\u9009\u62e9\uff1a
1. **\u52a0\u94b1** — \u5f00\u901a Anthropic \u7684\u6309\u91cf\u4ed8\u8d39\u201c\u989d\u5916\u7528\u91cf\u201d
2. **\u6362\u6a21\u578b** — \u8ba9 OpenClaw \u7528 Kimi\u3001Llama \u6216\u5176\u4ed6\u4f9b\u5e94\u5546\uff0c\u4e0d\u8d70 Claude
3. **\u7528\u539f\u751f** — \u7528 Claude Code\uff08Anthropic \u81ea\u5df1\u7684 CLI\uff09\uff0c\u8ba2\u9605\u989d\u5ea6\u8986\u76d6

\u6211\u9009\u4e86\u65b9\u6848 3\u3002\u5f53\u5929\u7ed3\u675f\u65f6\uff0c\u6240\u6709\u4e1c\u897f\u90fd\u91cd\u5efa\u597d\u4e86\u2014\u2014\u5b9a\u65f6\u4efb\u52a1\u3001Telegram \u673a\u5668\u4eba\u3001\u6d4f\u89c8\u5668\u81ea\u52a8\u5316\u3001\u8bb0\u5fc6\u7cfb\u7edf\u2014\u2014\u5168\u8dd1\u5728 Claude Code \u4e0a\uff0c\u7528\u73b0\u6709\u8ba2\u9605\uff0c\u96f6\u989d\u5916\u6210\u672c\u3002

\u4ee5\u4e0b\u662f\u5b8c\u6574\u7684\u64cd\u4f5c\u624b\u518c\u3002

## \u4f60\u5728\u66ff\u6362\u4ec0\u4e48

| \u529f\u80fd | OpenClaw | Claude Code \u539f\u751f |
|---|---|---|
| \u5b9a\u65f6\u4efb\u52a1 | \u5185\u7f6e\u8c03\u5ea6\u5668 | macOS \`launchd\` + \`claude --print\` CLI |
| Telegram \u673a\u5668\u4eba | \u5185\u7f6e\u9891\u9053 | \u5b98\u65b9 Telegram \u63d2\u4ef6\uff08\`--channels\`\uff09 |
| \u6d4f\u89c8\u5668\u81ea\u52a8\u5316 | Playwright MCP | \u4e00\u6837\u2014\u2014Playwright MCP \u4e24\u8fb9\u90fd\u80fd\u7528 |
| \u8de8\u4f1a\u8bdd\u8bb0\u5fc6 | \u5de5\u4f5c\u533a\u6587\u4ef6 | git \u4ed3\u5e93\u4e2d\u7684\u6587\u4ef6\u8bb0\u5fc6 |
| \u5fc3\u8df3\u68c0\u67e5 | HEARTBEAT.md | \u5b9a\u65f6\u4efb\u52a1 + \`--model sonnet\`\uff08\u66f4\u4fbf\u5b9c\uff09 |
| MCP \u670d\u52a1\u5668 | \u5185\u7f6e\u914d\u7f6e | \`~/.claude.json\` \u914d\u7f6e |

**\u5173\u952e\u70b9\uff1a** Claude Code \u7528\u7684\u662f\u540c\u6837\u7684 Opus \u548c Sonnet \u6a21\u578b\uff0c\u8ba2\u9605\u989d\u5ea6\u8986\u76d6\u3002\`claude --print\` \u662f Anthropic \u7684\u7b2c\u4e00\u65b9\u5de5\u5177\u2014\u2014\u4ed6\u4eec\u4e0d\u4f1a\u780d\u6389\u3002

## \u67b6\u6784

\u6240\u6709\u4e1c\u897f\u90fd\u5728\u4e00\u4e2a git \u4ed3\u5e93\u91cc\uff1a

\`\`\`
my-business-intelligent/
\u251c\u2500\u2500 config/env.json           # \u673a\u5668\u8def\u5f84\u3001\u51ed\u8bc1\uff08gitignored\uff09
\u251c\u2500\u2500 claude-config/
\u2502   \u251c\u2500\u2500 CLAUDE.md             # AI \u6307\u4ee4\uff08\u8f6f\u94fe\u63a5 \u2192 ~/.claude/\uff09
\u2502   \u2514\u2500\u2500 settings.json         # MCP \u670d\u52a1\u5668\u3001hooks\uff08\u8f6f\u94fe\u63a5 \u2192 ~/.claude/\uff09
\u251c\u2500\u2500 memory/                   # \u6301\u4e45\u5316 AI \u8bb0\u5fc6\uff08\u8f6f\u94fe\u63a5 \u2192 ~/.claude/\uff09
\u251c\u2500\u2500 prompts/                  # \u5b9a\u65f6\u4efb\u52a1 prompt
\u251c\u2500\u2500 hooks/                    # \u5b89\u5168 hooks
\u251c\u2500\u2500 src/
\u2502   \u251c\u2500\u2500 server.ts             # MCP \u670d\u52a1\u5668\uff0811 \u4e2a\u5de5\u5177\uff09
\u2502   \u2514\u2500\u2500 setup.ts              # \u4e00\u6761\u547d\u4ee4\u5b89\u88c5\u4e00\u5207
\u2514\u2500\u2500 data/cron-logs/           # \u5b9a\u65f6\u4efb\u52a1\u8f93\u51fa
\`\`\`

\u914d\u7f6e\u901a\u8fc7\u8f6f\u94fe\u63a5\u5230 \`~/.claude/\`\uff0c\u8ba9 Claude Code \u4ece\u4ed3\u5e93\u8bfb\u53d6\u3002\u6240\u6709\u4e1c\u897f\u90fd\u7248\u672c\u63a7\u5236\u3002\u8fc1\u79fb\u5230\u65b0\u673a\u5668\uff1aclone \u4ed3\u5e93\uff0c\u6539\u4e00\u4e2a\u914d\u7f6e\u6587\u4ef6\uff0c\u8dd1 \`pnpm run setup\`\u3002

## \u7b2c 1 \u6b65\uff1a\u8bfb\u53d6 OpenClaw \u914d\u7f6e\uff0820 \u5206\u949f\uff09

\u642d\u4efb\u4f55\u4e1c\u897f\u4e4b\u524d\uff0c\u5148\u8bfb \`~/.openclaw/\` \u91cc\u7684\u6240\u6709\u4e1c\u897f\uff1a

\`\`\`
cat ~/.openclaw/openclaw.json          # \u4e3b\u914d\u7f6e
cat ~/.openclaw/cron/jobs.json         # \u6240\u6709\u5b9a\u65f6\u4efb\u52a1 + prompt
cat ~/.openclaw/workspace/SOUL.md      # AI \u4eba\u8bbe
cat ~/.openclaw/workspace/TOOLS.md     # \u5de5\u5177\u7b14\u8bb0
cat ~/.openclaw/workspace/TODO.md      # \u5f85\u529e\u4e8b\u9879
ls  ~/.openclaw/workspace/memory/      # \u8bb0\u5fc6\u6587\u4ef6
\`\`\`

\u8bb0\u4e0b\u4f60\u7684\u5b9a\u65f6\u4efb\u52a1 prompt\u3001Telegram bot token\u3001\u7528\u6237 ID \u548c\u9879\u76ee\u8def\u5f84\u3002

## \u7b2c 2 \u6b65\uff1a\u521b\u5efa\u4ed3\u5e93\uff085 \u5206\u949f\uff09

\`\`\`
mkdir ~/my-business-intelligent && cd $_
git init && pnpm init
pnpm add @modelcontextprotocol/sdk zod
pnpm add -D tsx typescript @types/node
\`\`\`

\u521b\u5efa \`config/env.json\`\uff08gitignored\uff09\uff0c\u586b\u5165\u673a\u5668\u76f8\u5173\u8def\u5f84\u3002

## \u7b2c 3 \u6b65\uff1a\u521b\u5efa CLAUDE.md\uff0810 \u5206\u949f\uff09

\u628a OpenClaw \u7684 SOUL.md + USER.md + AGENTS.md + TOOLS.md \u5408\u5e76\u5230 \`claude-config/CLAUDE.md\`\u3002\u6bcf\u6b21\u4f1a\u8bdd\u81ea\u52a8\u52a0\u8f7d\u3002

\u521b\u5efa\u8f6f\u94fe\u63a5\uff1a\`ln -sf ~/my-business-intelligent/claude-config/CLAUDE.md ~/.claude/CLAUDE.md\`

## \u7b2c 4 \u6b65\uff1a\u8fc1\u79fb\u5b9a\u65f6\u4efb\u52a1\u5230 launchd\uff0830 \u5206\u949f\uff09

\u8fd9\u662f\u91cd\u5934\u620f\u3002\u5bf9 \`~/.openclaw/cron/jobs.json\` \u91cc\u7684\u6bcf\u4e2a\u4efb\u52a1\uff1a

1. **\u590d\u5236 prompt** — \`payload.message\` \u5b57\u6bb5\u662f\u5b8c\u6574 prompt\uff0c\u4fdd\u5b58\u5230 \`prompts/<job-name>.md\`
2. **\u66f4\u65b0\u8def\u5f84** — \u628a \`~/.openclaw/workspace/\` \u66ff\u6362\u6210\u65b0\u4ed3\u5e93\u8def\u5f84
3. **\u521b\u5efa LaunchAgent plist** \u6267\u884c\uff1a

\`\`\`
claude --print --dangerously-skip-permissions -p "$(cat prompts/<job>.md)"
\`\`\`

\u6211\u7528 setup \u811a\u672c\u81ea\u52a8\u5316\u4e86\u8fd9\u6b65\u3002\u811a\u672c\u751f\u6210 plist \u5e76\u5b89\u88c5\u5230 \`~/Library/LaunchAgents/\`\u3002\u8dd1 \`pnpm run setup\` \u5c31\u5b8c\u4e8b\u4e86\u3002

**\u7701\u94b1\u6280\u5de7\uff1a** \u8f7b\u91cf\u4efb\u52a1\u7528 \`--model sonnet\`\u3002Sonnet \u66f4\u5feb\u3001\u66f4\u4fbf\u5b9c\uff0c\u201c\u68c0\u67e5\u4e00\u4e0b\u662f\u5426\u6b63\u5e38\u201d\u591f\u7528\u4e86\u3002Opus \u7559\u7ed9\u4ee3\u7801\u751f\u6210\u548c SEO \u8fd9\u7c7b\u91cd\u6d3b\u3002

### \u63a8\u8350\u7684\u6807\u51c6\u4efb\u52a1

| \u4efb\u52a1 | \u9891\u7387 | \u6a21\u578b | \u7528\u9014 |
|---|---|---|---|
| health-check | \u6bcf 1 \u5c0f\u65f6 | Opus | \u68c0\u67e5\u5b9a\u65f6\u4efb\u52a1\u3001Chrome\u3001MCP \u670d\u52a1\u5668\uff0c\u81ea\u52a8\u4fee\u590d |
| heartbeat | \u6bcf 30 \u5206\u949f | Sonnet | \u5feb\u901f TODO \u68c0\u67e5\u3001\u8f6e\u8be2\u68c0\u67e5\u3001\u4e3b\u52a8\u4efb\u52a1 |
| memory-compactor | \u6bcf 6 \u5c0f\u65f6 | Opus | \u5ba1\u67e5\u548c\u6574\u5408\u8bb0\u5fc6\u6587\u4ef6 |

## \u7b2c 5 \u6b65\uff1a\u914d\u7f6e Telegram\uff0815 \u5206\u949f\uff09

Claude Code \u5b98\u65b9\u652f\u6301 Telegram\uff0c\u5305\u62ec\u7fa4\u7ec4 @\u63d0\u53ca\u68c0\u6d4b\u2014\u2014\u66ff\u4ee3 OpenClaw \u7684\u5185\u7f6e\u9891\u9053\u3002

\u5728 settings.json \u4e2d\u6dfb\u52a0\uff1a\`"enabledPlugins": { "telegram@claude-plugins-official": true }\`

**\u91cd\u8981\uff1a** \u5148\u505c\u6389 OpenClaw gateway\u2014\u2014\u5b83\u4f1a\u62a2\u4f60 bot \u7684\u6d88\u606f\u3002

## \u7b2c 6 \u6b65\uff1a\u6784\u5efa MCP \u670d\u52a1\u5668\uff0830 \u5206\u949f\uff09

\u8ba9 Claude Code \u6709\u5de5\u5177\u7ba1\u7406\u81ea\u5df1\u3002\u521b\u5efa \`src/server.ts\`\uff1a

- **\u8bb0\u5fc6\u5de5\u5177** — \u5217\u51fa\u3001\u8bfb\u53d6\u3001\u5199\u5165\u3001\u641c\u7d22\u8bb0\u5fc6\u6587\u4ef6
- **\u5b9a\u65f6\u4efb\u52a1\u5de5\u5177** — \u5217\u51fa\u4efb\u52a1\u3001\u8bfb\u65e5\u5fd7\u3001\u89e6\u53d1\u8fd0\u884c
- **\u9879\u76ee\u5de5\u5177** — \u5404\u4ed3\u5e93 git \u72b6\u6001
- **Telegram** — \u901a\u8fc7 bot \u53d1\u6d88\u606f
- **\u914d\u7f6e** — \u8bfb\u53d6\u914d\u7f6e\u503c\uff08\u654f\u611f\u8def\u5f84\u6709\u9ed1\u540d\u5355\uff09

\u5171 11 \u4e2a\u5de5\u5177\u3002Claude \u73b0\u5728\u53ef\u4ee5\u81ea\u68c0\u3001\u7ed9\u4f60\u53d1\u8b66\u62a5\u3001\u7ba1\u7406\u81ea\u5df1\u7684\u8bb0\u5fc6\u3002

## \u7b2c 7 \u6b65\uff1a\u8f6f\u94fe\u63a5\u4e00\u5207\uff082 \u5206\u949f\uff09

\`\`\`
ln -sf ~/my-business-intelligent/claude-config/CLAUDE.md ~/.claude/CLAUDE.md
ln -sf ~/my-business-intelligent/claude-config/settings.json ~/.claude/settings.json
ln -sf ~/my-business-intelligent/memory ~/.claude/memory/repo
\`\`\`

setup \u811a\u672c\u81ea\u52a8\u5b8c\u6210\u8fd9\u6b65\u3002

## \u7b2c 8 \u6b65\uff1a\u5b89\u5168\uff0810 \u5206\u949f\uff09

\u52a0\u4e00\u4e2a pre-commit hook \u626b\u63cf\u5bc6\u94a5\u3002\u52a0 PreToolUse hooks \u963b\u6b62 \`git --no-verify\` \u5e76\u4fdd\u62a4 linter \u914d\u7f6e\u3002gitignore \u4f60\u7684 \`config/env.json\`\u3001\`.env\` \u6587\u4ef6\u548c\u751f\u6210\u7684 plist\u3002

## \u7b2c 9 \u6b65\uff1a\u505c\u6b62 OpenClaw\uff081 \u5206\u949f\uff09

\`\`\`
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.openclaw.gateway.plist
\`\`\`

\u4fdd\u7559 \`~/.openclaw/workspace/\` \u4f5c\u4e3a\u53ea\u8bfb\u5b58\u6863\u3002

## \u7b2c 10 \u6b65\uff1a\u9a8c\u8bc1

\`\`\`
launchctl list | grep com.mybiz    # \u5b9a\u65f6\u4efb\u52a1\u90fd\u52a0\u8f7d\u4e86\uff1f
claude --version                    # CLI \u6b63\u5e38\uff1f
curl -s http://127.0.0.1:9222/json/version  # Chrome CDP \u6d3b\u7740\uff1f
\`\`\`

\u7ed9\u4f60\u7684 bot \u53d1\u4e00\u6761 Telegram \u6d4b\u8bd5\u6d88\u606f\u3002\u89e6\u53d1\u4e00\u6b21 health-check\u3002\u68c0\u67e5\u65b0\u4f1a\u8bdd\u662f\u5426\u52a0\u8f7d\u4e86\u8bb0\u5fc6\u3002

## \u989d\u5916\u6536\u83b7\uff1a\u5176\u5b9e\u66f4\u597d\u4e86

\u8fc1\u79fb\u5b8c\u6210\u540e\u6211\u53d1\u73b0\uff0c\u65b0\u65b9\u6848\u6bd4 OpenClaw \u6709\u5b9e\u5b9e\u5728\u5728\u7684\u4f18\u52bf\uff1a

**\u53ef\u79fb\u690d\u6027\u3002** \u4e00\u4e2a git \u4ed3\u5e93\u3002Clone \u5230\u65b0\u673a\u5668\uff0c\u6539\u4e00\u4e2a JSON \u6587\u4ef6\uff0c\u8dd1 setup\u3002OpenClaw \u7684\u8fc1\u79fb\u610f\u5473\u7740\u91cd\u65b0\u5b89\u88c5\u6846\u67b6\u3001\u8dd1 onboard\u3001\u91cd\u65b0\u914d\u7f6e\u6d4f\u89c8\u5668 profile\u3001\u91cd\u65b0\u7ed1\u5b9a Telegram\u3002

**\u7248\u672c\u63a7\u5236\u3002** \u6bcf\u6b21\u914d\u7f6e\u53d8\u66f4\u90fd\u662f git commit\u3002OpenClaw \u7684\u914d\u7f6e\u6563\u843d\u5728 JSON \u6587\u4ef6\u3001SQLite \u6570\u636e\u5e93\u548c\u4e8c\u8fdb\u5236\u6587\u4ef6\u91cc\u2014\u2014\u6ca1\u6709\u5386\u53f2\uff0c\u6ca1\u6709 review\u3002

**\u6210\u672c\u63a7\u5236\u3002** \u8f7b\u91cf\u5b9a\u65f6\u4efb\u52a1\u7528 Sonnet\uff0c\u91cd\u6d3b\u7528 Opus\u3002OpenClaw \u7684 gateway \u5149\u6d3b\u7740\u5c31\u70e7 token\u2014\u2014\u5fc3\u8df3\u8f6e\u8be2\u3001\u4e0a\u4e0b\u6587\u7ef4\u62a4\u3001\u4f1a\u8bdd\u72b6\u6001\u3002

**\u6ca1\u6709\u5355\u70b9\u6545\u969c\u3002** \u6bcf\u4e2a\u5b9a\u65f6\u4efb\u52a1\u662f\u72ec\u7acb\u7684 launchd \u8c03\u7528\u3002\u4e00\u4e2a\u6302\u4e86\uff0c\u5176\u4ed6\u7ee7\u7eed\u8dd1\u3002OpenClaw \u7684 gateway \u662f\u4e00\u4e2a\u8fdb\u7a0b\u2014\u2014\u5b83\u5d29\u4e86\uff0c\u5168\u5b8c\u4e86\u3002

**\u4f60\u62e5\u6709\u5b83\u3002** \u6ca1\u6709\u6846\u67b6\u66f4\u65b0\u7834\u574f\u4f60\u7684\u914d\u7f6e\u3002\u6ca1\u6709\u4e2d\u95f4\u4eba\u88ab\u4f9b\u5e94\u5546\u5207\u65ad\u3002\u6ca1\u6709\u793e\u533a\u5e02\u573a\u7684\u6076\u610f skill\u3002\u6bcf\u4e00\u884c\u4ee3\u7801\u90fd\u662f\u4f60\u7684\u3002

## \u5e38\u89c1\u5751

1. **MCP \u670d\u52a1\u5668\u653e \`~/.claude.json\`**\uff0c\u4e0d\u662f \`settings.json\`
2. **\u7528\u7edd\u5bf9\u8def\u5f84** \u5199 MCP \u670d\u52a1\u5668\u811a\u672c — \`cwd\` \u4e0d\u53ef\u9760
3. **pnpm \u4e25\u683c\u63d0\u5347** \u4f1a\u7834\u574f \`node --import tsx/esm\` — \u7528 \`npx tsx\`
4. **\`--print\` \u6a21\u5f0f\u4e0d\u80fd\u5199 \`~/.claude/memory/\`** — \u8bb0\u5fc6\u653e\u4ed3\u5e93\u91cc
5. **OpenClaw gateway \u4f1a\u62a2 Telegram bot** — \u5148\u505c\u6389
6. **Hook \u7c7b\u578b\u5fc5\u987b\u662f \`"command"\`** \u4e0d\u662f \`"intercept"\`
7. **Shell alias \u9700\u8981\u5b8c\u6574\u4e8c\u8fdb\u5236\u8def\u5f84**
8. **MCP \u73af\u5883\u53d8\u91cf\u5728\u542f\u52a8\u65f6\u8bbe\u7f6e** — \u914d\u7f6e\u91cc\u52a0 \`env\` \u5b57\u6bb5
9. **\`enabledPlugins\`** \u5fc5\u987b\u5305\u542b \`"telegram@claude-plugins-official": true\`

## \u5f00\u6e90\u8fc1\u79fb Skill

\u6211\u628a\u6574\u4e2a\u8fc7\u7a0b\u505a\u6210\u4e86\u4e00\u4e2a\u53ef\u590d\u7528\u7684 skill prompt\uff08300 \u884c\uff0c11 \u4e2a\u9636\u6bb5\uff09\u3002\u7ed9\u4efb\u4f55\u88c5\u4e86 OpenClaw \u7684\u673a\u5668\u4e0a\u7684 Claude Code agent \u7528\uff0c\u5b83\u4f1a\u6309\u540c\u6837\u7684\u6d41\u7a0b\u8d70\uff1a

[github.com/HongmingWang-Rabbit/skill-migrate-openclaw-to-cc](https://github.com/HongmingWang-Rabbit/skill-migrate-openclaw-to-cc)`,
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
