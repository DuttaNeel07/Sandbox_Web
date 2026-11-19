import React from 'react';

export const Highlights: React.FC = () => {
  const stats = [
    {
      val: '400+',
      label: 'Hackers Applied',
      bitMeta: 'PARTICIPANTS',
      desc: 'Top student offensive and defensive researchers competing across institutions.',
    },
    {
      val: '24:00',
      label: 'Hours Uptime',
      bitMeta: 'NON-STOP',
      desc: 'All-night coding, vulnerability assessments, and live exploits in DSCE labs.',
    },
    {
      val: '₹50K+',
      label: 'Cash Prizes',
      bitMeta: 'DISTRIBUTED',
      desc: 'Cash rewards and bounties disbursed across all finalized tracks.',
    },
    {
      val: '100%',
      label: 'Offline Arena',
      bitMeta: 'IN-PERSON',
      desc: 'Hosted in-person at Dayananda Sagar College of Engineering, Bengaluru.',
    },
  ];

  const archiveHighlights = [
    {
      tag: '01',
      title: 'Real Threat Models',
      desc: 'Teams built functional defenses for zero-day memory leaks, autonomous agent firewalls, and smart contract audit tools rather than generic prototypes.',
    },
    {
      tag: '02',
      title: 'Live Red-Teaming',
      desc: 'Industry mentors from SecPod and Nopal Cyber conducted on-the-spot code reviews, challenging teams to withstand active bypass attempts.',
    },
    {
      tag: '03',
      title: 'Full Campus Hospitality',
      desc: 'Participants paid zero registration fees. Complete campus accommodation, catering, midnight snacks, and technical mesh were provided throughout.',
    },
  ];

  return (
    <section id="highlights" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[04]</span>
            <span>//</span>
            <span>RETROSPECTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            v2.0 Archive Highlights
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>MARCH 2026 EDITION BENCHMARKS</span>
        </div>
      </div>

      {/* 4 Large Rounded Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((item) => (
          <div key={item.label} className="bit-card-frame p-6 relative group">
            <div className="text-[10px] font-mono text-bit-cyan mb-2 flex items-center justify-between">
              <span>{item.bitMeta}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-bit-cyan"></span>
            </div>

            <div className="text-4xl sm:text-5xl font-mono font-black text-bit-bright tracking-tight mb-2 group-hover:text-white transition-colors">
              {item.val}
            </div>

            <div className="text-xs font-mono font-bold text-bit-text uppercase tracking-wider mb-2">
              {item.label}
            </div>

            <p className="text-xs text-bit-muted font-sans leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 3 Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {archiveHighlights.map((hl) => (
          <div key={hl.tag} className="bit-card-frame p-6">
            <div className="flex items-center justify-between text-xs font-mono text-bit-dim mb-3">
              <span className="text-bit-cyan font-bold">HIGHLIGHT #{hl.tag}</span>
              <span>VERIFIED</span>
            </div>
            <h3 className="text-lg font-mono font-bold text-bit-text mb-2">
              {hl.title}
            </h3>
            <p className="text-sm text-bit-muted font-sans leading-relaxed">
              {hl.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Retro Link banner */}
      <div className="mt-8 p-4 bg-void-950/70 border border-bit-border/60 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-bit-muted">
          <span className="text-bit-cyan">&gt;</span>
          <span>CURIOUS ABOUT LAST YEAR'S FINALISTS?</span>
        </div>
        <a
          href="https://sandbox.aegisclub.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bit-cyan hover:text-bit-bright hover:underline flex items-center gap-1.5 font-bold"
        >
          <span>VIEW V2.0 ARCHIVE SITE</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
};
