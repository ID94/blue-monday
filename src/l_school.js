
// ================= MISSION 06: MILLBROOK HIGH SCHOOL — ACTIVE SHOOTER =================
// Parter: x14..63, y22..36 (fasada od południa). Piętro: osobny region x14..63, y1..16, łączony klatkami schodowymi.
const SC={gf:{x0:14,y0:22,x1:63,y1:36},uf:{x0:14,y0:1,x1:63,y1:16},
 stairs:[{gx:16.5,gy:33,ux:16.5,uy:4,n:'zachodnia'},{gx:60.5,gy:33,ux:60.5,uy:13,n:'wschodnia'}],
 stations:[[18,15],[28,15],[40,15],[51,15],[16,15],[20,14],[24,14],[32,15],[37,15],[42,15],[47,15],[55,15],[57,14]],
 gfWin:[16,18,21,23,26,28,30,32,46,50,54,56,60,62],ufWin:[16,18,20,24,26,28,30,32,37,39,41,47,49,51,53,55,60],
 strobes:[[20,29],[32,30],[44,29],[56,30],[22,8],[38,9],[52,8],[38,34]],trunk:{x:44.2,y:46.9},
 trees:[[17,40],[22,41],[29,39],[48,40],[55,39],[60,41],[3,42],[10,42],[73,36],[78,30]],phones:[[22,30],[49,30],[33,9],[41,13],[56,29]],flick:[[30,29],[44,8]]};
const ROOMS_SCHOOL=[
 R_('Korytarz parteru',15,29,62,30,'schc'),R_('Hol główny',34,32,43,35,'schc'),
 R_('Sala 101',15,23,21,27,'schl'),R_('Sala 102',23,23,29,27,'schl'),R_('Pracownia plastyczna',31,23,37,27,'schl'),R_('Sala 103',39,23,45,27,'schl'),R_('Sala 104',47,23,54,27,'schl'),R_('Sala 105',56,23,62,27,'schl'),
 R_('Klatka zachodnia',15,32,18,35,'conc'),R_('Gabinet pielęgniarki',20,32,23,35,'schl'),R_('Sekretariat',25,32,32,35,'schb'),R_('Toaleta chłopców',45,32,47,35,'tileW'),R_('Toaleta dziewcząt',49,32,51,35,'tileW'),R_('Stołówka',53,32,57,35,'schk'),R_('Klatka wschodnia',59,32,62,35,'conc'),
 R_('Korytarz piętra',15,8,62,9,'schc'),
 R_('Klatka zachodnia (piętro)',15,2,18,6,'conc'),R_('Sala 201',20,2,27,6,'schl'),R_('Sala 202',29,2,36,6,'schl'),R_('Sala 203',38,2,45,6,'schl'),R_('Sala 204',47,2,54,6,'schl'),R_('Sala 205',56,2,62,6,'schl'),
 R_('Sala 206',15,11,21,15,'schl'),R_('Biblioteka',23,11,34,15,'schb'),R_('Sala 207',36,11,43,15,'schl'),R_('Pracownia chemiczna',45,11,57,15,'schl'),R_('Klatka wschodnia (piętro)',59,11,62,15,'conc')];
const DOORS_SCHOOL=[
 [38,36,0,1],[39,36,0,1],[14,29],[63,29],
 [18,28],[26,28],[34,28],[42,28],[50,28],[59,28,1],
 [17,31],[21,31],[27,31],[46,31],[50,31],[55,31],[60,31],
 [17,7],[23,7],[32,7,1],[41,7,1],[50,7,1],[59,7],
 [18,10],[25,10],[32,10],[39,10],[47,10],[53,10],[60,10]];
const FURN_SCHOOL=[];
{const F_=(...a)=>FURN_SCHOOL.push(a),r=rng(606);
 // sala: ławki w dwóch rzędach, przejście przy drzwiach, biurko nauczyciela przy tablicy
 const classroom=(x0,y0,x1,y1,rows,doorX,messy)=>{for(const yy of rows)for(let x=x0+1;x<=x1-1;x+=2){if(Math.abs(x-doorX)<1)continue;if(messy&&r()<.25){F_('chairX',x,yy);continue;}F_('sdesk',x,yy);}
  const tx=doorX<(x0+x1)/2?x1-1:x0;F_('desk',tx,y0);if(r()<.7)F_('bkpk',x0+1+(r()*(x1-x0-2)|0),rows[0]+1);F_('trash',doorX<(x0+x1)/2?x0:x1,y0);};
 // parter
 classroom(15,23,21,27,[24,26],18);classroom(23,23,29,27,[24,26],26,1);classroom(39,23,45,27,[24,26],42);classroom(47,23,54,27,[24,26],50,1);classroom(56,23,62,27,[24,26],59);
 F_('tableL',31,24);F_('easel',36,23);F_('easel',35,26);F_('shelf',37,25);F_('paint',32,26);F_('kiln',31,26);
 F_('stairs',15,34);F_('stairs',16,34);F_('stairs',17,34);F_('stairs',60,34);F_('stairs',61,34);F_('stairs',62,34);
 F_('bed',20,33);F_('medshelf',23,32);F_('chair',22,35);F_('cooler',23,35);
 F_('reception',26,33);F_('deskPC',30,32);F_('cab',32,32);F_('cab',32,33);F_('copier',25,35);F_('plant',32,35);F_('chairX',29,34);F_('papers',30,34);F_('mailbx',25,32);
 F_('trophy',34,32);F_('benchL',40,32);F_('plant',43,32);F_('plant',34,35);F_('bkpk',36,34);F_('papers',41,33);F_('glass',38,35);F_('glass',39,35);F_('wetsign',42,34);
 F_('toilet',45,32);F_('toilet',47,32);F_('sink',47,35);F_('toilet',49,32);F_('toilet',51,32);F_('sink',51,35);
 F_('serve',53,32);F_('serve',54,32);F_('tableL',53,34);F_('vending',57,32);F_('trash',57,35);F_('tray',55,35);
 for(const[x,y]of[[20,30],[29,29],[37,30],[48,29],[53,30]])F_('bkpk',x,y);for(const[x,y]of[[24,30],[33,29],[45,30],[57,29]])F_('papers',x,y);
 for(const[x,y]of[[22,29],[31,30],[49,29]])F_('stain',x,y);for(const[x,y]of[[30,29],[31,29],[47,30],[48,30],[54,29]])F_('shell',x,y);F_('drag',39,30);
 // piętro
 F_('stairs',15,3);F_('stairs',16,3);F_('stairs',17,3);F_('stairs',60,12);F_('stairs',61,12);F_('stairs',62,12);
 classroom(20,2,27,6,[3,5],23);classroom(29,2,36,6,[3,5],32,1);classroom(38,2,45,6,[3,5],41);classroom(47,2,54,6,[3,5],50);classroom(56,2,62,6,[3,5],59,1);
 classroom(15,11,21,15,[12,14],18,1);classroom(36,11,43,15,[12,14],39,1);
 for(const x of[23,27,29,34])F_('bshelf',x,11);F_('tableL',26,13);F_('tableL',30,13);F_('deskPC',33,14);F_('chairX',24,14);F_('papers',29,14);F_('rug',27,15,3,1);
 for(const x of[45,49,54])F_('labt',x,12);F_('labt',45,14);F_('labt',49,14);F_('labt',54,14);F_('hood',57,11);F_('glass',52,15);
 for(const[x,y]of[[26,8],[35,9],[46,8],[55,9]])F_('bkpk',x,y);for(const[x,y]of[[30,9],[43,8],[57,8]])F_('stain',x,y);
 for(const[x,y]of[[17,15],[19,15],[27,14],[29,15],[39,15],[41,14],[50,15],[52,14]])F_('shell',x,y);for(const[x,y]of[[16,15],[26,15],[38,15],[48,15]])F_('glass',x,y);
 // zewnątrz: front szkoły — rabaty, plac wejściowy, trawnik
 F_('ssign',25,41);F_('flagp',44,38);F_('brack',33,38);F_('bench',41,39);F_('trash',36,39);F_('trash',43,40);F_('plant',34,37);F_('plant',43,37);
 for(const[x,y]of SC.trees)F_('tree',x,y);for(const x of[16,21,24,31,46,49,54,57,61])F_('bush',x,37);
 for(const[x,y]of[[34,40],[52,41],[42,42],[23,39],[30,40]])F_('bkpk',x,y);F_('phoneL',38,41);F_('phoneL',56,39);F_('shoe',47,41);F_('shoe',27,42);F_('papers',45,40);F_('papers',20,42);
 for(const x of[6,22,56,74])F_('lamp',x,43);for(const x of[30,62])F_('lamp',x,53);F_('hydrant',35,44);F_('hydrant',62,44);F_('szsign',12,44);F_('szsign',66,51);
 // parking nauczycieli (zachód)
 for(const[x,y]of[[1,24],[1,28],[1,34],[1,38],[9,24],[9,30],[9,36]])F_('car',x,y);F_('stain',6,30);F_('stain',3,32);
 // zatoka autobusowa i punkt medyczny (wschód)
 F_('sbus',66,24);F_('sbus',72,24);F_('sbus',72,28);F_('ambul',66,32);F_('ambul',72,32);
 F_('tarp2',70,38);F_('tarp2',74,38);F_('gurney',70,40);F_('gurney',74,40);F_('medbag',69,39);F_('medbag',73,41);F_('medbag',77,39);F_('cone',68,37);F_('cone',68,42);
 // ulica: radiowozy, blokady, wóz strażacki
 F_('police',30,45);F_('police',44,46);F_('police',52,45);F_('police',8,46);F_('police',60,48);F_('firetr',68,47);
 for(const y of[45,47,49])F_('barr',6,y),F_('barr',77,y);F_('cone',24,44);F_('cone',26,44);F_('cone',58,44);F_('cone',36,51);F_('cone',50,51);
 F_('tvvan',1,45);F_('tvvan',1,48);
 // druga strona ulicy: taśma, gapie, sztab, ogródki
 for(let x=0;x<80;x++)if(x!==40&&x!==41)F_('ptape',x,52);F_('camtri',10,53);F_('ctent',64,53);
 for(let x=0;x<80;x+=1)if(x%13!==6&&x%13!==7)F_('pfence',x,55);for(const[x,y]of[[10,56],[30,56],[50,56],[70,56],[20,57],[60,57]])F_('tree',x,y);for(const x of[3,16,24,36,44,57,76])F_('bush',x,56);}
const LAMPS_SCHOOL=[];for(const x of[18,30,42,54])LAMPS_SCHOOL.push([x,29,x===30?1:0,'#f4f8ff',46],[x,8,x===42?1:0,'#f4f8ff',46]);LAMPS_SCHOOL.push([38,34,0,'#f4f8ff',60],[55,34,0,'#f4f8ff',50],[28,33,0,'#fff4d8',50]);
const ENTRIES_SCHOOL=[{n:'Przy radiowozie',s:'Ulica przed szkołą.',x:42,y:48.6,a:-Math.PI/2,px:42,py:48,drawn:1}];
function schoolTerrain(M,set,fillR,H,V){fillR(0,0,79,57,T.GRASS,'lawn');
 fillR(1,23,11,41,T.ASPH,'pklot');fillR(4,42,7,44,T.ASPH,'road');fillR(65,23,78,35,T.ASPH,'pklot');fillR(65,36,67,44,T.ASPH,'road');
 fillR(14,37,63,37,T.GRASS,'mulch');fillR(33,37,44,39,T.ASPH,'plaza');fillR(37,40,40,42,T.ASPH,'plaza');fillR(12,28,13,30,T.ASPH,'plaza');fillR(64,28,64,30,T.ASPH,'plaza');
 fillR(0,43,79,44,T.ASPH,'walk');fillR(0,45,79,50,T.ASPH,'road');fillR(0,51,79,54,T.ASPH,'walk');
 const G1=SC.gf,G2=SC.uf;fillR(G1.x0+1,G1.y0+1,G1.x1-1,G1.y1-1,T.FLOOR,'schl');fillR(G2.x0+1,G2.y0+1,G2.x1-1,G2.y1-1,T.FLOOR,'schl');
 H(22,14,63);H(36,14,63);V(14,22,36);V(63,22,36);H(28,15,62);H(31,15,33);H(31,44,62);for(const x of[22,30,38,46,55])V(x,23,27);for(const x of[19,24,33,44,48,52,58])V(x,32,35);
 H(1,14,63);H(16,14,63);V(14,1,16);V(63,1,16);H(7,15,62);H(10,15,62);for(const x of[19,28,37,46,55])V(x,2,6);for(const x of[22,35,44,58])V(x,11,15);
 H(21,0,14);H(21,63,79);fillR(0,17,79,20,T.GRASS,'grass');}
function schoolWindows(M,set){for(const x of SC.gfWin)set(x,36,T.WIN);for(const x of[35,36,41,42])set(x,36,T.WIN);set(33,33,T.WIN);set(33,34,T.WIN);
 for(const x of SC.ufWin)set(x,16,T.WIN);for(const x of[17,24,26,33,40,43,50,52,59,61])set(x,1,T.WIN);}
// ---------- pojazdy 2.5D ----------
function veh(g,x,y,o){const L=o.L,W=o.W||19,Y0=y+(o.oy==null?3:o.oy),rh=o.rh||3,b=o.b,E=o.e||b,GL='#141c24',GR='#40607a';
 const T=(dx,dy,w,h,c)=>P(g,x+dx,Y0+dy,w,h,c),R=(dx,dy,w,h,c)=>P(g,x+dx,Y0-rh+dy,w,h,c);
 P(g,x+2,Y0+W+1,L,3,SH);P(g,x+5,Y0+W+4,L-6,1,'rgba(0,0,0,.15)');
 T(2,W-2,L-4,3,shade(b,-42));T(1,W-2,1,2,shade(E,-42));T(L-2,W-2,1,2,shade(E,-42));T(2,W+1,L-4,1,'#141416');
 if(o.stripe)T(3,W-1,L-6,1,o.stripe);
 for(const wx of o.wh){T(wx,W-1,8,4,'#08080a');T(wx+3,W,2,2,'#7a7e84');}
 T(2,0,L-4,W-2,b);T(1,1,L-2,W-4,b);T(3,0,L-6,1,shade(b,22));T(1,W-3,L-2,1,shade(b,-22));
 if(o.e){T(1,1,o.ee||9,W-4,E);T(L-(o.ef||12),1,o.ef||12,W-4,E);}
 T(L-2,1,1,3,'#f6f2dc');T(L-2,W-5,1,3,'#f6f2dc');T(L-1,2,1,1,'#fff');T(L-1,W-4,1,1,'#fff');T(0,1,1,3,'#b01e18');T(0,W-5,1,3,'#b01e18');
 if(o.box){const[b0,b1]=o.box,bc=o.bc||b;R(b0,-3,b1-b0,W-2,bc);R(b0,-3,b1-b0,1,shade(bc,24));T(b0,W-5,b1-b0,3,shade(bc,-30));R(b1-1,-3,1,W-2,shade(bc,-14));}
 if(o.cab){const[c0,c1]=o.cab;for(let i=0;i<4;i++)T(c1+i,1+(3-i>0?0:0),1,W-4,GL);T(c1+1,2,1,3,GR);if(!o.box){T(c0-3,2,3,W-6,GL);T(c0-2,3,1,2,GR);}
  R(c0-1,W-5,c1-c0+2,3,GL);R(c0+2,W-5,3,1,GR);R(c0,1,c1-c0,W-6,o.r||shade(b,6));R(c0,1,c1-c0,1,shade(o.r||b,22));R(c0,W-6,c1-c0,1,shade(o.r||b,-18));}
 if(o.ex)o.ex(T,R,Y0);}
const CARC=['#2e3440','#6a2a2a','#2e4a3a','#8a8a86','#c8c8c4','#1e2a4a','#5a4a3a','#3a3a3a'];
F('car',3,2,1,0,(g,x,y,w,h,s)=>veh(g,x,y+5,{L:46,b:CARC[s%CARC.length],cab:[14,29],wh:[6,32]}));
F('suv',3,2,1,0,(g,x,y,w,h,s)=>veh(g,x,y+5,{L:48,b:['#1a1a1c','#4a5a6a','#e0e0dc'][s%3],cab:[10,32],rh:4,wh:[6,34],ex:(T,R)=>{R(12,-1,18,1,'#3a3a3a');R(12,13,18,1,'#3a3a3a');}}));
F('van',4,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:60,b:'#e4e4e0',box:[2,44],cab:[44,50],wh:[8,44],ex:(T)=>{T(48,8,4,4,'#c8c8c4');}}));
F('ambul',4,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:62,b:'#f0f0ec',box:[2,44],bc:'#f4f4f0',cab:[45,52],stripe:'#c82018',wh:[8,46],rh:3,ex:(T,R)=>{R(4,4,38,2,'#c82018');R(18,6,8,8,'#2a5ab0');R(21,7,2,6,'#ffffff');R(19,9,6,2,'#ffffff');R(45,-3,6,2,'#c82018');R(45,14,6,2,'#2a5ab0');T(2,9,1,3,'#f0a020');}}));
F('sbus',5,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:80,b:'#e8b018',box:[2,72],bc:'#f0b81c',cab:[72,74],stripe:'#1a1a1a',wh:[10,60],ex:(T,R)=>{for(let i=0;i<8;i++)R(6+i*8,13,6,3,'#1a2a3a');R(3,-1,68,1,'#1a1a1a');R(3,5,68,1,'#c8901a');T(76,2,3,15,'#1a1a1a');T(0,6,1,2,'#c8201a');}}));
F('tvvan',4,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:60,b:'#e8e8e4',box:[2,44],cab:[44,50],wh:[8,44],ex:(T,R)=>{R(6,8,30,5,'#1e4aa8');R(8,9,10,3,'#ffffff');R(20,9,2,3,'#e8c040');R(24,9,10,3,'#c8201a');R(16,-12,2,12,'#8a8e92');R(10,-18,14,7,'#d8dcdc');R(12,-16,10,3,'#a8acac');R(30,2,8,5,'#9a9ea2');}}));
// ---------- rekwizyty ----------
F('sdesk',1,1,1,0,(g,x,y,w,h,s)=>{P(g,x+2,y+12,12,3,SH);P(g,x+2,y+3,12,7,'#c8aa78');P(g,x+2,y+3,12,1,'#e0c494');P(g,x+3,y+10,1,4,'#6a6e72');P(g,x+12,y+10,1,4,'#6a6e72');P(g,x+4,y+11,8,4,'#3a5a8a');P(g,x+4,y+11,8,1,'#4a6a9a');if(s%3===0){P(g,x+5,y+5,4,3,'#f0f0e8');P(g,x+10,y+4,1,4,'#e8c040');}});
F('bkpk',1,1,0,0,(g,x,y,w,h,s)=>{const c=['#2a4a8a','#8a2a3a','#2a6a4a','#5a2a6a','#c86a1a','#2a2a2a'][s%6];P(g,x+4,y+11,9,2,SH);P(g,x+4,y+5,8,7,c);P(g,x+5,y+4,6,2,shade(c,-20));P(g,x+5,y+8,6,3,shade(c,15));P(g,x+7,y+5,2,1,'#c8c8c8');});
F('shell',1,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s);for(let i=0;i<2;i++){const a=(r()*12|0)+2,b=(r()*10|0)+3;P(g,x+a,y+b,2,1,'#c82a1a');P(g,x+a+2,y+b,1,1,'#c8a040');}});
F('tray',1,1,0,0,(g,x,y)=>{P(g,x+3,y+5,10,7,'#a8a49a');P(g,x+4,y+6,3,3,'#c86a3a');P(g,x+8,y+6,4,2,'#e8d8a8');P(g,x+8,y+9,3,2,'#6a8a3a');});
F('easel',1,1,1,0,(g,x,y)=>{P(g,x+4,y+12,9,3,SH);P(g,x+4,y-6,1,19,'#8a6a3a');P(g,x+11,y-6,1,19,'#8a6a3a');P(g,x+3,y-8,11,9,'#f0ece0');P(g,x+5,y-6,4,3,'#3a7ac8');P(g,x+8,y-4,4,3,'#e8a040');});
F('kiln',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,12,3,SH);P(g,x+2,y+1,12,12,'#8a8e92');P(g,x+2,y+1,12,2,'#a8acb0');P(g,x+4,y+5,8,5,'#3a3e42');P(g,x+11,y+3,2,1,'#e8601a');});
F('copier',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,14,2,SH);P(g,x+1,y+1,14,12,'#d8d8d0');P(g,x+1,y+1,14,2,'#eeeee8');P(g,x+3,y+4,10,3,'#5a5e62');P(g,x+11,y+9,2,1,'#3ac85a');});
F('cooler',1,1,1,0,(g,x,y)=>{P(g,x+4,y+12,9,3,SH);P(g,x+4,y,8,13,'#e8e8e4');P(g,x+5,y-6,6,7,'rgba(120,180,240,.75)');P(g,x+6,y-5,2,4,'rgba(220,240,255,.8)');P(g,x+6,y+4,4,2,'#3a6ac8');});
F('mailbx',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,14,2,SH);P(g,x+1,y-4,14,17,'#7a5a3a');for(let j=0;j<4;j++)for(let i=0;i<4;i++){P(g,x+2+i*3,y-3+j*4,2,3,'#3a2818');if((i+j)%3===0)P(g,x+2+i*3,y-3+j*4,2,1,'#e8e4dc');}});
F('wetsign',1,1,0,0,(g,x,y)=>{P(g,x+5,y+12,7,2,SH);P(g,x+5,y+3,7,10,'#e8c020');P(g,x+7,y+5,3,3,'#1a1a1a');P(g,x+7,y+9,3,1,'#1a1a1a');});
F('serve',1,1,1,0,(g,x,y)=>{P(g,x,y+13,16,2,SH);P(g,x,y+2,16,11,'#a8acb0');P(g,x,y+2,16,1,'#c8ccd0');P(g,x+2,y+4,5,4,'#c86a3a');P(g,x+9,y+4,5,4,'#e8d890');P(g,x,y-4,16,2,'rgba(200,230,255,.5)');});
F('trophy',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,2,SH);P(g,x+1,y-8,30,21,'#6a4a30');P(g,x+2,y-7,28,18,'rgba(170,200,220,.35)');for(const[i,c]of[[4,'#e0b840'],[10,'#d0d0d0'],[16,'#e0b840'],[22,'#c08050']]){P(g,x+i,y-4,4,4,c);P(g,x+i+1,y,2,3,c);P(g,x+i,y+3,4,1,'#3a2818');}P(g,x+2,y+5,28,1,'#3a2818');P(g,x+6,y+7,6,3,'#e0b840');});
F('bshelf',1,1,1,1,(g,x,y,w,h,s)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#6a4a30');for(let j=0;j<4;j++){P(g,x+2,y-9+j*6,12,5,'#2a1e14');const r=rng(s*7+j);for(let i=0;i<6;i++)P(g,x+2+i*2,y-8+j*6,2,4,['#8a2a2a','#2a4a6a','#4a6a3a','#c8a040','#6a4a7a','#3a3a3a'][(r()*6)|0]);}});
F('labt',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,3,SH);P(g,x,y+2,32,10,'#2a2c30');P(g,x,y+2,32,1,'#4a4c50');P(g,x+13,y+4,6,5,'#8a8e92');P(g,x+15,y+5,2,3,'#3a3e42');P(g,x+4,y+4,3,4,'rgba(140,220,200,.7)');P(g,x+24,y+5,4,3,'rgba(220,180,90,.7)');});
F('hood',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#c8ccd0');P(g,x+2,y-4,12,10,'rgba(160,200,220,.5)');P(g,x+1,y-10,14,4,'#a8acb0');P(g,x+4,y+8,8,2,'#3a3e42');});
F('ssign',3,1,1,0,(g,x,y)=>{P(g,x+1,y+13,46,3,SH);P(g,x,y-2,48,15,'#6a3a2a');P(g,x,y-2,48,2,'#8a5a48');P(g,x+3,y+1,42,8,'#1a2a4a');P(g,x+3,y+1,42,1,'#2a3a5a');const L=[4,1,4,1,3,1,1,4,1,3,4];let px=x+5;for(const w of L){P(g,px,y+3,w,4,'#e8d8a8');px+=w+1;}P(g,x+30,y+3,10,4,'#e0b840');P(g,x+8,y+11,32,1,'#4a2a1e');});
F('flagp',1,1,1,0,(g,x,y)=>{P(g,x+5,y+12,8,3,SH);P(g,x+7,y-44,2,57,'#c8ccd0');P(g,x+6,y-46,4,2,'#e0b840');P(g,x+4,y+10,8,3,'#8a8e92');});
F('brack',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,2,SH);for(let i=0;i<5;i++){P(g,x+2+i*6,y+4,4,8,'#8a8e92');}P(g,x+1,y+11,30,1,'#6a6e72');for(const i of[0,2,3])P(g,x+1+i*6,y+2,6,8,['#c8302a','#2a6ac8','#3a3a3a','#2a8a4a'][i]);});
F('phoneL',1,1,0,0,(g,x,y)=>{P(g,x+6,y+7,4,6,'#111');P(g,x+7,y+8,2,4,'#3a5a8a');});
F('cone',1,1,0,0,(g,x,y)=>{P(g,x+4,y+12,8,2,SH);P(g,x+5,y+11,6,2,'#1a1a1a');P(g,x+6,y+4,4,8,'#e8601a');P(g,x+6,y+7,4,2,'#f0f0f0');P(g,x+7,y+3,2,1,'#e8601a');});
F('ptape',1,1,0,0,(g,x,y,w,h,s)=>{const sag=Math.sin(s*1.7)*1;P(g,x,y+7+sag,16,2,'#e8c020');for(let i=0;i<16;i+=5)P(g,x+i,y+7+sag,2,2,'#1a1a1a');if(s%4===0){P(g,x+7,y,2,12,'#3a3a3a');P(g,x+6,y+11,4,2,'#2a2a2a');}});
F('medbag',1,1,0,0,(g,x,y)=>{P(g,x+3,y+11,11,2,SH);P(g,x+3,y+5,10,7,'#c82018');P(g,x+3,y+5,10,1,'#e83a2a');P(g,x+7,y+6,2,5,'#fff');P(g,x+5,y+8,6,1,'#fff');});
F('tarp2',2,1,0,0,(g,x,y)=>{P(g,x+1,y+2,30,12,'#2a5ab0');P(g,x+1,y+2,30,1,'#4a7ad0');P(g,x+8,y+4,14,7,'#c8c8c4');});
F('camtri',1,1,0,0,(g,x,y)=>{P(g,x+4,y+12,9,2,SH);P(g,x+5,y+2,1,11,'#3a3a3a');P(g,x+11,y+2,1,11,'#3a3a3a');P(g,x+8,y+2,1,11,'#3a3a3a');P(g,x+4,y-3,9,6,'#1a1a1a');P(g,x+12,y-2,3,3,'#3a3a3a');P(g,x+5,y-2,2,1,'#c8201a');});
F('firetr',5,2,1,0,(g,x,y)=>veh(g,x,y+5,{L:84,b:'#b01e18',box:[2,62],bc:'#c0201a',cab:[63,72],stripe:'#e8e0a0',wh:[10,48,64],ex:(T,R)=>{R(6,-2,54,4,'#c8ccd0');for(let i=8;i<58;i+=5)R(i,-2,1,4,'#8a8e92');R(6,-3,54,1,'#e8ecf0');for(let i=0;i<5;i++)T(6+i*11,8,8,6,'#8a1410');R(64,-3,7,2,'#e8201a');T(2,5,1,8,'#e8e0a0');}}));
F('shoe',1,1,0,0,(g,x,y,w,h,s)=>{const c=['#e8e8e4','#2a2a2a','#c8302a'][s%3];P(g,x+5,y+8,7,3,c);P(g,x+5,y+10,7,1,'#f0f0f0');P(g,x+10,y+7,2,2,c);});
F('szsign',1,1,1,0,(g,x,y)=>{P(g,x+6,y+12,5,3,SH);P(g,x+8,y-12,1,25,'#8a8e92');P(g,x+3,y-18,11,9,'#d8e820');P(g,x+4,y-17,9,7,'#e8f430');P(g,x+6,y-16,1,4,'#1a1a1a');P(g,x+9,y-16,1,4,'#1a1a1a');P(g,x+7,y-14,2,1,'#1a1a1a');P(g,x+3,y-8,11,4,'#f0f0ea');P(g,x+4,y-7,9,1,'#1a1a1a');});
F('barr',1,2,1,0,(g,x,y)=>{P(g,x+2,y+28,13,3,SH);P(g,x+3,y+6,1,24,'#6a6e72');P(g,x+13,y+6,1,24,'#6a6e72');for(let j=0;j<3;j++){P(g,x+2,y+6+j*8,13,3,'#f0f0ea');for(let i=0;i<13;i+=4)P(g,x+2+i,y+6+j*8,2,3,'#e8601a');}});
F('pfence',1,1,1,0,(g,x,y)=>{P(g,x,y+11,16,2,SH);P(g,x,y+4,16,1,'#d8d6ce');P(g,x,y+8,16,1,'#d8d6ce');for(let i=1;i<16;i+=4){P(g,x+i,y,2,11,'#e8e6de');P(g,x+i,y,2,1,'#f8f6ee');}});
F('ctent',3,2,1,0,(g,x,y)=>{P(g,x+2,y+28,44,4,SH);for(const[a,b]of[[2,4],[44,4],[2,26],[44,26]])P(g,x+a,y+b,1,24-b+4,'#8a8e92');P(g,x,y-6,48,16,'#1e3c8a');P(g,x,y-6,48,2,'#3a5aaa');for(let i=0;i<48;i+=8)P(g,x+i,y+10,4,3,'#1e3c8a');P(g,x+10,y-2,28,6,'#f0f0ea');P(g,x+12,y-1,24,4,'#1e3c8a');P(g,x+6,y+16,36,8,'#5a5e62');P(g,x+6,y+16,36,1,'#8a8e92');P(g,x+10,y+17,10,6,'#e8e4dc');P(g,x+26,y+17,8,5,'#1a2a3a');P(g,x+27,y+18,6,3,'#3a8ac8');});
Object.assign(FH,{firetr:0,ctent:12,barr:6,pfence:4,szsign:12,sbus:0,tvvan:0,car:0,suv:0,van:0,ambul:0,sdesk:3,labt:4,trophy:6,bshelf:10,easel:4,copier:5,serve:4,hood:10,kiln:4,mailbx:6,cooler:6});
// ---------- wnętrza na ścianach ----------
function schoolDecor(){const face=ty=>WR[ty]&&WR[ty].getContext('2d'),r=rng(77);
 const board=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,30,9,'#4a4e52');P(g,x+1,18,28,7,'#f2f2ec');for(let i=0;i<4;i++)P(g,x+3+(r()*18|0),19+i*1.5|0,4+(r()*6|0),1,['#2a4ab0','#c82a2a','#2a2a2a'][(r()*3)|0]);P(g,x+2,25,26,1,'#9a9e92');};
 const pin=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,14,9,'#a8784a');for(let i=0;i<4;i++)P(g,x+1+i*3,18+(i%2)*3,3,4,['#f0f0e8','#f0d080','#a8d0f0','#f0a8a8'][i]);};
 const clock=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,7,7,'#2a2a2a');P(g,x+1,18,5,5,'#f0f0ea');P(g,x+3,19,1,2,'#111');P(g,x+3,20,2,1,'#111');};
 const flag=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,17,1,10,'#c8c8c8');for(let j=0;j<5;j++)P(g,x+1,17+j,7,1,j%2?'#f0f0ea':'#c8302a');P(g,x+1,17,3,3,'#2a3a8a');};
 const lockers=(ty,x0,x1)=>{const g=face(ty);if(!g)return;for(let x=x0*TS;x<(x1+1)*TS;x+=5){P(g,x,16,5,12,'#4a6a8a');P(g,x,16,1,12,'#2a4a6a');P(g,x+2,18,2,1,'#2a4a6a');P(g,x+2,20,2,1,'#2a4a6a');P(g,x+3,23,1,2,'#c8c8c8');}};
 // tablice i dekoracje w salach (ściana północna widoczna z sali)
 for(const x of[16,24,40,48,57])board(22,x*TS+6);for(const x of[21,30,39,48,57])board(1,x*TS+6);for(const x of[16,37])board(10,x*TS+6);board(10,24*TS+2);
 for(const x of[20,28,44,52,61])clock(22,x*TS+4);for(const x of[26,35,44,53])clock(1,x*TS+4);for(const x of[21,29,45,53,62])flag(22,x*TS+6);
 for(const x of[31,36])pin(22,x*TS+2);for(const x of[24,33])pin(10,x*TS+2);
 // szafki na korytarzach (ściana z drzwiami do sal — widoczna z korytarza)
 for(const[a,b]of[[15,17],[19,25],[27,33],[35,41],[43,49],[51,58],[60,62]])lockers(28,a,b);for(const[a,b]of[[15,16],[18,22],[24,31],[33,40],[42,49],[51,58],[60,62]])lockers(7,a,b);
 // hol: baner, pieczęć szkoły
 const g=face(31);if(g){}
 const gl=face(28);if(gl){P(gl,36*TS,17,40,7,'#2a3a7a');for(let i=0;i<6;i++)P(gl,36*TS+4+i*6,19,4,3,'#e8c040');}
 // ślady po kulach, krew na ścianach, otwarte szafki, gaśnice, znaki wyjścia
 const holes=(ty,x0,x1,n)=>{const g=face(ty);if(!g)return;for(let i=0;i<n;i++){const x=x0*TS+(r()*(x1-x0)*TS|0),y=17+(r()*9|0);P(g,x,y,1,1,'#141414');P(g,x+1,y,1,1,'rgba(255,255,255,.35)');}};
 holes(28,27,34,10);holes(28,45,51,8);holes(7,28,35,9);holes(7,40,47,7);holes(10,23,30,6);holes(10,46,55,8);
 const smear=(ty,x)=>{const g=face(ty);if(!g)return;for(let i=0;i<7;i++)P(g,x+i,19+(i>>1),2,5-(i>>1),'rgba(110,14,10,.75)');};smear(28,31*TS+3);smear(7,43*TS+6);smear(10,30*TS+2);
 const openL=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,16,5,12,'#1a2028');P(g,x+5,16,2,12,'#5a7a9a');P(g,x+1,20,3,2,'#c84a3a');};for(const[t,x]of[[28,20],[28,48],[7,26],[7,52],[28,36]])openL(t,x*TS+5);
 const ext=(ty,x)=>{const g=face(ty);if(!g)return;P(g,x,18,5,8,'#e8e4dc');P(g,x+1,19,3,6,'#c81e18');P(g,x+2,18,1,1,'#2a2a2a');};ext(28,25*TS+2);ext(28,53*TS+2);ext(7,30*TS+2);ext(7,48*TS+2);
 for(const[ty,x]of[[31,16],[31,61],[7,16],[10,61],[28,13]]){const g=face(ty);if(g){P(g,x*TS+4,16,8,3,'#0a3a1a');P(g,x*TS+5,16,6,2,'#3af07a');}}
 // nawierzchnia: linie, przejście, miejsca parkingowe, krawężniki, ściółka pod drzewami
 const L=(x,y,w,h,c)=>P(wc,x,y,w,h,c),X0=0,X1=MW*TS;
 L(X0,45*TS-1,X1,1,'#c8c4b8');L(X0,45*TS,X1,2,'rgba(0,0,0,.35)');L(X0,51*TS-1,X1,1,'#c8c4b8');L(X0,51*TS,X1,1,'rgba(255,255,255,.12)');
 for(let x=X0;x<X1;x+=1){if(x>=37*TS&&x<41*TS)continue;L(x,45*TS+3,1,1,'rgba(230,230,220,.7)');L(x,51*TS-4,1,1,'rgba(230,230,220,.7)');L(x,48*TS-2,1,1,'#d8b030');L(x,48*TS+1,1,1,'#d8b030');}
 for(let y=45*TS+6;y<51*TS-8;y+=8)L(37*TS+2,y,4*TS-4,4,'rgba(235,235,225,.85)');
 L(36*TS+8,45*TS+2,2,6*TS-4,'rgba(235,235,225,.5)');L(41*TS+6,45*TS+2,2,6*TS-4,'rgba(235,235,225,.5)');
 for(let y=24;y<=42;y+=2){L(1*TS,y*TS,3*TS,1,'rgba(230,230,220,.75)');L(9*TS,y*TS,3*TS,1,'rgba(230,230,220,.75)');}
 for(let y=23;y<=35;y+=4)L(65*TS,y*TS,14*TS,1,'rgba(230,200,60,.7)');L(65*TS,36*TS-2,3*TS,2,'rgba(240,240,230,.8)');L(4*TS,44*TS-1,4*TS,2,'rgba(240,240,230,.7)');
 for(const[x,y]of SC.trees){const cx=x*TS+8,cy=y*TS+12;for(let j=-5;j<=5;j++){const w=Math.round(Math.sqrt(36-j*j)*1.6);L(cx-w,cy+j,w*2,1,j%2?'#4a3020':'#553825');}}
 for(let x=14*TS;x<64*TS;x+=7)if(r()<.5)L(x,37*TS+4+(r()*8|0),2,2,['#c84a5a','#e8c84a','#f0f0e8','#8a4ab0'][(r()*4)|0]);}
// ---------- poziom ----------
const SCH_PAL=[{body:'#26324c',legs:'#1c2438'},{body:'#2a2e34',legs:'#1c2438'},{body:'#2c3036',legs:'#1c2438'},{body:'#3a3428',legs:'#3a4230'}];
function giveInv(u,list){u.inv=list.map(w=>({weap:w,mag:WEAP[w].mag,res:WEAP[w].mag*3}));u.invI=0;const it=u.inv[0];u.weap=it.weap;u.W=WEAP[it.weap];u.mag=it.mag;u.res=it.res;}
function swapWeapon(u){if(!u||!u.inv||u.inv.length<2||u.rel>0)return;const cur=u.inv[u.invI];cur.mag=u.mag;cur.res=u.res;u.invI=(u.invI+1)%u.inv.length;const n=u.inv[u.invI];u.weap=n.weap;u.W=WEAP[n.weap];u.mag=n.mag;u.res=n.res;u.drawCd=.5;SND.reload(u.x,u.y,n.weap);toast(u.W.n);}
function spawnSchoolTeam(E){const L=[['lead','SGT. DAVIS',['pistol'],'Fairview PD'],['breach','OFC. PRICE',['shotgun','pistol'],'Fairview PD'],['scout','OFC. NGUYEN',['rifle','pistol'],'Fairview PD'],['medic','DEP. HOLT',['rifle','pistol'],'Hamilton Co. Sheriff']],offs=[[0,0],[-1.2,-1],[-1.2,1],[-2.2,0]];
 L.forEach((d,i)=>{const pal=Object.assign({},i%2?PAL.patrolB:PAL.patrolA,SCH_PAL[i]);if(i>0){pal.hair=['#2e3236','#3a3e30','#2e3236'][i-1];pal.body=SCH_PAL[i].body;}
  const u=new Unit({team:'squad',spec:d[0],name:d[1],role:d[3],weap:d[2][0],fov:90,range:12,acc:'#d8b048',pal,patrol:true,charges:0,flash:0,sed:0,shoutCd:0,armor:i?'heavy':'light',spray:0});u.tac=true;giveInv(u,d[2]);
  u.x=E.x*TS+8+offs[i][1]*TS;u.y=E.y*TS-offs[i][0]*TS;u.ang=E.a;u.heading=E.a;u.holster=false;unstick(u);G.squad[i]=u;G.units.push(u);});}
function mkCorpse(tx,ty,pal,a,seed){const b=new Unit({team:'civ',kind:'corpse',pal:Object.assign({head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1},pal),r:4});b.alive=false;b.pose='dead';b.deathT=9;b.fallA=a;b.mseed=seed;b.x=tx*TS+8;b.y=ty*TS+8;b.byEnemy=true;G.units.push(b);return b;}
const STU_PAL=()=>({body:pick(['#3a4a8a','#8a3a4a','#4a7a5a','#6a6a6a','#c8a040','#2a2a2a','#7a4a8a','#d8d8d0']),legs:pick(['#2a3a5a','#3a3a3a','#4a4a5a','#5a4a3a']),hair:pick(['#3a2418','#1e1410','#c8a050','#8a5a30','#e0c070']),skin:pick(['#c8a080','#a07a5a','#e0c0a8','#7a5a40']),head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1});
const EMS_PAL={body:'#24345a',legs:'#1a2238',hair:'#2a1a12',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',acc:'#e8e030',eyes:1};
function startSchool(){G.hostage=null;G.deadline=1e9;G.order='hold';
 G.h={t:0,said:{},vic:0,vicStart:0,inside:false,up:false,st:0,stT:8,fireT:3,flash:0,flashX:0,safe:{},endT:null,arrT:null,geared:false,alarmT:0};
 const H=G.h;
 const V=[[22,30,-1.2],[31,29,.4],[37,33,2.6],[49,30,-2],[56,29,1.1],[33,9,-.6],[44,8,2.2],[28,13,1.4],[41,13,-2.4]];V.forEach(([x,y,a],i)=>mkCorpse(x,y,STU_PAL(),a,30+i));
 mkCorpse(34,40,STU_PAL(),.8,61);mkCorpse(49,42,STU_PAL(),-1.9,62);mkCorpse(21,43,{body:'#5a5a6a',legs:'#2a2a3a',hair:'#8a8a80',head:'#c8a080'},2.2,63);
 H.vicStart=12;H.vic=12;
 H.hide=[{door:[59,28],room:'Sala 105',n:23,who:'NAUCZYCIELKA'},{door:[41,7],room:'Sala 203',n:19,who:'NAUCZYCIEL'},{door:[50,7],room:'Sala 204',n:26,who:'NAUCZYCIELKA'}];
 for(const hd of H.hide){const up=hd.door[1]===7||hd.door[1]===28;const rm=LV.room[I(hd.door[0],hd.door[1]-1)];const R=ROOMS[rm];if(!R)continue;for(let k=0;k<5;k++){const tx=R.x+((k*2)%(R.x2-R.x+1)),ty=R.y;const c=mkNPC({tx,ty,kind:'student',pal:STU_PAL(),state:'calm',pose:'kneel',a:Math.PI/2,name:'UCZEŃ',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);c.pose='kneel';}});c.hide=true;}}
 H.emma=mkNPC({tx:36,ty:2,kind:'student',pal:Object.assign(STU_PAL(),{body:'#c8a040',hair:'#8a5a30'}),state:'calm',pose:'kneel',a:Math.PI/2,name:'EMMA',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);c.pose='kneel';}});H.emma.hide=true;H.emma.noCuff=1;
 H.run=[];for(let k=0;k<6;k++){const c=mkNPC({tx:randi(24,58),ty:randi(38,42),kind:'student',pal:STU_PAL(),state:'run',a:Math.PI/2,name:'UCZEŃ',upd:fleeUpd});c.ex=[randi(4,62),57];H.run.push(c);}
 H.crowd=[];for(let k=0;k<34;k++){const x=randi(2,77),y=randi(53,54);if((x>=6&&x<=11)||(x>=38&&x<=43)||(x>=63&&x<=68)||(x>=22&&x<=25))continue;const c=mkNPC({tx:x,ty:y,kind:'gawk',pal:STU_PAL(),state:'calm',a:-Math.PI/2+rand(-.4,.4),name:pick(['GAPIĄ','RODZIC','RODZIC']),upd:crowdUpd});c.phone=Math.random()<.4;if(Math.random()<.15)c.cry=1;H.crowd.push(c);}
 H.rep=mkNPC({tx:8,ty:53,kind:'gawk',pal:{body:'#c8303a',legs:'#2a2a3a',hair:'#e0c070',skin:'#e0c0a8',head:'#e0c0a8',face:'#e0c0a8',visor:'#2a1a12',eyes:1},state:'calm',a:Math.PI/2,name:'REPORTERKA',upd:repUpd});
 H.cam=mkNPC({tx:9,ty:54,kind:'gawk',pal:{body:'#3a3a3a',legs:'#2a2a2a',hair:'#3a2418',head:'#a07a5a',face:'#a07a5a',visor:'#2a1a12',eyes:1},state:'calm',a:-Math.PI*.7,name:'OPERATOR',upd:(c,dt)=>{moveUnit(c,dt,0,0,0);turnTo(c,Math.atan2(H.rep.y-c.y,H.rep.x-c.x),dt,3);}});
 H.rep2=mkNPC({tx:24,ty:53,kind:'gawk',pal:{body:'#2a4a6a',legs:'#2a2a3a',hair:'#3a2418',head:'#c8a080',face:'#c8a080',visor:'#2a1a12',eyes:1},state:'calm',a:-Math.PI/2,name:'REPORTER'});
 // ratownicy przy karetkach
 H.ems=[];for(const[x,y,a,cpr,st]of[[71,41,-1.57,1,0],[75,41,-1.57,1,0],[72,38,-1.2,0,0],[69,39,0,0,0],[76,37,2.6,0,1],[68,36,-1.6,0,1]]){const m=mkNPC({tx:x,ty:y,kind:'ems',pal:{...EMS_PAL},state:'calm',a,name:'RATOWNIK',upd:emsUpd});m.cpr=cpr;m.stand=st;m.ph=Math.random()*6;H.ems.push(m);}
 for(const[x,y,a]of[[70.5,40,0],[74.5,40,0]]){const p=mkCorpse(x+.5,y,STU_PAL(),a,90+x);p.kind='patient';p.pose='inbed';p.alive=true;p.team='civ';p.state='calm';p.upd=(c,dt)=>moveUnit(c,dt,0,0,0);G.civs.push(p);}
 G.police=[];for(const[x,y,a,st]of[[31,44,-1.4],[34,44,-1.7],[53,44,-1.6],[56,44,-1.8],[11,48,-.7],[59,47,-1.9],[39,53,1.57,1],[42,53,1.57,1],[65,55,-1.2,1],[67,55,-2,1]]){const pu=new Unit({team:'police',weap:'pistol',pal:Object.assign({},PAL.patrolA)});pu.x=x*TS+8;pu.y=y*TS+8;pu.ang=a;pu.pose=st?'stand':'kneel';G.police.push(pu);}
 H.sh=mkEnemy({tx:SC.stations[0][0],ty:SC.stations[0][1],weap:'eShot',a:Math.PI/2,st:'guard',pal:{body:'#2a2a2a',legs:'#3a3a40',hair:'#2a1a12',head:'#c8a080',face:'#c8a080',visor:'#1a1a1a'},name:'Strzelec',fov:120,range:10});H.sh.upd=shooterUpd;H.sh.boss=true;H.sh.perT=0;SC.stations=SC.stations.filter(([x,y])=>walkable(x,y));
 H.px=new Unit({team:'enemy',weap:'eShot',name:'Strzelec'});H.px.mag=99;
 logEv('Zgłoszenie: aktywny strzelec, Millbrook High School');
 setTimeout(()=>{radio('DISPATCH','Wszystkie jednostki, aktywny strzelec w Millbrook High School. Sprawca oddaje strzały z okien na piętrze. Liczne ofiary.');radio(G.p1.name,'Dispatch, tu Davis. Mam czterech ludzi. Bierzemy sprzęt z bagażników i wchodzimy, nie czekamy na SWAT.',{radio:1});radio('DISPATCH','Przyjęłam. SWAT dojedzie za dwadzieścia pięć minut. W budynku włączony alarm przeciwpożarowy.');},700);}
function fleeUpd(c,dt){if(npcGo(c,dt,c.ex[0],c.ex[1],58)){c.alive=false;G.units.splice(G.units.indexOf(c),1);G.civs.splice(G.civs.indexOf(c),1);}}
function crowdUpd(c,dt){moveUnit(c,dt,0,0,0);c.wT=(c.wT||rand(0,6))+dt;if(c.cry){c.pose=((c.wT*.25)|0)%3?'kneel':'stand';}turnTo(c,-Math.PI/2+Math.sin(c.wT*.4+c.id)*.4,dt,1.5);}
function repUpd(c,dt){moveUnit(c,dt,0,0,0);c.wT=(c.wT||0)+dt;turnTo(c,(((c.wT/6)|0)%2)?Math.PI/2+.8:-Math.PI/2,dt,2);}
function emsUpd(c,dt){moveUnit(c,dt,0,0,0);c.ph+=dt;if(c.cpr){c.pose=((c.ph*3.2)|0)%2?'kneel':'stand';}else{c.pose=c.stand?'stand':'kneel';turnTo(c,c.ang+Math.sin(c.ph*.7)*.02,dt,1);}}
function inUF(u){return u.y<17*TS;}
function inGF(u){return u.x>SC.gf.x0*TS&&u.x<SC.gf.x1*TS&&u.y>22*TS&&u.y<36*TS;}
function shWalk(e,dt,gx,gy,key){if(!e.path||e.goalT!==key){e.path=findPath(e.x/TS|0,e.y/TS|0,gx,gy,4000);e.goalT=key;}if(e.path)for(const nn of e.path.slice(0,3)){const dd=LV.doorAt[I(nn[0],nn[1])];if(dd&&dd.target===0&&!dd.locked&&dist(dd.x*TS+8,dd.y*TS+8,e.x,e.y)<TS*1.6)toggleDoor(dd,e);}if(!e.path||followPath(e,dt,40))e.path=null;else if(e.moving)turnTo(e,Math.atan2(e.vy,e.vx),dt,6);}
function rattleAt(x,y){if(!A.ctx)return;const o=out(x,y,.6,{rev:.3}),t0=A.ctx.currentTime;if(o)for(let k=0;k<4;k++){nz(o,t0+k*.09,.06,{type:'bandpass',f:1500+Math.random()*600,g:.9});tone(o,t0+k*.09,.04,{f:240,f2:180,g:.35,type:'square'});}}
const WING=x=>x<29?'zachodniej':x>36?'wschodniej':null,FLIP={zachodniej:'wschodniej',wschodniej:'zachodniej'};
const SH_L=['HAHAHA! Gdzie jesteście?!','Chodźcie! Chodźcie do mnie!','Nikt was nie lubił! NIKT!','Słyszę was... słyszę wasze serduszka!','To wasza wina! WASZA!','Raz, dwa, trzy... szukam!','Pan dyrektor już nie przyjdzie! HAHA!','Uśmiech! Jesteście w telewizji!'];
function shYell(e,p){const H=G.h;H.yellT=(H.yellT||0);if(G.time-H.yellT>(p?2.5:5)){H.yellT=G.time;say('STRZELEC',pick(SH_L));}}
function shBlast(e,a,sp){if(e.mag<1)e.mag=99;e.fireCd=0;e.rel=0;e.ang=a+rand(-sp,sp);fire(e);const H=G.h;H.shN=(H.shN||0)+1;if(H.shN>=6){H.shN=0;H.rlT=rand(1.8,2.6);SND.reload(e.x,e.y,'shotgun');shYell(e,1);}}
function shFrenzy(e,dt){const H=G.h,tg=e.target;if(H.rlT>0){H.rlT-=dt;moveUnit(e,dt,0,0,0);if(tg)turnTo(e,Math.atan2(tg.y-e.y,tg.x-e.x),dt,6);return true;}
 const a=Math.atan2(tg.y-e.y,tg.x-e.x);turnTo(e,a,dt,10);e.sideT=(e.sideT||0)-dt;if(e.sideT<=0){e.sideT=rand(.4,.9);e.sideD=Math.random()<.5?1:-1;}
 const px=-Math.sin(a)*e.sideD,py=Math.cos(a)*e.sideD;moveUnit(e,dt,px,py,26);e.pose='stand';
 H.frT=(H.frT||0)-dt;if(H.frT<=0){H.frT=rand(.35,.6);shBlast(e,a,.24);}if(Math.random()<dt*.6)shYell(e);return true;}
function shBlind(e,dt){const H=G.h,R=H.ram;R.t-=dt;if(H.rlT>0){H.rlT-=dt;moveUnit(e,dt,0,0,0);return true;}
 const cy=8.5*TS+8;if(Math.abs(e.y-cy)>6&&!R.at){shWalk(e,dt,e.x/TS|0,8,'ram'+(e.x/TS|0));if(R.t<-6)H.ram=null;return true;}R.at=true;
 moveUnit(e,dt,0,0,0);e.pose='stand';let a=R.dir;const q=G.squad.filter(u=>u&&u.alive&&inUF(u)).sort((u,v)=>dist(u.x,u.y,e.x,e.y)-dist(v.x,v.y,e.x,e.y))[0];if(q&&Math.random()<.7)a=Math.atan2(q.y-e.y,q.x-e.x);
 turnTo(e,a,dt,8);R.ft-=dt;if(R.ft<=0){R.ft=rand(.3,.75);shBlast(e,a,.38);R.n--;}if(Math.random()<dt*.8)shYell(e);
 if(R.n<=0||R.t<=0){H.ram=null;H.ramCd=H.up?rand(4,9):rand(16,26);e.path=null;e.goalT=null;}return true;}
function shooterUpd(e,dt){const H=G.h;if(e.state==='surr'||e.state==='cuffed'||e.stun>0)return false;
 e.perT-=dt;if(e.perT<=0){e.perT=.1;enemyPerceive(e);}if(e.target&&e.target.alive){e.fightT=1.5;H.ram=null;return shFrenzy(e,dt);}if(e.fightT>0){e.fightT-=dt;if(e.fightT>0){if(!H.ram)H.ram={t:5,ft:.2,n:randi(4,7),dir:e.ang,at:true};return shBlind(e,dt);}e.path=null;e.goalT=null;e.state='guard';}
 if(H.ram)return shBlind(e,dt);
 H.ramCd=(H.ramCd==null?rand(14,22):H.ramCd)-dt;if(H.ramCd<=0&&!(H.det&&!H.detDone)){H.ram={t:9,ft:.5,n:randi(4,8),dir:Math.random()<.5?0:Math.PI};if(!H.up)setTimeout(()=>{if(!G.ended&&H.sh.alive)radio('DISPATCH',pick(['Świadkowie: seria strzałów na korytarzu piętra!','Strzały w środku, na korytarzu! Strzela na oślep!']));},1500);return shBlind(e,dt);}
 if(H.det&&!H.detDone){const gx=32*TS+8,gy=8*TS+8;if(dist(e.x,e.y,gx,gy)>5){shWalk(e,dt,32,8,'det');return true;}
  moveUnit(e,dt,0,0,0);turnTo(e,-Math.PI/2,dt,6);e.pose='stand';if(H.detT==null){H.detT=5;H.rattleT=0;radio('DISPATCH','Uwaga! Emma mówi, że on stoi pod jej drzwiami. Szarpie za klamkę... sala 202, piętro!',{prio:1});logEv('Strzelec pod drzwiami sali 202');}
  H.detT-=dt;H.rattleT-=dt;if(H.rattleT<=0){H.rattleT=rand(.5,.9);rattleAt(32*TS+8,7*TS+8);makeNoise(32*TS+8,8*TS,8,'kick',e);}
  if(H.detT<=0){H.detDone=true;e.path=null;e.goalT=null;let n=H.st;while(n===H.st)n=randi(0,SC.stations.length-1);H.st=n;H.stT=rand(16,22);const w=WING(SC.stations[n][0]);setTimeout(()=>{if(!G.ended&&!H.up)radio('DISPATCH','Odszedł. Emma słyszy, że idzie '+(w?'w stronę '+w.replace('niej','niego')+' skrzydła':'korytarzem tuż obok')+'. Mówi, że nie może przestać się trząść.');},2200);}
  return true;}
 const st=SC.stations[H.st],tx=st[0]*TS+8,ty=st[1]*TS+8;H.stT-=dt;
 if(H.stT<=0){H.stT=rand(8,14);let n=H.st;while(n===H.st||dist(SC.stations[n][0],0,SC.stations[H.st][0],0)<4)n=randi(0,SC.stations.length-1);H.st=n;e.path=null;const rn=ROOMS[LV.room[I(SC.stations[n][0],SC.stations[n][1])]],nm=rn?rn.n.toLowerCase():'piętro';if(Math.random()<.6)setTimeout(()=>{if(!G.ended&&H.sh.alive&&!H.rogue)radio('DISPATCH','Świadkowie: strzały z okien na piętrze, '+nm+'.');},4000);}
 if(dist(e.x,e.y,tx,ty)>6){shWalk(e,dt,st[0],st[1],H.st);return true;}
 moveUnit(e,dt,0,0,0);turnTo(e,Math.PI/2,dt,5);e.pose='stand';
 H.fireT-=dt;if(H.fireT<=0){H.fireT=rand(1.4,3);windowShot(e,st[0]+(Math.random()<.5?0:1));}
 return true;}
function shooterAmbush(e){const H=G.h,st=SC.stations[H.st],ri=LV.room[I(st[0],st[1])],R=ROOMS[ri];if(!R)return;
 const ds=LV.doors.filter(d=>[[0,1],[0,-1],[1,0],[-1,0]].some(([dx,dy])=>LV.room[I(d.x+dx,d.y+dy)]===ri));let best=[st[0],st[1]],bs=-1;
 for(let y=R.y;y<=R.y2;y++)for(let x=R.x;x<=R.x2;x++){if(!walkable(x,y))continue;let m=1e9;for(const d of ds)m=Math.min(m,Math.hypot(d.x-x,d.y-y));const sc=m+(walkable(x,y-1)?0:.3);if(sc>bs){bs=sc;best=[x,y];}}
 e.looks=ds.map(d=>Math.atan2(d.y-best[1],d.x-best[0]));if(!e.looks.length)e.looks=[-Math.PI/2];
 e.home={x:best[0]*TS+8,y:best[1]*TS+8,a:e.looks[0],st:'guard'};e.boss=true;e.guard=true;e.state='return';e.path=null;e.target=null;e.ico='!';e.icoT=2;H.amb=R.n;}
function windowShot(e,wx){const H=G.h,p=H.px;p.x=wx*TS+8;p.y=37.2*TS;p.alive=true;p.mag=99;p.fireCd=0;p.rel=0;
 let best=null,bd=TS*15;for(const u of G.units){if(!u.alive||u===p)continue;if(u.team!=='civ'&&u.team!=='squad')continue;if(u.kind==='corpse'||u.kind==='patient'||u.kind==='ems'||u.hide)continue;if(u.y<37*TS)continue;const d=dist(u.x,u.y,p.x,p.y);if(d<bd&&losClear(p.x,p.y,u.x,u.y)){bd=d;best=u;}}
 H.flash=.09;H.flashX=wx;for(let i=0;i<5;i++)G.fx.push({k:'dust',x:e.x+rand(-8,8),y:e.y+rand(-4,12),vx:rand(-8,8),vy:rand(-14,-4),t:0,life:rand(1.6,2.6),c:'#9a9890'});
 if(best){p.ang=Math.atan2(best.y-p.y,best.x-p.x)+rand(-.06,.06);fire(p);if(best.team==='civ'&&best.alive&&Math.random()<.45)kill(best,p,p.ang);}else{SND.gun('shotgun',p.x,p.y);makeNoise(p.x,p.y,26,'shot',p);for(let i=0;i<6;i++)G.fx.push({k:'dust',x:p.x+rand(-30,30),y:p.y+rand(20,80),vx:rand(-20,20),vy:rand(-30,0),t:0,life:.35,c:'#5d5a52'});}}
function gearUp(u){const H=G.h;H.geared=true;giveInv(u,['shotgun','pistol']);u.armor='heavy';u.pal=Object.assign({},u.pal,{hair:'#2e3236',body:'#2a2e34'});SND.reload(u.x,u.y,'shotgun');setTimeout(()=>SND.door(u.x,u.y,false),400);
 say(u.name,'Kamizelka, hełm, strzelba. Gotowy.');logEv(u.name+' bierze wyposażenie z radiowozu');G.order='follow';for(const q of G.squad)if(q&&!q.human){q.task=null;}
 setTimeout(()=>{if(G.ended)return;const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o)say(o.name,'Gotowi. Idziemy za tobą, Sarge.');},1300);}
function schoolInteract(u){const H=G.h;if(!H)return null;
 if(!H.geared&&nearPt(u,SC.trunk.x*TS,SC.trunk.y*TS,26))return{k:'house',label:'Weź wyposażenie z bagażnika',dur:1.8,f:gearUp};
 for(const s of SC.stairs){if(!inUF(u)&&nearPt(u,s.gx*TS,s.gy*TS,24))return{k:'house',label:'Wejdź na piętro ('+s.n+' klatka)',dur:.6,f:()=>stairsGo(s,true)};
  if(inUF(u)&&nearPt(u,s.ux*TS,s.uy*TS,24))return{k:'house',label:'Zejdź na parter ('+s.n+' klatka)',dur:.6,f:()=>stairsGo(s,false)};}
 if(!H.emmaSafe&&inUF(u)&&nearPt(u,32*TS+8,7*TS+8,22))return{k:'house',label:'Zapukaj: „Emma, policja!”',dur:0,f:()=>{H.emmaSafe=true;H.saidNear=1;knockAt(32*TS+8,7*TS+8);say(u.name,'Emma? Policja. Jesteśmy pod drzwiami.');setTimeout(()=>{if(G.ended)return;if(H.call)radio('DISPATCH','Ona was słyszy! Płacze... mówi, że widzi wasze buty w szparze pod drzwiami.');else say('EMMA','(szeptem) Naprawdę...? Proszę, nie zostawiajcie mnie...');say(u.name,'Zostań w środku, Emma. Drzwi zamknięte. Wrócimy po ciebie.');logEv('Emma (911) odnaleziona w sali 202');},1500);}};
 for(const hd of H.hide){if(H.safe[hd.room])continue;const x=hd.door[0]*TS+8,y=hd.door[1]*TS+8;if(nearPt(u,x,y,22))return{k:'house',label:'Zapukaj: „Policja!”',dur:0,f:()=>{H.safe[hd.room]=1;knockAt(x,y);say(u.name,'Policja! Ktoś tam jest?');setTimeout(()=>{if(G.ended)return;say(hd.who,'Jesteśmy tutaj! '+hd.n+' osób, nikt nie jest ranny... On był na górze!');say(u.name,'Zostańcie w środku, drzwi zamknięte. Ktoś po was przyjdzie.');logEv(hd.room+': '+hd.n+' osób ukrytych, bez obrażeń');},1400);}};}
 return null;}
function stairsGo(s,up){const H=G.h,L=G.p1;const tx=(up?s.ux:s.gx)*TS,ty=(up?s.uy:s.gy)*TS;let i=0;
 for(const q of G.squad){if(!q||!q.alive)continue;const o=[[0,0],[1,0],[-1,0],[0,1],[1,1]][i++%5];q.x=tx+o[0]*12;q.y=ty+o[1]*12;q.path=null;q.task=null;q.post=null;q.vx=q.vy=0;unstick(q);}
 G.trailOwner=null;clearPosts();G.ops=[];G.cam.x=L.x;G.cam.y=L.y;SND.step(L.x,L.y,'conc',.8);
 radio(L.name,up?'Piętro. Idziemy za strzałami.':'Parter.',{radio:1});logEv(up?'Zespół wchodzi na piętro':'Zespół schodzi na parter');
 if(up&&!H.up){H.up=true;const e=H.sh;setTimeout(()=>{if(!G.ended&&H.call&&!H.emmaSafe&&H.sh.alive){const w=WING(H.sh.x/TS);radio('DISPATCH','Emma słyszy kroki na schodach... pyta, czy to wy. Ostatnio słyszała go '+(w?'po stronie '+w:'blisko siebie')+'.');H.relN=Math.max(H.relN,9);}},6500);setTimeout(()=>{if(!G.ended)radio('DISPATCH','Przyjęłam, piętro. Świadkowie: wciąż strzela z okien, przemieszcza się między salami.');},2500);}}
const PA_LINES=['Uwaga, uwaga. Lockdown. Uczniowie i nauczyciele pozostają w salach. Zamknąć drzwi, zgasić światło.','To nie są ćwiczenia. Lockdown. Nie wychodzić na korytarze.','Uwaga. Lockdown. Czekać na policję.'];
function schoolAtmo(dt){const H=G.h,L=G.p1;if(!L||!A.ctx)return;const ins=inGF(L)||inUF(L);
 H.paT=(H.paT==null?6:H.paT)-dt;if(ins&&H.paT<=0&&(H.paN||0)<PA_LINES.length&&!G.ended){H.paT=42;const pi=H.paN||0;H.paN=pi+1;const o=out(L.x,L.y-60,.5,{rev:.6}),t0=A.ctx.currentTime;if(o)[784,659,523].forEach((f,i)=>tone(o,t0+i*.32,.5,{f,g:.35}));setTimeout(()=>{if(!G.ended)say('INTERKOM',PA_LINES[pi]);},1100);}
 H.phT=(H.phT==null?9:H.phT)-dt;if(H.ring)H.ring.t+=dt;if(H.ring&&H.ring.t>3.4)H.ring=null;
 if(ins&&H.phT<=0&&!G.ended){H.phT=rand(8,14);const up=inUF(L),c=SC.phones.filter(([x,y])=>(y<17)===up&&dist(x*TS,y*TS,L.x,L.y)<TS*12);if(c.length){const[x,y]=pick(c);H.ring={x:x*TS+10,y:y*TS+6,t:0};const o=out(H.ring.x,H.ring.y,.45),t0=A.ctx.currentTime;if(o)for(let k=0;k<2;k++)[1319,1568,1760,1568,1319,1175].forEach((f,i)=>tone(o,t0+k*1.4+i*.12,.1,{f,g:.22,type:'triangle'}));
  if(!H.saidPh){H.saidPh=1;setTimeout(()=>{const o2=G.squad.find(q=>q&&q.alive&&!q.human);if(o2&&!G.ended)say(o2.name,'Telefony... to rodzice dzwonią.');},2600);}}}
 for(const[fx,fy]of SC.flick)if(Math.random()<dt*.6&&dist(fx*TS,fy*TS,L.x,L.y)<TS*10)for(let i=0;i<4;i++)G.fx.push({k:'dust',x:fx*TS+8+rand(-3,3),y:fy*TS-6,vx:rand(-30,30),vy:rand(0,40),t:0,life:rand(.2,.45),c:'#ffe08a'});}
function emmaCall(dt){const H=G.h,e=H.sh,L=G.p1;if(G.ended||!e)return;const alive=e.alive&&e.state!=='cuffed';
 if(!H.call){if(H.t>22||H.inside){H.call=1;H.callT0=H.t;H.relT=16;H.relN=0;radio('DISPATCH','Wszystkie jednostki w szkole: mam na linii 911 uczennicę ze środka. Emma, szesnaście lat. Ukryta pod biurkiem w sali 202, piętro. Mówi szeptem, będę przekazywać.',{prio:1});logEv('911: Emma, sala 202, połączenie aktywne');}return;}
 if(!alive)return;
 if(!H.emmaSafe&&!H.saidNear&&L&&inUF(L)&&dist(L.x,L.y,32*TS+8,8*TS)<TS*2.6){H.saidNear=1;radio('DISPATCH','Emma słyszy kogoś pod drzwiami. Jest przerażona, myśli, że on wrócił. Jeśli to wy — zapukajcie i się przedstawcie.',{prio:1});}
 H.relT-=dt;if(H.relT>0)return;H.relT=rand(20,26);const w=WING(e.x/TS);
 if(H.up){if(H.relN<9){H.relN=9;radio('DISPATCH','Emma mówi, że od dłuższej chwili cisza. Ostatnie kroki słyszała '+(w?'po stronie '+w:'tuż za ścianą')+'. Potem trzask drzwi.');}return;}
 if(H.relN===0){radio('DISPATCH','Emma przekazuje: strzały bardzo głośne, '+(w?'od strony '+w:'tuż za ścianą, w sali obok')+'. Słyszy, jak łuski spadają na podłogę.');}
 else if(H.relN===1){radio('DISPATCH','Teraz mówi, że chyba '+(w?'od strony '+FLIP[w]:'z dołu')+'... nie jest pewna. Korytarz niesie echo, alarm wszystko zagłusza.');}
 else if(H.relN===2){H.det=true;radio('DISPATCH','Emma mówi, że strzały ucichły. Słyszy kroki na korytarzu. Coraz bliżej.');}
 else if(H.detDone&&H.relN<6){radio('DISPATCH','Emma: znowu strzały, '+(w?'od strony '+w:'blisko')+'. Prosi, żebyście się pospieszyli.');}
 H.relN++;}
const SWAT_PAL=Object.assign({},PAL.squad,{body:'#1c2024',vest:'#2a2e24',legs:'#1c2024',head:'#22262a'});
function rogueCheck(dt){const H=G.h,L=G.p1;if(H.rogue||!L)return;let rk=0;for(const u of G.units)if(u.team==='civ'&&!u.alive&&u.kind!=='corpse'&&u.killedBy&&u.killedBy.human)rk++;H.rk=rk;
 const o=G.squad.find(q=>q&&q.alive&&!q.human);
 if(rk>=1&&(H.rkW||0)<1){H.rkW=1;if(o)say(o.name,'Wstrzymaj ogień! To cywil!!');setTimeout(()=>{if(!G.ended)radio('DISPATCH','Zgłoszenie: strzał funkcjonariusza do cywila. Davis, potwierdź.',{prio:1});},1500);logEv('Funkcjonariusz strzela do cywila');}
 if(rk>=2&&H.rkW<2){H.rkW=2;if(o){say(o.name,'Davis, co ty robisz?! Opuść broń!');turnTo(o,Math.atan2(L.y-o.y,L.x-o.x),1,99);}setTimeout(()=>{if(!G.ended)radio('DISPATCH','Davis, natychmiast wstrzymaj ogień! To rozkaz! Informuję dowódcę SWAT.',{prio:1});},1200);}
 if(rk>=3)swatTakedown();}
function swatTakedown(){const H=G.h,L=G.p1;H.rogue=true;G.lockIn=true;logEv('SWAT: zatrzymanie funkcjonariusza');
 radio('DISPATCH','Wszystkie jednostki: funkcjonariusz Davis strzela do cywilów! SWAT — zielone światło na zatrzymanie!',{prio:1});
 for(const q of G.squad)if(q&&q.alive&&!q.human){setHold(q,Math.atan2(L.y-q.y,L.x-q.x));q.target=null;}
 H.swat=[];let k=0;for(let i=0;i<16&&k<3;i++){const a=L.ang+Math.PI+(k-1)*.7+rand(-.2,.2),tx=L.x+Math.cos(a)*TS*3,ty=L.y+Math.sin(a)*TS*3;if(!walkable(tx/TS|0,ty/TS|0))continue;
  const s=new Unit({team:'police',weap:'rifle',name:'SWAT',pal:Object.assign({},SWAT_PAL)});s.x=L.x+Math.cos(a)*TS*9;s.y=L.y+Math.sin(a)*TS*9;s.gx=tx;s.gy=ty;s.pose='stand';s.ang=a+Math.PI;G.police.push(s);H.swat.push(s);k++;}
 setTimeout(()=>{if(G.ended)return;say('SWAT','POLICJA! RZUĆ BROŃ! NA ZIEMIĘ!');SND.door&&SND.door(L.x,L.y,true);},1300);
 setTimeout(()=>{if(G.ended)return;for(const s of H.swat){SND.gun('rifle',s.x,s.y);for(let i=0;i<4;i++)G.fx.push({k:'dust',x:s.x+Math.cos(s.ang)*10,y:s.y-6+Math.sin(s.ang)*10,vx:rand(-20,20),vy:rand(-20,20),t:0,life:.12,c:'#ffe8a0'});}
  for(let i=0;i<8;i++)G.fx.push({k:'dust',x:L.x,y:L.y-6,vx:rand(-50,50),vy:rand(-50,20),t:0,life:.5,c:'#8a1410'});woundUnit(L,H.swat[0],0);H.down=true;G.shake=.6;},3000);
 setTimeout(()=>{if(G.ended)return;say('SWAT','Podejrzany obezwładniony. Zakuwamy. Medyk do funkcjonariusza.');},4700);
 setTimeout(()=>{endMission(false,'Strzelałeś do cywilów. Zostałeś postrzelony i zatrzymany przez SWAT.');},7200);}
function updateSchool(dt){const H=G.h;if(!H||G.ended)return;H.t+=dt;if(H.flash>0)H.flash-=dt;schoolAtmo(dt);rogueCheck(dt);
 if(H.rogue){const L=G.p1;for(const s of H.swat||[]){const d=dist(s.x,s.y,s.gx,s.gy);if(d>2){s.x+=(s.gx-s.x)/d*Math.min(d,120*dt);s.y+=(s.gy-s.y)/d*Math.min(d,120*dt);s.moving=true;}else s.moving=false;s.ang=Math.atan2(L.y-s.y,L.x-s.x);}if(H.down){L.pose='kneel';L.holster=true;}return;}
 emmaCall(dt);
 if(!H.geared)for(const q of G.squad)if(q&&q.alive&&!q.human&&(!q.task||q.task.type!=='hold'))setHold(q,-Math.PI/2);
 if(!H.inside&&G.squad.some(q=>q&&q.alive&&(inGF(q)||inUF(q)))){H.inside=true;radio(G.p1.name,'Jesteśmy w środku. Parter.',{radio:1});logEv('Zespół wchodzi do budynku');}
 let v=H.vicStart;for(const u of G.units)if(u.team==='civ'&&!u.alive&&u.kind!=='corpse'&&!(u.killedBy&&u.killedBy.team==='squad'))v++;if(v>H.vic){if(!G.ended)radio('DISPATCH',pick(['Kolejna osoba trafiona przed szkołą!','Mamy następnego rannego przy wejściu!','Strzał z okna, ktoś leży na trawniku!']));H.vic=v;}
 const e=H.sh;if(H.endT==null&&(!e.alive||e.state==='cuffed')){H.endT=3;H.arrT=H.t;radio(G.p1.name,e.alive?'Strzelec zatrzymany! Powtarzam, strzelec zatrzymany!':'Strzelec zneutralizowany! Potrzebne karetki do środka, wiele ofiar!',{radio:1});setTimeout(()=>{if(!G.ended)radio('DISPATCH','Przyjęłam. Wszystkie zespoły medyczne do budynku.'+(H.call?' Emma pyta, czy to już koniec. Mówię jej, że tak.':''));},1200);}
 if(H.endT!=null){H.endT-=dt;if(H.endT<=0)endMission(true,e.alive?'Strzelec zatrzymany. Szkoła zabezpieczona.':'Strzelec zneutralizowany. Szkoła zabezpieczona.');}}
function schoolStress(dt,L){const c=A.ctx;if(!c||!L)return;const t=c.currentTime,ins=inGF(L)||inUF(L);
 if(!A.alarmG){A.alarmG=c.createGain();A.alarmG.gain.value=0;A.alarmG.connect(A.master);
  A.heliG=c.createGain();A.heliG.gain.value=0;A.heliG.connect(A.master);const s=c.createBufferSource();s.buffer=A.noise;s.loop=true;const hp=c.createBiquadFilter();hp.type='lowpass';hp.frequency.value=260;const am=c.createGain();am.gain.value=.5;const lf2=c.createOscillator();lf2.frequency.value=11;const lg2=c.createGain();lg2.gain.value=.5;lf2.connect(lg2);lg2.connect(am.gain);s.connect(hp);hp.connect(am);am.connect(A.heliG);s.start();lf2.start();}
 A.alarmG.gain.setTargetAtTime(G.ended?0:ins?.06:.02,t,.2);A.heliG.gain.setTargetAtTime(G.ended?0:ins?.02:.09,t,.8);
 // pulsujący alarm: trzy sygnały, przerwa (wzór temporal-3)
 const H=G.h;H.alarmT-=dt;if(H.alarmT<=0&&!G.ended){H.alarmT=2.4;for(let k=0;k<3;k++){const t0=t+k*.5,o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.value=3100;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(.5,t0+.01);g.gain.setValueAtTime(.5,t0+.3);g.gain.linearRampToValueAtTime(0,t0+.32);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=ins?3400:1400;o.connect(g);g.connect(lp);lp.connect(A.alarmG);o.start(t0);o.stop(t0+.35);}H.alarmP=G.time;}}
function schoolOver(c,cx,cy,dt){if(!SROOFS[0].cv)bakeSchoolRoofs();const ins=(R,u)=>u&&u.alive&&u.x>=R.x0*TS&&u.x<=(R.x1+1)*TS&&u.y>=R.y0*TS&&u.y<=(R.y1+1)*TS;const wa=weatherAlpha();
 for(const R of SROOFS){const tg=(ins(R,G.p1)||ins(R,G.p2)||(R.gf&&roofPeek({x0:R.x0,y0:R.y0,x1:R.x1,y1:R.y1})))?0:1;R.a+=(tg-R.a)*Math.min(1,dt*6);if(R.a<.02)continue;const x=R.x0*TS-2-cx,y=R.y0*TS-WH-cy-(R.band||0);if(x>VW||y>VH||x+R.cv.width<0||y+R.cv.height<0)continue;
  c.globalAlpha=R.a;c.drawImage(R.cv,Math.round(x),Math.round(y));c.globalAlpha=R.a*(1-wa)*.9;c.fillStyle='#000';c.fillRect(Math.round(x),Math.round(y),R.cv.width,R.cv.height-6);c.globalAlpha=1;
  if(R.gf&&G.h&&G.h.flash>0&&R.a>.3){const fx=G.h.flashX*TS+6-cx,fy=y+R.cv.height-6-R.band+3;c.globalCompositeOperation='lighter';const g=c.createRadialGradient(fx,fy,0,fx,fy,26);g.addColorStop(0,'rgba(255,220,140,.9)');g.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=g;c.fillRect(fx-26,fy-26,52,52);c.globalCompositeOperation='source-over';P(c,fx-2|0,fy-2|0,5,4,'#fff6d8');}}}
const SROOFS=[{x0:14,y0:22,x1:63,y1:36,gf:true,band:16},{x0:14,y0:1,x1:63,y1:16}];
function bakeSchoolRoofs(){for(const R of SROOFS){const W=(R.x1-R.x0+1)*TS+4,B=R.band||0,Hh=(R.y1-R.y0+1)*TS-6+B,cv=document.createElement('canvas');cv.width=W;cv.height=Hh+6;const g=cv.getContext('2d'),r=rng(R.x0*7+R.y0);
  P(g,0,0,W,Hh,'#6a6862');for(let i=0;i<W*Hh/6;i++){P(g,r()*W|0,r()*Hh|0,1,1,r()<.5?'#7a7872':'#585650');}
  P(g,0,0,W,3,'#9a968e');P(g,0,0,3,Hh,'#9a968e');P(g,W-3,0,3,Hh,'#8a867e');P(g,0,Hh-B-3,W,3,'#9a968e');
  for(let k=0;k<5;k++){const x=20+k*(W-60)/4|0,y=18+(k%2)*40;P(g,x+3,y+16,24,4,'rgba(0,0,0,.35)');P(g,x,y,24,16,'#a8acb0');P(g,x,y,24,2,'#c8ccd0');P(g,x+4,y+4,16,8,'#6a6e72');for(let j=0;j<4;j++)P(g,x+5,y+5+j*2,14,1,'#4a4e52');}
  for(let k=0;k<10;k++){const x=r()*(W-10)|0,y=10+r()*(Hh-B-30)|0;P(g,x,y,4,4,'#2a2a2a');P(g,x+1,y,2,1,'#5a5a5a');}
  if(B){const y0=Hh-B;P(g,0,y0,W,B,'#9a5440');for(let yy=y0+2;yy<Hh;yy+=3)P(g,0,yy,W,1,'#7a4232');for(let yy=y0;yy<Hh;yy+=3)for(let xx=((yy/3|0)%2)*4;xx<W;xx+=8)P(g,xx,yy,1,3,'#7a4232');
   P(g,0,y0,W,2,'#c8c4b8');P(g,0,Hh-2,W,2,'#5a3226');
   for(const wx of SC.ufWin){const x=(wx-R.x0)*TS+2+2;P(g,x,y0+4,12,9,'#e0dcd0');P(g,x+1,y0+5,10,7,'#1a2632');P(g,x+2,y0+6,3,2,'#3a5a72');P(g,x+6,y0+5,1,7,'#e0dcd0');
    if([18,26,28,39,41,49,51].includes(wx)){P(g,x+1,y0+5,10,7,'#0e1218');P(g,x+2,y0+6,2,1,'#8aa');P(g,x+8,y0+10,2,1,'#8aa');P(g,x+4,y0+8,1,1,'#8aa');}}
   P(g,(38-R.x0)*TS-10,y0+3,40,6,'#1a2a4a');P(g,(38-R.x0)*TS-8,y0+4,36,1,'#e8d8a8');}
  P(g,0,Hh,W,3,'rgba(0,0,0,.35)');R.cv=cv;R.a=1;}}
function schoolRender(c,cx,cy){const H=G.h;if(!H)return;
 {const fx=47*TS+9-cx,fy=39*TS-44-cy;for(let i=0;i<14;i++){const o=Math.round(Math.sin(G.time*4+i*.6)*1.2);for(let j=0;j<8;j++)P(c,fx+i,fy+j+o,1,1,i<6&&j<4?'#2a3a8a':(j%2?'#e8e8e4':'#c8302a'));}}
 // stroboskopy zsynchronizowane z sygnałem
 const dp=G.time-(H.alarmP||-9),on=!G.ended&&dp<1.3&&(dp%.5)<.1;if(on){c.globalCompositeOperation='lighter';for(const[x,y]of SC.strobes){const sx=x*TS+8-cx,sy=y*TS+8-cy;if(sx<-60||sy<-60||sx>VW+60||sy>VH+60)continue;const g=c.createRadialGradient(sx,sy,0,sx,sy,46);g.addColorStop(0,'rgba(255,255,255,.4)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(sx-46,sy-46,92,92);}c.globalCompositeOperation='source-over';}
 // światła karetek
 const ab=((G.time*4)|0)%2;for(const[ax,ay,ox]of[[66,32,48],[72,32,48],[68,47,68]]){const x=ax*TS+ox-cx,y=ay*TS+4-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,30);g.addColorStop(0,ab?'rgba(255,40,30,.25)':'rgba(40,90,255,.25)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(x-30,y-30,60,60);c.globalCompositeOperation='source-over';}
 if(H.ring){const x=H.ring.x-cx,y=H.ring.y-cy,k=((H.ring.t*8)|0)%2;c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(x,y,0,x,y,14);gr.addColorStop(0,'rgba(170,210,255,'+(k?.55:.3)+')');gr.addColorStop(1,'rgba(170,210,255,0)');c.fillStyle=gr;c.fillRect(x-14,y-14,28,28);c.globalCompositeOperation='source-over';P(c,(x-1+k)|0,(y-2)|0,3,4,'#dff0ff');}
 for(const[fx,fy]of SC.flick){const x=fx*TS+8-cx,y=fy*TS+8-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;const n=Math.sin(G.time*23+fx)*Math.sin(G.time*7.3)+Math.sin(G.time*1.7+fy);const a=n>.6?.08:n>-.2?.45:.62;const gr=c.createRadialGradient(x,y,4,x,y,52);gr.addColorStop(0,'rgba(0,0,0,'+a+')');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(x-52,y-52,104,104);}
 c.globalCompositeOperation='lighter';for(const[ty,tx]of[[31,16],[31,61],[7,16],[10,61],[28,13]]){const x=tx*TS+8-cx,y=ty*TS-cy;if(x<-30||y<-30||x>VW+30||y>VH+30)continue;const gr=c.createRadialGradient(x,y,0,x,y,16);gr.addColorStop(0,'rgba(60,240,120,.22)');gr.addColorStop(1,'rgba(60,240,120,0)');c.fillStyle=gr;c.fillRect(x-16,y-16,32,32);}c.globalCompositeOperation='source-over';
 for(const g of H.crowd||[]){if(!g.phone||!g.alive)continue;const x=g.x+Math.cos(g.ang)*4-cx,y=g.y-13+Math.sin(g.ang)*2-cy;P(c,x|0,y|0,2,3,'#d8e8ff');}
 for(const cm of[H.cam]){if(!cm)continue;const x=cm.x+Math.cos(cm.ang)*5-cx,y=cm.y-13+Math.sin(cm.ang)*3-cy;P(c,x-2|0,y-2|0,6,4,'#1a1a1a');c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,28);g.addColorStop(0,'rgba(255,250,230,.3)');g.addColorStop(1,'rgba(255,250,230,0)');c.fillStyle=g;c.fillRect(x-28,y-28,56,56);c.globalCompositeOperation='source-over';}
 if(H.rep){const x=H.rep.x+3-cx,y=H.rep.y-11-cy;P(c,x|0,y|0,2,3,'#1a1a1a');P(c,x|0,(y-1)|0,2,1,'#c8201a');}
 if(!H.geared){const x=SC.trunk.x*TS-cx,y=SC.trunk.y*TS-cy,k=.5+.5*Math.sin(G.time*4);c.strokeStyle='rgba(232,196,106,'+(.35+.4*k)+')';c.lineWidth=1;c.beginPath();c.ellipse(x,y,7+k*2,4+k,0,0,6.283);c.stroke();}}
function schoolObj(){const H=G.h;if(!H)return'';const e=H.sh,dn=!e.alive||e.state==='cuffed';const sv=Object.keys(H.safe).length;
 return objRows('',[[H.geared,'Weź wyposażenie z radiowozu'],[H.inside,'Wejdź do budynku'],[dn,'Zneutralizuj strzelca']],'<div class="opt">Ofiary: '+H.vic+(sv?' · sale: '+sv+'/3':'')+'</div>'+(H.call?'<div class="opt call911">☎ 911 · Emma · sala 202 · '+fmtT(H.t-H.callT0)+(H.emmaSafe?' · odnaleziona':'')+'</div>':''));}
function schoolDebrief(){const H=G.h||{},s=G.stats,e=H.sh;if(H.rogue){patrolDebrief([['Status','zatrzymany przez SWAT','bad'],['Cywile zastrzeleni przez ciebie',H.rk||0,'bad'],['Ofiary łącznie',H.vic||0],['Strzelec',!e?'—':!e.alive?'nie żyje':'na wolności']],0);return;}let sc=(G.win?60:0)+(H.emmaSafe?8:0)+Object.keys(H.safe||{}).length*6-Math.max(0,(H.vic||0)-(H.vicStart||0))*6-s.civKilled*30-s.squadLost*12+Math.max(0,30-Math.floor(s.time/20));
 patrolDebrief([['Czas do neutralizacji',H.arrT?fmtT(H.arrT):'—'],['Ofiary po przyjeździe',Math.max(0,(H.vic||0)-(H.vicStart||0)),(H.vic||0)>(H.vicStart||0)?'bad':'good'],['Ofiary łącznie',H.vic||0],['Strzelec',!e?'—':!e.alive?'nie żyje':e.state==='cuffed'?'zatrzymany':'na wolności'],['Sale z ukrytymi',Object.keys(H.safe||{}).length+' / 3'],['Emma (zgłoszenie 911)',H.emmaSafe?'odnaleziona':H.call?'czekała do końca':'—',H.emmaSafe?'good':'']],sc);}
LVL.school={id:'school',patrol:true,nvg:false,lit:.88,weather:'day',ext:'brick',terrain:schoolTerrain,windows:schoolWindows,decor:schoolDecor,rooms:ROOMS_SCHOOL,doors:DOORS_SCHOOL,furn:FURN_SCHOOL,lamps:LAMPS_SCHOOL,cams:[],entries:ENTRIES_SCHOOL,
 spawn:spawnSchoolTeam,start:startSchool,update:updateSchool,interact:schoolInteract,render:schoolRender,over:schoolOver,stress:schoolStress,obj:schoolObj,debrief:schoolDebrief,
 crew:{role:'Patrol Officer',shout:'Police! Drop it!'},car:{b:'#dde0e3',hi:'#eef0f2',lo:'#a8acb0',e:'#dde0e3',r:'#d4d7da',rh:'#e6e8ea',rl:'#b0b4b8',s:'#1e3c8a'},
 wallCol:rb=>{const n=rb>=0?ROOMS[rb].n:'';return n.startsWith('Korytarz')?['#d0ccb8','#a29e8a']:n==='Hol główny'?['#d4c4a4','#a49474']:n.startsWith('Toaleta')?['#c4d4d8','#94a4aa']:n==='Stołówka'?['#e0d4b0','#b0a480']:n==='Biblioteka'?['#b89c78','#8a7052']:n==='Sekretariat'?['#c8c0b0','#989080']:n.startsWith('Klatka')?['#bcbec0','#8c8e90']:['#ddd6be','#ada68e'];},
 win:'Wszystkie jednostki: strzelec zneutralizowany. Medycy do środka.',planTitle:'MILLBROOK HIGH SCHOOL · PARTER / PIĘTRO',
 nb:{no:'#26-141-1407',pri:'P1',code:'ACTIVE SHOOTER',small:'ADRES',addr:'MILLBROOK<br>HIGH SCHOOL',facts:[['JEDNOSTKI','Fairview PD · Hamilton Co. Sheriff'],['GODZINA','14:07 · słonecznie'],['STATUS','strzały z okien piętra, liczne ofiary']],
  title:'911 · ZAPIS ROZMOWY',clock:[14,3,12],who:{D:'DYSPOZYTOR',C:'NAUCZYCIELKA'},bg:[12,20,58,38],
  call:[['D','Fairview, numer alarmowy.'],['C','(szeptem) Millbrook High... ktoś strzela. Na korytarzu. Słyszałam co najmniej kilkanaście strzałów.'],['D','Gdzie pani jest?'],['C','Sala sto pięć, parter. Zamknęłam drzwi, mam dwadzieścia troje dzieci. Leżymy na podłodze.'],['D','Widziała pani sprawcę?'],['C','Jeden mężczyzna, czarne ubranie, strzelba. Poszedł na górę... teraz słychać strzały z okien na piętrze.'],['D','Proszę nie otwierać drzwi nikomu, dopóki policja się nie przedstawi. Jednostki są na miejscu.'],['C','Proszę się pospieszyć...']]}};
