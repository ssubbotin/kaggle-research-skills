# Joint invention and autonomous experimentation

Read this for a joint researcher and autoresearch run. When the invention-council workflow
exists, the combined-run section below is the path. Preserve the council's scientific tests and
project-specific constraints. A trial's operational outcome and a mechanism's scientific verdict
are separate fields.

## Source and adaptation

Source: [karpathy/autoresearch](https://github.com/karpathy/autoresearch), specifically
[README](https://github.com/karpathy/autoresearch/blob/master/README.md) and
[program.md](https://github.com/karpathy/autoresearch/blob/master/program.md) (accessed September 2026).
Its small editable training surface, fixed training allowance, protected evaluation, baseline run,
trial history, and keep/discard/crash cycle supply the execution pattern. Its five-minute GPT
benchmark and unrestricted continuation are specific to that setup.

Here the council supplies mechanism choices and missing-condition repairs. The loop supplies
reproducible attempts and resumable state. Project validation rules determine promotion.

## What is taken from the repository

Taken from `program.md` and adapted to a metric that is not a five-minute language-model loss:

- One editable surface per trial. The evaluator, data, labels, splits, and the deployed baseline stay frozen.
- The first recorded row is an unchanged baseline under that frozen evaluator.
- One change per trial. Keep, discard, or crash is an operational field in `results.tsv`. Scientific closure stays on the skill's own verdicts.
- Decide from the registered metric lines. That rule is transaction step 4. Simplicity is transaction step 6.
- Finish the trials the contract already authorized without asking between them.

Left in the source repository, and not used here: the five-minute GPT budget, `val_bpb`, an untracked results file on a dedicated git branch, and an unbounded overnight loop. A short screen does not estimate a trained chain, the shared tree is often dirty, and repeated selection on one ruler is already expensive. The contract states fidelity and the batch cap. A dirty tree uses a run directory and an incumbent pointer. Rollback never resets shared history.

## Fresh intake before every run

Before the workflow is launched, write a run-owned intake note from live sources dated that day:

- Competition discussions, with topic id, author, date, and whether the claim is a single model or a blend. A blocked listing is recorded with the endpoint that failed and the topic ids that could still be opened.
- Public kernels and weight repositories. A score in a title is not a recipe. Separate a single model from a blend.
- Papers on the measurement itself: the instrument, the reporting practice, and the physics of the data, not only the leaderboard.

The workflows repeat this: the research loop brings the intake note up to date in its Gauge phase, where every fact needs a URL or a command, and the invention council searches outside sources again in its Prospect phase, where a finding without a real source is refused. Stale campaign notes do not satisfy the intake.

## What a result is

A result is a new measured number with its sample size and its null. A screen that repeats a known null is not a new result. The surrounding-world slot (the one reserved slot of the batch described in the next section) measures an unexpected association. When that association clears its own null, record status KEEP and evidence_level FINDING. A FINDING does not change the deployed model and does not spend a submission. The registered credit bar on the metric remains the gate for a model claim.

## Where the other workflows entered

Read alongside Karpathy's `program.md`:

- Robin (Nature, 2026, s41586-026-10652-y): literature agents, then an experiment, then an updated hypothesis.
- Co-Scientist (Nature, 2026, s41586-026-10644-y): generate, debate, evolve, with a proximity pass so the pool stays diverse.
- Sakana's AI Scientist: a tree of experiments rather than one chain.

Taken from those: the intake, the rule that a measured association updates the next hypothesis, and one reserved slot so the judge cannot spend the whole batch on near-duplicate screens. Left out: writing papers, wet-lab loops, and an unbounded experiment tree.

## What the result-producing agents do

Survey of systems with measured Kaggle-style gains. Numbers are the authors' own.

- AIBuildAI-2 (arXiv 2605.27873, 70.7% MLE-bench medals): parallel solution repositories, short
  trainings cull weak configs, promising ones extend to full training.
- MLEvolve (arXiv 2606.06473): graph of trained nodes with memory; removing the graph or the memory
  costs 81.8% to 68.2%; cross-branch merge fires on stagnation.
- MARS (arXiv 2602.02660): cost-aware reward score x (runtime/limit)^-0.07; lessons are code diffs
  against the incumbent, transferring across branches 63% of the time.
- AIRA-dojo (arXiv 2507.02554): the edit operators, not the search policy, are the bottleneck;
  validation-based selection loses 9 to 13 points of medal rate on long searches.
- DeepMind ERA (Nature, s41586-026-10658-6): injecting published methods beats no advice;
  44% of recombinations of two good programs beat both parents.
- Si, Hashimoto, Yang (arXiv 2506.20803): LLM ideas lose significantly more than human ideas once
  executed. Pre-execution scores are weak evidence.
- ReX-MLE (arXiv 2512.17838): generic agent loops fail on medical imaging without a working
  training pipeline supplied by the domain team.

What was taken: a trained arm is the unit of a run, `ARCHIVE.tsv` keeps the trained nodes, and
arms screen on two folds before promotion. What was NOT taken:
replication as the engine. The engine is invention by decomposition, below.

## Human research methods the research loop runs

The phases named in the middle column are those of `research-loop-workflow.js`.

| method | operational use in the loop | source |
|---|---|---|
| Karpathy, "become one with the data" | Immerse: residual anatomy, error tagging before any idea | karpathy.github.io/2019/04/25/recipe |
| Karpathy autoresearch | one editable surface, fixed budget, keep/discard, never stop inside the budget | github.com/karpathy/autoresearch |
| TRIZ function analysis, 9 windows, CECA, IFR, trimming, su-field, evolution trends | Decompose and Tracks | Abramov CECA vs RCA; matriz.org |
| Ng ceiling analysis | headroom per part by oracle replacement | cs229.stanford.edu/materials/ML-advice.pdf |
| Tukey EDA, Kuhn anomalies | stratified residuals; anomalies ranked by size | |
| Chamberlin, multiple working hypotheses | at least three competing explanations per part, each with a signature | Science 148:754 |
| Platt, strong inference | each arm is a crucial experiment that separates hypotheses | Science 146:347 |
| Mill's methods | paired flag flips (difference), dose sweeps (concomitant variation) | |
| Fermi estimation | upper bound per card before building | |
| Heilmeier catechism | pre-registration template | darpa.mil/about/heilmeier-catechism |
| Goldratt, Hamming, Alon | order effort by headroom, keep the important-problems list, budget for the cloud | |
| Uzzi 2013, Wu 2019 | conventional core plus one atypical import; small disruptive track, older ideas | Science 342:468; Nature 566:378 |

Evidence caveats from the survey: strong inference speeds discrimination but is not shown to cause
breakthroughs; ceiling analysis says where to invent, not what. Breakthroughs come mostly from
anomalies, reframing and distant combination, which is why every part track carries one atypical
card and the Immerse phase ranks anomalies.

## Combined run when the invention-council workflow exists

This is the combined agent.

1. Write the intake note, then a new run-owned `program.md`. An exhausted batch is not extended. The mechanism queue may be filled by the Rank phase; do not invent that queue before intake and the scouts measure.
2. Compute the frontier gate (SKILL.md, rule 1 of the two-track section) and launch the invention-council workflow: two-track mode when the gate trips, otherwise audit mode unless SKILL.md's frame-gap test calls for architecture mode. Put the program path in `resources`. `dataAccess` names the designated compute host, how to reach it, and its resource caps; heavy work never runs anywhere else.
3. Scouts and generators measure and propose. They stay outside the trial budget: no bulk data caches, no archive extraction, no training.
4. Each Enable worker is one trial under the transaction below. The prompt carries its trial index and an exclusive directory. Parallel workers do not share a results file, a checkout, or a GPU. The host merges the rows after the workflow returns.
5. Stop at the brief. The host writes the backlog, the ledger line, and the query spend. A crashed Enable phase is SUSPENDED.

## Write the contract before launching

Create a run-owned `program.md` containing:

- Objective, metric direction, baseline artifact and code identity, and the latest dated evidence.
- Permitted editable paths; frozen evaluator, data, labels, splits, and baseline paths with hashes.
- Exact commands, compute host, interpreter, concurrency, memory allowance, and artifact directory.
- Comparable trial fidelity: hardware, folds, data exposure, initialization, and training budget.
  Name whether time or training steps are held fixed. Record startup, training, and evaluation
  separately. A short screen cannot estimate the final trained model's gain.
- Candidate queue with mechanism, one changed variable, discriminating control, expected effect,
  acceptance threshold, and named repair. Original classes also need their oracle and oracle gap.
- Total run allowance, per-trial timeout, maximum trials including repairs, and evaluation-query
  allowance. If unspecified, state a conservative first batch: up to three trials, one repair per
  candidate within that count, at most 30 minutes total compute. Price a complete test before using
  that default; an unaffordable test remains queued with its cost, never silently reduced in fidelity.
- Development and confirmation populations, prior selection exposure, promotion gate, stopping
  conditions, and resume action. A reused holdout remains development evidence. If no independent
  confirmation is available, record SCREEN_ONLY and the missing confirmation instrument.

Existing user authorization permits this setup and the bounded batch. Publishing, spending a scarce
submission, external messaging, or enlarging an explicit budget still requires the applicable
authorization. Do not ask for permission between already authorized trials.

## Native council adapter

Use this only when the invention-council workflow cannot be launched. When that workflow is available, the combined-run section above is the run.

When native agents exist and the workflow does not, explicitly launch this adapter:

1. Give independent scouts the contract and project evidence. Divide deployed-decision audit and
   certificate/resource audit into bounded tasks. Each returns measured facts or NOT_MEASURED,
   plus candidate mechanisms. Preserve external-source provenance when a prospect phase is used.
2. Synthesize a ranked queue against the kill list. In a compact audit, apply the armory families
   to measured facts without pretending seven separate generator agents ran. Record omitted phases.
   Architecture mode still requires assembly and an oracle before a legal build.
3. Assign the selected premise measurement to an engineer and its interpretation to an independent
   reviewer. The reviewer checks train/validation ancestry, controls, resolution, and query exposure.
   With limited agent slots, sequence phases. Give each worker exclusive output paths; serialize GPU
   ownership and any shared mutation. Every delegate receives the compute restrictions.
4. The host writes the brief, ranked-but-unmeasured backlog, results, and ledger entry. Report actual
   phase coverage and failures. Missing agents or interrupted phases yield SUSPENDED, never zero
   survivors by inference. If neither host exists, save the contract and report execution unavailable.

## Transaction for each trial

1. Establish a measured unchanged baseline under the contract. Re-score existing complete predictions
   when that is the intended screen; record provenance and do not describe re-scoring as retraining.
2. Snapshot the trial's code/config identity and parent incumbent. Use a separate directory, branch,
   or worktree. Preserve a dirty working tree. Rollback changes only the run's incumbent pointer;
   never reset shared history or remove another worker's files.
3. Run one queued variable with its control. Write a unique log and PID. Bound the entire command,
   retain exit status, and poll the exact owned PID. Count failed attempts against the trial budget.
4. Check evaluator/input hashes, successful exit, complete row identities, shapes, finite scores,
   fold coverage, and checkpoint presence when training. Publish a completion marker only after
   these checks. A timeout, hash mismatch, crash, or partial output cannot become a scored candidate.
   Decide from the registered metric lines in the trial log. After a crash, classify from the last
   50 lines of that log. Leave the rest of the log on disk.
5. Append `results.tsv`: trial_id, parent, code_hash, config_hash, evaluator_hash, data_split_id,
   mechanism, variable, seed, fidelity, metric, guard_metrics, elapsed_s, peak_memory,
   query_count, status, evidence_level, artifact_path, missing_condition. Use NA for unavailable
   quantities and crashes. Preserve failed logs and code for reproduction.
6. Status is BASELINE, KEEP, DISCARD, CRASH, or INVALID. KEEP advances the experimental incumbent
   only after the registered gate passes. A pre-registered association that clears its own null is
   recorded as KEEP with evidence_level FINDING: it is a result, and it does not change the deployed
   model. SCREEN_ONLY never changes the deployed model. Inside the
   pre-registered noise band, the shorter build is the experimental incumbent, including a deletion
   that stays inside the band. A gain below the credit bar does not pay for a larger editable
   surface. Near-threshold choices consume the pre-allocated independent confirmation, including
   selection itself.
7. For a failure, classify bug, assumption, resource, or mechanism. Use the named repair within the
   remaining allowance, or continue to the next candidate. DISCARD rejects this build; scientific
   closure still needs the skill's oracle/parity evidence. Never manufacture a numeric crash score.

## End and resume

Finish the finite batch without asking whether to continue each trial. At its boundary, record
COMPLETED_BATCH and the best supported evidence; an unfinished mechanism is SUSPENDED with its
next condition and cost. Stop earlier on user interruption, exhausted query budget, unavailable
compute, invalid evaluator, or repeated operational failures. Preserve owned live-job PIDs and
check their state before resuming. The next session reads the contract and ledger, verifies hashes,
and resumes from completed trial IDs. Record provisional gains separately from confirmed gains.
