# Acknowledgements

These skills adapt and combine ideas from the works below. The adaptations and any errors in them are ours.

## TRIZ, Genrich S. Altshuller

The theory of inventive problem solving (TRIZ) is the base of the `researcher` skill:

- the Ideal Final Result, technical and physical contradictions, and the resource inventory in the skill's loop;
- the separation principles (in time, in space, between system levels, upon condition) among the contradiction
  resolvers;
- inventive principles behind the resource operators ("turn the harm into a benefit", self-service, prior action,
  the intermediary, "the other way round");
- ideality and trimming;
- the lines of technical system evolution (mono-bi-poly, dynamisation, macro to micro, increasing controllability,
  rhythm coordination);
- function analysis, the system operator (nine windows), cause-effect chain analysis and su-field thinking in the
  research loop.

The operator families of the invention council are built from these.

## Andrej Karpathy

- **[llm-council](https://github.com/karpathy/llm-council).** The `llm-council` skill follows its three-stage
  flow: independent first opinions, anonymised peer review with ranking, and a chairman's synthesis. The chairman
  role in the invention council's synthesis phase follows the same pattern.
- **[autoresearch](https://github.com/karpathy/autoresearch).** `skills/researcher/AUTORESEARCH.md` adapts its
  execution pattern: one editable surface per trial with evaluator, data and baseline frozen; an unchanged baseline
  as the first recorded row; one change per trial; keep / discard / crash as an operational status; decisions read
  from registered metric lines; the simplicity rule inside the noise band; finishing the authorised batch without
  asking between trials.
- **"A Recipe for Training Neural Networks"** (2019): "become one with the data", behind the immersion phase of the
  research loop.

## Methods of science and engineering used by name

- T. C. Chamberlin, the method of multiple working hypotheses; J. R. Platt, strong inference; J. S. Mill's methods.
- J. W. Tukey, exploratory data analysis; T. S. Kuhn, on anomalies.
- Enrico Fermi's estimation; the Heilmeier catechism; Andrew Ng's ceiling analysis.
- E. M. Goldratt (order effort by the binding constraint), R. W. Hamming (keep a list of important problems),
  U. Alon (budget for "the cloud", the stretch of a project where the plan stops working).
- B. Uzzi and co-authors (2013) and L. Wu, D. Wang and J. A. Evans (2019), on atypical combinations and on small
  teams, behind the "atypical card" of the research loop.
- The Buckingham pi theorem, symmetry arguments, and the history of physics (Planck, Einstein) as the model for
  assumption excavation.
- M. S. Bartlett's effective degrees of freedom for autocorrelated series, in the noise-floor scout angle of the
  invention council.
- O. Abramov's comparison of cause-effect chain analysis with root cause analysis, and the MATRIZ materials
  (matriz.org), as the references for the TRIZ tools of the research loop.
- The Borda count, for the aggregate ranking in `skills/llm-council/council-workflow.js`.

## Research-agent systems surveyed

`skills/researcher/AUTORESEARCH.md` cites the published systems whose designs informed the intake, the trained
arm as the unit of a run, the archive of trained nodes, and the screen before promotion: Robin, Co-Scientist,
Sakana's AI Scientist, AIBuildAI-2, MLEvolve, MARS, AIRA-dojo, ERA, the study of executed LLM and human research
ideas by C. Si, T. Hashimoto and D. Yang, and ReX-MLE. The citations are given there.

## Tools

The workflows are written for the Claude Code Workflow tool and use its agent orchestration. The `kaggle-*`
skills describe the public Kaggle platform and its command-line client.

## Contributors

- Sergey Subbotin: author and maintainer.

Contributors of lessons, field reports and fixes are added here.
