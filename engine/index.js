// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * @everso/invite-engines — engine manifests + settings helpers, shared by the
 * guest site (renderer) and the console (design editor). Pure functions.
 * Spec: docs/features/invitations/09-invitation-designs.md.
 */
import { kalyana } from './kalyana.js';
import { FONTS } from './fonts.js';

export { FONTS, fontFamily, fontsHref } from './fonts.js';
export { kalyana };

export const ENGINES = { kalyana };

export function getEngine(id) {
  return ENGINES[id] || null;
}

/** All fields of an engine, flattened (section id attached). */
export function engineFields(engine) {
  return engine.sections.flatMap((s) => s.fields.map((f) => ({ ...f, section: s.id })));
}

const getPath = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
function setPath(obj, key, value) {
  const parts = key.split('.');
  let o = obj;
  parts.slice(0, -1).forEach((p) => { o[p] = o[p] && typeof o[p] === 'object' ? o[p] : {}; o = o[p]; });
  o[parts[parts.length - 1]] = value;
}
export { getPath, setPath };

const COLOR = /^#[0-9a-fA-F]{6}$/;
// Artwork/music must come from our own storage or our own site — never an
// arbitrary host (privacy, availability, and no surprise content).
const ASSET = /^(\/invite-templates\/[\w./-]+|https:\/\/firebasestorage\.googleapis\.com\/[^\s"'()<>]+|https:\/\/storage\.googleapis\.com\/[^\s"'()<>]+)$/;

/** Is `value` acceptable for `field`? (Invalid values fall back to the default.) */
export function validValue(field, value) {
  switch (field.kind) {
    case 'color': return typeof value === 'string' && COLOR.test(value);
    case 'font': return typeof value === 'string' && FONTS[field.group]?.some((f) => f.id === value);
    case 'choice': return field.options.some((o) => o.value === value);
    case 'toggle': return typeof value === 'boolean';
    case 'text': return typeof value === 'string' && value.length <= (field.max || 200);
    case 'image':
    case 'audio': return typeof value === 'string' && ASSET.test(value);
    case 'imageSet': return Array.isArray(value) && value.length >= (field.min || 1) && value.length <= (field.max || 50)
      && value.every((v) => typeof v === 'string' && ASSET.test(v));
    default: return false;
  }
}

/** Engine defaults as a settings object. */
export function defaultSettings(engine) {
  const out = {};
  engineFields(engine).forEach((f) => setPath(out, f.key, f.default));
  return out;
}

/**
 * Defaults ← design values, field by field. Unknown keys are dropped and
 * invalid values fall back to the default, so a bad design can never break
 * a guest's invitation.
 */
export function resolveSettings(engine, values = {}) {
  const out = {};
  engineFields(engine).forEach((f) => {
    const v = getPath(values, f.key);
    setPath(out, f.key, v !== undefined && validValue(f, v) ? v : f.default);
  });
  return out;
}

// ── contrast (WCAG) ─────────────────────────────────────────────────────────
function luminance(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrastRatio(a, b) {
  if (!COLOR.test(a || '') || !COLOR.test(b || '')) return 0;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Publish checklist — the same rules in the console (to show) and on the
 * server (to enforce). `meta` = { name, thumbnailUrl, eventTypes }.
 * @return {{ id: string, label: string, ok: boolean, detail?: string }[]}
 */
export function publishChecklist(engine, values, meta = {}) {
  const fields = engineFields(engine);
  const checks = [];
  checks.push({ id: 'name', label: 'Has a name', ok: !!(meta.name && meta.name.trim().length >= 3) });
  checks.push({ id: 'thumbnail', label: 'Has a picker thumbnail', ok: !!meta.thumbnailUrl && ASSET.test(meta.thumbnailUrl) });
  checks.push({ id: 'eventTypes', label: 'Shown for at least one event type', ok: Array.isArray(meta.eventTypes) && meta.eventTypes.length > 0 });

  const invalid = fields.filter((f) => { const v = getPath(values, f.key); return v !== undefined && !validValue(f, v); });
  checks.push({ id: 'valid', label: 'Every setting is valid', ok: !invalid.length,
    detail: invalid.length ? `Fix: ${invalid.map((f) => f.label).join(', ')}` : undefined });

  const resolved = resolveSettings(engine, values);
  const low = fields.filter((f) => f.contrastOn)
    .map((f) => ({ f, r: contrastRatio(getPath(resolved, f.key), getPath(resolved, f.contrastOn)) }))
    .filter(({ f, r }) => r < (f.key === 'colors.ink' ? 4.5 : 3));
  checks.push({ id: 'contrast', label: 'Text is readable on the paper colour', ok: !low.length,
    detail: low.length ? low.map(({ f, r }) => `${f.label} ${r.toFixed(1)}:1`).join(', ') : undefined });

  const missing = fields.filter((f) => f.required && !getPath(resolved, f.key));
  checks.push({ id: 'art', label: 'Required artwork present', ok: !missing.length,
    detail: missing.length ? missing.map((f) => f.label).join(', ') : undefined });

  if (getPath(resolved, 'blocks.music')) {
    checks.push({ id: 'licence', label: 'Music licence noted', ok: !!(getPath(resolved, 'music.licence') || '').trim() });
  }
  return checks;
}

export { SCENARIOS, previewData } from './samples.js';
