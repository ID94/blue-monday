// ================= MISSION 08: RIVERSIDE PARK — NOCNY PATROL =================
const PK={bench:{x:44.5*TS,y:30.6*TS},bag:{x:46*TS+8,y:30*TS+8},car:{x:38.4*TS,y:50.7*TS},gate:[39,1],lot:[37,56]};
const ROOMS_PARK=[R_('WC męskie',18,37,20,40,'tileW'),R_('WC damskie',22,37,24,40,'tileW')];
const DOORS_PARK=[[19,36],[23,36]];
const PK_TREES=[];
const FURN_PARK=[];
{const F_=(...a)=>FURN_PARK.push(a),r=rng(808),taken=new Set();const put=(k,x,y)=>{const key=x+','+y;if(taken.has(key))return;taken.add(key);F_(k,x,y);};
 const busy=(x,y)=>(x>=36&&x<=42)||(y>=24&&y<=28)||(x>=30&&x<=48&&y>=19&&y<=33)||(x>=8&&x<=22&&y>=14&&y<=24)||(x>=51&&x<=71&&y>=9&&y<=25)||(x>=16&&x<=26&&y>=35&&y<=43)||y>=46||y<=2;
 for(let y=3;y<46;y++)for(let x=1;x<79;x++){if(busy(x,y))continue;const v=r();if(v<.13){put('tree',x,y);PK_TREES.push([x,y]);}else if(v<.16)put('bush',x,y);else if(v<.175)put('leafpile',x,y);}
 // fontanna i ławki
 F_('fountain',38,24);for(const[x,y]of[[33,22],[44,22],[33,29],[44,29]])F_('bench',x,y);F_('trash',36,22);F_('trash',47,29);F_('trash',31,26);
 // grupa przy ławce
 F_('spkr',43,30);for(const[x,y]of[[44,31],[46,31],[47,30],[43,31],[42,29]])F_('bottle',x,y);F_('cans',45,31);F_('cans',48,31);F_('bkpk',46,30);F_('chips',43,29);
 // latarnie
 for(const[x,y]of[[36,21],[42,32],[30,30],[39,40],[39,12],[25,26],[55,26],[39,47],[60,47],[18,47]])F_('lamp',x,y);
 // plac zabaw
 F_('swing',10,15);F_('slide',15,16);F_('jgym',10,19);F_('horse',17,21);F_('horse',19,20);F_('bench',13,23);F_('trash',20,23);F_('shoe',12,17);
 // staw
 for(let y=11;y<=23;y++)for(let x=52;x<=70;x++){const dx=(x-61)/9.5,dy=(y-17)/6.5;if(dx*dx+dy*dy<=1)F_('wtile',x,y);else if(dx*dx+dy*dy<=1.35&&r()<.45)F_('reeds',x,y);}
 F_('bench',56,28);F_('bench',64,28);F_('ducksign',51,24);
 // toalety
 F_('toilet',18,40);F_('toilet',20,40);F_('sink',20,37);F_('toilet',22,40);F_('toilet',24,40);F_('sink',22,37);
 // ogrodzenie i bramy
 for(let x=0;x<80;x++)if(x<37||x>41)F_('ifence',x,1);F_('parksign',42,46);F_('gatep',36,1);F_('gatep',42,1);
 // parking
 F_('police',37,51);F_('car',46,52);F_('car',28,52);F_('trash',33,49);for(const x of[26,30,34,44,48,52])F_('stop',x,49);}
F('wtile',1,1,1,0,()=>{});
F('fountain',3,3,1,0,(g,x,y)=>{P(g,x+2,y+42,44,4,SH);P(g,x+1,y+6,46,38,'#5a5650');P(g,x+1,y+6,46,2,'#7a766e');P(g,x+4,y+10,40,30,'#2a2a28');P(g,x+5,y+11,38,4,'#1e1e1c');
 const r=rng(5);for(let i=0;i<30;i++)P(g,x+6+(r()*34|0),y+16+(r()*22|0),2,1,['#8a3c14','#b0581c','#6a4a1c'][i%3]);P(g,x+19,y+6,10,26,'#6a6660');P(g,x+19,y+6,10,2,'#8a867e');P(g,x+16,y+2,16,6,'#5a5650');P(g,x+16,y+2,16,1,'#7a766e');P(g,x+21,y+32,6,2,'#3a3a36');});
F('spkr',1,1,0,0,(g,x,y)=>{P(g,x+4,y+10,9,2,SH);P(g,x+4,y+6,9,5,'#1a1c20');P(g,x+5,y+7,3,3,'#3a3e44');P(g,x+9,y+7,3,3,'#3a3e44');P(g,x+12,y+6,1,1,'#3a8aff');});
F('cans',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<3;i++){const a=(r()*10|0)+2,b=(r()*9|0)+3,c=['#c8302a','#2a5ab0','#c8c8c8'][i];if(r()<.5){P(g,x+a,y+b,4,2,c);P(g,x+a,y+b,1,2,'#9a9a9a');}else{P(g,x+a,y+b-2,2,4,c);P(g,x+a,y+b-2,2,1,'#c8c8c8');}}});
F('chips',1,1,0,0,(g,x,y)=>{P(g,x+4,y+7,8,6,'#e8b818');P(g,x+5,y+8,6,2,'#c8301a');P(g,x+6,y+11,2,1,'#e8d898');});
F('swing',3,1,1,0,(g,x,y)=>{P(g,x+2,y+12,44,3,SH);P(g,x+1,y-16,2,30,'#5a3a2a');P(g,x+45,y-16,2,30,'#5a3a2a');P(g,x+1,y-17,46,3,'#6a4a32');for(const sx of[11,30]){P(g,x+sx,y-14,1,20,'#8a8e92');P(g,x+sx+7,y-14,1,20,'#8a8e92');P(g,x+sx-1,y+5,10,3,'#2a2a2a');}});
F('slide',2,2,1,0,(g,x,y)=>{P(g,x+2,y+28,28,3,SH);P(g,x+2,y-10,10,40,'#5a3a2a');for(let j=0;j<6;j++)P(g,x+3,y-6+j*6,8,1,'#8a6a4a');P(g,x+2,y-12,12,4,'#a8302a');for(let i=0;i<14;i++)P(g,x+12+i,y-8+i*2,4,3,i%2?'#c8a020':'#d8b030');});
F('jgym',2,2,1,0,(g,x,y)=>{P(g,x+1,y+28,30,3,SH);for(const[a,b]of[[2,2],[28,2],[2,26],[28,26]])P(g,x+a,y+b-14,2,16,'#3a6a9a');for(let j=0;j<3;j++){P(g,x+2,y-12+j*7,28,1,'#4a7aaa');P(g,x+2,y+12-j*0,28,1,'#4a7aaa');}for(let i=0;i<5;i++)P(g,x+4+i*6,y-12,1,24,'#4a7aaa');});
F('horse',1,1,1,0,(g,x,y,w,h,s)=>{const c=['#c8302a','#2a8a4a','#e8b818'][s%3];P(g,x+4,y+12,9,2,SH);P(g,x+7,y+6,2,7,'#5a5e62');P(g,x+3,y+1,11,5,c);P(g,x+11,y-2,4,5,c);P(g,x+12,y-1,1,1,'#111');});
F('reeds',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<5;i++){const a=(r()*13|0)+1,hh=6+(r()*6|0);P(g,x+a,y+14-hh,1,hh,'#4a4a22');if(r()<.5)P(g,x+a,y+14-hh,1,2,'#6a4a2a');}});
F('ducksign',1,1,1,0,(g,x,y)=>{P(g,x+7,y-6,2,19,'#5a5e62');P(g,x+2,y-12,12,8,'#e8e4d8');P(g,x+4,y-10,5,3,'#2a2a2a');P(g,x+8,y-11,2,2,'#2a2a2a');P(g,x+3,y-12,1,8,'#c8302a');P(g,x+3,y-12,11,1,'#c8302a');});
F('ifence',1,1,1,0,(g,x,y)=>{P(g,x,y+12,16,2,SH);P(g,x,y-4,16,1,'#2a2c30');P(g,x,y+6,16,1,'#2a2c30');for(let i=1;i<16;i+=3){P(g,x+i,y-6,1,18,'#1e2024');P(g,x+i,y-7,1,1,'#4a4e52');}});
F('gatep',1,1,1,0,(g,x,y)=>{P(g,x+4,y+12,9,3,SH);P(g,x+4,y-12,8,25,'#5a5650');P(g,x+3,y-14,10,3,'#7a766e');P(g,x+6,y-17,4,3,'#3a3a36');});
F('parksign',2,1,1,0,(g,x,y)=>{P(g,x+3,y+12,26,3,SH);P(g,x+6,y,2,13,'#3a2a1e');P(g,x+24,y,2,13,'#3a2a1e');P(g,x+2,y-12,28,13,'#2a3a22');P(g,x+3,y-11,26,11,'#3a4a2e');P(g,x+5,y-9,22,2,'#e8dcb0');P(g,x+5,y-5,14,1,'#c8bc90');P(g,x+5,y-3,18,1,'#c8bc90');});
F('stop',1,1,0,0,(g,x,y)=>{P(g,x+2,y+8,12,3,'#6a6660');P(g,x+2,y+8,12,1,'#8a867e');});
Object.assign(FH,{fountain:4,swing:0,slide:0,jgym:0,parksign:0,ifence:0,wtile:0});
const LAMPS_PARK=[[36,21,0,'#ffd9a0',60],[42,32,1,'#ffd9a0',58],[39,40,0,'#ffd9a0',56],[39,12,0,'#ffd9a0',56],[25,26,0,'#ffd9a0',52],[55,26,0,'#ffd9a0',56],[39,47,0,'#ffe8c0',60],[60,47,0,'#ffe8c0',56],[18,47,0,'#ffe8c0',56],[19,38,0,'#e8f0ff',26],[23,38,0,'#e8f0ff',26]];
const ENTRIES_PARK=[{n:'Parking przy wejściu',s:'Radiowóz przy bramie południowej.',x:39,y:49.6,a:-Math.PI/2,px:39,py:49}];
function parkTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.GRASS,'grass');fillR(24,48,56,57,T.ASPH,'asph');fillR(0,46,79,47,T.ASPH,'walk');
 fillR(38,2,40,47,T.ASPH,'gravel');fillR(8,25,72,27,T.ASPH,'gravel');fillR(9,15,21,23,T.ASPH,'sand');fillR(19,28,21,35,T.ASPH,'gravel');
 for(let y=19;y<=33;y++)for(let x=30;x<=48;x++){const dx=(x-39)/9,dy=(y-26)/7;if(dx*dx+dy*dy<=1)fillR(x,y,x,y,T.ASPH,'cobble');}
 for(let y=11;y<=23;y++)for(let x=52;x<=70;x++){const dx=(x-61)/9.5,dy=(y-17)/6.5;if(dx*dx+dy*dy<=1)fillR(x,y,x,y,T.GRASS,'water');}
 fillR(18,37,24,40,T.FLOOR,'tileW');H(36,17,25);H(41,17,25);V(17,36,41);V(25,36,41);V(21,37,40);}
function parkWindows(M,set){set(18,41,T.WIN);set(24,41,T.WIN);}
function parkDecor(){const L=(x,y,w,h,c)=>P(wc,x,y,w,h,c);
 for(let x=25;x<56;x+=3){L(x*TS,49*TS+2,1,3*TS,'rgba(220,220,210,.5)');L(x*TS,54*TS,1,3*TS,'rgba(220,220,210,.5)');}
 // graffiti na WC
 const g=WR[36]&&WR[36].getContext('2d');if(g){P(g,18*TS,18,10,5,'#a83a8a');P(g,18*TS+2,19,6,1,'#e8e030');P(g,24*TS+2,19,12,4,'#3aa8c8');P(g,24*TS+4,20,8,1,'#1a1a1a');}}
const TEEN_PAL={tyler:{body:'#3a3a40',legs:'#2a3a5a',hair:'#3a2418',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1},mia:{body:'#8a3a5a',legs:'#2a2a3a',hair:'#c8a050',head:'#e0c0a8',face:'#e0c0a8',visor:'#2a1a12',eyes:1},
 jake:{body:'#c86a1a',legs:'#3a3a3a',hair:'#8a5a30',head:'#d0a888',face:'#d0a888',visor:'#2a1a12',eyes:1},sam:{body:'#2a5a3a',legs:'#3a3a40',hair:'#1e1410',head:'#a07a5a',face:'#a07a5a',visor:'#2a1a12',eyes:1}};
function startPark(){G.hostage=null;G.deadline=1e9;G.police=[];
 G.h={t:0,said:{},seen:false,intro:false,music:true,film:true,esc:1,ids:{},drugs:false,bagLook:false,assault:false,rude:0,filmOk:null,parents:false,samT:null,samCrit:false,inCar:{},endT:null,gone:{},musT:0,tauntT:8};
 const H=G.h,q=(n,tx,ty,pose,a,upd,pal)=>{const c=mkNPC({tx,ty,kind:'teen',pal:Object.assign({},pal),state:'calm',pose,a,name:n,upd});c.noCuffMsg=1;return c;};
 H.tyler=q('TYLER',45,30,'sit',Math.PI/2,tylerUpd,TEEN_PAL.tyler);H.mia=q('MIA',44,30,'sit',Math.PI/2,miaUpd,TEEN_PAL.mia);
 H.jake=q('JAKE',43,31,'stand',Math.PI/2,jakeUpd,TEEN_PAL.jake);H.jake.state='idle';H.sam=q('SAM',47,31,'stand',Math.PI/2,samUpd,TEEN_PAL.sam);
 for(const c of[H.tyler,H.mia,H.jake,H.sam])c.x+=0;H.tyler.x-=4;H.mia.x+=2;
 logEv('Zgłoszenie: zakłócanie spokoju, Riverside Park');
 setTimeout(()=>{radio('DISPATCH','Unit 4-Charlie-12, Riverside Park, wejście od Linden Street. Sąsiadka zgłasza grupę młodzieży przy fontannie: głośna muzyka, alkohol, krzyki. Park zamknięty od dwudziestej drugiej.');radio(G.p1.name,'4-Charlie-12, przyjąłem, jesteśmy na miejscu.',{radio:1});},700);}
const near=(a,b,r)=>a&&b&&dist(a.x,a.y,b.x,b.y)<r;
function teenBase(c,dt){if(c.state==='cuffed'){if(c.escort&&c.escort.alive){if(dist(c.escort.x,c.escort.y,c.x,c.y)>TS*1.3){c.pose='stand';npcGo(c,dt,c.escort.x/TS|0,c.escort.y/TS|0,40);}else{moveUnit(c,dt,0,0,0);turnTo(c,Math.atan2(c.escort.y-c.y,c.escort.x-c.x),dt,3);}}else{moveUnit(c,dt,0,0,0);c.pose='kneel';}return true;}
 if(c.state==='leave'){if(npcGo(c,dt,PK.lot[0],PK.lot[1],34)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);G.h.gone[c.name]=1;}return true;}
 if(c.state==='follow'&&c.lead){if(dist(c.lead.x,c.lead.y,c.x,c.y)>TS*1.5){c.pose='stand';npcGo(c,dt,c.lead.x/TS|0,c.lead.y/TS|0,36);}else moveUnit(c,dt,0,0,0);if(!c.lead.alive||c.lead.state==='gone')c.state='leave';return true;}
 return false;}
function lookCops(c,dt){const q=nearestSquad(c);if(q&&dist(q.x,q.y,c.x,c.y)<TS*10)turnTo(c,Math.atan2(q.y-c.y,q.x-c.x),dt,2);}
function tylerUpd(c,dt){if(teenBase(c,dt))return;moveUnit(c,dt,0,0,0);if(G.h.seen)lookCops(c,dt);if(G.h.drugs&&c.pose==='sit'){c.pose='stand';}}
function miaUpd(c,dt){if(teenBase(c,dt))return;moveUnit(c,dt,0,0,0);if(G.h.seen)lookCops(c,dt);}
function samUpd(c,dt){const H=G.h;if(teenBase(c,dt))return;moveUnit(c,dt,0,0,0);c.ph=(c.ph||0)+dt;
 if(H.samT==null){turnTo(c,Math.PI/2+Math.sin(c.ph*.9)*.6,dt,1.5);c.pose='stand';if(H.seen&&H.t>(H.seenT||0)+50)H.samT=0;return;}
 H.samT+=dt;if(H.samSt==null){H.samSt='sick';say('SAM','...nie czuję się... bleee—');c.pose='kneel';logEv('Sam wymiotuje');vomit(c);}
 if(H.samSt==='sick'){c.pose='kneel';if(((c.ph*1.3)|0)%4===0&&Math.random()<dt*2)vomit(c);if(H.samT>14){H.samSt='down';c.pose='sleep';say('MIA','Sam?! Sam, obudź się! Proszę pana, on nie odpowiada!');logEv('Sam traci przytomność');}}
 else if(H.samSt==='down'){c.pose='sleep';if(H.samT>110&&!H.samCrit){H.samCrit=true;logEv('Sam: długo bez pomocy');say('MIA','On dziwnie oddycha... zróbcie coś!');}}
 else if(H.samSt==='side'){c.pose='sleep';}}
function vomit(c){for(let i=0;i<7;i++)G.fx.push({k:'dust',x:c.x+Math.cos(c.ang)*6,y:c.y+Math.sin(c.ang)*6-2,vx:Math.cos(c.ang)*rand(10,30)+rand(-8,8),vy:Math.sin(c.ang)*rand(10,30)+rand(-4,10),t:0,life:.6,c:'#8a8a3a'});}
const JAKE_T=[['Nagrywam cię, gościu. Uśmiechnij się do internetu.','Serio? Nie macie prawdziwych przestępców do łapania?','Ile ci płacą za straszenie dzieciaków w parku?'],
 ['Nie dotykaj mnie. Znam swoje prawa, frajerze.','No dawaj, co mi zrobisz? Mój stary jest prawnikiem.','Stań bliżej, to lepiej wyjdziesz na nagraniu, świnio.'],
 ['Spierdalaj ode mnie! Wszyscy to nagrywają!','No i co, tchórzu? No dawaj!']];
function jakeUpd(c,dt){const H=G.h;if(teenBase(c,dt))return;c.ph=(c.ph||0)+dt;
 if(c.state==='flee'){c.stT=(c.stT||rand(2.5,4))-dt;if(c.stT<=0){c.stop=.8;c.stT=rand(2.5,4.2);}if(c.stop>0){c.stop-=dt;moveUnit(c,dt,0,0,0);c.pose='stand';const q=nearestSquad(c);if(q)turnTo(c,Math.atan2(q.y-c.y,q.x-c.x),dt,4);return;}
  if(npcGo(c,dt,PK.gate[0],PK.gate[1],41)||c.y<2.2*TS){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);H.jakeGone=true;logEv('Jake uciekł z parku');radio(G.p1.name,'Dispatch, nastolatek uciekł bramą północną na Linden. Biała kurtka... pomarańczowa bluza, siedemnaście lat.',{radio:1});}
  const L=G.p1;if(L&&L.shoutCd>2.9&&!c.heardSh&&dist(L.x,L.y,c.x,c.y)<TS*8){c.heardSh=1;if(H.esc<=2&&Math.random()<.55){c.state='comply';c.pose='hands';c.path=null;say('JAKE','Dobra! Dobra, kurwa! Stoję!');logEv('Jake zatrzymuje się na wezwanie');}}
  return;}
 if(c.state==='down'||c.state==='comply'){moveUnit(c,dt,0,0,0);c.pose=c.state==='down'?'kneel':'hands';return;}
 if(c.state==='calm'||c.state==='cited'){moveUnit(c,dt,0,0,0);c.pose='sit';return;}
 moveUnit(c,dt,0,0,0);if(H.seen)lookCops(c,dt);c.pose='stand';
 if(!H.seen)return;
 if(H.intro){H.jIgn=(H.jIgn||0)+dt;if(H.jIgn>40&&H.esc<3){H.jIgn=0;H.esc++;logEv('Jake się nakręca');}}
 H.tauntT-=dt;if(H.tauntT<=0&&H.esc>=1){H.tauntT=rand(10,15);const set=JAKE_T[Math.min(2,H.esc-1)];say('JAKE',pick(set));if(Math.random()<.45)jakeThrow(c);
  if(H.esc>=2&&G.p1&&dist(G.p1.x,G.p1.y,c.x,c.y)<TS*4){c.inFace=1.6;}}
 if(c.inFace>0){c.inFace-=dt;const L=G.p1;if(dist(L.x,L.y,c.x,c.y)>TS*1.1){const a=Math.atan2(L.y-c.y,L.x-c.x);moveUnit(c,dt,Math.cos(a),Math.sin(a),34);}}
 if(H.esc>=3&&!H.assault)jakeShove(c);}
function jakeThrow(c){const q=nearestSquad(c);if(!q)return;const a=Math.atan2(q.y-c.y,q.x-c.x)+rand(-.25,.25);for(let i=0;i<3;i++)G.fx.push({k:'dust',x:c.x+Math.cos(a)*(4+i*2),y:c.y-8,vx:Math.cos(a)*90,vy:Math.sin(a)*90,t:0,life:.35,c:i?'#9a9a9a':'#c8302a'});setTimeout(()=>{if(!G.ended)SND.clang&&SND.clang(q.x,q.y);},350);logEv('Jake rzuca puszką w stronę policjantów');G.h.thrown=(G.h.thrown||0)+1;}
function jakeShove(c){const H=G.h,o=G.squad.find(q=>q&&q.alive&&!q.human)||G.p1;H.assault=true;say('JAKE','Spierdalaj ode mnie!!');o.stun=Math.max(o.stun||0,.7);const a=Math.atan2(o.y-c.y,o.x-c.x);o.x+=Math.cos(a)*8;o.y+=Math.sin(a)*8;unstick(o);SND.hurt&&SND.hurt(o.x,o.y);
 logEv('Jake popycha funkcjonariusza ('+o.name+')');setTimeout(()=>{if(!G.ended)say(o.name,'Napaść na funkcjonariusza! Stój!');},500);jakeRun(c);}
function jakeRun(c){if(c.state==='flee'||c.state==='cuffed')return;c.state='flee';c.path=null;c.pose='stand';G.h.film=false;logEv('Jake ucieka');const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)setTimeout(()=>{if(!G.ended)say(o.name,'Ucieka! Na północ, do bramy!');},700);}
function escalate(n,why){const H=G.h;H.esc=Math.max(0,Math.min(3,H.esc+n));if(n>0&&why)H.rude++;if(H.esc===0&&H.jake.state==='idle0'){}}
function parkInteract(u){const H=G.h;if(!H)return null;const j=H.jake;
 // zatrzymani: prowadzenie i radiowóz
 for(const c of[H.tyler,H.jake,H.mia,H.sam]){if(!c.alive||c.state!=='cuffed'||H.inCar[c.name])continue;
  if(c.escort===u&&nearPt(u,PK.car.x,PK.car.y,30)&&dist(c.x,c.y,u.x,u.y)<TS*3)return{k:'house',label:'Posadź '+c.name+' w radiowozie',dur:1.4,f:()=>parkInCar(c)};
  if(dist(c.x,c.y,u.x,u.y)<22)return{k:'house',label:c.escort?'Puść '+c.name:'Prowadź '+c.name+' do radiowozu',dur:0,f:(u)=>{c.escort=c.escort?null:u;c.path=null;if(c.escort)say(u.name,pick(['Wstawaj. Idziemy do auta.','Powoli. Idziesz ze mną.']));}};}
 if(j.alive&&(j.state==='flee')&&dist(j.x,j.y,u.x,u.y)<24)return{k:'house',label:'Powal go!',dur:0,f:()=>{j.state='down';j.path=null;j.vx=j.vy=0;SND.hurt&&SND.hurt(j.x,j.y);say(u.name,'Na ziemię! Ręce na plecy!');say('JAKE','Aaa! Dobra, dobra! Puszczaj!');logEv('Jake obezwładniony');}};
 if(H.intro&&nearPt(u,PK.car.x,PK.car.y,26))return{k:'house',label:'Radiowóz — zakończ interwencję',dur:0,f:carMenuPark};
 if(H.sam.alive&&H.samSt&&H.samSt!=='ems'&&dist(H.sam.x,H.sam.y,u.x,u.y)<22)return{k:'house',label:'Sprawdź, co z Samem',dur:0,f:samMenu};
 if(!H.drugs&&nearPt(u,PK.bag.x,PK.bag.y,20))return{k:'house',label:'Plecak przy ławce',dur:0,f:bagMenuPark};
 if(j.alive&&['idle','calm','comply','down','cited'].includes(j.state)&&dist(j.x,j.y,u.x,u.y)<(j.state==='down'?28:20))return{k:'house',label:'Rozmowa z Jakiem',dur:0,f:jakeMenu};
 if(H.tyler.alive&&H.tyler.state!=='cuffed'&&dist(H.tyler.x,H.tyler.y,u.x,u.y)<20)return{k:'house',label:'Rozmowa z Tylerem',dur:0,f:tylerMenu};
 if(H.mia.alive&&H.mia.state==='calm'&&dist(H.mia.x,H.mia.y,u.x,u.y)<20)return{k:'house',label:'Rozmowa z Mią',dur:0,f:miaMenu};
 if(nearPt(u,PK.bench.x,PK.bench.y,40)&&(H.tyler.alive||H.mia.alive))return{k:'house',label:'Rozmowa z grupą',dur:0,f:groupMenu};
 return null;}
function groupMenu(u){const H=G.h,j=H.jake,it=[];
 if(!H.intro)it.push({t:'„Dobry wieczór, policja. Park jest zamknięty od dwudziestej drugiej.”',f:()=>{H.intro=true;say(u.name,'Dobry wieczór, policja. Park jest zamknięty od dwudziestej drugiej. Co tu robicie?');say('MIA','Przepraszamy... tylko siedzimy. Już idziemy.');if(j.state==='idle')say('JAKE','Zamknięty? To publiczny park, stary. Płacę podatki.');logEv('Kontakt z grupą');}});
 if(H.music)it.push({t:'„Wyłączcie muzykę, proszę.”',f:()=>{say(u.name,'Wyłączcie muzykę, proszę.');if(H.esc<=1||j.state!=='idle'){H.music=false;say('JAKE','Dobra, dobra... już.');}else{say('JAKE','A jak nie, to co?');H.said.musRef=1;}}});
 if(H.music&&H.said.musRef)it.push({t:'Wyłącz głośnik samemu',f:()=>{H.music=false;say(u.name,'Wyłączam to.');if(j.state==='idle'){say('JAKE','Ej! Nie dotykaj moich rzeczy!');escalate(1);}}});
 if(H.intro&&!H.said.ids)it.push({t:'„Ile macie lat? Poproszę dokumenty od wszystkich.”',f:()=>{H.said.ids=1;say(u.name,'Ile macie lat? Poproszę dokumenty od wszystkich.');say('MIA','Mia Castillo... szesnaście. Mam tylko legitymację szkolną.');H.ids.mia=1;
  setTimeout(()=>{if(G.ended)return;if(H.sam.alive&&H.samSt!=='down')say('SAM','Sam... Okafor. Szes... szesnaście.');H.ids.sam=1;say('TYLER','Tyler Brandt. Osiemnaście. Prawo jazdy.');H.ids.tyler=1;
   if(j.state==='idle'){if(H.esc<=0){say('JAKE','Jake Halloran. Siedemnaście. Zadowolony?');H.ids.jake=1;}else say('JAKE','Nie muszę ci nic pokazywać.');}logEv('Spisano: Mia (16), Sam (16), Tyler (18)'+(H.ids.jake?', Jake (17)':''));},2400);}});
 if(H.intro&&!H.said.alc)it.push({t:'„Czyj jest ten alkohol?”',f:()=>{H.said.alc=1;say(u.name,'Czyj jest ten alkohol?');say('MIA','...');if(j.state==='idle')say('JAKE','Znaleźliśmy go tutaj. Taki prezent od parku.');H.alc=true;}});
 if(H.intro&&!H.said.bag)it.push({t:'„Czyj to plecak?”',f:()=>{H.said.bag=1;say(u.name,'Czyj to plecak?');say('TYLER','Nie mój. Leżał tu, jak przyszliśmy.');say(u.name,'Mia spogląda na Tylera i szybko odwraca wzrok.');}});
 if(H.intro)it.push({t:'„Dobra, koniec imprezy. Rozchodzicie się do domów.”',f:()=>{say(u.name,'Dobra, koniec imprezy. Zbierajcie się do domów.');for(const c of[H.tyler,H.mia,H.jake,H.sam]){if(!c.alive||['cuffed','flee','down'].includes(c.state)||(c===H.sam&&H.samSt)||H.inCar[c.name])continue;c.state='leave';c.pose='stand';c.path=null;}H.released=true;logEv('Grupa rozesłana do domów');}});
 choiceMenu('Grupa przy fontannie',it);}
function jakeMenu(u){const H=G.h,j=H.jake,it=[];H.jIgn=0;
 if(H.film&&H.filmOk==null)it.push({t:'„Masz prawo nagrywać. Ale zrób krok w tył.”',f:()=>{H.filmOk=true;say(u.name,'Masz prawo nagrywać. Ale zrób krok w tył, dobrze?');say('JAKE','...No. Dobra.');escalate(-1);j.inFace=0;}});
 if(H.film&&H.filmOk==null)it.push({t:'„Schowaj ten telefon, natychmiast!”',f:()=>{H.filmOk=false;say(u.name,'Schowaj ten telefon, natychmiast!');say('JAKE','Hahaha, słyszeliście? Zabrania mi nagrywać! Ale wtopa, stary.');escalate(1,1);}});
 if(j.state==='idle')it.push({t:'„Nikt nie chce ci zepsuć wieczoru. Pokaż dokument i wracacie do domów.”',f:()=>{say(u.name,'Słuchaj, nikt nie chce ci zepsuć wieczoru. Pokaż dokument i wszyscy wracacie do domów.');escalate(-1);
  if(H.esc<=0){H.ids.jake=1;j.state='calm';say('JAKE','...Jake Halloran. Siedemnaście. Tylko nie dzwońcie do mojego starego.');logEv('Jake podaje dane i się uspokaja');}else say('JAKE','Taa, jasne. Zawsze tak mówicie.');}});
 if(j.state==='idle')it.push({t:'„Jeszcze jedno słowo i jedziesz z nami.”',f:()=>{say(u.name,'Jeszcze jedno słowo i jedziesz z nami.');say('JAKE','Ooo, groźby! Macie to na nagraniu?');escalate(1,1);}});
 if(['idle','calm','comply','down'].includes(j.state))it.push({t:'„Odwróć się, ręce na plecy. Jesteś zatrzymany.”',f:()=>{say(u.name,'Odwróć się, ręce na plecy.');if(j.state==='idle'&&H.esc>=2){say('JAKE','Chuja tam!');jakeRun(j);}else{j.state='cuffed';j.pose='kneel';say('JAKE','Za co?! To jakieś jaja...');logEv('Jake skuty');}}});
 if(H.ids.jake&&(j.state==='calm'||j.state==='comply'))it.push({t:'„Dostajesz wezwanie za alkohol. Dzwonimy po rodziców.”',f:()=>{j.state='cited';say(u.name,'Spożywanie alkoholu przez nieletniego. Dostajesz wezwanie, rodzice przyjadą po ciebie.');say('JAKE','Super. Po prostu super.');H.jakeCited=true;H.parents=H.parents||(setTimeout(momArrive,42000),true);logEv('Jake: wezwanie za alkohol');}});
 if(!it.length)it.push({t:'(Jake nie ma nic do dodania)',dis:true,f:NOOP});
 choiceMenu('Jake Halloran (17)',it);}
function tylerMenu(u){const H=G.h,t=H.tyler,it=[];
 if(!H.said.tyWep)it.push({t:'„Masz przy sobie coś, o czym powinienem wiedzieć?”',f:()=>{H.said.tyWep=1;say(u.name,'Masz przy sobie coś, o czym powinienem wiedzieć?');say('TYLER','Nie. Nic. Możemy już iść?');}});
 if(H.drugs)it.push({t:'„Tyler, wstań. Jesteś zatrzymany.”',f:()=>{t.state='cuffed';t.pose='kneel';say(u.name,'Tyler, wstań. Ręce za plecy. Jesteś zatrzymany za posiadanie środków odurzających z zamiarem dystrybucji.');say('TYLER','To nie moje... kurwa. Dobra. Dobra.');logEv('Tyler Brandt zatrzymany');}});
 else it.push({t:'„Zostań na ławce.”',f:()=>{say(u.name,'Zostań na ławce, proszę.');say('TYLER','Jasne.');}});
 choiceMenu('Tyler Brandt (18)',it);}
function miaMenu(u){const H=G.h,m=H.mia,it=[];
 if(!H.said.miaOk)it.push({t:'„Wszystko w porządku?”',f:()=>{H.said.miaOk=1;say(u.name,'Wszystko w porządku?');say('MIA','Nie... Jake zawsze tak ma, jak wypije. A Sam pierwszy raz pił wódkę. Mama mnie zabije.');}});
 if(!H.said.miaBag)it.push({t:'„Czyj jest ten plecak? Zostanie między nami.”',f:()=>{H.said.miaBag=1;say(u.name,'Czyj jest ten plecak? To zostanie między nami.');say('MIA','(cicho) Tylera. Przyniósł... coś. Mówił, że sprzeda w szkole. Ja nic nie brałam, przysięgam.');H.miaTip=true;logEv('Mia: plecak należy do Tylera');}});
 if(!H.parents)it.push({t:'„Zadzwonimy po twoich rodziców.”',f:()=>{H.parents=true;say(u.name,'Zadzwonimy po twoją mamę. Przyjedzie po ciebie.');say('MIA','...Dobrze. Przepraszam.');radio(u.name,'Dispatch, proszę o kontakt z rodzicami nieletniej, Mia Castillo, szesnaście lat. Odbiór z Riverside Park.',{radio:1});setTimeout(momArrive,42000);logEv('Wezwano rodziców Mii');}});
 if(!it.length)it.push({t:'(Mia czeka na mamę)',dis:true,f:NOOP});
 choiceMenu('Mia Castillo (16)',it);}
function bagMenuPark(u){const H=G.h,it=[];
 if(!H.bagLook)it.push({t:'Przyjrzyj się (bez dotykania)',f:()=>{H.bagLook=true;say(u.name,'Kieszeń rozpięta. Wystaje z niej foliowy woreczek z zielonym suszem. Widać go gołym okiem.');logEv('Woreczek z suszem w widocznym miejscu');}});
 if(H.bagLook)it.push({t:'Przeszukaj plecak (dowód w zasięgu wzroku)',f:()=>{H.drugs=true;say(u.name,'Kilka woreczków z suszem, blister tabletek bez opakowania, waga kieszonkowa i zwitek gotówki. To nie jest na własny użytek.');logEv('Zabezpieczono: susz, tabletki, waga, gotówka');
  setTimeout(()=>{if(G.ended)return;say('TYLER','To nie moje! Ktoś to podrzucił!');const j=H.jake;if(j.alive&&j.state==='idle'){if(H.esc>=2){say('JAKE','Tyler, ty debilu! Spierdalam!');jakeRun(j);}else say('JAKE','O kurwa, Tyler...');}if(H.miaTip)say('MIA','Tyler, przestań kłamać...');},1600);}});
 else it.push({t:'Przeszukaj plecak',f:()=>{H.searchNoCause=true;H.bagLook=true;H.drugs=true;say(u.name,'Woreczki z suszem, tabletki, waga, gotówka.');logEv('Przeszukanie plecaka bez wcześniejszych oględzin');setTimeout(()=>{if(!G.ended)say('TYLER','Hej! Nie macie prawa! To nie moje!');},1400);}});
 choiceMenu('Plecak — czarny, sportowy',it);}
function samMenu(u){const H=G.h,s=H.sam,it=[];
 if(!H.said.samChk){H.said.samChk=1;say(u.name,H.samSt==='sick'?'Hej, Sam. Spójrz na mnie. Ile wypiłeś?':'Sam? Sam! Oddycha... płytko. Nie reaguje na głos. Wymiotował.');if(H.samSt==='sick')say('SAM','...pół... butelki... chyba...');}
 if(H.samSt==='down'&&!H.samSideDone)it.push({t:'Ułóż go w pozycji bocznej ustalonej',f:()=>{H.samSideDone=true;H.samSt='side';say(u.name,'Kładę go na boku, żeby się nie zachłysnął. Drogi oddechowe drożne.');logEv('Sam ułożony w pozycji bocznej');}});
 if(!H.ems)it.push({t:'Wezwij karetkę (radio)',f:()=>{H.ems=true;radio(u.name,'Dispatch, potrzebna karetka do Riverside Park, przy fontannie. Nieletni, szesnaście lat, zatrucie alkoholowe, nieprzytomny.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Medic 7 w drodze, około minuty.');},2500);setTimeout(emsArrivePark,45000);logEv('Wezwano karetkę do Sama');}});
 if(!it.length)it.push({t:'(Czekaj na karetkę)',dis:true,f:NOOP});
 choiceMenu('Sam Okafor (16)',it);}
function emsArrivePark(){const H=G.h;if(G.ended||!H.sam.alive)return;const pal={body:'#24345a',legs:'#1a2238',hair:'#2a1a12',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',acc:'#e8e030',eyes:1};
 radio('MEDIC 7','Medic 7 na miejscu, idziemy od parkingu.',{radio:1});H.emsU=[];for(let k=0;k<2;k++){const m=mkNPC({tx:38+k,ty:52,kind:'ems',pal:{...pal},state:'go',name:'RATOWNIK',upd:emsParkUpd});m.k=k;H.emsU.push(m);}}
function emsParkUpd(c,dt){const H=G.h,s=H.sam;if(c.state==='go'){if(npcGo(c,dt,(s.x/TS|0)+(c.k?1:-1),s.y/TS|0,44)){c.state='work';c.wT=0;c.pose='kneel';}return;}
 moveUnit(c,dt,0,0,0);if(c.state==='work'){turnTo(c,Math.atan2(s.y-c.y,s.x-c.x),dt,4);c.wT+=dt;if(c.wT>9&&c.k===0&&s.alive){H.samSt='ems';say('RATOWNIK','Saturacja niska, ale oddycha. Zabieramy go. Dobrze, że ktoś go położył na boku.');s.alive=false;G.units.splice(G.units.indexOf(s),1);G.civs.splice(G.civs.indexOf(s),1);for(const m of H.emsU){m.state='leave';m.pose='stand';}logEv('Sam zabrany przez karetkę');}return;}
 if(c.state==='leave'&&npcGo(c,dt,PK.lot[0],PK.lot[1],40)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}}
function momArrive(){const H=G.h;if(G.ended||H.mom)return;const m=mkNPC({tx:PK.lot[0],ty:PK.lot[1]-2,kind:'parent',pal:{body:'#5a6a7a',legs:'#2a2a3a',hair:'#3a2418',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1},state:'go',name:'PANI CASTILLO',upd:momUpd});H.mom=m;logEv('Przyjeżdża matka Mii');}
function momUpd(c,dt){const H=G.h,m=H.mia;if(c.state==='go'){const tg=m.alive?m:c;if(npcGo(c,dt,(tg.x/TS|0),(tg.y/TS|0)+1,46)||dist(c.x,c.y,tg.x,tg.y)<TS*1.4){c.state='talk';c.wT=0;say('PANI CASTILLO','Mia! Boże, dziecko... Wszystko w porządku? Dziękuję, panie władzo.');if(m.alive){m.pose='stand';}}return;}
 moveUnit(c,dt,0,0,0);if(c.state==='talk'){c.wT+=dt;if(c.wT>4){c.state='leave';if(m.alive&&m.state!=='cuffed'){m.state='follow';m.lead=c;H.miaHome=true;}const j=H.jake;if(j.alive&&j.state==='cited'){say('PANI CASTILLO','Jake, ty też. Odwiozę cię, twoja matka już wie.');j.state='follow';j.lead=c;H.jakeHome=true;}const s=H.sam;if(s.alive&&!H.samSt&&s.state==='calm'){s.state='follow';s.lead=c;}logEv('Mia odebrana przez matkę');}return;}
 if(c.state==='leave'&&npcGo(c,dt,PK.lot[0],PK.lot[1],34)){c.alive=false;c.state='gone';G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}}
function parkInCar(c){const H=G.h;H.inCar[c.name]=true;c.escort=null;c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);SND.door&&SND.door(PK.car.x,PK.car.y,true);logEv(c.name+' w radiowozie');say(G.p1.name,pick(['Uważaj na głowę.','Siadaj. Nogi do środka.']));}
function carMenuPark(u){const H=G.h,it=[];
 it.push({t:'Sprawdź Tylera w bazie (radio)',dis:!H.ids.tyler||H.said.tyDb,f:()=>{H.said.tyDb=1;radio(u.name,'Dispatch, sprawdźcie: Brandt, Tyler, osiemnaście lat.',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Brandt Tyler: notowany raz, posiadanie marihuany, pół roku temu. Brak nakazów.');},3500);}});
 it.push({t:'Zakończ interwencję i sporządź raport',f:()=>{const left=[H.tyler,H.jake].filter(c=>c.alive&&c.state==='cuffed'&&!H.inCar[c.name]);if(left.length){toast('Najpierw posadź zatrzymanych w radiowozie');return;}radio(u.name,'Dispatch, 4-Charlie-12, kończymy w Riverside Park. Raport w drodze.',{radio:1});H.endT=2.5;}});
 choiceMenu('Radiowóz 4-Charlie-12',it);}
function updatePark(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;const L=G.p1;
 if(!H.seen&&L&&dist(L.x,L.y,PK.bench.x,PK.bench.y)<TS*9){H.seen=true;H.seenT=H.t;say('JAKE','O kurwa, psy. Nagrywam was, uwaga, będziecie sławni!');logEv('Jake zaczyna nagrywać');}
 // muzyka z głośnika
 if(H.music&&A.ctx){H.musT-=dt;if(H.musT<=0){H.musT=.46;H.beat=(H.beat||0)+1;const o=out(43*TS+8,30*TS+8,.55,{rev:.2}),t0=A.ctx.currentTime;if(o){tone(o,t0,.13,{f:130,f2:42,g:.9});if(H.beat%2)nz(o,t0+.23,.03,{type:'highpass',f:6000,g:.25});if(H.beat%4===0)tone(o,t0,.4,{f:55,g:.35,type:'sawtooth'});}}}
 for(const c of[H.tyler,H.mia,H.jake,H.sam])if(!c.alive&&c.killedBy&&c.killedBy.human&&!H.inCar[c.name]&&!H.gone[c.name]&&c.kind==='teen'){endMission(false,'Zastrzeliłeś nieuzbrojonego nastolatka.');return;}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,parkVerdict());}}
function parkVerdict(){const H=G.h;return H.drugs&&H.inCar.TYLER?'Interwencja zakończona. Tyler Brandt zatrzymany, narkotyki zabezpieczone.':H.drugs?'Interwencja zakończona. Narkotyki zabezpieczone.':'Interwencja zakończona. Grupa rozesłana do domów.';}
function parkRender(c,cx,cy){const H=G.h;if(!H)return;const j=H.jake;
 if(H.film&&j.alive&&j.state==='idle'&&H.seen){const x=j.x+Math.cos(j.ang)*5-cx,y=j.y-12+Math.sin(j.ang)*2-cy;P(c,x-1|0,y-1|0,3,4,'#111');if(((G.time*2)|0)%2)P(c,x|0,y-1|0,1,1,'#ff3020');c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,14);g.addColorStop(0,'rgba(220,235,255,.35)');g.addColorStop(1,'rgba(220,235,255,0)');c.fillStyle=g;c.fillRect(x-14,y-14,28,28);c.globalCompositeOperation='source-over';}
 if(H.music){const x=43*TS+8-cx,y=30*TS+6-cy,k=((G.time*2.2)|0)%2;P(c,x+4|0,y-2|0,1,1,k?'#3a8aff':'#1a4a9a');}}
function parkOver(c,cx,cy){if(typeof drawLeaves==='function')drawLeaves(cx,cy);}
function parkObj(){const H=G.h;if(!H)return'';const j=H.jake;
 return objRows('',[[H.intro,'Sprawdź zgłoszenie'],H.intro?[H.ids.mia&&H.ids.tyler&&(H.ids.jake||!j.alive||j.state==='cuffed'),'Ustal tożsamość grupy']:null,H.bagLook?[H.drugs,'Zabezpiecz zawartość plecaka']:null,H.drugs?[!!H.inCar.TYLER,'Doprowadź Tylera do radiowozu']:null,H.samSt?[H.samSt==='ems','Zapewnij pomoc Samowi']:null,H.intro?[!!H.endT,'Zakończ interwencję przy radiowozie']:null],(H.esc>=2&&j.alive&&j.state==='idle'?'<div class="opt">Jake jest coraz bardziej agresywny</div>':''));}
function parkDebrief(){const H=G.h||{},j=H.jake||{};let sc=0;const rows=[];
 rows.push(['Narkotyki',H.drugs?(H.searchNoCause?'zabezpieczone (przeszukanie bez oględzin)':'zabezpieczone'):'nie znalezione',H.drugs?'good':'bad']);sc+=H.drugs?(H.searchNoCause?15:25):-10;
 const ty=H.inCar&&H.inCar.TYLER?'zatrzymany, w radiowozie':H.tyler&&H.tyler.state==='cuffed'?'skuty':'puszczony';rows.push(['Tyler Brandt (18)',ty]);sc+=H.inCar&&H.inCar.TYLER?20:0;
 const js=H.jakeGone?'zbiegł':H.inCar&&H.inCar.JAKE?(H.assault?'zatrzymany — napaść na funkcjonariusza':'zatrzymany'):H.jakeHome?'wezwanie, odebrany przez rodzica':H.jakeCited?'wezwanie za alkohol':j.state==='cuffed'?'skuty':'bez działań';
 rows.push(['Jake Halloran (17)',js,H.jakeGone?'bad':'']);sc+=H.jakeGone?-15:(H.jakeCited||H.inCar&&H.inCar.JAKE)?10:0;
 const ss=H.samSt==='ems'?'karetka'+(H.samSideDone?' + pozycja boczna':''):H.samSt==='side'?'pozycja boczna, bez karetki':H.samSt?'bez pomocy':'bez objawów';rows.push(['Sam Okafor (16)',ss,H.samSt==='ems'?'good':H.samSt&&H.samSt!=='side'?'bad':'']);sc+=H.samSt==='ems'?15:H.samSt==='side'?0:H.samSt?-25:0;
 rows.push(['Mia Castillo (16)',H.miaHome?'odebrana przez matkę':H.parents?'rodzice powiadomieni':'—']);sc+=H.miaHome?10:H.parents?5:0;
 rows.push(['Prawo do nagrywania',H.filmOk===true?'uszanowane':H.filmOk===false?'kazano schować telefon':'—',H.filmOk===false?'bad':'']);sc+=H.filmOk===true?5:H.filmOk===false?-10:0;
 rows.push(['Eskalacja słowna',H.rude?H.rude+'×':'brak',H.rude?'bad':'good']);sc-=(H.rude||0)*5;
 patrolDebrief(rows,sc);}
LVL.park={id:'park',patrol:true,weather:'night',autumn:true,crew:{names:['OFC. BRENNAN','OFC. SALAZAR'],uni:{body:'#1e2a3a',legs:'#161c26',acc:'#d8d8d8'}},car:{s:'#1e3c8a'},ext:'brick',
 terrain:parkTerrain,windows:parkWindows,decor:parkDecor,rooms:ROOMS_PARK,doors:DOORS_PARK,furn:FURN_PARK,lamps:LAMPS_PARK,cams:[],entries:ENTRIES_PARK,
 start:startPark,update:updatePark,interact:parkInteract,render:parkRender,over:parkOver,stress:NOOP,obj:parkObj,debrief:parkDebrief,
 wallCol:()=>['#7a7468','#5a5448'],win:'4-Charlie-12, przyjęłam. Dobra robota.',planTitle:'RIVERSIDE PARK · LINDEN STREET',
 nb:{no:'#26-314-2347',pri:'P3',code:'10-91 / MIP',small:'MIEJSCE',addr:'RIVERSIDE PARK<br>LINDEN ST',facts:[['JEDNOSTKA','4-Charlie-12 · Ofc. Brennan, Ofc. Salazar'],['GODZINA','23:47 · zimna, wietrzna noc'],['ZGŁOSZENIE','zakłócanie spokoju w parku']],
  title:'911 · ZAPIS ROZMOWY',clock:[23,44,8],who:{D:'DYSPOZYTOR',C:'SĄSIADKA'},bg:[24,14,56,38],
  call:[['D','Portland, numer alarmowy. Co się stało?'],['C','Dzwonię z Linden Street, przy parku. Znowu ta młodzież przy fontannie. Muzyka na cały regulator, krzyczą, słychać tłuczone butelki.'],['D','Ile osób?'],['C','Czworo, może pięcioro. To dzieciaki. Jeden ciągle się wydziera i rzuca puszkami.'],['D','Czy ktoś jest ranny albo czy widziała pani broń?'],['C','Broni nie... ale jeden chyba wymiotował w krzakach. Jest prawie północ, park jest zamknięty od dziesiątej.'],['D','Wysyłam patrol. Proszę nie wychodzić do nich.']]}};
