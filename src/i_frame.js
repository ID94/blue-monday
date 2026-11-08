
// ================= LEVEL FRAMEWORK =================
// Every scenario registers itself in LVL. Patrol-style levels (patrol:true) share the
// 2-officer spawn, holstered start, subtitle dialogue, cinematic briefing and patrol debrief.
const LVL={};
function LD(){return LVL[G.lvl]||LVL.hosp;}
function isPat(){return !!LD().patrol;}
function W8(){return LD().weather||'rain';}
const NOOP=()=>{};
LVL.hosp={id:'hosp',weather:'rain',terrain:hospTerrain,windows:hospWindows,rooms:ROOMS_HOSP,doors:DOORS_HOSP,furn:FURN_HOSP,lamps:LAMPS_HOSP,cams:CAMS_HOSP,get entries(){return ENTRIES_HOSP;}};
LVL.house={id:'house',patrol:true,sounds:true,weather:'morning',autumn:true,ext:'siding',terrain:houseTerrain,windows:houseWindows,rooms:ROOMS_HOUSE,doors:DOORS_HOUSE,furn:FURN_HOUSE,lamps:LAMPS_HOUSE,cams:[],entries:ENTRIES_HOUSE,
 start:startHouse,update:updateHouse,interact:houseInteract,render:(c,cx,cy)=>{houseShade(c,cx,cy);houseRender(c,cx,cy);},stress:houseStress,obj:houseObj,debrief:houseDebrief,wallCol:houseWallCol,
 win:'2-Adam-14, przyjęłam. Detektywi i technicy są w drodze. Zabezpieczcie miejsce.',
 nb:{no:'#26-118-0457',pri:'P1',code:'10-71',small:'ADRES ZDARZENIA',addr:'214 OAKRIDGE<br>LANE',facts:[['JEDNOSTKA','2-Adam-14 · Ofc. Miller, Ofc. Ortiz'],['GODZINA','06:40'],['ZADANIE','Sprawdzić zgłoszenie']],
  title:'911 · ZAPIS ROZMOWY',clock:[5,52,14],who:{D:'DYSPOZYTOR',C:'ZGŁASZAJĄCA'},bg:[27,34.2,24,13.5],get call(){return CALL;}}};
function setLevel(l){G.lvl=l;const d=LD();
 ROOMS=d.rooms;DOORS=d.doors;FURN=d.furn;LAMPS=d.lamps;CAMS=d.cams||[];ENTRIES=d.entries;G.entry=0;OUTM=null;INM=null;SUNM=null;
 buildMap();bakeWorld();LV.doorRows=null;_wf=null;G.devs=null;}
// ---- outdoor mask (daylight / moonlight reaches outdoor tiles) ----
function buildOUTM(){OUTM=document.createElement('canvas');OUTM.width=MW*TS;OUTM.height=MH*TS;const og=OUTM.getContext('2d');og.fillStyle='#fff';
 const od=(x,y)=>{const t=tAt(x,y);return t===T.GRASS||t===T.ASPH;};
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(od(x,y))og.fillRect(x*TS,y*TS,TS,TS);else if((t===T.WALL||t===T.WIN)&&od(x,y+1))og.fillRect(x*TS,(y-1)*TS+4,TS,TS+12);}}
function weatherAlpha(){return{morning:.76,night:.18,rain:.1,indoor:.3,day:.8}[W8()]||0;}
function weatherTint(){return{morning:'#cfccc6',night:'#6f7a92',rain:'#8a94a8',indoor:'#bdb8b0',day:'#e2ddd4'}[W8()]||'#c4ccd6';}
function nightFx(c){const v=c.createRadialGradient(VW/2,VH/2,VH*.3,VW/2,VH/2,VW*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(2,3,8,.55)');c.fillStyle=v;c.fillRect(0,0,VW,VH);}
function indoorFx(c){const v=c.createRadialGradient(VW/2,VH/2,VH*.35,VW/2,VH/2,VW*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(4,3,2,.45)');c.fillStyle=v;c.fillRect(0,0,VW,VH);}
// ---- shared patrol helpers ----
function spawnPatrolPair(E,names){const L=[{spec:'lead',name:(names&&names[0])||'OFC. MILLER',pal:PAL.patrolA,o:[0,-.5]},{spec:'scout',name:(names&&names[1])||'OFC. ORTIZ',pal:PAL.patrolB,o:[-.9,.6]}];
 L.forEach((d,i)=>{const u=new Unit({team:'squad',spec:d.spec,name:d.name,role:'Patrol Officer',weap:'pistol',fov:84,range:10,acc:'#d8b048',pal:d.pal,patrol:true,charges:0,flash:0,sed:0,shoutCd:0,armor:'light',spray:2});
  u.x=E.x*TS+8+d.o[1]*TS;u.y=E.y*TS-d.o[0]*TS;u.ang=E.a;u.heading=E.a;u.holster=!E.drawn;unstick(u);G.squad[i]=u;G.units.push(u);});}
function mkNPC(o){const u=new Unit(Object.assign({team:'civ',r:4,state:'idle'},o));u.x=o.tx*TS+8;u.y=o.ty*TS+8;u.ang=o.a||0;u.room=LV.room[I(o.tx,o.ty)];G.civs.push(u);G.units.push(u);return u;}
function mkEnemy(o){const e=new Unit(Object.assign({team:'enemy',fov:115,range:8,name:'Podejrzany'},o));e.x=o.tx*TS+8;e.y=o.ty*TS+8;e.ang=o.a||0;e.home={x:e.x,y:e.y,a:e.ang,st:o.st||'guard'};e.state=e.home.st;G.enemies.push(e);G.units.push(e);return e;}
// walk an NPC to a tile, opening unlocked doors on the way; returns true when there
function npcGo(c,dt,tx,ty,spd){if(!c.path||c.goalT!==tx+','+ty){c.path=findPath(c.x/TS|0,c.y/TS|0,tx,ty,4000);c.goalT=tx+','+ty;}
 if(c.path)for(const n of c.path.slice(0,3)){const dd=LV.doorAt[I(n[0],n[1])];if(dd&&dd.target===0&&!dd.locked&&!dd.broken&&dist(dd.x*TS+8,dd.y*TS+8,c.x,c.y)<TS*1.6)toggleDoor(dd,c);}
 if(c.path&&!followPath(c,dt,spd)){if(c.moving)turnTo(c,Math.atan2(c.vy,c.vx),dt,6);return false;}c.path=null;moveUnit(c,dt,0,0,0);return true;}
function npcFace(c,dt,r){const q=nearestSquad(c);if(q&&dist(q.x,q.y,c.x,c.y)<TS*(r||9))turnTo(c,Math.atan2(q.y-c.y,q.x-c.x),dt,2.5);}
function nearPt(u,x,y,r){const fx=u.x+Math.cos(u.ang)*8,fy=u.y+Math.sin(u.ang)*8;return Math.min(dist(fx,fy,x,y),dist(u.x,u.y,x,y))<(r||16);}
function anySquadNear(x,y,r){return G.squad.some(q=>q&&q.alive&&dist(q.x,q.y,x,y)<r);}
function inRoomName(u,n){const r=LV.room[I(u.x/TS|0,u.y/TS|0)];return r>=0&&ROOMS[r].n===n;}
function squadInRoom(n){return G.squad.some(q=>q&&q.alive&&inRoomName(q,n));}
function drawAll(){for(const q of G.squad){if(!q||!q.alive)continue;q.holster=false;q.hTip=0;SND.reload(q.x,q.y,'pistol');}}
// dialogue choices, shown in the order menu box
function choiceMenu(title,items){const el=$('ctx');G.ctxItems=items;G.ctxOpen=true;el.innerHTML='<div class="t">'+title+'</div>'+items.map((it,i)=>'<div class="i'+(it.dis?' dis':'')+'" data-i="'+i+'"><k>'+(i+1)+'</k>'+it.t+'</div>').join('');
 el.classList.remove('hidden');const wr=wrap.getBoundingClientRect();el.style.left=(wr.width*.56)+'px';el.style.top=(wr.height*.3)+'px';SND.click();}
// clue/inspect points shared by patrol levels
function clueAt(u,list){for(const c of list)if(!c.found&&nearPt(u,c.x*TS+8,c.y*TS+8,c.r||13))return c;return null;}
function findClueGen(u,c,H){c.found=true;H.nf=(H.nf||0)+1;logEv(c.msg.split('.')[0]+' ('+roomName(c.x*TS+8,c.y*TS+8)+')');say(u.name,c.msg);if(c.f)c.f(u,c);}
// generic patrol debrief
function patrolDebrief(rows,score){const s=G.stats;score+=G.win?100:0;score-=s.roe*15+s.squadLost*20+s.civKilled*30;if(G.win)score+=Math.max(0,10-Math.floor(s.time/60));
 const rank=!G.win?'F':score>=140?'S':score>=125?'A':score>=105?'B':score>=80?'C':'D';
 $('deb-h').textContent=G.win?'MISJA ZAKOŃCZONA SUKCESEM':'MISJA NIEUDANA';$('deb-h').style.color=G.win?'#7fae6a':'#e0574a';$('deb-r').textContent='OCENA: '+rank;
 $('deb-st').innerHTML=[['Wynik',G.reason],['Czas',fmtT(s.time)],...rows,['Cywile zabici',s.civKilled],['Straty',s.squadLost+' / '+G.squad.filter(Boolean).length],['Ranni / opatrzeni',s.wounded+' / '+s.healed],['Nieuprawnione użycie siły',s.roe],['Oddane strzały',s.shots],['Punkty',score]].map(r=>'<div>'+r[0]+'<span>'+r[1]+'</span></div>').join('');
 $('deb-log').innerHTML='<div class="h">OŚ CZASU</div>'+G.log.map(l=>'<div><span>'+fmtT(l[0])+'</span>'+l[1]+'</div>').join('');showScreen('deb');}
function objRows(head,rows,extra){const row=(ok,t)=>'<div class="'+(ok?'ok':'no')+'">'+(ok?'■':'□')+' '+t+'</div>';return'<div class="h">'+head+' · '+fmtT(G.stats.time)+'</div>'+rows.filter(Boolean).map(r=>row(r[0],r[1])).join('')+(extra||'');}
// ---- cinematic briefing filled from level data ----
function fillBriefing(){const n=LD().nb;if(!n)return;
 $('nb').querySelector('.nb-top').innerHTML='<span><i></i>ZGŁOSZENIE '+n.no+'</span><span>PRIORYTET <b>'+n.pri+'</b> &nbsp;·&nbsp; KOD '+n.code+'</span>';
 $('nb').querySelector('.nb-addr').innerHTML='<small>'+n.small+'</small><h2>'+n.addr+'</h2><div class="ln"></div>';
 $('nb').querySelector('.nb-facts').innerHTML=n.facts.map(f=>'<span>'+f[0]+'</span><div>'+f[1]+'</div>').join('');
 $('nb').querySelector('.nb-call .h span').innerHTML=n.title+' · <em id="calltime"></em>';}
// exterior wall looks for non-house patrol levels
function extWall(g,x,y,tx,ty,r){const k=LD().ext;
 if(k==='brick'){P(g,x,y,16,WH,'#4a3029');for(let j=0;j<WH;j+=3){P(g,x,y+j,16,1,'#3a2420');for(let i=(j/3%2)*4;i<16;i+=8)P(g,x+i,y+j,1,3,'#3a2420');}P(g,x,y,16,1,'#6a4a40');}
 else if(k==='stucco'){P(g,x,y,16,WH,'#8a7a62');speck(g,x,y,'#7a6a54',8,r,16,WH);P(g,x,y,16,1,'#a89878');P(g,x,y+WH-2,16,2,'#5a4e3e');}
 else if(k==='concrete'){P(g,x,y,16,WH,'#6e7276');for(let i=0;i<16;i+=8)P(g,x+i,y,1,WH,'#5a5e62');P(g,x,y,16,1,'#8e9296');P(g,x,y+WH-1,16,1,'#3a3e42');}
 else{P(g,x,y,16,WH,'#3a3d40');P(g,x,y,16,1,'#55595e');}}
