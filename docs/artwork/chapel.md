# Chapel — artwork guide

<!-- Generated from the Everso repository (art/briefs/chapel.mjs + the engine) — don't edit here. -->

The prompts that made the **Chapel** engine's own artwork. Use them as
they are to make matching pieces, or change the subject and palette in the
style line for a new design — keep the shapes. Each piece replaces the
setting in the *Slot* column ([settings reference](../spec.md)).

## Style line — paste at the start of every prompt

> Delicate loose watercolour illustration for a premium Christian wedding stationery suite, soft natural daylight, white garden roses, lisianthus, eucalyptus and olive leaves, palette of ivory, blush, sage green, dusty blue and soft antique gold accents, visible cold-press paper texture, airy and elegant, no text, no letters, no watermark, no people.

For pieces marked *white*, end with: “Plain flat white background, the object only — no borders, no decorative corners, no frame.”

## Rules
- Make every piece in ONE image-model chat: paste the style line first, then “same style, now …” — so they look like one artist made them.
- Cut-out pieces (white): ask for a plain flat white background, never “transparent” (models paint a fake checkerboard), then remove the white (see the artwork guide, artwork.md).
- Full pieces (full): fill the whole frame, edge to edge — leave off the “white background” sentence.
- No text, no letters, no people in any piece — names, initials and dates are drawn by the engine.
- Never use other studios’ invitations as a style reference.
- Shape matters more than size: ask for the shape given and keep the full size. A small model logo in a corner is fine — crop or paint it out.
- Pieces that repeat down a page or sit behind text must stay very plain. Watch for ornamental borders and frames nobody asked for.
- Avoid memorial cues: no lone candles on dark grounds — candles stand in flowers on light grounds.
- The seal carries the couple’s initials and never breaks; its centre must be blank.

## Pieces

Save each image as `<id>.png` (the id below).

| # | Save as | Slot | Shape · min size | Background | Prompt (after the style line) |
|---|---|---|---|---|---|
| 1 | `envelope-paper` | `art.envelopePaper` | 1:2 portrait · 1187×2400 | *full* | Flat lay photograph of plain deep forest-green cotton paper filling the entire frame edge to edge, soft even light, visible felt and fibre texture, a very faint tone-on-tone embossed pattern of small leaves, nothing else in the image — no flowers, no objects, no folds, no edges, no text. Realistic paper, not painted.<br>**Tip:** The first attempt came back as a bouquet. If it adds flowers or objects: “only the paper surface, nothing else”. |
| 2 | `liner` | `art.liner` | 1:1 square · 1400×1400 | *full* | A seamless repeating pattern for an envelope liner: small sprigs of eucalyptus and olive leaves in dusty blue and sage, tiny gold dots and small blush buds, scattered evenly on warm ivory paper, gentle and sparse, tiles edge to edge with no visible seams |
| 3 | `seal` | `art.seal` | 1:1 square · 1400×1400 | *white* | A single round wax seal in deep wine-burgundy wax seen straight from above, thick glossy wax with an irregular melted rim and small drips, a raised smooth ring inside the edge and a completely plain flat centre with no design, no letters, no monogram, soft shadow under it<br>**Tip:** The centre must be blank — the engine writes the initials. If it adds letters or a crest, ask it to remove them. |
| 4 | `seal-gold` | — | 1:1 square · 1400×1400 | *white* | Same wax seal, same shape and angle, in antique gold wax<br>**Tip:** A second seal colour for designs. |
| 5 | `backdrop` | `art.backdrop` | 1:2 portrait · 1187×2400 | *full* | Top-down view of a dark sage-green linen tablecloth in low warm candlelight, a few white and blush rose petals and two eucalyptus sprigs scattered near the edges, the soft glow of out-of-frame candles at the top corners, the centre left calm and empty, moody and elegant<br>**Tip:** Only the edges show around the envelope — keep the interest there. |
| 6 | `spray` | `art.spray` | 1:1 square · 1400×1400 | *white* | A lush floral spray growing from the top-left corner and trailing diagonally towards the centre: two white garden roses, one blush rose, white lisianthus, eucalyptus and olive leaves, a few dusty-blue thistles, loose trailing tendrils, the bottom-right half of the image left empty |
| 7 | `garland` | `art.garland` | 2.2:1 landscape · 2230×1000 | *white* | A low horizontal floral arrangement, symmetrical: white garden roses and blush roses in the centre, eucalyptus and olive leaves trailing out to both sides and getting thinner towards the ends, seen from the front |
| 8 | `church` | `art.sceneDay` | 1.6:1 landscape · 1608×1000 | *white* | A small white stone chapel seen from the front with an arched wooden door, a rose window and a simple cross on the bell tower, climbing roses and two olive trees beside it, soft dusty-blue sky wash, the edges fading softly into the white paper |
| 9 | `reception` | `art.sceneEvening` | 1.6:1 landscape · 1608×1000 | *white* | An open garden lawn at dusk with an elegant white marquee, warm string lights draped overhead, round tables with white cloths and candles, a few trees, the edges fading softly into the white paper |
| 10 | `sprig` | `art.sprig` | 1:1 square · 1400×1400 | *white* | A small single sprig: one white rose bud with eucalyptus and olive leaves tied with a thin ivory silk ribbon, centred |
| 11 | `candle` | `art.candle` | 1:6.7 portrait · 356×2400 | *white* | One tall slim ivory pillar candle standing upright, front view, unlit with a short black wick, a little soft wax drip near the top, a soft shadow at the base<br>**Tip:** Must be unlit — the flame is drawn in code. Note where the wick sits (the flame is placed on it). |
| 12 | `petals` | `art.petals` | 1:1 square · 1400×1400 | *white* | Six single loose rose petals (three white, three pale blush) laid out in two rows of three, well spaced so none touch, each slightly curled, seen from above |
| 13 | `paper` | `art.paper` | 1:2 portrait · 1187×2400 | *full* | Flat lay photograph of handmade ivory cotton paper filling the entire frame, soft even daylight, visible fibres and a gentle deckled texture, completely plain, nothing else in the image. Realistic paper, not painted.<br>**Tip:** Text sits on it — it must stay very plain. Mirrored so it repeats down the page with no seam. |
| 14 | `wash` | `art.wash` | 1:2 portrait · 1187×2400 | *full* | A very soft loose watercolour wash on white cold-press paper: pale sage green, blush and a little dusty blue drifting in from the edges and corners, the centre almost white, abstract, no flowers, no objects |
| 15 | `foil-corner` | `art.foilCorner` | 1:1 square · 1400×1400 | *white* | Fine botanical line art in shiny antique gold foil: eucalyptus, olive and fern sprigs curling out of the top-left corner, thin elegant lines like a foil-pressed wedding invitation, metallic shine, the bottom-right half of the image left empty<br>**Tip:** Ask for “shiny metallic gold” if it comes out flat ochre. |
| 16 | `foil-divider` | `art.foilDivider` | 12.2:1 landscape · 12162×1000 | *white* | A delicate horizontal divider in shiny antique gold foil: a thin line that thickens slightly in the middle, with a small sprig of olive leaves and one tiny rose bud in the centre, symmetrical |
| 17 | `tuck` | `art.tuck` | 1:1.3 portrait · 1816×2400 | *white* | A small dried-flower sprig made to be tucked under a wax seal: two eucalyptus stems, white baby’s breath, one small cream rose and a few soft dried grasses, arranged diagonally from bottom-left to top-right, loose and airy, no ribbon<br>**Tip:** It sits half under the seal, so it needs stems that reach out on both sides. |
