// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * Sample invitations for design previews (the console editor and
 * `npm run designs:preview`) — the same data shape the guest page gets from
 * host_invite_resolve, so a preview is the real renderer. Scenarios cover
 * what a design must survive (spec 09 §3). Names: Priya & Arjun only.
 */
const DAY = 86400e3;
const IST = 330 * 60e3; // +5:30
/** `days` from now, at hh:mm India time → epoch ms. */
const at = (days, hour, min = 0) => {
  const ist = new Date(Date.now() + days * DAY + IST);
  return Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), hour, min) - IST;
};
const venue = { name: 'Rose Garden Convention Hall', address: 'Jayanagar, Bengaluru 560 041', latitude: 12.93, longitude: 77.58 };
const event = (id, name, kicker, startsAt, endsAt, extra = {}) => ({
  eventId: id, label: name, kicker, note: null, locked: false,
  facts: { name, startsAt, endsAt, venue, rsvpOpen: true }, myInvite: null, ...extra,
});

export const SCENARIOS = [
  { id: 'two', label: '2 events' },
  { id: 'one', label: '1 event' },
  { id: 'three', label: '3 events (most allowed)' },
  { id: 'evening', label: 'Evening only' },
  { id: 'photos', label: 'Cover photo + 6 photos' },
  { id: 'nonames', label: 'Photo, names off the cover' },
  { id: 'long', label: 'Long names' },
  { id: 'locked', label: 'Invite-only guest' },
];

/**
 * @param {string} scenario
 * @param {Object} settings  the design's (draft) settings
 * @param {{ doorLine: string, familyLead: string }} wording  resolved defaults
 * @param {string[]} [gallery]  gallery photos; default: the first three of the
 *   engine's `samples.photos` (none in the 1-event scenario, all six in 'photos')
 * @param {Object} [engine]  the engine manifest; its `samples` replace the
 *   Kalyana sample wording (people, blessing lines, sign-off, event labels)
 *   and give the stand-in photos
 *
 * Scenarios between them cover what every engine must survive (spec 10 §2):
 * 1–3 events, day and evening, 0 / 3 / 6 album photos, with and without a
 * cover photo, names off the cover, long names, an invite-only guest.
 */
export function previewData(scenario, settings, wording, gallery, engine) {
  const s = (engine && engine.samples) || {};
  const long = scenario === 'long';
  const people = long
    ? [{ name: 'Venkatalakshmi', fullName: 'Venkatalakshmi Ramachandran', familyLine: 'Elder daughter of Smt. Padmavathi & Sri Ramachandra Venkataraman Iyer' },
      { name: 'Siddharthan', fullName: 'Siddharthan Krishnamoorthy', familyLine: 'Younger son of Smt. Kamakshi & Sri Krishnamoorthy Subramaniam' }]
    : s.people || [{ name: 'Priya', fullName: 'Priya Sharma', familyLine: 'Daughter of Smt. Lakshmi & Sri Ramesh Sharma' },
      { name: 'Arjun', fullName: 'Arjun Rao', familyLine: 'Son of Smt. Anitha & Sri Suresh Rao' }];

  const ev = s.events || {};
  const lab = (k, label, kicker) => [ev[k]?.label || label, ev[k] && 'kicker' in ev[k] ? ev[k].kicker : kicker];
  const reception = event('e1', ...lab('reception', 'Reception', 'Aaratakshate'), at(30, 19), null);
  const wedding = event('e2', ...lab('wedding', 'Wedding', 'Muhurtha'), at(31, 9, 25), at(31, 9, 39),
    ev.wedding ? { note: ev.wedding.note ?? null, showEndTime: !!ev.wedding.showEndTime } : { note: 'Dhanur lagna', showEndTime: true });
  const events = {
    one: [wedding],
    two: [reception, wedding],
    three: [event('e0', ...lab('first', 'Mehendi', null), at(28, ev.first ? 19 : 16), null), reception, wedding],
    evening: [reception],
    long: [reception, wedding],
    locked: [reception, wedding].map((e) => ({ ...e, locked: true, facts: undefined })),
  }[scenario] || [reception, wedding];

  const photos = s.photos || [];
  const cover = scenario === 'photos' || scenario === 'nonames' ? photos[0] : undefined;
  const album = scenario === 'photos' ? photos.slice(0, 6) : scenario === 'one' ? [] : gallery || photos.slice(0, 3);

  return {
    state: 'ok',
    viewer: { signedIn: scenario !== 'locked', isHost: false, isPreview: true },
    invitation: {
      code: 'designpreview',
      templateId: (engine && engine.id) || 'kalyana',
      status: 'published',
      design: { engine: (engine && engine.id) || 'kalyana', settings },
      content: {
        people,
        doorLine: wording.doorLine,
        familyLead: wording.familyLead,
        invocations: s.invocations || ['॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥'],
        photos: cover ? { cover, gallery: album } : { gallery: album },
        ...(scenario === 'nonames' ? { coverNames: false } : {}),
        signoff: s.signoff || ['The Sharma & Rao families'],
        music: { src: 'on' }, // host turned music on; the design decides the track
      },
    },
    events,
  };
}
