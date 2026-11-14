"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { Btn, Card, IconTile } from "../../components/ui";

type AudioDevice = { deviceId: string; label: string };

/** Gravador local do navegador. Nenhum áudio sai do dispositivo até a aluna enviar a entrega. */
export function AudioRecorder({ onRecorded }: { onRecorded: (file: File) => void }) {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  async function loadDevices() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    const available = (await navigator.mediaDevices.enumerateDevices())
      .filter((device) => device.kind === "audioinput")
      .map((device, index) => ({ deviceId: device.deviceId, label: device.label || `Microfone ${index + 1}` }));
    setDevices(available);
    setDeviceId((current) => current || available[0]?.deviceId || "");
  }

  async function startRecording() {
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        setError("Seu navegador não oferece gravação de áudio. Envie um arquivo de áudio em vez disso.");
        return;
      }
      await loadDevices();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: deviceId ? { deviceId: { exact: deviceId } } : true });
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream, MediaRecorder.isTypeSupported("audio/webm") ? { mimeType: "audio/webm" } : undefined);
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        const file = new File([blob], "entrega-em-audio.webm", { type: blob.type });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        onRecorded(file);
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };
      recorderRef.current = recorder;
      streamRef.current = stream;
      setSeconds(0);
      recorder.start();
      setRecording(true);
      timerRef.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    } catch {
      setError("Não conseguimos acessar o microfone. Verifique a permissão do navegador e tente novamente.");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRecording(false);
  }

  const formatTime = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

  return (
    <Card className="mt-5 border border-orange/30 bg-orange/5 p-4">
      <div className="flex items-start gap-3"><IconTile icon={Mic} tone="orange" size="sm" /><div><h3 className="font-serif text-[1.15rem] font-semibold text-midnight">Gravar áudio aqui</h3><p className="mt-1 text-[0.78rem] leading-relaxed text-muted">Escolha o microfone, grave e escute antes de enviar.</p></div></div>
      <label className="mt-4 block text-[0.76rem] font-semibold text-midnight">Microfone para gravação
        <select value={deviceId} disabled={recording} onChange={(event) => setDeviceId(event.target.value)} onFocus={() => loadDevices().catch(() => undefined)} className="mt-1.5 h-10 w-full rounded-tile border border-hairline bg-card px-3 text-[0.82rem] font-normal outline-none focus:border-purple disabled:opacity-60">
          {devices.length === 0 && <option value="">Microfone padrão do dispositivo</option>}
          {devices.map((device) => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
        </select>
      </label>
      <div className="mt-4 flex items-center gap-3">
        {recording ? <Btn onClick={stopRecording} variant="dark" className="bg-coral text-snow hover:bg-coral-deep"><Square aria-hidden className="fill-current" />Parar gravação</Btn> : <Btn onClick={startRecording}><Mic aria-hidden />{audioUrl ? "Gravar novamente" : "Começar gravação"}</Btn>}
        {recording && <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold text-coral-deep"><span className="size-2 animate-pulse rounded-full bg-coral" />Gravando {formatTime(seconds)}</span>}
      </div>
      {audioUrl && !recording && <div className="mt-4 rounded-tile bg-card p-3"><div className="flex items-center gap-2 text-[0.78rem] font-semibold text-midnight"><Volume2 aria-hidden className="size-4 text-purple" />Ouça antes de enviar</div><audio className="mt-2 w-full" controls src={audioUrl}>Seu navegador não reproduz este áudio.</audio><p className="mt-2 text-[0.72rem] text-muted">Se não gostar, grave novamente. O novo áudio substitui o anterior.</p></div>}
      {error && <p className="mt-3 text-[0.76rem] leading-relaxed text-coral-deep">{error}</p>}
    </Card>
  );
}
