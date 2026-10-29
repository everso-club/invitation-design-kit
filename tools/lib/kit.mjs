/**
 * Shared helpers for the kit's commands: where things are, how a design
 * folder is found and read, and friendly errors. No dependencies.
 */
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const KIT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const DESIGNS = join(KIT, 'designs');
export const EXAMPLES = join(KIT, 'examples');
export const SUBMISSIONS = join(KIT, 'submissions');

/** Design ids and file names: lowercase letters, numbers, dashes (and dots in file names). */
export const ID = /^[a-z0-9][a-z0-9-]{2,63}$/;
export const FILE_NAME = /^[a-z0-9][a-z0-9.-]*$/;

/** File types a design may contain, by extension. */
export const TYPES = {
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
};

const tty = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : String(s));
export const c = { green: paint(32), yellow: paint(33), red: paint(31), dim: paint(2), bold: paint(1) };

export class KitError extends Error {}

/** Print a friendly error and exit (no stack trace for expected problems). */
export function run(main) {
  main().catch((e) => {
    if (e instanceof KitError) {
      console.error(`\n${c.red('✗')} ${e.message}\n`);
      process.exit(1);
    }
    throw e;
  });
}

/** Positional arguments (anything not starting with --). */
export function positional(argv = process.argv.slice(2)) {
  return argv.filter((a) => !a.startsWith('--'));
}

/** `--name value` or `--name=value`. */
export function option(name, fallback, argv = process.argv.slice(2)) {
  const eq = argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.slice(name.length + 3);
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
}

/**
 * A design id or path → its folder. `my-design` looks in designs/ first,
 * then examples/; anything with a slash is a path.
 */
export function findDesign(arg, usage) {
  if (!arg) throw new KitError(`Which design? ${usage}`);
  const candidates = /[\\/]/.test(arg) || arg.startsWith('.')
    ? [resolve(arg)]
    : [join(DESIGNS, arg), join(EXAMPLES, arg), resolve(arg)];
  const folder = candidates.find((p) => existsSync(join(p, 'design.json')));
  if (!folder) {
    throw new KitError(`No design called "${arg}" (looked for design.json in ${candidates.map(rel).join(', ')}).\n  Start one with: npm run new -- ${ID.test(arg) ? arg : 'my-design'}`);
  }
  return folder;
}

/** Read and parse design.json, with the line of a JSON mistake if there is one. */
export function readDesign(folder) {
  const text = readFileSync(join(folder, 'design.json'), 'utf8');
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new KitError(`${rel(join(folder, 'design.json'))} isn't valid JSON — ${e.message}\n  Common causes: a missing comma, a trailing comma, or "smart quotes".`);
  }
}

/** Path relative to the kit, for messages. */
export function rel(p) {
  const r = p.startsWith(KIT) ? p.slice(KIT.length + 1) : p;
  return r || basename(p);
}
