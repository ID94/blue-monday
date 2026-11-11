
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
 F_('bed',44,20);F_('deskPC',48,20);F_('cans',49,21);F_('pizza',48,23);F_('clothes',44,22);F_('shoes',49,22);F_('gchair',48,21);F_('shelf',49,23);F_('clothes',46,22);F_('clothes',47,23);F_('cans',45,23);F_('pizza',46,20);F_('bottle',45,22);F_('ashtray',47,22);F_('papers',44,23);
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
 F_('police',34,40);F_('car',62,43);F_('car',24,43);F_('car',8,43);F_('car',20,35);F_('car',67,35);F_('car',55,36);
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
F('police',3,2,1,0,(g,X,Y,W_,H_,SD)=>{const K=Object.assign({b:'#e8eaec',hi:'#f8f9fa',lo:'#aeb2b6',e:'#141518',r:'#e2e5e7',rh:'#f2f4f5',rl:'#bcc0c4',s:null,oy:0},(typeof LD==='function'&&LD().car)||{});
 const x=X,Y0=Y+K.oy+3,E=K.e,GL='#141c24',GR='#40607a',CH='#a0a6ac',sd=c=>shade(c,-40);
 const T=(dx,dy,w,h,c)=>P(g,x+dx,Y0+dy,w,h,c),R=(dx,dy,w,h,c)=>P(g,x+dx,Y0-3+dy,w,h,c);
 // cień
 P(g,x+2,Y0+20,46,3,SH);P(g,x+5,Y0+23,40,1,'rgba(0,0,0,.15)');
 // bok (strona bliższa kamerze)
 T(2,17,44,3,sd(K.b));T(1,17,10,3,sd(E));T(33,17,14,3,sd(E));T(2,20,44,1,'#18191c');
 if(K.s)T(11,18,22,1,K.s);for(const dx of[14,22,29])T(dx,17,1,3,shade(K.b,-80));T(19,17,2,1,'#6a6e74');T(26,17,2,1,'#6a6e74');T(16,18,2,2,'#c8a028');
 T(46,17,1,2,'#f6f2dc');T(1,17,1,2,'#d02a1e');T(47,16,2,4,'#0e0f11');
 for(const wx of[6,34]){T(wx,19,8,3,'#08080a');T(wx+3,20,2,1,'#6a6e74');}
 // płaszczyzna górna nadwozia
 T(2,0,44,17,K.b);T(1,1,46,16,K.b);T(3,0,42,1,K.hi);T(1,16,46,1,K.lo);
 T(33,0,13,17,E);T(33,1,14,16,E);T(1,1,10,16,E);T(2,0,9,17,E);T(34,0,11,1,shade(E,18));T(2,0,8,1,shade(E,18));
 T(37,8,8,1,shade(E,-22));T(38,4,7,1,shade(E,-14));T(38,12,7,1,shade(E,-14));
 T(47,2,2,14,'#0e0f11');T(48,3,1,12,'#2c2e32');T(47,6,2,1,'#3c3e42');T(47,11,2,1,'#3c3e42');T(0,3,1,12,'#1a1b1e');
 T(45,1,2,3,'#f6f2dc');T(45,13,2,3,'#f6f2dc');T(46,2,1,1,'#fff');T(46,14,1,1,'#fff');T(46,5,1,2,'#d89a2a');T(46,10,1,2,'#d89a2a');
 T(1,1,1,3,'#c0201a');T(1,13,1,3,'#c0201a');T(2,2,1,1,'#ff4a3a');T(2,14,1,1,'#ff4a3a');
 T(31,-1,2,1,E);T(31,17,2,1,E);
 // szyby: przednia, tylna, boczna (bliższa)
 T(29,3,1,11,GL);T(30,2,1,13,GL);T(31,1,2,15,GL);T(31,3,1,3,GR);T(32,2,1,2,'#6a8aa2');T(30,11,1,2,'#2a3c4c');
 T(12,3,2,11,GL);T(11,4,1,9,GL);T(12,4,1,3,GR);
 R(13,15,17,3,GL);R(22,15,1,3,shade(K.b,-30));R(14,15,5,1,GR);R(24,15,3,1,'#2e4458');
 // dach
 R(14,2,15,13,K.r);R(14,2,15,1,K.rh);R(14,14,15,1,K.rl);R(14,3,1,11,K.rh);
 const dg=(ox,rows)=>rows.forEach((r,j)=>{for(let k=0;k<3;k++)if(r[k]==='1')R(ox+k,6+j,1,1,'#1a1c20');});
 const DGF=['111101101101111','010110010010111','111001111100111','111001111001111','101101111001001','111100111001111','111100111101111','111001010010010','111101111101111','111101111001111'],nn=10+((SD>>>0)*7919)%89;dg(16,DGF[(nn/10)|0].match(/.../g));dg(25,DGF[nn%10].match(/.../g));
 // belka świetlna
 R(20,1,4,14,'#0e0f12');R(20,1,4,1,CH);R(21,2,2,5,'#b81a14');R(21,2,1,5,'#ff4a3a');R(21,9,2,5,'#1640b8');R(21,9,1,5,'#4a7aff');R(21,7,2,2,'#e8eef4');R(20,15,4,1,'#2a2c30');
 // lusterka, szperacz
 T(30,-1,2,1,E);T(30,17,2,1,E);R(28,1,2,1,CH);});

// ---- level switch ----
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
 {id:'holster',x:49,y:21,msg:'W szufladzie biurka pusta kabura, pudełko nabojów dziewięć milimetrów... i mały kluczyk do kłódki.'},
 {id:'bench',x:52,y:26,msg:'Na stole warsztatowym rolka folii i taśma.'},
 {id:'drag',x:54,y:27,msg:'Smugi na betonie, jakby coś ciągnięto.'}];
const FREEZER={x:56*16,y:26*16+4};
function houseScen(){return{intel:[[41,25,'ZGŁOSZENIE']],est:[1,1],hroom:'Klonowa 14',hide:[],en:[],traps:[]};}
function spawnPatrol(E){spawnPatrolPair(E);}
function startHouse(){
 G.hostage=null;G.deadline=1e9;
 G.h={asked:{},consent:false,search:false,padKey:false,talked:false,opened:false,clues:CLUES.map(c=>({...c,found:false})),nf:0,freezer:false,said:{},react:null,endT:null,result:null};
 const s=new Unit({team:'civ',kind:'suspect',pal:{...PAL_SUSPECT},state:'door',r:4,name:'Ethan Hartley'});s.x=47*TS+8;s.y=32*TS+8;s.ang=Math.PI;s.room=LV.room[I(47,32)];G.h.s=s;G.civs.push(s);G.units.push(s);
 const n=new Unit({team:'civ',kind:'neighbor',pal:{...PAL_NEIGH},state:'work',r:4,workA:-Math.PI/2+.5});n.x=27*TS+8;n.y=37*TS+8;n.ang=n.workA;G.h.n=n;G.civs.push(n);G.units.push(n);
 G.police=[];
 houseTraces();logEv('2-Adam-14 na miejscu: 214 Oakridge Lane');
 setTimeout(()=>{radio('DISPATCH','2-Adam-14, dwieście czternaście Oakridge Lane. Sąsiadka zgłasza krzyki i dwa huki około piątej pięćdziesiąt.');radio(G.p1?G.p1.name:'2-ADAM-14','2-Adam-14, przyjąłem. Jesteśmy na miejscu.',{radio:1});},700);}
function houseTraces(){const r=rng(14);
 for(let k=0;k<5;k++)P(wc,Math.round(41*TS+3+r()*10),Math.round(29*TS+4+r()*8),1,1,'rgba(80,14,14,.5)');
 if(WR[26]){const g=WR[26].getContext('2d');P(g,38*TS+6,19,4,4,'rgba(200,190,170,.5)');P(g,38*TS+7,20,2,2,'#111');}
}
function houseInteract(u){const H=G.h;if(!H)return null;const fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8,near=(x,y,r)=>Math.min(dist(fx,fy,x,y),dist(u.x,u.y,x,y))<(r||16);
 const fd=LV.doorAt[I(42,34)];if(!H.knocked&&fd&&!fd.broken&&fd.target===0&&near(42*TS+8,34*TS+8,22)&&u.y>34*TS)return{k:'house',label:'Zapukaj do drzwi',dur:0,f:knockDoor};
 const s=H.s;if(s.alive&&s.team==='civ'&&!H.talked&&s.state==='opened'&&near(s.x,s.y,30))return{k:'house',label:'Porozmawiaj z mieszkańcem',dur:0,f:talkSuspect};
 if(s.alive&&s.team==='civ'&&H.talked&&!['cuffed','escape','comply','odd'].includes(s.state)&&near(s.x,s.y,26))return{k:'house',label:'Rozmowa z Ethanem',dur:0,f:ethanMenu};
 if(s.alive&&s.state==='cuffed'&&!H.inCar){if(s.escort===u&&nearPt(u,35.2*TS,39.4*TS,26)&&dist(s.x,s.y,u.x,u.y)<TS*3)return{k:'house',label:'Posadź zatrzymanego w radiowozie',dur:1.6,f:putInCar};
  if(near(s.x,s.y,22))return{k:'house',label:s.escort?'Puść zatrzymanego':'Prowadź zatrzymanego',dur:0,f:(u)=>{s.escort=s.escort?null:u;s.path=null;if(s.escort){say(u.name,pick(['Idziemy. Powoli.','Wstawaj. Idziesz ze mną.','Spokojnie, idziemy do auta.']));logEv('Zatrzymany prowadzony do radiowozu');}}};}
 for(const g of H.gawk||[])if(g.alive&&!g.told&&near(g.x,g.y,22))return{k:'house',label:'Odsuń gapia',dur:0,f:(u)=>gawkBack(u,g)};
 const n=H.n;if(n.alive&&!H.said.neigh&&near(n.x,n.y,20))return{k:'house',label:'Porozmawiaj z sąsiadką',dur:0,f:talkNeighbor};
 if(H.search)for(const c of H.clues)if(!c.found&&near(c.x*TS+8,c.y*TS+8,13))return{k:'house',label:'Przyjrzyj się',dur:.8,f:(u)=>findClue(u,c)};
 if(!H.freezer&&near(FREEZER.x,FREEZER.y,20)){if(!H.search)return null;if(!H.padKey)return{k:'house',label:'Zamrażarka — kłódka',dur:0,f:(u)=>{if(!H.said.pad){H.said.pad=1;logEv('Zamrażarka w garażu zamknięta na kłódkę');}say(u.name,'Zamrażarka na kłódkę. Nowa kłódka, na starej zamrażarce... Kluczyk musi gdzieś być w domu.');}};return{k:'house',label:'Otwórz kłódkę i zamrażarkę',dur:1.8,f:openFreezer};}
 return null;}
function knockDoor(u){const H=G.h;H.knocked=true;logEv(u.name+' puka do drzwi');if(A.ctx){const o=out(42*TS+8,34*TS+8,.6,{rev:.15}),t0=A.ctx.currentTime;if(o)for(let k=0;k<3;k++){nz(o,t0+k*.24,.08,{brown:1,type:'lowpass',f:420,g:1});tone(o,t0+k*.24,.06,{f:110,f2:70,g:.5});}}
 radio(u.name,'Policja! Proszę otworzyć!');setTimeout(()=>{if(G.ended)return;const s=H.s;if(s.alive&&s.team==='civ'&&s.state==='door'){s.state='answer';s.path=null;}},rand(2500,4000));}
function ethanMenu(u){const H=G.h,s=H.s,A_=H.asked,it=[],ask=(k,q,a,f)=>{if(A_[k])return;it.push({t:q,f:()=>{A_[k]=1;s.state=s.state==='opened'?'opened':s.state;turnTo(s,Math.atan2(u.y-s.y,u.x-s.x),1,9);say(u.name,q.replace(/[„”]/g,''));setTimeout(()=>{if(!G.ended&&s.alive&&s.team==='civ')say('ETHAN HARTLEY',a);if(f)f();},900);}});};
 ask('noise','„Sąsiadka słyszała krzyki i dwa huki. Co się stało?”','Nic się nie stało. Grałem w grę, może to z głośników. Albo fajerwerki, dzieciaki tu ciągle odpalają.');
 ask('parents','„Gdzie są twoi rodzice?”','U ciotki w Columbus. Pojechali wczoraj wieczorem... albo dziś rano. Nie pamiętam. Spałem.',()=>{H.said.lie=1;logEv('Ethan: rodzice u ciotki (niespójna wersja)');});
 ask('who','„Kto jeszcze jest w domu?”','Nikt. Tylko ja.');
 if(A_.parents)ask('call','„Możesz do nich zadzwonić? Chcemy tylko usłyszeć, że wszystko w porządku.”','Nie odbierają... Pewnie są w drodze. Słaby zasięg.',()=>{if(!H.said.callNo){H.said.callNo=1;logEv('Ethan nie potrafi skontaktować się z rodzicami');}});
 if(!H.idChecked)it.push({t:'„Poproszę jakiś dokument tożsamości.”',f:()=>checkId(u)});
 const n=Object.keys(A_).length;
 if(!H.consent)it.push({t:'„Musimy się rozejrzeć w środku. Zgodzisz się?”',dis:n<2||!H.idChecked,f:()=>askConsent(u)});
 if(H.consent&&!H.search)it.push({t:'Zacznij przeszukanie',f:()=>startSearch(u)});
 if(!it.length)it.push({t:'(Ethan nie ma nic do dodania)',dis:true,f:NOOP});
 choiceMenu('Ethan Hartley'+(H.idChecked?' (20)':''),it);}
function askConsent(u){const H=G.h,s=H.s;say(u.name,'Musimy się rozejrzeć w środku. Dla pewności, że nikomu nic się nie stało. Zgodzisz się?');
 setTimeout(()=>{if(G.ended||!s.alive||s.team!=='civ')return;say('ETHAN HARTLEY','Serio? ...Dobra. Tylko niczego nie ruszajcie.');H.consent=true;logEv('Ethan zgadza się na rozejrzenie się po domu');startSearch(u);},1200);}
function startSearch(u){const H=G.h,s=H.s;if(H.search)return;H.search=true;if(s.state==='opened'||s.state==='talk')s.state='calm';
 const o=G.squad.find(q=>q&&q.alive&&!q.human);if(o){o.watch=s;o.holster=true;setTimeout(()=>{if(!G.ended)say(o.name,pick(['Zostanę z nim w salonie. Rozejrzyj się.','Mam go. Ty sprawdź dom.']));},700);setTimeout(()=>{if(!G.ended&&s.alive&&s.team==='civ')say(o.name,'Ethan, usiądź na kanapie. Ręce tak, żebym je widział.');},2600);}
 logEv('Przeszukanie domu — partner pilnuje Ethana');}
function partnerWatch(u,dt){const s=u.watch,H=G.h;if(!s||!s.alive||s.team!=='civ'||s.state==='cuffed'||H.freezer){u.watch=null;return false;}
 const d=dist(u.x,u.y,s.x,s.y);if(d>TS*1.7){const tx=s.x/TS|0,ty=s.y/TS|0;if(!u.path||u.wg!==tx+','+ty||(u.wr-=dt)<=0){u.path=findPath(u.x/TS|0,u.y/TS|0,tx,ty,3000);u.wg=tx+','+ty;u.wr=.6;}
  if(u.path)for(const n of u.path.slice(0,3)){const dd=LV.doorAt[I(n[0],n[1])];if(dd&&dd.target===0&&!dd.locked&&!dd.broken&&dist(dd.x*TS+8,dd.y*TS+8,u.x,u.y)<TS*1.6)toggleDoor(dd,u);}
  if(!u.path||followPath(u,dt,s.state==='escape'?52:40))u.path=null;else if(u.moving)turnTo(u,Math.atan2(u.vy,u.vx),dt,6);}
 else{moveUnit(u,dt,0,0,0);turnTo(u,Math.atan2(s.y-u.y,s.x-u.x),dt,4);}u.pose='stand';return true;}
function talkSuspect(u){const H=G.h;H.talked=true;const s=H.s;s.state='talk';s.talkT=7.5;turnTo(s,Math.atan2(u.y-s.y,u.x-s.x),1,9);logEv('Rozmowa z synem przy drzwiach');
 radio(u.name,'Dzień dobry, policja. Mamy zgłoszenie o krzykach i hukach z tego domu.');
 setTimeout(()=>{if(!G.ended)toast('Porozmawiaj z Ethanem (E), zanim wejdziesz do środka');},2500);}
function talkNeighbor(u){G.h.said.neigh=1;say('MRS. KELLER','To ja dzwoniłam. Najpierw krzyki, chyba kobiece. Potem dwa huki i cisza. Wczoraj wieczorem jeszcze ich widziałam.');radio(u.name,'Dziękuję. Proszę zostać przy swoim domu.');logEv('Rozmowa z sąsiadką');}
function findClue(u,c){c.found=true;const H=G.h;H.nf++;if(c.id==='holster'){H.padKey=true;setTimeout(()=>{if(!G.ended)toast('Masz kluczyk do kłódki');},800);}logEv(c.msg.split('.')[0]+' ('+roomName(c.x*TS+8,c.y*TS+8)+')');radio(u.name,c.msg);
 if(c.id==='towels'&&!H.drawn){const o=G.squad.find(q=>q&&q.alive&&q!==u);radio(u.name,'Ortiz... coś tu nie gra. Broń w ręku.');if(o)radio(o.name,'Przyjąłem.');setTimeout(()=>drawWeapons('ręczniki w wannie'),900);}}
function drawWeapons(why){const H=G.h;if(!H||H.drawn)return;H.drawn=true;logEv('Funkcjonariusze wyciągają broń ('+why+')');for(const q of G.squad){if(!q||!q.alive)continue;q.holster=false;q.hTip=0;SND.reload(q.x,q.y,'pistol');}}
function openFreezer(u){const H=G.h;H.freezer=true;drawWeapons('zamrażarka');logEv('Zamrażarka w garażu: dwa ciała');SND.door(FREEZER.x,FREEZER.y,true);
 radio(u.name,'Dispatch... w zamrażarce są dwa ciała. Kobieta i mężczyzna.',{prio:1,radio:1});
 radio('DISPATCH','Przyjęłam. Wysyłam wsparcie i detektywów. Zachowajcie ostrożność.',{prio:1});
 const s=H.s;if(!s.alive||s.state==='cuffed'||s.team!=='civ')return;
 setTimeout(()=>{if(G.ended||!s.alive||s.state==='cuffed'||s.state==='comply')return;if(Math.random()<.5)armSuspect(s);else{s.state='escape';s.path=null;drawWeapons('ucieczka');say('ETHAN HARTLEY','Nie... nie, nie!');const L=nearestSquad(s);if(L)radio(L.name,'Ucieka! Tylnymi drzwiami!',{prio:1});logEv('Podejrzany ucieka');}},1300);}
function armSuspect(s){drawWeapons('podejrzany uzbrojony');const e=new Unit({team:'enemy',weap:'ePistol',pal:s.pal,fov:115,range:8,name:'Podejrzany',kind:'suspect'});e.x=s.x;e.y=s.y;e.ang=s.ang;e.home={x:e.x,y:e.y,a:e.ang,st:'guard'};
 const q=nearestSquad(e);e.state='search';e.goal={x:q?q.x:e.x,y:q?q.y:e.y};e.searchT=12;e.arrived=false;e.path=null;e.ico='!';e.icoT=2;e.res=12;
 G.civs.splice(G.civs.indexOf(s),1);G.units.splice(G.units.indexOf(s),1,e);G.enemies.push(e);G.h.s=e;
 say('ETHAN HARTLEY','Nie zabierzecie mnie! Słyszycie?!',{prio:1});logEv('Podejrzany wyciąga broń');}
function updateSuspect(c,dt){const H=G.h;
 if(c.stun>0){c.stun-=dt;moveUnit(c,dt,0,0,0);return;}
 if(c.state==='cuffed'||c.state==='comply'){if(c.state==='cuffed'&&!H.said.cuff){H.said.cuff=1;say('ETHAN HARTLEY',H.freezer?'...':'Za co?! Nic nie zrobiłem! To mój dom!');}
  const e=c.escort;if(c.state==='cuffed'&&e&&e.alive&&dist(e.x,e.y,c.x,c.y)>TS*1.3){c.pose='stand';const tx=e.x/TS|0,ty=e.y/TS|0;if(!c.path||c.goalT!==tx+','+ty||c.repT<=0){c.path=findPath(c.x/TS|0,c.y/TS|0,tx,ty,3000);c.goalT=tx+','+ty;c.repT=.5;}c.repT-=dt;if(c.path)for(const n of c.path.slice(0,3)){const dd=LV.doorAt[I(n[0],n[1])];if(dd&&dd.target===0&&!dd.locked&&!dd.broken&&dist(dd.x*TS+8,dd.y*TS+8,c.x,c.y)<TS*1.6)toggleDoor(dd,c);}if(!c.path||followPath(c,dt,38))c.path=null;else if(c.moving)turnTo(c,Math.atan2(c.vy,c.vx),dt,6);return;}
  moveUnit(c,dt,0,0,0);if(e)turnTo(c,Math.atan2(e.y-c.y,e.x-c.x),dt,3);return;}
 const goTo=(tx,ty,spd)=>{if(!c.path||c.goalT!==tx+','+ty){c.path=findPath(c.x/TS|0,c.y/TS|0,tx,ty,3000);c.goalT=tx+','+ty;}if(c.path)for(const n of c.path.slice(0,3)){const dd=LV.doorAt[I(n[0],n[1])];if(dd&&dd.target===0&&!dd.locked&&!dd.broken&&dist(dd.x*TS+8,dd.y*TS+8,c.x,c.y)<TS*1.6)toggleDoor(dd,c);}if(c.path&&!followPath(c,dt,spd)){if(c.moving)turnTo(c,Math.atan2(c.vy,c.vx),dt,6);return false;}c.path=null;moveUnit(c,dt,0,0,0);return true;};
 const face=()=>{const q=nearestSquad(c);if(q&&dist(q.x,q.y,c.x,c.y)<TS*9)turnTo(c,Math.atan2(q.y-c.y,q.x-c.x),dt,2.5);};
 const insideSquad=G.squad.some(q=>q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]>=0&&LV.room[I(q.x/TS|0,q.y/TS|0)]<=7);
 const d=LV.doorAt[I(42,34)];
 switch(c.state){
 case'door':{moveUnit(c,dt,0,0,0);turnTo(c,c.ang+Math.sin(G.time*.4)*.5,dt,.5);if(insideSquad){c.state='calm';H.talked=true;H.forced=true;say('ETHAN HARTLEY','Hej! Co wy robicie w moim domu?!');startSearch(G.p1);}break;}
 case'answer':{if(insideSquad){c.state='calm';H.talked=true;H.forced=true;startSearch(G.p1);break;}if(goTo(42,33,36)){c.ang=Math.PI/2;if(d&&!d.broken){d.locked=false;if(!d.target)toggleDoor(d,c);}c.state='opened';say('ETHAN HARTLEY','Tak...? Coś się stało?');}break;}
 case'opened':{moveUnit(c,dt,0,0,0);face();if(insideSquad&&!H.search){H.talked=true;H.forced=true;c.state='calm';say('ETHAN HARTLEY','Ej! Nie macie prawa tak wchodzić!');startSearch(G.p1);}break;}
 case'talk':{moveUnit(c,dt,0,0,0);face();c.talkT-=dt;if(c.talkT<=0)c.state='calm';break;}
 case'calm':{if(goTo(37+(c.pace?1:0),29,20))fidget(c,dt,face);
  if(!H.freezer&&!H.oddT&&G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,FREEZER.x,FREEZER.y)<TS*4.5)){c.state='odd';H.oddT=0.001;c.path=null;break;}
  if(!H.said.garage&&G.squad.some(q=>q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]===7)){H.said.garage=1;c.state='nerv';say('ETHAN HARTLEY','To tylko garaż. Ojciec trzyma tam swoje graty.');}break;}
 case'nerv':{if(!H.freezer&&!H.oddT&&G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,FREEZER.x,FREEZER.y)<TS*4.5)){c.state='odd';H.oddT=0.001;c.path=null;break;}if(goTo(48,29+(c.pace?1:0),22))fidget(c,dt,face,1);c.pose='stand';break;}
 case'odd':{oddBehaviour(c,dt,goTo,face);break;}
 case'escape':{const tx=H_ESCAPE.x/TS|0,ty=H_ESCAPE.y/TS|0;goTo(tx,ty,50);if(dist(c.x,c.y,H_ESCAPE.x,H_ESCAPE.y)<TS*1.5&&!G.ended){logEv('Podejrzany zbiegł');H.result='escaped';endMission(false,'Podejrzany uciekł.');}break;}
 default:moveUnit(c,dt,0,0,0);}}
function updateHouse(dt){const H=G.h;if(!H||G.ended)return;const s=H.s;if(!H.inside&&G.squad.some(q=>q&&q.alive&&LV.room[I(q.x/TS|0,q.y/TS|0)]>=0&&LV.room[I(q.x/TS|0,q.y/TS|0)]<=7))H.inside=true;
 if(H.endT==null){const done=!s.alive||H.inCar;if(H.freezer&&done){H.endT=H.inCar?3:2;H.result=s.alive?'arrested':'killed';}}
 else{H.endT-=dt;if(H.endT<=0){H.endT=1e9;endMission(true,H.result==='arrested'?'Ethan Hartley zatrzymany i przewieziony. Zbrodnia wykryta.':'Podejrzany nie żyje. Zbrodnia wykryta.');}}
 if(s.alive&&s.state==='cuffed'&&!H.cuffT){H.cuffT=1;radio(G.p1?G.p1.name:'2-ADAM-14','Dispatch, 2-Adam-14. Jedna osoba zatrzymana, doprowadzamy do radiowozu.',{radio:1});}
 gawkers(dt);
 G.h.n.workA=Math.atan2(30*TS-G.h.n.y,42*TS-G.h.n.x);}
function houseStress(dt,L){if(!L)return;houseDread(dt,L);tvAudio(L);houseAmb(dt,L);if(G.ended)return;morningLife(dt);
 for(const s of G.squad){if(!s.alive||!s.wounded)continue;s.breathT=(s.breathT||0)-dt;if(s.breathT<=0){s.breathT=s.treated?3.2:2;if(s.human)SND.breath(s.x,s.y,s.treated?.18:.35);}}
 }
function houseRender(c,cx,cy){const H=G.h;if(!H)return;houseLifeFx(c,cx,cy);
 if(H.freezer){const x=55*TS-cx,y=25*TS-cy-(FH.freezer||0);P(c,x+1,y-9,30,9,'#d8dcde');P(c,x+1,y-9,30,1,'#eef0f1');P(c,x+24,y-11,9,12,'#4a4038');P(c,x+26,y-11,1,12,'#3c342c');P(c,x+30,y-11,1,12,'#3c342c');P(c,x+2,y+1,28,11,'#1a2024');
  const seed=(G.time*11)|0,cols=['#5a6870','#7a8a90','#5c1f1f','#3a1414','#c8ccce','#4a4a44','#8a7a6a'];for(let j=0;j<10;j+=2)for(let i=0;i<26;i+=2){const hh=Math.sin(i*12.9898+j*78.233+seed*.37)*43758.5453;P(c,x+3+i,y+1+j,2,2,cols[Math.floor((hh-Math.floor(hh))*cols.length)]);}
  if(((G.time*2)|0)%2)P(c,x+27,y+3,2,2,'rgba(160,220,255,.4)');}}
function houseObj(){const H=G.h;if(!H)return'';const s=H.s,ar=s.state==='cuffed'||!s.alive,ins=H.talked&&H.inside;
 const row=(ok,t)=>'<div class="'+(ok?'ok':'no')+'">'+t+'</div>';
 const nq=Object.keys(H.asked||{}).length;
 return'<div class="h">Notatnik · J</div>'+row(H.talked,'Porozmawiaj z mieszkańcem')+(H.talked&&!H.forced?row(nq>=2&&H.idChecked,'Wypytaj i wylegitymuj Ethana'):'')+(H.talked?row(H.search,'Uzyskaj zgodę na rozejrzenie się'):'')+(H.search?row(H.padKey,'Przeszukaj dom'):'')+(H.search&&H.said.pad||H.padKey?row(H.freezer,'Sprawdź zamrażarkę w garażu'):'')+(H.freezer?row(ar,'Zatrzymaj podejrzanego'):'')+(s.alive&&s.state==='cuffed'?row(H.inCar,'Doprowadź zatrzymanego do radiowozu'):'')+(H.nf?'<div class="opt">Notatki: '+H.nf+'</div>':'');}
function houseBrief(){return`<div class="sec"><span class="lbl">JEDNOSTKA</span>Ridgefield PD · patrol <b>2-Adam-14</b><br>Ofc. Miller, Ofc. Ortiz</div>
<div class="sec"><span class="lbl">ADRES</span>214 Oakridge Lane, Ridgefield<br>06:40 · jesienny poranek</div>
<div class="sec"><span class="lbl">ZADANIE</span>Sprawdzić zgłoszenie.</div>`;}
function houseDebrief(){const s=G.stats,H=G.h||{nf:0,clues:[]};let score=G.win?100:0;if(H.forced)score-=10;score+=H.nf*4;if(H.result==='arrested')score+=20;score+=((H.gawk||[]).filter(g=>g.told).length)*2;score-=s.roe*15+s.squadLost*15+s.civKilled*30;if(G.win)score+=Math.max(0,10-Math.floor(s.time/60));
 const rank=!G.win?'F':score>=140?'S':score>=125?'A':score>=105?'B':score>=80?'C':'D';
 const sus={arrested:H.inCar?'zatrzymany, w radiowozie':'zatrzymany',killed:'zabity',escaped:'zbiegł'}[H.result]||'—';const gw=(H.gawk||[]).length,gt=(H.gawk||[]).filter(g=>g.told).length;
 debFill(rank,score,[['Czas na miejscu',fmtT(s.time)],['Wejście do domu',H.forced?'bez zgody':H.consent?'za zgodą mieszkańca':'—',H.forced?'bad':'good'],['Notatki z miejsca',H.nf+' / '+H.clues.length],['Zamrażarka w garażu',H.freezer?'otwarta — dwie ofiary':'nie sprawdzono',H.freezer?'':'bad'],['Podejrzany',sus,H.result==='arrested'?'good':H.result?'bad':''],['Rozmowa z sąsiadką',H.said&&H.said.neigh?'tak':'nie'],['Gapie odsunięci',gw?gt+' / '+gw:'—'],['Cywile zabici',s.civKilled,s.civKilled?'bad':''],['Straty',s.squadLost+' / 2',s.squadLost?'bad':''],['Nieuprawnione użycie siły',s.roe,s.roe?'bad':''],['Oddane strzały',s.shots]]);}
function policeLights(c,cx,cy){const on=((G.time*5)|0)%2;for(const f of LV.furn){if(f.k!=='police')continue;const x=f.x*TS+22-cx,y=f.y*TS+7.5+((LD().car||{}).oy||0)-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;
 const gy=on?y-5:y+6,col=on?'255,40,30':'40,90,255',g=c.createRadialGradient(x,gy,0,x,gy,34);g.addColorStop(0,'rgba('+col+',.2)');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-38,gy-38,76,76);
 if(on)P(c,x,y-7,1,6,'#ff6a50');else P(c,x,y+1,1,6,'#6aa0ff');}}
Object.assign(FH,{police:0,freezer:7,fence:4,bedD:5,grill:4,hydrant:3,bucket:0});
function houseWallCol(rb){const n=rb>=0?ROOMS[rb].n:'';return n==='Sypialnia rodziców'?['#6a5a68','#4a3e48']:n==='Łazienka'?['#8a9698','#6a7678']:n==='Pokój syna'?['#4a5868','#343e4a']:n==='Salon'?['#7a6a50','#4e4232']:n==='Kuchnia'?['#8a8468','#5e5a44']:n==='Garaż'?['#5c5c5a','#444442']:n==='Przedpokój'||n==='Korytarz'?['#857660','#54483a']:['#7a6a5a','#4e4438'];}
// ---- autumn morning ----
let OUTM=null;
function LFpx(x,y,c){const v=hexInt(c);if(v>=0&&SPKB)SPKB.push(x,y,v);else P(wc,x,y,1,1,c);}
function autumnDecor(){SPKB=[];const r=rng(1031),C=['#8a3c14','#b0581c','#c8862a','#6a2a12','#9a6a1a','#d09a3a','#5a3a14'];
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t!==T.GRASS&&t!==T.ASPH)continue;const gr=t===T.GRASS;
  if(gr)P(wc,x*TS,y*TS,16,16,'rgba(90,72,30,.22)');
  let n=gr?(r()*7|0):(LV.fs[I(x,y)]==='conc'?(r()*4|0):(r()*2|0));
  for(const f of LV.furn)if(f.k==='tree'&&Math.abs(f.x-x)<=2&&Math.abs(f.y-y)<=2){n+=6;break;}
  for(let k=0;k<n;k++){const lx=x*TS+(r()*15|0),ly=y*TS+(r()*15|0),c=C[(r()*C.length)|0];LFpx(lx,ly,c);LFpx(lx+1,ly,c);if(r()<.5)LFpx(lx+(r()<.5?0:1),ly+1,shadeC(c,-20));}
  if(!gr&&r()<.06){const g=wc.createRadialGradient(x*TS+8,y*TS+8,0,x*TS+8,y*TS+8,10);g.addColorStop(0,'rgba(120,140,160,.12)');g.addColorStop(1,'rgba(120,140,160,0)');wc.fillStyle=g;wc.fillRect(x*TS-4,y*TS-4,24,24);}}
 flushSpk();buildOUTM();}
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
 if(st&&idle&&H.oddW<=0&&(!st.need||st.need(H))){say('ETHAN HARTLEY',st.l);if(st.act)st.act(c,H);H.oddW=st.w+1.2;H.oddI=st.loop!=null?st.loop:(H.oddI||0)+1;}
 const ty=H.oddT<3?30:(((G.time/3)|0)%2?29:31);if(goTo(49,ty,H.oddT<3?30:14))face();
 if(H.dialAt&&G.time>H.dialAt){H.dialAt=0;if(A.ctx){const o=out(c.x,c.y,.06,{rev:.1});if(o)for(let k=0;k<7;k++)tone(o,A.ctx.currentTime+k*.13,.08,{f:rand(700,1400),g:.25});}}
 if(H.ringStart&&G.time>H.ringStart&&G.time<H.ringStart+4.2&&(!H.ringT||G.time-H.ringT>1.25)){H.ringT=G.time;if(A.ctx){const o=out(48*TS+8,27*TS+8,.22,{rev:.25}),t0=A.ctx.currentTime;if(o){for(let k=0;k<4;k++)tone(o,t0+k*.11,.08,{type:'square',f:k%2?1320:1760,g:.18});nz(o,t0,.5,{type:'lowpass',f:180,g:.4,attack:.02});}}
  if(!H.said.ringNote){H.said.ringNote=1;logEv('W kuchni dzwoni telefon matki');}}}
// ---- living screens (TV, PC), TV audio, fly over freezer ----
const SCREENS=[{x:34*16+8,y:28*16,r:46,k:'tv'},{x:49*16,y:21*16,r:30,k:'pc'},{x:34*16+8,y:20*16+4,r:44,k:'lamp'},{x:37*16+8,y:20*16+4,r:30,k:'lamp',dim:1},{x:48*16+8,y:27*16+2,r:26,k:'phone'}];
function screenGlow(c,cx,cy){if(!G.h)return;const t=G.time;
 for(const s of SCREENS){const x=s.x-cx,y=s.y-cy;if(x<-60||y<-60||x>VW+60||y>VH+60)continue;let col,a;
  if(s.k==='tv'){const ph=(t*6.5|0);const pal=[[120,150,255],[255,210,160],[140,255,190],[200,200,230],[255,140,120],[160,180,255]];col=pal[(ph*7+((ph*13)>>2))%pal.length];a=.11+((Math.sin(ph*12.9898)*43758.5453)%1+1)%1*.12;}
  else if(s.k==='lamp'){col=[255,190,120];a=s.dim?.09:.2;}
  else if(s.k==='phone'){const H=G.h,on=H&&H.ringStart&&G.time>H.ringStart&&G.time<H.ringStart+4.4;if(!on)continue;col=[150,210,255];a=.16+(Math.sin(G.time*18)>0?.08:0);}
  else{col=[110,190,255];a=.1+Math.sin(t*1.7)*.015+(Math.random()<.02?.05:0);}
  const g=c.createRadialGradient(x,y,0,x,y,s.r);g.addColorStop(0,'rgba('+col+','+a.toFixed(3)+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-s.r,y-s.r,s.r*2,s.r*2);}
 // the screens themselves
 const tvx=34*16+3-cx,tvy=27*16+1-cy-(FH.tv||0);if(tvx>-20&&tvy>-20&&tvx<VW+20&&tvy<VH+20){const ph=(t*6.5|0);for(let i=0;i<5;i++)P(c,tvx+1+i*2,tvy+2,2,4,'rgba('+[[90,120,220],[220,180,140],[120,220,160],[200,200,220]][(ph+i)%4]+',.5)');}
 for(const lx of [34,37]){const x=lx*16+5-cx,y=20*16-3-cy-(FH.tableS||0);if(x>-10&&y>-10&&x<VW+10&&y<VH+10){P(c,x+1,y+4,4,3,'#3a2a1a');P(c,x,y,6,4,lx===34?'#f0c880':'#a88a60');P(c,x+1,y,4,1,lx===34?'#fff0c8':'#c8a878');}}
 {const H=G.h;if(H&&H.ringStart&&G.time>H.ringStart&&G.time<H.ringStart+4.4){const x=48*16+5-cx,y=27*16+4-cy-(FH.counterP||0);if(((G.time*8)|0)%2||true){P(c,x,y,4,6,'#c8e8ff');P(c,x+1,y+1,2,3,'#ffffff');P(c,x+((G.time*30|0)%2),y-1,4,1,'rgba(200,232,255,.6)');}}}
 const pcx=48*16+11-cx,pcy=20*16-3-cy-(FH.deskPC||0);if(pcx>-20&&pcy>-20&&pcx<VW+20&&pcy<VH+20){P(c,pcx,pcy,9,5,'rgba(90,170,240,.35)');P(c,pcx+3,pcy+2,3,1,'rgba(230,240,255,.5)');}}
function drawFly(c,cx,cy){const H=G.h;if(!H)return;const t=G.time,bx=FREEZER.x-cx,by=FREEZER.y-28-cy;
 const x=bx+Math.sin(t*3.1)*9+Math.sin(t*7.3)*4+Math.sin(t*13)*1.5,y=by+Math.cos(t*2.3)*5+Math.sin(t*9.1)*3;
 if(x<-4||y<-4||x>VW+4||y>VH+4)return;P(c,x|0,y|0,1,1,'#0a0a0a');if(((t*30)|0)%2)P(c,(x|0)-1,(y|0)-1,1,1,'rgba(200,210,220,.35)');}
const VOW=[[800,1200,2500],[500,1800,2500],[320,2200,2900],[500,900,2400],[360,800,2300],[650,1100,2400]];
function tvAudio(L,TVP,VM,FLY){TVP=TVP||SCREENS[0];VM=VM==null?1:VM;FLY=FLY||FREEZER;if(!A.ctx||!G.h)return;const c=A.ctx,t=c.currentTime;
 if(!A.tvG){A.tvG=c.createGain();A.tvG.gain.value=0;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;A.tvLP=lp;lp.connect(A.tvG);A.tvG.connect(A.master);
  const sw=c.createGain();sw.gain.value=.25;A.tvG.connect(sw);sw.connect(A.revSIn||A.revIn);
  A.tvAM=c.createGain();A.tvAM.gain.value=0;A.tvAM.connect(lp);
  const src=c.createOscillator();src.type='sawtooth';src.frequency.value=130;A.tvO=src;const vib=c.createOscillator();vib.frequency.value=5.5;const vg=c.createGain();vg.gain.value=3;vib.connect(vg);vg.connect(src.frequency);
  A.tvF=[];for(const[f,q,gn]of[[700,6,1],[1200,8,.55],[2500,10,.25]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;const g=c.createGain();g.gain.value=gn;src.connect(bp);bp.connect(g);g.connect(A.tvAM);A.tvF.push(bp);}
  const n=c.createBufferSource();n.buffer=A.noise;n.loop=true;const hp=c.createBiquadFilter();hp.type='bandpass';hp.frequency.value=4200;hp.Q.value=1;A.tvS=c.createGain();A.tvS.gain.value=0;n.connect(hp);hp.connect(A.tvS);A.tvS.connect(lp);n.start();
  const pad=c.createGain();pad.gain.value=.012;pad.connect(lp);for(const f of [110,138.6,164.8]){const o=c.createOscillator();o.type='triangle';o.frequency.value=f;o.connect(pad);o.start();}
  src.start();vib.start();
  A.flyG=c.createGain();A.flyG.gain.value=0;const fo=c.createOscillator();fo.type='sawtooth';fo.frequency.value=215;const fl=c.createOscillator();fl.frequency.value=7;const flg=c.createGain();flg.gain.value=18;fl.connect(flg);flg.connect(fo.frequency);const fb=c.createBiquadFilter();fb.type='bandpass';fb.frequency.value=900;fb.Q.value=.8;fo.connect(fb);fb.connect(A.flyG);A.flyG.connect(A.master);fo.start();fl.start();}
 const tv=TVP,d=dist(L.x,L.y,tv.x,tv.y)/TS,los=losClear(L.x,L.y,tv.x,tv.y+8),v=G.ended?0:clamp(1-d/(12+VM*4),0,1)*(los?1:.4);
 A.tvG.gain.setTargetAtTime(v*.045*VM,t,.3);A.tvLP.frequency.setTargetAtTime(los?2600:800,t,.3);
 G.tvSyl=(G.tvSyl||0)-1/60;if(G.tvSyl<=0){const pause=Math.random()<.14;G.tvSyl=pause?rand(.25,.6):rand(.09,.19);
  if(pause){A.tvAM.gain.setTargetAtTime(0,t,.04);A.tvS.gain.setTargetAtTime(0,t,.02);}
  else{const vw=VOW[(Math.random()*VOW.length)|0];A.tvF.forEach((f,i)=>f.frequency.setTargetAtTime(vw[i]*rand(.92,1.08),t,.03));if(Math.random()<.03)G.tvHi=!G.tvHi;A.tvO.frequency.setTargetAtTime(rand(105,165)*(G.tvHi?1.45:1),t,.05);
   A.tvAM.gain.setTargetAtTime(rand(.5,1),t,.02);A.tvS.gain.setTargetAtTime(Math.random()<.25?rand(.15,.35):0,t,.015);}}
 const fd=dist(L.x,L.y,FLY.x,FLY.y)/TS;A.flyG.gain.setTargetAtTime(G.ended?0:clamp(1-fd/4.5,0,1)*.007*(.6+.4*Math.sin(G.time*2.1)),t,.1);}
// ---- ID check ----
function idPortrait(){const c=$('idph'),g=c.getContext('2d'),p=PAL_SUSPECT;g.clearRect(0,0,18,22);P(g,0,0,18,22,'#9fb2c0');P(g,0,16,18,6,'#8a9cab');
 P(g,3,15,12,7,p.body);P(g,7,12,4,4,shadeC(p.skin,-12));P(g,5,4,8,10,p.skin);P(g,4,6,1,4,p.skin);P(g,13,6,1,4,p.skin);P(g,5,2,8,4,p.hair);P(g,4,3,2,4,p.hair);P(g,12,3,2,3,p.hair);
 P(g,6,8,2,1,'#2a1a12');P(g,10,8,2,1,'#2a1a12');P(g,6,7,2,1,shadeC(p.hair,10));P(g,10,7,2,1,shadeC(p.hair,10));P(g,8,10,2,1,shadeC(p.skin,-20));P(g,7,12,4,1,'#8a5a4a');P(g,5,11,1,2,shadeC(p.skin,-10));}
function checkId(u){const H=G.h;H.idChecked=true;const s=H.s;turnTo(s,Math.atan2(u.y-s.y,u.x-s.x),1,9);logEv('Legitymowanie: Ethan Hartley (20)');
 say(u.name,'Poproszę jakiś dokument tożsamości.');say('ETHAN HARTLEY','...Proszę. Prawo jazdy.');
 setTimeout(()=>{if(G.ended)return;idPortrait();$('idcard').classList.add('on');setTimeout(()=>$('idcard').classList.remove('on'),6500);},2600);
 setTimeout(()=>{if(G.ended)return;radio(u.name,'Dispatch, 2-Adam-14. Sprawdźcie osobę: Hartley, Ethan, urodzony czternastego marca dwa tysiące sześć.',{radio:1});
  setTimeout(()=>{if(!G.ended){radio('DISPATCH','2-Adam-14, Hartley Ethan — bez notowań. Na ten adres zarejestrowana broń. Właściciel: Richard Hartley.');logEv('Dispatch: brak notowań, pod adresem zarejestrowana broń ojca');}},5200);},9200);}
// ---- 911 call briefing ----
const CALL=[['D','911, jaki jest adres zdarzenia?'],['C','Oakridge Lane, dwieście dziesięć. Ale to nie u mnie... to u sąsiadów, pod dwieście czternaście.'],['D','Dobrze. Co się tam dzieje?'],
 ['C','Słyszałam krzyki. Kobieta krzyczała... a potem były dwa huki. Jakby strzały.'],['D','Kiedy to było?'],['C','Kilka minut temu. Teraz jest zupełnie cicho.'],
 ['D','Czy widzi pani kogoś przed domem? Ktoś wychodził, odjeżdżał?'],['C','Nie... nic nie widzę. Zasłony są zasunięte.'],['D','Kto tam mieszka?'],['C','Hartleyowie. Richard i Linda. I ich syn, Ethan.'],
 ['D','Proszę zostać w domu i nie podchodzić. Wysyłam patrol.'],['C','Dobrze... Boże. Proszę się pospieszyć.']];
const CALLW={D:'DYSPOZYTOR',C:'ZGŁASZAJĄCA'};
const CALLS={on:false,i:-1,t:0,dur:0,syl:0,ended:false,wave:new Float32Array(160)};
function callChain(){const c=A.ctx;if(!c||A.callG)return;A.callG=c.createGain();A.callG.gain.value=0;const an=c.createAnalyser();an.fftSize=1024;A.callAn=an;
 const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=320;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3200;hp.connect(lp);lp.connect(an);an.connect(A.callG);A.callG.connect(A.master);
 A.callAM=c.createGain();A.callAM.gain.value=0;A.callAM.connect(hp);
 const src=c.createOscillator();src.type='sawtooth';src.frequency.value=190;A.callO=src;const vib=c.createOscillator();vib.frequency.value=5;A.callVib=c.createGain();A.callVib.gain.value=2;vib.connect(A.callVib);A.callVib.connect(src.frequency);
 A.callF=[];for(const[f,q,g]of[[700,6,1],[1200,8,.6],[2500,10,.3]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;const gg=c.createGain();gg.gain.value=g;src.connect(bp);bp.connect(gg);gg.connect(A.callAM);A.callF.push(bp);}
 const n=c.createBufferSource();n.buffer=A.noise;n.loop=true;const nb=c.createBiquadFilter();nb.type='bandpass';nb.frequency.value=4000;A.callS=c.createGain();A.callS.gain.value=0;n.connect(nb);nb.connect(A.callS);A.callS.connect(hp);
 const hiss=c.createGain();hiss.gain.value=.025;n.connect(hiss);hiss.connect(hp);n.start();src.start();vib.start();}
function startCall(){audioInit();Object.assign(CALLS,{on:true,i:-1,t:-1.6,dur:0,ended:false});$('calltx').innerHTML='';$('callwho').textContent='ŁĄCZENIE…';
 if(A.ctx){const o=ui(.08),t0=A.ctx.currentTime;tone(o,t0,.35,{f:440,g:.25});tone(o,t0,.35,{f:480,g:.25});}}
function stopCall(){CALLS.on=false;if(A.callG&&A.ctx&&false){A.callG.gain.setTargetAtTime(0,A.ctx.currentTime,.05);A.callAM.gain.setTargetAtTime(0,A.ctx.currentTime,.02);}}
function callUpdate(dt){if(!CALLS.on)return;CALLS.t+=dt;const t=A.ctx&&A.ctx.currentTime;
 if(CALLS.i<0||CALLS.t>=CALLS.dur){if(CALLS.t<0)return;CALLS.i++;CALLS.t=0;
  if(CALLS.i>=LD().nb.call.length){CALLS.on=false;CALLS.ended=true;$('callwho').textContent='POŁĄCZENIE ZAKOŃCZONE';const p=document.createElement('p');p.className='x';p.textContent='[koniec nagrania]';$('calltx').appendChild(p);
   if(A.ctx){const o=ui(.06);for(let k=0;k<3;k++)tone(o,t+.3+k*.5,.25,{f:480,g:.3});}return;}
  const[w,txt]=LD().nb.call[CALLS.i];CALLS.dur=.9+txt.length*.062+.55;CALLS.w=w;
  const box=$('calltx');[...box.children].forEach(e=>e.classList.remove('cur'));const p=document.createElement('p');p.className=(w==='D'?'d':'c')+' cur';p.innerHTML='<b>'+LD().nb.who[w]+'</b>'+txt;box.appendChild(p);box.scrollTop=box.scrollHeight;
  $('callwho').textContent='● '+LD().nb.who[w];$('callwho').className=w==='D'?'d':'';if(A.ctx&&A.callG){A.callVib.gain.setTargetAtTime(w==='C'?7:2,t,.1);A.callVib.context&&0;}}
 const speaking=CALLS.t<CALLS.dur-.55;CALLS.syl-=dt;
 if(CALLS.syl<=0){const pause=!speaking||Math.random()<.12;CALLS.syl=pause?rand(.15,.35):rand(.08,.17);CALLS.amp=pause?0:rand(.5,1);
  if(A.ctx&&A.callG){if(pause){A.callAM.gain.setTargetAtTime(0,t,.03);A.callS.gain.setTargetAtTime(0,t,.02);}
   else{const vw=VOW[(Math.random()*VOW.length)|0],k=CALLS.w==='C'?1.12:1;A.callF.forEach((f,i)=>f.frequency.setTargetAtTime(vw[i]*k*rand(.92,1.08),t,.03));A.callO.frequency.setTargetAtTime((CALLS.w==='C'?rand(215,265):rand(170,200)),t,.05);A.callAM.gain.setTargetAtTime(CALLS.amp,t,.02);A.callS.gain.setTargetAtTime(Math.random()<.25?.25:0,t,.015);}}}
 const s=$('calltime');if(s){const ck=LD().nb.clock,sec=ck[2]+(G._callClock=(G._callClock||0)+dt);s.textContent=String(ck[0]).padStart(2,'0')+':'+String(ck[1]+Math.floor(sec/60)).padStart(2,'0')+':'+String(Math.floor(sec)%60).padStart(2,'0');}}


function nbBackground(){const c=$('nbbg'),g=c.getContext('2d'),wf=worldFull();g.imageSmoothingEnabled=false;g.fillStyle='#000';g.fillRect(0,0,c.width,c.height);const b=LD().nb.bg;g.drawImage(wf,b[0]*16,b[1]*16,b[2]*16,b[3]*16,0,0,c.width,c.height);}
function drawWave(){const c=$('wave'),g=c.getContext('2d'),W=c.width,H=c.height;g.clearRect(0,0,W,H);
 const col=CALLS.w==='D'?'111,208,192':'224,176,96',a=CALLS.on&&CALLS.amp?CALLS.amp:0,t=performance.now();
 g.strokeStyle='rgba('+col+',.95)';g.lineWidth=2.4;g.shadowColor='rgba('+col+',.7)';g.shadowBlur=8;g.beginPath();
 for(let i=0;i<=W;i+=6){const env=Math.sin(Math.PI*i/W),v=a*env*(Math.sin(i*.05+t/70)*.45+Math.sin(i*.17+t/41)*.35+(Math.random()-.5)*.5);const y=H/2+clamp(v,-1,1)*H*.44;if(i===0)g.moveTo(i,y);else g.lineTo(i,y);}
 g.stroke();g.shadowBlur=0;}

// ================= OAKRIDGE: exterior detail pass =================
F('steps',1,1,0,0,(g,x,y)=>{P(g,x+1,y,14,15,'#8a8780');P(g,x+1,y,14,1,'#a8a59c');P(g,x+1,y+5,14,1,'#6e6b64');P(g,x+1,y+6,14,1,'#a09d94');P(g,x+1,y+10,14,1,'#6e6b64');P(g,x+1,y+11,14,1,'#a09d94');P(g,x+1,y+15,14,1,'rgba(0,0,0,.35)');P(g,x,y,1,15,'#5a5852');P(g,x+15,y,1,15,'#5a5852');});
F('pumpkin',1,1,1,0,(g,x,y,w,h,s)=>{const big=s%2===0;P(g,x+3,y+12,10,3,SH);const c=big?'#c8601a':'#d8742a';P(g,x+3,y+5,10,8,c);P(g,x+4,y+4,8,10,c);P(g,x+5,y+5,1,8,shade(c,-30));P(g,x+8,y+4,1,10,shade(c,-25));P(g,x+10,y+5,1,8,shade(c,-30));P(g,x+4,y+5,2,2,shade(c,25));P(g,x+7,y+2,2,3,'#4a5a24');if(s%3===0){P(g,x+5,y+7,2,2,'#ffcc40');P(g,x+9,y+7,2,2,'#ffcc40');P(g,x+5,y+10,6,1,'#ffcc40');}});
F('paperroll',1,1,0,0,(g,x,y)=>{P(g,x+4,y+10,9,2,SH);P(g,x+4,y+7,9,3,'#cfd6e0');P(g,x+4,y+7,9,1,'#e8eef4');P(g,x+5,y+9,7,1,'#8e98a6');P(g,x+7,y+7,1,3,'#c8b8a0');P(g,x+12,y+8,1,1,'#e8eef4');});
F('leafpile',2,1,0,0,(g,x,y,w,h,s)=>{const r=rng(s+7),C=['#8a3c14','#b0581c','#c8862a','#6a2a12','#9a6a1a'];P(g,x+3,y+10,26,4,'rgba(0,0,0,.25)');for(let i=0;i<150;i++){const a=r()*6.283,d=Math.sqrt(r()),lx=x+16+Math.cos(a)*d*13,ly=y+8+Math.sin(a)*d*5-(1-d)*3;P(g,lx|0,ly|0,2,1,C[(r()*5)|0]);}});
F('rake',1,1,0,0,(g,x,y)=>{P(g,x+3,y+2,1,13,'#8a6a3a');P(g,x+1,y+1,5,1,'#5a5a5a');for(let i=0;i<5;i++)P(g,x+1+i,y,1,1,'#7a7a7a');});
F('hoop',1,1,1,0,(g,x,y)=>{P(g,x+6,y+12,5,3,SH);P(g,x+7,y-20,2,33,'#3a3c40');P(g,x+2,y-27,12,8,'#e8e8e4');P(g,x+2,y-27,12,1,'#ffffff');P(g,x+5,y-25,6,4,'rgba(200,40,30,.0)');P(g,x+5,y-25,6,1,'#c83020');P(g,x+5,y-22,6,1,'#c83020');P(g,x+5,y-25,1,4,'#c83020');P(g,x+10,y-25,1,4,'#c83020');P(g,x+5,y-19,6,1,'#e86a20');P(g,x+6,y-18,4,3,'rgba(240,240,240,.5)');});
F('bikeK',1,1,0,0,(g,x,y)=>{P(g,x+2,y+10,13,2,SH);P(g,x+2,y+7,4,4,'#1a1a1a');P(g,x+10,y+7,4,4,'#1a1a1a');P(g,x+3,y+8,2,2,'#5a5a5a');P(g,x+11,y+8,2,2,'#5a5a5a');P(g,x+5,y+6,7,1,'#d8306a');P(g,x+7,y+4,1,3,'#d8306a');P(g,x+6,y+3,3,1,'#2a2a2a');P(g,x+11,y+4,1,3,'#9a9a9a');P(g,x+10,y+3,3,1,'#9a9a9a');});
F('forsale',1,1,1,0,(g,x,y)=>{P(g,x+4,y+12,9,3,SH);P(g,x+4,y-6,1,19,'#e8e4dc');P(g,x+12,y-6,1,19,'#e8e4dc');P(g,x+4,y-7,9,1,'#e8e4dc');P(g,x+5,y-5,7,7,'#b02820');P(g,x+6,y-4,5,1,'#f0e8e0');P(g,x+6,y-2,5,1,'#f0e8e0');P(g,x+6,y,3,1,'#f0e8e0');P(g,x+5,y+3,7,2,'#2a3a6a');});
F('gnome',1,1,0,0,(g,x,y)=>{P(g,x+5,y+12,6,2,SH);P(g,x+6,y+8,4,5,'#2a5a8a');P(g,x+6,y+6,4,3,'#e8d0b0');P(g,x+6,y+8,4,3,'#e8e8e0');P(g,x+7,y+2,2,4,'#c02a20');P(g,x+6,y+5,4,1,'#c02a20');P(g,x+7,y+7,1,1,'#2a1a10');});
F('pole',1,1,1,0,(g,x,y)=>{P(g,x+6,y+12,6,3,SH);P(g,x+7,y-40,3,53,'#5a4632');P(g,x+8,y-40,1,53,'#6e5840');P(g,x+2,y-38,13,2,'#4a3a28');P(g,x+3,y-39,1,1,'#9aa');P(g,x+13,y-39,1,1,'#9aa');P(g,x+8,y-39,1,1,'#9aa');P(g,x+10,y-32,4,6,'#5a5e62');P(g,x+10,y-32,4,1,'#7a7e82');});
F('stsign',1,1,1,0,(g,x,y)=>{P(g,x+7,y+12,4,2,SH);P(g,x+8,y-14,1,27,'#8a8e92');P(g,x+2,y-16,13,4,'#1e6a3a');P(g,x+3,y-15,11,1,'#d8e8d8');P(g,x+5,y-20,7,4,'#1e6a3a');P(g,x+6,y-19,5,1,'#d8e8d8');});
F('acunit',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,13,3,SH);P(g,x+2,y+2,12,11,'#8a8e90');P(g,x+2,y+2,12,1,'#a8acae');for(let i=0;i<4;i++)P(g,x+3,y+4+i*2,10,1,'#5a5e60');P(g,x+5,y+5,6,6,'rgba(30,30,30,.4)');});
F('hose',1,1,0,0,(g,x,y)=>{P(g,x+4,y+4,8,8,'#2e6a3a');P(g,x+6,y+6,4,4,'#1e3a24');P(g,x+5,y+5,6,1,'#4a8a5a');P(g,x+12,y+9,3,1,'#2e6a3a');P(g,x+14,y+10,1,4,'#2e6a3a');});
F('stormdrain',1,1,0,0,(g,x,y)=>{P(g,x+2,y+11,12,4,'#1a1a1a');for(let i=0;i<5;i++)P(g,x+3+i*2,y+11,1,4,'#4a4a48');});
F('manhole',1,1,0,0,(g,x,y)=>{wc;g.fillStyle='#2e2e2e';g.beginPath();g.arc(x+8,y+8,6,0,6.283);g.fill();g.fillStyle='#3e3e3c';g.beginPath();g.arc(x+8,y+8,5,0,6.283);g.fill();for(let i=-3;i<=3;i+=2)P(g,x+4,y+8+i,9,1,'#2a2a2a');});
F('numplate',1,1,0,0,(g,x,y)=>{P(g,x+3,y+2,10,5,'#2a2420');P(g,x+4,y+3,1,3,'#e8d8a8');P(g,x+6,y+3,1,3,'#e8d8a8');P(g,x+8,y+3,2,1,'#e8d8a8');P(g,x+9,y+4,1,2,'#e8d8a8');P(g,x+11,y+3,1,3,'#e8d8a8');});
{const F_=(...a)=>FURN_HOUSE.push(a);
 F_('steps',42,35);F_('pumpkin',41,35);F_('pumpkin',43,35);F_('paperroll',41,37);F_('gnome',38,36);F_('hose',50,35);F_('acunit',31,29);F_('rake',58,35);
 F_('leafpile',34,36);F_('leafpile',59,36);F_('leafpile',3,37);F_('leafpile',73,36);
 F_('pumpkin',14,34);F_('pumpkin',70,34);F_('hoop',22,34);F_('bikeK',10,36);F_('forsale',75,36);
 for(const x of[8,36,64])F_('pole',x,46);F_('stsign',28,46);
 for(const x of[16,44,60])F_('stormdrain',x,39);for(const x of[26,56])F_('stormdrain',x,44);F_('manhole',47,42);F_('manhole',14,42);}
const HOUSE_POLES=[8,36,64];
function houseDecor(){const r=rng(5151);
 // krawężniki i rynsztok
 for(let x=0;x<MW*TS;x++){P(wc,x,40*TS,1,1,'#9a978e');P(wc,x,40*TS+1,1,1,'rgba(0,0,0,.35)');P(wc,x,45*TS-1,1,1,'rgba(0,0,0,.4)');P(wc,x,45*TS,1,1,'#9a978e');}
 // płyty chodnika, pęknięcia
 for(const yy of[38,45])for(let x=0;x<MW;x+=2){P(wc,x*TS,yy*TS,1,32,'rgba(40,38,34,.35)');if(r()<.3){let cx=x*TS+(r()*28|0),cy=yy*TS+(r()*28|0);for(let k=0;k<7;k++){P(wc,cx,cy,1,1,'rgba(30,28,24,.5)');cx+=r()<.5?1:0;cy+=r()<.6?1:-1;}}}
 for(let x=0;x<MW;x++)P(wc,x*TS,39*TS,16,1,'rgba(40,38,34,.18)');
 // asfalt: łaty, ślady opon, linia środkowa
 for(let k=0;k<9;k++){const x=r()*MW*TS|0,y=(40.5+r()*3.5)*TS|0,w=10+r()*30|0,h=6+r()*12|0;P(wc,x,y,w,h,'rgba(20,20,22,.22)');}
 for(let x=0;x<MW*TS;x+=24)P(wc,x,42*TS+7,12,1,'rgba(220,190,90,.35)');
 for(let k=0;k<3;k++){const x=r()*60*TS|0;for(let i=0;i<40;i++){P(wc,x+i,41*TS+10+(i/12|0),1,1,'rgba(10,10,10,.25)');P(wc,x+i,42*TS+12+(i/12|0),1,1,'rgba(10,10,10,.25)');}}
 // plamy oleju na podjazdach
 for(const[x,y]of[[53,36],[20,35],[67,35],[55,35]]){wc.fillStyle='rgba(10,10,14,.3)';wc.beginPath();wc.ellipse(x*TS+8,y*TS+8,7,4,0,0,6.283);wc.fill();}
 // rabaty przy elewacjach (ściółka + kwiaty), obrzeża trawników
 const bed=(x0,x1,y)=>{for(let x=x0*TS;x<(x1+1)*TS;x++){P(wc,x,y*TS,1,6,'#3a2a1c');if(r()<.18)P(wc,x,y*TS+1+(r()*4|0),1,1,['#8a2a3a','#b8901a','#6a3a6a','#4a6a2a'][(r()*4)|0]);}};
 bed(33,40,35);bed(44,49,35);bed(7,13,34);bed(16,18,34);bed(66,68,34);bed(70,76,34);
 for(let x=0;x<MW;x++)if(tAt(x,37)===T.GRASS)P(wc,x*TS,37*TS+15,16,1,'rgba(20,30,10,.35)');
 // elewacje: okiennice, kinkiety, numer domu, rynny spustowe
 const face=(ty)=>WR[ty]&&WR[ty].getContext('2d');
 const shut=(ty,xs,col)=>{const g=face(ty);if(!g)return;for(const x of xs){for(const sx of[x*TS-3,x*TS+16]){P(g,sx,17,3,10,col);P(g,sx,17,3,1,shade(col,25));for(let j=19;j<27;j+=2)P(g,sx,j,3,1,shade(col,-18));}}};
 shut(34,[35,38,46,48],'#2a3a34');shut(33,[9,12,19,21],'#3a2a24');shut(33,[67,74],'#2a3044');
 const g=face(34);if(g){for(const sx of[41*TS+12,43*TS+1]){P(g,sx,18,3,4,'#1a1a1a');P(g,sx+1,19,1,2,'#ffd890');}
  P(g,43*TS+5,19,9,5,'#2a2420');for(const[dx,w]of[[6,1],[8,2],[11,1]])P(g,43*TS+dx,20,w,3,'#e8d8a8');
  for(const sx of[32*TS+2,50*TS+12,58*TS+12])P(g,sx,16,2,12,'#7a7c7e');}
 // wnętrze: zdjęcia rodzinne, zegar, kalendarz, plakaty
 const frame=(ty,x,w,h,c1,c2)=>{const g=face(ty);if(!g)return;P(g,x,18,w+2,h+2,'#2a2018');P(g,x+1,19,w,h,c1);P(g,x+2,20,w-2,Math.max(1,h-3),c2);P(g,x+1,19,w,1,'rgba(255,255,255,.18)');};
 frame(26,33*TS+4,7,5,'#c8b8a0','#6a5a4a');frame(26,34*TS+4,5,6,'#d0c8b8','#8a6a5a');frame(26,38*TS+3,9,5,'#b8c8d0','#4a6a7a');
 {const g=face(26);if(g){P(g,37*TS+5,17,8,8,'#2a2420');P(g,37*TS+6,18,6,6,'#e8e4d8');P(g,37*TS+8,19,1,3,'#1a1a1a');P(g,37*TS+9,21,2,1,'#1a1a1a');
  P(g,46*TS+3,17,9,10,'#e8e4dc');P(g,46*TS+3,17,9,2,'#b02a20');for(let i=0;i<3;i++)for(let j=0;j<4;j++)P(g,46*TS+4+j*2,20+i*2,1,1,'#7a7a7a');P(g,46*TS+6,22,2,2,'rgba(200,30,30,.8)');
  for(const[x,c]of[[48*TS+2,'#e8d8a8'],[48*TS+7,'#a8c8e8'],[48*TS+11,'#e8b0b0']])P(g,x,18,3,3,c);}}
 frame(24,35*TS+2,6,5,'#c8c0b0','#5a4a3a');frame(24,44*TS+4,8,5,'#c0c8d0','#5a6a7a');frame(24,47*TS+5,5,5,'#d8d0c0','#7a5a4a');
 {const g=face(19);if(g){P(g,45*TS+2,17,9,11,'#1a1a2a');P(g,45*TS+3,18,7,6,'#a02a2a');P(g,45*TS+3,25,7,1,'#e8e8e8');P(g,47*TS+4,17,8,10,'#2a3a2a');P(g,47*TS+5,18,6,5,'#5a8a4a');P(g,47*TS+5,24,6,1,'#e8e8a0');}
  const g2=face(19);if(g2){P(g2,34*TS+4,18,12,7,'#2a2018');P(g2,34*TS+5,19,10,5,'#c8b8a8');P(g2,34*TS+6,20,3,3,'#8a6a5a');P(g2,34*TS+11,20,3,3,'#6a5a6a');}}
 for(const[ty,xs]of[[33,[6*TS+2,24*TS+12]],[33,[65*TS+2,77*TS+12]]]){const g2=face(ty);if(g2)for(const sx of xs)P(g2,sx,16,2,12,'#7a7c7e');}}
const ROOFS=[{x0:50,y0:24,x1:58,y1:34,c:'#4c4640',s:3,grp:1},{x0:32,y0:19,x1:50,y1:34,c:'#48423e',s:1,grp:1,chim:[46,22],dish:[36,24],vent:[[40,30],[44,23]]},
 {x0:6,y0:18,x1:24,y1:33,c:'#3e4248',s:5,chim:[9,21],vent:[[18,28]]},{x0:65,y0:19,x1:77,y1:33,c:'#4e3e36',s:7,chim:[74,22],sky:[69,27]},
 {x0:8,y0:49,x1:26,y1:57,c:'#444a44',s:9,chim:[22,51]},{x0:50,y0:49,x1:72,y1:57,c:'#4a4440',s:11,vent:[[60,52]]}];
function bakeRoofs(){for(const R of ROOFS){const W=(R.x1-R.x0+1)*TS+4,Hh=(R.y1-R.y0+1)*TS-6,cv=document.createElement('canvas');cv.width=W;cv.height=Hh+6;const g=cv.getContext('2d'),r=rng(R.s*97+3),id=g.createImageData(W,Hh),D=id.data;
  const base=parseInt(R.c.slice(1),16),br=base>>16,bg=base>>8&255,bb=base&255;
  for(let py=0;py<Hh;py++)for(let px=0;px<W;px++){const dT=py,dB=Hh-1-py,dL=px,dR=W-1-px,m=Math.min(dT,dB,dL,dR);
   let f,d;if(m===dB){f=1.16;d=dB;}else if(m===dT){f=.7;d=dT;}else if(m===dL){f=.84;d=dL;}else{f=1.02;d=dR;}
   const ties=[dT,dB,dL,dR].filter(v=>v===m).length;let k=f;
   const horiz=(m===dT||m===dB),row=(d/3|0),along=horiz?px:py,joint=(along+(row%2)*3)%6===0;
   if(d%3===0)k*=.78;else if(joint)k*=.86;
   const n=((Math.sin(row*12.9898+(along/6|0)*78.233)*43758.5453)%1+1)%1;k*=.9+n*.2;
   if(ties>1)k=1.28;if(m===0)k=.55;
   const i=(py*W+px)*4;D[i]=Math.min(255,br*k);D[i+1]=Math.min(255,bg*k);D[i+2]=Math.min(255,bb*k);D[i+3]=255;}
  g.putImageData(id,0,0);
  // mech, liście, zacieki
  for(let i=0;i<W*Hh/40;i++){const x=r()*W|0,y=r()*Hh|0;const rr=r();P(g,x,y,rr<.5?2:1,1,rr<.25?'rgba(80,100,40,.5)':['#8a3c14','#b0581c','#c8862a','#6a2a12'][(r()*4)|0]);}
  // rynna
  P(g,0,Hh-2,W,1,'#2a2826');P(g,0,Hh-1,W,1,'#6a6660');P(g,1,Hh,2,6,'#5a5650');P(g,W-3,Hh,2,6,'#5a5650');P(g,0,Hh,W,3,'rgba(0,0,0,.35)');
  const ox=R.x0*TS-2,oy=R.y0*TS;
  if(R.chim){const x=R.chim[0]*TS-ox,y=R.chim[1]*TS-oy;P(g,x+2,y+12,12,4,'rgba(0,0,0,.35)');P(g,x,y,10,13,'#6a3a2a');P(g,x,y,10,2,'#8a5a48');for(let j=3;j<13;j+=3)P(g,x,y+j,10,1,'#4a2a1e');P(g,x+2,y-1,6,2,'#3a3a3a');P(g,x+3,y,4,1,'#1a1a1a');}
  if(R.dish){const x=R.dish[0]*TS-ox,y=R.dish[1]*TS-oy;P(g,x+2,y+6,8,3,'rgba(0,0,0,.3)');g.fillStyle='#b8bcc0';g.beginPath();g.ellipse(x+5,y+4,5,3,-.4,0,6.283);g.fill();P(g,x+5,y+4,1,4,'#6a6e72');P(g,x+4,y+3,2,1,'#e0e4e8');}
  for(const v of R.vent||[]){const x=v[0]*TS-ox,y=v[1]*TS-oy;P(g,x+1,y+3,4,2,'rgba(0,0,0,.35)');P(g,x,y,4,4,'#2a2a2a');P(g,x+1,y,2,1,'#5a5a5a');}
  if(R.sky){const x=R.sky[0]*TS-ox,y=R.sky[1]*TS-oy;P(g,x,y,12,9,'#2a2e34');P(g,x+1,y+1,10,7,'#1a2a3a');P(g,x+2,y+2,4,2,'#4a6a8a');}
  R.cv=cv;R.a=1;}}
function houseRoofs(c,cx,cy,dt){if(!ROOFS[0].cv)bakeRoofs();const ins=(R,u)=>u&&u.alive&&u.x>=(R.x0+.5)*TS&&u.x<=(R.x1+.5)*TS&&u.y>=(R.y0+.5)*TS&&u.y<=(R.y1+.8)*TS;
 const wa=weatherAlpha(),inR=R=>ins(R,G.p1)||ins(R,G.p2);for(const R of ROOFS){const tg=(R.grp?ROOFS.some(Q=>Q.grp===R.grp&&inR(Q)):inR(R))?0:1;R.a+=(tg-R.a)*Math.min(1,dt*6);if(R.a<.02)continue;
  const x=R.x0*TS-2-cx,y=R.y0*TS-WH-cy;if(x>VW||y>VH||x+R.cv.width<0||y+R.cv.height<0)continue;
  c.globalAlpha=R.a;c.drawImage(R.cv,Math.round(x),Math.round(y));c.globalAlpha=R.a*(1-wa)*.9;c.fillStyle='#000';c.fillRect(Math.round(x),Math.round(y),R.cv.width,R.cv.height-6);c.globalAlpha=1;}
 // linie energetyczne nad ulicą
 c.strokeStyle='rgba(20,20,22,.75)';c.lineWidth=1;for(const off of[-39,-38]){c.beginPath();for(let i=0;i<HOUSE_POLES.length;i++){const px=HOUSE_POLES[i]*TS+(off===-39?3:13)-cx,py=46*TS+off-cy;if(i===0)c.moveTo(px-200,py+6);else{const mx=(HOUSE_POLES[i-1]*TS+(off===-39?3:13)-cx+px)/2;c.quadraticCurveTo(mx,py+8,px,py);}}c.lineTo(MW*TS-cx,46*TS+off-cy+6);c.stroke();}}

// ================= gapie, nerwowość, transport, dźwięki otoczenia =================
function fidget(c,dt,face,nerv){const H=G.h;c.paceT=(c.paceT==null?rand(2,4):c.paceT)-dt;
 if(c.paceT<=0){c.paceT=rand(nerv?2:3,nerv?4:6);if(Math.random()<.6){c.pace=!c.pace;c.path=null;}if(Math.random()<(nerv?.7:.45))c.glanceT=rand(.8,1.5);if(Math.random()<.35)c.sweatT=1.4;}
 if(c.glanceT>0){c.glanceT-=dt;turnTo(c,Math.atan2(FREEZER.y-c.y,FREEZER.x-c.x),dt,4);}else face();
 if(c.sweatT>0)c.sweatT-=dt;
 H.murT=(H.murT==null?rand(30,45):H.murT)-dt;if(H.murT<=0&&!H.oddT){H.murT=rand(35,60);const q=nearestSquad(c);if(q&&dist(q.x,q.y,c.x,c.y)<TS*6){const L=['Długo to jeszcze potrwa?','Mówiłem już, nikogo tu nie ma.','Muszę zaraz wyjść, mam zajęcia.','Możecie nie ruszać rzeczy taty?','...Chcecie wody czy coś?'];H.murI=(H.murI||0);if(H.murI<L.length)say('ETHAN HARTLEY',L[H.murI++]);}}}
function putInCar(u){const H=G.h,s=H.s;H.inCar=true;s.escort=null;G.units.splice(G.units.indexOf(s),1);G.civs.splice(G.civs.indexOf(s),1);
 SND.door(35*TS,40*TS,true);setTimeout(()=>SND.door(35*TS,40*TS,false),700);logEv('Zatrzymany w radiowozie');
 radio(u.name,'Dispatch, 2-Adam-14. Zatrzymany w radiowozie. Potrzebny koroner i detektywi pod dwieście czternaście.',{radio:1});
 setTimeout(()=>{if(!G.ended)radio('DISPATCH','2-Adam-14, przyjęłam. Wydział zabójstw w drodze.');},2200);}
const GAWK_SPAWN=[[15,35],[71,35],[17,48],[61,48],[1,46],[78,46]],GAWK_SPOT=[[29,37],[25,38],[60,38],[63,37],[40,47],[46,47],[51,47],[34,47]];
const GAWK_LINES=['Co tu się stało? Hartleyowie są w porządku?','Dobra, dobra, już idę.','Słyszałam w nocy jakieś krzyki...','To tylko pytanie. Mieszkam obok!','Nagrywam tylko, to wolny kraj.','Ethan? Coś zrobił Ethan?'];
const GAWK_PAL=[{body:'#8a6a8a',legs:'#6a5a6a',hair:'#c8c0b0'},{body:'#6a7a5a',legs:'#3a3a3a',hair:'#3a2a1a'},{body:'#9a8a6a',legs:'#5a4a3a',hair:'#8a6a3a'},{body:'#4a5a7a',legs:'#2a2a3a',hair:'#1e1410'},{body:'#a87a6a',legs:'#5a5a6a',hair:'#d8c8a0'},{body:'#5a6a6a',legs:'#3a3a40',hair:'#6a4a2a'}];
function gawkers(dt){const H=G.h;if(!H.gawk)H.gawk=[];H.gawkT=(H.gawkT==null?45:H.gawkT)-dt;
 if(H.gawkT<=0&&H.gawk.length<6&&!H.inCar){H.gawkT=rand(28,42);const k=H.gawk.length,sp=GAWK_SPAWN[k],pt=GAWK_SPOT[k],p=GAWK_PAL[k];
  const g=mkNPC({tx:sp[0],ty:sp[1],kind:'gawk',pal:{...PAL_NEIGH,body:p.body,legs:p.legs,hair:p.hair},state:'go',a:0,name:'SĄSIAD',upd:gawkUpd});g.home=sp;g.spot=pt;g.phone=k===1||k===4;g.wT=0;g.gi=k;H.gawk.push(g);
  if(k===0)logEv('Pod domem zbierają się sąsiedzi');}}
function gawkUpd(c,dt){const tgt=c.told?c.home:c.spot;if(c.state==='go'){if(npcGo(c,dt,tgt[0],tgt[1],c.told?34:24)){c.state='watch';c.wT=0;}return;}
 moveUnit(c,dt,0,0,0);c.wT+=dt;const a=Math.atan2(34*TS-c.y,42*TS-c.x)+Math.sin(c.wT*.5+c.gi)*.25;turnTo(c,a,dt,2);
 if(!c.told&&!c.close&&c.wT>40&&c.gi<4){c.close=true;c.spot=[36+c.gi*3,39];c.state='go';}}
function gawkBack(u,g){g.told=true;g.state='go';g.path=null;say(u.name,pick(['Proszę się cofnąć, to miejsce interwencji.','Proszę wrócić do domu. Wszystko pod kontrolą.','Bez nagrywania z bliska, proszę się odsunąć.']));setTimeout(()=>{if(!G.ended)say('SĄSIAD',GAWK_LINES[g.gi%GAWK_LINES.length]);},1500);}
function houseLifeFx(c,cx,cy){const H=G.h;if(!H)return;
 for(const g of H.gawk||[]){if(!g.phone||!g.alive||g.state!=='watch')continue;const x=g.x+Math.cos(g.ang)*4-cx,y=g.y-13+Math.sin(g.ang)*2-cy;P(c,x|0,y|0,2,3,'#d8e8ff');c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(x,y,0,x,y,10);gr.addColorStop(0,'rgba(170,200,255,.25)');gr.addColorStop(1,'rgba(170,200,255,0)');c.fillStyle=gr;c.fillRect(x-10,y-10,20,20);c.globalCompositeOperation='source-over';if(((G.time*1.5)|0)%2)P(c,(x+2)|0,(y-1)|0,1,1,'#ff3a2a');}
 const s=H.s;if(s&&s.alive&&s.sweatT>0&&s.visNow){const t=1.4-s.sweatT;P(c,(s.x+3-cx)|0,(s.y-17+t*5-cy)|0,1,2,'rgba(180,220,255,.85)');}}
function houseAmb(dt,L){const c=A.ctx;if(!c)return;
 if(!A.ambHumG){const mk=()=>{const g=c.createGain();g.gain.value=0;g.connect(A.master);return g;};
  A.ambHumG=mk();for(const f of[59,118]){const o=c.createOscillator();o.frequency.value=f;const gg=c.createGain();gg.gain.value=f<100?1:.4;o.connect(gg);gg.connect(A.ambHumG);o.start();}
  A.ambBuzzG=mk();{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=120;const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2200;bp.Q.value=3;o.connect(bp);bp.connect(A.ambBuzzG);o.start();}
  A.ambWindG=mk();{const s=c.createBufferSource();s.buffer=A.noise;s.loop=true;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=380;const lfo=c.createOscillator();lfo.frequency.value=.13;const lg=c.createGain();lg.gain.value=180;lfo.connect(lg);lg.connect(lp.frequency);lfo.start();s.connect(lp);lp.connect(A.ambWindG);s.start();}}
 const t=c.currentTime,rm=LV.room[I(L.x/TS|0,L.y/TS|0)],od=isOutdoor(L.x,L.y),dF=dist(L.x,L.y,49*TS+8,27*TS+8)/TS;
 A.ambHumG.gain.setTargetAtTime(od?0:rm===6?.035*Math.max(.25,1-dF/7):(rm>=0&&rm<=7?.006:0),t,.4);
 A.ambBuzzG.gain.setTargetAtTime(rm===7?(.012+(Math.random()<.02?.02:0)):0,t,.08);
 A.ambWindG.gain.setTargetAtTime(od?.11:(rm>=0&&rm<=7?.012:.03),t,.8);
 // zegar w salonie
 const dC=dist(L.x,L.y,37*TS+8,26*TS+8)/TS;G.tickT=(G.tickT||0)-dt;if(G.tickT<=0){G.tickT=1;if(!od&&dC<8){const o=ui(.05*(1-dC/8)),tt=c.currentTime;nz(o,tt,.012,{type:'highpass',f:3000,g:1});tone(o,tt,.01,{f:2600,g:.25});}}
 // przejeżdżające auto i pies sąsiadów
 G.carT=(G.carT==null?rand(15,30):G.carT)-dt;if(G.carT<=0){G.carT=rand(25,55);const o=ui(od?.12:.03),g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+1.4);g.gain.linearRampToValueAtTime(0,t+3.2);g.connect(o);nz(g,t,3.3,{type:'lowpass',f:520,g:1});tone(g,t,3.2,{f:70,f2:55,g:.25,type:'triangle'});}
 G.dogT=(G.dogT==null?rand(8,16):G.dogT)-dt;if(G.dogT<=0){G.dogT=rand(14,30);const n=randi(2,4);for(let k=0;k<n;k++)setTimeout(()=>{const o=out(74*TS,14*TS,.35);if(!o)return;const tt=A.ctx.currentTime;tone(o,tt,.11,{f:480,f2:260,type:'sawtooth',g:.35});nz(o,tt,.08,{type:'bandpass',f:900,g:.4});},k*rand(280,380));}}
