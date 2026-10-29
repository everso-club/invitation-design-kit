// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * Kalyana engine manifest — everything a console-made design can set.
 * The console form is generated from `sections`; the renderer reads the
 * resolved settings (defaults ← design values). Defaults = today's Kalyana,
 * so invitations without a design look exactly as before.
 * Spec: docs/features/invitations/09-invitation-designs.md.
 *
 * Field kinds: color · font · image · imageSet · audio · choice · toggle · text.
 * Image slots carry an aspect (width/height): the layout is drawn around it,
 * so the console only accepts uploads within ±8% of it.
 */
const ART = '/invite-templates/kalyana/art';

export const kalyana = {
  id: 'kalyana',
  major: 1,
  version: '1.1.0',
  name: 'Kalyana',
  description: 'Heritage invitation — opening doors, garlands, scratch-to-reveal dates, falling petals, day/evening scenes.',
  // Which part of the card to show in the preview while a field is edited.
  sections: [
    {
      id: 'blocks',
      title: 'Blocks',
      hint: 'Turn parts of the invitation on or off, and choose how they behave.',
      fields: [
        { key: 'blocks.opening', kind: 'choice', label: 'Opening', default: 'doors', focus: 'doors',
          options: [{ value: 'doors', label: 'Carved doors that swing open' }, { value: 'none', label: 'No opening — straight to the card' }] },
        { key: 'blocks.dates', kind: 'choice', label: 'Dates', default: 'scratch', focus: 'dates',
          options: [{ value: 'scratch', label: 'Scratch cards to reveal' }, { value: 'plain', label: 'Shown plainly' }] },
        { key: 'blocks.petals', kind: 'toggle', label: 'Falling petals', default: true },
        { key: 'blocks.countdown', kind: 'toggle', label: 'Countdown', default: true, focus: 'countdown' },
        { key: 'blocks.gallery', kind: 'toggle', label: 'Photo gallery (when the host adds photos)', default: true, focus: 'gallery' },
        { key: 'blocks.music', kind: 'toggle', label: 'Background music available', default: true },
      ],
    },
    {
      id: 'colors',
      title: 'Colours',
      hint: 'Text must stay readable on the paper colours — the publish checklist checks this.',
      fields: [
        { key: 'colors.backdrop', kind: 'color', label: 'Backdrop (outside the card, behind the doors)', default: '#2B1409' },
        { key: 'colors.paper', kind: 'color', label: 'Paper', default: '#F2E1D2', focus: 'families' },
        { key: 'colors.paper2', kind: 'color', label: 'Paper — shade', default: '#EAD2C0' },
        { key: 'colors.paper3', kind: 'color', label: 'Paper — deeper shade', default: '#E3C5AF' },
        { key: 'colors.ink', kind: 'color', label: 'Main text', default: '#5C1A17', contrastOn: 'colors.paper', focus: 'families' },
        { key: 'colors.inkSoft', kind: 'color', label: 'Secondary text', default: '#7C4A3E', contrastOn: 'colors.paper' },
        { key: 'colors.olive', kind: 'color', label: 'Small capital labels', default: '#4D5A3A', contrastOn: 'colors.paper' },
        { key: 'colors.brass', kind: 'color', label: 'Brass (buttons, frames)', default: '#B8862F' },
        { key: 'colors.brassLight', kind: 'color', label: 'Brass — light', default: '#E5BE6C' },
        { key: 'colors.floor', kind: 'color', label: 'Floor / RSVP band', default: '#8C1C1E', focus: 'rsvp' },
        { key: 'colors.floorDeep', kind: 'color', label: 'Floor — deep', default: '#6A1416' },
        { key: 'colors.dayPage', kind: 'color', label: 'Daytime event page', default: '#F6CEB5', focus: 'event' },
        { key: 'colors.eveningTop', kind: 'color', label: 'Evening event page (top tint)', default: '#E8CDB8', focus: 'event' },
      ],
    },
    {
      id: 'fonts',
      title: 'Fonts',
      fields: [
        { key: 'fonts.script', kind: 'font', group: 'script', label: 'Names & big titles (script)', default: 'pinyon', focus: 'names' },
        { key: 'fonts.serif', kind: 'font', group: 'serif', label: 'Body text', default: 'eb-garamond', focus: 'families' },
        { key: 'fonts.caps', kind: 'font', group: 'caps', label: 'Small capital labels', default: 'montserrat' },
      ],
    },
    {
      id: 'art',
      title: 'Artwork',
      hint: 'Transparent WebP or PNG. Each slot expects a shape — uploads are checked and converted automatically.',
      fields: [
        { key: 'art.door', kind: 'image', label: 'Door panel (handle on the right edge)', default: `${ART}/teak-door.webp`, aspect: 700 / 1285, transparent: false, focus: 'doors', required: true },
        { key: 'art.thorana', kind: 'image', label: 'Garland (thorana) — across the top', default: `${ART}/thorana.webp`, aspect: 1400 / 286, focus: 'hero', required: true },
        { key: 'art.deepa', kind: 'image', label: 'Lamp (deepa)', default: `${ART}/deepa.webp`, aspect: 342 / 1000, focus: 'hero', required: true },
        { key: 'art.leafLeft', kind: 'image', label: 'Leaf — left', default: `${ART}/banana-leaf-left.webp`, aspect: 659 / 1100, focus: 'hero' },
        { key: 'art.leafRight', kind: 'image', label: 'Leaf — right', default: `${ART}/banana-leaf-right.webp`, aspect: 708 / 1100, focus: 'hero' },
        { key: 'art.coconut', kind: 'image', label: 'Coconuts (foreground)', default: `${ART}/coconuts.webp`, aspect: 700 / 430, focus: 'hero' },
        { key: 'art.basket', kind: 'image', label: 'Flower basket (foreground)', default: `${ART}/jasmine-basket.webp`, aspect: 700 / 630, focus: 'hero' },
        { key: 'art.kolam', kind: 'image', label: 'Floor design (kolam)', default: `${ART}/kolam.webp`, aspect: 1200 / 440, focus: 'families' },
        { key: 'art.sceneDay', kind: 'image', label: 'Daytime event scene (portrait, bottom of the page)', default: `${ART}/mandap.webp`, aspect: 900 / 1352, transparent: false, focus: 'event' },
        { key: 'art.sceneEvening', kind: 'image', label: 'Evening event scene (wide band)', default: `${ART}/reception.webp`, aspect: 1200 / 420, transparent: false, focus: 'event' },
        { key: 'art.petals', kind: 'imageSet', label: 'Petals (3–20 small images)', min: 3, max: 20,
          default: Array.from({ length: 15 }, (_, i) => `${ART}/petals/p${i + 1}.webp`) },
      ],
    },
    {
      id: 'music',
      title: 'Music',
      hint: 'Guests hear it after opening; they can mute it. Use only licensed tracks and note the licence.',
      fields: [
        { key: 'music.src', kind: 'audio', label: 'Track (MP3, under 6 MB)', default: '/invite-templates/kalyana/music.mp3' },
        { key: 'music.licence', kind: 'text', label: 'Licence / source', default: 'Pixabay Content License — andriig, “Wedding”', max: 160 },
      ],
    },
    {
      id: 'wording',
      title: 'Wording',
      hint: 'Section titles for this design. Hosts write their own names and lines.',
      fields: [
        { key: 'wording.tagline', kind: 'text', label: 'Under the names', default: 'are getting married', max: 40, focus: 'names' },
        { key: 'wording.blessings', kind: 'text', label: 'Families section label', default: 'With the blessings of our elders', max: 60, focus: 'families' },
        { key: 'wording.familyLead', kind: 'text', label: 'Default invitation line (hosts can change)', default: 'we joyfully invite you to the wedding of', max: 120, focus: 'families' },
        { key: 'wording.doorLine', kind: 'text', label: 'Default line on the doors (hosts can change)', default: '॥ ಶುಭ ವಿವಾಹ ॥', max: 40, focus: 'doors' },
        { key: 'wording.datesOne', kind: 'text', label: 'Dates title — one event', default: 'The Auspicious Day', max: 40, focus: 'dates' },
        { key: 'wording.datesTwo', kind: 'text', label: 'Dates title — two events', default: 'Two Auspicious Days', max: 40, focus: 'dates' },
        { key: 'wording.datesMany', kind: 'text', label: 'Dates title — three or more', default: 'The Celebrations', max: 40, focus: 'dates' },
        { key: 'wording.countdownTitle', kind: 'text', label: 'Countdown title', default: 'The Celebration Begins', max: 40, focus: 'countdown' },
        { key: 'wording.galleryTitle', kind: 'text', label: 'Gallery title', default: 'Us, Together', max: 40, focus: 'gallery' },
        { key: 'wording.rsvpTitle', kind: 'text', label: 'RSVP title', default: 'Will you bless us with your presence?', max: 60, focus: 'rsvp' },
        { key: 'wording.rsvpSub', kind: 'text', label: 'RSVP line', default: 'Your blessings mean the world to us.', max: 80, focus: 'rsvp' },
        { key: 'wording.tapToOpen', kind: 'text', label: 'Door button', default: 'Tap to open', max: 20, focus: 'doors' },
      ],
    },
  ],
};
