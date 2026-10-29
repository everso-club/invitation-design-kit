# Design guide

What a design is made of, and what makes a good one. For every individual
setting with its default, see the [settings reference](spec.md).

## What you can change

| | You can change | For example |
|---|---|---|
| Colours | 13 colours: paper, text, brass, floor, the page behind each event… | a peacock-teal wedding |
| Fonts | 3 font roles, from a fixed list of open-licence fonts | a lighter script for the names |
| Artwork | every painted piece: doors, garland, lamp, leaves, coconuts, basket, kolam, the day and evening scenes, petals | a temple door, lotus petals |
| Music | the background track (licensed only) | veena instead of nadaswaram |
| Wording | section titles | "Two Blessed Days" |
| Blocks | turn parts on or off: doors or no opening, scratch or plain dates, petals, countdown, gallery, music | a calmer version with no petals |

You **can't** move things, add sections or add animations. Those belong to
the engine. If your idea needs one, describe it in your submission.

Hosts always write their own names, family lines, blessings and event
details. A design never contains them.

## `design.json`

```json
{
  "id": "kalyana-lotus-pink",
  "engine": "kalyana",
  "name": "Kalyana · Lotus Pink",
  "description": "Blush and lotus pink with soft gold, lotus petals and a temple door.",
  "tier": "free",
  "eventTypes": ["Wedding"],
  "sortOrder": 100,
  "featured": false,
  "thumbnail": "./thumbnail.jpg",
  "changelog": "First version.",
  "author": { "name": "Your Name", "email": "you@example.com", "url": "https://your-portfolio.example" },
  "credits": { "artwork": "Painted by me in Procreate." },
  "settings": {
    "colors": { "paper": "#F7E6E4", "ink": "#5A1F2B" },
    "fonts": { "script": "great-vibes" },
    "art": { "door": "./door.webp", "petals": ["./petal-1.webp", "./petal-2.webp", "./petal-3.webp"] },
    "wording": { "datesTwo": "Two Blessed Days" }
  }
}
```

| Field | What it is |
|---|---|
| `id` | Permanent. Lowercase letters, numbers and dashes, 3–64 characters, starting with the engine name. Must match the folder name. |
| `engine` | `kalyana` (the only engine today). |
| `name` | Shown to hosts, e.g. `Kalyana · Lotus Pink`. |
| `description` | One sentence for the picker, 160 characters at most. |
| `tier` | `free` or `premium`. Everso has the final say. |
| `eventTypes` | Which events it's offered for, from: `Wedding`, `Celebrations`, `Business & Corporate`, `Entertainment`, `Educational`, `Exhibition`. |
| `sortOrder`, `featured` | Placement in the picker. Suggestions only: Everso sets these when publishing. |
| `thumbnail` | `./thumbnail.jpg`, 480×648. |
| `changelog` | One line: what this version is or changes. |
| `author` | Your `name` and `email` (required, so we can reach you), plus an optional `url` for credit. |
| `credits.artwork` | Where the artwork came from (required): your own work, which tools or image models you used. |
| `settings` | Colours, fonts, art, music, wording and blocks. Leave any setting out to keep the engine default. Invalid values fall back to the default, and the checks tell you which ones they are. |

You can also add a **`notes.md`** next to `design.json`. It goes into the
package and is the place for anything you'd like us to know: ideas the
engine couldn't do, or which screenshots to look at.

## Colours

- Hex only: `#RRGGBB`.
- **Readability is checked.** Main text needs a contrast of at least
  4.5 : 1 on the paper colour; secondary text and small labels need 3 : 1.
  If the check fails, darken the text or lighten the paper.
- Check the edges as well: the **backdrop** around the card and behind the
  doors, and the coloured **floor** band at the bottom (RSVP).
- Keep the three paper shades close to each other. They make gentle
  gradients, not separate blocks.

## Fonts

Choose by id from the [settings reference](spec.md#fonts--settingsfonts).
They're all open-licence Google Fonts. You can't use other fonts: we only use
fonts we're licensed to serve to every guest.

Look at the **long names** frame in the preview. Script fonts vary a lot in
width.

## Music

- MP3, under 6 MB, about 1–3 minutes, and it should loop cleanly.
- **Licensed for this use**: royalty-free with a licence that allows
  background use in an app or website, or your own composition. Write the
  licence and source in `settings.music.licence`, e.g.
  `"Composed and recorded by me"`. No licence, no music.
- Guests hear it only after opening the invitation, and they can mute it.
- Leave `music` out to keep the engine's own track. The kit doesn't include
  that track, so the preview stays silent.

## Wording

Section titles only. Keep them short (limits are in the
[settings reference](spec.md)) and in the spirit of the occasion. Hosts
replace their own lines anyway: names, family lines, blessings.

## Blocks

Turn parts off to make a calmer or simpler variant: no doors (straight to
the card), plain dates instead of scratch cards, no petals, no countdown, no
gallery, no music. Every other part of the invitation still has to look
complete with a block turned off. Check it in the preview.

## The quality bar

Before you pack, every one of these should be true:

- [ ] The preview says **✓ All checks pass**.
- [ ] You opened every frame full size and scrolled it top to bottom.
- [ ] The doors close and open cleanly, with the handles meeting in the middle.
- [ ] Long names fit, and the evening frame looks as good as the day ones.
- [ ] All the artwork looks like one artist made it.
- [ ] No text, people, faces, logos or watermarks in any artwork.
- [ ] No real people's names or photos anywhere. Use Priya & Arjun.
- [ ] The thumbnail shows your design at its best.

## Using an AI assistant

Coding assistants (Claude, Copilot, Cursor…) can do much of the setup and
JSON work. Paste this, then describe the look you want:

> You're making an Everso invitation design with the kit in this folder.
> Read `README.md` and everything in `docs/` first and follow it exactly.
> Start with `npm run new -- <id>`, edit only files inside `designs/<id>/`,
> never change `tools/`, `engine/`, `preview/` or the examples, and keep
> running `npm run check -- <id>` until everything passes. Artwork: the right
> shape per slot, transparent cut-outs, no text, no people. Use only the
> names Priya & Arjun. When done, list what you changed and anything the
> engine couldn't do.
