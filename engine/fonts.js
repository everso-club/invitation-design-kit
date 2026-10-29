// Generated from the Everso repository by `npm run designs:kit` — don't edit here.
/**
 * Curated, open-licence (SIL OFL, Google Fonts) fonts a design may use.
 * Only these can be chosen in the console — never free text — so every font
 * is licensed for our use and loads from one place.
 */
export const FONTS = {
  script: [
    { id: 'pinyon', label: 'Pinyon Script', family: 'Pinyon Script', css: 'Pinyon+Script' },
    { id: 'great-vibes', label: 'Great Vibes', family: 'Great Vibes', css: 'Great+Vibes' },
    { id: 'parisienne', label: 'Parisienne', family: 'Parisienne', css: 'Parisienne' },
    { id: 'alex-brush', label: 'Alex Brush', family: 'Alex Brush', css: 'Alex+Brush' },
  ],
  serif: [
    { id: 'eb-garamond', label: 'EB Garamond', family: 'EB Garamond', css: 'EB+Garamond:ital,wght@0,400;0,500;0,600;1,400' },
    { id: 'cormorant', label: 'Cormorant Garamond', family: 'Cormorant Garamond', css: 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400' },
    { id: 'lora', label: 'Lora', family: 'Lora', css: 'Lora:ital,wght@0,400;0,500;0,600;1,400' },
    { id: 'playfair', label: 'Playfair Display', family: 'Playfair Display', css: 'Playfair+Display:ital,wght@0,400;0,500;0,600;1,400' },
  ],
  caps: [
    { id: 'montserrat', label: 'Montserrat', family: 'Montserrat', css: 'Montserrat:wght@500;600;700' },
    { id: 'cinzel', label: 'Cinzel', family: 'Cinzel', css: 'Cinzel:wght@500;600;700' },
    { id: 'josefin', label: 'Josefin Sans', family: 'Josefin Sans', css: 'Josefin+Sans:wght@500;600;700' },
  ],
};

const byId = (group, id) => FONTS[group].find((f) => f.id === id) || FONTS[group][0];

/** CSS font-family stack for a chosen font id. */
export function fontFamily(group, id) {
  const f = byId(group, id);
  const fallback = group === 'script' ? 'cursive' : group === 'caps' ? 'system-ui, sans-serif' : 'Georgia, serif';
  return `'${f.family}', ${fallback}`;
}

/** One Google Fonts stylesheet URL for the chosen fonts (+ always-needed extras). */
export function fontsHref({ script, serif, caps }, extras = []) {
  const fams = [byId('script', script).css, byId('serif', serif).css, byId('caps', caps).css, ...extras];
  return `https://fonts.googleapis.com/css2?${[...new Set(fams)].map((f) => `family=${f}`).join('&')}&display=swap`;
}
