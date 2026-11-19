import React from 'react';
import { TimelineEvent } from '../types';

export const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      phase: 'PHASE 00',
      timeframe: 'NOW RUNNING',
      title: 'Edition 2027 Announcement & Interest Capture',
      description: 'Pre-registration opens for students and mentors. Secure early access notifications and community Discord briefings.',
      status: 'active',
      registerTag: 'CURRENTLY OPEN',
    },
    {
      phase: 'PHASE 01',
      timeframe: 'T-60 DAYS [TBA]',
      title: 'Devfolio Application Window & Problem Teasers',
      description: 'Official application portal opens on Devfolio. Release of detailed challenge briefs and sponsor bounty tracks.',
      status: 'upcoming',
      registerTag: 'UPCOMING',
    },
    {
      phase: 'PHASE 02',
      timeframe: 'T-20 DAYS [TBA]',
      title: 'Application Cutoff & Team Shortlisting',
      description: 'Aegis technical committee reviews squad submissions, GitHub portfolios, and security research statements.',
      status: 'upcoming',
      registerTag: 'EVALUATION',
    },
    {
      phase: 'PHASE 03',
      timeframe: 'T-07 DAYS [TBA]',
      title: 'RSVP Confirmation & Logistics Briefing',
      description: 'Selected 100+ squads RSVP. Pre-event Discord channel unlocks, travel advisories, and campus entry passes issued.',
      status: 'upcoming',
      registerTag: 'CLEARANCE',
    },
    {
      phase: 'PHASE 04',
      timeframe: 'SPRING 2027 [TBA]',
      title: 'SandBox 2027: 24-Hour Offline Hackathon',
      description: 'Opening keynote, 24 hours of non-stop hacking, midnight security challenges, mentor checkpoints, and final defense judging at DSCE Bengaluru.',
      status: 'upcoming',
      registerTag: 'ZERO HOUR',
    },
  ];

  return (
    <section id="timeline" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[03]</span>
            <span>//</span>
            <span>ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            Key Dates & Timeline
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>DATES SUBJECT TO OFFICIAL DEVFOLIO LOCK-IN</span>
        </div>
      </div>

      {/* Rounded Timeline with Organic Connectors */}
      <div className="relative border-l-2 border-bit-border/60 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {events.map((evt) => {
          const isActive = evt.status === 'active';

          return (
            <div key={evt.phase} className="relative group">
              {/* Rounded Node Marker */}
              <div
                className={`
                  absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-200
                  ${
                    isActive
                      ? 'bg-bit-cyan border-white shadow-[0_0_12px_#38BDF8] scale-110'
                      : 'bg-void-950 border-bit-border group-hover:border-bit-cyan'
                  }
                `}
              />

              {/* Event Card */}
              <div
                className={`
                  bit-card-frame p-6
                  ${isActive ? 'border-bit-cyan/80 bg-bit-panelHighlight/60' : 'hover:border-bit-borderActive'}
                `}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-bit-cyan">{evt.phase}</span>
                    <span className="text-bit-dim">•</span>
                    <span className="text-bit-bright font-semibold">{evt.timeframe}</span>
                  </div>
                  <span
                    className={`
                      px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                      ${
                        isActive
                          ? 'bg-bit-cyan/20 border border-bit-cyan text-bit-cyan'
                          : 'bg-void-950/80 border border-bit-border text-bit-dim'
                      }
                    `}
                  >
                    {evt.registerTag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-mono font-bold text-bit-text mb-2">
                  {evt.title}
                </h3>

                <p className="text-sm text-bit-muted font-sans leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
