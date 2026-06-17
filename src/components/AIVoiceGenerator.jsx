import React, { useState, useEffect, useRef } from "react";

// --- DATABASE & CONFIGURATION ---
const VOICE_OPTIONS = [
  { name: "Kore", gender: "Female", style: "Balanced, Natural", id: "Kore", desc: "Suara wanita muda yang jernih dan santai." },
  { name: "Fenrir", gender: "Male", style: "Deep, Cinematic", id: "Fenrir", desc: "Suara pria berat, dalam, dan berwibawa." },
  { name: "Aoede", gender: "Female", style: "Emotional, Storyteller", id: "Aoede", desc: "Sangat ekspresif dan emosional." },
  { name: "Charon", gender: "Male", style: "Authoritative, News", id: "Charon", desc: "Tegas, serius, dan terpercaya." },
  { name: "Leda", gender: "Female", style: "Soft, ASMR", id: "Leda", desc: "Lembut, menenangkan, dan halus." },
  { name: "Orion", gender: "Male", style: "Casual, Friendly", id: "Orus", desc: "Seperti teman ngobrol sehari-hari." },
  { name: "Nyx", gender: "Female", style: "Confident, Ads", id: "Callirrhoe", desc: "Modern, percaya diri, dan 'mahal'." },
  { name: "Atlas", gender: "Male", style: "Professional, Edu", id: "Puck", desc: "Jelas, artikulatif, dan cerdas." },
  { name: "Selene", gender: "Female", style: "Elegant, Premium", id: "Erinome", desc: "Elegan, dewasa, dan sophisticated." },
  { name: "Ares", gender: "Male", style: "Hype, Energetic", id: "Zephyr", desc: "Cepat, penuh energi, dan semangat." },
  { name: "Luna", gender: "Female", style: "Empathetic, Soft", id: "Autonoe", desc: "Suara penuh empati dan kehangatan." },
  { name: "Titan", gender: "Male", style: "Deep, Gravelly", id: "Enceladus", desc: "Suara pria sangat berat dan berkarakter." },
  { name: "Nova", gender: "Male", style: "Broadcast, Radio", id: "Iapetus", desc: "Suara penyiar radio klasik." },
  { name: "Vega", gender: "Male", style: "Calm, Narrator", id: "Umbriel", desc: "Tenang, stabil, dan datar." },
  { name: "Lyra", gender: "Female", style: "Formal, Corporate", id: "Algieba", desc: "Sangat formal dan profesional." },
  { name: "Rhea", gender: "Female", style: "Friendly, CS", id: "Despina", desc: "Ramah, membantu, dan ceria." },
  { name: "Rigel", gender: "Male", style: "Fast, Promo", id: "Algenib", desc: "Cepat dan to-the-point." },
  { name: "Sirius", gender: "Male", style: "Audiobook, Story", id: "Rasalgethi", desc: "Gaya mendongeng klasik." },
  { name: "Gaia", gender: "Female", style: "Mature, Warm", id: "Laomedeia", desc: "Dewasa dan menenangkan." },
  { name: "Zenith", gender: "Male", style: "Tech, Futuristic", id: "Achernar", desc: "Bersih, modern, dan digital." }
];

const DELIVERY_STYLES = [
  { id: "semangat", name: "Semangat (Energetic)", icon: "fa-fire", prompt: "Suara penuh energi, antusias tinggi, tempo cepat, dan sangat bertenaga." },
  { id: "profesional", name: "Profesional", icon: "fa-user-tie", prompt: "Suara berwibawa, artikulasi sangat jelas, formal, meyakinkan." },
  { id: "santai", name: "Santai (Casual)", icon: "fa-couch", prompt: "Gaya bicara rileks, seperti ngobrol dengan teman akrab, tidak kaku." },
  { id: "ceria", name: "Ceria (Happy)", icon: "fa-smile-beam", prompt: "Nada suara tersenyum (smiling voice), bahagia, uplifting, dan positif." },
  { id: "sedih", name: "Sedih (Sad)", icon: "fa-sad-tear", prompt: "Nada rendah, lambat, terdengar sedih, kecewa, atau berduka." },
  { id: "marah", name: "Marah (Angry)", icon: "fa-face-angry", prompt: "Nada tinggi, tegas, tajam, intens, dan terdengar kesal." },
  { id: "berbisik", name: "Berbisik (Whisper)", icon: "fa-user-secret", prompt: "Suara sangat pelan, berbisik dekat microphone, mendesah." },
  { id: "dramatis", name: "Dramatis (Dramatic)", icon: "fa-masks-theater", prompt: "Penuh penekanan, jeda yang intens, emosional, teatrikal." },
  { id: "tenang", name: "Tenang (Calm)", icon: "fa-water", prompt: "Sangat stabil, lembut, datar, menenangkan, cocok untuk meditasi." },
  { id: "informatif", name: "Informatif (News)", icon: "fa-newspaper", prompt: "Objektif, jelas, netral, faktual, seperti pembaca berita." },
  { id: "teriak", name: "Teriak (Shouting)", icon: "fa-bullhorn", prompt: "Volume suara keras, intensitas tinggi, memanggil." },
  { id: "ngosngosan", name: "Ngos-ngosan (Panting)", icon: "fa-person-running", prompt: "Suara terengah-engah, nafas berat dan cepat." },
  {
    id: "cdrama_cinematic_v2",
    name: "Drama China (Cinematic V2)",
    icon: "fa-film",
    prompt: `SYSTEM INSTRUCTION — DRAMA_CINA_CINEMATIC_LOCK_V2\nYou are a cinematic voice performance engine.\nYour task is to deliver the script in authentic modern Chinese drama style (urban romance / elite family conflict tone).\nYou must prioritize emotional realism, cinematic pacing, and controlled intensity.\nYou are NOT allowed to read text in neutral tone.\nEMOTIONAL CORE RULE:\n1. Analyze the emotional context of the script.\n2. Identify dominant emotion: Longing, Regret, Contained anger, Emotional confession, Betrayal, Silent heartbreak.\n3. Build a gradual emotional curve.\nFlat delivery is strictly forbidden.\nVOICE DNA (MANDATORY):\n- Pace: 0.88x natural speed\n- Tone: Warm, slightly lowered pitch baseline\n- Projection: Soft but emotionally weighted\n- Emotion layering: Minimum 3 dynamic levels\n- Breath: Natural cinematic breathing before emotional lines\n- Articulation: Clear, deliberate emphasis on key words\n- No shouting\n- No exaggerated theatrical tone\nDRAMATIC PAUSE SYSTEM:\n- Comma pause: 0.25–0.4 seconds\n- Emotional sentence ending: 0.6–0.8 seconds\n- Major emotional reveal: up to 1.0 second\n- Insert subtle breath before confession or confrontation lines\nCHARACTER LOCK MODE (STRICT):\n- Lock timbre, resonance, and emotional tone from first line to last.\n- No pitch drift.\n- No tonal reset mid-script.\n- Maintain identical character identity across entire generation.\nOUTPUT RULE:\n- Do NOT rewrite the script.\n- Do NOT summarize.\n- Do NOT add narration.\n- Only transform delivery style.`
  }
];

export default function AiVoiceGenerator() {
  const apiKey = "AQ.Ab8RN6KhLoPdGI6BQ1GwxyVldZKsZlTS7OEuJ-GgjTegmeSmHQ"; // Masukkan API Key Gemini Kamu di Sini jika diperlukan
  const mainAudioRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [currentView, setCurrentView] = useState("tts");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [text, setText] = useState("");
  const [lastGeneratedConfig, setLastGeneratedConfig] = useState({ text: "", voice: "", style: "", intensity: 5 });
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0].id);
  const [selectedStyle, setSelectedStyle] = useState(DELIVERY_STYLES[0].id);
  const [styleIntensity, setStyleIntensity] = useState(5);
  const [optimizationMode, setOptimizationMode] = useState("optimized");
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(false);

  const [previewState, setPreviewState] = useState({ playingVoiceId: null, isLoading: false, audio: null });

  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [weight, setWeight] = useState(0);
  const [volume, setVolume] = useState(0);
  const [articulation, setArticulation] = useState(0);

  const [uiState, setUiState] = useState({ voice: true, style: true, control: false });
  const [processing, setProcessing] = useState({ isLoading: false, step: "", error: null });

  const [result, setResult] = useState({
    previewUrl: null, downloadUrl: null, downloadSpeed: 1.0, refinedScript: null, modeUsed: "original", rawPCM: null
  });
  const [articulationProcessing, setArticulationProcessing] = useState(false);

  const [ideaForm, setIdeaForm] = useState({ description: "", usp: "", contentType: "Iklan Media Sosial (TikTok/Reels)", language: "Bahasa Indonesia", count: 3 });
  const [ideaProcessing, setIdeaProcessing] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [uspProcessing, setUspProcessing] = useState(false);

  const [photoForm, setPhotoForm] = useState({
    imageData: null, imageName: "", contentType: "TikTok Affiliate", targetAge: "Gen Z (18 - 24 Tahun)", targetGender: "Semua Gender", language: "Bahasa Indonesia", count: 3
  });
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [generatedPhotoScripts, setGeneratedPhotoScripts] = useState([]);

  useEffect(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.playbackRate = speed;
    }
  }, [speed, result.previewUrl]);

  // Tambahkan style untuk equalizing bar dan gradient loading bawan MoStu Agency
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
            .mostu-bar { width: 3px; background: #FF5500; animation: mostuEqualize 0.5s infinite; }
            @keyframes mostuEqualize { 0% { height: 20%; } 50% { height: 100%; } 100% { height: 20%; } }
            .load-grad-orange { background: linear-gradient(90deg, #FF5500 0%, #ff8844 50%, #FF5500 100%); background-size: 200% 100%; animation: gradMv 2s linear infinite; }
            .load-grad-teal { background: linear-gradient(90deg, #14b8a6 0%, #2dd4bf 50%, #14b8a6 100%); background-size: 200% 100%; animation: gradMv 2s linear infinite; }
            .load-grad-pink { background: linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%); background-size: 200% 100%; animation: gradMv 2s linear infinite; }
            @keyframes gradMv { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const toggleSection = (section) => {
    setUiState(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const pcmToAudioBuffer = async (pcmBase64, sampleRate = 24000) => {
    const binaryString = atob(pcmBase64);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) view[i] = binaryString.charCodeAt(i);
    const int16Data = new Int16Array(buffer);
    const float32Data = new Float32Array(int16Data.length);
    for (let i = 0; i < int16Data.length; i++) {
      float32Data[i] = int16Data[i] / 32768.0;
    }
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate });
    try {
      const audioBuffer = audioCtx.createBuffer(1, float32Data.length, sampleRate);
      audioBuffer.getChannelData(0).set(float32Data);
      return audioBuffer;
    } catch (error) {
      console.error("Error creating audio buffer:", error);
      throw error;
    } finally {
      // 🔥 PERBAIKAN DI SINI: Menggunakan blok finally yang valid dan benar
      if (audioCtx.state !== 'closed') {
        await audioCtx.close();
      }
    }
  };

  const audioBufferToMp3Url = (buffer) => {
    if (typeof lamejs === 'undefined') {
      console.error("lamejs not loaded");
      return null;
    }
    const channels = 1;
    const sampleRate = buffer.sampleRate;
    const kbps = 128;
    const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
    const mp3Data = [];
    const rawData = buffer.getChannelData(0);
    const samples = new Int16Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      const s = Math.max(-1, Math.min(1, rawData[i]));
      samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    const sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) mp3Data.push(mp3buf);
    }
    const mp3buf = mp3encoder.flush();
    if (mp3buf.length > 0) mp3Data.push(mp3buf);
    return URL.createObjectURL(new Blob(mp3Data, { type: 'audio/mp3' }));
  };

  const performTimeStretch = async (audioBuffer, speed) => {
    if (speed === 1.0) return audioBuffer;
    const sampleRate = audioBuffer.sampleRate;
    const channels = audioBuffer.numberOfChannels;
    const inputData = audioBuffer.getChannelData(0);
    const winSize = 2048;
    const overlap = 0.5;
    const hs = Math.floor(winSize * overlap);
    const ha = Math.floor(hs * speed);
    const newLength = Math.floor(inputData.length / speed);
    const offlineCtx = new OfflineAudioContext(channels, newLength, sampleRate);
    const outBuffer = offlineCtx.createBuffer(channels, newLength, sampleRate);
    const outData = outBuffer.getChannelData(0);
    const windowF = new Float32Array(winSize);
    for (let i = 0; i < winSize; i++) {
      windowF[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (winSize - 1)));
    }
    let inputIdx = 0; let outputIdx = 0;
    while (outputIdx + winSize < newLength && inputIdx + winSize < inputData.length) {
      for (let i = 0; i < winSize; i++) {
        outData[outputIdx + i] += inputData[Math.floor(inputIdx) + i] * windowF[i];
      }
      inputIdx += ha; outputIdx += hs;
    }
    const normFactor = 1 / (1 / overlap * 0.55);
    for (let i = 0; i < newLength; i++) outData[i] *= normFactor;
    return outBuffer;
  };

  const pcmToWav = (pcmBase64, sampleRate = 24000) => {
    const binaryString = atob(pcmBase64);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) view[i] = binaryString.charCodeAt(i);
    const pcmData = new Int16Array(buffer);
    const wavHeaderBuffer = new ArrayBuffer(44);
    const viewHeader = new DataView(wavHeaderBuffer);
    const numChannels = 1;
    const byteRate = sampleRate * numChannels * 2;
    const dataSize = pcmData.length * 2;
    const writeString = (v, o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    writeString(viewHeader, 0, 'RIFF');
    viewHeader.setUint32(4, 36 + dataSize, true);
    writeString(viewHeader, 8, 'WAVE');
    writeString(viewHeader, 12, 'fmt ');
    viewHeader.setUint32(16, 16, true);
    viewHeader.setUint16(20, 1, true);
    viewHeader.setUint16(22, numChannels, true);
    viewHeader.setUint32(24, sampleRate, true);
    viewHeader.setUint32(28, byteRate, true);
    viewHeader.setUint16(32, numChannels * 2, true);
    viewHeader.setUint16(34, 16, true);
    writeString(viewHeader, 36, 'data');
    viewHeader.setUint32(40, dataSize, true);
    return URL.createObjectURL(new Blob([wavHeaderBuffer, pcmData], { type: 'audio/wav' }));
  };

  const handlePreview = async (e, voiceId) => {
    e.stopPropagation();
    if (previewState.playingVoiceId === voiceId) {
      if (previewState.audio) {
        previewState.audio.pause();
        previewState.audio.currentTime = 0;
      }
      setPreviewState({ playingVoiceId: null, isLoading: false, audio: null });
      return;
    }
    if (previewState.audio) {
      previewState.audio.pause();
      previewState.audio.currentTime = 0;
    }
    setPreviewState({ playingVoiceId: voiceId, isLoading: true, audio: null });

    try {
      const targetVoice = VOICE_OPTIONS.find(v => v.id === voiceId);
      const textToSay = targetVoice ? targetVoice.desc : "Halo, ini adalah contoh suara saya.";
      const ttsResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: scriptToRead }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } }
          }
        })
      });

      if (!ttsResp.ok) throw new Error(`API Error: ${ttsResp.status}`);
      const ttsData = await ttsResp.json();
      const audioContent = ttsData.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      if (!audioContent) throw new Error("No audio returned");
      const wavUrl = pcmToWav(audioContent.data);
      const newAudio = new Audio(wavUrl);
      newAudio.playbackRate = speed;
      newAudio.onended = () => setPreviewState({ playingVoiceId: null, audio: null, isLoading: false });
      newAudio.onerror = () => {
        setPreviewState({ playingVoiceId: null, audio: null, isLoading: false });
        alert("Gagal memutar preview.");
      };
      await newAudio.play();
      setPreviewState({ playingVoiceId: voiceId, isLoading: false, audio: newAudio });
    } catch (err) {
            console.error("DEBUG ERROR DETAIL:", err);
      setProcessing({ isLoading: false, step: "failed", error: err.message });
    }
  };

  const stopPreview = () => {
    if (previewState.audio) {
      previewState.audio.pause();
      previewState.audio.currentTime = 0;
    }
    setPreviewState({ playingVoiceId: null, isLoading: false, audio: null });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhotoForm(prev => ({ ...prev, imageData: reader.result.split(',')[1], imageName: file.name, mimeType: file.type }));
    reader.readAsDataURL(file);
  };

  const generateScriptsFromPhoto = async () => {
    if (!photoForm.imageData) return alert("Mohon upload foto.");
    setPhotoProcessing(true);
    try {
      const prompt = `Role: Expert Copywriter. Task: Create ${photoForm.count} voice-over scripts for ${photoForm.contentType} based on the image. Language: ${photoForm.language}. Target Audience: ${photoForm.targetAge}, ${photoForm.targetGender}. Constraint: STRICTLY keep around 30 seconds. Return ONLY JSON array of strings.`;
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }, { inlineData: { mimeType: photoForm.mimeType || "image/jpeg", data: photoForm.imageData } }] }], generationConfig: { responseMimeType: "application/json" } })
      });
      if (!resp.ok) throw new Error(`API Error: ${resp.status}`);
      const data = await resp.json();
      setGeneratedPhotoScripts(JSON.parse(data.candidates[0].content.parts[0].text));
    } catch (err) {
      alert(`Gagal membuat script: ${err.message}`);
    } finally {
      setPhotoProcessing(false);
    }
  };

  const generateIdeas = async () => {
    if (!ideaForm.description) return;
    setIdeaProcessing(true);
    try {
      let instructions = "Return ONLY dialogue words. No visual notes.";
      if (ideaForm.contentType === "Iklan Media Sosial (TikTok/Reels)") {
        instructions += " MUST end with 'Klik Keranjang Kuning'. Target exactly 30 seconds reading time.";
      }
      const prompt = `Role: Direct Response Copywriter. Task: Create ${ideaForm.count} short scripts in ${ideaForm.language} for ${ideaForm.contentType}. Product: ${ideaForm.description}. USP: ${ideaForm.usp}. ${instructions} Return ONLY JSON array of strings.`;
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } })
      });
      if (!resp.ok) throw new Error(`API Error: ${resp.status}`);
      const data = await resp.json();
      setGeneratedIdeas(JSON.parse(data.candidates[0].content.parts[0].text));
    } catch (err) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setIdeaProcessing(false);
    }
  };

  const generateUSP = async () => {
    if (!ideaForm.description) return alert("Isi deskripsi dulu.");
    setUspProcessing(true);
    try {
      const prompt = `Extract one short Indonesian USP from: "${ideaForm.description}". Return ONLY the text.`;
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (!resp.ok) throw new Error(`API Error: ${resp.status}`);
      const data = await resp.json();
      setIdeaForm(prev => ({ ...prev, usp: data.candidates[0].content.parts[0].text.trim() }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUspProcessing(false);
    }
  };

  const fixArticulation = async () => {
    if (!text) return;
    setArticulationProcessing(true);
    try {
      const prompt = `Rewrite to improve Indonesian articulation/prosody for TTS by adding punctuation. Do not change words. Input: "${text}"`;
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (!resp.ok) throw new Error(`API Error: ${resp.status}`);
      const data = await resp.json();
      setText(data.candidates[0].content.parts[0].text.trim());
    } catch (err) {
      alert(err.message);
    } finally {
      setArticulationProcessing(false);
    }
  };

  const generateAudio = async () => {
    if (!text.trim()) return;
    let effectiveMode = optimizationMode;
    if (text.match(/\(.*\)/) && optimizationMode === "original") effectiveMode = "optimized";

    const isRebakeOnly = result.rawPCM &&
      text === lastGeneratedConfig.text &&
      selectedVoice === lastGeneratedConfig.voice &&
      selectedStyle === lastGeneratedConfig.style &&
      styleIntensity === lastGeneratedConfig.intensity;

    const stepStart = isRebakeOnly ? "baking" : (effectiveMode === 'optimized' ? "analyzing" : "synthesizing");
    setProcessing({ isLoading: true, step: stepStart, error: null });

    if (!isRebakeOnly) {
      setResult(prev => ({ ...prev, previewUrl: null, downloadUrl: null, refinedScript: null, modeUsed: effectiveMode }));
    }

    try {
      let rawPcmData = result.rawPCM;

      if (!isRebakeOnly) {
        let scriptToRead = text;
        if (effectiveMode === 'optimized') {
          const voiceProfile = VOICE_OPTIONS.find(v => v.id === selectedVoice);
          const styleProfile = DELIVERY_STYLES.find(s => s.id === selectedStyle);
          const langInstruction = autoDetectLanguage ? "Language: Detect automatically." : "Language: Indonesian.";
          const logicPrompt = `Role: Expert TTS Director. Task: Process instructions. ${langInstruction} Input: "${text}" Voice: ${voiceProfile.name} Style: ${styleProfile.name}. Intensity level: ${styleIntensity}/10. Output processed text only.`;

          // 🔥 PERBAIKAN: Mengganti model 'gemini-2.5-flash-preview-09-2025' menjadi 'gemini-2.5-flash' resmi
          const refineResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: logicPrompt }] }] })
          });
          if (!refineResp.ok) throw new Error("AI Director Error (Gagal menganalisis naskah emosi)");
          const refineData = await refineResp.json();
          scriptToRead = refineData.candidates[0].content.parts[0].text;
          setResult(prev => ({ ...prev, refinedScript: scriptToRead }));
        }

        setProcessing(prev => ({ ...prev, step: "synthesizing" }));
        const ttsResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: scriptToRead }] }],
            generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } } }
          })
        });
        if (!ttsResp.ok) throw new Error("TTS Generation Error (Mesin Neural Suara Gagal)");
        const ttsData = await ttsResp.json();
        rawPcmData = ttsData.candidates[0].content.parts[0].inlineData.data;
      }

      const rawWavUrl = pcmToWav(rawPcmData);
      setProcessing(prev => ({ ...prev, step: "baking" }));
      const audioBuffer = await pcmToAudioBuffer(rawPcmData);
      const bakedBuffer = await performTimeStretch(audioBuffer, speed);
      const bakedMp3Url = audioBufferToMp3Url(bakedBuffer);

      setResult(prev => ({ ...prev, previewUrl: rawWavUrl, downloadUrl: bakedMp3Url, downloadSpeed: speed, rawPCM: rawPcmData }));
      setLastGeneratedConfig({ text: text, voice: selectedVoice, style: selectedStyle, intensity: styleIntensity });
      setProcessing({ isLoading: false, step: "completed", error: null });
    } catch (err) {
      setProcessing({ isLoading: false, step: "failed", error: err.message });
    }
  };

  const renderKnob = (label, value, setter, min, max, leftLabel, rightLabel) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
        <span>{label}</span>
        <span className="text-[#FF5500]">{value > 0 ? `+${value}` : value}</span>
      </div>
      <input type="range" min={min} max={max} step={1} value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full accent-[#FF5500]" />
      <div className="flex justify-between text-[9px] text-neutral-500 font-medium">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );

  const renderSpeedControl = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-xs font-bold text-[#FF5500] uppercase flex items-center gap-2">
          <i className="fas fa-gauge-high"></i> Speed Calibration
        </label>
        <div className="text-lg font-black text-[#FF5500] bg-[#FF5500]/10 px-3 py-1 rounded-lg tabular-nums border border-[#FF5500]/20">
          {speed.toFixed(1)}x
        </div>
      </div>
      <div className="relative py-2">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 flex justify-between px-1 pointer-events-none z-0">
          {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map(mark => (
            <div key={mark} className={`w-0.5 h-3 -mt-1 ${mark === 1.0 ? 'bg-neutral-500 h-4 -mt-1.5' : 'bg-neutral-800'}`}></div>
          ))}
        </div>
        <input type="range" min="0.5" max="3.0" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full relative z-10 accent-[#FF5500]" />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
        <span className={speed <= 0.8 ? "text-[#FF5500]" : ""}>Slow</span>
        <span className={speed >= 0.9 && speed <= 1.1 ? "text-white" : ""}>Normal</span>
        <span className={speed >= 1.2 && speed < 2.0 ? "text-[#FF5500]" : ""}>Fast</span>
        <span className={speed >= 2.0 ? "text-red-500" : ""}>Hyper</span>
      </div>
      <div className="p-3 bg-[#FF5500]/5 rounded-lg border border-[#FF5500]/10 text-[10px] text-neutral-300 leading-relaxed flex gap-2 items-start">
        <i className="fas fa-info-circle mt-0.5 shrink-0 text-[#FF5500]"></i>
        <span>
          <strong>Note:</strong> Geser slider untuk mengatur kecepatan suara tempo pembacaan naskah (no-chipmunk).
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center bg-transparent transition-colors duration-300 relative pb-12">
      {/* SUB-MENU TABS */}
      <div className="w-full mb-8 flex flex-row items-center justify-between gap-6 border-b border-neutral-900 pb-4">
        <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-neutral-850 relative">
          <button onClick={() => setCurrentView('tts')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentView === 'tts' ? 'bg-[#FF5500] text-white' : 'text-neutral-400 hover:text-white'}`}>
            <i className="fas fa-microphone-lines"></i> Text to Speech
          </button>
          <button onClick={() => setCurrentView('idea')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentView === 'idea' ? 'bg-[#FF5500] text-white' : 'text-neutral-400 hover:text-white'}`}>
            <i className="fas fa-lightbulb"></i> Idea to Script
          </button>
          <button onClick={() => setCurrentView('photo')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentView === 'photo' ? 'bg-[#FF5500] text-white' : 'text-neutral-400 hover:text-white'}`}>
            <i className="fas fa-camera"></i> Photo to Script
          </button>
        </div>
      </div>

      {/* MAIN CORE ENGINE CONTAINER */}
      <div className="w-full">
        {currentView === 'tts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up">
            {/* LEFT FORM SIDE */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-850">
                <button onClick={() => toggleSection('voice')} className="w-full p-4 flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] flex items-center justify-center"><i className="fas fa-microphone-lines text-xs"></i></div>
                    <div className="text-left"><div className="text-xs font-bold text-neutral-200 uppercase">Voice Character</div><div className="text-[10px] text-neutral-400">{VOICE_OPTIONS.find(v => v.id === selectedVoice)?.name}</div></div>
                  </div>
                  <i className={`fas fa-chevron-down text-neutral-500 transition-transform duration-300 ${uiState.voice ? 'rotate-180' : ''}`}></i>
                </button>
                {uiState.voice && (
                  <div className="p-2 space-y-1 max-h-[320px] overflow-y-auto scrollbar-hide border-t border-neutral-900 bg-neutral-950/50">
                    {VOICE_OPTIONS.map(voice => (
                      <div key={voice.id} className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all relative group cursor-pointer ${selectedVoice === voice.id ? 'bg-[#FF5500] text-white shadow-lg' : 'hover:bg-neutral-900 text-neutral-300'}`} onClick={() => setSelectedVoice(voice.id)}>
                        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 font-bold text-[10px] text-neutral-300">{voice.gender === 'Male' ? 'M' : 'F'}</div>
                        <div className="text-left flex-1 min-w-0"><div className="flex items-center justify-between"><span className="font-bold text-sm truncate">{voice.name}</span><span className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-850 text-neutral-400">{voice.style}</span></div><p className="text-[10px] opacity-70 truncate">{voice.desc}</p></div>
                        <div onClick={(e) => handlePreview(e, voice.id)} className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all z-20 shrink-0 ${previewState.playingVoiceId === voice.id ? 'bg-white text-black scale-110' : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-400'}`}>
                          {previewState.playingVoiceId === voice.id && previewState.isLoading ? <i className="fas fa-circle-notch fa-spin text-xs"></i> : previewState.playingVoiceId === voice.id ? <i className="fas fa-stop text-xs"></i> : <i className="fas fa-play text-xs pl-0.5"></i>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-850">
                <button onClick={() => toggleSection('style')} className="w-full p-4 flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-neutral-800 text-[#FF5500] flex items-center justify-center"><i className="fas fa-sliders text-xs"></i></div><div className="text-left"><div className="text-xs font-bold text-neutral-200 uppercase">Vocal Delivery Style</div><div className="text-[10px] text-neutral-400">{DELIVERY_STYLES.find(s => s.id === selectedStyle)?.name}</div></div></div><i className={`fas fa-chevron-down text-neutral-500 transition-transform duration-300 ${uiState.style ? 'rotate-180' : ''}`}></i>
                </button>
                {uiState.style && (
                  <div className="p-2 grid grid-cols-1 gap-1 max-h-[350px] overflow-y-auto scrollbar-hide border-t border-neutral-900 bg-neutral-950/50">
                    {DELIVERY_STYLES.map(style => (
                      <div key={style.id} className={`w-full p-1 rounded-lg transition-all ${selectedStyle === style.id ? 'bg-neutral-900 border border-neutral-850 shadow-md' : ''}`}>
                        <button onClick={() => setSelectedStyle(style.id)} className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${selectedStyle === style.id ? 'bg-[#FF5500] text-white shadow-lg' : 'hover:bg-neutral-900 text-neutral-400'}`}>
                          <i className={`fas ${style.icon} w-5 text-center`}></i>
                          <span className="font-medium text-sm flex-1 text-left">{style.name}</span>
                          {selectedStyle === style.id && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">{styleIntensity}/10</span>}
                        </button>
                        {selectedStyle === style.id && (
                          <div className="mt-2 mb-1 px-3 py-2 bg-neutral-950 rounded-lg border border-neutral-900">
                            <div className="flex justify-between items-center mb-1.5"><span className="text-[10px] font-bold text-[#FF5500] uppercase tracking-wider">Level Intensitas</span><span className="text-[10px] font-mono text-neutral-400">{styleIntensity === 0 ? "Normal" : styleIntensity === 10 ? "Ekstrem" : `${styleIntensity * 10}%`}</span></div>
                            <input type="range" min="0" max="10" step="1" value={styleIntensity} onChange={(e) => setStyleIntensity(Number(e.target.value))} className="w-full accent-[#FF5500]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-850 shadow-lg shadow-[#FF5500]/5">
                {renderSpeedControl()}
              </div>

              <div className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-850">
                <button onClick={() => toggleSection('control')} className="w-full p-4 flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 flex items-center justify-center"><i className="fas fa-wave-square text-xs"></i></div><div className="text-left"><div className="text-xs font-bold text-neutral-200 uppercase">Other Tuning Controls</div><div className="text-[10px] text-neutral-400">Pitch, Weight, Volume</div></div></div><i className={`fas fa-chevron-down text-neutral-500 transition-transform duration-300 ${uiState.control ? 'rotate-180' : ''}`}></i>
                </button>
                {uiState.control && (
                  <div className="p-5 space-y-6 border-t border-neutral-900 bg-neutral-950/50">
                    {renderKnob("Pitch (Nada)", pitch, setPitch, -5, 5, "Deep", "High")}
                    {renderKnob("Weight (Ketebalan)", weight, setWeight, -5, 5, "Thin", "Heavy")}
                    {renderKnob("Volume (Kekuatan)", volume, setVolume, -5, 5, "Soft", "Loud")}
                    {renderKnob("Articulation (Artikulasi)", articulation, setArticulation, -5, 5, "Relaxed", "Sharp")}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT TEXTAREA EDITOR */}
            <div className="lg:col-span-8 flex flex-col h-full space-y-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {[{ label: "Mendesah", code: "(mendesah)" }, { label: "Tertawa", code: "(tertawa)" }, { label: "Sedih", code: "(sedih)" }, { label: "Batuk", code: "(batuk)" }, { label: "Marah", code: "(marah)" }].map(tag => (
                  <button key={tag.code} onClick={() => {
                    const textarea = textareaRef.current;
                    if (textarea) {
                      const start = textarea.selectionStart; const end = textarea.selectionEnd;
                      const currentText = text;
                      const before = currentText.substring(0, start); const after = currentText.substring(end);
                      const newText = before + (before.length > 0 && !before.endsWith(' ') ? ' ' : '') + tag.code + (after.length > 0 && !after.startsWith(' ') ? ' ' : '') + after;
                      setText(newText);
                      setTimeout(() => {
                        textarea.focus();
                        const finalPos = before.length + (before.length > 0 && !before.endsWith(' ') ? 1 : 0) + tag.code.length;
                        textarea.setSelectionRange(finalPos, finalPos);
                      }, 0);
                    } else {
                      setText(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + tag.code);
                    }
                  }} className="px-3 py-1.5 rounded-full bg-neutral-950 text-[10px] font-bold text-neutral-300 hover:bg-[#FF5500] hover:text-white transition-colors border border-neutral-850">
                    + {tag.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-h-[300px] bg-neutral-950 rounded-2xl p-1 relative flex flex-col border border-neutral-850 focus-within:border-[#FF5500]/50 transition-all">
                <div className="absolute top-0 left-0 right-0 h-10 bg-neutral-900/60 rounded-t-2xl flex items-center justify-between px-4 border-b border-neutral-900"><span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Script Editor Panel</span><span className="text-[9px] text-[#FF5500] font-medium">Gunakan tanda baca emosi untuk artikulasi AI</span></div>
                <textarea ref={textareaRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ketik atau paste naskah iklan promosi Anda di sini...&#10;Contoh:&#10;Halo partner MoStu! (semangat)&#10;Sudahkah bisnis Anda bertransformasi ke ekosistem digital? (ceria)" className="w-full flex-1 bg-transparent border-none text-neutral-200 p-6 pt-14 focus:ring-0 outline-none resize-none text-base leading-relaxed placeholder-neutral-700 font-light" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <button onClick={fixArticulation} disabled={articulationProcessing || !text} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border shadow-sm ${articulationProcessing ? 'bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]/30 cursor-wait' : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-[#FF5500] hover:border-[#FF5500]/30'}`}>{articulationProcessing ? <><i className="fas fa-circle-notch fa-spin"></i><span>Optimizing...</span></> : <><i className="fas fa-wand-magic-sparkles"></i><span>AI Prosody Fixer</span></>}</button>
                  <div className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded border border-neutral-850">{text.length} Chars</div>
                </div>
              </div>

              <div className="bg-neutral-950 rounded-xl p-4 flex items-center justify-between transition-all border border-neutral-850">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${autoDetectLanguage ? 'bg-[#FF5500]/10 text-[#FF5500]' : 'bg-neutral-900 text-neutral-500'}`}><i className="fas fa-language"></i></div>
                  <div><div className="text-xs font-bold text-neutral-300 uppercase">Global Language Detective</div><div className="text-[10px] text-neutral-500">Mendeteksi naskah multibahasa secara cerdas</div></div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={autoDetectLanguage} onChange={(e) => setAutoDetectLanguage(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-neutral-950 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5500] peer-checked:after:bg-white"></div>
                </label>
              </div>

              <div className="bg-neutral-950 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-neutral-850">
                <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center ${optimizationMode === 'optimized' ? 'bg-[#FF5500]/10 text-[#FF5500]' : 'bg-neutral-900 text-neutral-500'}`}><i className="fas fa-wand-magic-sparkles"></i></div><div><div className="text-xs font-bold text-neutral-300 uppercase">Director Smart Mode</div><div className="text-[10px] text-neutral-500">{optimizationMode === 'optimized' ? 'AI bertindak mengatur jeda napas & modulasi emosi' : 'Mode standard pembaca naskah'}</div></div></div>
                <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-850"><button onClick={() => setOptimizationMode("original")} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${optimizationMode === "original" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"}`}>Raw</button><button onClick={() => setOptimizationMode("optimized")} className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${optimizationMode === "optimized" ? "bg-[#FF5500] text-white" : "text-neutral-500 hover:text-white"}`}><i className="fas fa-magic text-[10px]"></i>Smart Director</button></div>
              </div>

              <button onClick={generateAudio} disabled={processing.isLoading || !text} className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-xl transition-all relative overflow-hidden group ${processing.isLoading || !text ? "bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-850" : "bg-white text-black hover:bg-neutral-200 active:scale-[0.99]"}`}>
                {processing.isLoading && <div className={`absolute inset-0 opacity-20 ${processing.step === 'baking' ? 'load-grad-orange' : 'load-grad-orange'}`}></div>}
                <div className="relative flex items-center justify-center gap-2">{processing.isLoading ? <><i className="fas fa-circle-notch fa-spin"></i><span>{processing.step === 'analyzing' ? 'ANALYZING VOICE MATRIX...' : processing.step === 'baking' ? 'ENCODING HIGH QUALITY MP3...' : 'SYNTHESIZING AUDIO VOICE...'}</span></> : <><i className="fas fa-play"></i><span>GENERATE VOICE OVER</span></>}</div>
              </button>

              {processing.error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3"><i className="fas fa-exclamation-triangle"></i>{processing.error}</div>}

              {result.previewUrl && !processing.isLoading && (
                <div className="bg-neutral-950 rounded-2xl p-6 space-y-6 border border-neutral-850 border-t-2 border-t-[#FF5500]">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF5500] flex items-center justify-center text-white shadow-lg shadow-[#FF5500]/20 animate-pulse"><i className="fas fa-music text-sm"></i></div>
                    <div className="flex-1 w-full">
                      <audio ref={mainAudioRef} controls src={result.previewUrl} className="w-full h-10 accent-[#FF5500]" />
                      <div className="flex justify-between mt-1 text-[10px] text-neutral-500 font-mono">
                        <span>Preview: {speed.toFixed(1)}x</span>
                        <span>Format: 128kbps Studio MP3</span>
                      </div>
                    </div>
                    {result.downloadUrl && (
                      <a href={result.downloadUrl} download={`MoStu_Voice_${selectedVoice}_${result.downloadSpeed}x.mp3`} className="w-full sm:w-auto h-11 px-5 rounded-xl bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ff6611] transition-all">
                        <span>Download MP3</span><i className="fas fa-download"></i>
                      </a>
                    )}
                  </div>
                  {result.refinedScript && result.modeUsed === 'optimized' && <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-850"><span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2">Director Meta Prompt Logic</span><p className="text-sm text-neutral-400 italic font-light whitespace-pre-line border-l border-[#FF5500] pl-3">"{result.refinedScript}"</p></div>}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'idea' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up">
            <div className="lg:col-span-5">
              <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-850">
                <div className="mb-6 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] flex items-center justify-center"><i className="fas fa-brain"></i></div><div><h2 className="text-lg font-bold text-white">Idea to Script Generator</h2><p className="text-xs text-neutral-500">Ubah konsep mentah jualan menjadi draf teks naskah</p></div></div>
                <div className="space-y-5">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Detail Deskripsi Produk</label><textarea value={ideaForm.description} onChange={(e) => setIdeaForm({ ...ideaForm, description: e.target.value })} placeholder="Contoh: Madu murni hutan lebah liar aceh, berkhasiat tinggi menjaga imunitas..." className="w-full h-24 bg-neutral-900 border border-neutral-850 rounded-lg p-3 text-sm text-neutral-200 focus:border-[#FF5500] outline-none resize-none placeholder-neutral-700" /></div>
                  <div className="space-y-1.5"><div className="flex justify-between items-end"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Unique Selling Point (USP)</label><button onClick={generateUSP} disabled={!ideaForm.description || uspProcessing} className="text-[9px] bg-neutral-900 border border-neutral-850 text-neutral-300 px-2 py-1 rounded hover:text-[#FF5500] hover:border-[#FF5500]/30 transition-all font-mono font-bold">{uspProcessing ? "Extracting..." : "✦ Auto Extract"}</button></div><input type="text" value={ideaForm.usp} onChange={(e) => setIdeaForm({ ...ideaForm, usp: e.target.value })} placeholder="Contoh: Garansi 100% uang kembali jika palsu, kemasan anti tumpah" className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-3 text-sm text-neutral-200 focus:border-[#FF5500] outline-none placeholder-neutral-700" /></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Kategori Penempatan Konten</label><select value={ideaForm.contentType} onChange={(e) => setIdeaForm({ ...ideaForm, contentType: e.target.value })} className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-3 text-sm text-neutral-200 focus:border-[#FF5500] outline-none cursor-pointer"><option>Iklan Media Sosial (TikTok/Reels)</option><option>Iklan Radio / Spotify</option><option>Video Penjelasan Produk (Explainer)</option><option>Narasi Dokumenter Pendek</option><option>Soft Selling Storytelling</option><option>YouTube Educational (Edukasi)</option><option>YouTube Unboxing & Review</option></select></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Bahasa Sasaran</label><select value={ideaForm.language} onChange={(e) => setIdeaForm({ ...ideaForm, language: e.target.value })} className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-3 text-sm text-neutral-200 focus:border-[#FF5500] outline-none cursor-pointer"><option>Bahasa Indonesia</option><option>Bahasa Melayu (Malaysia)</option><option>English (Inggris)</option><option>Japanese (Jepang)</option><option>Mandarin (China)</option></select></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Variasi Hasil</label><div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-850">{[1, 3, 5].map(num => <button key={num} onClick={() => setIdeaForm({ ...ideaForm, count: num })} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${ideaForm.count === num ? "bg-[#FF5500] text-white" : "text-neutral-500 hover:text-white"}`}>{num} Script</button>)}</div></div>
                  <button onClick={generateIdeas} disabled={ideaProcessing || !ideaForm.description || !ideaForm.usp} className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all relative overflow-hidden mt-2 ${ideaProcessing || !ideaForm.description || !ideaForm.usp ? "bg-neutral-900 text-neutral-600 border border-neutral-850 cursor-not-allowed" : "bg-white text-black hover:bg-neutral-200 active:scale-[0.99]"}`}>{ideaProcessing && <div className="absolute inset-0 load-grad-teal opacity-20"></div>}<span>{ideaProcessing ? "PROCESSING SCHEME..." : "GENERATE CONCEPT SCRIPT"}</span></button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col h-full">
              {generatedIdeas.length > 0 ? (
                <div className="space-y-4 animate-slide-up"><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-mono">Output Results ({generatedIdeas.length})</h3><button onClick={() => setGeneratedIdeas([])} className="text-xs text-neutral-500 hover:text-red-400"><i className="fas fa-trash mr-1"></i> Wipe Cache</button></div><div className="grid gap-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-hide">{generatedIdeas.map((script, idx) => <div key={idx} className="bg-neutral-950 p-5 rounded-xl border border-neutral-850 hover:border-[#FF5500]/30 transition-all group"><span className="bg-neutral-900 border border-neutral-850 text-[#FF5500] text-[9px] font-bold font-mono px-2 py-1 rounded block w-fit mb-3">VERSION #{idx + 1}</span><p className="text-neutral-300 text-sm leading-relaxed mb-4 font-light">{script}</p><button onClick={() => { setText(script); setCurrentView('tts'); }} className="w-full py-2.5 bg-neutral-900 hover:bg-[#FF5500] text-neutral-400 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-neutral-850 hover:border-transparent"><span>Kirim Ke Voice Deck Editor</span><i className="fas fa-arrow-right"></i></button></div>)}</div></div>
              ) : <div className="h-full min-h-[400px] bg-neutral-950 rounded-xl border border-neutral-850 flex flex-col items-center justify-center p-8 text-center opacity-60"><div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center text-neutral-600 text-xl mb-4"><i className="fas fa-lightbulb"></i></div><h3 className="text-md font-bold text-neutral-400">Panel Draf Ide Kosong</h3><p className="text-xs text-neutral-500 max-w-xs mt-1">Konfigurasi materi marketing di bilik kiri untuk meluncurkan ide script naskah.</p></div>}
            </div>
          </div>
        )}

        {currentView === 'photo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up">
            <div className="lg:col-span-5">
              <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-850">
                <div className="mb-6 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] flex items-center justify-center"><i className="fas fa-camera"></i></div><div><h2 className="text-lg font-bold text-white">Photo Visual Script Analyzer</h2><p className="text-xs text-neutral-500">Gunakan kecerdasan visi produk untuk merancang skenario narasi audio</p></div></div>
                <div className="space-y-5">
                  <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden ${photoForm.imageData ? 'border-[#FF5500] bg-[#FF5500]/5' : 'border-neutral-800 hover:border-[#FF5500]/40 hover:bg-neutral-900/40'}`}><input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />{photoForm.imageData ? <><img src={`data:${photoForm.mimeType || 'image/jpeg'};base64,${photoForm.imageData}`} className="absolute inset-0 w-full h-full object-cover opacity-40" /><div className="z-10 bg-black/70 p-2 rounded-lg text-white text-xs border border-neutral-800 flex items-center gap-2"><i className="fas fa-check text-[#FF5500]"></i>{photoForm.imageName}</div><div className="absolute bottom-2 text-[10px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-850">Ganti Dokumen Foto</div></> : <div className="text-center p-4"><div className="w-10 h-10 bg-neutral-900 border border-neutral-850 rounded-full flex items-center justify-center mx-auto mb-2 text-neutral-500 group-hover:text-[#FF5500] transition-colors"><i className="fas fa-cloud-upload-alt text-base"></i></div><p className="text-xs font-bold text-neutral-400">Upload Snap Foto Produk</p></div>}</div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pilar Gaya Konten</label><div className="grid grid-cols-2 gap-2">{[{ label: "TikTok Affiliate", val: "TikTok Affiliate" }, { label: "Edukasi / Tips", val: "Edukasi" }, { label: "Konten Iklan", val: "Konten Iklan" }, { label: "YouTube Content", val: "YouTube Content" }, { label: "Unboxing Review", val: "Unboxing Review" }].map((opt) => (<button key={opt.val} onClick={() => setPhotoForm({ ...photoForm, contentType: opt.val })} className={`p-2.5 rounded-xl text-[10px] font-bold border transition-all text-left truncate ${photoForm.contentType === opt.val ? "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]" : "bg-neutral-900 border-neutral-850 hover:bg-neutral-850 text-neutral-400"}`}>{opt.label}</button>))}</div></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Bahasa Script</label><select value={photoForm.language} onChange={(e) => setPhotoForm({ ...photoForm, language: e.target.value })} className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-3 text-sm text-neutral-200 focus:border-[#FF5500] outline-none cursor-pointer"><option>Bahasa Indonesia</option><option>English (International)</option><option>Japanese (Jepang)</option><option>Chinese (Mandarin)</option></select></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Spesifikasi Demografi Target</label><div className="grid grid-cols-2 gap-3"><div className="space-y-1"><select value={photoForm.targetAge} onChange={(e) => setPhotoForm({ ...photoForm, targetAge: e.target.value })} className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-neutral-200 focus:border-[#FF5500] outline-none cursor-pointer"><option>Gen Z (18 - 24 Tahun)</option><option>Millennials (25 - 40 Tahun)</option><option>Gen X (41 - 55 Tahun)</option></select></div><div className="space-y-1"><select value={photoForm.targetGender} onChange={(e) => setPhotoForm({ ...photoForm, targetGender: e.target.value })} className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-neutral-200 focus:border-[#FF5500] outline-none cursor-pointer"><option>Semua Gender</option><option>Wanita</option><option>Pria</option></select></div></div></div>
                  <button onClick={generateScriptsFromPhoto} disabled={photoProcessing || !photoForm.imageData} className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all relative overflow-hidden mt-2 ${photoProcessing || !photoForm.imageData ? "bg-neutral-900 text-neutral-600 border border-neutral-850 cursor-not-allowed" : "bg-white text-black hover:bg-neutral-200 active:scale-[0.99]"}`}>{photoProcessing && <div className="absolute inset-0 load-grad-pink opacity-20"></div>}<span>{photoProcessing ? "SCANNING VISUAL TEXTURE..." : "LAUNCH PHOTO TO SCRIPT"}</span></button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col h-full">
              {generatedPhotoScripts.length > 0 ? (
                <div className="space-y-4 animate-slide-up"><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-mono">Vision Analytics Results ({generatedPhotoScripts.length})</h3><button onClick={() => setGeneratedPhotoScripts([])} className="text-xs text-neutral-500 hover:text-red-400"><i className="fas fa-trash mr-1"></i> Purge</button></div><div className="grid gap-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-hide">{generatedPhotoScripts.map((script, idx) => <div key={idx} className="bg-neutral-950 p-5 rounded-xl border border-neutral-850 hover:border-[#FF5500]/30 transition-all group"><span className="bg-neutral-900 border border-neutral-850 text-[#FF5500] text-[9px] font-mono font-bold px-2 py-1 rounded block w-fit mb-2">OPTION #{idx + 1}</span><p className="text-neutral-300 text-sm leading-relaxed mb-4 font-light border-l border-neutral-800 pl-3">{script}</p><button onClick={() => { setText(script); setCurrentView('tts'); }} className="w-full py-2.5 bg-neutral-900 hover:bg-[#FF5500] text-neutral-400 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-neutral-850 hover:border-transparent"><span>Inject To Script Editor Deck</span><i className="fas fa-arrow-right"></i></button></div>)}</div></div>
              ) : <div className="h-full min-h-[400px] bg-neutral-950 rounded-xl border border-neutral-850 flex flex-col items-center justify-center p-8 text-center opacity-60"><div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center text-neutral-600 text-xl mb-4"><i className="fas fa-images"></i></div><h3 className="text-md font-bold text-neutral-400">Preview Script Render</h3><p className="text-xs text-neutral-500 max-w-xs mt-1">Lampirkan file gambar produk pada deck kiri untuk meluncurkan scan visi AI.</p></div>}
            </div>
          </div>
        )}
      </div>

      {/* FLOATING ACTION PREVIEW BANNER LAYER */}
      {previewState.playingVoiceId && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[99] animate-slide-up">
          <div className="bg-neutral-950 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-4 border border-[#FF5500]/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF5500] flex items-center justify-center shadow-lg shadow-[#FF5500]/20">
                {previewState.isLoading ? <i className="fas fa-circle-notch fa-spin text-xs"></i> : <i className="fas fa-volume-high text-xs"></i>}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-[#FF5500] tracking-widest font-mono">STREAM PREVIEW</span>
                <span className="text-sm font-bold text-neutral-200">{VOICE_OPTIONS.find(v => v.id === previewState.playingVoiceId)?.name}</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-800"></div>
            <div className="flex gap-0.5 h-4 items-center px-1">
              <div className="mostu-bar" style={{ animationDelay: '0s' }}></div>
              <div className="mostu-bar" style={{ animationDelay: '0.1s' }}></div>
              <div className="mostu-bar" style={{ animationDelay: '0.2s' }}></div>
              <div className="mostu-bar" style={{ animationDelay: '0.3s' }}></div>
              <div className="mostu-bar" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-800"></div>
            <button onClick={stopPreview} className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer">
              <i className="fas fa-stop text-xs"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}