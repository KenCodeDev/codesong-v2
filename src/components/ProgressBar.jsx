import React from 'react';
import { Box, Text } from 'ink';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function ProgressBar({ currentTime, duration, width = 40 }) {
  const progress = Math.min(currentTime / duration, 1);
  const filledLength = Math.round(progress * width);
  const emptyLength = width - filledLength;
  const bar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);

  return (
    <Box>
      <Text>{bar}</Text>
      <Text> {formatTime(currentTime)} / {formatTime(duration)}</Text>
    </Box>
  );
}
