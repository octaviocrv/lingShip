/**
 * Trilha lofi e efeitos sonoros do site, gerados no navegador (Web Audio, sem arquivos).
 *
 * Música (72 BPM, volume baixo/médio): acordes de piano elétrico abafado (Fmaj7, Em7, Dm7,
 * Cmaj7) com leve "oscilação de fita", baixo, bateria macia com swing (bumbo, caixa e
 * chimbal), notas soltas de melodia e chiado de vinil. Tudo passa por um filtro passa-baixa
 * para soar quente e distante.
 *
 * Efeitos: "tic" suave ao clicar em botões e links (e ao trocar de cartão num carrossel), um
 * sininho (nota da escala pentatônica) quando cada seção entra na tela, papel virando na ficha
 * de vocabulário e o tique-tique do odômetro nos números.
 *
 * O áudio só pode começar depois de um toque/clique/tecla (regra dos navegadores).
 */

const MUSIC_VOLUME = 0.2;
const SFX_VOLUME = 0.14;
const BPM = 72;
const STEP = 60 / BPM / 4; // semicolcheia

const CHORDS = [
  [53, 57, 60, 64], // Fmaj7
  [52, 55, 59, 62], // Em7
  [50, 53, 57, 60], // Dm7
  [48, 52, 55, 59], // Cmaj7
];
const PENTA = [72, 74, 76, 79, 81, 84];
const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

let ctx: AudioContext | null = null;
let musicGain: GainNode;
let sfxGain: GainNode;
let tone: GainNode; // entrada do filtro quente
let wow: OscillatorNode;
let wowDepth: GainNode;
let noise: AudioBuffer;
let crackle: AudioBufferSourceNode | null = null;
let timer = 0;
let nextTime = 0;
let step = 0;
let playing = false;

function init() {
  if (ctx) return ctx;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();

  const master = ctx.createGain();
  master.connect(ctx.destination);

  const warm = ctx.createBiquadFilter();
  warm.type = "lowpass";
  warm.frequency.value = 1500;
  warm.Q.value = 0.4;
  musicGain = ctx.createGain();
  musicGain.gain.value = 0;
  tone = ctx.createGain();
  tone.connect(warm).connect(musicGain).connect(master);

  sfxGain = ctx.createGain();
  sfxGain.gain.value = SFX_VOLUME;
  sfxGain.connect(master);

  // "oscilação de fita": LFO lento ligado à afinação das notas
  wow = ctx.createOscillator();
  wow.frequency.value = 0.35;
  wowDepth = ctx.createGain();
  wowDepth.gain.value = 7; // cents
  wow.connect(wowDepth);
  wow.start();

  noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return ctx;
}

function env(g: GainNode, t: number, peak: number, attack: number, dur: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
}

function keys(t: number, midi: number, dur: number, vol: number) {
  const c = ctx!;
  for (const [type, mult, v] of [
    ["sine", 1, 1],
    ["triangle", 2, 0.18],
  ] as const) {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = hz(midi) * mult;
    wowDepth.connect(o.detune);
    const g = c.createGain();
    env(g, t, vol * v, 0.03, dur);
    o.connect(g).connect(tone);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
}

function noiseHit(t: number, type: BiquadFilterType, freq: number, dur: number, vol: number, out: AudioNode = tone) {
  const c = ctx!;
  const s = c.createBufferSource();
  s.buffer = noise;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = c.createGain();
  env(g, t, vol, 0.003, dur);
  s.connect(f).connect(g).connect(out);
  s.start(t, Math.random());
  s.stop(t + dur + 0.05);
}

function kick(t: number) {
  const c = ctx!;
  const o = c.createOscillator();
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(42, t + 0.3);
  const g = c.createGain();
  env(g, t, 0.55, 0.005, 0.38);
  o.connect(g).connect(tone);
  o.start(t);
  o.stop(t + 0.45);
}

function scheduleStep(s: number, t: number) {
  const bar = Math.floor(s / 16) % CHORDS.length;
  const i = s % 16;
  const chord = CHORDS[bar];
  const swing = i % 2 === 1 ? STEP * 0.18 : 0;
  const at = t + swing;

  if (i === 0) {
    chord.forEach((n, k) => keys(at + k * 0.012, n, STEP * 15, 0.07)); // acorde levemente "dedilhado"
    keys(at, chord[0] - 12, STEP * 7, 0.11); // baixo
  }
  if (i === 10) keys(at, chord[0] - 12, STEP * 5, 0.09);
  if (i === 0 || i === 7 || i === 10) kick(at);
  if (i === 4 || i === 12) noiseHit(at, "bandpass", 1700, 0.2, 0.16);
  if (i % 2 === 0) noiseHit(at, "highpass", 7500, 0.04, 0.025 + Math.random() * 0.02);
  if (i % 4 === 2 && Math.random() < 0.3) {
    keys(at, PENTA[Math.floor(Math.random() * PENTA.length)], STEP * 6, 0.05);
  }
}

function startCrackle() {
  const c = ctx!;
  // chiado de vinil: pontinhos aleatórios + um sopro baixinho
  const buf = c.createBuffer(1, c.sampleRate * 3, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    d[i] = (Math.random() * 2 - 1) * 0.012 + (Math.random() < 0.0004 ? (Math.random() * 2 - 1) * 0.6 : 0);
  }
  crackle = c.createBufferSource();
  crackle.buffer = buf;
  crackle.loop = true;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 3500;
  const g = c.createGain();
  g.gain.value = 0.35;
  crackle.connect(f).connect(g).connect(tone);
  crackle.start();
}

function loop() {
  const c = ctx!;
  while (nextTime < c.currentTime + 0.15) {
    scheduleStep(step, nextTime);
    nextTime += STEP;
    step++;
  }
}

export const lofi = {
  get playing() {
    return playing;
  },
  /** liga a música com fade-in (chamar dentro de um gesto). `delay` em segundos. */
  async start(delay = 0) {
    const c = init();
    if (!c) return false;
    try {
      await c.resume();
    } catch {
      return false;
    }
    if (c.state !== "running") return false;
    if (!playing) {
      playing = true;
      nextTime = c.currentTime + 0.05 + delay;
      if (!crackle) startCrackle();
      window.clearInterval(timer);
      timer = window.setInterval(loop, 25);
      musicGain.gain.cancelScheduledValues(c.currentTime);
      musicGain.gain.setValueAtTime(musicGain.gain.value, c.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.0001, c.currentTime + delay);
      musicGain.gain.linearRampToValueAtTime(MUSIC_VOLUME, c.currentTime + delay + 4);
      sfxGain.gain.value = SFX_VOLUME;
    }
    return true;
  },
  stop() {
    if (!ctx || !playing) return;
    playing = false;
    const t = ctx.currentTime;
    musicGain.gain.cancelScheduledValues(t);
    musicGain.gain.setValueAtTime(musicGain.gain.value, t);
    musicGain.gain.linearRampToValueAtTime(0.0001, t + 0.8);
    sfxGain.gain.value = 0;
    window.setTimeout(() => !playing && window.clearInterval(timer), 900);
  },
  /**
   * Abaixa a música (sem desligar o som do site) enquanto outro áudio toca, como o vídeo do
   * popup de materiais; `false` devolve o volume. O botão de som continua como estava.
   */
  duck(on: boolean) {
    if (!ctx || !playing) return;
    const t = ctx.currentTime;
    musicGain.gain.cancelScheduledValues(t);
    musicGain.gain.setValueAtTime(musicGain.gain.value, t);
    musicGain.gain.linearRampToValueAtTime(on ? 0.0001 : MUSIC_VOLUME, t + (on ? 0.6 : 1.5));
  },
  /** "tic" macio de botão */
  click() {
    if (!ctx || !playing) return;
    const t = ctx.currentTime;
    for (const [f, v] of [
      [660, 0.5],
      [990, 0.25],
    ]) {
      const o = ctx.createOscillator();
      o.frequency.value = f;
      const g = ctx.createGain();
      env(g, t, v, 0.004, 0.14);
      o.connect(g).connect(sfxGain);
      o.start(t);
      o.stop(t + 0.2);
    }
  },
  /** papel virando (ficha de vocabulário): duas raspadas curtas de ruído, a segunda mais aguda */
  paper() {
    if (!ctx || !playing) return;
    const t = ctx.currentTime;
    for (const [at, from, to, dur, v] of [
      [0, 1400, 3200, 0.16, 0.5],
      [0.07, 2600, 5200, 0.2, 0.35],
    ]) {
      const s = ctx.createBufferSource();
      s.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.Q.value = 1.4;
      f.frequency.setValueAtTime(from, t + at);
      f.frequency.exponentialRampToValueAtTime(to, t + at + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + at);
      g.gain.exponentialRampToValueAtTime(v, t + at + dur * 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + at + dur);
      s.connect(f).connect(g).connect(sfxGain);
      s.start(t + at, Math.random());
      s.stop(t + at + dur + 0.05);
    }
  },
  /**
   * Odômetro: tiques que começam rápidos e vão desacelerando até parar (como os rolos dos
   * números), e um "plim" curto no fim, quando o sinal (+, %) salta. Tempos em segundos.
   */
  roll(delay: number, dur: number) {
    if (!ctx || !playing) return;
    const t0 = ctx.currentTime + delay;
    const n = 16;
    for (let i = 0; i < n; i++) {
      const p = i / (n - 1);
      const at = t0 + dur * (1 - Math.pow(1 - p, 2.2)) * 0.95; // mesma desaceleração dos rolos
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = 1900 - p * 500;
      const g = ctx.createGain();
      env(g, at, 0.12 - p * 0.05, 0.002, 0.035);
      o.connect(g).connect(sfxGain);
      o.start(at);
      o.stop(at + 0.06);
    }
    const end = t0 + dur;
    const o = ctx.createOscillator();
    o.frequency.value = hz(PENTA[3]);
    const g = ctx.createGain();
    env(g, end, 0.2, 0.006, 0.45);
    o.connect(g).connect(sfxGain);
    o.start(end);
    o.stop(end + 0.5);
  },
  /** sininho quando uma seção aparece (nota muda conforme a seção) */
  chime(index: number) {
    if (!ctx || !playing) return;
    const t = ctx.currentTime;
    const midi = PENTA[index % PENTA.length];
    for (const [mult, v, dur] of [
      [1, 0.35, 1.6],
      [2, 0.1, 0.9],
      [3, 0.04, 0.5],
    ]) {
      const o = ctx.createOscillator();
      o.frequency.value = hz(midi) * mult;
      const g = ctx.createGain();
      env(g, t, v, 0.01, dur);
      o.connect(g).connect(sfxGain);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  },
};
