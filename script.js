const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
if (window.Lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({
    lerp: .075, duration: 1.15, smoothWheel: true,
    wheelMultiplier: .82, touchMultiplier: 1.25, syncTouch: false
  });
  lenis.on('scroll', () => window.ScrollTrigger?.update());
  if (window.gsap) {
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
window.addEventListener('scroll', () => { $('.nav').classList.toggle('scrolled', scrollY > 35); $('.progress').style.width = `${scrollY / (document.documentElement.scrollHeight - innerHeight) * 100}%`; }, {passive:true});
const cursor=$('.cursor'); window.addEventListener('pointermove',e=>{cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`}); $$('a,button,.project').forEach(x=>{x.addEventListener('pointerenter',()=>cursor.classList.add('active'));x.addEventListener('pointerleave',()=>cursor.classList.remove('active'))});
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.16,y=(e.clientY-r.top-r.height/2)*.16;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
if(window.gsap){gsap.registerPlugin(ScrollTrigger);gsap.from('.nav',{y:-40,opacity:0,duration:1.1,ease:'power3.out'});gsap.from('.hero-title span',{yPercent:105,opacity:0,stagger:.1,duration:1.25,ease:'power4.out',delay:.15});gsap.from('.portrait',{scale:1.12,opacity:0,duration:1.6,ease:'power3.out'});gsap.from('.hero-copy,.location,.socials,.scroll',{opacity:0,y:20,stagger:.1,delay:.8,duration:.8});$$('.reveal').forEach(el=>gsap.from(el,{opacity:0,y:45,filter:'blur(8px)',duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}));gsap.to('.smoke',{xPercent:-12,yPercent:8,scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:1}});gsap.from('.skill-list>div',{y:35,opacity:0,stagger:.12,duration:.8,scrollTrigger:{trigger:'.skills',start:'top 70%'}})}
