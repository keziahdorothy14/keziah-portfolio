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

document.querySelectorAll('.milestone-item').forEach(item=>{
  item.addEventListener('click',()=>item.classList.toggle('is-active'));
});

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

// Professional reveal-on-scroll with a subtle stagger
const revealItems=[...document.querySelectorAll('.section > *, .project, .interest-card')];
revealItems.forEach((item,index)=>{
  item.classList.add('reveal-item');
  item.style.setProperty('--reveal-delay',`${(index%4)*70}ms`);
});

const reveal=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -40px'});

revealItems.forEach(item=>reveal.observe(item));
