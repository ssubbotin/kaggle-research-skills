---
name: llm-council
description: Use when a question is high-stakes, contested, open-ended, or benefits from more than one model's judgment and you want cross-model deliberation instead of a single answer. Triggers include the user asking for a "council", "panel", "multiple models", "second opinions", "ensemble", "deliberate", "have the models review each other", or wanting the most reliable answer to a hard question. Based on Andrej Karpathy's llm-council (github.com/karpathy/llm-council).
---

# LLM Council

## Core principle

One model answering alone has one set of blind spots. A **council** dispatches the same question to several independent models, has them **anonymously peer-review and rank** each other's answers, then a **chairman** synthesizes a single final response from the collected answers and rankings.

The value comes from three things a single call can't give you: **independence** (answers formed without seeing each other), **anonymized cross-critique** (each model judges the substance, not the brand), and **synthesis** (the final answer is built from the best of all, not any one).

Source pattern: Andrej Karpathy's `llm-council` (github.com/karpathy/llm-council) — a local app with the identical three-stage flow. This skill adapts it to run inside Claude Code using real agents and real model diversity.

## When to use / when NOT to use

**Use for:** hard technical judgment calls, design trade-offs with no clear winner, factual questions where being wrong is costly, "which of these approaches is best", forecasts/estimates, anything where you'd want a second and third opinion. Also whenever the user explicitly asks for a council/panel/multiple models.

**Do NOT use for:** simple lookups, mechanical edits, anything with one correct answer you can verify directly, or latency/cost-sensitive tasks. A council is 3–5× the tokens and wall-clock of a single answer — spend it only when the extra reliability is worth it.

## The three stages (do not skip or merge)

| Stage | What happens | Key rule |
|---|---|---|
| **1. First opinions** | The question goes to every council member **in parallel**, each answering independently. | Members must NOT see each other's answers. Independence is the whole point. |
| **2. Anonymized review** | Every answer is stripped of its author and relabeled (Response A, B, C…). Each member receives the full anonymized pool and **ranks the answers by accuracy and insight**, with a one-line justification per rank. | Identities MUST be hidden — otherwise models favor their own or the "prestige" model. Rank on substance. |
| **3. Chairman synthesis** | A designated **chairman** model receives all answers plus all rankings and writes the single final answer. | The chairman composes the best answer — it does not just pick a winner. It resolves disagreements and notes any unresolved uncertainty. |

## How to run it here

Use genuine model diversity. The Agent tool's `model` override gives a council of distinct models within one family (for example `opus`, `sonnet`, `haiku`); members from different vendors disagree more, which is what surfaces blind spots (see "Council composition"). Pick 3–4 distinct models as members.

**Two ways to run:**

- **Quick/manual** — dispatch Stage 1 as parallel `Agent` calls with different `model:` values; collect their returns; hand-build the anonymized pool; dispatch Stage 2 as parallel `Agent` calls; then run one chairman `Agent` for Stage 3. Fine for a one-off.
- **Orchestrated (preferred for anything repeatable)** — run [`council-workflow.js`](council-workflow.js) via the `Workflow` tool. It implements all three stages, per-member model assignment, anonymization, and chairman synthesis, and returns the final answer plus the full transcript. Pass the question as `args`.

```
Workflow({ scriptPath: "~/.claude/skills/llm-council/council-workflow.js",
           args: { question: "…", chairman: "opus" } })
```

The path above is the default personal skills directory; the script lives wherever this skill is installed (next to this `SKILL.md`), so pass that location, as an absolute path if the tool does not expand `~`.

When no roster is passed, the script uses `members: ["opus", "sonnet", "haiku"]` and `chairman: "opus"`. Override them with `args.members` and `args.chairman`. The script reaches models only through the `Agent` tool, so its council stays inside one model family.

## Council composition

**Default (use this unless the user names a different roster): three members from three different vendors, each at its highest reasoning effort, with your strongest reasoning model as chairman.** When only one vendor is available, fall back to the script default above and say so in the answer.

A cross-vendor council is assembled by hand, because the script cannot reach other vendors: Stage 1 is one call per member (an `Agent` call for the in-family member, a `Bash` call per CLI member), the answers are relabelled Response A/B/C, Stage 2 feeds the whole pool back to every member the same way, and Stage 3 is one `Agent` call on the chairman.

One possible setup, as an example only. Model names and CLI flags date quickly; substitute the vendors and command-line clients you have:

| Member | How to call it |
|---|---|
| An in-family model at high effort | `Agent` tool with `model: "opus"` |
| A second vendor's model through its coding CLI | `codex exec --skip-git-repo-check "<prompt>"`, with the model and the effort set once in `~/.codex/config.toml` |
| A third vendor's model through its CLI | `grok --output-format plain -m <model> --effort <level> --prompt-file <file>` |

Notes on CLI members:

- Some CLIs reject a positional prompt when no terminal is attached (the Grok CLI answers `No such device or address (os error 6)`). Pass the prompt through a file (`--prompt-file`).
- CLI members take minutes. Launch them in the same block so they run in parallel.

- **3–5 members.** Two is a tie with no tiebreaker; more than five adds cost without new perspectives.
- **Maximize diversity.** Cross-*vendor* is the strongest form of diversity: three independent engines genuinely disagree, while a council of tiers of one family tends toward an echo chamber. A locally hosted model is a further option when out-of-family critique is wanted.
- **Chairman = your strongest reasoning model** (default `opus`). The chairman can also be a council member; that's fine.
- **Optional stricter variant:** exclude each member's own answer from what it reviews, so no one rates themselves. The default full-pool approach is simpler and, because answers are anonymized, a member can't reliably find its own — use the strict variant only if you observe self-favoritism.

## Common mistakes

- **Letting members see each other in Stage 1** → correlated answers, no independence. Keep Stage 1 strictly parallel and blind.
- **Leaving model names in the review pool** → brand/self bias. Always relabel to Response A/B/C.
- **Chairman just picks the top-ranked answer** → you paid for synthesis and got selection. The chairman must compose.
- **Using a council for something trivial** → wasted tokens. Match the tool to the stakes.
- **All members are the same model** → an echo chamber that agrees with itself. Diversify.

## Cost note

A council is roughly `(members × 2) + 1` model calls (Stage 1 + Stage 2 + chairman). Say so before launching a large one, and let the stakes justify it.
