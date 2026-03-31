let audioCtx: AudioContext | null = null;
let muted = false;
let bgmGain: GainNode | null = null;
let bgmPlaying = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  if (muted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playNotes(notes: { freq: number; time: number; dur: number; type?: OscillatorType; vol?: number }[]) {
  if (muted) return;
  const ctx = getCtx();
  for (const note of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = note.type || 'sine';
    osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
    gain.gain.setValueAtTime(note.vol ?? 0.25, ctx.currentTime + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + note.time);
    osc.stop(ctx.currentTime + note.time + note.dur);
  }
}

// Background music: a cheerful looping melody
function startBgm() {
  if (bgmPlaying) return;
  const ctx = getCtx();
  bgmGain = ctx.createGain();
  bgmGain.gain.setValueAtTime(muted ? 0 : 0.06, ctx.currentTime);
  bgmGain.connect(ctx.destination);

  // A cheerful C major melody that loops
  const melody = [
    523, 587, 659, 698, 784, 698, 659, 587,  // C D E F G F E D
    523, 659, 784, 1047, 784, 659, 523, 587,  // C E G C' G E C D
    698, 784, 880, 784, 698, 659, 587, 523,   // F G A G F E D C
    587, 659, 784, 659, 587, 523, 440, 523,   // D E G E D C A C
  ];

  const noteDuration = 0.3;
  const totalDuration = melody.length * noteDuration;

  function scheduleLoop() {
    if (!bgmGain || !bgmPlaying) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    for (let i = 0; i < melody.length; i++) {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody[i], now + i * noteDuration);
      noteGain.gain.setValueAtTime(0.12, now + i * noteDuration);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * noteDuration + noteDuration * 0.9);
      osc.connect(noteGain);
      noteGain.connect(bgmGain!);
      osc.start(now + i * noteDuration);
      osc.stop(now + i * noteDuration + noteDuration);
    }

    // Schedule next loop
    setTimeout(scheduleLoop, totalDuration * 1000 - 100);
  }

  bgmPlaying = true;
  scheduleLoop();
}

function stopBgm() {
  bgmPlaying = false;
  if (bgmGain) {
    bgmGain.gain.setValueAtTime(0, getCtx().currentTime);
    bgmGain = null;
  }
}

export const sounds = {
  click() {
    playTone(800, 0.08, 'square', 0.1);
  },

  correct() {
    playNotes([
      { freq: 523, time: 0, dur: 0.12, type: 'triangle', vol: 0.3 },
      { freq: 659, time: 0.1, dur: 0.12, type: 'triangle', vol: 0.3 },
      { freq: 784, time: 0.2, dur: 0.2, type: 'triangle', vol: 0.35 },
    ]);
  },

  wrong() {
    playNotes([
      { freq: 300, time: 0, dur: 0.2, type: 'sawtooth', vol: 0.12 },
      { freq: 250, time: 0.15, dur: 0.3, type: 'sawtooth', vol: 0.1 },
    ]);
  },

  countdownBeep() {
    playTone(440, 0.15, 'sine', 0.25);
  },

  countdownGo() {
    playNotes([
      { freq: 523, time: 0, dur: 0.1, type: 'square', vol: 0.2 },
      { freq: 659, time: 0.08, dur: 0.1, type: 'square', vol: 0.25 },
      { freq: 784, time: 0.16, dur: 0.1, type: 'square', vol: 0.3 },
      { freq: 1047, time: 0.24, dur: 0.3, type: 'square', vol: 0.35 },
    ]);
  },

  streak() {
    playNotes([
      { freq: 587, time: 0, dur: 0.08, type: 'triangle', vol: 0.3 },
      { freq: 784, time: 0.07, dur: 0.08, type: 'triangle', vol: 0.3 },
      { freq: 988, time: 0.14, dur: 0.08, type: 'triangle', vol: 0.35 },
      { freq: 1175, time: 0.21, dur: 0.2, type: 'triangle', vol: 0.4 },
    ]);
  },

  celebration() {
    playNotes([
      { freq: 523, time: 0, dur: 0.15, type: 'triangle', vol: 0.25 },
      { freq: 659, time: 0.12, dur: 0.15, type: 'triangle', vol: 0.25 },
      { freq: 784, time: 0.24, dur: 0.15, type: 'triangle', vol: 0.3 },
      { freq: 1047, time: 0.36, dur: 0.15, type: 'triangle', vol: 0.3 },
      { freq: 784, time: 0.48, dur: 0.15, type: 'triangle', vol: 0.25 },
      { freq: 1047, time: 0.6, dur: 0.4, type: 'triangle', vol: 0.35 },
    ]);
  },

  starDing(index: number) {
    const freqs = [784, 988, 1175];
    playTone(freqs[index] || 784, 0.4, 'triangle', 0.3);
  },

  numpad(digit: string) {
    const base = 400;
    const num = parseInt(digit, 10);
    playTone(base + num * 40, 0.06, 'square', 0.08);
  },

  startMusic() {
    startBgm();
  },

  stopMusic() {
    stopBgm();
  },

  isMuted() {
    return muted;
  },

  toggleMute() {
    muted = !muted;
    if (bgmGain) {
      bgmGain.gain.setValueAtTime(muted ? 0 : 0.06, getCtx().currentTime);
    }
    return muted;
  },
};
