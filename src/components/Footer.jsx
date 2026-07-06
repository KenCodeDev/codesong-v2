import React from 'react';
import { Box, Text } from 'ink';
import gradient from 'gradient-string';

export default function Footer({ lines }) {
  const gradientFn = gradient(['cyan', 'blue', 'lightblue']);

  return (
    <Box flexDirection="column" marginTop={1}>
      {lines.map((line, index) => (
        <Text key={index}>{gradientFn(line)}</Text>
      ))}
    </Box>
  );
}
