import React, { useState } from 'react';
import { FAQItem } from '../types';
import { playBitSound } from '../utils/sound';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'what-is-sandbox',
      question: 'What is SandBox 2027?',
      answer: 'SandBox 2027 is the flagship 24-hour national cybersecurity hackathon organized by Aegis Club of Computer Science & Engineering (Cyber Security) at Dayananda Sagar College of Engineering (DSCE), Bengaluru. It challenges student developers and security researchers to design, exploit, and harden real-world systems.',
      category: 'general',
    },
    {
      id: 'who-can-participate',
      question: 'Who is eligible to participate?',
      answer: 'SandBox 2027 is open to all enrolled college students (undergraduate and postgraduate) passionate about cybersecurity, software engineering, systems programming, and digital defense. Proof of active student status (college ID) is required at physical check-in.',
      category: 'general',
    },
    {
      id: 'registration-fee',
      question: 'Is there any registration fee?',
      answer: 'No. There is zero registration fee to apply or participate in SandBox 2027. We believe in providing an accessible, high-caliber engineering arena for everyone regardless of financial background.',
      category: 'logistics',
    },
    {
      id: 'offline-event',
      question: 'Is the event offline or hybrid?',
      answer: 'SandBox 2027 is strictly an offline, in-person hackathon hosted on the campus of Dayananda Sagar College of Engineering (DSCE) in Bengaluru. You must be present physically with your team to build and defend.',
      category: 'logistics',
    },
    {
      id: 'team-size',
      question: 'What is the required team size?',
      answer: 'Teams can range from 1 to 4 members. Given the intense 24-hour offensive and defensive problem scopes, squads of 3 to 4 with complementary skill sets (e.g. reverse engineering, frontend/UI, backend architecture, cryptography) are strongly recommended.',
      category: 'technical',
    },
    {
      id: 'food-accommodation',
      question: 'Will food and accommodation be provided?',
      answer: 'Yes. All shortlisted participants will receive comfortable campus accommodation, high-speed Wi-Fi, power desks, and meals/refreshments throughout the 24-hour hackathon runtime.',
      category: 'logistics',
    },
    {
      id: 'selection-criteria',
      question: 'How are teams shortlisted?',
      answer: 'Teams are selected by the Aegis technical review board based on the technical depth, innovation, and feasibility of their submitted project proposal, GitHub profiles, and previous security research or hackathon achievements.',
      category: 'technical',
    },
    {
      id: 'open-innovation',
      question: 'What does "Open Innovation" mean in this hackathon?',
      answer: 'In SandBox, Open Innovation strictly refers to cybersecurity-adjacent projects that explore unconventional boundaries (such as hardware hacking, radio frequency security, firmware analysis, biometric protection, or OSINT) that do not fit into the other 7 defined tracks.',
      category: 'technical',
    },
  ];

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-12 border-b border-bit-border/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-2">
            <span>[06]</span>
            <span>//</span>
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-bit-text">
            Frequently Asked Queries
          </h2>
        </div>
        <div className="text-xs font-mono text-bit-dim">
          <span>8 VERIFIED LOGISTICS & RULES ENTRIES</span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 font-mono">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.id}
              className={`
                bit-card-frame transition-all duration-200 overflow-hidden
                ${isOpen ? 'border-bit-cyan/70 bg-bit-panelHighlight/50' : 'border-bit-border/70 hover:border-bit-borderActive'}
              `}
            >
              <button
                onClick={() => {
                  playBitSound('toggle');
                  setOpenIndex(isOpen ? null : idx);
                }}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${isOpen ? 'text-bit-cyan font-bold' : 'text-bit-dim'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-bit-text">
                    {faq.question}
                  </span>
                </div>
                <span className="text-xs text-bit-cyan font-bold flex-shrink-0 px-2 py-1 bg-void-950/60 rounded-md border border-bit-border/40">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-bit-muted font-sans border-t border-bit-border/40 leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
