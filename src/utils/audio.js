let voices = [];

const loadVoices = () => {
  voices = window.speechSynthesis.getVoices();
};

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1); 
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(1600, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'celebration') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now); 
      osc.frequency.setValueAtTime(554.37, now + 0.1); 
      osc.frequency.setValueAtTime(659.25, now + 0.2); 
      osc.frequency.setValueAtTime(880, now + 0.3); 
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch (e) {
    console.log('Áudio não suportado', e);
  }
};

export const speakEnglish = (text, e = null) => {
  if (e && e.stopPropagation) e.stopPropagation();

  if (!('speechSynthesis' in window)) {
    console.warn("Navegador sem suporte a TTS.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }

  // Debug
  console.log("Vozes carregadas:", voices.length);

  // Tenta encontrar a melhor voz possível
  const preferredVoice = voices.find(v => v.name === "Google US English") || 
                         voices.find(v => v.name === "Microsoft Zira - English (United States)") ||
                         voices.find(v => v.name.includes("Google US English")) ||
                         voices.find(v => v.name.includes("Zira")) ||
                         voices.find(v => v.name.includes("Samantha")) ||
                         voices.find(v => v.name.includes("Female") && v.lang === 'en-US') ||
                         voices.find(v => v.lang === 'en-US');

  if (preferredVoice) {
    utterance.voice = preferredVoice;
    console.log(`Usando voz: ${preferredVoice.name}`);
  } else {
    console.log("Nenhuma voz específica en-US encontrada, usando padrão do sistema.");
  }

  window.speechSynthesis.speak(utterance);
};
