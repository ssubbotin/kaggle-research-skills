export const meta = {
  name: 'llm-council',
  description: 'Answer a question via a council: independent first opinions, anonymized peer-review ranking, then chairman synthesis',
  whenToUse: 'High-stakes / contested / open-ended questions where cross-model deliberation beats a single answer',
  phases: [
    { title: 'First opinions', detail: 'each council member answers the question independently, in parallel' },
    { title: 'Review', detail: 'each member ranks the anonymized pool of answers by accuracy and insight' },
    { title: 'Chairman', detail: 'the chairman synthesizes the final answer from all answers and rankings' },
  ],
}

// ---- inputs -------------------------------------------------------------
// args.question : string (required) — the question to put to the council
// args.members  : string[]           — model per member (default below)
// args.chairman : string             — synthesizing model (default 'opus')
// Accept args as an object OR a JSON string (callers sometimes pass it stringified).
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = { question: A } } }
if (!A || typeof A !== 'object') A = {}

const question = A.question
if (!question || typeof question !== 'string') {
  throw new Error('council-workflow: args.question (a non-empty string) is required')
}
const MEMBERS = (Array.isArray(A.members) && A.members.length ? A.members : ['opus', 'sonnet', 'haiku'])
const CHAIRMAN = A.chairman || 'opus'

const LABEL = (i) => String.fromCharCode(65 + i) // 0->A, 1->B, ...

// ---- Stage 1: independent first opinions --------------------------------
phase('First opinions')
log(`Convening a ${MEMBERS.length}-member council (${MEMBERS.join(', ')}); chairman = ${CHAIRMAN}`)

const opinions = await parallel(MEMBERS.map((model, i) => () =>
  agent(
    `You are a member of an expert council answering a question independently. ` +
    `Give your best, complete answer. Be concrete and state your reasoning and any assumptions. ` +
    `You are NOT seeing other members' answers yet — do not speculate about them.\n\n` +
    `QUESTION:\n${question}`,
    { label: `member:${model}`, phase: 'First opinions', model }
  ).then((answer) => ({ label: LABEL(i), model, answer }))
))

const answers = opinions.filter(Boolean)
if (answers.length < 2) {
  throw new Error(`council-workflow: only ${answers.length} member(s) answered; need at least 2 to deliberate`)
}

// Anonymized pool shared with every reviewer — NO model names, only Response A/B/C...
const pool = answers.map((a) => `### Response ${a.label}\n${a.answer}`).join('\n\n')

// ---- Stage 2: anonymized peer review + ranking --------------------------
phase('Review')
const RANK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ranking: {
      type: 'array',
      description: 'All responses ordered best-first by accuracy and insight',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          response: { type: 'string', description: 'The response letter, e.g. "A"' },
          reason: { type: 'string', description: 'One-line justification for this placement' },
        },
        required: ['response', 'reason'],
      },
    },
  },
  required: ['ranking'],
}

const reviews = (await parallel(answers.map((a) => () =>
  agent(
    `You are a council member reviewing an anonymized pool of answers to the question below. ` +
    `Rank ALL of them from best to worst by ACCURACY and INSIGHT. ` +
    `Judge only the substance — the authors are hidden and you must not guess who wrote what. ` +
    `Give a one-line justification per placement.\n\n` +
    `QUESTION:\n${question}\n\n` +
    `ANONYMIZED ANSWERS:\n${pool}`,
    { label: `review:${a.model}`, phase: 'Review', model: a.model, schema: RANK_SCHEMA }
  ).then((r) => ({ reviewer: a.model, ranking: r.ranking }))
))).filter(Boolean)

// Borda tally: first place = N-1 points ... last = 0. Higher = better.
const N = answers.length
const points = {}
answers.forEach((a) => { points[a.label] = 0 })
for (const rev of reviews) {
  rev.ranking.forEach((item, idx) => {
    const key = (item.response || '').trim().toUpperCase().charAt(0)
    if (key in points) points[key] += (N - 1 - idx)
  })
}
const tally = answers
  .map((a) => ({ label: a.label, model: a.model, points: points[a.label] }))
  .sort((x, y) => y.points - x.points)
log(`Council ranking: ${tally.map((t) => `${t.label}(${t.model})=${t.points}`).join('  ')}`)

const rankingsDigest = reviews.map((rev) =>
  `Reviewer (anonymous): ${rev.ranking.map((it) => it.response).join(' > ')}\n` +
  rev.ranking.map((it) => `  ${it.response}: ${it.reason}`).join('\n')
).join('\n\n')

// ---- Stage 3: chairman synthesis ----------------------------------------
phase('Chairman')
const final = await agent(
  `You are the CHAIRMAN of an expert council. You have every member's answer (anonymized) and the members' ` +
  `rankings of those answers. Write the single best final answer to the question. ` +
  `Do NOT merely pick the top-ranked answer — COMPOSE the strongest possible answer by combining the best ` +
  `points, correcting errors the reviewers flagged, resolving disagreements, and explicitly noting any ` +
  `genuine uncertainty the council could not resolve. Write the final answer directly, for the end user.\n\n` +
  `QUESTION:\n${question}\n\n` +
  `COUNCIL ANSWERS:\n${pool}\n\n` +
  `COUNCIL RANKINGS (best-first, with reasons):\n${rankingsDigest}\n\n` +
  `Aggregate council ranking (Borda points, higher = better): ` +
  `${tally.map((t) => `${t.label}=${t.points}`).join(', ')}`,
  { label: `chairman:${CHAIRMAN}`, phase: 'Chairman', model: CHAIRMAN }
)

return {
  question,
  chairman: CHAIRMAN,
  members: MEMBERS,
  answers,            // [{label, model, answer}]
  reviews,            // [{reviewer, ranking:[{response, reason}]}]
  aggregateRanking: tally, // [{label, model, points}] best-first
  final,              // the chairman's synthesized final answer (string)
}
