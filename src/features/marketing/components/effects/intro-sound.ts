/**
 * Sons da abertura, sintetizados com Web Audio (sem arquivos de áudio). Cada efeito acompanha
 * um movimento da animação em CSS (tempos em segundos desde o início da página):
 *
 *   0,33 a 1,16  "tic" de cartão virando a cada troca de palavra do letreiro
 *   1,20         "pop" do quadrado da logo saltando
 *   1,35         sopro curto do L subindo
 *   1,60         dois "plins" das aspas caindo (o segundo é o quique)
 *   1,62 a 1,95  tiques leves de máquina de escrever, um por letra de "Lingship"
 *   1,95         acorde suave (arpejo) quando a tagline aparece
 *   2,75         sopro longo da cortina subindo
 *
 * Os navegadores só liberam áudio depois de um toque/tecla; até lá nada toca.
 */

type Node = AudioScheduledSourceNode;

export function createIntroSound() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);

  const nodes: Node[] = [];
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  function tone(t: number, freq: number, dur: number, type: OscillatorType, vol: number, freqEnd?: number) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    nodes.push(osc);
  }

  function whoosh(t: number, dur: number, from: number, to: number, vol: number) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 0.9;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t);
    src.stop(t + dur + 0.05);
    nodes.push(src);
  }

  /** linha do tempo: [segundo, efeito] */
  const timeline: [number, (t: number) => void][] = [
    ...[0.33, 0.54, 0.74, 0.95, 1.16].map(
      (s) =>
        [
          s,
          (t: number) => {
            tone(t, 1500, 0.05, "triangle", 0.1);
            tone(t, 720, 0.07, "sine", 0.06);
          },
        ] as [number, (t: number) => void],
    ),
    [1.2, (t) => tone(t, 240, 0.2, "sine", 0.35, 640)],
    [1.35, (t) => whoosh(t, 0.45, 450, 2400, 0.16)],
    [
      1.6,
      (t) => {
        tone(t, 1760, 0.28, "sine", 0.2);
        tone(t + 0.09, 2349, 0.34, "sine", 0.15);
      },
    ],
    ...Array.from(
      { length: 8 },
      (_, i) => [1.62 + i * 0.045, (t: number) => tone(t, 2100 + i * 55, 0.03, "triangle", 0.045)] as [number, (t: number) => void],
    ),
    [
      1.95,
      (t) => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(t + i * 0.07, f, 1.3, "sine", 0.09)),
    ],
    [2.75, (t) => whoosh(t, 0.85, 280, 3200, 0.2)],
  ];

  let scheduled = false;

  return {
    get running() {
      return ctx.state === "running";
    },
    /** tenta ligar o áudio (só funciona depois de um gesto) e agenda o que ainda falta */
    async start() {
      if (ctx.state !== "running") {
        try {
          await ctx.resume();
        } catch {
          return false;
        }
      }
      if (ctx.state !== "running") return false;
      if (!scheduled) {
        scheduled = true;
        const elapsed = performance.now() / 1000; // a animação em CSS começa com a página
        const now = ctx.currentTime;
        for (const [at, play] of timeline) {
          const delta = at - elapsed;
          if (delta > -0.02) play(now + Math.max(0, delta));
        }
      }
      return true;
    },
    mute(on: boolean) {
      master.gain.setTargetAtTime(on ? 0 : 0.5, ctx.currentTime, 0.02);
    },
    /** ao pular: corta o que está agendado e toca só o sopro da cortina */
    skip() {
      nodes.splice(0).forEach((n) => {
        try {
          n.stop();
        } catch {}
      });
      if (ctx.state === "running") whoosh(ctx.currentTime, 0.5, 300, 3000, 0.18);
    },
    close() {
      window.setTimeout(() => ctx.close().catch(() => {}), 1500);
    },
  };
}
