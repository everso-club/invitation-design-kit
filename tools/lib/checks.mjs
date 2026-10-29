/**
 * Every check a design must pass before it can be submitted. `npm run check`
 * and `npm run pack` run these; the preview's bar runs the same engine
 * checklist in the browser. Everso runs them again when publishing.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { getEngine, ENGINES, engineFields, getPath, publishChecklist } from '../../engine/index.js';
import { imageSize, mayHaveTransparency } from './images.mjs';
import { FILE_NAME, ID, TYPES, readDesign } from './kit.mjs';

// Mirrors the Everso console's list of event categories.
export const EVENT_TYPES = ['Wedding', 'Celebrations', 'Business & Corporate', 'Entertainment', 'Educational', 'Exhibition'];
const TIERS = ['free', 'premium'];
const THUMBNAIL = { aspect: 480 / 648, minSide: 480 };
const LIMITS = { imageKb: 7 * 1024, audioKb: 6 * 1024, minSide: 700, minSidePetal: 100, shapeTolerance: 0.08 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Every "./file" the design points to, with the engine field it fills. */
export function localFiles(engine, spec) {
  const out = [];
  if (typeof spec.thumbnail === 'string' && spec.thumbnail.startsWith('./')) {
    out.push({ path: spec.thumbnail, label: 'Picker thumbnail', field: { kind: 'thumbnail' } });
  }
  for (const f of engine ? engineFields(engine) : []) {
    const v = getPath(spec.settings || {}, f.key);
    const list = Array.isArray(v) ? v : [v];
    list.forEach((p, i) => {
      if (typeof p !== 'string' || !p.startsWith('./')) return;
      out.push({ path: p, label: list.length > 1 ? `${f.label} #${i + 1}` : f.label, field: f });
    });
  }
  return out;
}

const check = (id, label, ok, detail, warn = false) => ({ id, label, ok: !!ok, detail: ok ? undefined : detail, warn });
const shape = (a) => `${a.toFixed(3)} (${a > 1.05 ? 'landscape' : a < 0.95 ? 'portrait' : 'square'})`;

/** One local file → problems found (empty = fine). */
function fileProblems(folder, file) {
  const full = join(folder, file.path.slice(2));
  const name = basename(file.path);
  if (file.path.slice(2).includes('/')) return ['keep files directly next to design.json (no sub-folders)'];
  if (!existsSync(full) || statSync(full).isDirectory()) return ['file not found'];
  const problems = [];
  if (!FILE_NAME.test(name)) problems.push('file name must be lowercase letters, numbers, dashes and dots');
  const ext = extname(name).toLowerCase();
  const kb = statSync(full).size / 1024;
  const audio = file.field.kind === 'audio';
  if (audio) {
    if (ext !== '.mp3') problems.push('music must be an .mp3');
    if (kb > LIMITS.audioKb) problems.push(`${(kb / 1024).toFixed(1)} MB — music must be under ${LIMITS.audioKb / 1024} MB`);
    return problems;
  }
  if (!TYPES[ext] || ext === '.mp3') return [...problems, 'use WebP, PNG or JPEG'];
  if (kb > LIMITS.imageKb) problems.push(`${(kb / 1024).toFixed(1)} MB — images must be under ${LIMITS.imageKb / 1024} MB`);

  const buf = readFileSync(full);
  const size = imageSize(buf);
  if (!size) return [...problems, 'not a readable PNG, JPEG or WebP image'];
  const { width, height } = size;
  const thumb = file.field.kind === 'thumbnail';
  const aspect = thumb ? THUMBNAIL.aspect : file.field.aspect;
  if (aspect && Math.abs(width / height - aspect) / aspect > LIMITS.shapeTolerance) {
    problems.push(`shape is ${width}×${height} = ${shape(width / height)}; expected ${shape(aspect)} ±8%`);
  }
  const minSide = thumb ? THUMBNAIL.minSide : file.field.kind === 'imageSet' ? LIMITS.minSidePetal : LIMITS.minSide;
  if (Math.max(width, height) < minSide) problems.push(`only ${width}×${height} — longest side must be at least ${minSide}px or it looks blurry`);
  const wantsTransparency = !thumb && file.field.transparent !== false;
  if (wantsTransparency && !mayHaveTransparency(buf, size.type)) {
    problems.push(size.type === 'jpeg' ? 'needs a transparent background — JPEG can\'t have one, use PNG or WebP' : 'needs a transparent background (this file has no transparency)');
  }
  return problems;
}

/**
 * @return {{ spec: object, engine: object|null, files: object[], extra: string[],
 *            checks: { id: string, label: string, ok: boolean, detail?: string, warn: boolean }[] }}
 */
export function checkDesign(folder) {
  const spec = readDesign(folder);
  const checks = [];

  // ── design.json basics ────────────────────────────────────────────────────
  const missing = ['id', 'engine', 'name', 'description', 'eventTypes', 'thumbnail', 'settings'].filter((k) => spec[k] == null || spec[k] === '');
  checks.push(check('fields', 'design.json has every field', !missing.length, `Missing: ${missing.join(', ')}`));
  checks.push(check('id', 'Id is lowercase letters, numbers and dashes (3–64)', ID.test(spec.id || ''), `"${spec.id}"`));
  checks.push(check('folder', 'Folder name matches the id', basename(folder) === spec.id, `folder "${basename(folder)}", id "${spec.id}" — rename one`));
  const engine = getEngine(spec.engine);
  checks.push(check('engine', 'Engine exists', !!engine, `"${spec.engine}" — available: ${Object.keys(ENGINES).join(', ')}`));
  const badTypes = Array.isArray(spec.eventTypes) ? spec.eventTypes.filter((t) => !EVENT_TYPES.includes(t)) : [];
  checks.push(check('eventTypes', 'Event types are from the list', Array.isArray(spec.eventTypes) && !badTypes.length,
    `${badTypes.length ? `Unknown: ${badTypes.join(', ')}. ` : ''}Choose from: ${EVENT_TYPES.join(', ')}`));
  checks.push(check('tier', 'Tier is free or premium', spec.tier == null || TIERS.includes(spec.tier), `"${spec.tier}"`));
  checks.push(check('description', 'Description is one short sentence (≤ 160 characters)', (spec.description || '').length <= 160, `${(spec.description || '').length} characters`));

  // ── author and credits (needed to submit) ─────────────────────────────────
  const a = spec.author || {};
  checks.push(check('author', 'Author name and email filled in', a.name?.trim() && EMAIL.test(a.email || ''), 'Set "author": { "name": "…", "email": "…" } so Everso can reach you'));
  checks.push(check('credits', 'Artwork source credited', (spec.credits?.artwork || '').trim().length >= 3, 'Set "credits": { "artwork": "Painted by me" / "Made with <image model>, edited by me" }'));

  // ── the engine's own publish checklist (same code Everso runs) ────────────
  const files = localFiles(engine, spec);
  if (engine) {
    // Local files count as present here; the file checks below look at them.
    const placeholder = (p) => `https://firebasestorage.googleapis.com/v0/b/kit/o/${encodeURIComponent(p)}`;
    const settings = JSON.parse(JSON.stringify(spec.settings || {}), (k, v) => (typeof v === 'string' && v.startsWith('./') ? placeholder(v) : v));
    const thumbnailUrl = typeof spec.thumbnail === 'string' && spec.thumbnail.startsWith('./') ? placeholder(spec.thumbnail) : spec.thumbnail;
    for (const r of publishChecklist(engine, settings, { name: spec.name, eventTypes: spec.eventTypes, thumbnailUrl })) {
      if (['name', 'eventTypes'].includes(r.id)) continue; // covered above, with better messages
      checks.push(check(`engine-${r.id}`, r.label, r.ok, r.detail));
    }
    // A new track needs its own licence line, not the engine's default one.
    const src = getPath(spec.settings || {}, 'music.src');
    if (typeof src === 'string' && src.startsWith('./')) {
      const licence = String(getPath(spec.settings, 'music.licence') || '').trim();
      const defaultLicence = engineFields(engine).find((f) => f.key === 'music.licence')?.default;
      checks.push(check('music-licence', 'Your music track has its licence noted', licence.length >= 3 && licence !== defaultLicence,
        'Set settings.music.licence to the licence and source of YOUR track'));
    }
  }

  // ── local files ───────────────────────────────────────────────────────────
  const bad = files.map((f) => ({ f, p: fileProblems(folder, f) })).filter((x) => x.p.length);
  checks.push(check('files', `Files (${files.length}) present, right shape, sharp and transparent where needed`, !bad.length,
    bad.map(({ f, p }) => `${f.label} (${f.path}): ${p.join('; ')}`).join('\n')));

  // Files in the folder that design.json doesn't use are left out of the package.
  const used = new Set(['design.json', 'notes.md', ...files.map((f) => f.path.slice(2))]);
  const extra = readdirSync(folder).filter((n) => !n.startsWith('.') && !used.has(n));
  checks.push(check('extra', 'Every file in the folder is used', !extra.length, `Not used (left out of the package): ${extra.join(', ')}`, true));

  return { spec, engine, files, extra, checks };
}

/** Pretty-print check results; returns the number of blocking failures. */
export function printChecks(checks, c) {
  for (const r of checks) {
    const mark = r.ok ? c.green('✓') : r.warn ? c.yellow('!') : c.red('✗');
    console.log(`  ${mark} ${r.ok ? r.label : c.bold(r.label)}`);
    if (!r.ok && r.detail) r.detail.split('\n').forEach((l) => console.log(`      ${c.dim(l)}`));
  }
  return checks.filter((r) => !r.ok && !r.warn).length;
}
