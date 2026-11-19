import React, { useState } from 'react';
import { BinaryDecodeText } from './BinaryDecodeText';
import { playBitSound } from '../utils/sound';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const [flagDecoded, setFlagDecoded] = useState(false);

  const handleFlagClick = () => {
    playBitSound('flag');
    setFlagDecoded(!flagDecoded);
  };

  return (
    <footer className="relative border-t border-bit-border/60 bg-void-950/95 text-bit-muted font-mono z-10">
      {/* Top Bit Stream Bar */}
      <div className="border-b border-bit-border/40 py-2.5 px-4 text-[11px] text-bit-dim flex flex-wrap items-center justify-between gap-3 overflow-hidden select-none">
        <div className="flex items-center gap-3">
          <span className="text-bit-cyan font-semibold">01110011 01100001 01101110 01100100 01100010 01101111 01111000</span>
          <span>[ASCII: sandbox]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-bit-cyan animate-pulse"></span>
          <span>DSCE CAMPUS NODE // PORT 2027</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg grid grid-cols-3 gap-0.5 p-1 bg-void-900 border border-bit-cyan">
                <span className="bg-bit-cyan rounded-xs"></span>
                <span className="bg-bit-border rounded-xs"></span>
                <span className="bg-bit-cyan rounded-xs"></span>
                <span className="bg-bit-cyan rounded-xs"></span>
                <span className="bg-bit-cyan rounded-xs"></span>
                <span className="bg-bit-border rounded-xs"></span>
                <span className="bg-bit-border rounded-xs"></span>
                <span className="bg-bit-cyan rounded-xs"></span>
                <span className="bg-bit-cyan rounded-xs"></span>
              </div>
              <div className="font-bold text-bit-bright tracking-tight text-base">
                SANDBOX <span className="text-bit-cyan">2027</span>
              </div>
            </div>

            <p className="text-xs text-bit-dim font-sans leading-relaxed">
              Organized by Aegis Club, Dept. of Computer Science & Engineering (Cyber Security), Dayananda Sagar College of Engineering, Bengaluru.
            </p>

            <div className="text-xs text-bit-dim">
              <span>COORDINATES: </span>
              <span className="text-bit-muted">12.9082° N, 77.5666° E</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-bit-bright uppercase tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-bit-cyan transition-colors">
                  About Sandbox
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-bit-cyan transition-colors">
                  Security Tracks
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-bit-cyan transition-colors">
                  Key Dates & Timeline
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-bit-cyan transition-colors">
                  v2.0 Archive Highlights
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-bit-cyan transition-colors">
                  Frequently Asked Queries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-bit-bright uppercase tracking-wider">
              CONNECT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://discord.gg/Y7W57ccR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bit-cyan transition-colors flex items-center justify-between"
                >
                  <span>Discord Community</span>
                  <span className="text-[10px] text-bit-dim">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dsce_cscy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bit-cyan transition-colors flex items-center justify-between"
                >
                  <span>Instagram (@dsce_cscy)</span>
                  <span className="text-[10px] text-bit-dim">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/aegis-cs-cyber-dsce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bit-cyan transition-colors flex items-center justify-between"
                >
                  <span>LinkedIn Club Node</span>
                  <span className="text-[10px] text-bit-dim">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aegis-cscyber@dayanandasagar.edu"
                  className="hover:text-bit-cyan transition-colors flex items-center justify-between"
                >
                  <span>Email Organizing Team</span>
                  <span className="text-[10px] text-bit-dim">✉</span>
                </a>
              </li>
              {onOpenTerminal && (
                <li>
                  <button
                    onClick={() => {
                      playBitSound('click');
                      onOpenTerminal();
                    }}
                    className="text-bit-cyan hover:underline flex items-center gap-1.5"
                  >
                    <span>&gt;_ Launch Web Shell</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Easter Eggs & CTF */}
          <div className="space-y-3 p-5 bg-void-900 border border-bit-border/60 rounded-2xl">
            <h4 className="text-xs font-bold text-bit-bright uppercase tracking-wider flex items-center justify-between">
              <span>EASTER EGGS</span>
              <span className="text-[10px] text-bit-cyan font-bold">[CTF]</span>
            </h4>
            <p className="text-[11px] text-bit-dim font-sans leading-relaxed">
              Hover to decode the encoded telemetry string below:
            </p>
            <div>
              <BinaryDecodeText
                text="FLAG{3v3ryth1ng_1s_m4d3_0f_b1ts}"
                prefix="FLAG >"
                className="text-xs text-bit-cyan font-bold block overflow-hidden text-ellipsis"
              />
            </div>
            <button
              onClick={handleFlagClick}
              className="text-xs text-bit-muted hover:text-bit-bright underline decoration-dotted transition-colors"
            >
              {flagDecoded ? '[LOCK FLAG]' : '[INSPECT TELEMETRY]'}
            </button>
            {flagDecoded && (
              <div className="text-[11px] text-emerald-400 font-mono pt-1">
                STATUS: VERIFIED (+100 PTS)
              </div>
            )}
            <div className="pt-2 border-t border-bit-border/40 text-[10px] text-bit-dim">
              SECRET CODE: ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-bit-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bit-dim">
          <p>
            © 2026–2027 Aegis Club • Dept. of CSE (Cyber Security), Dayananda Sagar College of Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span>BUILT WITH BITS</span>
            <span>•</span>
            <span>NO TRACKERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
