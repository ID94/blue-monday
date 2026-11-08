
// ================= MISSION 02: MILE MARKER 41 (night traffic stop) =================
WEAP.eShot={n:'Strzelba',mag:5,rate:.95,auto:0,spread:.14,range:10,snd:'shotgun',rl:3,pel:7,noise:24,len:9,thick:1};
const ROAD_Y0=26,ROAD_Y1=31;
const ROOMS_ROAD=[];const DOORS_ROAD=[];const FURN_ROAD=[];
{const F_=(...a)=>FURN_ROAD.push(a),r=rng(41);
 for(let x=0;x<MW;x++){if(x%3!==2)F_('laneY',x,28);F_('laneW',x,26);F_('laneWb',x,31);}
 F_('police',33,32);F_('mm',41,24);F_('mm',13,24);F_('mm',69,24);
 for(let x=3;x<MW;x+=6){F_('post',x,34);F_('post',x+3,23);}
 const taken=new Set();const put=(k,x,y)=>{const key=x+','+y;if(taken.has(key))return;taken.add(key);F_(k,x,y);};
 for(let y=1;y<=20;y++)for(let x=1;x<MW-1;x++){const edge=y>17?.25:.55;if(x>=64&&x<=67)continue;if(r()<edge&&!(x>36&&x<46&&y>14))put('tree',x,y);else if(r()<.05)put('bush',x,y);}
 for(let y=38;y<=56;y++)for(let x=1;x<MW-1;x++){const edge=y<41?.22:.5;if(r()<edge)put('tree',x,y);else if(r()<.05)put('bush',x,y);}
 for(const[x,y]of[[66,36],[67,37],[69,36],[65,38],[70,38]])put('tree',x,y);
 for(let x=2;x<30;x+=1)if(x%5)F_('fence',x,22);
 for(const[x,y]of[[20,35],[52,35],[58,24],[8,35]])F_('puddle',x,y);}
const LAMPS_ROAD=[[37,32,0,'#f4f0d8',64],[38,33,0,'#f4f0d8',52]];
const ENTRIES_ROAD=[{n:'Highway 287',s:'Radiowóz za zatrzymanym pojazdem.',x:35.5,y:34.6,a:0,px:35,py:34}];
function roadTerrain(M,set,fillR,H,V){fillR(0,ROAD_Y0,79,ROAD_Y1,T.ASPH,'asph');fillR(0,24,79,25,T.ASPH,'conc');fillR(0,32,79,33,T.ASPH,'conc');}
function roadWindows(){}
F('laneY',1,1,0,0,(g,x,y)=>{P(g,x+2,y+14,11,2,'rgba(200,170,60,.75)');});
F('laneW',1,1,0,0,(g,x,y)=>{P(g,x,y,16,1,'rgba(210,210,200,.55)');});
F('laneWb',1,1,0,0,(g,x,y)=>{P(g,x,y+15,16,1,'rgba(210,210,200,.55)');});
F('mm',1,1,1,0,(g,x,y)=>{P(g,x+7,y+4,2,11,'#6a6e72');P(g,x+4,y-4,8,9,'#1e5a36');P(g,x+4,y-4,8,1,'#2e7a4e');P(g,x+5,y-2,6,1,'#d8e0d8');P(g,x+6,y,4,2,'#d8e0d8');P(g,x+6,y+13,5,2,SH);});
F('post',1,1,0,0,(g,x,y)=>{P(g,x+7,y+4,2,9,'#cfcfc8');P(g,x+7,y+4,2,2,'#e8a020');P(g,x+8,y+13,3,1,SH);});
// silver sedan, one tail light dead
function mkSedan(){const c=document.createElement('canvas');c.width=48;c.height=32;const g=c.getContext('2d'),b='#8e949a';
 P(g,4,28,42,3,SH);for(const wx of[8,32]){P(g,wx,3,8,3,'#0e0e10');P(g,wx,26,8,3,'#0e0e10');}
 P(g,2,5,44,22,b);P(g,2,5,44,1,'#b8bec4');P(g,2,26,44,1,'#5a6066');P(g,13,8,20,16,'#7a8086');P(g,13,8,20,1,'#a0a6ac');
 P(g,33,8,6,16,'#16202a');P(g,34,9,1,6,'#3a5468');P(g,8,8,5,16,'#16202a');P(g,9,9,1,5,'#2f4558');P(g,22,5,1,22,'#6a7076');
 P(g,45,7,1,4,'#e8e4c8');P(g,45,21,1,4,'#e8e4c8');P(g,2,7,1,3,'#2a0a0a');P(g,2,22,1,3,'#c0201a');P(g,30,3,2,2,'#2a2e33');P(g,30,27,2,2,'#2a2e33');return c;}
function carTiles(on){const C=G.car;if(!C)return;const x0=Math.floor(C.x/TS),y0=Math.floor(C.y/TS);for(let y=y0;y<y0+2;y++)for(let x=x0;x<x0+3;x++)if(inb(x,y))LV.fsolid[I(x,y)]=on?1:0;}
function roadScen(){}
function startRoad(){G.hostage=null;G.deadline=1e9;
 G.h={stage:'stop',approach:null,docs:false,plates:false,lic:false,k9T:null,knockT:2,knocks:0,peek:false,twist:null,trunk:false,girl:false,drv:null,said:{},t:0,truckT:12,endT:null,res:null};
 G.truck=null;G.car={x:40*TS,y:32*TS,vx:0,vy:0,ang:0,mode:'parked',spr:mkSedan()};carTiles(true);
 G.police=[];logEv('WHP 14: zatrzymanie pojazdu, US-287, mila 41');
 setTimeout(()=>{radio('DISPATCH','WHP 14, przyjęłam zatrzymanie o pierwszej dwanaście. Najbliższe wsparcie piętnaście minut od was.');},600);}
const RD={drvWin:()=>({x:G.car.x+30,y:G.car.y-8}),pasWin:()=>({x:G.car.x+30,y:G.car.y+40}),rearWin:()=>({x:G.car.x+14,y:G.car.y+40}),trunk:()=>({x:G.car.x-8,y:G.car.y+16}),mdt:()=>({x:34*TS+8,y:34*TS+4})};
function roadInteract(u){const H=G.h,C=G.car;if(!H)return null;
 if(H.stage==='stop'){
  const dw=RD.drvWin(),pw=RD.pasWin(),rw=RD.rearWin(),fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8,dd=p=>Math.min(dist(fx,fy,p.x,p.y),dist(u.x,u.y,p.x,p.y));
  if(!H.peek&&dd(rw)<18&&dd(rw)<dd(pw))return{k:'house',label:'Zajrzyj na tylne siedzenie',dur:.6,f:peekBack};
  if(dd(dw)<20||dd(pw)<20){if(!H.approach){H.approach=dd(pw)<dd(dw)?'pas':'drv';logEv('Podejście od strony '+(H.approach==='pas'?'pasażera':'kierowcy'));}return{k:'house',label:'Rozmowa z kierowcą',dur:0,f:driverTalk};}
  const tk=RD.trunk();if(nearPt(u,tk.x,tk.y,18))return{k:'house',label:'Bagażnik',dur:0,f:trunkMenu};
  const m=RD.mdt();if(nearPt(u,m.x,m.y,22))return{k:'house',label:'Radiowóz — komputer i radio',dur:0,f:mdtMenu};}
 else{const tk=RD.trunk();if(!H.trunk&&nearPt(u,tk.x,tk.y,20))return{k:'house',label:'Otwórz bagażnik',dur:1.2,f:openTrunk};
  const rw=RD.rearWin();if(!H.girl&&nearPt(u,rw.x,rw.y,20))return{k:'house',label:'Pomóż dziewczynie z tyłu',dur:1,f:freeGirl};}
 return null;}
function driverTalk(u){const H=G.h;const it=[];
 if(!H.docs)it.push({t:'„Dobry wieczór. Prawo jazdy, dowód rejestracyjny i ubezpieczenie.”',f:()=>{H.docs=true;say(u.name,'Dobry wieczór. Prawo jazdy, dowód rejestracyjny i ubezpieczenie.');say('KIEROWCA','Oczywiście, panie władzo. Proszę bardzo. Coś się stało?');setTimeout(showDaleId,2600);logEv('Kierowca podaje dokumenty: Dale Pruitt');}});
 if(!H.said.why)it.push({t:'„Wie pan, dlaczego pana zatrzymałem?”',f:()=>{H.said.why=1;say(u.name,'Wie pan, dlaczego pana zatrzymałem?');say('KIEROWCA','Nie mam pojęcia. Jechałem przepisowo, prawda? Zawsze jeżdżę przepisowo.');say(u.name,'Nie świeci panu lewe tylne światło.');say('KIEROWCA','Ach, to. Naprawię jutro z samego rana. Dziękuję, że pan mówi.');}});
 if(!H.said.where)it.push({t:'„Dokąd pan jedzie o tej porze?”',f:()=>{H.said.where=1;say(u.name,'Dokąd pan jedzie o tej porze?');say('KIEROWCA','Do siostry, do Millbrook. Wiozę jej... to znaczy, wracamy od rodziny.');}});
 if(!H.said.who)it.push({t:'„Kto siedzi z tyłu?”',f:()=>{H.said.who=1;say(u.name,'Kto siedzi z tyłu?');say('KIEROWCA','Moja siostrzenica. Śpi. Długi dzień, sam pan rozumie.');}});
 if(!H.said.wpn)it.push({t:'„Czy w aucie jest broń albo coś nielegalnego?”',f:()=>{H.said.wpn=1;say(u.name,'Czy w samochodzie jest broń albo coś nielegalnego?');say('KIEROWCA','Nie, skąd. Jestem czysty jak łza, panie władzo.');}});
 if(!H.said.search)it.push({t:'„Czy mogę przeszukać pojazd?”',f:()=>{H.said.search=1;say(u.name,'Czy wyrazi pan zgodę na przeszukanie pojazdu?');say('KIEROWCA','Wolałbym nie. Mam swoje prawa, prawda? Śpieszymy się.');logEv('Kierowca odmawia przeszukania');}});
 it.push({t:'„Proszę wysiąść z samochodu.”',f:()=>{say(u.name,'Proszę zgasić silnik i wysiąść z samochodu.');say('KIEROWCA','...Jasne. Już wysiadam.');logEv('Polecenie wyjścia z pojazdu');setTimeout(()=>roadTwist(u),2200);}});
 if(H.docs)it.push({t:'„Proszę zaczekać w aucie.”',f:()=>{say(u.name,'Proszę zaczekać w samochodzie.');say('KIEROWCA','Nigdzie się nie wybieram.');}});
 it.push({t:'„Dostaje pan pouczenie. Proszę naprawić światło.” (puść kierowcę)',f:()=>{say(u.name,'Tym razem pouczenie. Proszę naprawić to światło.');say('KIEROWCA','Dziękuję, panie władzo. Dobrej nocy.');releaseCar();}});
 choiceMenu('Kierowca — srebrna Toyota',it);}
function showDaleId(){if(G.ended)return;const el=$('idcard');el.innerHTML='<div class="idh"><span>STATE OF INDIANA</span><span>DRIVER LICENSE</span></div><div class="idb"><canvas id="idph" width="18" height="22"></canvas><div class="idf"><div><i>DL</i> 4471-08-9925</div><div class="idn">PRUITT</div><div class="idn2">DALE ROBERT</div><div><i>DOB</i> 09/02/1979</div><div>88 COUNTY RD 300<br>MUNCIE IN</div><div><i>HGT</i> 6\'1" &nbsp;<i>EYES</i> BLU &nbsp;<i>SEX</i> M</div><div><i>EXP</i> 09/02/2028</div></div></div><div class="idsig">D. Pruitt</div>';
 const c=$('idph'),g=c.getContext('2d');P(g,0,0,18,22,'#a8b4bc');P(g,3,15,12,7,'#4a4a3a');P(g,7,12,4,4,'#b08868');P(g,5,4,8,10,'#c49a7c');P(g,5,2,8,3,'#8a7050');P(g,6,8,2,1,'#2a2a3a');P(g,10,8,2,1,'#2a2a3a');P(g,7,11,4,1,'#8a5a4a');P(g,6,12,6,1,'#7a6a50');
 el.classList.add('on');setTimeout(()=>el.classList.remove('on'),6500);}
function mdtMenu(u){const H=G.h;const it=[];
 it.push({t:'Sprawdź tablice rejestracyjne',dis:H.plates,f:()=>{H.plates=true;radio(u.name,'Dispatch, WHP 14, proszę sprawdzić tablice Indiany: Lincoln-Mary-siedem-dwa-cztery-jeden.',{radio:1});setTimeout(()=>{if(G.ended)return;radio('DISPATCH','WHP 14, tablice na srebrną Toyotę Camry. Właścicielka: Margaret Lindqvist z Millbrook. Zgłoszona jako zaginiona wczoraj wieczorem, razem z córką, Lily, szesnaście lat.');logEv('Dispatch: właścicielka auta i jej córka zaginione');},5200);}});
 it.push({t:'Sprawdź prawo jazdy kierowcy',dis:!H.docs||H.lic,f:()=>{H.lic=true;radio(u.name,'Dispatch, sprawdźcie osobę: Pruitt, Dale, dziewiąty wrzesień siedemdziesiąt dziewięć.',{radio:1});setTimeout(()=>{if(G.ended)return;radio('DISPATCH','Pruitt Dale, prawo jazdy ważne. Wyrok sprzed ośmiu lat za napaść i pozbawienie wolności. Obecnie bez nakazów.');logEv('Dispatch: kierowca karany za pozbawienie wolności');},5200);}});
 it.push({t:'Wezwij jednostkę K-9',dis:H.k9T!=null,f:()=>{H.k9T=0;radio(u.name,'Dispatch, proszę o jednostkę K-9 na mile czterdzieści jeden.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','K-9 w drodze, będą za około sześć minut.');},4200);logEv('Wezwano K-9');}});
 it.push({t:'Poproś o wsparcie',dis:H.said.bk,f:()=>{H.said.bk=1;radio(u.name,'Dispatch, prośba o drugą jednostkę.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Najbliższa jednostka to 3-Baker-9, piętnaście minut od was.');},4000);}});
 choiceMenu('Radiowóz WHP 14',it);}
function peekBack(u){const H=G.h;H.peek=true;logEv('Dziewczyna na tylnym siedzeniu ma związane ręce');say(u.name,'Dziewczyna z tyłu nie śpi. Patrzy prosto w latarkę... ma taśmę na nadgarstkach.');say('KIEROWCA','Proszę nie świecić jej po oczach. Mówiłem, że jest zmęczona.');}
function trunkMenu(u){const H=G.h;choiceMenu('Tył pojazdu',[{t:'Nasłuchuj przy bagażniku',f:()=>{trunkKnock(true);say(u.name,'...Coś stuknęło w bagażniku.');}},{t:'„Proszę otworzyć bagażnik.”',f:()=>{say(u.name,'Proszę otworzyć bagażnik.');say('KIEROWCA','Nie ma pan nakazu.');H.said.trunkAsk=1;H.nervous=(H.nervous||0)+1;if(H.plates||H.peek||H.knocks>1)setTimeout(()=>roadTwist(u),1600);}}]);}
function trunkKnock(force){const H=G.h,tk=RD.trunk();H.knocks++;const o=out(tk.x,tk.y,.5,{rev:.05});if(o&&A.ctx){const t0=A.ctx.currentTime;for(let k=0;k<3;k++){nz(o,t0+k*.2,.07,{brown:1,type:'lowpass',f:300,g:1});tone(o,t0+k*.2,.06,{f:90,f2:60,g:.6});}}
 if(H.knocks===1)logEv('Stukanie z bagażnika');}
function releaseCar(){const H=G.h;H.stage='released';logEv('Kierowca puszczony z pouczeniem');setTimeout(()=>{G.car.mode='leave';carTiles(false);},2500);}
function roadTwist(u){const H=G.h;if(H.stage!=='stop'||G.ended)return;H.stage='twist';drawAll();carTiles(false);
 const near=G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,G.car.x+24,G.car.y+16)<TS*2.4);
 H.twist=(near&&Math.random()<.6)||H.said.trunkAsk?'gun':'flee';
 if(H.twist==='gun'){spawnDriver(G.car.x+30,G.car.y-10);say('KIEROWCA','Nie zabierzecie mi ich!');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Broń! Ma strzelbę!');}
 else{G.car.mode='flee';G.car.vx=40;say('KIEROWCA','...');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Ucieka! Rusza!');radio(G.p1.name,'Dispatch, WHP 14, pojazd ucieka na wschód, Highway 287!',{radio:1});}
 logEv(H.twist==='gun'?'Kierowca wyskakuje ze strzelbą':'Kierowca ucieka autem');}
function spawnDriver(x,y){const H=G.h;const e=mkEnemy({tx:x/TS|0,ty:y/TS|0,weap:'eShot',pal:{body:'#4a4a3a',legs:'#2a2e3a',head:'#c49a7c',face:'#c49a7c',visor:'#2a1a12',hair:'#8a7050',skin:'#c49a7c',eyes:1},name:'Dale Pruitt',kind:'suspect',st:'guard'});
 e.x=x;e.y=y;unstick(e);const q=nearestSquad(e);e.state='search';e.goal={x:q?q.x:x,y:q?q.y:y};e.searchT=6;e.arrived=false;e.react=.45;H.drv=e;return e;}
function openTrunk(u){const H=G.h;H.trunk=true;const tk=RD.trunk();logEv('Bagażnik: związana kobieta, żyje');say(u.name,'Bagażnik... jest tu kobieta. Związana. Żyje!');
 const m=mkNPC({tx:tk.x/TS|0,ty:tk.y/TS|0,kind:'victim',pal:{body:'#6a5a7a',legs:'#3a3a4a',head:'#d0b09a',face:'#d0b09a',visor:'#2a1a12',hair:'#a07a4a',skin:'#d0b09a',eyes:1},state:'calm',pose:'kneel'});m.x=tk.x-6;m.y=tk.y;
 say('MARGARET LINDQVIST','Lily... gdzie jest Lily? On ma moją córkę...');radio(u.name,'Dispatch, potrzebna karetka na milę czterdzieści jeden. Mamy dwie ofiary porwania.',{radio:1});}
function freeGirl(u){const H=G.h;H.girl=true;const rw=RD.rearWin();logEv('Lily Lindqvist bezpieczna');say(u.name,'Spokojnie. Jesteś bezpieczna. Policja.');say('LILY','Mama... mama jest w bagażniku...');
 mkNPC({tx:rw.x/TS|0,ty:(rw.y/TS|0),kind:'victim',pal:{body:'#c8c0b0',legs:'#3a4a6a',head:'#e0c0a8',face:'#e0c0a8',visor:'#2a1a12',hair:'#d8b070',skin:'#e0c0a8',eyes:1},state:'calm',pose:'kneel'});}
function updateRoad(dt){const H=G.h,C=G.car;if(!H||G.ended)return;H.t+=dt;
 // car motion
 if(C.mode==='flee'){C.vx=Math.min(250,C.vx+120*dt);if(C.x>52*TS){C.vy=Math.min(110,C.vy+130*dt);C.ang=Math.min(.4,C.ang+dt*.6);}C.x+=C.vx*dt;C.y+=C.vy*dt;
  if(C.y>=35*TS){C.mode='crashed';C.vx=C.vy=0;carTiles(true);const cx=C.x+40,cy=C.y+16;SND.kick(cx,cy);SND.glass(cx,cy);makeNoise(cx,cy,30,'boom');G.shake=.3;for(let i=0;i<14;i++)G.fx.push({k:'smoke',x:cx+rand(-8,8),y:cy+rand(-6,6),vx:rand(-6,6),vy:rand(-14,-4),r:2,gr:6,a:.35,t:0,life:rand(2,4),c:'#9a9a96'});
   spawnDriver(C.x+30,C.y-10);const e=H.drv;e.state='search';e.goal={x:66*TS+8,y:1*TS+8};e.searchT=999;e.react=.6;H.run=true;logEv('Toyota w rowie przy drzewach, kierowca ucieka do lasu');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Rozbił się! Wyskoczył i biegnie do lasu!');}}
 if(C.mode==='leave'){C.vx=Math.min(160,C.vx+60*dt);C.x+=C.vx*dt;if(C.x>MW*TS+60&&!G.ended){endMission(false,'Puszczony kierowca okazał się porywaczem. Margaret i Lily Lindqvist odnaleziono dwa dni później.');}}
 // knocks from the trunk
 if(H.stage==='stop'||(!H.trunk&&C.mode!=='leave')){const tk=RD.trunk();if(anySquadNear(tk.x,tk.y,TS*2.4)){H.knockT-=dt;if(H.knockT<=0){H.knockT=rand(5,9);trunkKnock();if(H.knocks===1&&H.stage==='stop'){const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Słyszałeś? Coś stuknęło w bagażniku.');}}}}
 // K-9 pressure / idle
 if(H.stage==='stop'){if(H.k9T!=null){H.k9T+=dt;if(H.k9T>32&&!H.said.k9n){H.said.k9n=1;say('KIEROWCA','Długo to jeszcze potrwa? Mówię panu, śpieszymy się.');}if(H.k9T>52)roadTwist(G.p1);}
  if(H.t>240)roadTwist(G.p1);}
 // runaway reaching the woods edge
 const e=H.drv;if(e&&e.alive&&e.state!=='cuffed'&&e.state!=='surr'&&H.run&&dist(e.x,e.y,66*TS+8,1*TS+8)<TS*2.2){endMission(false,'Kierowca zbiegł do lasu.');return;}
 // passing trucks
 H.truckT-=dt;if(H.truckT<=0&&!G.truck){H.truckT=rand(28,55);G.truck={x:MW*TS+80,y:26.4*TS,vx:-330,honk:false};}
 if(G.truck){const tr=G.truck;tr.x+=tr.vx*dt;const L=leader();if(L){const d=Math.abs(tr.x-L.x);if(A.ctx&&d<TS*30&&!tr.snd){tr.snd=1;const o=ui(.12);nz(o,A.ctx.currentTime,2.2,{type:'lowpass',f:500,g:.6,attack:1});}}
  for(const q of G.squad)if(q&&q.alive&&q.y<29*TS&&q.y>25*TS&&Math.abs(tr.x-q.x)<TS*8&&!tr.honk){tr.honk=true;if(A.ctx){const o=out(tr.x,tr.y,.6);if(o)tone(o,A.ctx.currentTime,.9,{type:'sawtooth',f:220,g:.4});}const o2=G.squad.find(s=>s&&s.alive&&s!==q);if(o2)say(o2.name,'Uważaj! Zejdź z jezdni!');}
  if(tr.x<-120)G.truck=null;}
 // win
 const drvDone=!e||!e.alive||e.state==='cuffed';
 if(H.endT==null&&H.stage==='twist'&&H.trunk&&H.girl&&e&&drvDone){H.endT=2;H.res=e.alive?'arrested':'killed';}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0&&!G.ended)endMission(true,H.res==='arrested'?'Kierowca zatrzymany, Margaret i Lily Lindqvist uratowane.':'Kierowca nie żyje. Margaret i Lily Lindqvist uratowane.');}}
function roadStress(dt,L){G.crT=(G.crT||0)-dt;if(G.crT<=0&&A.ctx&&isOutdoor(L.x,L.y)){G.crT=rand(.25,.6);const o=ui(.012);tone(o,A.ctx.currentTime,.04,{f:rand(4200,4700),g:.4});}
 for(const s of G.squad){if(!s||!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=2;if(s.human)SND.breath(s.x,s.y,.3);}}}
function roadRender(c,cx,cy){const C=G.car;if(!C)return;const x=C.x-cx,y=C.y-cy;
 c.save();c.translate(x+24,y+16);c.rotate(C.ang);c.drawImage(C.spr,-24,-16);
 if(!G.h.girl&&C.mode!=='leave')P(c,-10,-7,4,4,'#d8b070');if(C.mode==='parked'||C.mode==='flee'||C.mode==='leave'){P(c,6,-8,4,4,'#8a7050');}
 c.restore();
 c.globalCompositeOperation='lighter';const tl=c.createRadialGradient(x+1,y+22,0,x+1,y+22,10);tl.addColorStop(0,'rgba(255,40,30,.45)');tl.addColorStop(1,'rgba(255,40,30,0)');c.fillStyle=tl;c.fillRect(x-10,y+12,22,22);
 if(C.mode!=='crashed'){const hl=c.createRadialGradient(x+60,y+16,0,x+60,y+16,40);hl.addColorStop(0,'rgba(255,250,220,.18)');hl.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=hl;c.fillRect(x+20,y-24,80,80);}
 if(G.truck){const t=G.truck,tx=t.x-cx,ty=t.y-cy;c.globalCompositeOperation='source-over';P(c,tx,ty,70,26,'#2a2c30');P(c,tx,ty,14,26,'#4a2a20');P(c,tx+14,ty+2,56,22,'#5a5e64');c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(tx-20,ty+13,0,tx-20,ty+13,60);g2.addColorStop(0,'rgba(255,250,220,.35)');g2.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=g2;c.fillRect(tx-80,ty-47,120,120);}
 c.globalCompositeOperation='source-over';}
function roadObj(){const H=G.h;if(!H)return'';const e=H.drv,done=e&&(!e.alive||e.state==='cuffed');
 return objRows('WHP 14 · HIGHWAY 287',[[H.docs,'Kontrola drogowa'],H.stage==='twist'?[done,'Zatrzymaj kierowcę']:null,H.stage==='twist'&&(H.trunk||H.girl||done)?[H.trunk&&H.girl,'Udziel pomocy pasażerom']:null]);}
function roadDebrief(){const H=G.h||{};const e=H.drv;const drv=!e?'—':!e.alive?'nie żyje':e.state==='cuffed'?'zatrzymany':'zbiegł';
 let sc=0;if(H.approach==='pas')sc+=10;if(H.plates)sc+=10;if(H.peek)sc+=5;if(H.lic)sc+=5;if(e&&e.alive&&e.state==='cuffed')sc+=15;
 patrolDebrief([['Podejście do auta',H.approach==='pas'?'od strony pasażera (bezpieczne)':H.approach==='drv'?'od strony kierowcy (od jezdni)':'—'],['Sprawdzone tablice',H.plates?'tak':'nie'],['Kierowca',drv],['Margaret Lindqvist',H.trunk?'uratowana':'—'],['Lily Lindqvist',H.girl?'uratowana':'—']],sc);}
LVL.road={id:'road',patrol:true,weather:'fog',crew:{role:'State Trooper',shout:'State Police! Hands!',names:['TPR. HALE','TPR. DIETZ'],uni:{body:'#5c4a34',legs:'#2c2a26',acc:'#d8b048'}},car:{b:'#1c1d20',hi:'#34363a',lo:'#0e0f11',e:'#c8a860',r:'#e4e2da',rh:'#f2f0e8',rl:'#b8b4a8',s:'#c8a860'},ext:'none',terrain:roadTerrain,windows:roadWindows,rooms:ROOMS_ROAD,doors:DOORS_ROAD,furn:FURN_ROAD,lamps:LAMPS_ROAD,cams:[],entries:ENTRIES_ROAD,
 start:startRoad,update:updateRoad,interact:roadInteract,render:roadRender,stress:roadStress,obj:roadObj,debrief:roadDebrief,
 win:'WHP 14, przyjęłam. Karetka i detektywi są w drodze. Dobra robota.',planTitle:'HIGHWAY 287 · MILA 41',
 nb:{no:'#26-119-0112',pri:'P3',code:'10-38',small:'MIEJSCE',addr:'HIGHWAY 287<br>MILE MARKER 41',facts:[['JEDNOSTKA','WHP 14 · Tpr. Hale, Tpr. Dietz'],['GODZINA','01:12'],['POWÓD','Niesprawne tylne światło']],
  title:'RADIO · ZAPIS',clock:[1,11,40],who:{D:'DISPATCH',C:'WHP 14'},bg:[26,20,28,15.75],
  call:[['C','WHP 14, zatrzymanie pojazdu, Highway 287 przy mili czterdziestej pierwszej.'],['D','WHP 14, przyjęłam. Opis pojazdu?'],['C','Srebrna Toyota Camry, tablice Indiany, Lincoln-Mary-siedem-dwa-cztery-jeden. Kierowca i chyba jeden pasażer z tyłu.'],['D','Przyjęłam, zatrzymanie o pierwszej dwanaście.'],['C','Przyjąłem. Podchodzimy.']]}};
