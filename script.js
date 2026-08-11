const body=document.body;
document.getElementById('year').textContent=new Date().getFullYear();

const themeBtn=document.getElementById('themeBtn');
const savedTheme=localStorage.getItem('keziah-theme');
if(savedTheme==='light') body.classList.add('light');
themeBtn.textContent=body.classList.contains('light')?'☾':'☼';
themeBtn.addEventListener('click',()=>{
  body.classList.toggle('light');
  const light=body.classList.contains('light');
  localStorage.setItem('keziah-theme',light?'light':'dark');
  themeBtn.textContent=light?'☾':'☼';
});

const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const filters=document.querySelectorAll('.filter');
const projects=[...document.querySelectorAll('.project')];
const count=document.getElementById('projectCount');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const filter=btn.dataset.filter;
  let shown=0;
  projects.forEach(p=>{
    const show=filter==='all'||p.dataset.category===filter;
    p.classList.toggle('hidden',!show); if(show) shown++;
  });
  count.textContent=`${shown} project${shown===1?'':'s'}`;
}));

// Subtle 3D interaction on the hero card
const card=document.querySelector('.tilt-card');
if(window.matchMedia('(pointer:fine)').matches){
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
}

// Reveal-on-scroll
const reveal=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});reveal.unobserve(e.target)}})
},{threshold:.08});
document.querySelectorAll('.section > *, .project').forEach(el=>{el.style.opacity='0';reveal.observe(el)});
