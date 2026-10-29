#!/usr/bin/env node
/**
 * Package a design for submission.
 *
 *   npm run pack -- <id>
 *
 * Runs every check, then writes submissions/<id>-<date>.zip holding only
 * design.json, notes.md (if any) and the files design.json uses. Send that
 * zip to Everso — see docs/submitting.md.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkDesign, printChecks } from './lib/checks.mjs';
import { createZip } from './lib/zip.mjs';
import { KitError, SUBMISSIONS, c, findDesign, positional, rel, run } from './lib/kit.mjs';

const SUBMIT_TO = 'contact@everso.club';

run(async () => {
  const folder = findDesign(positional()[0], 'Usage: npm run pack -- <id>');
  const { spec, files, checks } = checkDesign(folder);
  console.log(`\n${c.bold(spec.name || spec.id)} ${c.dim(`· ${rel(folder)}`)}`);
  const failing = printChecks(checks, c);
  if (failing) throw new KitError(`${failing} check${failing === 1 ? '' : 's'} to fix before packing. Preview shows them too: npm run preview -- ${spec.id}`);

  const names = ['design.json', ...(existsSync(join(folder, 'notes.md')) ? ['notes.md'] : []), ...new Set(files.map((f) => f.path.slice(2)))];
  const zip = createZip(names.map((n) => ({ name: `${spec.id}/${n}`, data: readFileSync(join(folder, n)) })));

  mkdirSync(SUBMISSIONS, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const out = join(SUBMISSIONS, `${spec.id}-${stamp}.zip`);
  writeFileSync(out, zip);
  const mb = (statSync(out).size / 1024 / 1024).toFixed(1);

  console.log(`
${c.green('✓')} Packed ${c.bold(rel(out))} (${names.length} files, ${mb} MB)

Send it to Everso:
  • Email ${c.bold(SUBMIT_TO)} with the zip attached (or a download link if it's over 20 MB).
  • Subject: "Invitation design: ${spec.name}"
  • Add two or three screenshots from the preview.
Details and what happens next: docs/submitting.md
`);
});
