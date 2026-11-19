import React from 'react';
import { BitWordmark } from './BitWordmark';
import { BinaryDecodeText } from './BinaryDecodeText';
import { playBitSound } from '../utils/sound';

interface HeroProps {
  onOpenInterestModal: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInterestModal, onOpenTerminal }) => {
  return (
    <header className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center z-10">
      {/* Top Status Capsule */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 bg-void-950/80 border border-bit-border/80 rounded-full text-xs font-mono shadow-sm">
        <span className="w-2 h-2 rounded-full bg-bit-cyan animate-pulse"></span>
        <span className="text-bit-muted">EDITION 2027</span>
        <span className="text-bit-border">•</span>
        <span className="text-bit-bright font-bold">NEXT COHORT IN ~3–4 MONTHS</span>
      </div>

      {/* Main Bit Wordmark */}
      <div className="w-full mb-8">
        <BitWordmark />
      </div>

      {/* Subheading with interactive Binary Scramble on Hover */}
      <div className="max-w-2xl mb-8 space-y-3">
        <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tight text-bit-text">
          <BinaryDecodeText
            text="Everything is made of bits."
            prefix="0x00 >"
            className="text-bit-bright"
            scrambleOnMount
          />
        </div>
        <p className="text-base sm:text-lg text-bit-muted font-normal leading-relaxed">
          The national 24-hour cybersecurity hackathon returns to Bengaluru. Exploit primitives, defend attack surfaces, and engineer bulletproof architectures offline at DSCE.
        </p>
      </div>

      {/* Event Details Grid - Smooth Rounded Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-left font-mono">
        <div className="p-4 bg-void-950/70 border border-bit-border/80 rounded-xl hover:border-bit-cyan/60 transition-all shadow-sm">
          <span className="text-[10px] text-bit-dim block mb-1 uppercase tracking-wider">CAMPUS LOCATION</span>
          <span className="text-sm text-bit-bright font-semibold block">DSCE, Bengaluru</span>
          <span className="text-xs text-bit-dim">12.9082° N, 77.5666° E</span>
        </div>

        <div className="p-4 bg-void-950/70 border border-bit-border/80 rounded-xl hover:border-bit-cyan/60 transition-all shadow-sm">
          <span className="text-[10px] text-bit-dim block mb-1 uppercase tracking-wider">SPRINT FORMAT</span>
          <span className="text-sm text-bit-bright font-semibold block">24 Hours Offline</span>
          <span className="text-xs text-bit-dim">1–4 Person Squads</span>
        </div>

        <div className="p-4 bg-void-950/70 border border-bit-border/80 rounded-xl hover:border-bit-cyan/60 transition-all shadow-sm">
          <span className="text-[10px] text-bit-dim block mb-1 uppercase tracking-wider">PROJECTED WINDOW</span>
          <span className="text-sm text-bit-cyan font-semibold block">Spring 2027 [TBA]</span>
          <span className="text-xs text-bit-dim">Notifications Now Open</span>
        </div>
      </div>

      {/* Primary Actions with Rounded Ergonomics */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button
          onClick={() => {
            playBitSound('click');
            onOpenInterestModal();
          }}
          className="w-full sm:w-auto px-7 py-3.5 bg-bit-cyan hover:bg-bit-ice text-void-950 font-mono font-bold text-sm rounded-xl transition-all shadow-bit-glow-lg flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>NOTIFY ME WHEN PORTAL OPENS</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <button
          onClick={() => {
            playBitSound('click');
            onOpenTerminal();
          }}
          className="w-full sm:w-auto px-5 py-3.5 bg-void-950/90 hover:bg-bit-panel border border-bit-border/80 hover:border-bit-cyan/80 text-bit-bright font-mono text-sm rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span className="text-bit-cyan">&gt;_</span>
          <span>LAUNCH SHELL [`]</span>
        </button>

        <a
          href="https://discord.gg/Y7W57ccR"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playBitSound('click')}
          className="w-full sm:w-auto px-5 py-3.5 border border-bit-border/60 hover:border-bit-cyan text-bit-muted hover:text-bit-bright font-mono text-sm rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span>DISCORD</span>
          <span className="text-[10px] text-bit-cyan">↗</span>
        </a>
      </div>

      {/* Realistic Aegis Banner with human touch */}
      <div className="mt-12 w-full max-w-4xl py-2.5 px-5 bg-void-950/60 border border-bit-border/60 rounded-xl text-xs font-mono text-bit-dim flex flex-wrap items-center justify-between gap-3 select-none">
        <span className="text-bit-cyan/80 font-semibold">ORGANIZED BY AEGIS CLUB</span>
        <span className="hidden sm:inline">DEPT. OF CSE (CYBER SECURITY) • DSCE BENGALURU</span>
        <span className="text-bit-muted">FREE FOOD • ZERO REGISTRATION FEE • OVERNIGHT HACK</span>
      </div>
    </header>
  );
};
