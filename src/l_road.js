
// ================= MISSION 02: MILE MARKER 41 (night traffic stop) =================
WEAP.eShot={n:'Strzelba',mag:5,rate:.95,auto:0,spread:.14,range:10,snd:'shotgun',rl:3,pel:7,noise:24,len:9,thick:1};
const ROAD_Y0=26,ROAD_Y1=31;
const ROOMS_ROAD=[];const DOORS_ROAD=[];const FURN_ROAD=[];
{const F_=(...a)=>FURN_ROAD.push(a),r=rng(41);
 for(let x=0;x<MW;x++){if(x%3!==2)F_('laneY',x,28);F_('laneW',x,26);F_('laneWb',x,31);}
 F_('police',33,32);F_('mm',41,24);F_('mm',13,24);F_('mm',69,24);
 for(let x=3;x<MW;x+=6){F_('post',x,34);F_('post',x+3,23);}
 const taken=new Set();const put=(k,x,y)=>{const key=x+','+y;if(taken.has(key))return;taken.add(key);F_(k,x,y);};
 for(let y=1;y<=20;y++)for(let x=1;x<MW-1;x++){const edge=y>17?.25:.55;if(x>=64&&x<=67)continue;if((x>=55&&x<=66&&y>=3&&y<=10)||(x>=14&&x<=22&&y>=17))continue;if(r()<edge&&!(x>36&&x<46&&y>14))put('tree',x,y);else if(r()<.05)put('bush',x,y);}
 for(let y=38;y<=56;y++)for(let x=1;x<MW-1;x++){const edge=y<41?.22:.5;if(r()<edge)put('tree',x,y);else if(r()<.05)put('bush',x,y);}
 for(const[x,y]of[[66,36],[67,37],[69,36],[65,38],[70,38]])put('tree',x,y);
 for(let x=2;x<30;x+=1)if(x%5)F_('fence',x,22);
 for(let x=0;x<MW;x++)if(x<44||x>48)F_('grail',x,24);F_('hwsign',50,23);F_('bboard',16,19);F_('farmh',60,6);for(let x=4;x<MW;x+=9)F_('ppole',x,37);F_('tire',24,33);F_('cans',47,34);F_('tire',63,24);F_('mbox',58,23);
 for(const[x,y]of[[20,35],[52,35],[58,24],[8,35]])F_('puddle',x,y);}
const LAMPS_ROAD=[[37,32,0,'#f4f0d8',64],[38,33,0,'#f4f0d8',52],[17,20,0,'#ffe8b0',40],[19,20,0,'#ffe8b0',40],[61,7,0,'#ffcf80',30]];
const ENTRIES_ROAD=[{n:'Highway 287',s:'Radiowóz za zatrzymanym pojazdem.',x:35.5,y:34.6,a:0,px:35,py:34}];
function roadDecor(){const L=(x,y,w,h,c)=>P(wc,x,y,w,h,c);for(let x=0;x<MW*TS;x+=6){L(x,26*TS+3,3,2,'rgba(200,200,190,.18)');L(x,31*TS+11,3,2,'rgba(200,200,190,.18)');}
 const r=rng(287);for(let i=0;i<120;i++){const x=r()*MW*TS|0,y=(26+r()*6)*TS|0;L(x,y,(r()*10|0)+4,1,'rgba(10,10,12,.35)');}for(let i=0;i<14;i++){const x=r()*MW*TS|0,y=(26.5+r()*5)*TS|0;L(x,y,18,2,'rgba(20,20,22,.5)');}}
function roadTerrain(M,set,fillR,H,V){fillR(0,ROAD_Y0,79,ROAD_Y1,T.ASPH,'asph');fillR(0,24,79,25,T.ASPH,'conc');fillR(0,32,79,33,T.ASPH,'conc');}
function roadWindows(){}
F('grail',1,1,1,0,(g,x,y,w,h,s)=>{P(g,x,y+11,16,2,SH);P(g,x,y+5,16,4,'#8a8e92');P(g,x,y+5,16,1,'#c8ccd0');P(g,x,y+8,16,1,'#5a5e62');if(s%2===0){P(g,x+7,y+4,2,9,'#5a5e62');P(g,x+7,y+6,2,2,'#e8b020');}});
F('hwsign',3,1,1,0,(g,x,y)=>{P(g,x+6,y+12,36,3,SH);P(g,x+8,y-6,2,19,'#7a7e82');P(g,x+38,y-6,2,19,'#7a7e82');P(g,x+1,y-26,46,21,'#1a5a32');P(g,x+2,y-25,44,19,'#1e6a3a');P(g,x+2,y-25,44,1,'#e8f0e8');
 const L=(px,py,w)=>P(g,x+px,y+py,w,2,'#e8f0e8');L(4,-22,22);L(36,-22,6);L(4,-17,18);L(36,-17,6);L(4,-12,26);L(36,-12,6);});
F('bboard',4,1,1,0,(g,x,y)=>{P(g,x+6,y+12,52,3,SH);for(const px of[12,30,48])P(g,x+px,y-14,3,27,'#5a4a3a');P(g,x,y-40,64,28,'#1a1a1c');P(g,x+2,y-38,60,24,'#e8d8a8');P(g,x+4,y-36,26,10,'#c8301a');P(g,x+6,y-34,22,2,'#f0e0c0');P(g,x+6,y-30,16,2,'#f0e0c0');P(g,x+34,y-36,24,4,'#2a2a2a');P(g,x+34,y-30,18,2,'#2a2a2a');P(g,x+4,y-23,54,6,'#1e3c8a');P(g,x+8,y-21,30,2,'#f0f0e8');P(g,x+16,y-13,2,2,'#ffe8b0');P(g,x+46,y-13,2,2,'#ffe8b0');});
F('farmh',3,2,1,0,(g,x,y)=>{P(g,x+2,y+28,44,3,SH);P(g,x+2,y-2,44,30,'#5a4a3c');P(g,x+2,y-2,44,2,'#7a6a5c');P(g,x,y-14,48,14,'#3a2a24');P(g,x,y-14,48,2,'#5a4a3c');P(g,x+8,y+8,6,6,'#ffcf80');P(g,x+30,y+8,6,6,'#1a1a1a');P(g,x+20,y+16,6,12,'#3a2a20');P(g,x+38,y-20,4,8,'#4a3a2c');});
F('ppole',1,1,1,0,(g,x,y)=>{P(g,x+6,y+12,5,3,SH);P(g,x+7,y-44,3,57,'#4a3a2a');P(g,x+1,y-42,15,2,'#3a2a1e');for(const px of[2,8,14])P(g,x+px,y-45,1,3,'#c8c8c0');});
F('tire',1,1,0,0,(g,x,y)=>{P(g,x+3,y+6,10,4,'#141414');P(g,x+5,y+5,7,1,'#2a2a2a');P(g,x+4,y+8,3,1,'#2a2a2a');});
F('mbox',1,1,1,0,(g,x,y)=>{P(g,x+7,y+2,2,11,'#5a5e62');P(g,x+4,y-3,8,6,'#2a3a6a');P(g,x+4,y-3,8,1,'#4a5a8a');P(g,x+12,y-4,1,4,'#c8201a');});
Object.assign(FH,{hwsign:0,bboard:0,farmh:0,ppole:0,grail:3});
F('laneY',1,1,0,0,(g,x,y)=>{P(g,x+2,y+14,11,2,'rgba(200,170,60,.75)');});
F('laneW',1,1,0,0,(g,x,y)=>{P(g,x,y,16,1,'rgba(210,210,200,.55)');});
F('laneWb',1,1,0,0,(g,x,y)=>{P(g,x,y+15,16,1,'rgba(210,210,200,.55)');});
F('mm',1,1,1,0,(g,x,y)=>{P(g,x+7,y+4,2,11,'#6a6e72');P(g,x+4,y-4,8,9,'#1e5a36');P(g,x+4,y-4,8,1,'#2e7a4e');P(g,x+5,y-2,6,1,'#d8e0d8');P(g,x+6,y,4,2,'#d8e0d8');P(g,x+6,y+13,5,2,SH);});
F('post',1,1,0,0,(g,x,y)=>{P(g,x+7,y+4,2,9,'#cfcfc8');P(g,x+7,y+4,2,2,'#e8a020');P(g,x+8,y+13,3,1,SH);});
// srebrny minivan (Toyota Sienna), lewe tylne światło nie działa
function mkMinivan(win,side){const c=document.createElement('canvas');c.width=64;c.height=40;const g=c.getContext('2d');
 const B='#a4aab0',BL='#c6ccd2',BD='#7c8288',BS='#6a7076',GL='#141c24',GR='#3a5670',TR='#2a2e33';
 // cień
 P(g,4,33,58,4,'rgba(0,0,0,.42)');P(g,8,37,50,1,'rgba(0,0,0,.2)');
 // ---- bok (strona pasażera, widoczna w 2.5D) y 22..32 ----
 P(g,2,22,60,10,BS);P(g,2,22,60,1,BD);P(g,3,31,58,1,'#4a5056');
 P(g,2,28,60,1,'#5a6066');for(let x=3;x<61;x+=1)if(x%2)P(g,x,29,1,1,'#60666c');// listwa
 // szyby boczne: tylna, przesuwne drzwi, przednie drzwi
 P(g,5,23,9,4,GL);P(g,6,23,3,1,GR);P(g,16,23,15,4,GL);P(g,17,23,5,1,GR);P(g,33,23,9,4,GL);P(g,34,23,3,1,GR);
 P(g,15,23,1,4,TR);P(g,32,23,1,4,TR);P(g,42,23,4,4,TR);
 P(g,31,22,1,9,'#5a6066');P(g,15,24,1,7,'#5a6066');P(g,16,27,15,1,'#80868c');// szyna drzwi przesuwnych
 P(g,28,28,2,1,'#c8ccd0');P(g,39,28,2,1,'#c8ccd0');// klamki
 // okno pasażera (stan)
 const me=side==='pas',st=me?win:0;if(st===1){P(g,33,23,9,1,'#05070a');P(g,33,24,9,1,GL);}if(st===2){P(g,33,23,9,4,'#2a2420');P(g,35,24,3,2,'#4a3a2e');}
 // koła
 for(const wx of[8,45]){P(g,wx-1,29,12,3,'#24282c');P(g,wx,30,10,6,'#0c0c0e');P(g,wx+3,31,4,4,'#8a8e94');P(g,wx+4,32,2,2,'#c8ccd0');P(g,wx-1,29,12,1,'#3a3e44');}
 // światła z boku
 P(g,60,24,2,3,'#f0ecd0');P(g,2,24,1,3,'#b81c16');P(g,61,30,1,2,'#e8a020');
 // ---- dach / góra y 3..22 ----
 P(g,2,4,60,18,B);P(g,3,3,58,1,BL);P(g,2,21,60,1,BD);
 // maska (przód, prawo)
 P(g,50,5,11,16,'#b0b6bc');P(g,50,5,11,1,BL);P(g,60,6,1,14,BD);P(g,52,8,7,1,'#bcc2c8');P(g,52,17,7,1,'#9aa0a6');
 P(g,61,6,1,3,'#f4f0d8');P(g,61,17,1,3,'#f4f0d8');P(g,61,11,1,4,'#2a2e33');// reflektory, grill
 // szyba przednia
 P(g,43,5,7,16,GL);P(g,44,6,2,6,GR);P(g,46,7,1,3,GR);P(g,43,5,7,1,'#0a0e12');
 // dach
 P(g,10,5,33,16,'#8e949a');P(g,10,5,33,1,BL);P(g,10,20,33,1,BD);
 P(g,12,6,29,1,'#6a7076');P(g,12,19,29,1,'#6a7076');for(const x of[13,26,39])P(g,x,6,1,14,'#5a6066');// relingi
 P(g,22,9,9,8,'#82888e');P(g,23,10,7,1,'#9aa0a6');// szyberdach
 // szyba tylna
 P(g,4,6,6,14,GL);P(g,5,7,1,5,GR);P(g,2,6,2,14,'#9aa0a6');
 // światła tył, jedno nie działa
 P(g,2,5,1,3,'#3a1010');P(g,2,18,1,3,'#c8201a');P(g,1,10,1,6,'#d8d0a0');
 // lusterka
 P(g,44,2,3,2,TR);P(g,44,22,3,2,TR);
 // okno kierowcy (krawędź od góry)
 {const sd=side!=='pas'?win:0;P(g,34,4,8,1,sd===0?GL:sd===1?'#05070a':'#2a2420');if(sd===2)P(g,36,3,4,1,'#c49a7c');}
 return c;}
function carTiles(on){const C=G.car;if(!C)return;const x0=Math.floor(C.x/TS),y0=Math.floor(C.y/TS);for(let y=y0;y<y0+2;y++)for(let x=x0;x<x0+4;x++)if(inb(x,y))LV.fsolid[I(x,y)]=on?1:0;}
function roadScen(){}
function startRoad(){G.hostage=null;G.deadline=1e9;
 G.h={win:0,winSide:null,keys:false,flares:false,reach:null,reachDone:false,sawGun:false,stage:'stop',approach:null,docs:false,plates:false,lic:false,k9T:null,knockT:2,knocks:0,peek:false,twist:null,trunk:false,girl:false,drv:null,said:{},t:0,truckT:12,endT:null,res:null};
 G.truck=null;G.traffic=[];G.trafT=2;G.car={x:40*TS,y:32*TS,vx:0,vy:0,ang:0,mode:'parked',spr:mkMinivan(0,'drv'),engine:true};carTiles(true);G.carBlk=carBlocks;
 G.police=[];logEv('WHP 14: zatrzymanie pojazdu, US-287, mila 41');
 setTimeout(()=>{radio('DISPATCH','WHP 14, przyjęłam zatrzymanie o pierwszej dwanaście. Najbliższe wsparcie piętnaście minut od was.');},600);}
const RD={drvWin:()=>({x:G.car.x+38,y:G.car.y-8}),pasWin:()=>({x:G.car.x+38,y:G.car.y+40}),rearWin:()=>({x:G.car.x+22,y:G.car.y+40}),trunk:()=>({x:G.car.x-8,y:G.car.y+16}),mdt:()=>({x:34*TS+8,y:34*TS+4})};
function roadInteract(u){const H=G.h,C=G.car;if(!H)return null;
 if(H.stage==='stop'){
  const dw=RD.drvWin(),pw=RD.pasWin(),rw=RD.rearWin(),fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8,dd=p=>Math.min(dist(fx,fy,p.x,p.y),dist(u.x,u.y,p.x,p.y));
  if(!H.peek&&dd(rw)<18&&dd(rw)<dd(pw))return{k:'house',label:'Zajrzyj na tylne siedzenie',dur:.6,f:peekBack};
  if(H.reach&&(dd(dw)<34||dd(pw)<34))return{k:'house',label:'„RĘCE NA KIEROWNICĘ!”',dur:0,f:handsUp};
  if(dd(dw)<20||dd(pw)<20){if(!H.approach){H.approach=dd(pw)<dd(dw)?'pas':'drv';logEv('Podejście od strony '+(H.approach==='pas'?'pasażera':'kierowcy'));}
   if(H.win===0)return{k:'house',label:'Zapukaj w szybę',dur:0,f:(u)=>knockWin(u,dd(pw)<dd(dw)?'pas':'drv')};return{k:'house',label:'Rozmowa z kierowcą',dur:0,f:driverTalk};}
  const tk=RD.trunk();if(nearPt(u,tk.x,tk.y,18))return{k:'house',label:'Bagażnik',dur:0,f:trunkMenu};
  const m=RD.mdt();if(nearPt(u,m.x,m.y,22))return{k:'house',label:'Radiowóz — komputer i radio',dur:0,f:mdtMenu};}
 else{const tk=RD.trunk();if(!H.trunk&&nearPt(u,tk.x,tk.y,20))return{k:'house',label:'Otwórz bagażnik',dur:1.2,f:openTrunk};
  const rw=RD.rearWin();if(!H.girl&&nearPt(u,rw.x,rw.y,20))return{k:'house',label:'Pomóż dziewczynie z tyłu',dur:1,f:freeGirl};}
 return null;}
function setWin(n){const H=G.h;H.win=n;G.car.spr=mkMinivan(n,H.winSide);}
function knockWin(u,side){const H=G.h;H.winSide=side;const p=side==='pas'?RD.pasWin():RD.drvWin();if(A.ctx){const o=out(p.x,p.y,.5);if(o)for(let k=0;k<3;k++)tone(o,A.ctx.currentTime+k*.16,.05,{f:1800,f2:1200,g:.5,type:'triangle'});}
 say(u.name,'Proszę opuścić szybę.');setTimeout(()=>{if(G.ended)return;setWin(1);say('KIEROWCA (PRZEZ SZPARĘ)','...Tak? Coś się stało, panie władzo?');logEv('Kierowca uchyla szybę na kilka centymetrów');
  const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o&&!H.said.crack){H.said.crack=1;say(o.name,'Uchylił tylko trochę. Pilnuj rąk.');}},1300);}
function handsUp(u){const H=G.h;H.reach=null;H.reachDone=true;H.nervous=(H.nervous||0)+1;say(u.name,'RĘCE NA KIEROWNICĘ! TERAZ!');say('KIEROWCA','Dobra! Dobra! Szukałem tylko... ubezpieczenia. Spokojnie.');logEv('Kierowca sięgał pod siedzenie — polecenie: ręce na kierownicę');}
function driverTalk(u){const H=G.h;const it=[];
 if(H.win===1)it.push({t:'„Proszę opuścić szybę do końca.”',f:()=>{say(u.name,'Proszę opuścić szybę do końca. Nie będę rozmawiał przez szparę.');setTimeout(()=>{if(G.ended)return;setWin(2);say('KIEROWCA','...Proszę bardzo.');logEv('Szyba opuszczona');},900);}});
 if(H.win===2&&!H.sawGun)it.push({t:'Poświeć latarką do kabiny',f:()=>{H.sawGun=true;say(u.name,'Rolka szarej taśmy na konsoli. Na podłodze po stronie pasażera koc... spod niego wystaje kolba strzelby.');logEv('W kabinie: taśma i kolba strzelby pod kocem');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)setTimeout(()=>{if(!G.ended)say(o.name,'(cicho) Widziałem. Kryję cię.');},1400);}});
 if(H.win>=1&&!H.keys)it.push({t:'„Proszę zgasić silnik i położyć kluczyki na dachu.”',f:()=>{H.keys=true;G.car.engine=false;say(u.name,'Proszę zgasić silnik i położyć kluczyki na dachu.');say('KIEROWCA','Na dachu? ...Dobra. Jak pan chce.');logEv('Silnik zgaszony, kluczyki na dachu');}});
 if(!H.docs)it.push({t:'„Dobry wieczór. Prawo jazdy, dowód rejestracyjny i ubezpieczenie.”',f:()=>{H.docs=true;H.docsT=H.t;say(u.name,'Dobry wieczór. Prawo jazdy, dowód rejestracyjny i ubezpieczenie.');say('KIEROWCA','Oczywiście, panie władzo. Proszę bardzo. Coś się stało?');setTimeout(showDaleId,2600);logEv('Kierowca podaje dokumenty: Dale Pruitt');}});
 if(!H.said.why)it.push({t:'„Wie pan, dlaczego pana zatrzymałem?”',f:()=>{H.said.why=1;say(u.name,'Wie pan, dlaczego pana zatrzymałem?');say('KIEROWCA','Nie mam pojęcia. Jechałem przepisowo, prawda? Zawsze jeżdżę przepisowo.');say(u.name,'Nie świeci panu lewe tylne światło.');say('KIEROWCA','Ach, to. Naprawię jutro z samego rana. Dziękuję, że pan mówi.');}});
 if(!H.said.where)it.push({t:'„Dokąd pan jedzie o tej porze?”',f:()=>{H.said.where=1;say(u.name,'Dokąd pan jedzie o tej porze?');say('KIEROWCA','Do siostry, do Millbrook. Wiozę jej... to znaczy, wracamy od rodziny.');}});
 if(!H.said.who)it.push({t:'„Kto siedzi z tyłu?”',f:()=>{H.said.who=1;say(u.name,'Kto siedzi z tyłu?');say('KIEROWCA','Moja siostrzenica. Śpi. Długi dzień, sam pan rozumie.');}});
 if(!H.said.wpn)it.push({t:'„Czy w aucie jest broń albo coś nielegalnego?”',f:()=>{H.said.wpn=1;say(u.name,'Czy w samochodzie jest broń albo coś nielegalnego?');say('KIEROWCA','Nie, skąd. Jestem czysty jak łza, panie władzo.');}});
 if(!H.said.search)it.push({t:'„Czy mogę przeszukać pojazd?”',f:()=>{H.said.search=1;say(u.name,'Czy wyrazi pan zgodę na przeszukanie pojazdu?');say('KIEROWCA','Wolałbym nie. Mam swoje prawa, prawda? Śpieszymy się.');logEv('Kierowca odmawia przeszukania');}});
 it.push({t:'„Proszę wysiąść z samochodu.”',f:()=>{say(u.name,'Proszę zgasić silnik i wysiąść z samochodu.');say('KIEROWCA','...Jasne. Już wysiadam.');logEv('Polecenie wyjścia z pojazdu');setTimeout(()=>roadTwist(u),2200);}});
 if(H.docs)it.push({t:'„Proszę zaczekać w aucie.”',f:()=>{say(u.name,'Proszę zaczekać w samochodzie.');say('KIEROWCA','Nigdzie się nie wybieram.');}});
 it.push({t:'„Dostaje pan pouczenie. Proszę naprawić światło.” (puść kierowcę)',f:()=>{say(u.name,'Tym razem pouczenie. Proszę naprawić to światło.');say('KIEROWCA','Dziękuję, panie władzo. Dobrej nocy.');releaseCar();}});
 choiceMenu('Kierowca — srebrna Toyota Sienna',it);}
function showDaleId(){if(G.ended)return;const el=$('idcard');el.innerHTML='<div class="idh"><span>STATE OF INDIANA</span><span>DRIVER LICENSE</span></div><div class="idb"><canvas id="idph" width="18" height="22"></canvas><div class="idf"><div><i>DL</i> 4471-08-9925</div><div class="idn">PRUITT</div><div class="idn2">DALE ROBERT</div><div><i>DOB</i> 09/02/1979</div><div>88 COUNTY RD 300<br>MUNCIE IN</div><div><i>HGT</i> 6\'1" &nbsp;<i>EYES</i> BLU &nbsp;<i>SEX</i> M</div><div><i>EXP</i> 09/02/2028</div></div></div><div class="idsig">D. Pruitt</div>';
 const c=$('idph'),g=c.getContext('2d');P(g,0,0,18,22,'#a8b4bc');P(g,3,15,12,7,'#4a4a3a');P(g,7,12,4,4,'#b08868');P(g,5,4,8,10,'#c49a7c');P(g,5,2,8,3,'#8a7050');P(g,6,8,2,1,'#2a2a3a');P(g,10,8,2,1,'#2a2a3a');P(g,7,11,4,1,'#8a5a4a');P(g,6,12,6,1,'#7a6a50');
 el.classList.add('on');setTimeout(()=>el.classList.remove('on'),6500);}
function mdtMenu(u){const H=G.h;const it=[];
 it.push({t:'Sprawdź tablice rejestracyjne',dis:H.plates,f:()=>{H.plates=true;radio(u.name,'Dispatch, WHP 14, proszę sprawdzić tablice Indiany: Lincoln-Mary-siedem-dwa-cztery-jeden.',{radio:1});setTimeout(()=>{if(G.ended)return;radio('DISPATCH','WHP 14, tablice na srebrną Toyotę Siennę, minivan. Właścicielka: Margaret Lindqvist z Millbrook. Zgłoszona jako zaginiona wczoraj wieczorem, razem z córką, Lily, szesnaście lat.');logEv('Dispatch: właścicielka auta i jej córka zaginione');},5200);}});
 it.push({t:'Sprawdź prawo jazdy kierowcy',dis:!H.docs||H.lic,f:()=>{H.lic=true;radio(u.name,'Dispatch, sprawdźcie osobę: Pruitt, Dale, dziewiąty wrzesień siedemdziesiąt dziewięć.',{radio:1});setTimeout(()=>{if(G.ended)return;radio('DISPATCH','Pruitt Dale, prawo jazdy ważne. Wyrok sprzed ośmiu lat za napaść i pozbawienie wolności. Obecnie bez nakazów.');logEv('Dispatch: kierowca karany za pozbawienie wolności');},5200);}});
 it.push({t:'Wezwij jednostkę K-9',dis:H.k9T!=null,f:()=>{H.k9T=0;radio(u.name,'Dispatch, proszę o jednostkę K-9 na mile czterdzieści jeden.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','K-9 w drodze, będą za około sześć minut.');},4200);logEv('Wezwano K-9');}});
 it.push({t:'Rozstaw flary za radiowozem',dis:H.flares,f:()=>{H.flares=true;say(u.name,'Rozstawiam flary. Niech zwalniają.');logEv('Flary rozstawione na jezdni');SND.pick(u.x,u.y);}});
 it.push({t:'Poproś o wsparcie',dis:H.said.bk,f:()=>{H.said.bk=1;radio(u.name,'Dispatch, prośba o drugą jednostkę.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Najbliższa jednostka to 3-Baker-9, piętnaście minut od was.');},4000);}});
 choiceMenu('Radiowóz WHP 14',it);}
function peekBack(u){const H=G.h;H.peek=true;logEv('Dziewczyna na tylnym siedzeniu ma związane ręce');say(u.name,'Dziewczyna z tyłu nie śpi. Patrzy prosto w latarkę... ma taśmę na nadgarstkach.');say('KIEROWCA','Proszę nie świecić jej po oczach. Mówiłem, że jest zmęczona.');}
function trunkMenu(u){const H=G.h;choiceMenu('Tył pojazdu',[{t:'Nasłuchuj przy bagażniku',f:()=>{trunkKnock(true);say(u.name,'...Coś stuknęło w bagażniku.');}},{t:'„Proszę otworzyć bagażnik.”',f:()=>{say(u.name,'Proszę otworzyć bagażnik.');say('KIEROWCA','Nie ma pan nakazu.');H.said.trunkAsk=1;H.nervous=(H.nervous||0)+1;if(H.plates||H.peek||H.knocks>1)setTimeout(()=>roadTwist(u),1600);}}]);}
function trunkKnock(force){const H=G.h,tk=RD.trunk();H.knocks++;const o=out(tk.x,tk.y,.5,{rev:.05});if(o&&A.ctx){const t0=A.ctx.currentTime;for(let k=0;k<3;k++){nz(o,t0+k*.2,.07,{brown:1,type:'lowpass',f:300,g:1});tone(o,t0+k*.2,.06,{f:90,f2:60,g:.6});}}
 if(H.knocks===1)logEv('Stukanie z bagażnika');}
function releaseCar(){const H=G.h;H.stage='released';logEv('Kierowca puszczony z pouczeniem');setTimeout(()=>{G.car.mode='leave';carTiles(false);},2500);}
function roadTwist(u){const H=G.h;if(H.stage!=='stop'||G.ended)return;H.stage='twist';drawAll();carTiles(false);
 const near=G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,G.car.x+24,G.car.y+16)<TS*2.4);
 H.twist=H.forceGun||(near&&Math.random()<.6)||H.said.trunkAsk?'gun':H.keys?'run':'flee';
 if(H.twist==='gun'){spawnDriver(G.car.x+38,G.car.y-10);say('KIEROWCA','Nie zabierzecie mi ich!');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Broń! Ma strzelbę!');}
 else if(H.twist==='run'){spawnDriver(G.car.x+38,G.car.y-10);const e=H.drv;e.state='search';e.goal={x:66*TS+8,y:1*TS+8};e.searchT=999;e.react=.6;H.run=true;say('KIEROWCA','...!');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Wyskoczył! Biegnie przez jezdnię do lasu!');radio(G.p1.name,'Dispatch, WHP 14, kierowca ucieka pieszo na północ, do lasu!',{radio:1});}
 else{G.car.mode='flee';G.car.vx=40;say('KIEROWCA','...');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Ucieka! Rusza!');radio(G.p1.name,'Dispatch, WHP 14, pojazd ucieka na wschód, Highway 287!',{radio:1});}
 logEv(H.twist==='gun'?'Kierowca wyskakuje ze strzelbą':H.twist==='run'?'Kierowca ucieka pieszo (kluczyki na dachu)':'Kierowca ucieka autem');}
function spawnDriver(x,y){const H=G.h;const e=mkEnemy({tx:x/TS|0,ty:y/TS|0,weap:'eShot',pal:{body:'#4a4a3a',legs:'#2a2e3a',head:'#c49a7c',face:'#c49a7c',visor:'#2a1a12',hair:'#8a7050',skin:'#c49a7c',eyes:1},name:'Dale Pruitt',kind:'suspect',st:'guard'});
 e.x=x;e.y=y;unstick(e);const q=nearestSquad(e);e.state='search';e.goal={x:q?q.x:x,y:q?q.y:y};e.searchT=6;e.arrived=false;e.react=.45;H.drv=e;return e;}
function openTrunk(u){const H=G.h;H.trunk=true;const tk=RD.trunk();logEv('Bagażnik: związana kobieta, żyje');say(u.name,'Bagażnik... jest tu kobieta. Związana. Żyje!');
 const m=mkNPC({tx:tk.x/TS|0,ty:tk.y/TS|0,kind:'victim',pal:{body:'#6a5a7a',legs:'#3a3a4a',head:'#d0b09a',face:'#d0b09a',visor:'#2a1a12',hair:'#a07a4a',skin:'#d0b09a',eyes:1},state:'calm',pose:'kneel'});m.x=tk.x-6;m.y=tk.y;
 say('MARGARET LINDQVIST','Lily... gdzie jest Lily? On ma moją córkę...');radio(u.name,'Dispatch, potrzebna karetka na milę czterdzieści jeden. Mamy dwie ofiary porwania.',{radio:1});}
function freeGirl(u){const H=G.h;H.girl=true;const rw=RD.rearWin();logEv('Lily Lindqvist bezpieczna');say(u.name,'Spokojnie. Jesteś bezpieczna. Policja.');say('LILY','Mama... mama jest w bagażniku...');
 mkNPC({tx:rw.x/TS|0,ty:(rw.y/TS|0),kind:'victim',pal:{body:'#c8c0b0',legs:'#3a4a6a',head:'#e0c0a8',face:'#e0c0a8',visor:'#2a1a12',hair:'#d8b070',skin:'#e0c0a8',eyes:1},state:'calm',pose:'kneel'});}
const VCOL=['#7a1e1a','#1e2a4a','#2a2a2c','#c8c8c4','#4a5a3a','#5a4a3a','#8a8a86'];
function spawnVeh(){const eb=Math.random()<.55,k=Math.random(),type=k<.28?'semi':k<.5?'pickup':'car',len=type==='semi'?112:type==='pickup'?50:44;
 G.traffic.push({type,len,eb,x:eb?-len-60:MW*TS+60,y:(eb?30.1:27.2)*TS,vx:(eb?1:-1)*rand(270,330),col:pick(VCOL),snd:0,honk:0,slow:0});}
function updateTraffic(dt){const H=G.h;G.trafT-=dt;if(G.trafT<=0){G.trafT=rand(5,11);spawnVeh();}const L=G.p1;
 for(const v of G.traffic){const near=Math.abs(v.x-G.car.x)<TS*22;let tgt=v.eb?(near?(H.flares?150:210):300):300;if(v.eb&&near)v.y+=((29.5*TS)-v.y)*Math.min(1,dt*1.5);
  v.vx+=(Math.sign(v.vx)*tgt-v.vx)*Math.min(1,dt*1.2);v.x+=v.vx*dt;
  if(L&&!v.snd&&Math.abs(v.x-L.x)<TS*16){v.snd=1;if(A.ctx){const dy=Math.abs(v.y-L.y)/TS,vol=Math.max(.06,.5-dy*.04)*(v.type==='semi'?1.4:1),o=ui(vol),t0=A.ctx.currentTime;nz(o,t0,2,{type:'bandpass',f:v.type==='semi'?380:700,g:.8,attack:.9});if(v.type==='semi')tone(o,t0,2.2,{f:78,f2:52,g:.35,type:'sawtooth'});else tone(o,t0+.6,.9,{f:220,f2:150,g:.08});}}
  for(const q of G.squad){if(!q||!q.alive)continue;const fx=v.x+(v.vx>0?v.len:0),inLane=Math.abs(q.y-v.y-10)<16,ahead=v.vx>0?(q.x>v.x&&q.x-v.x<v.len+TS*6):(q.x<v.x+v.len&&v.x-q.x<TS*6);
   if(inLane&&ahead&&!v.honk){v.honk=1;if(A.ctx){const o=out(v.x,v.y,.7);if(o)tone(o,A.ctx.currentTime,.8,{type:'sawtooth',f:v.type==='semi'?180:330,g:.45});}const o2=G.squad.find(s2=>s2&&s2.alive&&s2!==q);if(o2)say(o2.name,'Uważaj! Zejdź z jezdni!');}
   if(inLane&&q.x>v.x-4&&q.x<v.x+v.len+4&&!q.hitByCar){q.hitByCar=1;G.shake=.5;SND.body(q.x,q.y);kill(q,null,v.vx>0?0:Math.PI);logEv(q.name+' potrącony przez przejeżdżający pojazd');H.hitCar=(H.hitCar||0)+1;}}
  if(L&&Math.abs(v.x+v.len/2-L.x)<TS*2&&Math.abs(v.y-L.y)<TS*3)G.shake=Math.max(G.shake||0,.12);}
 G.traffic=G.traffic.filter(v=>v.x>-200&&v.x<MW*TS+200);}
function carBlocks(x,y){const C=G.car;if(!C)return false;const W=C.spr.width/2,cx=C.x+W,cy=C.y+16,ca=Math.cos(-C.ang),sa=Math.sin(-C.ang),dx=x-cx,dy=y-cy,lx=dx*ca-dy*sa,ly=dx*sa+dy*ca;return Math.abs(lx)<W-2&&Math.abs(ly)<11;}
function carImpact(x,y,a){for(let i=0;i<6;i++)G.fx.push({k:'spark',x,y:y-6,vx:rand(-70,70)-Math.cos(a)*40,vy:rand(-70,70)-Math.sin(a)*40,t:0,life:rand(.08,.2)});SND.clang(x,y);if(Math.random()<.5)P(wc,0,0,0,0,'#000');}
function updateRoad(dt){const H=G.h,C=G.car;if(!H||G.ended)return;H.t+=dt;
 // car motion
 if(C.mode==='flee'){C.vx=Math.min(250,C.vx+120*dt);if(C.x>52*TS){C.vy=Math.min(110,C.vy+130*dt);C.ang=Math.min(.4,C.ang+dt*.6);}C.x+=C.vx*dt;C.y+=C.vy*dt;
  if(C.y>=35*TS){C.mode='crashed';C.vx=C.vy=0;carTiles(true);const cx=C.x+40,cy=C.y+16;SND.kick(cx,cy);SND.glass(cx,cy);makeNoise(cx,cy,30,'boom');G.shake=.3;for(let i=0;i<14;i++)G.fx.push({k:'smoke',x:cx+rand(-8,8),y:cy+rand(-6,6),vx:rand(-6,6),vy:rand(-14,-4),r:2,gr:6,a:.35,t:0,life:rand(2,4),c:'#9a9a96'});
   spawnDriver(C.x+38,C.y-10);const e=H.drv;e.state='search';e.goal={x:66*TS+8,y:1*TS+8};e.searchT=999;e.react=.6;H.run=true;logEv('Toyota w rowie przy drzewach, kierowca ucieka do lasu');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Rozbił się! Wyskoczył i biegnie do lasu!');}}
 if(C.mode==='leave'){C.vx=Math.min(160,C.vx+60*dt);C.x+=C.vx*dt;if(C.x>MW*TS+60&&!G.ended){endMission(false,'Puszczony kierowca okazał się porywaczem. Margaret i Lily Lindqvist odnaleziono dwa dni później.');}}
 // knocks from the trunk
 if(H.stage==='stop'||(!H.trunk&&C.mode!=='leave')){const tk=RD.trunk();if(anySquadNear(tk.x,tk.y,TS*2.4)){H.knockT-=dt;if(H.knockT<=0){H.knockT=rand(5,9);trunkKnock();if(H.knocks===1&&H.stage==='stop'){const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Słyszałeś? Coś stuknęło w bagażniku.');}}}}
 // K-9 pressure / idle
 if(H.stage==='stop'){if(H.k9T!=null){H.k9T+=dt;if(H.k9T>32&&!H.said.k9n){H.said.k9n=1;say('KIEROWCA','Długo to jeszcze potrwa? Mówię panu, śpieszymy się.');}if(H.k9T>52)roadTwist(G.p1);}
  if(H.t>240)roadTwist(G.p1);}
 // runaway reaching the woods edge
 const e=H.drv;if(e&&e.alive&&e.state!=='cuffed'&&e.state!=='surr'&&H.run&&dist(e.x,e.y,66*TS+8,1*TS+8)<TS*2.2){endMission(false,'Kierowca zbiegł do lasu.');return;}
 // sięganie pod siedzenie
 if(H.stage==='stop'&&H.docs&&!H.reachDone&&!H.reach&&H.t>(H.docsT||0)+rand(18,30)*0+22&&H.win>=1&&anySquadNear(G.car.x+38,G.car.y+16,TS*2.6)&&Math.random()<dt*.15){H.reach={t:0};const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Sięga pod siedzenie!');}
 if(H.reach){H.reach.t+=dt;const L=G.p1;if(L&&L.shoutCd>2.9){handsUp(L);}else if(H.reach.t>3.6){H.reach=null;H.reachDone=true;H.forceGun=true;roadTwist(G.p1);}}
 updateTraffic(dt);
 // win
 const drvDone=!e||!e.alive||e.state==='cuffed';
 if(H.endT==null&&H.stage==='twist'&&H.trunk&&H.girl&&e&&drvDone){H.endT=2;H.res=e.alive?'arrested':'killed';}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0&&!G.ended)endMission(true,H.res==='arrested'?'Kierowca zatrzymany, Margaret i Lily Lindqvist uratowane.':'Kierowca nie żyje. Margaret i Lily Lindqvist uratowane.');}}
function roadStress(dt,L){const c=A.ctx;if(c&&!A.rdHum){A.rdHum=c.createGain();A.rdHum.gain.value=0;A.rdHum.connect(A.master);const s=c.createBufferSource();s.buffer=A.noise;s.loop=true;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=160;s.connect(f);f.connect(A.rdHum);s.start();
  A.rdIdle=c.createGain();A.rdIdle.gain.value=0;A.rdIdle.connect(A.master);const o=c.createOscillator();o.type='sawtooth';o.frequency.value=34;const f2=c.createBiquadFilter();f2.type='lowpass';f2.frequency.value=110;const lf=c.createOscillator();lf.frequency.value=7;const lg=c.createGain();lg.gain.value=3;lf.connect(lg);lg.connect(o.frequency);o.connect(f2);f2.connect(A.rdIdle);o.start();lf.start();}
 if(c&&A.rdHum){const on=G.lvl==='road'&&G.running&&!G.ended,t=c.currentTime;let nv=0;for(const v of G.traffic||[])nv=Math.max(nv,1-Math.min(1,Math.abs(v.x-L.x)/(TS*40)));A.rdHum.gain.setTargetAtTime(on?.025+nv*.05:0,t,.4);
  const C=G.car,d=C?dist(L.x,L.y,C.x+30,C.y+16):999;A.rdIdle.gain.setTargetAtTime(on&&C&&C.engine!==false&&C.mode==='parked'?Math.max(0,.07-d/TS*.006):0,t,.3);
  G.radT=(G.radT||rand(14,24))-dt;if(on&&G.radT<=0){G.radT=rand(22,40);const o=ui(.05),t0=c.currentTime;nz(o,t0,.35,{type:'bandpass',f:1800,g:.6});tone(o,t0+.36,.08,{f:1400,g:.3});}}
G.crT=(G.crT||0)-dt;if(G.crT<=0&&A.ctx&&isOutdoor(L.x,L.y)){G.crT=rand(.25,.6);const o=ui(.012);tone(o,A.ctx.currentTime,.04,{f:rand(4200,4700),g:.4});}
 for(const s of G.squad){if(!s||!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=2;if(s.human)SND.breath(s.x,s.y,.3);}}}
function roadRender(c,cx,cy){const C=G.car;if(!C)return;const x=C.x-cx,y=C.y-cy;
 const HW=C.spr.width/2;c.save();c.translate(x+HW,y+16);c.rotate(C.ang);c.drawImage(C.spr,-HW,-16);
 if(!G.h.girl&&C.mode!=='leave')P(c,-12,7,3,3,'#d8b070');if(C.mode==='parked'||C.mode==='flee'||C.mode==='leave'){P(c,12,-6,3,3,'#8a7050');P(c,12,-7,3,1,'#5a4a3a');}
 c.restore();
 c.globalCompositeOperation='lighter';const tl=c.createRadialGradient(x+1,y+22,0,x+1,y+22,10);tl.addColorStop(0,'rgba(255,40,30,.45)');tl.addColorStop(1,'rgba(255,40,30,0)');c.fillStyle=tl;c.fillRect(x-10,y+12,22,22);
 if(C.mode!=='crashed'&&C.engine!==false){const hl=c.createRadialGradient(x+70,y+16,0,x+70,y+16,44);hl.addColorStop(0,'rgba(255,250,220,.18)');hl.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=hl;c.fillRect(x+20,y-24,80,80);}
 c.globalCompositeOperation='source-over';
 for(const v of G.traffic){const vx=v.x-cx,vy=v.y-cy;if(vx<-140||vx>VW+140)continue;const fw=v.vx>0;
  if(v.type==='semi'){const cab=22,tr=v.len-cab-2,cx0=fw?vx+tr+2:vx,tx0=fw?vx:vx+cab+2;P(c,vx+2,vy+20,v.len,4,SH);P(c,tx0,vy-2,tr,24,'#c8c8c4');P(c,tx0,vy-2,tr,1,'#e8e8e4');for(let i=6;i<tr;i+=12)P(c,tx0+i,vy-1,1,22,'#a8a8a4');P(c,cx0,vy,cab,20,v.col);P(c,fw?cx0+cab-7:cx0+2,vy+2,5,16,'#101418');}
  else{P(c,vx+2,vy+18,v.len,3,SH);P(c,vx,vy,v.len,18,v.col);P(c,vx,vy,v.len,1,shade(v.col,30));const ws=fw?vx+v.len-16:vx+10;P(c,ws,vy+2,6,14,'#101418');if(v.type==='pickup'){P(c,fw?vx+2:vx+v.len-20,vy+2,18,14,shade(v.col,-25));}else P(c,fw?vx+8:vx+v.len-14,vy+3,6,12,'#141a20');}
  c.globalCompositeOperation='lighter';const hx=fw?vx+v.len:vx,hd=fw?1:-1;const g2=c.createRadialGradient(hx+hd*30,vy+9,0,hx+hd*30,vy+9,62);g2.addColorStop(0,'rgba(255,250,220,.32)');g2.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=g2;c.fillRect(hx+hd*30-62,vy-53,124,124);
  const tx2=fw?vx:vx+v.len,g3=c.createRadialGradient(tx2,vy+9,0,tx2,vy+9,12);g3.addColorStop(0,'rgba(255,30,20,.5)');g3.addColorStop(1,'rgba(255,30,20,0)');c.fillStyle=g3;c.fillRect(tx2-12,vy-3,24,24);c.globalCompositeOperation='source-over';
  P(c,hx-(fw?1:0),vy+2,1,3,'#fff8d8');P(c,hx-(fw?1:0),vy+13,1,3,'#fff8d8');P(c,tx2-(fw?0:1),vy+2,1,3,'#e8201a');P(c,tx2-(fw?0:1),vy+13,1,3,'#e8201a');}
 if(G.h.flares){c.globalCompositeOperation='lighter';for(const[fx,fy]of[[30.5,31.4],[27.5,30.9],[24.5,30.5]]){const px=fx*TS-cx,py=fy*TS-cy,k=.7+.3*Math.sin(G.time*23+fx)*Math.sin(G.time*7);const g4=c.createRadialGradient(px,py,0,px,py,34);g4.addColorStop(0,'rgba(255,60,40,'+(.45*k)+')');g4.addColorStop(1,'rgba(255,60,40,0)');c.fillStyle=g4;c.fillRect(px-34,py-34,68,68);}c.globalCompositeOperation='source-over';for(const[fx,fy]of[[30.5,31.4],[27.5,30.9],[24.5,30.5]]){P(c,fx*TS-cx|0,fy*TS-cy|0,3,1,'#ffd0a0');if(Math.random()<.3)G.fx.push({k:'smoke',x:fx*TS,y:fy*TS,vx:rand(-4,4),vy:rand(-10,-4),r:1,gr:4,a:.25,t:0,life:1.4,c:'#c8a0a0'});}}
 c.globalCompositeOperation='source-over';}
function roadOver(c,cx,cy){const blink=((G.time*.8)%1)<.18;for(const[tx,ty,ph]of[[8,4,0],[27,2,1.3],[46,3,2.1],[72,5,.7]]){const bx=tx*TS-cx,by=ty*TS-cy;if(bx<-80||bx>VW+80||by<-120||by>VH+40)continue;
  P(c,bx-1|0,by-60|0,3,62,'rgba(150,155,160,.55)');const a0=G.time*.9+ph;for(let k=0;k<3;k++){const a=a0+k*2.094;for(let r=2;r<28;r+=1.5)P(c,bx+Math.cos(a)*r|0,by-60+Math.sin(a)*r*.55|0,2,1,'rgba(170,175,180,.5)');}
  if(blink){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(bx,by-62,0,bx,by-62,8);g.addColorStop(0,'rgba(255,30,20,.9)');g.addColorStop(1,'rgba(255,30,20,0)');c.fillStyle=g;c.fillRect(bx-8,by-70,16,16);c.globalCompositeOperation='source-over';P(c,bx|0,by-63|0,2,2,'#ff4030');}}
 c.strokeStyle='rgba(30,30,32,.75)';c.lineWidth=1;c.beginPath();for(let x=4;x+9<MW;x+=9){const x1=x*TS+8-cx,x2=(x+9)*TS+8-cx,yy=37*TS-44-cy;if(x2<-20||x1>VW+20)continue;for(const o of[-6,0,6]){c.moveTo(x1+o,yy);c.quadraticCurveTo((x1+x2)/2+o,yy+7,x2+o,yy);}}c.stroke();}
function roadObj(){const H=G.h;if(!H)return'';const e=H.drv,done=e&&(!e.alive||e.state==='cuffed');
 return objRows('WHP 14 · HIGHWAY 287',[[H.docs,'Kontrola drogowa'],H.stage==='twist'?[done,'Zatrzymaj kierowcę']:null,H.stage==='twist'&&(H.trunk||H.girl||done)?[H.trunk&&H.girl,'Udziel pomocy pasażerom']:null]);}
function roadDebrief(){const H=G.h||{};const e=H.drv;const drv=!e?'—':!e.alive?'nie żyje':e.state==='cuffed'?'zatrzymany':'zbiegł';
 let sc=0;if(H.approach==='pas')sc+=10;if(H.plates)sc+=10;if(H.peek)sc+=5;if(H.lic)sc+=5;if(e&&e.alive&&e.state==='cuffed')sc+=15;
 patrolDebrief([['Podejście do auta',H.approach==='pas'?'od strony pasażera (bezpieczne)':H.approach==='drv'?'od strony kierowcy (od jezdni)':'—'],['Sprawdzone tablice',H.plates?'tak':'nie'],['Kierowca',drv],['Margaret Lindqvist',H.trunk?'uratowana':'—'],['Lily Lindqvist',H.girl?'uratowana':'—']],sc);}
LVL.road={id:'road',patrol:true,weather:'fog',crew:{role:'State Trooper',shout:'State Police! Hands!',names:['TPR. HALE','TPR. DIETZ'],uni:{body:'#5c4a34',legs:'#2c2a26',acc:'#d8b048'}},car:{b:'#1c1d20',hi:'#34363a',lo:'#0e0f11',e:'#c8a860',r:'#e4e2da',rh:'#f2f0e8',rl:'#b8b4a8',s:'#c8a860'},ext:'none',terrain:roadTerrain,windows:roadWindows,rooms:ROOMS_ROAD,doors:DOORS_ROAD,furn:FURN_ROAD,lamps:LAMPS_ROAD,cams:[],entries:ENTRIES_ROAD,
 start:startRoad,update:updateRoad,interact:roadInteract,render:roadRender,over:roadOver,decor:roadDecor,stress:roadStress,obj:roadObj,debrief:roadDebrief,
 win:'WHP 14, przyjęłam. Karetka i detektywi są w drodze. Dobra robota.',planTitle:'HIGHWAY 287 · MILA 41',
 nb:{no:'#26-119-0112',pri:'P3',code:'10-38',small:'MIEJSCE',addr:'HIGHWAY 287<br>MILE MARKER 41',facts:[['JEDNOSTKA','WHP 14 · Tpr. Hale, Tpr. Dietz'],['GODZINA','01:12'],['POWÓD','Niesprawne tylne światło']],
  title:'RADIO · ZAPIS',clock:[1,11,40],who:{D:'DISPATCH',C:'WHP 14'},bg:[26,20,28,15.75],
  call:[['C','WHP 14, zatrzymanie pojazdu, Highway 287 przy mili czterdziestej pierwszej.'],['D','WHP 14, przyjęłam. Opis pojazdu?'],['C','Srebrny minivan, Toyota Sienna, tablice Indiany, Lincoln-Mary-siedem-dwa-cztery-jeden. Kierowca i chyba jeden pasażer z tyłu.'],['D','Przyjęłam, zatrzymanie o pierwszej dwanaście.'],['C','Przyjąłem. Podchodzimy.']]}};
