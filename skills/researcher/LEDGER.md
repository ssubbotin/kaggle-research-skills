# Invention-council ledger

Calibration record of the researcher skill: what a run proposed, what was predicted, what the data said, and
what the method learned about itself.

How the workflows use this file:

- **Before a run.** The first scout of `invention-council-workflow.js` reads this file and extracts the lessons
  relevant to the problem at hand; they are passed to every later agent as ledger notes. A host running a session by hand reads it for the same
  purpose: to calibrate forecasts and to avoid repeating a recorded mistake. The research loop
  (`research-loop-workflow.js`) does not read this file when it launches; it calibrates its forecasts from the
  campaign's own calibration table.
- **After a run.** The scribe of the invention council, the recomposer of the research loop in judge mode, or
  the host appends one run record to `## Run log` at the end of the file:
  what was predicted, what was measured, the verdicts, the cost, and one to three new lessons. A lesson that
  repeats an existing one strengthens that one instead of adding a duplicate. The file is append-only.

The lessons below were distilled from several research campaigns (machine-learning competitions with
held-out leaderboards and a systems-performance project). The campaign details have been removed:
identities, data, scores and build names are gone, the mechanisms and the magnitudes that teach calibration
are kept. "Board" means a held-out leaderboard or any other scarce external instrument; "offline" means the
campaign's own validation; "unit" means whatever the problem's independent sampling unit is.

Read `PREFLIGHT.md` for the short runnable subset of these lessons. This file is the evidence trail.

## Lessons

Every lesson states the principle, why it holds (the mechanism of the failure or success that taught it) and
how to apply it.

**Numbering.** Lesson numbers are stable identifiers: other files of the skill cite them ("lesson 70",
"ledger L11"), so they are never renumbered. Twelve numbers have a twin with the suffix `b` (10, 11, 12, 15,
16, 30, 31, 32, 101, 102, 103, 119): two distinct lessons share the number, and the one that other files and
later lessons cite keeps the bare form. Two lessons without a number are listed at the end as U1 and U2. New
lessons continue from 159.

**Thematic index.** The lessons are in numeric order, which is roughly the order in which they were learned.
The subheadings below only mark ranges; use this index to read by theme.

| theme | lessons |
|---|---|
| Premises and first tests | 1, 3, 5, 7, 8, 9, 32, 85, 86, 98, 119b, 120, 131, 137, 143 |
| Replication and the frontier | 10, 10b, 11, 11b, 12b, 14, 15, 16, 16b, 18, 19, 34, 122, 128, 148, 151, 152, 153, 154, 155, 158 |
| Repair and enablement: making an idea work | 12, 27, 30, 31, 36, 82, 83, 88, 96, 106, 123 |
| Ceilings, oracles and stopping rules | 20, 21, 23, 26, 32b, 49, 76, 77, 78, 80, 84, 87, 93, 95, 107, 127, 130, 149, U2 |
| Controls, nulls and the inference drawn from a measurement | 2, 30b, 41, 42, 43, 44, 47, 48, 50, 51, 52, 53, 66, 74, 79, 115, 156 |
| Selection, verification budget and noise | 24, 25, 54, 56, 58, 59, 67, 73, 104, 112, 145, 150 |
| Rulers, frames and transfer to deployment | 13, 55, 94, 101b, 102b, 108, 109, 113, 114, 118, 125, 132, 135, 136, 138, 141, 146, 147 |
| Forecasts and ranking | 4, 6, 39, 81, 89, 90, 92, 97, 99, 100, 101, 102, 103 |
| Describing the object, the pipeline and the instrument | 28, 29, 37, 38, 60, 61, 62, 63, 64, 65, 68, 71, 72, 75 |
| Pipeline constants, composition and architecture | 15b, 31b, 33, 40, 45, 46, 57, 91, 111, 117, 119, 124, 126, 139, 140, 142, 157, U1 |
| Candidate pools and diversity | 17, 22, 144 |
| Running the workflow: plumbing, records, resources | 35, 69, 70, 103b, 105, 110, 116, 121, 129, 133, 134 |

### 1 to 29: premises, replication, verdicts

**1. State every premise deployment-conditionally.** A statistic computed by conditioning on the truth (an
existence or enrichment figure such as "the right answer is among the ties three times more often than
chance") does not imply deployable precision. *Why:* such a figure shows that information exists somewhere;
a procedure that cannot see the truth still has to select it against a legal prior. In one early council the
only candidate to survive first data contact survived as a truth-conditioned existence statement and died
later in deployable form. *Apply:* write the load-bearing premise as a quantity computable from
deployment-time inputs alone, with a threshold. Truth is used for scoring only.

**2. Agreement between detections can be aliased.** Consistency is evidence only when the detections are
independent, and independence must be argued, never assumed. *Why:* structured decoys make wrong answers
agree with each other. In one case chained detections agreed six times above chance and precision did not
move, because the consistency itself was produced by the same aliasing as the errors. *Apply:* before using
agreement as a witness, name what would make two wrong detections agree and test for it (see lessons 61, 64).

**3. The first test isolates the load-bearing premise.** *Why:* a first test that runs the whole pipeline
dies for reasons unrelated to the idea (integration, tuning, plumbing) and leaves the premise untested.
*Apply:* identify the single claim the candidate cannot live without, measure that claim alone, and use truth
only to score it.

**4. The generator's own expected failure mode is predictive.** *Why:* in one council the failure mode the
generating agent wrote down for its own candidate named the actual cause of death in 4 of 5 cases, and the
ranking had ignored that field. *Apply:* read the stated failure mode before ranking; a candidate whose own
author names a plausible fatal axis is tested on that axis first or ranked down.

**5. Oracle headroom is motivation, never mechanism.** *Why:* "a perfect version of X would gain this much"
says a gap exists; it does not say what observable signal closes it. Candidates justified by headroom alone
died at first contact. *Apply:* every candidate must name the deployable signal that closes the gap, and that
signal must survive the list of levers already tried and killed.

**6. A judge's survival probability is a ranking heuristic at best.** *Why:* judge-assigned survival
estimates ran far above the measured rate (12% and 32% assigned against 0 of 2 measured in one run, about 1
of 12 cumulatively at that point). *Apply:* never read such a score as a calibrated probability. Later
lessons refine this (81, 89, 90, 92, 97, 100, 101, 102) and lesson 103 resolves it: the per-candidate judge
panel was removed.

**7. A pre-registered gate carries no partial credit.** *Why:* a gate missed by a hair (0.097 against a
bar of 0.10, permutation p = 0.043) is as fatal as one missed by a mile; otherwise the bar moves after the
measurement and stops being a bar. A side promise built into the premise (a claimed 70% population coverage
that measured 62%) is its own falsifiable commitment. *Apply:* fix thresholds and side promises before the
measurement and score each separately. (Lesson 27 governs what happens after the miss: the miss specifies the
missing condition.)

**8. Reproducing the components does not certify the compound.** *Why:* a candidate's component statistics
reproduced exactly while the combined statistic built from them fell short of its bar; a combination has its
own distribution. *Apply:* verify the compound statistic against its own pre-registered threshold.

**9. Run an applicability census on the target population first.** *Why:* a signal that was
permutation-significant on training data had zero coverage on the hidden test population: the inputs its gate
needed were missing there. *Apply:* before any pooled-gain argument, check that the mechanism's gates fire on
the population it will be deployed on, using only what is known about that population.

**10. Replicate before inventing.** When a documented external method beats the current best, building it
faithfully outranks inventing a new mechanism, and an external existence proof outranks your own
impossibility certificates. *Why:* two invention-only councils produced no gate-passing component; one
replication run produced the first. *Apply:* treat a better external result as a build target. Lesson 155
bounds this rule: replication is a means, and the unknown stays the main target.

**10b. "Replicated" and "replicated at reported parity" are different claims.** *Why:* a faithful rebuild
of a documented mechanism, including its stated missing parts, can run and behave as described and still land
far from the reported score. *Apply:* report a mechanism-match verdict and a score-match verdict separately.

**11. A certificate can be implementation-limited.** *Why:* a method family was declared closed on the
evidence of a build that lacked two documented parts; with them the build matched the originator's standalone
number and the "floor" moved. *Apply:* before certifying a family dead, confirm that your build reproduces
the originator's reported standalone result. A floor far from theirs means the wall is your implementation.

**11b. A third-party write-up is a lower bound on what is needed.** *Why:* unstated tuning, data-specific
calibration and integration details commonly account for a large share of a reported result. After three
replication attempts the modal outcome was "not reproduced" (one weak partial, two failures). *Apply:* expect
a residual unexplained gap and budget for it; the default forecast for a replication is "will not reproduce
at first build". Strengthened by lesson 19.

**12. The failing gate names the next knob.** *Why:* a component passed every gate except a tail gate, and
that failure came from one unit; it pointed exactly at the repair (averaging with a decorrelated partner,
which damps tail variance), and the repair passed. *Apply:* when all gates but one pass, engineer against the
one that fails before abandoning the candidate.

**12b. Reopen a killed method with a minimal, faithful, solo-scored replication.** *Why:* if a method was
killed on a broken implementation, re-integrating it into a blend hides whether it now works. A weak solo
replication is itself the gating data point. *Apply:* rebuild the backbone alone, score it alone, and only
then consider integration. Do not route around a weak solo result.

**13. Gate against the deployed artifact.** *Why:* the offline research pipeline and the pipeline actually
deployed were different constructions, and both historical sign flips between offline and board came from
gating against the research proxy. Re-gating against a faithful reconstruction of the deployed pipeline (its
exact components, weights, gates and post-processing) gave a marginal that transferred with the same sign at
about 80% of its size. *Apply:* when research and deployment differ, compute the ship gate on a
reconstruction of what is deployed.

**14. On a mined problem, the first gain came from replication plus faithful deployment gating.** *Why:* the
whole loop (replicate a documented method, gate it against the deployed artifact, port it, measure it on the
board) closed for the first time on a replicated component after invention-only rounds had shipped nothing.
*Apply:* make replication and deployment-frame gating standing phases of the loop. Bounded by lesson 155.

**15. Decompose a compound recipe before the verdict.** *Why:* a bundled external method ("corrector plus
post-process") that fails to reproduce gives an ambiguous verdict: nobody can say which half failed. *Apply:*
split a compound recipe into independently testable sub-mechanisms and give each its own verdict.

**15b. Decorrelated but weak is not shippable.** *Why:* a new component was more independent of the base
than the existing partner (correlation 0.27 against 0.31) and still failed its gate, because its standalone
error was about twice the base's. Decorrelation pays only when the component is also strong enough to give a
negative marginal. *Apply:* measure both the correlation and the standalone score before pursuing a
decorrelated component.

**16. Scale replication effort to the specificity of the source.** *Why:* a bare reported score with no
method detail carries a lower reproduction prior than a recipe with enumerated steps, and outcomes matched
that ordering. *Apply:* spend less first-pass effort on a named score than on a named mechanism, and require
a mechanism sketch before committing a deep replication to a bare number.

**16b. A confirmed gain narrows the next search to what it did not exhaust.** *Why:* after a replicated
component shipped, the originator's own decomposition of the remaining gap said which kind of component
could still help, and the next round aimed there (and correctly found the two remaining axes closed).
*Apply:* after a win, re-derive the frontier's own decomposition of the remaining gap and aim the next round
at the part it names.

**17. Convergent independent reconstruction verifies the frame; it is one data point about the idea.**
*Why:* three separately generated candidates rebuilt the deployed frame by different paths and landed on
identical anchor statistics, which confirmed the reconstruction. They were also three framings of one
mechanism. *Apply:* treat the convergence as verification of the reconstruction, and count near-duplicate
candidates as one mechanism-level survivor in any calibration figure. Strengthened by lessons 22 and 144.

**18. When the active ingredient is diversity, perturbing one working method can substitute for building
several.** *Why:* a documented tail-damping mechanism that relied on diverse models replicated fully by
running one method under perturbed configurations, with no separate architectures built. *Apply:* when a
documented mechanism works through diversity, try configuration jitter of an already working method first.

**19. Prefer the effect-preserving substitute to the literal rebuild (strengthens 11b).** *Why:* after five
replication attempts the tally was 2 weak, 2 not reproduced, 1 full; the one full success replicated the
mechanism's effect (diversity) by a cheaper route than its literal implementation. *Apply:* when a faithful
literal rebuild and an effect-preserving substitute diverge, test the substitute first.

**20. A passing oracle plant with a failing legal witness localises the wall.** *Why:* an oracle at a finer
resolution beat the coarse oracle, which proved the headroom is real, while every legal witness recovered
none of it. The deficit was therefore witness availability, and further mechanism variants at that resolution
were wasted effort. *Apply:* run the oracle plant next to the legal build, so that a failed verdict arrives
with this decomposition attached.

**21. Finer resolution of a working mechanism is a separate hypothesis.** *Why:* a decision that works once
per unit does not extend to sub-units for free: splitting the unit halves the evidence per decision while the
noise stays. *Apply:* budget the follow-up to a win as a fresh hunt for a witness with enough signal per
piece, and do not treat it as a tuning sweep.

**22. Pool size is a poor measure of hypothesis diversity (strengthens 17).** *Why:* 21 generated
candidates collapsed to 3 tested and effectively one axis, which went 0 for 3 immediately after the same
axis had gone 3 for 3 at coarser resolution. *Apply:* deduplicate the pool by mechanism axis before
allocating test effort, and record the axis count in the calibration table. Strengthened by lesson 144.

**23. Run the brief's "single decisive measurement" before accepting a suspended verdict.** *Why:* a round
with no survivors ended on a hypothesis (the bar is below the resolution of the frame) that would have
justified either more test passes or a soft suspension. A script of about twenty lines and fifteen seconds of
compute over four re-seeded partitions rejected the hypothesis and turned an ambiguous stop into a closure.
*Apply:* when a brief names its own decisive measurement, that measurement is the highest-value next action
of the round.

**24. Separate the two noise axes before blaming resolution.** *Why:* fold-assignment noise (re-seed the
partition; only fitted parameters move) and population noise (bootstrap the units; the scored units move) are
different quantities. In the teaching case the point estimate was stable to 0.01 across partitions while its
unit-bootstrap interval spanned 0.3, so "the metric cannot resolve this" was false and "the effect is too
small relative to unit variance" was true. *Apply:* report both, and calibrate them against a channel that
already shipped: the shipped component cleared the bar with probability 0.997, the candidate with about 0.5,
and that one comparison settled what three test passes had left open.

**25. A screened proxy must be re-tested under nested honesty on a fresh partition.** *Why:* the one live
thread out of 21 candidates was a proxy that won an 8-way screen on one partition. Chosen out of fold, its
effect flipped sign in 6 of 8 cells, and the chosen proxy changed from fold to fold. Selection freedom over a
small menu on a single partition manufactures effects of exactly the size such families claim. *Apply:*
freeze the proxy a priori or select it inside the fold, and re-measure on fresh partitions before promotion.

**26. Oracle ceiling times realised fraction is a legitimate stopping certificate.** *Why:* a family was
bounded above by its oracle, realised about 16% of that bound, and could not clear a bar that an already
shipped channel clears easily. Ceiling arithmetic, the realised fraction and a shipped-channel calibration
point together are stronger than any single failed gate. *Apply:* use these three numbers to distinguish
"closed" from "suspended for budget".

**27. The goal is to find the conditions under which an idea works.** *Why:* the method had drifted into a
killing machine: four rounds of terminal verdicts and no survivors. The indictment was a mechanism whose
sign channel measured 0.75 and 0.72 against nulls of 0.50 and was reported dead because its scoring half
missed the bar by a tiny margin. That was an engineering problem written up as an impossibility result.
*Apply:* a measured miss is a specification for the missing condition. Whoever tests a candidate must
attempt repair (narrow the population, change the scale, add the missing witness, re-frame the threshold,
compose two half-signals, move to another decision site) and must state the quantitative condition under
which the mechanism succeeds, even when it still misses. Only a ceiling argument terminates a line.
Strengthened by lessons 31, 36, 96 and 106.

**28. An inventory closed to the outside world manufactures permanent plateaus.** *Why:* for four rounds
every input came from inside: the campaign's data, its own validation arrays, its own ledger. Nothing read
what other researchers had published or what practitioners in the domain do. A plateau reached that way is a
boundary condition of the search. *Apply:* add a search phase and search in both directions: recent research
methods, and the domain's own field practice.

**29. The instrument that produced the data has documented flaws, and they accumulate.** *Why:* the most
valuable hypothesis of one session came from asking what the measuring apparatus does to itself over the
course of an acquisition; the domain literature documented such degradation in detail. *Apply:* when a
residual has a per-unit component that correlates with nothing external and grows over the course of the
acquisition, read the instrument's failure literature and look for a proxy of the defect in the columns already
held. Caveat from lessons 41 and 42: in the teaching case the two residual signatures that motivated this
turned out to be properties of the model and of the sampling, so recompute any such signature on the target
and on the prediction before building on it.

### 30 to 59: repair, controls, inference from measurements, selection budget

**30. A component can be deleted once you name the function it serves.** *Why:* an entire partner model was
removed and its tail-damping duty taken over by a one-line substitute, because the tester asked "what does
this partner do for the ensemble" before asking "how is it built". *Apply:* when a candidate targets a paired
or partner component, screen for its downstream function first; the cheapest surviving design is often a
scalar knob that reproduces the function.

**30b. The control that deletes the candidate's own idea is a discovery channel.** *Why:* the
matched-exposure control was added to prevent false positives, and on its first run it produced the round's
shipped result: the candidate's proposed nonlinearity was strictly dominated by the plain control at matched
tail cost, so the value lay entirely in the candidate's incidental premise (removing a partner). *Apply:*
always run the control that removes the idea at matched exposure, and read it as a candidate in its own
right.

**31. Log the judged premise and the repaired mechanism as two outcomes (strengthens 27).** *Why:* a
repair-capable test produced, from one candidate, a correctly low score for the stated premise (it missed)
and a repaired mechanism that shipped through the tester's own witness. Collapsing them into one verdict
would discredit either good judges or good repairs. *Apply:* record both halves explicitly; a low score on
the stated premise and a shipped repair are not in tension.

**31b. Stale constants survive the component they were tuned for.** *Why:* two weights had been tuned when
an injected component was a single noisy model and were never revisited after a trimmed committee replaced
it. The committee's own trimming had taken over the partner's function, so the partner was double-counting.
The shipped gain was two numbers. *Apply:* whenever a component is replaced, re-audit every constant that
compensated for the old component's weaknesses. A deployed-decision audit lists, for each constant, what it
compensates for and whether that thing still exists.

**32. A threshold band fixed before the measurement makes a ceiling verdict cheap to trust.** *Why:* a
candidate's survive and cannot-clear bands were fixed when the premise was written, so when the measured
correlation landed in the dead zone no judgment call was needed afterwards. *Apply:* pre-register the numeric
band at premise-authoring time, never at scoring time. That is what separates a legitimate ceiling closure
from a rationalised kill.

**32b. Derive the channel's theoretical gain before calling a near miss a failure.** *Why:* the gain of a
sign channel scales as (2p - 1)^2 times the oracle-sign gain, where p is the sign accuracy. One line showed
that the measured gain was exactly the theoretical value for p = 0.72 and that the bar needed p of about
0.85, which converts "try harder" into "no tuning of this witness can reach the bar, change the basis". The
change of basis then succeeded. An earlier round had spent three tests on the same family without writing
the relation down. *Apply:* write the payoff law of the channel first and read the required witness quality
off it. Strengthened by lesson 87.

**33. Additivity of two separately gated changes must be measured, and the tail is where they collide.**
*Why:* two changes that each passed their gates composed to less than their sum: 43% of the second survived,
and the combination pushed every joint configuration past a tail veto that each had cleared alone with
headroom, because both concentrated their damage on the same worst units. *Apply:* re-gate the composition,
with the second change refitted on the residual of the first, before shipping them together.

**34. A failed replication should localise the failure to a dimension.** *Why:* a replication missed badly
as a standalone, but a truth-free self-test on a supervised prefix (restart the method inside a region where
the answer is known and score the rest of that region) proved the machinery correct and placed the failure in
the horizon: it beat the baseline at short range and diverged at long range. That named the repair (run it
as a bounded corrector around the existing model). *Apply:* give every replication a cheap self-test on data
where the truth is legally available, and report where it holds and where it breaks.

**35. A schema change is done when every projection that consumes it understands the new value.** *Why:*
after new verdicts and fields were added, the survivors filter still tested for the old verdict value, so
the first successful repair in the workflow's history was reported as a non-survivor; the synthesis digest,
the persisted record and the return value all dropped the new fields, and the most actionable output (the
condition under which each mechanism works) was reachable only from raw transcripts. *Apply:* search for
every use of the old enumeration value and every hand-written field projection: aggregate counters,
synthesis prompt, persisted record, return value.

**36. The kill frame relapses as "feasibility discipline", and framing determines output.** *Why:* one hour
after the make-it-work doctrine was adopted, a new search workflow was given an analyst chartered to "kill
what cannot work". An agent told to find what fails returns a list of failures; an agent told to find the
way in returns proxies and reduced forms. Screening inputs is a real function; it belongs to an engineer.
*Apply:* replace every feasibility-critic role with a salvage ladder: substitute an observable that moves
with the unobservable driver; change the unit of analysis (per row to per unit, magnitude to sign or bound);
weaken the claim to the reduced form the data supports (a known-shape basis with one fitted amplitude beats
a full physical model); demote the effect to an uncertainty weight for routing and shrinkage; only then name
the missing input as a request. Corollary: a paywalled or book-length source is a fetch request for the
human, so agents return the URLs of sources they wanted and could not read.

**37. Audit the facts you put in the brief.** *Why:* a council reasons correctly from a bad premise and
returns a confident wrong priority. One scan's main recommendation rested on an effective sample size about
seven times smaller than the nominal one, a figure copied from the campaign's own notes. On measurement no
grouping criterion reproduced it (intra-class correlation 0.00 against a permutation null of 0.20; the
cluster bootstrap inflated the standard deviation by 1.01 to 1.02). *Apply:* every load-bearing number in a
brief carries a provenance note, and if it will steer the round it is re-measured before the round. The
caller's own context block is subject to the same verification as any scout fact.

**38. The cheapest decisive test is often a diagnostic of the measuring apparatus.** *Why:* two probes of
under twenty seconds each changed the plan more than any candidate: a quantization check showed that
derivatives over the shortest baseline were pure rounding noise (physically impossible values) and that any
derivative feature needed a baseline ten times longer; a grouping check retired an objection that would have
forced re-pricing of every marginal. *Apply:* budget one probe of the instrument before building on any
measured signature.

**39. A synthesis ranking is not evidence; run its own pre-registered test.** *Why:* the item a synthesis
phase ranked first, with the most theory cited behind it, passed 1 of 3 of its own thresholds in twelve
seconds of compute. The theory was right and the inference from it was wrong. *Apply:* require every
recommendation to carry falsifiable thresholds and run the cheapest one at once. A ranking with thresholds
can be cheaply wrong; a ranking with rationale is expensively believed. Strengthened by lesson 99.

**40. Fitting a nuisance parameter can cost more than the bias it removes.** *Why:* two per-unit parameters
fitted on a supervised prefix removed a real 15% gain bias and still made the held-out result worse in 71% of
units, because the incumbent crude normalisation was already unbiased in the first moment and the fit added
variance. *Apply:* compare any per-unit nuisance fit against the crudest normalisation of the same quantity,
never against no normalisation at all.

**41. Pre-register the discriminating control as well as the threshold.** *Why:* the mapping from outcome to
inference is a separate object. A script measured exactly what it promised and printed "hypothesis
survives" twice when the correct reading was the opposite, because it never listed a rival explanation for
the signature it found. The follow-up that settled it was a control: the same statistic on the prediction
and on the truth. *Apply:* for every diagnostic write down the two or three processes that could produce the
observed signature and the measurement that separates them, and run that measurement in the same script. A
signature shared by the truth, the prediction and the residual is a property of the sampling.

**42. Compare every diagnostic statistic against the same statistic on the target.** *Why:* two
load-bearing "facts" survived for months because nobody computed them on the truth. A high autocorrelation
of the residual looked like accumulating error and was what dense sampling of any smooth series gives; a
per-unit offset with no spatial structure looked like an instrument artifact and was what a model that
absorbs strong real spatial structure necessarily leaves behind. Both read a property of the model as a
property of the world. *Apply:* recompute every residual-derived signature on the target and on the
prediction before it motivates a build.

**43. Prefer the family member with a published coefficient.** *Why:* pre-scaling a feature by the value an
external standard fixes turns the fitted coefficient into a corroboration statistic: 1.0 supports the
mechanism, 0.03 says a generic shape is being fitted. In the teaching case it returned 0.03 with a null
cross-unit scaling test and closed the last member of a family in eighteen seconds. *Apply:* among candidate
bases, spend on the one whose amplitude is fixed by an outside source, because it converts a fit into a
test.

**44. Check that a dimension varies before modelling an interaction in it.** *Why:* an interaction term
A x B was proposed where B varied by 0.5% within a unit, so within a unit the term was proportional to A and
carried no independent information. One line of descriptive statistics would have predicted the null.
*Apply:* for every proposed interaction, report the within-unit and between-unit variance of each factor
first.

**45. Changing a deployed constant invalidates the hazard rules measured around the old value.** *Why:*
hazard rules ("never set X below 5") established by one-factor-at-a-time sweeps at the old constants cannot
distinguish a main effect from an interaction with the constant that just moved. End-to-end gating kept the
change safe, but its optimality was never re-checked. *Apply:* when a constant changes, re-run a small
factorial over it and every hazard rule tuned in its presence.

**46. Run the factorial after a retune, and judge each hazard on the statistic it was set on.** *Why:* a
2 x 2 x 2 over three such rules cost 28 seconds with no retraining and confirmed all three as main effects
(interactions 13 times smaller), reproduced a banned setting's original failure almost exactly, and showed
that the shipped component was load-bearing only in combination. One rule looked nearly free on the pooled
metric and was catastrophic on the worst-unit statistic it had been set on. *Apply:* score a hazard on the
statistic that established it; the aggregate is blind to exactly the failure the hazard exists to prevent.

**47. A one-sided pre-registered threshold lets a broken measurement pass.** *Why:* a noise-floor probe was
pre-registered as "a floor above X corroborates the ceiling". It returned a physically impossible value,
about thirty times the error the deployed pipeline already achieved, and duly printed "corroborates, stop
exploring". *Apply:* give every threshold a two-sided sanity envelope derived from a known quantity (a
floor cannot exceed the error a deployed model already achieves), and make a violation an explicit abort
branch that refuses to emit a verdict.

**48. When a diagnostic is a neighbour method, check what dominates the distance.** *Why:* a
nearest-neighbour probe predicted absolute values whose per-unit offset spanned a huge range, so the offset
mismatch dominated; added features then made it monotonically worse through dimensionality alone, which
fabricated a clean-looking ladder pointing the wrong way. *Apply:* predict the residual from an anchor
whenever a per-unit offset exists, and compare feature sets at matched dimension or with a predictor whose
error cannot rise from added features alone.

**49. A ceiling probe is valid only if its estimator beats the incumbent.** *Why:* an "irreducible error"
estimate was produced by an estimator that lost to the trivial baseline on rows where the deployed pipeline
beats that baseline easily, and its threshold fired a "stop exploring" recommendation. *Apply:* before
reading any floor or ceiling estimate, check that the estimator reproduces or beats the incumbent on the same
target; otherwise the result is untestable for bounding headroom and speaks only about its own mechanism. A
neighbour-based floor answers "is this transfer mechanism viable", never "is there information left".

**50. A modality test cannot carry a discreteness hypothesis, because a spike is also multimodal.** *Why:*
a mechanism predicted discrete per-unit values; the pre-registered test was "the fitted distribution is
multimodal by mixture-model criterion". It passed by a wide margin while the distribution was a spike at zero
with 94% of units inside a narrow band, the opposite of the hypothesis: a mixture needs several narrow
components to fit a spike. *Apply:* test discreteness as "modes exist and are separated from the null value
by more than their width". In general, construct the shape that would most embarrass a criterion and check
that the criterion rejects it.

**51. A good null makes a null result trustworthy.** *Why:* a deliberately mismatched reference scanned
over the same grid gave large values piled on the grid edges, while the real data sat tightly at zero. That
contrast licenses "there is no effect" over "the detector is blind", and it cost one extra line. *Apply:*
every search-for-a-parameter diagnostic scans the same grid against a deliberately wrong reference.

**52. In an assay-sensitivity arm, the statistic is the dose-response slope.** *Why:* in an
injection-recovery ladder the detector exceeded its shuffled null at zero dose, so the rule "fires when it
exceeds the null by 3 sd" was satisfied with nothing planted, and the script recommended reopening a family.
Planting a perfect signal at double amplitude moved the statistic by 2%, while its offset from the null was
ten times larger. *Apply:* define detection as a large monotone response to dose (the statistic must move by
more than its own null-to-baseline offset across the ladder). A flat dose-response means the instrument
bounds nothing, and the claim it was meant to test is unsupported, neither refuted nor confirmed.

**53. A high error rate at the inference layer is a signal to slow down.** *Why:* in one day every
measurement executed correctly and six outcome-to-conclusion mappings were wrong: two draws read as a trend,
an unverified count steering a round, two model properties read as world properties, a ceiling probe weaker
than its incumbent, a modality test satisfied by the refuting shape, a dose-response rule satisfied at zero
dose. The estimation-side honesty rules (out-of-fold fitting, nested selection, partition redraw,
delete-the-idea control) caught none of them. *Apply:* every diagnostic names its rival processes and
measures the discriminating one in the same script; and when inference errors come this often, run fewer
tests, each with its inference rule written out and stress-tested against the shape that would most
embarrass it.

**54. Test the joint sign pattern of predicted-versus-observed residuals.** *Why:* an analysis showed that
each apparent offline-to-board sign flip lay inside the sampling law of a fully transferring effect, and the
attenuation heuristic was retracted. Then the decisive statistic appeared: over all five components with both
an offline estimate and a board delta, the residual was positive five times of five (sign test p = 0.031).
Per-point interval checks have no power against a common bias. *Apply:* with N paired (predicted, observed)
points, run the sign test on the residuals before concluding anything about transfer. This lesson corrects
the over-correction recorded under lesson 58.

**55. A tail veto earns its keep when the point estimate fails.** *Why:* of three components whose offline
marginals did not appear on the board, the one that satisfied the worst-units veto missed by a negligible
amount and the two that did not missed about 25 times worse. The veto did not make the marginal transfer; it
bounded the loss when the marginal was wrong. *Apply:* score a tail control on the runs that failed as well
as on those that worked.

**56. Measure selection optimism directly; it needs no board and has a falsifiable signature.** *Why:*
selection optimism and population shift can be told apart inside the training set: choose the configuration
on half the units, score that choice on the other half, repeat over splits. In the teaching case optimism
was about a fifth of a typical effect on a 14-configuration menu and grew monotonically with menu size, which
is the signature of adaptive selection; a fixed population shift does not depend on menu size. It explained
about a third to a half of the observed attenuation. *Apply:* run the half-split before attributing any
offline-to-deployment gap, and report the menu-size trend, since the trend identifies the mechanism even when
the magnitude does not close the gap.

**57. Quantify what a safety constraint costs.** *Why:* the configuration with the largest marginal was
chosen on 196 of 400 half-samples, a robust winner, and it breached the tail veto; the veto therefore had a
measured price. *Apply:* any hard constraint whose cost has never been measured is a habit. Measure it once
and state the price next to the rule, so that honouring it is a decision.

**58. The workflow that searches is also the workflow that spends.** *Why:* rounds of about 21 candidates
each were scored against one evaluation set as if that were free. The cost appeared as a systematic
offline-to-board attenuation that was misdiagnosed twice: first as "our validation does not transfer" (a
property of the problem), then as "full transfer, the flips were noise" (an over-correction). It was the
search itself: optimism grows with the number of alternatives compared, and it had reached about a third of
the size of the effects being chased. *Apply:* any loop that scores many candidates on one held-out set
carries a cumulative budget counter (`query_budget.md`), requires each reported effect to state how many
alternatives it was chosen from, and subtracts the optimism for that count.

**59. A flattening ladder of gains is ambiguous, and the ambiguity is resolvable.** *Why:* diminishing
deployment gains read naturally as "the problem is mined out". The alternative is that the measurement
degraded as fast as the campaign got better at selecting on it. The two have opposite remedies: exploit, or
obtain a fresh verification population. *Apply:* run the half-split optimism measurement of lesson 56 and
read its menu-size trend before writing any ceiling narrative. A verification ceiling is not a signal
ceiling.

### 60 to 80: describing the object, workflow plumbing, decompositions

**60. For every external article that helps, ask why you did not write it.** *Why:* in one day three
external write-ups proved useful and all three were reproducible from data the campaign already held: a
parameter effect hidden inside components consumed only as an average, a property of the scoring split stated
in the rules, and a tight joint error of several models visible in a twenty-line cross-tabulation. Each time
the data and tools were in hand and the question was absent. *Apply:* make "could we have found this" a
required field on every imported finding. It audits the coverage of the loop, and a coverage gap keeps
costing on every later question of the same shape.

**61. Charge one phase with describing the object.** *Why:* every phase of the loop was oriented to
candidates (import methods, measure facts for inventors, attack certificates, propose, test), and none wrote
the descriptive account whose function is to generate questions. Three descriptive artifacts were missing,
each mapping to a class of failure: the component atlas (aggregates hide the tail behaviour of their members;
a component can be worse on average and far better where it matters), the consensus map (agreement is
treated as evidence without testing whether it predicts correctness, which is how structured decoys
survive), and the apparatus spec (beliefs about how the evaluation works go unverified against its own
documentation). *Apply:* run a descriptive phase whose output is a description with these three artifacts
plus a list of unasked questions, and forbid it from proposing solutions, because proposing crowds out
describing.

**62. Open every aggregate you consume.** *Why:* a trimmed mean, a vote, a blend and an ensemble average
each turn a distribution of component behaviours into one number chosen to hide the disagreement in which
the tail lives. The members' individual behaviour is unexamined by construction, and that is where an
outside party found an effect the campaign already owned. *Apply:* for every aggregate in the pipeline,
tabulate each member across the error distribution, on the tail axis.

**63. Audit the aggregator before blaming the component.** *Why:* an opened aggregate showed one member
with about twice the worst-case error of the others. Dropping it or swapping it for five alternatives moved
the tail statistic by almost nothing, because the robust aggregator was already discarding exactly those
excursions. *Apply:* an anomalous component matters only if its consumer propagates the anomaly, so check
the consumer's robustness first. A clean null with a mechanism closes the question; an ambiguous null gets
asked again.

**64. A generic "describe the system" charter does not recover the artifacts that matter.** *Why:* tested
blind, three describers with a generic charter recovered one of three target artifacts in part and none as
specified. Describers go to the largest pile of already materialised numbers, exhaust it rigorously and stop
at its boundary. Anything outside the arrays is invisible (the scoring apparatus was never treated as part
of the system, and one describer dropped the question after a single failed page fetch); the axis defaults
to whatever the campaign already optimises; the sign defaults to the flattering reading (the cell where
models agree tightly and are jointly wrong was printed and read as "easy cases"). *Apply:* name the
artifacts in the charter. Description carries no adversarial pressure of its own. The three instructions are
given in lesson 68.

**65. Harvest the off-target findings of a failed experiment separately from its grade.** *Why:* the blind
test missed its three targets and produced, unprompted, findings none of the targets covered (an aggregator
whose realised weights ranged from 5.5% to 19% where the design said 14% each; a celebrated component partly
buying back damage its own upstream stage inflicts; fold-level numbers that report tail composition).
*Apply:* grade the experiment against its objective, then list what it found regardless, and report the two
separately so that a failure verdict does not bury the yield.

**66. Compare correlations by sign before magnitude.** *Why:* a script compared two candidate veto
statistics by absolute correlation with held-out damage (0.53 against 0.49) and concluded "equivalent",
while one correlation was positive and the other negative. The alternative was an anti-instrument. *Apply:*
compare the signed relationship to the thing you fear; treat an absolute-value comparison of predictors as a
bug.

**67. An oscillating recommendation is a measurement.** *Why:* a recommendation on one small difference
changed three times in a session as each new instrument arrived. That is direct evidence that the difference
sits inside the decision noise of the available instruments. *Apply:* stop selecting on that axis and settle
it by minimum regret; another comparison adds nothing.

**68. Three named instructions for a descriptive phase (distils lesson 64).** *Name the object:* the scoring
apparatus is part of the system, and a failed source fetch is not permission to drop a question. *Name the
axis:* demand tail statistics per component, and treat component name suffixes as a parameter grid to be
separated. *Name the sign:* for each favourable pattern, exhibit the population that would refute it (for
example high agreement together with high error), or state that it was sought and does not exist. *Why:*
description reliably reports the comfortable reading, so adversarial pressure must be supplied from outside,
or the campaign's documented failure mode reappears inside its own descriptive phase.

**69. Hand-assembled prompt strings are the weak point of an agent workflow.** *Why:* four times in one
session a new schema field or verdict value broke a downstream projection: a survivors filter that ignored a
new verdict, digests that omitted new fields, a digest that omitted the very field a new section was asked
to report on, and a patch script whose bare string replace silently did nothing, so a field was documented
as required, never enforced and never emitted. None fails a syntax check or fails loudly at run time.
*Apply:* build every digest from the schema's own `required` list; add a consistency check that every
property described as required appears in `required`; in patch scripts assert the match count of every
replacement.

**70. A lesson ledger grows past the point of use and needs periodic distillation into a preflight.** *Why:*
sixty-nine true lessons were collectively unusable; nobody reads that many items before starting work.
*Apply:* distil whenever the ledger passes roughly thirty items since the last distillation. Keep only items that are cheap (under an
hour), derived from a specific measured failure, and would have prevented a wrong conclusion that was
actually drawn and reported (8 of 69 passed this filter and became `PREFLIGHT.md`). Order the result by
cheapness times how often it fires. The ledger stays as the evidence trail.

**71. Derive the realised weights of every composite.** *Why:* a design document gave two components
weights 0.325 and 0.35; the realised weights were 0.43 and 0.12, confirmed analytically and by perturbation.
Two ordinary habits caused it: an injection path that re-adds a component already in the base, and a later
stage that dilutes everything by a factor nobody carried through. Months of marginal arguments had described
arithmetic the system does not perform. *Apply:* for any composite, derive the coefficients symbolically or
nudge each input by a known amount and read the output change. It costs minutes and belongs in the
descriptive pass.

**72. Decompose a gated mechanism into its four cells.** *Why:* a component credited with a large gain was
measured in all four cells (gate only, route only, both, neither): the gate alone cost enough that 44% of the
component's gross gain was repair of damage its own upstream stage inflicted. *Apply:* whenever one
mechanism is described as fixing another's output, build the four cells (one extra evaluation each) and
state every marginal net. The table also suggests the next hypothesis: use the routing signal directly on
the ungated baseline and skip the cost of the gate.

**73. Check whether fold-level consistency measures skill or tail composition.** *Why:* "all folds
improved" had been a headline criterion. Across folds the pooled error varied 3.6 times more than the median
per-unit error, with the top three units holding 15% to 36% of a fold's squared error, so a fold's number
mostly reported which extreme units landed in it. *Apply:* report pooled and median-per-unit figures per fold
side by side; if their ranges differ by more than about a factor of two, say which of them the consistency
criterion tests.

**74. A monotone response surface is the strongest form of null: sweep the relaxation.** *Why:* a hard
binary decision looked like a liability. Relaxing it to a continuous weight with both endpoints pinned to
known configurations gave a monotone response on every statistic, so there was no interior optimum and the
hard decision was correct. Testing one softened alternative would have shown only "that one is worse".
*Apply:* pin both endpoints of a relaxation to known points and sweep between them; the compute is the same
and the comparison becomes closed.

**75. An expensive pre-filter can earn its cost by concentrating a weak signal.** *Why:* a routing signal
was worth three times more on the small set a costly pre-filter selected than on the broad set it nominally
qualified for, where it also failed every risk gate. *Apply:* before removing a stage that measures badly in
isolation, measure the stage that depends on it with and without the restriction.

**76. Knowing which units are bad is not the same as having something better to do on them.** *Why:* a
per-unit error predictor was as strong as the campaign's trusted tail veto (rank correlation 0.56 out of
fold), and the obvious use, shrinkage toward a simple baseline, died in twenty lines: the baseline was worse
than the model in every error decile including the worst. *Apply:* for any "use uncertainty to improve the
estimate" proposal, first check that the shrinkage target wins somewhere. An uncertainty channel that fails
this stays useful for routing, thresholds and risk reporting, none of which moves the mean.

**77. A ceiling pre-screen earns its keep by firing before the dependency is built.** *Why:* the proposal
above needed an expensive predictor, and the script crashed while building it; nothing was lost, because
step 0 had already returned the verdict. *Apply:* order every test so that the cheapest disqualifying
arithmetic runs before anything it would otherwise justify constructing.

**78. Bound the strategy classes before choosing between them, and compare the bound to your reach.** *Why:*
months went into tail-targeted methods without asking whether a tail-only strategy could reach the target.
One oracle computation showed the target was reachable either by perfecting about 10% of units or by a
uniform improvement of about a third, so the target favoured neither class. The useful number was the
ratio: the best method captured 22% of the gain available where the campaign was already looking. That
turns "are we in the wrong place" into "we are in the right place at a quarter of the required strength".
*Apply:* for any target, compute the oracle of each strategy class and divide your current gain by the
oracle of the class you pursue.

**79. A correction that makes things worse has identified what the structure is.** *Why:* a carefully
constrained correction for presumed recalibration steps in a signal made matching worse, and its detector
found no steps in more than half of the units: the steps mostly were not there, and those that were belonged
to the subject, so removing them deleted signal. *Apply:* read a degrading correction as positive evidence
about the nature of the residual structure. It is worth more than an ambiguous small improvement.

**80. Three independent attempts at one nuisance parameter, all failing differently, close the family.**
*Why:* three parameterisations of "remove the calibration mismatch" failed in three different ways, which
supports one conclusion: the mismatch is real and is not calibration. The conclusion was available only
because a plant had established that the information exists. *Apply:* pair every nuisance-correction
programme with a plant, so that a failure says whether the target was absent or merely unreachable.

### 81 to 106: forecasts, ranking, oracles, the cost of a first test

**81. Judge scores are miscalibrated in both directions (strengthens 6).** *Why:* on one panel a 45% score
priced a clean survivor about right and a 10% score badly underpriced a candidate that survived after its
illegal stated premise was swapped for the neighbouring legal one. *Apply:* use such a score only to order
candidates within one run, and never let a low score suppress a repair attempt.

**82. A control that fixes the surface feature and varies the suspected confound localises the fault.**
*Why:* a premise ("each unit's own labelled segment is a good fitting window") measured false, but a control
with a window of matched length drawn from the right regime reproduced the gain: the variable was regime
overlap, and window length was irrelevant. *Apply:* whenever a "wounded" verdict is plausible, add one
control that swaps only the suspected confound and holds everything else fixed, so that the repair condition
is read off directly.

**83. Convergence of two candidates on one repaired condition from opposite directions is the strongest
evidence for that condition.** *Why:* one candidate built forward to a design and survived; another started
from the opposite design, failed as predicted, and survived after repair by adopting the same source of
information. *Apply:* treat a condition reached independently by a forward design and by a repaired failure
as a standing invariant for the whole family.

**84. A disjoint scoring population is a definitional ceiling.** *Why:* one candidate needed information to
pass between two populations that were disjoint by the documented design of the evaluation. Other ceiling
verdicts name a threshold that a different witness might clear one day; this one names a set-membership
fact. *Apply:* when a premise spans two named populations, check first whether the split between them is a
measured boundary (repairable) or a documented partition (terminal), and label the ceiling accordingly.

**85. Check jurisdiction before accuracy.** *Why:* a selection mechanism was scored as if its job were to
choose correctly among alternatives of a certain kind, while only 1.3% of the hypothesis pool contained such
an alternative. On the other 98.7% of units no judging mechanism could have changed anything. *Apply:*
before scoring a selection or routing mechanism, compute the fraction of the pool that instantiates the
phenomenon under test. It is logically prior to any accuracy figure and belongs next to the ceiling
pre-screen of lesson 77.

**86. "No violations over a large menu" and "a deployable component exists" are different claims.** *Why:* a
verification property held with zero counterexamples over 231 configurations, all reported so that the
headline carried no selection optimism, and still no configuration met the deployment condition, which was
a dispersion-to-effect ratio that an unbiased channel with large per-unit variance misses entirely.
*Apply:* report the truth of the premise and the existence of a payload as independent facts, each against
its own condition.

**87. A bar that keeps landing at the same number across unrelated mechanisms is a property of the channel
(strengthens 32b).** *Why:* five separately designed candidates, built in different rounds, each gated its
survival on the same witness accuracy of about 0.80 set by the (2p - 1)^2 law and measured 0.65 to 0.72,
reading the same shared information. *Apply:* stop pricing the ceiling as a property of the next
architecture. Only a new measurement channel can move it.

**88. "Survived" can be a bet on a named future gap; read the condition for success before the verdict
word.** *Why:* a candidate's bar-clearing headline was built with an explicitly illegal peek, and its
status rested on a separately quantified legal repair (reduce a measured per-unit anchor error to a stated
size). That is a precise, checkable bet. *Apply:* the verdict answers "did the premise survive"; the
condition field answers "what must still become true in a legal build". Read both whenever the headline
carries a peek.

**89. A round where the ranking worked (strengthens 81).** *Why:* scores of 50%, 10% and 8% ordered three
verdicts correctly while the absolute values stayed wrong (the two low scores undersold candidates that each
cleared at least one clause under repair). *Apply:* as in 81: order with it, never read it as a probability.

**90. Read a judge score next to its own menu size (strengthens 81).** *Why:* in one round the ranking
inverted: the highest-scored candidate, with by far the largest search menu (109 configurations), was the
one that failed, and all three lower-scored candidates with small menus survived. Selection optimism grows
with menu size (lessons 56, 59), so a score built on a wide, already tuned menu deserves a harder discount.
*Apply:* print the menu size beside the score and distrust "large menu, high score" first.

**91. When every survivor states its condition as a capacity threshold and the one predictive mechanism
fails by an order of magnitude, the bottleneck is capacity.** *Why:* in a systems-performance round the only
candidate that tried to win by predicting which item to keep needed a signal 11 to 16 times stronger than
measured, while three independently designed survivors each reduced to "works once the tier exceeds N
units". *Apply:* allocate the resource before routing it cleverly, and require any smart-selection premise to
beat the plain-capacity baseline it implicitly competes with.

**92. Third instance of the menu-size inversion (strengthens 90).** *Why:* the higher-scored candidate with
the larger menu (45%, menu 306) came back wounded; the lower-scored one with the smaller menu (25%, menu 85)
survived after repair. *Apply:* the specific combination to distrust is a large menu together with a high
score.

**93. An oracle gap means nothing until the legal baseline under it is checked for signal.** *Why:* a
truth-peeked mechanism measured a real, reproducible gap over a comparator that itself scored zero, so the
gap said nothing about how much a legal repair could recover. *Apply:* before interpreting any "oracle
against legal baseline" figure, confirm that the legal baseline carries signal on its own.

**94. A verdict is only as trustworthy as the label source it was scored against.** *Why:* a mechanism
worked when scored against directly read labels and its survival was conditional on never being selected or
verified against proxy labels for the same cases; two label sources aimed at the same fact are not
interchangeable. *Apply:* pin selection and final verification to the label source that matches deployment,
and treat a result obtained on a proxy source as unverified until re-run on the real one.

**95. An oracle that peeks several latents needs each latent tested separately.** *Why:* an oracle peeked
two latents; the first measured about zero and the second carried a real, deployable gain. Stopping at the
first probe would have certified the mechanism dead. *Apply:* give each peeked latent its own measurement and
its own verdict.

**96. A "wounded" verdict can coexist with a number that already clears the bar (strengthens 27).** *Why:*
the literal premise died at its specified oracle step, yet the object composed from the surviving latent
measured a real, high-confidence gain in the same session. *Apply:* read the condition-for-success field
before assuming a wounded round produced nothing, and treat promotion to "survived after repair" as a
separate test pass that the composed number does not grant for free.

**97. The inversion is a rank-order failure among competitors, with the floor of the scale still
informative (qualifies 90 and 92).** *Why:* a round's only candidate carried the lowest score on record
(10%) and the score correctly predicted the outcome. *Apply:* a floor score earns more trust than an
inflated score on a large menu.

**98. Check the candidate's best-case payoff against the credit threshold before measuring what gates it.**
*Why:* two unrelated candidates each converged on a realisable payoff of about a third of the campaign's own
credit bar (the smallest effect its ruler can credit, two standard errors). A target below the ruler's
resolution cannot be credited even if the gating detector were perfect. *Apply:* compare the stated best
case with the standing credit threshold first, and spend nothing on the enabling-precision question when it
is below.

**99. A screening score that tops its pool is still not evidence (strengthens 39).** *Why:* in a second
domain the candidate with the highest pre-test score of its pool, clearly separated from the rest, returned
a ceiling verdict once measured. *Apply:* a ranking assigned before measurement carries no predictive
weight, however decisively it separates the top candidate.

**100. Menu size remains the number worth reading before the percentage (extends 90).** *Why:* the largest
menu recorded (1,700 configurations) carried the round's lowest score (5%) and it correctly predicted a
ceiling verdict. With lessons 92 and 97 this shows the relation informative in both directions. *Apply:*
discount a large-menu score harder, and expect the discounted score to be right.

**101. A low score on a small menu and a low score on a large menu mean opposite things (strengthens and
partly inverts 90, 92, 97, 100).** *Why:* one round's three survivors carried the lowest scores of the batch
(8% to 12%) on its smallest menus (36 to 62), the signature that had predicted failure on medium and huge
menus in every earlier round. *Apply:* a survival score is not one comparable percentage across menus of
very different size; do not rank across them with it.

**101b. A comparison frame must be equally honest for both arms.** *Why:* an incumbent was scored
held out by data source and a challenger inside the source; the internal gain of +0.002 became a board loss of 0.003, and the
challenger's own equally held-out figure had been far below the incumbent all along. Per-group statistics
inside an asymmetric frame do not repair it. *Apply:* before comparing, check that both arms were held out
in the same way (`PREFLIGHT.md` item 9). Lesson 125 gives the distillation-depth form of the same error.

**102. The menu-size discount is a proxy for selection risk and should fire only when the credited number
was chosen from the menu.** *Why:* a survivor's headline was a deterministic oracle with no selection
involved and still drew a low score because of its stated menu. *Apply:* before discounting for menu size,
check whether the credited number depends on which menu entry was picked; only that dependency carries the
multiple-comparisons risk.

**102b. A frozen-feature or linear-probe student does not stand in for a trained chain.** *Why:* for the
same change to the training targets, a linear probe on frozen features read +0.006 and the fully trained
chain read -0.007. *Apply:* promote a change to what a model is trained on only after one trained pair
reproduces the sign of the cheap proxy (`PREFLIGHT.md` item 10).

**103. The ranking failed, the invention did not: remove survival forecasts from the ranking.** *Why:* five
lessons (90, 92, 97, 100, 101) had each recorded the inversion as a calibration curiosity. Then one run
settled it: the campaign's largest efficiency gain (about a tenfold cut in the run time of one pipeline
stage) had been generated by the council, ranked sixth of sixteen with a survival score of 8%, and never
tested, because only the top three were. It reached deployment because a human read the list of untested
candidates. The per-candidate judge panel cost about a third of a run's agents; its one demonstrable
competence, checking a candidate against the already-tried list, is a factual comparison that needs one
agent. *Apply:* rank by a formula over test cost and evaluation-set spend. This supersedes the use of judge
scores described in lessons 6, 81, 89, 90, 92, 97, 100, 101 and 102.

**103b. A crashed generation phase is not a round with no survivors.** *Why:* a generation phase died on a
usage limit; the empty survivors list was the crash, and six ranked candidates sat unmeasured in a backlog.
*Apply:* record the run as suspended and export every ranked but untested candidate as a numbered backlog row
with its named first measurement. A brief that is not exported will not be run.

**104. A test that spends nothing against the evaluation set is nearly free and must not queue behind
forecasts.** *Why:* selection optimism is the one campaign resource that cannot be refilled. A candidate
whose first test reads only the deployed artifact, its own logs, or a population never used for selection
costs minutes and nothing else. *Apply:* run such candidates in a free lane, ahead of the ranked list and
outside the top-K limit. The first full round under this policy priced every one of its five first tests at
zero evaluation queries (15 to 50 minutes of re-analysis each), so the policy changed the default cost of a
first test for the whole batch.

**105. The cheap outputs of the workflow ship and its architecture-shaped outputs do not; budget by that
split.** *Why:* what shipped from invention briefs in one campaign was a refit on all data with several
seeds, the data-curve measurement that justified it, a check that cleared its way, a ruler diagnostic and
one efficiency fix. Five composed model classes went 0 for 5 while consuming the largest share of every run
they entered. An audit of one run's 208 written files found 8 that produced a number anyone used again, and
none of the 43 generator scripts or 5 assembler scripts was read a second time. *Apply:* composition of new
model classes defaults to off and has no guaranteed test slot. The audit half of a council runs below the
frontier as well as at it, since it produced everything that shipped; lessons 148 to 155 govern where the
invention half aims.

**106. A miss without a named missing condition is an unfinished job.** *Why:* the prompts were already
enablement-shaped, and the verdict names and a kill-list section undid that at the last step. *Apply:* the
test phase is called Enable and its verdicts are `WORKS_AS_STATED`, `WORKS_UNDER_CONDITION`,
`CONDITION_IDENTIFIED`, `INSTRUMENT_REQUIRED`, `BLOCKED_BY_ARITHMETIC` and `NOT_MEASURED`. Only the
arithmetic verdict closes a class or feeds the next run's list of tried levers; every other verdict carries
the missing condition and the price of supplying it, and the synthesis reports "conditions not yet supplied"
where it used to report kills.

### 107 to 131: supplies, rulers, initialisation, trained arms

**107. An oracle built from the mechanism's own low-cardinality discrete code, fitted with the true labels,
turns a ceiling into a proof.** *Why:* a mechanism routed one variable through 12 discrete values into a
linear head. A lookup table over that discretization, fitted with the ruler's own labels and scored out of
sample, still read negative. No future data draw, larger sample or repair can rescue such a mechanism, so
the record correctly shows no missing condition at all. *Apply:* before pricing the repair of a
capacity-bound mechanism, check whether an oracle built at its own discretization already fails out of
sample; if it does, the closure is exact and no more evaluation budget goes to that class.

**108. When independently tested candidates all name the same holdout as their cheapest supply, the
bottleneck is the evaluation population.** *Why:* three of five candidates in one round converged on one
holdout of under a thousand rows as the only honest population able to test them, and one named that
holdout's homogeneity (more than four fifths from one data source) as a confound that required a second, disjoint
population. *Apply:* when a scarce resource recurs in unrelated candidates' cheapest-supply fields, the next
build is a second independent evaluation population; iterating on mechanisms keeps hitting the same wall.

**109. Require two independent rulers to agree in sign.** *Why:* a candidate's oracle read positive on one
ruler and negative on the other, both under the bar. The sign disagreement alone closed it: a real effect of
the claimed size does not flip between two instruments measuring the same quantity. *Apply:* wherever a
campaign maintains two independent rulers, write a sign-agreement check into every pre-registered gate next
to the magnitude threshold. It catches noise that a single-instrument magnitude test cannot.

**110. Check whether a priced supply already exists before quoting its build cost.** *Why:* a verdict priced
its cheapest supply at four new training runs, about fourteen GPU-hours. All four already existed in the
artifact store with their out-of-fold predictions. Reading them took under an hour with no GPU and no
evaluation budget and refuted the supply: the four proposed members were more correlated with the shipped
member (0.980) than a plain reseed was (0.977). *Apply:* the enabling agent searches the artifact store for
the names in its own cheapest-supply text and reports what it found. A supply that is already built is a
measurement waiting to be read.

**111. When a gate is a conjunction, measure whether its two halves are one axis.** *Why:* a blending phase
was closed on "no member is both decorrelated enough and accurate enough", and every candidate proposed
another hunt for the missing member. Decomposing members by what they share showed that one mechanism
governed both halves: distillation from a common teacher made a member strong and at the same time made
all members agree, while every undistilled member cleared the correlation half and missed the accuracy half
by three to six times the tolerance. *Apply:* group candidates by shared ancestry whenever a diversity claim
is on the table. A conjunctive gate governed by one mechanism cannot be opened by sweeping either half; the
output is a missing condition of a different shape (here, a second independent teacher family).

**112. A verdict that predicts its own irresolvability must block the test.** *Why:* a verdict predicted an
effect interval that straddled the display resolution of the deciding instrument and said so in writing.
Two scarce submissions were spent anyway; they read one display step and zero, and their mean equalled the
internal estimate. Two reads of a half-resolution effect are a coin. The cheapest supply named in the same
field, one more model holding out a different fold, would have bought a new population. *Apply:* whenever a
verdict carries a predicted interval, compare it with the resolution of the instrument that would test it
before spending that instrument; refuse the test when the interval straddles the decision and route the
question to compute. A good brief cannot protect a campaign from a reader who ignores its arithmetic.

**113. An effect specific to one trained instance is not an effect of the recipe.** *Why:* a readout
parameter tuned per checkpoint gave gains of +0.0013, 0, +0.0008, +0.0004 and +0.0001 over five folds of one
recipe. The first deployed artifact drew the high end and moved a display step, the second drew the middle
and moved nothing, and the ensemble measured about +0.0003, because averaging over checkpoints averages
over the distribution the effect lives in. *Apply:* when a per-unit read shows the effect varying across
units by more than its own mean, the deployable quantity is what survives averaging.

**114. An ad hoc probe must inherit the ruler's refusals as well as its data.** *Why:* the scoring harness
marked certain arms contaminated and printed a null for them. A day of quick probes written outside the
harness scored the same reference against those arms and produced a table the harness would have refused to
emit. The correlation results of that day were unaffected, since a correlation never touches a label.
*Apply:* when a quick script bypasses the official evaluator, sort every claim by whether it consumed the
labels and re-derive those that did under the evaluator's rules. Copy the evaluator's eligibility flags into
the probe before opening the reference.

**115. When two artifacts score identically to every printed digit, test for identity.** *Why:* a probe
meant to separate two sources of information returned exactly +0.00000 for one of them, which reads as a
striking result and was a bug: one input file was byte-identical to the array it was compared with. *Apply:*
a difference of exactly zero between two supposedly distinct artifacts is evidence about the pipeline. Make
an identity check automatic in any probe that decomposes one quantity into two sources.

**116. A supply is not cheap if it buys again a kill the campaign already recorded.** *Why:* the supply of
lesson 110 priced a direction that the campaign's own findings file had closed six days earlier, with the
mechanism and the measuring script named. In the same round a replication of that old result was first
written up as a discovery, the same blindness pointing the other way. *Apply:* search the findings record
for the direction as well as the artifact store for the files. A supply that contradicts a dated earlier
closure cites that entry and says why it is reopened. Search your own record before claiming either a cost
or a finding.

**117. A member class that is dominated individually can still be valuable collectively.** *Why:* four
decorrelated members were each mixed into an incumbent one at a time, every weight curve fell from zero,
and the class was written up as dominated. Averaged among themselves the same four gained more than three
times the campaign's bar over their best single member: decorrelation pays inside a family before it pays
against an outsider. *Apply:* when a diversity claim is tested by mixing members into an incumbent one at a
time, also score the candidate family as an ensemble on its own before any verdict about the class.

**118. When two rulers fail a contrast for opposite reasons, report that as the finding.** *Why:* the
decisive contrast of a day could not be settled: the high-power ruler was biased toward the incumbent by a
documented factor of two to three (the incumbent's teacher had been selected on it), and the unbiased ruler
had a standard error wider than the gap. The temptation is to pick the preferred answer or to average.
*Apply:* name the quantity, state that the instrument set cannot measure it, and convert that into the
specification of the instrument that could (here: the second ruler's lack of bias at about twenty times its
power). A central unresolvable contrast is the strongest argument for buying a new instrument.

**119. Initialise new machinery at the incumbent.** *Why:* a strong external architecture applied one trick
twice: a new head behind a gate initialised to zero, and a new block in residual form with a small scale.
At step 0 the candidate equals the baseline, so the optimiser can improve on it or leave it alone, and a
badly learned addition cannot destroy the path that already worked. The comparing campaign had three
architecture kills on record in each of which the new machinery replaced part of the incumbent and had to
beat it from a cold start, which produces exactly the "method class looks dead" pattern. *Apply:* an
architecture candidate must be expressible as `incumbent + gate * new`, with the gate at zero or the new
path at identity at initialisation. If it cannot be written that way, the arm measures initialisation as
much as mechanism. Refined by lesson 123.

**119b. Premise verification rarely closes a candidate; the size-weighted comparison with the credit bar
does.** *Why:* five consecutive arithmetic closures all reproduced their stated premise as true and were
closed by a second step: weighing the confirmed effect against the credit bar on the population it touches
(a real defect affecting 11% of cases would have needed an implausibly large per-case deficit to matter).
*Apply:* put the effort of a first test into that comparison. Strengthened by lessons 127 and 130.

**120. A premise check whose "pass" confirms the mechanism's own target defect is evidence for the missing
condition.** *Why:* a check confirmed that the deployed model was blind to a transformation it should have
been equivariant to. The premise passed as written, and the pass was the proof of the defect the candidate
exists to fix. *Apply:* read such a pass as an indictment of the incumbent and as the specification of the
missing condition; it is no reason to skip the build.

**121. State a round's tested count in words.** *Why:* a round scored six candidates and tested none;
"tested 0, survivors 0" was distinguishable from six candidates with intermediate verdicts only because the
entry also said "verdicts: none". *Apply:* whenever the tested count can be zero, write it out next to the
totals.

**122. Pair a scored candidate menu with an independent replication.** *Why:* a round whose own candidates
never reached a first test still banked one measured result, the weak replication of a published recipe,
which was the only line that moved the campaign's knowledge of the frontier. *Apply:* run a replication
check beside the menu, so that a round cannot close with zero measured lines. Strengthened by lesson 128.

**123. An imported component enters as `incumbent + per-output zero-initialised gate x new`, never as a
fixed mix applied to all outputs (refines 119).** *Why:* in a round of trained arms the only harm came from
a distant import wired in at a fixed 0.85 weight for every output. Its internals started at zero, so step 0
equalled the incumbent, which satisfied lesson 119 only at initialisation: no output had a cheap way back
to the original read, and the outputs the import was meant to help lost most. The round's only positive
above two standard errors was an additive zero-initialised embedding that the optimiser could leave at
zero. *Apply:* give each output its own gate back to the incumbent. A working rule from one pair of arms.

**124. On a distilled student, read the correlation with the teacher before the headline metric.** *Why:*
over six trained screens on one distilled student, the four changes that moved the student's rank
correlation with its teacher by more than 0.005 all lost on the reference ruler, and the two that stayed
within 0.002 gained (rank correlation 0.77 over n = 6, one campaign). The student already weighted its
teacher at 0.95, so a student-side change can only move it off a better-ranked target unless the source it
moves toward is stronger than the teacher on the moved cases. *Apply:* print the correlation with the
teacher in the preflight micro-run beside the mechanism's own signature, and treat a falling correlation
with no named stronger source as a predicted harm before any full training run. A working rule.

**125. When candidate and control sit at different depths of a distillation chain, the pooled held-out
score is an asymmetric frame.** *Why:* three arms were one generation from a new root while the control was
three generations deep. The pooled group-held-out metric paid the arm a between-group component that it
paid equally to a depth-matched student of the old root, a component the board had already refused. With
it the arm passed the bar; without it the arm sat on the bar. Calibrated forecasts were 1.6 to 2.9 times
too low on the pooled read and near their centres on depth-matched reads. A shallow student keeps its
root's between-group ordering, a deep one inherits the chain's, and a pooled metric scores that ordering as
skill. *Apply:* fix a depth-matched control before the arm; print arm minus control pooled, within group,
and with group means grafted from the incumbent, and rest the verdict on those. A pooled delta on a
one-generation object is printed and never used as the bar. A working rule from one run.

**126. A router can only re-weight evidence the routed instances already carry.** *Why:* each output head
already put three quarters of its attention mass on its own region, which left a routing mechanism nothing
to move; the missing quantity was new evidence, which no routing channel supplies. *Apply:* measure where
the attention already sits (one forward pass over a few hundred held-out rows) before building a route.

**127. The maximal-oracle ceiling is a third form of arithmetic closure (strengthens 119b).** *Why:* a
nuisance-removal candidate reproduced its premise and still closed, because the most generous oracle
(assume the whole measured shift is nuisance and remove all of it) landed below the credit bar, and
widening its scope did not lift it. *Apply:* price a nuisance-removal candidate by that oracle before the
first test. A reproduced premise with an oracle under the bar is closed, and the oracle also names the only
scope extension worth a second look. Strengthened by lessons 130 and 138.

**128. A weak external replication is evidence about the frame (strengthens 122).** *Why:* a faithful
external replication reproduced weakly beside an internal menu whose tested members both closed on
arithmetic; the two agree. *Apply:* lower the expected value of the whole axis; do not read the weak result
as raising any single member.

**129. A canary or instrument check needs an upside ceiling before it is built.** *Why:* a check asked
whether one ensemble member had actually run in the hidden evaluation; even a certain "no" would only let a
repair recover that member's share of the blend, so the check had no route to the target. *Apply:* price
what the best possible answer is worth before spending a scarce slot on a question about the apparatus, and
take the free route when one exists (a later submission's side information).

**130. When the oracle for a re-weighting or correction lever loses to the plain baseline, skip the
estimator (strengthens 127).** *Why:* an exact population-match oracle scored below uniform training, and a
half-fitted per-group shift oracle changed nothing the reference rewards; two more candidates closed in one
round. *Apply:* run the oracle first.

**131. A reproduced premise can belong to a different cause than the one named.** *Why:* a real per-group
effect reproduced, and the correction still closed, because the effect was data-source structure and
the correction targeted labeller severity, a facet that was also unobservable in the metadata (0%
coverage). *Apply:* after a premise reproduces, test the attribution: which facet carries the effect, and
whether that facet is observable at all.

### 132 to 158: deployed frame, hidden-target properties, the frontier

**132. Measure in the deployed frame or not at all.** *Why:* scout facts were measured on the easiest
available population with candidate pools hundreds of times smaller than the deployed ones, and every
reported effect shrank two to three times or vanished in deployment.
*Apply:* a scout fact about a retrieval or ranking task is admissible only with the deployed candidate pool
and a population whose distance from the reference set matches the target, or with an explicit statement
that it is an upper bound.

**133. A generator needs a planted positive per component.** *Why:* an enumerator had a bug that silenced
most of its rule families, and the aggregate still looked healthy because the few that fired carried it.
*Apply:* for any enumerator, plant one known output per rule family and assert that each family fires
before reading recall.

**134. Data-touching agents need hard resource caps in the brief.** *Why:* ten agents each loading a
multi-gigabyte table with dozens of forked workers took a shared compute host down for an hour. *Apply:* the
data-access section of a brief states processes, threads, memory caps and a load and free-memory check to
run before starting, and the workflow caps the number of agents that touch data concurrently (two in that
case).

**135. Replayed truths are not real truths.** *Why:* a validation set built by replaying known items as if
they were unseen leaks through features that differ systematically between replayed and real targets:
membership in the training set, idealised values where the real target has measured ones, the popularity of
well-documented items. *Apply:* audit the distribution of every feature for replayed against real targets
before training or selecting on replays.

**136. Calibrate the ruler against the board before trusting any offline gain.** *Why:* two offline-approved
gains (+0.027 and +0.03) were worth 0.000 on the board. Four cheap board probes then fitted a reweighting of
the offline populations that predicted the next submission inside its interval (the observed score fell 0.01
from the centre of an interval 0.05 wide). *Apply:* spend probe submissions on decomposition early. Strengthened by lessons 138, 141
and 147.

**137. Measure the mechanism's precondition in the target domain before building its remedy.** *Why:* an
augmentation rested on a bias that is real in the source domain. A truth-free twenty-minute measurement on
the target domain showed the bias absent there (rank correlation 0.005), so the remedy had no gap to fill.
*Apply:* before pricing any fix for a bias, measure the bias itself on the population the fix will serve.

**138. When a mechanism is proven offline and its payoff depends on a property of the hidden target, probe
that property first (strengthens 136 and 127).** *Why:* a planted oracle against a zero control (+0.088
against +0.000) proved a mechanism; the deployable version was priced at about 0.6 of the oracle, and the
one unknown that set its payoff was a property of the hidden test set. *Apply:* spend one probe submission on
that property before building the full pipeline.

**139. When a missing component has a proxy, ablate the proxy's halves.** *Why:* one half of a substitute
carried a stable share of the result and the other half alone did not reproduce it. A proxy judged only as a
whole hides which part to protect or to buy. *Apply:* ablate each part of a substitute and ask which carries
the share.

**140. Price a fusion by its break-even accuracy on disagreements before building the second model.** *Why:*
a committee of two reduced to one number: the share of the disagreements on which the partner's top answer
must be correct for fusion to pay, which follows from the metric's own arithmetic. *Apply:* compute the
break-even first; any candidate partner can then be checked against it cheaply, before and in place of a
full build. Strengthened by lesson 157.

**141. Both verdicts of a round ended at one board slot as the cheapest supply (strengthens 138).** *Why:*
the unknowns were properties of the hidden target that offline proxies bound and cannot read. *Apply:* when
verdicts keep ending at the same external instrument, plan its use; do not add more offline tests.

**142. A removal is the cheapest experiment: price "delete the component" before "add a better one".** *Why:*
a four-line deletion of a hard rule in the deployed pipeline measured a gain on held-out truths in ten
minutes, while earlier rounds had spent 60 to 90 minutes pricing second models. *Apply:* for every hard rule
in a pipeline, test its removal or softening first.

**143. A passed premise and a proven board effect are two records; list the stages the test did not run.**
*Why:* two "works as stated" verdicts each named downstream stages after the tested step that were not
scored; a green verdict transfers only to the stages its population covered. *Apply:* log the untested
downstream stages next to the verdict and supply the cheapest of them before shipping. (Lesson 150 records
what happened to one of these two on the board.)

**144. Test an axis through its two most different members (strengthens 22).** *Why:* the top five of 14
candidates were one mechanism axis (replace a hard switch with a soft member of a rank fusion). *Apply:*
deduplicate by axis before testing, and represent the axis by its two most distinct variants; its two
highest scores are usually near-duplicates.

**145. A selection-optimism correction shrinks the interval and does not supply a verification
population.** *Why:* a five-arm choice was corrected by split-half pick-then-score, yet the lists that
chose the arm were the only lists that scored it. *Apply:* reserve the verification set before the first
selection read; when none exists, name the fresh population (a new fold or one board slot) as the missing
condition.

**146. Split the two conditions of a gated prior and price them separately.** *Why:* a mechanism worked only
if the hidden population had a certain property (a fact about the target) and the deployable gate fired on
those cases (a fact about the pipeline). *Apply:* factor a joint condition into an offline-checkable part
and a target-only part, finish the first offline, and spend the probe on the second alone.

**147. Schedule one probe that reads several hidden-target properties together (strengthens 138 and 141).**
*Why:* a third round ended at a one-bit board probe as the cheapest supply, twice. A board slot costs more
than the offline tests that identified the need for it. *Apply:* when two verdicts in a round both name a
hidden-target property, design one probe submission that reads both.

**148. A council without a fresh gauge of the frontier searches the wrong space.** *Why:* two councils ran
in audit mode on the campaign's own artifacts with an eight-day-old census of the field; both asked "which
component of ours". Yield: 28 candidates, 4 tested, 1 shipped at +0.005 (inside the tie zone), 1 dropped at
-0.002, and six follow-up reads all positive and all below the board's resolution. In the same week the
public frontier moved through things outside the campaign's inventory (new external data and new model
components). *Apply:* the council does not launch unless a census of
the public frontier (discussion forums, public code, datasets) is at most 3 days old, and its `problem`
carries the census delta.

**149. When every fresh-population read lands inside the instrument's noise, the lever class is spent.**
*Why:* six candidates of one class (reordering evidence already present in the lists) each read between
+0.005 and +0.02 on an instrument with a standard error of 0.015. *Apply:* stop generating in that class.
The next unit of work is a new source of evidence (data or a retrained model) or a one-slot swap probe that
locates the gap by region.

**150. Selection on the read population halved the effect, twice.** *Why:* +0.030 on the lists that selected
the arm became +0.013 on fresh lists; +0.020 chosen from a small menu became -0.002 on the board. *Apply:*
budget a fresh population before the council and hand it to the testers as the only scoring set.

**151. Run the frontier gate before any council.** *Why:* five councils in a row ran with no replication
target while a reproducible external artifact led by more than three times the largest lever the campaign
had realised. The audit council was the mandatory first action, so the frame gap was never routed to
replication. *Apply:* compute G (the best reproducible external score in our frame minus our score) and L (the largest effect
any candidate of ours realised on the deciding instrument in the last two weeks). When G > 2 L, the run must carry a frontier track of ladder replication, with the
rungs of the external artifact's own score history as targets. Lesson 155 sets the final form: the gate adds
a track and removes none.

**152. Never state a ceiling below the frontier.** *Why:* an end-point estimate for the campaign's own
pipeline was written below a score that a public artifact had already reached, and it had to be corrected.
The stance already forbade it; nothing enforced it. *Apply:* no end-point estimate below the best
reproducible external score may be written by the host, the synthesis or a brief. The admissible statement
is the next rung, its gate and the current parity.

**153. A graft judged without parity is void.** *Why:* a component modelled on a reference was bolted onto a
different architecture, read slightly negative and was recorded as "did not transfer". A later mechanism
audit showed it had not been the reference's construction at all. *Apply:* before judging a graft of a
reference component, run code parity: the reference's weights in your code must reproduce the reference's
stage output.

**154. With no validated offline ruler, parity to a reference implementation is the build check.** *Why:*
three offline populations had failed validation against the board. Parity needs no labels and no
representative population: the same inputs through the reference and through your code, stage by stage.
*Apply:* when no ruler can be trusted, grade a build by a parity script and by the real instrument.
Strengthened by lesson 158.

**155. The cure for inventing in the wrong place is to aim the invention, never to stop it (corrects the
over-reading of 151 to 154, bounds 10 and 14).** *Why:* read at full strength, lessons 151 to 154 make
replication the only admissible work below the frontier. That reading is an over-correction:
the main target of a researcher remains the unknown, and replication is a means. What had failed was
the aim (re-weighting evidence already held, a stale picture of the frontier, unvalidated rulers). In the
same period the real gains were below-frontier inventions that brought new evidence. *Apply:* two
tracks always. The frontier gate adds the frontier track; the unknown track keeps at least half of the
effort and has an admission test: the work is new relative to the frontier, brings new evidence or a new
question, and is aimed where the frontier itself is blind. Build it as additions that travel up the
replication ladder.

**156. When the control arm reproduces the primary number, the signal is the nuisance variable.** *Why:* a
candidate's primary statistic (0.562) equalled its pre-declared nuisance control (0.560). *Apply:* a
pre-declared control that matches the effect is the verdict. The next step is a reader that survives the
control; a larger sample changes nothing.

**157. Price a rare repair by the prevalence it needs (strengthens 140).** *Why:* a repair worth a lot per
affected case and tiny overall came out as a break-even prevalence (at least 2.5% of hidden cases affected
for the smallest creditable gain). *Apply:* measure or bound the prevalence before building the repair.

**158. Record a parity pass as a gate state (strengthens 153 and 154).** *Why:* a replicated core stage
passed code parity, which cleared it as a host for grafts with no label and no population needed. *Apply:*
write the pass into the run record so that later councils start from it.

### Lessons recorded without a number

**U1. An auxiliary-task gain reported by a source belongs to that source's exact target semantics and
domain.** *Why:* a reported gain from auxiliary supervision depended on the specific auxiliary targets and
on an auxiliary model trained in the source's own data domain. Coarser labels of your own can be a useful
resource after their geometry is validated on your own data, while parity with the source's targets,
relevance to the main task and transfer remain separate conditions. *Apply:* validate each of those
conditions separately. A mathematical perturbation must also clear a pre-specified materiality threshold
before it earns scarce trained-method work. Neither a geometry check that passes nor a perturbation that is
too small establishes an improvement or a universal ceiling.

**U2. Content selection and coordinate access need separate oracles.** *Why:* a readout that selects by
content is permutation-invariant, so a position-only oracle and a shuffle-deletion control say nothing about
it; both had to be corrected before the trial ran. An oracle with equal means and a different content
distribution did work. *Apply:* test "which content is selected" and "can the mechanism use position" with
different oracles. A passing arithmetic prerequisite opens the build of a matched control and certifies
nothing about the effect: learnability, location statistics and oracle access never replace a trained
contrast on the real target, and construction parity between the arms is a separate check to run before
fitting.

## Calibration: how the method has performed

Everything in this section is taken from recorded runs. The campaigns are labelled A, B and C
(machine-learning competitions with held-out leaderboards) and S (a systems-performance project). Counts
are of recorded runs only; hand-run sessions that never reached the ledger are not in them.

### Runs recorded

| campaign | candidate panels | candidates generated | first tests run | passed a first test | notes |
|---|---|---|---|---|---|
| A | 9 | 172 | 31 | 9 | 3 of the 9 were near-duplicates of one mechanism; 1 later failed in deployable form; 2 passed only after repair |
| S | 1 | 15 | 4 | 3 | 1 of the 3 after repair |
| B | 9 | 88 | 21 | 5 | 2 after repair, 1 "works under condition"; one panel tested nothing (its generation phase crashed) |
| C | 6 | 84 | 12 | 2 | both "works as stated"; one further "works under condition" was not built |

Besides these 25 panels the ledger records: 3 replication-only runs and 1 external gap scan (campaign A); 1
audit council whose subject was the workflow itself, 5 smaller council runs recorded in free form (3 of them
run by hand without the workflow tooling) and 3 research loops with trained arms (campaign B); and several
entries that are workflow changes with no research run behind them.

"Passed a first test" is a statement about a premise on the campaign's own data. It is not a shipped gain;
the next two subsections are the record of what shipped and what transferred.

### Survival at first data contact

- Before the workflow had a test phase of its own, cheap post-hoc checks ended 9 of the 10 candidates that
  the first two councils had recommended, and the one survivor later failed in deployable form. In the second
  of these councils the generators' own stated failure mode predicted the actual cause in 4 of 5 cases.
- With an in-run test phase and terminal verdicts (campaign A, the next three panels): 8 tested, 3 passed,
  and the 3 were one mechanism.
- After the testers were turned into engineers who must attempt repair (campaign A, the last four panels):
  13 tested, 3 survived as stated, 2 survived after repair, 4 were wounded with a named condition, 4 were
  closed by ceiling arithmetic.
- Under the enablement vocabulary (campaign B from its fifth panel, campaign C; 25 recorded verdicts):
  11 blocked by arithmetic, 9 condition identified, 2 works under condition, 2 works as stated, 1 instrument
  required. In campaign B, five consecutive arithmetic closures reproduced their premise as true and were
  closed by the size of the effect against the credit bar (lesson 119b).
- Cost of a first test once it was recorded (23 tests): 3 to 200 minutes; 19 spent no evaluation query and
  4 spent one each.

### What shipped, by source

- Audit after the first eight council runs of campaign A: the seven-family generators had produced 112
  candidates and 1 shipped component (about 1%, and that one only as a wrapper around a scout fact); the
  replication phase had 6 targets and 2 shipped components (33%); the scout audit of the deployed
  artifact's own decisions (about 20 scouts) had 1 shipped component. Most of the budget had been going to
  the organ with the 1% rate.
- Audit of campaign B (lesson 105): everything that shipped from council briefs was cheap and audit-shaped
  (a refit on all data, the measurement that justified it, a clearing check, a ruler diagnostic, one
  efficiency fix); composed model classes were 0 for 5; of 208 files written in one run, 8 produced a number
  anyone used again. The largest efficiency gain of that campaign had been generated by the council, ranked
  sixth of sixteen and left untested (lesson 103).
- Campaign C: of two audit-mode councils, 28 candidates gave 4 tests, 1 change shipped at +0.005 (inside
  the board's tie zone) and 1 was dropped at -0.002. Five councils in a row ran with no replication
  target while a reproducible external artifact led by more than three times the largest lever realised
  in that time. The real gains of that period were inventions that brought new evidence (lessons 148 to
  155).
- Research loops with trained arms (campaign B, three loops, nine trained arms and one combiner, about 8.8
  to 9.0 GPU-hours of training per loop against 0 to 0.16 of verification): credited 0. Four arms harmed,
  one was null, two were inconclusive, and two passed the screen without being credited (for one of them a
  verifier showed the frame to be asymmetric in depth, lesson 125).

### Offline gains against a held-out board

- Campaign A, first shipped component: the gate computed on a reconstruction of the deployed pipeline
  predicted a gain of 0.288 and the board showed 0.229, the same sign at about 80%. Both earlier sign flips
  had come from gating against the research proxy (lesson 13).
- Campaign A, a later change: an offline gain of 0.293 appeared on the board as a loss of 0.014.
- Campaign A, all five components with both an offline estimate and a board delta: the board was worse
  than the estimate five times of five (sign test p = 0.031). Selection optimism measured inside the
  training set was about 0.06 on a 14-configuration menu and grew with menu size; it explained roughly half
  of the attenuation, the rest being population difference (lessons 54, 56, 58). At that point the campaign
  had made roughly 180 comparisons against one evaluation set.
- Campaign A, three components whose offline gain did not appear on the board: the one that satisfied the
  tail veto missed by 0.014, the two that did not missed by 0.38 and 0.41 (lesson 55).
- Campaign B: an internal gain of +0.0019 measured in a frame that was held out for one arm only became a
  board loss of 0.003 (lesson 101b). A linear probe read +0.0056 where the trained chain read -0.0070
  (lesson 102b). An effect predicted as +0.0008 to +0.0020 was read twice on an instrument with a display
  step of 0.001 and returned +0.001 and 0.000 (lesson 112).
- Campaign C: two offline-approved gains of about +0.03 were worth 0.000 on the board; every scout number
  measured on the easy population overstated the deployable effect two to three times; an offline gain of
  +0.15 on one class of cases was worth +0.051 on the board; +0.030 on the selecting population became
  +0.013 on a fresh one, and +0.020 became -0.002 on the board. After four probe submissions were spent on
  calibrating the offline ruler, its next forecast contained the observed score (lessons 132, 136, 150).

### Forecasts against outcomes

- Judge survival scores (33 scored candidates that reached a first test, counted from the per-candidate
  rows): scored 45% or more, 6 of 8 survived (3 of the 6 were one mechanism); scored 20% to 40%, 2 of 8;
  scored 15% or less, 7 of 17. The lowest band survived more often than the middle one. In two rounds the
  highest-scored candidate with the largest search menu was the one that failed, and in a third all the
  survivors carried the lowest scores of the batch (lessons 90, 92, 101). The
  judge panel was then removed and the ranking replaced by a formula over test cost and evaluation spend
  (lesson 103).
- Pre-test screening scores were no better: twice the top-ranked item of a pool or scan failed its own
  thresholds at first measurement (lessons 39, 99).
- Research-loop forecasts with pre-registered intervals: in the first loop all three results fell inside
  their intervals (one with the wrong sign), and the bar stood 3.6 to 5.1 times above every predicted
  centre, so the design could refute a direction and could not pass one. In the second, two of three were
  inside; for the class of student-side changes the predicted sum over four arms was +0.003 and the realised
  sum -0.020. In the third, all four were inside their raw intervals, with pooled reads 1.6 to 2.9 times the
  calibrated centres and depth-matched reads near the raw centres.
- Replications of documented external methods: in campaign A the tally after five attempts was 1 full, 2
  weak, 2 not reproduced; one of the weak ones matched its originator's number after two documented missing
  parts were added and became the first shipped component, and a sixth attempt missed as a standalone but
  was localised to a horizon limit (lesson 34). In campaign B three attempts were all weak. In campaign C
  the one attempt recorded was a code-parity pass. The default forecast for a first build is "does not
  reproduce at reported parity" (lessons 10b, 11b, 19).
- Attacks on the campaign's own certificates: on the first attempt (campaign A) one founding belief ("our
  validation does not transfer") was declared broken and a second was narrowed (the real measurement noise
  was about a fifth of the assumed figure). The first result was itself an over-correction, put right by
  the sign test of lesson 54. In campaign B three certificates were narrowed and none broken. In campaign C
  one was narrowed on an estimate that fell by two thirds on a fresh population and added nothing on the
  board; the estimating code had a bug that a planted positive per component would have caught (lesson 133).
- External prospecting paid on its first run (16 findings with computable proxies and one negative that
  pruned a branch before any effort went into it) and was recorded as the most valuable phase of the first
  council of campaign C.
- The descriptive phase with a generic charter, tested blind against three known artifacts, recovered one
  in part and none as specified (lesson 64).

### Design decisions and the evidence behind each

1. **A test phase inside the run.** A workflow that only briefs candidates is not enough: cheap post-hoc
   checks ended 9 of 10 of its recommendations.
2. **A replication phase.** Two invention-only councils produced no gate-passing component; the first
   replication run produced one, and it shipped.
3. **Prospect, refute, repair.** After the eight-run audit above: a prospect phase searching recent methods
   and the domain's own practice; a refute phase attacking the campaign's own certificates in the order
   proxy, aggregation level, implementation, population; testers as engineers with mandatory fields for
   repairs attempted and the condition for success, ceiling arithmetic as the only terminal verdict; a
   step-0 oracle-ceiling pre-screen; four honesty rules (out-of-fold fitting, nested honesty for screened
   menus, a re-drawn partition for near-bar effects, a control that deletes the candidate's own idea at
   matched exposure); the test budget spread over distinct mechanism axes; hard caps on judge survival
   scores (judges had named the fatal axis and still priced 25% to 40% for three rounds); the audit of
   deployed decisions promoted to the first scout angle; generators reduced to one candidate per family.
4. **Verification-budget accounting.** After the offline-to-board attenuation was traced to the search
   itself: menu size and an optimism-corrected effect became required fields, a fifth honesty rule prices
   the selection budget, and a persistent cumulative counter (`query_budget.md`) is read and reported in
   every synthesis. A verification ceiling is distinguished from a signal ceiling.
5. **A descriptive phase.** After three external write-ups in one day turned out to be reproducible from
   data already held: component atlas, consensus map, apparatus spec, unasked questions, surprises, and a
   required "could we have found this" field on imported findings. After the blind test the charter names
   the object, the axis and the sign (lesson 68).
6. **A preflight.** Sixty-nine lessons were distilled into eight runnable checks, later ten (`PREFLIGHT.md`).
7. **Ranking and verdicts.** After the audit council of campaign B: the per-candidate judge panel was
   deleted (about a third of a run's agents, with a ranking recorded as inverted five times); ranking became
   a formula over test cost and evaluation spend; a free lane runs zero-query tests ahead of the ranked
   list; composition of new model classes defaults to off; the test phase became Enable with the verdict
   vocabulary of lesson 106.
8. **Trained arms.** The research loop exists for changes that only a trained model can judge, with
   pre-registered intervals and per-class calibration of forecasts. Stacking several changes per arm was
   tried: all three stacks harmed, nothing could be attributed, and none of the training had gone to the
   binding class. So an arm carries one change, aimed at the binding gap, with a control fixed before the
   arms and symmetric frames (lessons 101b, 102b, 123, 124, 125).
9. **The frontier gate and two tracks.** After five councils without a replication target below a
   reproducible external artifact: a census of the public frontier no older than three days, the gate
   G > 2 L that adds a replication track, parity as the build check when no offline ruler is validated, no
   ceiling stated below the frontier, and an unknown track that keeps at least half of the effort (lessons
   148 to 155). Hard resource caps for data-touching agents were added after a shared compute host was
   taken down (lesson 134).

## Run log

Run records are appended at the end of this file, newest last. The public version of the ledger starts
with no records.

Record format (the scribe of `invention-council-workflow.js` writes the first form, the research loop the
second; a run by hand uses whichever fits):

```markdown
## YYYY-MM-DD - <problem tag, 6-10 words>, <mode: council | audit | replication-only | research loop | by hand>

- pool <N>, tested <M>, survivors <K>. Tested count in words if it is zero (for example "no candidate reached
  a first test: generation crashed, run SUSPENDED").
- top scored: <id name (score)>; ...     replication: <target = verdict> | none
- predicted: <what was forecast before the run: interval or centre per candidate or per lever class>

| id | name | first-test cost | verdict | menu | optimism-corrected | measured | missing condition | cheapest supply |
|---|---|---|---|---|---|---|---|---|
| C01 | <name> | <minutes>min/<evaluation queries>q | <WORKS_AS_STATED / WORKS_UNDER_CONDITION / CONDITION_IDENTIFIED / INSTRUMENT_REQUIRED / BLOCKED_BY_ARITHMETIC / NOT_MEASURED> | <configurations compared> | <effect after the selection correction, or why none applies> | <what was measured, on which population> | <the quantitative condition under which it works> | <cheapest way to supply that condition, and whether it already exists> |

- cost read: <wall-clock and compute spent, evaluation queries and board slots spent, what that bought>
- outcome on the deciding instrument, when known: <predicted vs observed>

### Meta-lessons (cumulative, appended)

159. <ONE TRANSFERABLE, DOMAIN-FREE LESSON.> <why: the mechanism> <how to apply it>
```

```markdown
## YYYY-MM-DD rN: <problem tag>, research loop (judged YYYY-MM-DD)

Frame: <incumbent, screen population, control, bar>. Tested: <arms run>, survivors <K>, promotions <K>.

| id | part, lever class, method | variable | effect (SE) | second ruler | verdict | status |
|---|---|---|---:|---:|---|---|

- compute: <hours trained> vs <hours of verification>
- calibration per lever class: <predicted centre and interval> vs <realised>; hit rate; calibration factor
- signatures and named revivals: <what each arm's own signature showed; the condition for a second look>

### Meta-lesson (cumulative, appended)

160. RULE: <one distilled rule, with its evidence base stated (n arms, one campaign = a working rule)>
```

Number new lessons from 159 upward and never reuse a number. A lesson that repeats an existing one is
written as "STRENGTHENS LESSON N" with the new evidence. Records are append-only.

Lessons from your own ledger are welcome in this file: see `CONTRIBUTING.md` at the repository root.
