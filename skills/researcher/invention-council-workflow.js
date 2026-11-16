export const meta = {
  name: 'invention-council',
  description: 'TRIZ invention session: prospectors search outside the campaign, characterizers describe the existing system, scouts measure real data facts, replicators rebuild documented external methods (code parity first), breakers attack our own impossibility certificates, optional assemblers compose confirmed structures into candidate model classes (tested at their ORACLE, never by a first build), seven operator-family agents generate candidates, one agent checks the pool against the tried levers and a scripted formula ranks it by test cost and evaluation-set spend (no survival forecast), engineers MEASURE the decisive premise on real data and try to enable it, chairman writes a brief from empirical survivors (with nursery plans for surviving classes), scribe appends the run record to the calibration ledger',
  whenToUse: 'A research campaign has plateaued and needs genuinely new candidate mechanisms, screened against everything already tried and killed against real data before they reach the brief',
  phases: [
    { title: 'Prospect', detail: 'agents search OUTSIDE the campaign: new research methods + the domain\'s own practice and documented instrument flaws' },
    { title: 'Characterize', detail: 'agents DESCRIBE the existing system: component atlas, consensus-vs-error map, evaluation-apparatus spec, and the unasked questions' },
    { title: 'Scout', detail: 'agents measure fresh facts from the actual data and verify load-bearing numbers' },
    { title: 'Replicate', detail: 'agents implement documented external state-of-the-art recipes and gate them on real data' },
    { title: 'Refute', detail: 'agents attack our OWN impossibility certificates with the frontier gap as the lever' },
    { title: 'Assemble', detail: 'agents compose ALL confirmed structures into single candidate model classes, each with a generative story, an oracle spec, and a nursery plan' },
    { title: 'Generate', detail: 'one agent per armory family proposes candidate mechanisms' },
    { title: 'Rank', detail: 'one duplicate check against the tried levers, then a scripted rank by test cost and evaluation-set spend; no survival forecast' },
    { title: 'Enable', detail: 'selected candidates get their premise measured, and every miss returns the missing condition and its cheapest supply' },
    { title: 'Synthesize', detail: 'chairman writes the brief from empirical survivors (or the sharpened contradiction if none)' },
    { title: 'Ledger', detail: 'scribe appends outcomes + calibration to the persistent ledger' },
  ],
}

// ---- inputs -------------------------------------------------------------
// args.problem         : string (required) - what must be achieved and how it is measured
// args.currentBest     : string   - current best method and its score
// args.plateauEvidence : string   - why this is a plateau (what tuning already failed)
// args.resources       : string   - inventory of unused/underused resources
// args.triedLevers     : string[] - approaches already attempted, each with its outcome
// args.dataAccess      : string   - HOW an agent can reach the data and compute: data paths, where code runs
//                                   (local, or a remote host and how to reach it), the interpreter or
//                                   environment to use, existing harness scripts, where to write scratch
//                                   files. This workflow names no machine of its own; everything about
//                                   compute comes from this argument and is pasted verbatim into the
//                                   agents' briefs. Put the safety rules for your machines here as well,
//                                   because the agents see nothing else: resource caps (processes, memory,
//                                   threads), never stop or kill services or processes the agent did not
//                                   start, launch long jobs detached and verify them in a separate call.
//                                   Example: 'Data: <data-dir>/train.parquet (read only the needed columns).
//                                   Run on <compute-host> with <interpreter>; scratch in <scratch-dir>;
//                                   at most 8 processes and 12 GB per job; touch nothing you did not start.'
//                                   Enables the Characterize, Scout, Replicate, Refute and Enable phases.
//                                   Without it the council degrades to an ideas-only session (Prospect,
//                                   Assemble, Generate, Rank, Synthesize, Ledger) and logs the skipped phases.
// args.replicationTargets : array - documented EXTERNAL methods to reproduce before inventing:
//                                   [{name, recipe (full method spec + params + source), expected
//                                   (score the original reports), gate (pass criteria), mechanism (one
//                                   sentence: what the method assumes about the target that makes it work;
//                                   required in ladder mode), reference (where the original's stage output
//                                   can be produced or read for CODE PARITY)}]. Each gets
//                                   a heavy replicator agent with dataAccess. Replication of a
//                                   known-working method beats invention when a frontier exists.
// args.frontier        : object   - FRONTIER GATE (see the frontier gate in SKILL.md): {external (best REPRODUCIBLE
//                                   external score in our frame), ours, largestLever (largest effect one of
//                                   our own candidates realised on the deciding instrument in two weeks),
//                                   reference (how to run the external artefact as a reference implementation
//                                   for parity)}. When |external - ours| > 2 * largestLever the run has TWO
//                                   TRACKS: replicationTargets (the next rungs of the external artefact's own
//                                   score history) are required, and every generator, engineer and the chairman
//                                   works under the BEYOND-THE-FRONTIER directive (new evidence or a new
//                                   question, absent from the frontier, aimed where the frontier is blind;
//                                   no tuning). The skill's purpose stays research of the unknown: the gate
//                                   adds the frontier track, it switches nothing off.
//                                   Example: {external: 0.70, ours: 0.60, largestLever: 0.02, reference:
//                                   'run the public artefact in <reference-dir> and save its stage outputs'}
//                                   gives a gap of 0.10 > 2 x 0.02, so the gate trips.
// args.replicateMinutes : number  - compute budget per replicator (default 40; 240 in ladder mode).
// args.certificates    : array    - OUR OWN impossibility claims to attack adversarially:
//                                   [{claim, evidence, frontierContradiction}]. Each gets a heavy
//                                   breaker agent. Pass these whenever an external party has
//                                   demonstrably achieved what one of our certificates forbids -
//                                   historically the highest-yield phase in this workflow, because a
//                                   certificate built from our own channels is evidence about our
//                                   channels, not about the problem.
// args.characterize    : number   - characterizer agents, 0..3 (default 2; needs dataAccess). They DESCRIBE the
//                                   existing system before anything is proposed: agent 0 builds the component
//                                   atlas and the consensus-versus-error map (opens every aggregate), each
//                                   further agent the evaluation-apparatus spec (documented versus assumed).
//                                   All of them end with the unasked questions.
// args.assemble        : number   - assembler agents, 0..3 (default 0). Each composes EVERY confirmed
//                                   structure (from the problem statement, characterization and scout
//                                   facts) into ONE candidate model class with a generative story, an
//                                   ORACLE spec (the truth-peeking variant that is its first and only
//                                   pre-nursery build) and a nursery plan. Exists because a campaign
//                                   held four verified residual structures for weeks and no phase asked
//                                   what single model class contains all of them.
// args.prospect       : number   - external-search agents, 0..2 (default 2). Angle 1 = recent research
//                                   methods matching the problem's type signature; angle 2 = the DOMAIN'S
//                                   OWN practice + documented instrument/measurement failure modes, each
//                                   mapped to a computable proxy in our columns. Set 0 only offline.
// args.perFamily       : number   - candidates per family, 0..8 (default 3; 0 = replicate-only run)
// args.scouts          : number   - scout agents, 0..7 (default 5; 0 disables scouting). Angle 1 is
//                                   the DEPLOYED-DECISION AUDIT, which has the best hit rate of any
//                                   phase; do not set scouts below 1 when dataAccess is available. The first
//                                   N entries of SCOUT_ANGLES run, in order. The list has eight entries and
//                                   the cap is 7, so the eighth (noise floor) does not run under this cap.
// args.falsifyTopK     : number   - candidates to falsify empirically, 0..6 (default 3)
// args.freeLaneMinutes : number   - a zero-query test at or under this many minutes jumps the queue (default 30)
// args.freeLaneMax     : number   - how many free-lane candidates to admit per run, 0..4 (default 2)
// args.judgeModel      : string   - model for the one duplicate-check agent (default inherit; 'sonnet' recommended)
// args.judgeEffort     : string   - reasoning effort for the duplicate-check agent; judgeModel and judgeEffort
//                                   also apply to the budget and scribe agents
// args.ledgerPath      : string   - persistent calibration ledger (default:
//                                   ~/.claude/skills/researcher/LEDGER.md). The script never opens it: the
//                                   path is handed to the scout and scribe agents inside their prompts, and
//                                   the verification-budget log query_budget.md is kept in the same directory.
//                                   Pass an absolute path if the agents' file tools do not expand ~.
// Generators, scouts, falsifiers and the chairman inherit the session model.
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = { problem: A } } }
if (!A || typeof A !== 'object') A = {}

const problem = A.problem
if (!problem || typeof problem !== 'string') {
  throw new Error('invention-council: args.problem (a non-empty string) is required')
}
const currentBest = A.currentBest || '(not stated)'
const plateauEvidence = A.plateauEvidence || '(not stated)'
const resources = A.resources || '(none listed: infer plausible unused resources from the problem itself)'
const triedLevers = Array.isArray(A.triedLevers) ? A.triedLevers.filter((s) => typeof s === 'string') : []
const dataAccess = (typeof A.dataAccess === 'string' && A.dataAccess.trim()) ? A.dataAccess.trim() : null
const PER_FAMILY = (Number.isInteger(A.perFamily) && A.perFamily >= 0 && A.perFamily <= 8) ? A.perFamily : 3
const REPL = Array.isArray(A.replicationTargets)
  ? A.replicationTargets.filter((t) => t && typeof t === 'object' && t.name && t.recipe)
  : []
const CERTS = Array.isArray(A.certificates)
  ? A.certificates.filter((c) => c && typeof c === 'object' && c.claim)
  : []
const N_CHARACTERIZE = (Number.isInteger(A.characterize) && A.characterize >= 0 && A.characterize <= 3) ? A.characterize : 2
// Assemble defaults to 0: architecture-shaped classes were 0 for 5 in the ledger when the default was set
// and consumed the largest share of the budget. Set assemble>=1 deliberately, when the frame gap exceeds
// the largest lever an audit of the deployed artifact can name.
const N_ASSEMBLE = (Number.isInteger(A.assemble) && A.assemble >= 0 && A.assemble <= 3) ? A.assemble : 0
const N_PROSPECT = (Number.isInteger(A.prospect) && A.prospect >= 0 && A.prospect <= 2) ? A.prospect : 2
const N_SCOUTS = (Number.isInteger(A.scouts) && A.scouts >= 0 && A.scouts <= 7) ? A.scouts : 5
const TOP_K = (Number.isInteger(A.falsifyTopK) && A.falsifyTopK >= 0 && A.falsifyTopK <= 6) ? A.falsifyTopK : 3
// The free lane: zero-evaluation-query tests run ahead of the ranked list and outside TOP_K.
const FREE_LANE_MINUTES = (Number.isInteger(A.freeLaneMinutes) && A.freeLaneMinutes >= 0) ? A.freeLaneMinutes : 30
const FREE_LANE_MAX = (Number.isInteger(A.freeLaneMax) && A.freeLaneMax >= 0 && A.freeLaneMax <= 4) ? A.freeLaneMax : 2
// ---- the frontier gate. In one campaign five audit councils in a row ran with no replication targets while a
// reproducible external artefact led by more than three times the largest lever the campaign had realised
// (LEDGER lessons 151-155). The gate is arithmetic and is enforced here. It ADDS the frontier track (replication
// targets become mandatory) and points the generators beyond the frontier; it does not switch research off
// (LEDGER lesson 155).
const FR = (A.frontier && typeof A.frontier === 'object') ? A.frontier : null
const FR_REFERENCE_EARLY = (FR && typeof FR.reference === 'string') ? FR.reference : ''
const FR_G = (FR && isFinite(Number(FR.external)) && isFinite(Number(FR.ours))) ? Math.abs(Number(FR.external) - Number(FR.ours)) : null
const FR_L = (FR && isFinite(Number(FR.largestLever))) ? Math.abs(Number(FR.largestLever)) : null
const LADDER = FR_G !== null && FR_L !== null && FR_G > 2 * FR_L
if (LADDER) {
  if (!REPL.length) {
    throw new Error('invention-council: the frontier gate tripped (gap ' + FR_G + ' > 2 x largest lever ' + FR_L +
      '); a frontier track is required next to the research: pass replicationTargets = the next rungs of the ' +
      'external artefact, each with name, recipe, expected, gate, mechanism and reference')
  }
}
const FRONTIER_BLOCK = LADDER
  ? 'BEYOND-THE-FRONTIER DIRECTIVE (the frontier gate tripped: a reproducible external artefact leads us by ' + FR_G +
    ', our largest realised lever is ' + FR_L + '). The frontier itself is being absorbed by the replication targets ' +
    'of this run, so do NOT propose anything it already contains. Every candidate answers three questions in writing: ' +
    '(1) FRONTIER-NEW: what does the best external artefact do at this decision site, and why is the candidate not that? ' +
    '(2) NEW EVIDENCE OR A NEW QUESTION: a re-weighting, threshold, slot, gate or fusion of evidence already in our lists ' +
    'is tuning and is inadmissible. (3) AIMED WHERE THE FRONTIER IS BLIND: the regions where the reference itself scores ' +
    'near zero or guesses, the gap between the reproducible artefact and the leaders above it, anomalies nobody has ' +
    'explained, resources nobody uses, premises nobody wrote down, or the missing instrument (an offline ruler that ' +
    'predicts the real one). Build each candidate as an ADDITION that does not depend on our current rung, so it can be ' +
    'carried up the ladder. State no ceiling or end point below the frontier.' +
    (FR_REFERENCE_EARLY ? ' Reference artefact: ' + FR_REFERENCE_EARLY : '')
  : ''
const REPL_MINUTES = (Number.isInteger(A.replicateMinutes) && A.replicateMinutes > 0) ? A.replicateMinutes : (LADDER ? 240 : 40)
const FR_REFERENCE = (FR && typeof FR.reference === 'string') ? FR.reference : ''
const LEDGER = (typeof A.ledgerPath === 'string' && A.ledgerPath) ? A.ledgerPath
  : '~/.claude/skills/researcher/LEDGER.md'
const JUDGE_OPTS = {}
if (typeof A.judgeModel === 'string' && A.judgeModel) JUDGE_OPTS.model = A.judgeModel
if (typeof A.judgeEffort === 'string' && A.judgeEffort) JUDGE_OPTS.effort = A.judgeEffort

// Meta-lessons: transferable, domain-free, distilled from ledgered council runs.
// They are part of the base brief, so every agent of the run receives them.
const META_LESSONS = [
  'DEPLOYMENT-CONDITIONAL PREMISES ONLY: a statistic conditioned on ground truth (an "existence" or "enrichment" measured at the true answer) does NOT imply deployable precision around a legal prior. State every load-bearing premise as a quantity computable at deployment; if the pitch cites a truth-conditioned number, the candidate must ALSO state its deployment-conditional analogue and expect it to be far weaker.',
  'CONSISTENCY CAN BE ALIASED: agreement between two pieces of evidence (co-occurring detections, consistent offsets, model consensus) is only informative if their error sources are independent. Structured decoys make wrong answers agree. Every consistency-based candidate must argue independence explicitly.',
  'THE FIRST TEST MUST ISOLATE THE PREMISE: a first test that requires building the full pipeline dies untested. Design the cheapest measurement of the single load-bearing quantity, with truth used only for SCORING, never for conditioning selection.',
  'THE GENERATOR USUALLY KNOWS THE KILL: expectedFailureMode predictions have historically come true. If the expected failure is more likely than not and no pre-committed repair exists, the candidate is not brief-worthy.',
  'HEADROOM IS NOT A MECHANISM: citing an oracle gap ("the per-unit oracle beats us by X") is motivation, not a mechanism. The mechanism must name the deployable signal that closes part of the gap and why that signal survives the tried-lever kills.',
  'CEILING x REALIZED FRACTION BEFORE EFFORT: before proposing or judging a candidate, ask what its ORACLE version scores (perfect knowledge of the one quantity it estimates, every other constraint held). Ceiling times a plausible realized fraction is the candidate\'s honest best case. Comparable channels have realized ~15-40% of their oracle. If oracle x 0.4 does not clear the bar, the candidate is dead before it is built and should not consume a falsification slot.',
  'OUR OWN IMPOSSIBILITY CERTIFICATES ARE THE WEAKEST LINKS IN THE CHAIN: a certificate measured from our own channels is evidence about our channels, not about the problem. The single largest win in this workflow\'s history came from finding that a "family closed" verdict rested on an implementation missing two documented knobs. When an external party demonstrably achieved what a certificate forbids, the certificate is wrong somewhere - attack the PROXY it measured, the AGGREGATION LEVEL, the IMPLEMENTATION, and the POPULATION, in that order.',
  'AUDIT THE DEPLOYED ARTIFACT\'S OWN DISCRETE DECISIONS: every gate, clip, threshold, drop and tie-break inside the current best is a binary classifier with TWO error types, and campaigns habitually audit neither. Measuring how often each fires in the wrong direction, and the oracle value of fixing it, has a far better hit rate than generating new mechanisms - it is where a shipped win came from. Prefer a candidate that repairs a measured wrong decision over one that adds a new component.',
  'THE GOAL IS NOT TO FALSIFY THEORIES, IT IS TO CHANGE OR ADD CONDITIONS THAT MAKE THEM WORK. A measured miss is a specification for the missing condition, not a verdict. When a mechanism\'s signal is real and its gap to the bar is small, the remaining work is engineering: narrow the population, change the scale, add the missing witness, re-frame the threshold, compose two half-signals, or move the mechanism to a different decision site. This council has repeatedly reported engineering problems as impossibility results, and that has cost it more than any wrong candidate. Only a ceiling argument (the oracle version cannot clear the bar) terminates a line of work.',
  'THE INVENTORY MUST NOT BE CLOSED: a plateau computed entirely from internal resources is a statement about the inventory, not the problem. Published methods postdating the current design, and the DOMAIN\'S OWN PRACTICE - especially the documented failure modes, drift and accumulating errors of the INSTRUMENTS that produced the data - are resources. Measurement artifacts are documented in domain literature and almost never modelled by outsiders, yet they often ARE the unexplained per-unit variance in the residual. An external effect with a computable proxy in existing columns is the strongest kind of new feature, because it is physically motivated rather than mined.',
  'THE EVALUATION SET HAS A FINITE VERIFICATION BUDGET AND EVERY COMPARISON SPENDS IT. Optimism from choosing among candidates on the same held-out set is real, and it GROWS WITH THE NUMBER OF CANDIDATES COMPARED: this workflow measured it directly at +0.060 for a 14-cell menu, rising +0.0985 as the menu went from 1 to 14 cells, against real effects of ~0.3 and an observed train-to-deployment attenuation of ~0.2 of which roughly half was this. Consequence, and it is structural: a campaign that has evaluated a hundred candidates against one evaluation set can still FIND signal but can no longer VERIFY it, because the measurement noise floor has risen to the size of the effects being chased. That is a VERIFICATION ceiling, not a signal ceiling, and it is escaped only by a population never used for selection - never by a cleverer candidate. Count what you spend, report it, and prefer few well-motivated tests over broad sweeps.',
  'SELECTION IS PART OF THE MODEL: any menu screened on the data (proxy choice, variant choice, hyperparameter shortlist) must be re-tested with that choice made out-of-fold, and any effect within a few percent of the bar must be re-measured on a re-drawn CV partition. Effects that vanish under nested honesty or partition re-draw were selection artifacts, and this failure mode has produced more false positives in this workflow than any other.',
]
const lessonsBlock = 'META-LESSONS from previous council runs (hard constraints on candidate quality):\n' +
  META_LESSONS.map((l, i) => `L${i + 1}. ${l}`).join('\n')

const triedBlock = triedLevers.length
  ? 'ALREADY TRIED (do NOT re-propose these or trivial variants; treat each as a known null):\n' +
    triedLevers.map((l, i) => `${i + 1}. ${l}`).join('\n')
  : 'ALREADY TRIED: (nothing listed)'

const baseBrief = [
  `PROBLEM (function + metric):\n${problem}`,
  `CURRENT BEST METHOD:\n${currentBest}`,
  `PLATEAU EVIDENCE:\n${plateauEvidence}`,
  `RESOURCE INVENTORY (unused or underused):\n${resources}`,
  triedBlock,
  lessonsBlock,
].join('\n\n')

// ---- schema-driven digest (structural guard) --------------------------------
// Hand-written digests silently DROP newly added schema fields, and that exact bug occurred three
// times in one session: a survivors filter that ignored a new verdict value, a chairman digest and a
// caller projection that omitted three new falsifier fields, and a prospect digest that omitted the
// coverage-gap field the chairman was being asked to report on. Building the digest FROM THE SCHEMA'S
// OWN REQUIRED-KEY LIST makes a dropped field impossible: add a field to the schema and it appears
// downstream automatically.
function digestFrom(schema, obj, opts) {
  const o = opts || {}
  const skip = new Set(o.skip || [])
  const head = (o.head || []).map((k) => obj[k]).filter((v) => v !== undefined && v !== '')
  const keys = ((schema && schema.required) || Object.keys(obj)).filter((k) => !skip.has(k) && !(o.head || []).includes(k))
  const body = keys.map((k) => {
    const v = obj[k]
    if (v === undefined || v === null || v === '') return `  ${k}: (not reported)`
    return `  ${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`
  })
  return [head.join(' | '), ...body].filter(Boolean).join('\n')
}

// ---- Stage -1: PROSPECT the outside world --------------------------------
// Why this phase exists: in one campaign, for four rounds every input to the council came from INSIDE -
// its own data, its own out-of-fold arrays, its own ledger. A closed resource inventory makes any plateau look permanent.
// The outside world has two things we cannot generate internally: (a) research methods published
// since our approach was designed, and (b) the DOMAIN'S OWN PRACTICE - how practitioners actually
// solve this task, including failure modes of the instrument that produced the data.
const PROSPECT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    findings: {
      type: 'array', minItems: 1,
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          title: { type: 'string', description: 'Method / practice / instrument-effect name' },
          source: { type: 'string', description: 'URL or citation. Never invent one; if you could not verify a source, say so here' },
          summary: { type: 'string', description: 'What it does, mechanically, in enough detail to build or test' },
          applicability: { type: 'string', description: 'The concrete thing it would change in OUR pipeline, and which of our tried-levers or certificates it bears on' },
          computableProxy: { type: 'string', description: 'If this names a real-world effect (instrument drift, accumulating error, degradation, an operational artifact), the quantity in OUR data that proxies it and how to compute it from the columns we have. Empty string if not applicable' },
          buildCost: { type: 'string', description: 'Rough cost of a first test: cheap (<30 min) / medium / heavy' },
          couldWeHaveFoundThis: { type: 'string', description: 'REQUIRED, and it is the most valuable field here. Could this finding have been produced from data and tools the campaign ALREADY had, before reading it? Answer yes/no/partly, then say WHAT WOULD HAVE HAD TO BE ASKED. If yes, this is a COVERAGE GAP in our own description of the system, and naming it is worth more than the finding: it tells us which class of question we systematically fail to ask. Measured precedent: in one campaign three useful external articles, read on a single day, were ALL reproducible from data already in hand - a component atlas hidden inside an average, an evaluation-apparatus fact stated in the rules, and an agreement-versus-error cross-tabulation over components already on disk.' },
        },
        required: ['title', 'source', 'summary', 'applicability', 'computableProxy', 'couldWeHaveFoundThis', 'buildCost'],
      },
    },
  },
  required: ['findings'],
}

const PROSPECT_ANGLES = [
  'RESEARCH METHODS. Search for methods published or popularized RECENTLY that fit this problem\'s type signature (state the signature with no domain nouns first, then search for the fields that own it). Prioritize methods that did not exist or were not mainstream when our current approach was designed. For each, extract enough mechanism to build it, not just a name.',
  'THE DOMAIN\'S OWN PRACTICE AND ITS INSTRUMENT FLAWS. Search how PRACTITIONERS actually perform this task in the field, in their vocabulary, including: the standard workflow and what it conditions on; named techniques we have not tried; and CRITICALLY the known failure modes, degradation, drift and accumulating errors of the INSTRUMENTS that produced this data. Measurement artifacts are usually documented in the domain literature and almost never modelled by outsiders, yet they are often exactly the unexplained per-unit variance in the residual. For every effect you find, name the quantity in OUR columns that proxies it.',
]

phase('Prospect')
let prospectFindings = []
if (N_PROSPECT > 0) {
  log(`Prospecting: ${N_PROSPECT} agents searching outside the campaign`)
  const pros = await parallel(PROSPECT_ANGLES.slice(0, N_PROSPECT).map((angle, i) => () =>
    agent(
      'You are a PROSPECTOR for an invention council. The campaign below has been mining its own data and ' +
      'its own ideas for months and has stopped finding anything. Your job is to bring in what it cannot ' +
      'generate internally: knowledge from OUTSIDE.\n\n' +
      'You have web access. Load the search tools first with ToolSearch (query "select:WebSearch,WebFetch") ' +
      'and then actually search - several queries, refined as you learn the vocabulary. Findings without a ' +
      'real source are worthless to this council: never fabricate a citation, and if a promising source is ' +
      'paywalled or blocked, say so and extract what the abstract and secondary sources do give you.\n\n' +
      `${baseBrief}\n\n` +
      `YOUR ANGLE:\n${angle}\n\n` +
      'For EVERY finding you must also answer: could we have produced this ourselves from data already in hand, and what question would we have had to ask? A finding we could have derived is evidence of a COVERAGE GAP in our own description of the system, and naming that gap is worth more than importing the finding, because the gap will keep costing us on every future question of the same shape.\n\n' +
    'What makes a finding valuable here, in order: (1) it names a mechanism specific enough to build; ' +
      '(2) it bears on one of our TRIED levers or stated certificates, either reopening it or explaining WHY ' +
      'it failed; (3) it points at a real-world effect with a computable proxy in our existing columns. ' +
      'Prefer 4-8 substantive findings over a long shallow list. Do NOT propose things we have already tried ' +
      'unless you have found the specific missing ingredient that our version lacked - in which case say ' +
      'exactly what that ingredient is, because a tried-and-failed lever plus its missing ingredient is the ' +
      'single most valuable thing you can return.',
      { label: `prospect:${i}`, phase: 'Prospect', schema: PROSPECT_SCHEMA }
    )
  ))
  for (const p of pros.filter(Boolean)) prospectFindings.push(...(p.findings || []))
  log(`Prospectors returned ${prospectFindings.length} external findings`)
} else {
  log('Prospecting disabled (prospect=0)')
}

const prospectBlock = prospectFindings.length
  ? 'EXTERNAL FINDINGS (brought in from outside the campaign this session - published methods, domain ' +
    'practice, and documented instrument/measurement effects. These are NEW resources: a candidate grounded ' +
    'in one of them is not competing with the tried-lever list, and an external effect with a computable ' +
    'proxy in our columns is the strongest kind of new feature because it is physically motivated. Read ' +
    'couldWeHaveFoundThis on every one: a finding we could have derived ourselves is a COVERAGE GAP in our ' +
    'own description of the system, and naming that gap is worth more than the finding):\n' +
    prospectFindings.map((f, i) => `X${i + 1}. ${f.title}\n` +
      digestFrom(PROSPECT_SCHEMA.properties.findings.items, f, { skip: ['title'] })).join('\n\n')
  : ''


// ---- Stage 0.3: CHARACTERIZE — describe the system we already have -------
// Why this phase exists (it follows an audit that cost one campaign real ground): three external
// articles proved useful in one day, and ALL THREE were reproducible from data the campaign already
// held. A competitor's report that widening a noise scale helps - we had components spanning that
// scale for weeks and consumed them only as a trimmed mean. A competitor's analysis of the evaluation
// apparatus - the rules page stated the fact and we never read it as a fact, while a whole phase built
// an instrument on the opposite assumption. A competitor's observation that six models converge on the
// same wrong answer - we had per-unit predictions for nine decorrelated components and never crossed
// agreement against error. The data and the tools were present; the QUESTION was absent, because no
// phase of this workflow is charged with DESCRIBING the system rather than proposing mechanisms for it.
// Scout answers questions. CHARACTERIZE generates them. Its success criterion is surfacing something
// nobody asked for.
const CHARACTERIZE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    componentAtlas: { type: 'string', description: 'For EVERY component/leg/member/model the pipeline already contains: not its aggregate score but its behaviour ACROSS THE ERROR DISTRIBUTION. NAME THE AXIS EXPLICITLY, because the default is wrong: report per-component TAIL statistics (worst unit, worst decile, count above a large-error threshold) and NOT only the pooled statistic the campaign already optimises - a component can be worse on average and dramatically better in the tail, which is invisible in a ranking by pooled score. Also TREAT COMPONENT NAME SUFFIXES AS A DESIGNED PARAMETER GRID (a suffix like _a30 or _b008 is a parameter setting, not an opaque label): separate each parameter\'s effect by averaging over the others, because two jittered parameters are rarely equivalent and usually only one of them governs the tail. Name any component whose individual behaviour has never been examined because it is consumed only inside an aggregate, and quantify what the aggregator actually does to it (a trimmed mean, a vote or a blend does NOT give members equal effective weight - measure the realised weights).' },
    consensusMap: { type: 'string', description: 'Where do the components AGREE, and is agreement associated with being RIGHT? Cross agreement-tightness against error explicitly. NAME THE SIGN, because description defaults to the flattering reading: you must EXHIBIT THE POPULATION WHERE AGREEMENT IS HIGH AND ERROR IS ALSO HIGH, or state explicitly that you looked and none exists. Do not report a monotone "disagreement predicts difficulty" gradient and stop there - that is the comfortable half of the table and it licenses using consensus as a router, which is exactly the error a tight-and-jointly-wrong population would refute. A high-agreement high-error cohort is a STRUCTURED DECOY: consensus is not evidence there, and any confidence or routing statistic built on agreement will invert on it.' },
    apparatusSpec: { type: 'string', description: 'THE SCORING APPARATUS IS PART OF THE SYSTEM - describing "the system" means the model AND the thing that measures it, and the second is the one everyone skips. As DOCUMENTED rather than assumed: what is FIXED versus RESAMPLED between submissions (a fixed evaluation subset makes comparisons on it PAIRED and removes sampling noise, which changes every conclusion drawn from it), how large each split is, the metric\'s unit of aggregation, and the instrument\'s own REPEATABILITY. Read the primary documentation - rules, evaluation and overview pages - as a source. A FAILED PAGE FETCH IS NOT PERMISSION TO DROP THE QUESTION: retry, use another route, or state precisely what remains unverified and what it would change. Separate MEASURED from ASSUMED and flag every load-bearing belief about the apparatus that rests on assumption; instruments have been built on the exact opposite of what the documentation says. If repeatability has never been measured, say so and name the cheapest experiment that would measure it.' },
    unaskedQuestions: { type: 'string', description: 'The deliverable that matters: 3-6 questions about this system that nobody has asked, that are answerable with data already in hand, and that you did not answer here. These become the next round\'s agenda. A characterization that generates no new questions has failed.' },
    surprises: { type: 'string', description: 'Anything you found that contradicts a stated belief in the problem statement or the tried-lever list, with the number that contradicts it.' },
  },
  required: ['componentAtlas', 'consensusMap', 'apparatusSpec', 'unaskedQuestions', 'surprises'],
}

phase('Characterize')
let characterization = ''
if (dataAccess && N_CHARACTERIZE > 0) {
  log('Characterizing: describing the system we already have, before proposing anything')
  const ch = await parallel(Array.from({ length: N_CHARACTERIZE }, (_, i) => () =>
    agent(
      'You are a CHARACTERIZER. Your job is NOT to invent, test, or fix anything. It is to DESCRIBE the ' +
      'system that already exists, in enough detail and with enough numbers that a reader finds things in ' +
      'your description that you did not point out. Think of the descriptive paper a field writes about an ' +
      'object before anyone proposes a mechanism for it.\n\n' +
      'This phase exists because of a measured failure. In one day, three external articles proved useful ' +
      'to this campaign and ALL THREE were reproducible from data the campaign already held: a component ' +
      'atlas it never built because it consumed its components only as an average; an analysis of the ' +
      'evaluation apparatus it never read even though the rules stated the key fact; and an ' +
      'agreement-versus-error cross-tabulation over nine components whose per-unit predictions were ' +
      'already on disk. The data and the tools were present. The QUESTION was absent. You are the fix.\n\n' +
      (i === 0 ? 'YOUR EMPHASIS: the COMPONENT ATLAS and the CONSENSUS MAP. Open up every aggregate. If ' +
        'something is consumed as a mean, a trimmed mean, a vote or a blend, examine its members ' +
        'individually across the error distribution and report where each one wins and loses.\n\n'
        : 'YOUR EMPHASIS: the APPARATUS SPEC. Read the competition/evaluation documentation as a primary ' +
        'source and establish, as documented fact, what is fixed and what is resampled, the size of each ' +
        'split, the metric\'s unit, and the instrument\'s repeatability. Then list every belief the ' +
        'campaign holds about the apparatus that rests on assumption rather than documentation. A whole ' +
        'phase of this workflow was once built on an unverified premise about how scoring works.\n\n') +
      `${baseBrief}\n\n` + (prospectBlock ? prospectBlock + '\n\n' : '') +
      `DATA ACCESS:\n${dataAccess}\n\n` +
      'THREE FAILURE MODES THIS PHASE WAS MEASURED TO HAVE, each of which needs deliberate effort against:\n' +
      '  (i) DESCRIBERS GO TO THE BIGGEST PILE OF ALREADY-MATERIALISED NUMBERS, exhaust it with real rigour, ' +
      'and stop exactly at its boundary. Anything needing a different data source is invisible. Budget ' +
      'explicit effort OUTSIDE the arrays.\n' +
      '  (ii) THE AXIS DEFAULTS TO WHATEVER THE CAMPAIGN ALREADY OPTIMISES. If it optimises a pooled score, ' +
      'you will rank things by pooled score and miss the tail. Choose the axis deliberately and justify it.\n' +
      '  (iii) THE SIGN DEFAULTS TO FLATTERING. Given a table with a comfortable reading and an ' +
      'uncomfortable one, description reliably reports the comfortable one. Description carries no ' +
      'adversarial pressure of its own, so supply it: for every favourable pattern you report, look for the ' +
      'cohort that would refute it and report that too.\n\n' +
      'Rules: write NEW scratch scripts only; ~20 minutes of compute; every claim carries its number; ' +
      'separate MEASURED from ASSUMED everywhere; and end with the unasked questions, which are the real ' +
      'output. Do not propose solutions - that is a later phase and proposing here will crowd out ' +
      'description, which is the failure mode this phase was created to prevent.',
      { label: `character:${i}`, phase: 'Characterize', schema: CHARACTERIZE_SCHEMA }
    )
  ))
  const parts = ch.filter(Boolean)
  if (parts.length) {
    characterization = 'SYSTEM CHARACTERIZATION (measured this session, BEFORE any candidate was proposed):\n' +
      parts.map((c, i) => `--- characterizer ${i} ---\nCOMPONENT ATLAS: ${c.componentAtlas}\n` +
        `CONSENSUS MAP: ${c.consensusMap}\nAPPARATUS: ${c.apparatusSpec}\n` +
        `SURPRISES: ${c.surprises}\nUNASKED QUESTIONS: ${c.unaskedQuestions}`).join('\n\n')
    log(`Characterization complete from ${parts.length} agents`)
  }
} else {
  log('Characterize phase skipped')
}

// ---- Stage 0: scouts measure fresh facts ---------------------------------
const SCOUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    facts: {
      type: 'array', minItems: 1,
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          fact: { type: 'string', description: 'One measured fact, stated with its number(s)' },
          howMeasured: { type: 'string', description: 'Script/one-liner + data used, enough to reproduce' },
          inventionHook: { type: 'string', description: 'Why an inventor might care (what it enables or rules out)' },
        },
        required: ['fact', 'howMeasured', 'inventionHook'],
      },
    },
    ledgerLessons: { type: 'string', description: 'Meta-lessons found in the ledger relevant to this run; empty string if none/unread' },
  },
  required: ['facts', 'ledgerLessons'],
}

const SCOUT_ANGLES = [
  'AUDIT THE DEPLOYED ARTIFACT\'S OWN DECISIONS. Enumerate every DISCRETE decision the current best method makes internally - gates, thresholds, clips, drops, keep/discard rules, fallbacks, tie-breaks, hard-coded constants, trimmed/robust aggregations. For each, measure (a) how often it FIRES, (b) how often it fires in the WRONG direction (i.e. the discarded branch was better), and (c) the ORACLE value of getting that one decision right. Every such rule is a binary classifier with TWO error types; report both. This angle has historically been the single most productive one in this workflow: a shipped mechanism came from noticing that a deployed gate discarded a good branch on 20 of the 56 cases where it fired. Do not propose fixes; just produce the audit table with numbers.',
  'VERIFY: pick the 2-3 most load-bearing NUMBERS in the problem statement / plateau evidence and recompute them from the data. Report agreement or discrepancy. A discrepancy is gold: it reopens whatever the wrong number closed.',
  'RESIDUAL STRUCTURE: measure what structure remains in the current best method\'s residuals (autocorrelation, per-group bias, heteroscedasticity, alignment with any available covariate). Numbers, not impressions.',
  'POPULATION FACTS: measure distributional facts across the dataset that the resource inventory does not mention (cohort splits, bimodalities, covariate ranges, missing-data structure, cross-instance sharing). Hunt for anything nobody has looked at.',
  'THE TAIL: identify the worst-cohort instances under the current best, and measure what they SHARE (covariates, data quality, geometry). The tail carries the metric; a common cause is a lever.',
  'INVARIANTS: measure which transformations/symmetries actually hold in the data (claimed physics identities, frame relations, conservation laws in the labels). Verify one claimed identity exactly and hunt for one unclaimed one.',
  'CHEAP ORACLES: compute 2-3 oracle bounds nobody has computed (what would X-knowledge be worth?) to locate where headroom actually lives. Each oracle must be scored on real data.',
  'NOISE FLOOR OF THE DECISION RULE ITSELF. The council keeps arguing over effect sizes without knowing the metric\'s own resolution, so measure it: (a) the EFFECTIVE sample size (autocorrelation / Bartlett dof per unit, not raw row count); (b) the two noise axes SEPARATELY - re-seeded partition noise (how much does a fold-honest number move when the CV partition is re-drawn? this moves only fitted parameters) versus unit-bootstrap noise (how much does it move when you resample which units are scored?); and (c) CALIBRATE against a channel that ALREADY SHIPPED and held up downstream - compute P(marginal > bar) for that known-good channel and for the current best candidate cell. Without (c) any "too small to detect" claim is unfalsifiable. Report the bar that a candidate must clear to be distinguishable from the shipped channel.',
]

phase('Scout')
let scoutFacts = []
let ledgerNotes = ''
if (dataAccess && N_SCOUTS > 0) {
  log(`Scouting: ${N_SCOUTS} agents measuring fresh facts from the data`)
  const scouted = await parallel(SCOUT_ANGLES.slice(0, N_SCOUTS).map((angle, i) => () =>
    agent(
      'You are a SCOUT for an invention council. Your job is to MEASURE, with real code on the real data, ' +
      'facts that inventors can build on. Opinions and recollections do not count; every fact needs a number ' +
      'you computed in this session.\n\n' +
      `${baseBrief}\n\n` + (prospectBlock ? prospectBlock + '\n\n' : '') +
      `DATA ACCESS (how to reach data and compute):\n${dataAccess}\n\n` +
      `YOUR ANGLE:\n${angle}\n\n` +
      (i === 0 ? `Also: read the ledger at ${LEDGER} if it exists and extract lessons relevant to this run.\n\n` : '') +
      'Rules: write NEW scratch scripts only (never modify existing files); keep total compute under ~10 minutes ' +
      '(subsample if needed and say so); 3-6 facts; each fact = number + how measured + invention hook. ' +
      'If the data is unreachable, return one fact stating exactly what failed.',
      { label: `scout:${i}`, phase: 'Scout', schema: SCOUT_SCHEMA }
    )
  ))
  for (const s of scouted.filter(Boolean)) {
    scoutFacts.push(...(s.facts || []))
    if (s.ledgerLessons) ledgerNotes += s.ledgerLessons + '\n'
  }
  log(`Scouts returned ${scoutFacts.length} measured facts`)
} else {
  log(dataAccess ? 'Scouting disabled (scouts=0)' : 'No dataAccess given: skipping Scout phase (ideas-only degradation)')
}

const factsBlock = scoutFacts.length
  ? 'FRESH MEASURED FACTS (from scouts, this session; trust these over stale claims):\n' +
    scoutFacts.map((f, i) => `F${i + 1}. ${f.fact}\n` +
      digestFrom(SCOUT_SCHEMA.properties.facts.items, f, { skip: ['fact'] })).join('\n')
  : ''
const ledgerBlock = ledgerNotes.trim() ? `LEDGER NOTES (from previous runs):\n${ledgerNotes.trim()}` : ''
let BRIEF_BLOCK = [baseBrief, FRONTIER_BLOCK, prospectBlock, characterization, factsBlock, ledgerBlock].filter(Boolean).join('\n\n')

// ---- Stage 0.5: replicate documented external methods ---------------------
const REPLICATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['REPLICATED_GREEN', 'REPLICATED_WEAK', 'NOT_REPRODUCED', 'BLOCKED', 'CODE_PARITY_PASS', 'CODE_PARITY_FAIL'], description: 'CODE_PARITY_PASS = our code reproduces the reference stage output with the reference weights and tables (state the agreement); the rung is built and the remaining gap is weights or data, ready for its gate on the real instrument. CODE_PARITY_FAIL = our code does not reproduce the reference stage yet: a BUILD DEFECT, say where the first divergence is; never a verdict on the mechanism. REPLICATED_GREEN = built AND passes the stated gate; REPLICATED_WEAK = built, works as described, but misses the gate (report by how much); NOT_REPRODUCED = built faithfully but the claimed behavior does not appear on this data; BLOCKED = could not build a faithful version (say exactly what is missing)' },
    measured: { type: 'string', description: 'Every key number: standalone score, gate line (every component of the stated gate, for example the pooled delta and the worst-cohort statistic), and the comparison to the recipe\'s expected score' },
    implementation: { type: 'string', description: 'What you built (script paths, params chosen, deviations from the recipe and why)' },
    nextKnob: { type: 'string', description: 'The single highest-value untested knob left in this recipe; empty string if exhausted' },
    mechanism: { type: 'string', description: 'One sentence: what this method assumes about the target that makes it work, and whether what you saw is consistent with it' },
    parity: { type: 'string', description: 'CODE PARITY against the reference stage (reference weights inside our code): inputs compared, agreement, first divergence. Then WEIGHTS / DATA PARITY with our own weights: list agreement and what the difference names as the next job. Empty string when no reference was available' },
  },
  required: ['verdict', 'measured', 'implementation', 'nextKnob'],
}

phase('Replicate')
let replicated = []
if (REPL.length && dataAccess) {
  log(`Replicating ${REPL.length} documented external method(s)` + (LADDER ? ` | frontier gate tripped (gap ${FR_G} > 2 x largest lever ${FR_L}): two tracks, replication beside beyond-the-frontier research` : ''))
  replicated = (await parallel(REPL.map((t, i) => () =>
    agent(
      'You are a REPLICATOR for an invention council. A method documented by another team reportedly ' +
      'achieves a score far beyond the current best here. Your job: implement it FAITHFULLY on the real ' +
      'data and measure whether the claimed behavior appears. You are not inventing; deviations from the ' +
      'recipe must be forced by the data and documented. A sloppy build is worthless - sanity-check ' +
      'components as you go (planted synthetics, limiting cases where the answer is known).\n' +
      'PARITY BEFORE ANY SCORE: when a reference implementation or its stage output is available, first ' +
      'show CODE PARITY: the reference weights and tables inside OUR code reproduce the reference stage output ' +
      'on the same inputs (no labels and no representative population are needed for this). Until that passes ' +
      'the method is not built, and a low score is a BUILD DEFECT to bisect against the reference, never a ' +
      'verdict on the method. After code parity, swap in our own weights or tables: the list agreement and the ' +
      'score difference measure what our weights cost and name the next job. State the mechanism in one ' +
      'sentence (what the method assumes about the target); do not copy a constant or rule you cannot explain.\n\n' +
      `${BRIEF_BLOCK}\n\n` +
      `DATA ACCESS:\n${dataAccess}\n\n` +
      `RECIPE TO REPLICATE: ${t.name}\n${t.recipe}\n\n` +
      `MECHANISM (as stated by the host; correct it if the code says otherwise): ${t.mechanism || '(not stated: state it yourself)'}\n` +
      `REFERENCE FOR PARITY: ${t.reference || FR_REFERENCE || '(none given: say what would be needed to produce one)'}\n` +
      `EXPECTED (as reported by the original): ${t.expected || '(not stated)'}\n` +
      `PASS GATE: ${t.gate || 'the standing ship gates in the problem statement'}\n\n` +
      `Rules: write NEW scripts only (prefix repl_); never modify existing files; stay within ~${REPL_MINUTES} minutes ` +
      'of compute total (subsample or reduce sweep width if needed and say so); measure the final result ' +
      'against the PASS GATE and report the full gate line; end with the single highest-value untested knob.',
      { label: `repl:${t.name.slice(0, 24)}`, phase: 'Replicate', schema: REPLICATE_SCHEMA }
    ).then((r) => (r && r.verdict) ? { name: t.name, expected: t.expected || '', ...r } : null)
  ))).filter(Boolean)
  for (const r of replicated) log(`repl ${r.name}: ${r.verdict} - ${(r.measured || '').slice(0, 140)}`)
} else {
  log(REPL.length ? 'Replication targets given but no dataAccess: skipping Replicate' : 'No replication targets')
}


// ---- Stage 0.7: REFUTE our own impossibility certificates -----------------
// Why this phase exists: the single biggest win in this workflow's history came from discovering
// that a "family closed" certificate was IMPLEMENTATION-limited, not signal-limited (ledger L11).
// A certificate built from our own channels is outranked by any external existence proof (L10).
// So: point adversarial agents at OUR OWN strongest closure claims, with the frontier gap as the lever.
const REFUTE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['CERTIFICATE_BROKEN', 'CERTIFICATE_HOLDS', 'CERTIFICATE_NARROWED', 'INCONCLUSIVE'], description: 'CERTIFICATE_BROKEN = you produced a measurement contradicting the claim; CERTIFICATE_HOLDS = the claim survived your strongest attack; CERTIFICATE_NARROWED = the claim is true only under a condition it did not state (give the condition - this is the most common and most useful outcome); INCONCLUSIVE = could not test in budget' },
    measured: { type: 'string', description: 'The numbers. If NARROWED or BROKEN, the exact scope where the claim fails and what becomes reachable there' },
    hiddenAssumption: { type: 'string', description: 'The unstated assumption the certificate rests on (measurement proxy, implementation choice, aggregation level, population). Empty string if none found' },
    reopenedLever: { type: 'string', description: 'If the certificate broke or narrowed: the concrete buildable lever that is now back in play, with its cheapest first test. Empty string otherwise' },
  },
  required: ['verdict', 'measured', 'hiddenAssumption', 'reopenedLever'],
}

phase('Refute')
let refuted = []
if (CERTS.length && dataAccess) {
  log(`Refuting ${CERTS.length} of our own impossibility certificate(s)`)
  refuted = (await parallel(CERTS.map((ct, i) => () =>
    agent(
      'You are a CERTIFICATE BREAKER. This campaign has stopped work on a whole family of approaches on ' +
      'the strength of an impossibility claim it measured itself. Your job is to ATTACK that claim and try ' +
      'to break it with real code on real data. You are not looking for reasons it is right.\n\n' +
      'Why you exist: the largest single win in this workflow\'s history came from discovering that a ' +
      '"this family floors out, it is closed" certificate was drawn from an implementation missing two knobs ' +
      '- the signal was there all along. A certificate assembled from our own channels is evidence about OUR ' +
      'CHANNELS, not about the problem. When an external party demonstrably achieved what the certificate ' +
      'says is impossible, the certificate is wrong somewhere and your job is to find where.\n\n' +
      `${BRIEF_BLOCK}\n\n` +
      `DATA ACCESS:\n${dataAccess}\n\n` +
      `THE CERTIFICATE TO ATTACK: ${ct.claim}\n` +
      `ITS STATED EVIDENCE: ${ct.evidence || '(not stated)'}\n` +
      `THE CONTRADICTING EXISTENCE PROOF: ${ct.frontierContradiction || '(none given - then attack the claim on its own internal logic)'}\n\n` +
      'Attack in this order, and STOP at the first thing that yields:\n' +
      '  1. THE PROXY. What quantity did the certificate actually measure, and is it the quantity that matters? ' +
      'Most false certificates measure a proxy (an SNR, a correlation, a standalone score, an aggregate) and ' +
      'conclude about a different thing (deployability inside a stack). Re-measure the thing that matters.\n' +
      '  2. THE AGGREGATION LEVEL. A signal absent in the pooled statistic can be strong in a subpopulation, ' +
      'at a different scale, or on a different unit of analysis. Test at least one other level.\n' +
      '  3. THE IMPLEMENTATION. If the certificate came from a build that scored far from what the external ' +
      'party reports for the SAME method, the build is the wall, not the signal. Find the missing knob.\n' +
      '  4. THE POPULATION. Was it measured on a population that generalizes to where it is applied?\n' +
      'Rules: write NEW scripts only (prefix refute_); never modify existing files; ~30 minutes of compute; ' +
      'every claim gets a null baseline; plant a synthetic positive to prove your test CAN detect the thing ' +
      'before you report that it cannot. CERTIFICATE_NARROWED with a named condition is a valuable result - ' +
      'most certificates are true in a narrower scope than they claim.',
      { label: `refute:${(ct.claim || '').slice(0, 24)}`, phase: 'Refute', schema: REFUTE_SCHEMA }
    ).then((r) => (r && r.verdict) ? { claim: ct.claim, ...r } : null)
  ))).filter(Boolean)
  for (const r of refuted) log(`refute ${(r.claim || '').slice(0, 40)}: ${r.verdict} - ${(r.measured || '').slice(0, 120)}`)
} else {
  log(CERTS.length ? 'Certificates given but no dataAccess: skipping Refute' : 'No certificates to refute')
}

const refuteBlock = refuted.length
  ? 'CERTIFICATE ATTACKS RUN THIS SESSION (a BROKEN or NARROWED certificate reopens a family - candidates ' +
    'exploiting a reopened lever get full novelty credit even if they overlap a "tried" entry):\n' +
    refuted.map((r) => `- [${r.verdict}] ${r.claim}\n    measured: ${r.measured}\n    hidden assumption: ${r.hiddenAssumption || '(none found)'}\n    reopened: ${r.reopenedLever || '(nothing)'}`).join('\n')
  : ''
if (refuteBlock) BRIEF_BLOCK += '\n\n' + refuteBlock

// ---- Stage 0.8: ASSEMBLE confirmed structures into model classes ----------
// Why this phase exists: a campaign held four
// verified residual structures for weeks (a per-unit constant offset carrying most of the MSE, strong
// within-unit residual autocorrelation, period-aliased error clusters, documented step
// discontinuities) and NO phase ever asked what single model class contains all of them - the
// frontier teams shipped exactly that class. Generators propose per-structure candidates;
// ASSEMBLE owns the composition question. An assembled class is tested at its ORACLE, never by
// a first legal build: the same campaign twice recorded a method class dead on a first build
// later shown to sit far from a faithful one.
const ASSEMBLE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'Short handle for the model class' },
    structuresContained: { type: 'string', description: 'The completeness map, one line per CONFIRMED structure found in the problem statement, plateau evidence, characterization and scout facts: structure -> the named latent/component of this class that carries it, OR an explicit exclusion with a measured reason. A class that silently drops a confirmed structure is not an assembly.' },
    generativeStory: { type: 'string', description: 'How the observed data is produced from the latents, stated specifically enough that the estimator follows from it: the state space, what varies per unit vs globally, the observation model, the noise family, where jumps/regimes live' },
    inferenceScheme: { type: 'string', description: 'The decode/fit that inverts the story (lattice/DP decode, particle filter, EM, hierarchical partial pooling, ...) and which existing pipeline assets it reuses as components' },
    oracleSpec: { type: 'string', description: 'THE FIRST AND ONLY PRE-NURSERY BUILD IS THE ORACLE, not the method: exactly which latents get truth-peeked, everything that stays legal and held fixed, the score the oracle must reach to prove headroom against the stated bar, and the realized fraction comparable channels have achieved (so oracle x fraction is the class\'s best case)' },
    nurseryPlan: { type: 'string', description: 'The build loop that runs AFTER the oracle survives: the first 3 diagnostics, the single named component each early iteration varies, and the iteration budget (default 6) - every iteration evaluated against the ORACLE GAP, never the incumbent delta and never a flat baseline' },
    closestKnownMethod: { type: 'string', description: 'The nearest documented external method and the concrete delta from it. If the delta is essentially empty, say so - the class then belongs in replicationTargets, which is cheaper than invention' },
    expectedFailureMode: { type: 'string', description: 'The most likely way the ORACLE test fails and what that failure would localize' },
    selfMeasured: { type: 'string', description: 'Numbers you ACTUALLY measured this session bearing on the class (script + result), or empty string. Never report a number you did not compute.' },
  },
  required: ['name', 'structuresContained', 'generativeStory', 'inferenceScheme', 'oracleSpec', 'nurseryPlan', 'closestKnownMethod', 'expectedFailureMode', 'selfMeasured'],
}

phase('Assemble')
let assembled = []
if (N_ASSEMBLE > 0) {
  log(`Assembling: ${N_ASSEMBLE} agents composing confirmed structures into model classes`)
  assembled = (await parallel(Array.from({ length: N_ASSEMBLE }, (_, i) => () =>
    agent(
      'You are an ASSEMBLER for an invention council. Every other generator proposes one candidate per ' +
      'structure or per operator family; you own the question none of them ask: WHAT SINGLE MODEL CLASS ' +
      'CONTAINS ALL CONFIRMED STRUCTURES AT ONCE?\n\n' +
      'Why you exist: a campaign held four verified residual structures for weeks (a per-unit constant ' +
      'offset carrying most of the MSE, strong within-unit residual autocorrelation, period-aliased error ' +
      'clusters, and documented step discontinuities) and no phase ever composed them. Each structure got ' +
      'its own corrector candidate; the correctors died one-shot deaths; and the model class that contains ' +
      'all four as named latents - the one the frontier teams shipped - was never written down internally ' +
      'even though every ingredient was in the findings. Composition is a distinct act from generation, ' +
      'and you are it.\n\n' +
      `${BRIEF_BLOCK}\n\n` +
      (dataAccess ? `DATA ACCESS (for cheap grounding measurements only, ~5 min each, new scratch scripts ` +
        `only, never modify existing files):\n${dataAccess}\n\n` : '') +
      'YOUR PROCEDURE:\n' +
      '1. ENUMERATE every confirmed structure: comb the problem statement, plateau evidence, ' +
      'characterization, scout facts and refutation results for measured structural facts about the ' +
      'residual/error process (per-unit offsets, autocorrelation, regime/segment behavior, aliasing, ' +
      'discontinuities, heteroscedasticity, cross-unit sharing). List them with their numbers.\n' +
      '2. MECHANIZE each: the latent or process that would produce it in a generative account.\n' +
      '3. COMPOSE the single model class containing all of them, and write the completeness map ' +
      '(structuresContained): every structure -> its carrier component, or an explicit measured reason to ' +
      'exclude it. Silent drops disqualify the assembly.\n' +
      '4. SPECIFY THE ORACLE: the truth-peeking variant that is the class\'s first and only pre-nursery ' +
      'build. State what score it must reach to prove headroom, and the best case as oracle x the realized ' +
      'fraction comparable channels achieved.\n' +
      '5. WRITE THE NURSERY PLAN: the budgeted build loop for after the oracle survives (single-change ' +
      'iterations, evaluated against the oracle gap, default budget 6).\n' +
      '6. NAME THE CLOSEST KNOWN METHOD and your delta from it. An assembly with no delta is a ' +
      'replication target, which is cheaper - say so honestly.\n\n' +
      (i === 0
        ? 'YOUR EMPHASIS: the MINIMAL class - the fewest latents that cover every confirmed structure. ' +
          'Prefer standard, well-understood components; novelty lives in the composition, not the parts.\n'
        : 'YOUR EMPHASIS: the class whose latents are the PHYSICAL/GENERATIVE quantities of the domain ' +
          '(the thing that actually produced the observations), even where that means implementing an ' +
          'inference procedure from scratch. Existing code may be REUSED to implement an inference step ' +
          'over your own latents; it may never SUPPLY the latents.\n') +
      '\nDo not propose per-structure correctors; that is the generators\' job. One composed class, ' +
      'fully specified.\n\n' +
      'THE ONE WAY THIS PHASE FAILS, measured on its first live run, so read it before you write ' +
      'anything: the assembler composed the CAMPAIGN\'S OWN PIPELINE OUTPUTS instead of the data. Its ' +
      'latent was "which of our existing candidate predictions is best for this unit", its hypothesis pool ' +
      'was the current ensemble\'s members and legs, and its oracle therefore measured how much is left ' +
      'in RE-RANKING our own artifacts (a negative gain, below its own random null) rather than anything about ' +
      'a model class. A re-ranker, router, gate, selector, weighter or corrector over existing ' +
      'predictions IS NOT AN ASSEMBLY, however many structures it names.\n' +
      'THE TEST YOUR CLASS MUST PASS, and state your answer to it explicitly in generativeStory: ' +
      'COULD THIS CLASS BE FITTED AND DECODED IF EVERY CURRENT MODEL, LEG, ENSEMBLE MEMBER AND OOF ' +
      'ARRAY WERE DELETED, LEAVING ONLY THE RAW DATA? If no, you have built a wrapper around the ' +
      'incumbent; start over. Your latents must be quantities of the DATA-GENERATING PROCESS (the ' +
      'physical state, its per-unit calibration, its dynamics, the observation model and its noise), ' +
      'not quantities of our pipeline. The incumbent is a BASELINE TO BEAT, never a component to route ' +
      'over, and its score is not your reference frame - your reference is your own oracle.',
      { label: `assemble:${i}`, phase: 'Assemble', schema: ASSEMBLE_SCHEMA }
    )
  ))).filter(Boolean)
  for (const a of assembled) log(`assembled: ${a.name} - closest known: ${(a.closestKnownMethod || '').slice(0, 100)}`)
} else {
  log('Assemble phase disabled (assemble=0)')
}

// Assembled classes join the candidate pool so the Rank phase orders them with the generated candidates,
// but they keep their full assembly record for the Enable engineer and the chairman.
const assembledAsCandidates = assembled.map((a) => ({
  name: a.name,
  mechanism: `Assembled model class. ${String(a.generativeStory || '').slice(0, 400)}`,
  operator: 'assembly',
  loadBearingPremise: `ORACLE HEADROOM: ${a.oracleSpec}`,
  firstTest: 'Build the ORACLE variant exactly per the oracle spec (truth-peeked latents, everything else legal and held) and score it against the bar. Do NOT build the legal method.',
  expectedFailureMode: a.expectedFailureMode,
  selfMeasured: a.selfMeasured || '',
  family: 'assembly',
  assembly: a,
}))

// ---- Stage 1: generate (one agent per family) ----------------------------
const FAMILIES = [
  { key: 'separation', title: 'Contradiction resolvers (separation principles)',
    charter: 'Extract the physical contradiction (X must be P and not-P) behind the plateau, then resolve it by separation: in time (curriculum, annealing, staged decode), in space (mixtures, per-regime models, gating), between scales (members may overfit while the ensemble is shrunk; hierarchical pooling), upon condition (gated features, fallback ladders), or by phase change (reparameterize the object so the contradiction dissolves).' },
  { key: 'assumptions', title: 'Assumption excavation',
    charter: 'List the axioms the current approach never chose consciously (i.i.d., stationarity, noise model, loss form, "CV mirrors test", "one model per task"). Propose candidates that DELETE one hidden assumption while keeping both sides of any apparent trade-off. Also: promote a stubborn anomaly to a postulate and rebuild around it.' },
  { key: 'resources', title: 'Resource operators',
    charter: 'Mobilize unused resources: turn harm into asset (noise as augmentation, failures as a corrector training set), self-service supervision (self-distillation, pseudo-labels, transduction on test structure), cheap disposables (zoos, bagging), prior action (pretraining, amortization), mediator representations for domains that refuse to align, and the metric itself as exploitable structure.' },
  { key: 'representation', title: 'Representation and symmetry',
    charter: 'Change the space until the problem is flat: new domains (log/spectral/rank/residual/dual), enforce or deliberately break task invariances, dimensional-analysis screening of features, continuous/discrete flips (soft relaxation to get gradients, quantization to unlock exact search), and inversion (forward-model plus scoring instead of direct regression).' },
  { key: 'ideality', title: 'Ideality and trimming',
    charter: 'Raise ideality = benefits/(costs+harms). Trim: delete a component and let an existing resource absorb its function; suspect every stage justified by pipeline habit. Design backwards from the Ideal Final Result ("the answer computes itself"); find the representation where the hard step becomes identity.' },
  { key: 'evolution', title: 'Evolution lines',
    charter: 'Locate the current method on each evolution line and propose the next node: mono->bi->poly (model->ensemble->structured committee), rigid->segmented->fluid (fixed->modular->learned structure), macro->micro (whole-signal->element-level credit), static->feedback->self-tuning, rhythm coordination (align the time-scales of data, update, evaluation).' },
  { key: 'transplant', title: 'Cross-domain transplant',
    charter: 'Restate the problem as a type signature with no domain nouns, name 3+ fields that own that signature (computational-biology alignment, speech decoding, OR flows, physics minimum-action, econometric state-space), and transplant the strongest foreign decomposition: its state, its recursion, its slack variables.' },
]

const CANDIDATES_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    candidates: {
      type: 'array',
      minItems: 1,
      description: 'Candidate inventions from this operator family only',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string', description: 'Short handle for the candidate' },
          mechanism: { type: 'string', description: 'One sentence: WHY this can work (the causal mechanism)' },
          operator: { type: 'string', description: 'Which operator of the family produced it' },
          loadBearingPremise: { type: 'string', description: 'THE quantitative premise that must be true, stated as a DEPLOYMENT-computable quantity with a threshold (e.g. "signal S computed from legal inputs correlates with target residual at r>=0.3")' },
          firstTest: { type: 'string', description: 'The cheapest test that measures the load-bearing premise alone (truth used for scoring only)' },
          expectedFailureMode: { type: 'string', description: 'The most likely way it fails, and what that failure would localize' },
          selfMeasured: { type: 'string', description: 'Numbers you ACTUALLY measured in this session that bear on the premise (script + result), or empty string. Never fabricate.' },
          testMinutes: { type: 'integer', minimum: 1, description: 'Honest wall-clock minutes for the FIRST TEST only. A test you cannot price is not designed yet.' },
          evaluationQueries: { type: 'integer', minimum: 0, description: 'How many comparisons the first test spends against the campaign evaluation set. 0 means the test reads only the deployed artifact, its own logs, or a population never used for selection. Zero-query tests are run FIRST and outside the top-K limit, because selection optimism is the campaign resource that cannot be refilled.' },
        },
        required: ['name', 'mechanism', 'operator', 'loadBearingPremise', 'firstTest', 'expectedFailureMode', 'selfMeasured'],
      },
    },
  },
  required: ['candidates'],
}

phase('Generate')
log(`Invention council: ${FAMILIES.length} families x ${PER_FAMILY} candidates, ${triedLevers.length} tried levers, ${scoutFacts.length} scout facts`)

const generated = PER_FAMILY === 0 ? [] : await parallel(FAMILIES.map((f) => () =>
  agent(
    'You are an inventor on a research council, working a stalled problem with ONE family of TRIZ-style operators.\n\n' +
    `${BRIEF_BLOCK}\n\n` +
    `YOUR FAMILY: ${f.title}\n${f.charter}\n\n` +
    `Produce exactly ${PER_FAMILY} candidate inventions using ONLY this family's operators. ` +
    'Each candidate must name its causal mechanism in one sentence ("this works because ..."), mobilize ' +
    'at least one resource or FRESH MEASURED FACT, state its load-bearing premise as a deployment-computable ' +
    'quantity with a threshold (lesson L1), and design a first test that isolates that premise (lesson L3). ' +
    'Do not re-propose anything from the ALREADY TRIED list. Candidates grounded in a scout fact outrank ' +
    'candidates grounded in the stale inventory.' +
    (dataAccess ? '\n\nDATA ACCESS (optional, for grounding only):\n' + dataAccess + '\n\nYou MAY run cheap ' +
      'measurements (each under ~5 min) to ground a premise before proposing it; report actually-computed ' +
      'numbers in selfMeasured (script + result). Never modify existing files; never fabricate a number. ' +
      'A cheap decisive test outranks an expensive one, and a test that spends nothing against the ' +
      'evaluation set outranks both: the campaign record shows its largest win came from a candidate ' +
      'ranked sixth of sixteen whose test was free.' : ''),
    { label: `gen:${f.key}`, phase: 'Generate', schema: CANDIDATES_SCHEMA }
  ).then((r) => r.candidates.slice(0, PER_FAMILY).map((c) => ({ ...c, family: f.key })))
))
// Barrier is deliberate: Stage 2 ranks the FULL pool, so the duplicate check sees a stable candidate set.

const genPool = generated.filter(Boolean).flat()
if (!genPool.length && PER_FAMILY > 0) throw new Error('invention-council: no candidates generated')
const pool = genPool.concat(assembledAsCandidates)
pool.forEach((c, i) => { c.id = `C${String(i + 1).padStart(2, '0')}` })

// ---- Stage 2: rank the pool ----------------------------------------------
// There is deliberately NO per-candidate judge panel. In an earlier design sixteen judges, about a
// third of the run's agents, produced a ranking the ledger records as inverted five times
// (LEDGER lessons 90, 92, 97, 100, 101), and on the run that mattered it put the campaign's largest
// efficiency win (a large runtime saving at a small metric cost) SIXTH of sixteen, below the top-K cut, so
// it was never tested. A forecast of survival is the thing these judges cannot do; what they could
// do, checking a candidate against the already-tried list, is a factual question and needs one
// agent, not one per candidate.
phase('Rank')
const DUP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    rulings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          conflictSeverity: { type: 'string', enum: ['none', 'reparameterization', 'adjacent', 'duplicate'], description: 'none = no overlap with a tried lever; reparameterization = overlaps one that was killed under an assumption a FRESH MEASURED FACT disproves, so it keeps full credit; adjacent = same family, different operator; duplicate = a plain re-run' },
          conflictNote: { type: 'string', description: 'Which tried lever it overlaps and how, in one line; empty string if none' },
        },
        required: ['id', 'conflictSeverity', 'conflictNote'],
      },
    },
  },
  required: ['rulings'],
}

let rulings = {}
if (pool.length) {
  const listing = pool.map((c) => `${c.id} [${c.family}] ${c.name}\n  mechanism: ${c.mechanism}\n  premise: ${c.loadBearingPremise}`).join('\n')
  const r = await agent(
    'You are checking a pool of candidate inventions against the list of levers this campaign has ' +
    'ALREADY TRIED. This is a factual comparison, not a forecast: do not estimate how likely anything ' +
    'is to work, and do not rank. For each candidate return only how it overlaps the tried list.\n\n' +
    `${BRIEF_BLOCK}\n\nCANDIDATES:\n${listing}\n\n` +
    'A candidate that duplicates or trivially varies a tried lever is a duplicate. One that overlaps a ' +
    'tried lever whose kill rested on an assumption a fresh measured fact disproves is a ' +
    'reparameterization and keeps full credit. Same family, different operator is adjacent.',
    { label: 'rank:duplicates', phase: 'Rank', schema: DUP_SCHEMA, ...JUDGE_OPTS }
  )
  for (const x of (r.rulings || [])) rulings[x.id] = x
}

// Scripted total. No survival forecast enters it. Cheapness and freedom from evaluation-set spend
// are the two properties that correlate with payoff in this ledger; a real measured number earns a
// bonus; overlap with a tried lever discounts or zeroes.
const SEV_MULT = { none: 1.0, reparameterization: 1.0, adjacent: 0.6, duplicate: 0.0 }
const scored = pool.map((c) => {
  const ruling = rulings[c.id] || { conflictSeverity: 'none', conflictNote: '' }
  const minutes = Math.max(1, Number(c.testMinutes) || 60)
  const queries = Math.max(0, Number(c.evaluationQueries) || 0)
  const cheap = Math.max(0, 5 - Math.log2(minutes / 15 + 1))
  let t = 1.5 * cheap + (queries === 0 ? 3.0 : 0) + (c.selfMeasured && c.selfMeasured.length > 20 ? 1.5 : 0)
  t *= SEV_MULT[ruling.conflictSeverity] !== undefined ? SEV_MULT[ruling.conflictSeverity] : 1
  return { ...c, score: { ...ruling, testMinutes: minutes, evaluationQueries: queries }, total: t }
})
scored.sort((x, y) => y.total - x.total)
log(`Ranked ${scored.length} by cost and overlap (no survival forecast); top: ${scored.slice(0, 3).map((c) => `${c.id}:${c.name} (${c.total.toFixed(1)}, ${c.score.testMinutes}min, ${c.score.evaluationQueries}q)`).join('  ')}`)

// ---- Stage 3: ENABLE the selected candidates on real data ------------------
// The phase is called Enable; the names falsifyTopK, FALSIFY_SCHEMA and `falsified` are kept from its
// earlier name, Falsify, for compatibility. The engineer's job is to find the conditions
// under which a mechanism works, and only then to report what is still missing. A verdict that
// merely kills is the least useful thing this phase can produce: every kill in this ledger that
// mattered was accompanied by a named missing condition, and the kills without one were reversed.
phase('Enable')
const ENABLE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: {
      type: 'string',
      enum: ['WORKS_AS_STATED', 'WORKS_UNDER_CONDITION', 'CONDITION_IDENTIFIED', 'INSTRUMENT_REQUIRED', 'BLOCKED_BY_ARITHMETIC', 'NOT_MEASURED'],
      description: 'WORKS_AS_STATED = the premise measured true at its own threshold, as written. WORKS_UNDER_CONDITION = it measured true once you supplied one named condition, which you state. CONDITION_IDENTIFIED = it did not measure true, and you have quantified the condition that would make it and priced the cheapest way to supply it. INSTRUMENT_REQUIRED = the latent has headroom at its oracle but no deployable instrument reads it accurately enough yet; say what accuracy is needed. BLOCKED_BY_ARITHMETIC = the best case at the oracle is below the campaign bar, so no instrument can rescue it; show the arithmetic. NOT_MEASURED = you could not run the test; say what blocked it. Only BLOCKED_BY_ARITHMETIC closes a class.',
    },
    missingCondition: { type: 'string', description: 'REQUIRED unless WORKS_AS_STATED. The condition that is not yet supplied, stated quantitatively (e.g. "a witness at AUC >= 0.80 with error correlation <= 0.25", "180 more labelled rows", "a partition never used for selection"). This is the phase\'s primary output.' },
    cheapestSupply: { type: 'string', description: 'REQUIRED unless WORKS_AS_STATED. The cheapest concrete way to supply that condition, with its price in hours, money or human effort, and who or what must do it. Say "none known" only after naming what you considered.' },
    supplyAlreadyOnDisk: { type: 'string', description: 'REQUIRED whenever cheapestSupply quotes a build cost in hours. BEFORE quoting that cost, search the artifact store for every recipe, checkpoint, cache or arm name that appears in your cheapestSupply string, and report what you found: which already exist, their paths, and what reading them showed. A supply that is already built is not a cost, it is a measurement waiting to be read. Search the campaign\'s findings file for the DIRECTION too, not only the artifact names: the same closure priced fourteen hours for a direction that file had killed six days earlier. Measured in one campaign: a closure priced four knob-diverse refits at ~14 GPU hours whose checkpoints AND out-of-fold arrays were already on disk, and reading them refuted the supply in under an hour with no GPU. Write "no build quoted" only if cheapestSupply names nothing to build.' },
    conditionsTried: { type: 'string', description: 'REQUIRED. The condition changes you actually SUPPLIED and measured, one per line with its result. An empty list means you reported a miss without trying to enable it, which this phase does not accept.' },
    ceilingArithmetic: { type: 'string', description: 'Always required: the oracle-plant score of this candidate\'s channel, the fraction a realistic instrument would realize, and the resulting best case against the campaign bar. This is what separates BLOCKED_BY_ARITHMETIC from INSTRUMENT_REQUIRED.' },
    menuSize: { type: 'integer', minimum: 1, description: 'REQUIRED. How many distinct configurations you COMPARED on the evaluation set to arrive at the reported number. 1 means the number was never chosen from among options.' },
    optimismCorrected: { type: 'string', description: 'REQUIRED. The reported effect after subtracting selection optimism for your menuSize, and how you obtained the correction.' },
    measured: { type: 'string', description: 'The key numbers you measured, with the threshold comparison spelled out' },
    testDescription: { type: 'string', description: 'What you ran (script path(s), data slice, runtime)' },
    caveat: { type: 'string', description: 'The strongest reason this verdict could be wrong; empty string if none' },
  },
  required: ['verdict', 'measured', 'missingCondition', 'cheapestSupply', 'supplyAlreadyOnDisk', 'conditionsTried', 'ceilingArithmetic', 'menuSize', 'optimismCorrected', 'testDescription', 'caveat'],
}
const FALSIFY_SCHEMA = ENABLE_SCHEMA

let falsified = []
if (dataAccess && TOP_K > 0) {
  const eligible = scored.filter((c) => (SEV_MULT[c.score.conflictSeverity] ?? 1) > 0)
  // Mechanism-axis dedup (ledger L22): a pool of 21 has collapsed to ONE axis before, and spending the
  // whole falsify budget on near-duplicates buys one data point at three times the price. Take the best
  // candidate per axis first, then backfill by rank. Axis key = the coarse mechanism signature.
  const axisOf = (c) => {
    const t = `${c.mechanism} ${c.loadBearingPremise}`.toLowerCase()
    const marks = ['sign', 'magnitude', 'gate', 'ensemble', 'committee', 'transport', 'segment', 'spatial',
      'shrink', 'transduct', 'oracle', 'align', 'decode', 'prior', 'residual', 'cluster', 'rank']
    const hit = marks.filter((m) => t.includes(m)).slice(0, 3).join('+')
    return `${c.family}|${hit || 'other'}`
  }
  const seenAxis = new Set()
  const primary = []
  const backfill = []
  for (const c of eligible) {
    const a = axisOf(c)
    if (seenAxis.has(a)) { backfill.push(c); continue }
    seenAxis.add(a)
    primary.push(c)
  }
  const targets = primary.concat(backfill).slice(0, TOP_K)
  // THE FREE LANE. A candidate whose first test spends NOTHING against the
  // evaluation set and costs under half an hour is tested BEFORE the ranked list and OUTSIDE the
  // top-K cap. The campaign's largest efficiency win was exactly such a candidate, ranked sixth of
  // sixteen and never tested, and it was recovered only because a human read the untested list.
  // Selection optimism is the one campaign resource that cannot be refilled, so a test that spends
  // none of it is close to free and its opportunity cost is minutes.
  const freeLane = eligible
    .filter((c) => c.score.evaluationQueries === 0 && c.score.testMinutes <= FREE_LANE_MINUTES)
    .filter((c) => !targets.some((t) => t.id === c.id))
    .sort((a, b) => a.score.testMinutes - b.score.testMinutes)
    .slice(0, FREE_LANE_MAX)
  if (freeLane.length) {
    log(`Free lane: ${freeLane.length} candidate(s) tested ahead of the ranked list at zero evaluation-set cost: ` +
      freeLane.map((c) => `${c.id} (${c.score.testMinutes}min)`).join(', '))
    targets.unshift(...freeLane)
  }
  log(`Enabling ${targets.length} on real data (axis-deduped from ${eligible.length} eligible, ` +
    `${seenAxis.size} distinct axes): ${targets.map((c) => `${c.id}[${axisOf(c)}]`).join(', ')}`)
  falsified = (await parallel(targets.map((c) => () =>
    agent(
      'You are an ENGINEER for an invention council, not a judge. One candidate invention reached the top of ' +
      'the ranking. YOUR GOAL IS TO MAKE IT WORK. You measure its load-bearing premise honestly, and when the ' +
      'premise misses, you CHANGE THE CONDITIONS and measure again until either it works or you have proven no ' +
      'condition can save it.\n\n' +
      'THIS IS THE MOST IMPORTANT INSTRUCTION IN YOUR BRIEF, so read it twice: a candidate that misses its ' +
      'threshold is CONDITION_IDENTIFIED, not dead, and the miss tells you which condition to supply. Returning "measured 0.66 vs ' +
      'the 0.70 bar, dead" is a FAILURE OF YOUR JOB, not a result. The correct output in that situation names ' +
      'the condition that closes the gap and reports what happened when you tried it: restrict to the ' +
      'subpopulation where the mechanism is strongest; change the scale or the unit it applies to; add the ' +
      'missing witness or covariate; re-frame the threshold it missed (is the bar measuring the right thing?); ' +
      'compose it with another sub-bar channel so two half-signals make one whole one; move it to a different ' +
      'decision site in the pipeline. Past rounds killed mechanisms whose signal was REAL and whose gap to the ' +
      'bar was 0.005 - those were engineering problems reported as impossibility results, and that mistake has ' +
      'cost this campaign more than any wrong candidate ever did.\n\n' +
      'The ONLY terminal verdict is BLOCKED_BY_ARITHMETIC: the oracle version cannot clear the bar, so no condition ' +
      'change can help. Everything else gets a repair attempt and a quantitative statement of the condition ' +
      'under which the mechanism succeeds.\n\n' +
      'You remain adversarially honest about MEASUREMENT: design tests so a false premise cannot sneak through ' +
      'and a true one cannot be missed by a sloppy implementation. Optimism about what to try next, rigour ' +
      'about what the numbers say. Never report a repaired number without the honesty rules below applied to ' +
      'it - a repair that only works in-sample or only under one partition is not a repair.\n\n' +
      `${BRIEF_BLOCK}\n\n` +
      `DATA ACCESS:\n${dataAccess}\n\n` +
      `CANDIDATE ${c.id}: ${c.name}\nmechanism: ${c.mechanism}\n` +
      `LOAD-BEARING PREMISE (the thing to measure): ${c.loadBearingPremise}\n` +
      `suggested first test: ${c.firstTest}\nexpected failure mode: ${c.expectedFailureMode}\n` +
      (c.selfMeasured ? `generator self-measured claims (REPRODUCE these independently first; distrust anything you cannot reproduce): ${c.selfMeasured}\n` : '') + '\n' +
      (c.family === 'assembly' ? 'THIS CANDIDATE IS AN ASSEMBLED MODEL CLASS, which changes your job: ' +
        'STEP 0 IS THE ENTIRE TEST, run at full depth. Build the ORACLE variant exactly per the oracle ' +
        'spec below (truth-peeked latents; every other constraint legal and held), score it, and report ' +
        'the ceiling arithmetic with the realized-fraction best case. Do NOT build the legal method: a ' +
        'first legal build\'s score is a fact about that build, not about the class - a campaign twice ' +
        'recorded a method class dead on a first build later shown to sit far from a faithful one. ' +
        'WORKS_AS_STATED = the oracle clears the bar by more than the realized-fraction band of comparable ' +
        'channels; BLOCKED_BY_ARITHMETIC = even the oracle cannot clear it. Audit the structure coverage map ' +
        'too: a confirmed structure silently dropped goes in caveat. Your compute budget for this ' +
        'candidate is ~40 minutes, not the 15 stated below.\n' +
        `ORACLE SPEC: ${String(c.assembly.oracleSpec || '').slice(0, 800)}\n` +
        `STRUCTURE COVERAGE MAP: ${String(c.assembly.structuresContained || '').slice(0, 800)}\n` +
        `NURSERY PLAN (verify it is concrete enough to hand to a builder; improve it if not): ${String(c.assembly.nurseryPlan || '').slice(0, 600)}\n\n` : '') +
      'STEP 0, BEFORE YOU BUILD ANYTHING (mandatory, cheap, and it has saved whole rounds of wasted work): ' +
      'compute the CEILING. Plant the ORACLE version of this candidate\'s channel - give it the perfect ' +
      'answer for the one quantity it estimates, keep every other constraint (the same global parameters, the ' +
      'same activation population, the same post-process) - and score it. Then state what fraction of that ' +
      'ceiling a realistic signal could plausibly realize, and the resulting best-case marginal against the ' +
      'bar. If the ORACLE cannot clear the bar, or clears it only by a margin smaller than the realized ' +
      'fraction of comparable channels, return BLOCKED_BY_ARITHMETIC immediately with the arithmetic and do not ' +
      'build the legal version. A previous round burned three heavy falsifiers on a family whose ceiling ' +
      'arithmetic killed it in twenty lines. Always fill ceilingArithmetic, whatever the verdict.\n\n' +
      'Rules: (1) measure the PREMISE, not the full pipeline; (2) truth is used for SCORING only, never for ' +
      'conditioning selection (lesson L1) - if the suggested test violates this, fix the test; (3) include a ' +
      'null/chance baseline so the threshold comparison is meaningful; (4) write NEW scratch scripts only, ' +
      'prefixed falsify_, never modify existing files; (5) total compute under ~15 minutes - subsample if ' +
      'needed and say so; (6) if a fair test is impossible in budget, return NOT_MEASURED with the exact blocker. ' +
      'Sanity-check your own script (e.g. plant a synthetic positive) before trusting a negative result.\n\n' +
      'HONESTY RULES THAT HAVE OVERTURNED PAST VERDICTS - violating any of these makes your verdict worthless:\n' +
      '  (a) EVERY tuned parameter is fitted on training splits only and applied out-of-fold. An in-sample ' +
      'fitted scale is not a result. Report both numbers and treat the out-of-fold one as THE number.\n' +
      '  (b) NESTED HONESTY: if you screen a menu of variants (proxies, statistics, feature choices) and then ' +
      'report the best one, that selection is part of the model. Re-run with the choice itself made ' +
      'out-of-fold. A screened winner that does not survive nested honesty is noise, and this has flipped the ' +
      'sign of a "win" in 6 of 8 cells before.\n' +
      '  (c) SINGLE-PARTITION RESULTS DO NOT COUNT for anything within a few percent of the bar. Re-draw the ' +
      'CV partition at least once (re-seed the blocking) and report whether the number survives. Separate the ' +
      'two noise axes: partition re-draw moves fitted parameters; unit bootstrap moves which units are scored.\n' +
      '  (e) PRICE YOUR OWN SELECTION BUDGET. Every configuration you compare on the evaluation set ' +
      'buys optimism, and it GROWS WITH THE NUMBER COMPARED: this workflow measured +0.0985 of drift as a ' +
      'searched menu went from 1 to 14 cells, on a campaign whose real effects are ~0.3. So count the cells ' +
      'you compared (menuSize) and subtract the optimism for that count. Measure it if you can - pick the ' +
      'config on half the units, score that pick on the other half, repeat over splits, and the gap IS the ' +
      'optimism of your procedure - otherwise use the campaign figure from the ledger. A raw best-of-N is ' +
      'not an estimate of anything; it is the maximum of N noisy draws.\n' +
      '  (d) ADD THE CONTROL THAT DELETES THE CANDIDATE\'S OWN IDEA while keeping everything else (its ' +
      'activation population, its exposure, its parameter count). If the control matches the candidate, the ' +
      'mechanism carries nothing and the gain came from exposure. This control has killed candidates that ' +
      'passed every other test.\n' +
      '  (f) BEFORE QUOTING A BUILD COST IN GPU HOURS, GREP THE ARTIFACT STORE FOR THE THING YOU ARE ' +
      'PRICING. Every recipe, arm, checkpoint or cache name you write into cheapestSupply must first be ' +
      'searched for in the campaign\'s own artifact directory, and what you found goes in ' +
      'supplyAlreadyOnDisk. Measured in one campaign: a closure priced four knob-diverse refits at ~14 GPU hours ' +
      'when all four already had checkpoints AND out-of-fold arrays on disk; reading them took under an ' +
      'hour, cost no GPU and no evaluation budget, and refuted the supply outright. A supply that already ' +
      'exists is not a cost, it is a measurement waiting to be read. AND SEARCH THE CAMPAIGN\'S ' +
      'FINDINGS FILE FOR THE DIRECTION ITSELF, not only the artifact names: the same closure priced ' +
      'those fourteen hours for a direction that findings file had KILLED SIX DAYS EARLIER, naming ' +
      'both the mechanism and the script that measured it. Disk tells you what exists; the findings ' +
      'file tells you what has already been settled, and a supply is not cheap if it rebuys a kill.\n' +
      '  (g) WHEN THE CLAIM IS ABOUT DIVERSITY, DECORRELATION OR ENSEMBLE VALUE, GROUP THE ARTIFACTS BY ' +
      'WHAT THEY SHARE, NOT BY THE KNOB THAT WAS VARIED. And if the gate is a conjunction, test whether its ' +
      'halves are one axis before treating either as an unswept knob. Measured in one campaign: a "no member at ' +
      'rho <= 0.95 within 0.01" gate looked like two knobs and was one, because distillation from the common ' +
      'teacher both made every member strong and made every member agree; varying a training knob ' +
      'decorrelated LESS than varying the seed. The right output there is a missing condition of a different ' +
      'shape, never another sweep of either half.',
      { label: `enable:${c.id}`, phase: 'Enable', schema: ENABLE_SCHEMA }
    ).then((v) => (v && v.verdict) ? { id: c.id, name: c.name, family: c.family, testMinutes: c.score.testMinutes, evaluationQueries: c.score.evaluationQueries, ...v } : null)
  ))).filter(Boolean)
  for (const f of falsified) log(`falsify ${f.id}: ${f.verdict} - ${(f.measured || '').slice(0, 140)}`)
} else {
  log(dataAccess ? 'Enable phase disabled (falsifyTopK=0)' : 'No dataAccess: skipping Enable phase')
}
// WORKS_UNDER_CONDITION counts as a survivor: under the enablement doctrine a mechanism made to work by
// changing a condition is a full success, not a lesser one. Omitting it here made the first successful
// repair in this workflow's history invisible to the chairman, the ledger, and the caller.
const survivors = falsified.filter((f) => f.verdict === 'WORKS_AS_STATED' || f.verdict === 'WORKS_UNDER_CONDITION')

// ---- Stage 4: chairman synthesis -----------------------------------------
// ---- verification-budget accounting -------------------------------------
// Justified by this workflow's own measurement, not by citation: selection optimism grows with the
// number of candidates compared on one evaluation set, so the budget must be tracked ACROSS rounds.
const QLOG = LEDGER.replace(/[^/]*$/, 'query_budget.md')
const spentThisRun = pool.length + falsified.length + replicated.length + refuted.length + scoutFacts.length
let budgetNote = ''
try {
  const prior = (await agent(
    'Read the file at ' + QLOG + ' if it exists and return ONLY the single integer on the line beginning ' +
    '"CUMULATIVE:" (return 0 if the file or line is absent). Then APPEND one line to that file, creating it ' +
    'with a header if needed, recording: today, this run\'s spend of ' + spentThisRun + ' evaluations ' +
    '(' + pool.length + ' candidates scored, ' + falsified.length + ' falsified, ' + replicated.length +
    ' replications, ' + refuted.length + ' certificate attacks, ' + scoutFacts.length + ' scout facts), and ' +
    'a new "CUMULATIVE: <n>" line with the updated total. Return just the PRIOR integer, nothing else.',
    { label: 'budget', phase: 'Synthesize', ...JUDGE_OPTS }
  )) || '0'
  const priorN = parseInt(String(prior).replace(/[^0-9]/g, '').slice(0, 6) || '0', 10) || 0
  budgetNote = 'VERIFICATION BUDGET: this run spent ' + spentThisRun + ' evaluations against the same ' +
    'evaluation set; cumulative across the campaign is now about ' + (priorN + spentThisRun) + '. Selection ' +
    'optimism grows with this count. State explicitly in the brief whether the campaign\'s optimism is now ' +
    'comparable to the effect sizes being chased, because if it is, the correct diagnosis is a VERIFICATION ' +
    'ceiling (escaped only by a population never used for selection) and NOT a signal ceiling, and the ' +
    'recommendation must say so.'
  log(budgetNote)
} catch (e) {
  budgetNote = 'VERIFICATION BUDGET: this run spent ' + spentThisRun + ' evaluations (cumulative unavailable: ' + String(e).slice(0, 80) + ').'
}

phase('Synthesize')
const poolDigest = scored.map((c) =>
  `${c.id} [${c.family}] ${c.name} | total ${c.total.toFixed(1)}\n` +
  digestFrom(CANDIDATES_SCHEMA.properties.candidates.items, c, { skip: ['name'] }) + '\n' +
  digestFrom(DUP_SCHEMA, c.score)
).join('\n\n')
const falsifyDigest = falsified.length
  ? 'EMPIRICAL FALSIFICATION RESULTS (real code, real data, this session). Note menuSize and ' +
    'optimismCorrected: an effect chosen from a large menu is optimistic in proportion to the menu, so ' +
    'quote the CORRECTED number in the brief and state the menu it came from.\n' +
    falsified.map((f) => `${f.id} ${f.name} [first test ${f.testMinutes} min, ${f.evaluationQueries} evaluation queries]\n` +
      digestFrom(FALSIFY_SCHEMA, f)).join('\n\n')
  : ''
const replDigest = replicated.length
  ? 'REPLICATION VERDICTS (external documented methods rebuilt on the real data this session). A ' +
    'REPLICATED_GREEN is an existence proof and outranks every invented candidate. A CODE_PARITY_PASS means the ' +
    'rung is built and its remaining gap is weights or data; a CODE_PARITY_FAIL or a low score before parity is a ' +
    'build defect to bisect against the reference, never a verdict on the method.\n' +
    (LADDER ? 'THIS RUN HAS TWO TRACKS (frontier gate tripped). FRONTIER TRACK: the brief states, for each rung, the ' +
      'mechanism in one sentence, parity status, the next action, and the gate on the real instrument (the reference ' +
      'score at that rung minus the stated tolerance). UNKNOWN TRACK, the main one: the brief leads with what was found ' +
      'or opened beyond the frontier (new evidence, new questions, where the reference itself is blind) and drops every ' +
      'candidate that is tuning or that the frontier already contains. It states NO ceiling, end-point estimate or ' +
      '"not reachable" below the best reproducible external score.\n' : '') +
    replicated.map((r) => `${r.name}\n` + digestFrom(REPLICATE_SCHEMA, r)).join('\n\n')
  : ''
const assembleDigest = assembled.length
  ? 'ASSEMBLED MODEL CLASSES (from the Assemble phase; a falsification verdict on one is an ' +
    'ORACLE-CEILING measurement, and a surviving class is a BUILD PROGRAM for the nursery, not a leg ' +
    'to inject):\n' +
    assembled.map((a) => `${a.name}\n` + digestFrom(ASSEMBLE_SCHEMA, a, { skip: ['name'] })).join('\n\n')
  : ''

const brief = await agent(
  budgetNote + '\n\n' +  'You are the CHAIRMAN of an invention council. Below are scored candidates AND (if run) empirical ' +
  'falsification verdicts from real data. Write the final INVENTION BRIEF in markdown:\n' +
  '1. One paragraph restating the core contradiction the plateau embodies, updated by any scout facts.\n' +
  '2. EMPIRICAL SURVIVORS first: every candidate whose premise was MEASURED TRUE gets a full build plan ' +
  '(mechanism, measured premise numbers, next test up from the premise, gate criteria, expected failure + repair). ' +
  'If a measured verdict contradicts the ranking score, the MEASUREMENT wins.\n' +
  '2b. For every SURVIVING assembled model class, a named NURSERY PLAN section: the measured oracle ' +
  'number as the build target, the iteration budget (default 6 single-change builds), the per-iteration ' +
  'diagnostics, and the standing rules spelled out - every iteration is evaluated against the ORACLE GAP ' +
  '(never the incumbent delta, never a flat baseline); during the nursery only BLOCKED_BY_ARITHMETIC closes ' +
  'the class; budget exhaustion is SUSPENDED with revival conditions; a first legal build scoring badly ' +
  'is expected and decides nothing.\n' +
  '3. CONDITIONS NOT YET SUPPLIED: one line per candidate that did not work as stated, giving the missing condition, its cheapest supply and its price, and the measured number that says so. These are the next run\'s starting points, not its tried-levers list; only BLOCKED_BY_ARITHMETIC candidates go to tried-levers.\n' +
  '4. UNTESTED high-scorers worth a falsification pass next run (max 3), each with the exact premise test to run.\n' +
  '5. If NOTHING survived: state the sharpened contradiction the deaths reveal, and name the SINGLE measurement ' +
  'that would most change the picture (not a candidate - a measurement).\n' +
  '6. One-line cost note: for each enabled candidate, its predicted first-test minutes against what the engineer actually spent.\n' +
  '7. Candidates rejected for duplicating tried levers, one line each.\n' +
  (replicated.length ? '0 (FIRST, before everything): REPLICATION verdicts - for each external recipe: did the claimed behavior appear, what was measured, and the go/no-go on its next knob. A REPLICATED_GREEN outranks every invented candidate.\n' : '') + '\n' +
  `${BRIEF_BLOCK}\n\n${replDigest ? replDigest + '\n\n' : ''}${assembleDigest ? assembleDigest + '\n\n' : ''}SCORED CANDIDATES (best first):\n${poolDigest}\n\n${falsifyDigest}`,
  { label: 'chairman', phase: 'Synthesize' }
)

// ---- Stage 5: scribe updates the ledger -----------------------------------
phase('Ledger')
const cell = (v, n_) => String(v === undefined || v === null || v === '' ? '-' : v).replace(/\|/g, '/').replace(/\n/g, ' ').slice(0, n_)
const ledgerRows = falsified.map((f) => `| ${f.id} | ${cell(f.name, 40)} | ${f.testMinutes}min/${f.evaluationQueries}q | ${f.verdict} | ` +
  `${cell(f.menuSize, 6)} | ${cell(f.optimismCorrected, 120)} | ${cell(f.measured, 160)} | ${cell(f.missingCondition, 200)} | ${cell(f.cheapestSupply, 160)} |`).join('\n')
await agent(
  `You are the SCRIBE of an invention council. Append a run record to the ledger file at ${LEDGER} ` +
  '(create it with a "# Invention-council ledger" header if it does not exist; NEVER overwrite existing content - append only). ' +
  'Use the current date from the `date` command. The record must contain, in compact markdown:\n' +
  `- a heading with the date and a 6-10 word problem tag\n` +
  `- pool size ${pool.length}, falsified ${falsified.length}, survivors ${survivors.length}\n` +
  '- the cost table below (predicted first-test cost vs the verdict it bought)\n' +
  '- 1-3 NEW meta-lessons this run teaches (transferable, domain-free), each one sentence; if a lesson ' +
  'duplicates an existing ledger lesson, strengthen that one instead of duplicating\n\n' +
  `COST TABLE (predicted first-test cost, then menuSize = configurations compared, so the effect can be read against its own selection budget):\n| id | name | first-test cost | verdict | menu | optimism-corrected | measured | missing condition | cheapest supply |\n|---|---|---|---|---|---|---|---|---|\n${ledgerRows || '(none enabled)'}\n\n` +
  `RUN SUMMARY FOR CONTEXT:\nproblem: ${problem.slice(0, 400)}\n` +
  `top scored: ${scored.slice(0, 5).map((c) => `${c.id} ${c.name} (${c.total.toFixed(1)})`).join('; ')}\n` +
  `verdicts: ${falsified.map((f) => `${f.id}=${f.verdict}`).join(', ') || 'none'}\n` +
  `replication: ${replicated.map((r) => `${r.name}=${r.verdict}`).join(', ') || 'none'}`,
  { label: 'scribe', phase: 'Ledger', ...JUDGE_OPTS }
)

return {
  problem,
  poolSize: pool.length,
  scoutFactCount: scoutFacts.length,
  replicated: replicated.map((r) => ({ name: r.name, verdict: r.verdict, measured: r.measured, nextKnob: r.nextKnob })),
  assembled: assembled.map((a) => ({ name: a.name, oracleSpec: a.oracleSpec, nurseryPlan: a.nurseryPlan,
    closestKnownMethod: a.closestKnownMethod })),
  ranked: scored.map((c) => ({ id: c.id, family: c.family, name: c.name, total: c.total, testMinutes: c.score.testMinutes, evaluationQueries: c.score.evaluationQueries, conflictNote: c.score.conflictNote || null })),
  falsified: falsified.map((f) => ({ id: f.id, name: f.name, verdict: f.verdict, measured: f.measured,
    ceilingArithmetic: f.ceilingArithmetic || null, conditionsTried: f.conditionsTried || null,
    missingCondition: f.missingCondition || null, cheapestSupply: f.cheapestSupply || null,
    supplyAlreadyOnDisk: f.supplyAlreadyOnDisk || null, caveat: f.caveat || null })),
  survivors: survivors.map((f) => f.id),
  brief,
}
