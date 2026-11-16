---
name: researcher
description: Use when research plateaus despite tuning, requirements appear to contradict each other, or a new scientific mechanism is needed. Also use for TRIZ, inventive problem solving, and combining invention-council research with autoresearch experiment loops.
---

# Researcher: systematic invention for math, ML, and science

A model trained on physics up to 1900 cannot recombine its way to relativity. When the catalog of
known methods is spent, progress comes from operating on the structure of the problem itself: its
contradictions, its hidden assumptions, its unused resources. This skill is TRIZ (Altshuller)
translated to research work, extended with the recurring heuristics of major scientific inventions:
assumption excavation, symmetry arguments, representation change, analogy transplant.

Its main target is the unknown: questions nobody has answered, beyond the frontier of what is
published. Replicating a known frontier is a means to that end and never the goal (see "Two tracks:
the unknown first, the frontier absorbed").

## When the campaign needs RESULTS: the research loop, binding gap first

Why the loop is built this way: each design choice answers a measured failure. A loop that bans
training returns metadata only. Arms whose own predictions sit several times below their bar
forecast their own nulls: a batch of five arms, about 15 GPU-hours, gave **zero passes and three
harms** after every pre-registration had predicted +0.0001..+0.0012 against a 0.0036 bar. Stacks
of sub-bar cards harm and cannot be attributed. The largest harm was a loss-construction defect
visible in the smoke run. And an arm that changes a distilled student, whose measured weight on
anything but its teacher was 0.005-0.013, changes almost nothing that ships.

The same failure exists one level up: **a campaign optimises "is this increment safe to ship?"
when the deciding question is "is our model class the right one?"**. It builds the winning
representation and walks away, kills a family on the right measurement with the wrong verdict, and
never promotes the combiner or seeds x folds to first-class levers. The research loop answers
both. Launch `research-loop-workflow.js` (same directory):

```
Workflow({ scriptPath: "~/.claude/skills/researcher/research-loop-workflow.js",
           args: { mode: "launch", today, deadline: "YYYY-MM-DD", runDir, remoteDir, intakePath, context,
                   compute: "<how agents reach data and compute, with resource caps>", postmortems: [],
                   arms: 3, minArms: 1, gpuHours: 9, screenFolds: "1,2", perPartBinding: 4, perPartOther: 1,
                   diagnostics: 1 } })
// after the remote queue finishes:
Workflow({ scriptPath: ".../research-loop-workflow.js", args: { mode: "judge", ...same } })
```

The path is wherever the skill is installed; `~/.claude/skills/researcher/` is the usual place for a
personal skill. Each script documents all of its arguments and their defaults at the top. The loop
keeps its tables in the campaign repository (`FRONTIER.md`, `docs/FRAMES.md`, and `ARCHIVE.tsv`,
`PARTS.md`, `CALIBRATION.tsv` under `docs/autoresearch/`; every path is an argument) and its prompts
read the campaign's `FINDINGS.md`, `BACKLOG.md` and `HANDOFF.md` by those names; name other
locations in `context`.

The phases:

1. **Gauge**: fresh leaderboard, discussions and public notebooks, recorded as a frontier table in
   the same frame, plus a **frame census** of the top of the board (representations, not model
   names). It names the **binding gap**: FRAME_GAP (build that frame faithfully), MODEL_GAP,
   MEMBER_GAP (the board gap is carried by ensembles of different families: build a strong
   decorrelated member, a teacher from one, or a combiner), or VARIANCE_GAP. Gauge also carries the
   frontier gate of the two-track section and the reuse list (rule P1). The per-component error
   table (rule P9) comes from Immerse, which the script runs in parallel with Gauge and Audit.
2. **Audit**: mechanisms the campaign named and never built; closures that fail the three kill
   tests; abandoned positives; and **calibration** of every past prediction against its realized
   delta, per lever class, written to the calibration table (`docs/autoresearch/CALIBRATION.tsv`
   in the campaign repository by default). The phase answers two recurring misses: a winning
   mechanism that was written down and never built, and a family closed on the wrong verdict.
3. **Immerse** (residual anatomy of the incumbent, error tags, anomalies ranked by size),
   **Decompose** (TRIZ function model, nine windows, ceiling analysis) and **Tracks** (one invention
   track per part), with two requirements: every part and card carries a **lever class** (FRAME,
   TARGET, TEACHER, MEMBER, VARIANCE, COMBINER, STUDENT, HYGIENE), and every prediction is made on
   the SHIPPED model (a change upstream of distillation reaches the student at the student's
   measured weight). Audit items enter the tracks first: a named-but-unbuilt mechanism or a wounded
   kill's repair already has a measurement behind it.
4. **Gate**, deterministic code: calibrated centre = class factor x centre (capped at the card's own
   Fermi bound); admitted when calibrated centre >= bar/2 and calibrated upper >= bar. At most
   `diagnostics` sub-bar arms, each naming the decision it changes. Within `selectionDays` of the
   deadline only VARIANCE, COMBINER and HYGIENE are admitted. **Solo arms by default**; a stack only
   of cards each trained alone with evidence. **Portfolio**: an admitted binding-class card is always
   in the batch. Every dropped card is logged with its reason. Nothing admitted returns
   NO_RESOLVABLE_ARM and names the binding-class build to size by hand.
5. **Build**: one engineer per arm, with **oracle first** for original methods, a **parity
   checklist** for external ones, and a CPU **preflight** that blocks the arm: the new loss term's
   share of the step-0 gradient (cap 0.3), the fraction of its targets that carry no information
   (cap 0.5), and the direction of the mechanism's own signature in a short micro-run when GPU
   memory is free.
6. **Judge**: **kill discipline** (CLOSED only with parity, oracle and a named missing condition;
   otherwise WOUNDED, and the repair becomes the next card for its part), calibration rows, the
   `kaggle-campaign` skill's standing questions with FRONTIER.md updated, and a **queue review** that
   scores every pending item in every remote queue against the gate and recommends KEEP or CANCEL
   (the chairman cancels).

The unit of a run is a trained arm. Selection discipline (pre-registration, two rulers, adversarial
verification) is kept in full: it is the part of the method that held in every postmortem. The council below
remains the tool for a pure invention or audit session.

## Postmortem rules

Nine rules taken from the postmortems of lost campaigns, numbered P1 to P9 so that other sections can cite
them. Every rule targets a failure that cost leaderboard rank. None of them weakens selection discipline.

**Reuse, rulers and the verification budget (P1 to P5).** The failure they target: the best own single
model equals the best REPRODUCIBLE public single, while the top of the board stands higher through simple
public rank blends of two public singles. Such a campaign can go two weeks without an accuracy submission
and slide down the board while its loop runs proofs with hash receipts and compute budgets, forecasts gains
far below the board's resolution, and passes its own gates.

- **P1. Reuse before invention (phase 0 of Gauge).** Before any card is generated, list every public
  weights dataset, label table, auxiliary-model checkpoint and training notebook. For each one ask:
  *does plugging this artefact in close the binding gap?* A card that rebuilds something a competitor has
  published is inadmissible until the public artefact has been tried (a campaign can spend weeks rebuilding
  a component for which a public checkpoint and a full pipeline exist).
  Refresh this list at least every three days, because public releases cluster in the last two weeks.
- **P2. Ruler-bias check per lever class.** If a ruler is derived from the same source as the training
  targets (a reference set produced by the same labelling process as the labels), it cannot judge a change
  to the targets. A change that moves targets toward the scoring truth looks like harm on such a ruler.
  TARGET-class cards are judged on the truth-side ruler (an independently produced gold set) and on the
  board, and the gate must use that ruler's SE. Write down which ruler judges which class before the run.
- **P3. No arms on an insensitive object.** Once a model's sensitivity to inputs other than its teacher is
  measured as small (a distilled student: weight 0.005-0.013 on anything but the teacher), it is not an
  experimental subject. A change must reach it through the teacher, or it must ship as a new member
  next to it. A forecast that multiplies an effect by that weight is a reason to retarget the card, and
  no reason to admit it as a "diagnostic".
- **P4. The single-model comparison uses reproducible public singles.** Compare against public single
  models that can be re-run (notebook plus weights), never against claims that may be fold ensembles. When
  the board leaders are rank blends of different frames, MEMBER_GAP opens automatically: build or adopt a
  decorrelated member and blend. A rule that forbids the move that produces the frontier is a defect.
- **P5. Verification budget trips a stop.** If a calendar week passes without a board submission while GPU
  time was available, or verification work exceeds build work for that week, stop the loop and run
  the Gauge again with the reuse list. Receipts, hashes and budgets are worth keeping only while they
  protect a shipping decision.

**Premises, instruments and confounders (P6 to P9).** The failure they target: the levers that the teams
above use are all reachable from the campaign's own measurements, and the loop never generates them because
of premises nobody attacked.

- **P6. Every council must list the assumed label provenance as a certificate to attack.** "The targets come
  from the provided labels" is rarely written down, so no breaker attacks it, even when the campaign's own
  results already say that label provenance carries member diversity. The missing provenance can be a second
  one: a strong pretrained model reading the raw inputs blind.
- **P7. Instrument resolution is per lever class.** A small gold set (a few dozen cases) is rightly
  refused for model tweaks and wrongly refused for label construction, where effects are 10x larger. Price
  the instrument against the class's expected effect before banning it.
- **P8. A measured confounder is a model component before it is a verdict.** A per-source labelling habit
  that is measured and closed as "signal" leaves a lever unused; the repair that works is a nuisance term
  learned in training and dropped at test.
- **P9. Per-label (per-component) error tables open every Gauge.** A few weak labels can hold the whole
  gap, and tabulating them days before the end is too late to act.

What the loop gets right when it works from the campaign's own measurements: a committee teacher across
label provenances came from Decompose and was confirmed on a private board at identical runtime.

## Two tracks: the unknown first, the frontier absorbed

**What this skill is for: research of the unknown.** Seeing behind the frontier, finding what nobody has
explained or built. Replication is a means to that end: it is how we read what the frontier already knows (by
building it), get a reference to measure against, and stand where the unknown begins. It is never the goal
and it never switches the research off.

The failure this section answers: a pipeline stands well below a reproducible public engine (code, weights,
a published step-by-step score history) while invention councils run on the campaign's own artefacts with no
replication target. The measured yield of such councils: dozens of candidates, a couple of keeps, every
fresh-population read under the board's resolution, and offline rulers that turn out invalid.

Two over-corrections follow easily and both are wrong:
- Stating an end point for the own line below the frontier. The public engine got to its score somehow, and
  reaching and passing it is a standard research problem.
- Making replication the only admissible work below the frontier. The main target of a researcher remains
  the unknown. Replication is fine; tackling the unknown is the most important part.

What fails in such councils is where they point, never that they invent. They re-weight evidence already in
the campaign's lists (tuning), work from a stale picture of the frontier, are judged on rulers nobody has
validated, and ignore what the frontier knows. Real gains made while far below a public engine are
inventions beyond its practice, each bringing evidence the engine does not use. Below-frontier invention
works when it brings new evidence or a new question.

**Two tracks, always both.**

1. **The frontier gate is arithmetic and it adds a track; it removes none.** G = (best REPRODUCIBLE external
   score in our frame) - (our score). L = the largest effect any candidate of ours has realised on the
   deciding instrument in the last two weeks. If G > 2 L, a FRONTIER TRACK is required next to the UNKNOWN
   TRACK: a run with a tripped gate and no replication target is inadmissible. The unknown track keeps at
   least half of the effort; a replication-only run happens only when the user asks for one. (Example:
   external 0.70, ours 0.60, largest lever 0.02 gives G = 0.10 > 2 x 0.02, so the gate trips.) Record G, L
   and the split in the run contract.

**The unknown track (the main one).**

2. **Admission test, three questions, answered in writing before any work.**
   - *Is it frontier-new?* What does the best external artefact do at this decision site, and why is the
     candidate not that? This needs a census at most three days old. If the frontier already has it, it is a
     rung: move it to the frontier track.
   - *Is it new evidence or a new question?* A re-weighting, threshold, slot, gate or fusion of evidence
     already in our lists is tuning, and tuning is banned while the gate is tripped (rule 12).
   - *Does it aim where the frontier itself is blind?* See rule 3.
3. **Where the unknown is.** (a) The frontier's own failure anatomy: run the reference and tabulate where IT
   scores near zero or guesses; that table is the map of what nobody has solved. (b) The gap between the best
   reproducible artefact and the leaders above it: by definition nobody has published it. (c) Anomalies
   nobody has explained, resources nobody uses, premises nobody wrote down (the armory and rules P6 to P9).
   (d) The instrument itself: when no offline ruler is valid, building one that predicts the real instrument
   is research, and it pays for everything after it.
4. **Unknown-track results are built to travel.** Build each as an addition that does not depend on our
   current rung, test it on the real instrument on the base we have now, and carry it up at every rung. That
   is how we pass the frontier and not merely reach it.

**The frontier track (absorption).**

5. **Extract the ladder.** A reproducible external artefact has a history: ordered rungs, each one component,
   each with a number on the real instrument (public notebook versions, ablations, author notes). Write the
   table `rung | component | score at that rung | mechanism in one sentence | what we already have |
   reference code cell`. The mechanism sentence states what the rung assumes about the target that makes it
   work; a rung with no stated mechanism is not built (learn from it, never borrow blind). Every mechanism
   sentence is also an input to rule 3: an assumption about the target is a place to look for what it leaves
   out.
6. **Climb rung by rung with our own code and weights; each rung is one build with the rung's own score as
   its gate.** The pre-registered gate of rung k is the reference's score at rung k minus a stated tolerance.
7. **Parity to the reference is a ruler that needs no labels.** Run the reference implementation on the same
   inputs as ours and compare stage by stage:
   - CODE PARITY: their weights and tables inside our code must reproduce their stage output. Until this
     passes, the rung is not built; a board slot spent before it is wasted.
   - WEIGHTS / DATA PARITY: swap in our own weights or tables; the offline list agreement and one board read
     measure what our weights cost. That delta names the next job.
   A rung that scores below the reference after code parity is a weights or data gap; before code parity it
   is a build defect to bisect against the reference. Neither is ever a verdict on the mechanism.
8. **A graft judged without parity is void.** Strike the verdict and rebuild it as a rung.
9. **Open with the gap table, by region and by our own component**: a swap probe (the reference's output on
   one region, ours on the rest) and leave-one-out reads of our own stages on the real instrument. This is
   rule P9 (per-component error tables open every Gauge) in a campaign without labels of its own.
10. **Rungs below the instrument's resolution are grouped** into one build, each checked by parity, one read
    for the group. The scarce instrument is rationed by effect size (rule P7).
11. **Constants the crowd tuned on the public board are not rungs.** A threshold or weight whose only
    justification is a public-board sweep carries no mechanism: list it apart and do not replicate it. Final
    picks rest on parity with a mechanism-bearing reference and on our own measured stages, never on public
    deltas of one or two units of resolution (in one campaign six late submissions differed by less than the
    board could rank; selection discipline is the part of the method that held in every postmortem).

**Both tracks.**

12. **Below the frontier nothing is tuned.** Fusion weights, gates, slots, thresholds and dose are the
    `kaggle-campaign` skill's "single-model rule" territory: banned while the gate is tripped. (Councils can
    spend weeks exactly there and call it invention.)
13. **No end-point estimate below the frontier, ever.** The chairman, the host session and every brief are
    forbidden to state a ceiling, a "realistic end point" or a "not reachable" for our line below the best
    reproducible external score. Admissible: the next rung and its gate, and the open questions of the
    unknown track.
14. **When no offline ruler has been validated against the instrument, offline reads decide nothing.** They
    gate mechanics and parity. Decisions come from the real instrument, at effects it can resolve.

**How the two tracks sit with the other rules, and what a postmortem must feed back.** Every campaign
postmortem is read against this file before the next campaign. Each miss becomes a rule here, a lesson in
`LEDGER.md` or a preflight item, and any conflict between an older rule and a newer one is resolved in
writing:

- Two earlier rules of this skill, "councils fire at the frontier and never below it" and "audit mode
  fires at any distance" (ledger lesson 105), look like a contradiction. Both hold a part: an audit of our own artefacts that only re-weights them earns nothing
  below the frontier (rule 12); invention that brings new evidence earns its place at any distance (rule 2),
  provided the frontier is being absorbed beside it (rule 1).
- The frontier track enforces two postmortem findings: "we built the winning representation and walked
  away" ("a correct diagnosis that is not built is worth zero"), and the process diagnosis ("is this
  increment safe to ship" asked where "is our model class the right one" decided). The unknown track is for
  gains like the committee teacher across label provenances noted under the postmortem rules: it was found
  while standing on the public frontier.
- Rule P1, reuse before invention: the CODE PARITY step is the "plug the public artefact in first" of that
  rule. When the user requires own code and weights, the public artefact is plugged in as a private
  measurement and parity reference, and what ships is ours.
- Rule P5 and the `kaggle-campaign` skill's 3:1 budget of training to verification: parity checks are cheap;
  a week without a read on the real instrument is the stop signal.
- "Validate every ruler against the board early" is a postmortem lesson of its own. Rule 14 is its
  consequence when every ruler fails, and rule 3 (d) makes the missing ruler a research question.
- Rule P6, write the assumed premises down and attack them: each rung's mechanism sentence is such a
  premise, and the place where the unknown track looks first.

**Skill or workflow.** A two-track run may be made either way and the two are kept in agreement:
- Workflow: `invention-council-workflow.js` with `frontier: {external, ours, largestLever, reference}`. When
  the gate trips, the script refuses to run without `replicationTargets` = the next one to three rungs, each
  `{name, recipe (cells and files of the reference), expected (the rung's score), gate (code parity, then the
  board gate), mechanism, reference}`, and it hands every generator, engineer and the chairman the
  BEYOND-THE-FRONTIER directive (the three admission questions of rule 2). Generators, scouts and the Enable
  engineers stay on. Replicators return `CODE_PARITY_PASS` / `CODE_PARITY_FAIL` besides the replication verdicts.
  `research-loop-workflow.js` carries the same gate and directive in its Gauge phase and its hard rules.
- Skill (host session plus agents): acceptable for the frontier track, where the lever is fixed by the ladder
  and the grade comes from a parity script and the real instrument. The unknown track keeps the reasons for
  "never by hand": independent candidates from several agents, an independent falsifier per candidate, and a
  ledger entry. Run it through the workflow when the workflow is available; by hand only with those three in
  place.

## MANDATORY: run the frontier gate, then the workflow. Do not run the loop by hand.

**Step zero, before anything else: compute the frontier gate (G against 2 L, rule 1 of the two-track section).**
If it trips, the run has two tracks: rungs as `replicationTargets` and the generators aimed beyond the frontier.
If it does not trip, the audit and architecture modes below apply.

For a requested **joint researcher + autoresearch run**, read [AUTORESEARCH.md](AUTORESEARCH.md).
When the invention-council workflow is available, launch it: scouts and generators select
mechanisms, and each Enable worker executes one trial under that file's transaction. Write the
run contract first. The native adapter in that file is only for a host that cannot launch the
workflow. Skill maintenance itself does not launch a research council.

**When this skill is invoked, your FIRST substantive action after the frontier gate is to call the
invention-council workflow in the mode the gate selects** (`## Heavy sessions`, below, has the exact
invocation and knobs). Not after a bit of orientation, not after "one cheap measurement first", not
after picking a promising lever. First.

**Which mode, decided by one question: how far is our frame from the best frame anyone has
published?**

- **Two-track mode when the frontier gate trips (G > 2 L against a reproducible external
  artefact).** Rungs as `replicationTargets` with parity before board, AND generators on under the
  beyond-the-frontier directive; scouts on the reference's own failures as well as on ours. See
  "Two tracks: the unknown first, the frontier absorbed".
- **Audit mode is the default when the gate does not trip.** `assemble: 0`, scouts on the deployed
  artifact and the deployed decisions, generators on, the free lane on. In the record behind this
  rule, everything the workflow shipped came from here and most of it from below the frontier: a full-corpus
  refit that became a campaign's best entry, the data-curve measurement that justified it, a
  ruler diagnostic, and a pruned directory walk worth several minutes of the runtime budget.
- **Architecture mode (`assemble: 1`) only when the frame gap exceeds the largest lever an audit can
  name.** Composed model classes are 0 for 5 in that record and they consumed the largest share of
  every run they appeared in. When your own audit can still name a lever worth more than the gap,
  the assembler is not earning its cost.

Reading files to assemble the workflow args, writing the joint run contract, and a fresh intake
of discussions, public models, and papers are the permitted precursors. The intake procedure is
[AUTORESEARCH.md](AUTORESEARCH.md). You must gather
`currentBest`, `plateauEvidence`, `triedLevers` (every dead end with its measured kill number),
`certificates`, and above all `dataAccess`, which is what turns the council from an idea generator
into an experiment machine. Gather, launch, then report.

**Why this is a rule and not a preference.** Running THE LOOP by hand feels like doing the
methodology, and it is the single most common way this skill gets wasted. Measured failure mode: a
session invoked /researcher, read the campaign docs, extracted a genuine contradiction, picked ONE
lever, built three scripts in series, measured a clean null, and wrote it up as legitimate work. It
was not. The defects are structural and no amount of care inside a hand-run avoids them:

- **N=1 on lever choice.** You pick the lever that is most legible to you from the docs. The council
  picks from SCOUT-MEASURED facts about the deployed artifact's own decisions, which is the phase
  with the highest historical hit rate.
- **Serial where parallel was available.** Three scripts over a session buys what a fan-out buys in
  one pass, and the opportunity cost is every lever you did not test.
- **You would grade your own homework.** The workflow assigns an independent engineer to each
  selected candidate, plus the ceiling arithmetic, the delete-the-idea control, the partition
  re-draw and the out-of-fold re-selection. Self-assessment reliably reports what it hoped for.
- **Your certificates go unattacked.** The largest win in this workflow's history came from the
  breaker phase discovering that a "family closed" verdict rested on a build missing two documented
  knobs. Hand-runs never attack their own closures; they produce more of them.
- **The ledger never learns.** Hand-run outcomes do not reach `LEDGER.md`, so the method's calibration
  stops improving and the next run repeats the mistake.

A hand-run that ends in 0 survivors is not a cheaper version of the council. It is a run that
searched one branch, verified it with the wrong organ, and logged nothing. **If you catch yourself
writing a script before the workflow is launched, stop and launch it.**

The only exceptions: the user explicitly says not to use the workflow or subagents; or the workflow
has ALREADY run this session and you are executing a specific measurement it named (a 0-survivor
brief that names its own decisive measurement should have that measurement run — see below).

## The stance

- The target is a working mechanism. A candidate that fails a test is wounded, and the wound tells
  you where the next contradiction lives. Iterate until it works.
- **The goal is not to falsify theories. It is to change or add the conditions that make them work.**
  A measured miss is a specification for the missing condition, not a verdict. When the signal is
  real and the gap to the bar is small, what remains is engineering: narrow the population, change
  the scale, add the missing witness, re-frame the threshold, compose two half-signals, move the
  mechanism to a different decision site. Reporting an engineering problem as an impossibility
  result is the most expensive error this methodology can make, and it is the easiest to rationalize
  because it looks like rigour. Only a ceiling argument terminates a line of work.
- **A first-build score is a fact about the build, not the method class.** Two false family
  closures in one campaign came from reading one as a verdict (a class recorded dead on its first
  standalone build was later built faithfully at less than half that error). An externally
  documented method gets its
  reference number from the original's report; an ORIGINAL method has no external number, so
  manufacture one: build the ORACLE variant FIRST and evaluate every build iteration against
  the oracle gap. Killing a method class off a legal build with no oracle beside it is the
  replication mistake with nobody's writeup there to catch you.
- **Never let the resource inventory be closed.** A plateau computed entirely from internal
  resources is a statement about the inventory, not the problem. Two external classes are always
  available and are usually skipped: research methods published since the current approach was
  designed, and the domain's own field practice — including the documented drift, degradation and
  accumulating errors of the *instruments that produced the data*. Measurement artifacts are written
  up in domain literature and almost never modelled by outsiders, yet they are frequently the
  unexplained per-unit variance in the residual. An outside effect with a computable proxy in
  existing columns is the strongest kind of new feature, because it is physically motivated rather
  than mined.
- **Distinguish a VERIFICATION ceiling from a SIGNAL ceiling, because they have opposite remedies.**
  Choosing among candidates on one evaluation set buys optimism, and it grows with how many you
  compare. Measured directly in this methodology: +0.060 of drift for a 14-cell menu, rising +0.0985
  as the menu went from 1 to 14 cells, on a campaign whose real effects were ~0.3 and whose observed
  train-to-deployment attenuation was ~0.2 (about half of it this). Once the optimism approaches the
  size of the effects being chased, the campaign can still *find* signal but can no longer *verify*
  it, and the flattening ladder looks exactly like an exhausted problem. The remedy is not a cleverer
  candidate; it is a population never used for selection. Track the spend (`query_budget.md`), report
  it, and prefer a few well-motivated tests to broad sweeps. A best-of-N is the maximum of N noisy
  draws, not an estimate.
- **Describe the system before proposing mechanisms for it, and treat every useful external article as
  a failure of your own description.** Measured, in one day: three external articles helped this
  methodology and all three were reproducible from data already in hand — a component atlas hidden
  inside an average nobody opened, an evaluation-apparatus fact stated plainly in the rules, and an
  agreement-versus-error cross-tabulation over components already on disk. The data and the tools were
  present; the *question* was absent, because every phase was oriented to proposing and testing
  candidates and none to characterizing the object. So: for each component, how does it behave across
  the error distribution rather than on average? Where do components agree, and is agreement associated
  with being right? How does the measuring apparatus actually work, what is fixed versus resampled, and
  what is its repeatability? Ask those before inventing, and when an outside article helps, log the
  question you failed to ask — the gap will keep costing you on every future question of that shape.
- Exactly two certificates permit stopping: (a) it works; (b) a validated impossibility argument at
  the level of information, math, or physics. Subject every impossibility claim to adversarial
  scrutiny before letting it stop work. A plausible ceiling story that merely explains the plateau
  is the most expensive trap in research; one real campaign lost months to a "measurement-limited"
  verdict that later fell to a feature class the analysis had ignored.
- **No ceiling may be declared below a number someone else has already reported.** Before any
  plateau verdict, put our metric and the best externally claimed metric side by side IN THE SAME
  FRAME (same validation object, same single-model-versus-ensemble status). If theirs is better, the
  plateau is a BUILD gap and the only admissible next action is building their frame. Measured cost
  of skipping this: a campaign declared a verification ceiling and "no candidate above the floor" at
  a cross-validation error about two metric units worse than the single models reported in public
  discussion threads, spent its last weeks on combiner risk-management, and finished with the
  winner two full metric units ahead. It
  had written the winning mechanism into its own findings file weeks earlier and never built
  it. **A correct diagnosis that is not built is worth zero.** When the loop names a concrete method
  class, the next action is a build, not another measurement.
- **Before spending a scarce test, check that the test can resolve the interval you predicted.** The
  enable phase's job is to state the expected effect as an interval; the phase that consumes it must
  compare that interval against the RESOLUTION of the instrument it is about to spend, and refuse the
  test when the interval straddles it. Measured in one run: a candidate's own missing-condition field
  predicted [+0.0008, +0.0020] and said in writing that the interval straddled the decision, because
  the instrument displayed to 0.001. Two scarce submission slots were spent anyway; the two reads came
  back +0.001 and 0.000, whose mean matched the internally predicted +0.00053, and nothing was learned
  that the arithmetic had not already said. Two reads of a half-resolution effect is a coin, not an
  experiment. The remedy is always named in the same field the interval came from: supply the missing
  condition with COMPUTE, which is usually idle, instead of with the scarce instrument. A brief that
  predicts its own irresolvability and is tested anyway is a defect in the reader, not in the brief.
- A stop forced by budget gets recorded as SUSPENDED, with explicit revival conditions. Suspension
  is never evidence of impossibility.
- Judge candidates by one test: can the causal mechanism be named in one sentence. Familiarity and
  wildness are both irrelevant.

## Preflight: run the numbered list in PREFLIGHT.md before trusting anything

`PREFLIGHT.md` (in this skill's directory) is the procedure. Ten cheap measurements, each from a
specific measured failure, each under an hour. Read it before the loop, not after. Items 9 and 10
are comparison-frame honesty and "a probe is not a trained chain"; they caught two board-sign
inversions in one campaign after items 1-8 were already in force.

They share one shape. **The failures they catch are not estimation errors — they are correct measurements
paired with wrong inferences**, and the usual honesty rules (out-of-fold fitting, nested selection,
partition redraws, delete-the-idea controls) catch none of them. The general guard: for every diagnostic,
write down the two or three processes that could produce the observed signature and the measurement that
separates them, in the same script. Pre-registering a number protects against post-hoc fitting; it does
not protect against a bad inference rule, so pre-register the discriminating control too.

## THE LOOP

Run the steps in order; return to step 2 whenever step 5 exposes a sharper contradiction.

1. **Restate to function, then state the mini-IFR.** Write what must be achieved and how it is
   measured, with the current method deleted from the sentence. Then write the Ideal Final Result:
   "X achieves Y by itself, using only resources already in the system, at zero added cost." The
   IFR is deliberately unreachable; its job is to destroy anchoring on incremental fixes and mark
   the direction of ideality.
2. **Extract THE contradiction.** First the technical form: improving A degrades B (capacity
   improves fit and degrades generalization). Then sharpen to the physical form: X must be P and X
   must be not-P (the alignment must be flexible to track drift AND rigid to reject noise). The
   physical form is the productive one. If you cannot state a contradiction, you do not yet
   understand the plateau; go measure until one crystallizes.
3. **Inventory resources.** List everything already inside the system that is unused or underused:
   data columns nobody models, structure in the residuals, symmetries of the task, the metric's own
   form, pipeline byproducts (OOF predictions, failure cases, discarded intermediate
   representations), time (what exists before/after), space (neighbors, adjacent instances), scale
   (population-level statistics unavailable to any single instance). Strong solutions almost always
   mobilize an existing resource; that is what makes them look obvious in retrospect.
4. **Crank the armory.** Apply each operator family below against the contradiction and the
   resource list. Volume matters at this step: generate many candidates and require each to name
   its mechanism in one sentence ("this works because ...").
5. **Make it work.** Select by mechanism strength x resource fit x cheapness of the first
   end-to-end test. Build the smallest complete version. On failure, diagnose before deciding
   anything: (i) implementation bug, (ii) wrong sub-assumption, (iii) insufficient resource (data,
   compute, or signal too small for the mechanism), (iv) true mechanism failure. Repair (i)-(iii);
   only (iv) sends you back to step 2 carrying a sharper contradiction. Before declaring (iv):
   plant the mechanism in synthetic data where it must succeed. If it works planted, the mechanism
   is alive and the gap is a transfer problem, which is repairable. Change one thing per iteration;
   log (candidate, failure mode, repair) as you go.
6. **Generalize.** When something works, extract the principle it instantiated and record it. The
   armory below is exactly such a record; grow it.

## THE CREATION ENGINE: originating a method class

THE LOOP repairs and extends a method you already have. When the gap to the frontier is
architecture-sized, the unit of invention is a MODEL CLASS, and the measured record says the loop
alone does not produce one: 112 one-shot candidates yielded ~1% while the two organs that worked
(replication at 33%, the deployed-decision audit) are exactly the depth-first ones; four verified
residual structures sat in a campaign's findings for weeks with no stage charged with composing
them, while the frontier shipped the class that contains them; and a method class was twice
recorded dead on a first build later shown to sit far from a faithful one. Creation is the
replication discipline with the external target number replaced by an internal one. Six stages,
in order:

1. **Diagnose.** Exhaustive residual anatomy of the incumbent (Characterize + Scout + the
   preflight). Output: confirmed structures, each with its number. Original wins have come from
   here and only here; a candidate not grounded in a confirmed structure or a measured wrong
   decision starts at the ~1% base rate.
2. **Mechanize.** For each confirmed structure, the generative story that would produce it (what
   latent, what process). A correlation dies silently; a mechanism converts every miss into a
   named missing component.
3. **Assemble.** Ask the question no other stage owns: WHAT SINGLE MODEL CLASS CONTAINS ALL
   CONFIRMED STRUCTURES AT ONCE - each structure a named latent or component, none dropped
   silently. The composed class is the candidate; per-structure correctors are its fallbacks,
   not its rivals. The council's Assemble phase does this; a hand-run must write the class down
   explicitly before generating anything else.
   **THE DELETION TEST, and it is not optional: could this class be fitted and decoded if every
   current model, leg, ensemble member and cached prediction were deleted, leaving only the raw
   data?** If no, it is a wrapper around the incumbent, not an assembly. Measured on the first
   live run: an assembler handed a mature pipeline composed OUR OWN OUTPUTS - its latent was
   "which of our existing predictions is best here" - and its oracle then measured the value of
   re-ranking our artifacts (a negative gain, below its own random null) while saying nothing about any
   model class. Latents must be quantities of the DATA-GENERATING PROCESS: the physical state,
   its per-unit calibration, its dynamics, the observation model, the noise. Existing code may
   implement an inference step over your latents; it may never supply them. The incumbent is a
   baseline to beat and its score is not the reference frame - the class's own oracle is.
4. **Oracle.** Before building the method, build its ORACLE: the truth-peeking variant per the
   class's oracle spec. The oracle number is the internal replacement for a competitor's
   reported score - it proves the class has headroom AND becomes the target every build
   iteration is evaluated against. No original method enters a build loop without one.
5. **Nursery.** The build loop, budgeted: change ONE named component per iteration; evaluate
   each build against the ORACLE GAP (never against the incumbent delta, never against flat);
   log (build, gap, dominant failure, repair). Default budget: 6 iterations, then a mandatory
   continue/suspend decision recorded with revival conditions. Inside the nursery NOTHING
   closes the class except BLOCKED_BY_ARITHMETIC (the oracle itself cannot clear the bar); budget
   exhaustion is SUSPENDED, never CLOSED.
6. **Gate.** Only a graduate - a build within the realized-fraction band of its oracle - meets
   the ship gate. Gating an infant wastes the gate and kills the class for the build's sins.

## THE ARMORY

### A. Contradiction resolvers (separation principles)
Resolve "X must be P and not-P" by separating the two demands:
- **In time**: P during one phase, not-P during another. Curriculum and annealed constraints;
  coarse-to-fine; warm-start rigid then unfreeze; two-stage decode (commit globally, refine
  locally).
- **In space**: P here, not-P there. Mixture of experts; per-regime models; local/global
  decomposition; gating networks.
- **Between scales**: P at component level, not-P at system level. Ensemble members may overfit
  while the ensemble stays regularized; hierarchical partial pooling (flexible per-instance,
  shrunk at fleet level).
- **Upon condition**: P when a trigger fires. Disagreement-gated features; conditional
  computation; fallback ladders.
- **By phase change**: reparameterize the object so the contradiction dissolves (predict the
  generating surface instead of the observed value; predict the residual; predict a distribution
  and decode later).

### B. Assumption excavation (the relativity move)
Relativity was invented by refusing to sacrifice either of two "incompatible" postulates and
instead deleting the hidden assumption (absolute simultaneity) that manufactured the clash.
- **List the axioms you never chose.** Every pipeline inherits assumptions silently: i.i.d.
  sampling, stationarity, gaussian noise, pointwise loss, "CV mirrors the test distribution", "one
  model per task", "features must be causal". Write them down; the invention is often the deletion
  of one.
- **Promote the anomaly to a postulate.** When data stubbornly contradicts the model, take the
  anomaly as an axiom and rebuild around it (Planck's quantum; a favorable test-vs-validation gap
  read as "this model class generalizes better than local validation can see, so push it harder").
- **Refuse the trade-off.** Wherever "everyone knows you can't have both", treat that acceptance
  itself as the suspect assumption and hunt for the separation (family A) that voids it.

### C. Resource operators (waste becomes asset)
- **Use the harm.** Noise becomes augmentation or a regularizer; failure cases become the training
  set of a corrector model; overfitting becomes a memorization probe; an unusable leak becomes a
  template whose structure you simulate.
- **Self-service.** Make the system produce its own supervision: self-distillation, pseudo-labels,
  consistency losses, transduction on the test set's internal structure.
- **Cheap disposables.** Many crude models over one refined model: bagging, model zoos,
  hill-climbing over a heterogeneous pool.
- **Prior action.** Do the work before it is needed: pretraining, amortized inference, precomputed
  dictionaries and priors from adjacent data.
- **Mediator.** When two domains refuse to align directly, introduce a bridging representation (a
  canonical intermediate object, an optimal-transport pivot, a learned shared embedding).
- **The metric is a resource.** Optimize the actual decision rule; exploit the metric's algebra
  (RMSE rewards the conditional mean and per-group shrinkage; ranking metrics reward calibrated
  order).

### D. Representation and symmetry operators
- **Change the space until the problem is flat.** Log, spectral, rank, sorted, residual domains;
  dual formulations (predict the inverse map); coordinates in which the target is nearly constant.
- **Symmetry arguments.** Enumerate transformations that leave the task invariant; enforce them
  (equivariant features, augmentation) or break one deliberately when the symmetry itself is the
  obstacle. Each invariance implies a conserved quantity or constraint you may exploit.
- **Dimensional analysis.** Nondimensionalize; a Buckingham-pi pass over the quantities tells you
  which feature combinations are even allowed to matter.
- **Continuous/discrete flips.** Relax discrete structure to continuous (soft alignment, Gumbel,
  differentiable surrogates) to enable gradients, or quantize continuous structure to enable exact
  search (DP over a lattice, ILP).
- **Inversion.** Swap input and output; replace direct regression with forward-model-plus-scoring
  (generate candidate explanations, score each against the observation).

### E. Ideality and trimming
Ideality = benefits / (costs + harms); inventions raise it, usually by making something free.
- **Trimming.** Delete a component and let an existing resource absorb its function. Any stage
  whose justification is "that is how the pipeline has always looked" is a candidate.
- **IFR-backwards design.** Start from "the answer computes itself" and add the minimum machinery
  that makes it true (the ideal aligner needs no alignment: find the representation where
  alignment is identity).

### F. Evolution lines
Systems evolve along predictable lines; find your method's position, and the next node is a
candidate invention.
- mono -> bi -> poly: single model -> ensemble -> structured committee or mixture with
  specialization.
- rigid -> segmented -> fluid: fixed architecture -> modular blocks -> fully learned structure
  (attention, hypernetworks).
- macro -> micro: whole-signal objective -> pointwise -> element-level with local credit.
- static -> feedback -> self-tuning: fixed hyperparameters -> validation-driven adaptation ->
  online self-correction.
- rhythm coordination: align the time-scales of data arrival, model update, and evaluation.

### G. Cross-domain transplant
- State the problem as a type signature with no domain nouns ("monotone alignment between two
  noisy 1-D sequences with a global smoothness budget").
- Ask which fields own that signature: sequence alignment in computational biology, decoding in
  speech and HMMs, seam carving in vision, assignment and flows in operations research,
  minimum-action paths in physics, state-space filtering in econometrics.
- Transplant the foreign field's decomposition (its state space, its recursion, its slack
  variables); the vocabulary itself carries nothing.

## Heavy sessions: the invention council (empirically grounded)

For a full invention session over a stalled campaign, run the companion workflow. The pipeline:
PROSPECTORS search outside the campaign (recent methods, the domain's own practice and its instrument
flaws), CHARACTERIZERS describe the existing system (component atlas, consensus map, apparatus spec,
unasked questions), SCOUTS measure fresh facts from the real data (and verify the problem statement's
load-bearing numbers), REPLICATORS rebuild the documented external methods you name, BREAKERS attack
the certificates you name, ASSEMBLERS (off by default) compose every confirmed structure into candidate
model classes (each carries a generative story, an oracle spec, and a nursery plan; its test IS its
oracle build, never a first legal build), seven family agents generate candidates that must each state
a DEPLOYMENT-computable load-bearing premise with a threshold, the RANK phase checks the pool against
the tried levers with one agent and orders it by a scripted formula over test cost and evaluation-set
spend (no survival forecast), ENABLE engineers measure the decisive premise with real code on real
data for the top K and for the free lane and try to supply the missing condition, the chairman writes
the brief from empirical survivors (with a NURSERY PLAN section for every surviving assembled class),
and a scribe appends the run record and its cost table to a persistent ledger the next run reads.

Args (same in every host; the script documents each one at the top):

```
problem, currentBest, plateauEvidence, resources, triedLevers,
dataAccess, replicationTargets, certificates, frontier, replicateMinutes,
prospect, characterize, scouts, assemble, perFamily, falsifyTopK,
freeLaneMinutes, freeLaneMax, judgeModel, judgeEffort, ledgerPath
```

`frontier: {external, ours, largestLever, reference}` is the frontier gate of the two-track section: when it
trips, the script runs a two-track run: replication targets are required and every generator works under the
beyond-the-frontier directive. Pass it on every call.

**Workflow host.** Both workflow files are host-specific JavaScript for the Claude Code Workflow tool:

```
Workflow({ scriptPath: "~/.claude/skills/researcher/invention-council-workflow.js",
           args: { ... } })
```

The path is wherever the skill is installed. A host with a different workflow language needs its own
port of the script; the argument list above stays the same.

**Native-agent host (no Workflow tool):** use the native council adapter in
[AUTORESEARCH.md](AUTORESEARCH.md). Report the selected host and any reduced phase coverage.
The JS file needs its workflow host; invoking it with plain Node does not supply that host.

When the local machine is too weak for the work, `dataAccess` names the remote compute host's
interpreter and scratch directory only, never a local environment.

**Always pass `dataAccess` when the data is reachable.** It is what turns the council from an idea
generator into an experiment machine: without it the Scout and Enable phases are skipped and the
brief is opinions; with it every selected candidate arrives at the brief with its premise already
MEASURED. The verdict vocabulary is deliberately enablement-shaped: `WORKS_AS_STATED`,
`WORKS_UNDER_CONDITION` (you supplied one named condition and it then passed), `CONDITION_IDENTIFIED`
(quantified what is missing and priced the cheapest way to supply it), `INSTRUMENT_REQUIRED` (the
latent has headroom at its oracle but no deployable instrument reads it accurately enough yet),
`BLOCKED_BY_ARITHMETIC` (even the oracle cannot clear the bar; show the arithmetic) and
`NOT_MEASURED`. **Only `BLOCKED_BY_ARITHMETIC` closes anything and only it feeds the next run's
`triedLevers`**; everything else carries a missing condition and a price, which is the next run's
starting point rather than its blacklist. A miss reported without a missing condition is an
unfinished job, not a result.

**Replicate before inventing.** When a documented external method reportedly beats the current best
(a competitor's writeup, a paper, a public kernel), pass `replicationTargets:
[{name, recipe, expected, gate}]` — each gets a heavy replicator agent that builds the recipe
faithfully on the real data and returns REPLICATED_GREEN / REPLICATED_WEAK / NOT_REPRODUCED /
BLOCKED with full gate numbers and the highest-value untested knob. A frontier existence proof
outranks any impossibility certificate built from your own channels; replication is how the council
resolves that tension. `perFamily: 0` gives a replicate-only run.

**Know which organ actually produces wins.** The record behind this workflow is lopsided and you should
allocate accordingly:

| engine | attempts | shipped components | hit rate |
|---|---|---|---|
| 7-family generators | 112 candidates | 1 (and only as a wrapper around a scout fact) | ~1% |
| REPLICATE phase | 6 targets | 2 | 33% |
| SCOUT audit of the deployed artifact's own decisions | ~20 scouts | 1 | high |

So: **audit and replicate first, generate last.** The generator phase is a good contradiction
sharpener and a poor lever finder. Both shipped legs came from building someone else's documented
method or from noticing that our own pipeline was discarding good information.

**Attack your own certificates (`certificates`).** Pass `certificates: [{claim, evidence,
frontierContradiction}]` whenever an external party demonstrably achieved what one of your closure
claims forbids. Each gets a breaker agent that attacks, in order, the PROXY the certificate measured,
its AGGREGATION LEVEL, its IMPLEMENTATION, and its POPULATION, returning CERTIFICATE_BROKEN /
CERTIFICATE_HOLDS / CERTIFICATE_NARROWED / INCONCLUSIVE plus the reopened lever. This phase exists
because the single largest win in this workflow's history was the discovery that a "family closed"
verdict rested on a build missing two documented knobs. A certificate measured from your own channels
is evidence about your channels, not about the problem. CERTIFICATE_NARROWED — true, but only in a
scope it never stated — is the most common and most useful outcome.

Knobs: `perFamily` (default 3; 0 = replicate-only), `scouts` (0 to 7, default 5; the first N angles
run in this order: angle 1 is the DEPLOYED-DECISION AUDIT and should always run, then verify-numbers /
residual-structure / population-facts / the-tail / invariants / cheap-oracles / noise-floor; the
script caps `scouts` at 7, so the eighth angle, noise-floor, does not run under the present cap),
`prospect` (0 to 2 outside-search agents, default 2), `characterize` (0 to 3 describers, default 2),
`assemble` (0 to 3 assemblers; 0 disables and is the script's default; an assembled class competes
for an Enable slot like any other candidate, with no guaranteed slot, and its engineer builds the
ORACLE, never the legal method), `falsifyTopK` (default 3, the number of candidates the Enable phase
takes from the ranked list, allocated across DISTINCT mechanism axes rather than to near-duplicates
of one), `freeLaneMinutes` and `freeLaneMax` (defaults 30 and 2: up to that many zero-query tests of
at most that many minutes run ahead of the ranked list and outside K).
Pass `assemble: 0` explicitly for audit mode and `assemble: 1` or more only for architecture mode.
`ledgerPath` (default `~/.claude/skills/researcher/LEDGER.md`, the calibration ledger; pass it when
the skill is installed anywhere else; the verification-budget log `query_budget.md` is kept in the
same directory). Cost control: `judgeModel`/`judgeEffort` downgrade only the duplicate-check agent,
the budget agent and the scribe; scouts, generators, engineers and the chairman inherit the session
model, since invention quality and code quality live there.

`triedLevers` is the list of approaches already attempted, each with its outcome. It is what stops
the council from re-proposing known nulls; feed it every dead end the campaign has logged. The
result object contains `brief`, the full `ranked` pool with per-candidate `total`, `testMinutes` and
`evaluationQueries`, `falsified` (the Enable verdicts with measured numbers, missing condition and
cheapest supply; the name is kept from the phase's earlier name), `replicated`, `assembled`, and
`survivors` (ids whose premise measured true, as stated or under a supplied condition).

**Enable engineers open with a ceiling test and close with honesty rules**, both retrofitted from
rounds that wasted effort. Step 0 plants the ORACLE version of the candidate's channel and scores it;
`BLOCKED_BY_ARITHMETIC` ends the pass in twenty lines when even perfect knowledge cannot clear the bar.
Then no verdict counts unless every tuned parameter was fitted out-of-fold, any screened menu of
variants was re-tested with the choice itself made out-of-fold, any effect near the bar survived a
re-drawn CV partition, and a control that deletes the candidate's own idea while holding its exposure
fixed came out worse. Each of those four has independently overturned a "win". Three later rules
are in the engineer's brief as well: price your own selection budget (menu size and the
optimism-corrected effect), search the artifact store and the findings record before quoting a build
cost, and group artifacts by what they share when the claim is about diversity.

**When a 0-survivor brief names its own decisive measurement, run that measurement before accepting
the stop.** It is the highest-value action available at that moment — higher than any candidate the
run ranked. In one round a fifteen-second script over four re-seeded partitions converted an
ambiguous "possibly below the metric's resolution floor" suspension into a certificate-grade closure,
and it did so by separating the two noise axes (partition re-draw moves fitted parameters; unit
bootstrap moves which units are scored) and calibrating both against a channel that had already
shipped and held up downstream. Report both axes; a plateau claim that conflates them cannot be
falsified.

**A crashed Generate/Enable phase is not a 0-survivor brief.** Record it SUSPENDED. The ranked pool
that existed before the crash, and every candidate the chairman still named, must be written into
the campaign backlog as numbered items with their named first measurement. Measured in one run:
Generate died on a usage limit, `survivors: []` was an artifact of the crash, and six ranked
candidates sat unmeasured for six days.

**After every council return, the host session writes the backlog.** Every `WORKS_*` /
`CONDITION_IDENTIFIED` survivor, and every ranked-but-untested candidate, becomes a numbered
backlog row with its one-variable first test. A brief that is not exported is a brief that will
not be run.
