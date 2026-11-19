import React, { useState, useEffect, useRef } from 'react';
import { playBitSound } from '../utils/sound';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerKonami?: () => void;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  onTriggerKonami,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputLines, setOutputLines] = useState<Array<{ type: 'in' | 'out' | 'flag' | 'err'; text: string }>>([
    { type: 'out', text: 'SANDBOX 2027 KERNEL TELEMETRY v2.7.0-RELEASE (x86_64-dsce)' },
    { type: 'out', text: 'Type "help" for available commands or try exploring hidden files.' },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputLines]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newOutputs = [...outputLines, { type: 'in' as const, text: `$ ${raw}` }];

    switch (command) {
      case 'help':
        newOutputs.push({
          type: 'out',
          text: `AVAILABLE COMMANDS:
  help              Display this command index
  tracks            List the 8 official hackathon arenas
  ping dsce         Measure latency to DSCE campus
  cat flag.txt      Inspect local directory secret
  ascii <text>      Encode string into 8-bit binary stream
  decode <binary>   Decode 8-bit binary into ASCII string
  konami            Toggle phosphor CRT mode
  aegis             Aegis Club briefing & telemetry
  stats             Display v2.0 benchmark metrics
  clear             Purge terminal buffer
  exit              Close console session`,
        });
        playBitSound('click');
        break;

      case 'cat':
        if (args === 'flag.txt' || args === 'flag') {
          newOutputs.push({
            type: 'flag',
            text: 'FLAG{b1ts_run_th3_pl4n3t_d5c3_2027} (+150 PTS) — You cracked the terminal node!',
          });
          playBitSound('flag');
        } else if (args === 'passwords.txt') {
          newOutputs.push({
            type: 'err',
            text: 'Nice try. All hashes salted with SHA-512 and stored in offline vault.',
          });
        } else {
          newOutputs.push({
            type: 'err',
            text: `cat: ${args || 'file'}: No such file or directory. Try "cat flag.txt"`,
          });
        }
        break;

      case 'flag':
        newOutputs.push({
          type: 'flag',
          text: 'FLAG{b1ts_run_th3_pl4n3t_d5c3_2027} (+150 PTS)',
        });
        playBitSound('flag');
        break;

      case 'ping':
        newOutputs.push({
          type: 'out',
          text: `PING dsce.aegisclub.site (12.9082° N, 77.5666° E): 56 data bytes
64 bytes from bangalore.node [12.9082, 77.5666]: icmp_seq=0 ttl=64 time=1.42 ms
64 bytes from bangalore.node [12.9082, 77.5666]: icmp_seq=1 ttl=64 time=1.38 ms
--- dsce.aegisclub.site ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, rtt min/avg/max = 1.38/1.40/1.42 ms`,
        });
        playBitSound('click');
        break;

      case 'sudo':
        newOutputs.push({
          type: 'err',
          text: '[ACCESS_VIOLATION] Sudo is disabled in Sandbox. Breakers earn root by finding zero-days, not asking for it.',
        });
        playBitSound('click');
        break;

      case 'konami':
      case 'matrix':
        if (onTriggerKonami) onTriggerKonami();
        newOutputs.push({
          type: 'flag',
          text: 'PHOSPHOR MATRIX CRT STATE TOGGLED!',
        });
        playBitSound('flag');
        break;

      case 'tracks':
        newOutputs.push({
          type: 'out',
          text: `0x00 > Threat Detection & Autonomous SOC
0x01 > AI Security Copilot & Red Teaming
0x02 > Application Security & Zero Trust
0x03 > Web3 Security (WEB3SEC)
0x04 > Data Privacy & Cryptography (ZKP / PQC)
0x05 > Dark Web & Threat Intelligence
0x06 > Gamification in Cybersecurity
0x07 > Open Infosec Innovation`,
        });
        playBitSound('click');
        break;

      case 'ascii':
        if (!args) {
          newOutputs.push({ type: 'err', text: 'Usage: ascii <word_or_phrase>' });
        } else {
          const binaryResult = args
            .split('')
            .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
          newOutputs.push({
            type: 'out',
            text: `TEXT:   ${args}\nBINARY: ${binaryResult}`,
          });
          playBitSound('toggle');
        }
        break;

      case 'decode':
        if (!args) {
          newOutputs.push({ type: 'err', text: 'Usage: decode <8-bit binary space separated>' });
        } else {
          try {
            const decoded = args
              .split(/\s+/)
              .map((b) => String.fromCharCode(parseInt(b, 2)))
              .join('');
            newOutputs.push({
              type: 'out',
              text: `DECODED ASCII: "${decoded}"`,
            });
            playBitSound('toggle');
          } catch {
            newOutputs.push({ type: 'err', text: 'Invalid binary sequence.' });
          }
        }
        break;

      case 'aegis':
        newOutputs.push({
          type: 'out',
          text: `HOST: Aegis Club • Dept. of CSE (Cyber Security)
CAMPUS: Dayananda Sagar College of Engineering, Bengaluru
MISSION: Hardening minds, breaking insecure architectures, running Sandbox.
DISCORD: https://discord.gg/Y7W57ccR`,
        });
        playBitSound('click');
        break;

      case 'stats':
        newOutputs.push({
          type: 'out',
          text: `v2.0 BENCHMARKS:
- 400+ Hacker Applicants
- 24 Hours of Continuous Sprint
- ₹50,000+ Prize Pool Disbursed
- 100% Offline with Zero Registration Fee`,
        });
        playBitSound('click');
        break;

      case 'clear':
        setOutputLines([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newOutputs.push({
          type: 'err',
          text: `zsh: command not found: ${command}. Type "help" for valid options.`,
        });
        playBitSound('click');
    }

    setOutputLines(newOutputs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    playBitSound('keypress');

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 flex justify-center pointer-events-none"
      role="dialog"
      aria-label="Interactive Terminal Console"
    >
      <div className="w-full max-w-3xl bg-void-950/95 border border-bit-cyan/70 rounded-2xl shadow-2xl backdrop-blur-xl pointer-events-auto overflow-hidden flex flex-col h-[380px] text-xs font-mono">
        {/* Terminal Header Bar */}
        <div className="px-4 py-2.5 bg-void-900 border-b border-bit-border/60 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-bold text-bit-bright">root@sandbox-2027: ~ (zsh)</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-bit-dim hidden sm:inline">[SHORTCUT: ` key to toggle]</span>
            <button
              onClick={onClose}
              className="text-bit-dim hover:text-bit-bright px-2 py-0.5 rounded hover:bg-bit-panel transition-colors"
            >
              [✕ CLOSE]
            </button>
          </div>
        </div>

        {/* Scrollable Output Box */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-2">
          {outputLines.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'in'
                  ? 'text-bit-cyan font-bold'
                  : line.type === 'flag'
                  ? 'text-emerald-400 font-bold bg-emerald-950/30 p-2 border border-emerald-500/40 rounded-lg'
                  : line.type === 'err'
                  ? 'text-rose-400'
                  : 'text-bit-muted'
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-void-900/80 border-t border-bit-border/60 flex items-center gap-2">
          <span className="text-bit-cyan font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Try typing "help" or "cat flag.txt"...'
            className="flex-1 bg-transparent text-bit-text outline-none font-mono text-xs placeholder:text-bit-dim/60"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="px-3 py-1 bg-bit-cyan/20 hover:bg-bit-cyan/30 text-bit-cyan border border-bit-cyan/40 rounded-lg font-bold transition-colors"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};
