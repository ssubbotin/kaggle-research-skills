# Contributing

These skills improve the way they were built: by running them on real problems, writing down what was predicted
and what happened, and feeding the difference back into the text. If you use them, your findings are the most
useful thing you can send.

## What to send

| Contribution | Where | Form |
|---|---|---|
| **Field report**: you ran a skill or a workflow on a real problem | an issue, template "Field report" | what you asked, what the method predicted, what was measured, what you would change |
| **Lesson**: something the method got wrong or right that is not yet in the ledger | a pull request against `skills/researcher/LEDGER.md`, or an issue, template "Lesson" | a new numbered lesson: the principle, the mechanism that taught it, how to apply it |
| **Fix or improvement** to a skill or a workflow script | a pull request | the change, and the run or the reasoning that shows it helps |
| **Port** of a workflow to another agent host | a pull request adding a sibling file | same phases, same arguments, a note on what differs |

A lesson is worth more than an opinion. The ledger holds lessons that cost something to learn: a prediction that
failed, a check that would have caught it, a rule that now prevents it. Write yours the same way.

## Rules for content

1. **General, with the evidence anonymised.** State the principle and the mechanism. Magnitudes help ("an offline
   validation set reproduced 3 of 7 leaderboard steps"); identities do not belong here (no competition, company,
   dataset or product names as the origin of a lesson).
2. **Nothing private.** No personal data, no credentials, no host names, no internal paths, no data or findings you
   are not free to publish. If you are in a live competition, wait until it ends or follow its rules on sharing.
3. **Say what was measured and what was inferred.** A lesson built on one run says so.
4. **Keep the numbering.** New lessons take the next free number. Existing numbers never change, because the skills
   and workflows cite them. A lesson that corrects an older one says "supersedes lesson N".
5. **Do not weaken a rule without evidence.** If a threshold or a check looks too strict, bring the run that shows it.
6. Plain English. No marketing tone.

## Workflow scripts

The `.js` files are scripts for the Claude Code Workflow tool. The first statement must stay `export const meta =
{...}` as a pure literal. Check syntax before sending a change (the same command works for each of the three
scripts):

```bash
(echo 'async function __w(agent,parallel,pipeline,phase,log,args){'; \
 sed 's/^export const meta/const meta/' skills/researcher/research-loop-workflow.js; echo '}') > /tmp/w.mjs \
 && node --check /tmp/w.mjs
```

A change to a prompt inside a workflow is a change to the method: describe the run that motivated it.

## Licence of contributions

The repository is under the Mozilla Public License 2.0. By sending a contribution you agree that it is licensed
under the same terms (inbound = outbound) and that you have the right to send it. Contributors are listed in
`ACKNOWLEDGEMENTS.md`.

## If you reuse these skills elsewhere

The licence asks two things of anyone who distributes these files or modified versions of them: keep the licence
notices, and make the source of the modified files available under the same licence. Beyond the licence, a link
back to this repository and a pull request with what you learned are the best thanks.
