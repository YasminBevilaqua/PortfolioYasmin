import { createElement, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import {
  ArrowUpRight,
  AudioLines,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Menu,
  MousePointer2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';

const StarsBackground = lazy(() => import('./StarsBackground.jsx'));
const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;
const PAGE_LOADER_MIN_MS = 900;
const PROJECT_AUTOPLAY_SPEED = 36;
const PROJECT_AUTOPLAY_INTERVAL_MS = 4000;

const experiences = [
  {
    role: 'Desenvolvedora de Software',
    company: 'Delta Sollutions',
    period: '2025 – 2026',
    details: [
      'Desenvolvimento Front-End com React e Next.js.',
      'Integração com APIs REST e implementação de soluções com IA.',
      'Aplicações React Native com Expo e integração com hardware via serial.',
      'Atenção à performance e à escalabilidade.',
    ],
  },
  {
    role: 'Programa Delta — Desafio Mobile App',
    company: 'Delta Sollutions — SEDE',
    period: '2025',
    details: [
      'Desenvolvimento de aplicações mobile e web com React Native, Expo, Python e FastAPI, incluindo APIs REST em arquitetura por camadas.',
      'Integração com Firebase e Supabase para autenticação, operações CRUD e persistência de dados.',
      'Uso de Git, componentes reutilizáveis, testes manuais e validação funcional.',
    ],
  },
  {
    role: 'Desenvolvedora Web / Web Designer',
    company: 'SASI Brasil — Projeto SEDUC Amazonas',
    period: '2024 – 2025',
    details: [
      'Desenvolvimento com React, Next.js, HTML, CSS e JavaScript.',
      'Criação de interfaces responsivas e integração com APIs em FastAPI.',
      'Desenvolvimento com React Native.',
    ],
  },
  {
    role: 'Programa Desenvolvedor Full Stack',
    company: 'SENAC AM — Centro Especializado de Informática',
    period: '2024',
    details: [
      'Formação intensiva em desenvolvimento web Full Stack: interfaces responsivas com HTML, CSS e JavaScript, back-end e bancos de dados relacionais com SQL.',
      'Projeto integrador de aplicação web completa, com testes, depuração e boas práticas de usabilidade e acessibilidade.',
      'Prática de lógica de programação, estruturação de sistemas, modelagem de dados e organização de código.',
    ],
  },
];

const projects = [
  {
    title: 'NebulaMind',
    description:
      'Chat com IA que transforma conversas em experiência: respostas naturais, interface imersiva e um fluxo pensado para levar do primeiro prompt ao insight final.',
    image: publicAsset('project-nebulamind.png'),
    imageAlt: 'Capa do projeto NebulaMind',
    icon: Sparkles,
    stack: ['Vite', 'React', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Groq', 'Three.js'],
    liveUrl: 'https://nebulamind-ai.vercel.app/',
    githubUrl: 'https://github.com/YasminBevilaqua/NebulaMind',
  },
  {
    title: 'Spatialify',
    description:
      'Extensão de navegador que transforma áudio comum em uma experiência espacial imersiva, adicionando profundidade, direção e movimento em tempo real.',
    image: publicAsset('project-spatialify.png'),
    imageAlt: 'Capa do projeto Spatialify',
    icon: AudioLines,
    stack: ['HTML', 'CSS', 'JavaScript', 'Mozilla Add-ons'],
    liveUrl: 'https://yasminbevilaqua.github.io/SpatialifyWebSite/',
    githubUrl: 'https://github.com/YasminBevilaqua/Spatialify',
  },
  {
    title: 'SouJunior Apoia.se',
    description:
      'Landing page para apresentar a iniciativa SouJunior, destacar seu impacto social e convidar apoiadores a contribuir pelo Apoia.se.',
    image: publicAsset('project-soujunior.png'),
    imageAlt: 'Capa do projeto SouJunior Apoia.se',
    icon: Code2,
    stack: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
    liveUrl: 'https://soujunior-apoiase-landing-llgj.vercel.app/',
    githubUrl: 'https://github.com/inovacao-squad/soujunior-apoiase-landing',
  },
  {
    title: 'Studio Blush',
    description:
      'SDK open-source de maquiagem virtual e remodelagem facial em realidade aumentada, com rastreamento em tempo real direto no navegador.',
    image: publicAsset('project-studioblush.png'),
    imageAlt: 'Capa do projeto Studio Blush',
    icon: Sparkles,
    stack: ['JavaScript', 'Three.js', 'MediaPipe', 'WebGL', 'GLSL'],
    githubUrl: 'https://github.com/YasminBevilaqua/StudioBlush',
  },
  {
    title: 'MouseVirtual',
    description:
      'Mouse virtual controlado por gestos: usa a webcam e o MediaPipe para rastrear as mãos e transformar movimentos em comandos para o computador.',
    image: publicAsset('project-mousevirtual.png'),
    imageAlt: 'Capa do projeto MouseVirtual',
    icon: MousePointer2,
    stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'pynput'],
    githubUrl: 'https://github.com/YasminBevilaqua/MouseVirtual',
  },
];

const getCarouselMetrics = (viewport) => {
  const firstSlide = viewport.firstElementChild;
  if (!firstSlide) return { activeIndex: 0 };

  const gap = Number.parseFloat(window.getComputedStyle(viewport).columnGap) || 0;
  const step = firstSlide.getBoundingClientRect().width + gap;
  const activeIndex = Math.round(viewport.scrollLeft / step) % projects.length;

  return { activeIndex };
};

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bevilaquadev/',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yasmin-bevilaqua/',
    icon: Linkedin,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    icon: MessageCircle,
  },
  {
    label: 'Email',
    href: 'mailto:yayabevilaqua@gmail.com',
    icon: Mail,
  },
];

const techIcons = [
  { name: 'HTML', file: 'html.png', color: '#E34F26' },
  { name: 'CSS', file: 'css.png', color: '#1572B6' },
  { name: 'JavaScript', file: 'javascript.png', color: '#F7DF1E' },
  { name: 'TypeScript', file: 'typescript.png', color: '#3178C6' },
  { name: 'React', file: 'react.png', color: '#61DAFB' },
  { name: 'React Native', file: 'react native.png', color: '#61DAFB' },
  { name: 'Tailwind CSS', file: 'tailwind.png', color: '#38BDF8' },
  { name: 'Three.js', file: 'three.js.png', color: '#8B5CF6' },
  { name: 'Vite', file: 'vite.png', color: '#646CFF' },
  { name: 'Vue.js', file: 'vue.js.png', color: '#42B883' },
  { name: 'Python', file: 'python.png', color: '#3776AB' },
];

function TechIconsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(() => (
    window.innerWidth <= 650
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : null
  ));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 650);
  const [columns, setColumns] = useState(() => {
    if (window.innerWidth <= 750) return 3;
    if (window.innerWidth <= 900) return 4;
    return 6;
  });

  useEffect(() => {
    const syncColumns = () => {
      const nextIsMobile = window.innerWidth <= 650;
      const shouldHighlight = nextIsMobile
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(nextIsMobile);
      setHoveredIndex((current) => shouldHighlight ? current ?? 0 : null);
      const nextColumns = window.innerWidth <= 750 ? 3 : window.innerWidth <= 900 ? 4 : 6;
      setColumns((current) => current === nextColumns ? current : nextColumns);
    };

    window.addEventListener('resize', syncColumns);
    return () => window.removeEventListener('resize', syncColumns);
  }, []);

  useEffect(() => {
    if (!isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let activeIndex = 0;
    const interval = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % techIcons.length;
      setHoveredIndex(activeIndex);
    }, 900);

    return () => window.clearInterval(interval);
  }, [isMobile]);

  const renderIcon = (tech, index) => {
    const active = hoveredIndex === index;
    const sameRow = hoveredIndex !== null
      && Math.floor(hoveredIndex / columns) === Math.floor(index / columns);
    const shift = sameRow && !active ? (index < hoveredIndex ? -10 : 10) : 0;
    const scale = active ? 1.12 : 1;

    return (
      <div
        className={`tech-icon-cell${active ? ' tech-icon-cell-active' : ''}`}
        key={tech.name}
        style={{
          '--tech-color': tech.color,
          transform: `translateX(${shift}px) scale(${scale})`,
          zIndex: active ? 2 : 1,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onFocus={() => setHoveredIndex(index)}
      >
        <a
          className="tech-icon-link"
          href="#sobre"
          aria-label={tech.name}
          onClick={(event) => event.preventDefault()}
          onBlur={() => setHoveredIndex(null)}
        >
          <span className="tech-icon-name">{tech.name}</span>
          <span className="tech-icon-stack">
            <img className="tech-icon-img" src={publicAsset(`images/${encodeURIComponent(tech.file)}`)} alt="" draggable="false" />
            <img className="tech-icon-reflect" src={publicAsset(`images/${encodeURIComponent(tech.file)}`)} alt="" aria-hidden="true" draggable="false" />
          </span>
        </a>
      </div>
    );
  };

  return (
    <div
      className="tech-icon-grid"
      aria-label="Tecnologias"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {techIcons.map(renderIcon)}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

const playlist = [
  {
    title: 'Hear Me Now',
    artist: 'Alok, Bruno Martini feat. Zeeba',
    mood: 'CLUB EDIT',
    color: '#ef9acb',
    cover: 'https://cdn-images.dzcdn.net/images/cover/666f254b772127dd8b15954d4f52af16/250x250-000000-80-0-0.jpg',
    source: publicAsset('audio/hear-me-now.mp3'),
  },
  {
    title: 'Never Let Me Go',
    artist: 'Alok feat. Zeeba',
    mood: 'RADIO EDIT',
    color: '#8ec5ff',
    cover: 'https://cdn-images.dzcdn.net/images/cover/33af72cf5d034401a550047993904f26/250x250-000000-80-0-0.jpg',
    source: publicAsset('audio/Never Let Me Go Radio Edit.mp3'),
  },
  {
    title: 'Wild One',
    artist: 'Lucky Rose feat. Tep No',
    mood: 'DANCE',
    color: '#f5b96b',
    cover: 'https://cdn-images.dzcdn.net/images/cover/2e42982f9872e2a561ea3e40434f1c3b/250x250-000000-80-0-0.jpg',
    source: publicAsset('audio/Lucky Rose - Wild One feat. Tep No (Cover Art).mp3'),
  },
  {
    title: 'Halfway',
    artist: 'Yves V with Bhaskar',
    mood: 'ELECTRONIC',
    color: '#9fe0c0',
    cover: 'https://cdn-images.dzcdn.net/images/cover/ead044f28f99cf94419963165144a477/250x250-000000-80-0-0.jpg',
    source: publicAsset('audio/Halfway (with Bhaskar).mp3'),
  },
];

function MiniPlaylist({ navElement, navScrolled }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [mobilePlayerExpanded, setMobilePlayerExpanded] = useState(false);
  const [mobileWidgetDismissed, setMobileWidgetDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.16);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const audioRef = useRef(null);
  const resumePlaybackRef = useRef(false);
  const track = playlist[trackIndex];

  const selectTrack = (nextIndex) => {
    const audio = audioRef.current;
    resumePlaybackRef.current = Boolean(audio && !audio.paused);
    if (audio) audio.pause();
    setTrackIndex((nextIndex + playlist.length) % playlist.length);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    setHasPlaybackError(false);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
          setMobileWidgetDismissed(false);
          setHasPlaybackError(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setHasPlaybackError(true);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !resumePlaybackRef.current) return;

    resumePlaybackRef.current = false;
    audio.volume = volume;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setHasPlayed(true);
        setMobileWidgetDismissed(false);
        setHasPlaybackError(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setHasPlaybackError(true);
      });
  }, [trackIndex, volume]);

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  const closeMobilePlayer = () => {
    if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
    setIsPlaying(false);
    setMobilePlayerExpanded(false);
    setMobileWidgetDismissed(true);
  };

  return (
    <>
      <div
        className={`mini-player${isPlaying ? ' mini-player-playing' : ''}`}
        aria-label={`Player da música ${track.title}`}
        style={{ '--player-cover': track.cover ? `url("${track.cover}")` : 'none' }}
      >
        <audio
          ref={audioRef}
          src={track.source}
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
          onPlay={() => {
            setIsPlaying(true);
            setHasPlayed(true);
            setMobileWidgetDismissed(false);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setIsPlaying(false);
            setHasPlaybackError(true);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
        />
        <div className="mini-player-header">
          <span className="mini-player-invite">
            <AudioLines size={13} aria-hidden="true" />
            <span>Bora ouvir uma música enquanto isso?</span>
          </span>
          {(hasPlaybackError || !isPlaying) && (
            <span className={`mini-player-live${hasPlaybackError ? ' mini-player-error' : ''}`}>
              {hasPlaybackError ? 'AUDIO ERROR' : 'PAUSED'}
            </span>
          )}
          {isPlaying && (
            <span className="mini-player-wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          )}
        </div>
        <div className="mini-player-main">
          <div className="record-cover" style={{ '--track-color': track.color }}>
            {track.cover ? (
              <img className="record-cover-image" src={track.cover} alt="" />
            ) : (
              <div className="record-label"><span>YB</span></div>
            )}
          </div>
          <div className="track-details">
            <span className="track-mood">{track.mood}</span>
            <strong>{track.title}</strong>
            <p>{track.artist}</p>
          </div>
        </div>
        <div className="mini-progress">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(event) => {
              const nextProgress = Number(event.target.value);
              setProgress(nextProgress);
              if (audioRef.current) audioRef.current.currentTime = nextProgress;
            }}
            aria-label="Progresso da faixa"
            style={{ '--progress': `${duration ? (progress / duration) * 100 : 0}%` }}
          />
          <div className="mini-time">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="mini-player-controls">
          <div className="transport-controls">
            <button type="button" onClick={() => selectTrack(trackIndex - 1)} aria-label="Faixa anterior">
              <SkipBack size={15} fill="currentColor" />
            </button>
            <button className="play-button" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pausar' : 'Tocar'}>
              {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
            </button>
            <button type="button" onClick={() => selectTrack(trackIndex + 1)} aria-label="Próxima faixa">
              <SkipForward size={15} fill="currentColor" />
            </button>
          </div>
          <label className="volume-control" aria-label="Volume">
            <Volume2 size={14} />
            <input type="range" min="0" max="0.35" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
          </label>
        </div>
        <div className="player-queue">
          <div className="player-queue-heading">
            <span>NA FILA</span>
          </div>
          {playlist.map((item, index) => (
            <button
              className={`queue-track${index === trackIndex ? ' queue-track-active' : ''}`}
              key={item.source}
              type="button"
              onClick={() => selectTrack(index)}
              aria-current={index === trackIndex ? 'true' : undefined}
            >
              <span className="queue-track-index">{index === trackIndex && isPlaying ? '♫' : String(index + 1).padStart(2, '0')}</span>
              <img className="queue-track-cover" src={item.cover} alt="" loading="lazy" />
              <span className="queue-track-copy">
                <strong>{item.title}</strong>
                <small>{item.artist}</small>
              </span>
              {index === trackIndex && <span className="queue-track-playing">{isPlaying ? 'TOCANDO' : 'SELECIONADA'}</span>}
            </button>
          ))}
        </div>
      </div>
      {navElement && navScrolled && isPlaying && createPortal(
        <div className="nav-audio-card" role="group" aria-label={`Tocando agora: ${track.title}`}>
          {track.cover ? (
            <img className="nav-audio-cover" src={track.cover} alt="" />
          ) : (
            <span className="nav-audio-icon" aria-hidden="true"><AudioLines size={17} /></span>
          )}
          <div className="nav-audio-track">
            <strong title={track.title}>{track.title}</strong>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={(event) => {
                const nextProgress = Number(event.target.value);
                setProgress(nextProgress);
                if (audioRef.current) audioRef.current.currentTime = nextProgress;
              }}
              aria-label={`Progresso de ${track.title}`}
              style={{ '--progress': `${duration ? (progress / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="nav-audio-controls">
            <button type="button" onClick={() => selectTrack(trackIndex - 1)} aria-label="Faixa anterior">
              <SkipBack size={14} fill="currentColor" />
            </button>
            <button type="button" onClick={togglePlayback} aria-label="Pausar">
              <Pause size={15} fill="currentColor" />
            </button>
            <button type="button" onClick={() => selectTrack(trackIndex + 1)} aria-label="Próxima faixa">
              <SkipForward size={14} fill="currentColor" />
            </button>
          </div>
        </div>,
        navElement,
      )}
      {navScrolled && hasPlayed && !mobileWidgetDismissed && createPortal(
        <div className="mobile-audio-widget" role="group" aria-label="Player de música">
          {mobilePlayerExpanded ? (
            <div className="mobile-audio-panel" id="mobile-audio-panel">
              <div className="mobile-audio-header">
                <button
                  className="mobile-audio-heading"
                  type="button"
                  onClick={() => setMobilePlayerExpanded(false)}
                  aria-label="Minimizar player"
                  aria-expanded="true"
                >
                  {track.cover ? (
                    <img className="mobile-audio-cover" src={track.cover} alt="" />
                  ) : (
                    <span className="mobile-audio-cover-fallback"><AudioLines size={18} /></span>
                  )}
                  <span className="mobile-audio-track-copy">
                    <strong>{track.title}</strong>
                    <small>{track.artist}</small>
                  </span>
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
                <button
                  className="mobile-audio-close"
                  type="button"
                  onClick={closeMobilePlayer}
                  aria-label="Fechar player e pausar música"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              <div className="mobile-audio-progress">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={(event) => {
                    const nextProgress = Number(event.target.value);
                    setProgress(nextProgress);
                    if (audioRef.current) audioRef.current.currentTime = nextProgress;
                  }}
                  aria-label={`Progresso de ${track.title}`}
                  style={{ '--progress': `${duration ? (progress / duration) * 100 : 0}%` }}
                />
                <div className="mobile-audio-time">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="mobile-audio-controls">
                <button type="button" onClick={() => selectTrack(trackIndex - 1)} aria-label="Faixa anterior">
                  <SkipBack size={16} fill="currentColor" />
                </button>
                <button
                  className="mobile-audio-play"
                  type="button"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? 'Pausar' : 'Retomar reprodução'}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <button type="button" onClick={() => selectTrack(trackIndex + 1)} aria-label="Próxima faixa">
                  <SkipForward size={16} fill="currentColor" />
                </button>
                <label className="mobile-audio-volume" aria-label="Volume">
                  <Volume2 size={15} aria-hidden="true" />
                  <input
                    type="range"
                    min="0"
                    max="0.35"
                    step="0.01"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                  />
                </label>
              </div>
            </div>
          ) : (
            <button
              className="mobile-audio-trigger"
              type="button"
              onClick={() => setMobilePlayerExpanded(true)}
              aria-label={`Abrir controles de ${track.title}`}
              aria-expanded="false"
            >
              {track.cover ? (
                <img className="mobile-audio-cover" src={track.cover} alt="" />
              ) : (
                <span className="mobile-audio-cover-fallback"><AudioLines size={18} /></span>
              )}
              <span className="mobile-audio-trigger-copy">
                <strong>{track.title}</strong>
                <small>{isPlaying ? 'TOCANDO AGORA' : 'PAUSADA'}</small>
              </span>
              {isPlaying && <AudioLines className="mobile-audio-live" size={17} aria-hidden="true" />}
              <ChevronUp size={18} aria-hidden="true" />
            </button>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}

function ProjectCard({ project, index, total, isClone = false }) {
  const Icon = project.icon;

  return (
    <article
      className={`project-card project-card-${index + 1}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}: ${project.title}`}
      aria-hidden={isClone || undefined}
    >
      {project.image ? (
        <a
          className="project-image-link"
          href={project.liveUrl || project.githubUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={isClone ? -1 : undefined}
          aria-label={`Abrir ${project.title}`}
        >
          <img
            className="project-image"
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
          />
          <span className="image-open-icon" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </a>
      ) : (
        <div className="project-placeholder" aria-hidden="true">
          <Icon size={34} strokeWidth={1.4} />
          <span>DATA / VISUALS</span>
        </div>
      )}

      <div className="project-content">
        <div className="project-title-row">
          <div className="project-icon" aria-hidden="true">
            <Icon size={19} />
          </div>
          <h3>{project.title}</h3>
        </div>
        <p className="project-description">{project.description}</p>
        <ul className="tag-list" aria-label={`Tecnologias usadas em ${project.title}`}>
          {project.stack.map((item) => (
            <li className="tag" key={item}>
              {item}
            </li>
          ))}
        </ul>
        {(project.liveUrl || project.githubUrl) && (
          <div className="project-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" tabIndex={isClone ? -1 : undefined}>
                Ver projeto <ExternalLink size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" tabIndex={isClone ? -1 : undefined}>
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [navElement, setNavElement] = useState(null);
  const [starsOpacity, setStarsOpacity] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mobileProjectStep, setMobileProjectStep] = useState(0);
  const projectCarouselRef = useRef(null);
  const lastProjectIndex = projects.length - 1;
  const mobileProjectIndices = [
    (Math.floor((mobileProjectStep + 1) / 2) * 2) % projects.length,
    (Math.floor(mobileProjectStep / 2) * 2 + 1) % projects.length,
  ];
  const isMobileCarousel = window.matchMedia('(max-width: 650px)').matches;
  const activeProjectDisplayIndex = isMobileCarousel ? mobileProjectIndices[0] : activeProjectIndex;

  const scrollToProject = useCallback((index) => {
    const viewport = projectCarouselRef.current;
    if (!viewport) return;

    const isMobile = window.matchMedia('(max-width: 650px)').matches;
    const targetIndex = Math.max(0, Math.min(index, lastProjectIndex));
    if (isMobile) {
      for (let step = 0; step < projects.length * 2; step += 2) {
        if ((Math.floor((step + 1) / 2) * 2) % projects.length === targetIndex) {
          setMobileProjectStep(step);
          break;
        }
      }
      return;
    }

    const slide = viewport.children[targetIndex];
    if (!slide) return;

    const viewportRect = viewport.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const left = viewport.scrollLeft + slideRect.left - viewportRect.left;
    viewport.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    setActiveProjectIndex(targetIndex);
  }, [lastProjectIndex]);

  const moveProjectPage = useCallback((direction) => {
    const viewport = projectCarouselRef.current;
    if (!viewport) return;

    if (!window.matchMedia('(max-width: 650px)').matches) {
      scrollToProject(activeProjectIndex + direction);
      return;
    }

    setMobileProjectStep((step) => (
      (step + direction + (projects.length * 2)) % (projects.length * 2)
    ));
  }, [activeProjectIndex, scrollToProject]);

  const updateActiveProject = useCallback((viewport) => {
    const { activeIndex } = getCarouselMetrics(viewport);
    setActiveProjectIndex(activeIndex);
  }, []);

  useEffect(() => {
    const viewport = projectCarouselRef.current;
    if (!viewport) return undefined;

    const updateCarouselOnResize = () => {
      if (!window.matchMedia('(max-width: 650px)').matches) {
        updateActiveProject(viewport);
      }
    };
    updateCarouselOnResize();
    window.addEventListener('resize', updateCarouselOnResize);

    return () => window.removeEventListener('resize', updateCarouselOnResize);
  }, [updateActiveProject]);

  useEffect(() => {
    const viewport = projectCarouselRef.current;
    const carousel = viewport?.parentElement;
    if (!viewport || !carousel) return undefined;

    const mobileQuery = window.matchMedia('(max-width: 650px)');
    const getCycleWidth = () => {
      const firstSlide = viewport.children[0];
      const firstDuplicate = viewport.children[projects.length];
      if (!firstSlide || !firstDuplicate) return 0;
      return firstDuplicate.getBoundingClientRect().left - firstSlide.getBoundingClientRect().left;
    };

    let cycleWidth = getCycleWidth();
    let previousFrameTime = 0;
    let preciseScrollLeft = viewport.scrollLeft;
    let previousScrollLeft = viewport.scrollLeft;
    let animationFrame;
    let autoplayInterval;
    const updateCycleWidth = () => {
      cycleWidth = getCycleWidth();
    };

    const moveCarousel = (frameTime) => {
      if (carousel.matches(':hover')) {
        preciseScrollLeft = viewport.scrollLeft;
      } else if (previousFrameTime) {
        const elapsed = Math.min(frameTime - previousFrameTime, 50);
        if (Math.abs(viewport.scrollLeft - previousScrollLeft) > 1) {
          preciseScrollLeft = viewport.scrollLeft;
        }
        preciseScrollLeft += (PROJECT_AUTOPLAY_SPEED * elapsed) / 1000;
        if (cycleWidth > 0 && preciseScrollLeft >= cycleWidth) {
          preciseScrollLeft %= cycleWidth;
        }
        viewport.scrollLeft = preciseScrollLeft;
      }

      previousFrameTime = frameTime;
      previousScrollLeft = viewport.scrollLeft;
      animationFrame = window.requestAnimationFrame(moveCarousel);
    };

    const startAutoplay = () => {
      if (mobileQuery.matches) {
        autoplayInterval = window.setInterval(() => {
          setMobileProjectStep((step) => (step + 1) % (projects.length * 2));
        }, PROJECT_AUTOPLAY_INTERVAL_MS);
        return;
      }

      previousFrameTime = 0;
      animationFrame = window.requestAnimationFrame(moveCarousel);
    };

    const stopAutoplay = () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearInterval(autoplayInterval);
    };
    const handleMotionModeChange = () => {
      stopAutoplay();
      updateCycleWidth();
      startAutoplay();
    };

    window.addEventListener('resize', updateCycleWidth);
    mobileQuery.addEventListener('change', handleMotionModeChange);
    startAutoplay();

    return () => {
      stopAutoplay();
      window.removeEventListener('resize', updateCycleWidth);
      mobileQuery.removeEventListener('change', handleMotionModeChange);
    };
  }, []);

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return undefined;

    const startedAt = performance.now();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hideTimer;
    let removeTimer;

    const hideLoader = () => {
      loadingScreen.classList.add('page-loader--out');
      loadingScreen.setAttribute('aria-busy', 'false');
      removeTimer = window.setTimeout(() => loadingScreen.remove(), 600);
    };

    if (prefersReducedMotion) {
      hideLoader();
    } else {
      const remaining = Math.max(0, PAGE_LOADER_MIN_MS - (performance.now() - startedAt));
      hideTimer = window.setTimeout(hideLoader, remaining);
    }

    return () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const updateNavScrolled = () => setNavScrolled(window.scrollY > 32);
    updateNavScrolled();
    window.addEventListener('scroll', updateNavScrolled, { passive: true });

    return () => window.removeEventListener('scroll', updateNavScrolled);
  }, []);

  useEffect(() => {
    const updateStarsOpacity = () => {
      const projects = document.getElementById('projetos');
      if (!projects) return;

      const scrollOffset = Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
      const fadeDistance = Math.min(window.innerHeight * 0.7, 640);
      const progress = Math.max(
        0,
        Math.min(1, (scrollOffset + fadeDistance - projects.getBoundingClientRect().top) / fadeDistance),
      );
      setStarsOpacity((current) => Math.abs(current - progress) < 0.005 ? current : progress);
    };

    updateStarsOpacity();
    window.addEventListener('scroll', updateStarsOpacity, { passive: true });
    window.addEventListener('resize', updateStarsOpacity);

    return () => {
      window.removeEventListener('scroll', updateStarsOpacity);
      window.removeEventListener('resize', updateStarsOpacity);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <Suspense fallback={null}>
        <StarsBackground style={{ opacity: starsOpacity }} />
      </Suspense>
      <nav
        ref={setNavElement}
        className={`site-nav${navScrolled ? ' site-nav-scrolled' : ''}`}
        aria-label="Navegação principal"
      >
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Yasmin Beviláqua, início">
          <img className="brand-logo" src={publicAsset('logoya.png')} alt="" />
          <span className="brand-name">Yasmin<span>.</span></span>
        </a>

        <button
          className={`menu-toggle${menuOpen ? ' menu-toggle-open' : ''}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className={`nav-links${menuOpen ? ' nav-links-open' : ''}`}>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#experiencia" onClick={closeMenu}>Experiência</a>
          <a href="#projetos" onClick={closeMenu}>Projetos</a>
          <a className="nav-contact" href="#contato" onClick={closeMenu}>Contato <ArrowUpRight size={15} /></a>
        </div>
      </nav>

      <section className="hero section-shell" id="inicio">
        <div className="hero-copy">
          <h1>Olá, eu sou a <span>Yasmin.</span></h1>
          <p className="hero-lead">Transformando ideias em experiências digitais<span className="accent">.</span></p>
          <p className="hero-description">
            Desenvolvo interfaces com personalidade, cuidado visual e atenção a cada interação.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:yayabevilaqua@gmail.com">
              <Mail size={17} /> Vamos conversar
            </a>
            <a className="button button-quiet" href="https://github.com/YasminBevilaqua" target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub
            </a>
          </div>
        </div>

        <article className="hero-about-card" id="sobre">
          <div className="hero-about-copy">
            <p className="eyebrow">Sobre mim</p>
            <h2>Tecnologia com um olhar criativo.</h2>
            <p className="hero-about-description">
              Sou desenvolvedora Front-End e gosto de transformar ideias em interfaces claras,
              responsivas e cheias de personalidade. Exploro animações e experiências 3D,
              unindo o visual à lógica do sistema.
            </p>
            <p className="hero-tech-label">TECNOLOGIAS QUE UTILIZO</p>
            <TechIconsGrid />
            <p className="hero-about-note">
              Fora do código, gosto de desenhar e tocar ocarina :D
            </p>
          </div>

          <div className="hero-art hero-profile-art">
            <MiniPlaylist navElement={navElement} navScrolled={navScrolled} />
          </div>
        </article>
      </section>

      <section className="experience-section section-shell" id="experiencia">
        <SectionHeading
          eyebrow="/ trajetória"
          title="Experiência"
          description="Projetos, equipes e ideias que fazem parte do meu caminho."
        />
        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.role}>
              <div className="experience-index" aria-hidden="true" />
              <div className="experience-main">
                <div className="experience-heading">
                  <div>
                    <p className="experience-period">{experience.period}</p>
                    <h3>{experience.role}</h3>
                    <p className="experience-company">{experience.company}</p>
                  </div>
                </div>
                <ul>
                  {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section section-shell" id="projetos">
        <SectionHeading
          eyebrow="/ experimentos digitais"
          title={<>Meus <span className="accent">projetos.</span></>}
          description="Um pouco do que venho criando entre interfaces, áudio e dados."
        />
        <div
          className="projects-carousel"
        >
          <button
            className="projects-carousel-button"
            type="button"
            aria-label="Projeto anterior"
            disabled={!isMobileCarousel && activeProjectIndex === 0}
            onClick={() => moveProjectPage(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <div
            className="projects-grid"
            ref={projectCarouselRef}
            role="region"
            aria-label="Projetos em destaque"
            aria-roledescription="carrossel"
            tabIndex={0}
            onScroll={(event) => updateActiveProject(event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollToProject((activeProjectDisplayIndex + projects.length - 1) % projects.length);
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollToProject((activeProjectDisplayIndex + 1) % projects.length);
              }
            }}
          >
            {[...projects, ...projects, ...projects].map((project, index) => {
              const projectIndex = index % projects.length;
              return (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  index={projectIndex}
                  total={projects.length}
                  isClone={index >= projects.length}
                />
              );
            })}
          </div>
          <div className="projects-mobile-grid" role="region" aria-label="Projetos em destaque">
            {mobileProjectIndices.map((projectIndex, columnIndex) => (
              <ProjectCard
                key={`mobile-${columnIndex}-${projectIndex}`}
                project={projects[projectIndex]}
                index={projectIndex}
                total={projects.length}
              />
            ))}
          </div>
          <button
            className="projects-carousel-button"
            type="button"
            aria-label="Próximo projeto"
            disabled={!isMobileCarousel && activeProjectIndex === lastProjectIndex}
            onClick={() => moveProjectPage(1)}
          >
            <ChevronRight size={19} />
          </button>
          <div className="projects-carousel-controls">
            <div className="projects-pagination" role="group" aria-label="Selecionar projeto">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  className={`projects-pagination-dot${index === activeProjectDisplayIndex ? ' is-active' : ''}`}
                  type="button"
                  aria-label={`Mostrar projetos a partir de ${project.title}`}
                  aria-current={index === activeProjectDisplayIndex ? 'true' : undefined}
                  onClick={() => scrollToProject(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <a className="all-projects-link" href="https://github.com/YasminBevilaqua" target="_blank" rel="noreferrer">
          Mais projetos no GitHub <ArrowUpRight size={17} />
        </a>
      </section>

      <section className="contact-section section-shell" id="contato">
        <div className="section-heading contact-heading">
          <p className="eyebrow">/ contato</p>
          <h2>Contato<span className="accent">.</span></h2>
          <p className="section-description">Me encontre nas redes!</p>
        </div>
        <ul className="contact-social-stack" aria-label="Redes sociais">
          {socialLinks.map((social) => {
            const isEmail = social.href.startsWith('mailto:');
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                >
                  <span className="contact-card-layer" aria-hidden="true" />
                  <span className="contact-card-layer" aria-hidden="true" />
                  <span className="contact-card-layer" aria-hidden="true" />
                  <span className="contact-card-layer" aria-hidden="true" />
                  <span className="contact-card-layer" aria-hidden="true" />
                  <span className="contact-card-content" aria-hidden="true">
                    {createElement(social.icon, {
                      size: 32,
                      strokeWidth: 1.8,
                    })}
                    <span className="contact-card-label">{social.label}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="site-footer">
        <p>© 2026 Yasmin Beviláqua</p>
        <a href="#inicio">De volta ao topo ↑</a>
      </footer>
    </main>
  );
}
