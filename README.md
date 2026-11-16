# spertaro

Skills for [Claude Code](https://claude.com/claude-code) that turn open-ended research into a disciplined practice:
how to look past the frontier of what is known, how to absorb what others already know without mistaking that for
research, and how not to fool yourself along the way.

*Spertaro* is Esperanto for "a body of experience". The skills were distilled from several machine-learning
competition campaigns: every rule in them was paid for by a prediction that failed or a check that would have
caught it. The campaign details are removed; the method and its lessons remain.

## What is inside

| Skill | What it does |
|---|---|
| [`researcher`](skills/researcher/SKILL.md) | Systematic invention for math, ML and science. A loop built on TRIZ (ideal final result, contradictions, resources), a creation engine for originating a method class, an armory of operators, and two orchestrated workflows: the **invention council** (search outside, describe the system, measure, replicate external methods, attack your own closure claims, generate candidates, measure each selected premise and try to make it work, synthesise) and the **research loop** (gauge the frontier, name the binding gap, run pre-registered trained arms, judge). |
| [`llm-council`](skills/llm-council/SKILL.md) | Cross-model deliberation for contested questions: independent answers, anonymised peer review, a chairman's synthesis. Based on Andrej Karpathy's llm-council. |
| [`kaggle-campaign`](skills/kaggle-campaign/SKILL.md) | How to run a modelling competition end to end: phase order, frontier gauge, validated rulers, build-versus-verify budget, final selection. |
| [`kaggle-code-submission`](skills/kaggle-code-submission/SKILL.md) | The traps of notebook-only code competitions: kernel ids, packaging weights, hidden reruns, silent fallbacks. |

### The ideas that carry the method

- **Two tracks, the unknown first.** The target of research is the question nobody has answered. Replicating a
  known frontier is a means: a *frontier gate* decides when it is required (the gap to the best reproducible
  external result is larger than twice your largest realised lever), and it never switches the research off.
- **A ladder with mechanisms.** A frontier is absorbed rung by rung, each rung with a sentence that says why it
  works here, code parity before weights or data parity, and the rung's own score as its gate.
- **No ceiling below the frontier.** Someone reached that result step by step; so can you. Estimates of where your
  own line "tops out" are not evidence.
- **Rulers are validated before they decide.** An offline measurement decides nothing until it has reproduced
  known outcomes. Predictions are filed before the read, and the difference is written down.
- **A ledger that the method re-reads.** [`LEDGER.md`](skills/researcher/LEDGER.md) holds the numbered lessons and
  the track record of the method itself. The invention council reads it at the start of a run and appends a
  record at the end; the research loop appends its record when it judges a batch. This is
  the "learning to learn" part: the skill is calibrated by its own history, including its failures.
- **Preflight.** [`PREFLIGHT.md`](skills/researcher/PREFLIGHT.md) condenses the lessons into a short list of checks
  to run before trusting any result.

## Install

Skills are plain directories. Clone the repository and link the ones you want into your skills folder:

```bash
git clone https://github.com/ssubbotin/spertaro.git
mkdir -p ~/.claude/skills
for s in researcher llm-council kaggle-campaign kaggle-code-submission; do
  ln -s "$PWD/spertaro/skills/$s" ~/.claude/skills/$s
done
```

A project-level install works the same way with `.claude/skills/` inside a repository. The examples in the skills
use `~/.claude/skills/<skill>/...`; the path is wherever you put them.

## Use

Ask for the skill by name or describe the situation its description names, for example: "research has plateaued,
use the researcher skill", "run an invention council on this", "get a council of models on this question", "plan
this competition with kaggle-campaign".

The two researcher workflows and the council workflow are scripts for the Claude Code Workflow tool. They start
many subagents and can spend a large number of tokens, so run them deliberately. Each script documents its
arguments at the top. You tell the workflow how agents reach your data and compute (and the resource caps and
safety rules that apply there) through its arguments; nothing about any machine is built in.

The ledger starts with the distilled lessons and an empty run log. Your runs append to your copy. When a run
teaches you something the ledger does not yet say, send it back (see below).

## Contributing

Findings from real use are the most valuable contribution: field reports, new lessons for the ledger, fixes to the
skills and workflows, ports to other agent hosts. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

[Mozilla Public License 2.0](LICENSE). In short: use the skills anywhere, including commercially and inside
private projects. If you distribute these files or modified versions of them, keep the licence notices and make
the source of the modified files available under the same licence. The obligation is per file: your own files
that sit beside these, or that use them, keep whatever licence you choose.

The files of this repository carry no licence header of their own, so this notice covers all of them:

> This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was
> not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

Copyright (c) 2026 Sergey Subbotin and contributors.

## Acknowledgements

The skills stand on other people's work, above all Genrich Altshuller's TRIZ and Andrej Karpathy's llm-council
and autoresearch. See [ACKNOWLEDGEMENTS.md](ACKNOWLEDGEMENTS.md).
