import React, { useState, useEffect } from 'react';
import { BitBackground } from './components/BitBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { About } from './components/About';
import { BitPlayground } from './components/BitPlayground';
import { Tracks } from './components/Tracks';
import { PacketInspector } from './components/PacketInspector';
import { Timeline } from './components/Timeline';
import { Highlights } from './components/Highlights';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { InterestModal } from './components/InterestModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { useKonamiCode } from './hooks/useKonamiCode';
import { playBitSound } from './utils/sound';

export const App: React.FC = () => {
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { isKonamiActive, toggleKonami } = useKonamiCode();

  // Listen for ` or ~ backtick key to open terminal
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeTag = (document.activeElement as HTMLElement)?.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          playBitSound('click');
          setTerminalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-void-900 text-bit-text selection:bg-bit-cyan selection:text-void-950 bit-scanline ${
        isKonamiActive ? 'konami-active' : ''
      }`}
    >
      {/* Konami Achievement Banner */}
      {isKonamiActive && (
        <div className="sticky top-0 z-50 bg-emerald-500 text-void-950 py-1.5 px-4 font-mono text-xs font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span>👾 KONAMI CODE UNLOCKED: CRT PHOSPHOR MODE ACTIVE</span>
            <span>•</span>
            <span>FLAG&#123;k0n4m1_c0d3_cr4ck3d_2027&#125; (+200 PTS)</span>
          </div>
          <button
            onClick={toggleKonami}
            className="px-2 py-0.5 bg-void-950 text-emerald-400 rounded text-[10px] font-bold"
          >
            DISABLE
          </button>
        </div>
      )}

      {/* Procedural Bit Canvas Gradient */}
      <BitBackground />

      {/* Main Content Hierarchy */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenInterestModal={() => setInterestModalOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <main className="flex-grow">
          <Hero
            onOpenInterestModal={() => setInterestModalOpen(true)}
            onOpenTerminal={() => setTerminalOpen(true)}
          />

          <Countdown />

          <About />

          {/* Easter Egg 1: Interactive Bitboard & Life Simulator */}
          <div className="px-4 sm:px-6 lg:px-8">
            <BitPlayground />
          </div>

          <Tracks />

          {/* Easter Egg 2: Wireshark-Style Packet Dissector */}
          <div className="px-4 sm:px-6 lg:px-8">
            <PacketInspector />
          </div>

          <Timeline />

          <Highlights />

          <Sponsors />

          <FAQ />
        </main>

        <Footer onOpenTerminal={() => setTerminalOpen(true)} />
      </div>

      {/* Interest Pre-Registration Modal */}
      <InterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
      />

      {/* Interactive UNIX Shell Terminal */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onTriggerKonami={toggleKonami}
      />
    </div>
  );
};

export default App;
