// Gentle, romantic music box synthesizer using Web Audio API
// Self-contained, zero-latency, zero external network dependency

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private noteIndex = 0;

  // A soft, romantic music box melody progression (notes in Hz)
  // C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88
  // C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77, C6 = 1046.50
  private melody: { note: number; duration: number; delay: number }[] = [
    // Phrase 1: C - G - Am - Em (gentle music box arpeggio)
    { note: 523.25, duration: 1.2, delay: 0.0 }, // C5
    { note: 659.25, duration: 1.2, delay: 0.35 }, // E5
    { note: 783.99, duration: 1.2, delay: 0.7 }, // G5
    { note: 1046.5, duration: 2.0, delay: 1.05 }, // C6
    
    { note: 392.00, duration: 1.2, delay: 1.75 }, // G4
    { note: 587.33, duration: 1.2, delay: 2.1 }, // D5
    { note: 783.99, duration: 1.2, delay: 2.45 }, // G5
    { note: 987.77, duration: 2.0, delay: 2.8 }, // B5

    { note: 440.00, duration: 1.2, delay: 3.5 }, // A4
    { note: 523.25, duration: 1.2, delay: 3.85 }, // C5
    { note: 659.25, duration: 1.2, delay: 4.2 }, // E5
    { note: 880.00, duration: 2.0, delay: 4.55 }, // A5

    { note: 329.63, duration: 1.2, delay: 5.25 }, // E4
    { note: 493.88, duration: 1.2, delay: 5.6 }, // B4
    { note: 659.25, duration: 1.2, delay: 5.95 }, // E5
    { note: 783.99, duration: 2.0, delay: 6.3 }, // G5

    // Phrase 2: F - C - F - G (warm romance)
    { note: 349.23, duration: 1.2, delay: 7.0 }, // F4
    { note: 523.25, duration: 1.2, delay: 7.35 }, // C5
    { note: 698.46, duration: 1.2, delay: 7.7 }, // F5
    { note: 880.00, duration: 2.0, delay: 8.05 }, // A5

    { note: 523.25, duration: 1.2, delay: 8.75 }, // C5
    { note: 659.25, duration: 1.2, delay: 9.1 }, // E5
    { note: 783.99, duration: 1.2, delay: 9.45 }, // G5
    { note: 1046.5, duration: 2.2, delay: 9.8 }, // C6

    { note: 587.33, duration: 1.2, delay: 10.5 }, // D5
    { note: 698.46, duration: 1.2, delay: 10.85 }, // F5
    { note: 880.00, duration: 1.2, delay: 11.2 }, // A5
    { note: 987.77, duration: 2.2, delay: 11.55 }, // B5

    { note: 783.99, duration: 1.5, delay: 12.25 }, // G5
    { note: 659.25, duration: 1.5, delay: 12.8 }, // E5
    { note: 523.25, duration: 3.0, delay: 13.4 }, // C5
  ];

  private totalLoopDuration = 15.0; // seconds

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a warm, bell-like music box chime
  private playChime(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Primary bell oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Secondary harmonic oscillator for chime sparkle
    const harmonicOsc = this.ctx.createOscillator();
    const harmonicGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    harmonicOsc.type = 'triangle';
    harmonicOsc.frequency.setValueAtTime(freq * 2.01, startTime); // Slight detune for shimmer

    // Quick attack, gentle bell decay
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    harmonicGain.gain.setValueAtTime(0, startTime);
    harmonicGain.gain.linearRampToValueAtTime(0.12, startTime + 0.012);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0005, startTime + duration * 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);

    harmonicOsc.start(startTime);
    harmonicOsc.stop(startTime + duration + 0.1);
  }

  private scheduleLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const baseTime = this.ctx.currentTime + 0.05;

    this.melody.forEach((item) => {
      this.playChime(item.note, baseTime + item.delay, item.duration);
    });

    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleLoop();
      }
    }, this.totalLoopDuration * 1000);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleLoop();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicBox = new MusicBoxPlayer();
