#!/usr/bin/env node
/**
 * Start a new design.
 *
 *   npm run new -- <id>                          every setting listed with its default
 *   npm run new -- <id> --from kalyana-peacock   copy an example (artwork included)
 *
 * Creates designs/<id>/. Guide: docs/getting-started.md.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defaultSettings, getEngine, ENGINES } from '../engine/index.js';
import { DESIGNS, EXAMPLES, ID, KitError, c, option, positional, readDesign, rel, run } from './lib/kit.mjs';

run(async () => {
  const id = positional()[0];
  const from = option('from');
  const engineId = option('engine', 'kalyana');
  if (!id || !ID.test(id)) {
    throw new KitError('Usage: npm run new -- <id> [--from <example>]\n  The id is lowercase letters, numbers and dashes, e.g. kalyana-peacock-blue');
  }
  const folder = join(DESIGNS, id);
  if (existsSync(folder)) throw new KitError(`${rel(folder)} already exists. Pick another id, or preview it: npm run preview -- ${id}`);

  let design;
  if (from) {
    const source = join(EXAMPLES, from);
    if (!existsSync(join(source, 'design.json'))) {
      throw new KitError(`No example "${from}". Examples: ${readdirSync(EXAMPLES).filter((n) => existsSync(join(EXAMPLES, n, 'design.json'))).join(', ')}`);
    }
    mkdirSync(folder, { recursive: true });
    for (const name of readdirSync(source)) if (!name.startsWith('.') && name !== 'design.json') copyFileSync(join(source, name), join(folder, name));
    design = { ...readDesign(source), id, name: 'New design', featured: false, changelog: 'First version.', author: { name: '', email: '', url: '' }, credits: { artwork: '' } };
  } else {
    const engine = getEngine(engineId);
    if (!engine) throw new KitError(`Unknown engine "${engineId}". Available: ${Object.keys(ENGINES).join(', ')}`);
    // Colours, fonts, blocks and wording start at the engine defaults so every
    // knob is visible; artwork and music stay on the engine's own files until
    // replaced with "./your-file.webp" (see docs/spec.md for the slots).
    const d = defaultSettings(engine);
    design = {
      id,
      engine: engineId,
      name: 'New design',
      description: 'One sentence hosts see in the picker.',
      tier: 'free',
      eventTypes: ['Wedding'],
      sortOrder: 100,
      featured: false,
      thumbnail: './thumbnail.jpg',
      changelog: 'First version.',
      author: { name: '', email: '', url: '' },
      credits: { artwork: '' },
      settings: { blocks: d.blocks, colors: d.colors, fonts: d.fonts, wording: d.wording },
    };
    mkdirSync(folder, { recursive: true });
  }
  writeFileSync(join(folder, 'design.json'), `${JSON.stringify(design, null, 2)}\n`);

  console.log(`
${c.green('✓')} Created ${c.bold(rel(folder))}${from ? ` from the ${from} example` : ''}

Next:
  1. Fill in name, description, author and credits in design.json.
  2. Change colours, fonts and wording; add artwork next to design.json
     and point to it, e.g. "art": { "door": "./door.webp" }.
     Every setting and artwork size: docs/spec.md
  3. Add thumbnail.jpg (480×648) — the card hosts see in the picker.
  4. Preview it (reloads as you save):  ${c.bold(`npm run preview -- ${id}`)}
`);
});
