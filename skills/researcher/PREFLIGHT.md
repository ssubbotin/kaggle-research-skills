# Preflight: ten cheap measurements to run before trusting a research conclusion

The ledger (`LEDGER.md`) holds the numbered lessons. That is a record, not a procedure. This file is the
procedure: a lesson ledger grows past the point of use and needs periodic distillation into a preflight
(ledger lesson 70).

Every item below is derived from a specific measured failure, costs under an hour, and would have
prevented a wrong conclusion that was actually drawn and reported. They are ordered by
(cheapness x how often they fire). Run them once per campaign, and re-run 1, 5 and 6 whenever the
pipeline or the evaluation changes.

The common shape of the failures they prevent: **the measurement was correct and the inference from it
was wrong.** Ordinary honesty rules (out-of-fold fitting, nested selection, partition redraws,
delete-the-idea controls) govern *estimation* and caught none of them.

---

## 1. Measure your instrument's repeatability before you use it

**Test.** Submit / evaluate the *identical* artifact twice and record the spread. That spread is your
resolution limit; any difference smaller than it is a coin flip.

**Cost.** One evaluation.

**What it prevented, and didn't.** A campaign made dozens of scored submissions and never did
this. It then spent weeks arguing about small differences in a metric whose repeatability was unknown,
and built an elaborate sampling model for noise that turned out to be dominated by pipeline
nondeterminism instead. A competitor named this as the single number they most needed.

---

## 2. Recompute every residual-derived signature on the TARGET and on the PREDICTION

**Test.** Any statistic you computed on `residual = truth - prediction` and read as a property of the
world: compute the same statistic on the truth alone and on the prediction alone. If all three agree,
the statistic is a property of the sampling or of your own model, not a finding.

**Cost.** Minutes.

**What it prevented.** Two facts founded a months-long research program. "The residual is a smooth random
walk, autocorrelation about 0.9 at a long lag": measured on the truth and on the prediction it was the
same to within a few hundredths. It was the trivial autocorrelation of a smooth series sampled finely, present everywhere.
"The per-unit offset is not spatially correlated, therefore it is a per-unit instrument artifact": the
*true* per-unit datum was strongly spatial (nearest-neighbour rank correlation about 0.9), and the model
contained a component that absorbs exactly that, so a spatially-null residual is what a working model
necessarily leaves behind. Both were model properties read as world properties.

---

## 3. Check the quantization of your inputs before taking any derivative

**Test.** Report the smallest non-zero increment of each stored column, and the derivative's value at
several baselines. Pick the baseline where the derivative stops being noise.

**Cost.** Minutes.

**What it prevented.** A column was stored with a rounding step of the same order as its true per-step
change. Derivatives at the natural 1-step baseline gave a physically impossible answer (tens of times the
possible range), and the first version of a diagnostic produced a confident verdict entirely from rounding
noise. Every derivative-based covariate needed a baseline of at least 10 steps. Built naively they would have
looked plausible and carried nothing.

---

## 4. Report within-unit and between-unit variance of every factor before modelling an interaction

**Test.** For a proposed interaction `A x B`, report the within-unit and between-unit variance of A and
of B. If one has ~no within-unit variation, the interaction is proportional to the other *by
construction* and carries no independent information.

**Cost.** One line.

**What it prevented.** A physical term with a published coefficient, weighted as `A x B` with A a slowly
varying covariate and B a position within the unit. Within-unit variation of A was about 0.5% of its level,
so inside a unit the term was exactly proportional to the position and the entire physical content lived
in a cross-unit amplitude scaling, which measured null. One line of descriptive statistics would have
predicted the outcome before any fitting.

---

## 5. Measure selection optimism by half-split, and report the menu-size trend

**Test.** Choose the configuration on one half of the units, score that choice on the other half; repeat
over splits. The gap is the optimism of your *selection procedure*. Repeat at several menu sizes.

**Cost.** Minutes, no held-out evaluation needed.

**What it prevented, and what it identifies.** A campaign's offline gains overstated downstream results
systematically and it could not tell selection optimism from population shift. This separates them: the
optimism *grew monotonically with menu size* (+0.0985 from a 1-cell to a 14-cell menu), which is the
signature of adaptive selection; a population shift is menu-size invariant. Magnitude accounted for only
about a third of the observed gap, so the honest answer was "roughly half selection optimism, remainder
population difference" rather than a single story. **A best-of-N is the maximum of N noisy draws, not an
estimate.** The running spend is tracked in `query_budget.md`.

---

## 6. Sign-test the residuals of your (predicted, observed) pairs

**Test.** For every pair of a predicted effect and its observed downstream value, compute
`observed - predicted` and sign-test the set. Per-point interval checks have **no power** against a
common bias.

**Cost.** One line.

**What it prevented.** A sophisticated analysis showed each apparent sign flip sat comfortably inside the
sampling law of a fully-transferring effect, and a crude attenuation heuristic was retracted on that
basis. One data point later the decisive statistic appeared: across all five pairs the residual was
positive **5 out of 5** (sign test p = 0.031). Individual consistency with a null and a systematically
one-signed residual are compatible, and only the second tells you the central tendency is biased. The
crude heuristic had been directionally right all along.

---

## 7. Open every aggregate you consume, on the tail axis

**Test.** For any mean, trimmed mean, vote, blend or ensemble the pipeline consumes: examine each member
individually **across the error distribution**, not on the pooled statistic. Report per-member worst-unit
and worst-decile behaviour, and the members' *realised* weights.

**Cost.** Under an hour on cached predictions.

**What it prevented.** A member with roughly twice every other member's worst-case error sat inside a
shipped component for weeks, unexamined, because the component was consumed as a scalar. Opening it also
showed the aggregator's realised weights ran 5.5 to 19% where the design said 14.3% each, with the discard
order *anti-correlated* with member usefulness. Note the second finding too: the anomalous member turned
out not to matter, because the trimmed mean was already discarding exactly its excursions. So **audit
the aggregator's robustness before blaming the component.**

---

## 8. Cross agreement against error, and exhibit the high-agreement high-error cohort

**Test.** Cross-tabulate ensemble agreement against ensemble error. Then explicitly hunt for the
population where agreement is **high** and error is **high**, and either exhibit it or state that you
looked and it does not exist.

**Cost.** Under an hour on cached predictions.

**What it prevented.** A confidence router built on agreement inverted on real data (sign accuracy 0.473
at the top confidence decile, against 0.796 on a planted positive), because tight agreement marked
*structured decoys* rather than correctness. A competitor independently reported six architecturally
distinct models converging tightly on the same wrong answer. And in a controlled test, three describers
handed the exact tight-and-wrong cell read it as the *easy* end of a difficulty gradient and proposed
routing by agreement, the opposite conclusion. **Description defaults to the flattering reading;
adversarial pressure has to be supplied deliberately.**

---

## 9. A comparison frame must be equally honest for both arms

**Test.** Before crediting a challenger over an incumbent, write down, for each arm, which rows it
was allowed to train on. If any scored row is held out for one arm and in-sample for the other,
the comparison is void. The honest frame is usually already in the same output (the challenger's
own inner OOF). Use that, or rebuild so both are out of the same groups.

**Cost.** Minutes of bookkeeping; sometimes one re-score.

**What it prevented.** A blend with a second model family read +0.0019 inside one data-source
group, cross-fitted, with the same-family control negative and the high-trust ruler flat, and then scored
0.003 below the incumbent on the leaderboard. The frame was group-held-out for the incumbent and in-group
for the challenger, so the challenger carried a familiarity with that source that the incumbent could not. On the
challenger's own inner OOF, equally held out, it stood more than 0.11 below the incumbent. Per-group statistics computed
inside an asymmetric frame do not repair it. "Board-shaped for the incumbent" is not "board-shaped for
the challenger".

---

## 10. A frozen-feature or linear-probe student does not stand in for a trained chain

**Test.** When the change is to *what the chain is trained on* (targets, rows, loss, pooling over
the thing that is learned), the first credit measurement is one trained arm against a matched
trained control, same folds, same group holdout. A ridge, linear probe, or frozen-encoder student
may be a screen; it is not the result. Promote only after the trained pair reproduces the sign.

**Cost.** One matched training pair. Do not spend a board slot on the probe.

**What it prevented.** A label-table change measured +0.0056 on a frozen-feature ridge student and
-0.0070 on a trained chain, same ruler, same change. The measurement of the probe was correct; the
inference that the chain would move the same way was not. A later root-vs-student pair confirmed
the structural account: +0.0055 at the undistilled root, -0.05x after distillation.

---

## The meta-rule these share

For every diagnostic, write down the two or three processes that could produce the observed signature,
and the measurement that separates them, **in the same script**. A signature shared by the truth, the
prediction and the residual is a property of the sampling. A threshold with no sanity envelope is passed
by garbage: a probe once returned an impossible floor, about thirty times the error the deployed model
already achieved, satisfied its own one-sided pre-registered bar, and emitted a confident strategic
recommendation.

Pre-registering a *number* protects against post-hoc fitting. It does not protect against a bad inference
rule. Pre-register the **discriminating control** as well.
