import React, { useState, useEffect } from 'react';
import { playBitSound } from '../utils/sound';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterestModal: React.FC<InterestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [track, setTrack] = useState('Threat Detection & SOC');
  const [role, setRole] = useState('Hacker / Builder');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playBitSound('flag');

    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
    const generatedTicket = `SBOX27-BIT-${randomHex}`;
    setTicketId(generatedTicket);

    try {
      const existing = JSON.parse(localStorage.getItem('sandbox_interest_registrations') || '[]');
      existing.push({
        name,
        email,
        college,
        track,
        role,
        ticketId: generatedTicket,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('sandbox_interest_registrations', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    playBitSound('click');
    setSubmitted(false);
    setName('');
    setEmail('');
    setCollege('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modern Rounded Modal Box */}
      <div className="relative w-full max-w-lg bit-card-frame p-6 sm:p-8 bg-void-900/95 border-bit-cyan/70 rounded-2xl shadow-2xl z-10 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-bit-border/60">
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan">
            <span className="w-2 h-2 rounded-full bg-bit-cyan"></span>
            <span id="modal-title" className="font-bold">REGISTER INTEREST // SANDBOX 2027</span>
          </div>
          <button
            onClick={onClose}
            className="text-bit-dim hover:text-bit-bright font-mono text-sm px-2 py-0.5 rounded-lg hover:bg-bit-panel transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-bit-muted font-sans leading-relaxed mb-4">
              Get direct priority alerts the second the official Devfolio portal opens and problem statements drop. No spam.
            </p>

            <div>
              <label className="block text-xs font-mono text-bit-bright mb-1 uppercase">
                Full Name <span className="text-bit-cyan">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full px-3.5 py-2.5 bg-void-950 border border-bit-border rounded-xl focus:border-bit-cyan text-bit-text font-mono text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-bit-bright mb-1 uppercase">
                Email Address <span className="text-bit-cyan">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@domain.edu"
                className="w-full px-3.5 py-2.5 bg-void-950 border border-bit-border rounded-xl focus:border-bit-cyan text-bit-text font-mono text-sm outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-bit-bright mb-1 uppercase">
                  College / Org
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="DSCE / MIT / IIT..."
                  className="w-full px-3.5 py-2.5 bg-void-950 border border-bit-border rounded-xl focus:border-bit-cyan text-bit-text font-mono text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-bit-bright mb-1 uppercase">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-void-950 border border-bit-border rounded-xl focus:border-bit-cyan text-bit-text font-mono text-sm outline-none transition-colors"
                >
                  <option value="Hacker / Builder">Hacker / Builder</option>
                  <option value="Security Researcher">Security Researcher</option>
                  <option value="Systems Engineer">Systems Engineer</option>
                  <option value="CTF Competitor">CTF Competitor</option>
                  <option value="Mentor / Sponsor">Mentor / Sponsor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-bit-bright mb-1 uppercase">
                Track of Interest
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-void-950 border border-bit-border rounded-xl focus:border-bit-cyan text-bit-text font-mono text-sm outline-none transition-colors"
              >
                <option value="Threat Detection & SOC">01. Threat Detection & Autonomous SOC</option>
                <option value="AI Security & Red Teaming">02. AI Security Copilot & Red Teaming</option>
                <option value="Application Security">03. Application Security & Zero Trust</option>
                <option value="Web3 Security">04. Web3 Security (WEB3SEC)</option>
                <option value="Cryptography & Privacy">05. Data Privacy & Cryptography</option>
                <option value="Dark Web & Intel">06. Dark Web & Threat Intelligence</option>
                <option value="Cyber Range Gamification">07. Gamification & Cyber Ranges</option>
                <option value="Open Innovation">08. Open Infosec Innovation</option>
              </select>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-bit-dim">
                Zero spam. Instant alerts.
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-bit-cyan hover:bg-bit-ice text-void-950 font-mono text-xs font-bold rounded-xl transition-all shadow-bit-glow"
              >
                SUBMIT INTEREST →
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4 font-mono">
            <div className="w-14 h-14 mx-auto bg-bit-cyan/20 border-2 border-bit-cyan rounded-full flex items-center justify-center text-bit-cyan text-2xl font-bold shadow-bit-glow">
              ✓
            </div>

            <div className="space-y-1">
              <span className="text-xs text-bit-cyan font-bold">INTEREST RECORDED</span>
              <h3 className="text-xl font-bold text-bit-text">You're in the queue!</h3>
              <p className="text-xs text-bit-muted font-sans max-w-sm mx-auto">
                Thank you, {name || 'Operator'}. Your spot for priority notification has been logged. We will email you the moment Devfolio applications open.
              </p>
            </div>

            <div className="p-4 bg-void-950 border border-bit-border rounded-xl text-left space-y-1">
              <div className="text-[10px] text-bit-dim uppercase">TELEMETRY RECEIPT</div>
              <div className="text-sm font-bold text-bit-bright">{ticketId}</div>
              <div className="text-xs text-bit-muted">{email} • {track}</div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-bit-panel hover:bg-bit-panelHighlight border border-bit-border rounded-xl text-bit-bright text-xs font-bold transition-colors"
              >
                DISMISS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
