import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTypewriter(lyrics, initialDelay = 0) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [status, setStatus] = useState('idle');
  const [finishedLines, setFinishedLines] = useState([]);

  const charIndexRef = useRef(0);
  const typingIntervalRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const initialDelayRef = useRef(null);

  const currentLine = lyrics[currentLineIndex];

  // Reset semua state ketika lyrics berubah
  useEffect(() => {
    // Bersihkan semua timer
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
    if (initialDelayRef.current) clearTimeout(initialDelayRef.current);

    setCurrentLineIndex(0);
    setDisplayedText('');
    setStatus('idle');
    setFinishedLines([]);
    charIndexRef.current = 0;

    if (lyrics.length === 0) {
      setStatus('finished');
      return;
    }

    // Mulai dengan delay awal (jika ada)
    if (initialDelay > 0) {
      setStatus('idle');
      initialDelayRef.current = setTimeout(() => {
        setStatus('typing');
        initialDelayRef.current = null;
      }, initialDelay);
    } else {
      setStatus('typing');
    }

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
      if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
    };
  }, [lyrics, initialDelay]);

  // Fungsi mengetik satu karakter
  const typeChar = useCallback(() => {
    const line = lyrics[currentLineIndex];
    if (!line) return;
    if (charIndexRef.current < line.text.length) {
      setDisplayedText((prev) => prev + line.text[charIndexRef.current]);
      charIndexRef.current++;
    } else {
      // Baris selesai diketik
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setFinishedLines((prev) => [...prev, line.text]);
      setDisplayedText('');
      setStatus('delay');

      delayTimeoutRef.current = setTimeout(() => {
        if (currentLineIndex < lyrics.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
          charIndexRef.current = 0;
          setStatus('typing');
        } else {
          setStatus('finished');
        }
        delayTimeoutRef.current = null;
      }, line.nextDelay);
    }
  }, [currentLineIndex, lyrics]);

  // Atur interval pengetikan hanya saat status "typing"
  useEffect(() => {
    if (status === 'typing') {
      const typingSpeed = currentLine?.typingSpeed || 40;
      if (typingSpeed <= 0) {
        // Baris kosong atau typingSpeed 0 => langsung panggil typeChar
        typeChar();
      } else {
        typingIntervalRef.current = setInterval(typeChar, typingSpeed);
      }
    }
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [status, typeChar, currentLine]);

  // Reset indeks karakter saat baris berganti
  useEffect(() => {
    charIndexRef.current = 0;
  }, [currentLineIndex]);

  return { currentLine, displayedText, status, finishedLines };
}