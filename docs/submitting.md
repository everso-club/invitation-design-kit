# Submitting a design

## 1. Pack it

```bash
npm run pack -- <id>
```

This runs every check, then writes `submissions/<id>-<date>.zip`. The zip
holds only `design.json`, `notes.md` (if you wrote one) and the files your
design uses. Anything else in the folder is left out.

## 2. Send it

Email **contact@everso.club** with:

- **Subject:** `Invitation design: <your design's name>`
- **Attached:** the zip (or a download link if it's over 20 MB)
- **Two or three screenshots** from the preview: the closed doors, an event
  page, the RSVP band
- **The artwork source** and, if you added music, its licence. These are
  also in `design.json`, but say it in the email too.
- Anything you wanted that the engine couldn't do

## 3. What happens next

1. **We review it.** We look at every frame on real phones and run the same
   checks again. We aim to reply within two weeks.
2. **We may ask for changes.** Send an updated zip with the same `id` and a
   new `changelog` line.
3. **We publish it.** It appears in the Everso app's design picker for the
   event types you chose. We may adjust its placement, tier or name to fit
   the catalogue, and we'll tell you if we do.
4. **Updates later:** send a new zip with the same `id`. Hosts who already
   use your design are offered the update. They're never switched without
   their say.

### What we look for

- It passes every check, and every frame looks right from top to bottom.
- The artwork is consistent, original and well cut out, with no text,
  people or logos.
- It's clearly different from the designs already in the picker.
- It's suitable for the occasion and respectful of the traditions it draws on.

We can't publish every design we receive. If we don't, we'll tell you why.

## Credit

- Please send only work that's yours (or that you're allowed to share),
  with no real people in it.
- **We credit you** by your `author.name`, linking `author.url` where the
  app shows credits.
- Want it taken down later? Email us. We'll remove it from the picker, and
  invitations hosts already made with it keep working.

Questions before you start? Email contact@everso.club or
[open an issue](https://github.com/everso-club/invitation-design-kit/issues).
