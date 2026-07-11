import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { number: '01', title: 'NOVA / AI STUDIO', type: 'Brand, Product, AI', className: 'nova' },
  { number: '02', title: 'ORBITAL / CAPITAL', type: 'Digital experience, Strategy', className: 'orbital' },
  { number: '03', title: 'RITUAL / OBJECTS', type: 'Ecommerce, Art direction', className: 'ritual' },
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const animation = gsap.fromTo(element, { y: 36, opacity: 0, filter: 'blur(8px)' }, {
      y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%' }
    });
    return () => animation.kill();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorX = useMotionValue(-100), cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 220, damping: 25 });
  const smoothY = useSpring(cursorY, { stiffness: 220, damping: 25 });
  const root = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const tick = (time) => { lenis.raf(time); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const timer = setTimeout(() => setLoaded(true), 450);
    const onMove = (e) => { cursorX.set(e.clientX - 8); cursorY.set(e.clientY - 8); };
    window.addEventListener('mousemove', onMove);
    return () => { lenis.destroy(); clearTimeout(timer); window.removeEventListener('mousemove', onMove); };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', { yPercent: 112, duration: 1.4, stagger: 0.12, ease: 'power4.out' });
      gsap.from('.hero-detail', { y: 20, opacity: 0, stagger: 0.1, delay: .75, duration: .7, ease: 'power3.out' });
      gsap.to('.hero-orb', { yPercent: -16, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1 } });
      gsap.to('.hero-display', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1 } });
      gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: .25, start: 0, end: 'max' } });
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  return <main ref={root} className={loaded ? 'site is-loaded' : 'site'}>
    <div className="loader"><span>DX</span><i /></div>
    <motion.div className="cursor" style={{ x: smoothX, y: smoothY }} />
    <div className="noise" /><div className="progress"><i /></div>
    <header className="nav"><a className="mark" href="#top">Daim <b>X</b></a><nav>{['Work','About','Projects','Contact'].map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav><button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="toggle menu"><span /><span /></button></header>
    {menuOpen && <div className="mobile-nav">{['Work','About','Projects','Contact'].map(x => <a onClick={() => setMenuOpen(false)} key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>}

    <section className="hero" id="top">
      <div className="side-label hero-detail">Based in Pakistan</div>
      <div className="hero-copy hero-detail"><p>Independent creative practice<br />for ambitious digital futures.</p><a className="circle-link" href="#contact">Let’s connect <span>↗</span></a></div>
      <div className="hero-orb" aria-hidden="true"><div className="silhouette" /></div>
      <div className="hero-display" aria-label="Daim X"><div className="clip"><span className="hero-word">DAIM</span></div><div className="clip xclip"><span className="hero-word">X</span></div></div>
      <div className="hero-bottom hero-detail"><span>AI Startup Builder<br />&amp; Creative Developer</span><span className="scroll-line">Scroll to enter <i>↓</i></span></div>
      <div className="hero-index hero-detail">( 01 — 04 )</div>
    </section>

    <section id="about" className="about section"><Reveal className="section-number">01</Reveal><Reveal className="about-copy"><p className="eyebrow">A little introduction</p><h2>I make digital<br /><em>things feel alive.</em></h2><p className="body-copy">I’m Daim X — an AI startup builder and creative developer working at the boundary of strategy, technology and feeling. I build identities and products with a point of view.</p><a className="text-link" href="#contact">More about me <span>→</span></a></Reveal><div className="wave" /></section>

    <section id="work" className="work section"><Reveal><p className="eyebrow">Selected work / 2024—2026</p><h2>Built to be<br />remembered.</h2></Reveal><div className="project-list">{projects.map((project, i) => <Reveal key={project.title}><article className={`project ${project.className}`}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="project-art"><div className="art-word">{i === 0 ? 'N' : i === 1 ? 'O' : 'R'}</div><div className="art-object" /></div><div className="project-foot"><h3>{project.title}</h3><span className="round-arrow">↗</span></div></article></Reveal>)}</div></section>

    <section id="projects" className="statement section"><Reveal><p className="eyebrow">Capabilities</p></Reveal><div className="skills">{['Web development','AI solutions','UI / UX','Brand systems'].map((skill, i) => <Reveal key={skill}><div className="skill"><span>0{i + 1}</span><h3>{skill}</h3><b>↗</b></div></Reveal>)}</div></section>

    <section id="contact" className="contact section"><div className="contact-top"><Reveal><p className="eyebrow">Have a beautiful problem?</p><h2>Let’s make it<br /><em>impossible to ignore.</em></h2></Reveal><Reveal><a className="contact-button" href="mailto:hello@daimx.com">Start a conversation <span>↗</span></a></Reveal></div><footer><span>© Daim X / 2026</span><a href="mailto:hello@daimx.com">hello@daimx.com</a><span>Made with intention</span></footer></section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
