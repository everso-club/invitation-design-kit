/**
 * Image dimensions from the file header — PNG, JPEG and WebP — so the kit
 * can check artwork shapes without installing an image library.
 */

/** @return {{ type: string, width: number, height: number } | null} */
export function imageSize(buf) {
  if (buf.length < 24) return null;
  // PNG: signature, then the IHDR chunk.
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { type: 'png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first start-of-frame.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const len = buf.readUInt16BE(i + 2);
      const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isFrame) return { type: 'jpeg', width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
    return null;
  }
  // WebP: RIFF container with a VP8 (lossy), VP8L (lossless) or VP8X (extended) chunk.
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') {
      return { type: 'webp', width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { type: 'webp', width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) };
    }
    if (chunk === 'VP8 ') {
      return { type: 'webp', width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
  }
  return null;
}

/** Does the file contain an alpha channel at all? (PNG / WebP; JPEG never does.) */
export function mayHaveTransparency(buf, type) {
  if (type === 'png') return [4, 6].includes(buf[25]) || buf.includes(Buffer.from('tRNS'));
  if (type === 'webp') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return (buf[20] & 0x10) !== 0;
    if (chunk === 'VP8L') return ((buf.readUInt32LE(21) >> 28) & 1) === 1;
    return false;
  }
  return false;
}
