import React, { useState } from 'react';
import { Text } from 'ink';
import useInterval from '../hooks/useInterval.js';

const frames = ['◷', '◶', '◵', '◴'];

export default function RotatingDisc() {
  const [frameIndex, setFrameIndex] = useState(0);

  useInterval(() => {
    setFrameIndex((prev) => (prev + 1) % frames.length);
  }, 80); // kurang lebih ~12.5 FPS

  return (
    <Text>
      💿 {frames[frameIndex]}
    </Text>
  );
}
