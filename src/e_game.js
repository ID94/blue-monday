// ================= MISSION SETUP =================
const ENTRIES_HOSP=[
 {n:'Wejście główne',s:'Południe · hol. Najkrótsza droga, możliwy wartownik.',x:36.5,y:46.6,a:-Math.PI/2,px:36,py:45},
 {n:'Wejście personelu',s:'Wschód · korytarz serwisowy przy kostnicy. Ciszej, dłuższa droga.',x:69.5,y:46.6,a:-Math.PI/2,px:69,py:45}];
let ENTRIES=ENTRIES_HOUSE;
const ENEMIES=[
 {x:54,y:7,a:Math.PI/2,boss:1,weap:'ePistol',guard:1},
 {x:60,y:4,weap:'eRifle',patrol:[[60,4],[60,7],[52,6]]},
 {x:70,y:8,weap:'eRifle',patrol:[[66,8],[75,8],[75,3],[65,7]]},
 {x:45,y:7,a:Math.PI/2,weap:'ePistol',guard:1},
 {x:36,y:12,weap:'eRifle',patrol:[[36,12],[75,11]]},
 {x:32,y:4,weap:'eRifle',patrol:[[32,4],[33,20]]},
 {x:34,y:23,weap:'eRifle',patrol:[[34,22],[75,23]]},
 {x:37,y:32,a:Math.PI/2,weap:'eRifle',guard:1},
 {x:66,y:6,a:Math.PI,weap:'ePistol',guard:1},
 {x:51,y:15,weap:'eRifle',patrol:[[51,15],[52,19],[56,17],[46,17]]},
];
const CIVS=[{x:19,y:19,k:'nurse',st:'hide'},{x:39,y:5,k:'doctor',st:'hide'},{x:48,y:4,k:'nurse',st:'hide'},{x:12,y:15,k:'orderly',st:'hide'},{x:6,y:41,k:'cook',st:'hide'},
 {x:53,y:42,k:'janitor',st:'hide'},{x:65,y:31,k:'orderly',st:'hide'},{x:30,y:42,k:'nurse',st:'hide'},{x:72,y:29,k:'doctor',st:'hide'},{x:63,y:16,k:'cook',st:'hide'},
 {x:9,y:6,k:'patient',st:'wander'},{x:17,y:6,k:'patient',st:'wander'},{x:25,y:6,k:'patient',st:'wander'},{x:27,y:17,k:'patient',st:'wander'},{x:29,y:16,k:'patient',st:'wander'},{x:5,y:17,k:'patient',st:'wander'},{x:4,y:6,k:'patient',st:'wander'}];
const CORPSES=[[33,14,'guard'],[33,33,'guard'],[54,30,'guard'],[47,12,'orderly'],[60,9,'doctor']];
const INTEL=[[56,6,'ZAKŁADNIK?'],[37,31,'WARTA?'],[20,34,'?'],[73,29,'?'],[16,11,'?']];
function startMission(){if(A.sirG&&A.ctx)A.sirG.gain.value=0;if(A.dreadG&&A.ctx)A.dreadG.gain.value=0;if(A.rdHum){A.rdHum.gain.value=0;A.rdIdle.gain.value=0;}radioClear();G.torchOff=false;G.pings=[];stopCall();buildMap();if(G.bakedFor!==G.lvl)bakeWorld();G.bakedFor=null;LV.doorRows=null;mc.clearRect(0,0,memory.width,memory.height);
 Object.assign(G,{running:true,paused:false,ended:false,pDead:null,time:0,units:[],squad:[],enemies:[],civs:[],fx:[],tracers:[],lights:[],nades:[],ops:[],order:'follow',alarm:false,execT:45,warned:false,
  camv:null,lockIn:false,carBlk:null,traffic:[],flashW:0,shake:0,obj:{found:false,freed:false},devs:null,babyT:rand(3,6),panicCD:0,log:[],nvg:false,negT:rand(50,80),negBonus:0,negAlarm:0,traps:[],stats:{roe:0,traps:0,reports:0,wounded:0,healed:0,eKilled:0,eArrest:0,eSed:0,civKilled:0,civSecured:0,squadLost:0,shots:0,time:0},press:{},deadline:720,dl:{},blackT:rand(40,70),blackDur:0,scareT:rand(10,20),trail:[],trailOwner:null,postAnchor:null,stillT:0,lightT:rand(6,15),lightF:0,clankT:rand(8,18),heartT:0,p1:null,p2:null,hudT:0});
 if(!ENTRIES[G.entry])G.entry=0;const E=ENTRIES[G.entry],fx=Math.cos(E.a),fy=Math.sin(E.a),rx=-fy,ry=fx,offs=[[0,0],[-1,-.9],[-1,.9],[-2,-.5],[-2,.5]];
 if(isPat())(LD().spawn||spawnPatrolPair)(E);else{const order=[G.p1Spec,...SPECS.map((_,i)=>i).filter(i=>i!==G.p1Spec)];
 order.forEach((si,k)=>{const s=SPECS[si],o=offs[k];const u=new Unit({team:'squad',spec:s.id,name:s.name,role:s.role,weap:s.weap,fov:s.fov,range:s.range,acc:s.acc,pal:PAL.squad,charges:s.id==='breach'?2:0,flash:s.id==='scout'?3:0,sed:s.id==='medic'?4:0,shoutCd:0});applyLoad(u,(G.load||defaultLoad())[si]);
  u.x=E.x*TS+8+fx*o[0]*TS+rx*o[1]*TS;u.y=E.y*TS+fy*o[0]*TS+ry*o[1]*TS;u.ang=E.a;u.heading=E.a;unstick(u);G.squad[si]=u;G.units.push(u);});}
 G.p1=G.squad[G.p1Spec];G.p1.human=1;if(G.players===2){G.p2=G.squad[G.p2Spec];G.p2.human=2;}
 if(isPat()){LD().start();G.cam.x=G.p1.x;G.cam.y=G.p1.y;showScreen(null);$('hud').classList.remove('hidden');$('p2weapon').classList.toggle('hidden',G.players!==2);return;}
 G.h=null;
 const SC=G.scen||(G.scen=genScen());initTraps(SC.traps);
 const EL=[{x:SC.hs.b[0],y:SC.hs.b[1],a:SC.hs.looks[0],boss:1,weap:'ePistol',guard:1,looks:SC.hs.looks},...SC.en];
 for(const d of EL){const e=new Unit({team:'enemy',weap:d.weap,pal:d.boss?PAL.boss:(Math.random()<.5?PAL.enemy:PAL.enemy2),fov:115,range:8,boss:!!d.boss,guard:!!d.guard,operator:!!d.op,patrol:d.patrol||null,pi:0,wait:rand(0,2),name:'Napastnik'});
  e.x=d.x*TS+8;e.y=d.y*TS+8;e.ang=d.a||0;e.home={x:e.x,y:e.y,a:e.ang,st:d.patrol?'patrol':'guard'};e.state=e.home.st;if(e.boss)e.looks=d.looks;G.enemies.push(e);G.units.push(e);}
 for(const c of [...SC.hide,...PATIENTS.map(p=>({x:p[0],y:p[1],k:'patient',st:'wander'}))]){const pal={...PAL[c.k]};if(c.k==='patient')pal.hair=pick(['#5a4a3a','#2a2018','#8a8a80','#6a3a20','#cfcfc4']);
  const u=new Unit({team:'civ',kind:c.k,pal,state:c.st,wait:rand(0,3),r:4});u.x=c.x*TS+8;u.y=c.y*TS+8;u.ang=rand(-3,3);u.room=LV.room[I(c.x,c.y)];if(c.st==='hide')u.pose='kneel';G.civs.push(u);G.units.push(u);}
 for(const[x,y,k,a]of WORKERS){const u=new Unit({team:'civ',kind:k,pal:{...PAL[k]},state:'work',r:4,workA:a});u.x=x*TS+8;u.y=y*TS+8;u.ang=a;u.room=LV.room[I(x,y)];G.civs.push(u);G.units.push(u);}
 for(const[x,y,k]of BEDS){const pal=k==='mother'?{body:'#c8a8b8',legs:'#c8a8b8',head:'#d0b09a',face:'#d0b09a',visor:'#2a1a12',hair:pick(['#3a2418','#1e1410','#6a4a2a','#a08050']),eyes:1}:{...PAL.patient,hair:pick(['#5a4a3a','#8a8a80','#2a2018'])};
  const u=new Unit({team:'civ',kind:k==='mother'?'mother':'bedpt',pal,state:'bed',pose:'inbed',r:3});u.x=x*TS+8;u.y=y*TS+12;u.ang=Math.PI/2;G.civs.push(u);G.units.push(u);}
 for(const[x,y,k]of CORPSES){const u=new Unit({team:'civ',kind:'corpse',pal:PAL[k],r:4});u.alive=false;u.pose='dead';u.deathT=9;u.fallA=rand(-3,3);u.mseed=randi(0,999);u.x=x*TS+8;u.y=y*TS+8;G.units.push(u);}
 const h=new Unit({team:'civ',kind:'director',pal:PAL.director,state:'tied',pose:'sit',r:4});h.x=SC.hs.h[0]*TS+8;h.y=SC.hs.h[1]*TS+8;h.ang=Math.PI/2;G.hostage=h;G.civs.push(h);G.units.push(h);
 G.police=[];for(const[x,y,tx,ty,kn]of [[34,47,36,44,0],[39,47,36,44,1],[32.5,50.5,36,43,1],[41.5,50.5,36,43,0],[71.5,47,69,44,1]]){const pu=new Unit({team:'police',weap:'ePistol',pal:PAL.police});pu.x=x*TS+8;pu.y=y*TS+8;pu.ang=Math.atan2(ty*TS-pu.y,tx*TS+8-pu.x);pu.pose=kn?'kneel':'stand';G.police.push(pu);}
 bakeTraces();logEv('Wejście: '+ENTRIES[G.entry].n);
 G.cam.x=G.p1.x;G.cam.y=G.p1.y;
 showScreen(null);$('hud').classList.remove('hidden');$('p2weapon').classList.toggle('hidden',G.players!==2);
 setTimeout(()=>{radio('TOC','Alfa, jesteście na pozycji. Porywacz dał nam dwanaście minut. Perymetr zabezpieczony przez patrole. Wejście na wasz rozkaz.');radio(G.p1.name,'Przyjąłem. Wchodzimy.');},700);}
function bakeTraces(){const r=rng(99);
 CORPSES.forEach(([x,y],i)=>{bloodPool(x*TS+8,y*TS+9,rand(5,8),r);if(i%3===0){const a=r()*6.28;for(let k=0;k<12;k++)P(wc,Math.round(x*TS+8+Math.cos(a)*k*2+r()*2),Math.round(y*TS+9+Math.sin(a)*k*1.6),2,1,k%3?'#3a0b0b':'#2c0808');}});
 for(const[x,y,n]of[[11,21,7],[44,21,9],[56,10,8],[39,24,6],[70,21,5],[20,24,4]])for(let k=0;k<n;k++){const hx=x*TS+((r()*30)|0)-6;if(WR[y]){const g=WR[y].getContext('2d'),ly=17+((r()*8)|0);P(g,hx-1,ly-1,3,3,'rgba(200,205,195,.3)');P(g,hx,ly,2,2,'#111');}}
 for(const[x,y]of[[34,31],[44,23],[54,12],[22,12],[12,23]])for(let k=0;k<6;k++)P(wc,Math.round(x*TS+r()*14),Math.round(y*TS+r()*14),2,1,r()<.5?'#9a7a34':'#7a5e24');
 for(const[x,y]of[[12,23],[57,11]]){const g=wc.createRadialGradient(x*TS+8,y*TS+8,0,x*TS+8,y*TS+8,12);g.addColorStop(0,'rgba(10,8,6,.55)');g.addColorStop(1,'rgba(10,8,6,0)');wc.fillStyle=g;wc.fillRect(x*TS-4,y*TS-4,24,24);}}
function deathEnds(){return G.realCop||(isPat()&&!LD().swat);}
function onSquadDeath(u){const was=u.human;u.human=0;if(was===1)G.p1=null;if(was===2)G.p2=null;
 if(was&&deathEnds()&&!(G.p1&&G.p1.alive)&&!(G.p2&&G.p2.alive)){G.pDead=u;G.pDeadT=G.time;G.hurtF=1;G.shake=.4;endMission(false,'Zginąłeś na służbie.');return;}
 if(!G.squad.some(s=>s.alive)){endMission(false,'Cały oddział poległ.');return;}
 if(was)setTimeout(()=>{if(G.ended)return;const n=G.squad.find(s=>s.alive&&!s.human);if(n){n.human=was;n.task=null;n.action=null;n.path=null;if(was===1)G.p1=n;else G.p2=n;toast((was===2?'Gracz 2 przejmuje: ':'Przejmujesz: ')+n.name);for(const o of G.ops)o.mem=o.mem.filter(m=>m!==n);}},1300);}
function onHostageDeath(){radio('TOC','Zakładnik nie żyje... Operacja zakończona niepowodzeniem.',{prio:1});endMission(false,'Zakładnik nie żyje.');}
function endMission(win,reason){if(G.ended)return;if(A.sirG&&A.ctx)A.sirG.gain.setTargetAtTime(0,A.ctx.currentTime,1.5);G.lockIn=false;if(A.rdHum){A.rdHum.gain.value=0;A.rdIdle.gain.value=0;}logEv('KONIEC: '+reason);G.ended=true;G.win=win;G.reason=reason;
 if(win)radio(isPat()?(LD().winWho||'DISPATCH'):'TOC',isPat()?LD().win:'Zakładnik bezpieczny. Świetna robota, Alfa. Zabezpieczyć teren.',{prio:1});
 setTimeout(showDebrief,win?3200:G.pDead?4600:2800);}

// ================= INPUT =================
const K=G.keys;
addEventListener('keydown',e=>{if(['Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Slash','Quote','Period','Comma','Enter'].includes(e.code)&&G.running)e.preventDefault();
 if(e.repeat)return;K[e.code]=true;(G.press||(G.press={}))[e.code]=true;audioInit();
 if(!G.running)return;
 if(e.code==='Escape'){if(G.ctxOpen){closeCtx();return;}if(!G.ended&&$('scr-ctrl').classList.contains('hidden'))togglePause();return;}
 if(G.paused||G.ended)return;
 if(G.ctxOpen&&/^Digit[1-9]$/.test(e.code)){const it=G.ctxItems[+e.code.slice(5)-1];if(it&&!it.dis){closeCtx();it.f();}return;}
 if(e.code==='Tab')switchP1(1);
 if(/^Digit[1-5]$/.test(e.code))takeControl(G.squad[+e.code.slice(5)-1],1);
 if(e.code==='Quote'&&G.players===2)switchP1(2);
 if(e.code==='KeyF')orderFollow();
 if(e.code==='KeyH')orderHold();
 if(e.code==='KeyN')toggleNVG();
 if(e.code==='KeyC'&&G.p1&&G.p1.alive){if(G.p1.spec==='tech'){if(!G.camv){const a=G.p1.ang;G.p1.action={t:0,dur:.5,label:'Peryskop',pose:'kneel',done:()=>startMirror(G.p1,a)};}}else orderCorner();}
 if(e.code==='Space')goSignal();
 if(e.code==='KeyM')G.map=true;if(e.code==='KeyJ'&&G.running&&!G.paused)$('obj').classList.toggle('fold');if(e.code==='KeyX'&&G.running&&!G.paused&&G.p1&&G.p1.alive&&!G.ended)setHolster(!G.p1.holster);if(e.code==='KeyV'&&G.running&&!G.paused&&G.p1&&G.p1.alive&&!G.ended)swapWeapon(G.p1);if(e.code==='KeyL'&&G.running&&!G.paused&&!G.ended)toggleTorch();});
addEventListener('keyup',e=>{K[e.code]=false;if(e.code==='KeyM')G.map=false;});
addEventListener('blur',()=>{for(const k in K)K[k]=false;G.mouse.down=false;});
const wrap=$('wrap');
const TILT={th:14*Math.PI/180,k:1.14,p:1.8};
function tiltOn(){return G.running&&G.tilt!==false;}
function mpos(e){const r=wrap.getBoundingClientRect(),W=r.width,H=r.height;let x=e.clientX-r.left,y=e.clientY-r.top;
 if(tiltOn()){const P=TILT.p*H,c=Math.cos(TILT.th),s=Math.sin(TILT.th),sx=x-W/2,sy=y-H/2,cy=sy*P/(P*c+sy*s),sc=P/(P-cy*s),cx=sx/sc;x=cx/TILT.k+W/2;y=cy/TILT.k+H/2;}
 G.mouse.sx=x/W*VW;G.mouse.sy=y/H*VH;}
wrap.addEventListener('mousemove',mpos);
wrap.addEventListener('mousedown',e=>{mpos(e);audioInit();if(!G.running||G.paused)return;if(e.button===0){if(G.ctxOpen&&!e.target.closest('#ctx')){closeCtx();return;}if(e.target!==cv)return;G.mouse.down=true;G.mouse.clicked=true;}});
addEventListener('mouseup',e=>{if(e.button===0)G.mouse.down=false;});
wrap.addEventListener('contextmenu',e=>{e.preventDefault();if(!G.running||G.paused||G.ended)return;mpos(e);openCtx(e);});
function takeControl(n,who){if(!n||!n.alive||G.ended)return;if(n.human&&n.human!==who)return;const cur=who===1?G.p1:G.p2;if(cur===n)return;
 if(cur){cur.human=0;cur.task=null;cur.action=null;cur.path=null;cur.post=null;}n.human=who;n.task=null;n.action=null;n.path=null;n.post=null;if(who===1)G.p1=n;else G.p2=n;
 for(const o of G.ops)o.mem=o.mem.filter(m=>m!==n);clearPosts();toast((who===2?'Gracz 2: ':'Sterujesz: ')+n.name+' · '+n.role);SND.click();}
function switchP1(who=1){const L=G.squad.filter(s=>s.alive&&(!s.human||s.human===who));if(!L.length)return;const cur=who===1?G.p1:G.p2;takeControl(L[(L.indexOf(cur)+1)%L.length],who);}
$('roster').addEventListener('mousedown',e=>{const m=e.target.closest('.m');if(!m||!G.running||G.paused)return;e.stopPropagation();takeControl(G.squad[+m.dataset.i],1);});
function inputP1(){const u=G.p1;if(!u||!u.alive)return;const mx=(K.KeyD?1:0)-(K.KeyA?1:0),my=(K.KeyS?1:0)-(K.KeyW?1:0);
 u.in={mx,my,aim:Math.atan2(G.mouse.wy+4-u.y,G.mouse.wx-u.x),fire:G.mouse.down&&!G.ctxOpen,firePressed:G.mouse.clicked,quiet:K.ShiftLeft,use:K.KeyE,usePressed:G.press.KeyE,reload:G.press.KeyR,abil:G.press.KeyQ,report:G.press.KeyT,spray:G.press.KeyG};}
function inputP2(){const u=G.p2;if(!u||!u.alive)return;let mx=(K.ArrowRight?1:0)-(K.ArrowLeft?1:0),my=(K.ArrowDown?1:0)-(K.ArrowUp?1:0);
 let rep=G.press.Semicolon,aim=null,fireB=K.Enter||K.NumpadEnter,fireP=G.press.Enter||G.press.NumpadEnter,use=K.Slash,useP=G.press.Slash,quiet=K.ControlRight,reload=G.press.Comma,abil=G.press.Period,stick=false;
 let gps=[];try{gps=navigator.getGamepads?navigator.getGamepads():[];}catch(_){}let gp=null;for(const g of gps)if(g&&g.connected){gp=g;break;}
 if(gp){const ax=gp.axes,dz=v=>Math.abs(v||0)<.22?0:v;if(dz(ax[0])||dz(ax[1])){mx=dz(ax[0]);my=dz(ax[1]);}if(Math.hypot(ax[2]||0,ax[3]||0)>.4){aim=Math.atan2(ax[3],ax[2]);stick=true;}
  const b=i=>gp.buttons[i]&&gp.buttons[i].pressed,prev=G.gpPrev||[],pr=i=>b(i)&&!prev[i];
  if(b(7)){fireB=true;if(pr(7))fireP=true;}if(b(0)){use=true;if(pr(0))useP=true;}if(pr(2))abil=true;if(pr(3))reload=true;if(b(6))quiet=true;if(pr(5)&&G.players===2)switchP1(2);if(pr(1))rep=true;G.gpPrev=gp.buttons.map(x=>x.pressed);}
 if(aim==null)aim=(!K.ShiftRight&&(mx||my))?Math.atan2(my,mx):u.ang;
 let best=null,ba=stick?.25:.55;for(const e of G.enemies){if(!e.active()||!canSee(u,e.x,e.y))continue;const da=Math.abs(angDiff(aim,Math.atan2(e.y-u.y,e.x-u.x)));if(da<ba){ba=da;best=e;}}
 if(best)aim=Math.atan2(best.y-u.y,best.x-u.x);
 u.in={mx,my,aim,fire:fireB,firePressed:fireP,quiet,use,usePressed:useP,reload,abil,report:rep,spray:G.press.Backslash};}
function humanUpdate(u,dt){const inp=u.in||{};u.fireCd-=dt;if(u.shoutCd>0)u.shoutCd-=dt;
 if(u.rel>0){u.rel-=dt;if(u.rel<=0){const n=Math.min(u.W.mag-u.mag,u.res);u.mag+=n;u.res-=n;}}
 if(u.stun>0){u.stun-=dt;moveUnit(u,dt,(inp.mx||0)*.4,(inp.my||0)*.4,18);if(inp.aim!=null)turnTo(u,inp.aim,dt,2);return;}
 if(G.camv&&G.camv.u===u&&G.camv.robot){moveUnit(u,dt,0,0,0);u.pose='kneel';if(LD().robotIn)LD().robotIn(u,inp,dt);return;}
 if(G.camv&&G.camv.u===u&&G.camv.cctv){moveUnit(u,dt,0,0,0);u.pose='stand';if(inp.firePressed||inp.nextCam)startCCTV(u,G.camv.ci+1);else if(Math.hypot(inp.mx||0,inp.my||0)>.2||inp.abil||inp.usePressed)G.camv.stop=true;return;}
 if(G.camv&&G.camv.u===u){moveUnit(u,dt,0,0,0);u.pose='kneel';if(Math.hypot(inp.mx||0,inp.my||0)>.2||inp.abil||inp.usePressed||inp.firePressed)G.camv.stop=true;return;}
 if(u.action){const a=u.action;if(a.hold&&!inp.use){u.action=null;u.pose='stand';}else{a.t+=dt;u.pose=a.pose||'stand';if(a.tick)a.tick(dt);moveUnit(u,dt,0,0,0);if(inp.aim!=null)turnTo(u,inp.aim,dt,4);if(a.t>=a.dur){u.action=null;u.pose='stand';a.done&&a.done();}return;}}
 u.quiet=!!inp.quiet;let mx=inp.mx||0,my=inp.my||0;const l=Math.hypot(mx,my);if(l>1){mx/=l;my/=l;}
 moveUnit(u,dt,mx,my,u.quiet?24:46);u.pose='stand';
 if(l>.1)u.heading+=angDiff(u.heading,Math.atan2(my,mx))*Math.min(1,dt*6);
 if(inp.aim!=null)turnTo(u,inp.aim,dt,u.human===1?24:12);
 if(inp.fire&&u.rel<=0){if(u.W.auto)fire(u);else if(inp.firePressed)fire(u);}
 if(inp.reload)startReload(u);
 if(inp.usePressed){const it=interactInfo(u);if(it){if(it.dur<=0)doInteract(u,it);else u.action={t:0,dur:it.dur,label:it.label,hold:true,pose:it.k==='pick'?'kneel':'stand',tick:it.k==='pick'?(dt)=>{if(Math.random()<dt*6)SND.pick(u.x,u.y);}:null,done:()=>doInteract(u,it)};}}
 if(inp.abil)ability(u);
 if(inp.spray)spray(u);
 if(inp.report){const o=reportTarget(u);if(o)doReport(u,o);else toast('Nie ma czego zgłosić');}}

// ================= CONTEXT MENU =================
function goSignal(){const w=G.ops.filter(o=>o.wait&&!o.go);if(w.length){w.forEach(o=>o.go=true);radio(G.p1?G.p1.name:'ALFA',isPat()&&G.squad.filter(q=>q&&q.alive).length<=2?'Wchodzimy, teraz!':'Wszystkie zespoły: wejście, wejście, wejście!',{prio:1});logEv('Sygnał do wejścia ('+w.map(o=>teamName(o.team)).join(' + ')+')');}}
function shieldAI(){return aiMembers().find(u=>u.shield&&u.alive);}
function winNear(x,y){const tx=x/TS|0,ty=y/TS|0;let best=null,bd=99;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(tAt(tx+dx,ty+dy)===T.WIN){const d=Math.abs(dx)+Math.abs(dy);if(d<bd){bd=d;best={x:tx+dx,y:ty+dy};}}}return best;}
function orderShieldWindow(u,w){let spot=null,bd=1e9;for(const[dx,dy]of[[0,1],[0,-1],[1,0],[-1,0]]){const x=w.x+dx,y=w.y+dy;if(!walkable(x,y)||LV.fsolid[I(x,y)])continue;const d=dist(u.x,u.y,x*TS+8,y*TS+8);if(d<bd){bd=d;spot=[x,y];}}
 if(!spot){toast('Brak miejsca przy oknie');return;}dropOps([u]);for(const q of G.squad)if(q&&q.winGuard===w)q.winGuard=null;const a=Math.atan2(w.y-spot[1],w.x-spot[0]);u.winGuard={x:w.x,y:w.y,sx:spot[0],sy:spot[1]};setGoto(u,spot[0],spot[1],{then:'hold',holdFace:a,spd:40});radio(u.name,pick(['Tarcza na oknie.','Zasłaniam okno, idę.','Przyjąłem, okno.']));logEv(u.name+' zasłania okno tarczą');}
function openCtx(e){G.ctxEv=e;const T_=G.ctxTeam||'all',W_=!!G.ctxWait;const wx=G.mouse.sx+G.cam.rx,wy=G.mouse.sy+G.cam.ry;const d=doorNear(wx,wy+4,14);const items=[];
 const has=s=>!!aiAvail(s),hasF=()=>{const s=aiAvail('scout');return s&&s.flash>0;},hasB=()=>{const s=aiAvail('breach');return s&&s.charges>0;};
 let title;
 if(d&&!d.broken&&d.open<.5){title='Drzwi'+(d.knownLocked&&d.locked?' (zamknięte na klucz)':'');
  items.push({t:'Otwórz drzwi',f:()=>startOp('open',d,null,T_)});
  items.push({t:'Podejrzyj kamerą (Ofc. Mason)',dis:!has('tech'),f:()=>startOp('peek',d)});
  items.push({t:'Ustawcie się pod drzwiami — wejście na rozkaz',f:()=>startOp('clear',d,'open',T_,true)});
  items.push({t:'Otwórz i czyść'+(shieldAI()?' (tarcza pierwsza)':''),f:()=>startOp('clear',d,'open',T_,W_)});
  items.push({t:'Granat hukowy i czyść (Ofc. Grant)',dis:!hasF(),f:()=>startOp('clear',d,'flash',T_,W_)});
  {const sg=aiMembers(T_).find(u=>u.weap==='shotgun');items.push({t:'Rozstrzel zamek strzelbą i czyść'+(sg?' ('+sg.name.split(' ').map((w,i)=>i?w[0]+w.slice(1).toLowerCase():w[0]+w.slice(1).toLowerCase()).join(' ')+')':''),dis:!sg,f:()=>startOp('clear',d,'shot',T_,W_)});
   items.push({t:'Rozstrzel zamek + granat i czyść',dis:!(sg&&hasF()),f:()=>startOp('clear',d,'shotflash',T_,W_)});}
  items.push({t:'Wysadź i czyść (Cpl. Hayes)',dis:!hasB(),f:()=>startOp('clear',d,'breach',T_,W_)});
  items.push({t:'Wysadź + granat i czyść',dis:!(hasF()&&hasB()),f:()=>startOp('clear',d,'breachflash',T_,W_)});}
 else if(d&&(d.broken||d.open>=.5)){title='Przejście';
  items.push({t:'Ustawcie się przy przejściu — wejście na rozkaz',f:()=>startOp('clear',d,'open',T_,true)});
  items.push({t:'Czyść pomieszczenie'+(shieldAI()?' (tarcza pierwsza)':''),f:()=>startOp('clear',d,'open',T_,W_)});
  items.push({t:'Granat hukowy i czyść (Ofc. Grant)',dis:!hasF(),f:()=>startOp('clear',d,'flash',T_,W_)});
  if(!d.broken)items.push({t:'Zamknij drzwi',f:()=>{const m=nearestAI(d);if(m){setGoto(m,doorSides(d,m).nx,doorSides(d,m).ny);setTimeout(()=>{if(m.alive&&!m.human)toggleDoor(d,m);},1500);}}});}
 else title='Rozkaz dla oddziału';
 {let tg=null,bd=14;for(const o of G.units){if(!o.alive||o.team==='squad'||!o.visNow||o.pose==='sleep')continue;const ok=o.team==='enemy'?o.state==='surr':(o.kind!=='director'&&o.state!=='cuffed');if(!ok)continue;const dd=dist(wx,wy+4,o.x,o.y-4);if(dd<bd){bd=dd;tg=o;}}
  if(tg){title=tg.team==='enemy'?'Poddany napastnik':'Cywil';items.unshift({t:'Skuj (najbliższy operator)',dis:!aiMembers().length,f:()=>orderCuff(tg)});}
  let rt=null,rd=16;for(const o of G.units){if(!o.visNow||!reportable(o))continue;const dd=dist(wx,wy+4,o.x,o.y-3);if(dd<rd){rd=dd;rt=o;}}
  if(rt){if(!tg)title='Zgłoszenie';items.unshift({t:'Zgłoś do dowództwa: '+reportable(rt)[0],f:()=>{const l=leader();if(l)doReport(l,rt);}});}}
 {const w=winNear(wx,wy+4),sh=shieldAI();if(w&&sh){title=title==='Rozkaz dla oddziału'?'Okno':title;items.unshift({t:'Tarcza: zasłoń okno ('+sh.name+')',f:()=>orderShieldWindow(sh,w)});}}
 if(G.ops.some(o=>o.wait&&!o.go))items.unshift({t:'WEJŚCIE! (Spacja)',dis:!G.ops.some(o=>o.wait&&!o.go&&o.ready),f:goSignal});
 items.push({t:'Sprawdź róg peryskopem (Ofc. Mason)',dis:!aiAvail('tech'),f:()=>orderCorner(wx,wy+4)});
 items.push({t:'Idź tutaj',f:()=>orderMove(wx,wy+4,T_)});
 items.push({t:'Za mną',f:()=>orderFollow(T_)});
 items.push({t:'Trzymać pozycję',f:()=>orderHold(T_)});
 {let tr=null;for(const t of G.traps)if(!t.dead&&t.found&&dist(wx,wy+4,t.mx,t.my)<20)tr=t;if(tr){title='Pułapka';items.unshift({t:'Rozbrój pułapkę (Ofc. Mason)',dis:!aiAvail('tech'),f:()=>orderDisarm(tr)});}}
 const el=$('ctx');const chip=(v,l)=>'<span class="chip'+(T_===v?' on':'')+'" data-team="'+v+'">'+l+'</span>';el.innerHTML='<div class="t">'+title+' · '+aiMembers(T_).length+' pod rozkazami</div><div class="chips">'+chip('all','Cały')+chip('red','Czerwony')+chip('blue','Niebieski')+'<span class="chip'+(W_?' on':'')+'" data-wait="1">Na sygnał</span></div>'+items.map((it,i)=>'<div class="i'+(it.dis?' dis':'')+'" data-i="'+i+'"><k>'+(i+1)+'</k>'+it.t+'</div>').join('');
 G.ctxItems=items;G.ctxOpen=true;el.classList.remove('hidden');
 const wr=wrap.getBoundingClientRect();let x=e.clientX-wr.left,y=e.clientY-wr.top;el.style.left=x+'px';el.style.top=y+'px';
 const er=el.getBoundingClientRect();if(er.right>wr.right)el.style.left=(x-er.width)+'px';if(er.bottom>wr.bottom)el.style.top=(y-er.height)+'px';SND.click();}
function orderCuff(o){const m=nearestAI({x:o.x/TS,y:o.y/TS});if(!m)return;let best=null,bd=1e9;const ox=o.x/TS|0,oy=o.y/TS|0;
 for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){if(!walkable(ox+dx,oy+dy))continue;const dd=dist(m.x,m.y,(ox+dx)*TS+8,(oy+dy)*TS+8);if(dd<bd){bd=dd;best=[ox+dx,oy+dy];}}
 if(!best)best=[ox,oy];m.post=null;radio(m.name,pick(['Przyjąłem, skuwam.','Biorę go.']));
 setGoto(m,best[0],best[1],{onDone:()=>{if(!o.alive||dist(m.x,m.y,o.x,o.y)>26){m.task=null;return;}m.action={t:0,dur:.9,face:Math.atan2(o.y-m.y,o.x-m.x),pose:'kneel',done:()=>{doInteract(m,{k:o.team==='enemy'?'cuff':'cuffc',o});m.task=null;}};}});}
function nearestAI(d){let b=null,bd=1e9;for(const u of aiMembers()){const dd=dist(u.x,u.y,d.x*TS,d.y*TS);if(dd<bd){bd=dd;b=u;}}return b;}
$('ctx').addEventListener('mousedown',e=>{e.stopPropagation();const ch=e.target.closest('.chip');if(ch){if(ch.dataset.team)G.ctxTeam=ch.dataset.team;else G.ctxWait=!G.ctxWait;SND.click();openCtx(G.ctxEv);return;}const it=e.target.closest('.i');if(!it)return;const o=G.ctxItems[+it.dataset.i];closeCtx();if(o&&!o.dis){SND.click();o.f();}});
function closeCtx(){G.ctxOpen=false;$('ctx').classList.add('hidden');}

// ================= UPDATE =================
function update(dt){G.time+=dt;if(!G.ended)G.stats.time+=dt;
 G.mouse.wx=G.mouse.sx+(G.cam.rx||0);G.mouse.wy=G.mouse.sy+(G.cam.ry||0);
 if(!G.ended&&!G.lockIn){inputP1();inputP2();}else{if(G.p1)G.p1.in={};if(G.p2)G.p2.in={};}
 updateTrail();updateTactical(dt);const cnt=aiMembers().length;let ai=0;for(const u of G.squad){if(!u.alive)continue;if(u.human)humanUpdate(u,dt);else updateSquadAI(u,dt,ai++,cnt);}
 updateOp(dt);updateCam(dt);updateTraps();if(G.lvl==='hosp')negotiator(dt);else (LD().update||NOOP)(dt);
 for(const s of G.squad){if(!s.alive||!s.wounded||s.treated)continue;s.bleed-=dt;s.dripT-=dt;if(s.dripT<=0){s.dripT=s.moving?.5:1.6;P(wc,Math.round(s.x+rand(-2,2)),Math.round(s.y+rand(-1,2)),1,1,'#4a0d0d');}
  if(s.bleed<45&&!s.w45){s.w45=1;radio(s.name,'Tracę dużo krwi... potrzebuję medyka!',{prio:1});}if(s.bleed<15&&!s.w15){s.w15=1;radio(s.name,'Robi mi się ciemno przed oczami...',{prio:1});}
  if(s.bleed<=0){s.noWound=true;radio('TOC',s.name+' wykrwawił się. Cholera.',{prio:1});kill(s,null,0);}}
 for(const e of G.enemies)updateEnemy(e,dt);
 for(const c of G.civs)updateCiv(c,dt);
 updateDoors(dt);updateNades(dt);updateCams(dt);
 // hostage execution
 const B=G.enemies.find(e=>e.boss),H=G.hostage;
 if(H&&G.alarm&&H.alive&&H.state==='tied'&&B&&B.active()&&!G.ended){G.execT-=dt*(B.target?.4:1);
  if(G.execT<15&&!G.warned){G.warned=true;radio('TOC','Słyszymy krzyki z gabinetu dyrektora. Zostało mało czasu!',{prio:1});}
  if(G.execT<=0){B.ang=Math.atan2(H.y-B.y,H.x-B.x);SND.gun('epistol',B.x,B.y);G.tracers.push({x0:B.x,y0:B.y-8,x1:H.x,y1:H.y-8,t:0,e:1});kill(H,B,B.ang);}}
 separate();animUnits(dt);
 for(const s of G.squad)if(s.alive){visionPoly(s);mc.fillStyle='#fff';mc.beginPath();polyPath(mc,s.vis,0,0);mc.fill();}else s.vis=null;
 for(const u of G.units){if(u.team==='squad')continue;u.visNow=(u.camSeen===G.time)||seenBySquad(u);if(u.visNow)u.everSeen=true;u.visMine=u.camSeen===G.time||(u.visNow&&seenByHuman(u));if(u.visMine&&u.alive){u.seenX=u.x;u.seenY=u.y;u.seenT=G.time;}
  if(u.alive&&!u.visMine&&G.p1&&G.p1.alive&&Math.hypot(u.vx||0,u.vy||0)>14&&Math.hypot(u.x-G.p1.x,u.y-G.p1.y)<TS*9){u.stepT=(u.stepT||0)-dt;if(u.stepT<=0){u.stepT=.6;(G.pings||(G.pings=[])).push({x:u.x,y:u.y+4,t:0});}}}
 if(G.pings){for(const p of G.pings)p.t+=dt;G.pings=G.pings.filter(p=>p.t<(p.big?1.1:.75));}
 for(const u of G.units)if(u.kind==='corpse'&&u.visNow&&!u.reported){u.reported=1;if(G.time-(G.corpseT||-99)>6){G.corpseT=G.time;const s=G.squad.find(q=>q.alive&&canSee(q,u.x,u.y));radio(s?s.name:'ALFA',pick(['Mamy ciało. Cywil, nie żyje.','Kolejna ofiara... Dowództwo, potwierdzam zgon.','Ciało na ziemi. Ochroniarz, chyba nie żyje od godziny.','Boże... Następny.']));}}
 if(H&&!G.obj.found&&H.visNow){G.obj.found=true;const s=G.squad.find(q=>q.alive&&canSee(q,H.x,H.y));radio(s?s.name:'ALFA','Widzę zakładnika!',{prio:1});}

 // effects
 for(const u of G.units){if(!u.alive||!u.heat)continue;u.heat=Math.max(0,u.heat-dt*.6);if(u.heat>.5&&u.mzx!=null&&Math.random()<dt*7*Math.min(1,u.heat/2))G.fx.push({k:'smoke',x:u.mzx,y:u.mzy,vx:rand(-3,3),vy:rand(-14,-8),r:.8,gr:rand(3,5),a:.22,t:0,life:rand(.9,1.5),c:'#a4a6a4'});}
 if(G.fx.length>900)G.fx.splice(0,G.fx.length-900);
 for(const f of G.fx){f.t+=dt;if(f.vx!=null){f.x+=f.vx*dt;f.y+=f.vy*dt;}if(f.k==='smoke'){f.vx*=Math.pow(.3,dt);f.vy*=Math.pow(.5,dt);f.r+=f.gr*dt;}
  if(f.k==='shell'||f.k==='debris'){f.vz=(f.vz||0)-260*dt;f.z+=f.vz*dt;if(f.z<0){f.z=0;f.vz=-f.vz*.3;f.vx*=.5;f.vy*=.5;}f.vx*=Math.pow(.2,dt);f.vy*=Math.pow(.2,dt);}
  if(f.k==='spark'||f.k==='dust'){f.vx*=Math.pow(.05,dt);f.vy*=Math.pow(.05,dt);}
  if(f.t>=f.life&&(f.k==='shell'||f.k==='debris')){if(f.k==='shell')P(wc,Math.round(f.x),Math.round(f.y),2,1,f.red?'#8a2a20':'#9a7a34');else P(wc,Math.round(f.x),Math.round(f.y)+6,1,1,f.c);}}
 G.fx=G.fx.filter(f=>f.t<f.life);
 for(const t of G.tracers)t.t+=dt;G.tracers=G.tracers.filter(t=>t.t<.07);
 for(const l of G.lights)l.t-=dt;G.lights=G.lights.filter(l=>l.t>0);
 G.flashW=Math.max(0,G.flashW-dt*.35);G.shake=Math.max(0,G.shake-dt);
 for(const l of LV.lamps){if(l.fl===2){l.k=0;continue;}if(!l.fl){l.k=1;continue;}l.t-=dt;if(l.t<=0){l.on=l.on?(Math.random()<.5?0:1):1;l.t=l.on?rand(.05,2.2):rand(.03,.2);}l.k=l.on?1:0;}
 // ambience events
 G.lightT-=dt;if(G.lightT<=0){G.lightT=rand(14,35);if(W8()==='rain'){G.lightF=1;SND.thunder();}}G.lightF=Math.max(0,G.lightF-dt*3);
 G.sirenT=(G.sirenT||30)-dt;if(G.sirenT<=0&&G.lvl==='hosp'){G.sirenT=rand(40,80);siren(isOutdoor(A.lx,A.ly)?.05:.02,rand(8,12));}
 G.clankT-=dt;if(G.clankT<=0&&G.lvl==='hosp'){G.clankT=rand(12,30);const p=leader();if(p)SND.clank(p.x+rand(-300,300),p.y+rand(-200,200));}
 const L=leader();const tension=G.alarm?1:G.enemies.some(e=>e.alive&&e.visNow&&e.active())?.7:0;
 if(tension>.5){G.heartT-=dt;if(G.heartT<=0){G.heartT=G.alarm?.72:.95;SND.heart();}}
 if(L){A.lx=L.x;A.ly=L.y;let hum=0;for(const l of LV.lamps)if(l.fl&&l.on){const d=dist(l.x,l.y,L.x,L.y);if(d<TS*5)hum=Math.max(hum,1-d/(TS*5));}const od=isOutdoor(L.x,L.y);ambient(od,hum,Math.max(tension,G.deadline<180?.8:0,L.wounded&&!L.treated?.8:0),false,G.lvl!=='hosp'?0:od?(L.y>40*TS?.16:.09):.025);}
 if(isPat())(LD().stress||NOOP)(dt,L);else stressEvents(dt,L);ambientLife(dt,L);
 updateCamera(dt);
 // win check
 if(H&&!G.ended&&H.alive&&H.state==='follow'&&isOutdoor(H.x,H.y))endMission(true,'Zakładnik uratowany.');
 G.mouse.clicked=false;for(const k in G.press)delete G.press[k];
 G.hudT-=dt;if(G.hudT<=0){G.hudT=.1;updateHUD();}}
function ambientLife(dt,L){if(!L)return;
 if(!G.devs)G.devs=LV.furn.filter(f=>f.k==='ekg'||f.k==='vent'||f.k==='incub').map(f=>({x:f.x*TS+8,y:f.y*TS+8,k:f.k,t:rand(0,2),ph:rand(0,1)}));
 for(const d of G.devs){d.t-=dt;if(d.t>0)continue;if(dist(d.x,d.y,L.x,L.y)>TS*12){d.t=1;continue;}
  if(d.k==='ekg'){d.t=rand(.78,.92);SND.ecg(d.x,d.y,.07,1000);}else if(d.k==='vent'){d.t=4;SND.vent(d.x,d.y);}else{d.t=rand(3,6);SND.ecg(d.x,d.y,.035,2200);}}
 G.babyT-=dt;if(G.babyT<=0){G.babyT=rand(5,12);const ms=LV.furn.filter(f=>f.k==='crib'||f.k==='incub'),f=pick(ms);if(f&&dist(f.x*TS,f.y*TS,L.x,L.y)<TS*28)SND.baby(f.x*TS+8,f.y*TS+8);}}
function stressEvents(dt,L){if(!L||G.ended)return;
 // negotiation deadline
 G.deadline-=dt;const H=G.hostage,B=G.enemies.find(e=>e.boss);
 for(const[t,msg]of[[600,'Negocjator: porywacz przestał odbierać telefon. Zostało dziesięć minut.'],[300,'Pięć minut do ultimatum. Pospieszcie się, Alfa.'],[120,'Dwie minuty! Porywacz krzyczy, że zacznie strzelać!'],[30,'Trzydzieści sekund!']])
  if(G.deadline<=t&&!G.dl[t]){G.dl[t]=1;radio('TOC',msg,{prio:1});}
 if(G.deadline<=0&&!G.dl.end){G.dl.end=1;if(H.alive&&H.state==='tied'&&B&&B.active()){G.alarm=true;G.execT=Math.min(G.execT,6);radio('TOC','Ultimatum minęło!',{prio:1});}}
 // blackouts
 G.blackT-=dt;if(G.blackT<=0){G.blackT=rand(45,95);G.blackDur=rand(1.2,2.6);blackoutSfx();}
 if(G.blackDur>0){G.blackDur-=dt;for(const l of LV.lamps)l.k=0;}
 // distant unsettling sounds
 G.scareT-=dt;if(G.scareT<=0){G.scareT=rand(16,38);let x,y,n=0;do{x=rand(3,76)*TS;y=rand(3,43)*TS;n++;}while((dist(x,y,L.x,L.y)<TS*8||isOutdoor(x,y))&&n<20);SND.scare(x,y);}
 G.farT=(G.farT==null?rand(30,60):G.farT)-dt;if(G.farT<=0){G.farT=rand(40,90);let x,y,n=0;do{x=rand(3,76)*TS;y=rand(3,43)*TS;n++;}while((dist(x,y,L.x,L.y)<TS*14||isOutdoor(x,y))&&n<30);
  if(Math.random()<.5)SND.scream(x,y);else{const k=randi(1,3);for(let i=0;i<k;i++)setTimeout(()=>SND.gun(Math.random()<.5?'enemy':'epistol',x,y),i*rand(120,400));if(Math.random()<.5)setTimeout(()=>SND.scream(x+rand(-40,40),y),rand(600,1400));}}
 // wounded breathing
 for(const s of G.squad){if(!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=s.treated?3.2:2;if(s.human)SND.breath(s.x,s.y,s.treated?.18:.35);}}}
function separate(){const L=G.units;for(let i=0;i<L.length;i++){const a=L[i];if(!a.alive||a.pose==='sleep'||a.pose==='inbed')continue;
 for(let j=i+1;j<L.length;j++){const b=L[j];if(!b.alive||b.pose==='sleep'||b.pose==='inbed')continue;const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy,m=a.r+b.r-1;
  if(d2>.01&&d2<m*m){const d=Math.sqrt(d2),p=(m-d)/2,nx=dx/d,ny=dy/d,wa=a.human?.35:1,wb=b.human?.35:1;
   if(!collides(a.x-nx*p*wa,a.y-ny*p*wa,a.r)){a.x-=nx*p*wa;a.y-=ny*p*wa;}if(!collides(b.x+nx*p*wb,b.y+ny*p*wb,b.r)){b.x+=nx*p*wb;b.y+=ny*p*wb;}}}}}
function animUnits(dt){for(const u of G.units){
 if(!u.alive){u.deathT+=dt;if(u.deathT>.45&&!u.pooled&&u.kind!=='corpse'){u.pooled=1;bloodPool(u.x,u.y+1,5);}if(u.deathT<.4){const ox=u.x,oy=u.y;u.x+=u.vx*dt;u.y+=u.vy*dt;u.vx*=.85;u.vy*=.85;if(collides(u.x,u.y,3)){u.x=ox;u.y=oy;}}continue;}
 u.recoil=Math.max(0,u.recoil-dt*12);const sp=Math.hypot(u.vx,u.vy);u.moving=sp>6;
 if(u.moving){u.mdx=u.vx/sp;u.mdy=u.vy/sp;u.walkP+=sp*dt*.33;u.stride+=sp*dt;
  if(u.stride>13){u.stride=0;const surf=LV.fs[I(u.x/TS|0,u.y/TS|0)];let v=u.team==='squad'?(u.human?.5:.26):u.team==='enemy'?.55:.22;if(u.quiet)v*=.35;SND.step(u.x,u.y,surf,v);
   if(u.team==='squad'&&!u.quiet)makeNoise(u.x,u.y,sp>40?2.6:1.6,'step',u);}}
 else u.walkP=0;if(u.icoT>0)u.icoT-=dt;}}
function updateCamera(dt){const hs=[G.p1,G.p2].filter(u=>u&&u.alive);let tx,ty;
 if(hs.length===2){tx=(hs[0].x+hs[1].x)/2;ty=(hs[0].y+hs[1].y)/2;}
 else if(hs.length===1&&G.camv&&G.camv.cctv&&G.camv.u===hs[0]){const cv=G.camv;tx=cv.x+Math.cos(cv.ang)*TS*4;ty=cv.y+Math.sin(cv.ang)*TS*4;}
 else if(hs.length===1){const u=hs[0];tx=u.x;ty=u.y;if(u===G.p1){tx+=clamp((G.mouse.wx-u.x)*.25,-52,52);ty+=clamp((G.mouse.wy-u.y)*.25,-32,32);}}
 else if(G.pDead){tx=G.pDead.x;ty=G.pDead.y;}else{const L=leader();if(!L)return;tx=L.x;ty=L.y;}
 const k=1-Math.exp(-6*dt);G.cam.x+=(tx-G.cam.x)*k;G.cam.y+=(ty-G.cam.y)*k;
 G.cam.x=clamp(G.cam.x,VW/2,MW*TS-VW/2);G.cam.y=clamp(G.cam.y,VH/2,MH*TS-VH/2);
 if(hs.length===2)for(const u of hs){const nx=clamp(u.x,G.cam.x-VW/2+14,G.cam.x+VW/2-14),ny=clamp(u.y,G.cam.y-VH/2+22,G.cam.y+VH/2-8);if(!collides(nx,ny,u.r)){u.x=nx;u.y=ny;}}}

// ================= RENDER =================
const fogC=document.createElement('canvas');fogC.width=VW;fogC.height=VH;const fg=fogC.getContext('2d');
const vigC=document.createElement('canvas');vigC.width=VW;vigC.height=VH;{const g=vigC.getContext('2d'),gr=g.createRadialGradient(VW/2,VH/2,VH*.35,VW/2,VH/2,VW*.62);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.6)');g.fillStyle=gr;g.fillRect(0,0,VW,VH);}
const GRAIN=[];for(let k=0;k<4;k++){const c=document.createElement('canvas');c.width=VW;c.height=VH;const g=c.getContext('2d'),id=g.createImageData(VW,VH);
 for(let i=0;i<id.data.length;i+=4){if(Math.random()<.05){const v=Math.random()<.5?0:255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=Math.random()*10;}}g.putImageData(id,0,0);GRAIN.push(c);}
const RAIN=[];for(let i=0;i<170;i++)RAIN.push({x:Math.random()*VW,y:Math.random()*VH,s:rand(230,330),l:randi(3,6)});
function hexA(h,a){const n=parseInt(h.slice(1),16);return'rgba('+(n>>16)+','+(n>>8&255)+','+(n&255)+','+a+')';}
function polyPath(g,p,cx,cy){g.moveTo(p[0]-cx,p[1]-cy);for(let i=2;i<p.length;i+=2)g.lineTo(p[i]-cx,p[i+1]-cy);g.closePath();}
function drawDoor(g,d,cx,cy){const x=d.x*TS-cx,y=d.y*TS-cy;if(x<-16||y<-30||x>VW||y>VH+16)return;const f=d.open;
 const wood=d.glass?'#5a6670':'#6a4a32',wd=d.glass?'#45525c':'#523826';
 if(!d.vert){P(g,x,y-12,16,4,'#25282c');P(g,x,y-12,16,1,'#3c4148');P(g,x,y-8,16,3,'#4d564e');P(g,x,y-5,1,21,'#1a1c1f');P(g,x+15,y-5,1,21,'#1a1c1f');
  if(d.broken){P(g,x+1,y+12,3,2,'#5b3d27');P(g,x+11,y+10,4,2,'#4a301f');P(g,x+6,y+14,2,1,'#5b3d27');P(g,x+1,y-5,2,4,'#4a301f');}
  else{const w=Math.round(14*(1-f));if(w>0){P(g,x+1,y-5,w,21,wood);P(g,x+1,y-5,w,1,shade(wood,22));P(g,x+1,y+15,w,1,shade(wood,-25));if(d.glass&&w>4)P(g,x+2,y-3,w-2,12,'#22313c');else if(w>9){P(g,x+4,y-2,6,5,'#1d2a36');P(g,x+5,y-1,2,1,'#3a5468');}P(g,x+Math.max(1,w-2),y+6,1,2,'#c9b458');}
   if(f>.05){const ww=Math.round(5*f);P(g,x+1,y-5,2,21,wd);if(ww)P(g,x+3,y-3,ww,19,shade(wd,-15));}}}
 else{P(g,x+4,y-12,8,2,'#25282c');P(g,x+4,y+2,8,2,'#25282c');
  if(d.broken){P(g,x+6,y-9,2,3,'#5b3d27');P(g,x+8,y-2,2,3,'#4a301f');}
  else{const h=Math.round(12*(1-f));if(h>0){P(g,x+6,y-10,4,h,wood);P(g,x+6,y-10,4,1,shade(wood,22));P(g,x+6,y-10,1,h,shade(wood,12));if(d.glass)P(g,x+7,y-8,2,Math.max(0,h-4),'#22313c');}
   if(f>.05)P(g,x+8,y-11,Math.round(14*f),3,wd);}}
 if(d.barr&&!d.broken&&d.open<.3){if(d.vert){P(g,x+3,y-8,10,2,'#5a3d29');P(g,x+3,y-2,10,2,'#4a301f');}else{line(g,x+1,y,x+14,y+8,'#5a3d29');line(g,x+1,y+8,x+14,y,'#4a301f');}}
 if(d.charge&&((G.time*(d.charge.t<1?8:3))|0)%2){P(g,x+7,y+2,2,2,'#ff2a1a');}}
let _wf=null;function worldFull(){if(_wf)return _wf;_wf=document.createElement('canvas');_wf.width=world.width;_wf.height=world.height;const g=_wf.getContext('2d');g.drawImage(world,0,0);for(let r=0;r<MH;r++){if(WR[r])g.drawImage(WR[r],0,r*TS-WH);if(FR[r])g.drawImage(FR[r],0,r*TS+TS-FRH);}return _wf;}
function drawCam(g,c,cx,cy){const x=Math.round(c.x-cx),y=Math.round(c.y-cy)-10;if(x<-20||y<-20||x>VW+20||y>VH+20)return;
 P(g,x-2,y-2,5,4,'#2c2f33');P(g,x-1+Math.round(Math.cos(c.a)*2),y-1+Math.round(Math.sin(c.a)),3,2,'#3c4045');if(c.on&&((G.time*2)|0)%2)P(g,x,y-2,1,1,G.camv&&G.camv.cam===c?'#ff3020':'#30c050');}
let _ent=null;function entCv(){if(!_ent){_ent=document.createElement('canvas');_ent.width=VW;_ent.height=VH;}return _ent.getContext('2d');}
function rowLayer(c,r,cx,cy){if(WR[r])c.drawImage(WR[r],cx,0,VW,TS+WH,0,r*TS-WH-cy,VW,TS+WH);if(FR[r])c.drawImage(FR[r],cx,0,VW,FRH,0,r*TS+TS-FRH-cy,VW,FRH);const dr=LV.doorRows&&LV.doorRows[r];if(dr)for(const d of dr)drawDoor(c,d,cx,cy);}
function spkUnit(who){const n=String(who||'').toUpperCase().replace(/\s*\(.*$/,'').trim();if(!n)return null;let best=null;
 for(const u of G.units){if(!u.alive||!u.name)continue;const un=u.name.toUpperCase();if(un===n)return u;if(!best&&(un.startsWith(n+' ')||n.startsWith(un+' ')||un.split(' ').pop()===n.split(' ').pop()&&n.length>4))best=u;}return best;}
function drawSpeech(c,cx,cy){const s=R.cur;if(!s||!G.running)return;if(s.u===undefined||s.uw!==s.who){s.uw=s.who;s.u=spkUnit(s.who);}const u=s.u;if(!u||!u.alive)return;
 const col=s.cls==='sp-o'?'#7fb0ff':s.cls==='sp-d'?'#5fd08a':'#e8c46a',vis=u.team==='squad'||u.visNow,al=vis?1:.45,t=G.time-s.t0;
 const hx=u.x-cx,hy=u.y-cy-(u.pose==='sit'||u.pose==='kneel'?17:22);const pad=10;
 if(hx<pad||hy<pad||hx>VW-pad||hy>VH-pad){const ax=clamp(hx,pad,VW-pad),ay=clamp(hy,pad,VH-pad),a=Math.atan2(hy-ay,hx-ax);c.save();c.globalAlpha=.85;c.translate(ax,ay);c.rotate(a);c.fillStyle=col;c.beginPath();c.moveTo(5,0);c.lineTo(-3,-4);c.lineTo(-3,4);c.closePath();c.fill();c.restore();
  c.globalAlpha=.85;for(let i=0;i<3;i++){const on=((t*4|0)%3)===i;P(c,(ax-6+i*3-Math.cos(a)*9)|0,(ay-Math.sin(a)*9)|0,2,2,on?'#fff':col);}c.globalAlpha=1;return;}
 const bob=Math.round(Math.sin(t*6)*.5),x=Math.round(hx)-4,y=Math.round(hy)-5+bob,bg='rgba(6,8,12,.82)';c.globalAlpha=al*Math.min(1,t*6);
 P(c,x,y,9,5,bg);P(c,x+1,y-1,7,1,col);P(c,x+1,y+5,2,1,col);P(c,x+6,y+5,2,1,col);P(c,x,y,1,5,col);P(c,x+8,y,1,5,col);P(c,x+3,y+5,3,1,bg);P(c,x+3,y+6,1,1,col);P(c,x+5,y+6,1,1,col);P(c,x+4,y+7,1,1,col);P(c,x+4,y+6,1,1,bg);
 for(let i=0;i<3;i++){const ph=(t*5-i*.6),hh=((ph|0)%3===0)?1:0;P(c,x+2+i*2,y+2-hh,1,1,hh?'#ffffff':col);}c.globalAlpha=1;}
function render(){const c=ctx;c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;
 let cx=Math.round(G.cam.x-VW/2),cy=Math.round(G.cam.y-VH/2);if(G.shake>0){cx+=randi(-2,2);cy+=randi(-2,2);}
 cx=clamp(cx,0,MW*TS-VW);cy=clamp(cy,0,MH*TS-VH);G.cam.rx=cx;G.cam.ry=cy;
 c.drawImage(world,cx,cy,VW,VH,0,0,VW,VH);
 {if(!LV.doorRows){LV.doorRows=[];for(const d of LV.doors)(LV.doorRows[d.y]=LV.doorRows[d.y]||[]).push(d);}
  const r0=Math.max(0,Math.floor(cy/TS)-1),r1=Math.min(MH-1,Math.ceil((cy+VH+48)/TS));
  for(let r=r0;r<=r1;r++)rowLayer(c,r,cx,cy);}
 for(const cm of LV.cams)drawCam(c,cm,cx,cy);
 if(LD().render)LD().render(c,cx,cy);
 c.globalCompositeOperation='lighter';
 for(const l of LV.lamps){if(!l.k)continue;const x=l.x-cx,y=l.y-cy;if(x<-l.r||y<-l.r||x>VW+l.r||y>VH+l.r)continue;const g=c.createRadialGradient(x,y,0,x,y,l.r);g.addColorStop(0,hexA(l.col,.13));g.addColorStop(1,hexA(l.col,0));c.fillStyle=g;c.fillRect(x-l.r,y-l.r,l.r*2,l.r*2);}
 if(!G.nvg&&!G.torchOff)for(const s of G.squad){if(!s.alive||!s.vis||dayLit(s))continue;const R=effRange(s)*TS,g=c.createRadialGradient(s.x-cx,s.y-cy,0,s.x-cx,s.y-cy,R);g.addColorStop(0,'rgba(255,238,200,.11)');g.addColorStop(1,'rgba(255,238,200,0)');c.fillStyle=g;c.beginPath();polyPath(c,s.vis,cx,cy);c.fill();}
 policeLights(c,cx,cy);
 c.globalCompositeOperation='source-over';
 // monitors glow in security room
 if(G.lvl==='hosp'&&((G.time*8)|0)%3)P(c,48*TS+2-cx,25*TS-14-cy,46,10,'rgba(90,200,140,'+(G.camv&&G.camv.cctv?.22:.1)+')');
 if(G.devs)for(const d of G.devs){const x=Math.round(d.x-cx),y=Math.round(d.y-cy);if(x<-20||y<-30||x>VW+20||y>VH+20)continue;
  if(d.k==='ekg'){const ph=(G.time*1.15+d.ph)%1;for(let i=0;i<10;i++){const v=Math.abs(i/10-ph)<.06?-3:Math.abs(i/10-ph-.05)<.04?2:0;P(c,x-5+i,y-11+v,1,1,'#4f4');}P(c,x+3,y-13,1,1,'#f44');}
  else if(d.k==='vent'){const b=Math.round((Math.sin(G.time*1.57+d.ph*6)+1)*1.5);P(c,x-4,y-13,8,1,'#3cf');P(c,x-4,y-11,Math.round(3+b*1.5),1,'#4f4');P(c,x-3,y-4+b,6,1,'#5a6a76');}
  else{P(c,x+4,y,1,1,((G.time*2)|0)%2?'#3f3':'#131');}}
 drawTraps(c,cx,cy);
 drawFog(cx,cy);
 // entities
 const list=G.units.filter(u=>u.team==='squad'||(u.alive?u.visNow:(u.everSeen||u.visNow)));list.sort((a,b)=>a.y-b.y);
 const mc0=c;{const ec=entCv();ec.clearRect(0,0,VW,VH);}let er=Math.max(0,Math.floor(cy/TS)-1);const eg=entCv();
 for(const u of list){const c=eg;const sx=u.x-cx,sy=u.y-cy;if(sx<-20||sy<-30||sx>VW+20||sy>VH+20)continue;const ur=u.y/TS|0;
  while(er<=ur){eg.globalCompositeOperation='destination-out';rowLayer(eg,er,cx,cy);eg.globalCompositeOperation='source-over';er++;}
  const dim=isPat()&&u.team!=='squad'&&u.alive&&!u.visMine;if(dim)c.globalAlpha=.42;drawHuman(c,u,sx,sy);if(dim)c.globalAlpha=1;
  if(u.team==='squad'&&u.alive){const col=u.human===1?'#efe8c8':u.human===2?'#5fc7d6':u.acc;P(c,Math.round(sx)-1,Math.round(sy)+2,3,1,col);if(!u.human)P(c,Math.round(sx)-1,Math.round(sy)+3,3,1,TEAMOF[u.spec]==='red'?'#d04030':'#3a6ae0');if(u.human)P(c,Math.round(sx),Math.round(sy)-22,1,2,col);}
  if(u.alive&&u.team==='enemy'&&u.icoT>0&&u.ico)drawIcon(c,u.ico,Math.round(sx),Math.round(sy)-24,u.ico==='!'?'#ff3b30':'#e8c24a');
  if(G.camv&&u.team!=='squad'&&u.alive&&u.camSeen===G.time&&!seenBySquad(u)){c.strokeStyle='rgba(90,255,140,.7)';c.strokeRect(Math.round(sx)-6.5,Math.round(sy)-18.5,13,20);}}
 {const r1=Math.min(MH-1,Math.ceil((cy+VH+64)/TS));eg.globalCompositeOperation='destination-out';while(er<=r1){rowLayer(eg,er,cx,cy);er++;}eg.globalCompositeOperation='source-over';c.drawImage(_ent,0,0);}
 for(const n of G.nades){P(c,Math.round(n.x-cx)-1,Math.round(n.y-cy-n.z)-3,3,3,'#2d3a2a');P(c,Math.round(n.x-cx),Math.round(n.y-cy-n.z)-3,1,1,'#9a9');}
 // fx
 for(const t of G.tracers){c.strokeStyle=t.e?'rgba(255,170,90,'+(1-t.t/.07)*.75+')':'rgba(255,240,170,'+(1-t.t/.07)*.75+')';c.lineWidth=1;c.beginPath();c.moveTo(t.x0-cx+.5,t.y0-cy+.5);c.lineTo(t.x1-cx+.5,t.y1-cy+.5);c.stroke();}
 for(const f of G.fx){const x=Math.round(f.x-cx),y=Math.round(f.y-cy-(f.z||0));
  if(f.k==='mflash'){const ca=Math.cos(f.a),sa=Math.sin(f.a)*.75;P(c,x-1,y-1,3,3,'#fff6c8');P(c,x+Math.round(ca*3),y+Math.round(sa*3),2,2,'#ffd060');P(c,x+Math.round(ca*5),y+Math.round(sa*5),1,1,'#ff9a30');if(f.big){P(c,x-2,y-2,5,5,'rgba(255,220,120,.6)');}}
  else if(f.k==='spark')P(c,x,y,1,1,'#ffd27a');
  else if(f.k==='dust'){c.globalAlpha=1-f.t/f.life;P(c,x,y,2,2,f.c);c.globalAlpha=1;}
  else if(f.k==='shell'){P(c,x,y,2,1,f.red?'#b8382a':'#d4ac52');P(c,x,y,1,1,'#f6e2a0');}
  else if(f.k==='smoke'){c.globalAlpha=f.a*(1-f.t/f.life);c.fillStyle=f.c;c.beginPath();c.arc(x,y,f.r,0,7);c.fill();c.globalAlpha=1;}
  else if(f.k==='debris')P(c,x,y,2,1,f.c);
  else if(f.k==='bang'){c.globalAlpha=1-f.t/f.life;c.fillStyle='#fff';c.beginPath();c.arc(x,y,6+f.t*120,0,7);c.fill();c.globalAlpha=1;}}
 // ostatnio widziane pozycje i dźwięki spoza pola widzenia
 if(isPat())for(const u of G.units){if(u.team==='squad'||!u.alive||u.visNow||!u.seenT)continue;const t=G.time-u.seenT;if(t>3.5)continue;const sx=u.seenX-cx,sy=u.seenY-cy;if(sx<-20||sy<-30||sx>VW+20||sy>VH+20)continue;c.globalAlpha=.3*(1-t/3.5);const ox=u.x,oy=u.y;u.x=u.seenX;u.y=u.seenY;drawHuman(c,u,sx,sy);u.x=ox;u.y=oy;c.globalAlpha=1;}
 if(G.pings)for(const p of G.pings){const L=p.big?1.1:.75,k=1-p.t/L,r=(p.big?3:2)+p.t*(p.big?16:9);c.strokeStyle='rgba(230,226,210,'+(.5*k)+')';c.lineWidth=1;c.beginPath();c.ellipse(p.x-cx,p.y-cy,r,r*.55,0,0,6.283);c.stroke();}
 if(LD().over)LD().over(c,cx,cy,1/60);
 drawSpeech(c,cx,cy);
 // police lights
 for(const f of LV.furn){if(f.k!=='police'&&f.k!=='ambul')continue;const px=(f.x+f.w/2)*TS-cx,py=(f.y+.6)*TS-cy;if(px<-100||py<-100||px>VW+100||py>VH+100)continue;const on=((G.time*3+f.x)|0)%2;c.globalCompositeOperation='lighter';const g=c.createRadialGradient(px,py,0,px,py,90);g.addColorStop(0,f.k==='ambul'?(on?'rgba(255,40,40,.2)':'rgba(0,0,0,0)'):(on?'rgba(255,40,40,.22)':'rgba(40,80,255,.24)'));g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(px-90,py-90,180,180);c.globalCompositeOperation='source-over';P(c,px-2,py-3,2,2,on?'#ff4040':'#401010');P(c,px,py-3,2,2,on?'#102040':'#4060ff');}
 if(W8()==='morning')drawLeaves(cx,cy);else if(W8()==='rain')drawRain(cx,cy,false);else if(isPat())drawWeather(c,cx,cy);
 // cursor & laser
 {const u=G.p1;if(u&&u.alive&&!G.ended&&u.holster){const x=Math.round(G.mouse.sx),y=Math.round(G.mouse.sy);c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=2;c.beginPath();c.arc(x+.5,y+.5,3,0,6.283);c.stroke();c.strokeStyle='rgba(232,228,212,.75)';c.lineWidth=1;c.beginPath();c.arc(x+.5,y+.5,3,0,6.283);c.stroke();}}
 const u=G.p1;if(u&&u.alive&&!G.ended&&!u.holster){const a=u.ang,d=castRay(u.x,u.y-2,a,TS*14,0,bulletBlock),mx=(u.mzx||u.x)-cx,my=(u.mzy||u.y-8)-cy;
  c.fillStyle='rgba(255,40,30,.45)';for(let t=6;t<d;t+=3)c.fillRect(Math.round(mx+Math.cos(a)*t),Math.round(my+Math.sin(a)*t),1,1);
  const x=Math.round(G.mouse.sx),y=Math.round(G.mouse.sy),gap=2+Math.round(Math.hypot(u.vx,u.vy)/14);
  for(const[ox,oy,w,h]of[[-gap-3,0,3,1],[gap+1,0,3,1],[0,-gap-3,1,3],[0,gap+1,1,3]]){P(c,x+ox-1,y+oy-1,w+2,h+2,'rgba(0,0,0,.6)');P(c,x+ox,y+oy,w,h,'#e8e4d4');}
  if(u.rel>0){P(c,x-6,y+7,12,2,'#222');P(c,x-6,y+7,Math.round(12*(1-u.rel/u.W.rl)),2,'#e8e4d4');}}
 // heli searchlight
 if(G.lvl==='hosp'){const sx=36*TS+Math.sin(G.time*.13)*230-cx,sy=50*TS+Math.cos(G.time*.19)*70-cy;if(sx>-80&&sy>-80&&sx<VW+80&&sy<VH+80){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(sx,sy,0,sx,sy,46);g.addColorStop(0,'rgba(230,240,255,.22)');g.addColorStop(.7,'rgba(200,215,255,.08)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(sx-46,sy-46,92,92);c.globalCompositeOperation='source-over';}}
 for(const pu of G.police){const sx=pu.x-cx,sy=pu.y-cy;if(sx>-20&&sy>-30&&sx<VW+20&&sy<VH+20)drawHuman(c,pu,sx,sy);}
 // post
 c.globalCompositeOperation='multiply';c.fillStyle=isPat()?weatherTint():'#c4ccd6';c.fillRect(0,0,VW,VH);c.globalCompositeOperation='source-over';if(W8()==='morning')morningFx(c,cx,cy);else if(isPat())weatherPost(c);if(LD().post)LD().post(c);
 if(G.lightF>0){c.fillStyle='rgba(200,215,255,'+G.lightF*.12+')';c.fillRect(0,0,VW,VH);}
 if(G.nvg){c.globalCompositeOperation='multiply';c.fillStyle='#6cff84';c.fillRect(0,0,VW,VH);c.globalCompositeOperation='lighter';c.fillStyle='rgba(18,60,24,.28)';c.fillRect(0,0,VW,VH);c.globalCompositeOperation='source-over';c.drawImage(GRAIN[(G.time*30+1|0)%4],0,0);c.drawImage(GRAIN[(G.time*30+2|0)%4],1,0);}
 c.drawImage(GRAIN[(G.time*24|0)%4],0,0);c.drawImage(vigC,0,0);
 {const P1=G.p1,bleeding=P1&&P1.alive&&P1.wounded&&!P1.treated,tens=G.alarm||G.deadline<120;G.hurtF=Math.max(0,(G.hurtF||0)-1/60);
  const a=(bleeding?.22+.12*Math.sin(G.time*5):0)+(tens?.06+.05*Math.sin(G.time*3.2):0)+G.hurtF*.4;
  if(a>0){const g=c.createRadialGradient(VW/2,VH/2,VH*.3,VW/2,VH/2,VW*.6);g.addColorStop(0,'rgba(120,0,0,0)');g.addColorStop(1,'rgba(120,0,0,'+Math.min(.8,a)+')');c.fillStyle=g;c.fillRect(0,0,VW,VH);}}
 if(G.camv&&G.camv.poly){c.fillStyle='rgba(40,255,110,.04)';c.fillRect(0,0,VW,VH);if(G.camv.cctv){c.fillStyle='rgba(0,0,0,.18)';for(let y=(G.time*20|0)%3;y<VH;y+=3)c.fillRect(0,y,VW,1);for(let i=0;i<40;i++)P(c,(Math.random()*VW)|0,(Math.random()*VH)|0,1,1,'rgba(200,255,210,.18)');if(((G.time*1.5)|0)%2)P(c,8,8,3,3,'#e02020');}}
 if(G.stunView>0){}
 $('flash').style.opacity=G.flashW>0?Math.min(1,G.flashW*1.3):0;
 if(G.map)drawPlan($('plancv'),true);$('planov').classList.toggle('hidden',!G.map);}
function drawFog(cx,cy){fg.globalCompositeOperation='source-over';fg.globalAlpha=1;fg.fillStyle='#000';fg.fillRect(0,0,VW,VH);
 fg.globalCompositeOperation='destination-out';fg.globalAlpha=G.nvg?.62:isPat()?(LD().lit||.48):.4;fg.drawImage(memory,cx,cy,VW,VH,0,0,VW,VH);if(isPat()&&OUTM){fg.globalAlpha=weatherAlpha();fg.drawImage(OUTM,cx,cy,VW,VH,0,0,VW,VH);}fg.globalAlpha=1;
 for(const s of G.squad){if(!s.alive||!s.vis)continue;const k=s.human||!isPat()?1:.5,R=effRange(s)*TS,g=fg.createRadialGradient(s.x-cx,s.y-cy,R*.15,s.x-cx,s.y-cy,R);g.addColorStop(0,'rgba(0,0,0,'+k+')');g.addColorStop(.7,'rgba(0,0,0,'+(.93*k)+')');g.addColorStop(1,'rgba(0,0,0,'+(.55*k)+')');fg.fillStyle=g;if(s.human)fg.filter='blur(1.5px)';fg.beginPath();polyPath(fg,s.vis,cx,cy);fg.fill();fg.filter='none';}
 for(const l of G.lights){const g=fg.createRadialGradient(l.x-cx,l.y-cy,0,l.x-cx,l.y-cy,l.r);g.addColorStop(0,'rgba(0,0,0,.8)');g.addColorStop(1,'rgba(0,0,0,0)');fg.fillStyle=g;fg.fillRect(l.x-cx-l.r,l.y-cy-l.r,l.r*2,l.r*2);}
 if(G.camv&&G.camv.poly){fg.fillStyle='rgba(0,0,0,.9)';fg.beginPath();polyPath(fg,G.camv.poly,cx,cy);fg.fill();}
 fg.globalCompositeOperation='source-over';ctx.drawImage(fogC,0,0);
 if(G.camv&&G.camv.poly){const cv=G.camv;ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(30,140,70,.2)';ctx.beginPath();polyPath(ctx,cv.poly,cx,cy);ctx.fill();ctx.globalCompositeOperation='source-over';ctx.strokeStyle='rgba(120,255,160,.35)';ctx.beginPath();polyPath(ctx,cv.poly,cx,cy);ctx.stroke();for(let k=0;k<3;k++)P(ctx,Math.round(cv.x-cx)+k-1,Math.round(cv.y-cy)-1,1,1,'#7fff9a');}}
function drawRain(cx,cy,all){const dt=1/60;ctx.fillStyle='rgba(150,170,195,.3)';
 for(const r of RAIN){r.y+=r.s*dt;r.x-=r.s*dt*.08;if(r.y>VH){r.y=-6;r.x=Math.random()*(VW+30);}if(r.x<0)r.x+=VW;if(!all&&!isOutdoor(r.x+cx,r.y+cy+10))continue;ctx.fillRect(r.x|0,r.y|0,1,r.l);}
 ctx.fillStyle='rgba(170,190,210,.35)';for(let i=0;i<10;i++){const x=Math.random()*VW|0,y=Math.random()*VH|0;if(all||isOutdoor(x+cx,y+cy)){ctx.fillRect(x-1,y,1,1);ctx.fillRect(x+1,y,1,1);}}}
let menuT=0,chatT=3;
const CHAT=['Dispatch to all units, ten-four, suspect vehicle last seen northbound on Fifth Street.','Unit twelve, copy that, en route. E.T.A. four minutes.','All units be advised, shots fired reported near the river district.','Ten twenty-three, on scene. Requesting one more unit.','Control, unit seven, show me out on a traffic stop.','Copy seven, use caution.','Dispatch, perimeter is set on the east side.','Negative contact at this time, continuing the search.','Medic one, stand by at the staging area.','All units, code three, officer needs assistance.','Roger that, holding position.','Ten-four, show me clear.','Unit nine, respond to a disturbance, four-fifteen Oak Avenue.','Copy dispatch, we are rolling.','Air one is up, thermal on the north lot.'];
function menuChatter(dt){if(G.running||!A.ctx)return;G.hitT=(G.hitT==null?4:G.hitT)-dt;if(G.hitT<=0){G.hitT=rand(10,18);SND.hit();}G.pulseT=(G.pulseT==null?1:G.pulseT)-dt;if(G.pulseT<=0){G.pulseT=1.9;SND.pulse();}chatT-=dt;G.sirenT=(G.sirenT==null?2:G.sirenT)-dt;
 if(G.sirenT<=0){G.sirenT=rand(9,20);siren(rand(.05,.11),rand(7,11));}
 if(chatT>0||A.voice==='off'||A.scanOK)return;chatT=rand(6,12);if(R.busy)return;
 const txt=pick(CHAT),t0=A.ctx.currentTime,vs=('speechSynthesis' in window)?speechSynthesis.getVoices():[],v=vs.find(x=>/^en-US/i.test(x.lang))||vs.find(x=>/^en/i.test(x.lang));
 if(!v||speechSynthesis.speaking){radioFx(rand(1,2.6),.3,Math.random()<.35);return;}
 const o=ui(.32);tone(o,t0,.006,{type:'square',f:3000,g:.6});nz(o,t0+.005,.14,{f:2400,q:1.6,g:.9});if(Math.random()<.4)mdc(o,t0+.15,.2);
 const est=txt.length*.07+.5;nz(ui(.022),t0+.15,est,{f:1800,q:.6,g:1,attack:.05});for(let k=0;k<est*5;k++)nz(o,t0+.2+Math.random()*est,.018,{type:'highpass',f:2800,g:rand(.1,.35)});
 const u=new SpeechSynthesisUtterance(txt);u.voice=v;u.lang=v.lang;u.volume=Math.min(1,.14*A.vol+.02);u.rate=rand(1.15,1.3);u.pitch=pick([.55,.7,.85,1]);
 u.onend=()=>{if(A.ctx)nz(ui(.3),A.ctx.currentTime,.2,{f:1800,q:1.4,g:.75});};setTimeout(()=>{if(!G.running)speechSynthesis.speak(u);},380);
 const d=est;setTimeout(()=>{if(A.ctx)nz(ui(.045),A.ctx.currentTime,.18,{f:1800,q:1.5,g:.7});},d*1000+120);}
const planSmall=document.createElement('canvas');planSmall.width=800;planSmall.height=580;
const MONV_H=[[[13,41,'c',2],[20,52,'c',2.4]],[[44,12,'ir',2.2],[36,11,'ir',1.8]],[[55,37,'bw',1.8],[55,36,'bw',1.4]],[[70,37,'warm',2],[75,40,'warm',2.4]],[[18,50,'c',2],[8,40,'c',2.6]],[0],[[68,43,'blue',2],[62,44,'blue',2.6]]];
const MONS=[[10,10,84,50,[36,30]],[100,10,84,50,[8,12]],[190,10,84,50,[72,29]],[280,10,94,50,[60,40]],[10,68,118,70,[55,7]],[134,68,118,70,'plan'],[258,68,116,70,[20,34]]];
let MENUW=null;function menuWorld(){if(!MENUW){const w=worldFull(),c=document.createElement('canvas');c.width=w.width;c.height=w.height;c.getContext('2d').drawImage(w,0,0);MENUW=c;}return MENUW;}
function renderMenu(dt){menuT+=dt;const c=ctx;c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;
 if(!planSmall.drawn){drawPlan(planSmall,false,0);planSmall.drawn=1;}
 P(c,0,0,VW,VH,'#07090b');P(c,0,0,VW,150,'#0e1115');for(let x=0;x<VW;x+=48)P(c,x,0,1,150,'#15191e');P(c,0,146,VW,4,'#1a1e23');
 MONS.forEach(([x,y,w,h,v],i)=>{P(c,x-3,y-3,w+6,h+6,'#1c2026');P(c,x-2,y-2,w+4,h+4,'#030404');
  if(v==='plan'){P(c,x,y,w,h,'#05080e');const wf=menuWorld(),sx=true?29*16:24*16,sy=true?33.5*16:40*16;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(wf,sx+Math.sin(menuT*.05)*6,sy,w*2,h*2,x,y,w,h);
   if(true){const on=((menuT*5)|0)%2,lx=x+(34*16+21-sx)/2,ly=y+(41*16+11-sy)/2,gg=c.createRadialGradient(lx,ly,0,lx,ly,16);gg.addColorStop(0,on?'rgba(255,40,30,.5)':'rgba(40,90,255,.5)');gg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gg;c.fillRect(lx-16,ly-16,32,32);}
   c.fillStyle='rgba(0,10,8,.25)';c.fillRect(x,y,w,h);c.restore();c.fillStyle='#bfe8c8';c.font='6px monospace';c.fillText('CAM 06  '+(true?'06:4'+(1+((menuT/60)|0)):'02:4'+(7+((menuT/60)|0)))+':'+String((menuT|0)%60).padStart(2,'0'),x+3,y+8);}
  else{let mode=i%2?'g':'b',zm=2;if(true){const set=MONV_H[i],k=((menuT/14+i*.37)|0)%set.length,cv=set[k];v=cv;mode=cv[2];zm=cv[3]||2;const ph=(menuT/14+i*.37)%1;if(ph<.02)mode='n';}
   const sx=clamp(v[0]*TS+Math.sin(menuT*.07+i)*40-w*zm/2,0,world.width-w*zm),sy=clamp(v[1]*TS+Math.cos(menuT*.05+i)*20-h*zm/2,0,world.height-h*zm);c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(menuWorld(),sx,sy,w*zm,h*zm,x,y,w,h);
   if(mode==='ir'||mode==='bw'){c.globalCompositeOperation='saturation';P(c,x,y,w,h,'#808080');c.globalCompositeOperation='multiply';P(c,x,y,w,h,mode==='ir'?'#86ffa0':'#e8eaee');c.globalCompositeOperation='lighter';P(c,x,y,w,h,mode==='ir'?'rgba(10,50,15,.35)':'rgba(40,40,44,.3)');}
   else if(mode==='warm'){c.globalCompositeOperation='multiply';P(c,x,y,w,h,'#ffd2a0');c.globalCompositeOperation='lighter';P(c,x,y,w,h,'rgba(40,24,8,.2)');}
   else if(mode==='blue'){c.globalCompositeOperation='multiply';P(c,x,y,w,h,'#9fb8ff');c.globalCompositeOperation='lighter';P(c,x,y,w,h,'rgba(10,20,50,.25)');}
   else if(mode==='c'){c.globalCompositeOperation='lighter';P(c,x,y,w,h,'rgba(30,34,30,.25)');}
   else if(mode==='n'){c.globalCompositeOperation='source-over';for(let k=0;k<160;k++)P(c,x+Math.random()*w|0,y+Math.random()*h|0,2,1,Math.random()<.5?'#cfd':'#334');}
   else{c.globalCompositeOperation='multiply';P(c,x,y,w,h,mode==='g'?'#9fd8b8':'#a8c4e0');c.globalCompositeOperation='lighter';P(c,x,y,w,h,'rgba(40,90,70,.22)');}
   c.globalCompositeOperation='source-over';c.restore();
   c.fillStyle='#bfe8c8';c.font='6px monospace';c.fillText('CAM 0'+(i+1)+'  '+(true?'06:'+(41+((menuT/60)|0)):'02:'+(47+((menuT/60)|0)))+':'+String((menuT|0)%60).padStart(2,'0'),x+3,y+8);if(((menuT*2)|0)%2)P(c,x+w-7,y+3,3,3,'#e0302a');}
  for(let k=0;k<h;k+=2)P(c,x,y+k,w,1,'rgba(0,0,0,.18)');P(c,x,y,w,1,'rgba(255,255,255,.08)');});
 // desk & equipment
 P(c,0,150,VW,66,'#12151a');P(c,0,150,VW,3,'#2a3038');P(c,0,153,VW,2,'#07090b');
 P(c,22,166,74,18,'#0b0d10');for(let r=0;r<3;r++)for(let k=0;k<14;k++)P(c,25+k*5,169+r*5,4,3,'#1e232a');
 P(c,140,168,60,14,'#0b0d10');for(let k=0;k<11;k++)P(c,143+k*5,171,4,3,'#1e232a');P(c,210,160,8,10,'#2a2f36');P(c,211,158,6,2,'#3a3f46');
 P(c,290,156,84,44,'#1a1e24');P(c,290,156,84,2,'#2c323a');for(let k=0;k<8;k++){const on=Math.sin(menuT*(2+k)+k*3)>.2;P(c,296+k*9,162,4,2,on?['#3f3','#fc3','#f43','#3cf'][k%4]:'#222');}
 P(c,296,170,40,10,'#0d1013');c.fillStyle='#ff9a30';c.font='6px monospace';c.fillText('CH 4  ' + (154.2+((menuT*3|0)%5)/10).toFixed(1),298,177);P(c,342,168,26,26,'#111');P(c,349,175,12,12,'#2a2a2a');
 P(c,240,170,10,12,'#d8d4c8');P(c,241,168,8,2,'#3a2a20');P(c,110,188,40,22,'#cfcab8');P(c,152,192,30,18,'#bdb7a4');P(c,60,195,26,8,'#222');P(c,62,190,6,6,'#333');
 // lights: red cab lamp + police strobes through windows
 c.globalCompositeOperation='lighter';let g=c.createRadialGradient(VW/2,0,0,VW/2,0,170);g.addColorStop(0,'rgba(140,20,20,.18)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,VW,VH);
 const ph=menuT%1.3,on1=ph<.07||(ph>.13&&ph<.2),on2=(ph>.65&&ph<.72)||(ph>.78&&ph<.85);
 for(const[on,x,y,col]of[[on1,-20,VH*.5,'50,100,255'],[on2,VW+20,VH*.45,'50,100,255'],[on2,-20,VH*.2,'255,40,40']])if(on){g=c.createRadialGradient(x,y,0,x,y,VW*.6);g.addColorStop(0,'rgba('+col+',.55)');g.addColorStop(.5,'rgba('+col+',.15)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,VW,VH);}
 c.globalCompositeOperation='source-over';c.drawImage(vigC,0,0);
 ambient(false,0,0,true);menuChatter(dt);}
// ================= PLAN MAP =================
function drawPlan(cnv,live,entry){const g=cnv.getContext('2d'),S=10;g.setTransform(1,0,0,1,0,0);g.fillStyle='#09130f';g.fillRect(0,0,cnv.width,cnv.height);
 g.fillStyle='rgba(90,160,140,.06)';for(let x=0;x<cnv.width;x+=S)g.fillRect(x,0,1,cnv.height);for(let y=0;y<cnv.height;y+=S)g.fillRect(0,y,cnv.width,1);
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y),i=I(x,y);
  if(t===T.FLOOR)g.fillStyle='rgba(80,140,120,.13)';else if(t===T.WALL)g.fillStyle='#6fa89a';else if(t===T.WIN)g.fillStyle='#3d8fa3';else if(t===T.DOOR)g.fillStyle='rgba(80,140,120,.13)';else if(t===T.ASPH)g.fillStyle='rgba(255,255,255,.035)';else continue;
  g.fillRect(x*S,y*S,S,S);if(LV.fsolid[i]&&t===T.FLOOR){g.fillStyle='rgba(111,168,154,.28)';g.fillRect(x*S+2,y*S+2,S-4,S-4);}}
 for(const d of LV.doors){g.fillStyle=d.broken?'#a05040':'#d6b25e';if(d.vert)g.fillRect(d.x*S+3,d.y*S,4,S);else g.fillRect(d.x*S,d.y*S+3,S,4);}
 g.font='bold 9px monospace';g.textAlign='center';g.textBaseline='middle';
 ROOMS.forEach(r=>{if(r.n.startsWith('Korytarz A'))return;g.fillStyle='rgba(170,220,205,.75)';const cx=(r.x+r.x2+1)/2*S,cy=(r.y+r.y2+1)/2*S;
  const tx=r.n.toUpperCase(),w=(r.x2-r.x+1)*S-4;g.font=g.measureText(tx).width>w?'bold 7px monospace':'bold 9px monospace';g.fillText(tx,cx,cy);g.font='bold 9px monospace';});
 if(G.lvl==='hosp'){g.fillStyle='rgba(170,220,205,.5)';g.fillText('PARKING',36*S,52*S);g.save();g.translate(33*S,8*S);g.rotate(-Math.PI/2);g.fillText('KORYTARZ A',0,0);g.restore();}else{g.fillStyle='rgba(170,220,205,.5)';g.fillText('OAKRIDGE LANE',20*S,42.5*S);g.fillText('OGRÓD',45*S,12*S);g.fillStyle='#f2d36a';g.fillText('214',41*S,35.6*S);}
 const pulse=.5+.5*Math.sin(performance.now()/300);
 if(!live||!G.obj.freed){g.lineWidth=1.5;for(const[ix,iy,t]of (G.scen?G.scen.intel:INTEL)){const big=t==='ZAKŁADNIK?'||t==='ZGŁOSZENIE';g.strokeStyle='rgba(230,70,60,'+(.35+pulse*.5)+')';g.setLineDash([3,3]);g.beginPath();g.arc(ix*S+5,iy*S+5,(big?22:15)+pulse*3,0,7);g.stroke();g.setLineDash([]);g.fillStyle='#e6463c';g.fillText(t,ix*S+5,iy*S+5);}}
 g.fillStyle='#4fd07a';for(const c of CAMS){g.beginPath();g.arc(c[0]*S,c[1]*S,3,0,7);g.fill();}
 g.textAlign='left';if(G.lvl==='hosp'){g.fillStyle='#4fd07a';g.fillText('● KAMERY (NASZE)',8,cnv.height-30);}g.fillStyle='#d6b25e';g.fillText('▬ DRZWI',90,cnv.height-30);g.fillStyle='#3d8fa3';g.fillText('▬ OKNA (KRATY)',160,cnv.height-30);
 g.fillStyle='#e6463c';g.fillText('◌ DOMNIEMANE POZYCJE (WYWIAD)',270,cnv.height-30);g.fillStyle='rgba(170,220,205,.6)';g.fillText(isPat()?(LD().planTitle||''):'PLAN WSTĘPNY · ST. DYMPHNA PSYCHIATRIC HOSPITAL · NAPASTNICY: SZAC. '+(G.scen?G.scen.est.join('–'):'6–8')+', DANE NIEPOTWIERDZONE',8,cnv.height-14);
 g.textAlign='center';
 if(!live){ENTRIES.forEach((e,i)=>{const sel=i===entry;g.fillStyle=sel?'#f2d36a':'rgba(214,178,94,.55)';g.beginPath();g.arc(e.px*S+5,e.py*S+8,sel?9:7,0,7);g.fill();g.fillStyle='#111';g.fillText(String(i+1),e.px*S+5,e.py*S+9);});}
 else{for(const s of G.squad){if(!s.alive)continue;g.fillStyle=s.human===1?'#efe8c8':s.human===2?'#5fc7d6':s.acc;g.beginPath();g.arc(s.x/TS*S,s.y/TS*S,4,0,7);g.fill();g.fillStyle='rgba(239,232,200,.85)';g.fillText(s.name,s.x/TS*S,s.y/TS*S-9);}
  const H=G.hostage;if(H&&H.alive&&G.obj.found){g.fillStyle='#e6463c';g.fillRect(H.x/TS*S-3,H.y/TS*S-3,6,6);}
  for(const e of G.enemies)if(!e.alive&&e.everSeen){g.fillStyle='rgba(230,70,60,.5)';g.fillText('×',e.x/TS*S,e.y/TS*S);}}}

// ================= HUD =================
let hudCache={};function setH(id,html){if(hudCache[id]!==html){hudCache[id]=html;$(id).innerHTML=html;}}
const ORD={follow:'ROZKAZ: ZA MNĄ · SZYK KOLUMNOWY',hold:'ROZKAZ: TRZYMAĆ POZYCJĘ',move:'ROZKAZ: RUCH NA POZYCJĘ',op:'ROZKAZ: AKCJA PRZY DRZWIACH'};
function abText(u){if(u.patrol)return'Q: okrzyk „'+((LD().crew&&LD().crew.shout)||'Police! Don\'t move!')+'”';switch(u.spec){case'lead':return'Q: okrzyk „Policja!”'+(u.shoutCd>0?' ('+Math.ceil(u.shoutCd)+')':'');case'breach':return u.ram?'Q: taran':'Q: ładunek ×'+u.charges;case'tech':return'Q: kamera (drzwi) / peryskop (róg) · E: wytrych';case'medic':return'Q: sedatyw ×'+u.sed;case'scout':return'Q: granat hukowy ×'+u.flash;}return'';}
function wHTML(u,pre){if(!u||!u.alive)return'<div class="wn">—</div>';const lt=G.nvg?'NOKTOWIZJA':G.torchOff?'LATARKA WYŁ. · L':'LATARKA · L';let pp='';if(u.W.mag<=40){for(let i=0;i<u.W.mag;i++)pp+='<i'+(i<u.mag&&!(u.rel>0)?'':' class="e"')+'></i>';}
 return'<div class="wn">'+(pre||'')+(u.holster?'BROŃ W KABURZE · X':u.W.n)+(lt?' · '+lt:'')+'</div><div class="am">'+(u.rel>0?'<small class="rl">PRZEŁADOWANIE</small>':u.mag+' <small>/ '+u.res+'</small>')+'</div>'+(pp?'<div class="pp">'+pp+'</div>':'')+'<div class="ab">'+abText(u).replace(/^Q: /,'Q · ')+(u.spray?' · G gaz ×'+u.spray:'')+(u.shield?' · TARCZA':'')+(u.quiet?' · CICHO':'')+'</div>';}
function updateHUD(){let r='',ri=0;for(const s of SPECS.map((_,i)=>G.squad[i])){const idx=ri++;if(!s)continue;let st;
  if(!s.alive)st='KIA';else if(s.wounded&&!s.treated)st='<span style="color:#ff5a4a">RANNY · '+Math.ceil(s.bleed)+' s</span>';else if(s.stun>0)st='OGŁUSZONY';else if(s.human)st=(s.wounded?'opatrzony · ':'')+s.mag+'/'+s.W.mag;else{const t=s.task;st=s.action?'akcja':t?(t.type==='hold'?'pozycja':t.done?'gotowy':'ruch'):s.post?(s.post.kind==='door'?'pilnuje drzwi':'zabezp. kąt'):(s.patrol&&isPat()&&leader()&&patrolFocus(leader()))?'osłania':'w szyku';st+=' · '+s.mag;}
  const hw=!s.alive?0:s.wounded&&!s.treated?35:s.wounded?65:100;r+='<div data-i="'+idx+'" class="m'+(s.human===1?' p1':s.human===2?' p2':'')+(s.alive?'':' kia')+'"><span class="nm">'+s.name+'</span><span class="hb"><i'+(hw<100?' class="w"':'')+' style="width:'+hw+'%"></i></span><span class="st">'+st+'</span></div>';}
 setH('roster',r);setH('order',(ORD[G.order]||'')+(G.ops.some(o=>o.wait)?'<br>'+G.ops.filter(o=>o.wait).map(o=>teamName(o.team).toUpperCase()+': '+(o.go?'WCHODZI':o.ready?'GOTOWY':'W DRODZE')).join(' · ')+(G.ops.some(o=>o.wait&&!o.go&&o.ready)?' · [SPACJA] WEJŚCIE':''):'')+'<br>'+(isPat()&&!LD().nvg?'LATARKI':G.nvg?'NOKTOWIZJA [N]':'LATARKI [N]'));
 const ne=G.enemies.length,nn=G.enemies.filter(e=>!e.alive||e.state==='cuffed'||e.state==='surr'||e.pose==='sleep').length;
 const nc=G.civs.filter(c=>c.kind!=='director'&&c.state!=='bed').length;
 if(isPat())setH('obj',LD().obj());else setH('obj','<div class="h">Notatnik · J · <span style="color:'+(G.deadline<180?'#ff5a4a':'#c9b458')+'">ULTIMATUM '+fmtT(Math.max(0,G.deadline))+'</span></div>'+
  '<div class="'+(G.obj.found?'ok':'no')+'">'+'Odnajdź zakładnika</div>'+
  '<div class="'+(G.obj.freed?'ok':'no')+'">'+'Uwolnij zakładnika [E]</div>'+
  '<div class="'+(G.win?'ok':'no')+'">'+'Wyprowadź go z budynku</div>'+
  '<div class="opt">Napastnicy zneutralizowani: '+nn+'/'+ne+'</div><div class="opt">Cywile skuci / uśpieni: '+G.stats.civSecured+'/'+nc+'</div>'+(G.alarm?'<div style="color:#e0574a">ALARM PODNIESIONY</div>':'<div class="opt">Element zaskoczenia: zachowany</div>'));
 const th=$('threat');if(G.hostage&&G.alarm&&G.hostage.alive&&G.hostage.state==='tied'&&G.enemies.find(e=>e.boss&&e.active())){th.classList.remove('hidden');setH('threat','ZAKŁADNIK ZAGROŻONY · '+Math.max(0,Math.ceil(G.execT))+' s');}else th.classList.add('hidden');
 setH('weapon',wHTML(G.p1));if(G.players===2)setH('p2weapon',wHTML(G.p2,'P2 · '));bodycamHUD();
 const u=G.p1;let pr='';const bar=$('bar');
 if(u&&u.alive&&!G.ended){if(u.action){bar.classList.remove('hidden');bar.firstChild.style.width=(u.action.t/u.action.dur*100)+'%';pr=u.action.label+'…';}
  else{bar.classList.add('hidden');const it=interactInfo(u);if(it)pr=(it.dur>0?'[przytrzymaj E] ':'[E] ')+it.label;else{const d=frontDoor(u);if(d&&d.locked&&!d.knownLocked&&!d.broken)pr='[E] Otwórz drzwi';}
   {const tr=trapNear(u,TS*2);if(tr&&u.spec!=='tech')pr+=(pr?' · ':'')+'POTYKACZ — rozbroi technik (PPM)';}
   {const ro=reportTarget(u);if(ro)pr+=(pr?' · ':'')+'[T] Zgłoś: '+reportable(ro)[0];}
   if(u.spec==='medic'){const ht=healTarget(u)||(u.wounded&&!u.treated?u:null);if(ht)pr+=(pr?' · ':'')+'[Q] Opatrz: '+(ht===u?'siebie':ht.name);}
   if(u.spec==='breach'||u.spec==='tech'){const d=frontDoor(u);if(d&&!d.broken&&d.open<.5&&!d.charge)pr+=(pr?' · ':'')+'[Q] '+(u.spec==='breach'?'Załóż ładunek':'Kamera pod drzwiami');}}}
 else bar.classList.add('hidden');
 setH('prompt',promptHTML(pr));}
function promptHTML(pr){if(!pr)return'';return pr.split(' · ').map(x=>{const m=x.match(/^\[(przytrzymaj )?([^\]]+)\] ?(.*)$/i);return m?'<k'+(m[1]?' class="hold"':'')+'>'+m[2]+'</k>'+m[3]:x;}).join('<span class="sep">·</span>');}
const BC_AG={house:['RIDGEFIELD PD','-0500'],road:['WYOMING HWY PATROL','-0700'],apt:['CHICAGO PD','-0600'],motel:['NYE COUNTY SO','-0800'],air:['PHOENIX PD','-0700'],hosp:['RIDGEFIELD PD S.W.A.T.','-0500'],school:['FAIRVIEW PD','-0500'],park:['PORTLAND POLICE BUREAU','-0800'],mall:['PASADENA PD S.W.A.T.','-0600']};
function bcHash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;}
function bodycamHUD(){const u=G.p1;if(!u)return;const ag=BC_AG[G.lvl]||BC_AG.house,swat=!u.patrol,h=bcHash(u.name);
 const nm=u.name.replace(/^(OFC|TPR|DEP|SGT|CPL)\. /,'');setH('bc-who','· '+u.name+' #'+(1000+h%9000));
 const ck=(LD().nb&&LD().nb.clock)||[2,14,0],t=Math.floor(ck[0]*3600+ck[1]*60+ck[2]+180+G.stats.time),p=n=>String(n).padStart(2,'0'),d=new Date();
 setH('bc-t',d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(Math.floor(t/3600)%24)+':'+p(Math.floor(t/60)%60)+':'+p(t%60)+' '+ag[1]);
 setH('bc-s',(swat&&G.lvl==='motel'?'NYE COUNTY S.W.A.T.':ag[0])+' · '+(swat?'HELMET CAM':'BODY CAM')+' X'+(60+h%30)+'A-'+(1000+(h>>>8)%9000));
 $('cmdhint').classList.toggle('fade',G.stats.time>15);}
function fmtT(t){t=Math.floor(t);return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}

// ================= SCREENS =================
function menuSway(){const t=performance.now()/1000;return'translate('+(Math.sin(t*.31)*.35+Math.sin(t*.13)*.2).toFixed(3)+'%,'+(Math.sin(t*.23+1)*.3).toFixed(3)+'%) rotate('+(Math.sin(t*.19)*.16).toFixed(3)+'deg) scale(1.025)';}
function showScreen(id){G.menuDrawn=0;document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));if(id)$('scr-'+id).classList.remove('hidden');$('monov').style.display=id==='menu'?'':'none';}
function togglePause(){G.paused=!G.paused;if(G.paused)fillPause();$('hud').style.visibility=G.paused?'hidden':'';showScreen(G.paused?'pause':null);if(G.paused){if('speechSynthesis' in window)speechSynthesis.pause();}else if('speechSynthesis' in window)speechSynthesis.resume();}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{SND.click();const g=b.dataset.go;
 if(g==='squad'){buildSquadCards();}if(g==='menu'&&G.running){G.running=false;$('hud').classList.add('hidden');radioClear();}
 if(G.paused&&g==='menu'){G.paused=false;}showScreen(g==='ctrl'&&G.paused?'ctrl':g);}));
$('mode1').onclick=()=>{G.players=1;$('mode1').classList.add('sel');$('mode2').classList.remove('sel');$('modehint').textContent='Pozostali członkowie oddziału są sterowani przez AI i wykonują twoje rozkazy.';SND.click();};
try{G.realCop=localStorage.getItem('bm_realcop')==='1';}catch(e){}$('realcop').classList.toggle('sel',!!G.realCop);
$('realcop').onclick=()=>{G.realCop=!G.realCop;try{G.realCop?localStorage.setItem('bm_realcop','1'):localStorage.removeItem('bm_realcop');}catch(e){}$('realcop').classList.toggle('sel',G.realCop);$('modehint').textContent=G.realCop?'REAL COP: jedno życie. Śmierć twojej postaci kończy każdą misję, także operacje S.W.A.T.':'Standard: w operacjach S.W.A.T. po twojej śmierci przejmujesz kolejnego operatora. W patrolu śmierć kończy misję.';SND.click();};
$('mm-coop').onclick=()=>{SND.click();$('mode2').onclick();showScreen('scen');};
{const navRoot=()=>!$('scr-menu').classList.contains('hidden')?$('scr-menu'):!$('scr-deb').classList.contains('hidden')?$('scr-deb'):(!$('scr-brief').classList.contains('hidden')&&!$('nb').classList.contains('hidden'))?$('nb'):null;
 const items=()=>{const r=navRoot();return r?[...r.querySelectorAll('.mm-i')]:[];};document.querySelectorAll('.mm-i').forEach(b=>b.addEventListener('mouseenter',()=>{items().forEach(x=>x.classList.toggle('on',x===b));}));
 addEventListener('keydown',e=>{if(!navRoot()||(G.running&&$('scr-deb').classList.contains('hidden')))return;const it=items(),k=it.findIndex(x=>x.classList.contains('on'));
  if(e.code==='ArrowRight'||e.code==='KeyD'||e.code==='ArrowLeft'||e.code==='KeyA'){const n=(k+(e.code==='ArrowRight'||e.code==='KeyD'?1:-1)+it.length)%it.length;it.forEach((x,j)=>x.classList.toggle('on',j===n));SND.click&&A.ctx&&SND.click();e.preventDefault();}
  else if(e.code==='Enter'||e.code==='Space'){it[Math.max(0,k)].click();e.preventDefault();e.stopImmediatePropagation();}});}
function ctTab(n){$('ct1').classList.toggle('sel',n===1);$('ct2').classList.toggle('sel',n===2);$('ctp1').classList.toggle('hidden',n!==1);$('ctp2').classList.toggle('hidden',n!==2);$('ct-sub').textContent=n===1?'KLAWIATURA + MYSZ':'PAD LUB KLAWIATURA · TRYB CO-OP';}
$('ct1').onclick=()=>{SND.click();ctTab(1);};$('ct2').onclick=()=>{SND.click();ctTab(2);};
addEventListener('keydown',e=>{if($('scr-ctrl').classList.contains('hidden')||G.running&&!G.paused)return;if(e.code==='ArrowLeft'||e.code==='KeyA'){ctTab(1);e.preventDefault();}else if(e.code==='ArrowRight'||e.code==='KeyD'){ctTab(2);e.preventDefault();}else if(e.code==='Enter'||e.code==='Backspace'||e.code==='Escape'){$('scr-ctrl').querySelector('[data-go]').click();e.preventDefault();e.stopImmediatePropagation();}});
const SCIDS=['sc1','sc2','sc3','sc4','sc5','sc6','sc7','sc8','sc9'],SCLV={sc1:'house',sc2:'road',sc3:'apt',sc4:'motel',sc5:'air',sc6:'school',sc7:'hosp',sc8:'park',sc9:'mall'};
const SCMETA={sc1:['PATROL','06:40','jesienny poranek',2,'~10 min'],sc2:['KONTROLA DROGOWA','19:41','mgła, zmierzch',2,'~8 min'],sc3:['PATROL','23:10','śnieg, zimowa noc',2,'~10 min'],sc4:['PATROL → S.W.A.T.','23:50','wiatr, pył',3,'~15 min'],sc5:['PATROL LOTNISKOWY','14:24','upał',1,'~8 min'],
 sc6:['AKTYWNY STRZELEC','14:07','słońce',3,'~10 min'],sc7:['S.W.A.T.','02:10','burza',3,'~20 min'],sc8:['PATROL','23:47','jesienna noc',2,'~10 min'],sc9:['S.W.A.T. + SAPER','15:44','pochmurno',3,'~12 min']};
function scDetail(id){const c=$(id),m=SCMETA[id]||['','','',1,''],lock=c.classList.contains('lock'),swat=/S\.W\.A\.T|STRZELEC/.test(m[0]),d=$('sc-det');
 d.classList.toggle('lock',lock);d.style.setProperty('--acc',swat?'linear-gradient(90deg,#e0302a,#7a1a18)':'linear-gradient(90deg,#3d6bff,#1e3a8a)');d.style.setProperty('--accT',swat?'#ff7a6a':'#8fb0f2');
 d.innerHTML='<div class="d-n">'+c.querySelector('.n').textContent+'</div><div class="d-ty">'+m[0]+'</div><div class="d-tt">'+c.querySelector('.tt').textContent+'</div><div class="d-fa">'+c.querySelector('.fa').textContent+'</div><div class="d-ds">'+c.querySelector('.ds').textContent+'</div>'+
  '<div class="d-tags"><span class="d-tag">Godzina<b>'+m[1]+'</b></span><span class="d-tag">Warunki<b>'+m[2]+'</b></span><span class="d-tag">Czas<b>'+m[4]+'</b></span><span class="d-tag">Trudność<span class="d-diff">'+[1,2,3].map(i=>'<i'+(i<=m[3]?' class="on"':'')+'></i>').join('')+'</span></span></div>'+
  scQuote(id)+'<div class="d-go">'+(lock?'● ZABLOKOWANE — wkrótce':'<button id="sc-go">ODPRAWA ▸</button><span>● DOSTĘPNE</span>')+'</div>';
 const b=$('sc-go');if(b)b.onclick=()=>$('scen-next').click();}
function scQuote(id){const L=LVL[SCLV[id]];const nb=L&&L.nb;if(!nb||!nb.call)return'';const ln=nb.call.find(r=>r[0]==='C');if(!ln)return'';return'<div class="d-q"><small>'+(nb.title||'Zgłoszenie')+' · '+((nb.who&&nb.who.C)||'')+'</small>„'+ln[1]+'”</div>';}
function scStars(){try{for(const id of SCIDS){const c=$(id);if(!c)continue;let e=c.querySelector('.stars');const n=+localStorage.getItem('bm_stars_'+SCLV[id])||0;if(!n){if(e)e.remove();continue;}if(!e){e=document.createElement('div');e.className='stars';c.appendChild(e);}e.innerHTML='★'.repeat(n)+'<b>'+'★'.repeat(4-n)+'</b>';const st=c.querySelector('.st');if(st)st.style.display='none';}}catch(e){}}
setTimeout(scStars,0);
function scSelect(id,quiet){SCIDS.forEach(x=>$(x).classList.toggle('sel1',x===id));G.pendLvl=$(id).classList.contains('lock')?null:SCLV[id];scDetail(id);if(!quiet)SND.click();$(id).scrollIntoView({block:'nearest'});}
function testMode(on){try{on?localStorage.setItem('bm_test','1'):localStorage.removeItem('bm_test');}catch(e){}SCIDS.forEach(id=>{const c=$(id);if(on&&c.classList.contains('lock')){c.classList.add('tlock');c.classList.remove('lock');const st=c.querySelector('.st');st.dataset.o=st.textContent;st.className='st ok';st.textContent='● TEST';}else if(!on&&c.classList.contains('tlock')){c.classList.remove('tlock');c.classList.add('lock');const st=c.querySelector('.st');st.className='st';st.textContent=st.dataset.o||'ZABLOKOWANE';}});
 let b=$('testbadge');if(!b){b=document.createElement('div');b.id='testbadge';b.style.cssText='position:absolute;pointer-events:none;left:calc(var(--u)*24);bottom:calc(var(--u)*10);font-size:calc(var(--u)*3);letter-spacing:.3em;color:#ff7a6a;border:1px solid rgba(255,122,106,.5);padding:calc(var(--u)*1) calc(var(--u)*3);z-index:5';$('scr-scen').appendChild(b);}b.textContent='TRYB TESTOWY · wszystkie misje';b.style.display=on?'block':'none';const sel=SCIDS.find(x=>$(x).classList.contains('sel1'));if(sel)scDetail(sel);}
{let tm=false;try{tm=/[?&#]test\b/i.test(location.search+location.hash)||localStorage.getItem('bm_test')==='1';}catch(e){tm=/[?&#]test\b/i.test(location.search+location.hash);}setTimeout(()=>testMode(tm),0);
 let buf='';addEventListener('keydown',e=>{if(G.running)return;buf=(buf+(e.key||'')).slice(-4).toLowerCase();if(buf==='test'){let on=false;try{on=localStorage.getItem('bm_test')==='1';}catch(_){on=!!$('testbadge')&&$('testbadge').style.display==='block';}testMode(!on);toast(!on?'Tryb testowy WŁĄCZONY':'Tryb testowy wyłączony');buf='';}});}
SCIDS.forEach(id=>{$(id).onclick=()=>scSelect(id);$(id).ondblclick=()=>{if(!$(id).classList.contains('lock'))$('scen-next').click();};});
setTimeout(()=>scSelect(SCIDS.find(x=>$(x).classList.contains('sel1'))||'sc1',1),0);
addEventListener('keydown',e=>{if($('scr-scen').classList.contains('hidden')||G.running)return;const ids=SCIDS,k=Math.max(0,ids.findIndex(x=>$(x).classList.contains('sel1')));
 if(e.code==='ArrowUp'||e.code==='ArrowDown'||e.code==='KeyW'||e.code==='KeyS'){const d=(e.code==='ArrowDown'||e.code==='KeyS')?1:-1;scSelect(ids[(k+d+ids.length)%ids.length]);e.preventDefault();}
 else if(e.code==='ArrowRight'||e.code==='ArrowLeft'||e.code==='KeyA'||e.code==='KeyD'){const d=(e.code==='ArrowRight'||e.code==='KeyD')?1:-1;let n=k;for(let t=0;t<ids.length;t++){n=(n+d+ids.length)%ids.length;if(!$(ids[n]).classList.contains('lock'))break;}scSelect(ids[n]);e.preventDefault();}
 else if(e.code==='Enter'){$('scen-next').click();e.preventDefault();}else if(e.code==='Escape'||e.code==='Backspace'){showScreen('menu');e.preventDefault();}});
$('mode2').onclick=()=>{G.players=2;$('mode2').classList.add('sel');$('mode1').classList.remove('sel');$('modehint').textContent='Gracz 1 prowadzi zespół, gracz 2 steruje partnerem (pad lub strzałki). Reszta to AI. Kamera wspólna.';SND.click();};
let pickStage=1;
function buildSquadCards(){pickStage=1;const box=$('sq-cards');box.innerHTML='';
 SPECS.forEach((s,i)=>{const d=document.createElement('div');d.className='card';d.innerHTML='<canvas width="48" height="30"></canvas><div class="cn">'+s.name+'</div><div class="cr">'+s.role+' · '+WEAP[s.weap].n+'</div><div class="cs">'+s.ab+'<br><br>'+s.ps+'<br>Pole widzenia: '+s.fov+'° / '+s.range+' m.</div><div class="badge"></div>';
  const g=d.querySelector('canvas').getContext('2d');g.fillStyle='#0b0d0d';g.fillRect(0,0,48,30);const u=new Unit({team:'squad',pal:PAL.squad,weap:s.weap,acc:s.acc,spec:s.id,ang:.35});G.time=0;drawHuman(g,u,24,26);
  d.onclick=()=>{SND.click();if(pickStage===1||G.players===1){G.p1Spec=i;if(G.players===2&&G.p2Spec===i)G.p2Spec=(i+1)%5;if(G.players===2)pickStage=2;}else{if(i===G.p1Spec)return;G.p2Spec=i;pickStage=1;}refreshCards();};
  box.appendChild(d);});refreshCards();}
function refreshCards(){[...$('sq-cards').children].forEach((d,i)=>{d.classList.toggle('sel1',i===G.p1Spec);d.classList.toggle('sel2',G.players===2&&i===G.p2Spec);const b=d.querySelector('.badge');
  b.textContent=i===G.p1Spec?'P1':(G.players===2&&i===G.p2Spec?'P2':'AI');b.style.background=i===G.p1Spec?'#e8e2c0':(G.players===2&&i===G.p2Spec?'#5fc7d6':'#555');});
 $('sq-h').textContent=G.players===2?(pickStage===2?'Gracz 2: wybierz specjalizację':'Gracz 1: wybierz specjalizację'):'Wybierz specjalizację';
 $('sq-hint').textContent=G.players===2?'Kliknij kartę dla gracza 1, potem dla gracza 2. Pozostali to AI.':'Pozostali czterej członkowie oddziału będą sterowani przez AI.';}
const BRIEF=()=>isPat()?'':`<div class="sec"><span class="lbl">SYTUACJA</span>02:47 · <b>St. Dymphna Psychiatric Hospital</b>, Ridgefield. Ridgefield PD S.W.A.T., zespół Alfa. Uzbrojona grupa (wywiad: <b>${G.scen.est.join('–')}</b> osób) porwała <b>dyrektora szpitala</b> i zajęła skrzydło administracyjne. Reszta szpitala działa: personel, pacjenci, OIOM, porodówka.</div>
<div class="sec"><span class="lbl">CEL</span>Uwolnij zakładnika i wyprowadź go z budynku.</div>
<div class="sec"><span class="lbl">WYWIAD</span>Zakładnik prawdopodobnie: <b>${G.scen.hroom}</b>. Pozycje na planie są niepewne.</div>
<div class="sec"><span class="lbl">UWAGA</span><span class="red">Nie strzelaj do cywili ani do poddanych.</span> Monitoring szpitala działa — dyżurka ochrony (wsch. od holu) · ultimatum 12 min · alarm = zagrożenie dla zakładnika.</div>`;
function openBriefing(){G.scen=isPat()?houseScen():genScen();if(G.entry>=ENTRIES.length)G.entry=0;showScreen('brief');const el=$('brief-txt');el.innerHTML=BRIEF();const ent=$('entries');ent.innerHTML='';
 ENTRIES.forEach((e,i)=>{const b=document.createElement('button');b.className='btn ent'+(i===G.entry?' sel':'');b.innerHTML='<b>'+(i+1)+'. '+e.n+'</b> — '+e.s;b.onclick=()=>{G.entry=i;SND.click();[...ent.children].forEach((c,j)=>c.classList.toggle('sel',j===i));};ent.appendChild(b);});
 radioClear();const hs=isPat();$('nb').classList.toggle('hidden',!hs);if(hs){fillBriefing();nbBackground();document.querySelectorAll('#nb .mm-i').forEach((x,j)=>x.classList.toggle('on',j===0));}
 $('brief-h').textContent=hs?'Zgłoszenie · 214 Oakridge Lane':'Odprawa · Operacja „St. Dymphna”';
 if(hs){G._callClock=0;setTimeout(startCall,500);}else setTimeout(()=>radio('TOC','Alfa, uzbrojona grupa w szpitalu psychiatrycznym. Jeden zakładnik. Pozycje napastników niepotwierdzone. Nie strzelać do cywili.'),400);}
$('callre').onclick=()=>{SND.click();G._callClock=0;startCall();};
$('sq-next').onclick=()=>{SND.click();openBriefing();};
$('go-mission').onclick=()=>{SND.click();audioInit();startMission();};
$('scen-next').onclick=()=>{const sel=SCIDS.find(x=>$(x).classList.contains('sel1'));if(sel&&$(sel).classList.contains('lock')){SND.click();toast('Ten scenariusz jest jeszcze zablokowany');return;}SND.click();G.p1Spec=0;G.p2Spec=1;if(G.loadingLvl)return;const need=G.pendLvl&&(G.pendLvl!==G.lvl||G.bakedFor!==G.pendLvl);if(!need){openBriefing();return;}G.loadingLvl=1;const b=$('sc-go');if(b)b.textContent='WCZYTYWANIE…';$('scen-next').textContent='WCZYTYWANIE…';requestAnimationFrame(()=>requestAnimationFrame(()=>{try{setLevel(G.pendLvl);}finally{G.loadingLvl=0;$('scen-next').textContent='ODPRAWA';if(b)b.textContent='ODPRAWA ▸';}openBriefing();}));};
$('to-gear').onclick=$('to-gear-old').onclick=()=>{SND.click();audioInit();G.p1Spec=0;G.p2Spec=1;G.load=defaultLoad();startMission();};$('gear-back').onclick=()=>{SND.click();showScreen('brief');};
const pzConfirm=(id,txt,fn)=>()=>{const b=$(id);if(b.classList.contains('warn')){b.classList.remove('warn');b.querySelector('small').textContent='';fn();return;}document.querySelectorAll('.pz-i').forEach(x=>{x.classList.remove('warn');x.querySelector('small').textContent=x.id==='p-res'?'ESC':'';});b.classList.add('warn');b.querySelector('small').textContent=txt;SND.click&&SND.click();};
$('p-res').onclick=()=>togglePause();$('p-rst').onclick=pzConfirm('p-rst','POSTĘP PRZEPADNIE · ENTER',()=>{G.paused=false;$('hud').style.visibility='';startMission();});$('p-ctrl').onclick=()=>showScreen('ctrl');
$('p-menu').onclick=pzConfirm('p-menu','WYJŚĆ Z MISJI? · ENTER',()=>{G.paused=false;G.running=false;$('hud').style.visibility='';$('hud').classList.add('hidden');radioClear();showScreen('menu');});
document.querySelectorAll('.pz-i').forEach(b=>b.addEventListener('mouseenter',()=>document.querySelectorAll('.pz-i').forEach(x=>x.classList.toggle('on',x===b))));
addEventListener('keydown',e=>{if($('scr-pause').classList.contains('hidden'))return;const it=[...document.querySelectorAll('.pz-i')],k=it.findIndex(x=>x.classList.contains('on'));
 if(e.code==='ArrowDown'||e.code==='ArrowUp'||e.code==='KeyW'||e.code==='KeyS'){const n=(k+((e.code==='ArrowDown'||e.code==='KeyS')?1:-1)+it.length)%it.length;it.forEach((x,i)=>x.classList.toggle('on',i===n));e.preventDefault();}
 else if(e.code==='Enter'||e.code==='Space'){(it[k]||it[0]).click();e.preventDefault();}});
const PZ_SC={house:1,road:2,apt:3,motel:4,air:5,school:6,hosp:7,park:8,mall:9};
function fillPause(){const c=$('sc'+(PZ_SC[G.lvl]||1));$('pz-tt').textContent=c?c.querySelector('.tt').textContent:'';$('pz-fa').textContent=c?c.querySelector('.fa').textContent:'';
 $('pz-ts').textContent=$('bc-t').textContent;$('pz-obj').innerHTML=$('obj').innerHTML;$('pz-time').textContent=fmtT(G.stats.time);
 document.querySelectorAll('.pz-i').forEach(x=>{x.classList.toggle('on',x.id==='p-res');x.classList.remove('warn');x.querySelector('small').textContent=x.id==='p-res'?'ESC':'';});
 $('pz-sq').innerHTML=G.squad.filter(Boolean).map(s=>'<div class="'+(!s.alive?'k':s.wounded&&!s.treated?'r':'')+'">'+s.name+'<span>'+(!s.alive?'KIA':s.wounded&&!s.treated?'RANNY':s.wounded?'OPATRZONY':'OK')+'</span></div>').join('');
 $('pz-log').innerHTML=(G.log||[]).slice(-5).map(l=>'<div><b>'+fmtT(l[0])+'</b>'+l[1]+'</div>').join('')||'<div>—</div>';}
$('d-rst').onclick=()=>{startMission();};$('d-scen').onclick=()=>{G.running=false;$('hud').classList.add('hidden');radioClear();showScreen('scen');};$('d-menu').onclick=()=>{G.running=false;$('hud').classList.add('hidden');radioClear();showScreen('menu');};
$('o-vol').oninput=e=>setVol(e.target.value/100);
const VMODE={static:'trzaski krótkofalówki',tts:'synteza mowy',off:'tylko napisy'};$('o-voice').onclick=()=>{A.voice=A.voice==='static'?'tts':A.voice==='tts'?'off':'static';$('o-voice').textContent='Głos radia: '+VMODE[A.voice];if(A.voice!=='tts'&&'speechSynthesis' in window)speechSynthesis.cancel();SND.click();};
$('o-tilt').onclick=()=>{G.tilt=G.tilt===false;$('o-tilt').textContent='Kamera pod kątem: '+(G.tilt===false?'wył.':'wł.');SND.click();};
$('o-crt').onclick=()=>{const c=$('crt');c.classList.toggle('off');$('o-crt').textContent='Efekt CRT: '+(c.classList.contains('off')?'wył.':'wł.');};
// back from controls during pause
$('scr-ctrl').querySelector('[data-go]').addEventListener('click',e=>{if(G.paused){e.stopImmediatePropagation();showScreen('pause');}},true);
function showDebrief(){$('hud').classList.add('hidden');closeCtx();if(isPat()){LD().debrief();return;}const s=G.stats,ne=G.enemies.length;
 let score=G.win?100:0;score-=s.squadLost*15;score-=s.civKilled*30;score+=s.reports*3;score-=s.roe*15;score+=s.traps*4;score+=(s.eArrest+s.eSed)*6;if(!G.alarm)score+=15;if(G.win)score+=Math.max(0,15-Math.floor(s.time/60)*2);
 const rank=!G.win?'F':score>=125?'S':score>=105?'A':score>=85?'B':score>=60?'C':'D';
 debFill(rank,score,[['Czas operacji',fmtT(s.time)],['Napastnicy zabici',s.eKilled+' / '+ne],['Napastnicy zatrzymani',s.eArrest],['Napastnicy uśpieni',s.eSed],['Cywile skuci / uśpieni',s.civSecured],['Cywile zabici',s.civKilled,s.civKilled?'bad':''],['Straty w oddziale',s.squadLost+' / '+G.squad.filter(Boolean).length,s.squadLost?'bad':''],['Ranni / opatrzeni',s.wounded+' / '+s.healed],['Zgłoszenia do dowództwa',s.reports+' / '+(s.reports+G.units.filter(o=>reportable(o)).length)],['Nieuprawnione użycie siły',s.roe,s.roe?'bad':''],['Oddane strzały',s.shots],['Alarm',G.alarm?'podniesiony':'pełne zaskoczenie',G.alarm?'bad':'good']]);}
function debFill(rank,score,rows){const sc=$('scr-deb'),c=$('sc'+(PZ_SC[G.lvl]||1));sc.classList.toggle('fail',!G.win);
 $('deb-h').textContent=G.win?'MISJA ZAKOŃCZONA':'MISJA NIEUDANA';$('deb-h').style.color='';$('db-stat').textContent=G.win?'ZAMKNIĘTE':'NIEUDANE';$('db-no').textContent=(LD().nb&&LD().nb.no)||'#26-097-0042';
 $('db-tt').textContent=c?c.querySelector('.tt').textContent:'';$('db-fa').textContent=c?c.querySelector('.fa').textContent:'';$('db-rs').textContent=G.reason||'';
 let nS=G.win?({S:4,A:3,B:2,C:1,D:1}[rank]||0):0;const s_=G.stats,why=[],cap=(n,t)=>{if(nS>n){nS=n;}why.push(t);};
 if(G.win){const hum=(G.squad||[]).filter(u=>u&&u.human);
  if(hum.some(u=>!u.alive))cap(1,'zginąłeś w akcji');else if((s_.pHit||0)>=2)cap(2,'ranny '+s_.pHit+'×');else if(s_.pHit)cap(3,'zostałeś ranny');
  if(s_.squadLost)cap(2,'strata w zespole');else if((s_.sqHit||0)-(s_.pHit||0)>0)cap(3,'ranny członek zespołu');
  if(s_.civKilled)cap(1,'zginął cywil z waszej ręki');if(s_.roe)cap(2,'nieuprawnione użycie siły');
  const L=['F','D','C','B','A','S'];const rk={0:'F',1:'C',2:'B',3:'A',4:'S'}[nS];if(rk&&L.indexOf(rk)<L.indexOf(rank))rank=rk;}
 const stE=$('db-stars');stE.title=why.join(' · ');$('db-why').textContent=why.length&&G.win?'Ocena obniżona: '+why.join(' · '):'';stE.innerHTML=[0,1,2,3].map(i=>'<i class="'+(i<nS?'on':'')+'">★</i>').join('');[...stE.children].forEach((x,i)=>setTimeout(()=>{x.classList.add('in');if(i<nS&&A.ctx){const o=ui(.25);if(o)tone(o,A.ctx.currentTime,.18,{f:660*Math.pow(1.26,i),g:.5,type:'triangle'});}},350+i*260));
 try{const k='bm_stars_'+G.lvl,old=+localStorage.getItem(k)||0;if(nS>old)localStorage.setItem(k,nS);}catch(e){}scStars();
 const r=$('deb-r');r.textContent=rank;r.className='db-rk r-'+rank;$('db-pt').textContent=score+' PKT';$('db-tm').textContent='CZAS '+fmtT(G.stats.time);
 $('deb-st').innerHTML=rows.map(x=>'<div'+(x[2]?' class="'+x[2]+'"':'')+'>'+x[0]+'<span>'+x[1]+'</span></div>').join('');
 $('deb-log').innerHTML=G.log.map(l=>'<div><span>'+fmtT(l[0])+'</span>'+l[1]+'</div>').join('');
 document.querySelectorAll('#scr-deb .mm-i').forEach((x,i)=>x.classList.toggle('on',i===0));showScreen('deb');setTimeout(()=>{const L=$('deb-log');L.scrollTop=L.scrollHeight;},30);}

// ================= LOOP =================
function resize(){const s=Math.min(innerWidth/VW,innerHeight/VH);wrap.style.width=VW*s+'px';wrap.style.height=VH*s+'px';wrap.style.setProperty('--u',(VW*s/480)+'px');}
addEventListener('resize',resize);resize();
buildMap();bakeWorld();
let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(G.running&&!G.paused&&G.squad)for(const q of G.squad)if(q&&q.drawCd>0)q.drawCd-=dt;
 const still=!G.running&&$('scr-menu').classList.contains('hidden');
 try{let blur=G.running||still?'none':'blur(1.6px) saturate(.65) brightness(.75)';if(G.running&&G.pDead){const k=Math.min(1,(G.time-G.pDeadT)/1.6);blur='grayscale('+k.toFixed(2)+') brightness('+(1-k*.35).toFixed(2)+') contrast('+(1+k*.15).toFixed(2)+')';}if(cv.style.filter!==blur)cv.style.filter=blur;const tf=!G.running?(still?cv.style.transform:menuSway()):tiltOn()?'perspective('+(TILT.p*wrap.clientHeight)+'px) rotateX('+(TILT.th*180/Math.PI)+'deg) scale('+TILT.k+')':'none';if(cv.style.transform!==tf){cv.style.transform=tf;$('monov').style.transform=G.running?'none':tf;}if(G.running){if(!G.paused)update(dt);render();}else{if(!still||!G.menuDrawn){renderMenu(dt);if(still){const c=ctx;c.save();c.setTransform(1,0,0,1,0,0);c.filter='blur(.45px) saturate(.65) brightness(.75)';c.drawImage(cv,0,0);c.restore();}G.menuDrawn=1;}if(!$('scr-brief').classList.contains('hidden')){if(isPat()){callUpdate(dt);drawWave();}else drawPlan($('brief-map'),false,G.entry);}else if(CALLS.on)stopCall();}}catch(err){console.error(err);}
 requestAnimationFrame(frame);}
requestAnimationFrame(frame);
document.addEventListener('click',()=>audioInit(),{once:false});
