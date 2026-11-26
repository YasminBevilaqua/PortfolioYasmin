import { createElement, lazy, Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import {
  ArrowUpRight,
  AudioLines,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Menu,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';

const StarsBackground = lazy(() => import('./StarsBackground.jsx'));

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
    image: '/project-nebulamind.png',
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
    image: '/project-spatialify.png',
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
    image: '/project-soujunior.png',
    imageAlt: 'Capa do projeto SouJunior Apoia.se',
    icon: Code2,
    stack: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
    liveUrl: 'https://soujunior-apoiase-landing-llgj.vercel.app/',
    githubUrl: 'https://github.com/inovacao-squad/soujunior-apoiase-landing',
  },
];

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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [columns, setColumns] = useState(() => {
    if (window.innerWidth <= 750) return 3;
    if (window.innerWidth <= 900) return 4;
    return 6;
  });

  useEffect(() => {
    const syncColumns = () => {
      const nextColumns = window.innerWidth <= 750 ? 3 : window.innerWidth <= 900 ? 4 : 6;
      setColumns((current) => current === nextColumns ? current : nextColumns);
    };

    window.addEventListener('resize', syncColumns);
    return () => window.removeEventListener('resize', syncColumns);
  }, []);

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
            <img className="tech-icon-img" src={`/images/${encodeURIComponent(tech.file)}`} alt="" draggable="false" />
            <img className="tech-icon-reflect" src={`/images/${encodeURIComponent(tech.file)}`} alt="" aria-hidden="true" draggable="false" />
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
    source: '/audio/hear-me-now.mp3',
  },
  {
    title: 'Never Let Me Go',
    artist: 'Alok feat. Zeeba',
    mood: 'RADIO EDIT',
    color: '#8ec5ff',
    cover: 'https://cdn-images.dzcdn.net/images/cover/33af72cf5d034401a550047993904f26/250x250-000000-80-0-0.jpg',
    source: '/audio/Never Let Me Go Radio Edit.mp3',
  },
  {
    title: 'Wild One',
    artist: 'Lucky Rose feat. Tep No',
    mood: 'DANCE',
    color: '#f5b96b',
    cover: 'https://cdn-images.dzcdn.net/images/cover/2e42982f9872e2a561ea3e40434f1c3b/250x250-000000-80-0-0.jpg',
    source: '/audio/Lucky Rose - Wild One feat. Tep No (Cover Art).mp3',
  },
  {
    title: 'Halfway',
    artist: 'Yves V with Bhaskar',
    mood: 'ELECTRONIC',
    color: '#9fe0c0',
    cover: 'https://cdn-images.dzcdn.net/images/cover/ead044f28f99cf94419963165144a477/250x250-000000-80-0-0.jpg',
    source: '/audio/Halfway (with Bhaskar).mp3',
  },
];

function MiniPlaylist() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.16);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const audioRef = useRef(null);
  const track = playlist[trackIndex];

  const selectTrack = (nextIndex) => {
    if (audioRef.current) audioRef.current.pause();
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

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  return (
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
        onPlay={() => setIsPlaying(true)}
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
          <span>{String(playlist.length).padStart(2, '0')} FAIXAS</span>
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
  );
}

function ProjectCard({ project, index }) {
  const Icon = project.icon;

  return (
    <article className={`project-card project-card-${index + 1}`}>
      {project.image ? (
        <a
          className="project-image-link"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
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
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Ver projeto <ExternalLink size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
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
  const [starsOpacity, setStarsOpacity] = useState(0);

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
      <nav className={`site-nav${navScrolled ? ' site-nav-scrolled' : ''}`} aria-label="Navegação principal">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Yasmin Beviláqua, início">
          <span className="brand-mark">YB</span>
          <span className="brand-name">Yasmin<span>.</span></span>
        </a>

        <button
          className="menu-toggle"
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
            <MiniPlaylist />
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
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
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
        <a className="footer-brand" href="#inicio">YB<span>.</span></a>
        <p>© {new Date().getFullYear()} Yasmin Beviláqua</p>
        <a href="#inicio">De volta ao topo ↑</a>
      </footer>
    </main>
  );
}
