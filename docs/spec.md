# Settings reference

<!-- Generated from the Everso repository by `npm run designs:kit` — don't edit here. -->

Every setting a design can make, per engine, generated from the engine code
itself — so it is always exactly what the preview and Everso accept. Leave a
setting out of `design.json` to keep the engine's default.

How to use these: [design guide](design-guide.md).

## Engine `kalyana` (v1.2.0)

Heritage invitation — opening doors, garlands, scratch-to-reveal dates, falling petals, day/evening scenes.

### Artwork — `settings.art`

WebP (preferred) or PNG. **Transparent background** unless the slot says *solid*. Keep the **shape** (width ÷ height) within ±8% — the layout is drawn around it. The size is the engine's own file: match it or go up to 2×; the longest side must be at least 700 px (petals 100 px).

| Setting | What it is | Shape | Engine's size | Background | Required |
|---|---|---|---|---|---|
| `art.door` | Door panel (handle on the right edge) | 0.545 (portrait) | 700×1285 | solid | always set |
| `art.thorana` | Garland (thorana) — across the top | 4.895 (landscape) | 1400×286 | transparent | always set |
| `art.deepa` | Lamp (deepa) | 0.342 (portrait) | 342×1000 | transparent | always set |
| `art.leafLeft` | Leaf — left | 0.599 (portrait) | 659×1100 | transparent | no |
| `art.leafRight` | Leaf — right | 0.644 (portrait) | 708×1100 | transparent | no |
| `art.coconut` | Coconuts (foreground) | 1.628 (landscape) | 700×430 | transparent | no |
| `art.basket` | Flower basket (foreground) | 1.111 (landscape) | 700×630 | transparent | no |
| `art.kolam` | Floor design (kolam) | 2.727 (landscape) | 1200×440 | transparent | no |
| `art.sceneDay` | Daytime event scene (portrait, bottom of the page) | 0.666 (portrait) | 900×1352 | solid | no |
| `art.sceneEvening` | Evening event scene (wide band) | 2.857 (landscape) | 1200×420 | solid | no |
| `art.petals` | Petals (3–20 small images) — a list of files | any | 160×156 each | transparent | 3–20 files |

"Always set" slots have an engine default, so you only need to replace them if you want to.

### Colours — `settings.colors`

Hex `#RRGGBB`. Text colours must stay readable on the paper colour — the checks measure it (main text at least 4.5 : 1, the others 3 : 1).

| Setting | What it colours | Default |
|---|---|---|
| `colors.backdrop` | Backdrop (outside the card, behind the doors) | `#2B1409` |
| `colors.paper` | Paper | `#F2E1D2` |
| `colors.paper2` | Paper — shade | `#EAD2C0` |
| `colors.paper3` | Paper — deeper shade | `#E3C5AF` |
| `colors.ink` | Main text *(readability checked)* | `#5C1A17` |
| `colors.inkSoft` | Secondary text *(readability checked)* | `#7C4A3E` |
| `colors.olive` | Small capital labels *(readability checked)* | `#4D5A3A` |
| `colors.brass` | Brass (buttons, frames) | `#B8862F` |
| `colors.brassLight` | Brass — light | `#E5BE6C` |
| `colors.floor` | Floor / RSVP band | `#8C1C1E` |
| `colors.floorDeep` | Floor — deep | `#6A1416` |
| `colors.dayPage` | Daytime event page | `#F6CEB5` |
| `colors.eveningTop` | Evening event page (top tint) | `#E8CDB8` |

### Fonts — `settings.fonts`

Pick by id. Only these: all are open-licence (SIL OFL) and load from Google Fonts.

| Setting | Used for | Default | Choices |
|---|---|---|---|
| `fonts.script` | Names & big titles (script) | `pinyon` | `pinyon` (Pinyon Script), `great-vibes` (Great Vibes), `parisienne` (Parisienne), `alex-brush` (Alex Brush) |
| `fonts.serif` | Body text | `eb-garamond` | `eb-garamond` (EB Garamond), `cormorant` (Cormorant Garamond), `lora` (Lora), `playfair` (Playfair Display) |
| `fonts.caps` | Small capital labels | `montserrat` | `montserrat` (Montserrat), `cinzel` (Cinzel), `josefin` (Josefin Sans) |

### Blocks — `settings.blocks`

| Setting | What it does | Default | Values |
|---|---|---|---|
| `blocks.opening` | Opening | `doors` | `doors` — Carved doors that swing open<br>`none` — No opening — straight to the card |
| `blocks.dates` | Dates | `scratch` | `scratch` — Scratch cards to reveal<br>`plain` — Shown plainly |
| `blocks.petals` | Falling petals | `true` | `true` / `false` |
| `blocks.countdown` | Countdown | `true` | `true` / `false` |
| `blocks.gallery` | Photo gallery (when the host adds photos) | `true` | `true` / `false` |
| `blocks.music` | Background music available | `true` | `true` / `false` |

### Music — `settings.music`

MP3 under 6 MB, about 1–3 minutes, loops cleanly. **Only tracks you are licensed to use** — write the licence and source in `music.licence`. The engine's default track isn't included in this kit, so the preview is silent unless you add your own.

| Setting | What it is | Default |
|---|---|---|
| `music.src` | Track (MP3, under 6 MB) | `/invite-templates/kalyana/music.mp3` |
| `music.licence` | Licence / source | Pixabay Content License — andriig, “Wedding” |

### Wording — `settings.wording`

Section titles for this design. Hosts still write their own names, family lines and blessings.

| Setting | Where it shows | Default | Max length |
|---|---|---|---|
| `wording.tagline` | Under the names | two hearts, one journey | 40 |
| `wording.blessings` | Families section label | With the blessings of our elders | 60 |
| `wording.familyLead` | Default invitation line (hosts can change) | we joyfully invite you to the wedding of | 120 |
| `wording.doorLine` | Default line on the doors (hosts can change) | ॥ ಶುಭ ವಿವಾಹ ॥ | 40 |
| `wording.datesOne` | Dates title — one event | The Auspicious Day | 40 |
| `wording.datesTwo` | Dates title — two events | Two Auspicious Days | 40 |
| `wording.datesMany` | Dates title — three or more | The Celebrations | 40 |
| `wording.countdownTitle` | Countdown title | The Celebration Begins | 40 |
| `wording.galleryTitle` | Gallery title | Us, Together | 40 |
| `wording.rsvpTitle` | RSVP title | Will you bless us with your presence? | 60 |
| `wording.rsvpSub` | RSVP line | Your blessings mean the world to us. | 80 |
| `wording.tapToOpen` | Door button | Tap to open | 20 |

### Sharing — `settings.share`

What hosts send with the link, and the card WhatsApp shows for it. Placeholders: {names} {events} {venue} {dates} {city} {details} {link}; in the event line {label} {date} {time} {place} (venue, only when events are at different places). An empty placeholder next to " · " or "," is removed with it and the line stays; one without a separator removes its whole line (so "📍 {venue}" disappears when there is no single venue). Invite-only invitations never show dates or venue. The link is added at the end if left out. Keep it short (6–10 lines).

Write a new line as `\n` in `design.json`. The preview's **Share message** panel shows the result for each sample.

| Setting | What it is | Max length | Default |
|---|---|---|---|
| `share.message` | Message | 1000 | With joy in our hearts and the blessings of our elders, we invite you and your family to the wedding of<br>{names} 💐<br><br>{events}<br><br>📍 {venue}<br><br>View the invitation and RSVP:<br>{link}<br><br>Your presence and blessings mean the world to us 🙏 |
| `share.eventLine` | Line for each event | 160 | 🗓️ {label} · {date}, {time}<br>📍 {place} |
| `share.previewTitle` | Link preview — title (one line) | 80 | {names} · Wedding Invitation |
| `share.previewDescription` | Link preview — description (one line) | 160 | {details} · Tap to view the invitation and RSVP |

## Engine `chapel` (v1.0.0)

Church wedding — an envelope with a wax seal, frosted-vellum dates to rub away, stationery cards per event, candles and florals.

### Artwork — `settings.art`

WebP (preferred) or PNG. **Transparent background** unless the slot says *solid*. Keep the **shape** (width ÷ height) within ±8% — the layout is drawn around it. The size is the engine's own file: match it or go up to 2×; the longest side must be at least 700 px (petals 100 px).

| Setting | What it is | Shape | Engine's size | Background | Required |
|---|---|---|---|---|---|
| `art.backdrop` | Backdrop behind the envelope (table, petals, candlelight) | 0.495 (portrait) | 900×1820 | solid | always set |
| `art.envelopePaper` | Envelope paper (plain, no folds) | 0.495 (portrait) | 900×1820 | solid | always set |
| `art.liner` | Envelope liner pattern | 1.000 (square) | 1100×1100 | solid | no |
| `art.seal` | Wax seal (blank centre — initials are added) | 1.032 (square) | 420×407 | transparent | always set |
| `art.tuck` | Sprig tucked under the seal | 0.757 (portrait) | 600×793 | transparent | no |
| `art.foilCorner` | Gold-foil corner (top-left; mirrored) | 1.000 (square) | 800×800 | transparent | no |
| `art.foilDivider` | Gold-foil divider | 12.162 (landscape) | 900×74 | transparent | no |
| `art.paper` | Card paper (repeats down the page; top and bottom edges must match) | 0.247 (portrait) | 900×3640 | solid | no |
| `art.wash` | Watercolour wash (section backgrounds) | 0.495 (portrait) | 900×1820 | solid | no |
| `art.spray` | Floral spray (top-left corner; mirrored) | 1.000 (square) | 900×900 | transparent | always set |
| `art.garland` | Floral garland (wide, low) | 2.230 (landscape) | 1200×538 | transparent | always set |
| `art.sprig` | Small sprig (between the families) | 1.000 (square) | 600×600 | transparent | no |
| `art.sceneDay` | Daytime event card (the church) | 1.608 (landscape) | 1000×622 | transparent | no |
| `art.sceneEvening` | Evening event card (the reception) | 1.608 (landscape) | 1000×622 | transparent | no |
| `art.candle` | Candle, unlit (the flame is added; wick at the top centre) | 0.148 (portrait) | 260×1753 | transparent | no |
| `art.petals` | Petals (3–20 small images) — a list of files | any | 160×183 each | transparent | 3–20 files |

"Always set" slots have an engine default, so you only need to replace them if you want to.

### Colours — `settings.colors`

Hex `#RRGGBB`. Text colours must stay readable on the paper colour — the checks measure it (main text at least 4.5 : 1, the others 3 : 1).

| Setting | What it colours | Default |
|---|---|---|
| `colors.backdrop` | Backdrop (behind the envelope) | `#1A221D` |
| `colors.envelope` | Envelope + reply band (under the paper art) | `#3E5446` |
| `colors.paper` | Paper | `#FBF8F1` |
| `colors.paper2` | Paper — shade | `#F4F0E6` |
| `colors.ink` | Main text *(readability checked)* | `#2B3A33` |
| `colors.inkSoft` | Secondary text *(readability checked)* | `#5D6B62` |
| `colors.gold` | Gold — small capitals, lines *(readability checked)* | `#8E7240` |
| `colors.goldLight` | Gold — on the green envelope | `#D9C394` |
| `colors.waxText` | Initials pressed into the seal | `#3A0D17` |

### Fonts — `settings.fonts`

Pick by id. Only these: all are open-licence (SIL OFL) and load from Google Fonts.

| Setting | Used for | Default | Choices |
|---|---|---|---|
| `fonts.script` | Script (envelope names, the “&”, the seal) | `pinyon` | `pinyon` (Pinyon Script), `great-vibes` (Great Vibes), `parisienne` (Parisienne), `alex-brush` (Alex Brush) |
| `fonts.serif` | Names, titles and body text | `cormorant` | `eb-garamond` (EB Garamond), `cormorant` (Cormorant Garamond), `lora` (Lora), `playfair` (Playfair Display) |
| `fonts.caps` | Engraved capitals (dates, labels) | `cinzel` | `montserrat` (Montserrat), `cinzel` (Cinzel), `josefin` (Josefin Sans) |

### Blocks — `settings.blocks`

| Setting | What it does | Default | Values |
|---|---|---|---|
| `blocks.opening` | Opening | `envelope` | `envelope` — Envelope with a wax seal<br>`none` — No opening — straight to the card |
| `blocks.dates` | Dates | `vellum` | `vellum` — Frosted vellum to rub away<br>`plain` — Shown plainly |
| `blocks.petals` | Falling petals | `true` | `true` / `false` |
| `blocks.countdown` | Countdown | `true` | `true` / `false` |
| `blocks.gallery` | Photo album (when the host adds photos) | `true` | `true` / `false` |
| `blocks.music` | Background music available | `true` | `true` / `false` |

### Music — `settings.music`

MP3 under 6 MB, about 1–3 minutes, loops cleanly. **Only tracks you are licensed to use** — write the licence and source in `music.licence`. The engine's default track isn't included in this kit, so the preview is silent unless you add your own.

| Setting | What it is | Default |
|---|---|---|
| `music.src` | Track (MP3, under 6 MB) | `/invite-templates/chapel/music.mp3` |
| `music.licence` | Licence / source | Pixabay Content License — paulyudin, “Romantic” (#493488) |

### Wording — `settings.wording`

Section titles for this design. Hosts still write their own names, family lines and blessings.

| Setting | Where it shows | Default | Max length |
|---|---|---|---|
| `wording.doorLine` | Default line on the envelope (hosts can change) | Holy Matrimony | 40 |
| `wording.envelopeLine` | Under the names on the envelope | you are warmly invited | 40 |
| `wording.tapToOpen` | Under the seal | Tap the seal to open | 30 |
| `wording.blessings` | Above the names | Together with their families | 60 |
| `wording.tagline` | Under the names | two hearts, one promise | 40 |
| `wording.familyLead` | Default invitation line (hosts can change) | request the honour of your presence as they are united in Holy Matrimony | 120 |
| `wording.datesOne` | Dates title — one event | Save the Date | 40 |
| `wording.datesTwo` | Dates title — two events | Save the Dates | 40 |
| `wording.datesMany` | Dates title — three or more | Save the Dates | 40 |
| `wording.datesHint` | Under the dates title | Rub the vellum to reveal | 40 |
| `wording.orderTitle` | Event cards title | The Order of the Day | 40 |
| `wording.countdownTitle` | Countdown title | Until we say “I do” | 40 |
| `wording.galleryTitle` | Album title | Us, Together | 40 |
| `wording.rsvpTitle` | Reply card title | Will you celebrate with us? | 60 |
| `wording.rsvpSub` | Reply card line | Your presence is the greatest gift. Let us know if you can join us. | 90 |

### Sharing — `settings.share`

What hosts send with the link, and the card WhatsApp shows for it. Placeholders: {names} {events} {venue} {dates} {city} {details} {link}; in the event line {label} {date} {time} {place}. Invite-only invitations never show dates or venue. The link is added at the end if left out. Keep it short (6–10 lines).

Write a new line as `\n` in `design.json`. The preview's **Share message** panel shows the result for each sample.

| Setting | What it is | Max length | Default |
|---|---|---|---|
| `share.message` | Message | 1000 | Together with their families,<br>{names}<br>request the honour of your presence at their wedding 💍<br><br>{events}<br><br>📍 {venue}<br><br>View the invitation and RSVP:<br>{link}<br><br>We would love to celebrate with you 🤍 |
| `share.eventLine` | Line for each event | 160 | 🗓️ {label} · {date}, {time}<br>📍 {place} |
| `share.previewTitle` | Link preview — title (one line) | 80 | {names} · Wedding Invitation |
| `share.previewDescription` | Link preview — description (one line) | 160 | {details} · Tap to view the invitation and RSVP |

