import React, { useState } from 'react';
import { toggleSound, isSoundEnabled, playBitSound } from '../utils/sound';

interface NavbarProps {
  onOpenInterestModal: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInterestModal,
  onOpenTerminal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'v2.0 Archive', href: '#highlights' },
    { label: 'Organizers', href: '#sponsors' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playBitSound('flag');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-void-950/80 backdrop-blur-xl border-b border-bit-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with mini bit logo */}
        <a
          href="#"
          onClick={() => playBitSound('click')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg grid grid-cols-3 gap-0.5 p-1 bg-void-900 border border-bit-cyan/60 group-hover:border-bit-cyan transition-colors shadow-sm">
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
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-mono font-bold tracking-tight text-bit-text group-hover:text-bit-bright transition-colors text-sm sm:text-base">
              <span>SANDBOX</span>
              <span className="text-bit-cyan font-extrabold">2027</span>
            </div>
            <span className="text-[9px] font-mono text-bit-dim">AEGIS CLUB // DSCE</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => playBitSound('keypress')}
              className="text-xs font-mono text-bit-muted hover:text-bit-bright transition-colors px-2 py-1 rounded-md hover:bg-bit-panel/40"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side interactive tools */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg border border-bit-border/70 hover:border-bit-cyan text-bit-muted hover:text-bit-bright text-xs transition-colors"
            title={soundOn ? 'Mute synthetic audio' : 'Unmute synthetic audio'}
            aria-label="Toggle synthetic sound"
          >
            {soundOn ? '🔊' : '🔇'}
          </button>

          {/* Interactive Terminal Launcher Button */}
          <button
            onClick={() => {
              playBitSound('click');
              onOpenTerminal();
            }}
            className="px-3 py-1.5 rounded-lg border border-bit-border/80 hover:border-bit-cyan/80 bg-void-900/90 text-bit-bright hover:text-bit-cyan font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm"
            title="Open Interactive Terminal (Shortcut: `)"
          >
            <span className="text-bit-cyan font-bold">&gt;_</span>
            <span>TERMINAL</span>
          </button>

          {/* Notify Me CTA */}
          <button
            onClick={() => {
              playBitSound('click');
              onOpenInterestModal();
            }}
            className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold text-void-950 bg-bit-cyan hover:bg-bit-ice transition-all shadow-[0_0_15px_rgba(56,189,248,0.35)] flex items-center gap-1.5"
          >
            <span>NOTIFY ME</span>
            <span className="text-[10px] opacity-75">→</span>
          </button>
        </div>

        {/* Mobile menu and terminal buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-1.5 rounded-lg border border-bit-border text-bit-bright text-xs font-mono"
            title="Open terminal"
          >
            &gt;_
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-bit-muted hover:text-bit-bright border border-bit-border rounded-lg bg-void-900"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span className={`h-0.5 bg-bit-cyan rounded transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`h-0.5 bg-bit-cyan rounded ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-bit-cyan rounded transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-bit-border bg-void-950/95 px-4 pt-3 pb-6 flex flex-col gap-2 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                playBitSound('click');
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-bit-muted hover:text-bit-text hover:bg-bit-panel/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              playBitSound('click');
              setMobileMenuOpen(false);
              onOpenInterestModal();
            }}
            className="mt-3 w-full py-2.5 rounded-xl bg-bit-cyan text-void-950 font-bold text-center flex items-center justify-center gap-2 shadow-bit-glow"
          >
            <span>REGISTER INTEREST</span>
            <span className="text-xs">[2027]</span>
          </button>
        </div>
      )}
    </nav>
  );
};
