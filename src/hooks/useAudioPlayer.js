import { useEffect, useRef } from 'react';
import { fork } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const playScript = path.resolve(__dirname, '../../play-audio.js');

export default function useAudioPlayer(filePath) {
  const childRef = useRef(null);

  useEffect(() => {
    if (!filePath) {
      // console.log('[Audio] No filePath provided');
      return;
    }

    const absolutePath = path.resolve(filePath);
    // console.log('[Audio] Absolute path:', absolutePath);
    
    if (!fs.existsSync(absolutePath)) {
      console.error('[Audio] File not found:', absolutePath);
      return;
    }

    // console.log('[Audio] Forking play-audio.js with', absolutePath);
    const child = fork(playScript, [absolutePath], {
      silent: true,
      detached: false,
    });

    childRef.current = child;

    // output dari child process
    child.stdout.on('data', (data) => {
      // console.log(`[Audio stdout] ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`[Audio stderr] ${data}`);
    });

    child.on('error', (err) => {
      console.error('[Audio] Fork error:', err.message);
    });

    child.on('exit', (code) => {
      // console.log('[Audio] Child process exited with code', code);
    });

    return () => {
      if (childRef.current) {
        // console.log('[Audio] Killing child process');
        childRef.current.kill();
      }
    };
  }, [filePath]);
}
