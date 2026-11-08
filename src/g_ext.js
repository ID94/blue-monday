// ================= SCENARIUSZ LOSOWY =================
const HOST_SPOTS=[
 {h:[56,7],b:[54,7],looks:[Math.PI/2,Math.PI,0]},
 {h:[72,8],b:[69,8],looks:[Math.PI/2,Math.PI]},
 {h:[52,17],b:[51,19],looks:[Math.PI/2,-Math.PI/2]},
 {h:[75,19],b:[73,18],looks:[-Math.PI/2,Math.PI/2,0]}];
const ENEMY_EXTRA=[
 {x:61,y:18,weap:'ePistol',patrol:[[59,18],[63,15]]},{x:68,y:17,a:-Math.PI/2,weap:'eRifle',guard:1},{x:74,y:17,a:Math.PI/2,weap:'eRifle',guard:1},
 {x:48,y:7,a:Math.PI,weap:'ePistol',guard:1},{x:61,y:31,a:Math.PI/2,weap:'eRifle',guard:1},{x:69,y:30,weap:'eRifle',patrol:[[68,26],[69,42]]},{x:42,y:40,weap:'eRifle',patrol:[[30,40],[42,41],[42,27]]}];
const HIDE_POOL=[[39,5],[48,4],[12,15],[6,41],[53,42],[65,31],[30,42],[72,29],[63,16],[44,6],[75,42],[11,41],[54,37],[22,19],[60,42],[46,26]];
const HIDE_KINDS=['nurse','doctor','orderly','cook','janitor','nurse','orderly'];
const PATIENTS=[[17,6],[25,6],[27,17],[29,16],[5,17]];
const BEDS=[[3,3,'patient'],[12,3,'patient'],[20,3,'patient'],[28,3,'patient'],[36,15,'patient'],[39,15,'patient'],[42,15,'patient'],
 [15,26,'mother'],[18,26,'mother'],[24,26,'mother'],[15,40,'mother'],[21,40,'mother'],[24,40,'mother']];
const WORKERS=[[38,18,'nurse',-Math.PI/2],[41,17,'doctor',Math.PI],[20,30,'nurse',-Math.PI/2],[23,36,'nurse',Math.PI],[17,30,'doctor',-Math.PI/2],[20,16,'nurse',Math.PI],[7,28,'cook',-Math.PI/2],[52,37,'nurse',-Math.PI/2],[50,42,'janitor',-Math.PI/2],[9,33,'cook',Math.PI]];
const TRAP_POOL=[{x:48,y:11,v:1},{x:63,y:22,v:1},{x:32,y:10,v:0},{x:68,y:33,v:0},{x:56,y:11,v:1},{x:44,y:22,v:1}];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=randi(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
function genScen(){const hs=pick(HOST_SPOTS),pool=shuffle([...ENEMIES.slice(1),...ENEMY_EXTRA]).filter(e=>dist(e.x,e.y,hs.b[0],hs.b[1])>2.5);
 const n=randi(8,10),en=pool.slice(0,n),rest=pool.slice(n);
 const hide=shuffle([...HIDE_POOL]).slice(0,8).map(p=>({x:p[0],y:p[1],k:pick(HIDE_KINDS),st:'hide'})).filter(c=>dist(c.x,c.y,hs.h[0],hs.h[1])>2);
 const traps=[];
 const hI=Math.random()<.7?hs:pick(HOST_SPOTS.filter(s=>s!==hs));
 const intel=[[hI.h[0],hI.h[1]-1,'ZAKŁADNIK?']];
 shuffle([...en]).slice(0,3).forEach(e=>intel.push([e.x+randi(-1,1),e.y+randi(-1,1),'?']));
 rest.slice(0,2).forEach(e=>intel.push([e.x,e.y,'?']));
 return{hs,en,hide,traps,intel,est:[Math.max(4,n-4),Math.max(5,n-2)],hroom:ROOMS[LV.room[I(hI.h[0],hI.h[1])]].n};}
function logEv(t){if(G.log)G.log.push([G.stats?G.stats.time:0,t]);}
function roomName(x,y){const r=LV.room[I(x/TS|0,y/TS|0)];return r>=0?ROOMS[r].n:(isOutdoor(x,y)?'teren zewnętrzny':'przejście');}

// ================= PUŁAPKI =================
function initTraps(list){G.traps=list.map(t=>t.v?{ax:t.x*TS+8,ay:t.y*TS+1,bx:t.x*TS+8,by:(t.y+2)*TS-1}:{ax:t.x*TS+1,ay:t.y*TS+8,bx:(t.x+2)*TS-1,by:t.y*TS+8}).map(t=>Object.assign(t,{found:false,dead:false,mx:(t.ax+t.bx)/2,my:(t.ay+t.by)/2}));}
function segDist(px,py,t){const dx=t.bx-t.ax,dy=t.by-t.ay,l=dx*dx+dy*dy,k=clamp(((px-t.ax)*dx+(py-t.ay)*dy)/l,0,1);return dist(px,py,t.ax+dx*k,t.ay+dy*k);}
function updateTraps(){for(const t of G.traps){if(t.dead)continue;
 for(const s of G.squad){if(!s.alive)continue;
  if(!t.found){if(segDist(s.x,s.y,t)<3.5){trapBoom(t);break;}const r=s.spec==='scout'?TS*4:TS*2.6;if(dist(s.x,s.y,t.mx,t.my)<r&&canSee(s,t.mx,t.my)){t.found=true;radio(s.name,pick(['Potykacz! Stać, drut w przejściu!','Uwaga, pułapka z granatem!']),{prio:1});logEv(s.name+' wykrył potykacz ('+roomName(t.mx,t.my)+')');}}}}}
function trapBoom(t){t.dead=true;const x=t.ax,y=t.ay;SND.boom(x,y);makeNoise(x,y,26,'boom');G.lights.push({x,y,r:TS*5,t:.25});G.shake=.6;logEv('Eksplozja pułapki ('+roomName(x,y)+')');
 for(let i=0;i<24;i++)G.fx.push({k:'debris',x,y:y-6,z:0,vx:rand(-100,100),vy:rand(-100,100),vz:rand(20,80),t:0,life:rand(.5,1),c:pick(['#555','#777','#3a3a30'])});
 for(let i=0;i<8;i++)G.fx.push({k:'smoke',x:x+rand(-8,8),y:y-6+rand(-8,8),vx:rand(-10,10),vy:rand(-14,-4),r:3,gr:rand(8,14),a:.5,t:0,life:rand(1.5,2.5),c:'#6a6a64'});
 const g=wc.createRadialGradient(x,y,0,x,y,12);g.addColorStop(0,'rgba(10,8,6,.6)');g.addColorStop(1,'rgba(10,8,6,0)');wc.fillStyle=g;wc.fillRect(x-12,y-12,24,24);
 for(const u of G.units){if(!u.alive)continue;const d=dist(x,y,u.x,u.y);if(d>TS*4||!losClear(x,y,u.x,u.y))continue;if(d<TS*1.4)kill(u,null,Math.atan2(u.y-y,u.x-x));else{u.stun=Math.max(u.stun,2.5);if(u.human){G.flashW=Math.max(G.flashW,.35);SND.tinnitus(.6);}}}}
function drawTraps(c,cx,cy){for(const t of G.traps){if(t.dead)continue;let near=false;for(const s of G.squad)if(s.alive&&dist(s.x,s.y,t.mx,t.my)<TS*3.2){near=true;break;}if(!t.found&&!near)continue;
 c.globalAlpha=t.found?.9:.22+.12*Math.sin(G.time*6);line(c,t.ax-cx,t.ay-cy-3,t.bx-cx,t.by-cy-3,'#c8d0d8');c.globalAlpha=1;P(c,Math.round(t.ax-cx)-1,Math.round(t.ay-cy)-5,3,4,'#3d4a2c');P(c,Math.round(t.ax-cx),Math.round(t.ay-cy)-6,1,1,'#888');
 if(t.found&&((G.time*3)|0)%2)P(c,Math.round(t.mx-cx),Math.round(t.my-cy)-10,1,3,'#ff3b30');}}
function trapNear(u,r){for(const t of G.traps)if(!t.dead&&t.found&&dist(u.x,u.y,t.mx,t.my)<(r||TS*1.4))return t;return null;}
function disarm(u,t){t.dead=true;G.stats.traps++;radio(u.name,'Pułapka rozbrojona.');logEv(u.name+' rozbroił pułapkę');}
function orderDisarm(t){const m=aiAvail('tech');if(!m){toast('Ofc. Mason (Tech) niedostępny');return;}dropOps([m]);m.post=null;radio(m.name,'Przyjąłem, rozbrajam.');
 setGoto(m,t.mx/TS|0,t.my/TS|0,{onDone:()=>{m.action={t:0,dur:2.5,pose:'kneel',face:m.ang,tick:dt=>{if(Math.random()<dt*5)SND.pick(m.x,m.y);},done:()=>{if(!t.dead)disarm(m,t);m.task=null;}};}});}

// ================= ZACHOWANIA WROGÓW =================
function onEnemyDown(dead){for(const e of G.enemies){if(e===dead||!e.active()||e.boss||e.state==='flee')continue;if(dist(e.x,e.y,dead.x,dead.y)>TS*9||!losClear(e.x,e.y,dead.x,dead.y))continue;if(Math.random()<.3)startFlee(e);}}
function startFlee(e){const cur=LV.room[I(e.x/TS|0,e.y/TS|0)];let goal=null;for(let k=0;k<30&&!goal;k++){const r=randi(0,ROOMS.length-1);if(r===cur||ROOMS[r].n.startsWith('Korytarz'))continue;const tl=LV.roomTiles[r];if(!tl.length)continue;const t=pick(tl),d=dist(t[0],t[1],e.x/TS,e.y/TS);if(d>8&&d<26)goal=t;}
 if(!goal)return;e.state='flee';e.goal={x:goal[0]*TS+8,y:goal[1]*TS+8};e.path=null;e.target=null;e.fleeT=14;e.ico='!';e.icoT=1.5;logEv('Napastnik ucieka ('+roomName(e.x,e.y)+')');}
function updateFlee(e,dt){e.fleeT-=dt;if(!e.path){e.path=findPath(e.x/TS|0,e.y/TS|0,e.goal.x/TS|0,e.goal.y/TS|0);if(!e.path){e.state='guard';e.home={x:e.x,y:e.y,a:e.ang,st:'guard'};return;}}
 const arr=followPath(e,dt,52);if(e.moving)turnTo(e,Math.atan2(e.vy,e.vx),dt,7);
 if(arr||e.fleeT<=0){e.path=null;let best=null,bd=1e9;for(const d of LV.doors){const dd=dist(d.x*TS+8,d.y*TS+8,e.x,e.y);if(dd<bd){bd=dd;best=d;}}const a=best?Math.atan2(best.y*TS+8-e.y,best.x*TS+8-e.x):e.ang;
  e.home={x:e.x,y:e.y,a,st:'guard'};e.state='guard';e.guard=true;e.ang=a;}}
function updateFake(e,dt){e.fakeT-=dt;if(e.fakeT>0)return;const s=nearestSquad(e);
 if(s&&dist(s.x,s.y,e.x,e.y)<TS*7&&losClear(e.x,e.y,s.x,s.y)){e.state='combat';e.pose='stand';e.target=s;e.react=.35;e.seeT=true;e.ico='!';e.icoT=2;e.fake=false;radio(s.name,'Sięga po broń!',{prio:1});logEv('Fałszywe poddanie się napastnika ('+roomName(e.x,e.y)+')');}
 else e.fakeT=rand(2,4);}
function barricade(){let n=0;for(const e of shuffle([...G.enemies])){if(n>=2)break;if(!e.active())continue;const r=LV.room[I(e.x/TS|0,e.y/TS|0)];if(r<0||ROOMS[r].n.startsWith('Korytarz'))continue;let any=false;
 for(const d of LV.doors){if(d.broken||d.open>.4||d.barr)continue;const s=d.vert?[[d.x-1,d.y],[d.x+1,d.y]]:[[d.x,d.y-1],[d.x,d.y+1]];if(s.some(([x,y])=>LV.room[I(x,y)]===r)){d.locked=true;d.barr=true;d.knownLocked=false;any=true;}}
 if(any){n++;logEv('Napastnicy barykadują się ('+ROOMS[r].n+')');}}}

// ================= NEGOCJATOR =================
function negotiator(dt){if(G.ended)return;G.negT-=dt;if(G.negT>0)return;G.negT=rand(80,140);const H=G.hostage;if(!H.alive||H.state!=='tied')return;SND.ring();
 setTimeout(()=>{if(G.ended)return;
  if(G.alarm&&!G.negAlarm){G.negAlarm=1;G.deadline=Math.max(30,G.deadline-60);radio('NEGOTIATOR','Słyszał was. Wścieka się. Skrócił czas o minutę!',{prio:1});logEv('Negocjator: ultimatum skrócone o 60 s');return;}
  if(!G.alarm&&G.negBonus<2&&Math.random()<.6){G.negBonus++;G.deadline+=120;radio('NEGOTIATOR','Udało mi się go uspokoić. Macie dodatkowe dwie minuty.');logEv('Negocjator: +120 s');return;}
  radio('NEGOTIATOR',pick(['Żąda samochodu pod wejściem i przelotu za granicę.','Twierdzi, że ma ludzi przy każdym wyjściu.','Pyta o brata, który siedzi w areszcie śledczym.','Słyszałem w tle zakładnika. Żyje, ale jest bardzo słaby.','Mówi, że jeśli zobaczy policjanta, zastrzeli dyrektora.','Jest pod wpływem czegoś. Mówi chaotycznie.']));},1600);}

// ================= WYPOSAŻENIE =================
function defaultLoad(){return SPECS.map(s=>({armor:s.id==='breach'||s.id==='scout'?'heavy':'light',extra:s.id==='medic'||s.id==='lead'?'spray':'none',ram:false}));}
function applyLoad(u,L){u.armor=L.armor;if(L.extra==='shield'){u.shield=true;u.weap='pistol';u.W=WEAP.pistol;u.mag=u.W.mag;u.res=u.W.mag*4;}if(L.extra==='spray')u.spray=5;if(u.spec==='breach'&&L.ram){u.ram=true;u.charges=0;}}
function spray(u){if(!(u.spray>0)){toast('Brak gazu pieprzowego');return;}u.spray--;const t0=A.ctx&&A.ctx.currentTime;const o=out(u.x,u.y,.35,{rev:.1});if(o)nz(o,t0,.6,{type:'highpass',f:3000,g:.7,attack:.03});
 for(let i=0;i<10;i++){const a=u.ang+rand(-.3,.3);G.fx.push({k:'smoke',x:u.x+Math.cos(a)*6,y:u.y-6+Math.sin(a)*5,vx:Math.cos(a)*rand(40,70),vy:Math.sin(a)*rand(30,50),r:1,gr:rand(6,10),a:.35,t:0,life:rand(.6,1),c:'#d8a050'});}
 let hit=0;for(const o2 of G.units){if(!o2.alive||o2.team==='squad'||o2.pose==='sleep')continue;const d=dist(u.x,u.y,o2.x,o2.y);if(d>TS*2.6)continue;if(Math.abs(angDiff(u.ang,Math.atan2(o2.y-u.y,o2.x-u.x)))>.45||!losClear(u.x,u.y,o2.x,o2.y))continue;
  o2.stun=Math.max(o2.stun,4.5);o2.target=null;hit++;if(o2.team==='enemy')logEv(u.name+' użył gazu pieprzowego ('+roomName(o2.x,o2.y)+')');}
 if(hit)radio(u.name,'Gaz! Na ziemię!',{raw:1});}
function buildGear(){const box=$('gear-cards');if(!G.load)G.load=defaultLoad();box.innerHTML='';
 SPECS.forEach((s,i)=>{const L=G.load[i],d=document.createElement('div');d.className='gcard';
  const seg=(k,opts)=>'<div class="seg">'+opts.map(([v,l])=>'<span data-k="'+k+'" data-v="'+v+'" class="'+(String(L[k])===String(v)?'on':'')+'">'+l+'</span>').join('')+'</div>';
  const spd=5-(L.armor==='heavy'?1:0)-(L.extra==='shield'?1:0),prot=1+(L.armor==='heavy'?2:0)+(L.extra==='shield'?2:0),wn=L.extra==='shield'?WEAP.pistol.n:WEAP[s.weap].n;
  const bar=(n,v)=>'<div class="bar">'+n+'<b><i style="width:'+(v*20)+'%"></i></b></div>';
  d.innerHTML='<canvas width="48" height="32"></canvas><div class="cn">'+s.name+'</div><div class="cr">'+s.role+'</div><div>'+wn+'</div>'+
   '<div class="gl">Kamizelka</div>'+seg('armor',[['light','Lekka'],['heavy','Ciężka']])+
   '<div class="gl">Dodatek</div>'+seg('extra',[['none','Brak'],['shield','Tarcza'],['spray','Gaz']])+
   (s.id==='breach'?'<div class="gl">Drzwi</div>'+seg('ram',[['false','Ładunki ×2'],['true','Taran']]):'<div class="gl">&nbsp;</div><div class="seg"><span style="visibility:hidden">-</span></div>')+
   bar('Szybkość ',spd)+bar('Ochrona  ',prot);
  const g=d.querySelector('canvas').getContext('2d');g.fillStyle='#0b0d0d';g.fillRect(0,0,48,32);const u=new Unit({team:'squad',pal:PAL.squad,weap:L.extra==='shield'?'pistol':s.weap,acc:s.acc,spec:s.id,ang:.35});u.shield=L.extra==='shield';G.time=0;drawHuman(g,u,24,28);
  d.querySelectorAll('.seg span[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;let v=b.dataset.v;if(k==='ram')v=v==='true';L[k]=v;SND.click();buildGear();});
  box.appendChild(d);});}
// ================= NOKTOWIZJA =================
function toggleNVG(){if(isPat()&&!LD().nvg){toast('Brak noktowizora — tylko latarki');return;}G.nvg=!G.nvg;toast(G.nvg?'NOKTOWIZJA — latarki zgaszone':'LATARKI — lepiej widać, ale was też');if(A.ctx){const o=ui(.15),t0=A.ctx.currentTime;tone(o,t0,G.nvg?.5:.08,{f:G.nvg?6000:1500,f2:G.nvg?9000:900,g:.25});}logEv(G.nvg?'Oddział przechodzi na noktowizję':'Oddział włącza latarki');}
