
// ================= MISSION 06: MILLBROOK HIGH SCHOOL — ACTIVE SHOOTER =================
// Parter: x8..71, y22..36 (fasada od południa). Piętro: osobny region x8..71, y1..16, łączony klatkami schodowymi.
const SC={gf:{x0:8,y0:22,x1:71,y1:36},uf:{x0:8,y0:1,x1:71,y1:16},
 stairs:[{gx:10.5,gy:33.5,ux:10.5,uy:4,n:'zachodnia'},{gx:68,gy:25,ux:68,uy:13,n:'wschodnia'}],
 stations:[[13,15],[26,15],[40,15],[53,15],[62,15]],gfWin:[10,12,15,17,21,23,25,27,29,31,48,50,53,55,58,60,62,64,66,68,70],
 strobes:[[16,29],[30,30],[44,29],[58,30],[20,8],[38,9],[56,8],[40,33]]};
const ROOMS_SCHOOL=[
 // parter
 R_('Korytarz parteru',9,29,70,30,'lino'),R_('Hol główny',34,32,45,35,'tileW'),
 R_('Sala 101',9,23,16,27,'lino'),R_('Sala 102',18,23,25,27,'lino'),R_('Sala 103',27,23,34,27,'lino'),R_('Pracownia plastyczna',36,23,45,27,'lino'),R_('Sala 104',47,23,54,27,'lino'),R_('Sala 105',56,23,64,27,'lino'),R_('Klatka wschodnia',66,23,70,27,'conc'),
 R_('Klatka zachodnia',9,32,12,35,'conc'),R_('Gabinet pielęgniarki',14,32,18,35,'lino'),R_('Sekretariat',20,32,32,35,'carpet'),R_('Toaleta chłopców',47,32,50,35,'tileW'),R_('Toaleta dziewcząt',52,32,55,35,'tileW'),R_('Stołówka',57,32,70,35,'tileW'),
 // piętro
 R_('Korytarz piętra',9,8,70,9,'lino'),
 R_('Klatka zachodnia (piętro)',9,2,12,6,'conc'),R_('Sala 201',14,2,21,6,'lino'),R_('Sala 202',23,2,30,6,'lino'),R_('Sala 203',32,2,39,6,'lino'),R_('Sala 204',41,2,48,6,'lino'),R_('Sala 205',50,2,57,6,'lino'),R_('Sala 206',59,2,70,6,'lino'),
 R_('Sala 207',9,11,17,15,'lino'),R_('Biblioteka',19,11,34,15,'carpet'),R_('Sala 208',36,11,45,15,'lino'),R_('Pracownia chemiczna',47,11,58,15,'tileW'),R_('Sala 209',60,11,64,15,'lino'),R_('Klatka wschodnia (piętro)',66,11,70,15,'conc')];
const DOORS_SCHOOL=[
 [39,36,0,1],[40,36,0,1],[8,29],[71,29],
 [13,28],[22,28],[30,28],[40,28],[50,28],[60,28,1],[68,28],
 [11,31],[16,31],[24,31],[30,31],[48,31],[53,31],[60,31],[66,31],
 [11,7],[17,7],[26,7],[35,7,1],[44,7],[53,7],[64,7],
 [13,10],[23,10],[30,10,1],[40,10],[52,10],[62,10],[68,10]];
const FURN_SCHOOL=[];
{const F_=(...a)=>FURN_SCHOOL.push(a),r=rng(606);
 const classroom=(x0,y0,x1,y1,rows,messy)=>{for(const yy of rows)for(let x=x0+1;x<=x1-1;x+=2){if(messy&&r()<.25){F_('chairX',x,yy);continue;}F_('sdesk',x,yy);}F_('desk',x0,y0);if(r()<.6)F_('bkpk',x0+2+(r()*(x1-x0-3)|0),rows[0]+1);F_('trash',x1,y0);};
 // parter: sale
 classroom(9,23,16,27,[24,26]);classroom(18,23,25,27,[24,26],1);classroom(27,23,34,27,[24,26]);classroom(47,23,54,27,[24,26],1);classroom(56,23,64,27,[24,26]);
 F_('tableL',37,24);F_('tableL',41,24);F_('easel',44,23);F_('easel',36,26);F_('shelf',45,26);F_('paint',38,26);
 F_('stairs',67,23);F_('stairs',68,23);F_('stairs',69,23);F_('stairs',9,33);F_('stairs',10,33);F_('stairs',11,33);
 // gabinet, sekretariat, hol
 F_('bed',14,32);F_('medshelf',18,32);F_('chair',17,34);
 F_('reception',21,33);F_('deskPC',27,32);F_('deskPC',30,32);F_('cab',32,32);F_('cab',20,35);F_('copier',25,35);F_('plant',32,35);F_('chairX',28,34);F_('papers',26,34);
 F_('trophy',34,32);F_('trophy',36,32);F_('benchL',42,32);F_('plant',45,32);F_('plant',34,35);F_('bkpk',38,34);F_('papers',41,33);F_('glass',39,35);F_('glass',40,35);
 F_('toilet',47,32);F_('toilet',49,32);F_('sink',50,35);F_('toilet',52,32);F_('toilet',54,32);F_('sink',55,35);
 for(const x of[58,62,66])F_('tableL',x,33);F_('vending',70,32);F_('vending',70,33);F_('trash',57,35);F_('chairX',61,35);F_('bkpk',64,34);F_('tray',59,34);F_('tray',67,32);
 // korytarz parteru: ślady ucieczki
 for(const[x,y]of[[15,30],[24,29],[35,30],[46,29],[52,30],[63,29]])F_('bkpk',x,y);for(const[x,y]of[[20,30],[33,29],[44,30],[57,29]])F_('papers',x,y);
 for(const[x,y]of[[18,29],[27,30],[48,29]])F_('stain',x,y);for(const[x,y]of[[25,29],[26,29],[45,30],[46,30],[55,29]])F_('shell',x,y);F_('drag',36,30);
 // piętro
 F_('stairs',9,3);F_('stairs',10,3);F_('stairs',11,3);F_('stairs',67,12);F_('stairs',68,12);F_('stairs',69,12);
 classroom(14,2,21,6,[3,5]);classroom(23,2,30,6,[3,5],1);classroom(32,2,39,6,[3,5]);classroom(41,2,48,6,[3,5],1);classroom(50,2,57,6,[3,5]);classroom(59,2,70,6,[3,5]);
 classroom(9,11,17,15,[12,14],1);classroom(36,11,45,15,[12,14],1);classroom(60,11,64,15,[12,14],1);
 for(const x of[20,23,26,29,32])F_('bshelf',x,11);for(const x of[21,27])F_('tableL',x,13);F_('deskPC',33,13);F_('chairX',25,14);F_('papers',30,14);
 for(const x of[48,52,56])F_('labt',x,12);F_('labt',48,14);F_('labt',52,14);F_('cab',58,11);F_('glass',55,15);
 for(const[x,y]of[[22,8],[31,9],[47,8],[59,9]])F_('bkpk',x,y);for(const[x,y]of[[28,9],[42,8],[60,8]])F_('stain',x,y);
 for(const[x,y]of[[12,15],[14,15],[25,14],[27,14],[39,15],[41,15],[52,14],[54,15],[61,14]])F_('shell',x,y);for(const[x,y]of[[10,15],[24,15],[42,15],[50,15]])F_('glass',x,y);
 // zewnątrz: trawnik, maszt, tablica, stojaki
 F_('ssign',27,40);F_('flagp',45,39);F_('brack',50,38);F_('brack',53,38);F_('bench',30,38);F_('bench',47,41);
 for(const[x,y]of[[12,39],[20,41],[60,40],[67,39],[5,42],[74,41],[3,26],[76,30],[2,34],[77,36]])F_('tree',x,y);for(const[x,y]of[[33,37],[36,37],[43,37],[46,37],[14,37],[64,37]])F_('bush',x,y);
 for(const[x,y]of[[24,42],[57,42],[8,42]])F_('trash',x,y);F_('hydrant',35,43);F_('hydrant',62,43);
 for(const x of[6,22,58,74])F_('lamp',x,43);for(const x of[14,46,66])F_('lamp',x,52);
 for(const[x,y]of[[34,40],[52,41],[42,42],[22,39]])F_('bkpk',x,y);F_('phoneL',38,41);F_('phoneL',57,39);
 // ulica: radiowozy, karetka, autobusy
 F_('police',30,45);F_('police',44,46);F_('police',52,45);F_('police',15,47);F_('ambul',3,47);F_('sbus',62,45);F_('sbus',68,48);
 for(const x of[24,26,58])F_('cone',x,44);F_('cone',36,51);F_('cone',50,51);
 // druga strona: taśma, wóz TV, parking
 for(let x=2;x<78;x++)if(x!==40&&x!==41)F_('ptape',x,52);F_('tvvan',8,54);F_('car',22,55);F_('car',30,54);F_('car',56,55);F_('car',64,54);F_('van',70,54);}
const LAMPS_SCHOOL=[];for(const x of[14,26,38,50,62])LAMPS_SCHOOL.push([x,29,1,'#eaf2ff',44],[x,8,1,'#eaf2ff',44]);LAMPS_SCHOOL.push([40,34,1,'#eaf2ff',60],[63,34,1,'#eaf2ff',60],[26,33,1,'#fff4d8',50]);
const ENTRIES_SCHOOL=[{n:'Za radiowozem',s:'Ulica przed szkołą.',x:40,y:49,a:-Math.PI/2,px:40,py:49,drawn:1}];
function schoolTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.GRASS,'grass');fillR(0,45,79,50,T.ASPH,'asph');fillR(0,43,79,44,T.ASPH,'conc');fillR(0,51,79,52,T.ASPH,'conc');fillR(0,53,79,57,T.ASPH,'asph');fillR(38,37,41,42,T.ASPH,'conc');fillR(4,28,7,31,T.ASPH,'conc');fillR(72,28,75,31,T.ASPH,'conc');
 const G1=SC.gf,G2=SC.uf;fillR(G1.x0+1,G1.y0+1,G1.x1-1,G1.y1-1,T.FLOOR,'lino');fillR(G2.x0+1,G2.y0+1,G2.x1-1,G2.y1-1,T.FLOOR,'lino');
 // parter
 H(22,8,71);H(36,8,71);V(8,22,36);V(71,22,36);H(28,9,70);H(31,9,33);H(31,46,70);for(const x of[17,26,35,46,55,65])V(x,23,27);for(const x of[13,19,33,46,51,56])V(x,32,35);
 // piętro
 H(1,8,71);H(16,8,71);V(8,1,16);V(71,1,16);H(7,9,70);H(10,9,70);for(const x of[13,22,31,40,49,58])V(x,2,6);for(const x of[18,35,46,59,65])V(x,11,15);
 // mur odcinający dziedziniec
 H(21,0,8);H(21,71,79);fillR(0,17,79,20,T.GRASS,'grass');}
function schoolWindows(M,set){for(const x of SC.gfWin)set(x,36,T.WIN);for(const x of[35,36,37,42,43,44])set(x,36,T.WIN);set(33,33,T.WIN);set(33,34,T.WIN);
 for(const x of[10,12,14,16,20,22,24,26,28,30,32,37,39,41,43,48,50,52,54,56,61,63,67,69])set(x,16,T.WIN);for(const x of[11,16,20,25,29,34,38,43,47,52,56,62,68])set(x,1,T.WIN);}
// ---------- rekwizyty ----------
F('sdesk',1,1,1,0,(g,x,y,w,h,s)=>{P(g,x+2,y+12,12,3,SH);P(g,x+2,y+3,12,7,'#b89a6a');P(g,x+2,y+3,12,1,'#d0b488');P(g,x+3,y+10,1,4,'#5a5e62');P(g,x+12,y+10,1,4,'#5a5e62');P(g,x+4,y+11,8,4,'#3a5a8a');P(g,x+4,y+11,8,1,'#4a6a9a');if(s%3===0){P(g,x+5,y+5,4,3,'#e8e8e0');P(g,x+10,y+4,1,4,'#e8c040');}});
F('bkpk',1,1,0,0,(g,x,y,w,h,s)=>{const c=['#2a4a8a','#8a2a3a','#2a6a4a','#5a2a6a','#c86a1a','#2a2a2a'][s%6];P(g,x+4,y+11,9,2,SH);P(g,x+4,y+5,8,7,c);P(g,x+5,y+4,6,2,shade(c,-20));P(g,x+5,y+8,6,3,shade(c,15));P(g,x+7,y+5,2,1,'#c8c8c8');});
F('shell',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<2;i++){const a=(r()*12|0)+2,b=(r()*10|0)+3;P(g,x+a,y+b,2,1,'#c82a1a');P(g,x+a+2,y+b,1,1,'#c8a040');}});
F('tray',1,1,0,0,(g,x,y)=>{P(g,x+3,y+5,10,7,'#a8a49a');P(g,x+4,y+6,3,3,'#c86a3a');P(g,x+8,y+6,4,2,'#e8d8a8');P(g,x+8,y+9,3,2,'#6a8a3a');});
F('easel',1,1,1,0,(g,x,y)=>{P(g,x+4,y+12,9,3,SH);P(g,x+4,y-6,1,19,'#8a6a3a');P(g,x+11,y-6,1,19,'#8a6a3a');P(g,x+3,y-8,11,9,'#f0ece0');P(g,x+5,y-6,4,3,'#3a7ac8');P(g,x+8,y-4,4,3,'#e8a040');});
F('copier',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,14,2,SH);P(g,x+1,y+1,14,12,'#c8c8c0');P(g,x+1,y+1,14,2,'#e0e0d8');P(g,x+3,y+4,10,3,'#5a5e62');P(g,x+11,y+9,2,1,'#3ac85a');});
F('trophy',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,2,SH);P(g,x+1,y-8,30,21,'#5a3e28');P(g,x+2,y-7,28,18,'rgba(160,190,210,.35)');for(const[i,c]of[[4,'#e0b840'],[10,'#c8c8c8'],[16,'#e0b840'],[22,'#b07040']]){P(g,x+i,y-4,4,4,c);P(g,x+i+1,y,2,3,c);P(g,x+i,y+3,4,1,'#3a2818');}P(g,x+2,y+5,28,1,'#3a2818');P(g,x+6,y+7,6,3,'#e0b840');});
F('bshelf',1,1,1,1,(g,x,y,w,h,s)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#5a3e28');for(let j=0;j<4;j++){P(g,x+2,y-9+j*6,12,5,'#2a1e14');const r=rng(s*7+j);for(let i=0;i<6;i++)P(g,x+2+i*2,y-8+j*6,2,4,['#8a2a2a','#2a4a6a','#4a6a3a','#c8a040','#6a4a7a','#3a3a3a'][(r()*6)|0]);}});
F('labt',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,3,SH);P(g,x,y+2,32,10,'#2a2c30');P(g,x,y+2,32,1,'#4a4c50');P(g,x+13,y+4,6,5,'#8a8e92');P(g,x+15,y+5,2,3,'#3a3e42');P(g,x+4,y+4,3,4,'rgba(140,220,200,.7)');P(g,x+24,y+5,4,3,'rgba(220,180,90,.7)');});
F('ssign',3,1,1,0,(g,x,y)=>{P(g,x+1,y+13,46,3,SH);P(g,x,y-2,48,15,'#6a3a2a');P(g,x,y-2,48,2,'#8a5a48');P(g,x+3,y+1,42,8,'#1a2a4a');P(g,x+3,y+1,42,1,'#2a3a5a');const L=[4,1,4,1,3,1,1,4,1,3,4];let px=x+5;for(const w of L){P(g,px,y+3,w,4,'#e8d8a8');px+=w+1;}P(g,x+30,y+3,10,4,'#e0b840');P(g,x+8,y+11,32,1,'#4a2a1e');});
F('flagp',1,1,1,0,(g,x,y)=>{P(g,x+5,y+12,8,3,SH);P(g,x+7,y-44,2,57,'#c8ccd0');P(g,x+6,y-46,4,2,'#e0b840');P(g,x+4,y+10,8,3,'#8a8e92');});
F('brack',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,2,SH);for(let i=0;i<5;i++){P(g,x+2+i*6,y+4,4,8,'#8a8e92');}P(g,x+1,y+11,30,1,'#6a6e72');for(const i of[0,2,3])P(g,x+1+i*6,y+2,6,8,['#c8302a','#2a6ac8','#3a3a3a','#2a8a4a'][i]);});
F('phoneL',1,1,0,0,(g,x,y)=>{P(g,x+6,y+7,4,6,'#111');P(g,x+7,y+8,2,4,'#3a5a8a');});
F('cone',1,1,0,0,(g,x,y)=>{P(g,x+4,y+12,8,2,SH);P(g,x+5,y+11,6,2,'#1a1a1a');P(g,x+6,y+4,4,8,'#e8601a');P(g,x+6,y+7,4,2,'#f0f0f0');P(g,x+7,y+3,2,1,'#e8601a');});
F('ptape',1,1,0,0,(g,x,y,w,h,s)=>{const sag=Math.sin(s*1.7)*1;P(g,x,y+7+sag,16,2,'#e8c020');for(let i=0;i<16;i+=5)P(g,x+i,y+7+sag,2,2,'#1a1a1a');if(s%4===0){P(g,x+7,y,2,12,'#3a3a3a');P(g,x+6,y+11,4,2,'#2a2a2a');}});
F('sbus',5,2,1,0,(g,x,y)=>{P(g,x+2,y+27,78,4,SH);P(g,x,y+4,80,24,'#e8b018');P(g,x,y+4,80,2,'#f8c838');P(g,x,y+26,80,2,'#b88a10');P(g,x+2,y+8,76,3,'#1a1a1a');for(let i=0;i<9;i++)P(g,x+6+i*8,y+12,6,6,'#1a2a3a');P(g,x+74,y+6,6,20,'#1a1a1a');P(g,x+76,y+8,3,16,'#2a3a4a');P(g,x+2,y+20,76,1,'#1a1a1a');P(g,x+10,y+21,40,3,'#1a1a1a');for(const wx of[12,62])P(g,x+wx,y+26,8,4,'#0a0a0a');P(g,x+78,y+5,2,2,'#f8f0c0');P(g,x+78,y+25,2,2,'#f8f0c0');P(g,x,y+6,2,2,'#c8201a');});
F('tvvan',4,2,1,0,(g,x,y)=>{P(g,x+2,y+27,62,4,SH);P(g,x,y+4,64,24,'#e8e8e4');P(g,x,y+4,64,2,'#ffffff');P(g,x,y+26,64,2,'#b8b8b4');P(g,x+50,y+6,12,20,'#2a3a4a');P(g,x+6,y+14,36,6,'#1e4aa8');P(g,x+8,y+15,12,4,'#ffffff');P(g,x+22,y+15,2,4,'#e8c040');P(g,x+26,y+15,14,4,'#c8201a');for(const wx of[8,46])P(g,x+wx,y+26,8,4,'#0a0a0a');P(g,x+18,y-16,2,22,'#8a8e92');P(g,x+12,y-22,14,8,'#d8dcdc');P(g,x+14,y-20,10,4,'#a8acac');P(g,x+28,y+6,8,6,'#9a9ea2');});
Object.assign(FH,{sbus:10,tvvan:9,sdesk:3,labt:4,trophy:6,bshelf:10,easel:4,copier:5});
// ---------- poziom ----------
const SCH_PAL=[{body:'#2a2e34',legs:'#1c2438',acc:'#d8b048'},{body:'#30343a',legs:'#1c2438',acc:'#d8b048'},{body:'#2c3036',legs:'#1c2438',acc:'#d8b048'},{body:'#3a3428',legs:'#3a4230',acc:'#d8b048'}];
function spawnSchoolTeam(E){const L=[['lead','SGT. DAVIS','rifle','Fairview PD'],['breach','OFC. PRICE','shotgun','Fairview PD'],['scout','OFC. NGUYEN','shotgun','Fairview PD'],['medic','DEP. HOLT','rifle','Hamilton Co. Sheriff']],offs=[[0,0],[-1,-.9],[-1,.9],[-2,0]];
 L.forEach((d,i)=>{const pal=Object.assign({},i%2?PAL.patrolB:PAL.patrolA,SCH_PAL[i]);const u=new Unit({team:'squad',spec:d[0],name:d[1],role:d[3],weap:d[2],fov:90,range:12,acc:'#d8b048',pal,patrol:true,charges:0,flash:0,sed:0,shoutCd:0,armor:'heavy',spray:0});u.tac=true;
  u.x=E.x*TS+8+offs[i][1]*TS;u.y=E.y*TS-offs[i][0]*TS;u.ang=E.a;u.heading=E.a;u.holster=false;unstick(u);G.squad[i]=u;G.units.push(u);});}
function mkCorpse(tx,ty,pal,a,seed){const b=new Unit({team:'civ',kind:'corpse',pal:Object.assign({head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1},pal),r:4});b.alive=false;b.pose='dead';b.deathT=9;b.fallA=a;b.mseed=seed;b.x=tx*TS+8;b.y=ty*TS+8;b.byEnemy=true;G.units.push(b);return b;}
const STU_PAL=()=>({body:pick(['#3a4a8a','#8a3a4a','#4a7a5a','#6a6a6a','#c8a040','#2a2a2a','#7a4a8a','#d8d8d0']),legs:pick(['#2a3a5a','#3a3a3a','#4a4a5a','#5a4a3a']),hair:pick(['#3a2418','#1e1410','#c8a050','#8a5a30','#e0c070']),skin:pick(['#c8a080','#a07a5a','#e0c0a8','#7a5a40']),head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1});
function startSchool(){G.hostage=null;G.deadline=1e9;
 G.h={t:0,said:{},vic:0,vicStart:0,inside:false,up:false,st:0,stT:8,fireT:3,flash:0,flashX:0,safe:{},endT:null,arrT:null,strobe:0,alarm:true};
 const H=G.h;
 // ofiary wewnątrz
 const V=[[18,30,-1.2],[27,29,.4],[37,33,2.6],[47,30,-2],[56,29,1.1],[29,9,-.6],[42,8,2.2],[24,13,1.4],[38,13,-2.4]];V.forEach(([x,y,a],i)=>mkCorpse(x,y,STU_PAL(),a,30+i));
 mkCorpse(35,40,STU_PAL(),.8,61);mkCorpse(48,42,STU_PAL(),-1.9,62);mkCorpse(19,43,{body:'#5a5a6a',legs:'#2a2a3a',hair:'#8a8a80'},2.2,63);
 H.vicStart=12;H.vic=12;
 // ukryci w salach (zabarykadowane)
 H.hide=[{door:[60,28],room:'Sala 105',n:23,who:'NAUCZYCIELKA'},{door:[35,7],room:'Sala 203',n:19,who:'NAUCZYCIEL'},{door:[30,10],room:'Biblioteka',n:31,who:'BIBLIOTEKARKA'}];
 for(const hd of H.hide){const d=LV.doorAt[I(hd.door[0],hd.door[1])];const rm=d?LV.room[I(hd.door[0],hd.door[1]+(hd.door[1]===10?1:-1))]:-1;const R=ROOMS[rm];if(!R)continue;for(let k=0;k<5;k++){const tx=R.x+1+((k*3)%(R.x2-R.x-1)),ty=R.y+(k%2?1:0);const c=mkNPC({tx,ty,kind:'student',pal:STU_PAL(),state:'calm',pose:'kneel',a:Math.PI/2,name:'UCZEŃ',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);c.pose='kneel';}});c.hide=true;}}
 // uciekający na trawniku
 H.run=[];for(let k=0;k<6;k++){const c=mkNPC({tx:randi(24,58),ty:randi(38,42),kind:'student',pal:STU_PAL(),state:'run',a:Math.PI/2,name:'UCZEŃ',upd:fleeUpd});c.ex=[randi(4,76),57];H.run.push(c);}
 // gapie, media, rodzice
 H.crowd=[];for(let k=0;k<16;k++){const x=randi(3,76),y=randi(53,56);if(x>=6&&x<=13&&y>=54)continue;const c=mkNPC({tx:x,ty:y,kind:'gawk',pal:STU_PAL(),state:'calm',a:-Math.PI/2+rand(-.4,.4),name:'GAPIĄ',upd:crowdUpd});c.phone=Math.random()<.35;c.cry=Math.random()<.2;H.crowd.push(c);}
 H.rep=mkNPC({tx:14,ty:55,kind:'gawk',pal:{body:'#c8303a',legs:'#2a2a3a',hair:'#e0c070',skin:'#e0c0a8',head:'#e0c0a8',face:'#e0c0a8',visor:'#2a1a12',eyes:1},state:'calm',a:Math.PI/2,name:'REPORTERKA'});
 H.cam=mkNPC({tx:14,ty:57,kind:'gawk',pal:{body:'#3a3a3a',legs:'#2a2a2a',hair:'#3a2418'},state:'calm',a:-Math.PI/2,name:'OPERATOR'});
 // policja przy radiowozach
 G.police=[];for(const[x,y,a]of[[31,44,-1.4],[34,44,-1.7],[45,45,-1.5],[53,44,-1.6],[56,44,-1.8],[16,46,-1.2]]){const pu=new Unit({team:'police',weap:'pistol',pal:Object.assign({},PAL.patrolA)});pu.x=x*TS+8;pu.y=y*TS+8;pu.ang=a;pu.pose='kneel';G.police.push(pu);}
 // strzelec
 H.sh=mkEnemy({tx:SC.stations[0][0],ty:SC.stations[0][1],weap:'eShot',a:Math.PI/2,st:'guard',pal:{body:'#2a2a2a',legs:'#3a3a40',hair:'#2a1a12',head:'#c8a080',face:'#c8a080',visor:'#1a1a1a'},name:'Strzelec',fov:120,range:10});H.sh.upd=shooterUpd;
 H.px=new Unit({team:'enemy',weap:'eShot',name:'Strzelec'});H.px.mag=99;
 logEv('Zgłoszenie: aktywny strzelec, Millbrook High School');
 setTimeout(()=>{radio('DISPATCH','Wszystkie jednostki, aktywny strzelec w Millbrook High School. Strzały z piętra w stronę trawnika i parkingu. Liczne ofiary.');radio(G.p1.name,'Davis, mam czterech. Price, Nguyen, Holt. Wchodzimy, nie czekamy na SWAT.',{radio:1});radio('DISPATCH','Przyjęłam. SWAT dojedzie za dwadzieścia pięć minut. Alarm przeciwpożarowy włączony w całym budynku.');},700);}
function fleeUpd(c,dt){if(npcGo(c,dt,c.ex[0],c.ex[1],58)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}}
function crowdUpd(c,dt){moveUnit(c,dt,0,0,0);c.wT=(c.wT||rand(0,6))+dt;turnTo(c,-Math.PI/2+Math.sin(c.wT*.4+c.id)*.4,dt,1.5);}
function inUF(u){return u.y<17*TS;}
function inGF(u){return u.x>8*TS&&u.x<71*TS&&u.y>22*TS&&u.y<36*TS;}
function shooterUpd(e,dt){const H=G.h;if(H.up||e.state==='surr'||e.stun>0)return false;
 const st=SC.stations[H.st],tx=st[0]*TS+8,ty=st[1]*TS+8;H.stT-=dt;
 if(H.stT<=0){H.stT=rand(14,22);let n=H.st;while(n===H.st)n=randi(0,SC.stations.length-1);H.st=n;e.path=null;const nm=['zachodnia część','biblioteka','środek budynku','pracownia chemiczna','wschodnia część'][n];setTimeout(()=>{if(!G.ended&&!H.up)radio('DISPATCH','Świadkowie: strzały z piętra, '+nm+'.');},4000);}
 if(dist(e.x,e.y,tx,ty)>6){if(!e.path||e.goalT!==H.st){e.path=findPath(e.x/TS|0,e.y/TS|0,st[0],st[1],4000);e.goalT=H.st;}if(e.path)for(const nn of e.path.slice(0,3)){const dd=LV.doorAt[I(nn[0],nn[1])];if(dd&&dd.target===0&&!dd.locked&&dist(dd.x*TS+8,dd.y*TS+8,e.x,e.y)<TS*1.6)toggleDoor(dd,e);}if(!e.path||followPath(e,dt,40))e.path=null;else if(e.moving)turnTo(e,Math.atan2(e.vy,e.vx),dt,6);return true;}
 moveUnit(e,dt,0,0,0);turnTo(e,Math.PI/2,dt,5);e.pose='stand';
 H.fireT-=dt;if(H.fireT<=0){H.fireT=rand(2.4,4.5);windowShot(e,st[0]);}
 return true;}
function windowShot(e,wx){const H=G.h,p=H.px;p.x=wx*TS+8;p.y=37.2*TS;p.alive=true;p.mag=99;p.fireCd=0;p.rel=0;
 let best=null,bd=TS*15;for(const u of G.units){if(!u.alive||u===p)continue;if(u.team!=='civ'&&u.team!=='squad')continue;if(u.kind==='corpse'||u.hide)continue;if(u.y<37*TS)continue;const d=dist(u.x,u.y,p.x,p.y);if(d<bd&&losClear(p.x,p.y,u.x,u.y)){bd=d;best=u;}}
 H.flash=.09;H.flashX=wx;
 if(best){p.ang=Math.atan2(best.y-p.y,best.x-p.x)+rand(-.06,.06);fire(p);if(best.team==='civ'&&best.alive&&Math.random()<.45)kill(best,p,p.ang);}else{SND.gun('shotgun',p.x,p.y);makeNoise(p.x,p.y,26,'shot',p);for(let i=0;i<6;i++)G.fx.push({k:'dust',x:p.x+rand(-30,30),y:p.y+rand(20,80),vx:rand(-20,20),vy:rand(-30,0),t:0,life:.35,c:'#5d5a52'});}}
function schoolInteract(u){const H=G.h;if(!H)return null;
 for(const s of SC.stairs){if(!inUF(u)&&nearPt(u,s.gx*TS,s.gy*TS,22))return{k:'house',label:'Wejdź na piętro ('+s.n+' klatka)',dur:.6,f:()=>stairsGo(s,true)};
  if(inUF(u)&&nearPt(u,s.ux*TS,s.uy*TS,22))return{k:'house',label:'Zejdź na parter ('+s.n+' klatka)',dur:.6,f:()=>stairsGo(s,false)};}
 for(const hd of H.hide){if(H.safe[hd.room])continue;const x=hd.door[0]*TS+8,y=hd.door[1]*TS+8;if(nearPt(u,x,y,22))return{k:'house',label:'Zapukaj: „Policja!”',dur:0,f:()=>{H.safe[hd.room]=1;knockAt(x,y);say(u.name,'Policja! Ktoś tam jest?');setTimeout(()=>{if(G.ended)return;say(hd.who,'Jesteśmy tutaj! '+hd.n+' osób, nikt nie jest ranny... On był na górze!');say(u.name,'Zostańcie w środku, drzwi zamknięte. Ktoś po was przyjdzie.');logEv(hd.room+': '+hd.n+' osób ukrytych, bez obrażeń');},1400);}};}
 return null;}
function stairsGo(s,up){const H=G.h,L=G.p1;const tx=(up?s.ux:s.gx)*TS,ty=(up?s.uy:s.gy)*TS;let i=0;
 for(const q of G.squad){if(!q||!q.alive)continue;const o=[[0,0],[1,0],[-1,0],[0,1],[0,-1]][i++%5];q.x=tx+o[0]*12;q.y=ty+o[1]*12;q.path=null;q.task=null;q.post=null;q.vx=q.vy=0;unstick(q);}
 G.trailOwner=null;clearPosts();G.ops=[];G.cam.x=L.x;G.cam.y=L.y;SND.step(L.x,L.y,'conc',.8);
 radio(L.name,up?'Piętro. Idziemy za strzałami.':'Parter.',{radio:1});logEv(up?'Zespół wchodzi na piętro':'Zespół schodzi na parter');
 if(up&&!H.up){H.up=true;const e=H.sh;if(e.alive&&e.state!=='surr'){e.state='search';e.goal={x:tx,y:ty};e.searchT=20;e.arrived=false;e.path=null;e.ico='!';e.icoT=2;}setTimeout(()=>{if(!G.ended)radio('DISPATCH','Strzały ustały. Uwaga, może wiedzieć, że idziecie.');},2500);}}
function updateSchool(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;if(H.flash>0)H.flash-=dt;
 if(!H.inside&&G.squad.some(q=>q&&q.alive&&(inGF(q)||inUF(q)))){H.inside=true;radio(G.p1.name,'Jesteśmy w środku. Parter.',{radio:1});logEv('Zespół wchodzi do budynku');}
 // liczenie ofiar spoza zespołu
 let v=H.vicStart;for(const u of G.units)if(u.team==='civ'&&!u.alive&&u.kind!=='corpse'&&!(u.killedBy&&u.killedBy.team==='squad'))v++;if(v>H.vic){if(H.vic>=H.vicStart&&!G.ended)radio('DISPATCH',pick(['Kolejna osoba trafiona na trawniku!','Mamy następnego rannego przed szkołą!','Strzał z okna, ktoś leży przy wejściu!']));H.vic=v;}
 const e=H.sh;if(H.endT==null&&(!e.alive||e.state==='cuffed')){H.endT=3;H.arrT=H.t;radio(G.p1.name,e.alive?'Strzelec zatrzymany! Powtarzam, strzelec zatrzymany!':'Strzelec zneutralizowany! Potrzebne karetki do środka, wiele ofiar!',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Przyjęłam. Wszystkie zespoły medyczne do budynku.');},2200);}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,e.alive?'Strzelec zatrzymany. Szkoła zabezpieczona.':'Strzelec zneutralizowany. Szkoła zabezpieczona.');}}
function schoolStress(dt,L){const c=A.ctx;if(!c||!L)return;const t=c.currentTime,ins=inGF(L)||inUF(L);
 if(!A.alarmG){A.alarmG=c.createGain();A.alarmG.gain.value=0;A.alarmG.connect(A.master);const o=c.createOscillator();o.type='square';o.frequency.value=880;const lfo=c.createOscillator();lfo.type='square';lfo.frequency.value=1.6;const lg=c.createGain();lg.gain.value=0;lfo.connect(lg.gain);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;o.connect(lg);lg.connect(lp);lp.connect(A.alarmG);o.start();lfo.start();
  A.heliG=c.createGain();A.heliG.gain.value=0;A.heliG.connect(A.master);const s=c.createBufferSource();s.buffer=A.noise;s.loop=true;const hp=c.createBiquadFilter();hp.type='lowpass';hp.frequency.value=260;const am=c.createGain();am.gain.value=.5;const lf2=c.createOscillator();lf2.frequency.value=11;const lg2=c.createGain();lg2.gain.value=.5;lf2.connect(lg2);lg2.connect(am.gain);s.connect(hp);hp.connect(am);am.connect(A.heliG);s.start();lf2.start();}
 A.alarmG.gain.setTargetAtTime(G.ended?0:ins?.05:.018,t,.3);A.heliG.gain.setTargetAtTime(G.ended?0:ins?.02:.09,t,.8);}
function schoolOver(c,cx,cy,dt){if(!SROOFS[0].cv)bakeSchoolRoofs();const ins=(R,u)=>u&&u.alive&&u.x>=R.x0*TS&&u.x<=(R.x1+1)*TS&&u.y>=R.y0*TS&&u.y<=(R.y1+1)*TS;const wa=weatherAlpha();
 for(const R of SROOFS){const tg=(ins(R,G.p1)||ins(R,G.p2))?0:1;R.a+=(tg-R.a)*Math.min(1,dt*6);if(R.a<.02)continue;const x=R.x0*TS-2-cx,y=R.y0*TS-WH-cy-(R.band||0);if(x>VW||y>VH||x+R.cv.width<0||y+R.cv.height<0)continue;
  c.globalAlpha=R.a;c.drawImage(R.cv,Math.round(x),Math.round(y));c.globalAlpha=R.a*(1-wa)*.9;c.fillStyle='#000';c.fillRect(Math.round(x),Math.round(y),R.cv.width,R.cv.height-6);c.globalAlpha=1;
  if(R.gf&&G.h&&G.h.flash>0&&R.a>.3){const fx=G.h.flashX*TS+6-cx,fy=y+R.cv.height-6-R.band+3;c.globalCompositeOperation='lighter';const g=c.createRadialGradient(fx,fy,0,fx,fy,26);g.addColorStop(0,'rgba(255,220,140,.9)');g.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=g;c.fillRect(fx-26,fy-26,52,52);c.globalCompositeOperation='source-over';P(c,fx-2|0,fy-2|0,5,4,'#fff6d8');}}}
const SROOFS=[{x0:8,y0:22,x1:71,y1:36,gf:true,band:16},{x0:8,y0:1,x1:71,y1:16}];
function bakeSchoolRoofs(){for(const R of SROOFS){const W=(R.x1-R.x0+1)*TS+4,B=R.band||0,Hh=(R.y1-R.y0+1)*TS-6+B,cv=document.createElement('canvas');cv.width=W;cv.height=Hh+6;const g=cv.getContext('2d'),r=rng(R.x0*7+R.y0);
  // płaski dach ze żwirem
  P(g,0,0,W,Hh,'#5c5a56');for(let i=0;i<W*Hh/6;i++){P(g,r()*W|0,r()*Hh|0,1,1,r()<.5?'#6a6864':'#4a4844');}
  P(g,0,0,W,3,'#8a8680');P(g,0,0,3,Hh,'#8a8680');P(g,W-3,0,3,Hh,'#7a7670');P(g,0,Hh-B-3,W,3,'#8a8680');
  for(let k=0;k<6;k++){const x=20+k*(W-60)/5|0,y=18+(k%2)*40;P(g,x+3,y+16,24,4,'rgba(0,0,0,.35)');P(g,x,y,24,16,'#9a9ea2');P(g,x,y,24,2,'#b8bcc0');P(g,x+4,y+4,16,8,'#6a6e72');for(let j=0;j<4;j++)P(g,x+5,y+5+j*2,14,1,'#4a4e52');}
  for(let k=0;k<10;k++){const x=r()*(W-10)|0,y=10+r()*(Hh-B-30)|0;P(g,x,y,4,4,'#2a2a2a');P(g,x+1,y,2,1,'#5a5a5a');}
  if(B){// fasada piętra (tylko dla parteru — widok z ulicy)
   const y0=Hh-B;P(g,0,y0,W,B,'#8a4a36');for(let yy=y0+2;yy<Hh;yy+=3)P(g,0,yy,W,1,'#6e3a2a');for(let yy=y0;yy<Hh;yy+=3)for(let xx=((yy/3|0)%2)*4;xx<W;xx+=8)P(g,xx,yy,1,3,'#6e3a2a');
   P(g,0,y0,W,2,'#b8b4a8');P(g,0,Hh-2,W,2,'#5a3226');
   for(const wx of[10,12,14,16,20,22,24,26,28,30,32,37,39,41,43,48,50,52,54,56,61,63,67,69]){const x=(wx-R.x0)*TS+2+2;P(g,x,y0+4,12,9,'#d8d4c8');P(g,x+1,y0+5,10,7,'#1a2632');P(g,x+2,y0+6,3,2,'#3a5a72');P(g,x+6,y0+5,1,7,'#d8d4c8');
    if([12,14,24,26,39,41,52,54,61].includes(wx)){P(g,x+1,y0+5,10,7,'#0e1218');P(g,x+2,y0+6,2,1,'#8aa');P(g,x+8,y0+10,2,1,'#8aa');P(g,x+4,y0+8,1,1,'#8aa');}}
   P(g,(39-R.x0)*TS-10,y0+3,40,6,'#1a2a4a');P(g,(39-R.x0)*TS-8,y0+4,36,1,'#e8d8a8');}
  P(g,0,Hh,W,3,'rgba(0,0,0,.35)');R.cv=cv;R.a=1;}}
function schoolRender(c,cx,cy){const H=G.h;if(!H)return;
 {const fx=45*TS+9-cx,fy=39*TS-44-cy;for(let i=0;i<14;i++){const o=Math.round(Math.sin(G.time*4+i*.6)*1.2);for(let j=0;j<8;j++)P(c,fx+i,fy+j+o,1,1,i<6&&j<4?'#2a3a8a':(j%2?'#e8e8e4':'#c8302a'));}}
 // stroboskopy alarmu
 const on=((G.time*1.6)%1)<.08;if(on&&!G.ended){c.globalCompositeOperation='lighter';for(const[x,y]of SC.strobes){const sx=x*TS+8-cx,sy=y*TS+8-cy;if(sx<-60||sy<-60||sx>VW+60||sy>VH+60)continue;const g=c.createRadialGradient(sx,sy,0,sx,sy,46);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(sx-46,sy-46,92,92);}c.globalCompositeOperation='source-over';}
 for(const g of H.crowd||[]){if(!g.phone||!g.alive)continue;const x=g.x+Math.cos(g.ang)*4-cx,y=g.y-13+Math.sin(g.ang)*2-cy;P(c,x|0,y|0,2,3,'#d8e8ff');}
 const cm=H.cam;if(cm){const x=cm.x-cx,y=cm.y-cy-12;P(c,x-2|0,y-2|0,6,4,'#1a1a1a');c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-10,0,x,y-10,30);g.addColorStop(0,'rgba(255,250,230,.28)');g.addColorStop(1,'rgba(255,250,230,0)');c.fillStyle=g;c.fillRect(x-30,y-40,60,60);c.globalCompositeOperation='source-over';}}
function schoolObj(){const H=G.h;if(!H)return'';const e=H.sh,dn=!e.alive||e.state==='cuffed';const sv=Object.keys(H.safe).length;
 return objRows('',[[H.inside,'Wejdź do budynku'],[dn,'Zneutralizuj strzelca']],'<div class="opt">Ofiary: '+H.vic+(sv?' · sale: '+sv+'/3':'')+'</div>');}
function schoolDebrief(){const H=G.h||{},s=G.stats,e=H.sh;let sc=(G.win?60:0)+Object.keys(H.safe||{}).length*6-Math.max(0,(H.vic||0)-(H.vicStart||0))*6-s.civKilled*30-s.squadLost*12+Math.max(0,30-Math.floor(s.time/20));
 patrolDebrief([['Czas do neutralizacji',H.arrT?fmtT(H.arrT):'—'],['Ofiary po przyjeździe',Math.max(0,(H.vic||0)-(H.vicStart||0)),(H.vic||0)>(H.vicStart||0)?'bad':'good'],['Ofiary łącznie',H.vic||0],['Strzelec',!e?'—':!e.alive?'nie żyje':e.state==='cuffed'?'zatrzymany':'na wolności'],['Sale z ukrytymi',Object.keys(H.safe||{}).length+' / 3']],sc);}
LVL.school={id:'school',patrol:true,nvg:false,lit:.85,weather:'day',ext:'brick',terrain:schoolTerrain,windows:schoolWindows,rooms:ROOMS_SCHOOL,doors:DOORS_SCHOOL,furn:FURN_SCHOOL,lamps:LAMPS_SCHOOL,cams:[],entries:ENTRIES_SCHOOL,
 spawn:spawnSchoolTeam,start:startSchool,update:updateSchool,interact:schoolInteract,render:schoolRender,over:schoolOver,stress:schoolStress,obj:schoolObj,debrief:schoolDebrief,
 crew:{role:'Patrol Officer',shout:'Police! Drop it!'},car:{b:'#dde0e3',hi:'#eef0f2',lo:'#a8acb0',e:'#dde0e3',r:'#d4d7da',rh:'#e6e8ea',rl:'#b0b4b8',s:'#1e3c8a'},
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n.startsWith('Korytarz')?['#8a8e7a','#5e6252']:n==='Hol główny'?['#7a6a52','#54483a']:n.startsWith('Toaleta')?['#8a9698','#6a7678']:n==='Stołówka'?['#9a8a6a','#6a5e48']:n==='Biblioteka'?['#6a5a48','#4a3e30']:n.startsWith('Klatka')?['#6a6c6e','#4a4c4e']:['#8a8468','#5e5a44'];},
 win:'Wszystkie jednostki: strzelec zneutralizowany. Medycy do środka.',planTitle:'MILLBROOK HIGH SCHOOL · PARTER / PIĘTRO',
 nb:{no:'#26-141-1407',pri:'P1',code:'ACTIVE SHOOTER',small:'ADRES',addr:'MILLBROOK<br>HIGH SCHOOL',facts:[['JEDNOSTKI','Fairview PD · Hamilton Co. Sheriff'],['GODZINA','14:07 · słonecznie'],['STATUS','strzały z piętra, liczne ofiary']],
  title:'911 · ZAPIS ROZMOWY',clock:[14,3,12],who:{D:'DYSPOZYTOR',C:'NAUCZYCIELKA'},bg:[6,20,68,38],
  call:[['D','Fairview, numer alarmowy.'],['C','(szeptem) Millbrook High... ktoś strzela. Na korytarzu. Słyszałam co najmniej kilkanaście strzałów.'],['D','Gdzie pani jest?'],['C','Sala sto pięć, parter. Zamknęłam drzwi, mam dwadzieścia troje dzieci. Leżymy na podłodze.'],['D','Widziała pani sprawcę?'],['C','Jeden mężczyzna, czarne ubranie, strzelba. Poszedł na górę... teraz strzela z okien na trawnik.'],['D','Proszę nie otwierać drzwi nikomu, dopóki policja się nie przedstawi. Jednostki są na miejscu.'],['C','Proszę się pospieszyć...']]}};
