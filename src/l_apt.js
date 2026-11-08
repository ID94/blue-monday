
// ================= MISSION 03: WELFARE CHECK, APT 3B =================
const ROOMS_APT=[
 R_('Klatka schodowa',11,24,14,26,'conc'),R_('Korytarz III piętra',15,24,69,26,'lino'),
 R_('Sypialnia Ruth',30,11,36,15,'carpet'),R_('Salon 3B',30,17,36,22,'wood'),R_('Przedpokój 3B',38,17,40,22,'lino'),R_('Kuchnia 3B',42,17,47,22,'tileW'),
 R_('Pokój Gary’ego',38,11,42,15,'wood'),R_('Łazienka 3B',44,11,47,15,'tileW'),
 R_('Mieszkanie 3A',11,11,28,22,'wood'),R_('Mieszkanie 3C',49,11,60,22,'wood'),R_('Mieszkanie 3D',62,11,69,22,'wood'),
 R_('Mieszkanie 3E',11,28,33,43,'wood'),R_('Mieszkanie 3F',35,28,51,43,'wood'),R_('Mieszkanie 3G',53,28,69,43,'wood')];
const DOORS_APT=[[39,23,1],[33,16,1],[39,16],[45,16],[22,23,1],[54,23,1],[65,23,1],[24,27,1],[42,27,1],[60,27,1]];
const FURN_APT=[];
{const F_=(...a)=>FURN_APT.push(a);
 // korytarz
 F_('stairs',11,24);F_('stairs',11,25);F_('stairs',11,26);F_('elev',16,24);F_('ladder',27,26);F_('bins',68,24);F_('doormat',39,24);F_('slush',13,25);F_('slush',16,25);F_('slush',19,26);F_('slush',23,25);F_('slush',28,25);F_('doormat',22,24);F_('doormat',54,24);F_('mail',38,24);F_('mail',40,25);F_('papers',30,26);F_('stain',47,25);
 // salon
 F_('rug',31,18,4,3);F_('tvOld',31,17);F_('armch',32,19);F_('tableS',34,19);F_('news',30,21);F_('news',30,22);F_('news',31,22);F_('news',36,22);F_('news',36,21);F_('bags',35,17);F_('deadplant',36,17);F_('papers',33,21);F_('bottle',34,20);
 // przedpokój
 F_('cab',40,17);F_('shoes',38,22);F_('news',38,17);F_('umbrella',40,22);F_('fresh',35,15);
 // kuchnia
 F_('counter',42,17);F_('sink',43,17);F_('stove',44,17);F_('counter',45,17);F_('counter',46,17);F_('fridge',47,17);F_('table',44,20);F_('chair',43,20);F_('chairX',46,21);F_('dishes',42,18);F_('bags',47,22);F_('mail',44,20);F_('trash',42,22);F_('stain',45,19);
 // sypialnia Ruth
 F_('bedD',31,11);F_('tableS',30,11);F_('cab',36,11);F_('fresh',33,13);F_('fresh',35,14);F_('towels',33,15);F_('slippers',30,14);F_('lampFl',36,14);
 // pokój Gary'ego
 F_('mattress',38,11);F_('tableS',42,11);F_('cash',41,13);F_('pizza',39,14);F_('cans',42,14);F_('clothes',40,12);F_('ashtray',42,12);F_('tvOld',42,15);
 // łazienka
 F_('tub',44,11);F_('toilet',47,11);F_('sink',47,13);F_('pills',46,14);F_('towels',45,13);
 // inne mieszkania (widoczne tylko przez okna / zamknięte)
 F_('sofa',14,15);F_('tv',14,13);F_('bed',24,12);F_('table',52,15);F_('bed',66,12);F_('sofa',20,33);F_('bed',40,36);F_('table',60,35);
}
const LAMPS_APT=[[20,25,1,'#e8f0e0',48],[35,25,1,'#e8f0e0',48],[50,25,2],[63,25,1,'#e8f0e0',48],[13,25,0,'#d8d8c0',40],[40,13,0,'#ffb060',30],[44,19,2],[34,19,2],[32,12,2],[46,13,1,'#c8d8e0',18]];
const ENTRIES_APT=[{n:'Klatka schodowa',s:'Trzecie piętro, Pine Court Apartments.',x:13,y:25.3,a:0,px:13,py:25}];
function aptTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.ASPH,'conc');fillR(11,11,69,43,T.FLOOR,'wood');
 H(10,10,70);H(44,10,70);V(10,10,44);V(70,10,44);H(23,11,69);H(27,11,69);
 V(29,11,22);V(48,11,22);V(61,11,22);V(34,28,43);V(52,28,43);
 H(16,30,36);V(37,11,15);V(37,17,22);set(37,19,T.FLOOR);H(16,38,47);V(43,11,15);V(41,17,22);set(41,20,T.FLOOR);
 for(let y=24;y<=26;y++)set(15,y,T.FLOOR);}
function aptWindows(M,set){for(const x of[14,20,26,32,35,40,46,52,58,65])set(x,10,T.WIN);for(const x of[15,22,30,40,47,57,65])set(x,44,T.WIN);set(70,25,T.WIN);set(10,18,T.WIN);}
// props
F('slush',1,1,0,0,(g,x,y)=>{P(g,x+3,y+6,4,6,'rgba(150,170,190,.35)');P(g,x+4,y+7,2,4,'rgba(210,220,235,.3)');P(g,x+9,y+3,4,6,'rgba(150,170,190,.3)');P(g,x+10,y+4,2,4,'rgba(210,220,235,.28)');});
F('stairs',1,1,0,0,(g,x,y)=>{for(let i=0;i<16;i+=4){P(g,x,y+i,16,3,'#3a3c3e');P(g,x,y+i+3,16,1,'#1e2022');}P(g,x+14,y,2,16,'#5a4a3a');});
F('elev',1,1,1,1,(g,x,y)=>{P(g,x,y-10,16,25,'#5a5e62');P(g,x+1,y-9,14,23,'#7a7e82');P(g,x+7,y-9,1,23,'#4a4e52');P(g,x+3,y-4,10,5,'#e8e4c8');P(g,x+4,y-3,8,1,'#b02a20');P(g,x+4,y-1,8,1,'#b02a20');});
F('ladder',1,1,1,0,(g,x,y)=>{P(g,x+3,y-8,2,22,'#8a8a84');P(g,x+11,y-8,2,22,'#8a8a84');for(let i=-6;i<14;i+=4)P(g,x+3,y+i,10,1,'#9a9a94');P(g,x+2,y+13,12,2,SH);});
F('doormat',1,1,0,0,(g,x,y)=>{P(g,x+2,y+4,12,8,'#4a3a2a');P(g,x+3,y+5,10,6,'#5a4a36');});
F('news',1,1,1,0,(g,x,y,w,h,s)=>{P(g,x+2,y+13,12,2,SH);const k=3+(s%3);for(let i=0;i<k;i++){const c=['#c8c4b4','#b8b4a4','#d4d0c0'][i%3];P(g,x+2+(i%2),y+11-i*2,12,3,c);P(g,x+3,y+12-i*2,10,1,'#8a8678');}});
F('bags',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,13,3,SH);P(g,x+2,y+5,7,8,'#1a1a1c');P(g,x+8,y+4,7,9,'#222226');P(g,x+4,y+4,2,2,'#3a3a3e');P(g,x+10,y+3,2,2,'#3a3a3e');});
F('armch',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,14,3,SH);P(g,x+1,y+3,14,11,'#5a3e2e');P(g,x+3,y+5,10,7,'#6e4e3a');P(g,x+1,y+3,14,2,'#4a3022');});
F('tvOld',1,1,1,0,(g,x,y)=>{P(g,x+1,y+12,14,3,SH);P(g,x+1,y+2,14,11,'#2a2620');P(g,x+3,y+4,10,7,'#101418');P(g,x+12,y+11,2,1,'#c03020');});
F('fresh',1,1,0,0,(g,x,y)=>{for(const[a,b]of[[3,6],[7,9],[11,5],[5,11],[10,12]]){P(g,x+a,y+b,2,3,'#e8e8e0');P(g,x+a,y+b,2,1,'#5a9ac8');}});
F('dishes',1,1,0,0,(g,x,y)=>{P(g,x+3,y+3,9,8,'#d8d4c8');P(g,x+4,y+4,7,2,'#8a7a5a');P(g,x+5,y+7,6,2,'#6a8a4a');P(g,x+10,y+9,3,3,'#3a5a2a');});
F('mattress',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,3,SH);P(g,x+1,y+3,30,10,'#b8b0a0');P(g,x+2,y+4,10,4,'#d8d4c8');P(g,x+14,y+5,14,6,'#5a5a6a');P(g,x+20,y+8,5,3,'rgba(90,70,40,.5)');});
F('cash',1,1,0,0,(g,x,y)=>{P(g,x+3,y+5,8,5,'#d8d0b0');P(g,x+4,y+6,6,1,'#5a8a4a');P(g,x+7,y+8,8,5,'#c8c0a0');P(g,x+11,y+4,4,3,'#2a4a8a');});
F('pills',1,1,0,0,(g,x,y)=>{P(g,x+3,y+6,10,4,'#d8d8e0');for(let i=0;i<5;i++)P(g,x+4+i*2,y+7,1,2,['#c83a2a','#e8c830','#3a8ac8','#e8e8e8','#c83a2a'][i]);});
// level
const APT={tv:{x:31*TS+8,y:17*TS+8},body:{x:32*TS+8,y:12*TS+8},door:{x:39*TS+8,y:23*TS+8},mdoor:{x:33*TS+8,y:16*TS+8},a3:{x:22*TS+8,y:23*TS+8},stairs:{x:12*TS+8,y:25*TS+8}};
const CLUES_APT=[
 {id:'news',x:31,y:21,msg:'Stosy gazet. Najstarsze z kwietnia, najnowsze z wczoraj. Żadna nie była otwierana.'},
 {id:'mail',x:43,y:21,msg:'Listy z Social Security i z banku, zaadresowane do Ruth Hensley. Wszystkie otwarte.'},
 {id:'stmt',x:45,y:21,msg:'Wyciąg z konta Ruth: co tydzień wypłata z bankomatu, zawsze trzysta dolarów. Od kwietnia.'},
 {id:'fridge',x:47,y:18,msg:'Lodówka pełna świeżych zakupów. Ktoś tu regularnie przynosi jedzenie.'},
 {id:'cal',x:42,y:19,msg:'Kalendarz w kuchni zatrzymany na kwietniu. Czternasty zakreślony długopisem.'},
 {id:'pills',x:46,y:15,msg:'Organizer na leki podpisany „Ruth”. Tabletki nietknięte od kwietnia.'},
 {id:'cash',x:41,y:14,msg:'Koperty z gotówką i karta debetowa na nazwisko Ruth Hensley.'},
 {id:'key',x:38,y:13,msg:'Mały kluczyk na sznurku, przywiązany do ramy materaca.',f:()=>{G.h.key=true;}},
 {id:'fresh',x:35,y:18,msg:'Pod drzwiami sypialni wciśnięte ręczniki. Na podłodze puste odświeżacze powietrza.'}];
function startApt(){G.hostage=null;G.deadline=1e9;
 G.h={t:0,knocked:false,inside:false,tvOn:true,key:false,body:false,clues:CLUES_APT.map(c=>({...c,found:false})),nf:0,said:{},gary:null,gStage:null,endT:null,res:null};
 const s=mkNPC({tx:26,ty:25,kind:'janitor',pal:{...PAL.janitor},state:'idle',a:Math.PI,name:'Alvarez'});G.h.sup=s;
 const b=new Unit({team:'civ',kind:'corpse',pal:{body:'#8a7a9a',legs:'#6a5a7a',head:'#9a8a7a',face:'#9a8a7a',visor:'#2a1a12',hair:'#c8c8c0',eyes:1},r:4});b.alive=false;b.pose='dead';b.deathT=9;b.fallA=-Math.PI/2;b.mseed=17;b.x=APT.body.x;b.y=APT.body.y;G.units.push(b);
 G.police=[];logEv('Beat 1123: sprawdzenie, Pine Court, mieszkanie 3B');
 setTimeout(()=>{radio('DISPATCH','Beat 1123, Pine Court Apartments, trzecie piętro, mieszkanie 3B. Sprawdzenie stanu lokatorki, Ruth Hensley, siedemdziesiąt osiem lat.');radio(G.p1.name,'Przyjąłem, jesteśmy na klatce.',{radio:1});},600);}
function aptInteract(u){const H=G.h;if(!H)return null;const d=LV.doorAt[I(39,23)],md=LV.doorAt[I(33,16)];
 if(d&&d.locked&&d.target===0&&nearPt(u,APT.door.x,APT.door.y,22)&&u.y>23*TS)return{k:'house',label:'Drzwi 3B',dur:0,f:aptDoorMenu};
 if(nearPt(u,APT.a3.x,APT.a3.y,20)&&u.y>23*TS&&!H.said.feld)return{k:'house',label:'Zapukaj do 3A',dur:0,f:feldman};
 if(H.sup.alive&&H.sup.state==='idle'&&nearPt(u,H.sup.x,H.sup.y,22)&&!H.said.sup)return{k:'house',label:'Porozmawiaj z dozorcą',dur:0,f:superTalk};
 if(H.tvOn&&nearPt(u,APT.tv.x,APT.tv.y,20))return{k:'house',label:'Wyłącz telewizor',dur:.5,f:()=>{H.tvOn=false;logEv('Telewizor wyłączony');say(u.name,'Cisza... teraz dopiero czuć ten zapach.');}};
 if(md&&md.locked&&nearPt(u,APT.mdoor.x,APT.mdoor.y,20))return H.key?{k:'house',label:'Otwórz kłódkę kluczykiem',dur:1.4,f:()=>openMom(u,false)}:{k:'house',label:'Kłódka — wyważ drzwi',dur:2.6,f:()=>openMom(u,true)};
 if(H.body&&!H.said.bodyLook&&nearPt(u,APT.body.x,APT.body.y,26))return{k:'house',label:'Przyjrzyj się',dur:.8,f:()=>{H.said.bodyLook=1;say(u.name,'To ona. Ruth Hensley. Nie żyje od dawna... tygodnie. Może miesiące.');radio(u.name,'Dispatch, Beat 1123. Mamy zwłoki w 3B, prawdopodobnie od kilku miesięcy. Potrzebny koroner i detektywi.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Przyjęłam, wysyłam. Zabezpieczcie mieszkanie.');},5000);}};
 const c=clueAt(u,H.clues);if(c)return{k:'house',label:'Przyjrzyj się',dur:.8,f:(u)=>findClueGen(u,c,H)};
 return null;}
function aptDoorMenu(u){const H=G.h,d=LV.doorAt[I(39,23)];const it=[];
 it.push({t:'Zapukaj',f:()=>{H.knocked=true;knockAt(APT.door.x,APT.door.y);say(u.name,'Policja! Pani Hensley, wszystko w porządku?');setTimeout(()=>{if(!G.ended&&!H.said.k2){H.said.k2=1;const o=G.squad.find(q=>q&&q.alive&&q!==u)||u;say(o.name,'Nic. Tylko ten telewizor. I... czujesz to?');}},2600);}});
 it.push({t:'Wejdź siłą (wyważ drzwi)',dis:!H.knocked,f:()=>{u.action={t:0,dur:2,label:'Wyważanie',pose:'stand',done:()=>{d.locked=false;d.broken=true;SND.kick(d.x*TS+8,d.y*TS+8);makeNoise(d.x*TS+8,d.y*TS+8,14,'door');logEv('Drzwi 3B wyważone');}};}});
 choiceMenu('Mieszkanie 3B',it);}
function knockAt(x,y){if(!A.ctx)return;const o=out(x,y,.5,{rev:.25}),t0=A.ctx.currentTime;if(o)for(let k=0;k<3;k++){nz(o,t0+k*.24,.08,{brown:1,type:'lowpass',f:420,g:1});tone(o,t0+k*.24,.06,{f:110,f2:70,g:.5});}}
function feldman(u){const H=G.h;H.said.feld=1;knockAt(APT.a3.x,APT.a3.y);logEv('Rozmowa z sąsiadem z 3A');
 say('MR. FELDMAN (3A)','Kto tam? ...Policja? Chodzi o Ruth?');say(u.name,'Kiedy ostatnio widział pan panią Hensley?');say('MR. FELDMAN (3A)','Ruth? Latem chyba... nie, wiosną. Jej syn przychodzi co tydzień z zakupami. Mówi, że mama choruje i nie chce gości.');say('MR. FELDMAN (3A)','I ten telewizor... gra dzień i noc od miesięcy.');}
function superTalk(u){const H=G.h;H.said.sup=1;logEv('Rozmowa z dozorcą');say(u.name,'Dzień dobry. Ma pan klucz do 3B?');say('ALVAREZ','Mam zapasowy. Ale syn pani Hensley wymienił zamek w kwietniu... Mówił, że ktoś się włamywał. Mojego klucza już nie pasuje.');say('ALVAREZ','Jak pan chce, to tylko siłą.');}
function openMom(u,force){const H=G.h,md=LV.doorAt[I(33,16)];md.locked=false;if(force){md.broken=true;SND.kick(APT.mdoor.x,APT.mdoor.y);makeNoise(APT.mdoor.x,APT.mdoor.y,12,'door');}else{toggleDoor(md,u);}
 H.body=true;logEv('Zamknięta sypialnia: zwłoki Ruth Hensley');setTimeout(()=>{if(G.ended)return;const o=G.squad.find(q=>q&&q.alive&&q!==u)||u;say(o.name,'O Boże...');say(u.name,'Nie wchodź dalej. Zostaw to koronerowi.');},800);
 if(!H.gary)setTimeout(spawnGary,rand(9000,14000));}
function spawnGary(){const H=G.h;if(H.gary||G.ended)return;const g=mkNPC({tx:12,ty:25,kind:'suspect',pal:{body:'#5a5a4a',legs:'#33332e',head:'#c4a088',face:'#c4a088',visor:'#2a1a12',hair:'#4a3a2a',skin:'#c4a088',eyes:1},state:'gwalk',a:0,name:'Gary Hensley',upd:updateGary});
 H.gary=g;H.gStage='walk';logEv('Na klatce schodowej pojawia się Gary Hensley z zakupami');}
function updateGary(c,dt){const H=G.h;
 if(c.state==='cuffed'||c.state==='comply'){moveUnit(c,dt,0,0,0);if(c.state==='cuffed'&&!H.said.gcuff){H.said.gcuff=1;say('GARY HENSLEY','To nie tak... ona po prostu umarła. We śnie. Ja tylko... potrzebowałem tych pieniędzy.');}return;}
 const seen=G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,c.x,c.y)<TS*8&&losClear(q.x,q.y,c.x,c.y));
 if(H.gStage==='walk'){if(npcGo(c,dt,39,24,24)){c.ang=-Math.PI/2;}
  if(seen){H.gStage='react';SND.glass(c.x,c.y);logEv('Gary upuszcza zakupy');say('GARY HENSLEY','Co... co wy tu robicie? To jest mieszkanie mojej mamy!');H.gT=0;H.gChoice=Math.random()<.6?'flee':'lie';}
  else if(dist(c.x,c.y,39*TS+8,24*TS+8)<20&&!H.said.gmom){H.said.gmom=1;say('GARY HENSLEY','Mamo, jestem! Przyniosłem zakupy!');}}
 else if(H.gStage==='react'){H.gT+=dt;moveUnit(c,dt,0,0,0);npcFace(c,dt,12);
  if(H.gT>2.2){if(H.gChoice==='lie'){H.gStage='lie';say('GARY HENSLEY','Mama śpi. Jest chora. Proszę stąd wyjść, nie macie prawa!');}else{H.gStage='flee';say('GARY HENSLEY','Nie... nie!');const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Ucieka! Na schody!');logEv('Gary ucieka');}}}
 else if(H.gStage==='lie'){moveUnit(c,dt,0,0,0);npcFace(c,dt,12);H.gT+=dt;if(H.gT>14){H.gStage='flee';say('GARY HENSLEY','Nie zamkniecie mnie!');}}
 else if(H.gStage==='flee'){npcGo(c,dt,11,25,52);if(dist(c.x,c.y,11*TS+8,25*TS+8)<10&&!G.ended)endMission(false,'Gary Hensley uciekł schodami.');}}
function updateApt(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;
 if(!H.inside&&G.squad.some(q=>q&&q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]>=2&&LV.room[I(q.x/TS|0,q.y/TS|0)]<=7))H.inside=true;
 if(!H.said.smell&&anySquadNear(APT.door.x,APT.door.y,TS*4)){H.said.smell=1;const o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;say(o.name,'Czujesz? Słodkawy... wiesz, co to za zapach.');}
 if(!H.gary&&H.t>280)spawnGary();

 const g=H.gary,gd=g&&(g.state==='cuffed'||!g.alive);
 if(H.endT==null&&H.body&&gd){H.endT=2.5;H.res=g.alive?'arrested':'dead';}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0&&!G.ended)endMission(true,H.res==='arrested'?'Ruth Hensley odnaleziona. Gary Hensley zatrzymany.':'Ruth Hensley odnaleziona. Gary Hensley nie żyje.');}}
function aptStress(dt,L){tvAudio(L,APT.tv,G.h&&G.h.tvOn?3.2:0,APT.body);
 for(const s of G.squad){if(!s||!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=2;if(s.human)SND.breath(s.x,s.y,.3);}}}
function aptRender(c,cx,cy){const H=G.h;if(!H)return;
 // zimowe światło z ulicy przez okna + śnieg za szybą
 c.globalCompositeOperation='lighter';for(const[wx,wy,dx,dy]of[[32,10,0,1],[35,10,0,1],[40,10,0,1],[46,10,0,1],[70,25,-1,0],[14,10,0,1],[20,10,0,1]]){const x=wx*TS+8-cx,y=wy*TS+8-cy;if(x<-80||y<-80||x>VW+80||y>VH+80)continue;
  const g=c.createLinearGradient(x,y,x+dx*56,y+dy*56);g.addColorStop(0,'rgba(120,150,200,.2)');g.addColorStop(1,'rgba(120,150,200,0)');c.fillStyle=g;c.beginPath();if(dy){c.moveTo(x-7,y);c.lineTo(x+7,y);c.lineTo(x+16,y+56);c.lineTo(x-16,y+56);}else{c.moveTo(x,y-7);c.lineTo(x,y+7);c.lineTo(x-56,y+16);c.lineTo(x-56,y-16);}c.fill();
  for(let k=0;k<5;k++){const t=G.time*(.6+k*.13)+k*1.7+wx,fx=x-6+((k*5+Math.sin(t*2)*2)%12+12)%12,fy=y-6+((t*9)%10);P(c,fx|0,fy|0,1,1,'rgba(230,238,250,.85)');}}
 c.globalCompositeOperation='source-over';
 if(H.tvOn){const x=APT.tv.x-cx,y=APT.tv.y-cy,ph=(G.time*7|0);c.globalCompositeOperation='lighter';const col=[[120,150,255],[255,210,160],[150,255,190],[220,220,240]][ph%4];const g=c.createRadialGradient(x,y+6,0,x,y+6,52);g.addColorStop(0,'rgba('+col+',.22)');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-52,y-46,104,104);c.globalCompositeOperation='source-over';P(c,x-5,y-10,10,7,'rgba('+col+',.7)');}
 // flies near the body / under the bedroom door
 const fx=APT.body.x-cx,fy=APT.body.y-cy-6,t=G.time;for(let i=0;i<(H.body?9:3);i++){const ox=Math.sin(t*3.1+i*2.3)*12+Math.sin(t*7.7+i)*4,oy=Math.cos(t*2.6+i*1.7)*7+Math.sin(t*9+i)*2;const bx=H.body?fx:APT.mdoor.x-cx,by=H.body?fy:APT.mdoor.y-cy+8;P(c,(bx+ox)|0,(by+oy)|0,1,1,'#0a0a0a');}}
function aptObj(){const H=G.h;if(!H)return'';const g=H.gary,gd=g&&(g.state==='cuffed'||!g.alive);
 return objRows('BEAT 1123 · PINE COURT 3B',[[H.inside,'Sprawdź stan lokatorki'],g&&H.gStage&&H.gStage!=='walk'?[gd,'Zatrzymaj Gary’ego Hensleya']:null],H.nf?'<div class="opt">Notatki: '+H.nf+'</div>':'');}
function aptDebrief(){const H=G.h||{};const g=H.gary;let sc=H.nf*3;if(g&&g.alive&&g.state==='cuffed')sc+=15;if(H.key)sc+=5;
 patrolDebrief([['Notatki z miejsca',(H.nf||0)+' / '+CLUES_APT.length],['Wejście do 3B',LV.doorAt[I(39,23)]&&LV.doorAt[I(39,23)].broken?'siłą':'—'],['Sypialnia',H.key?'otwarta kluczykiem':H.body?'wyważona':'—'],['Gary Hensley',!g?'—':!g.alive?'nie żyje':g.state==='cuffed'?'zatrzymany':'zbiegł']],sc);}
LVL.apt={id:'apt',patrol:true,sounds:true,weather:'snow',crew:{names:['OFC. NOWAK','OFC. BROOKS'],uni:{body:'#7f96b4',legs:'#161c28',acc:'#d8d8d8'}},car:{s:'#2a5ab0'},ext:'brick',terrain:aptTerrain,windows:aptWindows,rooms:ROOMS_APT,doors:DOORS_APT,furn:FURN_APT,lamps:LAMPS_APT,cams:[],entries:ENTRIES_APT,
 start:startApt,update:updateApt,interact:aptInteract,render:aptRender,stress:aptStress,obj:aptObj,debrief:aptDebrief,
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n.startsWith('Korytarz')||n==='Klatka schodowa'?['#5e5a48','#3e3a2e']:n.includes('Ruth')?['#6a5e6a','#4a3e4a']:n.includes('Gary')?['#4e5248','#34382e']:n.includes('Kuchnia')?['#7a7458','#54503a']:n.includes('Łazienka')?['#7a8688','#5a6668']:['#6a5e4a','#4a4032'];},
 win:'Beat 1123, przyjęłam. Koroner i detektywi są w drodze.',planTitle:'PINE COURT APARTMENTS · III PIĘTRO',
 nb:{no:'#26-121-0388',pri:'P4',code:'WELFARE',small:'ADRES',addr:'PINE COURT APTS<br>MIESZKANIE 3B',facts:[['JEDNOSTKA','Beat 1123 · Ofc. Nowak, Ofc. Brooks'],['GODZINA','19:30'],['LOKATORKA','Ruth Hensley, 78 l.']],
  title:'911 · ZAPIS ROZMOWY',clock:[19,4,8],who:{D:'DYSPOZYTOR',C:'ZGŁASZAJĄCA'},bg:[10,18,30,16.9],
  call:[['D','Chicago, numer alarmowy. W czym mogę pomóc?'],['C','Dzwonię z Portland. Chodzi o moją mamę, Ruth Hensley. Pine Court, mieszkanie 3B.'],['D','Co się dzieje?'],['C','Nie mogę się do niej dodzwonić od tygodnia. Właściwie... od dawna z nią nie rozmawiałam. Brat mówi, że ma demencję i nie podchodzi do telefonu.'],['D','Brat mieszka z nią?'],['C','Gary... chyba tak. Odkąd stracił pracę. Ode mnie już nie odbiera.'],['D','Wyślemy patrol, żeby sprawdził, czy wszystko w porządku.'],['C','Proszę. Coś jest nie tak. Czuję to.']]}};
