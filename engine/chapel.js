// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * Chapel engine manifest — a Christian (church) wedding: a full-screen
 * envelope whose wax seal lifts away with the flap, the card rising into the
 * first page, dates under frosted vellum to rub away, one stationery card per
 * event, candles standing in flowers, album prints and a reply card.
 * Everything a console-made design can set; defaults = "Chapel · Evergreen".
 * Spec: docs/features/invitations/09-invitation-designs.md §12.
 *
 * Field kinds: color · font · image · imageSet · audio · choice · toggle · text ·
 * longText. Image slots carry an aspect (width/height) — uploads within ±8%.
 */
import { SHARE_DEFAULTS } from './share.js';

const ART = '/invite-templates/chapel/art';

export const chapel = {
  id: 'chapel',
  major: 1,
  version: '1.0.1',
  name: 'Chapel',
  description: 'Church wedding — an envelope with a wax seal, frosted-vellum dates to rub away, stationery cards per event, candles and florals.',
  // How the guest page starts before the data arrives (see kalyana.js).
  page: {
    background: '#1A221D',
    themeColor: '#1A221D',
    preload: [`${ART}/backdrop.webp`, `${ART}/envelope-paper.webp`, `${ART}/seal-wine.webp`],
  },
  // Sample content for design previews (Priya & Arjun only).
  samples: {
    photos: [`${ART}/church.webp`, `${ART}/reception.webp`, `${ART}/garland.webp`, `${ART}/wash.webp`, `${ART}/spray-corner.webp`, `${ART}/envelope-paper.webp`],
    people: [
      { name: 'Priya', fullName: 'Priya Mathew', familyLine: 'Daughter of Mr. & Mrs. Joseph Mathew' },
      { name: 'Arjun', fullName: 'Arjun Thomas', familyLine: 'Son of Mr. & Mrs. Daniel Thomas' },
    ],
    invocations: ['“So they are no longer two, but one.”', 'Matthew 19 : 6'],
    signoff: ['With love,', 'The Mathew & Thomas families'],
    events: {
      first: { label: 'Rehearsal Dinner', kicker: 'The Evening Before' },
      reception: { label: 'Reception', kicker: 'Dinner & Dancing' },
      wedding: { label: 'Nuptial Mass', kicker: 'The Ceremony', note: null, showEndTime: false },
    },
  },
  sections: [
    {
      // Not shown in the console: lets the guest page tell which renderer a
      // design's frozen settings belong to (the app's live preview sends
      // only the settings).
      id: 'meta',
      hidden: true,
      fields: [
        { key: 'engine', kind: 'choice', label: 'Engine', default: 'chapel', options: [{ value: 'chapel', label: 'Chapel' }] },
      ],
    },
    {
      id: 'blocks',
      title: 'Blocks',
      hint: 'Turn parts of the invitation on or off, and choose how they behave.',
      fields: [
        { key: 'blocks.opening', kind: 'choice', label: 'Opening', default: 'envelope', focus: 'doors',
          options: [{ value: 'envelope', label: 'Envelope with a wax seal' }, { value: 'none', label: 'No opening — straight to the card' }] },
        { key: 'blocks.dates', kind: 'choice', label: 'Dates', default: 'vellum', focus: 'dates',
          options: [{ value: 'vellum', label: 'Frosted vellum to rub away' }, { value: 'plain', label: 'Shown plainly' }] },
        { key: 'blocks.petals', kind: 'toggle', label: 'Falling petals', default: true },
        { key: 'blocks.countdown', kind: 'toggle', label: 'Countdown', default: true, focus: 'countdown' },
        { key: 'blocks.gallery', kind: 'toggle', label: 'Photo album (when the host adds photos)', default: true, focus: 'gallery' },
        { key: 'blocks.music', kind: 'toggle', label: 'Background music available', default: true },
      ],
    },
    {
      id: 'colors',
      title: 'Colours',
      hint: 'Text must stay readable on the paper colour — the publish checklist checks this.',
      fields: [
        { key: 'colors.backdrop', kind: 'color', label: 'Backdrop (behind the envelope)', default: '#1A221D', focus: 'doors' },
        { key: 'colors.envelope', kind: 'color', label: 'Envelope + reply band (under the paper art)', default: '#3E5446', focus: 'doors' },
        { key: 'colors.paper', kind: 'color', label: 'Paper', default: '#FBF8F1', focus: 'families' },
        { key: 'colors.paper2', kind: 'color', label: 'Paper — shade', default: '#F4F0E6' },
        { key: 'colors.ink', kind: 'color', label: 'Main text', default: '#2B3A33', contrastOn: 'colors.paper', focus: 'families' },
        { key: 'colors.inkSoft', kind: 'color', label: 'Secondary text', default: '#5D6B62', contrastOn: 'colors.paper' },
        { key: 'colors.gold', kind: 'color', label: 'Gold — small capitals, lines', default: '#8E7240', contrastOn: 'colors.paper' },
        { key: 'colors.goldLight', kind: 'color', label: 'Gold — on the green envelope', default: '#D9C394' },
        { key: 'colors.waxText', kind: 'color', label: 'Initials pressed into the seal', default: '#3A0D17', focus: 'doors' },
      ],
    },
    {
      id: 'fonts',
      title: 'Fonts',
      fields: [
        { key: 'fonts.script', kind: 'font', group: 'script', label: 'Script (envelope names, the “&”, the seal)', default: 'pinyon', focus: 'names' },
        { key: 'fonts.serif', kind: 'font', group: 'serif', label: 'Names, titles and body text', default: 'cormorant', focus: 'families' },
        { key: 'fonts.caps', kind: 'font', group: 'caps', label: 'Engraved capitals (dates, labels)', default: 'cinzel' },
      ],
    },
    {
      id: 'art',
      title: 'Artwork',
      hint: 'Transparent WebP or PNG unless the slot says otherwise. Each slot expects a shape — uploads are checked and converted automatically.',
      fields: [
        { key: 'art.backdrop', kind: 'image', label: 'Backdrop behind the envelope (table, petals, candlelight)', default: `${ART}/backdrop.webp`, aspect: 900 / 1820, transparent: false, focus: 'doors', required: true },
        { key: 'art.envelopePaper', kind: 'image', label: 'Envelope paper (plain, no folds)', default: `${ART}/envelope-paper.webp`, aspect: 900 / 1820, transparent: false, focus: 'doors', required: true },
        { key: 'art.liner', kind: 'image', label: 'Envelope liner pattern', default: `${ART}/liner.webp`, aspect: 1, transparent: false, focus: 'doors' },
        { key: 'art.seal', kind: 'image', label: 'Wax seal (blank centre — initials are added)', default: `${ART}/seal-wine.webp`, aspect: 420 / 407, focus: 'doors', required: true },
        { key: 'art.tuck', kind: 'image', label: 'Sprig tucked under the seal', default: `${ART}/tuck-sprig.webp`, aspect: 600 / 793, focus: 'doors' },
        { key: 'art.foilCorner', kind: 'image', label: 'Gold-foil corner (top-left; mirrored)', default: `${ART}/foil-corner.webp`, aspect: 1, focus: 'doors' },
        { key: 'art.foilDivider', kind: 'image', label: 'Gold-foil divider', default: `${ART}/foil-divider.webp`, aspect: 900 / 74, focus: 'names' },
        { key: 'art.paper', kind: 'image', label: 'Card paper (repeats down the page; top and bottom edges must match)', default: `${ART}/paper-ivory.webp`, aspect: 900 / 3640, transparent: false, focus: 'families' },
        { key: 'art.wash', kind: 'image', label: 'Watercolour wash (section backgrounds)', default: `${ART}/wash.webp`, aspect: 900 / 1820, transparent: false, focus: 'families' },
        { key: 'art.spray', kind: 'image', label: 'Floral spray (top-left corner; mirrored)', default: `${ART}/spray-corner.webp`, aspect: 1, focus: 'hero', required: true },
        { key: 'art.garland', kind: 'image', label: 'Floral garland (wide, low)', default: `${ART}/garland.webp`, aspect: 1200 / 538, focus: 'hero', required: true },
        { key: 'art.sprig', kind: 'image', label: 'Small sprig (between the families)', default: `${ART}/sprig.webp`, aspect: 1, focus: 'families' },
        { key: 'art.sceneDay', kind: 'image', label: 'Daytime event card (the church)', default: `${ART}/church.webp`, aspect: 1000 / 622, focus: 'event' },
        { key: 'art.sceneEvening', kind: 'image', label: 'Evening event card (the reception)', default: `${ART}/reception.webp`, aspect: 1000 / 622, focus: 'event' },
        { key: 'art.candle', kind: 'image', label: 'Candle, unlit (the flame is added; wick at the top centre)', default: `${ART}/candle.webp`, aspect: 260 / 1753, focus: 'countdown' },
        { key: 'art.petals', kind: 'imageSet', label: 'Petals (3–20 small images)', min: 3, max: 20,
          default: Array.from({ length: 6 }, (_, i) => `${ART}/petals/p${i + 1}.webp`) },
      ],
    },
    {
      id: 'music',
      title: 'Music',
      hint: 'Starts softly when the guest taps the seal; they can mute it. Use only licensed tracks and note the licence.',
      fields: [
        { key: 'music.src', kind: 'audio', label: 'Track (MP3, under 6 MB)', default: '/invite-templates/chapel/music.mp3' },
        { key: 'music.licence', kind: 'text', label: 'Licence / source', default: 'Pixabay Content License — paulyudin, “Romantic” (#493488)', max: 160 },
      ],
    },
    {
      id: 'wording',
      title: 'Wording',
      hint: 'Section titles for this design. Hosts write their own names and lines.',
      fields: [
        { key: 'wording.doorLine', kind: 'text', label: 'Default line on the envelope (hosts can change)', default: 'Holy Matrimony', max: 40, focus: 'doors' },
        { key: 'wording.envelopeLine', kind: 'text', label: 'Under the names on the envelope', default: 'you are warmly invited', max: 40, focus: 'doors' },
        { key: 'wording.tapToOpen', kind: 'text', label: 'Under the seal', default: 'Tap the seal to open', max: 30, focus: 'doors' },
        { key: 'wording.blessings', kind: 'text', label: 'Above the names', default: 'Together with their families', max: 60, focus: 'names' },
        { key: 'wording.tagline', kind: 'text', label: 'Under the names', default: 'two hearts, one promise', max: 40, focus: 'names' },
        { key: 'wording.familyLead', kind: 'text', label: 'Default invitation line (hosts can change)', default: 'request the honour of your presence as they are united in Holy Matrimony', max: 120, focus: 'families' },
        { key: 'wording.datesOne', kind: 'text', label: 'Dates title — one event', default: 'Save the Date', max: 40, focus: 'dates' },
        { key: 'wording.datesTwo', kind: 'text', label: 'Dates title — two events', default: 'Save the Dates', max: 40, focus: 'dates' },
        { key: 'wording.datesMany', kind: 'text', label: 'Dates title — three or more', default: 'Save the Dates', max: 40, focus: 'dates' },
        { key: 'wording.datesHint', kind: 'text', label: 'Under the dates title', default: 'Rub the vellum to reveal', max: 40, focus: 'dates' },
        { key: 'wording.orderTitle', kind: 'text', label: 'Event cards title', default: 'The Order of the Day', max: 40, focus: 'event' },
        { key: 'wording.countdownTitle', kind: 'text', label: 'Countdown title', default: 'Until we say “I do”', max: 40, focus: 'countdown' },
        { key: 'wording.galleryTitle', kind: 'text', label: 'Album title', default: 'Us, Together', max: 40, focus: 'gallery' },
        { key: 'wording.rsvpTitle', kind: 'text', label: 'Reply card title', default: 'We’d love to celebrate with you', max: 60, focus: 'rsvp' },
        { key: 'wording.rsvpSub', kind: 'text', label: 'Reply card line', default: 'Your presence is the greatest gift. Let us know if you can join us.', max: 90, focus: 'rsvp' },
      ],
    },
    {
      id: 'share',
      title: 'Sharing (WhatsApp message and link preview)',
      hint: 'What hosts send with the link, and the card WhatsApp shows for it. Placeholders: {names} {events} {venue} '
        + '{dates} {city} {details} {link}; in the event line {label} {date} {time} {place}. Invite-only invitations never '
        + 'show dates or venue. The link is added at the end if left out. Keep it short (6–10 lines).',
      fields: [
        { key: 'share.message', kind: 'longText', label: 'Message', max: 1000,
          default: 'Together with their families,\n{names}\nrequest the honour of your presence at their wedding 💍\n\n{events}\n\n📍 {venue}\n\nView the invitation and RSVP:\n{link}\n\nWe would love to celebrate with you 🤍' },
        { key: 'share.eventLine', kind: 'longText', label: 'Line for each event', default: SHARE_DEFAULTS.eventLine, max: 160 },
        { key: 'share.previewTitle', kind: 'text', label: 'Link preview — title (one line)', default: SHARE_DEFAULTS.previewTitle, max: 80 },
        { key: 'share.previewDescription', kind: 'text', label: 'Link preview — description (one line)', default: SHARE_DEFAULTS.previewDescription, max: 160 },
      ],
    },
  ],
};
