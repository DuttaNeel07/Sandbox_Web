import React, { useState } from 'react';
import { Track } from '../types';
import { playBitSound } from '../utils/sound';

export const Tracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  const tracks: Track[] = [
    {
      id: 'threat-detection',
      bitIndex: '01',
      title: 'Threat Detection & Incident Response',
      subtitle: 'Realtime Telemetry & Autonomous Mitigation',
      description: 'Master the art of identifying adversary tactics in flight. Build solutions that parse distributed telemetry, triage alerts, and mitigate active intrusions in sub-second latency.',
      tags: ['SIEM / SOAR', 'Evasive Malware', 'Anomaly Scoring', 'Live Telemetry'],
      binaryCode: '01010100 01000100',
    },
    {
      id: 'ai-security',
      bitIndex: '02',
      title: 'AI Security Copilot & Red Teaming',
      subtitle: 'Adversarial Machine Learning & Agent Defense',
      description: 'Create self-adaptive security engines and defensive layers for generative AI. Prevent prompt injections, jailbreaks, data poisoning, and unauthorized tool invocation in LLM agent pipelines.',
      tags: ['LLM Firewalls', 'Model Red Teaming', 'Agent Sandboxing', 'Prompt Inversion'],
      binaryCode: '01000001 01001001',
    },
    {
      id: 'app-sec',
      bitIndex: '03',
      title: 'Application Security & Zero Trust',
      subtitle: 'Fortifying Web, API & Cloud Infrastructures',
      description: 'Harden application layers against modern exploit vectors. Construct zero-trust authorization systems, secure API gateways, and automated vulnerability remediators for cloud environments.',
      tags: ['API Hardening', 'Zero Trust', 'Supply Chain', 'Memory Safety'],
      binaryCode: '01000001 01010000',
    },
    {
      id: 'web3-sec',
      bitIndex: '04',
      title: 'Web3 Security (WEB3SEC)',
      subtitle: 'Smart Contract Auditing & Protocol Verification',
      description: 'Audit and protect the decentralized ecosystem. Engineer automated invariant testers, formal verification suites, and front-running/MEV-resistant decentralized architecture.',
      tags: ['Smart Contracts', 'Formal Verification', 'Bridge Exploits', 'EVM Security'],
      binaryCode: '01010111 00110011',
    },
    {
      id: 'data-privacy',
      bitIndex: '05',
      title: 'Data Privacy & Cryptographic Engineering',
      subtitle: 'ZKP, Privacy-Preserving Computation & Post-Quantum',
      description: 'Defend user sovereignty with cryptographic primitives. Deploy zero-knowledge proofs (ZKPs), homomorphic encryption, differential privacy, and quantum-resistant algorithms.',
      tags: ['Zero Knowledge', 'PQC Algorithms', 'Differential Privacy', 'FHE'],
      binaryCode: '01011010 01001011',
    },
    {
      id: 'dark-web',
      bitIndex: '06',
      title: 'Dark Web & Threat Intelligence',
      subtitle: 'OSINT Harvesting & Breach Attribution',
      description: 'Venture into underground forums and paste sites. Develop automated scrapers, breach intelligence pipelines, and threat-actor profiling engines for early-warning threat response.',
      tags: ['Tor Scrapers', 'Breach Monitoring', 'Actor Attribution', 'OSINT'],
      binaryCode: '01000100 01010111',
    },
    {
      id: 'gamification',
      bitIndex: '07',
      title: 'Gamification in Cybersecurity',
      subtitle: 'Cyber Ranges & Interactive Defense Labs',
      description: 'Build compelling simulations and educational cyber ranges. Design serious games, capture-the-flag (CTF) environments, and visual sandbox simulators that train defenders.',
      tags: ['Cyber Range', 'CTF Frameworks', 'Defense Simulator', 'Interactive Pedagogy'],
      binaryCode: '01000111 01000001',
    },
    {
      id: 'open-innovation',
      bitIndex: '08',
      title: 'Open Infosec Innovation',
      subtitle: 'Wildcard Attacks, Firmware & Hardware Security',
      description: 'Think outside the standard perimeter. Bring novel security research: IoT/firmware exploitation, SDR/RF signals, side-channel analysis, or uncategorized cybersecurity breakthroughs.',
      tags: ['Hardware Hacking', 'Firmware Reverse', 'RF Signals', 'Novel Defense'],
      binaryCode: '01001111 01010000',
    },
  ];

  return (
    <section id="tracks" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[02]</span>
            <span>//</span>
            <span>DOMAINS & FORMAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            Security Tracks
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>CLICK ANY CARD TO INSPECT TRACK PARAMETERS</span>
        </div>
      </div>

      {/* Prize / Format Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bit-card-frame p-6">
          <span className="text-[10px] font-mono text-bit-dim uppercase block mb-1">TOTAL PRIZES</span>
          <div className="text-2xl font-mono font-bold text-bit-cyan mb-1">
            ₹[TBA / IN REVISION]
          </div>
          <p className="text-xs text-bit-muted font-sans leading-relaxed">
            v2.0 featured ₹50,000+ pool. 2027 edition will feature an expanded general pool + sponsor track bounties.
          </p>
        </div>

        <div className="bit-card-frame p-6">
          <span className="text-[10px] font-mono text-bit-dim uppercase block mb-1">SPRINT MECHANICS</span>
          <div className="text-2xl font-mono font-bold text-bit-text mb-1">
            24:00 SPRINT
          </div>
          <p className="text-xs text-bit-muted font-sans leading-relaxed">
            Continuous overnight offline build with checkpoint code reviews, live vulnerability demos, and mentor office hours.
          </p>
        </div>

        <div className="bit-card-frame p-6">
          <span className="text-[10px] font-mono text-bit-dim uppercase block mb-1">TEAM STRUCTURE</span>
          <div className="text-2xl font-mono font-bold text-bit-bright mb-1">
            1–4 MEMBERS
          </div>
          <p className="text-xs text-bit-muted font-sans leading-relaxed">
            Open to all college undergraduate & postgraduate students nationwide with passion for security engineering.
          </p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((track, idx) => {
          const isSelected = selectedTrack === idx;

          return (
            <div
              key={track.id}
              onClick={() => {
                setSelectedTrack(idx);
                playBitSound('toggle');
              }}
              className={`
                bit-card-frame p-5 cursor-pointer text-left transition-all duration-200 flex flex-col justify-between
                ${isSelected ? 'border-bit-cyan bg-bit-panelHighlight/70 shadow-bit-glow' : 'hover:border-bit-borderActive'}
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className={`font-bold ${isSelected ? 'text-bit-cyan' : 'text-bit-dim'}`}>
                    TRACK {track.bitIndex}
                  </span>
                  <span className="text-[10px] text-bit-dim">
                    {track.binaryCode.slice(0, 8)}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-base text-bit-text mb-1 line-clamp-2">
                  {track.title}
                </h3>

                <p className="text-xs text-bit-cyan/80 font-mono mb-2">
                  {track.subtitle}
                </p>

                <p className="text-xs text-bit-muted font-sans line-clamp-3 leading-relaxed mb-4">
                  {track.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-bit-border/40">
                  {track.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-950/80 border border-bit-border/60 text-bit-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {track.tags.length > 2 && (
                    <span className="text-[10px] font-mono px-1 py-0.5 text-bit-dim">
                      +{track.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Track Deep-Dive Inspector */}
      <div className="mt-8 bit-card-frame p-6 sm:p-8 bg-void-950/90 border-bit-cyan/50">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
              <span>TRACK {tracks[selectedTrack].bitIndex} DEEP DIVE</span>
              <span>•</span>
              <span>SIGNATURE: {tracks[selectedTrack].binaryCode}</span>
            </div>
            <h4 className="text-2xl font-mono font-bold text-bit-bright mb-2">
              {tracks[selectedTrack].title}
            </h4>
            <p className="text-sm sm:text-base text-bit-text font-sans leading-relaxed mb-4">
              {tracks[selectedTrack].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tracks[selectedTrack].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-bit-panel border border-bit-cyan/40 text-bit-cyan font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs border-l border-bit-border/60 pl-6 min-w-[200px]">
            <span className="text-bit-dim uppercase font-bold">JUDGING BENCHMARKS</span>
            <span className="text-bit-muted">01. Threat Depth & Realism</span>
            <span className="text-bit-muted">02. Architecture Robustness</span>
            <span className="text-bit-muted">03. Live Working Exploit / Fix</span>
            <span className="text-bit-muted">04. Code Hardening Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
