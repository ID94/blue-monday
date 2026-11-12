
// ================= MISSION 03: WELFARE CHECK, APT 3B =================
const ROOMS_APT=[
 R_('Klatka schodowa',15,18,19,33,'conc'),R_('Korytarz III piętra',21,24,57,26,'lino'),
 R_('Sypialnia Ruth',30,11,36,15,'carpet'),R_('Salon 3B',30,17,36,22,'wood'),R_('Przedpokój 3B',38,17,40,22,'lino'),R_('Kuchnia 3B',42,17,47,22,'tileW'),
 R_('Pokój Gary’ego',38,11,42,15,'wood'),R_('Łazienka 3B',44,11,47,15,'tileW'),
 R_('Mieszkanie 3A',21,11,28,22,'wood'),R_('Mieszkanie 3C',49,11,57,22,'wood'),
 R_('Mieszkanie 3D',21,28,29,36,'wood'),R_('Mieszkanie 3E',31,28,43,36,'wood'),R_('Mieszkanie 3F',45,28,57,36,'wood')];
const DOORS_APT=[[39,23,1],[33,16,1],[39,16],[45,16],[24,23,1],[52,23,1],[25,27,1],[37,27,1],[50,27,1]];
const FURN_APT=[];
{const F_=(...a)=>FURN_APT.push(a);
 // klatka schodowa
 for(let y=19;y<=33;y++){F_('stairs',15,y);F_('stairs',16,y);}F_('radiator',19,19);F_('mboxes',19,22);F_('bags',19,28);F_('butts',17,23);F_('butts',18,27);F_('bottle',18,20);F_('cans',17,21);F_('needle',17,32);F_('stain',18,29);F_('snowdrift',15,31);F_('snowdrift',15,22);F_('news',19,33);F_('papers',17,26);
 // korytarz — ciasno, graty pod drzwiami
 F_('doormat',39,24);F_('doormat',52,24);F_('doormat',25,26);F_('doormat',37,26);F_('slush',21,25);F_('slush',23,26);F_('slush',29,25);F_('slush',34,24);F_('slush',44,25);
 F_('bags',27,24);F_('bags',28,24);F_('stroller',35,24);F_('bike',46,24);F_('mattressW',55,24);F_('shoerack',53,24);F_('bins',57,26);F_('radiator',31,26);F_('radiator',47,26);
 F_('butts',22,24);F_('butts',43,26);F_('bottle',57,24);F_('cans',30,25);F_('mail',38,24);F_('mail',40,25);F_('papers',33,26);F_('stain',41,25);F_('needle',56,25);F_('deadplant',49,24);F_('extbox',42,24);F_('ladder',57,25);
 // salon 3B
 F_('rug',31,18,4,3);F_('tvOld',31,17);F_('armch',32,19);F_('tableS',34,19);F_('news',30,21);F_('news',30,22);F_('news',31,22);F_('news',36,22);F_('news',36,21);F_('bags',35,17);F_('deadplant',36,17);F_('papers',33,21);F_('bottle',34,20);
 F_('radiator',30,17);F_('boxes',36,20);F_('ashtray',35,19);F_('laundry',32,22);F_('slippers',33,20);
 // przedpokój
 F_('cab',40,17);F_('shoes',38,22);F_('news',38,17);F_('umbrella',40,22);F_('fresh',35,15);F_('coats',38,18);
 // kuchnia
 F_('counter',42,17);F_('sink',43,17);F_('stove',44,17);F_('counter',46,17);F_('fridge',47,17);F_('table',44,20);F_('chair',43,20);F_('chairX',46,21);F_('dishes',42,18);F_('bags',47,22);F_('mail',44,20);F_('trash',42,22);F_('stain',45,19);F_('cans',47,21);F_('roach',43,19);F_('roach',46,19);
 // sypialnia Ruth
 F_('bedD',31,11);F_('tableS',30,11);F_('cab',36,11);F_('fresh',33,13);F_('fresh',35,14);F_('towels',33,15);F_('slippers',30,14);F_('lampFl',36,14);F_('pills',30,13);
 // pokój Gary'ego
 F_('mattress',38,11);F_('tableS',42,11);F_('cash',41,13);F_('pizza',39,14);F_('cans',42,14);F_('clothes',40,12);F_('ashtray',42,12);F_('tvOld',42,15);F_('cans',38,15);F_('bottle',40,15);
 // łazienka
 F_('tub',44,11);F_('toilet',47,11);F_('sink',47,13);F_('pills',46,14);F_('towels',45,13);F_('mold',44,15);
 // 3A — pan Feldman, kawalerka
 F_('bed',21,11);F_('cab',24,11);F_('shelf',25,11);F_('tv',27,11);F_('armch',27,14);F_('tableS',26,14);F_('rug',22,15,3,2);F_('counter',21,20);F_('stove',22,20);F_('sink',23,20);F_('fridge',24,20);F_('table',26,19);F_('chair',27,19);F_('radiator',28,17);F_('news',21,17);F_('lampFl',28,11);F_('laundry',22,18);
 // 3C
 F_('sofa',50,11);F_('tv',53,11);F_('bed',55,11);F_('cab',57,14);F_('boxes',49,14);F_('boxes',50,15);F_('table',51,18);F_('chair',50,18);F_('counter',54,21);F_('stove',55,21);F_('fridge',57,21);F_('sink',56,21);F_('bags',49,21);F_('cans',53,15);F_('radiator',57,17);
 // 3D
 F_('bed',21,34);F_('cab',24,35);F_('tv',27,29);F_('sofa',21,29);F_('tableS',23,31);F_('counter',28,34);F_('stove',29,34);F_('fridge',29,31);F_('laundry',25,32);F_('boxes',27,32);
 // 3E — rodzina, ciasno
 F_('bed',31,34);F_('bed',34,34);F_('cab',37,35);F_('sofa',39,29);F_('tv',42,29);F_('table',33,29);F_('chair',32,29);F_('chair',35,30);F_('counter',41,34);F_('stove',42,34);F_('fridge',43,31);F_('sink',43,33);F_('toys',36,32);F_('toys',31,32);F_('laundry',38,32);F_('stroller',36,29);
 // 3F
 F_('sofa',45,29);F_('tv',48,29);F_('table',46,32);F_('chair',47,32);F_('bed',54,34);F_('cab',57,30);F_('counter',50,34);F_('stove',51,34);F_('fridge',52,34);F_('boxes',55,29);F_('boxes',56,29);F_('bottle',47,31);F_('cans',49,31);F_('bags',45,35);
 // zewnątrz: zaśnieżona ulica i parking
 for(const[x,y,sd]of[[22,4,1],[30,4,2],[44,4,3],[52,4,4],[60,5,5],[24,42,6],[34,42,7],[46,42,8]])F_('snowcar',x,y);
 for(const x of[18,38,56])F_('lamp',x,8);for(const x of[20,40])F_('lamp',x,39);F_('dumpster',54,40);F_('dumpster',58,40);F_('bags',57,42);F_('hydrant',27,8);
}
const LAMPS_APT=[[25,25,1,'#d8e0b0',40],[36,25,0,'#d8e0b0',36],[47,25,2],[54,25,1,'#d8e0b0',36],[17,21,1,'#c8d0a8',38],[17,30,2],[40,13,0,'#ffb060',30],[44,19,2],[34,19,2],[32,12,2],[46,13,1,'#c8d8e0',18],
 [18,7,0,'#ffb060',70],[38,7,0,'#ffb060',70],[56,7,0,'#ffb060',70],[20,40,0,'#ffb060',60],[40,40,0,'#ffb060',60],[26,13,0,'#ffcf90',26],[33,32,0,'#e8d8b0',24]];
const ENTRIES_APT=[{n:'Klatka schodowa',s:'Trzecie piętro, Pine Court Apartments.',x:17.5,y:25.3,a:0,px:17,py:25}];
function aptTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.ASPH,'snowg');fillR(0,2,79,7,T.ASPH,'snowr');fillR(16,40,64,45,T.ASPH,'snowr');
 fillR(15,11,57,36,T.FLOOR,'wood');
 H(10,14,58);H(37,14,58);V(14,10,37);V(58,10,37);
 V(20,11,23);V(20,27,36);H(17,15,19);H(34,15,19);fillR(15,11,19,16,T.FLOOR,'conc');
 H(23,21,57);H(27,21,57);
 V(29,11,22);V(48,11,22);V(30,28,36);V(44,28,36);
 H(16,30,36);V(37,11,15);V(37,17,22);set(37,19,T.FLOOR);H(16,38,47);V(43,11,15);V(41,17,22);set(41,20,T.FLOOR);
 for(let y=24;y<=26;y++)set(20,y,T.FLOOR);}
function aptWindows(M,set){for(const x of[23,26,32,35,40,46,51,55])set(x,10,T.WIN);for(const x of[23,27,34,40,48,54])set(x,37,T.WIN);set(14,22,T.WIN);set(14,30,T.WIN);}
function aptDecor(){const face=ty=>WR[ty]&&WR[ty].getContext('2d'),r=rng(303);
 const graf=(ty,x,w,c1,c2)=>{const g=face(ty);if(!g)return;for(let i=0;i<w;i+=2){const h=2+(r()*5|0);P(g,x+i,18+(r()*3|0),2,h,c1);}P(g,x+1,20,w-2,1,c2);};
 const peel=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,6,4,'rgba(200,190,160,.35)');P(g,x+1,21,4,2,'rgba(60,50,40,.4)');P(g,x+2,17,1,6,'rgba(0,0,0,.25)');};
 const damp=(ty,x,w)=>{const g=face(ty);if(!g)return;for(let i=0;i<w;i++)P(g,x+i,16+(r()*3|0),1,3+(r()*6|0),'rgba(40,46,30,.35)');};
 const notice=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,10,8,'#c8c0a8');P(g,x+1,18,8,1,'#2a2a2a');P(g,x+1,20,6,1,'#5a5a5a');P(g,x+1,22,7,1,'#5a5a5a');P(g,x+4,17,2,1,'#c8201a');};
 const frame=(ty,x,c)=>{const g=face(ty);if(!g)return;P(g,x,17,7,8,'#5a3a20');P(g,x+1,18,5,6,c);};
 const cross=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x+2,17,1,7,'#3a2a1a');P(g,x,19,5,1,'#3a2a1a');};
 // korytarz (ściana północna, widoczna z korytarza)
 graf(23,22*TS+2,12,'#7a2a6a','#e8e030');graf(23,30*TS+4,14,'#2a6a9a','#e8e8e0');graf(23,49*TS+2,10,'#c83a2a','#1a1a1a');graf(23,56*TS,10,'#3a8a3a','#e8e8e0');
 peel(23,27*TS+4);peel(23,43*TS+6);peel(23,35*TS+2);damp(23,45*TS,18);damp(23,21*TS,14);notice(23,37*TS+2);notice(17,17*TS+2);
 graf(17,15*TS+4,10,'#c83a2a','#e8e8e0');damp(17,18*TS,10);
 // 3B: ślady życia Ruth
 frame(16,31*TS+3,'#8a7a6a');frame(16,34*TS+2,'#6a7a8a');cross(10,33*TS+5);frame(10,30*TS+6,'#9a8a7a');peel(16,36*TS);damp(10,44*TS,20);damp(16,42*TS,16);
 const g=face(16);if(g){P(g,44*TS+2,17,9,8,'#e8e4dc');P(g,44*TS+3,18,7,1,'#c8201a');for(let i=0;i<3;i++)for(let j=0;j<4;j++)P(g,44*TS+3+j*2,20+i*2,1,1,'#5a5a5a');P(g,44*TS+3,20,1,1,'#c8201a');}
 // plakaty u Gary'ego
 const gp=face(10);if(gp){P(gp,39*TS,17,8,10,'#1a1a1a');P(gp,39*TS+1,18,6,4,'#c83a2a');P(gp,40*TS+2,17,7,9,'#2a4a8a');P(gp,40*TS+3,19,5,1,'#e8e8e0');}
 // 3A, 3C, 3E — zdjęcia, kalendarze
 frame(10,25*TS+2,'#7a8a6a');frame(10,52*TS+2,'#8a6a6a');frame(10,56*TS+2,'#6a6a8a');}
// props — obskurny blok
F('radiator',1,1,1,0,(g,x,y)=>{P(g,x+1,y+12,14,3,SH);P(g,x+1,y+1,14,11,'#8a8678');for(let i=2;i<14;i+=2)P(g,x+i,y+2,1,9,'#6a665a');P(g,x+1,y+1,14,1,'#a8a494');P(g,x+3,y+11,3,2,'rgba(120,70,30,.6)');P(g,x+10,y+5,2,3,'rgba(120,70,30,.5)');});
F('mboxes',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#6a6e62');for(let j=0;j<4;j++)for(let i=0;i<3;i++){P(g,x+2+i*4,y-9+j*6,3,5,'#4a4e44');P(g,x+3+i*4,y-8+j*6,1,1,'#a8a89a');}P(g,x+6,y-3,3,5,'#1a1a1a');P(g,x+10,y+3,3,2,'#e8e4d8');});
F('butts',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<6;i++){const a=(r()*13|0)+1,b=(r()*12|0)+2;P(g,x+a,y+b,2,1,'#d8d0b8');P(g,x+a+2,y+b,1,1,'#c87a3a');}P(g,x+6,y+7,3,2,'rgba(40,40,40,.35)');});
F('needle',1,1,0,0,(g,x,y)=>{P(g,x+4,y+8,7,1,'#d8e0e8');P(g,x+4,y+8,2,1,'#e8a020');P(g,x+11,y+8,3,1,'#a8b0b8');P(g,x+8,y+11,2,2,'rgba(110,20,20,.6)');P(g,x+2,y+5,3,1,'#c8c8c8');});
F('snowdrift',1,1,0,0,(g,x,y)=>{P(g,x,y+4,9,9,'rgba(220,230,240,.55)');P(g,x,y+6,6,5,'rgba(240,246,252,.65)');P(g,x+9,y+8,3,3,'rgba(200,215,230,.4)');});
F('stroller',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,13,3,SH);P(g,x+3,y+3,10,7,'#2a3a5a');P(g,x+3,y+1,6,4,'#1e2a42');P(g,x+12,y-1,1,8,'#8a8e92');P(g,x+11,y-1,3,1,'#2a2a2a');for(const wx of[3,11])P(g,x+wx,y+10,3,3,'#141414');});
F('mattressW',1,1,1,1,(g,x,y)=>{P(g,x+1,y+13,15,2,SH);P(g,x+2,y-12,12,26,'#b8ae98');P(g,x+3,y-11,10,24,'#c8bea8');P(g,x+4,y-4,7,6,'rgba(110,80,40,.45)');P(g,x+5,y+6,5,4,'rgba(80,60,40,.35)');for(let i=-10;i<12;i+=4)P(g,x+3,y+i,10,1,'#b0a690');});
F('shoerack',1,1,1,0,(g,x,y)=>{P(g,x+1,y+12,14,3,SH);P(g,x+1,y+4,14,9,'#5a4a3a');P(g,x+2,y+8,12,1,'#3a2a1e');for(const[i,c]of[[2,'#2a2a2a'],[6,'#8a2a2a'],[10,'#d8d8d0']]){P(g,x+i,y+5,3,2,c);P(g,x+i,y+9,3,2,c);}});
F('extbox',1,1,1,1,(g,x,y)=>{P(g,x+3,y-6,10,16,'#a82018');P(g,x+4,y-5,8,14,'#1a1214');P(g,x+5,y-4,6,4,'rgba(200,220,230,.3)');P(g,x+7,y-1,2,1,'#c8c8c8');P(g,x+4,y+4,8,1,'#e8e4dc');});
F('boxes',1,1,1,0,(g,x,y,w,h,s)=>{P(g,x+1,y+12,14,3,SH);P(g,x+1,y+4,9,9,'#a88a5a');P(g,x+1,y+4,9,1,'#c8a878');P(g,x+5,y+4,1,9,'#c8a878');P(g,x+7,y-2,8,8,'#9a7c4c');P(g,x+7,y-2,8,1,'#b89a6a');P(g,x+8,y+1,5,1,'#5a4a3a');if(s%2)P(g,x+2,y+8,5,2,'#e8e4d8');});
F('coats',1,1,1,1,(g,x,y)=>{P(g,x+1,y+13,14,2,SH);P(g,x+1,y-8,14,1,'#6a5040');for(const[i,c]of[[2,'#3a3a4a'],[6,'#6a2a2a'],[10,'#4a4030']]){P(g,x+i,y-7,4,14,c);P(g,x+i+1,y-7,2,2,shade(c,20));}});
F('roach',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<3;i++){const a=(r()*12|0)+2,b=(r()*12|0)+2;P(g,x+a,y+b,2,1,'#3a2210');P(g,x+a,y+b+1,1,1,'#2a180a');}});
F('mold',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<14;i++)P(g,x+(r()*14|0),y+(r()*14|0),2,1,'rgba(30,40,20,.5)');});
F('toys',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<4;i++)P(g,x+2+(r()*10|0),y+3+(r()*9|0),3,3,['#e8b020','#c8302a','#2a6ac8','#3a9a4a'][i]);});
F('dumpster',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,3,SH);P(g,x+1,y,30,13,'#2a4a3a');P(g,x+1,y,30,2,'#3a5a4a');P(g,x,y-2,32,3,'#1e3a2c');P(g,x+2,y-3,28,2,'rgba(230,238,246,.9)');P(g,x+4,y+5,8,4,'#4a6a5a');P(g,x+20,y+4,8,1,'#1a2a20');});
F('snowcar',3,2,1,0,(g,x,y,w,h,s)=>{if(FT.car)FT.car.d(g,x,y,w,h,s);const r=rng(s);P(g,x+14,y+3,18,7,'rgba(236,242,250,.95)');P(g,x+4,y+7,8,6,'rgba(230,238,246,.9)');P(g,x+36,y+7,8,6,'rgba(230,238,246,.9)');for(let i=0;i<10;i++)P(g,x+3+(r()*42|0),y+6+(r()*14|0),2,1,'rgba(240,246,252,.8)');P(g,x+2,y+26,46,2,'rgba(230,238,246,.7)');});
Object.assign(FH,{mboxes:10,radiator:3,mattressW:12,extbox:0,boxes:6,coats:10,dumpster:6,snowcar:0,stroller:4,shoerack:4});
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
const APT={tv:{x:31*TS+8,y:17*TS+8},body:{x:32*TS+8,y:12*TS+8},door:{x:39*TS+8,y:23*TS+8},mdoor:{x:33*TS+8,y:16*TS+8},a3:{x:24*TS+8,y:23*TS+8},stairs:{x:16*TS+8,y:30*TS+8}};
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
 const s=mkNPC({tx:23,ty:25,kind:'janitor',pal:{...PAL.janitor},state:'idle',a:Math.PI,name:'Alvarez'});G.h.sup=s;
 const b=new Unit({team:'civ',kind:'corpse',pal:{body:'#8a7a9a',legs:'#6a5a7a',head:'#9a8a7a',face:'#9a8a7a',visor:'#2a1a12',hair:'#c8c8c0',eyes:1},r:4});b.alive=false;b.pose='dead';b.deathT=9;b.fallA=-Math.PI/2;b.mseed=17;b.x=APT.body.x;b.y=APT.body.y;G.units.push(b);
 const DP={body:'#5a4a3a',legs:'#3a3428',hair:'#8a8a80',head:'#c49a88',face:'#c49a88',visor:'#2a1a12',eyes:1},JP={body:'#3a4a3a',legs:'#2a2a30',hair:'#2a1e14',head:'#b8a090',face:'#b8a090',visor:'#2a1a12',eyes:1};
 G.h.drunk=mkNPC({tx:18,ty:20,kind:'drunk',pal:DP,state:'calm',pose:'sit',a:Math.PI/2,name:'WALT (PIJANY)',upd:drunkUpd});G.h.drunk.noCuffMsg=1;
 G.h.junk=mkNPC({tx:18,ty:32,kind:'junkie',pal:JP,state:'calm',pose:'kneel',a:-Math.PI/2,name:'TREY',upd:junkUpd});G.h.junk.noCuffMsg=1;
 G.police=[];logEv('Beat 1123: sprawdzenie, Pine Court, mieszkanie 3B');
 setTimeout(()=>{radio('DISPATCH','Beat 1123, Pine Court Apartments, trzecie piętro, mieszkanie 3B. Sprawdzenie stanu lokatorki, Ruth Hensley, siedemdziesiąt osiem lat.');radio(G.p1.name,'Przyjąłem, jesteśmy na klatce.',{radio:1});},600);}
const DRUNK_L=['...zamknij te drzwi... wieje...','Szef... masz dolara? Na tramwaj...','Kiedyś... kiedyś tu był porządny dom...','Ciii... nie budź mojej żony... ona śpi... od dziewięćdziesiątego ósmego...'];
function drunkUpd(c,dt){moveUnit(c,dt,0,0,0);c.pose=c.state==='cuffed'?'kneel':'sit';c.wT=(c.wT||rand(6,12))-dt;if(c.wT<=0){c.wT=rand(14,24);if(anySquadNear(c.x,c.y,TS*6))say('WALT (PIJANY)',pick(DRUNK_L));}turnTo(c,Math.PI/2+Math.sin(G.time*.3)*.6,dt,.6);}
function junkUpd(c,dt){moveUnit(c,dt,0,0,0);if(c.state==='cuffed'){c.pose='kneel';return;}if(c.state==='leave'){c.pose='stand';if(npcGo(c,dt,15,33,40)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}return;}
 c.pose='kneel';c.jT=(c.jT||0)-dt;if(c.jT<=0){c.jT=rand(.4,1.6);c.jA=c.ang+rand(-1.2,1.2);}turnTo(c,c.jA||c.ang,dt,4);
 const H=G.h,g=H.gary;if(g&&g.alive&&H.gStage==='walk'&&!H.said.jg&&dist(g.x,g.y,c.x,c.y)<TS*3){H.said.jg=1;say('TREY','Gary... Gary, masz coś dla mnie? Tylko jedną...');say('GARY HENSLEY','Nie teraz, Trey. Spadaj.');}}
function drunkMenu(u){const H=G.h,d=H.drunk,it=[];
 if(!H.said.dr1)it.push({t:'„Mieszka pan tutaj?”',f:()=>{H.said.dr1=1;say(u.name,'Mieszka pan tutaj?');say('WALT (PIJANY)','Czwarte piętro... albo drugie. Dzisiaj mieszkam tu. Na schodach cieplej niż na dworze, hehe.');}});
 if(!H.said.dr2)it.push({t:'„Zna pan Ruth Hensley z 3B?”',f:()=>{H.said.dr2=1;say(u.name,'Zna pan Ruth Hensley z trzy B?');say('WALT (PIJANY)','Ruth... Ruth dawała mi kanapki. Dawno jej nie widziałem... od wiosny? Jej synek nosi torby co czwartek. Kazał mi się nie kręcić pod ich drzwiami.');logEv('Walt: Ruth niewidziana od wiosny, Gary przynosi zakupy w czwartki');H.nf++;}});
 it.push({t:'„Proszę iść do schroniska, zamarznie pan.”',f:()=>{say(u.name,'Jest minus czternaście. Mogę zadzwonić po transport do schroniska.');say('WALT (PIJANY)','Schronisko... tam kradną buty. Zostanę tu, szefie. Dzięki.');}});
 choiceMenu('Walt — pijany, na półpiętrze',it);}
function junkMenu(u){const H=G.h,j=H.junk,it=[];
 if(!H.said.j1)it.push({t:'„Wszystko w porządku?”',f:()=>{H.said.j1=1;say(u.name,'Hej. Wszystko w porządku?');say('TREY','Spoko, spoko... tylko odpoczywam. Nic nie robię, serio.');}});
 if(!H.said.j2)it.push({t:'„Pokaż ręce. Co masz przy sobie?”',f:()=>{H.said.j2=1;say(u.name,'Pokaż ręce. Powoli.');say('TREY','...To tylko igła. Nowa. Nic więcej nie mam, przysięgam.');logEv('Trey: strzykawka, ślady wkłuć na przedramieniu');}});
 if(H.said.j2&&!H.said.j3)it.push({t:'„Kto ci sprzedaje w tym budynku?”',f:()=>{H.said.j3=1;say(u.name,'Kto ci sprzedaje w tym budynku? Nie interesujesz mnie ty.');say('TREY','...Gary. Z trzy B. Ma oksy, prawdziwe, z apteki. Na receptę jakiejś babci. Tanio.');logEv('Trey: Gary z 3B sprzedaje oksykodon na receptę matki');H.nf++;H.oxy=true;}});
 it.push({t:'„Zbieraj się stąd.”',f:()=>{say(u.name,'Zbieraj się stąd. I wyrzuć to do pojemnika, nie na schody.');say('TREY','Dobra, dobra... idę.');j.state='leave';j.path=null;logEv('Trey opuszcza klatkę');}});
 choiceMenu('Trey — na schodach',it);}
function aptInteract(u){const H=G.h;if(!H)return null;
 if(H.drunk&&H.drunk.alive&&H.drunk.state==='calm'&&nearPt(u,H.drunk.x,H.drunk.y,24))return{k:'house',label:'Rozmowa z pijanym',dur:0,f:drunkMenu};
 if(H.junk&&H.junk.alive&&H.junk.state==='calm'&&nearPt(u,H.junk.x,H.junk.y,24))return{k:'house',label:'Rozmowa z ćpunem',dur:0,f:junkMenu};const d=LV.doorAt[I(39,23)],md=LV.doorAt[I(33,16)];
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
function spawnGary(){const H=G.h;if(H.gary||G.ended)return;const g=mkNPC({tx:16,ty:32,kind:'suspect',pal:{body:'#5a5a4a',legs:'#33332e',head:'#c4a088',face:'#c4a088',visor:'#2a1a12',hair:'#4a3a2a',skin:'#c4a088',eyes:1},state:'gwalk',a:0,name:'Gary Hensley',upd:updateGary});
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
 else if(H.gStage==='flee'){npcGo(c,dt,15,33,52);if(dist(c.x,c.y,15*TS+8,33*TS+8)<10&&!G.ended)endMission(false,'Gary Hensley uciekł schodami.');}}
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
 patrolDebrief([['Notatki z miejsca',(H.nf||0)+' / '+CLUES_APT.length],['Wejście do 3B',LV.doorAt[I(39,23)]&&LV.doorAt[I(39,23)].broken?'siłą':'—'],['Sypialnia',H.key?'otwarta kluczykiem':H.body?'wyważona':'—'],['Rozmowy na klatce',[H.said.dr2?'Walt':'',H.said.j3?'Trey (oksykodon)':''].filter(Boolean).join(', ')||'—'],['Gary Hensley',!g?'—':!g.alive?'nie żyje':g.state==='cuffed'?'zatrzymany':'zbiegł']],sc);}
LVL.apt={id:'apt',patrol:true,sounds:true,weather:'snow',crew:{names:['OFC. NOWAK','OFC. BROOKS'],uni:{body:'#7f96b4',legs:'#161c28',acc:'#d8d8d8'}},car:{s:'#2a5ab0'},ext:'brick',terrain:aptTerrain,windows:aptWindows,rooms:ROOMS_APT,doors:DOORS_APT,furn:FURN_APT,lamps:LAMPS_APT,cams:[],entries:ENTRIES_APT,
 decor:aptDecor,start:startApt,update:updateApt,interact:aptInteract,render:aptRender,stress:aptStress,obj:aptObj,debrief:aptDebrief,
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n==='Klatka schodowa'?['#4e5644','#343a2c']:n.startsWith('Korytarz')?['#5e5a48','#3e3a2e']:n.includes('Ruth')?['#6a5e6a','#4a3e4a']:n.includes('Gary')?['#4e5248','#34382e']:n.includes('Kuchnia')?['#7a7458','#54503a']:n.includes('Łazienka')?['#7a8688','#5a6668']:['#6a5e4a','#4a4032'];},
 win:'Beat 1123, przyjęłam. Koroner i detektywi są w drodze.',planTitle:'PINE COURT APARTMENTS · III PIĘTRO',
 nb:{no:'#26-121-0388',pri:'P4',code:'WELFARE',small:'ADRES',addr:'PINE COURT APTS<br>MIESZKANIE 3B',facts:[['JEDNOSTKA','Beat 1123 · Ofc. Nowak, Ofc. Brooks'],['GODZINA','23:10 · śnieg, −14°C'],['LOKATORKA','Ruth Hensley, 78 l.']],
  title:'911 · ZAPIS ROZMOWY',clock:[23,4,8],who:{D:'DYSPOZYTOR',C:'ZGŁASZAJĄCA'},bg:[10,18,30,16.9],
  call:[['D','Chicago, numer alarmowy. W czym mogę pomóc?'],['C','Dzwonię z Portland. Chodzi o moją mamę, Ruth Hensley. Pine Court, mieszkanie 3B.'],['D','Co się dzieje?'],['C','Nie mogę się do niej dodzwonić od tygodnia. Właściwie... od dawna z nią nie rozmawiałam. Brat mówi, że ma demencję i nie podchodzi do telefonu.'],['D','Brat mieszka z nią?'],['C','Gary... chyba tak. Odkąd stracił pracę. Ode mnie już nie odbiera.'],['D','Wyślemy patrol, żeby sprawdził, czy wszystko w porządku.'],['C','Proszę. Coś jest nie tak. Czuję to.']]}};
