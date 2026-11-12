// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * Share message + link preview, built from an invitation's own content and
 * its design's share wording (settings.share — editable per design in the
 * console). One renderer for the link preview card (web functions), the
 * console and the design kit.
 *
 * Mirror: apps/host/lib/features/invitations/logic/share_message.dart (the
 * app builds the message the host sends). Both pass share.fixtures.json —
 * change the two together.
 *
 * Template rules (shown in the console):
 *   - {names} {events} {venue} {dates} {city} {details} {link};
 *     each event line: {label} {date} {time} {place}.
 *   - An empty placeholder next to a separator ( · , – - | ) is removed
 *     with that separator; the rest of the line stays ("{details} · Tap…").
 *     An empty placeholder with no separator removes its whole line
 *     ("📍 {venue}", "Venue: {venue}").
 *   - Privacy (same as the link preview): unless every event is open or
 *     by-request, dates, times, venue and city are left out.
 *   - No {link} in the message → it's added at the end (the preview card
 *     needs the link in the message).
 *   - Times are India time (IST).
 */

export const SHARE_DEFAULTS = {
  message: 'With joy in our hearts and the blessings of our elders, we invite you and your family to the wedding of\n'
    + '{names} 💐\n\n{events}\n\n📍 {venue}\n\nView the invitation and RSVP:\n{link}\n\n'
    + 'Your presence and blessings mean the world to us 🙏',
  eventLine: '🗓️ {label} · {date}, {time}\n📍 {place}',
  previewTitle: '{names} · Wedding Invitation',
  previewDescription: '{details} · Tap to view the invitation and RSVP',
};

const IST = 330 * 60e3;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const STATES = new Set(['andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat',
  'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur',
  'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana',
  'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'andaman and nicobar islands', 'chandigarh',
  'dadra and nagar haveli and daman and diu', 'delhi', 'jammu and kashmir', 'ladakh', 'lakshadweep', 'puducherry']);

/** India-time parts of an epoch ms. */
function ist(ms) {
  const d = new Date(ms + IST);
  return { y: d.getUTCFullYear(), mo: d.getUTCMonth(), d: d.getUTCDate(), wd: d.getUTCDay(), h: d.getUTCHours(), mi: d.getUTCMinutes() };
}
const clock = (p) => `${p.h % 12 || 12}:${String(p.mi).padStart(2, '0')}`;
const meridiem = (p) => (p.h < 12 ? 'AM' : 'PM');

/** "Fri, 20 Nov 2026" */
export function formatDate(ms) {
  const p = ist(ms);
  return `${DAYS[p.wd]}, ${p.d} ${MONTHS[p.mo]} ${p.y}`;
}

/** "7:00 PM onwards" · "7:15 – 8:15 AM" · "11:30 AM – 1:00 PM" */
export function formatTime(startMs, endMs) {
  const s = ist(startMs);
  if (endMs == null || endMs <= startMs) return `${clock(s)} ${meridiem(s)} onwards`;
  const e = ist(endMs);
  return meridiem(s) === meridiem(e) && endMs - startMs < 12 * 3600e3
    ? `${clock(s)} – ${clock(e)} ${meridiem(e)}`
    : `${clock(s)} ${meridiem(s)} – ${clock(e)} ${meridiem(e)}`;
}

/** "20 Nov 2026" · "20 & 21 Nov 2026" · "19, 20 & 21 Nov 2026" · "30 Nov & 1 Dec 2026" */
export function compactDates(msList) {
  const seen = new Map();
  [...msList].sort((a, b) => a - b).forEach((ms) => { const p = ist(ms); seen.set(`${p.y}-${p.mo}-${p.d}`, p); });
  const ps = [...seen.values()];
  if (!ps.length) return '';
  const last = ps[ps.length - 1];
  const sameMonth = ps.every((p) => p.mo === last.mo && p.y === last.y);
  const parts = ps.map((p) => (sameMonth ? `${p.d}` : `${p.d} ${MONTHS[p.mo]}`));
  const joined = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} & ${parts[parts.length - 1]}`;
  return sameMonth ? `${joined} ${MONTHS[last.mo]} ${last.y}` : `${joined} ${last.y}`;
}

/** City from a free-form Indian address: drops country, PIN and state. */
export function cityOf(address) {
  if (!address || typeof address !== 'string') return '';
  const parts = address.split(',')
    .map((s) => s.replace(/\b\d{3}\s?\d{3}\b/g, '').trim())
    .filter((s) => s && s.toLowerCase() !== 'india' && !STATES.has(s.toLowerCase()));
  const last = parts[parts.length - 1] || '';
  return last.length <= 40 ? last : '';
}

/** "Priya" · "Priya & Arjun" · "A, B & C" */
export function joinNames(names) {
  const n = (names || []).map((s) => String(s || '').trim()).filter(Boolean);
  if (n.length <= 2) return n.join(' & ');
  return `${n.slice(0, -1).join(', ')} & ${n[n.length - 1]}`;
}

const placeName = (e) => {
  const name = (e.venueName || '').trim();
  const city = cityOf(e.address);
  if (!name) return city;
  return city && !name.toLowerCase().includes(city.toLowerCase()) ? `${name}, ${city}` : name;
};

const SEP_END = /\s*(?:·|,|–|-|\|)\s*$/;
const SEP_START = /^\s*(?:·|,|–|-|\|)\s*/;
const TOKEN = /(\{\w+\})/;

/** Fill one template with `values` (missing → empty) by the rules above. */
export function fill(template, values) {
  const out = [];
  for (const line of String(template || '').replace(/\r\n/g, '\n').split('\n')) {
    const tokens = line.split(TOKEN);
    let drop = false;
    for (let i = 1; i < tokens.length; i += 2) {
      const v = values[tokens[i].slice(1, -1)] || '';
      if (v) { tokens[i] = v; continue; }
      tokens[i] = '';
      if (SEP_END.test(tokens[i - 1])) tokens[i - 1] = tokens[i - 1].replace(SEP_END, '');
      else if (i + 1 < tokens.length && SEP_START.test(tokens[i + 1])) tokens[i + 1] = tokens[i + 1].replace(SEP_START, '');
      else drop = true;
    }
    if (!drop) out.push(tokens.join('').replace(/\s+$/, ''));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * input = { names: string[], link: string, events: [{ label, startsAt (ms),
 * endsAt (ms|null), venueName, address, public (bool) }] }
 */
export function shareValues(share, input) {
  const t = { ...SHARE_DEFAULTS, ...(share || {}) };
  const events = (input.events || []).filter((e) => e && e.startsAt);
  const open = events.length > 0 && events.every((e) => e.public);
  const values = { names: joinNames(input.names), link: input.link || '' };
  if (!open) return values;

  const places = events.map(placeName);
  const shared = places.every((p) => p && p === places[0]);
  const rendered = events.map((e, i) => fill(t.eventLine, {
    label: (e.label || '').trim(), date: formatDate(e.startsAt), time: formatTime(e.startsAt, e.endsAt),
    place: shared ? '' : places[i],
  }));
  values.events = rendered.join(rendered.some((r) => r.includes('\n')) ? '\n\n' : '\n');
  values.venue = shared ? places[0] : '';
  values.dates = compactDates(events.map((e) => e.startsAt));
  values.city = cityOf(events.find((e) => cityOf(e.address))?.address);
  values.details = [values.dates, values.city].filter(Boolean).join(' · ');
  return values;
}

/** The message the host sends (always contains the link). */
export function renderShareMessage(share, input) {
  const t = { ...SHARE_DEFAULTS, ...(share || {}) };
  const template = t.message.includes('{link}') ? t.message : `${t.message}\n\n{link}`;
  return fill(template, shareValues(share, input));
}

/** The link preview card's title and description (one line each). */
export function renderSharePreview(share, input) {
  const t = { ...SHARE_DEFAULTS, ...(share || {}) };
  const v = shareValues(share, input);
  const line = (tpl) => fill(tpl, v).replace(/\s*\n\s*/g, ' ');
  return {
    title: line(t.previewTitle) || 'You’re invited',
    description: line(t.previewDescription) || 'Tap to view the invitation and RSVP',
  };
}

/**
 * From the guest-page data shape (host_invite_resolve / previewData) — for
 * the console and the design kit. Locked events count as not public.
 */
export function shareInputFromResolved(data, link) {
  return {
    names: ((data.invitation && data.invitation.content && data.invitation.content.people) || []).map((p) => p && p.name),
    link,
    events: (data.events || []).map((e) => ({
      label: e.label || (e.facts && e.facts.name) || '',
      startsAt: e.facts ? e.facts.startsAt : null,
      endsAt: e.facts && e.showEndTime ? e.facts.endsAt : null,
      venueName: e.facts && e.facts.venue ? e.facts.venue.name : '',
      address: e.facts && e.facts.venue ? e.facts.venue.address : '',
      public: !e.locked && !!e.facts,
    })),
  };
}
