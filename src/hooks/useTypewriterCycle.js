import { useEffect, useRef, useState } from "react";

/**
 * Cycles through `words` as a classic typewriter: types each one in, holds
 * it for `holdMs`, then backspaces it out before typing the next.
 */
export default function useTypewriterCycle(words, holdMs = 30000, typeSpeedMs = 55, eraseSpeedMs = 32) {
  const [text, setText] = useState(words[0] ?? "");
  const indexRef = useRef(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function clearTimers() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }

    function after(delay, fn) {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    }

    function typeWord(word, onDone) {
      let i = 0;
      function step() {
        i += 1;
        setText(word.slice(0, i));
        if (i < word.length) after(typeSpeedMs, step);
        else onDone();
      }
      step();
    }

    function eraseWord(word, onDone) {
      let i = word.length;
      function step() {
        i -= 1;
        setText(word.slice(0, i));
        if (i > 0) after(eraseSpeedMs, step);
        else onDone();
      }
      step();
    }

    function cycle() {
      const word = words[indexRef.current % words.length];

      if (reduceMotion) {
        setText(word);
        after(holdMs, () => {
          indexRef.current += 1;
          cycle();
        });
        return;
      }

      typeWord(word, () => {
        after(holdMs, () => {
          eraseWord(word, () => {
            after(250, () => {
              indexRef.current += 1;
              cycle();
            });
          });
        });
      });
    }

    cycle();
    return clearTimers;
  }, [words, holdMs, typeSpeedMs, eraseSpeedMs]);

  return text;
}
