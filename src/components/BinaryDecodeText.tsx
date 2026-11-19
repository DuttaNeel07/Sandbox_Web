import React, { useState, useEffect, useRef } from 'react';

interface BinaryDecodeTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
  scrambleOnMount?: boolean;
  prefix?: string;
}

export const BinaryDecodeText: React.FC<BinaryDecodeTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  scrambleOnMount = false,
  prefix = ''
}) => {
  const [displayText, setDisplayText] = useState(scrambleOnMount ? '' : text);
  const intervalRef = useRef<number | null>(null);

  const characters = '01';

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleOnMount]);

  return (
    <Component
      className={`font-mono transition-colors cursor-default ${className}`}
      onMouseEnter={() => {
        scramble();
      }}
      title="Hover to decode bits"
    >
      {prefix && <span className="opacity-50 select-none mr-1.5">{prefix}</span>}
      <span>{displayText}</span>
    </Component>
  );
};
