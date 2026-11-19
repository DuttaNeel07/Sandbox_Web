import React from 'react';
import { PastSponsor } from '../types';
import { playBitSound } from '../utils/sound';

export const Sponsors: React.FC = () => {
  const pastSponsors: PastSponsor[] = [
    { name: 'DERBI Foundation', tier: 'MAIN SPONSOR', role: 'Innovation Incubator' },
    { name: 'SAGAR Hospitals', tier: 'MAIN SPONSOR', role: 'Healthcare & Tech Sponsor' },
    { name: 'Hacker School', tier: 'TITLE SPONSOR', role: 'Cybersecurity Education' },
    { name: 'Nopal Cyber', tier: 'PLATINUM SPONSOR', role: 'Security Solutions' },
    { name: 'SecPod', tier: 'GOLD SPONSOR', role: 'Vulnerability Management' },
    { name: 'Devfolio', tier: 'PLATFORM PARTNER', role: 'Hackathon Infrastructure' },
  ];

  return (
    <section id="sponsors" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[05]</span>
            <span>//</span>
            <span>COMMUNITY & SPONSORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            Organizers & Partners
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>HOSTED BY AEGIS CLUB • DSCE BENGALURU</span>
        </div>
      </div>

      {/* Organizer Spotlight: Aegis Club */}
      <div className="bit-card-frame p-6 sm:p-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
              <span className="w-2 h-2 rounded-full bg-bit-cyan"></span>
              <span>HOST ENTITY</span>
            </div>
            <h3 className="text-2xl font-mono font-bold text-bit-bright mb-3">
              Aegis Club — Dept. of CSE (Cyber Security)
            </h3>
            <p className="text-sm sm:text-base text-bit-muted font-sans leading-relaxed mb-4">
              Aegis Club is the student-led cybersecurity society of Dayananda Sagar College of Engineering (DSCE), Bengaluru. We run advanced technical workshops, CTFs, red-teaming simulations, and Sandbox—empowering the next generation of defenders and vulnerability researchers.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-bit-text">
              <span className="text-bit-dim">Campus:</span>
              <span className="px-3 py-1 bg-void-950 border border-bit-border rounded-lg text-bit-bright">
                Dayananda Sagar College of Engineering, Bengaluru
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 font-mono text-xs min-w-[240px]">
            <a
              href="https://discord.gg/Y7W57ccR"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBitSound('click')}
              className="p-3 bg-void-950/80 border border-bit-border/80 hover:border-bit-cyan rounded-xl text-bit-text hover:text-bit-bright flex items-center justify-between transition-colors shadow-sm"
            >
              <span>Discord Community</span>
              <span className="text-bit-cyan">Join ↗</span>
            </a>
            <a
              href="https://www.instagram.com/dsce_cscy/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBitSound('click')}
              className="p-3 bg-void-950/80 border border-bit-border/80 hover:border-bit-cyan rounded-xl text-bit-text hover:text-bit-bright flex items-center justify-between transition-colors shadow-sm"
            >
              <span>Instagram (@dsce_cscy)</span>
              <span className="text-bit-cyan">Follow ↗</span>
            </a>
            <a
              href="https://www.linkedin.com/company/aegis-cs-cyber-dsce/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBitSound('click')}
              className="p-3 bg-void-950/80 border border-bit-border/80 hover:border-bit-cyan rounded-xl text-bit-text hover:text-bit-bright flex items-center justify-between transition-colors shadow-sm"
            >
              <span>LinkedIn Page</span>
              <span className="text-bit-cyan">Connect ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2027 Call for Sponsors / Partners Box */}
      <div className="bit-card-frame p-6 sm:p-8 mb-10 border-bit-cyan/60 bg-bit-panelHighlight/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-bit-cyan uppercase tracking-wider block mb-1">
              PARTNER PROGRAM // 2027 EDITION
            </span>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-bit-text mb-2">
              Sponsor Sandbox 2027 & Evaluate Elite Security Talent
            </h3>
            <p className="text-sm text-bit-muted font-sans leading-relaxed">
              Connect directly with 400+ top student researchers, offensive engineers, and systems builders. Host track bounties, test enterprise APIs against sharp minds, and recruit standout contributors.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="mailto:aegis-cscyber@dayanandasagar.edu?subject=[SANDBOX%202027]%20Sponsorship%20%26%20Partnership%20Inquiry"
              onClick={() => playBitSound('click')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-bit-cyan hover:bg-bit-ice text-void-950 font-mono text-xs font-bold rounded-xl transition-all shadow-bit-glow"
            >
              <span>REQUEST PROSPECTUS</span>
              <span>✉</span>
            </a>
          </div>
        </div>
      </div>

      {/* Past v2.0 Supporters Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4 font-mono text-xs">
          <span className="text-bit-muted">PAST SUPPORTERS & COMMUNITY PARTNERS [v2.0 ARCHIVE]</span>
          <span className="text-bit-dim">2026 COHORT</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pastSponsors.map((sp) => (
            <div
              key={sp.name}
              className="p-3.5 bg-void-950/70 border border-bit-border/60 hover:border-bit-borderActive rounded-xl transition-colors text-center"
            >
              <span className="text-[9px] font-mono text-bit-dim block mb-1">
                {sp.tier}
              </span>
              <span className="text-xs font-mono font-bold text-bit-text block mb-1">
                {sp.name}
              </span>
              <span className="text-[10px] font-sans text-bit-muted/70 block">
                {sp.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
