// ================= UNITS =================
const WEAP={
 rifle:{n:'Karabinek M4A1',mag:30,rate:.11,auto:1,spread:.035,range:22,snd:'rifle',rl:2.2,pel:1,noise:22,len:9,thick:1},
 smg:{n:'PM MP5',mag:30,rate:.085,auto:1,spread:.05,range:18,snd:'smg',rl:2,pel:1,noise:18,len:7,thick:1},
 shotgun:{n:'Strzelba M870',mag:7,rate:.75,auto:0,spread:.13,range:11,snd:'shotgun',rl:3,pel:7,noise:24,len:9,thick:1},
 pistol:{n:'Glock 17',mag:17,rate:.2,auto:0,spread:.045,range:16,snd:'pistol',rl:1.6,pel:1,noise:16,len:5},
 silenced:{n:'Broń z tłumikiem',mag:15,rate:.22,auto:0,spread:.03,range:16,snd:'silenced',rl:1.6,pel:1,noise:3,len:7},
 eRifle:{n:'AK',mag:30,rate:.15,auto:1,spread:.085,range:18,snd:'enemy',rl:2.6,pel:1,noise:22,len:9,thick:1},
 ePistol:{n:'Broń krótka',mag:12,rate:.4,auto:0,spread:.08,range:14,snd:'epistol',rl:1.8,pel:1,noise:18,len:5},
};
const SPECS=[
 {id:'lead',name:'SGT. WALKER',role:'Team Leader',weap:'rifle',fov:74,range:9,acc:'#c9b458',ab:'Okrzyk „Policja! Na ziemię!” — cywile się poddają, zaskoczeni lub oszołomieni napastnicy mogą rzucić broń.',ps:'Lider oddziału. Rozkazy, zatrzymania.'},
 {id:'breach',name:'CPL. HAYES',role:'Breacher',weap:'shotgun',fov:68,range:8,acc:'#c0583a',ab:'Ładunek wyważający (×2) — niszczy drzwi i ogłusza wszystkich po drugiej stronie.',ps:'Najszybciej wyważa drzwi kopniakiem.'},
 {id:'tech',name:'OFC. MASON',role:'Tech',weap:'silenced',fov:72,range:9,acc:'#4fb0a8',ab:'Kamera światłowodowa — podgląd pomieszczenia za zamkniętymi drzwiami.',ps:'Cicho otwiera zamki wytrychem. Broń z tłumikiem.'},
 {id:'medic',name:'OFC. REYES',role:'Medic',weap:'smg',fov:72,range:9,acc:'#d8d8d8',ab:'Strzykawka z sedatywem (×4) — obezwładnia z bliska: pacjenta, napastnika od tyłu, oszołomionego lub poddanego.',ps:'Uspokaja pacjentów.'},
 {id:'scout',name:'OFC. GRANT',role:'Pointman',weap:'rifle',fov:92,range:11,acc:'#7aa35a',ab:'Granat hukowy (×3) — oślepia i ogłusza wszystkich w zasięgu wzroku wybuchu.',ps:'Najszersze i najdalsze pole widzenia.'},
];
const PAL={
 squad:{body:'#2b3139',vest:'#1d2228',legs:'#252a30',head:'#2a3036',face:'#a87c62',visor:'#0c0f12',glove:'#151515'},
 enemy:{body:'#3b2f27',legs:'#20252f',head:'#141414',face:'#141414',visor:'#a8806a',glove:'#2a2a2a',acc:'#8a1c1c'},
 enemy2:{body:'#2c2f2a',legs:'#262a22',head:'#141414',face:'#141414',visor:'#a8806a',glove:'#2a2a2a',acc:'#8a1c1c'},
 boss:{body:'#4a3a2c',legs:'#22262e',head:'#c09070',face:'#c09070',visor:'#2a1a12',cap:'#1c1c1c',glove:'#2a2a2a',acc:'#8a1c1c',eyes:1},
 nurse:{body:'#bfc9cc',legs:'#bfc9cc',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',hair:'#3a2a20',skin:'#c8a080',eyes:1},
 doctor:{body:'#dcded9',legs:'#2a2a35',head:'#c09878',face:'#c09878',visor:'#2a2a2a',hair:'#8a8a8a',skin:'#c09878',eyes:1},
 janitor:{body:'#4f5a4a',legs:'#3c4438',head:'#a07a5a',face:'#a07a5a',visor:'#2a1a12',hair:'#2a2018',skin:'#a07a5a',eyes:1},
 patient:{body:'#8ea5b6',legs:'#c4a68a',head:'#cdb39b',face:'#cdb39b',visor:'#3a2a20',hair:'#5a4a3a',skin:'#cdb39b',eyes:1},
 police:{body:'#1e2a44',legs:'#1a2234',head:'#a07a5a',face:'#a07a5a',visor:'#2a1a12',cap:'#141a28',skin:'#a07a5a',acc:'#d8b048',eyes:1},
 patrolA:{body:'#26324c',legs:'#1c2438',head:'#c49a7c',face:'#c49a7c',visor:'#2a1a12',hair:'#3a2a1a',skin:'#c49a7c',glove:'#c49a7c',acc:'#d8b048',eyes:1},
 patrolB:{body:'#26324c',legs:'#1c2438',head:'#8a6448',face:'#8a6448',visor:'#1a100a',hair:'#141010',skin:'#8a6448',glove:'#8a6448',acc:'#d8b048',eyes:1},
 guard:{body:'#2a3550',legs:'#222a3a',head:'#a07a5a',face:'#a07a5a',visor:'#2a1a12',hair:'#222',skin:'#a07a5a',eyes:1},
 cook:{body:'#d8d8d0',legs:'#3a3a3a',head:'#c09878',face:'#c09878',visor:'#2a2a2a',hair:'#e8e8e0',skin:'#c09878',eyes:1},
 orderly:{body:'#6f9a86',legs:'#6f9a86',head:'#b08868',face:'#b08868',visor:'#2a1a12',hair:'#3a2a1a',skin:'#b08868',eyes:1},
 director:{body:'#474c55',vest:'#d6d6ce',legs:'#363a42',head:'#c09a80',face:'#c09a80',visor:'#2a2a2a',hair:'#6a6a6a',skin:'#c09a80',eyes:1},
};
let UID=0;
class Unit{constructor(o){this.id=UID++;this.x=0;this.y=0;this.vx=0;this.vy=0;this.ang=0;this.heading=-Math.PI/2;this.alive=true;this.r=4.5;
 this.walkP=0;this.stride=0;this.moving=false;this.mdx=0;this.mdy=1;this.pose='stand';this.human=0;this.fov=100;this.range=8;this.stun=0;
 this.state='idle';this.path=null;this.repath=0;this.fireCd=0;this.rel=0;this.react=0;this.target=null;this.task=null;this.ico='';this.icoT=0;
 this.deathT=0;this.recoil=0;this.perT=Math.random()*.1;this.quiet=false;this.action=null;this.burst=0;this.burstCd=0;this.lostT=0;this.seeT=false;this.spd=46;
 this.visNow=false;this.everSeen=false;this.stuck=0;
 Object.assign(this,o);if(this.weap){this.W=WEAP[this.weap];this.mag=this.W.mag;this.res=this.W.mag*(this.team==='squad'?4:2);}}
 active(){return this.alive&&this.stun<=0&&this.pose!=='sleep'&&this.state!=='surr'&&this.state!=='cuffed';}
}
function visionPoly(u){const pts=[],R=u.range*TS,r0=TS*1.15,half=u.fov*Math.PI/360,ext=9;
 const n=Math.ceil(u.fov/1.6);for(let i=0;i<=n;i++){const a=u.ang-half+2*half*i/n,d=castRay(u.x,u.y,a,R,ext);pts.push(u.x+Math.cos(a)*d,u.y+Math.sin(a)*d);}
 const m=16;for(let i=0;i<=m;i++){const a=u.ang+half+(2*Math.PI-2*half)*i/m,d=castRay(u.x,u.y,a,r0,ext);pts.push(u.x+Math.cos(a)*d,u.y+Math.sin(a)*d);}
 u.vis=pts;}
function canSee(s,x,y,fov,range){const dx=x-s.x,dy=y-s.y,d=Math.hypot(dx,dy);range=(range||s.range)*TS;if(d>range+6)return false;
 if(d>TS*1.25&&Math.abs(angDiff(s.ang,Math.atan2(dy,dx)))>(fov||s.fov)*Math.PI/360)return false;return losClear(s.x,s.y,x,y);}
function seenBySquad(e){for(const s of G.squad)if(s.alive&&canSee(s,e.x,e.y))return true;return false;}
function turnTo(u,a,dt,spd){const d=angDiff(u.ang,a);u.ang+=clamp(d,-spd*dt,spd*dt);}
function moveUnit(u,dt,wx,wy,spd){if(u.wounded)spd*=u.treated?.85:.62;if(u.shield)spd*=.8;if(u.armor==='heavy')spd*=.9;const k=1-Math.exp(-11*dt);u.vx+=(wx*spd-u.vx)*k;u.vy+=(wy*spd-u.vy)*k;
 if(Math.abs(u.vx)<.5&&!wx)u.vx=0;if(Math.abs(u.vy)<.5&&!wy)u.vy=0;
 const ox=u.x,oy=u.y;
 let nx=u.x+u.vx*dt;if(!collides(nx,u.y,u.r))u.x=nx;else{ // corner nudge
  if(!collides(nx,u.y-2,u.r)&&wy<=0&&Math.abs(u.vx)>Math.abs(u.vy))u.y-=Math.min(2,spd*dt);else if(!collides(nx,u.y+2,u.r)&&wy>=0&&Math.abs(u.vx)>Math.abs(u.vy))u.y+=Math.min(2,spd*dt);else u.vx*=.3;}
 let ny=u.y+u.vy*dt;if(!collides(u.x,ny,u.r))u.y=ny;else{
  if(!collides(u.x-2,ny,u.r)&&wx<=0&&Math.abs(u.vy)>Math.abs(u.vx))u.x-=Math.min(2,spd*dt);else if(!collides(u.x+2,ny,u.r)&&wx>=0&&Math.abs(u.vy)>Math.abs(u.vx))u.x+=Math.min(2,spd*dt);else u.vy*=.3;}
 if(collides(u.x,u.y,u.r-.5)&&!collides(ox,oy,u.r-.5)){u.x=ox;u.y=oy;}
}
function unstick(u){if(!collides(u.x,u.y,u.r))return;for(let r=2;r<40;r+=2)for(let a=0;a<6.28;a+=.5){const x=u.x+Math.cos(a)*r,y=u.y+Math.sin(a)*r;if(!collides(x,y,u.r)){u.x=x;u.y=y;return;}}}
function muzzle(u){return{x:u.x+Math.cos(u.ang)*7,y:u.y-2+Math.sin(u.ang)*7};}
function startReload(u){if(u.rel>0||u.mag>=u.W.mag||u.res<=0)return;u.rel=u.W.rl;SND.reload(u.x,u.y,u.W.snd);}
function fire(u){const W=u.W;if(!W||u.rel>0||u.fireCd>0||!u.active())return false;if(u.holster){if(u.human&&!(u.drawCd>0)){setHolster(false);u.drawCd=.45;}return false;}if(u.drawCd>0)return false;
 if(u.mag<=0){if(u.human){SND.dry(u.x,u.y);u.fireCd=.3;}startReload(u);return false;}
 // muzzle inside wall check
 const mz=muzzle(u);if(bulletBlock(mz.x/TS|0,mz.y/TS|0)&&!bulletBlock(u.x/TS|0,(u.y-2)/TS|0)){/*point blank wall*/}
 u.fireCd=W.rate;u.mag--;u.recoil=1;if(u.team==='enemy')raiseAlarm('shots');if(u.team==='squad')G.stats.shots++;
 const mv=Math.hypot(u.vx,u.vy)/50;const spread=W.spread*(1+mv*1.1)*(u.team==='squad'&&!u.human?.75:1)*(u.quiet?.8:1)*(u.wounded&&!u.treated?1.6:1);
 const ox=u.x+Math.cos(u.ang)*4,oy=u.y-2+Math.sin(u.ang)*4;
 for(let p=0;p<W.pel;p++)hitscan(u,ox,oy,u.ang+(Math.random()-.5)*2*spread,W.range*TS);
 SND.gun(W.snd,u.x,u.y);makeNoise(u.x,u.y,W.noise,W.noise>8?'shot':'quiet',u);
 G.fx.push({k:'mflash',x:u.mzx||mz.x,y:u.mzy||mz.y-6,a:u.ang,t:0,life:.05,big:W.pel>1});
 if(W.snd!=='silenced')G.lights.push({x:mz.x,y:mz.y,r:W.pel>1?60:48,t:.07});else G.lights.push({x:mz.x,y:mz.y,r:18,t:.04});
 u.heat=Math.min(4,(u.heat||0)+(W.pel>1?1.2:.35));const sx=u.mzx||mz.x,sy=u.mzy||mz.y-6;
 for(let i=0;i<(W.pel>1?5:2);i++)G.fx.push({k:'smoke',x:sx,y:sy,vx:Math.cos(u.ang)*rand(8,25)+rand(-6,6),vy:Math.sin(u.ang)*rand(5,18)-rand(4,10),r:rand(1.5,3),gr:rand(5,9),a:W.snd==='silenced'?.12:.32,t:0,life:rand(.7,1.4),c:'#9a9c9a'});
 if(W.pel===1||u.weap==='shotgun'){const ea=u.ang+Math.PI/2*(Math.cos(u.ang)>0?-1:1),del=u.weap==='shotgun';G.fx.push({k:'shell',x:u.x+Math.cos(u.ang)*3,y:u.y-1,z:9,vx:Math.cos(ea)*rand(30,55),vy:Math.sin(ea)*rand(10,25)-15,vz:rand(40,70),t:0,life:rand(.6,.9),red:del});}
 return true;}
function hitscan(sh,x0,y0,a,maxD){const dx=Math.cos(a),dy=Math.sin(a);let x=x0,y=y0,d=0,hit=null;
 if(bulletBlock(x0/TS|0,y0/TS|0)){x0=sh.x;y0=sh.y-2;x=x0;y=y0;}
 while(d<maxD){x+=dx*2;y+=dy*2;d+=2;const tx=x/TS|0,ty=y/TS|0;
  if(bulletBlock(tx,ty)){impact(x-dx*2,y-dy*2,tx,ty,a);break;}
  for(const u of G.units){if(!u.alive||u===sh||u.pose==='sleep')continue;const cy=u.y-2,rr=u.pose==='inbed'?3.6:(u.pose==='kneel'||u.pose==='hands'||u.pose==='sit')?4.2:5.2;
   if((u.x-x)**2+(cy-y)**2<(rr+(u.shield?2:0))**2){if(u.shield&&Math.abs(angDiff(u.ang,a+Math.PI))<1.05){for(let i=0;i<5;i++)G.fx.push({k:'spark',x,y:y-6,vx:rand(-60,60),vy:rand(-60,60),t:0,life:.15});SND.clang(x,y);hit='shield';break;}hit=u;break;}}
  if(hit)break;}
 if(hit==='shield'){G.tracers.push({x0,y0:y0-6,x1:x,y1:y-6,t:0,e:sh.team==='enemy'});return;}
 G.tracers.push({x0,y0:y0-6,x1:x,y1:y-6,t:0,e:sh.team==='enemy'});
 if(hit){if(hit.kind==='director'&&sh.team==='squad')G.stats.hostageHit=1;kill(hit,sh,a);}}
function impact(x,y,tx,ty,a){const t0=tAt(tx,ty),brick=tAt(tx,ty+1)===T.GRASS||tAt(tx,ty+1)===T.ASPH,chip=t0===T.DOOR?'#6b4a32':brick?'#7a4a3a':'#a7afa6';
 for(let i=0;i<5;i++)G.fx.push({k:'spark',x,y:y-6,vx:rand(-60,60)-Math.cos(a)*40,vy:rand(-60,60)-Math.sin(a)*40,t:0,life:rand(.08,.2)});
 for(let i=0;i<7;i++)G.fx.push({k:'debris',x,y:y-6,z:0,vx:rand(-45,45)-Math.cos(a)*50,vy:rand(-45,45)-Math.sin(a)*50,vz:rand(10,45),t:0,life:rand(.3,.7),c:chip});
 for(let i=0;i<4;i++)G.fx.push({k:'smoke',x:x-Math.cos(a)*3,y:y-6-Math.sin(a)*3,vx:-Math.cos(a)*rand(6,18)+rand(-8,8),vy:-Math.sin(a)*rand(6,18)-rand(2,8),r:rand(1.5,3),gr:rand(6,12),a:.4,t:0,life:rand(.8,1.6),c:brick?'#8a6a5a':'#b4b8b2'});
 const t=tAt(tx,ty);if(t===T.WIN){SND.glass(x,y);}
 // bullet hole decal on world canvas
 const hx=Math.round(x),hy=Math.round(y-6);if((t0===T.WALL||t0===T.WIN)&&WR[ty]){const g=WR[ty].getContext('2d'),face=!isWallT(tx,ty+1),ly=face?16+((Math.random()*9)|0):2+((Math.random()*12)|0);P(g,hx-1,ly-1,3,3,'rgba(200,205,195,.35)');P(g,hx,ly,2,2,'#111');return;}P(wc,hx-1,hy-1,3,3,'rgba(200,205,195,.35)');P(wc,hx,hy,2,2,'#111');if(Math.random()<.5)P(wc,hx+2,hy+1,1,1,'#2a2a2a');}
function bloodPool(x,y,r,rr){rr=rr||Math.random;for(let i=0;i<r*2.2;i++){const a=rr()*6.28,d=rr()*r,w=1+((rr()*3)|0);P(wc,Math.round(x+Math.cos(a)*d*1.3),Math.round(y+Math.sin(a)*d*.8),w,Math.max(1,w-1),rr()<.7?'#3a0b0b':'#4c1010');}
 P(wc,Math.round(x-r*.5),Math.round(y-1),Math.round(r),2,'#2c0707');}
function woundUnit(u,by,a){u.wounded=true;u.treated=false;u.bleed=110;u.stun=Math.max(u.stun,.5);u.dripT=0;SND.hurt(u.x,u.y);bloodPool(u.x,u.y,2.5);G.stats.wounded++;
 if(u.human){G.hurtF=1;G.shake=.3;}radio(u.name,pick(['Dostałem! Jestem ranny!','Trafiony... dam radę!','Ranny! Potrzebuję medyka!','Kurwa, dostałem w ramię!']),{prio:1});}
function kill(u,by,a){if(!u.alive)return;
 if(u.team==='squad'&&!u.wounded&&!u.noWound&&Math.random()<(u.armor==='heavy'?.65:.4)){woundUnit(u,by,a);logEv(u.name+' ranny ('+roomName(u.x,u.y)+')');return;}
 if(u.team==='enemy'&&by&&by.team==='squad'&&(u.state==='surr'||u.state==='cuffed'||u.pose==='sleep'||(u.stun>0&&!u.target))){G.stats.roe++;logEv('NIEUPRAWNIONE UŻYCIE SIŁY: '+by.name+' ('+roomName(u.x,u.y)+')');setTimeout(()=>radio('TOC','Nieuprawnione użycie siły! Podejrzany nie stanowił zagrożenia.',{prio:1}),600);}u.alive=false;u.deathT=0;u.fallA=a||0;u.pose='dead';u.target=null;u.action=null;u.task=null;
 u.vx=Math.cos(a||0)*45;u.vy=Math.sin(a||0)*45;SND.body(u.x,u.y);u.mseed=Math.random()*1000|0;
 for(let i=0;i<5;i++)G.fx.push({k:'dust',x:u.x,y:u.y-6,vx:rand(-25,25),vy:rand(-30,10),t:0,life:.35,c:'#5d5a52'});
 const byS=by&&by.team==='squad';
 if(u.team==='enemy'){onEnemyDown(u);logEv((by&&by.name||'?')+' zneutralizował napastnika ('+roomName(u.x,u.y)+')');}
 if(u.team==='squad')logEv(u.name+' KIA ('+roomName(u.x,u.y)+')');else if(u.team==='civ'&&u.kind!=='director')logEv('Zginął cywil ('+roomName(u.x,u.y)+')');
 if(u.team==='enemy'){G.stats.eKilled++;if(byS)radio(by.name,pick(['Wróg zneutralizowany.','Cel trafiony.','Napastnik leży.','Jeden mniej.']));}
 else if(u.team==='squad'){G.stats.squadLost++;const al=G.squad.find(s=>s.alive);radio(al?al.name:'TOC',pick([u.name+' padł!',u.name+' nie żyje!','Mamy stratę! '+u.name+'!']),{prio:1});onSquadDeath(u);}
 else if(u.kind==='director'){onHostageDeath(by);}
 else{G.stats.civKilled++;if(byS)radio('TOC','Trafiliście cywila! Wstrzymać ogień!',{prio:1});}}
function lineSafe(u,t){const ax=u.x,ay=u.y,bx=t.x,by=t.y,L=Math.hypot(bx-ax,by-ay);
 for(const f of G.units){if(f===u||f===t||!f.alive)continue;if(f.team==='enemy'&&f.active())continue;
  const px=f.x-ax,py=f.y-ay,pr=(px*(bx-ax)+py*(by-ay))/L;if(pr<0||pr>L+8)continue;const pd=Math.abs(px*(by-ay)-py*(bx-ax))/L;if(pd<9)return false;}return true;}
function makeNoise(x,y,rad,kind,src){
 if(src&&src.team==='enemy'&&kind!=='boom')return;
 for(const e of G.enemies){if(!e.active())continue;const d=dist(x,y,e.x,e.y)/TS,l=losClear(x,y,e.x,e.y),eff=l?rad:rad*.5;
  if(d<eff){if(kind==='shot'||kind==='boom'||kind==='kick')raiseAlarm('noise');
   if(!e.target&&!e.boss&&e.state!=='combat'){e.state='investigate';e.goal={x:x+rand(-10,10),y:y+rand(-10,10)};e.path=null;e.searchT=rand(4,7);e.ico='?';e.icoT=2.5;}
   else if(e.boss&&!e.target){e.ang=Math.atan2(y-e.y,x-e.x);e.ico='?';e.icoT=2;}}}
 if(kind==='shot'||kind==='boom'){let near=[];for(const c of G.civs){if(!c.alive)continue;const d=dist(x,y,c.x,c.y);if(d>TS*16)continue;near.push(c);
   if(c.kind==='patient'&&c.state==='wander'&&d<TS*12){c.state='panic';c.panicT=rand(5,9);}else if(c.state==='work'&&d<TS*14){c.state='hide';c.pose='kneel';}}
  if(near.length&&G.time>G.panicCD){G.panicCD=G.time+rand(1.4,3);const c=pick(near);SND.scream(c.x,c.y,.28);if(near.length>2)setTimeout(()=>{const c2=pick(near);SND.scream(c2.x,c2.y,.22);},rand(250,600));if(near.some(c=>c.kind==='mother'))G.babyT=Math.min(G.babyT,.4);}}}

// ================= DRAW HUMANS =================
function drawHuman(g,u,sx,sy){const SQ=u.team==='squad'&&!u.patrol;const p=u.pal,a=u.ang,ca=Math.cos(a),sa=Math.sin(a);if(u.team==='civ'&&u.alive&&(u.state==='hide'||u.state==='comply'||u.state==='panic')&&Math.random()<.5)sx+=Math.random()<.5?-1:1;sx=Math.round(sx);sy=Math.round(sy);
 if(!u.alive){drawBody(g,u,sx,sy);return;}
 if(u.pose==='inbed'){P(g,sx-3,sy-6,6,5,p.head);if(p.hair)P(g,sx-3,sy-6,6,2,p.hair);P(g,sx-2,sy-3,1,1,'#2a1a12');P(g,sx+1,sy-3,1,1,'#2a1a12');P(g,sx-4,sy-1,8,3,p.body);if(u.kind==='mother'){P(g,sx-1,sy-1,4,3,'#ecd8e4');P(g,sx,sy-1,2,2,'#d8b098');}if(u.stun>0||G.alarm&&Math.random()<.3)P(g,sx-5+((Math.random()*2)|0),sy-2,1,2,p.head);return;}
 if(G.voxChars&&u.pose!=='sleep'&&u.pose!=='sit'){drawVox(g,u,sx,sy);const hy=sy-(u.pose==='kneel'||u.pose==='hands'?14:18);
  if(u.team==='squad'&&u.wounded){if(u.treated)P(g,sx-1,hy+6,1,2,'#e8e8e0');else if(((G.time*3)|0)%2)P(g,sx-1,hy+8,2,2,'#9a1414');}
  if(u.kind==='director'&&u.state==='tied'){P(g,sx-5,hy+7,10,1,'#a08a5a');P(g,sx-5,hy+9,10,1,'#a08a5a');}
  if(u.phoneUp){const px=sx+(Math.cos(u.ang)<0?-4:3);P(g,px,hy+1,2,4,'#141416');P(g,px,hy+1,1,1,'#5a8ab8');P(g,px+(Math.cos(u.ang)<0?1:0),hy+4,1,2,u.pal.skin||'#c49a7c');}
  if(u.stun>0&&((G.time*6)|0)%2){P(g,sx-5,hy-3,1,1,'#ffe');P(g,sx+4,hy-2,1,1,'#ffe');P(g,sx,hy-4,1,1,'#ffe');}
  return;}
 P(g,sx-4,sy-1,9,3,'rgba(0,0,0,.45)');
 if(u.pose==='sleep'){P(g,sx-7,sy-4,12,5,p.body);P(g,sx+5,sy-5,5,5,p.head);P(g,sx-9,sy-3,3,4,p.legs);if(p.hair)P(g,sx+7,sy-5,3,5,p.hair);
  if(((G.time*1.5)|0)%2)P(g,sx+9,sy-11,3,1,'#9ab'),P(g,sx+11,sy-10,1,1,'#9ab'),P(g,sx+9,sy-9,3,1,'#9ab');return;}
 const walk=u.moving?Math.sin(u.walkP):0,bob=u.moving?Math.round(Math.abs(Math.sin(u.walkP))*(u.wounded&&!u.treated&&Math.sin(u.walkP)>0?2:1)):0;
 const low=u.pose==='kneel'||u.pose==='hands'?3:u.pose==='sit'?2:0;
 if(u.pose==='sit'){P(g,sx-5,sy-8,10,8,'#3a3e43');P(g,sx-5,sy-12,10,4,'#2c3035');}
 if(low){P(g,sx-3,sy-3,3,3,p.legs);P(g,sx+1,sy-3,3,3,p.legs);P(g,sx-3,sy-1,7,1,'#121212');}
 else{const ox=Math.round(walk*1.7*u.mdx),oy=Math.round(walk*1.4*u.mdy);
  P(g,sx-3+ox,sy-5+oy,3,5,p.legs);P(g,sx+1-ox,sy-5-oy,3,5,p.legs);P(g,sx-3+ox,sy-1+oy,3,1,'#111');P(g,sx+1-ox,sy-1-oy,3,1,'#111');
  if(SQ){P(g,sx-3+ox,sy-3+oy,3,1,'#3f4650');P(g,sx+1-ox,sy-3-oy,3,1,'#3f4650');P(g,sx+(ca<0?-4:3),sy-6,1,3,'#121416');}}
 const ty=sy-11+low-bob,behind=sa<-.25;
 if(behind)drawArms(g,u,sx,ty);
 P(g,sx-4,ty,8,7,p.body);P(g,sx-4,ty,8,1,shade(p.body,16));P(g,sx-4,ty+6,8,1,shade(p.body,-18));
 if(p.vest){P(g,sx-3,ty+1,6,4,p.vest);}
 if(SQ){const back=sa<-.35;
  if(back){P(g,sx-3,ty+2,6,2,'#d6d9d2');P(g,sx-2,ty+2,1,1,'#3a4048');P(g,sx,ty+3,1,1,'#3a4048');P(g,sx+2,ty+2,1,1,'#3a4048');P(g,sx-3,ty+4,6,2,'#1a1e23');}
  else{P(g,sx-3,ty+3,2,2,'#262b31');P(g,sx-1,ty+3,2,2,'#30363d');P(g,sx+1,ty+3,2,2,'#262b31');P(g,sx-3,ty+3,6,1,'#3a414a');P(g,sx-2,ty+1,4,1,'#15181c');}
  P(g,sx-4,ty+1,1,2,u.acc);P(g,sx+3,ty+1,1,2,u.acc);P(g,sx-4,ty+5,8,1,'#14171a');
  if(u.spec==='medic'){P(g,sx-1,ty+(back?4:1),3,3,'#e8e8e4');P(g,sx,ty+(back?4:1),1,3,'#c22');P(g,sx-1,ty+(back?5:2),3,1,'#c22');}
  if(u.spec==='lead'||u.spec==='tech')line(g,sx+(ca<0?2:-3),ty,sx+(ca<0?3:-4),ty-7,'#0c0d0f');
  if(u.spec==='breach'){P(g,sx+(ca<0?-4:2),ty+4,2,2,'#5a4a30');}
  if(u.wounded){if(u.treated)P(g,sx+(ca<0?3:-4),ty+2,1,2,'#e8e8e0');else if(((G.time*3)|0)%2)P(g,sx-1,ty+4,2,2,'#7a1010');}}
 else if(u.acc){P(g,sx+(ca<0?3:-4),ty+1,1,2,u.acc);}
 if(p.acc)P(g,sx+(ca<0?3:-4),ty+2,1,2,p.acc);
 const hy=ty-6;P(g,sx-3,hy,6,6,p.head);P(g,sx-3,hy,6,1,shade(p.head,18));if(SQ){P(g,sx-4,hy+1,8,2,p.head);P(g,sx-3,hy-1,6,1,shade(p.head,10));P(g,sx-4,hy+3,1,2,'#0e0f11');P(g,sx+3,hy+3,1,2,'#0e0f11');}
 if(p.hair){P(g,sx-3,hy,6,2,p.hair);if(!(sa>-.35))P(g,sx-3,hy,6,5,p.hair);}
 if(sa>-.35&&SQ){const fx=sx-2+Math.round(ca*1.3);P(g,fx,hy+2,4,3,'#1e2226');P(g,fx,hy+2,4,1,'#08090b');P(g,fx+(ca>0?3:0),hy+2,1,1,'#6a8fa5');P(g,sx-1+Math.round(ca*2),hy,2,2,'#121417');}
 else if(sa>-.35){const fx=sx-2+Math.round(ca*1.3);P(g,fx,hy+2,4,3,p.face);if(p.eyes){P(g,fx,hy+2,1,1,p.visor);P(g,fx+3,hy+2,1,1,p.visor);}else P(g,fx,hy+2,4,1,p.visor);}
 else if(SQ){P(g,sx-2,hy+4,4,1,shade(p.head,-14));P(g,sx-1,hy+1,2,2,'#1a1d21');}
 if(p.cap){P(g,sx-3,hy,6,2,p.cap);if(sa>-.35)P(g,sx-3+Math.round(ca*2),hy+1,6,1,p.cap);}
 if(SQ){P(g,sx-3,hy+5,6,1,shade(p.head,-10));}
 if(!behind)drawArms(g,u,sx,ty);
 if(u.shield){const fx=sx+Math.round(ca*5),fy=ty+Math.round(sa*3);P(g,fx-3,fy-5,7,11,'#16191d');P(g,fx-3,fy-5,7,1,'#3a4048');if(sa>-.3)P(g,fx-2,fy-3,5,1,'#3a5468');P(g,fx-2,fy+2,5,1,'#d6d9d2');}
 if(u.pose==='hands'){P(g,sx-5,hy-3,2,6,p.skin||p.glove);P(g,sx+3,hy-3,2,6,p.skin||p.glove);}
 if(u.state==='cuffed'){P(g,sx-1,ty+5,3,1,'#bbb');}
 if(u.kind==='director'&&u.state==='tied'){P(g,sx-5,ty+2,10,1,'#a08a5a');P(g,sx-5,ty+4,10,1,'#a08a5a');}
 if(u.phoneUp){const px=sx+(Math.cos(u.ang)<0?-4:3);P(g,px,hy+1,2,4,'#141416');P(g,px,hy+1,1,1,'#5a8ab8');P(g,px+(Math.cos(u.ang)<0?1:0),hy+4,1,2,u.pal.skin||'#c49a7c');}
  if(u.stun>0&&((G.time*6)|0)%2){P(g,sx-5,hy-3,1,1,'#ffe');P(g,sx+4,hy-2,1,1,'#ffe');P(g,sx,hy-4,1,1,'#ffe');}
}
function drawArms(g,u,sx,ty){const p=u.pal,a=u.ang;
 if(u.holster&&u.W&&u.pose!=='hands'&&u.state!=='surr'){const ox=sx+Math.round(Math.cos(a)*2),oy=ty+3,ex=ox+Math.cos(a)*5,ey=oy+Math.sin(a)*3.75;line(g,ox,oy,ex,ey,'#3a3c40');P(g,Math.round(ex)-1,Math.round(ey)-1,2,2,'#c8c8c0');P(g,Math.round(ex+Math.cos(a)),Math.round(ey+Math.sin(a)*.75),1,1,'#fff8d8');P(g,Math.round(ox+Math.cos(a)*1.5)-1,Math.round(oy+Math.sin(a))-1,2,2,p.glove||'#222');P(g,sx+(Math.cos(a)<0?3:-4),ty+4,1,3,'#141416');u.mzx=ex+G.cam.rx;u.mzy=ey+G.cam.ry;return;}
 if(!u.W||u.pose==='hands'||u.pose==='sit'||u.state==='surr'){P(g,sx-5,ty+1,1,4,p.body);P(g,sx+4,ty+1,1,4,p.body);u.mzx=null;return;}
 const L=u.W.len-(u.recoil||0)*2,ox=sx+Math.round(Math.cos(a)*2),oy=ty+3;
 const ex=ox+Math.cos(a)*L,ey=oy+Math.sin(a)*L*.75;
 line(g,ox,oy,ex,ey,'#0b0b0d');if(u.W.thick)line(g,ox,oy+1,ox+Math.cos(a)*L*.55,oy+1+Math.sin(a)*L*.42,'#1d1d21');
 P(g,Math.round(ox+Math.cos(a)*1.5)-1,Math.round(oy+Math.sin(a))-1,2,2,p.glove||'#222');
 P(g,Math.round(ox+Math.cos(a)*L*.55)-1,Math.round(oy+Math.sin(a)*L*.41)-1,2,2,p.glove||'#222');
 u.mzx=ex+G.cam.rx;u.mzy=ey+G.cam.ry;}
function drawBody(g,u,sx,sy){const p=u.pal;
 if(u.deathT<.3){const k=u.deathT/.3;P(g,sx-4,sy-1,9,3,'rgba(0,0,0,.4)');P(g,sx-4,sy-9+k*5,8,7,p.body);P(g,sx-3,sy-14+k*8,6,5,p.head);return;}
 const hor=Math.abs(Math.cos(u.fallA))>.5;
 P(g,sx-8,sy-3,17,6,'rgba(0,0,0,.4)');
 if(hor){const s=Math.cos(u.fallA)>0?1:-1;P(g,sx-6,sy-4,12,5,p.body);P(g,sx+s*6-(s<0?4:0),sy-4,5,5,p.head);P(g,sx-s*9-(s>0?0:2),sy-3,3,3,'#111');}
 else{const s=Math.sin(u.fallA)>0?1:-1;P(g,sx-3,sy-8,7,10,p.body);P(g,sx-3,sy+(s>0?2:-12),6,4,p.head);}
 // censorship mosaic
 const seed=u.mseed+((G.time*10)|0),cols=[p.body,p.legs,p.head,'#5c1f1f','#3a1414','#2a2a2a','#6a6a6a','#4a4a44'];
 const w=hor?18:12,h=hor?10:16,x0=sx-w/2|0,y0=sy-(hor?8:12);
 for(let j=0;j<h;j+=2)for(let i=0;i<w;i+=2){const hh=Math.sin((i*12.9898+j*78.233+seed*.37))*43758.5453;P(g,x0+i,y0+j,2,2,cols[Math.floor((hh-Math.floor(hh))*cols.length)]);}
 P(g,x0,y0,w,1,'rgba(0,0,0,.35)');}
function drawIcon(g,c,sx,sy,col){g.fillStyle=col;
 if(c==='!'){g.fillRect(sx,sy,1,4);g.fillRect(sx,sy+5,1,1);}
 else if(c==='?'){g.fillRect(sx-1,sy,3,1);g.fillRect(sx+1,sy+1,1,1);g.fillRect(sx,sy+2,1,2);g.fillRect(sx,sy+5,1,1);}}
