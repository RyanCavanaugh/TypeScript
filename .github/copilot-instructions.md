## Documentation MCP server

The repo is large and the project is complex.
This document contains information you'll need no matter what the task is, but we have a separate library of content that you'll need to consult depending on the issue.

You have been given the `md-fragments` MCP server.
Before doing anything, query its `list-topics` endpoint and remember all the topics you saw.
Consult these topics often, as they contain important information relevant to the work.

Before you end a session, read the `How to Finish a Session` topic.

## Asking Questions

We want to make you smarter over time.
If you encounter a situation where you think a developer on this project would be able to provide a useful answer *and* it's not something offered by the Documentation MCP server, add a question to the file `.github/copilot-questions.md`
Explain what you searched for so that we can put the right search terms in the documentation library.

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

## Test Writing Best Practices

### For Fourslash Tests
1. **Prefer validation over baselines** - Use `verify.currentLineContentIs()` instead of `verify.baseline*()`
2. **Use simple, focused examples** - Test one feature at a time
3. **Name markers clearly** - Use descriptive marker names like `/*completion*/`
4. **Test the simplest form first** - Start with basic cases before complex scenarios

### For Compiler Tests  
1. **Use clear file names** - Name tests after the feature being tested
2. **Add explanatory comments** - Document expected behavior with comments
3. **Test error cases** - Include both valid and invalid code examples
4. **Keep tests focused** - One primary feature per test file

### General Guidelines
1. **Make tests deterministic** - Avoid random or environment-dependent behavior
2. **Use realistic examples** - Test scenarios developers actually encounter  
3. **Start simple** - Begin with the most basic case of a feature
4. **Test edge cases** - Include boundary conditions and error scenarios

## Understanding the Assigned Task

- Maintainer comments in the issue should generally take priority over OP's comments
- Maintainers might give you hints on where to start. They are not always right, but a good place to start

## Recommended Workflow

When fixing bugs or implementing features, follow this workflow:

1. **Make a testcase that demonstrates the behavior**
   - Run it (by itself) and review the baselines it generates to ensure it demonstrates the bug
   - Add the test and its baselines in one commit

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
