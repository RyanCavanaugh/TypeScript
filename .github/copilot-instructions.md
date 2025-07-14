## Documentation MCP server

The repo is large and the project is complex.
This document contains information you'll need no matter what the task is, but we have a separate library of content that you'll need to consult depending on the issue.

You have been given the `md-fragments` MCP server.
Before doing anything, query its `list-topics` endpoint and remember all the topics you saw.
Consult these topics often, as they contain important information relevant to the work.
MOST OPERATIONS (adding tests, running them, etc) HAVE RELEVANT DOCUMENTATION.

YOU MUST FOLLOW DIRECTIONS FROM THE "HOW TO FINISH A SESSION" TOPIC BEFORE FINISHING A PULL REQUEST.

## Mandatory Workflow

This repo uses test-driven development. When fixing bugs or implementing features, you must follow this workflow:

1. **Make a testcase that demonstrates the behavior**
   - Run it (by itself) and review the baselines it generates to ensure it demonstrates the bug
   - Add the test and its baselines in one commit
   - You may need to debug in order to figure out how to write a testcase; this is normal
   - DO NOT TRY TO FIX A BUG UNTIL YOU HAVE A TESTCASE THAT CORRECTLY DEMONSTRATES THE PROBLEM

2. **Fix the bug by changing code as appropriate**
   - Put this fix in another commit

3. **Run the test you wrote again**
   - Ensure the baselines change in a way that demonstrates that the bug is fixed
   - Put this baseline diff in its own commit

4. **Add more testing**
   - Once you've got the basics figured out, enhance your test to cover edge cases and other variations
   - Run the test again and commit the baseline diff along with the test edit

5. **Run all other tests to ensure you didn't break anything**
   - Run `npx hereby runtests-parallel` and wait for it to finish (10-15 minutes is normal!)
   - Some collateral baseline changes are normal, but review for correctness
   - Put these diffs in another commit

## Due Diligence

As part of your summary, you will need to provide an extensive root cause analysis of why the bug has occurred.
You should investigate the provided repro thoroughly, and provide "adjacent" testcases that *don't* demonstrate the bug to prove your theory of what the root cause of the bug is.

In particular, pay attention to which phase the bug occurs in. For example:
 * If the bug is in the parser, you should be able to demonstrate that the syntax tree is wrong
 * If the bug is in the checker, you should be able to explain why the logic is wrong with constrasting examples
 * If the bug is in the emitter, you should be able to demonstrate that the syntax tree is correct, but that the emit logic is wrong and why

Always read maintainer comments that ask you for demonstrated reasoning about particular aspects of the bug.

## Time Constraints

If you're running out of time, consult the "How to give up" documentation topic.

## Asking Questions

We want to make you smarter over time.
If you encounter a situation where you think a developer on this project would be able to provide a useful answer *and* it's not something offered by the Documentation MCP server, add a question to the file `.github/copilot-questions.md`
Explain what you searched for so that we can put the right search terms in the documentation library.

IT'S A BAD FORM IF YOU DON'T ASK AT LEAST ONE QUESTION, IT SHOWS YOU ARE NOT LEVERAGING THE INSTRUCTIONS.

## Common Commands

You'll need to run these commands often. Always use `npx` to run `hereby` commands.

```bash
npx hereby local             # Build the compiler into built/local
npx hereby runtests-parallel # Run all tests; this will take 10-15 minutes
npx hereby runtests -t <grep> # Run testcases matching a specific pattern
npx hereby baseline-accept   # Accept new test baselines
npx hereby lint              # Run lint. Always do this before submitting
npx hereby format            # Run code formatting. Always do this before submitting
```

## Understanding the Assigned Task

- Maintainer comments in the issue should generally take priority over OP's comments
- Maintainers might give you hints on where to start. They are not always right, but a good place to start
