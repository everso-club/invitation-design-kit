# Kalyana — artwork guide

<!-- Generated from the Everso repository (art/briefs/kalyana.mjs + the engine) — don't edit here. -->

The prompts that made the **Kalyana** engine's own artwork. Use them as
they are to make matching pieces, or change the subject and palette in the
style line for a new design — keep the shapes. Each piece replaces the
setting in the *Slot* column ([settings reference](../spec.md)).

## Style line — paste at the start of every prompt

> Soft realistic gouache painting in the style of a premium South Indian wedding invitation, warm natural light, rich true-to-life textures (brass, banana leaf, jasmine), gentle shadows, muted elegant palette of blush beige, maroon, brass gold and deep leaf green, no text, no watermark, no people.

For pieces marked *white*, end with: “Plain flat white background, the object only — no borders, no decorative corners, no frame.”

## Rules
- Make every piece in ONE image-model chat: paste the style line first, then “same style, now …” — so they look like one artist made them.
- Cut-out pieces (white): ask for a plain flat white background, never “transparent” (models paint a fake checkerboard), then remove the white (see the artwork guide, artwork.md).
- Full pieces (full): fill the whole frame, edge to edge — leave off the “white background” sentence.
- No text, no letters, no people in any piece — names, initials and dates are drawn by the engine.
- Never use other studios’ invitations as a style reference.
- Shape matters more than size: ask for the shape given and keep the full size. A small model logo in a corner is fine — crop or paint it out.
- Pieces that repeat down a page or sit behind text must stay very plain. Watch for ornamental borders and frames nobody asked for.
- Generate a little larger than the slot, then crop to its shape.
- For a new design, change the style line first (palette, medium, mood), then the objects.

## Pieces

Save each image as `<id>.png` (the id below).

| # | Save as | Slot | Shape · min size | Background | Prompt (after the style line) |
|---|---|---|---|---|---|
| 1 | `leaf-left` | `art.leafLeft` | 1:1.7 portrait · 1438×2400 | *white* | Two tall fresh banana leaves rising from the bottom-left corner and curving upward, slightly torn edges, visible veins |
| 2 | `leaf-right` | `art.leafRight` | 1:1.6 portrait · 1545×2400 | *white* | Mirror of the left: two tall banana leaves rising from the bottom-right corner |
| 3 | `deepa` | `art.deepa` | 1:2.9 portrait · 821×2400 | *white* | A tall traditional brass Karnataka samai oil lamp, polished, three unlit wicks, front view, standing upright<br>**Tip:** Unlit — the flames are drawn in code. |
| 4 | `coconut` | `art.coconut` | 1.6:1 landscape · 1628×1000 | *white* | Two tender green coconuts resting on the floor with a soft shadow |
| 5 | `basket` | `art.basket` | 1.1:1 landscape · 1111×1000 | *white* | A small woven cane basket overflowing with fresh jasmine buds and a few mango leaves |
| 6 | `kolam` | `art.kolam` | 2.7:1 landscape · 2727×1000 | *white* | A white rice-flour kolam (rangoli) pattern on the floor seen in gentle perspective, interlocking loops around dots, a few marigold flowers scattered |
| 7 | `thorana` | `art.thorana` | 4.9:1 landscape · 4895×1000 | *white* | A traditional mango-leaf thorana (door garland) strung horizontally with marigolds and jasmine strands hanging down, small brass bells |
| 8 | `door` | `art.door` | 1:1.8 portrait · 1307×2400 | *full* | One panel of an old carved teak wood temple-house door, brass studs in a grid, a brass ring handle at the right edge, front view, filling the frame<br>**Tip:** The handle must be on the right edge — the left door is this panel mirrored. |
| 9 | `scene-evening` | `art.sceneEvening` | 2.9:1 landscape · 2857×1000 | *full* | An evening courtyard for a reception: warm fairy string lights overhead, a large brass urli bowl with floating marigolds, brass lamps lit, jasmine baskets, soft bokeh, lower half detailed, upper third plain dusk sky |
| 10 | `scene-day` | `art.sceneDay` | 1:1.5 portrait · 1598×2400 | *full* | A traditional South Indian wedding mandap with a sloped tiled roof by calm water at sunset, jasmine strands hanging from the eaves, banana trees on both sides, brass lamps, a petal path leading to it, upper third plain peach sky |
| 11 | `petals` | `art.petals` | 1:1 square · 1400×1400 | *white* | Six single loose marigold and rose petals (orange, yellow and deep pink) laid out in two rows of three, well spaced so none touch, each slightly curled, seen from above<br>**Tip:** Written for the kit — the original petals predate it. |
