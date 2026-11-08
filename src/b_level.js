// ================= LEVEL: SZPITAL PSYCHIATRYCZNY =================
const MW=80,MH=58;
const T={GRASS:0,ASPH:1,WALL:2,FLOOR:3,DOOR:4,WIN:5};
const I=(x,y)=>y*MW+x;
const inb=(x,y)=>x>=0&&y>=0&&x<MW&&y<MH;
const LV={t:new Uint8Array(MW*MH),fs:new Array(MW*MH),fsolid:new Uint8Array(MW*MH),fopq:new Uint8Array(MW*MH),room:new Int16Array(MW*MH),doorAt:new Array(MW*MH),doors:[],furn:[],lamps:[],cams:[]};
const FT={};
const R_=(n,x,y,x2,y2,f)=>({n,x,y,x2,y2,f});
const ROOMS_HOSP=[
 R_('Cela 1',3,3,6,9,'pad'),R_('Cela 2',8,3,10,9,'lino'),R_('Cela 3',12,3,14,9,'pad'),R_('Cela 4',16,3,18,9,'lino'),R_('Cela 5',20,3,22,9,'pad'),R_('Cela 6',24,3,26,9,'lino'),R_('Cela 7',28,3,30,9,'lino'),
 R_('Korytarz oddziału',3,11,30,12,'lino'),
 R_('Izolatka',3,14,8,20,'pad'),R_('Łazienka',10,14,15,20,'tileW'),R_('Dyżurka',17,14,23,20,'lino'),R_('Świetlica',25,14,30,20,'wood'),
 R_('Korytarz A',32,3,33,21,'lino'),
 R_('Gabinet lekarski',35,3,41,9,'wood'),R_('Sekretariat',43,3,49,9,'wood'),R_('Gabinet dyrektora',51,3,62,9,'carpet'),R_('Sala konferencyjna',64,3,76,9,'wood'),
 R_('Korytarz administracyjny',35,11,76,12,'lino'),
 R_('OIOM',35,14,44,20,'tileW'),R_('Archiwum',46,14,56,20,'conc'),R_('Pokój socjalny',58,14,64,20,'lino'),R_('Rozdzielnia',66,14,70,20,'conc'),R_('Klatka schodowa',72,14,76,20,'conc'),
 R_('Korytarz główny',3,22,76,23,'lino'),
 R_('Kuchnia',3,25,12,36,'tileW'),R_('Chłodnia',3,38,12,43,'tileW'),R_('Oddział położniczy',14,25,27,43,'lino'),
 R_('Hol',29,24,43,43,'lobby'),R_('Rejestracja',29,25,33,29,'wood'),
 R_('Korytarz serwisowy',45,24,46,43,'conc'),R_('Ochrona',48,25,55,31,'conc'),R_('Apteka',48,33,55,38,'tileW'),R_('Pralnia',48,40,55,43,'tileW'),
 R_('Szatnia',57,25,66,34,'wood'),R_('Kotłownia',57,36,66,43,'conc'),R_('Korytarz wschodni',68,24,69,43,'conc'),R_('Kostnica',71,25,76,33,'tileW'),R_('Magazyn',71,35,76,43,'conc'),
];
// [x,y,locked,glass]
const DOORS_HOSP=[[5,10,1],[9,10],[13,10,1],[17,10],[21,10,1],[25,10],[29,10],
 [6,13,1],[12,13],[20,13],[27,13],[31,11,1],[27,21],
 [38,10],[46,10],[57,10,1],[70,10],[50,6],[63,5],
 [40,13],[51,13],[61,13],[68,13,1],[74,13],[40,21],[52,21],[74,21],
 [20,24],[51,24],[61,24],[13,29],[8,37],[8,44],[28,34],[32,30],[47,28],[47,35,1],[47,41],[46,44,1],
 [67,29],[67,40],[61,35],[70,29],[70,39,1],[69,44],[36,44,0,1],[2,11,1],[77,17,1]];
const FURN_HOSP=[];
{const r=rng(77),F_=(...a)=>FURN_HOSP.push(a),ch=p=>r()<p;
 // cele
 [[3,6],[8,10],[12,14],[16,18],[20,22],[24,26],[28,30]].forEach(([a,b],i)=>{F_('bed',a,3);F_('toilet',b,3);if(ch(.7))F_('scratch',a+ (b-a>2?1:0),7);if(ch(.5))F_('chairX',b,8);if(i%2)F_('stain',b,6);});
 // korytarz oddziału
 F_('wheel',10,11);F_('cart',18,12);F_('chairX',24,11);F_('iv',4,11);F_('linen',15,12);F_('papers',22,12);F_('glass',28,12);
 // izolatka, łazienka, dyżurka, świetlica
 F_('mattress',4,15);F_('scratch',6,18);F_('scratch',3,19);F_('jacket',7,16);
 F_('toilet',10,14);F_('toilet',11,14);F_('sink',14,14);F_('sink',15,14);F_('tub',10,19);F_('drain',12,17);F_('drain',14,17);F_('stain',13,18);
 F_('deskPC',18,15);F_('chair',18,16);F_('cab',22,14);F_('cab',23,14);F_('medshelf',17,14);F_('tableS',21,18);F_('chair',20,18);F_('cart',23,19);F_('papers',19,17);F_('pills',22,16);
 F_('table',26,15);F_('chair',25,16);F_('chairX',28,16);F_('chair',26,17);F_('sofa',28,19);F_('tv',30,14);F_('shelf',25,14);F_('plant',30,20);F_('papers',27,18);
 // korytarz A
 F_('gurneyV',33,4);F_('wheel',32,8);F_('vending',33,16);F_('iv',32,13);F_('papers',32,18);
 // admin
 F_('rug',37,7,4,2);F_('deskPC',37,4);F_('chair',37,3);F_('shelf',35,3);F_('shelf',36,3);F_('cab',40,3);F_('cab',41,3);F_('sofa',38,8);F_('plant',41,9);F_('papers',36,6);
 F_('deskPC',44,5);F_('deskPC',47,5);F_('chair',44,6);F_('chairX',47,7);F_('shelf',43,3);F_('cab',49,3);F_('cab',48,3);F_('plant',43,9);F_('papers',45,8);F_('papers',48,7);F_('glass',44,8);
 F_('rug',53,4,7,4);F_('deskPC',56,5);F_('chair',56,4);F_('shelf',51,3);F_('shelf',52,3);F_('shelf',61,3);F_('shelf',62,3);F_('sofa',59,8);F_('tableS',52,8);F_('plant',62,9);F_('cab',62,6);F_('papers',58,6);
 F_('tableL',67,5);F_('tableL',70,5);F_('tableL',73,5);for(const x of [67,68,69,70,71,72,73,74,75]){if(ch(.8))F_('chair',x,4);if(ch(.6))F_(ch(.3)?'chairX':'chairD',x,6);}F_('shelf',64,3);F_('plant',76,9);F_('papers',66,8);
 // korytarz administracyjny
 F_('bench',44,11);F_('plant',49,11);F_('plant',64,11);F_('wheel',60,12);F_('cart',72,12);F_('papers',55,12);F_('glass',41,12);
 // południowe pokoje admin
 F_('bed',36,15);F_('vent',37,15);F_('bed',39,15);F_('ekg',40,15);F_('bed',42,15);F_('vent',43,15);F_('ekg',37,17);F_('iv',35,16);F_('iv',41,17);F_('cab',35,14);F_('cab',37,14);F_('sink',44,14);F_('cart',35,19);F_('curtain',38,15,1,2);F_('curtain',41,15,1,2);F_('medshelf',44,18);
 for(const x of [47,48,49,50,53,54,55]){F_('rack',x,15);F_('rack',x,18);}F_('papers',51,17);F_('papers',56,16);F_('papers',47,20);
 F_('table',60,16);F_('chair',59,16);F_('chairX',62,17);F_('fridge',64,14);F_('counter',58,14);F_('counter',59,14);F_('sink',60,14);F_('sofa',62,19);F_('trash',58,19);
 F_('cab',66,14);F_('cab',67,14);F_('cab',69,14);F_('cab',70,14);F_('pipes',66,17);F_('pipes',70,18);
 F_('stairs',73,15,4,5);
 // korytarz główny
 F_('bench',6,22);F_('plant',14,22);F_('gurney',16,22);F_('wheel',24,23);F_('vending',43,22);F_('bench',56,22);F_('barr',58,23);F_('cart',65,23);F_('plant',71,22);F_('iv',30,23);F_('glass',48,23);F_('papers',35,22);F_('papers',62,22);F_('chairX',10,23);
 // kuchnia, chłodnia, stołówka
 for(let x=3;x<=10;x++)F_(x===5?'sink':x===7||x===8?'stove':'counter',x,25);F_('fridge',11,25);F_('fridge',12,25);for(let y=27;y<=34;y++)F_('counter',3,y);F_('table',6,30);F_('bins',12,35);F_('trash',9,33);F_('stain',7,27);
 for(let y=38;y<=42;y++)F_('rack',3,y);for(let y=38;y<=41;y++)F_('rack',12,y);F_('crate',5,42);F_('crate',10,42);F_('crate',11,42);
 for(const y of [26,40])for(const x of [15,18,21,24]){F_('bed',x,y);F_('crib',x+1,y);F_('iv',x+1,y+1);F_('curtain',x+2,y,1,2);}
 F_('deskPC',19,33);F_('chair',20,32);F_('incub',15,33);F_('incub',16,33);F_('incub',25,33);F_('sink',27,30);F_('cart',26,37);F_('medshelf',14,36);F_('linen',22,36);F_('papers',21,34);
 // hol, rejestracja
 F_('deskPC',30,26);F_('chair',30,27);F_('shelf',33,25);F_('cab',29,25);F_('papers',31,28);
 F_('reception',36,29);F_('chair',37,28);F_('benchL',41,32);F_('benchL',41,40);F_('benchL',29,40);F_('plant',43,25);F_('plant',29,43);F_('plant',43,43);F_('rug',34,40,5,3);F_('papers',34,31);F_('glass',38,42);F_('wheel',42,30);
 // serwis, ochrona, apteka, pralnia
 F_('cart',45,30);F_('bins',46,38);F_('gurneyV',45,33);F_('trash',46,26);
 F_('monitors',48,25);F_('chair',49,26);F_('cab',54,25);F_('locker',55,25);F_('tableS',53,29);F_('chair',52,29);F_('papers',50,30);
 for(let x=48;x<=55;x++)F_('medshelf',x,33);F_('counter',50,36);F_('counter',51,36);F_('counter',52,36);F_('medshelf',55,35);F_('medshelf',55,36);F_('pills',49,37);F_('pills',53,38);F_('glass',51,35);
 F_('washer',49,40);F_('washer',50,40);F_('washer',51,40);F_('washer',52,40);F_('cart',54,42);F_('linen',49,42);F_('linen',52,43);
 // szatnia, kotłownia
 for(const x of [57,58,59,60,62,63,64,65,66])F_('locker',x,25);for(const y of [27,28,30,31,32,33])F_('locker',66,y);F_('benchL',58,28);F_('benchL',62,28);F_('benchL',58,32);F_('benchL',62,32);F_('linen',60,30);
 F_('boiler',59,38);F_('tank',64,37);F_('tank',64,38);F_('tank',57,41);F_('pipes',63,42);F_('pipes',58,36);F_('crate',62,43);
 // korytarz wschodni, kostnica, magazyn
 F_('crate',68,32);F_('gurneyV',69,36);F_('bins',68,42);
 F_('slab',72,26);F_('slab',74,26);F_('slab',72,30);F_('slab',74,30);for(let y=25;y<=32;y++)F_('morgue',76,y);F_('sink',71,25);F_('drain',73,29);
 for(let y=35;y<=42;y+=2){F_('rack',72,y);F_('rack',75,y);}F_('crate',73,43);F_('crate',74,36);
 // zewnątrz
 F_('bearcat',26,48);F_('police',31,48);F_('police',40,48);F_('van',45,49);F_('ambul',19,49);F_('police',11,48);F_('police',72,48);F_('car',12,52);F_('car',52,53);F_('car',57,53);F_('car',24,53);
 F_('lamp',10,46);F_('lamp',27,46);F_('lamp',62,46);F_('bins',3,46);F_('bins',4,46);F_('tape',33,46,7,1);F_('tape',64,46,8,1);
 for(const x of [14,18,49,53,58])F_('pline',x,52);
 for(const [x,y] of [[22,50],[40,46],[58,48],[70,49],[6,48],[45,54]])F_('puddle',x,y);
 for(let x=0;x<MW;x+=2){F_('tree',x+(x%4?1:0),0);F_('tree',x,57);}
 for(let y=2;y<56;y+=2){if(y<8||y>14)F_('tree',0,y);if(y<12||y>22)F_('tree',79,y);}
 for(const [x,y] of [[2,45],[12,45],[16,45],[24,45],[48,45],[56,45],[76,45],[78,10],[78,30],[1,26],[1,36]])F_('bush',x,y);
}
// lamps: [x,y,mode 0 stały / 1 migający / 2 wyłączony, kolor, promień]
const LAMPS_HOSP=[[6,22,1],[12,22,2],[18,22,0],[26,22,1],[38,22,2],[46,22,0],[54,22,1],[62,22,2],[72,22,0],
 [8,11,1],[18,11,2],[27,12,0],[32,6,2],[33,15,1],[42,11,0],[55,11,1],[68,12,2],
 [36,33,1],[36,40,0],[31,27,2],[8,30,1],[8,40,2],[20,30,0],[20,38,1],[45,30,1],[45,40,2],[51,28,0,'#a8ffd0',50],[51,36,2],[51,41,1],[61,29,0],[61,40,1,'#ff9a50',70],[68,30,2],[68,38,1],[73,29,1,'#c8e0ff',60],[73,39,2],
 [5,17,1,'#c8d8ff',40],[12,17,2],[20,17,0],[27,17,1],[56,6,0,'#ffcf88',60],[46,6,2],[38,6,1],[70,7,2],[40,17,1],[51,17,2],[61,17,0],[68,17,1],[74,17,2],
 [10,46,0,'#ffb060',90],[27,46,0,'#ffb060',90],[62,46,0,'#ffb060',90]];
const CAMS_HOSP=[[75.4,22.25,Math.PI,'Korytarz główny — wschód'],[3.6,22.25,0,'Korytarz główny — zachód'],[43.4,24.7,2.4,'Hol główny'],[35.6,11.25,0,'Korytarz administracyjny — zachód'],[75.4,11.25,Math.PI,'Korytarz administracyjny — wschód'],[32.6,3.3,Math.PI/2,'Korytarz A'],[43.6,3.3,.7,'Sekretariat'],[51.6,3.3,.6,'Gabinet dyrektora'],[64.6,3.3,.5,'Sala konferencyjna'],[72.6,14.3,.9,'Klatka schodowa']];
function buildMap(){const M=LV;
 M.t.fill(T.GRASS);M.fs.fill('grass');M.fsolid.fill(0);M.fopq.fill(0);M.room.fill(-1);M.doorAt.fill(null);M.doors=[];M.furn=[];
 const set=(x,y,v,fs)=>{if(!inb(x,y))return;M.t[I(x,y)]=v;if(fs)M.fs[I(x,y)]=fs;};
 const fillR=(x1,y1,x2,y2,v,fs)=>{for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)set(x,y,v,fs);};
 const H=(y,x1,x2)=>{for(let x=x1;x<=x2;x++)set(x,y,T.WALL);},V=(x,y1,y2)=>{for(let y=y1;y<=y2;y++)set(x,y,T.WALL);};
 LD().terrain(M,set,fillR,H,V);
 ROOMS.forEach((r,i)=>{for(let y=r.y;y<=r.y2;y++)for(let x=r.x;x<=r.x2;x++){if(M.t[I(x,y)]===T.FLOOR){M.fs[I(x,y)]=r.f;M.room[I(x,y)]=i;}}});
 LD().windows(M,set);
 for(const [x,y,lk,glass] of DOORS){set(x,y,T.DOOR);
  const vert=M.t[I(x,y-1)]===T.WALL||M.t[I(x,y-1)]===T.WIN;
  const d={x,y,vert,locked:!!lk,glass:!!glass,broken:false,open:0,target:0,charge:null,knownLocked:false};
  M.doors.push(d);M.doorAt[I(x,y)]=d;
  const nb=vert?[x-1,y]:[x,y-1];let f=M.fs[I(nb[0],nb[1])];if(f==='grass'||f==='asph')f='lino';M.fs[I(x,y)]=f;}
 for(const f of FURN){const ft=FT[f[0]];if(!ft)continue;const w=f[3]||ft.w,h=f[4]||ft.h;
  M.furn.push({k:f[0],x:f[1],y:f[2],w,h,seed:(f[1]*31+f[2]*17)|0});
  if(ft.s)for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){if(!inb(f[1]+xx,f[2]+yy))continue;M.fsolid[I(f[1]+xx,f[2]+yy)]=1;if(ft.o)M.fopq[I(f[1]+xx,f[2]+yy)]=1;}}
 M.lamps=LAMPS.map(l=>({x:l[0]*TS+8,y:l[1]*TS+8,fl:l[2],col:l[3]||'#fff2d6',r:l[4]||56,on:l[2]===2?0:1,t:0,k:l[2]===2?0:1}));
 M.cams=CAMS.map(c=>({x:c[0]*TS,y:c[1]*TS,base:c[2],a:c[2],det:0,dead:false,n:c[3],on:true}));
 M.roomTiles=ROOMS.map(()=>[]);
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const r=M.room[I(x,y)];if(r>=0&&walkable(x,y))M.roomTiles[r].push([x,y]);}
}

function hospTerrain(M,set,fillR,H,V){
 fillR(3,45,76,47,T.ASPH,'asph');fillR(8,48,64,56,T.ASPH,'asph');fillR(78,2,79,56,T.ASPH,'asph');fillR(0,8,1,14,T.ASPH,'asph');fillR(65,48,77,56,T.ASPH,'asph');
 fillR(2,2,77,44,T.FLOOR,'lino');
 H(2,2,77);H(44,2,77);V(2,2,44);V(77,2,44);
 H(10,3,30);for(const x of [7,11,15,19,23,27])V(x,3,9);H(13,3,30);V(9,14,20);V(16,14,20);V(24,14,20);V(31,3,21);
 V(34,3,10);V(34,13,21);H(10,35,76);H(13,35,76);for(const x of [42,50,63])V(x,3,9);for(const x of [45,57,65,71])V(x,14,20);
 H(21,3,76);set(32,21,T.FLOOR);set(33,21,T.FLOOR);
 H(24,3,76);for(const x of [35,36,37,45,46,68,69])set(x,24,T.FLOOR);
 V(13,25,43);H(37,3,12);V(28,25,43);V(34,25,29);H(30,29,34);V(44,25,43);V(47,25,43);H(32,48,55);H(39,48,55);V(56,25,43);V(67,25,43);H(35,57,66);V(70,25,43);H(34,71,76);
 set(32,36,T.WALL);set(40,36,T.WALL);
}
function hospWindows(M,set){
 for(const x of [5,9,13,17,21,25,29,38,46,54,58,68,72])set(x,2,T.WIN);
 for(const x of [5,11,16,20,24,31,34,38,41,50,53,60,64,73])set(x,44,T.WIN);
 for(const y of [6,16,18,28,33])set(2,y,T.WIN);
 for(const y of [6,19,28,38])set(77,y,T.WIN);
 set(22,13,T.WIN);set(34,27,T.WIN);set(47,30,T.WIN);
}
let ROOMS=ROOMS_HOSP,DOORS=DOORS_HOSP,FURN=FURN_HOSP,LAMPS=LAMPS_HOSP,CAMS=CAMS_HOSP;
