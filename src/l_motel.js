
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
 [[9,'MR. & MRS. COLE'],[10,'TRUCKER'],[12,'STUDENTKA'],[13,'STARSZY PAN']].forEach(([i,n],k)=>{const x=MOT_X0(i);const g=mkNPC({tx:x+1,ty:18,kind:'guest',pal:{...PAL.patient,body:['#6a5a4a','#3a4a6a','#8a4a5a','#5a5a5a'][k],legs:'#2a2a3a',hair:['#3a2418','#1e1410','#c8a050','#c8c8c0'][k]},state:'calm',a:Math.PI/2,name:n,upd:guestUpd});g.room=i;g.gi=i;g.ev=false;H.guests.push(g);});
 H.mgr=mkNPC({tx:4,ty:32,kind:'clerk',pal:{...PAL.cook,body:'#6a3a3a'},state:'calm',a:Math.PI/2,name:'Ray'});
 H.cr=mkNPC({tx:61,ty:18,kind:'woman',pal:{body:'#8a3a5a',legs:'#2a2a3a',head:'#d8b098',face:'#d8b098',visor:'#2a1a12',hair:'#e0c070',skin:'#d8b098',eyes:1},state:'calm',pose:'kneel',a:Math.PI/2,name:'Crystal',upd:crystalUpd});
 H.dw=mkEnemy({tx:63,ty:19,weap:'ePistol',a:Math.PI/2,st:'guard',pal:{...PAL.boss},name:'Dwayne Pruitt'});
 G.police=[];logEv('Nye 7: Starlight Motel, pokój 12 — mężczyzna z bronią');
 setTimeout(()=>{radio('DISPATCH','Nye 7, Starlight Motel, pokój dwunasty. Recepcjonista słyszał kłótnię i widział broń. W środku kobieta. Zachowajcie dystans, wsparcie w drodze.');radio(G.p1.name,'Przyjąłem, jesteśmy na parkingu.',{radio:1});},600);}
function guestUpd(c,dt){if(c.state==='go'){if(npcGo(c,dt,5,34,52)){c.state='calm';c.ev=true;G.h.evac++;logEv('Gość ewakuowany do recepcji');}}else{moveUnit(c,dt,0,0,0);npcFace(c,dt,6);}}
function motelInteract(u){const H=G.h;if(!H)return null;
 if(H.phase===1){
  for(const g of H.guests){if(g.state!=='calm'||g.ev||g.out)continue;const x=MOT_X0(g.gi)+1;if(nearPt(u,x*TS+8,21*TS+8,20)&&u.y>21*TS)return{k:'house',label:'Zapukaj — ewakuuj gości z '+(g.gi+1),dur:.6,f:()=>evacGuest(u,g)};}
  const dx=MOT_X0(11)+1;if(nearPt(u,dx*TS+8,21*TS+8,20)&&u.y>21*TS)return{k:'house',label:'Pokój 12',dur:0,f:negMenu};
  const wx=MOT_X0(11)+3;if(!H.peek&&nearPt(u,wx*TS+8,21*TS+8,16)&&u.y>21*TS)return{k:'house',label:'Przyjrzyj się',dur:.8,f:()=>{H.peek=true;say(u.name,'Zasłony zaciągnięte. Dwa cienie. Jeden stoi przy drzwiach... drugi spokojnie chodzi po pokoju.');}};
  if(H.mgr.alive&&!H.said.mgr&&nearPt(u,H.mgr.x,H.mgr.y,26))return{k:'house',label:'Porozmawiaj z recepcjonistą',dur:0,f:()=>mgrTalk(u)};}
 else{const bx=MOT_X0(11)+3;if(!H.gunFound&&H.crStage!=='armed'&&nearPt(u,bx*TS+8,14*TS+8,16))return{k:'house',label:'Przyjrzyj się',dur:.8,f:()=>{H.gunFound=true;say(u.name,'Pod ręcznikami rewolwer. Naładowany. To nie był jego.');logEv('Rewolwer ukryty w łazience pokoju 12');}};}
 return null;}
function evacGuest(u,g){const H=G.h,x=MOT_X0(g.gi)+1,d=LV.doorAt[I(x,21)];knockAt(x*TS+8,21*TS+8);
 setTimeout(()=>{if(G.ended)return;d.locked=false;if(d.target===0)toggleDoor(d,g);g.state='go';g.out=true;
  say(g.name,pick(['Co się dzieje? ...Dobrze, już idziemy.','Słyszałem krzyki całą noc. Już wychodzę.','O Boże... mam tylko buty założyć.','Ta para z dwunastki? Wiedziałem, że coś będzie.']));
  if(!H.said.ev1){H.said.ev1=1;say(u.name,'Proszę iść do recepcji i tam zostać. Nie przy oknach.');}},1200);}
function mgrTalk(u){const H=G.h;H.said.mgr=1;logEv('Rozmowa z recepcjonistą');
 say(u.name,'Kto wynajął dwunastkę?');say('RAY (RECEPCJA)','Ona. Kobieta, blondynka. Płaciła gotówką za trzy noce. Jego przywiozła wczoraj w nocy.');
 say('RAY (RECEPCJA)','Kłócili się od rana. Potem on wybiegł do auta, wrócił z bronią. Zadzwoniłem.');say(u.name,'Kto jeszcze tu nocuje?');say('RAY (RECEPCJA)','Dziesiątka, jedenastka, trzynastka, czternastka. Reszta pusta.');}
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
function callSwat(u){const H=G.h;if(H.evac<H.guests.length){const o=G.squad.find(q=>q&&q.alive&&q!==u)||u;say(o.name,'Najpierw wyprowadźmy ludzi z sąsiednich pokoi.');return;}
 H.swatCalled=true;radio(u.name,'Dispatch, Nye 7. Podejrzany zabarykadowany z kobietą, odmawia wyjścia. Goście ewakuowani. Prosimy SWAT.',{radio:1});
 setTimeout(()=>{if(G.ended)return;radio('DISPATCH','Przyjęłam. SWAT szeryfa w drodze, czas dojazdu dwadzieścia minut. Trzymajcie perymetr.');H.fadeT=0;},3500);}
function fadeCard(txt,sub){let el=$('mfade');if(!el){el=document.createElement('div');el.id='mfade';el.style.cssText='position:absolute;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:60;opacity:0;transition:opacity 1.2s;pointer-events:none;font-family:inherit;letter-spacing:.3em;color:#d8d8d0;font-size:calc(var(--u)*2.2)';$('wrap').appendChild(el);}
 el.innerHTML=txt?'<div>'+txt+'</div><div style="font-size:calc(var(--u)*1.2);opacity:.55;margin-top:calc(var(--u)*1.4)">'+(sub||'')+'</div>':'';el.style.opacity=txt?1:0;}
function swatPhase(){const H=G.h;H.phase=2;radioClear();
 // patrol becomes perimeter
 for(const q of G.squad){if(!q)continue;G.units.splice(G.units.indexOf(q),1);const pu=new Unit({team:'police',weap:'ePistol',pal:q.pal});pu.x=(41+G.police.length*3)*TS;pu.y=32*TS;pu.ang=-Math.PI/2;pu.pose='kneel';G.police.push(pu);}
 G.squad=[];const E={x:30,y:30,a:-Math.PI/2},fx=0,fy=-1,rx=1,ry=0,offs=[[0,0],[-1,-.9],[-1,.9],[-2,-.5],[-2,.5]];
 SPECS.forEach((s,si)=>{const o=offs[si];const u=new Unit({team:'squad',spec:s.id,name:s.name,role:s.role,weap:s.weap,fov:s.fov,range:s.range,acc:s.acc,pal:PAL.squad,charges:s.id==='breach'?2:0,flash:s.id==='scout'?3:0,sed:s.id==='medic'?4:0,shoutCd:0});applyLoad(u,(G.load||defaultLoad())[si]);
  u.x=E.x*TS+8+fx*o[0]*TS+rx*o[1]*TS;u.y=E.y*TS+fy*o[0]*TS+ry*o[1]*TS;u.ang=E.a;u.heading=E.a;unstick(u);G.squad[si]=u;G.units.push(u);});
 G.p1=G.squad[G.p1Spec||0];G.p1.human=1;if(G.players===2){G.p2=G.squad[G.p2Spec||1];G.p2.human=2;}G.order='follow';G.ops=[];G.cam.x=G.p1.x;G.cam.y=G.p1.y;
 G.h.drawn=true;logEv('SWAT szeryfa na miejscu');
 setTimeout(()=>{radio('SGT. WALKER','Patrol, dzięki. Przejmujemy. Pokój dwunasty, jeden uzbrojony, jedna kobieta w środku.',{radio:1});radio('SGT. WALKER','Hayes, ładunek albo taran na drzwi. Wchodzimy na mój znak.',{radio:1});},1500);}
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
function updateMotel(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;
 if(H.fadeT!=null){H.fadeT+=dt;if(H.fadeT>.1&&!H.said.f1){H.said.f1=1;fadeCard('20 MINUT PÓŹNIEJ','NYE COUNTY SHERIFF · S.W.A.T.');}
  if(H.fadeT>2.2&&!H.said.f2){H.said.f2=1;swatPhase();}if(H.fadeT>4){fadeCard(null);H.fadeT=null;}}
 if(H.phase===2){const dw=H.dw,cr=H.cr,res=x=>!x.alive||x.state==='cuffed';
  if(H.endT==null&&res(dw)&&res(cr)){H.endT=2.5;}
  if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,'Pokój 12 zabezpieczony. '+(dw.alive?'Dwayne Pruitt zatrzymany':'Dwayne Pruitt nie żyje')+', '+(cr.alive?'Crystal zatrzymana':'Crystal nie żyje')+'.');}}}
function motelRender(c,cx,cy){const H=G.h;const x=22*TS+8-cx,y=25*TS-14-cy;const fl=(Math.sin(G.time*13)>-.85)?1:.4;
 c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,70);g.addColorStop(0,'rgba(255,90,168,'+(.28*fl)+')');g.addColorStop(1,'rgba(255,90,168,0)');c.fillStyle=g;c.fillRect(x-70,y-70,140,140);c.globalCompositeOperation='source-over';}
function motelObj(){const H=G.h;if(!H)return'';if(H.phase===1)return objRows('NYE 7 · STARLIGHT MOTEL',[[H.evac>=H.guests.length,'Ewakuuj sąsiednie pokoje ('+H.evac+'/'+H.guests.length+')'],[H.neg>0,'Nawiąż kontakt z pokojem 12'],H.neg>=3?[H.swatCalled,'Zdecyduj o dalszych krokach']:null]);
 const dw=H.dw,cr=H.cr,res=x=>!x.alive||x.state==='cuffed';return objRows('SWAT · POKÓJ 12',[[res(dw),'Zneutralizuj podejrzanego'],[res(cr),'Zabezpiecz kobietę']]);}
function motelDebrief(){const H=G.h||{};const dw=H.dw,cr=H.cr;let sc=(H.evac||0)*4+Math.max(0,H.trust||0)*4;if(dw&&dw.alive)sc+=10;if(cr&&cr.alive&&cr.state==='cuffed')sc+=H.crStage==='armed'?5:15;
 patrolDebrief([['Goście ewakuowani',(H.evac||0)+' / 4'],['Negocjacje',(H.neg||0)+' wymiany · zaufanie '+(H.trust||0)],['Dwayne Pruitt',!dw?'—':!dw.alive?'nie żyje':dw.state==='cuffed'?'zatrzymany':'—'],['Crystal',!cr?'—':!cr.alive?'nie żyje':cr.state==='cuffed'?(H.crStage==='armed'?'zatrzymana (uzbrojona)':'zatrzymana zanim sięgnęła po broń'):'—'],['Druga broń',H.gunFound?'zabezpieczona':'—']],sc);}
LVL.motel={id:'motel',patrol:true,nvg:true,weather:'dust',crew:{role:'Deputy Sheriff',shout:'Sheriff\'s Office! Don\'t move!',names:['DEP. CRANE','DEP. VEGA'],uni:{body:'#a48c62',legs:'#3a4230',acc:'#d8b048'}},car:{s:'#2e6a3a'},ext:'stucco',terrain:motelTerrain,windows:motelWindows,rooms:ROOMS_MOTEL,doors:DOORS_MOTEL,furn:FURN_MOTEL,lamps:LAMPS_MOTEL,cams:[],entries:ENTRIES_MOTEL,
 start:startMotel,update:updateMotel,interact:motelInteract,render:motelRender,stress:NOOP,obj:motelObj,debrief:motelDebrief,
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n.startsWith('Łazienka')?['#7a8688','#5a6668']:n==='Recepcja'?['#6a5a48','#4a3e30']:['#6e5a52','#4c3e38'];},
 win:'SWAT, przyjęłam. Koroner i detektywi w drodze. Dobra robota.',planTitle:'STARLIGHT MOTEL · US-95',
 nb:{no:'#26-130-2217',pri:'P1',code:'245 / 207',small:'ADRES',addr:'STARLIGHT MOTEL<br>POKÓJ 12',facts:[['JEDNOSTKA','Nye County Sheriff · Dep. Crane, Dep. Vega'],['GODZINA','23:48'],['ZGŁOSZENIE','mężczyzna z bronią, kobieta w pokoju']],
  title:'911 · ZAPIS ROZMOWY',clock:[23,41,5],who:{D:'DYSPOZYTOR',C:'RECEPCJA'},bg:[2,20,40,22.5],
  call:[['D','Nye County, numer alarmowy.'],['C','Tu Starlight Motel, przy dziewięćdziesiątce piątce. W dwunastce jest facet z bronią.'],['D','Widział pan broń?'],['C','Tak, przyniósł z samochodu. Kłócił się z kobietą od rana. Teraz krzyczy, że nikt nie wyjdzie.'],['D','Ile osób jest w pokoju?'],['C','Dwie. On i ona. Pokój wynajęła ona... płaciła gotówką.'],['D','Proszę zostać w recepcji i zamknąć drzwi. Policja jest w drodze.']]}};
