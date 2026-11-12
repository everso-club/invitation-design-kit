# Artwork

The painted pieces are what make a design feel new. This page covers the
rules every piece must follow and how to make a matching set, by hand or
with an image model. For the exact shape and size of every slot, see
[settings reference → Artwork](spec.md).

## The rules

| | Rule | Why |
|---|---|---|
| **Format** | WebP (preferred) or PNG. JPEG only for the thumbnail and the solid slots. | Transparency, small files. |
| **Transparency** | Cut-out pieces (garland, lamp, leaves, coconuts, basket, kolam, petals) need a **transparent background**. The door panel and the two scenes are full pictures. | The pieces are layered over the paper and each other. |
| **Shape** | Each slot has a fixed shape (width ÷ height). Stay within **±8%**. | The layout is drawn around it, so a wrong shape gets squashed or misplaced. |
| **Size** | At least the engine's size in the reference, and up to 2× it. The longest side must be at least 700 px (petals 100 px). Under 7 MB each. | Sharp on high-resolution phones; Everso compresses everything when publishing. |
| **Content** | **No text, no people, no faces, no logos, no watermarks.** | Names and dates are drawn by the engine, in every language. |
| **File names** | Lowercase letters, numbers, dashes and dots: `door.webp`, `petal-3.webp`. Directly next to `design.json`, with no sub-folders. | They become web addresses. |
| **Originality** | Your own work, or made with tools whose terms let you use the result commercially. Never other studios' invitations, even as a style reference. | We publish it to real hosts. |

`npm run check` and the preview check the format, transparency, shape, size
and names for you.

## Slot by slot

- **Door panel** (`art.door`): **one** panel, the left door, with its handle
  on the **right edge**. The engine mirrors it for the right door, so the
  handles meet in the middle. It's a full picture, so fill the whole frame.
- **Garland** (`art.thorana`): a long, thin strip across the top. Things can
  hang down from it, but keep them inside the shape.
- **Lamp** (`art.deepa`): a tall, narrow piece. The engine draws live flames
  only on its own lamp, so a custom lamp should look good unlit, or have its
  flames painted in.
- **Leaves** (`art.leafLeft`, `art.leafRight`): tall plants rising from the
  bottom corners. The left one grows up and to the right, the right one up
  and to the left. They sway gently.
- **Coconuts, basket** (`art.coconut`, `art.basket`): foreground objects
  standing on the floor. Include a soft contact shadow.
- **Kolam** (`art.kolam`): a floor design seen in gentle perspective, wide
  and flat.
- **Daytime scene** (`art.sceneDay`): a portrait picture at the bottom of
  each daytime event page. Keep the **top quarter calm** (plain sky or wall),
  because the venue text sits on it.
- **Evening scene** (`art.sceneEvening`): a wide band. Its edges fade out,
  so keep the subject in the middle.
- **Petals** (`art.petals`): 3 to 20 small pieces that fall, sway and tumble.
  Use a few different shapes and sizes, and paint both sides the same, since
  they flip.

## Making a matching set

All the pieces of one design should look like **one artist** made them, in
one style, palette and lighting. If you paint by hand, work from one palette.
If you use an image model, make every piece in **one conversation** and
start every prompt with the **same style line**.

### Image models (Gemini, Midjourney, DALL·E…)

Image models can't export real transparency, and they often paint a fake
grey-and-white checkerboard instead. So:

1. Ask for a **plain flat white background**.
2. Remove the background yourself: Photoshop *Remove background*,
   [remove.bg](https://www.remove.bg), or the open-source
   [rembg](https://github.com/danielgatis/rembg).
3. Crop to the slot's shape and save as WebP or PNG.
4. Check that the model's terms allow commercial use, and say which model
   you used in `credits.artwork`.

**Each engine has its own artwork guide**: the style line and the exact
prompts behind its original art, every piece with the shape its slot needs,
and what image models tend to get wrong. They're the same guides Everso
works from. Start from your engine's:

- [Kalyana](artwork/kalyana.md)
- [Chapel](artwork/chapel.md)

(All engines: [engines](engines.md).) For a new design, change the style line
first (palette, medium, mood), then the objects, and keep the shapes.

## The thumbnail

`thumbnail.jpg`, **480×648**, is the card hosts see in the design picker.
A screenshot of the closed doors or the top of the card works well. Open a
frame full size in the preview and use your browser's screenshot tool,
then crop to 480×648.
