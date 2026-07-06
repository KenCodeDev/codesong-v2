import React from 'react';
import { Box, Text } from 'ink';
import RotatingDisc from './RotatingDisc.js';
import ProgressBar from './ProgressBar.js';

export default function Header({ song, currentTime }) {
  return (
    <Box
      borderStyle="round"
      borderColor="cyan"
      padding={1}
      flexDirection="column"
      width="100%"
    >
      <Box marginBottom={1}>
        <RotatingDisc />
        <Text bold color="green"> Now Playing</Text>
      </Box>
      <Box marginBottom={1}>
        <Text bold color="yellow">{song.title}</Text>
      </Box>
      <Box marginBottom={1}>
        <Text color="magenta">{song.artist}</Text>
      </Box>
      {song.album && (
        <Box marginBottom={1}>
          <Text color="gray">{song.album}</Text>
        </Box>
      )}
      <Box>
        <ProgressBar currentTime={currentTime} duration={song.duration} />
      </Box>
    </Box>
  );
}
