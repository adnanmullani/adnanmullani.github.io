const boot=document.getElementById('boot');const log=document.getElementById('bootLog');
const logs=['connecting cloud nodes...','loading deployment graph...','mounting production context...','checking observability...','SYSTEM READY'];let n=0;const timer=setInterval(()=>{if(log)log.textContent=logs[n++]||logs.at(-1);if(n>=logs.length){clearInterval(timer);setTimeout(()=>{boot?.classList.add('hide');setTimeout(()=>{if(boot)boot.style.display='none'},750)},420)}},330);
const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}});function cursorLoop(){cx+=(mx-cx)*.14;cy+=(my-cy)*.14;if(cursor){cursor.style.left=cx+'px';cursor.style.top=cy+'px'}requestAnimationFrame(cursorLoop)}cursorLoop();document.querySelectorAll('a,button,.project-card,.pipeline article,.cloud-card').forEach(el=>{el.addEventListener('mouseenter',()=>{if(cursor){cursor.style.width='54px';cursor.style.height='54px';cursor.style.borderColor='#32d7ff'}});el.addEventListener('mouseleave',()=>{if(cursor){cursor.style.width='34px';cursor.style.height='34px'}})});
const canvas=document.getElementById('particles'),ctx=canvas?.getContext('2d');let pts=[];function resize(){if(!canvas)return;canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:90},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.25,v:(Math.random()-.5)*.18,a:Math.random()}))}function draw(){if(!canvas)return;ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.y+=p.v;p.a+=.006;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;const alpha=.2+.15*Math.sin(p.a);ctx.fillStyle=`rgba(50,215,255,${alpha})`;ctx.fillRect(p.x,p.y,p.r,p.r)}requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();
const cards=[...document.querySelectorAll('.project-card')];addEventListener('mousemove',e=>{if(innerWidth<901)return;const x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;cards.forEach((c,i)=>{c.style.translate=`${x*(i-1)*7}px ${y*(i-1)*4}px`})});
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(45px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});reveal.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.about-grid,.signal-row,.work-intro,.pipeline,.workflow-strip,.case-hero,.system-map,.case-details,.projects-title,.project-card,.security-grid,.stack-heading,.cloud-stage,.tool-wall,.journey-heading,.timeline,.contact-content').forEach(el=>{el.style.opacity=0;reveal.observe(el)});
const scenes=[...document.querySelectorAll('.scene')];const sceneObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.body.dataset.scene=e.target.dataset.index}}),{threshold:.5});scenes.forEach(s=>sceneObs.observe(s));
const magnetic=[...document.querySelectorAll('.magnetic')];magnetic.forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));magnetic.forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));

const archData={
code:['ACTIVE NODE / GIT','Every deployment starts with a controlled change.','GitHub branches and pull requests keep changes reviewable, traceable and ready for the next stage of the release pipeline.'],
ci:['ACTIVE NODE / CI/CD','Automation turns every approved change into a repeatable release.','GitHub Actions handles build, validation and deployment workflows across protected develop, staging and production branches.'],
container:['ACTIVE NODE / DOCKER','Containers make application delivery consistent.','Docker packages applications and their dependencies into repeatable runtime units that can move cleanly across environments.'],
cloud:['ACTIVE NODE / CLOUD','Infrastructure should be reproducible.','AWS and Azure environments are provisioned, secured and connected with Terraform, load balancing, secrets and production routing.'],
data:['ACTIVE NODE / DATA','Production data needs stability and controlled access.','PostgreSQL, RDS, ElastiCache, SQS and S3 support application data, caching, queues and durable storage in production systems.'],
production:['ACTIVE NODE / PRODUCTION','Production should be reliable, observable and repeatable.','10+ production deployments across AWS and Azure, including zero-downtime migration work, SSL/DNS, monitoring and secure release workflows.']
};
const archNodes=[...document.querySelectorAll('.arch-node')];
const archDetail=document.getElementById('archDetail');
function activateArchNode(node){
  archNodes.forEach(x=>x.classList.remove('active'));
  node.classList.add('active');
  const d=archData[node.dataset.node];
  if(!d||!archDetail)return;
  archDetail.innerHTML=`<span>${d[0]}</span><strong>${d[1]}</strong><p>${d[2]}</p>`;
  archDetail.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
}
archNodes.forEach(node=>node.addEventListener('click',()=>activateArchNode(node)));

