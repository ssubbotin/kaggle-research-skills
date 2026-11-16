---
name: kaggle-campaign
description: Use when running a Kaggle (or similar) modelling competition end to end - planning a campaign, deciding what to build next, judging whether to blend or rebuild, choosing final submissions, or when a competition score has plateaued. Encodes the phase order, the frontier gauge, and the build-versus-verify budget that separate a top finish from a merely strong one.
---

# Kaggle campaign: how to turn a strong finish into a top finish

Derived from campaign postmortems and from the write-ups of winning teams. The pattern the
postmortems share: offline scores that transfer to the private board as well as anyone's,
and a model class that is still well short of the winner's. The lesson is narrow and repeatable:
**such a campaign's verification apparatus is first class and its build throughput is not.**
Everything below exists to keep those two in the right proportion.

## The one law

> **A competition is decided by the strongest single model you build, and only then by everything
> you do to it.**

Blending, gating, dose tuning, leaderboard probes, risk gates and selection rules move you within a
frame. They cannot move you to a better frame. If your frame is wrong, perfect execution of
everything else lands mid-field.

## Phase order (do not reorder)

### Phase 0 — Frame census (first 3 days, before any modelling)
Read every public notebook and every discussion thread, and write down **the representation each
one uses**, not the model name. What is the input tensor? What are its axes? What is the label
space? What is the anchor? Representations, not architectures, are what separates leaderboards.
Output: a short table of distinct frames with a headroom guess for each.

Then pick one frame and build it yourself end to end. Start from its *frame*, and **reuse every
public artefact that serves it**: weights, label tables, auxiliary-model checkpoints,
training code. Rebuilding a published artefact from scratch is admissible only after
plugging the public one in has been tried. Repeat this census of public **artefacts** (not only
frames) every three days through the end: decisive public releases (blends of two frames, a
preprocessing pipeline, shared machine-generated label tables) tend to land in the last two
weeks.

**A reproducible public engine with a score history is a curriculum.** When one exists (code,
weights, a published step-by-step score history), "pick one frame and build it yourself" becomes:
extract its ladder (rung, component, score at that rung, one-sentence mechanism) and climb it with
our own code and weights, one rung per build, the rung's own score as the gate. Our verified own
parts that it lacks are added at the top rung; that is how we pass it.

**Census the label SOURCES, not only the frames.** When the task's labels are weak (free-text
records, proxies, pseudo-labels), write down every possible provenance of the target and attack the
assumed one. A typical unwritten assumption is "the targets come from the provided records"; teams
that finish above add a second provenance, a strong pretrained model reading the raw inputs blind,
fuse it with the record-derived labels, and gain more from that than from any model change. An
independent provenance beats a better copy of the same one.

### Phase 1 — Frontier gauge (maintained weekly, forever)
Keep `FRONTIER.md`: every number any competitor states, as **(CV, public, private, frame,
single-model or ensemble)**. Beside it, our own number in the same frame.

Two rules read off this table:

- **The single-model rule.** Until our best *single* model is within ~0.5 metric units of the best
  publicly claimed *single* model, all blending, gating, dose tuning and LB probing is banned.
  Every hour goes to the frame, the capacity, the data, or the augmentation. (The 0.5 is calibrated
  on a metric where the winner's lead over a strong finish was about 2 units; rescale it to the
  spread of your metric.)
  **Compare with REPRODUCIBLE public singles** (notebook plus weights you could re-run), never with
  claims that may be fold ensembles. **When the board leaders are rank blends of different frames, the
  rule lifts**: the gap is then a member gap, and the next build is a decorrelated member and a blend.
  In one campaign our single matched the best reproducible singles while the rule, fed with
  unverifiable claims 0.004-0.009 higher on a 0-1 metric, banned the two-frame blend that the top of
  the board was made of.
- **No ceiling may be declared below the frontier.** A plateau at a number worse than a number
  someone else has publicly reported is a build gap. Ceiling arguments are only admissible at or
  above the best known frame. The same holds for every end-point estimate and every "not reachable"
  said to the user: never state a ceiling below a score someone has reproducibly reached. Name the
  next rung of the external artefact and its gate instead. (This error recurs in two forms: a
  "verification ceiling" declared at an error worse than a publicly reported one, and an end point
  planned below a reproducible public score.)

Two more items belong in the gauge from day one:

- **Per-label error table in every gauge.** Macro metrics are won on the weak labels. A campaign
  that first tabulates per-label error three days before the end has found its weak labels too late
  to act on them.
- **Measure the gap by region and by our own stage on the board early.** One swap probe (the
  reference's output on one region of the test population, ours on the rest) and leave-one-out
  probes of our own stages cost a few submission slots and replace weeks of guessing where the gap
  lives.

### Phase 2 — Build the frame properly
The frame's own knobs usually outweigh the model:

- **Coordinate system.** What is the anchor, what is the window, what is the resolution? Predict a
  *residual from a cheap deterministic reference* (last known value, a chord, a physics baseline)
  rather than an absolute quantity — it shrinks the label range and buys resolution.
- **Evidence in, summaries out.** Feed the raw evidence field (match costs, posteriors) rather than
  hand-computed summaries; nets lean on plausible summaries and collapse folds.
- **Learn the similarity.** A hand-fixed kernel with a bandwidth near the noise scale destroys the
  signal before the net sees it. If matching is the task, the match must be learned.
- **Whole-object decode.** Emit a distribution per position and decode a globally coherent object
  (path, sequence, mask) rather than reading the argmax per position.

### Phase 3 — Data before architecture
With few training units, the generator is the biggest lever, and it fails in a specific,
**measurable** way.

**Measure the generator's difficulty against real data, never its downstream error alone.**
Top-1 match rate, entropy of the evidence field, confidence calibration. If synthetic is *easier*
than real, it is mis-specified: the net learns over-confidence. The fix is a **measured noise
model** — per-unit gain/offset/drift, missing-data patterns, colour — estimated from the real data,
plus dose annealing. Independent teams have reported exactly this artifact and repaired it; a
campaign that records the same measurement and kills the family instead has thrown the lever away.

A generator that fails is wounded, and the wound names the missing condition. Killing it on a
downstream metric is the single most expensive move available.

**When the labels are weak, the labels are the data lever.** Six rules, each taken from published
solutions to weak-label competitions:

1. **Ration the scarce truth set by effect size; never declare it unusable.** A small gold set
   cannot rank model tweaks, whose effects sit far below its standard error, but it can gate label
   construction, where effects are about ten times larger. Gate it: nested splits, a few
   pre-registered candidates per round, a P(gain) threshold.
2. **Let the scarce truth set train the labelling protocol, out of fold.** An agent that reads gold
   cases, reflects and writes a labelling guide can roughly halve confident errors. Judge labels by
   log loss and confident errors, never by a ranking metric alone.
3. **Let a capable reader look at the raw evidence, agentically.** The main gain of a winning
   solution can be a strong pretrained model used as a labeller: it sees the provided record, the
   target definitions and the raw inputs through a bounded set of inspection tools, and returns
   continuous probabilities. The same model family run over the provided records alone misses that
   gain. Before running any reader, ask what raw evidence it could see.
4. **Label the auxiliary structure you need (where in the raw input the evidence sits) with the
   same reader, propagate it with a cheap model, and use it only as a training-time constraint with
   an explicit "ignore" state** (positive / reliable negative / ignore).
5. **Absorb a real confounder in training before deciding to correct the table.** When the
   labelling habits of each data source are measured, closing them as "real prevalence" leaves a
   lever unused: a training-only source x label bias term, dropped at test, is a measurable gain.
6. **Use train-only side information as privileged information beyond labels**, e.g. an auxiliary
   head that predicts an embedding of it; it costs nothing at inference.

### Phase 4 — Cheap variance reduction, in this order
1. **Seeds × folds averaging.** N fold-seeds × K folds, average all N·K checkpoints. Repeatedly
   worth more than any clever combiner and it cannot overfit.
2. **Split-pattern diversity.** Re-draw the group assignment itself, average across patterns.
3. **TTA**, weighted by a confidence statistic rather than uniformly.

### Phase 5 — Combiner ladder
In order, and only after Phase 4:
1. Simplex-constrained **learned per-row gate** (small CNN/BiLSTM over candidate values plus
   disagreement and position features; loss = mixed-prediction error + best-candidate CE).
2. **Posterior-level fusion** (multiply distributions with a uniform floor) when members emit
   distributions — it preserves multimodality that point averaging destroys.
3. Position-banded non-negative least squares when member reliability varies with position.

**Trimmed means are a tail guard, never the combiner.** A trim cannot express a decorrelated
member: it drops it as min-or-max on most rows. If you measure a member with low error correlation
and the combiner refuses it, replace the combiner, not the member.

### Phase 6 — Selection and risk (last two weeks only)
This is where gates belong, and they work: honest OOF over the deployed frame, worst-case veto,
P(regression | resampled board draw), and final picks made on CV alone. Assume the public board is
a small draw and read nothing from it below its own resolution. When public and CV disagree,
investigate once, then trust CV.

**Trust OOF for within-family choices.** Within one model family the public board can rank variants
at random while OOF reads predict the private order (observed: the variant OOF preferred was +0.004
on private while the public board could not separate the variants).

## Rulers: validate each one before it decides anything

A ruler is any offline population or reference score used to accept or reject a change. An
unvalidated ruler is the most expensive object in a campaign: a campaign can lean for weeks on
several offline rulers that all fail validation against the board once the check is run.

1. **Validate every ruler against the board early.** Collect 20-30 public scores and keep the
   reference that tracks them; contamination audits are not enough.
2. **Validate each offline population against board history before using it as a decision rule**:
   replay every past build on it and require the known step directions. Do this in the first days:
   a check that first runs in the second week has let unvalidated rulers decide for all that time.
3. **Parity with the reference is a ruler that needs no labels.** The reference's weights inside our
   code must reproduce the reference's stage output; then our weights go in and the difference is
   the weights gap. When every labelled offline set is compromised (contaminated, wrong in
   composition, or too widely seen), this is the only offline check that means anything.
4. **A fast commit path for probes.** When the visible test is costly, guard a shortcut by the
   visible file's hash so a probe's commit run takes minutes and the hidden rerun takes the full
   path; make every probe fail loudly if its switch never acted. (Mechanics in the
   `kaggle-code-submission` skill.)

See also "Match the ruler to the lever" under the budget rules, and the region and stage probes
under Phase 1.

## Two tracks: absorb the public ladder, keep researching the unknown

The failure this section prevents: our own pipeline stands well below a reproducible public engine
while the time goes into audit councils, fusion and gate tuning on our own artefacts, and
unvalidated rulers, with nothing replicated. The correction has two halves and both are mandatory.

- **The frontier track.** Climb the public ladder as Phase 0 describes: one rung per build, the
  rung's own score as the gate, parity with the reference before any board score.
- **The unknown track. Absorbing the frontier is half of the work at most.** The other half stays on
  what nobody has solved: where the reference itself scores near zero, what separates the leaders
  from the public engine, the missing ruler. Gains realised while still far below a public engine
  come from there (new evidence the public engine does not use), and such gains are what carries a
  pipeline past the public score once it stands on the ladder.

Replication is a means to the research and never switches it off.

The procedure is the `researcher` skill's: the **frontier gate** (the gap to the best reproducible
external score against the largest lever we have realised), the **two tracks** with the unknown
first, and **parity before board**. Its `PREFLIGHT.md` holds the cheap checks to run before a build
and its `LEDGER.md` the lessons; its workflows `invention-council-workflow.js` and
`research-loop-workflow.js` apply the gate and run both tracks when it trips.

## Budget rules

- **≥ 3:1 training hours to verification hours** until the single-model gap closes. Invert only
  after Phase 5 begins.
- **A week without a board submission while GPU time was available is a stop signal.** Re-run the
  frontier gauge and the artefact census before anything else. Receipts, hashes and budgets earn
  their cost only while they protect a shipping decision.
- **Match the ruler to the lever.** A ruler derived from the same source as the training targets
  cannot judge a change to those targets: a move toward the scoring truth reads as harm on it. Judge
  target changes on the truth-side set and on the board.
- **Do not experiment on an insensitive model.** Once a model's sensitivity to anything but its
  teacher is measured small (a distilled student), route changes through the teacher or ship them as
  a new member next to it.
- Cap total evaluations against any one selection set and track the spend; best-of-N is the maximum
  of N noisy draws.
- **Write code fast.** Winners state plainly that agents wrote most of their code. Implementation
  throughput is a competitive variable; treat a slow build as a defect in the campaign, not a fact
  of life.
- **Point the agent workforce at the task's bottleneck.** When labels are the bottleneck, they can
  be produced by one non-interactive CLI agent session per case (for example `codex exec --json` or
  `claude -p --json-schema`): a workspace with the target definitions, the provided record, the raw
  inputs with tools to inspect them, and an evidence-first answer schema. A campaign that uses
  agents only for deliberation leaves its bottleneck untouched.
- **Price the paid tool against the gap.** When the rules allow commercial APIs, estimate their cost
  against the distance to the next prize line before defaulting to the free local option.
- **For efficiency metrics compute the exchange rate between accuracy and runtime first** (how many
  seconds one unit of the accuracy metric is worth) and spend on accuracy until the next unit costs
  more runtime than it buys.

## Kill discipline

Before recording any family as closed:

1. **Build-parity checklist.** If the method exists in someone's writeup, list every knob the
   original names and verify each is present in our build. First builds of externally described
   methods have scored 2× worse than the original and were then recorded as kills.
2. **Oracle first for original methods.** No external number exists, so manufacture one: build the
   cheating/oracle variant and iterate against the oracle gap.
3. **Name the missing condition.** A kill written as "X does not work" is inadmissible. A kill reads
   "X fails because <mechanism>, and the condition that would fix it is <Y>, which is
   unavailable/measured-not-to-help because <evidence>".

## Standing questions at every weekly review

1. What is our best **single** model's CV, and what is the best publicly claimed single model's CV?
2. If the gap is > 0.5 (rescaled to the metric, see the single-model rule): what are we doing this
   week that is not closing it? Stop that.
3. What fraction of GPU hours last week trained a model versus measured one?
4. Which lever on the frame (coordinates, resolution, window, evidence channels, augmentation) have
   we not yet swept?
5. Is any family recorded as closed whose kill note fails the three tests above?
6. Which public weights, label tables or checkpoints appeared since the last review, and which of them
   have we not plugged in yet?
7. When did we last submit, and which ruler judged each change this week?
