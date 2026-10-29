# Getting started

From nothing to a submitted design. About 15 minutes to your first preview.
After that, it takes as long as your artwork does.

## 1. Install Node.js

The kit's tools run on [Node.js](https://nodejs.org) **20 or newer**.
Download the **LTS** version for your computer and install it. Then check it
in a terminal (macOS: *Terminal*; Windows: *PowerShell*; Linux: any):

```bash
node -v      # v20.x or higher
```

There's nothing else to install. The kit has no dependencies, so you don't
need `npm install`.

## 2. Get the kit

With git:

```bash
git clone https://github.com/everso-club/invitation-design-kit.git
cd invitation-design-kit
```

Or, on GitHub, click **Code → Download ZIP**, unzip it, and open a terminal
in the unzipped folder.

## 3. Look at an example

```bash
npm run preview -- kalyana-peacock
```

Your browser opens the preview. Across the top is the checks bar. Below it,
each phone shows one sample invitation (couple **Priya & Arjun**): the
closed doors, then the opened card with 1, 2 or 3 events, an evening-only
event, very long names, and a guest who isn't invited to every event. Click
**open ↗** on a phone to see it full size, then scroll it top to bottom.

Stop the preview with **Ctrl+C** in the terminal.

## 4. Start your design

Pick an id: lowercase letters, numbers and dashes, starting with the engine
name, e.g. `kalyana-lotus-pink`. It's permanent once published.

```bash
npm run new -- kalyana-lotus-pink --from kalyana-peacock
```

`--from` copies an example, including its artwork. Leave it out to start
with every setting listed at its default and no artwork of your own.

Your design is now in `designs/kalyana-lotus-pink/`. Open that folder in any
text editor ([VS Code](https://code.visualstudio.com) works well).

## 5. Work on it

Start the preview and keep it open. It reloads every time you save:

```bash
npm run preview -- kalyana-lotus-pink
```

Then, in `design.json`:

1. Fill in `name`, `description`, `author` and `credits`.
2. Change colours, fonts, wording and blocks. Delete any setting you leave
   at its default.
3. Add artwork files next to `design.json` and point to them with `./`, for
   example `"art": { "door": "./door.webp" }`.
4. Replace `thumbnail.jpg` (480×648) with a screenshot of the top of your
   design.

What each setting does: [design guide](design-guide.md) and
[settings reference](spec.md). Artwork shapes and how to make them:
[artwork](artwork.md).

## 6. Check, pack and send

When the preview says **✓ All checks pass** and every phone looks right from
top to bottom:

```bash
npm run pack -- kalyana-lotus-pink
```

This writes `submissions/kalyana-lotus-pink-<date>.zip`. Email it to us:
see [submitting](submitting.md).

## Troubleshooting

| Problem | Fix |
|---|---|
| `node: command not found` / `npm: command not found` | Node.js isn't installed, or the terminal was open before you installed it. Close the terminal, open a new one and try again. |
| `npm run` says *Missing script* | Run commands from inside the `invitation-design-kit` folder (the one with `package.json`). |
| The browser didn't open | Copy the address the terminal prints (`http://localhost:5199/__design-preview`) into your browser. |
| Port already in use | The preview automatically tries the next port. The terminal prints the one it used. |
| *isn't valid JSON* | The message gives the line and column. Usual causes: a missing comma between settings, a comma after the last one, or curly “smart quotes” instead of straight `"`. |
| The fonts look plain | Fonts load from Google Fonts, so you need an internet connection. |
| No music in the preview | The engine's own track isn't included in the kit (its licence doesn't allow sharing the file). Add your own licensed MP3 to hear music. |
| A check fails and the message is unclear | Run `npm run check -- <id>` for the full details, or [open an issue](https://github.com/everso-club/invitation-design-kit/issues). |
