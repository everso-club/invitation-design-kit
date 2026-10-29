# Contributing

Thanks for helping. There are two kinds of contribution:

## Submitting a design

Designs aren't pull requests. Pack your design and email it, as described in
[docs/submitting.md](docs/submitting.md). This keeps your work private until
it's published, and `designs/` is git-ignored for the same reason.

## Improving the kit

Bug reports, clearer docs and better tools are very welcome.

- **Found a problem?** [Open an issue](../../issues/new/choose). Include the
  command you ran, what it printed, and your Node.js version (`node -v`) and
  operating system.
- **Want a feature an engine doesn't have?** Use the *Engine idea* issue
  template. New engines and engine features are built by Everso, but your
  ideas decide what we build.
- **Pull requests** for `docs/`, `tools/` and the top-level files are
  welcome. Keep them focused and explain the why.

### Generated folders

`engine/`, `preview/`, `examples/kalyana-classic/` and `docs/spec.md` are
generated from Everso's main codebase and replaced on every release. Please
don't edit them in a pull request. Open an issue instead and we'll fix it at
the source.

### Working on the tools

- Plain Node.js (20+), ES modules, **no dependencies**. A designer should
  never need `npm install`.
- One command per file in `tools/`. Shared code goes in `tools/lib/`.
- Error messages say what's wrong *and* how to fix it, in plain words.
- Before opening a pull request:

  ```bash
  npm run check -- --all
  npm run new -- pr-test --from kalyana-peacock && npm run preview -- pr-test
  ```

  Then delete `designs/pr-test`.

### Examples and docs

Use only the sample names **Priya & Arjun** (and the long-name sample in
`engine/samples.js`). Never use real people's names, photos or venues.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).
