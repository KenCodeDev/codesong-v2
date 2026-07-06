import sound from 'sound-play';
import path from 'path';
import fs from 'fs';

const filePath = process.argv[2];
if (!filePath) {
  console.error('[play-audio] No file path provided');
  process.exit(1);
}

const absolutePath = path.resolve(filePath);
// console.log('[play-audio] Playing:', absolutePath);

if (!fs.existsSync(absolutePath)) {
  console.error('[play-audio] File does not exist:', absolutePath);
  process.exit(1);
}

sound.play(absolutePath)
  .then(() => {
    // console.log('[play-audio] Play finished');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[play-audio] Error playing:', err.message);
    process.exit(1);
  });