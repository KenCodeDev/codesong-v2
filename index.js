import { select } from '@clack/prompts';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { render } from 'ink';
import React from 'react';
import App from './src/App.jsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const songsDir = path.join(__dirname, 'songs');   // folder lagu

async function getSongFolders() {
  // Pastikan folder songs ada
  try {
    await fs.access(songsDir);
  } catch {
    return [];
  }

  const entries = await fs.readdir(songsDir, { withFileTypes: true });
  const folders = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const songJsPath = path.join(songsDir, entry.name, 'data', 'song.js');
      try {
        await fs.access(songJsPath);
        folders.push(entry.name);
      } catch {
        // tidak ada song.js, lewati aja folder nii
      }
    }
  }
  return folders;
}

async function loadSongData(folderName) {
  const songJsPath = path.join(songsDir, folderName, 'data', 'song.js');
  const fileUrl = pathToFileURL(songJsPath).href;
  const module = await import(fileUrl);
  const songData = module.default;
  // Resolve audio file relatif terhadap lokasi song.js
  const songDir = path.dirname(songJsPath);
  const audioFile = path.resolve(songDir, songData.audioFile);
  return { songData, audioFile };
}

async function main() {
  const folders = await getSongFolders();
  if (folders.length === 0) {
    console.error('Tidak ada folder lagu yang ditemukan di folder songs/!');
    process.exit(1);
  }

  const options = [];
  for (const folder of folders) {
    const { songData } = await loadSongData(folder);
    options.push({
      value: folder,
      label: `${songData.title} - ${songData.artist}`,
      hint: songData.album || '',
    });
  }

  const selected = await select({
    message: 'Pilih lagu yang akan diputar:',
    options,
  });

  if (!selected) {
    process.exit(0);
  }

  const { songData, audioFile } = await loadSongData(selected);
//   console.log('[Index] Selected audio file:', audioFile);
  render(React.createElement(App, { songData, audioFile }));
}

main().catch(console.error);