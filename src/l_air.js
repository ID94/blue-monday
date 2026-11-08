
// ================= MISSION 05: TERMINAL B — UNATTENDED BAG =================
const ROOMS_AIR=[R_('Hala odlotów B',7,20,73,36,'lino'),R_('Posterunek policji lotniska',7,9,16,18,'lino'),R_('Toalety',30,9,36,18,'tileW'),R_('Bar Skyline',50,9,62,18,'wood'),R_('Kiosk',18,9,28,18,'lino'),R_('Zaplecze',64,9,73,18,'conc')];
const DOORS_AIR=[[12,19],[33,19],[56,19],[23,19],[68,19,1]];
const FURN_AIR=[];
{const F_=(...a)=>FURN_AIR.push(a);
 for(let x=9;x<=27;x+=3)F_('counterP',x,22);F_('board',30,20);F_('board',44,20);F_('gate',66,20);
 for(const y of[29,32])for(let x=38;x<=60;x+=2)if(x!==48)F_('bench',x,y);
 F_('bag',46,31);
 for(const[x,y]of[[36,27],[62,27],[36,34],[62,34],[14,34],[72,26]])F_('plant',x,y);for(const[x,y]of[[34,30],[64,31],[18,30]])F_('trash',x,y);F_('vending',8,30);F_('vending',8,31);
 F_('rope',10,27);F_('rope',13,27);F_('rope',16,27);F_('rope',19,27);
 // posterunek
 F_('deskPC',8,10);F_('monitors',12,9);F_('chairD',13,11);F_('locker',15,10);F_('locker',15,11);F_('tableS',9,15);
 // toalety
 for(let x=30;x<=35;x+=2)F_('toilet',x,9);F_('sink',31,15);F_('sink',33,15);F_('sink',35,15);
 // bar
 F_('counterP',51,10);F_('counterP',52,10);F_('counterP',53,10);F_('counterP',54,10);F_('tableS',55,14);F_('tableS',58,13);F_('tableS',60,16);F_('chairD',56,14);F_('chairD',59,13);F_('tv',61,9);F_('bottle',52,11);
 // kiosk + zaplecze
 F_('shelf',19,9);F_('shelf',21,9);F_('shelf',25,9);F_('counterP',22,14);F_('crate',65,10);F_('crate',66,10);F_('cart',70,12);
}
const LAMPS_AIR=[[15,25,1,'#e8f0ff',64],[30,25,1,'#e8f0ff',64],[45,25,1,'#e8f0ff',64],[60,25,1,'#e8f0ff',64],[25,33,1,'#e8f0ff',64],[50,33,1,'#e8f0ff',64],[68,33,1,'#e8f0ff',56],[11,13,2],[56,13,1,'#ffb060',40],[33,13,1,'#d8e8f0',30],[23,13,2]];
const ENTRIES_AIR=[{n:'Wejście główne',s:'Hala odlotów, terminal B.',x:21,y:35,a:-Math.PI/2,px:21,py:35}];
function airTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.ASPH,'asph');fillR(6,37,74,39,T.ASPH,'conc');
 fillR(7,9,73,36,T.FLOOR,'lino');H(8,6,74);H(37,6,74);V(6,8,37);V(74,8,37);H(19,7,73);V(17,9,18);V(29,9,18);V(37,9,18);V(49,9,18);V(63,9,18);
 for(const x of[20,21,22,56,57,58])set(x,37,T.FLOOR);for(let x=38;x<=48;x++)set(x,19,T.WALL);}
function airWindows(M,set){for(let x=8;x<74;x++)if(M.t[I(x,37)]===T.WALL&&x%3)set(x,37,T.WIN);for(const y of[22,25,28,31,34])set(74,y,T.WIN);}
F('board',3,1,1,0,(g,x,y)=>{P(g,x,y-12,48,14,'#141820');P(g,x+1,y-11,46,12,'#0a0e14');for(let i=0;i<4;i++){P(g,x+3,y-10+i*3,14,1,'#e8c840');P(g,x+20,y-10+i*3,10,1,'#d8d8d0');P(g,x+34,y-10+i*3,8,1,i===1?'#e84a3a':'#4ac860');}});
F('gate',2,1,1,0,(g,x,y)=>{P(g,x,y-10,32,10,'#1a2a4a');P(g,x+2,y-8,10,6,'#e8c840');P(g,x+4,y-7,6,4,'#1a2a4a');P(g,x+14,y-7,14,1,'#d8d8d0');P(g,x+14,y-4,10,1,'#d8d8d0');});
F('bag',1,1,1,0,(g,x,y)=>{P(g,x+3,y+13,11,2,SH);P(g,x+4,y+2,9,12,'#1e1e22');P(g,x+4,y+2,9,1,'#3a3a40');P(g,x+7,y-2,3,4,'#5a5a60');P(g,x+7,y-2,3,1,'#7a7a80');P(g,x+5,y+6,7,1,'#2e2e34');P(g,x+4,y+14,2,1,'#0a0a0a');P(g,x+11,y+14,2,1,'#0a0a0a');});
F('rope',1,1,0,0,(g,x,y)=>{P(g,x+7,y+4,2,10,'#b8b8b0');P(g,x+6,y+3,4,2,'#d8d8d0');P(g,x+9,y+6,16,1,'#2a3a8a');});
const AIR={bag:{x:46*TS+8,y:31*TS+8},cctv:{x:12*TS+8,y:10*TS+8},exit:[[21,40],[57,40]]};
const PAX_PAL=()=>({body:pick(['#6a5a4a','#3a4a6a','#8a4a5a','#5a5a5a','#4a6a5a','#7a6a3a','#2e3440']),legs:pick(['#2a2a3a','#3a3a3a','#4a4a5a','#5a4a3a']),head:'#c8a080',face:'#c8a080',visor:'#2a1a12',hair:pick(['#3a2418','#1e1410','#c8a050','#8a8a80','#6a3a20']),skin:pick(['#c8a080','#a07a5a','#e0c0a8','#7a5a40']),eyes:1});
function startAir(){G.hostage=null;G.deadline=1e9;
 G.h={t:0,said:{},seen:false,evac:false,evacN:0,pax:[],wit:false,cctv:false,owner:null,ownerFound:false,eod:null,eodT:null,clear:false,opened:false,touched:false,endT:null,paT:25};
 const H=G.h;
 for(let k=0;k<18;k++){const x=randi(10,70),y=randi(24,35);const c=mkNPC({tx:x,ty:y,kind:'pax',pal:PAX_PAL(),state:'wander',a:rand(-3,3)});c.wait=rand(0,4);unstick(c);H.pax.push(c);}
 for(const[x,y]of[[43,30],[50,33],[55,30]]){const c=mkNPC({tx:x,ty:y,kind:'pax',pal:PAX_PAL(),state:'calm',pose:'sit',a:Math.PI/2});H.pax.push(c);}
 H.wit=H.pax[H.pax.length-3];H.wit.name='PASAŻERKA';
 H.owner=mkNPC({tx:58,ty:14,kind:'pax',pal:{body:'#3a4a3a',legs:'#2a2a3a',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',hair:'#b02a20',skin:'#c8a080',eyes:1},state:'calm',pose:'sit',a:Math.PI,name:'Mężczyzna w czerwonej czapce',upd:ownerUpd});
 mkNPC({tx:53,ty:11,kind:'clerk',pal:{...PAL.cook},state:'work',workA:Math.PI/2});mkNPC({tx:22,ty:15,kind:'clerk',pal:{...PAL.cook,body:'#3a5a8a'},state:'work',workA:Math.PI/2});
 G.police=[];logEv('Airport PD: niezidentyfikowany bagaż, Terminal B');
 setTimeout(()=>{radio('DISPATCH','Airport 3, zgłoszenie z hali odlotów terminalu B. Pozostawiony bagaż przy bramkach B4 do B6, bez właściciela od około dwudziestu minut.');radio(G.p1.name,'Przyjąłem, idziemy zobaczyć.',{radio:1});},600);}
function ownerUpd(c,dt){const H=G.h;if(c.state==='walk'){if(npcGo(c,dt,47,30,30)){c.state='calm';c.pose='stand';}return;}if(c.state==='leave'){if(npcGo(c,dt,57,40,40)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}return;}moveUnit(c,dt,0,0,0);if(c.pose!=='sit')npcFace(c,dt,6);}
function paxEvac(c,dt){const ex=c.exit;if(npcGo(c,dt,ex[0],ex[1],46)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);G.h.evacN++;}}
function airInteract(u){const H=G.h;if(!H)return null;
 if(!H.clear&&!H.opened&&nearPt(u,AIR.bag.x,AIR.bag.y,22))return{k:'house',label:'Pozostawiony bagaż',dur:0,f:bagMenu};
 if(nearPt(u,AIR.cctv.x,AIR.cctv.y+16,22))return{k:'house',label:'Monitoring terminalu',dur:.6,f:cctvView};
 if(H.wit&&H.wit.alive&&!H.said.wit&&nearPt(u,H.wit.x,H.wit.y,22))return{k:'house',label:'Zapytaj pasażerkę',dur:0,f:()=>{H.said.wit=1;say(u.name,'Przepraszam, widziała pani, kto zostawił tę walizkę?');say('PASAŻERKA','Chyba jakiś mężczyzna... stał tu z telefonem. Miał czerwoną czapkę? Nie jestem pewna. Poszedł w tamtą stronę.');logEv('Świadek: mężczyzna w czerwonej czapce');}};
 const o=H.owner;if(o.alive&&!H.ownerFound&&nearPt(u,o.x,o.y,22))return{k:'house',label:'Porozmawiaj z mężczyzną',dur:0,f:()=>ownerTalk(u)};
 return null;}
function bagMenu(u){const H=G.h,it=[];
 if(!H.seen)it.push({t:'Przyjrzyj się (bez dotykania)',f:()=>{H.seen=true;say(u.name,'Czarna walizka na kółkach. Bez przywieszki, bez naklejek. Rączka wysunięta, jakby ktoś miał zaraz wrócić.');}});
 it.push({t:H.evac?'Strefa ewakuowana':'Ewakuuj strefę wokół bagażu',dis:H.evac,f:()=>startEvac(u)});
 it.push({t:H.eod?'Saperzy w drodze':'Wezwij zespół EOD (radio)',dis:!!H.eod,f:()=>callEOD(u)});
 it.push({t:'Otwórz walizkę samemu',f:()=>{H.opened=true;H.touched=true;say(u.name,'...');setTimeout(()=>{if(G.ended)return;say(u.name,'Ubrania. Kosmetyczka. Ładowarka. Kryminał w miękkiej okładce.');say(G.squad.find(q=>q&&q.alive&&q!==u)?.name||u.name,'Mogłeś nas wszystkich zabić, wiesz o tym?');H.endT=5;H.res='opened';},2500);}});
 choiceMenu('Bagaż · bramki B4–B6',it);}
function startEvac(u){const H=G.h;if(H.evac)return;H.evac=true;logEv('Ewakuacja hali odlotów B');radio(u.name,'Dispatch, Airport 3. Ewakuujemy halę B, prosimy o zamknięcie bramek B4 do B6.',{radio:1});
 say(u.name,'Proszę państwa, proszę spokojnie opuścić halę! Wyjście główne, proszę się nie zatrzymywać!');paChime();
 for(const c of H.pax){if(!c.alive||c===H.owner)continue;c.pose='stand';c.state='evac';c.exit=AIR.exit[c.x<39*TS?0:1];c.path=null;c.upd=paxEvac;}}
function callEOD(u){const H=G.h;if(H.eod)return;H.eod='called';H.eodT=35;radio(u.name,'Dispatch, Airport 3. Podejrzany bagaż, potrzebny zespół EOD do terminalu B.',{radio:1});
 setTimeout(()=>{if(!G.ended)radio('DISPATCH','EOD powiadomione, będą za kilka minut. Zabezpieczcie strefę.');},3000);}
function cctvView(u){const H=G.h;H.cctv=true;logEv('Monitoring: nagranie spod bramek B4');
 choiceMenu('CCTV · KAM 07 · BRAMKI B4–B6',[{t:'14:02 — mężczyzna w czerwonej czapce stawia walizkę przy ławce',dis:true,f:NOOP},{t:'14:03 — rozmawia przez telefon, odchodzi w stronę baru Skyline',dis:true,f:NOOP},{t:'14:05 — KAM 09: siada przy stoliku w barze, zamawia piwo',dis:true,f:NOOP},{t:'Zamknij podgląd',f:NOOP}]);
 say(u.name,'Mamy go. Czerwona czapka, siedzi w barze od dwudziestu minut.');}
function ownerTalk(u){const H=G.h,o=H.owner;H.ownerFound=true;o.pose='stand';logEv('Właściciel bagażu odnaleziony');
 say(u.name,'Proszę pana, czy zostawił pan walizkę przy bramce B4?');say('MĘŻCZYZNA','Walizkę? ...O cholera. Myślałem, że żona ją wzięła do samolotu. Ona poszła na kontrolę paszportową, a ja... na piwo.');
 setTimeout(()=>{if(G.ended)return;choiceMenu('Właściciel bagażu',[
  {t:'„Proszę pójść z nami i otworzyć ją przy nas.”',f:()=>{if(H.clear){say('MĘŻCZYZNA','Już ją sprawdzili? Przepraszam... naprawdę.');return;}o.state='walk';say(u.name,'Proszę iść przodem, powoli.');H.ownerOpen=true;}},
  {t:'„Proszę zostać tutaj. Saperzy ją sprawdzą.”',f:()=>{say('MĘŻCZYZNA','Saperzy? Przez moją walizkę? Jezu...');H.ownerWait=true;}},
  {t:'„Dokumenty proszę.” (spisz go)',f:()=>{H.ownerId=true;say('MĘŻCZYZNA','Proszę. Kevin Doyle, Columbus, Ohio. Lecimy do Orlando.');logEv('Właściciel: Kevin Doyle');}}]);},6500);}
function paChime(){if(!A.ctx)return;const o=ui(.18),t0=A.ctx.currentTime;tone(o,t0,.5,{f:784,g:.5});tone(o,t0+.35,.5,{f:659,g:.5});tone(o,t0+.7,.8,{f:523,g:.5});}
const PA_MSG=['Pasażerowie lotu RA 418 do Denver proszeni są do wyjścia B7.','Prosimy nie pozostawiać bagażu bez opieki. Pozostawiony bagaż zostanie usunięty.','Lot do Orlando opóźniony o czterdzieści minut. Przepraszamy.','Pani Linda Doyle proszona jest o kontakt z obsługą przy wyjściu B5.'];
function updateAir(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;
 H.paT-=dt;if(H.paT<=0&&!H.evac){H.paT=rand(35,55);paChime();say('KOMUNIKAT',PA_MSG[(H.pai=(H.pai||0)+1)%PA_MSG.length]);}
 if(H.eod==='called'){H.eodT-=dt;if(H.eodT<=0){H.eod='arrived';const e=mkNPC({tx:21,ty:40,kind:'eod',pal:{...PAL.squad,body:'#3a4a3a',vest:'#4a5a3a'},state:'go',name:'EOD',upd:eodUpd});H.eodU=e;radio('EOD','Zespół EOD na miejscu. Wchodzę do hali.',{radio:1});}}
 if(H.ownerOpen&&H.owner.state==='calm'&&!H.opened&&!H.clear&&dist(H.owner.x,H.owner.y,AIR.bag.x,AIR.bag.y)<TS*2){H.opened=true;say('KEVIN DOYLE','Proszę. Koszule, kosmetyczka... książka żony. Nic tam nie ma.');H.endT=6;H.res='owner';}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0&&!G.ended){const r={eod:'Bagaż sprawdzony przez EOD. Ubrania i kosmetyczka — fałszywy alarm.',owner:'Właściciel otworzył walizkę przy policji. Fałszywy alarm.',opened:'Bagaż otwarty bez EOD. W środku ubrania — tym razem.'}[H.res];endMission(true,r);}}}
function eodUpd(c,dt){const H=G.h;
 if(c.state==='go'){if(npcGo(c,dt,46,33,30)){c.state='wait';c.wT=0;}return;}
 moveUnit(c,dt,0,0,0);
 if(c.state==='wait'){const near=G.civs.some(p=>p.alive&&p.kind==='pax'&&p!==H.owner&&dist(p.x,p.y,AIR.bag.x,AIR.bag.y)<TS*9);turnTo(c,-Math.PI/2,dt,3);
  if(near){if(!H.said.eodn){H.said.eodn=1;radio('EOD','Za dużo ludzi w strefie. Oczyśćcie halę, wtedy zaczynam.',{radio:1});}return;}
  c.state='scan';c.wT=0;c.pose='kneel';radio('EOD','Strefa czysta. Rentgen przenośny, zaczynam.',{radio:1});}
 if(c.state==='scan'){c.wT+=dt;if(((c.wT*2)|0)!==c.bp){c.bp=(c.wT*2)|0;SND.beep&&SND.beep(c.x,c.y);}
  if(c.wT>9){c.state='done';c.pose='stand';H.clear=true;logEv('EOD: bagaż bezpieczny');radio('EOD','Czysto. Ubrania, kosmetyczka, ładowarka, książka. Zwykła walizka.',{radio:1});H.endT=6;H.res='eod';}}}
function airRender(c,cx,cy){const H=G.h;if(!H)return;if(!H.clear&&!H.opened){const x=AIR.bag.x-cx,y=AIR.bag.y-cy;if(H.evac){c.strokeStyle='rgba(232,200,64,.55)';c.setLineDash([3,3]);c.beginPath();c.arc(x,y,TS*5,0,6.283);c.stroke();c.setLineDash([]);}}
 const e=H.eodU;if(e&&e.state==='scan'&&((G.time*4)|0)%2){P(c,(AIR.bag.x-cx-8)|0,(AIR.bag.y-cy-14)|0,2,2,'#e84a3a');}}
function airObj(){const H=G.h;if(!H)return'';return objRows('AIRPORT 3 · TERMINAL B',[[H.seen,'Sprawdź zgłoszenie'],H.seen?[H.clear||H.opened,'Ustal, co jest w bagażu']:null,H.cctv||H.said.wit?[H.ownerFound,'Znajdź właściciela']:null]);}
function airDebrief(){const H=G.h||{};let sc=0;if(H.evac)sc+=10;if(H.res==='eod')sc+=15;if(H.ownerFound)sc+=10;if(H.cctv)sc+=5;if(H.ownerId)sc+=3;if(H.res==='opened')sc-=40;
 patrolDebrief([['Ewakuacja hali',H.evac?'przeprowadzona ('+(H.evacN||0)+' osób)':'nie'],['EOD',H.res==='eod'?'sprawdzenie rentgenem':H.eod?'wezwane':'nie wezwane'],['Właściciel',H.ownerFound?(H.ownerId?'Kevin Doyle — spisany':'odnaleziony'):'nieodnaleziony'],['Procedura',H.res==='opened'?'NARUSZONA — bagaż otwarty przez patrol':'zachowana']],sc);}
LVL.air={id:'air',patrol:true,lit:.86,weather:'day',ext:'concrete',terrain:airTerrain,windows:airWindows,rooms:ROOMS_AIR,doors:DOORS_AIR,furn:FURN_AIR,lamps:LAMPS_AIR,cams:[],entries:ENTRIES_AIR,
 start:startAir,update:updateAir,interact:airInteract,render:airRender,stress:NOOP,obj:airObj,debrief:airDebrief,
 crew:{names:['OFC. NAVARRO','OFC. WADE'],uni:{body:'#22304a',legs:'#1a2232',acc:'#d8b048'}},car:{s:'#1e3c8a'},
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n==='Bar Skyline'?['#5a4a3a','#3e3226']:n==='Toalety'?['#7a8688','#5a6668']:['#8a8e92','#5e6266'];},
 win:'Airport 3, przyjęłam. Otwieramy terminal B.',planTitle:'MESA DEL SOL REGIONAL · TERMINAL B',
 nb:{no:'#26-140-0921',pri:'P2',code:'SUSP PKG',small:'MIEJSCE',addr:'MESA DEL SOL REGIONAL<br>TERMINAL B · B4–B6',facts:[['JEDNOSTKA','Airport 3 · Ofc. Navarro, Ofc. Wade'],['GODZINA','14:24'],['ZGŁOSZENIE','bagaż bez właściciela']],
  title:'ZGŁOSZENIE · OCHRONA TERMINALU',clock:[14,21,30],who:{D:'DYSPOZYTOR',C:'OCHRONA'},bg:[7,19,48,27],
  call:[['C','Dispatch, ochrona terminalu B. Mamy pozostawioną walizkę przy bramkach B4.'],['D','Od jak dawna?'],['C','Pasażerowie mówią, że ze dwadzieścia minut. Nikt się nie przyznaje.'],['D','Ktoś jej dotykał?'],['C','Nie, nikt. Stoi przy ławce, rączka wysunięta.'],['D','Przyjęłam. Wysyłam patrol lotniskowy. Nie dotykajcie jej.']]}};
