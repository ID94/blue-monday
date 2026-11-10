// ================= MISSION 09: FALLMART — ŁADUNEK WYBUCHOWY (S.W.A.T. + EOD) =================
const ML={van:{x:24*TS,y:47*TS},vanPt:{x:22.6*TS,y:47.6*TS},robot0:{x:21.5*TS,y:48.5*TS},cctv:{x:10*TS+8,y:6.2*TS},exit:[38,41],tent:{x:17*TS,y:52*TS},
 items:[{id:'A',n:'Torba termiczna · alejka 3',x:20,y:14,k:'cool'},{id:'B',n:'Plecak przy kasie 6',x:27,y:33,k:'pack'},{id:'C',n:'Karton · elektronika',x:63,y:24,k:'box'},{id:'D',n:'Torba sportowa · WC męskie',x:27,y:6,k:'gym'},{id:'E',n:'Wózek z reklamówką · alejka 8',x:44,y:30,k:'cart'}],
 maxSig:44,bombT:600,jamMax:150,jamCd:45};
const ROOMS_MALL=[R_('Hala sprzedaży',7,10,72,37,'lino'),R_('Biuro ochrony',7,5,14,8,'conc'),R_('Pokój socjalny',16,5,23,8,'lino'),R_('WC męskie',25,5,28,8,'tileW'),R_('WC damskie',30,5,33,8,'tileW'),R_('Magazyn',35,5,72,8,'conc'),R_('Apteka',62,10,72,17,'tileW')];
const DOORS_MALL=[[38,38,0,1],[39,38,0,1],[11,9],[20,9],[26,9],[31,9],[45,9],[60,9],[61,9],[66,18],[66,4,1]];
const CAMS_MALL=[[38.5,10.3,Math.PI/2,'Wejście i kasy'],[7.6,12.3,.3,'Spożywczy · alejki 1–4'],[55.4,12.3,Math.PI-.3,'Alejki 5–9'],[72.4,22.3,Math.PI,'Elektronika'],[45.5,5.3,Math.PI/2,'Magazyn']];
const FURN_MALL=[];
{const F_=(...a)=>FURN_MALL.push(a),r=rng(919);
 // alejki
 for(const y of[12,16,20,24,28]){for(let x=9;x<=30;x++)F_('gshelf',x,y);for(let x=33;x<=54;x++)F_('gshelf',x,y);}
 for(let x=9;x<=30;x+=3)F_('prod',x,10);
 // kasy
 for(let x=11;x<=50;x+=3)F_('chkout',x,31);F_('counterP',8,33);F_('counterP',9,33);F_('counterP',10,33);F_('ssign2',9,31);
 for(const[x,y]of[[16,35],[22,36],[34,34],[46,36],[52,35],[13,14]])F_('cart',x,y);
 // elektronika
 for(let x=57;x<=70;x++){F_('tvwall',x,20);}for(const y of[23,26])for(let x=58;x<=69;x++)if(x!==63)F_('eshelf',x,y);
 // apteka
 for(let x=63;x<=71;x++)F_('shelf',x,10);F_('counterP',64,15);F_('counterP',65,15);F_('counterP',66,15);F_('counterP',68,15);F_('counterP',69,15);
 // kawiarnia
 for(const[x,y]of[[58,32],[62,32],[66,32],[58,35],[62,35],[66,35]]){F_('tableS',x,y);F_('chairD',x+1,y);}F_('counterP',70,31);F_('counterP',70,32);F_('counterP',70,33);F_('vending',72,36);
 // zaplecze
 F_('deskPC',8,5);F_('monitors',10,5);F_('monitors',12,5);F_('chairD',10,7);F_('locker',14,5);
 F_('tableS',18,6);F_('tableS',20,6);F_('chairD',17,6);F_('chairD',21,7);F_('vending',23,5);F_('locker',16,8);
 F_('toilet',25,5);F_('sink',28,8);F_('toilet',30,5);F_('toilet',32,5);F_('sink',33,8);
 for(const[x,y]of[[36,5],[40,5],[48,5],[56,5],[64,5],[68,5],[38,7],[52,7],[58,7],[70,7]])F_('pallet',x,y);F_('forklift',44,7);for(const[x,y]of[[47,5],[55,5],[63,7]])F_('crate',x,y);
 // parking
 for(const[x,y]of[[4,42],[10,42],[44,42],[50,42],[56,42],[62,42],[66,46],[4,52],[44,50],[50,50],[56,50],[62,50],[34,50]])F_('car',x,y);
 F_('eodvan',24,46);F_('bearcat',6,46);F_('ctent',15,51);F_('police',30,55);F_('police',48,55);F_('ambul',68,52);F_('firetr',58,55);F_('tvvan',2,54);
 for(let x=0;x<80;x++)if(x<26||x>29)F_('ptape',x,54);for(const y of[44,46,48])F_('barr',33,y);
 for(const[x,y]of[[12,39],[30,39],[48,39],[66,39]])F_('lamp',x,y);F_('trash',35,39);F_('trash',43,39);F_('brack',45,39);F_('cart',52,40);F_('cart',53,40);F_('cart',8,40);}
// ---------- rekwizyty ----------
const SHC=['#c8302a','#e8b818','#2a6ac8','#3a9a4a','#e86a1a','#8a3a9a','#f0f0e8','#c8a070'];
F('gshelf',1,1,1,0,(g,x,y,w,h,s)=>{const r=rng(s);P(g,x,y+13,16,2,SH);P(g,x,y,16,13,'#8a8e92');P(g,x,y,16,1,'#b8bcc0');P(g,x,y+6,16,1,'#6a6e72');for(let i=0;i<5;i++){const c=SHC[(r()*8)|0];P(g,x+1+i*3,y+1,3,5,c);P(g,x+1+i*3,y+1,3,1,shade(c,30));const c2=SHC[(r()*8)|0];P(g,x+1+i*3,y+7,3,5,c2);}});
F('eshelf',1,1,1,0,(g,x,y,w,h,s)=>{const r=rng(s);P(g,x,y+13,16,2,SH);P(g,x,y+2,16,11,'#3a3e44');P(g,x,y+2,16,1,'#5a5e64');for(let i=0;i<3;i++){P(g,x+1+i*5,y+4,4,7,['#1a1a1e','#e8e8e4','#2a2a2e'][(r()*3)|0]);P(g,x+2+i*5,y+5,2,2,'#4a7aaa');}});
F('tvwall',1,1,1,1,(g,x,y,w,h,s)=>{P(g,x,y-8,16,22,'#2a2c30');const ph=s%4;P(g,x+1,y-6,14,9,'#0a0c10');P(g,x+2,y-5,12,7,['#1a3a6a','#3a1a4a','#1a4a3a','#4a3a1a'][ph]);P(g,x+3,y-4,4,2,'rgba(255,255,255,.25)');P(g,x+1,y+5,14,7,'#0a0c10');P(g,x+2,y+6,12,5,['#3a1a4a','#1a4a3a','#4a3a1a','#1a3a6a'][ph]);});
F('chkout',1,2,1,0,(g,x,y)=>{P(g,x+1,y+28,14,3,SH);P(g,x+2,y+2,12,26,'#d8d8d0');P(g,x+2,y+2,12,1,'#f0f0e8');P(g,x+4,y+4,6,18,'#2a2a2e');for(let j=0;j<18;j+=3)P(g,x+4,y+4+j,6,1,'#3a3a3e');P(g,x+10,y+22,4,5,'#3a3e44');P(g,x+11,y+18,3,4,'#1a1a1e');P(g,x+12,y+19,1,2,'#3ac85a');P(g,x+7,y-6,2,9,'#8a8e92');P(g,x+5,y-10,6,5,'#c8302a');P(g,x+7,y-9,2,3,'#f0f0e8');});
F('prod',2,1,1,0,(g,x,y,w,h,s)=>{const r=rng(s);P(g,x+1,y+12,30,3,SH);P(g,x+1,y+2,30,10,'#7a5a32');P(g,x+1,y+2,30,1,'#9a7a4a');for(let i=0;i<14;i++)P(g,x+3+(r()*25|0),y+3+(r()*7|0),3,3,['#c8302a','#e8b818','#5a9a3a','#e86a1a','#7aba3a'][(r()*5)|0]);});
F('pallet',2,1,1,1,(g,x,y,w,h,s)=>{const r=rng(s);P(g,x+1,y+13,30,3,SH);P(g,x+1,y+11,30,3,'#8a6a3a');for(let i=0;i<3;i++)for(let j=0;j<2;j++){const c=['#b89a6a','#a88a5a','#c8aa7a'][(r()*3)|0];P(g,x+2+i*10,y-6+j*8,9,8,c);P(g,x+2+i*10,y-6+j*8,9,1,shade(c,20));}P(g,x+1,y-7,30,18,'rgba(200,220,230,.12)');});
F('forklift',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,3,SH);P(g,x+6,y+2,20,11,'#e8a818');P(g,x+6,y+2,20,1,'#f8c838');P(g,x+12,y-8,10,10,'#2a2a2e');P(g,x+13,y-7,8,6,'rgba(150,180,200,.4)');P(g,x+1,y-6,3,18,'#3a3a3e');P(g,x,y+9,8,2,'#5a5e62');for(const wx of[8,20])P(g,x+wx,y+11,5,4,'#111');});
F('ssign2',2,1,1,0,(g,x,y)=>{P(g,x+2,y-14,28,8,'#1e3c8a');P(g,x+4,y-12,24,1,'#f0f0e8');P(g,x+4,y-9,16,1,'#f0f0e8');P(g,x+15,y-6,2,6,'#8a8e92');});
F('eodvan',4,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:62,b:'#e8e8e4',box:[2,46],cab:[46,52],wh:[8,46],stripe:'#1e3c8a',ex:(T,R)=>{R(4,4,40,4,'#1e3c8a');R(6,5,10,2,'#e8e8e4');R(20,5,16,2,'#e8b818');R(46,-3,6,2,'#c8201a');R(30,-8,3,8,'#8a8e92');R(26,-11,11,4,'#3a3e44');T(2,6,1,8,'#3a3a3a');}}));
F('bearcat',4,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:64,b:'#1a1c20',box:[2,48],bc:'#202226',cab:[48,56],rh:5,wh:[8,46],ex:(T,R)=>{R(4,3,42,2,'#2a2c30');for(let i=0;i<3;i++)R(8+i*12,6,6,3,'#0e1218');R(8,10,30,3,'#e8e8e4');R(12,11,22,1,'#1a1c20');R(46,-4,8,2,'#c8201a');R(50,-4,4,2,'#1e40c8');T(56,4,6,8,'#141618');}}));
Object.assign(FH,{gshelf:10,eshelf:8,tvwall:14,chkout:6,prod:5,pallet:12,forklift:8,eodvan:0,bearcat:0,ssign2:0});
const LAMPS_MALL=[];for(let x=12;x<=66;x+=9)for(const y of[14,22,30])LAMPS_MALL.push([x,y,0,'#f4f8ff',58]);LAMPS_MALL.push([10,6,0,'#e8f0ff',34],[20,6,0,'#fff4d8',34],[27,6,1,'#e8f0ff',22],[32,6,0,'#e8f0ff',22],[42,6,0,'#fff0d0',40],[58,6,1,'#fff0d0',40],[66,13,0,'#f0fff4',40]);
const ENTRIES_MALL=[{n:'Punkt dowodzenia',s:'Parking, przy wozie saperów.',x:28,y:48.5,a:-Math.PI/2,px:28,py:48}];
function mallTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.ASPH,'asph');fillR(6,39,73,40,T.ASPH,'walk');fillR(0,0,79,3,T.GRASS,'lawn');
 fillR(7,5,72,37,T.FLOOR,'lino');H(4,6,73);H(38,6,73);V(6,4,38);V(73,4,38);H(9,7,72);for(const x of[15,24,29,34])V(x,5,8);H(18,62,72);V(61,10,17);
 fillR(56,30,72,37,T.FLOOR,'wood');fillR(7,5,14,8,T.FLOOR,'conc');fillR(35,5,72,8,T.FLOOR,'conc');fillR(62,10,72,17,T.FLOOR,'tileW');fillR(25,5,33,8,T.FLOOR,'tileW');}
function mallWindows(M,set){for(let x=8;x<73;x++)if(x<36||x>41)if(x%4===1)set(x,38,T.WIN);}
const FONT5={F:['111','100','110','100','100'],A:['010','101','111','101','101'],L:['100','100','100','100','111'],M:['10001','11011','10101','10001','10001'],R:['110','101','110','101','101'],T:['111','010','010','010','010']};
function mallDecor(){const g=WR[38]&&WR[38].getContext('2d');if(g){const word='FALLMART';let w=0;for(const ch of word)w+=FONT5[ch][0].length*2+2;const x0=39*TS-w/2|0;P(g,x0-5,15,w+8,13,'#b0181a');P(g,x0-5,15,w+8,1,'#d83a2a');let px=x0;for(const ch of word){const gl=FONT5[ch];for(let j=0;j<5;j++)for(let i=0;i<gl[j].length;i++)if(gl[j][i]==='1')P(g,px+i*2,17+j*2,2,2,'#f8d030');px+=gl[0].length*2+2;}}
 const L=(x,y,w,h,c)=>P(wc,x,y,w,h,c);for(let x=2;x<72;x+=4){L(x*TS,41*TS+4,1,2*TS,'rgba(230,230,220,.5)');L(x*TS,49*TS,1,2*TS,'rgba(230,230,220,.5)');}L(34*TS,41*TS,12*TS,1,'rgba(230,200,60,.7)');for(let x=34*TS;x<46*TS;x+=8)L(x,41*TS+2,4,TS*1.4,'rgba(230,200,60,.35)');
 const gr=WR[9]&&WR[9].getContext('2d');if(gr){for(const x of[13,22,37,50,65]){P(gr,x*TS,18,12,5,'#1e3c8a');P(gr,x*TS+2,19,8,1,'#f0f0e8');}}}
// ---------- stan ----------
function spawnMallTeam(E){const ids=['lead','breach','scout','medic'],offs=[[0,0],[-1,-1],[-1,1],[-2,0]];ids.forEach((id,i)=>{const s=SPECS.find(q=>q.id===id);
 const u=new Unit({team:'squad',spec:s.id,name:s.name,role:s.role,weap:s.weap,fov:s.fov,range:s.range,acc:s.acc,pal:PAL.squad,charges:id==='breach'?2:0,flash:id==='scout'?3:0,sed:id==='medic'?4:0,shoutCd:0,armor:'heavy'});
 u.tac=true;u.x=E.x*TS+8+offs[i][1]*TS;u.y=E.y*TS-offs[i][0]*TS;u.ang=E.a;u.heading=E.a;unstick(u);G.squad[i]=u;G.units.push(u);});}
const SHOP_PAL=(b)=>({body:b,legs:'#2a2a3a',hair:pick(['#3a2418','#1e1410','#8a8a80','#c8a050']),head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1});
function startMall(){G.hostage=null;G.deadline=1e9;G.police=[];
 const real=pick(['A','B','C','E']);
 G.h={t:0,said:{},real,items:ML.items.map(o=>({...o,xr:false,res:null})),bombId:false,neutral:false,jam:false,jamB:ML.jamMax,jamCdT:0,bombT:ML.bombT,civOut:0,civN:0,suspPhase:null,trigT:null,manual:null,R:{x:ML.robot0.x,y:ML.robot0.y,a:-Math.PI/2,ca:-Math.PI/2,act:null,on:false},endT:null,boom:false,handTouched:0,near:0};
 const H=G.h;for(const d of LV.doors)if(d.glass){d.target=1;d.open=1;}
 H.civ=[];const civ=(tx,ty,n,b,a)=>{const c=mkNPC({tx,ty,kind:'shopper',pal:SHOP_PAL(b),state:'hide',pose:'kneel',a:a||0,name:n,upd:mallCivUpd});H.civ.push(c);H.civN++;return c;};
 civ(18,7,'PRACOWNICA','#c8302a',Math.PI/2);civ(21,8,'PRACOWNIK','#c8302a',-Math.PI/2);civ(70,13,'FARMACEUTKA','#e8e8e4',Math.PI);civ(31,7,'KLIENTKA','#6a5a7a',Math.PI/2);
 H.mgr=mkNPC({tx:17,ty:54,kind:'shopper',pal:SHOP_PAL('#c8302a'),state:'calm',a:-Math.PI/2,name:'KIEROWNIK SKLEPU',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);npcFace(c,dt,6);}});H.mgr.noCuff=1;
 H.eod=mkNPC({tx:26,ty:49,kind:'eod',pal:{...PAL.squad,body:'#3a4a3a',vest:'#4a5a3a'},state:'idle',a:-Math.PI/2,name:'SAPER',upd:eodMallUpd});H.eod.noCuff=1;
 H.sus=mkEnemy({tx:52,ty:6,weap:'ePistol',a:Math.PI/2,st:'guard',pal:{body:'#6a6e72',legs:'#2a2e3a',hair:'#2a1a12',head:'#6a6e72',face:'#c8a080',visor:'#2a1a12',eyes:1},name:'Curtis Vane',fov:110,range:9});H.sus.upd=susUpd;H.sus.pose='kneel';
 for(const[x,y,a]of[[12,53,-1.5],[14,50,-1.2],[31,53,-1.6],[47,53,-1.4]]){const pu=new Unit({team:'police',weap:'pistol',pal:Object.assign({},PAL.patrolA)});pu.x=x*TS+8;pu.y=y*TS+8;pu.ang=a;pu.pose='stand';G.police.push(pu);}
 for(let k=0;k<16;k++){const x=randi(2,77),y=randi(55,57);if(x>=25&&x<=30)continue;const c=mkNPC({tx:x,ty:y,kind:'gawk',pal:SHOP_PAL(pick(['#3a4a6a','#8a4a5a','#5a5a5a','#c8302a','#4a6a5a'])),state:'calm',a:-Math.PI/2+rand(-.4,.4),name:'GAPIĄ',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);}});c.noCuff=1;}
 logEv('Groźba bombowa: Fallmart Supercenter #2217');
 setTimeout(()=>{radio('DISPATCH','S.W.A.T., jesteście na miejscu. Fallmart, groźba bombowa. Dzwoniący twierdził, że ładunek wybuchnie o szesnastej trzydzieści. Sklep w większości ewakuowany.',{prio:1});radio('SAPER','Sierżancie, robot gotowy przy wozie. Zagłuszarka, zanim podjedziemy do czegokolwiek. Nikt nie podchodzi do niczego ręcznie.',{radio:1});},700);}
function mallCivUpd(c,dt){const H=G.h;if(c.state==='hide'){moveUnit(c,dt,0,0,0);c.pose='kneel';return;}
 if(c.state==='comply'){c.cT=(c.cT||0)+dt;moveUnit(c,dt,0,0,0);c.pose='hands';if(c.cT>1.4){c.state='evac';c.pose='stand';c.path=null;say(c.name,pick(['Dziękuję... dziękuję!','Już idę, już idę!','Boże, myślałam, że nikt nie przyjdzie.']));}return;}
 if(c.state==='evac'){if(npcGo(c,dt,ML.exit[0],ML.exit[1],46)||c.y>41*TS){c.state='out';H.civOut++;logEv(c.name+' ewakuowany');c.upd=(c2,dt2)=>{if(npcGo(c2,dt2,20,55,40)){c2.alive=false;G.units.splice(G.units.indexOf(c2),1);G.civs.splice(G.civs.indexOf(c2),1);}};}return;}
 moveUnit(c,dt,0,0,0);}
function eodMallUpd(c,dt){const H=G.h;if(c.state==='go'){const b=H.items.find(o=>o.id===H.real);if(npcGo(c,dt,b.x,b.y+1,20)){c.state='work';c.wT=0;c.pose='kneel';radio('SAPER','Jestem przy ładunku. Zaczynam. Cisza w eterze.',{radio:1});}return;}
 moveUnit(c,dt,0,0,0);if(c.state==='work'){c.wT+=dt;if(((c.wT*1.5)|0)!==c.bp){c.bp=(c.wT*1.5)|0;SND.pick(c.x,c.y);}if(c.wT>22){c.state='back';c.pose='stand';bombNeutral('ręcznie');}return;}
 if(c.state==='back'){if(npcGo(c,dt,26,49,30)){c.state='idle';}return;}
 npcFace(c,dt,6);}
function susActive(){const e=G.h.sus;return e&&e.alive&&!['surr','cuffed'].includes(e.state)&&!(e.stun>0);}
function susUpd(e,dt){const H=G.h;if(e.state==='surr'||e.state==='cuffed')return false;if(H.suspPhase==='fight')return false;if(e.stun>0)return false;
 if(!H.suspPhase){moveUnit(e,dt,0,0,0);e.pose='kneel';e.scT=(e.scT||0)-dt;if(e.scT<=0){e.scT=.15;for(const q of G.squad){if(!q||!q.alive)continue;if(dist(q.x,q.y,e.x,e.y)<TS*8&&losClear(e.x,e.y,q.x,q.y)){H.suspPhase='threat';H.trigT=6;e.pose='stand';turnTo(e,Math.atan2(q.y-e.y,q.x-e.x),1,99);say('CURTIS VANE','NIE PODCHODŹCIE! Mam w ręku detonator! Jeden ruch i cały sklep wylatuje!');logEv('Sprawca w magazynie grozi detonacją');break;}}}return true;}
 if(H.suspPhase==='threat'){moveUnit(e,dt,0,0,0);e.pose='stand';const q=nearestSquad(e);if(q)turnTo(e,Math.atan2(q.y-e.y,q.x-e.x),dt,4);
  const L=G.p1;if(L&&L.shoutCd>2.9&&!e.heardSh&&dist(L.x,L.y,e.x,e.y)<TS*8){e.heardSh=1;if(Math.random()<.35){e.state='surr';e.pose='hands';say('CURTIS VANE','...Dobra. Dobra! Kładę telefon! Nie strzelajcie!');logEv('Sprawca się poddaje');return true;}else say('CURTIS VANE','Zamknij się! Mówię poważnie!');}
  H.trigT-=dt;if(H.trigT<=0){H.suspPhase='fight';if(H.jam){say('CURTIS VANE','Co... Nie ma zasięgu?! NIE!');logEv('Próba detonacji zablokowana przez zagłuszarkę');setTimeout(()=>{if(!G.ended)radio('SAPER','Zagłuszarka złapała próbę połączenia! Odbiornik nic nie dostał!',{radio:1});},900);}
   else if(!H.neutral){say('CURTIS VANE','Sami tego chcieliście.');detonate('Sprawca zdetonował ładunek telefonem.');}
   else say('CURTIS VANE','Dlaczego nic... nie...');}
  return true;}
 return false;}
function nearPtT(u,x,y,r){return dist(u.x,u.y,x*TS+8,y*TS+8)<r;}
function mallInteract(u){const H=G.h;if(!H)return null;
 if(nearPt(u,ML.vanPt.x,ML.vanPt.y,30))return{k:'house',label:'Wóz saperów — robot, zagłuszarka',dur:0,f:vanMenu};
 if(nearPt(u,H.eod.x,H.eod.y,22)&&H.eod.state==='idle')return{k:'house',label:'Rozmowa z saperem',dur:0,f:eodTalk};
 if(H.mgr.alive&&nearPt(u,H.mgr.x,H.mgr.y,22))return{k:'house',label:'Rozmowa z kierownikiem',dur:0,f:mgrTalk};
 if(nearPt(u,ML.cctv.x,ML.cctv.y,24))return{k:'house',label:'Monitoring sklepu',dur:.5,f:cctvMall};
 for(const c of H.civ)if(c.alive&&c.state==='hide'&&dist(c.x,c.y,u.x,u.y)<22)return{k:'house',label:'„Policja! Wychodź, idź do wyjścia!”',dur:0,f:()=>{c.state='comply';c.cT=0;say(u.name,'Policja! Wstań i idź prosto do wyjścia. Nie zatrzymuj się.');}};
 for(const o of H.items){if(o.res==='safe'||o.res==='neut')continue;if(nearPtT(u,o.x,o.y,20))return{k:'house',label:o.n,dur:0,f:()=>itemMenu(u,o)};}
 return null;}
function itemMenu(u,o){const H=G.h;choiceMenu(o.n,[{t:'Odsuń się — to zadanie dla robota',f:()=>{say(u.name,'Nie dotykamy. Robot to obejrzy.');}},
 {t:'Sprawdź ręcznie (ryzykowne)',f:()=>{H.handTouched++;say(u.name,'Sprawdzam...');logEv('Ręczne sprawdzenie: '+o.n);setTimeout(()=>{if(G.ended)return;if(o.id===H.real&&!H.neutral){detonate('Ładunek miał zabezpieczenie przed ruszeniem. Eksplozja przy ręcznym sprawdzaniu.');return;}o.res='safe';o.xr=true;say(u.name,itemSafeTxt(o));radio('SAPER','Sierżancie, do cholery! Mówiłem — nic ręcznie! Następnym razem to może być to.',{radio:1});},1500);}}]);}
function itemSafeTxt(o){return{cool:'Torba termiczna: puszki napojów i lód. Czysto.',pack:'Plecak: podręczniki, laptop, ładowarka. Czysto.',box:'Karton: zwrot towaru, odkurzacz w folii. Czysto.',gym:'Torba sportowa: ręcznik, buty, bidon. Czysto.',cart:'Wózek: reklamówka z zakupami, paragon z 15:09. Czysto.'}[o.k];}
function jamToggle(){const H=G.h;if(!H.jam&&(H.jamCdT>0||H.jamB<=0)){toast('Zagłuszarka się ładuje');return;}H.jam=!H.jam;SND.click&&SND.click();logEv('Zagłuszarka '+(H.jam?'włączona':'wyłączona'));toast(H.jam?'ZAGŁUSZARKA WŁ · '+Math.ceil(H.jamB)+' s':'Zagłuszarka wył.');if(!H.said['jam'+H.jam]){H.said['jam'+H.jam]=1;radio('SAPER',H.jam?'Zagłuszarka pracuje. Telefony w okolicy głuche. Pilnuj baterii.':'Zagłuszarka wyłączona — oszczędzamy baterię.',{radio:1});}}
function vanMenu(u){const H=G.h,it=[];
 it.push({t:H.jam?'Zagłuszarka: WYŁĄCZ (bateria '+Math.round(H.jamB/ML.jamMax*100)+'%)':H.jamCdT>0?'Zagłuszarka ładuje się… '+Math.ceil(H.jamCdT)+' s':'Zagłuszarka: WŁĄCZ (bateria '+Math.round(H.jamB/ML.jamMax*100)+'%)',dis:!H.jam&&(H.jamCdT>0||H.jamB<=0),f:jamToggle});
 it.push({t:'Steruj robotem (kamera, rentgen, disruptor)',f:()=>startRobot(u)});
 if(H.bombId&&!H.neutral&&!H.manual)it.push({t:'Saper: neutralizacja ręczna w kombinezonie',f:()=>{H.manual=true;H.eod.state='go';H.eod.path=null;H.eod.pose='stand';radio('SAPER','Zakładam kombinezon i idę. Potrzebuję około dwudziestu sekund przy ładunku. Trzymajcie go z dala ode mnie.',{radio:1});logEv('Saper idzie do ładunku');}});
 choiceMenu('Wóz saperów · EOD 3',it);}
function eodTalk(u){const H=G.h;const it=[{t:'„Jak to rozgrywamy?”',f:()=>{say(u.name,'Jak to rozgrywamy?');say('SAPER','Robot jedzie pierwszy i prześwietla każdą podejrzaną rzecz. Jest na światłowodzie, więc zagłuszarka mu nie przeszkadza. Ale bateria zagłuszarki to dwie i pół minuty — włączaj ją, kiedy robot podjeżdża do przedmiotów. Q podczas sterowania. Jeśli facet patrzy, a my stoimy przy ładunku bez zagłuszarki, odpali go.');}},
 {t:'„Co z ładunkiem, jak go znajdziemy?”',f:()=>{say('SAPER','Disruptor z robota: woda pod ciśnieniem rozbija układ, zanim zapalnik zdąży. Sześć sekund celowania. Albo idę ręcznie, ale to trwa.');}}];
 if(H.bombId)it.push({t:'„Ile mamy czasu?”',f:()=>{say('SAPER','Zegar na rentgenie: '+fmtT(Math.max(0,H.bombT))+'. Plus to, czy nasz człowiek trzyma palec na telefonie.');}});
 choiceMenu('Saper · EOD 3',it);}
function mgrTalk(u){const H=G.h;choiceMenu('Kierownik sklepu',[{t:'„Kto jeszcze jest w środku?”',f:()=>{say('KIEROWNIK SKLEPU','Liczyliśmy ludzi na parkingu... brakuje dwójki z zaplecza, farmaceutki i jednej starszej pani. Mogą się chować.');H.said.mgr1=1;}},
 {t:'„Widział pan kogoś podejrzanego?”',f:()=>{say('KIEROWNIK SKLEPU','Ochroniarz mówił o facecie w szarej bluzie z kapturem. Kręcił się z torbą po alejkach, potem poszedł na zaplecze. Nagrania są w biurze ochrony, na tyłach, po lewej.');H.said.mgr2=1;}},
 {t:'„Jak wygląda układ sklepu?”',f:()=>{say('KIEROWNIK SKLEPU','Wejście od frontu, kasy, za nimi alejki. Elektronika na prawo, apteka w rogu. Z tyłu zaplecze: biuro ochrony, socjalny, toalety i magazyn.');}}]);}
function cctvMall(u){const H=G.h;H.cctv=true;logEv('Monitoring: nagrania z 15:10–15:25');const pos={A:'alejki 3',B:'kasy 6',C:'elektroniki',E:'alejki 8',D:'toalet'};const fake=pick(['A','B','C','E'].filter(x=>x!==H.real));const two=[H.real,fake].sort();
 choiceMenu('CCTV · FALLMART #2217',[{t:'15:11 — mężczyzna w szarej bluzie wchodzi z torbą i plecakiem',dis:true,f:NOOP},{t:'15:14–15:19 — zatrzymuje się przy '+pos[two[0]]+' i przy '+pos[two[1]]+'. Coś odkłada, kamera nie łapie co',dis:true,f:NOOP},{t:'15:22 — wchodzi na zaplecze drzwiami przy magazynie. Nie wychodzi.',dis:true,f:NOOP},{t:'Przeglądaj kamery na żywo',f:()=>startCCTV(u,0)}]);
 say(u.name,'Szara bluza, wszedł do magazynu i nie wyszedł. Jest gdzieś na zapleczu.');}
// ---------- robot ----------
function startRobot(u){const H=G.h;
 const R=H.R;R.on=true;G.camv={d:null,u,x:R.x,y:R.y,base:R.a,ang:R.ca,fov:1.15,range:TS*8,t:0,max:1e9,seen:new Set(),poly:null,cctv:1,robot:R,cam:{a:R.ca}};SND.click&&SND.click();
 toast('ROBOT · WSAD: jazda · mysz: kamera · LPM: rentgen / disruptor · Q: zagłuszarka · E: koniec');logEv('Sterowanie robotem');}
function robotIn(u,inp,dt){const H=G.h,R=H.R,cv=G.camv;if(!cv||!cv.robot)return;if(inp.usePressed){cv.stop=true;return;}
 if(inp.abil)jamToggle();
 const mx=inp.mx||0,my=inp.my||0,m=Math.hypot(mx,my);
 if(m>.2&&!R.act){const ta=Math.atan2(my,mx),d=angDiff(R.a,ta);R.a+=clamp(d,-2.6*dt,2.6*dt);if(Math.abs(d)<.9){const sp=34*Math.min(1,m),nx=R.x+Math.cos(R.a)*sp*dt,ny=R.y+Math.sin(R.a)*sp*dt;
  const ok=(x,y)=>{const tx=x/TS|0,ty=y/TS|0;if(!walkable(tx,ty))return false;const dd=LV.doorAt[I(tx,ty)];if(dd&&dd.open<.6){if(dd.target===0&&!dd.locked)toggleDoor(dd,{x,y});return false;}return true;};
  const sig=dist(nx,ny,ML.van.x,ML.van.y)/TS;if(sig>ML.maxSig){R.weak=1;}else{if(ok(nx,R.y))R.x=nx;if(ok(R.x,ny))R.y=ny;R.weak=0;}R.mv=(R.mv||0)+dt;if(R.mv>.25){R.mv=0;robotHum(R);}}}
 cv.base=R.a;R.ca=cv.ang;cv.x=R.x+Math.cos(R.a)*4;cv.y=R.y+Math.sin(R.a)*4-3;
 if(R.act){R.act.t+=dt;if(R.act.k==='xray'&&R.act.t>=3){const o=R.act.o;o.xr=true;R.act=null;xrayResult(o);}else if(R.act&&R.act.k==='disr'){if(((R.act.t*2)|0)!==R.act.bp){R.act.bp=(R.act.t*2)|0;SND.beep(R.x,R.y);}if(R.act.t>=6){R.act=null;SND.bang(R.x,R.y);for(let i=0;i<24;i++)G.fx.push({k:'dust',x:R.x+Math.cos(R.a)*14,y:R.y+Math.sin(R.a)*14-4,vx:Math.cos(R.a)*rand(40,120)+rand(-30,30),vy:Math.sin(R.a)*rand(40,120)+rand(-30,30),t:0,life:.7,c:'#a8c8e8'});bombNeutral('disruptor z robota');}}return;}
 if(inp.firePressed){const o=H.items.find(o=>o.res!=='safe'&&o.res!=='neut'&&dist(R.x,R.y,o.x*TS+8,o.y*TS+8)<TS*1.6);if(!o){toast('Podjedź bliżej podejrzanego przedmiotu (1–2 kratki)');return;}
  if(!o.xr){R.act={k:'xray',t:0,o};SND.beep(R.x,R.y);toast('Rentgen… 3 s');}
  else if(o.id===H.real&&!H.neutral){R.act={k:'disr',t:0,o};toast('Disruptor: celowanie… 6 s');radio('SAPER','Celuję disruptorem. Sześć sekund. Nie ruszaj robotem.',{radio:1});}}}
function robotHum(R){if(!A.ctx)return;const o=out(R.x,R.y,.12,{max:12});if(o)tone(o,A.ctx.currentTime,.2,{f:90,f2:110,g:.4,type:'sawtooth'});}
function xrayResult(o){const H=G.h;if(o.id===H.real){H.bombId=true;o.res='bomb';logEv('Rentgen: ŁADUNEK — '+o.n);radio('SAPER','Mamy go. Rury, przewody, bateria... zapalnik czasowy i moduł GSM. Może go odpalić telefonem. Na zegarze '+fmtT(Math.max(0,H.bombT))+'.',{radio:1,prio:1});
  setTimeout(()=>{if(!G.ended&&!H.neutral)radio('SAPER','Disruptorem z robota albo idę ręcznie. Jeżeli nasz człowiek jest w środku i nie ma zagłuszarki — ryzykujemy.',{radio:1});},5000);}
 else{o.res='safe';radio('SAPER',pick(['Czysto. ','Nic tu nie ma. ','Fałszywy trop. '])+itemSafeTxt(o),{radio:1});logEv('Rentgen: czysto — '+o.n);}}
function bombNeutral(how){const H=G.h;if(H.neutral)return;H.neutral=true;const b=H.items.find(o=>o.id===H.real);b.res='neut';logEv('Ładunek zneutralizowany ('+how+')');radio('SAPER','Ładunek zneutralizowany! Zapalnik rozbity. Powtarzam, ładunek bezpieczny.',{radio:1,prio:1});
 setTimeout(()=>{if(!G.ended&&susActive())radio('DISPATCH','Przyjęłam. S.W.A.T., sprawca wciąż jest w budynku. Zatrzymajcie go.');},2500);}
function detonate(why){const H=G.h;if(H.boom||G.ended)return;H.boom=true;const b=H.items.find(o=>o.id===H.real),bx=b.x*TS+8,by=b.y*TS+8;
 SND.boom(bx,by);SND.boom(G.p1.x,G.p1.y);G.flashW=1.4;G.shake=1.2;for(let i=0;i<60;i++)G.fx.push({k:'dust',x:bx,y:by,vx:rand(-200,200),vy:rand(-200,200),t:0,life:rand(.6,1.6),c:pick(['#ffd080','#e86a1a','#3a3a3a','#6a6a6a'])});
 for(const u of G.units)if(u.alive&&dist(u.x,u.y,bx,by)<TS*9)kill(u,null,Math.atan2(u.y-by,u.x-bx));
 if(G.camv&&G.camv.robot)G.camv.stop=true;logEv('EKSPLOZJA');setTimeout(()=>endMission(false,why),2600);}
function updateMall(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;
 if(!H.neutral&&!H.boom){H.bombT-=dt;if(H.bombT<=0){detonate('Zegar ładunku doszedł do zera.');return;}
  if(H.bombT<120&&!H.said.t2){H.said.t2=1;radio('DISPATCH','Uwaga, dwie minuty do godziny z pogróżki!',{prio:1});}if(H.bombT<300&&!H.said.t5){H.said.t5=1;radio('DISPATCH','Pięć minut do szesnastej trzydzieści.');}}
 if(H.jam){H.jamB-=dt;if(H.jamB<=0){H.jam=false;H.jamB=0;H.jamCdT=ML.jamCd;radio('SAPER','Zagłuszarka padła! Bateria pusta, ładowanie czterdzieści pięć sekund!',{radio:1,prio:1});logEv('Zagłuszarka: bateria rozładowana');}}
 else if(H.jamCdT>0){H.jamCdT-=dt;if(H.jamCdT<=0){H.jamB=ML.jamMax;radio('SAPER','Zagłuszarka naładowana.',{radio:1});}}
 // obserwacja ładunku: ktoś przy bombie bez zagłuszarki
 if(!H.neutral&&!H.jam&&susActive()&&H.suspPhase!=='fight'){const b=H.items.find(o=>o.id===H.real),bx=b.x*TS+8,by=b.y*TS+8;let close=dist(H.R.x,H.R.y,bx,by)<TS*2.2;for(const q of G.squad)if(q&&q.alive&&q.human&&dist(q.x,q.y,bx,by)<TS*2.2)close=true;if(H.eod.state==='work')close=true;
  H.near=close?H.near+dt:Math.max(0,H.near-dt*.5);if(H.near>(H.bombId?9:7)){detonate('Sprawca obserwował ładunek i zdetonował go, gdy podeszliście bez zagłuszarki.');return;}}
 const e=H.sus;if(H.endT==null&&H.neutral&&(!e.alive||e.state==='cuffed')){H.endT=3;radio(G.p1.name,'TOC, ładunek zneutralizowany, sprawca '+(e.alive?'zatrzymany':'zneutralizowany')+'. Fallmart zabezpieczony.',{radio:1});}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,'Ładunek zneutralizowany, sprawca '+(e.alive?'zatrzymany':'zneutralizowany')+'.');}}
function mallRender(c,cx,cy){const H=G.h;if(!H)return;
 for(const o of H.items){const x=o.x*TS-cx,y=o.y*TS-cy;if(x<-30||y<-30||x>VW+30||y>VH+30)continue;
  if(o.res==='neut'){P(c,x+3|0,y+8|0,11,6,'#3a3a3a');for(let i=0;i<6;i++)P(c,x+((i*5)%14)|0,y+6+(i%3)*3|0,2,1,'#6a8aa8');continue;}
  if(o.k==='cool'){P(c,x+3,y+12,11,2,SH);P(c,x+3,y+4,10,9,'#2a5ab0');P(c,x+3,y+4,10,2,'#3a6ac8');P(c,x+5,y+2,6,2,'#1a1a1a');}
  else if(o.k==='pack'){P(c,x+4,y+12,9,2,SH);P(c,x+4,y+4,8,9,'#2a2a2a');P(c,x+5,y+3,6,2,'#1a1a1a');P(c,x+5,y+8,6,3,'#3a3a3a');}
  else if(o.k==='box'){P(c,x+2,y+12,12,2,SH);P(c,x+2,y+3,12,10,'#b89a6a');P(c,x+2,y+3,12,1,'#d8ba8a');P(c,x+7,y+3,2,10,'#c8b080');}
  else if(o.k==='gym'){P(c,x+2,y+12,12,2,SH);P(c,x+2,y+6,12,7,'#8a1a1a');P(c,x+5,y+4,6,2,'#1a1a1a');}
  else if(o.k==='cart'){P(c,x+1,y+12,14,2,SH);P(c,x+2,y+3,12,8,'#9aa0a6');for(let i=0;i<12;i+=3)P(c,x+2+i,y+3,1,8,'#6a7076');P(c,x+5,y+1,6,5,'#e8e8e0');P(c,x+3,y+11,2,2,'#111');P(c,x+11,y+11,2,2,'#111');}
  if(o.res==='safe')P(c,x+13|0,y+1|0,3,3,'#3ac85a');if(o.res==='bomb'&&((G.time*3)|0)%2)P(c,x+13|0,y+1|0,3,3,'#e8201a');}
 const R=H.R,rx=R.x-cx,ry=R.y-cy,ca=Math.cos(R.a),sa=Math.sin(R.a);
 if(rx>-30&&ry>-30&&rx<VW+30&&ry<VH+30){P(c,rx-8|0,ry+3|0,16,3,SH);for(let i=-5;i<=5;i++){const px=rx+ca*i,py=ry+sa*i;P(c,px-sa*4-1|0,py+ca*4-1|0,2,2,'#1a1a1a');P(c,px+sa*4-1|0,py-ca*4-1|0,2,2,'#1a1a1a');}
  for(let i=-4;i<=4;i++)for(let j=-3;j<=3;j++)P(c,rx+ca*i-sa*j|0,ry+sa*i+ca*j-2|0,1,1,j===-3?'#6a7a4a':'#4a5a3a');
  const hx=rx+ca*2,hy=ry+sa*2-7;P(c,hx-1|0,hy|0,2,6,'#3a3a3a');P(c,hx-2+Math.cos(R.ca)*2|0,hy-2+Math.sin(R.ca)|0,4,3,'#1a1a1a');P(c,hx+Math.cos(R.ca)*3|0,hy-1+Math.sin(R.ca)|0,1,1,R.on&&G.camv&&G.camv.robot?'#e8201a':'#3a3a3a');
  P(c,rx+ca*6|0,ry+sa*6-3|0,2,2,'#8a8e92');
  if(R.act){const k=R.act.k==='xray'?R.act.t/3:R.act.t/6;P(c,rx-8|0,ry-16|0,16,2,'#111');P(c,rx-8|0,ry-16|0,16*Math.min(1,k)|0,2,R.act.k==='xray'?'#3ac8e8':'#e8b818');}}
 if(H.sus.alive&&H.suspPhase==='threat'){const e=H.sus,x=e.x+Math.cos(e.ang)*5-cx,y=e.y-14-cy;P(c,x-1|0,y|0,3,4,'#111');if(((G.time*4)|0)%2)P(c,x|0,y|0,1,1,'#3ae87a');}
 const ev=H.eod;if(ev.alive&&(ev.state==='work')){const k=Math.min(1,ev.wT/22);P(c,ev.x-8-cx|0,ev.y-18-cy|0,16,2,'#111');P(c,ev.x-8-cx|0,ev.y-18-cy|0,16*k|0,2,'#e8b818');}}
function mallOver(c,cx,cy){const H=G.h;if(!H)return;const cv=G.camv;if(cv&&cv.robot){const R=H.R,s=dist(R.x,R.y,ML.van.x,ML.van.y)/TS/ML.maxSig;const n=Math.max(0,(s-.6)*2.5);for(let i=0;i<60*n;i++)P(c,(Math.random()*VW)|0,(Math.random()*VH)|0,2,1,'rgba(220,255,220,.35)');}}
function mallObj(){const H=G.h;if(!H)return'';const e=H.sus,inside=H.civ.filter(c=>c.alive&&c.state!=='out').length;
 return objRows('',[[H.civOut>=H.civN,'Wyprowadź pozostałych ('+H.civOut+'/'+H.civN+')'],[H.bombId,'Zlokalizuj ładunek robotem'],[H.neutral,'Zneutralizuj ładunek'],[!e.alive||e.state==='cuffed','Zatrzymaj sprawcę']],
  (G.camv&&G.camv.robot?'<div class="opt" style="color:#8aff9a">ROBOT · kabel '+Math.max(0,Math.round((1-dist(H.R.x,H.R.y,ML.van.x,ML.van.y)/TS/ML.maxSig)*100))+'%'+(H.R.weak?' · KONIEC KABLA':'')+'<br>LPM rentgen/disruptor · Q zagłuszarka · E wyjście</div>':'')+'<div class="opt call911">'+(H.neutral?'Ładunek bezpieczny':(H.bombId?'Zegar ładunku: ':'Do godziny z pogróżki: ')+fmtT(Math.max(0,H.bombT)))+'</div><div class="opt">Zagłuszarka: '+(H.jam?'WŁ · '+Math.ceil(H.jamB)+' s':H.jamCdT>0?'ładowanie '+Math.ceil(H.jamCdT)+' s':'wył')+'</div>');}
function mallDebrief(){const H=G.h||{},e=H.sus||{};let sc=0;const rows=[];
 rows.push(['Ładunek',H.neutral?'zneutralizowany':H.boom?'eksplozja':'nie zneutralizowany',H.neutral?'good':'bad']);sc+=H.neutral?30:0;
 rows.push(['Metoda',H.manual?'saper ręcznie':H.neutral?'disruptor z robota':'—']);sc+=H.neutral&&!H.manual?10:0;
 rows.push(['Ewakuowani ze sklepu',(H.civOut||0)+' / '+(H.civN||0),(H.civOut||0)>=(H.civN||0)?'good':'bad']);sc+=(H.civOut||0)*5;
 rows.push(['Sprawca',!e.alive?'nie żyje':e.state==='cuffed'?'zatrzymany':'na wolności']);sc+=e.state==='cuffed'?20:!e.alive?8:-10;
 rows.push(['Ręczne sprawdzanie przedmiotów',H.handTouched?H.handTouched+'×':'nie',H.handTouched?'bad':'good']);sc-=(H.handTouched||0)*10;
 rows.push(['Pozostały czas',H.neutral?fmtT(Math.max(0,H.bombT)):'—']);if(H.neutral)sc+=Math.floor(H.bombT/30);
 patrolDebrief(rows,sc);}
LVL.mall={id:'mall',patrol:true,lit:.86,weather:'day',crew:{role:'S.W.A.T.',shout:'Police! Get down!'},car:{s:'#1e3c8a'},ext:'concrete',
 terrain:mallTerrain,windows:mallWindows,decor:mallDecor,rooms:ROOMS_MALL,doors:DOORS_MALL,furn:FURN_MALL,lamps:LAMPS_MALL,cams:CAMS_MALL,entries:ENTRIES_MALL,
 spawn:spawnMallTeam,start:startMall,update:updateMall,interact:mallInteract,render:mallRender,over:mallOver,stress:NOOP,obj:mallObj,debrief:mallDebrief,robotIn,
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n==='Hala sprzedaży'?['#d8d4c8','#a8a498']:n==='Magazyn'?['#8a8a84','#6a6a64']:n.startsWith('WC')||n==='Apteka'?['#c4d4d8','#94a4aa']:['#b8b4a8','#888478'];},
 win:'TOC przyjął. Fallmart zabezpieczony.',planTitle:'FALLMART SUPERCENTER #2217',
 nb:{no:'#26-314-1544',pri:'P1',code:'BOMB THREAT',small:'MIEJSCE',addr:'FALLMART<br>SUPERCENTER #2217',facts:[['JEDNOSTKI','S.W.A.T. · EOD 3 · Pasadena PD'],['GODZINA','15:44 · pochmurno'],['GROŹBA','ładunek, detonacja 16:30']],
  title:'ZAPIS ROZMOWY · LINIA SKLEPU',clock:[15,38,20],who:{D:'KIEROWNIK',C:'NIEZNANY'},bg:[6,4,74,40],
  call:[['D','Fallmart, dział obsługi klienta, w czym mogę pomóc?'],['C','Słuchaj uważnie. W twoim sklepie jest bomba.'],['D','Proszę pana, to nie jest śmieszne...'],['C','O szesnastej trzydzieści wszystko wyleci w powietrze. Wyprowadź ludzi, jeśli ci na nich zależy.'],['D','Gdzie... gdzie ona jest? Kim pan jest?'],['C','Kimś, kogo wyrzuciliście jak psa. Patrzę na was.'],['D','Halo? Halo?!']]}};
