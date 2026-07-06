import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import Header from './components/Header.js';
import Lyrics from './components/Lyrics.js';
import Footer from './components/Footer.js';
import useInterval from './hooks/useInterval.js';
import useAudioPlayer from './hooks/useAudioPlayer.js';

export default function App({ songData, audioFile }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startupDelay = 1200;   // fade in
  const fadeOutDelay = 1500;   // fade out

  useInterval(() => {
    setCurrentTime((prev) => {
      if (prev < songData.duration) return prev + 1;
      return prev;
    });
  }, 1000);

  useAudioPlayer(audioFile);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), startupDelay);
    return () => clearTimeout(timer);
  }, [startupDelay]);

  useEffect(() => {
    if (currentTime >= songData.duration && !isFinished) {
      setIsFinished(true);
      const exitTimer = setTimeout(() => {
        process.exit(0);
      }, fadeOutDelay);
      return () => clearTimeout(exitTimer);
    }
  }, [currentTime, isFinished, songData.duration, fadeOutDelay]);

  if (!isReady) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        <Text color="cyan" bold>🎵 Memuat lagu...</Text>
        <Text><Spinner type="dots" /></Text>
      </Box>
    );
  }

  if (isFinished) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        <Text color="green" bold>✨ Thank you guys for your support 💖</Text>
        <Text color="gray">See you all later!</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Header song={songData} currentTime={currentTime} />
      <Lyrics lyrics={songData.lyrics} initialDelay={songData.initialDelay} />
      <Footer lines={songData.footer} />
    </Box>
  );
}
