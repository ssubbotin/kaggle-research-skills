# Verification budget: evaluations spent against a single evaluation set

Why this file exists: selection optimism grows with the number of candidates compared on one
evaluation set. Measured by the half-split method of `PREFLIGHT.md` item 5: +0.060 of optimism for a
14-cell menu, rising +0.0985 as the menu went from 1 to 14 cells, on a campaign whose real effects
were about 0.3 in the same units and whose observed train-to-deployment attenuation was about 0.2
(roughly half of it this). A campaign that has spent its budget can still FIND signal but can no
longer VERIFY it. That is a verification ceiling, escaped only by a population never used for
selection.

## What counts as spend

One evaluation is one read against the evaluation set, whoever makes it and whatever it is for.
`invention-council-workflow.js` counts, per run:

- candidates scored,
- candidates falsified empirically,
- replications,
- certificate attacks (adversarial tests of our own impossibility claims),
- scout facts (each measured fact a scout brings back).

Sweeps and probes run by hand count as well. A campaign that starts the log late reconstructs the
earlier spend from its ledger and labels the figure as reconstructed.

## How the log is kept

- The workflow reads the running total from the line at the end of this file that begins with the
  word CUMULATIVE, appends one line for the run, and writes a new total line in the same format.
  Leave that format alone, and keep the total as the last line. The run line looks like this:

  ```
  YYYY-MM-DD: spend 27 evaluations (14 candidates scored, 2 falsified, 0 replications, 2 certificate attacks, 9 scout facts)
  ```

- A batch run by hand (for example a joint run under `AUTORESEARCH.md`, where the host writes the
  query spend) adds an incremental receipt in the form of the next section.
- Every line names its campaign when the ledger serves more than one. The total that bounds
  verification is the spend against ONE evaluation set, so read the subtotal of the campaign; the
  cumulative line is the running counter of the ledger.

## What a receipt states

A receipt is a short dated paragraph. It states:

1. **Queries by kind, zeros included.** Unchanged-baseline metric queries, candidate metric queries,
   premise or source tests (repairs counted), replications, certificate attacks, scouts and intake
   readers. "Zero new metric queries" is a statement worth writing down: a finding counted on data
   already on disk spends none.
2. **The exposure state of every ruler.** Rulers that were used for selection before remain
   repeatedly exposed development instruments. An audit of sources or labels is additional label
   exposure, not fresh confirmation.
3. **Whether an independent confirmation population exists.** Two deterministic hash halves of an
   already selected population do not create independent confirmation. Without one, the receipt
   says that no result of the batch promotes a model.
4. **Replication caveats.** One pair provides no seed-SD estimate. A descriptive re-reading of
   existing historical candidates belongs to the calibration receipt and selects no new candidate.
5. **Compute, with its boundary.** Observed script time per stage and whether a GPU was used. Script
   time is not elapsed-session time and not a full operational cost: retrieval, reasoning,
   transfers, hashing and review sit outside the script timers.
6. **Batch state.** COMPLETED or SUSPENDED, the trials executed, the repairs, and any optional test
   suspended without execution.
7. **Evidence.** The paths of the run's `results.tsv` and of its brief.

A historical cumulative total is the count of the ledger. It is not a reconstructed count of
independent tests, and a receipt says so when it quotes it.

## Calibration: what runs have cost

Figures from logged council runs across several campaigns:

- A campaign had spent about 180 evaluations (about 112 candidates, 20 scouts, 6 replications, 40
  sweeps and probes) before anyone counted. Its five shipped or probed legs showed an attenuation
  of about 0.2 on effects of about 0.3, roughly half of it selection optimism.
- One council run spends 21 to 59 evaluations: 1 to 23 candidates scored, 0 to 5 falsified, 0 to 3
  replications, 0 to 4 certificate attacks, 4 to 30 scout facts. Scout facts are the largest line in
  most runs.
- More than half of the runs logged zero replications. Replication is the line that verifies and
  the line that gets skipped.

## Log

| date | campaign | spent | note |
|---|---|---|---|

CUMULATIVE: 0
