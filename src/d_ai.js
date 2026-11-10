// ================= DOORS / ACTIONS =================
function doorOccupied(d){const x0=d.x*TS,y0=d.y*TS;for(const o of G.units){if(!o.alive&&o.deathT>1)continue;const cx=clamp(o.x,x0,x0+TS),cy=clamp(o.y,y0,y0+TS);if((o.x-cx)**2+(o.y-cy)**2<(o.r+.5)**2)return true;}return false;}
function toggleDoor(d,u){if(d.broken)return'broken';const x=d.x*TS+8,y=d.y*TS+8;
 if(d.locked&&d.target===0){d.knownLocked=true;SND.rattle(x,y);return'locked';}
 if(d.target===1){if(doorOccupied(d))return'blocked';d.target=0;SND.door(x,y,false);}else{d.target=1;SND.door(x,y,true);}
 if(!(u&&u.quiet))makeNoise(x,y,2,'door',u);return'ok';}
function kickDoor(u,d){const x=d.x*TS+8,y=d.y*TS+8;d.locked=false;d.target=1;d.open=.75;SND.kick(x,y);makeNoise(x,y,16,'kick',u);G.shake=.15;
 for(let i=0;i<10;i++)G.fx.push({k:'debris',x,y:y-6,z:0,vx:rand(-50,50),vy:rand(-50,50),vz:rand(10,40),t:0,life:rand(.4,.8),c:pick(['#6b4a32','#4a301f'])});
 for(const o of G.units){if(o.team!=='squad'&&o.alive&&dist(o.x,o.y,x,y)<TS*1.8&&o.stun<=0){o.stun=1;o.target=null;}}
 radio(u.name,pick(['Drzwi wyważone!','Otwarte!']));}
function plantCharge(u,d){if(!d||d.broken||d.open>.5)return false;if(u.charges<=0){if(u.human)toast('Brak ładunków');return false;}
 u.charges--;d.charge={t:2.6,by:u,bt:0};radio(u.name,pick(['Ładunek założony! Odsunąć się!','Wysadzam, osłona!']),{prio:1});return true;}
function updateDoors(dt){for(const d of LV.doors){d.open+=clamp(d.target-d.open,-dt*3.2,dt*3.2);
 if(d.charge){const c=d.charge;c.t-=dt;c.bt-=dt;if(c.bt<=0){c.bt=c.t<1?.16:.45;SND.beep(d.x*TS+8,d.y*TS+8);}if(c.t<=0){d.charge=null;breachDoor(d,c.by);}}}}
function breachDoor(d,by){const x=d.x*TS+8,y=d.y*TS+8;logEv((by?by.name:'?')+' wysadził drzwi ('+roomName(x,y)+')');d.broken=true;d.locked=false;d.open=1;d.target=1;SND.boom(x,y);makeNoise(x,y,26,'boom');
 G.lights.push({x,y,r:TS*5,t:.22});G.shake=.5;
 for(let i=0;i<26;i++)G.fx.push({k:'debris',x,y:y-6,z:0,vx:rand(-100,100),vy:rand(-100,100),vz:rand(20,80),t:0,life:rand(.5,1.1),c:pick(['#6b4a32','#4a301f','#888','#5a3d29'])});
 for(const u of G.units){if(!u.alive||u.pose==='sleep')continue;const dd=dist(x,y,u.x,u.y);if(dd>TS*4.2||!losClear(x,y,u.x,u.y))continue;
  if(dd<TS*.85){kill(u,by,Math.atan2(u.y-y,u.x-x));continue;}
  u.stun=Math.max(u.stun,u.team==='squad'?1:3.5+(1-dd/(TS*4.2))*2.5);if(u.team!=='squad')u.target=null;
  if(u.human){G.flashW=Math.max(G.flashW,.3);SND.tinnitus(.45);}}}
const NUMW=['zero','jednego','dwóch','trzech','czterech','pięciu','sześciu','siedmiu'];
function snakeCam(d,u){const sd=doorSides(d,u);const base=Math.atan2(sd.oy,sd.ox);
 G.camv={d,u,x:d.x*TS+8+sd.ox*9,y:d.y*TS+8+sd.oy*9,base,ang:base,fov:.85,range:TS*8,t:0,max:u.human?14:5,seen:new Set(),poly:null};
 SND.pick(u.x,u.y);if(u.human)toast('KAMERA: obracaj myszką · Q / ruch — koniec');}
function startMirror(u,ang){let k=14,x=u.x,y=u.y;while(k>2){x=u.x+Math.cos(ang)*k;y=u.y+Math.sin(ang)*k;if(!solidAt(x/TS|0,y/TS|0))break;k-=2;}
 G.camv={d:null,u,x,y,base:ang,ang,fov:.95,range:TS*9,t:0,max:u.human?12:4.5,seen:new Set(),poly:null,mirror:1};SND.pick(u.x,u.y);if(u.human)toast('PERYSKOP: obracaj myszką · Q / ruch — koniec');}
function orderCorner(wx,wy){const m=aiAvail('tech');if(!m){toast('Ofc. Mason (Tech) niedostępny');return;}const L=leader();dropOps([m]);m.post=null;
 let tx,ty,ang;if(wx!=null){tx=wx/TS|0;ty=wy/TS|0;ang=L?Math.atan2(wy-L.y,wx-L.x):m.ang;}else{ang=L?L.ang:m.ang;tx=((L?L.x:m.x)+Math.cos(ang)*TS)/TS|0;ty=((L?L.y:m.y)+Math.sin(ang)*TS)/TS|0;}
 if(!walkable(tx,ty)){tx=(L?L.x:m.x)/TS|0;ty=(L?L.y:m.y)/TS|0;}
 radio(m.name,'Sprawdzam róg peryskopem.');setGoto(m,tx,ty,{onDone:()=>{m.action={t:0,dur:.6,pose:'kneel',face:ang,done:()=>{startMirror(m,ang);m.task={type:'hold',face:ang,pose:'kneel',since:G.time,mirrorEnd:1};}};}});}
function camPoly(cv){const pts=[cv.x,cv.y],n=22;for(let i=0;i<=n;i++){const a=cv.ang-cv.fov/2+cv.fov*i/n,d=castRay(cv.x,cv.y,a,cv.range,7);pts.push(cv.x+Math.cos(a)*d,cv.y+Math.sin(a)*d);}return pts;}
function camSees(cv,o){const d=dist(cv.x,cv.y,o.x,o.y);if(d>cv.range)return false;if(Math.abs(angDiff(cv.ang,Math.atan2(o.y-cv.y,o.x-cv.x)))>cv.fov/2)return false;return losClear(cv.x,cv.y,o.x,o.y);}
function updateCam(dt){const cv=G.camv;if(!cv)return;cv.t+=dt;const u=cv.u;
 if(!u.alive||cv.t>cv.max||cv.stop){endCam();return;}
 let tgt;if(u.human===1)tgt=Math.atan2(G.mouse.wy-cv.y,G.mouse.wx-cv.x);else if(u.human===2&&u.in&&u.in.aim!=null)tgt=u.in.aim;else tgt=cv.base+Math.sin(cv.t*1.25)*1.25;
 const lim=cv.cctv?.95:1.45,off=clamp(angDiff(cv.base,tgt),-lim,lim);cv.ang+=clamp(angDiff(cv.ang,cv.base+off),-2.2*dt,2.2*dt);
 const vis=!!u.human;cv.poly=vis?camPoly(cv):null;if(vis){mc.fillStyle='#fff';mc.beginPath();polyPath(mc,cv.poly,0,0);mc.fill();if(cv.robot){mc.beginPath();mc.arc(cv.robot.x,cv.robot.y-2,18,0,6.283);mc.fill();}}
 for(const o of G.units){if(o.team==='squad'||!o.alive&&o.kind!=='corpse'&&o.team!=='enemy')continue;if(camSees(cv,o)){if(vis)o.camSeen=G.time;cv.seen.add(o);}}
 if(cv.cctv){cv.cam.a=cv.ang;u.pose='stand';}else if(u.pose!=='kneel')u.pose='kneel';}
function endCam(){const cv=G.camv;if(!cv)return;G.camv=null;const u=cv.u;if(!u.human&&u.task&&u.task.mirrorEnd)u.task=null;if(u.alive&&u.human)u.pose='stand';if(!u.alive)return;
 let ne=0,nc=0,hh=false;for(const o of cv.seen){if(!o.alive)continue;if(o.team==='enemy'){if(o.active())ne++;}else if(o.kind==='director')hh=true;else if(o.team==='civ')nc++;}
 let s='';if(ne)s+='Widziałem '+(NUMW[ne]||ne)+' '+(ne===1?'napastnika':'napastników');if(nc)s+=(s?' i ':'Widziałem ')+(NUMW[nc]||nc)+' '+(nc===1?'cywila':'cywili');
 if(hh){s+=(s?'. ':'')+'Zakładnik jest w zasięgu!';G.obj.found=true;}if(!s)s=cv.mirror?'Za rogiem czysto.':cv.cctv?'Na kamerach nic nie widać.':'W zasięgu kamery nic nie widać.';if(cv.robot){cv.robot.on=false;return;}radio(u.name,(cv.mirror?'Peryskop. ':cv.cctv?'Monitoring. ':'Kamera. ')+s);}
function throwNade(u,tx,ty){if(u.flash<=0)return false;u.flash--;logEv(u.name+' rzucił granat hukowy');const a=Math.atan2(ty-u.y,tx-u.x),d=clamp(dist(u.x,u.y,tx,ty),TS*1.5,TS*7);
 const sp=d*1.5;G.nades.push({x:u.x+Math.cos(a)*6,y:u.y+Math.sin(a)*6,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,z:6,vz:55,t:1.6,by:u});
 radio(u.name,pick(['Granat!','Hukowy, uwaga!','Rzucam hukowy!']),{prio:1});return true;}
function updateNades(dt){for(const n of G.nades){n.t-=dt;n.vz-=220*dt;n.z+=n.vz*dt;if(n.z<0){n.z=0;n.vz=-n.vz*.35;if(Math.abs(n.vz)>15)SND.bounce(n.x,n.y);n.vx*=.7;n.vy*=.7;}
 const nx=n.x+n.vx*dt;if(bulletBlock(nx/TS|0,n.y/TS|0)){n.vx=-n.vx*.5;SND.bounce(n.x,n.y);}else n.x=nx;
 const ny=n.y+n.vy*dt;if(bulletBlock(n.x/TS|0,ny/TS|0)){n.vy=-n.vy*.5;SND.bounce(n.x,n.y);}else n.y=ny;
 n.vx*=Math.pow(.5,dt);n.vy*=Math.pow(.5,dt);if(n.t<=0){n.dead=true;flashBang(n.x,n.y);}}
 G.nades=G.nades.filter(n=>!n.dead);}
function flashBang(x,y){SND.bang(x,y);makeNoise(x,y,22,'boom');G.lights.push({x,y,r:TS*7,t:.3});G.fx.push({k:'bang',x,y,t:0,life:.35});G.shake=.25;
 for(const u of G.units){if(!u.alive||u.pose==='sleep')continue;const d=dist(x,y,u.x,u.y);if(d>TS*6.5||!losClear(x,y,u.x,u.y))continue;const s=clamp(1-d/(TS*6.5),0,1);
  if(u.team==='squad'){const facing=Math.abs(angDiff(u.ang,Math.atan2(y-u.y,x-u.x)))<1.3;if(!u.human&&d>TS*1.5)continue;if(!facing&&d>TS*1.5)continue;u.stun=Math.max(u.stun,.8+s*2.4);
   if(u.human){const k=G.nvg?1.6:1;u.stun*=k;G.flashW=Math.max(G.flashW,Math.min(1,(.55+s*.45)*k));SND.tinnitus(Math.min(1,(.5+s*.5)*k));}}
  else{u.stun=Math.max(u.stun,2.8+s*4.5);u.target=null;if(u.team==='civ'&&u.state==='wander'){u.state='panic';u.panicT=6;}}}}
function surrender(o,by){if(o.state==='surr'||o.state==='cuffed')return;o.fake=!o.boss&&Math.random()<.2;o.fakeT=rand(4,8);o.state='surr';logEv('Napastnik się poddaje ('+roomName(o.x,o.y)+')');o.pose='hands';o.target=null;o.stun=0;o.path=null;o.ico='';
 if(by)radio(by.name,pick(['Poddaje się!','Rzucił broń!','Ręce w górze, mam go!']));}
function shout(u){if(u.shoutCd>0)return;u.shoutCd=3;radio(u.name,'Policja! Na ziemię! Rzuć broń!',{raw:1,rate:1.25,pitch:.95,vol:1,prio:1});
 makeNoise(u.x,u.y,7,'shout',u);let any=0;
 for(const o of G.units){if(!o.alive||o.team==='squad'||o.pose==='sleep')continue;const d=dist(u.x,u.y,o.x,o.y);if(d>TS*7||!losClear(u.x,u.y,o.x,o.y))continue;
  if(o.team==='civ'){if(o.kind==='suspect'&&o.state!=='cuffed'&&o.state!=='comply'){o.state='comply';o.pose='hands';o.path=null;any++;}else if(o.kind!=='director'&&(o.state==='wander'||o.state==='panic'||o.state==='hide'||o.state==='work')){o.state='comply';o.pose='hands';o.path=null;any++;}}
  else if(o.state!=='surr'&&o.state!=='cuffed'){const ch=o.stun>0?1:(!o.target?.5:.12)*(o.boss?.5:1);
   if(Math.random()<ch){surrender(o,u);any++;}else if(!o.target){o.target=u;o.react=rand(.3,.5);o.state='combat';o.ico='!';o.icoT=2;}}}
 if(any)setTimeout(()=>radio(u.name,any>1?'Mamy ich. Skuć wszystkich.':'Skuć go.'),900);}
function unitInFront(u,r,f){const fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8;let b=null,bd=r;for(const o of G.units){if(o===u||!f(o))continue;const d=dist(fx,fy,o.x,o.y);if(d<bd){bd=d;b=o;}}return b;}
function sedate(u){if(u.sed<=0){toast('Brak strzykawek');return;}
 const t=unitInFront(u,18,o=>o.alive&&o.team!=='squad'&&o.kind!=='director'&&o.state!=='bed'&&o.pose!=='sleep'&&o.state!=='cuffed');if(!t){toast('Brak celu w zasięgu');return;}
 if(t.team==='enemy'&&t.active()){const behind=Math.abs(angDiff(t.ang,Math.atan2(u.y-t.y,u.x-t.x)))>1.9;if(!behind){toast('Zbyt ryzykowne — cel cię widzi');return;}}
 u.sed--;u.action={t:0,dur:.6,label:'Sedacja',done:()=>{if(!t.alive)return;const wasE=t.team==='enemy';t.pose='sleep';t.target=null;t.path=null;if(wasE){t.state='sleep';G.stats.eSed++;radio(u.name,'Napastnik uśpiony.');}else{t.state='calm';G.stats.civSecured++;radio(u.name,'Spokojnie... śpij.');}}};
 if(t.team==='enemy'&&t.active())t.stun=Math.max(t.stun,.8);}
function healTarget(m){let b=null,bd=24;for(const s of G.squad){if(!s.alive||!s.wounded||s.treated||s.beingHealed||s===m)continue;const d=dist(m.x,m.y,s.x,s.y);if(d<bd){bd=d;b=s;}}return b;}
function startHeal(m,t){t.beingHealed=true;const self=m===t;m.action={t:0,dur:self?4:2.6,label:'Opatrywanie: '+t.name,pose:'kneel',face:self?m.ang:Math.atan2(t.y-m.y,t.x-m.x),
 tick:()=>{if(!t.alive)m.action.t=99;},done:()=>{t.beingHealed=false;if(!t.alive||(!self&&dist(m.x,m.y,t.x,t.y)>32))return;t.treated=true;t.bleed=1e9;G.stats.healed++;
  radio(m.name,self?'Opatrzyłem się. Mogę działać.':pick(['Opatrzony. Trzymaj się.','Krwawienie zatamowane.','Gotowe, wracaj do gry.']));}};
 if(!self&&!t.human){t.task=null;t.path=null;t.vx=t.vy=0;}radio(m.name,self?'Opatruję się!':'Opatruję '+t.name+'!');}
// ---- reports to TOC ----
function reportable(o){if(o.team==='squad'||o.toc)return null;
 if(o.kind==='corpse')return['ciało ofiary','TOC, zgłaszam ciało. Ofiara napastników.'];
 if(!o.alive){if(o.team==='enemy')return['zabity napastnik','TOC, napastnik zneutralizowany, nie żyje.'];if(o.kind==='director')return null;return['zabity cywil','TOC, mamy zabitego cywila.'];}
 if(o.team==='enemy'){if(o.state==='cuffed')return['skuty podejrzany','TOC, podejrzany skuty.'];if(o.pose==='sleep')return['uśpiony podejrzany','TOC, podejrzany unieszkodliwiony, uśpiony.'];return null;}
 if(o.state==='cuffed')return['skuty cywil','TOC, cywil skuty i zabezpieczony.'];if(o.pose==='sleep')return['uśpiony cywil','TOC, cywil uśpiony i zabezpieczony.'];return null;}
function reportTarget(u){const fx=u.x+Math.cos(u.ang)*10,fy=u.y+Math.sin(u.ang)*10;let b=null,bd=26;
 for(const o of G.units){if(o===u||!reportable(o)||!o.visNow)continue;const d=Math.min(dist(fx,fy,o.x,o.y),dist(u.x,u.y,o.x,o.y)+6);if(d<bd){bd=d;b=o;}}return b;}
function doReport(u,o){const r=reportable(o);if(!r)return;o.toc=true;G.stats.reports++;radio(u.name,r[1]);radio('TOC',pick(['Przyjąłem.','TOC przyjął.','Zrozumiałem, odnotowane.','Przyjąłem, wysyłamy techników po zabezpieczeniu.']));}
function frontDoor(u){return doorNear(u.x+Math.cos(u.ang)*10,u.y+Math.sin(u.ang)*10,14)||doorNear(u.x,u.y,12);}
function ability(u){if(u.patrol){shout(u);return;}switch(u.spec){
 case'lead':shout(u);break;
 case'breach':{const d=frontDoor(u);if(!d||d.broken||d.open>.5){toast('Podejdź do zamkniętych drzwi');return;}if(u.ram){u.action={t:0,dur:.55,label:'Taran',done:()=>kickDoor(u,d)};}else plantCharge(u,d);break;}
 case'tech':{const d=frontDoor(u);if(!d||d.broken||d.open>.5){const a=u.ang;u.action={t:0,dur:.5,label:'Peryskop',pose:'kneel',done:()=>startMirror(u,a)};break;}u.action={t:0,dur:1,label:'Kamera światłowodowa',pose:'kneel',done:()=>snakeCam(d,u)};break;}
 case'medic':{const t=healTarget(u);if(t)startHeal(u,t);else if(u.wounded&&!u.treated)startHeal(u,u);else sedate(u);break;}
 case'scout':{if(u.flash<=0){toast('Brak granatów');return;}let tx=u.x+Math.cos(u.ang)*TS*5,ty=u.y+Math.sin(u.ang)*TS*5;if(u.human===1){tx=G.mouse.wx;ty=G.mouse.wy;}throwNade(u,tx,ty);break;}}}
function interactInfo(u){if(isPat()&&LD().interact){const h=LD().interact(u);if(h)return h;}const fx=u.x+Math.cos(u.ang)*9,fy=u.y+Math.sin(u.ang)*9;let best=null,bd=20;
 for(const o of G.units){if(o===u||!o.alive||o.team==='squad'||o.pose==='sleep'||o.state==='bed')continue;const d=Math.min(dist(fx,fy,o.x,o.y),dist(u.x,u.y,o.x,o.y)+4);if(d>=bd)continue;let k=null;
  if(o.kind==='director'){if(o.state==='tied')k=['free','Uwolnij zakładnika',1.4];}
  else if(o.team==='enemy'){if(o.state==='surr')k=['cuff','Skuj napastnika',.8];else if(o.stun>0)k=['surr','Na ziemię! (wymuś poddanie)',0];}
  else if(o.state!=='cuffed'&&o.kind!=='ems'&&!(o.kind==='patient'&&G.lvl==='school')&&!o.noCuff)k=['cuffc',o.kind==='patient'?'Skuj pacjenta':'Skuj cywila',.9];
  if(k){bd=d;best={k:k[0],label:k[1],dur:k[2],o};}}
 if(best)return best;
 {const tr=trapNear(u);if(tr){if(u.spec==='tech')return{k:'disarm',label:'Rozbrój pułapkę',dur:2.5,o:tr};return null;}}
 if(G.lvl==='hosp'&&u.human&&dist(u.x,u.y,49.5*TS,26.5*TS)<20)return{k:'cctv',label:'Monitoring — kamery szpitala',dur:.4,o:null};
 const d=frontDoor(u);
 if(d&&!d.broken&&!d.charge){if(d.locked&&d.knownLocked)return u.spec==='tech'?{k:'pick',label:'Otwórz wytrychem',dur:2.5,o:d}:{k:'kick',label:'Wyważ kopniakiem',dur:u.spec==='breach'?.6:1.3,o:d};
  return{k:'door',label:d.target?'Zamknij drzwi':'Otwórz drzwi',dur:0,o:d};}
 return null;}
function doInteract(u,it){const o=it.o;switch(it.k){
 case'cctv':{startCCTV(u,0);break;}
 case'house':it.f(u);break;
 case'door':{const r=toggleDoor(o,u);if(r==='locked'){toast('Zamknięte na klucz');radio(u.name,'Drzwi zamknięte na klucz.');}break;}
 case'pick':o.locked=false;toggleDoor(o,u);radio(u.name,'Zamek otwarty.');break;
 case'kick':kickDoor(u,o);break;
 case'disarm':if(!o.dead)disarm(u,o);break;
 case'free':logEv(u.name+' uwolnił zakładnika ('+roomName(o.x,o.y)+')');o.state='follow';o.pose='stand';o.leader=u;G.obj.found=true;G.obj.freed=true;radio(u.name,'Mam zakładnika! Wyprowadzam go.',{prio:1});radio('TOC','Dobra robota. Wyprowadźcie go z budynku.');break;
 case'cuff':o.state='cuffed';o.pose='kneel';o.fake=false;G.stats.eArrest++;logEv(u.name+' skuł napastnika ('+roomName(o.x,o.y)+')');radio(u.name,'Zatrzymany skuty.');break;
 case'surr':surrender(o,u);break;
 case'secure':o.state='secured';o.pose='hands';o.path=null;G.stats.civSecured++;radio(u.name,pick(['Cywil zabezpieczony.','Spokojnie, policja. Zostań tu.']));break;
 case'cuffc':if(!o.alive||o.state==='cuffed')break;logEv(u.name+' skuł cywila ('+roomName(o.x,o.y)+')');o.state='cuffed';o.pose='kneel';o.path=null;o.vx=o.vy=0;G.stats.civSecured++;radio(u.name,pick(['Cywil skuty.','Spokojnie, skuwam cię dla twojego bezpieczeństwa.','Zabezpieczony.']));break;
 case'calm':o.state='calm';o.pose='kneel';o.path=null;G.stats.civSecured++;radio(u.name,'Spokojnie, nic ci nie grozi.');break;}}

// ================= PATHING =================
function followPath(u,dt,spd){
 if(!u.path||!u.path.length)return true;
 if(u.path.length>1){const n=u.path[1];if(walkLine(u.x,u.y,n[0]*TS+8,n[1]*TS+8,u.r))u.path.shift();}
 const tx=u.path[0][0],ty=u.path[0][1],px=tx*TS+8,py=ty*TS+8;
 const d=LV.doorAt[I(tx,ty)];
 if(d&&!d.broken&&d.open<.6){if(dist(u.x,u.y,px,py)<TS*1.5){moveUnit(u,dt,0,0,0);
  if(d.target===0){if(d.locked){d.knownLocked=true;u.path=null;u.pathFail=d;return true;}if(u.team==='civ'&&u.kind!=='director'){u.path=null;return true;}toggleDoor(d,u);}return false;}}
 const dx=px-u.x,dy=py-u.y,dd=Math.hypot(dx,dy)||1;
 if(dd<5&&u.path.length>1){u.path.shift();return false;}
 if(dd<2.5){u.path.shift();return !u.path.length;}
 const sp=u.path.length===1?Math.min(spd,dd*5+6):spd,bx=u.x,by=u.y;moveUnit(u,dt,dx/dd,dy/dd,sp);
 if(Math.hypot(u.x-bx,u.y-by)<sp*dt*.15)u.stuck+=dt;else u.stuck=0;
 if(u.stuck>1){u.stuck=0;u.path=null;}
 return false;}
function setGoto(u,tx,ty,o={}){u.task=Object.assign({type:'goto',tx,ty,done:false},o);u.path=null;u.action=null;u.pose='stand';}
function setHold(u,face,pose){u.task={type:'hold',face:face==null?u.ang:face,pose,since:G.time};u.path=null;}
function doGoto(u,dt){const t=u.task;if(t.done){moveUnit(u,dt,0,0,0);return;}
 if(t.delay>0){t.delay-=dt;moveUnit(u,dt,0,0,0);return;}
 const px=t.tx*TS+8,py=t.ty*TS+8,d=dist(u.x,u.y,px,py);
 if(d<3){moveUnit(u,dt,0,0,0);t.done=true;u.path=null;return;}
 if(d<TS*2.2&&walkLine(u.x,u.y,px,py,u.r)){u.path=null;moveUnit(u,dt,(px-u.x)/d,(py-u.y)/d,Math.min(t.spd||46,d*4+8));return;}
 if(!u.path){u.path=findPath(u.x/TS|0,u.y/TS|0,t.tx,t.ty);if(!u.path){t.fail=(t.fail||0)+1;if(t.fail>3)t.done=true;return;}
  const l=u.path[u.path.length-1];t.tx=l[0];t.ty=l[1];}
 followPath(u,dt,t.spd||46);if(u.pathFail){u.pathFail=null;t.done=true;}}

// ================= ENEMY AI =================
function enemyPerceive(e){if(e.state==='flee'&&e.fleeT>10)return;let best=null,bd=1e9;const rg=(G.alarm?10:8)-((G.nvg||G.torchOff)?2.5:0);
 for(const s of G.squad){if(!s.alive)continue;const d=dist(e.x,e.y,s.x,s.y);if(d<rg*TS&&canSee(e,s.x,s.y,115,rg)&&d<bd){bd=d;best=s;}}
 if(best){e.seeT=true;e.lostT=0;e.lkx=best.x;e.lky=best.y;
  if(!e.target||e.target!==best&&(!e.target.alive||bd<dist(e.x,e.y,e.target.x,e.target.y)-TS*2)){const none=!e.target;e.target=best;
   if(none){e.react=(G.alarm?rand(.32,.5):rand(.55,.85))+(best.quiet&&!G.alarm?.15:0);e.ico='!';e.icoT=2;e.state='combat';e.burst=0;e.burstCd=0;e.alarmT=rand(.9,1.4);}}}
 else e.seeT=false;}
function updateEnemy(e,dt){if(!e.alive)return;if(e.upd&&!(e.stun>0)&&e.upd(e,dt))return;
 if(e.stun>0){e.stun-=dt;e.target=null;moveUnit(e,dt,0,0,0);e.ang+=Math.sin(G.time*5+e.id)*dt*1.5;if(e.stun<=0&&e.state!=='surr')e.state='search',e.goal={x:e.x,y:e.y},e.searchT=3,e.arrived=true;return;}
 if(e.state==='surr'&&e.fake){moveUnit(e,dt,0,0,0);updateFake(e,dt);if(e.state==='surr')return;}
 if(e.pose==='sleep'||e.state==='surr'||e.state==='cuffed'){moveUnit(e,dt,0,0,0);return;}
 if(e.rel>0){e.rel-=dt;if(e.rel<=0){const n=Math.min(e.W.mag-e.mag,e.res);e.mag+=n;e.res-=n;}}
 e.fireCd-=dt;e.burstCd-=dt;e.perT-=dt;if(e.perT<=0){e.perT=.1;enemyPerceive(e);}
 if(e.target){const t=e.target;
  if(!t.alive){e.target=null;e.state=e.boss?'guard':'search';e.goal={x:t.x,y:t.y};e.searchT=4;e.path=null;e.arrived=false;return;}
  if(e.alarmT>0){e.alarmT-=dt;if(e.alarmT<=0)raiseAlarm('spotted');}const ta=Math.atan2(t.y-e.y,t.x-e.x);turnTo(e,ta,dt,e.react>0?5:7);
  if(e.seeT){e.react-=dt;
   if(e.react<=0&&Math.abs(angDiff(e.ang,ta))<.15){if(e.mag<=0)startReload(e);else if(e.burst>0){if(fire(e))e.burst--;}else if(e.burstCd<=0){e.burst=e.W.auto?randi(2,4):randi(1,2);e.burstCd=rand(.55,1.1);}}
   const st=Math.sin(G.time*1.3+e.id*2);if(!e.boss&&!e.guard)moveUnit(e,dt,-Math.sin(ta)*st*.5,Math.cos(ta)*st*.5,14);else moveUnit(e,dt,0,0,0);}
  else{e.lostT+=dt;moveUnit(e,dt,0,0,0);if(e.lostT>1.2){e.target=null;if(e.boss)e.state='guard';else{e.state='search';e.goal={x:e.lkx,y:e.lky};e.searchT=6;e.path=null;e.arrived=false;e.ico='?';e.icoT=2;}}}
  return;}
 const look=(sp)=>{if(e.moving)turnTo(e,Math.atan2(e.vy,e.vx),dt,5);else turnTo(e,(e.lookA==null?e.ang:e.lookA),dt,sp||1.5);};
 if(e.lookT==null||(e.lookT-=dt)<=0){e.lookT=rand(1.5,3.5);e.lookA=e.ang+rand(-1.3,1.3);}
 switch(e.state){
 case'guard':{const hd=dist(e.x,e.y,e.home.x,e.home.y);if(hd>TS*1.5){e.state='return';e.path=null;break;}moveUnit(e,dt,0,0,0);
  if(e.boss){if(e.lookT>3||e.lookA==null||e.bossT==null||(e.bossT-=dt)<=0){e.bossT=rand(3,5);e.lookA=pick(e.looks)+rand(-.3,.3);}turnTo(e,e.lookA,dt,1.8);}
  else turnTo(e,e.home.a+Math.sin(G.time*.35+e.id)*.7,dt,1.2);break;}
 case'patrol':{if(!e.path){if(e.wait>0){e.wait-=dt;moveUnit(e,dt,0,0,0);look();break;}const p=e.patrol[e.pi];e.path=findPath(e.x/TS|0,e.y/TS|0,p[0],p[1]);if(!e.path){e.pi=(e.pi+1)%e.patrol.length;e.wait=1;break;}}
  if(followPath(e,dt,G.alarm?38:23)){e.path=null;e.pi=(e.pi+1)%e.patrol.length;e.wait=rand(1.5,3.5);}look();break;}
 case'investigate':case'search':{if(!e.arrived){if(!e.path){e.path=findPath(e.x/TS|0,e.y/TS|0,e.goal.x/TS|0,e.goal.y/TS|0);if(!e.path){e.arrived=true;break;}}
   if(followPath(e,dt,e.state==='search'?40:28))e.arrived=true;look();}
  else{moveUnit(e,dt,0,0,0);e.searchT-=dt;turnTo(e,e.ang+1,dt,1.6);if(e.searchT<=0){e.arrived=false;e.path=null;e.state=e.home.st==='guard'?'return':'patrol';}}break;}
 case'flee':updateFlee(e,dt);break;
 case'return':{if(!e.path){e.path=findPath(e.x/TS|0,e.y/TS|0,e.home.x/TS|0,e.home.y/TS|0);if(!e.path){e.state='guard';break;}}
  if(followPath(e,dt,26)){e.path=null;e.state='guard';}look();break;}
 default:e.state=e.home.st;}}
function raiseAlarm(why){if(G.alarm||G.ended)return;if(G.lvl!=='hosp'){G.alarm=true;return;}G.alarm=true;G.execT=45;logEv('ALARM — napastnicy zaalarmowani ('+why+')');barricade();
 radio('TOC',why==='cam'?'Monitoring was wykrył! Porywacz wie, że jesteście w środku. Działajcie szybko!':'Zostaliście wykryci! Porywacz może skrzywdzić zakładnika. Pospieszcie się!',{prio:1});}
function s_quiet(){const L=leader();return L&&L.quiet;}
function updateCams(dt){for(const c of LV.cams){c.on=!c.dead;c.det=0;if(G.camv&&G.camv.cam===c)continue;c.a=c.base+Math.sin(G.time*2*Math.PI/9+c.base*3)*.55;}}
function startCCTV(u,i){const cs=LV.cams.filter(c=>!c.dead);if(!cs.length){toast('Kamery nie działają');return;}i=((i||0)%cs.length+cs.length)%cs.length;const c=cs[i],prev=G.camv&&G.camv.cctv?G.camv:null;
 G.camv={d:null,u,x:c.x,y:c.y+5,base:c.base,ang:c.a,fov:1.0,range:TS*10,t:0,max:1e9,seen:prev?prev.seen:new Set(),poly:null,cctv:1,cam:c,ci:i};SND.click();
 toast('CAM '+(i+1)+'/'+cs.length+' · '+c.n.toUpperCase()+' — LPM: następna · mysz: obrót · ruch / E: wyjście');}

// ================= CIVILIANS =================
function nearestSquad(u){let b=null,bd=1e9;for(const s of G.squad)if(s.alive){const d=dist(u.x,u.y,s.x,s.y);if(d<bd){bd=d;b=s;}}return b;}
function hostageFollow(h,dt){let L=h.leader;if(!L||!L.alive)L=h.leader=nearestSquad(h);if(!L){moveUnit(h,dt,0,0,0);return;}
 const d=dist(h.x,h.y,L.x,L.y);
 if(d<TS*1.3){moveUnit(h,dt,0,0,0);h.path=null;}
 else if(d<TS*3&&walkLine(h.x,h.y,L.x,L.y,h.r)){moveUnit(h,dt,(L.x-h.x)/d,(L.y-h.y)/d,Math.min(46,d*1.6));h.path=null;}
 else{h.repath-=dt;if(!h.path||h.repath<=0){h.path=findPath(h.x/TS|0,h.y/TS|0,L.x/TS|0,L.y/TS|0);h.repath=.6;}if(h.path)followPath(h,dt,48);else moveUnit(h,dt,0,0,0);}
 if(h.moving)turnTo(h,Math.atan2(h.vy,h.vx),dt,6);}
function updateCiv(c,dt){if(!c.alive)return;if(c.upd){if(c.stun>0){c.stun-=dt;moveUnit(c,dt,0,0,0);return;}c.upd(c,dt);return;}if(c.kind==='suspect'){updateSuspect(c,dt);return;}
 if(c.state==='bed'){c.vx=c.vy=0;return;}
 if(c.stun>0){c.stun-=dt;moveUnit(c,dt,0,0,0);return;}
 if(c.state==='work'){moveUnit(c,dt,0,0,0);c.pose='stand';turnTo(c,c.workA+Math.sin(G.time*.35+c.id)*.6,dt,.8);return;}
 if(c.kind==='director'){if(c.state==='follow')hostageFollow(c,dt);else moveUnit(c,dt,0,0,0);return;}
 if(c.pose==='sleep'||['secured','calm','hide','comply','cuffed'].includes(c.state)){moveUnit(c,dt,0,0,0);if(c.state==='hide')c.pose='kneel';return;}
 const panic=c.state==='panic';if(panic){c.panicT-=dt;if(c.panicT<=0)c.state='wander';}
 if(!c.path){c.wait-=dt;moveUnit(c,dt,0,0,0);if(c.wait<=0){const tl=LV.roomTiles[c.room];if(tl&&tl.length){const t=pick(tl);c.path=findPath(c.x/TS|0,c.y/TS|0,t[0],t[1],1500);}c.wait=panic?rand(0,.4):rand(2,6);}}
 else if(followPath(c,dt,panic?42:15))c.path=null;
 if(c.moving)turnTo(c,Math.atan2(c.vy,c.vx),dt,4);else turnTo(c,c.ang+Math.sin(G.time*.3+c.id)*.6,dt,.6);}

// ================= SQUAD AI =================
const FORM=[[1.1,-.85],[1.1,.85],[2.2,-.55],[2.2,.55]],SECT=[-.7,.7,-2.5,2.5];
function leader(){if(G.p1&&G.p1.alive)return G.p1;if(G.p2&&G.p2.alive)return G.p2;return G.squad.find(s=>s.alive)||null;}
function aiAvail(spec){return G.squad.find(u=>u.alive&&!u.human&&u.spec===spec);}
const TEAMOF={lead:'red',breach:'red',tech:'red',medic:'blue',scout:'blue'};
function aiMembers(team){return G.squad.filter(u=>u.alive&&!u.human&&(!team||team==='all'||TEAMOF[u.spec]===team));}
function squadCombat(u,dt){u.perT-=dt;
 if(u.perT<=0){u.perT=.12;let best=null,bd=1e9;
  for(const e of G.enemies){if(!e.alive||e.state==='surr'||e.state==='cuffed'||e.pose==='sleep')continue;if(!canSee(u,e.x,e.y))continue;const d=dist(u.x,u.y,e.x,e.y);if(d<bd){bd=d;best=e;}}
  if(best&&best!==u.target){u.react=rand(.22,.42)*(G.squad.some(s=>s.alive&&s.spec==='lead')?1:1.25);if(!best.spotted){best.spotted=true;radio(u.name,pick(['Kontakt!','Wróg na wprost!','Mam kontakt!','Uzbrojony!']));}}
  u.target=best;}
 const t=u.target;if(!t)return false;if(!t.alive||t.state==='surr'||t.pose==='sleep'){u.target=null;return false;}
 const ta=Math.atan2(t.y-u.y,t.x-u.x);turnTo(u,ta,dt,9);u.react-=dt;
 if(t.stun>0&&dist(u.x,u.y,t.x,t.y)<TS*4.5){if(!t.shouted){t.shouted=true;radio(u.name,'Na ziemię! Ręce, ręce!',{raw:1});if(Math.random()<.75)setTimeout(()=>{if(t.alive&&t.stun>0)surrender(t,u);},500);}return true;}
 if(u.react<=0&&Math.abs(angDiff(u.ang,ta))<.09&&lineSafe(u,t)){if(u.mag<=0)startReload(u);else fire(u);}
 return true;}
// ---- column trail & tactical posts ----
function updateTrail(){const L=leader();if(!L)return;
 if(G.trailOwner!==L){G.trailOwner=L;const h=L.heading,pts=[];for(let k=8;k>=1;k--){const x=L.x-Math.cos(h)*k*12,y=L.y-Math.sin(h)*k*12;if(!collides(x,y,3))pts.push({x,y});else pts.length=0;}pts.push({x:L.x,y:L.y});G.trail=pts;}
 const t=G.trail,l=t[t.length-1];if(dist(l.x,l.y,L.x,L.y)>4){t.push({x:L.x,y:L.y});if(t.length>400)t.shift();}}
function trailPoint(back){const t=G.trail,L=leader();let px=L.x,py=L.y,acc=0;
 for(let i=t.length-1;i>=0;i--){const d=dist(px,py,t[i].x,t[i].y);if(d>0&&acc+d>=back){const k=(back-acc)/d;return{x:lerp(px,t[i].x,k),y:lerp(py,t[i].y,k)};}acc+=d;px=t[i].x;py=t[i].y;}return{x:px,y:py};}
function roomPosts(r,ref,skipDoor,maxD){maxD=(maxD||99)*TS;const tiles=LV.roomTiles[r];if(!tiles||!tiles.length)return[];const set=new Set(tiles.map(([x,y])=>I(x,y)));
 let x0=1e9,y0=1e9,x1=-1,y1=-1,cx=0,cy=0;for(const[x,y]of tiles){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);cx+=x;cy+=y;}
 cx=cx/tiles.length*TS+8;cy=cy/tiles.length*TS+8;const posts=[],taken=new Set(),lt=I(ref.x/TS|0,ref.y/TS|0);taken.add(lt);
 const add=(tx,ty,face,kind)=>{let best=null,bd=1e9;for(const[x,y]of tiles){const k=I(x,y);if(taken.has(k))continue;const d=Math.hypot(x-tx,y-ty);if(d<bd){bd=d;best=[x,y];}}
  if(!best||bd>3||dist(best[0]*TS+8,best[1]*TS+8,ref.x,ref.y)>maxD)return;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)taken.add(I(best[0]+dx,best[1]+dy));posts.push({tx:best[0],ty:best[1],face:face(best),kind});};
 for(const d of LV.doors){if(d===skipDoor)continue;let ins=null;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])if(set.has(I(d.x+dx,d.y+dy)))ins=[d.x+dx,d.y+dy,dx,dy];if(!ins)continue;
  const dcx=d.x*TS+8,dcy=d.y*TS+8;if(dist(ref.x,ref.y,dcx,dcy)<TS*1.7)continue;
  const[ix,iy,dx,dy]=ins,px=dy!==0?1:0,py=dx!==0?1:0,side=((d.x+d.y)%2)?1:-1;
  add(ix+px*side+dx,iy+py*side+dy,b=>Math.atan2(dcy-(b[1]*TS+8),dcx-(b[0]*TS+8)),'door');}
 const cs=[[x0,y0],[x1,y0],[x0,y1],[x1,y1]].sort((a,b)=>Math.hypot(b[0]*TS-ref.x,b[1]*TS-ref.y)-Math.hypot(a[0]*TS-ref.x,a[1]*TS-ref.y));
 for(const[c0,c1]of cs)add(c0,c1,b=>Math.atan2(cy-(b[1]*TS+8),cx-(b[0]*TS+8)),'corner');
 return posts;}
function clearPosts(){if(G.postAnchor){G.postAnchor=null;for(const u of G.squad)u.post=null;}}
function updateTactical(dt){const L=leader();if(!L||G.order!=='follow'||G.ops.length||(L.patrol&&isPat()&&!L.tac)){clearPosts();G.stillT=0;return;}
 const r=LV.room[I(L.x/TS|0,L.y/TS|0)];
 if(G.postAnchor){if(dist(L.x,L.y,G.postAnchor.x,G.postAnchor.y)>TS*1.6||r!==G.postAnchor.r)clearPosts();return;}
 G.stillT=Math.hypot(L.vx,L.vy)<6?(G.stillT||0)+dt:0;
 if(G.stillT>1.4&&r>=0&&!ROOMS[r].n.startsWith('Korytarz')){const posts=roomPosts(r,L,null,6),mem=aiMembers().filter(u=>!u.task);if(!posts.length||!mem.length)return;
  G.postAnchor={x:L.x,y:L.y,r};for(const p of posts){if(!mem.length)break;let b=null,bd=1e9;for(const u of mem){const d=dist(u.x,u.y,p.tx*TS+8,p.ty*TS+8);if(d<bd){bd=d;b=u;}}mem.splice(mem.indexOf(b),1);b.post=p;b.path=null;}
  const m=aiMembers().find(u=>u.post);if(m&&G.time-(G.postTalkT||-99)>25&&Math.random()<.5&&(G.postTalkT=G.time))radio(m.name,pick(['Zabezpieczamy.','Biorę drzwi.','Kąty czyste.','Pokrywam wejście.']));}}
const COLF=[.45,-.45,.3,-.3],COLS=[-1.3,1.3,-2,Math.PI];
function doFollow(u,dt,idx,engaged,cnt){const L=leader();if(!L||L===u){moveUnit(u,dt,0,0,0);return;}
 if(u.patrol&&isPat()&&!u.tac){patrolFollow(u,dt,L,engaged);return;}
 const lsp=L.quiet?26:48;u.pose='stand';
 if(u.post){const p=u.post,px=p.tx*TS+8,py=p.ty*TS+8,d=dist(u.x,u.y,px,py);
  if(d<3){moveUnit(u,dt,0,0,0);u.path=null;if(!engaged){turnTo(u,p.face+Math.sin(G.time*.5+u.id)*.3,dt,3);if(p.kind==='door')u.pose='kneel';}return;}
  if(d<TS*2.5&&walkLine(u.x,u.y,px,py,u.r)){u.path=null;moveUnit(u,dt,(px-u.x)/d,(py-u.y)/d,Math.min(32,d*3+8));}
  else{u.repath-=dt;if(!u.path||u.repath<=0){u.path=findPath(u.x/TS|0,u.y/TS|0,p.tx,p.ty);u.repath=.8;if(!u.path){u.post=null;return;}}followPath(u,dt,32);}
  if(!engaged)turnTo(u,d<TS*1.5?p.face:Math.atan2(u.vy,u.vx),dt,6);return;}
 const lr=LV.room[I(L.x/TS|0,L.y/TS|0)],corrL=lr>=0&&ROOMS[lr].n.startsWith('Korytarz'),back=(corrL?20:17)*(idx+1)+6;
 const tp=trailPoint(back),side=idx%2?1:-1;let fdir=null;
 if(corrL){const t2=trailPoint(back+12),dx=tp.x-t2.x,dy=tp.y-t2.y,l=Math.hypot(dx,dy);if(l>1){fdir=Math.atan2(dy,dx);const ox=-dy/l*side*7,oy=dx/l*side*7;if(!collides(tp.x+ox,tp.y+oy,u.r+.5)){tp.x+=ox;tp.y+=oy;}}}
 const d=dist(u.x,u.y,tp.x,tp.y),dl=dist(u.x,u.y,L.x,L.y);
 if(d<4){moveUnit(u,dt,0,0,0);u.path=null;}
 else if(d<TS*3&&walkLine(u.x,u.y,tp.x,tp.y,u.r)){u.path=null;const sp=d>TS*1.5?lsp+(corrL?1:4):Math.max(10,d*3);moveUnit(u,dt,(tp.x-u.x)/d,(tp.y-u.y)/d,Math.min(sp,corrL?lsp+1:52));}
 else{u.repath-=dt;if(!u.path||u.repath<=0){u.path=findPath(u.x/TS|0,u.y/TS|0,tp.x/TS|0,tp.y/TS|0);u.repath=.6;}if(u.path)followPath(u,dt,dl>TS*7?56:lsp+3);else moveUnit(u,dt,0,0,0);}
 if(!engaged){const last=idx===cnt-1&&cnt>1;let la;
  let od=null;if(corrL&&!last){let bd=TS*2.4;for(const dd of LV.doors){if(!(dd.broken||dd.open>.5))continue;const q=dist(u.x,u.y,dd.x*TS+8,dd.y*TS+8);if(q<bd){bd=q;od=dd;}}}
  if(od){la=Math.atan2(od.y*TS+8-u.y,od.x*TS+8-u.x);turnTo(u,la,dt,5);return;}
  if(corrL&&fdir!=null)la=last?fdir+Math.PI:fdir-side*.45;
  else if(L.moving)la=(u.moving?Math.atan2(u.vy,u.vx):L.heading)+(last?Math.PI:COLF[idx%4]);
  else la=L.heading+(last?Math.PI:COLS[idx%3]);
  turnTo(u,la+Math.sin(G.time*.6+idx*1.7)*.25,dt,3.5);}}
function updateSquadAI(u,dt,idx,cnt){u.fireCd-=dt;
 if(u.rel>0){u.rel-=dt;if(u.rel<=0){const n=Math.min(u.W.mag-u.mag,u.res);u.mag+=n;u.res-=n;}}
 if(u.stun>0){u.stun-=dt;moveUnit(u,dt,0,0,0);return;}
 const engaged=squadCombat(u,dt);if(!engaged&&u.mag<u.W.mag*.35&&u.rel<=0)startReload(u);
 const L=leader();u.quiet=L?L.quiet:false;
 if(u.action){moveUnit(u,dt,0,0,0);const a=u.action;u.pose=a.pose||'stand';a.t+=dt;if(a.tick)a.tick(dt);if(!engaged&&a.face!=null)turnTo(u,a.face,dt,6);if(a.t>=a.dur){u.action=null;u.pose='stand';a.done&&a.done();}return;}
 if(u.spec==='medic'&&!engaged){const w=G.squad.find(s=>s.alive&&s.wounded&&!s.treated&&!s.beingHealed);
  if(w){if(w===u){startHeal(u,u);return;}const d=dist(u.x,u.y,w.x,w.y);if(d<18){startHeal(u,w);return;}
   if(u.healAnn!==w){u.healAnn=w;radio(u.name,'Idę do ciebie, '+w.name+'!');}u.healPT=(u.healPT||0)-dt;if(!u.path||u.healPT<=0){u.path=findPath(u.x/TS|0,u.y/TS|0,w.x/TS|0,w.y/TS|0);u.healPT=.6;}
   if(u.path)followPath(u,dt,52);else moveUnit(u,dt,(w.x-u.x)/d,(w.y-u.y)/d,40);turnTo(u,Math.atan2(u.vy,u.vx),dt,6);u.pose='stand';return;}}
 const t=u.task;
 if(t&&t.type==='goto'){doGoto(u,dt);
  if(!engaged){if(t.faceX!=null&&dist(u.x,u.y,t.tx*TS+8,t.ty*TS+8)<TS*2)turnTo(u,Math.atan2(t.faceY-u.y,t.faceX-u.x),dt,6);
   else if(t.aimX!=null)turnTo(u,Math.atan2(t.aimY-u.y,t.aimX-u.x),dt,7);else if(u.moving)turnTo(u,Math.atan2(u.vy,u.vx),dt,6);}
  if(t.done&&t.onDone){const f=t.onDone;t.onDone=null;f();}
  else if(t.done&&t.then==='hold')setHold(u,t.holdFace!=null?t.holdFace:u.ang,'kneel');}
 else if(t&&t.type==='hold'){moveUnit(u,dt,0,0,0);u.pose=(t.pose||G.time-t.since>1.2)&&!engaged?'kneel':'stand';
  if(!engaged)turnTo(u,t.face+Math.sin(G.time*.5+u.id)*.45,dt,1.6);}
 else doFollow(u,dt,idx,engaged,cnt);}
// ---- orders ----
function doorSides(d,ref){if(d.vert){const s=ref.x<d.x*TS+8?-1:1;return{nx:d.x+s,ny:d.y,fx:d.x-s,fy:d.y,ox:-s,oy:0};}const s=ref.y<d.y*TS+8?-1:1;return{nx:d.x,ny:d.y+s,fx:d.x,fy:d.y-s,ox:0,oy:-s};}
function stackSpots(sd){const{nx,ny,ox,oy}=sd,px=oy!==0?1:0,py=ox!==0?1:0,bx=-ox,by=-oy;
 return[[nx-px,ny-py],[nx+px,ny+py],[nx-px+bx,ny-py+by],[nx+px+bx,ny+py+by],[nx-2*px,ny-2*py],[nx+2*px,ny+2*py],[nx+bx*2,ny+by*2],[nx+bx,ny+by]].filter(([x,y])=>walkable(x,y));}
function roomTargets(sd,n){const tiles=floodRoom(sd.fx,sd.fy,250).filter(([x,y])=>walkable(x,y));if(!tiles.length)return[];
 const inside=tiles.filter(([x,y])=>Math.hypot(x-sd.fx,y-sd.fy)<=7.5),C=inside.length?inside:tiles;
 let first=C[0],bs=1e9;for(const t of C){const s=Math.hypot(t[0]-(sd.fx+sd.ox*1.5),t[1]-(sd.fy+sd.oy*1.5));if(s<bs){bs=s;first=t;}}const out=[first];
 while(out.length<n){let bt=null,b=-1e9;for(const t of C){let m=1e9;for(const o of out)m=Math.min(m,Math.hypot(t[0]-o[0],t[1]-o[1]));const dd=Math.hypot(t[0]-sd.fx,t[1]-sd.fy),s=m-Math.max(0,dd-5)*.8;if(s>b){b=s;bt=t;}}if(!bt)break;out.push(bt);}
 return out;}
function pickOpener(mem,d,sd){if(d.locked){const t=mem.find(u=>u.spec==='tech');if(t)return t;const b=mem.find(u=>u.spec==='breach');if(b)return b;}
 let b=mem[0],bd=1e9;for(const u of mem){const dd=dist(u.x,u.y,sd.nx*TS+8,sd.ny*TS+8);if(dd<bd){bd=dd;b=u;}}return b;}
function aiOpenDoor(w,d,cb){const face=Math.atan2(d.y*TS+8-w.y,d.x*TS+8-w.x);
 if(d.broken||d.open>.6){cb();return;}
 if(w.ram){radio(w.name,'Taran!');w.action={t:0,dur:.55,face,done:()=>{kickDoor(w,d);cb();}};return;}
 if(d.locked){d.knownLocked=true;
  if(w.spec==='tech'){radio(w.name,'Zamknięte. Otwieram wytrychem.');w.action={t:0,dur:2.5,face,pose:'kneel',tick:dt=>{if(Math.random()<dt*6)SND.pick(w.x,w.y);},done:()=>{d.locked=false;toggleDoor(d,w);cb();}};}
  else{radio(w.name,'Zamknięte! Wyważam.');w.action={t:0,dur:w.spec==='breach'?.7:1.3,face,done:()=>{kickDoor(w,d);cb();}};}}
 else w.action={t:0,dur:.35,face,done:()=>{if(toggleDoor(d,w)==='locked'){aiOpenDoor(w,d,cb);return;}cb();}};}
function dropOps(mem){G.ops=G.ops.filter(o=>!o.mem.some(m=>mem.includes(m)));}
function teamName(t){return t==='red'?'Czerwony':t==='blue'?'Niebieski':'Zespół';}
function orderFollow(team){const M=aiMembers(team);dropOps(M);for(const u of M){u.task=null;u.action=null;u.path=null;u.pose='stand';}G.order='follow';const m=M[0];if(m)radio(m.name,pick(['Przyjąłem, idziemy za tobą.','Za tobą.','Zrozumiałem, formacja.']));}
function orderHold(team){const M=aiMembers(team);dropOps(M);for(const u of M){u.action=null;setHold(u,u.ang);}G.order='hold';const m=M[0];if(m)radio(m.name,pick(['Trzymamy pozycję.','Stoimy, osłaniamy.']));}
function orderMove(wx,wy,team){const mem=aiMembers(team);dropOps(mem);const tx=wx/TS|0,ty=wy/TS|0,offs=[[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1]];
 mem.forEach((u,i)=>{const o=offs[i%offs.length];let x=tx+o[0],y=ty+o[1];if(!walkable(x,y)){x=tx;y=ty;}setGoto(u,x,y,{then:'hold'});});G.order='move';if(mem[0])radio(mem[0].name,pick(['Przyjąłem, ruszamy.','Idziemy.']));}
function startOp(kind,d,mode,team,wait){const mem=aiMembers(team);if(!mem.length){toast('Brak ludzi pod rozkazami');return;}
 const L=leader(),sd=doorSides(d,L||mem[0]),fc={faceX:d.x*TS+8,faceY:d.y*TS+8};
 if(kind==='peek'){const w=aiAvail('tech');if(!w){toast('Ofc. Mason (Tech) niedostępny');return;}dropOps([w]);G.ops.push({kind,d,sd,t:0,stage:'go',who:w,mem:[w]});setGoto(w,sd.nx,sd.ny,fc);radio(w.name,'Przyjąłem, sprawdzam kamerą.');G.order='op';return;}
 if(kind==='open'){const w=pickOpener(mem,d,sd);dropOps([w]);G.ops.push({kind,d,sd,t:0,stage:'go',who:w,mem:[w]});setGoto(w,sd.nx,sd.ny,fc);radio(w.name,pick(['Otwieram.','Przyjąłem, drzwi.']));G.order='op';return;}
 const spots=stackSpots(sd);dropOps(mem);G.ops.push({kind:'clear',d,sd,mode,stage:'stack',t:0,mem,spots,team:team||'all',wait:!!wait});
 mem.forEach((u,i)=>{const s=spots[i%Math.max(1,spots.length)]||[sd.nx,sd.ny];setGoto(u,s[0],s[1],fc);});
 radio(mem[0].name,mode==='breachflash'?'Ładunek i granat. Ustawiamy się.':mode==='flash'?'Ustawiamy się. Granat i wchodzimy.':mode==='breach'?'Ustawiamy się do wysadzenia.':'Ustawiamy się przy drzwiach.');G.order='op';}
function updateOp(dt){for(const op of [...G.ops])updateOne(op,dt);G.ops=G.ops.filter(o=>!o.done);}
function updateOne(op,dt){op.t+=dt;const d=op.d;op.mem=op.mem.filter(u=>u.alive&&!u.human);
 if(!op.mem.length){op.done=true;return;}const fc={faceX:d.x*TS+8,faceY:d.y*TS+8};
 if(op.kind==='peek'){const w=op.who;if(!w.alive||w.human){op.done=true;return;}
  if(op.stage==='go'&&(w.task&&w.task.done||op.t>12)){if(d.broken||d.open>.5){toast('Drzwi są otwarte');setHold(w,w.ang);op.done=true;return;}
   op.stage='cam';const face=Math.atan2(d.y*TS+8-w.y,d.x*TS+8-w.x);w.action={t:0,dur:1.1,face,pose:'kneel',done:()=>{snakeCam(d,w);setHold(w,face,'kneel');}};}
  if(op.stage==='cam'&&!w.action&&!G.camv)op.done=true;return;}
 if(op.kind==='open'){const w=op.who;if(!w.alive||w.human){op.done=true;return;}
  if(op.stage==='go'&&(w.task&&w.task.done||op.t>12)){op.stage='act';aiOpenDoor(w,d,()=>{op.stage='done';});}
  if(op.stage==='done'){setHold(w,Math.atan2(d.y*TS+8-w.y,d.x*TS+8-w.x));op.done=true;}return;}
 const room=()=>{const tl=floodRoom(op.sd.fx,op.sd.fy,300);let cx=0,cy=0;for(const[x,y]of tl){cx+=x;cy+=y;}return{tl,cx:(cx/Math.max(1,tl.length))*TS+8,cy:(cy/Math.max(1,tl.length))*TS+8};};
 switch(op.stage){
 case'stack':{const st=op.mem.every(u=>u.task&&u.task.done)||op.t>10;if(st&&op.wait&&!op.ready){op.ready=true;radio(op.mem[0].name,teamName(op.team)+' gotowy na pozycji. Czekamy na sygnał.');}
  if(st&&(!op.wait||op.go)){op.t=0;
   if(d.broken||d.open>.6){op.stage='post';break;}
   const br=op.mode.includes('breach')&&op.mem.find(u=>u.spec==='breach'&&(u.charges>0||u.ram));
   if(br&&br.ram){op.opener=br;setGoto(br,op.sd.nx,op.sd.ny,fc);op.stage='goopen';}
   else if(br){op.br=br;setGoto(br,op.sd.nx,op.sd.ny,fc);op.stage='plant';}
   else{const w=pickOpener(op.mem,d,op.sd);op.opener=w;setGoto(w,op.sd.nx,op.sd.ny,fc);op.stage='goopen';}}}break;
 case'plant':if(!op.br.alive){op.stage='stack';break;}if(op.br.task&&op.br.task.done||op.t>6){op.t=0;if(!plantCharge(op.br,d)){op.stage='post';break;}
   const sp=op.spots[op.mem.indexOf(op.br)%Math.max(1,op.spots.length)]||op.spots[0];if(sp)setGoto(op.br,sp[0],sp[1],fc);op.stage='boom';}break;
 case'boom':if(d.broken||(!d.charge&&op.t>4)){op.stage='post';op.t=0;}break;
 case'goopen':if(!op.opener.alive){op.stage='stack';break;}if(op.opener.task&&op.opener.task.done||op.t>8){op.stage='opening';op.t=0;aiOpenDoor(op.opener,d,()=>{op.stage='post';op.t=0;});}break;
 case'opening':if(op.t>8){op.stage='post';op.t=0;}break;
 case'post':{if(!(d.broken||d.open>.5)){if(op.t>2){radio(op.mem[0].name,'Nie da się otworzyć.');op.done=true;}break;}
   const sc=op.mode.includes('flash')&&op.mem.find(u=>u.spec==='scout'&&u.flash>0);
   if(sc&&!op.flashed){op.flashed=1;const tx=(op.sd.fx+op.sd.ox*2)*TS+8,ty=(op.sd.fy+op.sd.oy*2)*TS+8;
    sc.ang=Math.atan2(ty-sc.y,tx-sc.x);
    {const ox=op.sd.ox,oy=op.sd.oy,dx0=d.x*TS+8-ox*5,dy0=d.y*TS+8-oy*5;let k=2.6;while(k>1.2&&!walkable(Math.floor((d.x*TS+8+ox*k*TS)/TS),Math.floor((d.y*TS+8+oy*k*TS)/TS)))k-=.4;
     const dd=k*TS+5,sp=dd*1.5;sc.flash--;logEv(sc.name+' wrzucił granat hukowy ('+roomName(d.x*TS+8+ox*TS,d.y*TS+8+oy*TS)+')');sc.ang=Math.atan2(oy,ox);
     G.nades.push({x:dx0,y:dy0,vx:ox*sp,vy:oy*sp,z:8,vz:48,t:1.6,by:sc});SND.pick(sc.x,sc.y);radio(sc.name,pick(['Granat!','Hukowy, uwaga!','Rzucam hukowy!']),{prio:1});}
    op.stage='flashwait';op.t=0;}
   else{op.stage='enter';op.t=0;}break;}
 case'flashwait':if(op.t>1.75){op.stage='enter';op.t=0;}break;
 case'enter':{const R=room();op.cx=R.cx;op.cy=R.cy;const rr=LV.room[I(op.sd.fx,op.sd.fy)],first=roomTargets(op.sd,1),posts=rr>=0?roomPosts(rr,{x:d.x*TS+8,y:d.y*TS+8},d,6):[];
   let tg=[...first.map(t=>({tx:t[0],ty:t[1],face:null})),...posts.filter(p=>!first.some(f=>f[0]===p.tx&&f[1]===p.ty))];if(tg.length<op.mem.length)tg=tg.concat(roomTargets(op.sd,op.mem.length+1).map(t=>({tx:t[0],ty:t[1],face:null})));
   const ord=[...op.mem].sort((a,b)=>dist(a.x,a.y,d.x*TS+8,d.y*TS+8)-dist(b.x,b.y,d.x*TS+8,d.y*TS+8));
   ord.forEach((u,i)=>{const t=tg[i]||tg[0];if(t)setGoto(u,t.tx,t.ty,{delay:i*.55,aimX:R.cx,aimY:R.cy,spd:30,holdFace:t.face});});
   op.stage='moving';op.t=0;radio(ord[0].name,pick(['Wchodzimy!','Ruch, ruch!','Wejście!']),{prio:1});break;}
 case'moving':if(op.mem.every(u=>u.task&&u.task.done)||op.t>14){const R=room(),ts=new Set(R.tl.map(([x,y])=>I(x,y)));
   const left=G.enemies.filter(e=>e.active()&&ts.has(I(e.x/TS|0,e.y/TS|0))).length;
   op.mem.forEach(u=>setHold(u,u.task&&u.task.holdFace!=null?u.task.holdFace:Math.atan2(R.cy-u.y,R.cx-u.x)+rand(-.6,.6)));
   radio(op.mem[0].name,left?'Kontakt w pomieszczeniu!':pick(['Czysto!','Pomieszczenie czyste.','Czysto, zabezpieczone.']));op.done=true;if(!G.ops.some(o=>o!==op&&!o.done))G.order='hold';}break;}}

// ---- patrol partner: contact & cover instead of SWAT room posts ----
function patrolFocus(L){let best=null,bd=TS*6;for(const c of G.units){if(c.team==='squad'||!c.alive||!c.visNow)continue;if(c.team!=='civ'&&c.team!=='enemy')continue;if(c.kind==='gawk'||c.kind==='neighbor')continue;const d=dist(c.x,c.y,L.x,L.y);if(d<bd&&losClear(L.x,L.y,c.x,c.y)){bd=d;best=c;}}return best;}
function patrolFollow(u,dt,L,engaged){u.pose='stand';const P_=u.pf||(u.pf={tx:null,ty:null,t:0,scan:0,scanA:0,rooms:{}});P_.t-=dt;
 const f=patrolFocus(L),dl=dist(u.x,u.y,L.x,L.y);
 if(P_.t<=0||P_.tx==null){P_.t=.9;let wx,wy;
  if(f){// osłona: trójkąt z partnerem i obserwowaną osobą
   const a0=Math.atan2(L.y-f.y,L.x-f.x),r=TS*2.3;let best=null,bs=1e9;
   for(const sg of[1,-1])for(const da of[.95,1.2,.7]){const a=a0+sg*da,x=f.x+Math.cos(a)*r,y=f.y+Math.sin(a)*r;if(collides(x,y,u.r+1)||!losClear(x,y,f.x,f.y))continue;const sc=dist(x,y,u.x,u.y)+(dist(x,y,L.x,L.y)<TS*1.2?200:0);if(sc<bs){bs=sc;best=[x,y];}}
   if(best){wx=best[0];wy=best[1];}}
  if(wx==null){const h=L.moving?Math.atan2(L.vy,L.vx):L.heading||L.ang,side=((u.id||1)%2)?1:-1;
   for(const[b,sdv]of[[1.5,.9],[1.2,.5],[1.8,0],[1,1.2]]){const x=L.x-Math.cos(h)*TS*b-Math.sin(h)*TS*sdv*side,y=L.y-Math.sin(h)*TS*b+Math.cos(h)*TS*sdv*side;if(!collides(x,y,u.r+1)){wx=x;wy=y;break;}}
   if(wx==null){wx=L.x;wy=L.y;}}
  if(P_.tx==null||dist(wx,wy,P_.tx,P_.ty)>TS*1.1||(L.moving&&dist(wx,wy,P_.tx,P_.ty)>TS*.6)){P_.tx=wx;P_.ty=wy;u.path=null;}}
 const d=dist(u.x,u.y,P_.tx,P_.ty),sp=dl>TS*6?50:dl>TS*3.5?40:L.moving?(L.quiet?24:34):24;
 if(d<5){moveUnit(u,dt,0,0,0);u.path=null;}
 else if(d<TS*3&&walkLine(u.x,u.y,P_.tx,P_.ty,u.r)){u.path=null;moveUnit(u,dt,(P_.tx-u.x)/d,(P_.ty-u.y)/d,Math.min(sp,d*2.5+10));}
 else{u.repath-=dt;if(!u.path||u.repath<=0){u.path=findPath(u.x/TS|0,u.y/TS|0,P_.tx/TS|0,P_.ty/TS|0);u.repath=.8;}if(u.path)followPath(u,dt,sp);else moveUnit(u,dt,0,0,0);}
 // krótka, rzeczowa komunikacja przy pierwszym wejściu do pomieszczenia
 const r=LV.room[I(u.x/TS|0,u.y/TS|0)];if(r>=0&&!P_.rooms[r]){P_.rooms[r]=1;if(!f&&G.time-(G.pTalk||-99)>30&&Math.random()<.35&&!ROOMS[r].n.startsWith('Korytarz')){G.pTalk=G.time;say(u.name,pick(['Czysto.','Nikogo.','Tu pusto.']));}}
 if(engaged)return;
 if(f){turnTo(u,Math.atan2(f.y-u.y,f.x-u.x),dt,4);return;}
 if(u.moving&&d>TS*.8){turnTo(u,Math.atan2(u.vy,u.vx),dt,5);return;}
 // spokojna obserwacja: drzwi w pobliżu, tył zespołu, kierunek lidera
 P_.scan-=dt;if(P_.scan<=0){P_.scan=rand(3,5.5);let od=null,bd=TS*4;for(const dd of LV.doors){const q=dist(u.x,u.y,dd.x*TS+8,dd.y*TS+8);if(q<bd&&q>TS*.8&&losClear(u.x,u.y,dd.x*TS+8,dd.y*TS+8)){bd=q;od=dd;}}
  const h=L.heading||L.ang,opts=[h+Math.PI*.8*(((u.id||1)%2)?1:-1),h];if(od)opts.push(Math.atan2(od.y*TS+8-u.y,od.x*TS+8-u.x));P_.scanA=opts[(Math.random()*opts.length)|0];}
 turnTo(u,P_.scanA+Math.sin(G.time*.4+u.id)*.12,dt,2.2);}
