// ================= TERMINE (Monat 11 = Dezember in JavaScript) =================
const DOOMSDAY_CINEMA_DATE = new Date(2026, 11, 30, 20, 0, 0);
const DOOMSDAY_RELEASE_DATE = new Date(2026, 11, 16, 0, 0, 0);

const DUNE_CINEMA_DATE = new Date(2026, 11, 30, 16, 0, 0);
const DUNE_RELEASE_DATE = new Date(2026, 11, 17, 0, 0, 0);

// ================= FAVICONS, TRAILER-LINKS & MUSIK JE WELT =================
const WORLD_ASSETS = {
  doomsday: {
    favicon: "./doom_fav.png",
    trailerUrl: "https://www.youtube.com/watch?v=4nHEbnIUEHg",
    trailerLabel: "Avengers: Doomsday Trailer auf YouTube öffnen",
    musicUrl: "./doom_music.m4a"
  },
  dune: {
    favicon: "./dune_fav.png",
    trailerUrl: "https://www.youtube.com/watch?v=OByq4ZRwZLM",
    trailerLabel: "Dune: Part Three Trailer auf YouTube öffnen",
    musicUrl: "./dune_music.m4a"
  }
};

// Ganz leiser Start: Regler auf 20 % (entspricht flüsterleisen 4 % Rohpegel), Maximum 20 % Rohpegel
const MASTER_VOLUME_SCALE = 0.12;
const DEFAULT_SLIDER_VOLUME = 0.1;

const STORAGE_KEY = "doomsday_watchlist_tracker_v1";

// Deine feste Disney+ Reihenfolge inkl. Loki (S1 & S2), VisionQuest-Folgentiteln & Brand New Day
const WATCHLIST_DATA = [
  { id: "xmen1", title: "X-Men", year: 2000, type: "movie", runtime: 104, note: "Start der klassischen Mutanten-Reihe" },
  { id: "xmen2", title: "X-Men 2", year: 2003, type: "movie", runtime: 134, note: "Vertieft das X-Men-Team & Nightcrawler" },
  { id: "cap1", title: "Captain America: The First Avenger", year: 2011, type: "movie", runtime: 124, note: "Ursprung von Steve Rogers & Peggy Carter" },
  { id: "avengers1", title: "Marvel's The Avengers", year: 2012, type: "movie", runtime: 143, note: "Erstes Zusammentreffen der Avengers & Loki" },
  { id: "infinitywar", title: "Avengers: Infinity War", year: 2018, type: "movie", runtime: 149, note: "Der große Wendepunkt des MCU" },
  { id: "endgame", title: "Avengers: Endgame", year: 2019, type: "movie", runtime: 181, note: "Direkte erzählerische Grundlage für Doomsday" },
  {
    id: "loki",
    title: "Loki",
    year: "2021–2023",
    type: "series",
    note: "Staffel 1 & 2 • TVA, Zeitlinien & das Multiversum",
    episodes: [
      { id: "loki_s1_e1", season: "Staffel 1", title: "Folge 1: Glorreiche Bestimmung", runtime: 51 },
      { id: "loki_s1_e2", season: "Staffel 1", title: "Folge 2: Die Variante", runtime: 54 },
      { id: "loki_s1_e3", season: "Staffel 1", title: "Folge 3: Lamentis", runtime: 42 },
      { id: "loki_s1_e4", season: "Staffel 1", title: "Folge 4: Der Nexus-Vorfall", runtime: 49 },
      { id: "loki_s1_e5", season: "Staffel 1", title: "Folge 5: Reise ins Ungewisse", runtime: 49 },
      { id: "loki_s1_e6", season: "Staffel 1", title: "Folge 6: Für alle Zeit. Immer.", runtime: 46 },
      { id: "loki_s2_e1", season: "Staffel 2", title: "Folge 1: Ouroboros", runtime: 45 },
      { id: "loki_s2_e2", season: "Staffel 2", title: "Folge 2: Breaking Brad", runtime: 49 },
      { id: "loki_s2_e3", season: "Staffel 2", title: "Folge 3: 1893", runtime: 53 },
      { id: "loki_s2_e4", season: "Staffel 2", title: "Folge 4: Herz der TVA", runtime: 48 },
      { id: "loki_s2_e5", season: "Staffel 2", title: "Folge 5: Wissenschaft/Fiktion", runtime: 44 },
      { id: "loki_s2_e6", season: "Staffel 2", title: "Folge 6: Glorreiche Bestimmung", runtime: 56 }
    ]
  },
  { id: "shangchi", title: "Shang-Chi and the Legend of the Ten Rings", year: 2021, type: "movie", runtime: 132, note: "Shang-Chi & das Geheimnis der Zehn Ringe" },
  { id: "nowayhome", title: "Spider-Man: No Way Home", year: 2021, type: "movie", runtime: 148, note: "Großes Multiversums-Crossover" },
  { id: "wakandaforever", title: "Black Panther: Wakanda Forever", year: 2022, type: "movie", runtime: 161, note: "Shuri, Wakanda & Namor" },
  { id: "bravenewworld", title: "Captain America: Brave New World", year: 2025, type: "movie", runtime: 118, note: "Sam Wilson als Captain America" },
  { id: "deadpool3", title: "Deadpool & Wolverine", year: 2024, type: "movie", runtime: 128, note: "Brücke zwischen TVA & X-Men-Welt" },
  { id: "drstrange2", title: "Doctor Strange in the Multiverse of Madness", year: 2022, type: "movie", runtime: 126, note: "Erklärt Inkusionen zwischen Universen" },
  { id: "thunderbolts", title: "Thunderbolts*", year: 2025, type: "movie", runtime: 126, note: "Formierung des neuen Teams um Yelena Belova" },
  { id: "f4", title: "The Fantastic Four: First Steps", year: 2025, type: "movie", runtime: 115, note: "Einführung der Fantastic Four in ihrer Welt" },
  {
    id: "visionquest",
    title: "VisionQuest",
    year: 2026,
    type: "series",
    note: "Miniserie rund um Vision (8 Folgen)",
    episodes: [
      { id: "vq_e1", title: "Folge 1: Keine Fäden", runtime: 56 },
      { id: "vq_e2", title: "Folge 2: Theseus", runtime: 48 },
      { id: "vq_e3", title: "Folge 3: Neustart", runtime: 53 },
      { id: "vq_e4", title: "Folge 4: Malware", runtime: 50 },
      { id: "vq_e5", title: "Folge 5: Firewall", runtime: 46 },
      { id: "vq_e6", title: "Folge 6: Sackgasse", runtime: 54 },
      { id: "vq_e7", title: "Folge 7: Opferung", runtime: 65 },
      { id: "vq_e8", title: "Folge 8: Für immer", runtime: 72 }
    ]
  },
  { id: "brandnewday", title: "Spider-Man: Brand New Day", year: 2026, type: "movie", runtime: 144, note: "Der letzte große Baustein vor Doomsday" }
];

// Deine Dune-Watchlist (Teil 1 & Teil 2)
const DUNE_WATCHLIST_DATA = [
  { id: "dune1", title: "Dune: Part One", year: 2021, runtime: 155, note: "Paul Atreides' Reise nach Arrakis & der Fall seines Hauses" },
  { id: "dune2", title: "Dune: Part Two", year: 2024, runtime: 166, note: "Paul bei den Fremen & der Kampf um die Zukunft von Arrakis" }
];

// ================= PLANETEN-DATEN =================
const PLANET_LORE = {
  vormir: {
    name: "Vormir",
    color: "#7dd3fc",
    softColor: "rgba(125, 211, 252, 0.28)",
    glow: "rgba(125, 211, 252, 0.92)",
    calloutDir: "up-right",
    about: "Abgelegener, von Nebeln und schroffen Gipfeln geprägter Planet im Kosmos, auf dem der Seelenstein verborgen lag.",
    status: "Intakt",
    details: "Nach Thanos' Schnips wurde der Seelenstein in Avengers: Endgame (2019) wieder nach Vormir zurückgebracht; der Planet selbst besteht weiterhin."
  },
  niflheim: {
    name: "Niflheim",
    color: "#bae6fd",
    softColor: "rgba(186, 230, 253, 0.28)",
    glow: "rgba(186, 230, 253, 0.92)",
    calloutDir: "up-right",
    about: "Kaltes, eis- und nebelverhangenes Reich der Neun Welten rund um den Weltenbaum Yggdrasil.",
    status: "Intakt",
    details: "Gehört als eines der Neun Reiche weiterhin zum kosmischen Gefüge rund um Yggdrasil."
  },
  aakon: {
    name: "Aakon",
    color: "#c084fc",
    softColor: "rgba(192, 132, 252, 0.28)",
    glow: "rgba(192, 132, 252, 0.95)",
    calloutDir: "down-right",
    about: "Entlegener Himmelskörper tief im Marvel-Kosmos aus dem Umfeld der kosmischen Völker und Guardians-Geschichten.",
    status: "Intakt",
    details: "Bestehender Himmelskörper im weiten Kosmos des Marvel-Universums."
  },
  ego: {
    name: "Ego",
    color: "#2dd4bf",
    softColor: "rgba(45, 212, 191, 0.28)",
    glow: "rgba(45, 212, 191, 0.96)",
    calloutDir: "up-left",
    about: "Ein lebendiger Planet und Celestial – zugleich der biologische Vater von Peter Quill (Star-Lord).",
    status: "Zerstört in: Guardians of the Galaxy Vol. 2 (2017)",
    details: "Zerstört, weil Ego mit seinem Lichtkern tausende andere Welten auslöschen wollte, um sich auszubreiten – Baby Groot brachte eine Sprengladung an seinem Gehirnkern an."
  },
  muspelheim: {
    name: "Muspelheim",
    color: "#fb923c",
    softColor: "rgba(251, 146, 60, 0.28)",
    glow: "rgba(251, 146, 60, 0.96)",
    calloutDir: "up-right",
    about: "Vulkanisches, glühend heißes Reich der Feuerdämonen rund um den Herrscher Surtur.",
    status: "Intakt",
    details: "Heimat der Ewigen Flamme, mit der Surtur in Thor: Tag der Entscheidung (2017) Asgard zerstörte; Muspelheim selbst bleibt als Reich bestehen."
  }
};

// ================= EGO-EXPLOSIONSZUSTAND =================
const egoBlast = {
  mode: "intact", // "intact" | "exploding" | "destroyed" | "reforming"
  timer: 0,
  chunks: [],
  sparks: []
};

function createEgoDebris() {
  const chunks = [];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const baseAngle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
    const isCore = i % 3 === 0;
    const polyPts = [];
    const sides = 5 + (i % 3);
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2;
      const rad = 0.65 + Math.random() * 0.48;
      polyPts.push([Math.cos(a) * rad, Math.sin(a) * rad]);
    }
    chunks.push({
      angle: baseAngle,
      startDist: 0.1 + Math.random() * 0.62,
      blastDist: 1.05 + Math.random() * 1.4,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: 0.03 + Math.random() * 0.025,
      sizeRatio: isCore ? 0.08 + Math.random() * 0.07 : 0.1 + Math.random() * 0.11,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.09,
      isCore,
      tone: i % 2 === 0 ? "#8c3322" : "#4a1511",
      polyPts
    });
  }

  const sparks = [];
  for (let k = 0; k < 32; k++) {
    sparks.push({
      angle: Math.random() * Math.PI * 2,
      speed: 2.2 + Math.random() * 4.6,
      dist: 0,
      size: 6 + Math.random() * 10,
      isCyan: k % 3 !== 0,
      life: 1,
      decay: 0.022 + Math.random() * 0.018
    });
  }

  egoBlast.chunks = chunks;
  egoBlast.sparks = sparks;
}

function triggerEgoExplosion() {
  createEgoDebris();
  egoBlast.mode = "exploding";
  egoBlast.timer = 0;
}

function triggerEgoReform() {
  if (egoBlast.mode === "exploding" || egoBlast.mode === "destroyed") {
    egoBlast.mode = "reforming";
    egoBlast.timer = 0;
  }
}

function resetEgoIntact() {
  egoBlast.mode = "intact";
  egoBlast.timer = 0;
  egoBlast.chunks = [];
  egoBlast.sparks = [];
}

// ================= SPEICHERUNG (LOCALSTORAGE) =================
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return {
        watchedMovies: saved.watchedMovies || {},
        watchedEpisodes: saved.watchedEpisodes || {},
        watchedDune: saved.watchedDune || {}
      };
    }
  } catch (e) {
    console.warn("Konnte lokalen Speicher nicht lesen:", e);
  }
  return {
    watchedMovies: {},
    watchedEpisodes: {},
    watchedDune: {}
  };
}

let state = loadState();
let activeWorld = "doomsday";
let activePage = "countdown";
const openAccordions = {};
let lastCheckedCardId = null;
let lastCheckedDuneId = null;

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Konnte lokalen Speicher nicht schreiben:", e);
  }
}

// ================= LEICHTE KLICK-ENERGIEWELLE (OHNE CURSOR-LAG) =================
function initClickRipple() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  window.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.setProperty("--rx", `${e.clientX}px`);
      ripple.style.setProperty("--ry", `${e.clientY}px`);
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    },
    { passive: true }
  );
}

// ================= DEZENTER MUSIKPLAYER IN DER NAVIGATIONSLEISTE =================
let loadedMusicWorld = "doomsday";
let lastNonZeroVolume = DEFAULT_SLIDER_VOLUME;
let autoplayPending = false;
let userPausedMusic = false;

// Regler 0..1 skaliert direkt auf 0..20 % der Originallautstärke (bei Start 20 % => 4 % Rohpegel)
function computeAudioVolume(sliderVal) {
  const clamped = Math.max(0, Math.min(1, sliderVal));
  if (clamped <= 0.001) return 0;
  return clamped * MASTER_VOLUME_SCALE;
}

function updateVolumeSliderVisual() {
  const slider = document.getElementById("audio-volume-slider");
  const iconVol = document.getElementById("audio-icon-vol");
  const iconMuted = document.getElementById("audio-icon-muted");
  if (!slider) return;

  const val = parseFloat(slider.value);
  const pct = Math.round(val * 100);
  const accent = activeWorld === "dune" ? "#fbbf24" : "#6ee7b7";
  slider.style.background = `linear-gradient(90deg, ${accent} 0%, ${accent} ${pct}%, rgba(226, 232, 240, 0.24) ${pct}%, rgba(226, 232, 240, 0.24) 100%)`;

  const isMuted = val <= 0.001;
  if (iconVol) iconVol.style.display = isMuted ? "none" : "block";
  if (iconMuted) iconMuted.style.display = isMuted ? "block" : "none";
}

function updatePlayPauseVisual(isPlaying) {
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const iconPlay = document.getElementById("audio-icon-play");
  const iconPause = document.getElementById("audio-icon-pause");

  if (iconPlay) iconPlay.style.display = isPlaying ? "none" : "block";
  if (iconPause) iconPause.style.display = isPlaying ? "block" : "none";
  if (toggleBtn) {
    toggleBtn.classList.toggle("is-playing", isPlaying);
    toggleBtn.setAttribute("aria-label", isPlaying ? "Musik pausieren" : "Musik abspielen");
  }
}

function removeAutoplayListeners() {
  autoplayPending = false;
  document.removeEventListener("pointerdown", handleFirstUserInteraction, true);
  document.removeEventListener("keydown", handleFirstUserInteraction, true);
}

function handleFirstUserInteraction(e) {
  if (!autoplayPending || userPausedMusic) {
    removeAutoplayListeners();
    return;
  }

  const target = e.target;
  if (target && typeof target.closest === "function") {
    if (target.closest("#audio-toggle-btn")) {
      removeAutoplayListeners();
      return;
    }
    if (target.closest("[data-world]") || target.closest("[data-jump-world]")) {
      return;
    }
    if (target.closest("#nav-trailer-link")) {
      return;
    }
  }

  const audio = document.getElementById("world-audio");
  const slider = document.getElementById("audio-volume-slider");
  removeAutoplayListeners();
  if (!audio) return;

  if (slider) {
    audio.volume = computeAudioVolume(parseFloat(slider.value));
  }

  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => updatePlayPauseVisual(false));
  }
}

function syncWorldMusic(world) {
  const audio = document.getElementById("world-audio");
  const slider = document.getElementById("audio-volume-slider");
  if (!audio) return;

  updateVolumeSliderVisual();

  if (loadedMusicWorld === world) return;
  loadedMusicWorld = world;

  const assets = WORLD_ASSETS[world] || WORLD_ASSETS.doomsday;
  const shouldResume = !audio.paused || (autoplayPending && !userPausedMusic);

  if (autoplayPending) {
    removeAutoplayListeners();
  }

  audio.pause();
  audio.src = assets.musicUrl;
  audio.load();

  if (slider) {
    const sliderVal = parseFloat(slider.value);
    audio.volume = computeAudioVolume(sliderVal);
    audio.muted = sliderVal <= 0.001;
  }

  if (shouldResume) {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        updatePlayPauseVisual(false);
      });
    }
  }
}

function initNavAudioPlayer() {
  const audio = document.getElementById("world-audio");
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const muteBtn = document.getElementById("audio-mute-btn");
  const slider = document.getElementById("audio-volume-slider");
  if (!audio || !toggleBtn || !slider) return;

  slider.value = String(DEFAULT_SLIDER_VOLUME);
  audio.volume = computeAudioVolume(DEFAULT_SLIDER_VOLUME);
  updateVolumeSliderVisual();
  updatePlayPauseVisual(false);

  // Direkt beim Laden starten; falls der Browser Autoplay blockiert, startet der erste Klick automatisch
  const initialPlay = audio.play();
  if (initialPlay && typeof initialPlay.catch === "function") {
    initialPlay.catch(() => {
      autoplayPending = true;
      updatePlayPauseVisual(false);
      document.addEventListener("pointerdown", handleFirstUserInteraction, true);
      document.addEventListener("keydown", handleFirstUserInteraction, true);
    });
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeAutoplayListeners();
    if (audio.paused) {
      userPausedMusic = false;
      audio.volume = computeAudioVolume(parseFloat(slider.value));
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((err) => {
          console.warn("Musik konnte nicht gestartet werden:", err);
          updatePlayPauseVisual(false);
        });
      }
    } else {
      userPausedMusic = true;
      audio.pause();
    }
  });

  slider.addEventListener("input", (e) => {
    e.stopPropagation();
    const sliderVal = parseFloat(slider.value);
    audio.volume = computeAudioVolume(sliderVal);
    audio.muted = sliderVal <= 0.001;
    if (sliderVal > 0.02) {
      lastNonZeroVolume = sliderVal;
    }
    updateVolumeSliderVisual();
  });

  if (muteBtn) {
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentSliderVal = parseFloat(slider.value);
      if (currentSliderVal > 0.001 && !audio.muted) {
        lastNonZeroVolume = currentSliderVal;
        audio.volume = 0;
        audio.muted = true;
        slider.value = "0";
      } else {
        const restoreVal = lastNonZeroVolume > 0.05 ? lastNonZeroVolume : DEFAULT_SLIDER_VOLUME;
        audio.volume = computeAudioVolume(restoreVal);
        audio.muted = false;
        slider.value = String(restoreVal);
      }
      updateVolumeSliderVisual();
    });
  }

  audio.addEventListener("play", () => updatePlayPauseVisual(true));
  audio.addEventListener("pause", () => updatePlayPauseVisual(false));
  audio.addEventListener("ended", () => updatePlayPauseVisual(false));
}

// ================= FAVICON, TRAILER-LINK & MUSIK JE WELT AKTUALISIEREN =================
function updateWorldAssets(world) {
  const assets = WORLD_ASSETS[world] || WORLD_ASSETS.doomsday;

  const faviconEl = document.getElementById("favicon");
  if (faviconEl) {
    faviconEl.setAttribute("href", assets.favicon);
  }

  const appleIconEl = document.getElementById("apple-touch-icon");
  if (appleIconEl) {
    appleIconEl.setAttribute("href", assets.favicon);
  }

  const trailerLinkEl = document.getElementById("nav-trailer-link");
  if (trailerLinkEl) {
    trailerLinkEl.setAttribute("href", assets.trailerUrl);
    trailerLinkEl.setAttribute("aria-label", assets.trailerLabel);
  }

  syncWorldMusic(world);
}

// ================= DATA-TEXT FÜR 2-SCHICHT-LEUCHTÜBERSCHRIFTEN =================
function initEpicTitleGlow() {
  document.querySelectorAll(".epic-title").forEach(el => {
    el.dataset.text = el.textContent.trim();
  });
}

// ================= HANDY-FREUNDLICHES ANTIPPEN FÜR TIMER-INFOS =================
function initTimerTapToggle() {
  const strips = document.querySelectorAll(".timer-strip");
  strips.forEach(strip => {
    strip.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = strip.classList.contains("is-open");
      strips.forEach(other => other.classList.remove("is-open"));
      if (!wasOpen) {
        strip.classList.add("is-open");
      }
    });
  });

  document.addEventListener("click", () => {
    strips.forEach(strip => strip.classList.remove("is-open"));
  });
}

// ================= OFFENE PLANETEN-BESCHREIBUNG (LINIE OBEN & UNTEN + AUSGEFADETER HINTERGRUND) =================
let planetCardEl = null;
let planetCardTitleEl = null;
let planetCardAboutEl = null;
let planetCardStatusEl = null;
let planetCardDetailsEl = null;
let selectedPlanetKey = null;

function initPlanetClickCard() {
  if (!document.getElementById("planet-open-panel-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "planet-open-panel-styles";
    styleEl.textContent = `
      .planet-open-panel {
        position: fixed;
        right: 1.65rem;
        bottom: 1.65rem;
        width: min(390px, calc(100vw - 2.4rem));
        z-index: 26;
        pointer-events: none;
        background: transparent;
        border: none;
        color: #f8fafc;
        font-family: "Montserrat", "Segoe UI", sans-serif;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        transition: opacity 0.28s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        --planet-color: #6ee7b7;
        --planet-soft: rgba(110, 231, 183, 0.26);
        --planet-glow: rgba(110, 231, 183, 0.85);
      }

      .planet-open-panel::before {
        content: "";
        position: absolute;
        inset: -24px -36px;
        z-index: -1;
        pointer-events: none;
        background: radial-gradient(
          ellipse 72% 68% at 50% 50%,
          rgba(2, 7, 10, 0.86) 0%,
          rgba(2, 7, 10, 0.62) 46%,
          rgba(2, 7, 10, 0.22) 72%,
          transparent 92%
        );
      }

      .planet-open-panel.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        pointer-events: auto;
      }

      .planet-panel-line {
        position: relative;
        height: 1px;
        width: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--planet-soft) 18%,
          var(--planet-color) 50%,
          var(--planet-soft) 82%,
          transparent 100%
        );
        filter: drop-shadow(0 0 6px var(--planet-glow));
        overflow: hidden;
      }

      .planet-panel-line::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 30%;
        height: 100%;
        background: linear-gradient(90deg, transparent, #ffffff, var(--planet-color), transparent);
        will-change: transform, opacity;
        animation: line-sweep 5.5s ease-in-out infinite;
      }

      .planet-panel-line-bottom::after {
        animation-direction: reverse;
        animation-duration: 6.5s;
      }

      .planet-panel-body {
        padding: 0.95rem 0.65rem;
      }

      .planet-panel-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.45rem;
      }

      .planet-panel-title {
        font-family: "Montserrat", "Segoe UI", sans-serif;
        font-size: 0.96rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--planet-color);
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9), 0 0 14px var(--planet-glow);
      }

      .planet-panel-close {
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #94a3b8;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
      }

      .planet-panel-about {
        font-size: 0.78rem;
        line-height: 1.52;
        color: #f1f5f9;
        margin: 0 0 0.55rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.92);
      }

      .planet-panel-status {
        font-size: 0.71rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--planet-color);
        margin-bottom: 0.32rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.92), 0 0 12px var(--planet-glow);
      }

      .planet-panel-details {
        font-size: 0.75rem;
        line-height: 1.5;
        color: #cbd5e1;
        margin: 0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.92);
      }

      @media (max-width: 640px) {
        .planet-open-panel {
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          width: auto;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  const card = document.createElement("aside");
  card.id = "planet-detail-card";
  card.className = "planet-open-panel";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-live", "polite");

  const lineTop = document.createElement("div");
  lineTop.className = "planet-panel-line";
  lineTop.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "planet-panel-body";

  const topRow = document.createElement("div");
  topRow.className = "planet-panel-top";

  const title = document.createElement("div");
  title.className = "planet-panel-title";

  const closeHint = document.createElement("span");
  closeHint.className = "planet-panel-close";
  closeHint.textContent = "Klick zum Schließen";

  const about = document.createElement("p");
  about.className = "planet-panel-about";

  const status = document.createElement("div");
  status.className = "planet-panel-status";

  const details = document.createElement("p");
  details.className = "planet-panel-details";

  const lineBottom = document.createElement("div");
  lineBottom.className = "planet-panel-line planet-panel-line-bottom";
  lineBottom.setAttribute("aria-hidden", "true");

  topRow.appendChild(title);
  topRow.appendChild(closeHint);
  body.appendChild(topRow);
  body.appendChild(about);
  body.appendChild(status);
  body.appendChild(details);

  card.appendChild(lineTop);
  card.appendChild(body);
  card.appendChild(lineBottom);
  document.body.appendChild(card);

  planetCardEl = card;
  planetCardTitleEl = title;
  planetCardAboutEl = about;
  planetCardStatusEl = status;
  planetCardDetailsEl = details;
}

function setSelectedPlanet(planetKey) {
  const prevKey = selectedPlanetKey;
  selectedPlanetKey = planetKey;

  if (planetKey === "ego" && prevKey !== "ego") {
    triggerEgoExplosion();
  } else if (prevKey === "ego" && planetKey !== "ego") {
    triggerEgoReform();
  }

  if (!planetCardEl || !planetCardTitleEl || !planetCardAboutEl || !planetCardStatusEl || !planetCardDetailsEl) return;

  const show = activeWorld === "doomsday" && activePage === "countdown" && Boolean(planetKey && PLANET_LORE[planetKey]);
  if (!show) {
    planetCardEl.classList.remove("is-visible");
    return;
  }

  const info = PLANET_LORE[planetKey];
  planetCardEl.style.setProperty("--planet-color", info.color);
  planetCardEl.style.setProperty("--planet-soft", info.softColor);
  planetCardEl.style.setProperty("--planet-glow", info.glow);

  planetCardTitleEl.textContent = `✦ ${info.name}`;
  planetCardAboutEl.textContent = info.about;
  planetCardStatusEl.textContent = info.status;
  planetCardDetailsEl.textContent = info.details;

  planetCardEl.classList.add("is-visible");

  planetCardEl.onclick = (e) => {
    e.stopPropagation();
    setSelectedPlanet(null);
  };
}

// ================= SMARTE NAVIGATION & THEME-WECHSEL =================
function closeAllSynopses() {
  document.querySelectorAll("[data-synopsis-box]").forEach(box => {
    box.classList.remove("open");
    const btn = box.querySelector(".synopsis-toggle");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
  document.querySelectorAll(".timer-strip.is-open").forEach(strip => {
    strip.classList.remove("is-open");
  });
}

function navigate(world, page) {
  activeWorld = world;
  activePage = page;
  setSelectedPlanet(null);
  document.body.classList.remove("planet-hover");
  if (world !== "doomsday") {
    resetEgoIntact();
  }
  closeAllSynopses();

  const targetViewId = `view-${world}-${page}`;
  document.querySelectorAll(".view").forEach(section => {
    section.classList.toggle("active-view", section.id === targetViewId);
  });

  document.querySelectorAll("[data-world]").forEach(btn => {
    const isThisWorld = btn.dataset.world === world;
    btn.classList.toggle("world-current", isThisWorld);
    btn.classList.toggle("active", isThisWorld && page === "countdown");
  });

  const watchlistBtn = document.getElementById("nav-watchlist-btn");
  if (watchlistBtn) {
    watchlistBtn.classList.toggle("active", page === "watchlist");
  }

  const isDune = world === "dune";
  document.body.classList.toggle("theme-dune", isDune);
  updateWorldAssets(world);

  if (isDune) {
    document.title = page === "watchlist"
      ? "Dune: Part Three – Watchlist"
      : "Dune: Part Three";
  } else {
    document.title = page === "watchlist"
      ? "Avengers: Doomsday – Watchlist"
      : "Avengers: Doomsday";
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

function initNavigation() {
  document.querySelectorAll("[data-world]").forEach(btn => {
    btn.addEventListener("click", () => {
      navigate(btn.dataset.world, "countdown");
    });
  });

  const watchlistBtn = document.getElementById("nav-watchlist-btn");
  if (watchlistBtn) {
    watchlistBtn.addEventListener("click", () => {
      navigate(activeWorld, "watchlist");
    });
  }

  document.querySelectorAll("[data-jump-world]").forEach(btn => {
    btn.addEventListener("click", () => {
      navigate(btn.dataset.jumpWorld, "countdown");
    });
  });
}

// ================= AUFKLAPPBARES "WORUM ES GEHT" =================
function initSynopsisToggles() {
  document.querySelectorAll("[data-synopsis-box]").forEach(box => {
    const btn = box.querySelector(".synopsis-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = box.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

// ================= INTERAKTIVER MAUS-LEUCHTEFFEKT (NUR AM DESKTOP) =================
function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow || window.matchMedia("(hover: none)").matches) return;

  let visible = false;

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!visible) {
        visible = true;
        glow.style.opacity = "1";
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    visible = false;
    glow.style.opacity = "0";
  });
}

// ================= HINTERGRÜNDE IN VOLLER SCHÄRFE =================
function createSprite(size, stops) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const gctx = c.getContext("2d");
  const half = size / 2;
  const grad = gctx.createRadialGradient(half, half, 0, half, half, half);
  stops.forEach(([pos, color]) => grad.addColorStop(pos, color));
  gctx.fillStyle = grad;
  gctx.fillRect(0, 0, size, size);
  return c;
}

function createSandMistSprite(w, h, puffs) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const mctx = c.getContext("2d");

  puffs.forEach(({ rx, ry, radX, radY, colorInner, colorMid }) => {
    mctx.save();
    mctx.translate(w * rx, h * ry);
    mctx.scale(radX, radY);
    const grad = mctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    grad.addColorStop(0, colorInner);
    grad.addColorStop(0.5, colorMid);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    mctx.fillStyle = grad;
    mctx.beginPath();
    mctx.arc(0, 0, 1, 0, Math.PI * 2);
    mctx.fill();
    mctx.restore();
  });

  return c;
}

function getCubicBezierPoint(curve, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return [
    mt2 * mt * curve.p0[0] + 3 * mt2 * t * curve.p1[0] + 3 * mt * t2 * curve.p2[0] + t2 * t * curve.p3[0],
    mt2 * mt * curve.p0[1] + 3 * mt2 * t * curve.p1[1] + 3 * mt * t2 * curve.p2[1] + t2 * t * curve.p3[1]
  ];
}

function createSeededRandom(seedVal) {
  let seed = seedVal;
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function drawStarfield(ctx, w, h, count, seedVal) {
  const rand = createSeededRandom(seedVal);
  for (let i = 0; i < count; i++) {
    const sx = rand() * w;
    const sy = rand() * h;
    const sr = rand() * 1.3 + 0.3;
    const sa = rand() * 0.55 + 0.14;
    const tint = rand();

    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    if (tint > 0.74) {
      ctx.fillStyle = `rgba(167, 243, 208, ${sa})`;
    } else if (tint > 0.5) {
      ctx.fillStyle = `rgba(191, 219, 254, ${sa * 0.85})`;
    } else {
      ctx.fillStyle = `rgba(248, 250, 252, ${sa})`;
    }
    ctx.fill();
  }
}

// ================= VORMIR-PLANET (EISIG & EISBLAU) =================
function buildVormirSprite(radius) {
  const pad = Math.ceil(radius * 0.4);
  const size = Math.ceil((radius + pad) * 2);
  const cx = size / 2;
  const cy = size / 2;

  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const pCtx = c.getContext("2d");

  const atmo = pCtx.createRadialGradient(
    cx + radius * 0.22,
    cy - radius * 0.08,
    radius * 0.72,
    cx + radius * 0.08,
    cy,
    radius * 1.36
  );
  atmo.addColorStop(0, "rgba(147, 197, 253, 0.36)");
  atmo.addColorStop(0.5, "rgba(56, 132, 196, 0.14)");
  atmo.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = atmo;
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius * 1.38, 0, Math.PI * 2);
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  pCtx.clip();

  const baseGrad = pCtx.createRadialGradient(
    cx + radius * 0.45,
    cy - radius * 0.28,
    radius * 0.08,
    cx - radius * 0.12,
    cy + radius * 0.16,
    radius * 1.24
  );
  baseGrad.addColorStop(0, "#cfe8ff");
  baseGrad.addColorStop(0.32, "#7ab2e0");
  baseGrad.addColorStop(0.62, "#355d82");
  baseGrad.addColorStop(0.86, "#16283b");
  baseGrad.addColorStop(1, "#070d14");
  pCtx.fillStyle = baseGrad;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const iceMist = pCtx.createRadialGradient(
    cx - radius * 0.08,
    cy + radius * 0.28,
    radius * 0.05,
    cx - radius * 0.08,
    cy + radius * 0.25,
    radius * 0.85
  );
  iceMist.addColorStop(0, "rgba(186, 226, 255, 0.34)");
  iceMist.addColorStop(0.55, "rgba(94, 152, 196, 0.18)");
  iceMist.addColorStop(1, "rgba(18, 36, 54, 0)");
  pCtx.fillStyle = iceMist;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const rand = createSeededRandom(201804);
  for (let i = 0; i < 36; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * radius * 0.92;
    const wx = cx + Math.cos(angle) * dist;
    const wy = cy + Math.sin(angle) * dist;
    const rw = radius * (0.16 + rand() * 0.34);
    const rh = rw * (0.36 + rand() * 0.34);
    const rot = -0.45 + rand() * 0.9;

    const g = pCtx.createRadialGradient(0, 0, 0, 0, 0, rw);
    if (rand() > 0.35) {
      g.addColorStop(0, `rgba(214, 238, 255, ${0.13 + rand() * 0.15})`);
      g.addColorStop(0.65, `rgba(115, 174, 218, ${0.06 + rand() * 0.07})`);
      g.addColorStop(1, "rgba(115, 174, 218, 0)");
    } else {
      g.addColorStop(0, `rgba(42, 74, 104, ${0.18 + rand() * 0.14})`);
      g.addColorStop(1, "rgba(12, 24, 38, 0)");
    }

    pCtx.save();
    pCtx.translate(wx, wy);
    pCtx.rotate(rot);
    pCtx.scale(1, rh / rw);
    pCtx.fillStyle = g;
    pCtx.beginPath();
    pCtx.arc(0, 0, rw, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();
  }

  const shade = pCtx.createRadialGradient(
    cx - radius * 0.45,
    cy + radius * 0.2,
    radius * 0.12,
    cx - radius * 0.2,
    cy + radius * 0.08,
    radius * 1.15
  );
  shade.addColorStop(0, "rgba(3, 7, 12, 0.86)");
  shade.addColorStop(0.56, "rgba(8, 16, 26, 0.44)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = shade;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  pCtx.restore();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, -Math.PI * 0.44, Math.PI * 0.36);
  pCtx.strokeStyle = "rgba(186, 228, 255, 0.72)";
  pCtx.lineWidth = 2.4;
  pCtx.stroke();

  pCtx.beginPath();
  pCtx.arc(cx, cy, radius - 0.5, -Math.PI * 0.3, Math.PI * 0.2);
  pCtx.strokeStyle = "rgba(240, 250, 255, 0.68)";
  pCtx.lineWidth = 1.1;
  pCtx.stroke();
  pCtx.restore();

  return { canvas: c, size, radius };
}

// ================= EGO-BASIS =================
function buildEgoBaseSprite(radius) {
  const pad = Math.ceil(radius * 0.4);
  const size = Math.ceil((radius + pad) * 2);
  const cx = size / 2;
  const cy = size / 2;

  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const pCtx = c.getContext("2d");

  const atmo = pCtx.createRadialGradient(
    cx - radius * 0.18,
    cy - radius * 0.14,
    radius * 0.72,
    cx,
    cy,
    radius * 1.38
  );
  atmo.addColorStop(0, "rgba(180, 62, 42, 0.34)");
  atmo.addColorStop(0.48, "rgba(45, 212, 191, 0.12)");
  atmo.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = atmo;
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  pCtx.clip();

  const baseGrad = pCtx.createRadialGradient(
    cx - radius * 0.42,
    cy - radius * 0.34,
    radius * 0.06,
    cx + radius * 0.12,
    cy + radius * 0.14,
    radius * 1.24
  );
  baseGrad.addColorStop(0, "#b84b34");
  baseGrad.addColorStop(0.26, "#6f2119");
  baseGrad.addColorStop(0.58, "#310d0d");
  baseGrad.addColorStop(0.86, "#160607");
  baseGrad.addColorStop(1, "#070203");
  pCtx.fillStyle = baseGrad;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const rand = createSeededRandom(201705);
  for (let i = 0; i < 42; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * radius * 0.94;
    const fx = cx + Math.cos(angle) * dist;
    const fy = cy + Math.sin(angle) * dist;
    const rSpot = radius * (0.08 + rand() * 0.22);

    const g = pCtx.createRadialGradient(fx, fy, 0, fx, fy, rSpot);
    if (rand() > 0.45) {
      g.addColorStop(0, `rgba(12, 4, 5, ${0.4 + rand() * 0.34})`);
      g.addColorStop(1, "rgba(12, 4, 5, 0)");
    } else {
      g.addColorStop(0, `rgba(168, 54, 34, ${0.22 + rand() * 0.24})`);
      g.addColorStop(1, "rgba(90, 22, 16, 0)");
    }
    pCtx.fillStyle = g;
    pCtx.beginPath();
    pCtx.arc(fx, fy, rSpot, 0, Math.PI * 2);
    pCtx.fill();
  }

  const shade = pCtx.createRadialGradient(
    cx + radius * 0.38,
    cy + radius * 0.25,
    radius * 0.12,
    cx + radius * 0.18,
    cy + radius * 0.14,
    radius * 1.12
  );
  shade.addColorStop(0, "rgba(4, 2, 3, 0.62)");
  shade.addColorStop(0.6, "rgba(10, 4, 5, 0.28)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = shade;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  pCtx.restore();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, Math.PI * 0.68, Math.PI * 1.48);
  pCtx.strokeStyle = "rgba(220, 108, 80, 0.68)";
  pCtx.lineWidth = 2.3;
  pCtx.stroke();

  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, Math.PI * 0.15, Math.PI * 0.62);
  pCtx.strokeStyle = "rgba(94, 234, 212, 0.65)";
  pCtx.lineWidth = 1.8;
  pCtx.stroke();
  pCtx.restore();

  return { canvas: c, size, radius };
}

// ================= AAKON =================
function buildAakonSprite(radius) {
  const pad = Math.ceil(radius * 0.38);
  const size = Math.ceil((radius + pad) * 2);
  const cx = size / 2;
  const cy = size / 2;

  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const pCtx = c.getContext("2d");

  const atmo = pCtx.createRadialGradient(cx, cy + radius * 0.15, radius * 0.72, cx, cy, radius * 1.35);
  atmo.addColorStop(0, "rgba(147, 51, 234, 0.28)");
  atmo.addColorStop(0.55, "rgba(49, 46, 129, 0.12)");
  atmo.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = atmo;
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius * 1.36, 0, Math.PI * 2);
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  pCtx.clip();

  const grad = pCtx.createRadialGradient(
    cx + radius * 0.18,
    cy + radius * 0.35,
    radius * 0.05,
    cx - radius * 0.15,
    cy - radius * 0.1,
    radius * 1.24
  );
  grad.addColorStop(0, "#a855f7");
  grad.addColorStop(0.32, "#581c87");
  grad.addColorStop(0.62, "#1e1b4b");
  grad.addColorStop(0.88, "#090714");
  grad.addColorStop(1, "#040308");
  pCtx.fillStyle = grad;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const rand = createSeededRandom(201707);
  for (let i = 0; i < 34; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * radius * 0.94;
    const fx = cx + Math.cos(ang) * dist;
    const fy = cy + Math.sin(ang) * dist;
    const rw = radius * (0.14 + rand() * 0.28);
    const rh = rw * (0.42 + rand() * 0.42);
    const rot = -0.6 + rand() * 1.2;

    const g = pCtx.createRadialGradient(0, 0, 0, 0, 0, rw);
    const roll = rand();
    if (roll > 0.62) {
      g.addColorStop(0, `rgba(192, 132, 252, ${0.14 + rand() * 0.16})`);
      g.addColorStop(1, "rgba(88, 28, 135, 0)");
    } else if (roll > 0.3) {
      g.addColorStop(0, `rgba(99, 102, 241, ${0.14 + rand() * 0.14})`);
      g.addColorStop(1, "rgba(30, 27, 75, 0)");
    } else {
      g.addColorStop(0, `rgba(8, 5, 16, ${0.35 + rand() * 0.32})`);
      g.addColorStop(1, "rgba(8, 5, 16, 0)");
    }

    pCtx.save();
    pCtx.translate(fx, fy);
    pCtx.rotate(rot);
    pCtx.scale(1, rh / rw);
    pCtx.fillStyle = g;
    pCtx.beginPath();
    pCtx.arc(0, 0, rw, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();
  }

  const sx = cx - radius * 0.14;
  const sy = cy + radius * 0.42;
  const starSpot = pCtx.createRadialGradient(sx, sy, 0, sx, sy, radius * 0.26);
  starSpot.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  starSpot.addColorStop(0.25, "rgba(233, 213, 255, 0.65)");
  starSpot.addColorStop(0.6, "rgba(147, 51, 234, 0.24)");
  starSpot.addColorStop(1, "rgba(88, 28, 135, 0)");
  pCtx.fillStyle = starSpot;
  pCtx.beginPath();
  pCtx.arc(sx, sy, radius * 0.26, 0, Math.PI * 2);
  pCtx.fill();

  const shade = pCtx.createRadialGradient(
    cx + radius * 0.36,
    cy - radius * 0.24,
    radius * 0.1,
    cx + radius * 0.14,
    cy - radius * 0.08,
    radius * 1.15
  );
  shade.addColorStop(0, "rgba(3, 2, 8, 0.86)");
  shade.addColorStop(0.58, "rgba(8, 5, 18, 0.46)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = shade;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  pCtx.restore();

  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, Math.PI * 0.18, Math.PI * 0.85);
  pCtx.strokeStyle = "rgba(216, 180, 254, 0.56)";
  pCtx.lineWidth = 1.6;
  pCtx.stroke();

  return { canvas: c, size, radius };
}

// ================= NIFLHEIM =================
function buildNiflheimSprite(radius) {
  const pad = Math.ceil(radius * 0.36);
  const size = Math.ceil((radius + pad) * 2);
  const cx = size / 2;
  const cy = size / 2;

  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const pCtx = c.getContext("2d");

  const atmo = pCtx.createRadialGradient(cx, cy, radius * 0.72, cx, cy, radius * 1.34);
  atmo.addColorStop(0, "rgba(186, 224, 245, 0.26)");
  atmo.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = atmo;
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius * 1.36, 0, Math.PI * 2);
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  pCtx.clip();

  const grad = pCtx.createRadialGradient(
    cx - radius * 0.26,
    cy - radius * 0.26,
    radius * 0.06,
    cx + radius * 0.1,
    cy + radius * 0.12,
    radius * 1.22
  );
  grad.addColorStop(0, "#e2edf5");
  grad.addColorStop(0.42, "#9cb2c2");
  grad.addColorStop(0.78, "#485966");
  grad.addColorStop(1, "#10161c");
  pCtx.fillStyle = grad;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const rand = createSeededRandom(201805);
  for (let i = 0; i < 28; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * radius * 0.9;
    const fx = cx + Math.cos(ang) * dist;
    const fy = cy + Math.sin(ang) * dist;
    const fr = radius * (0.1 + rand() * 0.24);

    const fg = pCtx.createRadialGradient(fx, fy, 0, fx, fy, fr);
    fg.addColorStop(0, rand() > 0.45 ? "rgba(240, 249, 255, 0.24)" : "rgba(38, 52, 66, 0.28)");
    fg.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = fg;
    pCtx.beginPath();
    pCtx.arc(fx, fy, fr, 0, Math.PI * 2);
    pCtx.fill();
  }

  pCtx.strokeStyle = "rgba(248, 252, 255, 0.26)";
  pCtx.lineWidth = 1.0;
  for (let rIdx = 0; rIdx < 7; rIdx++) {
    let px = cx + (rand() - 0.5) * radius * 1.1;
    let py = cy + (rand() - 0.5) * radius * 1.1;
    pCtx.beginPath();
    pCtx.moveTo(px, py);
    for (let step = 0; step < 4; step++) {
      px += (rand() - 0.5) * radius * 0.36;
      py += (rand() - 0.5) * radius * 0.36;
      pCtx.lineTo(px, py);
    }
    pCtx.stroke();
  }

  for (let sIdx = 0; sIdx < 14; sIdx++) {
    const sx = cx + (rand() - 0.5) * radius * 1.3;
    const sy = cy + (rand() - 0.5) * radius * 1.3;
    pCtx.fillStyle = `rgba(255, 255, 255, ${0.35 + rand() * 0.45})`;
    pCtx.beginPath();
    pCtx.arc(sx, sy, 0.8 + rand() * 1.2, 0, Math.PI * 2);
    pCtx.fill();
  }

  const shade = pCtx.createRadialGradient(
    cx + radius * 0.34,
    cy + radius * 0.24,
    radius * 0.1,
    cx + radius * 0.15,
    cy + radius * 0.12,
    radius * 1.12
  );
  shade.addColorStop(0, "rgba(5, 8, 12, 0.76)");
  shade.addColorStop(0.62, "rgba(12, 17, 24, 0.34)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = shade;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  pCtx.restore();

  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, -Math.PI * 0.85, -Math.PI * 0.15);
  pCtx.strokeStyle = "rgba(224, 242, 254, 0.58)";
  pCtx.lineWidth = 1.6;
  pCtx.stroke();

  return { canvas: c, size, radius };
}

// ================= MUSPELHEIM =================
function buildMuspelheimSprite(radius) {
  const pad = Math.ceil(radius * 0.38);
  const size = Math.ceil((radius + pad) * 2);
  const cx = size / 2;
  const cy = size / 2;

  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const pCtx = c.getContext("2d");

  const atmo = pCtx.createRadialGradient(cx, cy - radius * 0.18, radius * 0.7, cx, cy, radius * 1.36);
  atmo.addColorStop(0, "rgba(251, 146, 60, 0.38)");
  atmo.addColorStop(0.5, "rgba(185, 28, 28, 0.16)");
  atmo.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = atmo;
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius * 1.38, 0, Math.PI * 2);
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  pCtx.clip();

  const grad = pCtx.createRadialGradient(
    cx,
    cy - radius * 0.42,
    radius * 0.05,
    cx,
    cy + radius * 0.2,
    radius * 1.24
  );
  grad.addColorStop(0, "#fdba74");
  grad.addColorStop(0.24, "#ea580c");
  grad.addColorStop(0.54, "#991b1b");
  grad.addColorStop(0.82, "#2b0606");
  grad.addColorStop(1, "#070101");
  pCtx.fillStyle = grad;
  pCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const rand = createSeededRandom(201711);
  for (let i = 0; i < 28; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * radius * 0.92;
    const fx = cx + Math.cos(ang) * dist;
    const fy = cy + Math.sin(ang) * dist;
    const fr = radius * (0.1 + rand() * 0.24);

    const fg = pCtx.createRadialGradient(fx, fy, 0, fx, fy, fr);
    if (fy < cy + radius * 0.08 && rand() > 0.35) {
      fg.addColorStop(0, "rgba(254, 215, 170, 0.3)");
      fg.addColorStop(0.65, "rgba(234, 88, 12, 0.14)");
      fg.addColorStop(1, "rgba(0, 0, 0, 0)");
    } else {
      fg.addColorStop(0, "rgba(14, 4, 4, 0.52)");
      fg.addColorStop(1, "rgba(0, 0, 0, 0)");
    }
    pCtx.fillStyle = fg;
    pCtx.beginPath();
    pCtx.arc(fx, fy, fr, 0, Math.PI * 2);
    pCtx.fill();
  }

  pCtx.strokeStyle = "rgba(253, 186, 116, 0.34)";
  pCtx.lineWidth = 1.25;
  for (let lIdx = 0; lIdx < 6; lIdx++) {
    let lx = cx + (rand() - 0.5) * radius * 1.1;
    let ly = cy - radius * 0.55 + rand() * radius * 0.7;
    pCtx.beginPath();
    pCtx.moveTo(lx, ly);
    for (let step = 0; step < 3; step++) {
      lx += (rand() - 0.5) * radius * 0.34;
      ly += (0.12 + rand() * 0.22) * radius;
      pCtx.lineTo(lx, ly);
    }
    pCtx.stroke();
  }

  pCtx.restore();

  pCtx.beginPath();
  pCtx.arc(cx, cy, radius, -Math.PI * 0.86, -Math.PI * 0.14);
  pCtx.strokeStyle = "rgba(253, 186, 116, 0.72)";
  pCtx.lineWidth = 2.0;
  pCtx.stroke();

  return { canvas: c, size, radius };
}

function initSceneBackground() {
  const canvas = document.getElementById("scene-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false });

  let width = window.innerWidth;
  let height = window.innerHeight;

  const renderedPlanets = {
    vormir: null,
    niflheim: null,
    aakon: null,
    ego: null,
    muspelheim: null
  };

  let duneEclipse = { x: 0, y: 0, r: 420 };
  let hoveredPlanetKey = null;

  function findPlanetAtPoint(mx, my) {
    if (activeWorld !== "doomsday" || activePage !== "countdown") return null;
    const hitList = [
      { key: "muspelheim", p: renderedPlanets.muspelheim },
      { key: "niflheim", p: renderedPlanets.niflheim },
      { key: "ego", p: renderedPlanets.ego },
      { key: "vormir", p: renderedPlanets.vormir },
      { key: "aakon", p: renderedPlanets.aakon }
    ];
    for (let i = 0; i < hitList.length; i++) {
      const item = hitList[i].p;
      if (!item) continue;
      if (Math.hypot(mx - item.x, my - item.y) <= item.radius * 1.12) {
        return hitList[i].key;
      }
    }
    return null;
  }

  if (!window.matchMedia("(hover: none)").matches) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const hit = findPlanetAtPoint(e.clientX, e.clientY);
        hoveredPlanetKey = hit;
        document.body.classList.toggle("planet-hover", Boolean(hit));
      },
      { passive: true }
    );
  }

  window.addEventListener("click", (e) => {
    const hit = findPlanetAtPoint(e.clientX, e.clientY);
    if (hit) {
      e.stopPropagation();
      setSelectedPlanet(selectedPlanetKey === hit ? null : hit);
    } else if (selectedPlanetKey) {
      setSelectedPlanet(null);
    }
  });

  const sprites = {
    doomEmerald: createSprite(28, [
      [0, "rgba(220, 255, 240, 1)"],
      [0.24, "rgba(110, 231, 183, 0.85)"],
      [0.54, "rgba(16, 185, 129, 0.25)"],
      [1, "rgba(16, 185, 129, 0)"]
    ]),
    doomCore: createSprite(32, [
      [0, "rgba(255, 255, 255, 1)"],
      [0.2, "rgba(167, 243, 208, 0.92)"],
      [0.5, "rgba(52, 211, 153, 0.3)"],
      [1, "rgba(16, 185, 129, 0)"]
    ]),
    doomSoft: createSprite(14, [
      [0, "rgba(226, 232, 240, 0.85)"],
      [0.45, "rgba(110, 231, 183, 0.3)"],
      [1, "rgba(110, 231, 183, 0)"]
    ]),
    starTwinkle: createSprite(18, [
      [0, "rgba(255, 255, 255, 0.95)"],
      [0.25, "rgba(210, 250, 235, 0.65)"],
      [1, "rgba(110, 231, 183, 0)"]
    ]),
    dustVormir: createSprite(16, [
      [0, "rgba(224, 242, 254, 0.9)"],
      [0.45, "rgba(125, 185, 232, 0.45)"],
      [1, "rgba(38, 72, 112, 0)"]
    ]),
    dustEgoCyan: createSprite(16, [
      [0, "rgba(224, 255, 250, 0.95)"],
      [0.45, "rgba(45, 212, 191, 0.55)"],
      [1, "rgba(15, 118, 110, 0)"]
    ]),
    egoPulseDot: createSprite(24, [
      [0, "rgba(240, 255, 252, 1)"],
      [0.25, "rgba(94, 234, 212, 0.92)"],
      [0.6, "rgba(20, 184, 166, 0.35)"],
      [1, "rgba(13, 148, 136, 0)"]
    ]),
    fireEmber: createSprite(16, [
      [0, "rgba(254, 249, 195, 0.95)"],
      [0.35, "rgba(251, 146, 60, 0.72)"],
      [0.72, "rgba(220, 38, 38, 0.22)"],
      [1, "rgba(127, 29, 29, 0)"]
    ]),
    sandGrain: createSprite(12, [
      [0, "rgba(244, 198, 136, 0.95)"],
      [0.5, "rgba(217, 159, 98, 0.36)"],
      [1, "rgba(217, 159, 98, 0)"]
    ]),
    sandDustSoft: createSprite(22, [
      [0, "rgba(235, 182, 118, 0.44)"],
      [0.48, "rgba(196, 132, 68, 0.16)"],
      [1, "rgba(160, 96, 40, 0)"]
    ]),
    spiceGold: createSprite(26, [
      [0, "rgba(255, 251, 220, 1)"],
      [0.26, "rgba(253, 224, 71, 0.82)"],
      [0.58, "rgba(245, 158, 11, 0.24)"],
      [1, "rgba(245, 158, 11, 0)"]
    ]),
    fremenBlue: createSprite(22, [
      [0, "rgba(224, 242, 254, 0.95)"],
      [0.3, "rgba(96, 165, 250, 0.78)"],
      [1, "rgba(59, 130, 246, 0)"]
    ]),
    sandMistA: createSandMistSprite(260, 115, [
      { rx: 0.32, ry: 0.58, radX: 76, radY: 32, colorInner: "rgba(228, 162, 86, 0.22)", colorMid: "rgba(180, 102, 38, 0.1)" },
      { rx: 0.54, ry: 0.42, radX: 88, radY: 38, colorInner: "rgba(246, 196, 120, 0.2)", colorMid: "rgba(194, 118, 46, 0.08)" },
      { rx: 0.74, ry: 0.56, radX: 62, radY: 26, colorInner: "rgba(214, 142, 68, 0.18)", colorMid: "rgba(146, 78, 26, 0.07)" }
    ]),
    sandMistB: createSandMistSprite(250, 105, [
      { rx: 0.28, ry: 0.46, radX: 68, radY: 24, colorInner: "rgba(253, 220, 155, 0.18)", colorMid: "rgba(217, 148, 68, 0.08)" },
      { rx: 0.52, ry: 0.58, radX: 84, radY: 30, colorInner: "rgba(240, 182, 104, 0.17)", colorMid: "rgba(180, 110, 42, 0.07)" },
      { rx: 0.76, ry: 0.44, radX: 56, radY: 22, colorInner: "rgba(252, 211, 128, 0.15)", colorMid: "rgba(180, 110, 42, 0.06)" }
    ])
  };

  const YGGDRASIL_DEF = [
    { p0: [0.495, 1.04], p1: [0.485, 0.72], p2: [0.34, 0.44], p3: [-0.02, 0.26], w: 1.7, a: 0.34, phase: 0.2 },
    { p0: [0.498, 1.04], p1: [0.48, 0.66], p2: [0.37, 0.3], p3: [0.06, 0.02], w: 1.9, a: 0.4, phase: 1.1 },
    { p0: [0.5, 1.04], p1: [0.49, 0.6], p2: [0.42, 0.26], p3: [0.24, -0.02], w: 1.6, a: 0.38, phase: 2.0 },
    { p0: [0.492, 1.04], p1: [0.46, 0.78], p2: [0.26, 0.6], p3: [-0.02, 0.56], w: 1.25, a: 0.25, phase: 2.9 },
    { p0: [0.505, 1.04], p1: [0.515, 0.72], p2: [0.66, 0.44], p3: [1.02, 0.24], w: 1.7, a: 0.34, phase: 0.7 },
    { p0: [0.502, 1.04], p1: [0.52, 0.65], p2: [0.63, 0.29], p3: [0.94, 0.03], w: 1.9, a: 0.4, phase: 1.6 },
    { p0: [0.5, 1.04], p1: [0.51, 0.6], p2: [0.58, 0.26], p3: [0.76, -0.02], w: 1.6, a: 0.38, phase: 2.5 },
    { p0: [0.508, 1.04], p1: [0.54, 0.78], p2: [0.74, 0.6], p3: [1.02, 0.54], w: 1.25, a: 0.25, phase: 3.4 },
    { p0: [0.5, 1.04], p1: [0.485, 0.58], p2: [0.47, 0.26], p3: [0.41, -0.02], w: 1.35, a: 0.3, phase: 4.1 },
    { p0: [0.5, 1.04], p1: [0.515, 0.58], p2: [0.53, 0.26], p3: [0.59, -0.02], w: 1.35, a: 0.3, phase: 4.9 },
    { p0: [0.38, 0.38], p1: [0.31, 0.25], p2: [0.22, 0.16], p3: [0.15, 0.04], w: 1.0, a: 0.26, phase: 5.5 },
    { p0: [0.62, 0.37], p1: [0.69, 0.24], p2: [0.78, 0.15], p3: [0.85, 0.04], w: 1.0, a: 0.26, phase: 6.1 }
  ];

  let baseTimelineCurves = [];
  let liveTimelineCurves = [];

  let planetVormir = null;
  let planetEgo = null;
  let planetAakon = null;
  let planetNiflheim = null;
  let planetMuspelheim = null;

  let anchorVormir = { x: 0, y: 0 };
  let anchorEgo = { x: 0, y: 0 };
  let anchorAakon = { x: 0, y: 0 };
  let anchorNiflheim = { x: 0, y: 0 };
  let anchorMuspelheim = { x: 0, y: 0 };

  const egoGlowingDots = [
    { rx: 0.26, ry: 0.6, r: 0.28, speed: 0.065, phase: 0.2, minA: 0.45, maxA: 1.0 },
    { rx: -0.34, ry: 0.52, r: 0.22, speed: 0.055, phase: 1.4, minA: 0.38, maxA: 0.95 },
    { rx: 0.54, ry: -0.14, r: 0.2, speed: 0.075, phase: 2.3, minA: 0.42, maxA: 1.0 },
    { rx: -0.16, ry: 0.14, r: 0.17, speed: 0.06, phase: 0.9, minA: 0.35, maxA: 0.9 },
    { rx: 0.34, ry: 0.2, r: 0.16, speed: 0.08, phase: 3.7, minA: 0.4, maxA: 0.96 },
    { rx: -0.46, ry: 0.02, r: 0.15, speed: 0.05, phase: 4.5, minA: 0.35, maxA: 0.88 },
    { rx: 0.08, ry: -0.36, r: 0.16, speed: 0.07, phase: 1.9, minA: 0.38, maxA: 0.94 },
    { rx: -0.04, ry: 0.74, r: 0.17, speed: 0.062, phase: 5.1, minA: 0.4, maxA: 0.95 },
    { rx: 0.46, ry: 0.44, r: 0.14, speed: 0.085, phase: 2.8, minA: 0.42, maxA: 1.0 },
    { rx: -0.28, ry: -0.22, r: 0.14, speed: 0.058, phase: 3.2, minA: 0.35, maxA: 0.9 }
  ];

  const doomBackdrop = document.createElement("canvas");
  const duneSkyBackdrop = document.createElement("canvas");
  const duneDunesOverlay = document.createElement("canvas");

  function drawDuneRidge(bctx, w, h, points, topColor, bottomColor, rimColor) {
    bctx.beginPath();
    bctx.moveTo(-20, h + 10);
    bctx.lineTo(-20, points[0][1]);
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      bctx.quadraticCurveTo(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2);
    }
    bctx.lineTo(w + 20, points[points.length - 1][1]);
    bctx.lineTo(w + 20, h + 10);
    bctx.closePath();

    const grad = bctx.createLinearGradient(0, Math.min(...points.map(p => p[1])), 0, h);
    grad.addColorStop(0, topColor);
    grad.addColorStop(1, bottomColor);
    bctx.fillStyle = grad;
    bctx.fill();

    if (rimColor) {
      bctx.beginPath();
      bctx.moveTo(-20, points[0][1]);
      for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        bctx.quadraticCurveTo(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2);
      }
      bctx.lineTo(w + 20, points[points.length - 1][1]);
      bctx.strokeStyle = rimColor;
      bctx.lineWidth = 1.6;
      bctx.stroke();
    }
  }

  function buildAllBackdrops() {
    canvas.width = width;
    canvas.height = height;
    const maxDim = Math.max(width, height);
    const minDim = Math.min(width, height);
    const isPortraitMobile = width < 680;

    // 1) DOOMSDAY
    doomBackdrop.width = width;
    doomBackdrop.height = height;
    const dCtx = doomBackdrop.getContext("2d");

    const spaceGrad = dCtx.createRadialGradient(width * 0.5, height * 0.46, 0, width * 0.5, height * 0.5, maxDim * 0.85);
    spaceGrad.addColorStop(0, "#051a14");
    spaceGrad.addColorStop(0.42, "#030c0d");
    spaceGrad.addColorStop(0.75, "#020509");
    spaceGrad.addColorStop(1, "#010204");
    dCtx.fillStyle = spaceGrad;
    dCtx.fillRect(0, 0, width, height);

    const nebulae = [
      { x: 0.5, y: 0.24, r: 0.42, c0: "rgba(16, 185, 129, 0.14)", c1: "rgba(6, 78, 59, 0)" },
      { x: 0.5, y: 0.86, r: 0.44, c0: "rgba(16, 185, 129, 0.18)", c1: "rgba(2, 6, 5, 0)" },
      { x: 0.36, y: 0.52, r: 0.34, c0: "rgba(16, 185, 129, 0.08)", c1: "rgba(2, 6, 5, 0)" },
      { x: 0.64, y: 0.46, r: 0.34, c0: "rgba(16, 185, 129, 0.08)", c1: "rgba(2, 6, 5, 0)" }
    ];
    nebulae.forEach(n => {
      const g = dCtx.createRadialGradient(n.x * width, n.y * height, 0, n.x * width, n.y * height, n.r * maxDim);
      g.addColorStop(0, n.c0);
      g.addColorStop(1, n.c1);
      dCtx.fillStyle = g;
      dCtx.fillRect(0, 0, width, height);
    });

    drawStarfield(dCtx, width, height, isPortraitMobile ? 130 : 195, 4219);

    baseTimelineCurves = YGGDRASIL_DEF.map(b => ({
      p0: [b.p0[0] * width, b.p0[1] * height],
      p1: [b.p1[0] * width, b.p1[1] * height],
      p2: [b.p2[0] * width, b.p2[1] * height],
      p3: [b.p3[0] * width, b.p3[1] * height],
      w: b.w,
      a: b.a,
      phase: b.phase
    }));
    liveTimelineCurves = baseTimelineCurves.map(c => ({
      p0: [...c.p0],
      p1: [...c.p1],
      p2: [...c.p2],
      p3: [...c.p3],
      w: c.w,
      a: c.a
    }));

    if (isPortraitMobile) {
      const rVormir = Math.max(40, minDim * 0.185);
      anchorVormir = { x: width * 0.08, y: height * 0.25 };
      planetVormir = buildVormirSprite(rVormir);

      const rNiflheim = Math.max(19, minDim * 0.082);
      anchorNiflheim = { x: width * 0.12, y: height * 0.68 };
      planetNiflheim = buildNiflheimSprite(rNiflheim);

      const rAakon = Math.max(28, minDim * 0.12);
      anchorAakon = { x: width * 0.56, y: height * 0.08 };
      planetAakon = buildAakonSprite(rAakon);

      const rEgo = Math.max(34, minDim * 0.155);
      anchorEgo = { x: width * 0.89, y: height * 0.52 };
      planetEgo = buildEgoBaseSprite(rEgo);

      const rMuspelheim = Math.max(34, minDim * 0.14);
      anchorMuspelheim = { x: width * 0.56, y: height * 0.99 };
      planetMuspelheim = buildMuspelheimSprite(rMuspelheim);
    } else {
      const rVormir = Math.max(58, minDim * 0.245);
      anchorVormir = { x: width * 0.095, y: height * 0.34 };
      planetVormir = buildVormirSprite(rVormir);

      const rNiflheim = Math.max(23, minDim * 0.084);
      anchorNiflheim = { x: width * 0.145, y: height * 0.67 };
      planetNiflheim = buildNiflheimSprite(rNiflheim);

      const rAakon = Math.max(42, minDim * 0.14);
      anchorAakon = { x: width * 0.66, y: height * 0.085 };
      planetAakon = buildAakonSprite(rAakon);

      const rEgo = Math.max(46, minDim * 0.175);
      anchorEgo = { x: width * 0.89, y: height * 0.48 };
      planetEgo = buildEgoBaseSprite(rEgo);

      const rMuspelheim = Math.max(44, minDim * 0.155);
      anchorMuspelheim = { x: width * 0.58, y: height * 0.99 };
      planetMuspelheim = buildMuspelheimSprite(rMuspelheim);
    }

    // 2A) DUNE HIMMEL + ÄUSSERER GLUTHINTERGRUND FÜR DIE GROSSE ECLIPSE
    duneSkyBackdrop.width = width;
    duneSkyBackdrop.height = height;
    const aCtx = duneSkyBackdrop.getContext("2d");

    const sky = aCtx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#070301");
    sky.addColorStop(0.32, "#140803");
    sky.addColorStop(0.58, "#311406");
    sky.addColorStop(0.73, "#6b2f0e");
    sky.addColorStop(0.84, "#3b1806");
    sky.addColorStop(1, "#0b0401");
    aCtx.fillStyle = sky;
    aCtx.fillRect(0, 0, width, height);

    // Extra große Sonnenfinsternis direkt hinter Titel & Timer
    const eclipseX = width * 0.5;
    const eclipseY = isPortraitMobile ? height * 0.4 : height * 0.38;
    const eclipseR = isPortraitMobile
      ? Math.max(width * 0.78, height * 0.46)
      : Math.max(height * 0.54, Math.min(width * 0.38, 630));
    duneEclipse = { x: eclipseX, y: eclipseY, r: eclipseR };

    // Weiter gold-oranger Wüsten-Gluthof hinter der Sonnenfinsternis
    const outerHalo = aCtx.createRadialGradient(eclipseX, eclipseY, eclipseR * 0.96, eclipseX, eclipseY, eclipseR * 1.9);
    outerHalo.addColorStop(0, "rgba(255, 244, 200, 0.42)");
    outerHalo.addColorStop(0.2, "rgba(251, 191, 36, 0.28)");
    outerHalo.addColorStop(0.48, "rgba(217, 119, 6, 0.14)");
    outerHalo.addColorStop(0.78, "rgba(124, 45, 18, 0.04)");
    outerHalo.addColorStop(1, "rgba(0, 0, 0, 0)");
    aCtx.fillStyle = outerHalo;
    aCtx.fillRect(0, 0, width, height);

    // Ruhige Grund-Korona direkt um den Rand
    const corona = aCtx.createRadialGradient(
      eclipseX,
      eclipseY,
      eclipseR * 0.98,
      eclipseX,
      eclipseY,
      eclipseR * 1.38
    );
    corona.addColorStop(0, "rgba(255, 250, 224, 0.72)");
    corona.addColorStop(0.16, "rgba(254, 240, 138, 0.42)");
    corona.addColorStop(0.44, "rgba(245, 158, 11, 0.18)");
    corona.addColorStop(0.78, "rgba(180, 83, 9, 0.04)");
    corona.addColorStop(1, "rgba(0, 0, 0, 0)");
    aCtx.fillStyle = corona;
    aCtx.beginPath();
    aCtx.arc(eclipseX, eclipseY, eclipseR * 1.38, 0, Math.PI * 2);
    aCtx.fill();

    // 2B) DUNE DÜNEN-EBENE (LIEGT SAUBER VOR DEM UNTEREN TEIL DER SONNENFINSTERNIS)
    duneDunesOverlay.width = width;
    duneDunesOverlay.height = height;
    const oCtx = duneDunesOverlay.getContext("2d");

    drawDuneRidge(
      oCtx, width, height,
      [
        [-20, height * 0.74],
        [width * 0.16, height * 0.69],
        [width * 0.36, height * 0.75],
        [width * 0.56, height * 0.68],
        [width * 0.78, height * 0.73],
        [width * 1.05, height * 0.69]
      ],
      "#57260b", "#240e04", "rgba(253, 224, 71, 0.22)"
    );

    drawDuneRidge(
      oCtx, width, height,
      [
        [-20, height * 0.81],
        [width * 0.22, height * 0.86],
        [width * 0.44, height * 0.77],
        [width * 0.68, height * 0.83],
        [width * 0.88, height * 0.76],
        [width * 1.05, height * 0.81]
      ],
      "#3b1907", "#170902", "rgba(252, 211, 77, 0.3)"
    );

    drawDuneRidge(
      oCtx, width, height,
      [
        [-20, height * 0.89],
        [width * 0.26, height * 0.85],
        [width * 0.54, height * 0.93],
        [width * 0.82, height * 0.87],
        [width * 1.05, height * 0.92]
      ],
      "#1d0b03", "#080301", "rgba(245, 158, 11, 0.2)"
    );
  }

  buildAllBackdrops();

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      if (newW !== width || Math.abs(newH - height) > 120) {
        width = newW;
        height = newH;
        buildAllBackdrops();
      }
    }, 150);
  });

  // ================= ANIMATIONSDATEN =================
  const timelineRunners = Array.from({ length: 10 }, (_, i) => ({
    curveIndex: i % YGGDRASIL_DEF.length,
    t: Math.random(),
    speed: Math.random() * 0.0032 + 0.0016,
    size: Math.random() * 12 + 10,
    sprite: i % 3 === 0 ? sprites.doomCore : sprites.doomEmerald
  }));

  const twinklingStars = Array.from({ length: 10 }, () => ({
    rx: Math.random(),
    ry: Math.random() * 0.72,
    size: Math.random() * 9 + 6,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.045 + 0.02
  }));

  let activeArc = null;
  let arcCooldown = 50;
  const incursionDust = Array.from({ length: 16 }, (_, i) => ({
    t: Math.random(),
    speed: (Math.random() * 0.0036 + 0.0014) * (Math.random() > 0.5 ? 1 : -1),
    spread: (Math.random() - 0.5) * 145,
    size: Math.random() * 8 + 4.5,
    sprite: i % 3 === 0 ? sprites.dustVormir : i % 3 === 1 ? sprites.dustEgoCyan : sprites.doomEmerald
  }));

  const fireEmbers = Array.from({ length: 14 }, (_, i) => ({
    rx: -0.75 + (i / 13) * 1.5,
    ry: -0.25 - (i % 4) * 0.22,
    size: 8 + (i % 3) * 3.5,
    speedY: 0.004 + (i % 3) * 0.0015,
    driftPhase: i * 0.85,
    pulsePhase: i * 0.65
  }));

  // Zeichnet beim Hover den schrägen + exakt passenden waagerechten Strich & Schrift mit Verlauf-Effekt
  function drawPlanetCallout(planetKey, cx, cy, r, tVal) {
    if (!planetKey || !PLANET_LORE[planetKey]) return;
    const info = PLANET_LORE[planetKey];
    const labelText = info.name.toUpperCase();

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.font = '800 16px "Montserrat", "Segoe UI", sans-serif';
    if ("letterSpacing" in ctx) {
      ctx.letterSpacing = "2px";
    }

    const textWidth = ctx.measureText(labelText).width;
    const horizLen = Math.ceil(textWidth) + 16;

    let startX = cx + r * 0.65;
    let startY = cy - r * 0.65;
    let elbowX = startX + 22;
    let elbowY = startY - 22;
    let endX = elbowX + horizLen;
    let endY = elbowY;

    if (info.calloutDir === "down-right") {
      startX = cx + r * 0.55;
      startY = cy + r * 0.48;
      elbowX = startX + 20;
      elbowY = startY + 20;
      endX = elbowX + horizLen;
      endY = elbowY;
    } else if (info.calloutDir === "up-left") {
      startX = cx - r * 0.65;
      startY = cy - r * 0.65;
      elbowX = startX - 22;
      elbowY = startY - 22;
      endX = elbowX - horizLen;
      endY = elbowY;
    }

    const midX = (elbowX + endX) * 0.5;

    ctx.shadowColor = info.glow;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(startX, startY, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = info.color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    const sweepT = (tVal * 0.45) % 1;
    const glintX = elbowX + (endX - elbowX) * sweepT;
    ctx.beginPath();
    ctx.arc(glintX, endY, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 8;
    ctx.fill();

    const textY = endY - 7;
    const textGrad = ctx.createLinearGradient(0, textY - 16, 0, textY);
    textGrad.addColorStop(0, "#ffffff");
    textGrad.addColorStop(0.55, info.color);
    textGrad.addColorStop(1, info.color);

    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";

    ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = textGrad;
    ctx.fillText(labelText, midX, textY);

    ctx.shadowColor = info.glow;
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = textGrad;
    ctx.fillText(labelText, midX, textY);

    ctx.restore();
  }

  function drawFloatingPlanet(planetObj, cx, cy, angle) {
    if (!planetObj) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.drawImage(planetObj.canvas, -planetObj.size / 2, -planetObj.size / 2);
    ctx.restore();
  }

  function drawEgoIntact(cx, cy, r, angle) {
    ctx.globalAlpha = 1;
    drawFloatingPlanet(planetEgo, cx, cy, angle);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < egoGlowingDots.length; i++) {
      const dot = egoGlowingDots[i];
      dot.phase += dot.speed;
      const wave = 0.5 + 0.5 * Math.sin(dot.phase);
      const alpha = dot.minA + (dot.maxA - dot.minA) * wave;
      const scale = 0.82 + 0.34 * wave;

      const px = dot.rx * r;
      const py = dot.ry * r;
      const drawSize = r * dot.r * scale;

      ctx.globalAlpha = alpha;
      ctx.drawImage(sprites.egoPulseDot, px - drawSize / 2, py - drawSize / 2, drawSize, drawSize);
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  // Zeichnet Ego normal, explodierend (beim Klick auf Ego) oder wieder zusammensetzend
  function drawEgoPlanetSystem(cx, cy, r, angle, tVal) {
    if (!planetEgo) return;

    if (egoBlast.mode === "intact") {
      drawEgoIntact(cx, cy, r, angle);
      return;
    }

    egoBlast.timer++;

    let spreadFactor = 1;
    let planetOpacity = 0;
    let flashAlpha = 0;
    let shockwaveProgress = 0;

    if (egoBlast.mode === "exploding") {
      const duration = 14;
      const p = Math.min(1, egoBlast.timer / duration);
      spreadFactor = 1 - Math.pow(1 - p, 3);
      planetOpacity = p < 0.25 ? 1 - p * 4 : 0;
      flashAlpha = p < 0.55 ? Math.sin((p / 0.55) * Math.PI) : 0;
      shockwaveProgress = p;

      if (egoBlast.timer >= duration) {
        egoBlast.mode = "destroyed";
        egoBlast.timer = 0;
      }
    } else if (egoBlast.mode === "destroyed") {
      spreadFactor = 1;
      planetOpacity = 0;
    } else if (egoBlast.mode === "reforming") {
      const duration = 16;
      const p = Math.min(1, egoBlast.timer / duration);
      const easeInOut = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      spreadFactor = 1 - easeInOut;
      planetOpacity = p > 0.55 ? (p - 0.55) / 0.45 : 0;
      flashAlpha = p > 0.72 ? Math.sin(((p - 0.72) / 0.28) * Math.PI) * 0.65 : 0;

      if (egoBlast.timer >= duration) {
        resetEgoIntact();
        drawEgoIntact(cx, cy, r, angle);
        return;
      }
    }

    if (spreadFactor > 0.15) {
      const corePulse = 0.75 + 0.25 * Math.sin(tVal * 3.8);
      const glowRadius = Math.max(1, r * 1.15 * spreadFactor);
      const remnantGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      remnantGlow.addColorStop(0, `rgba(94, 234, 212, ${0.26 * spreadFactor * corePulse})`);
      remnantGlow.addColorStop(0.45, `rgba(220, 88, 52, ${0.14 * spreadFactor})`);
      remnantGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = remnantGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (planetOpacity > 0.01) {
      ctx.save();
      ctx.globalAlpha = planetOpacity;
      drawFloatingPlanet(planetEgo, cx, cy, angle);
      ctx.restore();
    }

    for (let i = 0; i < egoBlast.chunks.length; i++) {
      const ch = egoBlast.chunks[i];
      ch.rot += ch.rotSpeed;
      ch.driftPhase += ch.driftSpeed;

      const floatWobble = egoBlast.mode === "destroyed" ? Math.sin(ch.driftPhase) * (r * 0.14) : 0;
      const distNorm = ch.startDist + (ch.blastDist - ch.startDist) * spreadFactor;
      const distPx = distNorm * r + floatWobble;

      const px = cx + Math.cos(ch.angle) * distPx;
      const py = cy + Math.sin(ch.angle) * distPx;
      const chunkR = ch.sizeRatio * r;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(ch.rot);
      ctx.globalAlpha = Math.min(1, 0.25 + spreadFactor * 0.85);

      ctx.beginPath();
      for (let v = 0; v < ch.polyPts.length; v++) {
        const vx = ch.polyPts[v][0] * chunkR;
        const vy = ch.polyPts[v][1] * chunkR;
        if (v === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();

      if (ch.isCore) {
        ctx.fillStyle = "#5eead4";
        ctx.shadowColor = "rgba(45, 212, 191, 0.95)";
        ctx.shadowBlur = 12;
        ctx.fill();
      } else {
        ctx.fillStyle = ch.tone;
        ctx.fill();
        ctx.strokeStyle = "rgba(251, 146, 60, 0.55)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    }

    for (let k = 0; k < egoBlast.sparks.length; k++) {
      const sp = egoBlast.sparks[k];
      if (sp.life <= 0) continue;
      sp.dist += sp.speed;
      sp.life -= sp.decay;
      if (sp.life <= 0) continue;

      const sx = cx + Math.cos(sp.angle) * sp.dist;
      const sy = cy + Math.sin(sp.angle) * sp.dist;
      ctx.globalAlpha = sp.life;
      ctx.drawImage(
        sp.isCyan ? sprites.egoPulseDot : sprites.fireEmber,
        sx - sp.size / 2,
        sy - sp.size / 2,
        sp.size,
        sp.size
      );
    }

    if (shockwaveProgress > 0 && shockwaveProgress < 1) {
      const waveR = r * (0.4 + shockwaveProgress * 2.5);
      const waveAlpha = (1 - shockwaveProgress) * 0.85;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(94, 234, 212, ${waveAlpha})`;
      ctx.lineWidth = 3 * (1 - shockwaveProgress) + 0.8;
      ctx.shadowColor = "rgba(45, 212, 191, 0.9)";
      ctx.shadowBlur = 14;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, waveR * 0.78, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(251, 146, 60, ${waveAlpha * 0.75})`;
      ctx.lineWidth = 2 * (1 - shockwaveProgress) + 0.5;
      ctx.stroke();
      ctx.restore();
    }

    if (flashAlpha > 0.01) {
      const flashR = r * 1.85;
      const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, flashR);
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
      flashGrad.addColorStop(0.32, `rgba(94, 234, 212, ${flashAlpha * 0.82})`);
      flashGrad.addColorStop(0.65, `rgba(249, 115, 22, ${flashAlpha * 0.35})`);
      flashGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalAlpha = 1;
      ctx.fillStyle = flashGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, flashR, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function drawMuspelheimWithGlow(cx, cy, r, angle, tVal) {
    if (!planetMuspelheim) return;

    const heatPulse = 0.82 + 0.22 * Math.sin(tVal * 1.8) + 0.08 * Math.cos(tVal * 3.9);
    const heatGlow = ctx.createRadialGradient(cx, cy - r * 0.35, r * 0.15, cx, cy - r * 0.25, r * 1.38 * heatPulse);
    heatGlow.addColorStop(0, "rgba(253, 186, 116, 0.28)");
    heatGlow.addColorStop(0.45, "rgba(234, 88, 12, 0.18)");
    heatGlow.addColorStop(0.78, "rgba(185, 28, 28, 0.07)");
    heatGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.globalAlpha = 1;
    ctx.fillStyle = heatGlow;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.2, r * 1.4 * heatPulse, 0, Math.PI * 2);
    ctx.fill();

    drawFloatingPlanet(planetMuspelheim, cx, cy, angle);

    for (let i = 0; i < fireEmbers.length; i++) {
      const em = fireEmbers[i];
      em.ry -= em.speedY;
      em.driftPhase += 0.04;
      em.pulsePhase += 0.06;

      if (em.ry < -1.35) {
        em.ry = -0.15;
        em.rx = -0.78 + Math.random() * 1.56;
      }

      const px = cx + (em.rx + Math.sin(em.driftPhase) * 0.06) * r;
      const py = cy + em.ry * r;
      const lifeFade = em.ry < -0.95 ? Math.max(0, (em.ry + 1.35) / 0.4) : 1;
      const pulse = 0.65 + 0.35 * Math.sin(em.pulsePhase);

      ctx.globalAlpha = lifeFade * pulse * 0.78;
      ctx.drawImage(sprites.fireEmber, px - em.size / 2, py - em.size / 2, em.size, em.size);
    }

    ctx.globalAlpha = 1;
  }

  // Komplett schwarze Dune-Eclipse + umlaufendes Leuchten einmal rings um den Ring
  function drawDuneEclipse(tVal) {
    const { x, y, r } = duneEclipse;
    if (!r) return;

    const orbitAngle = tVal * 0.56;
    const headX = x + Math.cos(orbitAngle) * r;
    const headY = y + Math.sin(orbitAngle) * r;

    ctx.save();
    ctx.globalAlpha = 1;

    // 1. Umlaufender äußerer Glüh-Hof hinter der schwarzen Scheibe (strahlt nur nach außen)
    const auraR = Math.min(r * 0.52, 250);
    const orbitAura = ctx.createRadialGradient(headX, headY, 0, headX, headY, auraR);
    orbitAura.addColorStop(0, "rgba(255, 253, 236, 0.72)");
    orbitAura.addColorStop(0.22, "rgba(254, 240, 138, 0.44)");
    orbitAura.addColorStop(0.55, "rgba(245, 158, 11, 0.16)");
    orbitAura.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = orbitAura;
    ctx.beginPath();
    ctx.arc(headX, headY, auraR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Komplett tiefschwarze Sonnenfinsternis-Scheibe (100 % #000000, kein innerer Schimmer)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // 3. Feiner goldener Basis-Ring direkt um die schwarze Kante
    ctx.beginPath();
    ctx.arc(x, y, r + 0.9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(254, 243, 199, 0.36)";
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // 4. Sanft umlaufender Leuchtbogen rings um die gesamte Sonnenfinsternis
    const trailArc = 1.95;
    const segments = 28;
    ctx.lineCap = "round";

    for (let i = 0; i < segments; i++) {
      const frac0 = i / segments;
      const frac1 = (i + 1) / segments;
      const a0 = orbitAngle - trailArc * (1 - frac0);
      const a1 = orbitAngle - trailArc * (1 - frac1);
      const intensity = Math.pow(frac1, 2.2);

      ctx.beginPath();
      ctx.arc(x, y, r + 1.0, a0, a1);
      ctx.strokeStyle =
        frac1 > 0.82
          ? `rgba(255, 255, 248, ${0.95 * intensity})`
          : `rgba(253, 224, 71, ${0.84 * intensity})`;
      ctx.lineWidth = 1.3 + intensity * 3.0;
      ctx.stroke();
    }

    // 5. Kleiner, gestochen scharfer Lichtpunkt an der Spitze des umlaufenden Rings
    const tipX = x + Math.cos(orbitAngle) * (r + 1.0);
    const tipY = y + Math.sin(orbitAngle) * (r + 1.0);
    const tipR = Math.min(r * 0.065, 32);
    const tipGlow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, tipR);
    tipGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    tipGlow.addColorStop(0.35, "rgba(254, 240, 138, 0.5)");
    tipGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = tipGlow;
    ctx.beginPath();
    ctx.arc(tipX, tipY, tipR, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function createDoomParticle(randomY) {
    const isBright = Math.random() > 0.68;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + Math.random() * 35,
      size: isBright ? Math.random() * 12 + 7 : Math.random() * 5.5 + 3.5,
      speedY: -(Math.random() * 0.85 + 0.24),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: isBright ? Math.random() * 0.45 + 0.3 : Math.random() * 0.35 + 0.14,
      twinkle: Math.random() * 0.05 + 0.02,
      phase: Math.random() * Math.PI * 2,
      sprite: isBright ? sprites.doomEmerald : sprites.doomSoft
    };
  }
  const doomParticles = Array.from({ length: 30 }, () => createDoomParticle(true));

  // Dune Sandnebel & Sandpartikel
  const sandMistLayers = [
    { x: 0.05, y: 0.74, wFactor: 0.52, hFactor: 0.23, speed: 0.0009, alpha: 0.74, phase: 0.3, tiltAmp: 0.07, bobAmp: 22, sprite: sprites.sandMistA },
    { x: 0.42, y: 0.82, wFactor: 0.56, hFactor: 0.24, speed: 0.00125, alpha: 0.78, phase: 1.8, tiltAmp: 0.08, bobAmp: 26, sprite: sprites.sandMistB },
    { x: 0.84, y: 0.76, wFactor: 0.54, hFactor: 0.22, speed: 0.00105, alpha: 0.72, phase: 3.1, tiltAmp: 0.06, bobAmp: 20, sprite: sprites.sandMistA },
    { x: 0.2, y: 0.58, wFactor: 0.48, hFactor: 0.19, speed: 0.0016, alpha: 0.56, phase: 0.9, tiltAmp: 0.09, bobAmp: 28, sprite: sprites.sandMistB },
    { x: 0.68, y: 0.64, wFactor: 0.5, hFactor: 0.2, speed: 0.00145, alpha: 0.62, phase: 2.6, tiltAmp: 0.08, bobAmp: 24, sprite: sprites.sandMistA },
    { x: 0.35, y: 0.44, wFactor: 0.44, hFactor: 0.16, speed: 0.00135, alpha: 0.36, phase: 4.4, tiltAmp: 0.07, bobAmp: 22, sprite: sprites.sandMistB },
    { x: 0.9, y: 0.52, wFactor: 0.46, hFactor: 0.17, speed: 0.00175, alpha: 0.44, phase: 5.3, tiltAmp: 0.09, bobAmp: 26, sprite: sprites.sandMistA }
  ];

  function createSandParticle(randomX) {
    const roll = Math.random();
    const depth = 0.55 + Math.random() * 0.95;
    let sprite = sprites.sandGrain;
    let size = (Math.random() * 4 + 2.5) * depth;
    let alpha = Math.random() * 0.42 + 0.18;

    if (roll > 0.93) {
      sprite = sprites.fremenBlue;
      size = (Math.random() * 9 + 5.5) * depth;
      alpha = Math.random() * 0.46 + 0.26;
    } else if (roll > 0.76) {
      sprite = sprites.spiceGold;
      size = (Math.random() * 10 + 6) * depth;
      alpha = Math.random() * 0.52 + 0.3;
    } else if (roll > 0.42) {
      sprite = sprites.sandDustSoft;
      size = (Math.random() * 16 + 10) * depth;
      alpha = Math.random() * 0.34 + 0.12;
    }

    return {
      x: randomX ? Math.random() * width : -Math.random() * 80,
      y: Math.random() * height,
      size,
      depth,
      baseSpeedX: (Math.random() * 2.4 + 1.1) * depth,
      swirlAmp: (Math.random() * 1.1 + 0.45) * depth,
      alpha,
      twinkle: Math.random() * 0.055 + 0.02,
      phase: Math.random() * Math.PI * 2,
      sprite
    };
  }
  const sandParticles = Array.from({ length: 64 }, () => createSandParticle(true));

  let sceneClock = 0;

  function buildIncursionArc(x1, y1, x2, y2) {
    const pts = [];
    const steps = 10;
    const midYShift = (Math.random() - 0.5) * height * 0.2;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const bx = x1 + (x2 - x1) * t;
      const by = y1 + (y2 - y1) * t + Math.sin(t * Math.PI) * midYShift;
      const jitter = i === 0 || i === steps ? 0 : (Math.random() - 0.5) * 28;
      pts.push([bx, by + jitter]);
    }
    return { pts, alpha: 0.36 };
  }

  function renderDoomScene() {
    sceneClock += 0.028;

    ctx.globalAlpha = 1;
    ctx.drawImage(doomBackdrop, 0, 0);

    // Sanft wogende Zeitlinien-Äste in voller Schärfe
    ctx.lineCap = "round";
    for (let i = 0; i < baseTimelineCurves.length; i++) {
      const base = baseTimelineCurves[i];
      const live = liveTimelineCurves[i];
      const sway1 = Math.sin(sceneClock * 0.55 + base.phase) * 14;
      const sway2 = Math.cos(sceneClock * 0.45 + base.phase * 1.3) * 20;
      const swayY = Math.sin(sceneClock * 0.4 + base.phase) * 10;

      live.p0[0] = base.p0[0];
      live.p0[1] = base.p0[1];
      live.p1[0] = base.p1[0] + sway1;
      live.p1[1] = base.p1[1] + swayY * 0.5;
      live.p2[0] = base.p2[0] + sway2;
      live.p2[1] = base.p2[1] - swayY;
      live.p3[0] = base.p3[0] + sway2 * 0.55;
      live.p3[1] = base.p3[1];

      ctx.beginPath();
      ctx.moveTo(live.p0[0], live.p0[1]);
      ctx.bezierCurveTo(live.p1[0], live.p1[1], live.p2[0], live.p2[1], live.p3[0], live.p3[1]);
      ctx.strokeStyle = `rgba(16, 185, 129, ${live.a * 0.35})`;
      ctx.lineWidth = live.w * 3.2;
      ctx.stroke();

      ctx.strokeStyle = `rgba(185, 250, 225, ${live.a * 0.72})`;
      ctx.lineWidth = Math.max(0.75, live.w * 0.75);
      ctx.stroke();
    }

    for (let i = 0; i < twinklingStars.length; i++) {
      const st = twinklingStars[i];
      st.phase += st.speed;
      ctx.globalAlpha = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(st.phase));
      ctx.drawImage(sprites.starTwinkle, st.rx * width - st.size / 2, st.ry * height - st.size / 2, st.size, st.size);
    }

    for (let i = 0; i < timelineRunners.length; i++) {
      const r = timelineRunners[i];
      r.t += r.speed;
      if (r.t >= 1) {
        r.t = 0;
        r.curveIndex = Math.floor(Math.random() * liveTimelineCurves.length);
        r.speed = Math.random() * 0.0032 + 0.0016;
      }
      const curve = liveTimelineCurves[r.curveIndex];
      if (!curve) continue;
      const [px, py] = getCubicBezierPoint(curve, r.t);
      ctx.globalAlpha = 0.8 * Math.sin(r.t * Math.PI);
      ctx.drawImage(r.sprite, px - r.size / 2, py - r.size / 2, r.size, r.size);
    }

    for (let i = 0; i < doomParticles.length; i++) {
      const p = doomParticles[i];
      p.x += p.speedX + Math.sin(p.phase) * 0.14;
      p.y += p.speedY;
      p.phase += p.twinkle;

      if (p.y < -20) {
        doomParticles[i] = createDoomParticle(false);
        continue;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      ctx.globalAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));
      ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }

    const vx = anchorVormir.x + Math.sin(sceneClock * 0.72) * 14;
    const vy = anchorVormir.y + Math.cos(sceneClock * 0.88) * 24;
    const vAngle = Math.sin(sceneClock * 0.5) * 0.045;

    const nx = anchorNiflheim.x + Math.sin(sceneClock * 0.85 + 1.1) * 14;
    const ny = anchorNiflheim.y + Math.cos(sceneClock * 0.98 + 0.5) * 18;
    const nAngle = Math.cos(sceneClock * 0.65) * 0.05;

    const ax = anchorAakon.x + Math.cos(sceneClock * 0.66 + 2.2) * 18;
    const ay = anchorAakon.y + Math.sin(sceneClock * 0.82 + 1.3) * 10;
    const aAngle = Math.sin(sceneClock * 0.58 + 0.7) * 0.04;

    const ex = anchorEgo.x + Math.cos(sceneClock * 0.68) * 16;
    const ey = anchorEgo.y + Math.sin(sceneClock * 0.84 + 1.4) * 24;
    const eAngle = Math.cos(sceneClock * 0.54 + 1.1) * 0.045;

    const mx = anchorMuspelheim.x + Math.sin(sceneClock * 0.76 + 3.4) * 16;
    const my = anchorMuspelheim.y + Math.cos(sceneClock * 0.9 + 2.1) * 3;
    const mAngle = Math.sin(sceneClock * 0.62 + 2.0) * 0.04;

    if (planetVormir) renderedPlanets.vormir = { x: vx, y: vy, radius: planetVormir.radius };
    if (planetNiflheim) renderedPlanets.niflheim = { x: nx, y: ny, radius: planetNiflheim.radius };
    if (planetAakon) renderedPlanets.aakon = { x: ax, y: ay, radius: planetAakon.radius };
    if (planetEgo) renderedPlanets.ego = { x: ex, y: ey, radius: planetEgo.radius };
    if (planetMuspelheim) renderedPlanets.muspelheim = { x: mx, y: my, radius: planetMuspelheim.radius };

    const egoIntact = egoBlast.mode === "intact" || egoBlast.mode === "reforming";
    if (planetVormir && planetEgo && egoIntact) {
      const x1 = vx + planetVormir.radius * 0.92;
      const y1 = vy + planetVormir.radius * 0.14;
      const x2 = ex - planetEgo.radius * 0.92;
      const y2 = ey - planetEgo.radius * 0.12;

      for (let i = 0; i < incursionDust.length; i++) {
        const d = incursionDust[i];
        d.t += d.speed;
        if (d.t > 1) d.t = 0;
        if (d.t < 0) d.t = 1;

        const dx = x1 + (x2 - x1) * d.t;
        const dy = y1 + (y2 - y1) * d.t + Math.sin(d.t * Math.PI) * d.spread;

        ctx.globalAlpha = 0.64 * Math.sin(d.t * Math.PI);
        ctx.drawImage(d.sprite, dx - d.size / 2, dy - d.size / 2, d.size, d.size);
      }

      ctx.globalAlpha = 1;
      arcCooldown--;
      if (arcCooldown <= 0) {
        activeArc = buildIncursionArc(x1, y1, x2, y2);
        arcCooldown = 55 + Math.floor(Math.random() * 70);
      }
      if (activeArc && activeArc.alpha > 0.01) {
        ctx.beginPath();
        ctx.moveTo(activeArc.pts[0][0], activeArc.pts[0][1]);
        for (let i = 1; i < activeArc.pts.length; i++) {
          ctx.lineTo(activeArc.pts[i][0], activeArc.pts[i][1]);
        }
        ctx.strokeStyle = `rgba(110, 231, 183, ${activeArc.alpha})`;
        ctx.lineWidth = 1.15;
        ctx.stroke();

        activeArc.alpha *= 0.84;
      }
    }

    ctx.globalAlpha = 1;

    // 1) Aakon oben an der Navigationsleiste
    drawFloatingPlanet(planetAakon, ax, ay, aAngle);

    // 2) Vormir links + Schatten von Niflheim
    if (planetVormir) {
      drawFloatingPlanet(planetVormir, vx, vy, vAngle);

      if (planetNiflheim) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(vx, vy, planetVormir.radius, 0, Math.PI * 2);
        ctx.clip();

        const shadowR = planetNiflheim.radius * 1.18;
        const shadowGrad = ctx.createRadialGradient(
          nx - planetNiflheim.radius * 0.25,
          ny - planetNiflheim.radius * 0.2,
          planetNiflheim.radius * 0.2,
          nx,
          ny,
          shadowR
        );
        shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.56)");
        shadowGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.24)");
        shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, shadowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 3) Niflheim
    drawFloatingPlanet(planetNiflheim, nx, ny, nAngle);

    // 4) Ego (explodiert beim Klick, setzt sich beim Schließen wieder zusammen)
    if (planetEgo) {
      drawEgoPlanetSystem(ex, ey, planetEgo.radius, eAngle, sceneClock);
    }

    // 5) Muspelheim unten links/mittig am Rand mit edlem Lava-/Glut-Effekt
    if (planetMuspelheim) {
      drawMuspelheimWithGlow(mx, my, planetMuspelheim.radius, mAngle, sceneClock);
    }

    // Hover-Linie + leuchtender Name in der Timer-Schrift mit Verlauf-Effekt
    if (hoveredPlanetKey && renderedPlanets[hoveredPlanetKey]) {
      const rp = renderedPlanets[hoveredPlanetKey];
      drawPlanetCallout(hoveredPlanetKey, rp.x, rp.y, rp.radius, sceneClock);
    }
  }

  function renderDuneScene() {
    sceneClock += 0.025;
    const gust = 1 + 0.34 * Math.sin(sceneClock * 0.42) + 0.16 * Math.sin(sceneClock * 1.05 + 1.3);

    // 1. Himmel + äußerer Gluthof
    ctx.globalAlpha = 1;
    ctx.drawImage(duneSkyBackdrop, 0, 0);

    // 2. Große komplett schwarze Sonnenfinsternis + umlaufendes Ring-Leuchten
    drawDuneEclipse(sceneClock);

    // 3. Dünen-Silhouetten verdecken den unteren Teil der Sonnenfinsternis
    ctx.globalAlpha = 1;
    ctx.drawImage(duneDunesOverlay, 0, 0);

    // 4. Sandnebel-Schwaden wehen vor Dünen & Eclipse vorbei
    for (let i = 0; i < sandMistLayers.length; i++) {
      const m = sandMistLayers[i];
      m.x += m.speed * gust;
      const wPx = width * m.wFactor * (0.94 + 0.1 * Math.sin(sceneClock * 0.35 + m.phase));
      const hPx = height * m.hFactor * (0.92 + 0.12 * Math.cos(sceneClock * 0.42 + m.phase));

      if (m.x * width - wPx * 0.6 > width) {
        m.x = -(wPx * 0.6) / width;
      }

      const cx = m.x * width;
      const cy = m.y * height + Math.sin(sceneClock * 0.5 + m.phase) * m.bobAmp;
      const tilt = -0.05 + Math.sin(sceneClock * 0.38 + m.phase) * m.tiltAmp;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.globalAlpha = m.alpha * (0.76 + 0.24 * Math.sin(sceneClock * 0.45 + m.phase));
      ctx.drawImage(m.sprite, -wPx / 2, -hPx / 2, wPx, hPx);
      ctx.restore();
    }

    // 5. Sandkörner, Staub & Spice
    for (let i = 0; i < sandParticles.length; i++) {
      const p = sandParticles[i];
      p.phase += p.twinkle;

      const turbY =
        Math.sin(p.x * 0.007 + sceneClock * 0.9 + p.phase) * p.swirlAmp +
        Math.cos(p.y * 0.01 - sceneClock * 0.6) * (p.swirlAmp * 0.45);
      const turbX = Math.sin(p.y * 0.009 + sceneClock * 0.7) * 0.45;

      p.x += (p.baseSpeedX + turbX) * gust;
      p.y += turbY - 0.14 * gust;

      if (p.x > width + 30) {
        sandParticles[i] = createSandParticle(false);
        continue;
      }
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;

      ctx.globalAlpha = p.alpha * (0.62 + 0.38 * Math.sin(p.phase));
      ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  const FRAME_INTERVAL = 1000 / 30;
  let lastFrameTime = 0;
  let animId = null;

  function animate(timestamp) {
    if (document.hidden) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
    lastFrameTime = timestamp;

    if (activeWorld === "dune") {
      renderDuneScene();
    } else {
      renderDoomScene();
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && animId === null) {
      lastFrameTime = 0;
      animId = requestAnimationFrame(animate);
    }
  });

  animId = requestAnimationFrame(animate);
}

// ================= HILFSFUNKTIONEN =================
function formatMinutes(totalMin) {
  const hrs = Math.floor(totalMin / 60);
  const mins = Math.round(totalMin % 60);
  if (hrs === 0) return `${mins} Min.`;
  if (mins === 0) return `${hrs} Std.`;
  return `${hrs} Std. ${mins} Min.`;
}

function isItemWatched(item) {
  if (item.type === "movie") {
    return Boolean(state.watchedMovies[item.id]);
  }
  return item.episodes.every(ep => Boolean(state.watchedEpisodes[ep.id]));
}

function getSeriesStats(item) {
  const total = item.episodes.length;
  const done = item.episodes.filter(ep => state.watchedEpisodes[ep.id]).length;
  const totalMin = item.episodes.reduce((sum, ep) => sum + ep.runtime, 0);
  const doneMin = item.episodes.reduce((sum, ep) => sum + (state.watchedEpisodes[ep.id] ? ep.runtime : 0), 0);
  return { total, done, totalMin, doneMin };
}

function addOneMonthSafe(date) {
  const d = new Date(date.getTime());
  const originalDay = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(originalDay, lastDayOfMonth));
  return d;
}

function getCalendarDiff(now, target) {
  if (target <= now) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let temp = new Date(now.getTime());
  let months = 0;

  while (true) {
    const nextMonth = addOneMonthSafe(temp);
    if (nextMonth <= target) {
      months++;
      temp = nextMonth;
    } else {
      break;
    }
  }

  const diffMs = target - temp;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { months, days, hours, minutes, seconds };
}

// ================= ALLE COUNTDOWNS =================
function renderSingleTimer(prefix, targetDate) {
  const diff = getCalendarDiff(new Date(), targetDate);

  document.getElementById(`${prefix}-months`).textContent = String(diff.months).padStart(2, "0");
  document.getElementById(`${prefix}-days`).textContent = String(diff.days).padStart(2, "0");
  document.getElementById(`${prefix}-hours`).textContent = String(diff.hours).padStart(2, "0");
  document.getElementById(`${prefix}-minutes`).textContent = String(diff.minutes).padStart(2, "0");
  document.getElementById(`${prefix}-seconds`).textContent = String(diff.seconds).padStart(2, "0");
}

function updateCountdowns() {
  renderSingleTimer("primary", DOOMSDAY_CINEMA_DATE);
  renderSingleTimer("secondary", DOOMSDAY_RELEASE_DATE);

  renderSingleTimer("dune-primary", DUNE_CINEMA_DATE);
  renderSingleTimer("dune-secondary", DUNE_RELEASE_DATE);
}

// ================= DOOMSDAY STATISTIK & WATCHLIST =================
function updateDoomsdayStats() {
  const totalItems = WATCHLIST_DATA.length;
  let doneItems = 0;
  let totalMinutes = 0;
  let doneMinutes = 0;
  let totalEpisodes = 0;
  let doneEpisodes = 0;

  WATCHLIST_DATA.forEach(item => {
    if (item.type === "movie") {
      totalMinutes += item.runtime;
      if (state.watchedMovies[item.id]) {
        doneItems += 1;
        doneMinutes += item.runtime;
      }
    } else {
      const s = getSeriesStats(item);
      totalMinutes += s.totalMin;
      doneMinutes += s.doneMin;
      totalEpisodes += s.total;
      doneEpisodes += s.done;
      if (s.done === s.total) doneItems += 1;
    }
  });

  const remainingMinutes = Math.max(0, totalMinutes - doneMinutes);
  const percent = totalMinutes > 0 ? Math.round((doneMinutes / totalMinutes) * 100) : 0;

  const now = new Date();
  const daysLeft = Math.max(1, Math.ceil((DOOMSDAY_CINEMA_DATE - now) / (1000 * 60 * 60 * 24)));
  const dailyMinutes = remainingMinutes > 0 ? Math.ceil(remainingMinutes / daysLeft) : 0;

  document.getElementById("stat-completed").textContent = `${doneItems} / ${totalItems} Titel`;
  document.getElementById("stat-episodes-info").textContent = `${doneEpisodes} / ${totalEpisodes} Serienfolgen abgehakt`;
  document.getElementById("stat-remaining").textContent = formatMinutes(remainingMinutes);
  document.getElementById("stat-total-info").textContent = `von insgesamt ${formatMinutes(totalMinutes)}`;
  document.getElementById("stat-daily").textContent = `${formatMinutes(dailyMinutes)} / Tag`;

  let paceText = "Alles erledigt – ihr seid perfekt vorbereitet!";
  if (remainingMinutes > 0) {
    if (dailyMinutes <= 75) paceText = `Noch ${daysLeft} Tage – richtig entspanntes Tempo!`;
    else if (dailyMinutes <= 125) paceText = `Noch ${daysLeft} Tage – super gut schaffbar!`;
    else paceText = `Noch ${daysLeft} Tage – perfekter Grund für gemütliche Filmabende!`;
  }
  document.getElementById("stat-pace-note").textContent = paceText;

  document.getElementById("progress-percent").textContent = `${percent} %`;
  document.getElementById("progress-bar-fill").style.width = `${percent}%`;
}

function renderDoomsdayWatchlist() {
  const container = document.getElementById("watchlist-container");
  container.innerHTML = "";

  WATCHLIST_DATA.forEach((item, index) => {
    const watched = isItemWatched(item);
    const card = document.createElement("div");
    card.className = `item-card${watched ? " watched" : ""}${lastCheckedCardId === item.id ? " just-checked" : ""}`;

    const row = document.createElement("div");
    row.className = `item-row${item.type === "series" ? " clickable" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-check";
    checkbox.checked = watched;

    if (item.type === "series") {
      const s = getSeriesStats(item);
      if (s.done > 0 && s.done < s.total) {
        checkbox.indeterminate = true;
      }
    }

    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
      if (item.type === "movie") {
        state.watchedMovies[item.id] = checkbox.checked;
        lastCheckedCardId = checkbox.checked ? item.id : null;
      } else {
        const setTo = !isItemWatched(item);
        item.episodes.forEach(ep => {
          state.watchedEpisodes[ep.id] = setTo;
        });
        lastCheckedCardId = setTo ? item.id : null;
      }
      saveState();
      renderDoomsdayWatchlist();
      updateDoomsdayStats();
      lastCheckedCardId = null;
    });

    const num = document.createElement("div");
    num.className = "item-number";
    num.textContent = `${index + 1}.`;

    const info = document.createElement("div");
    info.className = "item-info";

    const badgeType = item.type === "series"
      ? `<span class="badge badge-serie">Serie</span>`
      : `<span class="badge badge-film">Film</span>`;

    let metaText = `${item.year} • ${item.note}`;
    let runtimeText = "";

    if (item.type === "movie") {
      runtimeText = formatMinutes(item.runtime);
    } else {
      const s = getSeriesStats(item);
      metaText = `${item.year} • ${s.done} von ${s.total} Folgen gesehen`;
      runtimeText = formatMinutes(s.totalMin);
    }

    info.innerHTML = `
      <div class="item-title-line">
        <span class="item-title">${item.title}</span>
        ${badgeType}
      </div>
      <div class="item-meta">${metaText}</div>
    `;

    const right = document.createElement("div");
    right.className = "item-right";

    const runtimeEl = document.createElement("span");
    runtimeEl.className = "runtime-tag";
    runtimeEl.textContent = runtimeText;
    right.appendChild(runtimeEl);

    if (item.type === "series") {
      const isOpen = Boolean(openAccordions[item.id]);
      const expandBtn = document.createElement("button");
      expandBtn.type = "button";
      expandBtn.className = "expand-btn";
      expandBtn.textContent = isOpen ? "Einklappen ▲" : "Folgen ▼";

      const togglePanel = () => {
        openAccordions[item.id] = !openAccordions[item.id];
        renderDoomsdayWatchlist();
      };

      expandBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePanel();
      });
      row.addEventListener("click", togglePanel);
      right.appendChild(expandBtn);
    }

    row.appendChild(checkbox);
    row.appendChild(num);
    row.appendChild(info);
    row.appendChild(right);
    card.appendChild(row);

    if (item.type === "series") {
      const epPanel = document.createElement("div");
      epPanel.className = `episodes-panel${openAccordions[item.id] ? " open" : ""}`;

      let lastSeason = null;

      item.episodes.forEach(ep => {
        if (ep.season && ep.season !== lastSeason) {
          const seasonEl = document.createElement("div");
          seasonEl.className = "season-heading";
          seasonEl.textContent = ep.season;
          epPanel.appendChild(seasonEl);
          lastSeason = ep.season;
        }

        const epDone = Boolean(state.watchedEpisodes[ep.id]);
        const epRow = document.createElement("div");
        epRow.className = `episode-row${epDone ? " ep-watched" : ""}`;

        const label = document.createElement("label");
        label.className = "episode-left";

        const epCheck = document.createElement("input");
        epCheck.type = "checkbox";
        epCheck.checked = epDone;
        epCheck.addEventListener("change", () => {
          state.watchedEpisodes[ep.id] = epCheck.checked;
          if (epCheck.checked) lastCheckedCardId = item.id;
          saveState();
          renderDoomsdayWatchlist();
          updateDoomsdayStats();
          lastCheckedCardId = null;
        });

        const epTitle = document.createElement("span");
        epTitle.className = "episode-title";
        epTitle.textContent = ep.title;

        label.appendChild(epCheck);
        label.appendChild(epTitle);

        const epTime = document.createElement("span");
        epTime.className = "episode-time";
        epTime.textContent = `${ep.runtime} Min.`;

        epRow.appendChild(label);
        epRow.appendChild(epTime);
        epPanel.appendChild(epRow);
      });

      card.appendChild(epPanel);
    }

    container.appendChild(card);
  });
}

// ================= DUNE STATISTIK & WATCHLIST =================
function updateDuneStats() {
  const totalItems = DUNE_WATCHLIST_DATA.length;
  let doneItems = 0;
  let totalMinutes = 0;
  let doneMinutes = 0;

  DUNE_WATCHLIST_DATA.forEach(item => {
    totalMinutes += item.runtime;
    if (state.watchedDune[item.id]) {
      doneItems += 1;
      doneMinutes += item.runtime;
    }
  });

  const remainingMinutes = Math.max(0, totalMinutes - doneMinutes);
  const percent = totalMinutes > 0 ? Math.round((doneMinutes / totalMinutes) * 100) : 0;

  const now = new Date();
  const daysLeft = Math.max(1, Math.ceil((DUNE_CINEMA_DATE - now) / (1000 * 60 * 60 * 24)));
  const dailyMinutes = remainingMinutes > 0 ? Math.ceil(remainingMinutes / daysLeft) : 0;

  document.getElementById("dune-stat-completed").textContent = `${doneItems} / ${totalItems} Filme`;
  document.getElementById("dune-stat-sub").textContent =
    doneItems === totalItems ? "Vollständig bereit für Arrakis!" : "Teil 1 & Teil 2 vor dem Kinobesuch";
  document.getElementById("dune-stat-remaining").textContent = formatMinutes(remainingMinutes);
  document.getElementById("dune-stat-total-info").textContent = `von insgesamt ${formatMinutes(totalMinutes)}`;
  document.getElementById("dune-stat-daily").textContent = `${formatMinutes(dailyMinutes)} / Tag`;

  document.getElementById("dune-stat-pace-note").textContent =
    remainingMinutes === 0
      ? "Perfekt vorbereitet für 16:00 Uhr!"
      : `Noch ${daysLeft} Tage – perfekt für zwei gemütliche Abende!`;

  document.getElementById("dune-progress-percent").textContent = `${percent} %`;
  document.getElementById("dune-progress-bar-fill").style.width = `${percent}%`;
}

function renderDuneWatchlist() {
  const container = document.getElementById("dune-watchlist-container");
  container.innerHTML = "";

  DUNE_WATCHLIST_DATA.forEach((item, index) => {
    const watched = Boolean(state.watchedDune[item.id]);
    const card = document.createElement("div");
    card.className = `item-card${watched ? " watched" : ""}${lastCheckedDuneId === item.id ? " just-checked" : ""}`;

    const row = document.createElement("div");
    row.className = "item-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-check";
    checkbox.checked = watched;

    checkbox.addEventListener("change", () => {
      state.watchedDune[item.id] = checkbox.checked;
      lastCheckedDuneId = checkbox.checked ? item.id : null;
      saveState();
      renderDuneWatchlist();
      updateDuneStats();
      lastCheckedDuneId = null;
    });

    const num = document.createElement("div");
    num.className = "item-number";
    num.textContent = `${index + 1}.`;

    const info = document.createElement("div");
    info.className = "item-info";
    info.innerHTML = `
      <div class="item-title-line">
        <span class="item-title">${item.title}</span>
        <span class="badge badge-film">Film</span>
      </div>
      <div class="item-meta">${item.year} • ${item.note}</div>
    `;

    const right = document.createElement("div");
    right.className = "item-right";

    const runtimeEl = document.createElement("span");
    runtimeEl.className = "runtime-tag";
    runtimeEl.textContent = formatMinutes(item.runtime);
    right.appendChild(runtimeEl);

    row.appendChild(checkbox);
    row.appendChild(num);
    row.appendChild(info);
    row.appendChild(right);
    card.appendChild(row);
    container.appendChild(card);
  });
}

// ================= START =================
initClickRipple();
initNavAudioPlayer();
updateWorldAssets(activeWorld);
initPlanetClickCard();
initEpicTitleGlow();
initTimerTapToggle();
initNavigation();
initSynopsisToggles();
initCursorGlow();
initSceneBackground();
updateCountdowns();
setInterval(updateCountdowns, 1000);
renderDoomsdayWatchlist();
updateDoomsdayStats();
renderDuneWatchlist();
updateDuneStats();