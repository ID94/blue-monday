
// ================= LEVEL 01: KLONOWA 14 (osiedle domów jednorodzinnych) =================
const ROOMS_HOUSE=[
 R_('Sypialnia rodziców',33,20,38,23,'carpet'),R_('Łazienka',40,20,42,23,'tileW'),R_('Pokój syna',44,20,49,23,'wood'),
 R_('Korytarz',33,25,49,25,'wood'),
 R_('Salon',33,27,39,33,'wood'),R_('Przedpokój',41,27,43,33,'lino'),R_('Kuchnia',45,27,49,33,'tileW'),
 R_('Garaż',51,25,57,33,'conc'),
 R_('210 Oakridge',7,19,23,32,'wood'),R_('218 Oakridge',66,20,76,32,'wood'),R_('211 Oakridge',9,50,25,56,'wood'),R_('215 Oakridge',51,50,71,56,'wood')];
const DOORS_HOUSE=[[36,24],[41,24],[46,24],[40,30],[42,34,1],[32,25],[50,30],[58,28,1],
 [15,33,1],[12,26],[71,33,1],[70,26],[17,49,1],[61,49,1]];
const FURN_HOUSE=[];
{const F_=(...a)=>FURN_HOUSE.push(a);
 // sypialnia rodziców
 F_('rug',34,22,4,1);F_('bedD',35,20);F_('tableS',34,20);F_('tableS',37,20);F_('cab',38,20);F_('chairX',33,21);F_('bloodbed',35,20);F_('dresser',33,23);F_('laundry',38,23);F_('slippers',33,22);F_('lampFl',38,22);F_('papers',37,23);
 // łazienka
 F_('tub',40,20);F_('toilet',42,20);F_('sink',42,22);F_('towels',41,21);F_('drain',40,22);F_('bottle',40,23);
 // pokój syna
 F_('bed',44,20);F_('deskPC',48,20);F_('gchair',48,21);F_('shelf',49,23);F_('clothes',46,22);F_('clothes',47,23);F_('cans',45,23);F_('pizza',46,20);F_('bottle',45,22);F_('ashtray',47,22);F_('papers',44,23);
 // korytarz
 F_('jacket',38,25);F_('frame',44,25);F_('glass',45,25);F_('books',49,25);
 // salon
 F_('rug',33,28,5,4);F_('tv',34,27);F_('shelf',33,27);F_('sofa',34,30);F_('tableS',35,28);F_('chair',37,30);F_('chair',38,32);F_('deadplant',39,33);F_('stain',36,32);F_('lampFl',38,30);F_('books',33,32);F_('console',36,29);F_('glass',38,28);
 // przedpokój
 F_('rug',41,32,3,2);F_('cabK',43,27);F_('casing',41,29);F_('jacket',41,27);F_('shoes',41,33);F_('umbrella',43,33);F_('mail',42,31);
 // kuchnia
 F_('stove',45,27);F_('counter',46,27);F_('sink',47,27);F_('counterP',48,27);F_('fridge',49,27);F_('tableDin',46,30);F_('chair',45,30);F_('chairX',48,30);F_('bucket',49,32);F_('trash',45,33);F_('stain',48,32);F_('gloves',47,28);F_('glass',46,33);
 // garaż
 F_('workbench',51,25);F_('freezer',55,25);F_('rack',57,25);F_('rack',57,26);F_('car',53,30);F_('bins',51,33);F_('crate',57,33);F_('bike',55,33);F_('paint',52,33);F_('mower',51,28);F_('oil',54,29);F_('tarp',53,26);F_('drag',54,27);F_('pipes',57,29);
 // ogród
 for(let x=28;x<=62;x++)if(x!==45&&x!==46)F_('fence',x,8);
 for(let y=9;y<=22;y++){F_('fenceV',28,y);F_('fenceV',62,y);}
 F_('tableS',40,11);F_('chair',39,11);F_('chair',41,12);F_('grill',35,12);F_('tree',32,10);F_('tree',50,10);F_('tree',57,13);F_('bush',30,14);F_('bush',48,14);F_('bush',37,14);
 // sąsiedzi — wnętrza widoczne przez okna
 F_('sofa',9,29);F_('tv',9,27);F_('table',18,21);F_('bed',20,27);F_('bed',73,21);F_('sofa',68,29);F_('table',72,28);F_('shelf',66,23);F_('table',14,52);F_('sofa',57,53);F_('bed',66,51);
 // ulica i podjazdy
 F_('police',34,41);F_('car',62,41);F_('car',24,41);F_('car',8,41);F_('car',20,35);F_('car',67,35);F_('car',55,36);
 for(const x of [12,30,52,70])F_('lamp',x,38);
 F_('mailbox',44,37);F_('bins',61,37);F_('bins',62,37);F_('mailbox',14,37);F_('mailbox',72,37);F_('hydrant',27,38);
 for(const[x,y]of[[3,47],[9,47],[30,47],[36,47],[44,47],[49,47],[75,47],[2,36],[27,30],[64,30],[3,12],[12,12],[20,6],[70,10],[76,4],[66,14],[30,52],[40,54],[47,51],[76,52]])F_('tree',x,y);
 for(const[x,y]of[[33,35],[36,35],[47,35],[50,35],[9,34],[12,34],[73,34],[75,34],[29,36],[63,36]])F_('bush',x,y);
 for(const [x,y] of [[40,43],[52,44],[18,42],[66,44]])F_('puddle',x,y);
 for(let x=0;x<MW;x+=2){F_('tree',x+(x%4?1:0),0);}
 for(let y=2;y<36;y+=2){F_('tree',0,y);F_('tree',79,y);}
}
const LAMPS_HOUSE=[[42,35,0,'#ffcf88',44],[47,28,0,'#ffd8a0',22],[38,31,0,'#ffb870',30],[48,21,0,'#ff9a50',22],[54,28,1,'#d8ecff',42],[34,21,0,'#ffc890',24],[41,22,1,'#c8d8e0',20],[42,30,2],[40,25,2],
 [30,38,2],[52,38,2],[12,38,2],[70,38,2],[15,24,0,'#ffcf88',40],[71,23,0,'#ffcf88',40],[60,52,0,'#ffcf88',40],[20,53,2]];
const ENTRIES_HOUSE=[{n:'Oakridge Lane',s:'Radiowóz 2-Adam-14 przy krawężniku.',x:39.5,y:39.4,a:-Math.PI/2,px:39,py:39}];
const H_ESCAPE={x:45.5*16,y:1.5*16};
 function houseTerrain(M,set,fillR,H,V){
 fillR(0,40,79,44,T.ASPH,'asph');fillR(0,38,79,39,T.ASPH,'conc');fillR(0,45,79,46,T.ASPH,'conc');
 fillR(51,35,57,37,T.ASPH,'conc');fillR(42,35,42,37,T.ASPH,'conc');fillR(19,34,22,37,T.ASPH,'conc');fillR(66,34,69,37,T.ASPH,'conc');fillR(15,34,15,37,T.ASPH,'conc');fillR(71,34,71,37,T.ASPH,'conc');
 fillR(31,24,31,26,T.ASPH,'conc');fillR(45,1,46,8,T.ASPH,'conc');fillR(17,47,17,48,T.ASPH,'conc');fillR(61,47,61,48,T.ASPH,'conc');
 // 214 Oakridge
 fillR(33,20,49,33,T.FLOOR,'wood');fillR(51,25,57,33,T.FLOOR,'conc');
 H(19,32,50);H(34,32,50);V(32,19,34);V(50,19,34);
 H(24,33,49);V(39,20,23);V(43,20,23);
 H(26,33,49);set(35,26,T.FLOOR);set(36,26,T.FLOOR);set(42,26,T.FLOOR);
 V(40,27,33);V(44,27,33);set(44,29,T.FLOOR);
 H(24,50,58);V(58,24,34);H(34,50,58);
  // sąsiedzi
 fillR(7,19,23,32,T.FLOOR,'wood');H(18,6,24);H(33,6,24);V(6,18,33);V(24,18,33);H(26,7,23);V(15,27,32);
 fillR(66,20,76,32,T.FLOOR,'wood');H(19,65,77);H(33,65,77);V(65,19,33);V(77,19,33);H(26,66,76);
 fillR(9,50,25,56,T.FLOOR,'wood');H(49,8,26);V(8,49,57);V(26,49,57);H(57,8,26);
 fillR(51,50,71,56,T.FLOOR,'wood');H(49,50,72);V(50,49,57);V(72,49,57);H(57,50,72);}
function houseWindows(M,set){
 for(const x of [35,38,46,48])set(x,34,T.WIN);for(const x of [35,37,41,46,48])set(x,19,T.WIN);for(const y of [21,29,31])set(32,y,T.WIN);set(50,22,T.WIN);set(58,31,T.WIN);set(54,24,T.WIN);
 for(const x of [9,12,19,21])set(x,33,T.WIN);for(const x of [10,14,20])set(x,18,T.WIN);for(const y of [21,29])set(24,y,T.WIN);for(const y of [22,29])set(6,y,T.WIN);
 for(const x of [67,74])set(x,33,T.WIN);for(const x of [68,73])set(x,19,T.WIN);for(const y of [22,29])set(65,y,T.WIN);
 for(const x of [11,14,21,23])set(x,49,T.WIN);for(const x of [53,57,65,69])set(x,49,T.WIN);}
const HOUSE_GDOOR=x=>G.lvl==='house'&&x>=52&&x<=56;

// ---- new furniture ----
F('bedD',2,2,1,0,(g,x,y)=>{P(g,x+2,y+29,29,3,SH);P(g,x+1,y,30,30,'#4a3a2e');P(g,x+1,y,30,3,'#5e4a3a');P(g,x+2,y+3,28,26,'#b8b4aa');P(g,x+3,y+4,11,5,'#dcdad2');P(g,x+18,y+4,11,5,'#dcdad2');P(g,x+2,y+11,28,18,'#6a4e5a');P(g,x+2,y+11,28,2,'#7e6070');P(g,x+1,y+28,2,2,'#2a2018');P(g,x+29,y+28,2,2,'#2a2018');});
F('bloodbed',1,1,0,0,(g,x,y)=>{P(g,x+6,y+7,14,9,'rgba(90,12,12,.85)');P(g,x+9,y+5,8,13,'rgba(70,8,8,.8)');P(g,x+4,y+12,22,5,'rgba(150,140,130,.9)');P(g,x+10,y+14,5,10,'rgba(80,10,10,.75)');});
F('towels',1,1,0,0,(g,x,y)=>{P(g,x+2,y+3,8,6,'#c9c6bc');P(g,x+4,y+5,4,3,'#7a1a1a');P(g,x+7,y+8,6,5,'#b9b6aa');P(g,x+9,y+9,3,2,'#6a1414');P(g,x+3,y+12,5,1,'#5a1010');});
F('clothes',1,1,0,0,(g,x,y)=>{P(g,x+2,y+5,9,6,'#2a3550');P(g,x+8,y+9,6,4,'#5a5f68');P(g,x+4,y+3,3,2,'#8a2a2a');});
F('cans',1,1,0,0,(g,x,y)=>{for(let i=0;i<4;i++)P(g,x+3+i*3,y+6+(i%2)*3,2,3,['#c22','#ddd','#2a6','#c22'][i]);P(g,x+9,y+11,4,2,'#d8c890');});
F('frame',1,1,0,0,(g,x,y)=>{P(g,x+5,y+2,6,4,'#6a5038');P(g,x+6,y+3,4,2,'#9aa8b0');});
F('casing',1,1,0,0,(g,x,y)=>{P(g,x+5,y+9,2,1,'#c9a74a');P(g,x+7,y+9,1,1,'#7a6a3a');});
F('bucket',1,1,1,0,(g,x,y)=>{P(g,x+3,y+12,10,3,SH);P(g,x+4,y+5,8,8,'#3a6aa8');P(g,x+5,y+6,6,3,'#c8a0a0');P(g,x+4,y+5,8,1,'#5a8ac8');P(g,x+10,y-4,1,12,'#8a7a5a');P(g,x+8,y-6,5,3,'#d8a8a8');});
F('drag',1,1,0,0,(g,x,y)=>{for(let i=0;i<8;i++){P(g,x+2+i*2,y+3+i,2,1,'rgba(70,12,12,.55)');P(g,x+2+i*2,y+9+i,2,1,'rgba(70,12,12,.45)');}});
F('freezer',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,3,SH);P(g,x+1,y+1,30,13,'#c8ccce');P(g,x+1,y+1,30,2,'#e2e5e6');P(g,x+2,y+11,28,2,'#9aa0a4');P(g,x+13,y+9,6,2,'#6a7074');P(g,x+25,y+3,3,2,'#3a8a3a');
 P(g,x+9,y,20,14,'#4a4038');P(g,x+9,y,20,1,'#5e5246');for(let i=11;i<28;i+=4)P(g,x+i,y+1,1,12,'#3c342c');for(let j=3;j<13;j+=4)P(g,x+9,y+j,20,1,'#3c342c');P(g,x+8,y+5,1,9,'#4a4038');P(g,x+29,y+3,2,11,'#4a4038');P(g,x+30,y+12,1,3,'#3c342c');P(g,x+12,y+13,14,2,'#3c342c');P(g,x+16,y+4,4,2,'#5a2a22');});
F('fence',1,1,1,0,(g,x,y)=>{P(g,x,y+11,16,2,SH);for(let i=1;i<16;i+=4){P(g,x+i,y+3,2,9,'#6a5a46');P(g,x+i,y+2,2,1,'#7a6a54');}P(g,x,y+5,16,1,'#54473a');P(g,x,y+9,16,1,'#54473a');});
F('fenceV',1,1,1,0,(g,x,y)=>{P(g,x+9,y,2,16,SH);P(g,x+7,y,2,16,'#5a4c3c');for(let i=1;i<16;i+=4)P(g,x+6,y+i,4,2,'#6e5e4a');});
F('mailbox',1,1,0,0,(g,x,y)=>{P(g,x+6,y+12,5,2,SH);P(g,x+8,y+4,1,9,'#4a4a4a');P(g,x+5,y,7,5,'#2a3a5a');P(g,x+5,y,7,1,'#3a4a6a');P(g,x+11,y+1,1,2,'#b22');});
F('hydrant',1,1,1,0,(g,x,y)=>{P(g,x+5,y+11,7,3,SH);P(g,x+6,y+4,5,8,'#a82a20');P(g,x+5,y+6,7,2,'#c03a30');P(g,x+7,y+3,3,1,'#c03a30');});
F('grill',1,1,1,0,(g,x,y)=>{P(g,x+3,y+12,10,3,SH);P(g,x+4,y+4,9,7,'#2a2a2c');P(g,x+5,y+5,7,1,'#4a4a4c');P(g,x+5,y+7,7,1,'#4a4a4c');P(g,x+4,y+11,1,2,'#222');P(g,x+12,y+11,1,2,'#222');});
// detailed police cruiser (top-down, facing east)
F('police',3,2,1,0,(g,x,y)=>{
 P(g,x+3,y+24,44,4,SH);
 for(const wx of [8,35]){P(g,x+wx,y+6,7,2,'#0e0e10');P(g,x+wx,y+24,7,2,'#0e0e10');P(g,x+wx+2,y+6,3,1,'#3a3a3e');P(g,x+wx+2,y+25,3,1,'#3a3a3e');}
 P(g,x+2,y+8,44,16,'#e6e8ea');P(g,x+3,y+8,42,1,'#f6f7f8');P(g,x+2,y+23,44,1,'#a8acb0');
 P(g,x+2,y+8,10,16,'#16181b');P(g,x+34,y+8,12,16,'#16181b');P(g,x+3,y+9,8,1,'#2c3036');P(g,x+35,y+9,10,1,'#2c3036');P(g,x+37,y+15,8,1,'#24282c');
 P(g,x+46,y+10,2,12,'#2a2c30');P(g,x+46,y+11,1,10,'#44484e');
 P(g,x+45,y+9,1,2,'#f4f0d8');P(g,x+45,y+21,1,2,'#f4f0d8');P(g,x+2,y+9,1,2,'#c0201a');P(g,x+2,y+21,1,2,'#c0201a');
 P(g,x+29,y+9,5,14,'#1a2a38');P(g,x+30,y+10,1,5,'#4a6a84');P(g,x+11,y+10,3,12,'#1a2a38');P(g,x+12,y+11,1,4,'#3a5468');
 P(g,x+14,y+9,15,14,'#dfe2e4');P(g,x+14,y+9,15,1,'#f0f2f3');P(g,x+14,y+22,15,1,'#b8bcc0');
 P(g,x+20,y+8,3,16,'#1a1c1f');P(g,x+21,y+9,1,6,'#c4241c');P(g,x+21,y+17,1,6,'#1f4fd0');P(g,x+21,y+15,1,2,'#e8e8e8');
 P(g,x+29,y+6,2,2,'#16181b');P(g,x+29,y+24,2,2,'#16181b');
 P(g,x+24,y+8,1,1,'#9ca0a4');P(g,x+24,y+23,1,1,'#9ca0a4');P(g,x+16,y+8,3,1,'#c09a28');P(g,x+16,y+23,3,1,'#c09a28');
 P(g,x+40,y+12,1,8,'#22262a');P(g,x+8,y+15,1,1,'#888');});

// ---- level switch ----
function setLevel(l){G.lvl=l;const h=l==='house';
 ROOMS=h?ROOMS_HOUSE:ROOMS_HOSP;DOORS=h?DOORS_HOUSE:DOORS_HOSP;FURN=h?FURN_HOUSE:FURN_HOSP;LAMPS=h?LAMPS_HOUSE:LAMPS_HOSP;CAMS=h?[]:CAMS_HOSP;ENTRIES=h?ENTRIES_HOUSE:ENTRIES_HOSP;G.entry=0;
 buildMap();bakeWorld();LV.doorRows=null;_wf=null;G.devs=null;}
G.lvl='house';ROOMS=ROOMS_HOUSE;DOORS=DOORS_HOUSE;FURN=FURN_HOUSE;LAMPS=LAMPS_HOUSE;CAMS=[];

// ---- mission ----
const PAL_SUSPECT={body:'#4a4f58',legs:'#2a3550',head:'#c49a7c',face:'#c49a7c',visor:'#2a1a12',hair:'#3a2a1a',skin:'#c49a7c',eyes:1};
const PAL_NEIGH={body:'#7a5a7a',legs:'#5a4a5a',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',hair:'#b8b8b0',skin:'#c8a080',eyes:1};
const CLUES=[
 {id:'shell',x:41,y:29,msg:'Mała mosiężna łuska pod szafką na buty. Dziewięć milimetrów.'},
 {id:'keys',x:42,y:28,msg:'Na wieszaku torebka i kluczyki do auta.'},
 {id:'hole',x:38,y:27,msg:'Dziura w ścianie, świeżo zaszpachlowana. Masa jest jeszcze wilgotna.'},
 {id:'photo',x:33,y:28,msg:'Zdjęcia rodzinne na półce. Jedno leży twarzą w dół.'},
 {id:'plates',x:47,y:29,msg:'Na stole dwa talerze z niedojedzoną kolacją.'},
 {id:'phone',x:48,y:28,msg:'Telefon na blacie. Dwanaście nieodebranych połączeń od „Siostry”.'},
 {id:'calendar',x:49,y:28,msg:'Kalendarz na lodówce. Na ten weekend nic nie wpisano.'},
 {id:'bucket',x:49,y:32,msg:'Wiadro z wodą, czuć wybielacz. Mop ma różowy odcień.'},
 {id:'bed',x:36,y:22,msg:'Pościel zdjęta z łóżka. Na materacu ciemna plama.'},
 {id:'towels',x:41,y:21,msg:'W wannie mokre ręczniki.'},
 {id:'pc',x:47,y:21,msg:'Komputer włączony. Gra stoi na pauzie od kilku godzin.'},
 {id:'holster',x:49,y:21,msg:'W szufladzie biurka pusta kabura i pudełko nabojów dziewięć milimetrów.'},
 {id:'bench',x:52,y:26,msg:'Na stole warsztatowym rolka folii i taśma.'},
 {id:'drag',x:54,y:27,msg:'Smugi na betonie, jakby coś ciągnięto.'}];
const FREEZER={x:56*16,y:26*16+4};
function houseScen(){return{intel:[[41,25,'ZGŁOSZENIE']],est:[1,1],hroom:'Klonowa 14',hide:[],en:[],traps:[]};}
function spawnPatrol(E){const L=[{spec:'lead',name:'OFC. MILLER',pal:PAL.patrolA,o:[0,-.5]},{spec:'scout',name:'OFC. ORTIZ',pal:PAL.patrolB,o:[-.9,.6]}];
 L.forEach((d,i)=>{const u=new Unit({team:'squad',spec:d.spec,name:d.name,role:'Patrol Officer',weap:'pistol',fov:84,range:10,acc:'#d8b048',pal:d.pal,patrol:true,charges:0,flash:0,sed:0,shoutCd:0,armor:'light',spray:2});
  u.x=E.x*TS+8+d.o[1]*TS;u.y=E.y*TS-d.o[0]*TS;u.ang=E.a;u.heading=E.a;unstick(u);u.holster=true;G.squad[i]=u;G.units.push(u);});}
function startHouse(){
 G.hostage=null;G.deadline=1e9;
 G.h={talked:false,opened:false,clues:CLUES.map(c=>({...c,found:false})),nf:0,freezer:false,said:{},react:null,endT:null,result:null};
 const s=new Unit({team:'civ',kind:'suspect',pal:{...PAL_SUSPECT},state:'door',r:4,name:'Ethan Hartley'});s.x=47*TS+8;s.y=32*TS+8;s.ang=Math.PI;s.room=LV.room[I(47,32)];G.h.s=s;G.civs.push(s);G.units.push(s);
 const n=new Unit({team:'civ',kind:'neighbor',pal:{...PAL_NEIGH},state:'work',r:4,workA:-Math.PI/2+.5});n.x=27*TS+8;n.y=37*TS+8;n.ang=n.workA;G.h.n=n;G.civs.push(n);G.units.push(n);
 G.police=[];
 houseTraces();logEv('2-Adam-14 na miejscu: 214 Oakridge Lane');
 setTimeout(()=>{radio('DISPATCH','2-Adam-14, dwieście czternaście Oakridge Lane. Sąsiadka zgłasza krzyki i dwa huki około piątej pięćdziesiąt.');radio(G.p1?G.p1.name:'2-ADAM-14','2-Adam-14, przyjąłem. Jesteśmy na miejscu.');},700);}
function houseTraces(){const r=rng(14);
 for(let k=0;k<5;k++)P(wc,Math.round(41*TS+3+r()*10),Math.round(29*TS+4+r()*8),1,1,'rgba(80,14,14,.5)');
 if(WR[26]){const g=WR[26].getContext('2d');P(g,38*TS+6,19,4,4,'rgba(200,190,170,.5)');P(g,38*TS+7,20,2,2,'#111');}
}
function houseInteract(u){const H=G.h;if(!H)return null;const fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8,near=(x,y,r)=>Math.min(dist(fx,fy,x,y),dist(u.x,u.y,x,y))<(r||16);
 const fd=LV.doorAt[I(42,34)];if(!H.knocked&&fd&&!fd.broken&&fd.target===0&&near(42*TS+8,34*TS+8,22)&&u.y>34*TS)return{k:'house',label:'Zapukaj do drzwi',dur:0,f:knockDoor};
 const s=H.s;if(s.alive&&s.team==='civ'&&!H.talked&&s.state==='opened'&&near(s.x,s.y,30))return{k:'house',label:'Porozmawiaj z mieszkańcem',dur:0,f:talkSuspect};
 const n=H.n;if(n.alive&&!H.said.neigh&&near(n.x,n.y,20))return{k:'house',label:'Porozmawiaj z sąsiadką',dur:0,f:talkNeighbor};
 for(const c of H.clues)if(!c.found&&near(c.x*TS+8,c.y*TS+8,13))return{k:'house',label:'Przyjrzyj się',dur:.8,f:(u)=>findClue(u,c)};
 if(!H.freezer&&near(FREEZER.x,FREEZER.y,20))return{k:'house',label:'Otwórz zamrażarkę',dur:1.4,f:openFreezer};
 return null;}
function knockDoor(u){const H=G.h;H.knocked=true;logEv(u.name+' puka do drzwi');if(A.ctx){const o=out(42*TS+8,34*TS+8,.6,{rev:.15}),t0=A.ctx.currentTime;if(o)for(let k=0;k<3;k++){nz(o,t0+k*.24,.08,{brown:1,type:'lowpass',f:420,g:1});tone(o,t0+k*.24,.06,{f:110,f2:70,g:.5});}}
 radio(u.name,'Policja! Proszę otworzyć!');setTimeout(()=>{if(G.ended)return;const s=H.s;if(s.alive&&s.team==='civ'&&s.state==='door'){s.state='answer';s.path=null;}},rand(2500,4000));}
function talkSuspect(u){const H=G.h;H.talked=true;const s=H.s;s.state='talk';s.talkT=7.5;turnTo(s,Math.atan2(u.y-s.y,u.x-s.x),1,9);logEv('Rozmowa z synem przy drzwiach');
 radio(u.name,'Dzień dobry, policja. Mamy zgłoszenie o krzykach i hukach z tego domu.');
 radio('ETHAN HARTLEY','Huki? Nie wiem... może ktoś odpalał fajerwerki. Jestem sam, rodzice pojechali do ciotki.');
 radio(u.name,'Musimy się rozejrzeć w środku. Dla pewności.');
 radio('ETHAN HARTLEY','Serio? ...Dobra. Tylko niczego nie ruszajcie.');}
function talkNeighbor(u){G.h.said.neigh=1;radio('MRS. KELLER','To ja dzwoniłam. Najpierw krzyki, chyba kobiece. Potem dwa huki i cisza. Wczoraj wieczorem jeszcze ich widziałam.');radio(u.name,'Dziękuję. Proszę zostać przy swoim domu.');logEv('Rozmowa z sąsiadką');}
function findClue(u,c){c.found=true;const H=G.h;H.nf++;logEv(c.msg.split('.')[0]+' ('+roomName(c.x*TS+8,c.y*TS+8)+')');radio(u.name,c.msg);
 if(c.id==='towels'&&!H.drawn){const o=G.squad.find(q=>q&&q.alive&&q!==u);radio(u.name,'Ortiz... coś tu nie gra. Broń w ręku.');if(o)radio(o.name,'Przyjąłem.');setTimeout(()=>drawWeapons('ręczniki w wannie'),900);}}
function drawWeapons(why){const H=G.h;if(!H||H.drawn)return;H.drawn=true;logEv('Funkcjonariusze wyciągają broń ('+why+')');for(const q of G.squad){if(!q||!q.alive)continue;q.holster=false;q.hTip=0;SND.reload(q.x,q.y,'pistol');}}
function openFreezer(u){const H=G.h;H.freezer=true;drawWeapons('zamrażarka');logEv('Zamrażarka w garażu: dwa ciała');SND.door(FREEZER.x,FREEZER.y,true);
 radio(u.name,'Dispatch... w zamrażarce są dwa ciała. Kobieta i mężczyzna.',{prio:1});
 radio('DISPATCH','Przyjęłam. Wysyłam wsparcie i detektywów. Zachowajcie ostrożność.',{prio:1});
 const s=H.s;if(!s.alive||s.state==='cuffed'||s.team!=='civ')return;
 setTimeout(()=>{if(G.ended||!s.alive||s.state==='cuffed'||s.state==='comply')return;if(Math.random()<.5)armSuspect(s);else{s.state='escape';s.path=null;drawWeapons('ucieczka');radio('ETHAN HARTLEY','Nie... nie, nie!');const L=nearestSquad(s);if(L)radio(L.name,'Ucieka! Tylnymi drzwiami!',{prio:1});logEv('Podejrzany ucieka');}},1300);}
function armSuspect(s){drawWeapons('podejrzany uzbrojony');const e=new Unit({team:'enemy',weap:'ePistol',pal:s.pal,fov:115,range:8,name:'Podejrzany',kind:'suspect'});e.x=s.x;e.y=s.y;e.ang=s.ang;e.home={x:e.x,y:e.y,a:e.ang,st:'guard'};
 const q=nearestSquad(e);e.state='search';e.goal={x:q?q.x:e.x,y:q?q.y:e.y};e.searchT=12;e.arrived=false;e.path=null;e.ico='!';e.icoT=2;e.res=12;
 G.civs.splice(G.civs.indexOf(s),1);G.units.splice(G.units.indexOf(s),1,e);G.enemies.push(e);G.h.s=e;
 radio('ETHAN HARTLEY','Nie zabierzecie mnie! Słyszycie?!',{prio:1});logEv('Podejrzany wyciąga broń');}
function updateSuspect(c,dt){const H=G.h;
 if(c.stun>0){c.stun-=dt;moveUnit(c,dt,0,0,0);return;}
 if(c.state==='cuffed'||c.state==='comply'){moveUnit(c,dt,0,0,0);if(c.state==='cuffed'&&!H.said.cuff){H.said.cuff=1;radio('ETHAN HARTLEY',H.freezer?'...':'Za co?! Nic nie zrobiłem! To mój dom!');}return;}
 const goTo=(tx,ty,spd)=>{if(!c.path||c.goalT!==tx+','+ty){c.path=findPath(c.x/TS|0,c.y/TS|0,tx,ty,3000);c.goalT=tx+','+ty;}if(c.path)for(const n of c.path.slice(0,3)){const dd=LV.doorAt[I(n[0],n[1])];if(dd&&dd.target===0&&!dd.locked&&!dd.broken&&dist(dd.x*TS+8,dd.y*TS+8,c.x,c.y)<TS*1.6)toggleDoor(dd,c);}if(c.path&&!followPath(c,dt,spd)){if(c.moving)turnTo(c,Math.atan2(c.vy,c.vx),dt,6);return false;}c.path=null;moveUnit(c,dt,0,0,0);return true;};
 const face=()=>{const q=nearestSquad(c);if(q&&dist(q.x,q.y,c.x,c.y)<TS*9)turnTo(c,Math.atan2(q.y-c.y,q.x-c.x),dt,2.5);};
 const insideSquad=G.squad.some(q=>q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]>=0&&LV.room[I(q.x/TS|0,q.y/TS|0)]<=7);
 const d=LV.doorAt[I(42,34)];
 switch(c.state){
 case'door':{moveUnit(c,dt,0,0,0);turnTo(c,c.ang+Math.sin(G.time*.4)*.5,dt,.5);if(insideSquad){c.state='calm';H.talked=true;radio('ETHAN HARTLEY','Hej! Co wy robicie w moim domu?!');}break;}
 case'answer':{if(insideSquad){c.state='calm';H.talked=true;break;}if(goTo(42,33,36)){c.ang=Math.PI/2;if(d&&!d.broken){d.locked=false;if(!d.target)toggleDoor(d,c);}c.state='opened';radio('ETHAN HARTLEY','Tak...? Coś się stało?');}break;}
 case'opened':{moveUnit(c,dt,0,0,0);face();if(insideSquad&&!H.talked){H.talked=true;c.state='calm';radio('ETHAN HARTLEY','Ej! Nie macie prawa tak wchodzić!');}break;}
 case'talk':{moveUnit(c,dt,0,0,0);face();c.talkT-=dt;if(c.talkT<=0)c.state='calm';break;}
 case'calm':{if(goTo(37,29,22))face();
  if(!H.freezer&&!H.oddT&&G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,FREEZER.x,FREEZER.y)<TS*4.5)){c.state='odd';H.oddT=0.001;c.path=null;break;}
  if(!H.said.garage&&G.squad.some(q=>q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]===7)){H.said.garage=1;c.state='nerv';radio('ETHAN HARTLEY','To tylko garaż. Ojciec trzyma tam swoje graty.');}break;}
 case'nerv':{if(!H.freezer&&!H.oddT&&G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,FREEZER.x,FREEZER.y)<TS*4.5)){c.state='odd';H.oddT=0.001;c.path=null;break;}if(goTo(48,29,24))face();c.pose='stand';break;}
 case'odd':{oddBehaviour(c,dt,goTo,face);break;}
 case'escape':{const tx=H_ESCAPE.x/TS|0,ty=H_ESCAPE.y/TS|0;goTo(tx,ty,50);if(dist(c.x,c.y,H_ESCAPE.x,H_ESCAPE.y)<TS*1.5&&!G.ended){logEv('Podejrzany zbiegł');H.result='escaped';endMission(false,'Podejrzany uciekł.');}break;}
 default:moveUnit(c,dt,0,0,0);}}
function updateHouse(dt){const H=G.h;if(!H||G.ended)return;const s=H.s;if(!H.inside&&G.squad.some(q=>q&&q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]>=0&&LV.room[I(q.x/TS|0,q.y/TS|0)]<=7))H.inside=true;
 if(H.endT==null){const done=!s.alive||s.state==='cuffed';if(H.freezer&&done){H.endT=2;H.result=s.alive?'arrested':'killed';}}
 else{H.endT-=dt;if(H.endT<=0){H.endT=1e9;endMission(true,H.result==='arrested'?'Podejrzany zatrzymany. Zbrodnia wykryta.':'Podejrzany nie żyje. Zbrodnia wykryta.');}}
 G.h.n.workA=Math.atan2(30*TS-G.h.n.y,42*TS-G.h.n.x);}
function houseStress(dt,L){if(!L)return;houseDread(dt,L);tvAudio(L);if(G.ended)return;morningLife(dt);
 for(const s of G.squad){if(!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=s.treated?3.2:2;if(s.human)SND.breath(s.x,s.y,s.treated?.18:.35);}}
 }
function houseRender(c,cx,cy){const H=G.h;if(!H)return;
 if(H.freezer){const x=55*TS-cx,y=25*TS-cy-(FH.freezer||0);P(c,x+1,y-9,30,9,'#d8dcde');P(c,x+1,y-9,30,1,'#eef0f1');P(c,x+24,y-11,9,12,'#4a4038');P(c,x+26,y-11,1,12,'#3c342c');P(c,x+30,y-11,1,12,'#3c342c');P(c,x+2,y+1,28,11,'#1a2024');
  const seed=(G.time*11)|0,cols=['#5a6870','#7a8a90','#5c1f1f','#3a1414','#c8ccce','#4a4a44','#8a7a6a'];for(let j=0;j<10;j+=2)for(let i=0;i<26;i+=2){const hh=Math.sin(i*12.9898+j*78.233+seed*.37)*43758.5453;P(c,x+3+i,y+1+j,2,2,cols[Math.floor((hh-Math.floor(hh))*cols.length)]);}
  if(((G.time*2)|0)%2)P(c,x+27,y+3,2,2,'rgba(160,220,255,.4)');}}
function houseObj(){const H=G.h;if(!H)return'';const s=H.s,ar=s.state==='cuffed'||!s.alive,ins=H.talked&&H.inside;
 const row=(ok,t)=>'<div class="'+(ok?'ok':'no')+'">'+(ok?'■':'□')+' '+t+'</div>';
 return'<div class="h">2-ADAM-14 · 214 OAKRIDGE LN · '+fmtT(G.stats.time)+'</div>'+row(ins,'Sprawdź zgłoszenie')+(H.freezer?row(ar,'Zatrzymaj podejrzanego'):'')+(H.nf?'<div class="opt">Notatki: '+H.nf+'</div>':'');}
function houseBrief(){return`<div class="sec"><span class="lbl">ZGŁOSZENIE</span>06:40, jesienny poranek · <b>214 Oakridge Lane</b>, Ridgefield. Sąsiadka zgłasza krzyki i dwa huki z domu obok.</div>
<div class="sec"><span class="lbl">JEDNOSTKA</span>Ridgefield PD · patrol <b>2-Adam-14</b>: Ofc. Miller, Ofc. Ortiz.</div>
<div class="sec"><span class="lbl">DANE</span>Dom Hartleyów: małżeństwo i syn (20 l.). Brak wcześniejszych interwencji.</div>
<div class="sec"><span class="lbl">ZADANIE</span>Sprawdzić zgłoszenie.</div>`;}
function houseDebrief(){const s=G.stats,H=G.h||{nf:0,clues:[]};let score=G.win?100:0;score+=H.nf*4;if(H.result==='arrested')score+=20;score-=s.roe*15+s.squadLost*15+s.civKilled*30;if(G.win)score+=Math.max(0,10-Math.floor(s.time/60));
 const rank=!G.win?'F':score>=140?'S':score>=125?'A':score>=105?'B':score>=80?'C':'D';
 $('deb-h').textContent=G.win?'MISJA ZAKOŃCZONA SUKCESEM':'MISJA NIEUDANA';$('deb-h').style.color=G.win?'#7fae6a':'#e0574a';$('deb-r').textContent='OCENA: '+rank;
 const sus={arrested:'zatrzymany',killed:'zabity',escaped:'zbiegł'}[H.result]||'—';
 $('deb-st').innerHTML=[['Wynik',G.reason],['Czas operacji',fmtT(s.time)],['Notatki z miejsca',H.nf+' / '+H.clues.length],['Zamrażarka w garażu',H.freezer?'otwarta — dwie ofiary':'nie sprawdzono'],['Podejrzany',sus],['Rozmowa z sąsiadką',H.said&&H.said.neigh?'tak':'nie'],['Cywile zabici',s.civKilled],['Straty w oddziale',s.squadLost+' / 5'],['Ranni / opatrzeni',s.wounded+' / '+s.healed],['Nieuprawnione użycie siły',s.roe],['Oddane strzały',s.shots],['Punkty',score]].map(r=>'<div>'+r[0]+'<span>'+r[1]+'</span></div>').join('');
 $('deb-log').innerHTML='<div class="h">OŚ CZASU OPERACJI</div>'+G.log.map(l=>'<div><span>'+fmtT(l[0])+'</span>'+l[1]+'</div>').join('');showScreen('deb');}
function policeLights(c,cx,cy){const on=((G.time*5)|0)%2;for(const f of LV.furn){if(f.k!=='police')continue;const x=f.x*TS+21-cx,y=f.y*TS+16-(FH.police||0)-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;
 const gy=on?y-5:y+6,col=on?'255,40,30':'40,90,255',g=c.createRadialGradient(x,gy,0,x,gy,38);g.addColorStop(0,'rgba('+col+',.32)');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-38,gy-38,76,76);
 if(on)P(c,x,y-7,1,6,'#ff6a50');else P(c,x,y+1,1,6,'#6aa0ff');}}
Object.assign(FH,{police:5,freezer:7,fence:4,bedD:5,grill:4,hydrant:3,bucket:0});
function houseWallCol(rb){const n=rb>=0?ROOMS[rb].n:'';return n==='Sypialnia rodziców'?['#6a5a68','#4a3e48']:n==='Łazienka'?['#8a9698','#6a7678']:n==='Pokój syna'?['#4a5868','#343e4a']:n==='Salon'?['#7a6a50','#4e4232']:n==='Kuchnia'?['#8a8468','#5e5a44']:n==='Garaż'?['#5c5c5a','#444442']:n==='Przedpokój'||n==='Korytarz'?['#857660','#54483a']:['#7a6a5a','#4e4438'];}
// ---- autumn morning ----
let OUTM=null;
function autumnDecor(){const r=rng(1031),C=['#8a3c14','#b0581c','#c8862a','#6a2a12','#9a6a1a','#d09a3a','#5a3a14'];
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t!==T.GRASS&&t!==T.ASPH)continue;const gr=t===T.GRASS;
  if(gr)P(wc,x*TS,y*TS,16,16,'rgba(90,72,30,.22)');
  let n=gr?(r()*7|0):(LV.fs[I(x,y)]==='conc'?(r()*4|0):(r()*2|0));
  for(const f of LV.furn)if(f.k==='tree'&&Math.abs(f.x-x)<=2&&Math.abs(f.y-y)<=2){n+=6;break;}
  for(let k=0;k<n;k++){const lx=x*TS+(r()*15|0),ly=y*TS+(r()*15|0),c=C[(r()*C.length)|0];P(wc,lx,ly,2,1,c);if(r()<.5)P(wc,lx+(r()<.5?0:1),ly+1,1,1,shadeC(c,-20));}
  if(!gr&&r()<.06){const g=wc.createRadialGradient(x*TS+8,y*TS+8,0,x*TS+8,y*TS+8,10);g.addColorStop(0,'rgba(120,140,160,.12)');g.addColorStop(1,'rgba(120,140,160,0)');wc.fillStyle=g;wc.fillRect(x*TS-4,y*TS-4,24,24);}}
 OUTM=document.createElement('canvas');OUTM.width=MW*TS;OUTM.height=MH*TS;const og=OUTM.getContext('2d');og.fillStyle='#fff';
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t===T.GRASS||t===T.ASPH)og.fillRect(x*TS,y*TS,TS,TS);else if(t===T.WALL||t===T.WIN){const b=tAt(x,y+1);if(b===T.GRASS||b===T.ASPH)og.fillRect(x*TS,y*TS+4,TS,12);}}
 for(let y=1;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if((t===T.WALL||t===T.WIN)&&(tAt(x,y+1)===T.GRASS||tAt(x,y+1)===T.ASPH))og.fillRect(x*TS,(y-1)*TS+4,TS,12);}}
const LEAVES=[];for(let i=0;i<46;i++)LEAVES.push({x:Math.random()*VW,y:Math.random()*VH,s:rand(9,20),ph:rand(0,6.28),c:['#b0581c','#c8862a','#8a3c14','#d09a3a','#9a4a1c'][i%5]});
function drawLeaves(cx,cy){const dt=1/60,wind=8+Math.sin(G.time*.3)*6;
 for(const l of LEAVES){l.ph+=dt*rand(2,3.5);l.y+=l.s*dt;l.x+=(wind+Math.sin(l.ph)*10)*dt;if(l.y>VH+4){l.y=-4;l.x=Math.random()*VW;}if(l.x>VW+4)l.x=-4;
  if(!isOutdoor(l.x+cx,l.y+cy+6))continue;const fl=Math.sin(l.ph*1.7)>0;P(ctx,l.x|0,l.y|0,fl?2:1,fl?1:2,l.c);}}
function morningFx(c,cx,cy){
 // low autumn sun from the east + cold mist banks drifting over the estate
 c.globalCompositeOperation='saturation';c.globalAlpha=.38;c.fillStyle='#808080';c.fillRect(0,0,VW,VH);c.globalAlpha=1;c.globalCompositeOperation='lighter';const sg=c.createLinearGradient(VW,0,0,VH);sg.addColorStop(0,'rgba(200,170,130,.035)');sg.addColorStop(1,'rgba(90,110,140,0)');c.fillStyle=sg;c.fillRect(0,0,VW,VH);c.globalCompositeOperation='source-over';
 for(let i=0;i<7;i++){const wx=((i*233+G.time*(4+i))%(MW*TS+300))-150,wy=[42,46,12,38,5,52,30][i]*TS+Math.sin(G.time*.05+i)*20,x=wx-cx,y=wy-cy,R=90+i*12;if(x<-R||y<-R||x>VW+R||y>VH+R)continue;
  const g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,'rgba(170,178,186,.2)');g.addColorStop(1,'rgba(170,178,186,0)');c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2);}
 c.fillStyle='rgba(150,158,166,.06)';c.fillRect(0,0,VW,VH);
 const dr=(G.h&&G.h.dread)||0,v=c.createRadialGradient(VW/2,VH/2,VH*(.42-dr*.16),VW/2,VH/2,VW*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(4,2,2,'+(.42+dr*.4).toFixed(2)+')');c.fillStyle=v;c.fillRect(0,0,VW,VH);
 if(dr>.5&&Math.random()<.04){c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,0,VW,VH);}}
function morningLife(dt){const L=leader();if(!L)return;const od=isOutdoor(L.x,L.y);
 G.birdT=(G.birdT==null?rand(2,5):G.birdT)-dt;if(G.birdT<=0){G.birdT=rand(3,9);if(A.ctx){const o=ui(od?.05:.015),t0=A.ctx.currentTime,k=randi(2,5),base=rand(2600,3600);for(let i=0;i<k;i++)tone(o,t0+i*rand(.09,.16),rand(.05,.09),{f:base*rand(.9,1.1),f2:base*rand(1.2,1.5),g:.25});}}
 for(const s of G.squad){if(!s.alive||!isOutdoor(s.x,s.y))continue;s.puffT=(s.puffT==null?rand(0,3):s.puffT)-dt;if(s.puffT<=0){s.puffT=rand(2.4,3.6);const a=s.ang;G.fx.push({k:'smoke',x:s.x+Math.cos(a)*3,y:s.y-15+Math.sin(a)*2,vx:Math.cos(a)*8,vy:-4,r:.6,gr:3,a:.16,t:0,life:1.1,c:'#dfe4ea'});}}}
// ---- interior props (214 Oakridge) ----
F('dresser',2,1,1,0,(g,x,y)=>{P(g,x+1,y+14,30,2,SH);P(g,x+1,y+2,30,11,'#4e3826');P(g,x+1,y+2,30,1,'#644a34');for(const i of [5,12])P(g,x+2,y+i-1,28,1,'#3a2818');P(g,x+8,y+6,2,1,'#b89a5a');P(g,x+22,y+6,2,1,'#b89a5a');P(g,x+4,y+3,4,2,'#c8b0d0');P(g,x+20,y+3,6,2,'#2a2a2a');P(g,x+12,y+3,2,1,'#e8e0c0');});
F('laundry',1,1,0,0,(g,x,y)=>{P(g,x+3,y+5,10,8,'#8a7a5a');P(g,x+3,y+5,10,1,'#a8966e');P(g,x+4,y+3,4,3,'#d8d0c0');P(g,x+8,y+2,4,4,'#6a7a9a');P(g,x+5,y+7,6,1,'#6a5a40');});
F('slippers',1,1,0,0,(g,x,y)=>{P(g,x+3,y+7,3,5,'#a87a8a');P(g,x+8,y+6,3,5,'#a87a8a');P(g,x+3,y+7,3,1,'#c89aaa');P(g,x+8,y+6,3,1,'#c89aaa');});
F('lampFl',1,1,0,0,(g,x,y)=>{for(let i=0;i<11;i++)P(g,x+2+i,y+3+(i>>1),1,1,'#8a8a84');P(g,x+11,y+7,5,5,'#c8b890');P(g,x+12,y+8,3,3,'#a8986a');P(g,x+1,y+2,3,3,'#3a3a36');P(g,x+6,y+12,2,1,'#d8e0e8');P(g,x+9,y+10,1,1,'#d8e0e8');});
F('bottle',1,1,0,0,(g,x,y)=>{P(g,x+5,y+6,2,6,'#3a5a2a');P(g,x+5,y+5,2,1,'#c8b060');P(g,x+9,y+9,6,2,'#4a3a1a');P(g,x+14,y+9,1,2,'#c8b060');});
F('gchair',1,1,0,0,(g,x,y)=>{P(g,x+3,y+13,10,2,SH);P(g,x+3,y+5,10,8,'#1a1a1e');P(g,x+4,y+1,8,5,'#22222a');P(g,x+5,y+2,6,1,'#a01818');P(g,x+3,y+8,1,4,'#a01818');P(g,x+12,y+8,1,4,'#a01818');});
F('pizza',1,1,0,0,(g,x,y)=>{P(g,x+1,y+4,11,9,'#c8b088');P(g,x+1,y+4,11,1,'#d8c098');P(g,x+4,y+6,5,3,'#a83a2a');P(g,x+6,y+1,9,8,'#bca07a');P(g,x+8,y+3,4,2,'#8a6a4a');});
F('ashtray',1,1,0,0,(g,x,y)=>{P(g,x+5,y+6,6,4,'#5a5a5c');P(g,x+6,y+7,4,2,'#2a2a2a');P(g,x+7,y+7,3,1,'#d8d0c0');P(g,x+10,y+5,3,1,'#d8d0c0');});
F('toys',1,1,0,0,(g,x,y)=>{P(g,x+2,y+4,11,9,'#6a5038');P(g,x+2,y+4,11,1,'#8a6a4a');P(g,x+4,y+2,3,3,'#c8a020');P(g,x+8,y+1,3,4,'#3a6ac8');P(g,x+5,y+6,2,2,'#c83a2a');});
F('deadplant',1,1,1,0,(g,x,y)=>{P(g,x+4,y+13,9,2,SH);P(g,x+5,y+8,6,6,'#5a3e2a');P(g,x+5,y+8,6,1,'#6e4e36');P(g,x+4,y+2,8,7,'#4a3a1e');P(g,x+3,y+4,2,3,'#5a4420');P(g,x+11,y+3,2,4,'#3e3018');P(g,x+7,y+1,2,8,'#3a2a16');P(g,x+2,y+12,2,1,'#6a4a20');P(g,x+12,y+13,2,1,'#5a3e1a');});
F('books',1,1,0,0,(g,x,y)=>{for(let i=0;i<4;i++)P(g,x+3+i,y+5+i*2,9,2,['#6a2a2a','#2a4a5a','#5a5a3a','#3a3a3a'][i]);});
F('console',1,1,0,0,(g,x,y)=>{P(g,x+4,y+6,8,4,'#1a1a1e');P(g,x+5,y+7,1,1,'#3a6ac8');P(g,x+10,y+7,1,1,'#c83a2a');for(let i=0;i<6;i++)P(g,x+8+i,y+10+(i>>1),1,1,'#111');});
F('cabK',1,1,1,1,(g,x,y)=>{FT.cab.d(g,x,y);P(g,x+3,y-12,10,3,'#6a3a2a');P(g,x+4,y-13,8,1,'#8a5a3a');P(g,x+11,y-9,2,3,'#c8b060');P(g,x+2,y-4,3,6,'#3a3a3e');});
F('shoes',1,1,0,0,(g,x,y)=>{P(g,x+2,y+6,3,6,'#2a2a2a');P(g,x+6,y+6,3,6,'#2a2a2a');P(g,x+10,y+5,2,5,'#8a3a4a');P(g,x+13,y+5,2,5,'#8a3a4a');P(g,x+2,y+12,7,1,'#1a1a1a');});
F('umbrella',1,1,0,0,(g,x,y)=>{P(g,x+6,y+2,4,11,'#1a2a3a');P(g,x+7,y+1,2,1,'#888');P(g,x+8,y+13,1,2,'#6a5038');});
F('mail',1,1,0,0,(g,x,y)=>{P(g,x+2,y+4,7,5,'#d8d4c4');P(g,x+6,y+7,7,5,'#c8c4b0');P(g,x+4,y+10,6,4,'#e0dccc');P(g,x+7,y+8,3,1,'#8a2a2a');});
F('counterP',1,1,1,0,(g,x,y)=>{P(g,x,y+1,16,10,'#787b7a');P(g,x,y+1,16,1,'#909392');P(g,x,y+11,16,4,'#4a4d4e');P(g,x+7,y+11,1,4,'#3a3d3e');P(g,x+5,y+4,4,6,'#111');P(g,x+6,y+5,2,3,'#2a4a6a');});
F('tableDin',2,2,1,0,(g,x,y)=>{P(g,x+2,y+26,29,4,SH);P(g,x+1,y+3,30,22,'#5e4a38');P(g,x+1,y+3,30,1,'#705a46');P(g,x+1,y+25,30,3,'#45362a');P(g,x+2,y+28,2,3,'#2e241c');P(g,x+28,y+28,2,3,'#2e241c');
 for(const[px,py]of[[5,6],[19,6],[5,16]]){P(g,x+px,y+py,7,6,'#d8d6ce');P(g,x+px+1,y+py+1,5,4,'#c8c4b8');}P(g,x+7,y+8,3,2,'#7a4a2a');P(g,x+21,y+8,2,2,'#6a5a3a');P(g,x+20,y+17,3,4,'rgba(200,220,230,.6)');P(g,x+14,y+12,4,4,'#a83a2a');P(g,x+25,y+16,3,6,'#3a5a2a');});
F('gloves',1,1,0,0,(g,x,y)=>{P(g,x+3,y+6,4,6,'#e0c830');P(g,x+8,y+7,4,5,'#e0c830');P(g,x+4,y+5,1,1,'#c0a820');P(g,x+9,y+11,2,1,'#b07070');});
F('workbench',3,1,1,0,(g,x,y)=>{P(g,x+1,y+14,46,2,SH);P(g,x,y+2,48,10,'#5a4a36');P(g,x,y+2,48,1,'#6e5c46');P(g,x,y+12,48,3,'#3a2e22');P(g,x+4,y+4,10,6,'#c8ccd0');P(g,x+6,y+5,6,4,'#a8acb0');P(g,x+20,y+4,12,2,'#9aa0a6');P(g,x+30,y+3,3,4,'#5a3a1a');P(g,x+36,y+5,6,5,'#b8a888');P(g,x+38,y+6,2,3,'#7a6a5a');});
F('mower',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,12,3,SH);P(g,x+3,y+5,10,8,'#a82a20');P(g,x+4,y+6,8,4,'#2a2a2a');P(g,x+2,y+11,3,3,'#111');P(g,x+11,y+11,3,3,'#111');P(g,x+7,y-2,1,8,'#555');P(g,x+5,y-3,5,1,'#555');});
F('bike',2,1,1,0,(g,x,y)=>{P(g,x+2,y+12,28,3,SH);for(const cx of [7,24]){P(g,x+cx-5,y+5,11,1,'#111');P(g,x+cx-5,y+11,11,1,'#111');P(g,x+cx-6,y+6,1,5,'#111');P(g,x+cx+5,y+6,1,5,'#111');}P(g,x+8,y+7,16,1,'#2a6a9a');P(g,x+14,y+3,1,5,'#2a6a9a');P(g,x+12,y+2,5,1,'#222');P(g,x+22,y+3,4,1,'#444');});
F('paint',1,1,0,0,(g,x,y)=>{P(g,x+2,y+6,5,6,'#c8c8c0');P(g,x+2,y+6,5,1,'#e8e8e0');P(g,x+8,y+7,5,5,'#8a9aa0');P(g,x+3,y+8,3,2,'#3a6a8a');});
F('oil',1,1,0,0,(g,x,y)=>{P(g,x+2,y+4,11,8,'rgba(10,10,12,.45)');P(g,x+4,y+3,6,10,'rgba(10,10,12,.35)');});
F('tarp',1,1,0,0,(g,x,y)=>{P(g,x,y+3,16,10,'#3a4a6a');P(g,x,y+3,16,1,'#4a5a7a');for(let i=1;i<16;i+=4)P(g,x+i,y+5,2,1,'#2a3a5a');P(g,x+11,y+9,4,3,'rgba(70,10,10,.5)');});
Object.assign(FH,{dresser:7,deadplant:3,cabK:0,counterP:8,tableDin:6,workbench:7,mower:4,bike:3});
// ---- moody interior: indoor shade + sun shafts through blinds ----
let INM=null,SUNM=null,MOTES=[];
function houseLightMaps(){INM=document.createElement('canvas');INM.width=MW*TS;INM.height=MH*TS;const g=INM.getContext('2d');g.fillStyle='#000';
 const inside=(x,y)=>{const t=tAt(x,y);return(t===T.FLOOR||t===T.DOOR)&&LV.room[I(x,y)]>=0;};
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t===T.FLOOR||t===T.DOOR)g.fillRect(x*TS,y*TS,TS,TS);else if((t===T.WALL||t===T.WIN)&&inside(x,y+1))g.fillRect(x*TS,y*TS-WH,TS,TS+WH);}
 SUNM=document.createElement('canvas');SUNM.width=MW*TS;SUNM.height=MH*TS;const s=SUNM.getContext('2d');MOTES=[];
 for(let y=16;y<=34;y++)for(let x=30;x<=61;x++){if(tAt(x,y)!==T.WIN)continue;let dx=0,dy=0;if(inside(x,y+1))dy=1;else if(inside(x,y-1))dy=-1;else if(inside(x+1,y))dx=1;else if(inside(x-1,y))dx=-1;else continue;
  const east=dx===-1,k=east?1.1:.5,L=TS*(east?3.6:2.4),cx=x*TS+8,cy=y*TS+8;s.save();s.translate(cx,cy);s.rotate(Math.atan2(dy,dx)+(east?.35:.25));
  for(let i=0;i<L;i++){const w=6+i*.55,a=(.075*k)*(1-i/L);for(let j=-w;j<w;j+=1){if(((j+40)|0)%3===0)continue;s.fillStyle='rgba(255,196,130,'+a.toFixed(3)+')';s.fillRect(i,j,1,1);}}
  s.restore();for(let m=0;m<5;m++)MOTES.push({x:cx+dx*rand(8,L*.7)+dy*rand(-8,8),y:cy+dy*rand(8,L*.7)+dx*rand(-8,8),p:rand(0,6)});}}
function houseShade(c,cx,cy){if(!INM)houseLightMaps();c.globalAlpha=.7;c.drawImage(INM,cx,cy,VW,VH,0,0,VW,VH);c.globalAlpha=1;
 c.globalCompositeOperation='lighter';c.drawImage(SUNM,cx,cy,VW,VH,0,0,VW,VH);
 for(const m of MOTES){const x=m.x+Math.sin(G.time*.4+m.p)*4-cx,y=m.y+Math.cos(G.time*.3+m.p)*3-cy;if(x<0||y<0||x>VW||y>VH)continue;if(Math.sin(G.time*1.3+m.p*3)>.2)P(c,x|0,y|0,1,1,'rgba(255,225,180,.35)');}
 screenGlow(c,cx,cy);c.globalCompositeOperation='source-over';drawFly(c,cx,cy);}
function houseWallDeco(g,x,y,n,r){const k=r();
 if(n==='Garaż'){if(k<.45){P(g,x+1,y+1,14,7,'#6a5a40');for(let i=0;i<5;i++)P(g,x+3+i*2,y+2+(i%2),1,4,['#888','#a83a2a','#666','#c8a020','#777'][i]);}else if(k<.6){P(g,x+4,y+1,7,6,'#5a5e60');P(g,x+5,y+2,5,1,'#c8c8c0');}return;}
 if(n==='Kuchnia'){P(g,x,y,16,5,'#5a4632');P(g,x,y+4,16,1,'#3a2e22');P(g,x+7,y,1,5,'#3a2e22');if(k<.2){P(g,x+5,y+6,5,4,'#d8d4c8');P(g,x+7,y+7,1,2,'#222');}return;}
 if(n==='Łazienka'){for(let i=0;i<16;i+=4)P(g,x+i,y,1,8,shadeC('#8a9698',-10));if(k<.35){P(g,x+4,y+1,8,6,'#9ab0b8');P(g,x+5,y+2,2,4,'#c8dce4');}return;}
 if(n==='Pokój syna'){if(k<.5){const c=['#a82a2a','#2a2a6a','#1a1a1a','#6a2a8a'][(r()*4)|0];P(g,x+3,y+1,9,7,c);P(g,x+5,y+3,5,2,'#d8d0c0');}return;}
 if(n==='Salon'&&k<.12){P(g,x+6,y+1,5,5,'#d8d4c4');P(g,x+8,y+2,1,2,'#222');P(g,x+8,y+3,2,1,'#222');return;}
 if(k<.45){const w=k<.15?10:6;P(g,x+3,y+1,w,6,'#3a2a1a');P(g,x+4,y+2,w-2,4,['#8a7a6a','#6a7a8a','#7a6a5a','#5a6a5a'][(r()*4)|0]);P(g,x+5,y+3,2,2,'#c8a888');if(w>6)P(g,x+9,y+3,2,2,'#b89878');}
 else if(k<.52&&(n==='Przedpokój'||n==='Korytarz')){for(let i=0;i<3;i++)P(g,x+3+i*4,y+2,1,2,'#8a7a5a');}}
// ---- dread: grows as you approach the freezer ----
function dreadInit(){const c=A.ctx;if(!c||A.dreadG)return;A.dreadG=c.createGain();A.dreadG.gain.value=0;A.dreadG.connect(A.master);
 const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=220;lp.connect(A.dreadG);
 for(const[f,v]of[[36.7,.5],[38.9,.45],[55,.25]]){const o=c.createOscillator();o.type='sine';o.frequency.value=f;const g=c.createGain();g.gain.value=v;o.connect(g);g.connect(lp);o.start();}
 const hi=c.createGain();hi.gain.value=.018;hi.connect(A.dreadG);for(const f of [1864,1975,2093]){const o=c.createOscillator();o.frequency.value=f;const l=c.createOscillator();l.frequency.value=rand(.07,.19);const lg=c.createGain();lg.gain.value=.5;const g=c.createGain();g.gain.value=.5;l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(hi);o.start();l.start();}
 const n=c.createBufferSource();n.buffer=A.brown;n.loop=true;const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=160;bp.Q.value=1.5;const ng=c.createGain();ng.gain.value=.35;const nl=c.createOscillator();nl.frequency.value=.11;const nlg=c.createGain();nlg.gain.value=.3;nl.connect(nlg);nlg.connect(ng.gain);n.connect(bp);bp.connect(ng);ng.connect(A.dreadG);n.start();nl.start();}
function houseDread(dt,L){if(!A.ctx)return;dreadInit();const H=G.h,t=A.ctx.currentTime;
 const inside=LV.room[I(L.x/TS|0,L.y/TS|0)]>=0&&LV.room[I(L.x/TS|0,L.y/TS|0)]<=7;
 const d=dist(L.x,L.y,FREEZER.x,FREEZER.y)/TS,near=clamp(1-(d-2)/16,0,1);
 let lvl=G.ended?0:H.freezer?.35:(inside?.12:0)+near*near*.88;H.dread=lvl;
 A.dreadG.gain.setTargetAtTime(lvl*.22,t,1.2);
 if(!H.freezer&&near>.55){G.heartT-=dt;if(G.heartT<=0){G.heartT=1.25-near*.5;SND.heart();}}
 if(inside&&!G.ended){G.creakT=(G.creakT==null?rand(6,12):G.creakT)-dt;if(G.creakT<=0){G.creakT=rand(9,20);const o=out(L.x+rand(-120,120),L.y+rand(-90,90),.12,{rev:.4});if(o){const t0=A.ctx.currentTime,f=rand(90,160);tone(o,t0,rand(.5,.9),{type:'sawtooth',f,f2:f*rand(.7,1.3),g:.12,attack:.15});}}
  G.tickT=(G.tickT||0)-dt;if(G.tickT<=0){G.tickT=1;const cx=36*TS,cy=27*TS;if(dist(L.x,L.y,cx,cy)<TS*7){const o=out(cx,cy,.05,{rev:.2});if(o)tone(o,A.ctx.currentTime,.02,{type:'square',f:2400,g:.3});}}}}
// ---- Ethan near the freezer ----
const ODD=[
 {l:'Ej... czekajcie. Zadzwonię do rodziców, oni wam wszystko wyjaśnią.',w:.8,act:(c,H)=>{c.phoneUp=true;H.dialAt=G.time+.9;H.ringStart=G.time+2.6;logEv('Ethan próbuje dzwonić do rodziców');}},
 {need:H=>G.time>H.ringStart+1.3,l:'...Mamo?',w:1.5},
 {need:H=>G.time>H.ringStart+4.6,l:'Nie odbiera. Pewnie... zostawiła telefon. Przed wyjazdem.',w:3,act:(c)=>{c.phoneUp=false;}},
 {l:'To tylko stara zamrażarka ojca. Nic tam nie ma.',w:4},
 {l:'Słuchajcie, może przyjdziecie później? Z nakazem, czy jak to się robi?',w:6},
 {l:'Wszystko jest w porządku. Naprawdę.',w:9},
 {l:'...',w:8},
 {l:'Dlaczego tak na mnie patrzycie?',w:10,loop:5}];
function oddBehaviour(c,dt,goTo,face){const H=G.h;H.oddT+=dt;
 const idle=!R.busy&&!R.q.length;H.oddW=(H.oddW||0)-dt;const st=ODD[H.oddI||0];
 if(st&&idle&&H.oddW<=0&&(!st.need||st.need(H))){radio('ETHAN HARTLEY',st.l);if(st.act)st.act(c,H);H.oddW=st.w+1.2;H.oddI=st.loop!=null?st.loop:(H.oddI||0)+1;}
 const ty=H.oddT<3?30:(((G.time/3)|0)%2?29:31);if(goTo(49,ty,H.oddT<3?30:14))face();
 if(H.dialAt&&G.time>H.dialAt){H.dialAt=0;if(A.ctx){const o=out(c.x,c.y,.06,{rev:.1});if(o)for(let k=0;k<7;k++)tone(o,A.ctx.currentTime+k*.13,.08,{f:rand(700,1400),g:.25});}}
 if(H.ringStart&&G.time>H.ringStart&&G.time<H.ringStart+4.2&&(!H.ringT||G.time-H.ringT>1.25)){H.ringT=G.time;if(A.ctx){const o=out(48*TS+8,27*TS+8,.22,{rev:.25}),t0=A.ctx.currentTime;if(o){for(let k=0;k<4;k++)tone(o,t0+k*.11,.08,{type:'square',f:k%2?1320:1760,g:.18});nz(o,t0,.5,{type:'lowpass',f:180,g:.4,attack:.02});}}
  if(!H.said.ringNote){H.said.ringNote=1;logEv('W kuchni dzwoni telefon matki');}}}
// ---- living screens (TV, PC), TV audio, fly over freezer ----
const SCREENS=[{x:34*16+8,y:28*16,r:46,k:'tv'},{x:49*16,y:21*16,r:30,k:'pc'},{x:34*16+8,y:20*16+4,r:44,k:'lamp'},{x:37*16+8,y:20*16+4,r:30,k:'lamp',dim:1}];
function screenGlow(c,cx,cy){if(!G.h)return;const t=G.time;
 for(const s of SCREENS){const x=s.x-cx,y=s.y-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;let col,a;
  if(s.k==='tv'){const ph=(t*6.5|0);const pal=[[120,150,255],[255,210,160],[140,255,190],[200,200,230],[255,140,120],[160,180,255]];col=pal[(ph*7+((ph*13)>>2))%pal.length];a=.11+((Math.sin(ph*12.9898)*43758.5453)%1+1)%1*.12;}
  else if(s.k==='lamp'){col=[255,190,120];a=s.dim?.09:.2;}
  else{col=[110,190,255];a=.1+Math.sin(t*1.7)*.015+(Math.random()<.02?.05:0);}
  const g=c.createRadialGradient(x,y,0,x,y,s.r);g.addColorStop(0,'rgba('+col+','+a.toFixed(3)+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-s.r,y-s.r,s.r*2,s.r*2);}
 // the screens themselves
 const tvx=34*16+3-cx,tvy=27*16+1-cy-(FH.tv||0);if(tvx>-20&&tvy>-20&&tvx<VW+20&&tvy<VH+20){const ph=(t*6.5|0);for(let i=0;i<5;i++)P(c,tvx+1+i*2,tvy+2,2,4,'rgba('+[[90,120,220],[220,180,140],[120,220,160],[200,200,220]][(ph+i)%4]+',.5)');}
 for(const lx of [34,37]){const x=lx*16+5-cx,y=20*16-3-cy-(FH.tableS||0);if(x>-10&&y>-10&&x<VW+10&&y<VH+10){P(c,x+1,y+4,4,3,'#3a2a1a');P(c,x,y,6,4,lx===34?'#f0c880':'#a88a60');P(c,x+1,y,4,1,lx===34?'#fff0c8':'#c8a878');}}
 const pcx=48*16+11-cx,pcy=20*16-3-cy-(FH.deskPC||0);if(pcx>-20&&pcy>-20&&pcx<VW+20&&pcy<VH+20){P(c,pcx,pcy,9,5,'rgba(90,170,240,.35)');P(c,pcx+3,pcy+2,3,1,'rgba(230,240,255,.5)');}}
function drawFly(c,cx,cy){const H=G.h;if(!H)return;const t=G.time,bx=FREEZER.x-cx,by=FREEZER.y-28-cy;
 const x=bx+Math.sin(t*3.1)*9+Math.sin(t*7.3)*4+Math.sin(t*13)*1.5,y=by+Math.cos(t*2.3)*5+Math.sin(t*9.1)*3;
 if(x<-4||y<-4||x>VW+4||y>VH+4)return;P(c,x|0,y|0,1,1,'#0a0a0a');if(((t*30)|0)%2)P(c,(x|0)-1,(y|0)-1,1,1,'rgba(200,210,220,.35)');}
const VOW=[[800,1200,2500],[500,1800,2500],[320,2200,2900],[500,900,2400],[360,800,2300],[650,1100,2400]];
function tvAudio(L){if(!A.ctx||!G.h)return;const c=A.ctx,t=c.currentTime;
 if(!A.tvG){A.tvG=c.createGain();A.tvG.gain.value=0;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;A.tvLP=lp;lp.connect(A.tvG);A.tvG.connect(A.master);
  const sw=c.createGain();sw.gain.value=.25;A.tvG.connect(sw);sw.connect(A.revSIn||A.revIn);
  A.tvAM=c.createGain();A.tvAM.gain.value=0;A.tvAM.connect(lp);
  const src=c.createOscillator();src.type='sawtooth';src.frequency.value=130;A.tvO=src;const vib=c.createOscillator();vib.frequency.value=5.5;const vg=c.createGain();vg.gain.value=3;vib.connect(vg);vg.connect(src.frequency);
  A.tvF=[];for(const[f,q,gn]of[[700,6,1],[1200,8,.55],[2500,10,.25]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;const g=c.createGain();g.gain.value=gn;src.connect(bp);bp.connect(g);g.connect(A.tvAM);A.tvF.push(bp);}
  const n=c.createBufferSource();n.buffer=A.noise;n.loop=true;const hp=c.createBiquadFilter();hp.type='bandpass';hp.frequency.value=4200;hp.Q.value=1;A.tvS=c.createGain();A.tvS.gain.value=0;n.connect(hp);hp.connect(A.tvS);A.tvS.connect(lp);n.start();
  const pad=c.createGain();pad.gain.value=.012;pad.connect(lp);for(const f of [110,138.6,164.8]){const o=c.createOscillator();o.type='triangle';o.frequency.value=f;o.connect(pad);o.start();}
  src.start();vib.start();
  A.flyG=c.createGain();A.flyG.gain.value=0;const fo=c.createOscillator();fo.type='sawtooth';fo.frequency.value=215;const fl=c.createOscillator();fl.frequency.value=7;const flg=c.createGain();flg.gain.value=18;fl.connect(flg);flg.connect(fo.frequency);const fb=c.createBiquadFilter();fb.type='bandpass';fb.frequency.value=900;fb.Q.value=.8;fo.connect(fb);fb.connect(A.flyG);A.flyG.connect(A.master);fo.start();fl.start();}
 const tv=SCREENS[0],d=dist(L.x,L.y,tv.x,tv.y)/TS,los=losClear(L.x,L.y,tv.x,tv.y+8),v=G.ended?0:clamp(1-d/12,0,1)*(los?1:.4);
 A.tvG.gain.setTargetAtTime(v*.045,t,.3);A.tvLP.frequency.setTargetAtTime(los?2600:800,t,.3);
 G.tvSyl=(G.tvSyl||0)-1/60;if(G.tvSyl<=0){const pause=Math.random()<.14;G.tvSyl=pause?rand(.25,.6):rand(.09,.19);
  if(pause){A.tvAM.gain.setTargetAtTime(0,t,.04);A.tvS.gain.setTargetAtTime(0,t,.02);}
  else{const vw=VOW[(Math.random()*VOW.length)|0];A.tvF.forEach((f,i)=>f.frequency.setTargetAtTime(vw[i]*rand(.92,1.08),t,.03));if(Math.random()<.03)G.tvHi=!G.tvHi;A.tvO.frequency.setTargetAtTime(rand(105,165)*(G.tvHi?1.45:1),t,.05);
   A.tvAM.gain.setTargetAtTime(rand(.5,1),t,.02);A.tvS.gain.setTargetAtTime(Math.random()<.25?rand(.15,.35):0,t,.015);}}
 const fd=dist(L.x,L.y,FREEZER.x,FREEZER.y)/TS;A.flyG.gain.setTargetAtTime(G.ended?0:clamp(1-fd/4.5,0,1)*.007*(.6+.4*Math.sin(G.time*2.1)),t,.1);}
