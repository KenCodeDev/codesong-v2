import React from 'react';
import { Box, Text } from 'ink';
import useTypewriter from '../hooks/useTypewriter.js';

export default function Lyrics({ lyrics, initialDelay }) {
  const { finishedLines, displayedText, status } = useTypewriter(lyrics, initialDelay);

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      {finishedLines.map((line, index) => (
        <Text key={index}>{line || ' '}</Text>
      ))}
      {status !== 'finished' && displayedText.length > 0 && (
        <Text>{displayedText}</Text>
      )}
    </Box>
  );
}
