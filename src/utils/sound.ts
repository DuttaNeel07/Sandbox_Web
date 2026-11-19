// Web Audio API tiny synthetic audio effects - zero external audio assets
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

// Subtle mechanical bit-toggle blip
export const playBitSound = (type: 'toggle' | 'click' | 'flag' | 'keypress' = 'toggle') => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    if (type === 'toggle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'keypress') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 80, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'flag') {
      // Little 3-tone arpeggio
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const toneOsc = ctx.createOscillator();
        const toneGain = ctx.createGain();
        const start = now + i * 0.08;
        toneOsc.type = 'sine';
        toneOsc.frequency.setValueAtTime(freq, start);
        toneGain.gain.setValueAtTime(0.06, start);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
        toneOsc.connect(toneGain);
        toneGain.connect(ctx.destination);
        toneOsc.start(start);
        toneOsc.stop(start + 0.2);
      });
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch {
    // Audio context not allowed without prior user interaction
  }
};
