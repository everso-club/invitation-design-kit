# Changelog

All notable changes to the kit. Versions follow [semantic versioning](https://semver.org):
a new major version means existing designs may need changes.

## 1.1.1 — 2026-11-12

- RSVP titles no longer start with “Will you”: Kalyana v1.2.1 defaults to
  “Your presence is our blessing”, Chapel v1.0.1 to “We’d love to celebrate
  with you” (`wording.rsvpTitle`; designs that set their own keep it).
  Kalyana's line under it: “We would be honoured to have you with us.”
  (`wording.rsvpSub`), so “blessing” isn't said twice.

## 1.1.0 — 2026-11-12

- New engine **Chapel** v1.0.0 (church wedding): an envelope with a wax seal,
  dates under frosted vellum, a stationery card per event, candles in
  flowers. Example `chapel-evergreen`.
- [Engines](docs/engines.md) page, and an **artwork guide per engine**
  (`docs/artwork/<engine>.md`): the style line and prompts behind its
  original art, with the shape each piece needs.
- Preview: two more samples — a cover photo with 6 album photos, and names
  off the cover. Sample photos per engine.
- Every published Everso design is now an example.

- Engine **Kalyana** v1.2.0: a **Sharing** section (`settings.share`) — the
  WhatsApp message hosts send and the link preview's title and description,
  with placeholders. New multi-line text setting kind (`longText`).
- Preview: a **Share message** row under the phones (2 / 1 / 3 events and
  invite-only).

## 1.0.0 — 2026-10-29

First public release.

- `new`, `preview`, `check` and `pack` commands, with no dependencies.
- Engine **Kalyana** v1.1.0: 13 colours, 3 font roles, 11 artwork slots,
  music, 12 wording settings, 6 blocks.
- Examples: `kalyana-classic` (the original look) and `kalyana-peacock`
  (new colours, fonts, wording, door and petals).
- Docs: getting started, design guide, artwork, settings reference, submitting.
