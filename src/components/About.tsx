import React from 'react';
import { BinaryDecodeText } from './BinaryDecodeText';

export const About: React.FC = () => {
  const pillars = [
    {
      bitHex: '01',
      binary: '00110001',
      title: '24-Hour Offline Crucible',
      desc: 'An overnight engineering sprint at DSCE Bengaluru. Dedicated high-capacity lab infrastructure, high-speed power mesh, and uninterrupted technical focus.',
      spec: 'FORMAT: IN-PERSON',
    },
    {
      bitHex: '02',
      binary: '00110010',
      title: 'Pure Infosec Focus',
      desc: 'No generic pitch decks or basic wrappers. Every problem statement targets concrete attack surfaces: memory safety, AI copilot jailbreaks, cryptographic primitives, and smart contracts.',
      spec: 'DOMAIN: STRICT SECURITY',
    },
    {
      bitHex: '03',
      binary: '00110011',
      title: 'Real Industry Red-Teaming',
      desc: 'Direct code reviews and red-team feedback from security practitioners, offensive researchers, and alumni throughout the 24-hour runtime.',
      spec: 'FEEDBACK: LIVE TESTING',
    },
    {
      bitHex: '04',
      binary: '00110100',
      title: 'Zero Financial Barrier',
      desc: '₹0 registration fee. Full meals, caffeine, snacks, accommodation on campus, and hardware benches provided for all shortlisted finalists.',
      spec: 'FEE: ₹0 // FOOD: PROVIDED',
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[01]</span>
            <span>//</span>
            <span>THE EVENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            What is Sandbox?
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>HOSTED BY AEGIS CLUB • DEPT OF CSE (CYBER SECURITY)</span>
        </div>
      </div>

      {/* Core Summary Card with Soft Rounded Frame */}
      <div className="bit-card-frame p-6 sm:p-8 mb-10">
        <p className="text-lg sm:text-xl text-bit-bright font-sans font-medium leading-relaxed max-w-4xl mb-4">
          Sandbox is Bengaluru's premier 24-hour national cybersecurity hackathon. We provide the sand; you build the castles. Whether finding zero-days, designing autonomous defense pipelines, or auditing decentralized protocols, this is the arena to experiment, fail fast, and build bulletproof systems.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-bit-border/40 font-mono text-xs text-bit-muted">
          <span>
            <strong className="text-bit-bright">Format:</strong> 24H In-person Sprint
          </span>
          <span>•</span>
          <span>
            <strong className="text-bit-bright">Squads:</strong> 1 to 4 Members
          </span>
          <span>•</span>
          <span>
            <strong className="text-bit-bright">Audience:</strong> Undergrads, CTFers & Builders
          </span>
        </div>
      </div>

      {/* 4 Pillars in Sleek Rounded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {pillars.map((pillar) => (
          <div
            key={pillar.bitHex}
            className="bit-card-frame p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-bit-cyan font-bold">PILLAR {pillar.bitHex}</span>
                <BinaryDecodeText text={pillar.binary} className="text-bit-dim text-[11px]" />
              </div>

              <h3 className="text-lg font-mono font-bold text-bit-text mb-2">
                {pillar.title}
              </h3>

              <p className="text-sm text-bit-muted font-sans leading-relaxed mb-4">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-bit-border/40 text-[11px] font-mono text-bit-dim flex items-center justify-between">
              <span>{pillar.spec}</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Realistic Participant Quote */}
      <div className="p-6 bg-void-950/70 border border-bit-border/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-sans italic text-bit-muted">
            "At 3 AM when the coffee kicked in and our exploit finally triggered the canary bypass, the whole lab erupted. Best hackathon vibe in Bangalore."
          </p>
          <span className="text-xs font-mono text-bit-dim">
            — v2.0 Finalist Squad Lead, National CTF Finalist
          </span>
        </div>
        <div className="px-3 py-1.5 bg-bit-cyan/10 border border-bit-cyan/40 rounded-lg text-xs font-mono text-bit-cyan whitespace-nowrap">
          v2.0 RETROSPECTIVE
        </div>
      </div>
    </section>
  );
};
