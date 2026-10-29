#!/usr/bin/env node
/**
 * Run every check on a design (the same ones Everso runs before publishing).
 *
 *   npm run check -- <id>       one design (designs/<id>, or a path)
 *   npm run check -- --all      every design in designs/ and examples/
 *
 * Exits non-zero if anything blocking fails (CI uses this).
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { checkDesign, printChecks } from './lib/checks.mjs';
import { DESIGNS, EXAMPLES, KitError, c, findDesign, positional, rel, run } from './lib/kit.mjs';

const USAGE = 'Usage: npm run check -- <id>   or   npm run check -- --all';

run(async () => {
  const folders = process.argv.includes('--all')
    ? [EXAMPLES, DESIGNS].flatMap((root) => (existsSync(root) ? readdirSync(root).map((n) => join(root, n)).filter((p) => existsSync(join(p, 'design.json'))) : []))
    : [findDesign(positional()[0], USAGE)];
  if (!folders.length) throw new KitError('No designs found.');

  let failed = 0;
  for (const folder of folders) {
    const { spec, checks } = checkDesign(folder);
    console.log(`\n${c.bold(spec.name || spec.id)} ${c.dim(`· ${rel(folder)}`)}`);
    const n = printChecks(checks, c);
    if (n) failed++;
    console.log(n ? `  ${c.red(`${n} to fix`)}` : `  ${c.green('Ready to pack')} ${c.dim(`— npm run pack -- ${spec.id}`)}`);
  }
  console.log('');
  process.exit(failed ? 1 : 0);
});
