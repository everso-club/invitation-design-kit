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
  { id: 'long', label: 'Long names' },
  { id: 'locked', label: 'Invite-only guest' },
];

/**
 * @param {string} scenario
 * @param {Object} settings  the design's (draft) settings
 * @param {{ doorLine: string, familyLead: string }} wording  resolved defaults
 * @param {string[]} [gallery]  sample gallery photos (the local preview passes some)
 */
export function previewData(scenario, settings, wording, gallery) {
  const long = scenario === 'long';
  const people = long
    ? [{ name: 'Venkatalakshmi', fullName: 'Venkatalakshmi Ramachandran', familyLine: 'Elder daughter of Smt. Padmavathi & Sri Ramachandra Venkataraman Iyer' },
      { name: 'Siddharthan', fullName: 'Siddharthan Krishnamoorthy', familyLine: 'Younger son of Smt. Kamakshi & Sri Krishnamoorthy Subramaniam' }]
    : [{ name: 'Priya', fullName: 'Priya Sharma', familyLine: 'Daughter of Smt. Lakshmi & Sri Ramesh Sharma' },
      { name: 'Arjun', fullName: 'Arjun Rao', familyLine: 'Son of Smt. Anitha & Sri Suresh Rao' }];

  const reception = event('e1', 'Reception', 'Aaratakshate', at(30, 19), null);
  const wedding = event('e2', 'Wedding', 'Muhurtha', at(31, 9, 25), at(31, 9, 39), { note: 'Dhanur lagna' });
  const events = {
    one: [wedding],
    two: [reception, wedding],
    three: [event('e0', 'Mehendi', null, at(28, 16), null), reception, wedding],
    evening: [reception],
    long: [reception, wedding],
    locked: [reception, wedding].map((e) => ({ ...e, locked: true, facts: undefined })),
  }[scenario] || [reception, wedding];

  return {
    state: 'ok',
    viewer: { signedIn: scenario !== 'locked', isHost: false, isPreview: true },
    invitation: {
      code: 'designpreview',
      templateId: 'kalyana',
      status: 'published',
      design: { settings },
      content: {
        people,
        doorLine: wording.doorLine,
        familyLead: wording.familyLead,
        invocations: ['॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥'],
        photos: { gallery: gallery || [] },
        signoff: ['The Sharma & Rao families'],
        music: { src: 'on' }, // host turned music on; the design decides the track
      },
    },
    events,
  };
}
