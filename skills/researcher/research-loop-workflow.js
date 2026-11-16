export const meta = {
  name: 'research-loop',
  description: 'Research loop (frontier gate, two tracks, the unknown first): gauge the frontier and name the binding gap, audit our own unbuilt and wounded mechanisms, calibrate predictions against the loop record, invent per part with lever classes, gate arms in code on calibrated effect size, preflight each mechanism on CPU, queue trained arms (launch) or judge with kill discipline (judge)',
  whenToUse: 'A campaign needs trained results. Run mode "launch" to find the binding gap, invent and build arms that can resolve against the bar, and queue them on the compute host; mode "judge" after the queue finishes.',
  phases: [
    { title: 'Gauge', detail: 'frontier table in the same frame, frame census of the top of the board, and the BINDING GAP: frame, model, member/combiner, or variance' },
    { title: 'Audit', detail: 'what we wrote down and never built, families closed on a first build, and the calibration of past predictions against realized deltas per lever class' },
    { title: 'Immerse', detail: 'residual anatomy of the incumbent, error tags, anomalies ranked by size' },
    { title: 'Decompose', detail: 'TRIZ function model, 9 windows, ceiling analysis, each part tagged with its lever class and its measured transfer to the shipped model' },
    { title: 'Tracks', detail: 'one invention track per part; every card carries a lever class, a centre and upper, a checkable signature and its preflight' },
    { title: 'Gate', detail: 'deterministic: calibrated centre against the bar, date phase, binding-gap portfolio; then the composer forms solo arms, stacks only of individually evidenced cards' },
    { title: 'Build', detail: 'one engineer per arm: flags with unconditional params, oracle first for original methods, parity checklist for external ones, CPU preflight of loss share, target triviality and signature direction' },
    { title: 'Queue', detail: 'serial queue on the compute host behind any running queue, free-GPU-memory guard, detached; verified in a separate call' },
    { title: 'Collect', detail: 'judge mode: read every finished arm with its pre-registered read' },
    { title: 'Verify', detail: 'judge mode: adversarial check of every arm that cleared its screen bar' },
    { title: 'Recompose', detail: 'judge mode: kill discipline (WOUNDED vs CLOSED), calibration rows, frontier and standing questions, review of queued items against the gate, rung 2 for survivors' },
  ],
}

// ---------------------------------------------------------------------------------------------
// Arguments (all optional; read from `args`).
// args.mode            : 'launch' (default) or 'judge'. Launch gauges, audits, invents, gates, builds and queues
//                        trained arms; judge reads the finished queue. Pass the same args to both.
// args.today           : string   - today's date, YYYY-MM-DD. Unset, the date phase is BUILD.
// args.deadline        : string   - the campaign deadline, YYYY-MM-DD. Unset, the date phase is BUILD.
// args.selectionDays   : number   - days before the deadline when only VARIANCE, COMBINER and HYGIENE cards are
//                        admitted (default 14).
// args.runDir          : string   - run directory in the project, on the machine that hosts the session.
// args.remoteDir       : string   - run directory on the compute host. Sibling run directories beside it are
//                        treated as other research queues.
// args.compute         : string   - HOW agents reach compute: the host and how to run a command on it (for a
//                        remote host, the ssh alias), the interpreter, and the resource caps every job must keep
//                        (processes, memory, threads, GPU memory left for other users). Default: the local machine.
// args.gpuLock         : string   - lock file on the compute host shared by every GPU step.
// args.postmortems     : string[] - paths of the caller's own campaign postmortems (default: none). The gauge,
//                        the auditor and the recomposer read them before they write.
// args.context         : string   - campaign context handed to every agent: the task, the metric, the rulers
//                        (reference, gold, second ruler; see the hard rules), the trainer and where it lives.
// args.intakePath      : string   - the fresh intake note (default <runDir>/intake.md).
// args.frontierPath, args.framesPath, args.archivePath, args.partsPath, args.calibrationPath :
//                        string   - the campaign's persistent tables (frontier, frame census, trained-arm
//                        archive, part table, prediction calibration). Defaults, relative to the project:
//                        FRONTIER.md, docs/FRAMES.md, docs/autoresearch/ARCHIVE.tsv, docs/autoresearch/PARTS.md,
//                        docs/autoresearch/CALIBRATION.tsv. The agents create a table that does not exist yet.
//                        The prompts also name three campaign records by fixed name in the project root:
//                        FINDINGS.md (measured results), BACKLOG.md (the queue of work) and HANDOFF.md (the live
//                        state). If the campaign keeps them elsewhere or under other names, say so in args.context.
// args.ledgerPath      : string   - the skill's lesson ledger (default ~/.claude/skills/researcher/LEDGER.md).
//                        Judge mode appends the run record to it; launch mode does not read it (launch calibrates
//                        from the calibration table above).
// args.arms            : number   - trained arms per batch at most (default 3).
// args.minArms         : number   - fewer queued arms than this makes the run INVALID (default 1).
// args.gpuHours        : number   - GPU-hours for the batch, diagnostics included (default 9).
// args.screenBar       : number   - the smallest reference delta that counts as a screen pass, in metric units.
//                        Set it to the campaign's measured reseed band (default 0.0036).
// args.screenFolds     : string   - folds of the screen (default '1,2').
// args.diagnostics     : number   - sub-bar arms allowed when each names the decision it changes (default 1).
// args.lossShareCap    : number   - a new loss term above this share of the step-0 gradient norm fails the
//                        preflight (default 0.3).
// args.perPartBinding  : number   - cards for a part that owns a class attacking the binding gap (default 4).
// args.perPartOther    : number   - cards for any other part (default 1).
// args.waitHours       : number   - how long a queued arm waits for free GPU memory (default 16).
//
// Design rationale. Each rule answers a measured failure.
// - A loop that bans training returns metadata findings only. The unit of a run is a trained arm.
// - Arms whose predicted centres sit below the screen bar forecast their own nulls. One recorded
//   batch: five trained arms, about 15 GPU-hours, zero screen passes, three harms; every
//   pre-registration predicted a centre of +0.0001..+0.0012 against a 0.0036 bar. The gate is
//   therefore deterministic code over calibrated numbers: the composer can order and combine, it
//   cannot argue a sub-bar arm past the bar.
// - Stacking sub-bar cards from different parts: two stacks, two harms. Arms are solo by default.
// - The largest harm (-0.0129) was a mechanical loss-construction defect visible in the smoke (the
//   new term was half the loss at step 0 and 51-75 % of its targets were 0.5). The build preflights
//   loss share, target triviality and the mechanism's signature before any GPU arm.
// - Almost every arm changed the distilled STUDENT, whose measured weight on anything but its
//   teacher was 0.005-0.013 (retained fraction -0.05x); the one arm that changed the teacher was
//   the only one with a signal outside noise. Every card carries a lever class and its measured
//   transfer to the shipped model.
// - A campaign can optimise "is this increment safe" when the deciding question is "is our model
//   class the right one". The run starts by naming the BINDING GAP from the frontier table, and
//   the batch must attack it (portfolio rule, enforced in code).
// - "Built the winning representation and walked away" and "right measurement, wrong verdict": the
//   Audit phase lists mechanisms we named and never built and families closed on a first build
//   without parity, oracle and missing condition; these compete as cards.
// - The combiner and seeds x folds are first-class levers: VARIANCE and COMBINER are lever classes
//   with their own measured base rates, admitted by the same gate.
// - Throughput: the unit is a trained arm; the ledger tracks train against verify hours.
// - Selection discipline stays: pre-registration, independent rulers, adversarial verify.
// ---------------------------------------------------------------------------------------------

const A = args || {}
const MODE = A.mode || 'launch'
const TODAY = A.today || 'UNSET-DATE'
const DEADLINE = A.deadline || 'UNSET-DEADLINE'
const SELECT_DAYS = A.selectionDays || 14
const RUN = A.runDir || 'docs/autoresearch/UNSET'
const REMOTE = A.remoteDir || '~/research-loop/rl_UNSET'
const ARMS = A.arms || 3
const MIN_ARMS = A.minArms || 1
const GPU_H = A.gpuHours || 9
const BAR = A.screenBar || 0.0036
const DIAG = A.diagnostics === undefined ? 1 : A.diagnostics
const SHARE_CAP = A.lossShareCap || 0.3
const CTX = A.context || ''
const ARCHIVE = A.archivePath || 'docs/autoresearch/ARCHIVE.tsv'
const PARTS = A.partsPath || 'docs/autoresearch/PARTS.md'
const CALIB = A.calibrationPath || 'docs/autoresearch/CALIBRATION.tsv'
const FRONTIER = A.frontierPath || 'FRONTIER.md'
const FRAMES = A.framesPath || 'docs/FRAMES.md'
const LEDGER = A.ledgerPath || '~/.claude/skills/researcher/LEDGER.md'
const INTAKE = A.intakePath || (RUN + '/intake.md')
const LOCK = A.gpuLock || '~/research-loop/gpu.lock'
const COMPUTE = A.compute || 'the local machine (no compute host was named; the caller states the host, the interpreter and the resource caps in args.compute)'
const POSTMORTEMS = Array.isArray(A.postmortems) ? A.postmortems : []
const PM = POSTMORTEMS.length ? POSTMORTEMS.join(', ') : 'none listed'

const CLASSES = ['FRAME', 'TARGET', 'TEACHER', 'MEMBER', 'VARIANCE', 'COMBINER', 'STUDENT', 'HYGIENE']
// Fallback transfer factors when the calibration has fewer than 3 measured arms in a class.
// STUDENT is low because a distilled student's measured weight on anything but its teacher was 0.005-0.013.
const DEFAULT_FACTOR = { STUDENT: 0.3, TARGET: 0.4, FRAME: 0.6, TEACHER: 0.6, MEMBER: 0.6, VARIANCE: 0.8, COMBINER: 0.6, HYGIENE: 0.8 }

const t0 = new Date(TODAY + 'T00:00:00Z').getTime()
const t1 = new Date(DEADLINE + 'T00:00:00Z').getTime()
const DAYS_LEFT = (isFinite(t0) && isFinite(t1)) ? Math.round((t1 - t0) / 86400000) : 999
const PHASE = DAYS_LEFT <= SELECT_DAYS ? 'SELECTION' : 'BUILD'
// In the last two weeks no new frame, member or teacher can finish a five-fold build and a refit.
const PHASE_CLASSES = PHASE === 'SELECTION' ? ['VARIANCE', 'COMBINER', 'HYGIENE'] : CLASSES

const RULES = `
HARD RULES (all agents):
- Compute: ${COMPUTE}. Everything heavy (training, inference, bulk data processing, builds, dependency installs) runs on that designated compute host, inside the resource caps stated there. When the compute host is remote, the machine that hosts this session only edits text, runs short commands and transfers files.
- Launch idiom for every long job, all four parts: cd DIR && setsid nohup bash job.sh > job.log 2>&1 < /dev/null & (for a remote compute host the whole line goes inside one ssh command: ssh <compute-host> '...'). A launch command ends at the & and, over ssh, is wrapped in a local \`timeout 30\` (an ssh client can hang after a clean detached launch; exit 124 there is expected). Verify in a SEPARATE call. Wait with short foreground calls that sleep on the compute host (ssh <compute-host> 'sleep N'); never a local background loop.
- Never stop, disable, kill or touch a service or a process you did not start, whoever owns it and whatever memory it holds. If GPU memory is short, the arm WAITS (queue guard) or records CRASH on OOM. Never reclaim memory.
- When the trainer needs the GPU and GPU memory is short, smoke on the CPU path and leave the GPU smoke to the queue; never block a build on GPU memory.
- Inspection on the compute host is CPU-only and bounded (RSS under 4 GiB, BLAS threads 2, memory-map large array caches, no archive extraction).
- Never reset shared git history; never edit files another worker owns. Write only inside ${RUN}/ (the project, on the machine that hosts this session) and ${REMOTE}/ (the compute host) unless your stage names another file.
- Process ownership: record the PID (or setsid session id) of every process you launch in a file inside your own directory,
  and signal ONLY those PIDs. Never pgrep, pkill or kill by a name or pattern: other workers run the same scripts (in one
  run an engineer killed another's smoke by matching "bash smoke.sh"). If a process you do not own is in your way, stop and report.
- Never message another agent to coordinate; write a note file in your own directory and report through your return value.
- Never submit to a leaderboard or to any other scarce scored instrument. Never spend a board slot.
- Rulers: REFERENCE is the campaign's primary ruler (the registered metric on its main label table). GOLD is a small high-trust labelled subset. The SECOND RULER is an independent label source for the same rows. The campaign context names the three; a ruler the campaign does not have is recorded as NA and named as missing in the pre-registration, never read as agreement.
- A measured number carries its n and its null. Pre-execution judgment only ORDERS work; the gate in code decides admission.
- A first-build score is a fact about the build. A family closes only with build parity against the original's named knobs, an oracle for original methods, and a named missing condition; otherwise it is WOUNDED and its repair is a card.
- Budget: at least 3 training GPU-hours per verification GPU-hour while the board gap is open.
- Frontier gate and two tracks (SKILL.md). No ceiling, end-point estimate or "not reachable" may be stated for our line below the best REPRODUCIBLE external score: name the next rung of the external artefact and its gate instead. The purpose of the loop is research of the unknown; the frontier is absorbed beside it, never instead of it. When the frontier gap exceeds twice the largest effect one of our own candidates realised in the last two weeks, the batch has TWO TRACKS. Frontier track: the rungs of the external artefact's own score history, one component per build, each with a one-sentence mechanism, CODE PARITY against the reference (its weights inside our code reproduce its stage output) before any score is read, then our own weights. Unknown track (at least half of the batch): cards that are absent from the frontier, bring new evidence or a new question (a re-weighting, threshold, gate or fusion of evidence we already have is tuning and inadmissible), aim where the reference itself is blind, and are built as additions that can be carried up the ladder. A low score before parity is a build defect; after parity it is a weights or data gap; neither is a verdict on the mechanism. Where no offline ruler has been validated against the real instrument, offline reads gate mechanics and parity only.
`

const CARD = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'short slug, e.g. P3-AUXLOSS' },
    part: { type: 'string', description: 'the part of the system this card changes (from the part table)' },
    leverClass: { type: 'string', enum: CLASSES, description: 'FRAME input/representation; TARGET label table; TEACHER distillation teacher or mix; MEMBER a new strong decorrelated model; VARIANCE seeds x folds, split patterns, TTA, checkpoint averaging; COMBINER learned weights, gate, posterior fusion; STUDENT head/loss/regulariser inside the distilled student; HYGIENE inference or data correctness' },
    title: { type: 'string' },
    contradiction: { type: 'string', description: 'the physical contradiction it resolves: X must be P and not-P, and the separation used' },
    mechanism: { type: 'string', description: 'one sentence: this works because ...' },
    hypotheses: { type: 'string', description: 'the competing explanations (>=3) and the signature each predicts: which labels move, which direction, which dose' },
    variable: { type: 'string', description: 'the ONE thing it changes relative to the incumbent' },
    implementation: { type: 'string', description: 'exact trainer argv/env change, or the code diff to a copy of the trainer; new params created unconditionally' },
    flag: { type: 'string', description: 'env var name that switches this card on (so any subset is a paired replicate)' },
    labelsMoved: { type: 'string', description: 'which labels (targets) should move and why' },
    fermiUpper: { type: 'number', description: 'Fermi upper bound on the macro reference delta at screen rows: effect x fraction affected x label weight' },
    centre: { type: 'number', description: 'predicted centre of the reference delta on the SHIPPED model at screen rows (after distillation if the card acts upstream of it)' },
    upper: { type: 'number', description: 'predicted upper end of the same interval' },
    expected: { type: 'string', description: 'predicted interval with its arithmetic, including the transfer to the shipped model' },
    signature: { type: 'string', description: "the mechanism's OWN measurable quantity and its intended direction, checkable in a few hundred steps (e.g. counter-pair margin rises, partner attention mass > 0.2, teacher rho falls)" },
    preflight: { type: 'string', description: 'what the CPU / micro-run check measures before any GPU arm: new loss-term share at step 0, fraction of uninformative targets, signature direction' },
    oracle: { type: 'string', description: 'ORIGINAL methods: the truth-peeking variant and its cost; else "external"' },
    parity: { type: 'string', description: "EXTERNAL methods: the original's named knobs and whether each is present in our build; else \"original\"" },
    singleCardEvidence: { type: 'string', description: 'archive node or FINDINGS line where THIS card alone was trained, with its sign; "none" if never trained alone' },
    costGpuH: { type: 'number', description: 'added screen cost in GPU-hours on the compute host when run alone' },
    atypical: { type: 'boolean', description: 'true if the idea is imported from a distant field or is a hunger/crazy idea' },
    source: { type: 'string', description: 'method: ceiling, CECA, IFR, trimming, evolution-trend, su-field, 9-windows, anomaly, distant-import, hunger, unbuilt-audit, wounded-repair, frame-census' },
    conflictsWith: { type: 'string', description: 'cards or parts it cannot be stacked with, and why' },
    evidence: { type: 'string', description: 'measured fact, FINDINGS line, archive node, URL, or anomaly id that motivates it' },
    killListCheck: { type: 'string', description: 'why this is not a re-run of a recorded null' },
    diagnostic: { type: 'string', description: 'if the card is worth running below the bar: the decision its outcome changes; else ""' },
  },
  required: ['id', 'part', 'leverClass', 'title', 'contradiction', 'mechanism', 'hypotheses', 'variable', 'implementation', 'labelsMoved', 'fermiUpper', 'centre', 'upper', 'expected', 'signature', 'preflight', 'singleCardEvidence', 'costGpuH', 'source', 'evidence', 'killListCheck'],
}
const CARDS = { type: 'object', properties: { contradiction: { type: 'string' }, ifr: { type: 'string' }, cards: { type: 'array', items: CARD } }, required: ['cards'] }

// =============================================================================================
if (MODE === 'launch') {
  log(`date phase ${PHASE}: ${DAYS_LEFT} days to ${DEADLINE}; admitted classes ${PHASE_CLASSES.join(',')}`)

  const [gauge, audit, immerse] = await parallel([
    () => agent(`${RULES}
You are the FRONTIER GAUGE for run ${RUN}, dated ${TODAY} (${DAYS_LEFT} days to the ${DEADLINE} deadline). ${CTX}
Read the postmortems the caller listed, if any (${PM}), first. The failure this phase exists to prevent is a campaign that
verified increments on a frame two units behind the frontier and never asked which gap was binding. Then bring ${FRONTIER},
${FRAMES} and ${INTAKE} up to date from LIVE sources:
- Board: for a Kaggle competition \`cd ~ && kaggle competitions leaderboard <slug> -s\` and the full board with -d (run the
  kaggle CLI from ~); for any other venue, its own public standings.
- Discussions: when a browser extension is connected, load the browser tools in ONE ToolSearch call
  (select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__find),
  call tabs_context_mcp first, open a NEW tab, list the discussion by recent activity, and read every topic touched since the
  last intake, with full comment threads (use the endpoint the project instructions name, if any). Never post, vote or follow.
  If the browser fails twice, or none is connected, fall back to the CLI and record it.
- Public kernels run recently (kaggle kernels list --sort-by dateRun), their scores, and public weights usable offline.
Produce:
1. FRONTIER TABLE: every number anyone states, as (CV, public, private, frame, single-or-ensemble, source), and OUR number in
   the same frame beside each. Our best single model and our best submission are separate rows.
2. FRAME CENSUS of the top of the board and of every public kernel above our score: the REPRESENTATION each uses (input tensor,
   its axes and views, resolution, label space, teacher or pseudo-labels, members and combiner), not the model name.
3. THE BINDING GAP, one of: FRAME_GAP (a published SINGLE model in a different frame beats ours by more than any lever our own
   audit can name; the batch must build that frame faithfully), MODEL_GAP (our single model is below the best claimed single
   model in the same frame), MEMBER_GAP (our single model is at the single-model frontier and the board gap is carried by
   ensembles of different families; the batch must build a strong decorrelated member, a teacher from one, or a combiner),
   VARIANCE_GAP (the gap is within what seeds x folds, split patterns and TTA buy in comparable pipelines). State the numbers
   that decide it, and which lever classes attack it.
4. THE FRONTIER GATE: G = best reproducible external score in our frame minus ours; L = the largest effect one of our
   own candidates realised on the deciding instrument in the last two weeks (from the archive). If G > 2 L, say so in
   bindingWhy, set bindingGap to FRAME_GAP or MODEL_GAP as fits, and write into frameToBuild THE LADDER: the external
   artefact's own ordered rungs (component, its score at that rung, one-sentence mechanism, where its code and weights are,
   what we already have), the next three rungs for us, and how the artefact can be run as a reference for parity.
5. REUSE LIST: every public weights dataset, label table, checkpoint and notebook that appeared since the last intake,
   and for each whether plugging it in (as a measurement or as a parity reference) closes part of the binding gap.
Every fact needs a URL or a command. Update the three files; keep their history.`, {
      label: 'gauge', phase: 'Gauge', schema: {
        type: 'object', properties: {
          boardLine: { type: 'string' },
          ourSingle: { type: 'string' }, bestClaimedSingle: { type: 'string' },
          frontierRows: { type: 'array', items: { type: 'string' } },
          frames: { type: 'array', items: { type: 'string' }, description: 'team or kernel: representation, single or ensemble, score' },
          bindingGap: { type: 'string', enum: ['FRAME_GAP', 'MODEL_GAP', 'MEMBER_GAP', 'VARIANCE_GAP'] },
          bindingClasses: { type: 'array', items: { type: 'string', enum: CLASSES } },
          bindingWhy: { type: 'string' },
          frameToBuild: { type: 'string', description: 'FRAME_GAP or a tripped frontier gate: the frame, its named knobs, its reported number, and THE LADDER (ordered rungs with scores and one-sentence mechanisms, the next three rungs for us, the parity reference)' },
          newSinceLast: { type: 'array', items: { type: 'string' } },
          externalAnomalies: { type: 'array', items: { type: 'string' } },
        }, required: ['boardLine', 'bindingGap', 'bindingClasses', 'bindingWhy'],
      },
    }),
    () => agent(`${RULES}
You are the AUDITOR for run ${RUN}. ${CTX}
Read the postmortems the caller listed, if any (${PM}), for two recurring misses: a winning mechanism that was built and then
abandoned, and a family closed on the right measurement with the wrong verdict. Then read the campaign's own records:
FINDINGS.md, BACKLOG.md, HANDOFF.md, ${ARCHIVE}, ${PARTS}, and every prereg.md and result.json under docs/autoresearch/*/arm_*/
(in the project) and the matching run dirs on the compute host.
1. UNBUILT: mechanisms the campaign itself named as "the route", "the named next direction", "the missing condition", "the
   reopening condition" or "what reaches X", and never trained. For each: the line, the date, why it was not built, its cost.
2. WOUNDED KILLS: every family recorded as closed or killed. Apply the three tests (build parity against the original's named
   knobs, an oracle for original methods, a named missing condition with evidence). List every closure that FAILS a test, with
   the missing knob or condition. A measured miss is a specification for the missing condition.
3. ABANDONED POSITIVES: any measured positive (any ruler, any frame) that was not carried to the shipped model, with the reason.
4. CALIBRATION: for every trained arm with a pre-registered prediction, join predicted centre and interval with the realized
   reference delta and SE. Classify each arm into one lever class of ${CLASSES.join(', ')}. Write or update ${CALIB} with
   columns run, arm, leverClass, predicted_centre, predicted_upper, realized, se, verdict, source. Per class return n,
   sum predicted, sum realized, the hit rate (realized inside the predicted interval) and the factor realized/predicted.
Every item with its source line.`, {
      label: 'audit', phase: 'Audit', schema: {
        type: 'object', properties: {
          unbuilt: { type: 'array', items: { type: 'string' } },
          wounded: { type: 'array', items: { type: 'string' } },
          abandonedPositives: { type: 'array', items: { type: 'string' } },
          calibration: { type: 'array', items: { type: 'object', properties: {
            leverClass: { type: 'string', enum: CLASSES }, n: { type: 'integer' },
            predictedSum: { type: 'number' }, realizedSum: { type: 'number' }, hitRate: { type: 'number' },
          }, required: ['leverClass', 'n', 'predictedSum', 'realizedSum'] } },
          calibrationPath: { type: 'string' },
        }, required: ['unbuilt', 'wounded', 'calibration'],
      },
    }),
    () => agent(`${RULES}
You are the DATA IMMERSION analyst (Karpathy recipe step 1, Tukey EDA, Kuhn anomaly hunting). ${CTX}
Work on the compute host, CPU only, from artifacts that already exist (the incumbent OOF, the row index, the label tables of
every ruler, the metadata tables, any side records that came with the data). Write ${RUN}/immerse/ (in the
project) and scripts under ${REMOTE}/immerse/ (on the compute host).
If a previous run's immersion exists under docs/autoresearch/*/immerse/, start from it and report only what changed or was
never measured.
1. Residual anatomy of the incumbent: the per-label metric on each ruler, then stratified by every provenance
   variable the metadata holds (data source, instrument, collection settings, which parts of the input are
   present, record count and size per unit) and by prevalence decile. n per stratum.
2. Error tagging: the 100 worst (unit, label) cells by reference rank error, tagged by cause from the data you can see.
3. How much of the incumbent is its teacher: rho and OLS weight of the student on the teacher, per label.
4. Ten ANOMALIES ranked by size: measured facts that contradict what the campaign believes (grep FINDINGS.md for the belief).
Record every number with n and a null. Do not spend a new model-metric query beyond reading existing OOFs.`, {
      label: 'immerse', phase: 'Immerse', schema: {
        type: 'object', properties: {
          reportPath: { type: 'string' },
          concentrations: { type: 'array', items: { type: 'string' } },
          errorTags: { type: 'array', items: { type: 'string' } },
          teacherShare: { type: 'string' },
          anomalies: { type: 'array', items: { type: 'string' } },
        }, required: ['concentrations', 'anomalies'],
      },
    }),
  ])
  if (!gauge || !audit) return { mode: 'launch', valid: false, verdict: 'INVALID_RUN: gauge or audit failed', gauge, audit }

  // Transfer factor per lever class: measured when the class has >= 3 predicted arms, else the default.
  const factor = {}
  for (const c of CLASSES) factor[c] = DEFAULT_FACTOR[c]
  for (const row of (audit.calibration || [])) {
    if (row && row.n >= 3 && row.predictedSum > 0) {
      factor[row.leverClass] = Math.min(1, Math.max(0.1, row.realizedSum / row.predictedSum))
    }
  }
  log(`binding gap ${gauge.bindingGap} -> ${(gauge.bindingClasses || []).join(',')}; factors ${CLASSES.map(c => c + '=' + factor[c].toFixed(2)).join(' ')}`)

  phase('Decompose')
  const decomp = await agent(`${RULES}
You are the SYSTEM ANALYST. Maintain the persistent part table at ${PARTS} (create or update; keep history) and the
trained-arm archive at ${ARCHIVE} (append any arm finished since last update; never rewrite a measured number). ${CTX}
Binding gap: ${gauge.bindingGap} (${gauge.bindingWhy}). Classes that attack it: ${(gauge.bindingClasses || []).join(', ')}.
Immersion: ${JSON.stringify(immerse || {})}
Audit: unbuilt ${JSON.stringify(audit.unbuilt || [])}; wounded ${JSON.stringify(audit.wounded || [])}; abandoned positives ${JSON.stringify(audit.abandonedPositives || [])}
1. FUNCTION MODEL (TRIZ): every component from raw input to submission, as "component VERB object", rated useful /
   insufficient / excessive / harmful, what it throws away, the assumption nobody chose, and its cost share.
2. SYSTEM OPERATOR: the 9 windows (sub-system: the smallest units of the input and of the label source; system: the pipeline;
   super-system: the instrument, the data source, the labeller, the test distribution) x (past: data collection and labelling;
   present: training; future: inference inside the deployment budget, and the hidden test split).
3. CEILING ANALYSIS (Ng) with TRANSFER: for each part, its headroom on the SHIPPED model, which is the oracle gain times the
   measured transfer from that part to the shipped student (e.g. a target-table change reaches the distilled student at the
   student's table weight, not at 1.0). Oracle numbers from FINDINGS where they exist, else a cheap CPU oracle, else a Fermi bound.
4. Group components into 5 to 7 PARTS, each tagged with its lever class(es) from ${CLASSES.join(', ')}. Every class that
   attacks the binding gap must own at least one part.
Return the incumbent identity and exact launch command, measured s/epoch and peak GiB, the kill list (tested variables with
their numbers, marking which kills the audit found WOUNDED), and the parts.`, {
    label: 'decompose', phase: 'Decompose', schema: {
      type: 'object', properties: {
        incumbent: { type: 'string' }, incumbentCommand: { type: 'string' },
        secPerEpoch: { type: 'number' }, peakGiB: { type: 'number' },
        killList: { type: 'array', items: { type: 'string' } },
        nineWindows: { type: 'array', items: { type: 'string' } },
        parts: { type: 'array', items: { type: 'object', properties: {
          name: { type: 'string' }, leverClasses: { type: 'array', items: { type: 'string', enum: CLASSES } },
          components: { type: 'string' }, functionRating: { type: 'string' },
          throwsAway: { type: 'string' }, unchosenAssumption: { type: 'string' },
          headroom: { type: 'string', description: 'on the shipped model: oracle x transfer, with sources' },
          knownFacts: { type: 'string' },
        }, required: ['name', 'leverClasses', 'components', 'headroom'] } },
      }, required: ['incumbent', 'incumbentCommand', 'parts', 'killList'],
    },
  })
  const parts = (decomp.parts || []).slice(0, 7)
  log(`parts: ${parts.map(p => p.name + '[' + (p.leverClasses || []).join('/') + ']').join(' | ')}`)

  const SHARED = `${RULES}
CONTEXT: ${CTX}
DATE PHASE: ${PHASE} (${DAYS_LEFT} days left); admitted lever classes: ${PHASE_CLASSES.join(', ')}.
BINDING GAP: ${gauge.bindingGap}. ${gauge.bindingWhy} Classes that attack it: ${(gauge.bindingClasses || []).join(', ')}.
${gauge.frameToBuild ? 'FRAME TO BUILD: ' + gauge.frameToBuild : ''}
INCUMBENT: ${decomp.incumbent}
INCUMBENT COMMAND: ${decomp.incumbentCommand}
Measured ~${decomp.secPerEpoch || 'NA'} s/epoch, peak ~${decomp.peakGiB || 'NA'} GiB.
SCREEN: folds ${A.screenFolds || '1,2'} of the same grouped cross-validation split, all else identical, paired against the incumbent OOF on those rows.
Screen bar: reference delta > max(2 SE, ${BAR}) with gold not against and the second ruler same sign.
CALIBRATION (the loop's own record; your centre is multiplied by the class factor before the gate):
${CLASSES.map(c => '- ' + c + ': factor ' + factor[c].toFixed(2)).join('\n')}
A card is admitted when factor x centre >= ${(BAR / 2).toFixed(4)} and factor x upper >= ${BAR}. Predict the effect on the SHIPPED
model: a change upstream of distillation reaches the student at the student's measured weight on that input.
KILL LIST (measured; re-propose only with the new condition that makes it different):
${(decomp.killList || []).map(k => '- ' + k).join('\n')}
AUDIT, available as cards: unbuilt ${JSON.stringify(audit.unbuilt || [])}; wounded ${JSON.stringify(audit.wounded || [])};
abandoned positives ${JSON.stringify(audit.abandonedPositives || [])}
FRONTIER FRAMES: ${JSON.stringify(gauge.frames || [])}
IMMERSION: ${JSON.stringify(immerse || {})}
NINE WINDOWS: ${JSON.stringify(decomp.nineWindows || [])}
Read the trainer on the compute host before claiming a knob exists. Every card must become a TRAINED change or an eval-only oracle.`

  phase('Tracks')
  // Card allocation follows the binding gap (in one run 17 of 21 cards came from parts the gate was always going to drop).
  // A part owning a binding class gets PER_BIND cards; any other part gets PER_OTHER, and a part whose every class has a
  // calibrated factor below 0.2 gets one card at most.
  const PER_BIND = A.perPartBinding || 4
  const PER_OTHER = A.perPartOther || 1
  const bindingSet = (gauge.bindingClasses || []).filter(c => PHASE_CLASSES.indexOf(c) >= 0)
  const quota = parts.map(p => {
    const cls = p.leverClasses || []
    if (cls.some(c => bindingSet.indexOf(c) >= 0)) return PER_BIND
    if (cls.length && cls.every(c => (factor[c] === undefined ? 0.3 : factor[c]) < 0.2)) return Math.min(1, PER_OTHER)
    return PER_OTHER
  })
  log(`card quota per part: ${parts.map((p, i) => p.name + '=' + quota[i]).join(' | ')}`)
  const trackOut = await parallel(parts.map((p, i) => () => agent(`${SHARED}

You own the invention track for PART ${i + 1}: ${JSON.stringify(p)}
CARD QUOTA for this part: ${quota[i]} (${quota[i] >= PER_BIND ? 'this part owns a class that attacks the binding gap' : 'this part does not attack the binding gap; spend the one card on its strongest idea'}).
Work in this order and show your work briefly:
1. The ten questions of this part: what it throws away and what it would score if it kept it; its oracle on the SHIPPED model;
   the inherited assumption and the cheapest test of its opposite; the parameter that must be both high and low; what if a
   neighbour takes its function (trimming); unused past / sub / super-system resources; where it fails most; the experiment
   that shows it is NOT the problem; its next step on an evolution trend; which anomaly it explains; what a distant field does.
2. Cause-effect chain to a key node; the PHYSICAL contradiction; the Ideal Final Result.
3. Chamberlin: at least three competing hypotheses, each with its signature.
4. Propose exactly your CARD QUOTA of cards, by DIFFERENT methods. Start from the audit items that belong to this part (an
   unbuilt named mechanism or a wounded kill's repair usually beats a fresh idea: it already has a measurement behind it).
   With two or more cards, exactly one is atypical (the physics of the measurement, the working practice of the people who
   produce the data, the process that generates the labels, the instrument as a latent, or a distant field). A MEMBER card
   prefers the cheapest family that can reach the incumbent's level on group-held-out rows (read the measured s/epoch of each
   family in FINDINGS: a family that screens in about 1 GPU-h against about 3 GPU-h for the incumbent fits three arms where
   one fitted); cost it honestly, because the budget then fits more arms.
5. Each card: lever class, centre and upper ON THE SHIPPED MODEL with the arithmetic, the mechanism's own SIGNATURE and its
   intended direction, the PREFLIGHT that checks it before any GPU arm, the oracle (original) or parity checklist (external),
   and singleCardEvidence. A card below the bar may carry a "diagnostic" field naming the decision its outcome changes.`, { label: 'track:' + (p.name || i), phase: 'Tracks', schema: CARDS })))
  const pool = trackOut.filter(Boolean).flatMap(r => r.cards || [])
  const contradictions = trackOut.filter(Boolean).map((r, i) => `${parts[i] ? parts[i].name : i}: ${r.contradiction || ''} | IFR: ${r.ifr || ''}`)
  log(`pool: ${pool.length} cards from ${trackOut.filter(Boolean).length} tracks`)

  phase('Gate')
  // Deterministic admission. Every dropped card is logged with its reason: no silent caps.
  const scored = pool.map(c => {
    const f = factor[c.leverClass] === undefined ? 0.3 : factor[c.leverClass]
    // A claimed interval above the card's own Fermi bound is capped at the bound.
    const fu = Number(c.fermiUpper) > 0 ? Number(c.fermiUpper) : Infinity
    const cc = f * Math.min(Number(c.centre) || 0, fu), cu = f * Math.min(Number(c.upper) || 0, fu)
    let status = 'ADMIT', reason = ''
    if (PHASE_CLASSES.indexOf(c.leverClass) < 0) { status = 'DROP'; reason = `class ${c.leverClass} not admitted in ${PHASE}` }
    else if (cc >= BAR / 2 && cu >= BAR) { status = 'ADMIT' }
    else if (c.diagnostic && String(c.diagnostic).trim()) { status = 'DIAGNOSTIC'; reason = `calibrated ${cc.toFixed(4)}/${cu.toFixed(4)} below the bar; decision: ${c.diagnostic}` }
    else { status = 'DROP'; reason = `calibrated centre ${cc.toFixed(4)}, upper ${cu.toFixed(4)} against ${(BAR / 2).toFixed(4)}/${BAR}` }
    return Object.assign({}, c, { factor: f, calCentre: cc, calUpper: cu, gate: status, gateReason: reason })
  })
  const admitted = scored.filter(c => c.gate === 'ADMIT')
  const diagnostics = scored.filter(c => c.gate === 'DIAGNOSTIC').sort((a, b) => (a.costGpuH || 9) - (b.costGpuH || 9)).slice(0, DIAG)
  const dropped = scored.filter(c => c.gate === 'DROP' || (c.gate === 'DIAGNOSTIC' && diagnostics.indexOf(c) < 0))
  for (const d of dropped) log(`gate drop ${d.id} [${d.leverClass}]: ${d.gateReason || 'diagnostic budget ' + DIAG + ' used'}`)
  const binding = (gauge.bindingClasses || []).filter(c => PHASE_CLASSES.indexOf(c) >= 0)
  const bindingAdmitted = admitted.filter(c => binding.indexOf(c.leverClass) >= 0)
  log(`gate: ${admitted.length} admitted, ${diagnostics.length} diagnostic, ${dropped.length} dropped; binding-class admitted ${bindingAdmitted.length}`)

  if (admitted.length === 0) {
    const bindingCards = scored.filter(c => binding.indexOf(c.leverClass) >= 0)
    return {
      mode: 'launch', valid: false, phase: PHASE, gauge, audit, factors: factor,
      verdict: `NO_RESOLVABLE_ARM: nothing clears the calibrated gate. Binding gap ${gauge.bindingGap}; its best cards: ` +
        bindingCards.sort((a, b) => b.calUpper - a.calUpper).slice(0, 3).map(c => `${c.id} ${c.calCentre.toFixed(4)}/${c.calUpper.toFixed(4)}`).join('; ') +
        '. The next action is a build of the binding class (a frame, member or teacher), sized by the chairman, not another card batch.',
      pool: scored.map(c => ({ id: c.id, leverClass: c.leverClass, centre: c.centre, calCentre: c.calCentre, gate: c.gate, reason: c.gateReason })),
    }
  }

  const ARM = {
    type: 'object', properties: {
      id: { type: 'string' },
      cards: { type: 'array', items: { type: 'string' }, description: 'card ids in this arm (one, unless every card has same-sign singleCardEvidence)' },
      parts: { type: 'array', items: { type: 'string' } },
      leverClass: { type: 'string', enum: CLASSES },
      predicted: { type: 'string', description: 'calibrated interval on the shipped model with the arithmetic' },
      diagnostic: { type: 'boolean' },
      costGpuH: { type: 'number' },
      crucialExperiment: { type: 'string', description: 'which competing hypotheses this arm discriminates and how (Platt/Mill)' },
      ablationPlan: { type: 'string' },
      why: { type: 'string' },
    }, required: ['id', 'cards', 'leverClass', 'predicted', 'diagnostic', 'costGpuH', 'crucialExperiment'],
  }
  const comp = await agent(`${SHARED}

CONTRADICTIONS AND IFRs PER PART:
${contradictions.join('\n')}

ADMITTED CARDS (passed the calibrated gate in code):
${JSON.stringify(admitted, null, 1)}
DIAGNOSTIC CARDS (at most ${DIAG} may run; each names the decision it changes):
${JSON.stringify(diagnostics, null, 1)}

You are the COMPOSER. You order and combine the admitted cards; you cannot re-admit a dropped card.
1. SOLO ARMS by default. A STACK is allowed only when every card in it has same-sign singleCardEvidence (the loop's record: two
   stacks of unevidenced cards, two harms, and attribution then cost more than the stack).
2. PORTFOLIO: the binding gap is ${gauge.bindingGap}; at least one arm must be of class ${binding.join(' or ') || 'any'} if any
   such card was admitted (${bindingAdmitted.map(c => c.id).join(', ') || 'none admitted'}).
3. Each arm is a crucial experiment: which competing hypotheses its outcome separates.
4. Choose up to ${ARMS} arms within ${GPU_H} GPU-hours, diagnostics included, ordered by calibrated centre per GPU-hour with the
   binding-class arm first. At least ${MIN_ARMS}.
Return the arms, the full objects of the cards they use, and every admitted card not used with its reason.`, {
    label: 'compose', phase: 'Gate', schema: {
      type: 'object', properties: {
        arms: { type: 'array', items: ARM },
        usedCards: { type: 'array', items: CARD },
        unused: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, reason: { type: 'string' } }, required: ['id', 'reason'] } },
      }, required: ['arms', 'usedCards', 'unused'],
    },
  })
  const okIds = new Set(admitted.concat(diagnostics).map(c => c.id))
  const cardById = {}
  for (const c of scored) cardById[c.id] = c
  const noEvidence = id => /^\s*(none|n\/a|no|-)?\s*$/i.test(String((cardById[id] || {}).singleCardEvidence || ''))
  let arms = (comp.arms || []).filter(a => {
    const bad = (a.cards || []).filter(id => !okIds.has(id))
    if (bad.length) log(`compose tried to use ungated cards ${bad.join(',')} in ${a.id}; arm removed`)
    const unevidenced = (a.cards || []).length > 1 ? (a.cards || []).filter(noEvidence) : []
    if (unevidenced.length) log(`stack ${a.id} holds cards never trained alone (${unevidenced.join(',')}); arm removed`)
    return !bad.length && !unevidenced.length && (a.cards || []).length > 0
  })
  // Fallback: the composer returned nothing usable, so admitted cards run as solo arms, best calibrated centre per hour first.
  if (!arms.length) {
    log('composer returned no usable arm; falling back to solo arms of admitted cards')
    arms = admitted.slice().sort((x, y) => y.calCentre / (y.costGpuH || 3) - x.calCentre / (x.costGpuH || 3)).map(c => ({
      id: c.id, cards: [c.id], parts: [c.part], leverClass: c.leverClass, diagnostic: false,
      predicted: `calibrated ${c.calCentre.toFixed(4)} / ${c.calUpper.toFixed(4)} (factor ${c.factor.toFixed(2)})`,
      costGpuH: c.costGpuH, crucialExperiment: c.hypotheses, ablationPlan: 'solo arm', why: 'fallback' }))
  }
  // Portfolio rule in code: an admitted binding-class card must be in the batch.
  if (bindingAdmitted.length && !arms.some(a => binding.indexOf(a.leverClass) >= 0)) {
    const best = bindingAdmitted.slice().sort((x, y) => y.calCentre / (y.costGpuH || 3) - x.calCentre / (x.costGpuH || 3))[0]
    log(`portfolio: composer left out the binding class; adding solo arm ${best.id}`)
    arms.unshift({ id: best.id, cards: [best.id], parts: [best.part], leverClass: best.leverClass, diagnostic: false,
      predicted: `calibrated ${best.calCentre.toFixed(4)} / ${best.calUpper.toFixed(4)} (factor ${best.factor.toFixed(2)})`,
      costGpuH: best.costGpuH, crucialExperiment: best.hypotheses, ablationPlan: 'solo arm', why: 'binding gap ' + gauge.bindingGap })
  }
  // Budget in code: diagnostics count against the same GPU-hours.
  let spent = 0, nDiag = 0
  arms = arms.filter(a => {
    const cost = Number(a.costGpuH) || 3
    if (a.diagnostic && nDiag >= DIAG) { log(`budget: diagnostic ${a.id} over the diagnostic allowance ${DIAG}`); return false }
    if (spent + cost > GPU_H) { log(`budget: ${a.id} (${cost} h) over ${GPU_H} GPU-h`); return false }
    spent += cost; if (a.diagnostic) nDiag++
    return true
  }).slice(0, ARMS)
  log(`arms: ${arms.map(a => a.id + '[' + (a.cards || []).join('+') + ']' + (a.diagnostic ? '(diag)' : '')).join(', ')}; ${spent} GPU-h`)
  if (arms.length === 0) return { mode: 'launch', valid: false, verdict: 'INVALID_RUN: no arm survived composition, evidence and budget checks', gauge, audit, factors: factor, compose: comp }

  phase('Build')
  const BUILT = {
    type: 'object', properties: {
      id: { type: 'string' }, ready: { type: 'boolean' },
      launcher: { type: 'string' }, readScript: { type: 'string' }, prereg: { type: 'string' },
      flags: { type: 'string' }, oofFile: { type: 'string' }, needMiB: { type: 'integer' }, estHours: { type: 'number' },
      preflight: { type: 'object', properties: {
        lossShare: { type: 'string', description: 'each loss term and its share of the step-0 gradient norm on shared params' },
        trivialTargets: { type: 'string', description: 'fraction of the new term targets that carry no information' },
        signature: { type: 'string', description: 'direction and size of the mechanism signature, flag on vs off, or UNCHECKED with the reason' },
        oracleOrParity: { type: 'string' },
        pass: { type: 'boolean' },
      }, required: ['lossShare', 'trivialTargets', 'signature', 'pass'] },
      smoke: { type: 'string' }, problem: { type: 'string' },
    }, required: ['id', 'ready', 'smoke', 'preflight'],
  }
  const built = await pipeline(arms, (arm, _o, i) => agent(`${SHARED}

You are the ENGINEER for arm ${arm.id} (index ${i}). Arm: ${JSON.stringify(arm, null, 1)}
Its cards: ${JSON.stringify((arm.cards || []).map(id => cardById[id]).filter(Boolean), null, 1)}
Own ONLY ${REMOTE}/arm_${arm.id}/ on the compute host and ${RUN}/arm_${arm.id}/ in the project.
1. Copy the trainer into arm_${arm.id}/ and implement every card behind its OWN env flag. Create every new parameter and consume
   every new random draw UNCONDITIONALLY, so with all flags off the run is bit-identical to the incumbent at step 0. Print the
   full config and flag states on startup. Zero-init new branches where that makes step 0 equal to the incumbent.
2. ORACLE FIRST for an original method: build and run the truth-peeking or eval-only variant before the trained arm when it
   costs under an hour, and state the oracle gap in the prereg. PARITY for an external method: list the original's named knobs
   and mark each present or absent; an absent knob is either added or named in the prereg as the reason a null would not close.
3. PREFLIGHT, before ready=true (CPU is enough for a and b):
   a. Loss-term audit: over 8 micro-batches at step 0 with the flags on, every loss term's value and its share of the gradient
      norm on the shared parameters. A new term above ${SHARE_CAP} of the total fails unless the prereg argues for it.
   b. Target audit: the fraction of the new term's targets that carry no information (constant, 0.5, or equal to what the
      incumbent already trains on). Above 0.5 fails unless the uninformative cells are masked.
   c. Signature: the card's own signature must move in the intended direction, flag on vs flag off from the same init, over a
      micro-run of at most 200 steps when GPU memory is free under flock ${LOCK}; if GPU memory is short, record UNCHECKED and why.
   d. Teacher departure (when the incumbent is distilled): in the same micro-run, print rho of the student logits with the
      distillation teacher, flag on vs off. Recorded, not blocking; in the loop's record every student arm whose rho with the
      teacher fell by more than 0.005 lost on the reference ruler (4 of 4) and every arm within 0.0021 gained (2 of 2), so a
      STUDENT card that lowers it with no named stronger source is predicted harm and the prereg must say why it is not.
   preflight.pass=false blocks the arm; say what to change.
4. Heilmeier pre-registration BEFORE training in ${RUN}/arm_${arm.id}/prereg.md: aim, today's method and its limit, what is
   new, competing hypotheses and which outcome favours which, the calibrated interval, the bar, the preflight numbers, the kill
   criterion WITH the three kill tests, the ablation plan. read_${arm.id}.py computes on the screen rows only: paired macro
   reference delta vs the incumbent OOF with a paired bootstrap SE (2000 resamples of the independent unit), per-label deltas,
   gold delta on rows present, second-ruler delta, the signature on the trained model, and one VERDICT line: SCREEN_PASS iff
   delta > max(2 SE, ${BAR}) AND gold not negative beyond its SE AND the second ruler same sign; SCREEN_NULL if |delta| <= 2 SE;
   SCREEN_HARM if delta < -2 SE; else SCREEN_INCONCLUSIVE. It writes result.json.
5. Smoke on the compute host (GPU under the lock if free, else the CPU path on a tiny fold subset); the read in dry mode must print
   delta 0. Delete smoke outputs. ready=true only if the smoke ran, the dry read printed 0, and preflight.pass is true.`, { label: 'build:' + arm.id, phase: 'Build', schema: BUILT }))
  const ready = built.filter(Boolean).filter(b => b.ready && b.preflight && b.preflight.pass)
  for (const b of built.filter(Boolean)) if (!(b.ready && b.preflight && b.preflight.pass)) log(`not queued ${b.id}: ${b.problem || JSON.stringify(b.preflight || {})}`)
  log(`built: ${ready.length}/${arms.length} ready`)
  if (ready.length === 0) return { mode: 'launch', valid: false, verdict: 'INVALID_RUN: no arm passed preflight', gauge, audit, factors: factor, arms, built }

  phase('Queue')
  const q = await agent(`${RULES}
You are the QUEUE OPERATOR. Arms that passed build and preflight: ${JSON.stringify(ready, null, 1)}
Write ${REMOTE}/run_queue.sh and launch it detached with the four-part idiom, wrapped in a local timeout 30. The queue:
- first waits while any OTHER research queue is alive (read the queue.pid file of every sibling run directory beside
  ${REMOTE}, kill -0 them and check the command line names a queue; never signal them), then uses the shared lock ${LOCK} for every GPU step;
- runs the arms serially, binding-class arm first; for each waits until nvidia-smi free memory >= needMiB + 2048 (poll every
  300 s, WAIT_TIMEOUT after ${A.waitHours || 16} h); runs the launcher with its own log; records exit code, times and peak memory;
  on CUDA OOM archives partial outputs to attempt1/ and re-queues the arm once at the end; after a clean exit runs the read and
  writes arm_<id>/DONE with the VERDICT line;
- writes its own pid to ${REMOTE}/queue.pid, ${REMOTE}/queue_state.tsv after every transition, and QUEUE_DONE at the end.
Test the queue logic against stub launchers before the real launch. Then verify in a SEPARATE call that the pid is alive.
Write ${RUN}/program.md: date phase, binding gap and its numbers, calibration factors, the gate table (every card: centre,
factor, calibrated, verdict, reason), the arms, their preflight numbers and bars, budget, stop rules, and the judge invocation.`, {
    label: 'queue', phase: 'Queue', schema: {
      type: 'object', properties: {
        queuePid: { type: 'string' }, stateFile: { type: 'string' },
        armsQueued: { type: 'array', items: { type: 'string' } }, status: { type: 'string' },
      }, required: ['armsQueued', 'status'],
    },
  })

  const n = (q.armsQueued || []).length
  return {
    mode: 'launch', valid: n >= MIN_ARMS, phase: PHASE,
    verdict: n >= MIN_ARMS ? 'QUEUED' : 'INVALID_RUN: fewer than minArms trained arms queued',
    gauge: { boardLine: gauge.boardLine, bindingGap: gauge.bindingGap, bindingWhy: gauge.bindingWhy, ourSingle: gauge.ourSingle, bestClaimedSingle: gauge.bestClaimedSingle },
    audit: { unbuilt: audit.unbuilt, wounded: audit.wounded, calibration: audit.calibration }, factors: factor,
    parts, contradictions,
    gate: scored.map(c => ({ id: c.id, leverClass: c.leverClass, centre: c.centre, upper: c.upper, calCentre: c.calCentre, calUpper: c.calUpper, gate: c.gate, reason: c.gateReason })),
    arms, unused: comp.unused, built, queue: q,
  }
}

// =============================================================================================
if (MODE === 'judge') {
  phase('Collect')
  const coll = await agent(`${RULES}
CONTEXT: ${CTX}
Judge mode for run ${RUN}. Read ${REMOTE}/queue_state.tsv, every arm_*/result.json and DONE marker on the compute host, and
${RUN}/program.md. For each arm return its status, the VERDICT line from its pre-registered read, and the numbers (reference
delta, SE, gold delta, second-ruler delta, per-label deltas, the mechanism signature on the trained model), its lever class and
calibrated prediction from program.md, cost and peak memory. Never re-read an arm at a threshold other than its prereg. If the
queue is still running, return running=true.`, {
    label: 'collect', phase: 'Collect', schema: {
      type: 'object', properties: {
        running: { type: 'boolean' },
        arms: { type: 'array', items: { type: 'object', properties: {
          id: { type: 'string' }, status: { type: 'string' }, verdict: { type: 'string' }, leverClass: { type: 'string' },
          predictedCentre: { type: 'number' }, refDelta: { type: 'number' }, se: { type: 'number' },
          goldDelta: { type: 'number' }, secondRulerDelta: { type: 'number' },
          perLabel: { type: 'string' }, signature: { type: 'string' }, costH: { type: 'number' }, notes: { type: 'string' },
        }, required: ['id', 'status', 'verdict'] } },
      }, required: ['running', 'arms'],
    },
  })
  if (coll.running) return { mode: 'judge', running: true, arms: coll.arms }

  phase('Verify')
  const passers = (coll.arms || []).filter(a => /SCREEN_PASS/.test(a.verdict || ''))
  const verified = await parallel(passers.map(a => () => agent(`${RULES}
Try to REFUTE the screen pass of arm ${a.id} in run ${RUN}: ${JSON.stringify(a)}.
Check on the compute host: (1) candidate and control OOF cover identical rows and folds, no NaN; (2) the startup banners differ only in
the declared flags; (3) RNG parity, or if broken, whether the delta clears the campaign's measured reseed band (the screen bar
${BAR} when no other band was measured); (4) the frame is equally
honest for both arms (group-held-out on these folds, same teacher, same target table unless that is a card); (5) no
contamination of the reference ruler; (6) the macro is not carried by one label; (7) a frozen probe or proxy was not standing
in for the trained chain. Default to refuted=true if a check cannot be completed.`, {
    label: 'verify:' + a.id, phase: 'Verify', schema: {
      type: 'object', properties: { id: { type: 'string' }, refuted: { type: 'boolean' }, reasons: { type: 'string' } },
      required: ['id', 'refuted', 'reasons'],
    },
  })))
  const survivors = verified.filter(Boolean).filter(v => !v.refuted).map(v => v.id)

  phase('Recompose')
  const rec = await agent(`${RULES}
CONTEXT: ${CTX}
You are the RECOMPOSER and scribe for run ${RUN}. Arms: ${JSON.stringify(coll.arms)}
Verification: ${JSON.stringify(verified.filter(Boolean))}. Screen survivors: ${JSON.stringify(survivors)}.
Read the postmortems the caller listed, if any (${PM}), before writing. Before appending to any table, grep it for the arm id: a row that already exists
is completed or corrected in place, never duplicated.
1. KILL DISCIPLINE for every non-pass: apply the three tests (build parity, oracle for an original method, named missing
   condition with evidence). Record the arm as CLOSED only if all three hold; otherwise WOUNDED with the repair as a card
   (the repair of a wounded arm is the next card for its part, ahead of fresh ideas).
2. Append one row per arm to ${ARCHIVE}, and one row per arm to ${CALIB} (run, arm, leverClass, predicted_centre,
   predicted_upper, realized, se, verdict, source). Update ${PARTS}: headroom moves and anomalies explained or created.
3. QUEUE REVIEW: list every item still PENDING or WAITING in the queue_state.tsv of ${REMOTE} and of every sibling run directory
   beside it, score it against the gate (calibrated centre vs the bar, date phase, binding gap), and recommend KEEP or CANCEL with the reason. Do not cancel
   anything yourself; the chairman decides.
4. FRONTIER AND STANDING QUESTIONS (kaggle-campaign): our best single model against the best claimed single model; the board
   gap and which class carries it; training vs verification GPU-hours since the last judge; frame levers never swept; closed
   families whose kill note fails the three tests. Update ${FRONTIER} with our number in the same frame.
5. Survivors: queue RUNG 2 (the remaining folds, same flags) with its read on all rows vs the incumbent OOF, appended to
   ${REMOTE}/run_queue_rung2.sh and launched detached behind any running queue with the same GPU-memory guard; verify separately.
   A rung-2 pass becomes a SUBMISSION CANDIDATE: write the full-corpus refit launcher and the submission dry-run command into
   ${RUN}/submission_candidate.md. Do not submit.
6. Write ${RUN}/results.tsv and ${RUN}/brief.md (plain English, no em dashes): each arm, its numbers with n and SE, the verdict,
   predicted vs realized, WOUNDED or CLOSED with the test that decided it, and the cheapest supply of each missing condition.
7. Add numbered BACKLOG.md rows for survivors, repairs of wounded arms, and queue-review recommendations (use @ as the sed
   delimiter near tables, then count cells with awk -F'|').
8. Ledger entry in ${LEDGER}: run, arms with lever classes and methods, verdicts, predicted vs realized per class, GPU-hours
   trained vs verification, and one distilled RULE.
Return what you wrote and the queue-review table.`, { label: 'recompose', phase: 'Recompose' })

  return { mode: 'judge', arms: coll.arms, verified, survivors, record: rec }
}

return { error: 'unknown mode ' + MODE }
