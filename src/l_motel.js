
// ================= MISSION 04: STARLIGHT MOTEL, ROOM 12 (patrol → SWAT) =================
const MOT_X0=i=>6+i*5; // room i (0-based) interior x0..x0+3
const ROOMS_MOTEL=[];const DOORS_MOTEL=[];const FURN_MOTEL=[];
for(let i=0;i<14;i++){const x=MOT_X0(i);ROOMS_MOTEL.push(R_('Pokój '+(i+1),x,16,x+3,20,'carpet'),R_('Łazienka '+(i+1),x,12,x+3,14,'tileW'));DOORS_MOTEL.push([x+1,21,1],[x+1,15]);}
ROOMS_MOTEL.push(R_('Recepcja',2,30,9,36,'lino'));DOORS_MOTEL.push([10,33]);
{const F_=(...a)=>FURN_MOTEL.push(a),r=rng(12);
 for(let i=0;i<14;i++){const x=MOT_X0(i),mine=i===11;
  F_(r()<.5?'bed':'bed',x+(i%2?2:0),17);F_('tableS',x+(i%2?1:3),17);F_('tv',x+(i%2?0:3),20);F_('tub',x+2,12);F_('toilet',x,12);F_('sink',x,14);
  if(mine){F_('clothes',x+2,19);F_('cans',x+1,20);F_('bottle',x+3,18);F_('papers',x+1,19);F_('towels',x+3,14);F_('cash',x+3,19);}
  else if(r()<.4)F_('shoes',x+1,20);}
 for(let i=0;i<14;i++)if(i%2===0)F_('ice',MOT_X0(i)+3,22);
 F_('reception',3,31);F_('chair',4,30);F_('vending',9,30);F_('plant',2,36);F_('bench',6,36);F_('keyrack',2,30);
 F_('police',40,33);F_('car',14,26);F_('car',48,26);F_('car',58,26);F_('car',68,26);F_('neon',22,25);F_('bins',76,22);
 for(const[x,y]of[[25,30],[52,33],[36,28],[62,32],[18,34]])F_('puddle',x,y);
 for(let x=11;x<78;x+=4)F_('lineP',x,25);}
const LAMPS_MOTEL=[];for(let i=0;i<14;i+=2)LAMPS_MOTEL.push([MOT_X0(i)+2,22,1,'#f0d890',40]);LAMPS_MOTEL.push([5,33,2],[22,26,1,'#ff5aa8',64],[63,18,0,'#e8b070',26]);
const ENTRIES_MOTEL=[{n:'Parking motelu',s:'Radiowóz przy wjeździe.',x:42,y:36.5,a:-Math.PI/2,px:42,py:36,drawn:1}];
function motelTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.ASPH,'asph');fillR(5,22,76,23,T.ASPH,'conc');fillR(0,0,79,10,T.ASPH,'grass');
 fillR(6,12,74,20,T.FLOOR,'carpet');H(11,5,75);H(21,5,75);V(5,11,21);V(75,11,21);
 for(let i=1;i<14;i++)V(5+i*5,11,21);for(let i=0;i<14;i++){const x=MOT_X0(i);H(15,x,x+3);}
 fillR(2,30,9,36,T.FLOOR,'lino');H(29,1,10);H(37,1,10);V(1,29,37);V(10,29,37);}
function motelWindows(M,set){for(let i=0;i<14;i++)set(MOT_X0(i)+3,21,T.WIN);set(10,31,T.WIN);set(10,35,T.WIN);set(4,37,T.WIN);}
F('ice',1,1,1,0,(g,x,y)=>{P(g,x+2,y+13,12,3,SH);P(g,x+2,y,12,13,'#c8ccd0');P(g,x+2,y,12,2,'#e0e4e8');P(g,x+4,y+4,8,3,'#3a7ac8');P(g,x+5,y+5,6,1,'#e8f0f8');});
F('lineP',1,1,0,0,(g,x,y)=>{P(g,x+7,y+2,1,14,'rgba(210,210,200,.4)');});
F('keyrack',1,1,1,0,(g,x,y)=>{P(g,x+2,y+13,12,2,SH);P(g,x+2,y,12,13,'#5a4a3a');for(let i=0;i<3;i++)for(let j=0;j<3;j++)P(g,x+4+i*3,y+2+j*4,2,3,['#c8c0a0','#3a7ac8','#c84a3a'][(i+j)%3]);});
F('neon',1,1,1,0,(g,x,y)=>{P(g,x+7,y-2,2,17,'#3a3e44');P(g,x+8,y+14,4,2,SH);P(g,x-14,y-26,44,22,'#1a1418');P(g,x-13,y-25,42,20,'#2a1e26');P(g,x-11,y-22,38,3,'#ff5aa8');P(g,x-11,y-16,26,2,'#5ad8ff');P(g,x-11,y-11,30,2,'#ff5aa8');P(g,x+20,y-16,5,2,'#5ad8ff');});
function motelScenTxt(){}
function startMotel(){G.hostage=null;G.deadline=1e9;
 G.h={phase:1,t:0,drawn:true,neg:0,trust:0,said:{},evac:0,guests:[],swatCalled:false,fadeT:null,dw:null,cr:null,crT:null,crStage:null,gunFound:false,endT:null,peek:false};
 const H=G.h;
 const GP=(b,h,sk)=>({...PAL.patient,body:b,legs:'#2a2a3a',hair:h,head:sk||'#c8a080',face:sk||'#c8a080',visor:'#2a1a12',eyes:1});
 H.rooms=[{i:9,kind:'drunk',n:'Pokój 10',ppl:[['GARY (PIJANY)',GP('#7a6a4a','#5a4a3a','#d0a088')]],exit:[5,34]},
  {i:10,kind:'family',n:'Pokój 11',ppl:[['OJCIEC',GP('#3a4a6a','#2a1a12')],['MATKA',GP('#8a4a5a','#c8a050','#e0c0a8')],['LILY (6)',GP('#e8a0c0','#c8a050','#e0c0a8')],['NOAH (9)',GP('#3a8a5a','#3a2418','#e0c0a8')]],exit:[5,34]},
  {i:12,kind:'couple',n:'Pokój 13',ppl:[['PAN HOLT',GP('#5a5a5a','#c8c8c0')],['PANI HOLT',GP('#6a3a5a','#d8d8d0','#e0c0a8')]],exit:[78,25]}];
 for(const R of H.rooms){R.knocks=0;R.done=false;R.out=0;const x0=MOT_X0(R.i),free=[];for(let y=18;y<=20;y++)for(let x=x0;x<=x0+3;x++)if(walkable(x,y)&&!LV.fsolid[I(x,y)])free.push([x,y]);free.sort((p,q)=>Math.abs(p[0]-(x0+1))-Math.abs(q[0]-(x0+1)));R.units=R.ppl.map(([n,pal],k)=>{const sp=free[k%free.length]||[x0+1,19];const g=mkNPC({tx:sp[0],ty:sp[1],kind:'guest',pal,state:'calm',a:Math.PI/2,name:n,upd:guestUpd});g.R=R;g.k=k;if(n.includes('(6)')||n.includes('(9)'))g.kid=1;H.guests.push(g);return g;});}
 H.mgr=mkNPC({tx:4,ty:32,kind:'clerk',pal:{...PAL.cook,body:'#6a3a3a'},state:'calm',a:Math.PI/2,name:'Ray'});
 H.cr=mkNPC({tx:61,ty:18,kind:'woman',pal:{body:'#8a3a5a',legs:'#2a2a3a',head:'#d8b098',face:'#d8b098',visor:'#2a1a12',hair:'#e0c070',skin:'#d8b098',eyes:1},state:'calm',pose:'kneel',a:Math.PI/2,name:'Crystal',upd:crystalUpd});
 H.dw=mkEnemy({tx:63,ty:19,weap:'ePistol',a:Math.PI/2,st:'guard',pal:{...PAL.boss},name:'Dwayne Pruitt'});H.dw.upd=dwUpd;LV.bw=new Set();LV.curt=new Set([I(MW12().x,MW12().y)]);
 G.police=[];logEv('Nye 7: Starlight Motel, pokój 12 — mężczyzna z bronią');
 setTimeout(()=>{radio('DISPATCH','Nye 7, Starlight Motel, pokój dwunasty. Recepcjonista słyszał kłótnię i widział broń. W środku kobieta. Zachowajcie dystans, wsparcie w drodze.');radio(G.p1.name,'Przyjąłem, jesteśmy na parkingu.',{radio:1});},600);}
function guestUpd(c,dt){const R=c.R;if(c.state==='go'){c.wT=(c.wT||0)+dt;if(c.wT<c.k*.45){moveUnit(c,dt,0,0,0);return;}const drunk=R.kind==='drunk',sp=drunk?24:c.kid?44:48;
  if(drunk){c.sw=(c.sw||0)+dt;if(((c.sw*.6)|0)%4===3){moveUnit(c,dt,Math.cos(c.sw*3),Math.sin(c.sw*2),10);return;}}
  if(npcGo(c,dt,R.exit[0]+(c.k%2),R.exit[1]+((c.k/2)|0),sp)){c.state='calm';c.ev=true;R.out++;if(R.out>=R.units.length&&!R.done){R.done=true;G.h.evac++;logEv(R.n+' ewakuowany');}}}
 else{moveUnit(c,dt,0,0,0);npcFace(c,dt,6);}}
function motelInteract(u){const H=G.h;if(!H)return null;
 if(H.phase===1){
  for(const R of H.rooms){if(R.opened)continue;const x=MOT_X0(R.i)+1;if(nearPt(u,x*TS+8,21*TS+8,20)&&u.y>21*TS)return{k:'house',label:'Zapukaj — '+R.n,dur:.6,f:()=>evacRoom(u,R)};}
  const dx=MOT_X0(11)+1;if(nearPt(u,dx*TS+8,21*TS+8,20)&&u.y>21*TS)return{k:'house',label:'Pokój 12',dur:0,f:negMenu};
  const wx=MOT_X0(11)+3;if(!H.peek&&nearPt(u,wx*TS+8,21*TS+8,16)&&u.y>21*TS)return{k:'house',label:'Przyjrzyj się',dur:.8,f:()=>{H.peek=true;say(u.name,'Zasłony zaciągnięte. Dwa cienie. Jeden stoi przy drzwiach... drugi spokojnie chodzi po pokoju.');}};
  if(H.mgr.alive&&!H.said.mgr&&nearPt(u,H.mgr.x,H.mgr.y,26))return{k:'house',label:'Porozmawiaj z recepcjonistą',dur:0,f:()=>mgrTalk(u)};}
 else{const bx=MOT_X0(11)+3;if(!H.gunFound&&H.crStage!=='armed'&&nearPt(u,bx*TS+8,14*TS+8,16))return{k:'house',label:'Przyjrzyj się',dur:.8,f:()=>{H.gunFound=true;say(u.name,'Pod ręcznikami rewolwer. Naładowany. To nie był jego.');logEv('Rewolwer ukryty w łazience pokoju 12');}};}
 return null;}
function evacRoom(u,R){const H=G.h,x=MOT_X0(R.i)+1,d=LV.doorAt[I(x,21)];knockAt(x*TS+8,21*TS+8);R.knocks++;
 const open=()=>{R.opened=true;d.locked=false;if(d.target===0)toggleDoor(d,R.units[0]);for(const g of R.units){g.state='go';g.out=true;g.path=null;}};
 setTimeout(()=>{if(G.ended)return;
  if(R.kind==='drunk'){if(R.knocks===1){say('GARY (ZZA DRZWI)','Spadajcie... śpię... nie zamawiałem żadnej pizzy...');if(!H.said.dr1){H.said.dr1=1;const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Pijany. Zapukaj jeszcze raz, mocniej.');}return;}
   open();say('GARY (PIJANY)','Co?! Jaki znowu... strzelec? Ja tu płacę, panie władzo! ...Dobra, dobra, idę. Gdzie moje buty...');say(u.name,'Do recepcji. Prosto i nie zatrzymuj się przy oknach.');}
  else if(R.kind==='family'){open();say('MATKA','Boże... dzieci śpią... Lily, Noah, wstajemy, szybko!');say('NOAH (9)','Mamo, co się dzieje?');say(u.name,'Proszę iść do recepcji. Nisko, za mną, nie przy oknach.');}
  else{open();say('PANI HOLT','Słyszeliśmy krzyki przez ścianę od godziny. Bill, weź leki.');say(u.name,'W prawo, na koniec budynku. Nie idźcie w stronę dwunastki.');}
  if(!H.said.ev1){H.said.ev1=1;logEv('Ewakuacja pokoi obok dwunastki');}},1200);}
function mgrTalk(u){const H=G.h;H.said.mgr=1;logEv('Rozmowa z recepcjonistą');
 say(u.name,'Kto wynajął dwunastkę?');say('RAY (RECEPCJA)','Ona. Kobieta, blondynka. Płaciła gotówką za trzy noce. Jego przywiozła wczoraj w nocy.');
 say('RAY (RECEPCJA)','Kłócili się od rana. Potem on wybiegł do auta, wrócił z bronią. Zadzwoniłem.');say(u.name,'Kto jeszcze tu nocuje?');say('RAY (RECEPCJA)','Obok dwunastki: w jedenastce rodzina z dziećmi, w trzynastce starsze małżeństwo. W dziesiątce facet, który od południa pije. Reszta pusta.');}
function negMenu(u){const H=G.h,it=[];const D='DWAYNE (ZZA DRZWI)',C='KOBIETA (ZZA DRZWI)';
 const step=(t,tr,lines)=>({t,f:()=>{H.neg++;H.trust+=tr;for(const[w,s]of lines)say(w===1?u.name:w,s);if(tr<0&&H.trust<=-2&&!H.said.warn){H.said.warn=1;setTimeout(()=>{if(G.ended)return;SND.gun('pistol',MOT_X0(11)*TS+40,19*TS);makeNoise(MOT_X0(11)*TS+40,19*TS,20,'shot');say(D,'Następnym razem celuję w drzwi!');logEv('Strzał ostrzegawczy w pokoju 12');},2500);}}});
 if(H.neg===0){it.push(step('„Biuro szeryfa. Nazywam się Crane. Jak masz na imię?”',1,[[D,'...Dwayne. Odejdźcie od drzwi.'],[C,'Proszę! Pomóżcie mi, on ma broń!']]));
  it.push(step('„Policja! Wyjdź z rękami do góry!”',-1,[[D,'Spróbujcie wejść, to ją zastrzelę!'],[C,'Nie! Nie róbcie nic!']]));
  it.push(step('„Czy ktoś jest ranny?”',1,[[D,'Nikt. Jeszcze nikt.']]));}
 else if(H.neg===1){it.push(step('„Czego potrzebujesz, Dwayne?”',1,[[D,'Auta. Pełnego baku. I żebyście się wynieśli z parkingu.']]));
  it.push(step('„Puść kobietę, wtedy porozmawiamy.”',0,[[D,'Crystal zostaje. Ona dobrze wie dlaczego.'],[1,'(Crystal?)']]));
  it.push(step('„To się nie skończy dobrze, jeśli nie wyjdziesz.”',-1,[[D,'Dla mnie już się skończyło, rozumiesz?!']]));}
 else if(H.neg===2){it.push(step('„Pozwól mi usłyszeć, że Crystal jest cała.”',1,[[C,'Jestem cała. Proszę... po prostu zróbcie, co mówi.'],[1,'Brzmi... dziwnie spokojnie.']]));
  it.push(step('„Załatwię ci auto, ale musisz mi coś dać.”',1,[[D,'Nic nie dam. Macie godzinę.']]));
  it.push(step('„Dwayne, nikt tu nie chce strzelać.”',0,[[D,'To powiedzcie to jej.'],[C,'Dwayne, przestań gadać!']]));}
 else it.push({t:'(Nie odpowiada. Słychać szepty.)',dis:true,f:NOOP});
 if(H.neg>=3&&!H.swatCalled)it.push({t:'Wezwij SWAT (radio)',f:()=>callSwat(u)});
 choiceMenu('Pokój 12 · rozmowa przez drzwi',it);}
function callSwat(u){const H=G.h;if(H.evac<H.rooms.length){const o=G.squad.find(q=>q&&q.alive&&q!==u)||u;say(o.name,'Najpierw wyprowadźmy ludzi z sąsiednich pokoi.');return;}
 H.swatCalled=true;radio(u.name,'Dispatch, Nye 7. Podejrzany zabarykadowany z kobietą, odmawia wyjścia. Goście ewakuowani. Prosimy SWAT.',{radio:1});
 setTimeout(()=>{if(G.ended)return;radio('DISPATCH','Przyjęłam. SWAT szeryfa w drodze, czas dojazdu dwadzieścia minut. Trzymajcie perymetr.');H.fadeT=0;},3500);}
function fadeCard(txt,sub){let el=$('mfade');if(!el){el=document.createElement('div');el.id='mfade';el.style.cssText='position:absolute;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:60;opacity:0;transition:opacity 1.2s;pointer-events:none;font-family:inherit;letter-spacing:.3em;color:#d8d8d0;font-size:calc(var(--u)*2.2)';$('wrap').appendChild(el);}
 el.innerHTML=txt?'<div>'+txt+'</div><div style="font-size:calc(var(--u)*1.2);opacity:.55;margin-top:calc(var(--u)*1.4)">'+(sub||'')+'</div>':'';el.style.opacity=txt?1:0;}
function swatPhase(){const H=G.h;H.phase=2;radioClear();
 // patrol becomes perimeter
 for(const q of G.squad){if(!q)continue;G.units.splice(G.units.indexOf(q),1);const pu=new Unit({team:'police',weap:'ePistol',pal:q.pal});pu.x=(41+G.police.length*3)*TS;pu.y=32*TS;pu.ang=-Math.PI/2;pu.pose='kneel';G.police.push(pu);}
 G.squad=[];const E={x:30,y:30,a:-Math.PI/2},fx=0,fy=-1,rx=1,ry=0,offs=[[0,0],[-1,-.9],[-1,.9],[-2,-.5],[-2,.5]];
 SPECS.forEach((s,si)=>{const o=offs[si];const u=new Unit({team:'squad',spec:s.id,name:s.name,role:s.role,weap:s.weap,fov:s.fov,range:s.range,acc:s.acc,pal:PAL.squad,charges:s.id==='breach'?2:0,flash:s.id==='scout'?3:0,sed:s.id==='medic'?4:0,shoutCd:0});applyLoad(u,s.id==='scout'?{...(G.load||defaultLoad())[si],armor:'heavy',extra:'shield'}:(G.load||defaultLoad())[si]);
  u.x=E.x*TS+8+fx*o[0]*TS+rx*o[1]*TS;u.y=E.y*TS+fy*o[0]*TS+ry*o[1]*TS;u.ang=E.a;u.heading=E.a;unstick(u);G.squad[si]=u;G.units.push(u);});
 G.p1=G.squad[G.p1Spec||0];G.p1.human=1;if(G.players===2){G.p2=G.squad[G.p2Spec||1];G.p2.human=2;}G.order='follow';G.ops=[];G.cam.x=G.p1.x;G.cam.y=G.p1.y;
 G.h.drawn=true;logEv('SWAT szeryfa na miejscu');
 setTimeout(()=>{radio('SGT. WALKER','Patrol, dzięki. Przejmujemy. Pokój dwunasty, jeden uzbrojony, jedna kobieta w środku.',{radio:1});radio('SGT. WALKER','Hayes, ładunek albo taran na drzwi. Grant, tarcza, wchodzisz pierwszy. Uważać na okno — on już raz przez nie patrzył.',{radio:1});},1500);}
function crystalUpd(c,dt){const H=G.h;
 if(c.state==='cuffed'||c.state==='comply'){moveUnit(c,dt,0,0,0);if(c.state==='cuffed'&&!H.said.crc){H.said.crc=1;say('CRYSTAL',H.crStage==='run'?'Puszczaj! To był jego pomysł, nie mój!':'Co wy robicie?! To ja jestem ofiarą!');}return;}
 if(H.phase<2){moveUnit(c,dt,0,0,0);return;}
 const dw=H.dw,down=!dw.alive||dw.state==='cuffed'||dw.state==='surr',inside=G.squad.some(q=>q&&q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]===22);
 if(!H.crStage){moveUnit(c,dt,0,0,0);npcFace(c,dt,6);if(inside)H.crT=(H.crT||0)+dt;if(down||H.crT>3.5){H.crStage='run';c.pose='stand';say('CRYSTAL','Nie!');logEv('Kobieta biegnie do łazienki');}return;}
 if(H.crStage==='run'){if(npcGo(c,dt,MOT_X0(11)+3,13,58))crystalArm(c);}}
function crystalArm(c){const H=G.h;H.crStage='armed';const e=new Unit({team:'enemy',weap:'ePistol',pal:c.pal,fov:130,range:8,name:'Crystal',kind:'suspect'});e.x=c.x;e.y=c.y;e.ang=Math.PI/2;e.home={x:e.x,y:e.y,a:e.ang,st:'guard'};
 const q=nearestSquad(e);e.state='search';e.goal={x:q?q.x:e.x,y:q?q.y:e.y};e.searchT=12;e.arrived=false;e.path=null;e.ico='!';e.icoT=2;e.res=12;
 G.civs.splice(G.civs.indexOf(c),1);G.units.splice(G.units.indexOf(c),1,e);G.enemies.push(e);H.cr=e;H.gunFound=true;
 say('CRYSTAL','Nie weźmiecie nas żywych!');const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Ona ma broń! Łazienka!');logEv('Crystal wyciąga drugą broń z łazienki');}
const MW12=()=>({x:MOT_X0(11)+3,y:21});
function motelWinWatch(dt){const H=G.h,dw=H.dw,w=MW12();if(!dw||!dw.alive||dw.state==='cuffed'||dw.state==='surr'||H.winBroke||H.ws)return;if(H.phase===2&&dw.target)return;
 const guard=G.squad.find(q=>q&&q.alive&&q.shield&&q.winGuard&&q.winGuard.x===w.x&&q.winGuard.y===w.y&&dist(q.x,q.y,q.winGuard.sx*TS+8,q.winGuard.sy*TS+8)<TS*.9);
 let who=null;if(guard){who=guard;H.guardT=(H.guardT||0)+dt;if(H.guardT<6){H.winT=0;return;}H.guardT=-8;}else for(const q of [...G.squad,...G.police])if(q&&q.alive&&q.x>(w.x-.6)*TS&&q.x<(w.x+1.6)*TS&&q.y>21.5*TS&&q.y<25*TS){who=q;break;}
 if(guard){H.ws={t:0,tg:guard,n:0};say('DWAYNE (ZA SZYBĄ)','Schowaj się za tą tarczą, schowaj!');return;}
 if(who&&!H.said.winWarn&&who.human){H.said.winWarn=1;const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Uważaj, stoisz w oknie! Zasłony zasłonięte, ale widzi twój cień.');}
 H.winT=who?(H.winT||0)+dt:Math.max(0,(H.winT||0)-dt);if(H.winT>(H.phase===1?3.2:1.6)&&who){H.winT=0;H.ws={t:0,tg:who,n:0};say('DWAYNE (ZA SZYBĄ)','Myślisz, że cię nie widzę?!');}}
function dwUpd(e,dt){const H=G.h,ws=H.ws;if(!ws)return false;if(e.stun>0||e.state==='surr'||e.state==='cuffed'){H.ws=null;return false;}const w=MW12();
 ws.t+=dt;const px=w.x*TS+8,py=20*TS+6;if(dist(e.x,e.y,px,py)>3){const a=Math.atan2(py-e.y,px-e.x);moveUnit(e,dt,Math.cos(a),Math.sin(a),60);turnTo(e,a,dt,8);if(ws.t<2.5)return true;}
 const tg=ws.tg;turnTo(e,Math.atan2(tg.y-e.y,tg.x-e.x),dt,20);e.pose='stand';if(e.mag<1)e.mag=6;e.fireCd=Math.min(e.fireCd||0,.5);
 if(ws.t>.6&&(e.fireCd||0)<=0&&e.rel<=0){e.ang=Math.atan2(tg.y-2-e.y,tg.x-e.x)+(H.winBroke?rand(-.06,.06):rand(-.22,.22));fire(e);ws.n++;}if(ws.n>=3||ws.t>4){H.ws=null;}return true;}
function breakWin(tx,ty,x,y,a){const i=I(tx,ty);if(!LV.bw)LV.bw=new Set();if(LV.bw.has(i))return;LV.bw.add(i);SND.glass(x,y);SND.glass(x+4,y);
 for(let k=0;k<16;k++)G.fx.push({k:'debris',x:x+rand(-6,6),y:y-6,z:6,vx:Math.cos(a)*rand(20,80)+rand(-30,30),vy:Math.sin(a)*rand(20,80)+rand(-30,30),vz:rand(10,40),t:0,life:rand(.4,.9),c:pick(['#c8e0e8','#e8f4f8','#a8c8d0'])});
 const g=WR[ty]&&WR[ty].getContext('2d');if(g){const bx=tx*TS;P(g,bx+2,17,12,9,'#0c0e10');for(let k=0;k<7;k++){P(g,bx+2+(k*2),17+(k%3),1,2+(k%4),'rgba(200,225,235,.7)');P(g,bx+3+(k*2)%11,25-(k%3),1,1,'rgba(200,225,235,.6)');}if(LV.curt&&LV.curt.has(i)){P(g,bx+2,17,3,9,'#6a2a20');P(g,bx+11,17,3,8,'#6a2a20');}}
 for(let k=0;k<26;k++){const sx=tx*TS+rand(0,16),sy=(ty+1)*TS+rand(0,22),s2=(ty)*TS-rand(0,10);P(wc,sx|0,sy|0,1,1,'rgba(210,235,245,.75)');if(k%3===0)P(wc,sx|0,s2|0,1,1,'rgba(210,235,245,.6)');}
 if(G.lvl==='motel'&&tx===MW12().x&&ty===21&&G.h){G.h.winBroke=true;logEv('Szyba pokoju 12 przestrzelona');}}
function motelDecor(){const w=MW12(),g=WR[w.y]&&WR[w.y].getContext('2d');if(g){const bx=w.x*TS;P(g,bx+2,17,12,9,'#7a3226');for(let k=0;k<12;k+=3)P(g,bx+3+k,17,1,9,'#5a2218');P(g,bx+2,17,12,1,'#9a4a36');}}
function updateMotel(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;motelWinWatch(dt);
 if(H.fadeT!=null){H.fadeT+=dt;if(H.fadeT>.1&&!H.said.f1){H.said.f1=1;fadeCard('20 MINUT PÓŹNIEJ','NYE COUNTY SHERIFF · S.W.A.T.');}
  if(H.fadeT>2.2&&!H.said.f2){H.said.f2=1;swatPhase();}if(H.fadeT>4){fadeCard(null);H.fadeT=null;}}
 if(H.phase===2){const dw=H.dw,cr=H.cr,res=x=>!x.alive||x.state==='cuffed';
  if(H.endT==null&&res(dw)&&res(cr)){H.endT=2.5;}
  if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,'Pokój 12 zabezpieczony. '+(dw.alive?'Dwayne Pruitt zatrzymany':'Dwayne Pruitt nie żyje')+', '+(cr.alive?'Crystal zatrzymana':'Crystal nie żyje')+'.');}}}
function motelRender(c,cx,cy){const H=G.h;const x=22*TS+8-cx,y=25*TS-14-cy;const fl=(Math.sin(G.time*13)>-.85)?1:.4;
 c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,70);g.addColorStop(0,'rgba(255,90,168,'+(.28*fl)+')');g.addColorStop(1,'rgba(255,90,168,0)');c.fillStyle=g;c.fillRect(x-70,y-70,140,140);c.globalCompositeOperation='source-over';}
function motelObj(){const H=G.h;if(!H)return'';if(H.phase===1)return objRows('NYE 7 · STARLIGHT MOTEL',[[H.evac>=H.rooms.length,'Ewakuuj pokoje obok ('+H.evac+'/'+H.rooms.length+')'],[H.neg>0,'Nawiąż kontakt z pokojem 12'],H.neg>=3?[H.swatCalled,'Zdecyduj o dalszych krokach']:null]);
 const dw=H.dw,cr=H.cr,res=x=>!x.alive||x.state==='cuffed';return objRows('SWAT · POKÓJ 12',[[res(dw),'Zneutralizuj podejrzanego'],[res(cr),'Zabezpiecz kobietę']]);}
function motelDebrief(){const H=G.h||{};const dw=H.dw,cr=H.cr;let sc=(H.evac||0)*6-(H.winBroke?8:0)+Math.max(0,H.trust||0)*4;if(dw&&dw.alive)sc+=10;if(cr&&cr.alive&&cr.state==='cuffed')sc+=H.crStage==='armed'?5:15;
 patrolDebrief([['Pokoje ewakuowane',(H.evac||0)+' / 3'],['Szyba pokoju 12',H.winBroke?'przestrzelona przez podejrzanego':'nienaruszona',H.winBroke?'bad':'good'],['Negocjacje',(H.neg||0)+' wymiany · zaufanie '+(H.trust||0)],['Dwayne Pruitt',!dw?'—':!dw.alive?'nie żyje':dw.state==='cuffed'?'zatrzymany':'—'],['Crystal',!cr?'—':!cr.alive?'nie żyje':cr.state==='cuffed'?(H.crStage==='armed'?'zatrzymana (uzbrojona)':'zatrzymana zanim sięgnęła po broń'):'—'],['Druga broń',H.gunFound?'zabezpieczona':'—']],sc);}
LVL.motel={id:'motel',patrol:true,nvg:true,weather:'dust',crew:{role:'Deputy Sheriff',shout:'Sheriff\'s Office! Don\'t move!',names:['DEP. CRANE','DEP. VEGA'],uni:{body:'#a48c62',legs:'#3a4230',acc:'#d8b048'}},car:{s:'#2e6a3a'},ext:'stucco',terrain:motelTerrain,windows:motelWindows,rooms:ROOMS_MOTEL,doors:DOORS_MOTEL,furn:FURN_MOTEL,lamps:LAMPS_MOTEL,cams:[],entries:ENTRIES_MOTEL,
 decor:motelDecor,breakable:true,start:startMotel,update:updateMotel,interact:motelInteract,render:motelRender,stress:NOOP,obj:motelObj,debrief:motelDebrief,
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n.startsWith('Łazienka')?['#7a8688','#5a6668']:n==='Recepcja'?['#6a5a48','#4a3e30']:['#6e5a52','#4c3e38'];},
 win:'SWAT, przyjęłam. Koroner i detektywi w drodze. Dobra robota.',planTitle:'STARLIGHT MOTEL · US-95',
 nb:{no:'#26-130-2217',pri:'P1',code:'245 / 207',small:'ADRES',addr:'STARLIGHT MOTEL<br>POKÓJ 12',facts:[['JEDNOSTKA','Nye County Sheriff · Dep. Crane, Dep. Vega'],['GODZINA','23:48'],['ZGŁOSZENIE','mężczyzna z bronią, kobieta w pokoju']],
  title:'911 · ZAPIS ROZMOWY',clock:[23,41,5],who:{D:'DYSPOZYTOR',C:'RECEPCJA'},bg:[2,20,40,22.5],
  call:[['D','Nye County, numer alarmowy.'],['C','Tu Starlight Motel, przy dziewięćdziesiątce piątce. W dwunastce jest facet z bronią.'],['D','Widział pan broń?'],['C','Tak, przyniósł z samochodu. Kłócił się z kobietą od rana. Teraz krzyczy, że nikt nie wyjdzie.'],['D','Ile osób jest w pokoju?'],['C','Dwie. On i ona. Pokój wynajęła ona... płaciła gotówką.'],['D','Proszę zostać w recepcji i zamknąć drzwi. Policja jest w drodze.']]}};
