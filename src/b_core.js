const tAt=(x,y)=>inb(x,y)?LV.t[I(x,y)]:T.WALL;
function isOutdoor(x,y){const tx=x/TS|0,ty=y/TS|0;if(!inb(tx,ty))return true;const t=LV.t[I(tx,ty)];return t===T.GRASS||t===T.ASPH;}
function solidAt(tx,ty){if(!inb(tx,ty))return true;const i=I(tx,ty),t=LV.t[i];if(t===T.WALL||t===T.WIN)return true;if(LV.fsolid[i])return true;
 if(t===T.DOOR){const d=LV.doorAt[i];return !(d.broken||d.open>.6);}return false;}
function opaqueAt(tx,ty){if(!inb(tx,ty))return true;const i=I(tx,ty),t=LV.t[i];if(t===T.WALL)return true;if(LV.fopq[i])return true;
 if(t===T.DOOR){const d=LV.doorAt[i];return !d.glass&&!(d.broken||d.open>.45);}return false;}
function bulletBlock(tx,ty){if(!inb(tx,ty))return true;const i=I(tx,ty),t=LV.t[i];if(t===T.WALL||t===T.WIN)return true;if(LV.fopq[i])return true;
 if(t===T.DOOR){const d=LV.doorAt[i];return !(d.broken||d.open>.45);}return false;}
function walkable(tx,ty){if(!inb(tx,ty))return false;const i=I(tx,ty),t=LV.t[i];if(t===T.WALL||t===T.WIN||LV.fsolid[i])return false;
 if(t===T.DOOR){const d=LV.doorAt[i];if(d.locked&&!d.broken&&d.open<.5)return false;}return true;}
function doorNear(x,y,r=13){let best=null,bd=r;for(const d of LV.doors){const dd=dist(x,y,d.x*TS+8,d.y*TS+8);if(dd<bd){bd=dd;best=d;}}return best;}

// ---- ray casting ----
function castRay(x0,y0,a,maxD,ext,fn){fn=fn||opaqueAt;const dx=Math.cos(a),dy=Math.sin(a);let tx=Math.floor(x0/TS),ty=Math.floor(y0/TS);
 const sx=dx>0?1:-1,sy=dy>0?1:-1;const tdx=dx===0?1e9:Math.abs(TS/dx),tdy=dy===0?1e9:Math.abs(TS/dy);
 let tmx=dx>0?((tx+1)*TS-x0)/dx:dx<0?(tx*TS-x0)/dx:1e9,tmy=dy>0?((ty+1)*TS-y0)/dy:dy<0?(ty*TS-y0)/dy:1e9;
 let t=0,ly=false;for(let n=0;n<80;n++){if(tmx<tmy){t=tmx;tmx+=tdx;tx+=sx;ly=false;}else{t=tmy;tmy+=tdy;ty+=sy;ly=true;}
  if(t>=maxD)return maxD;if(fn(tx,ty))return Math.min(maxD,t+(ext?ext+(ly&&sy<0?Math.min(26,WH/Math.max(.3,Math.abs(dy))):0):0));}return maxD;}
function losClear(x0,y0,x1,y1){const d=Math.hypot(x1-x0,y1-y0);if(d<2)return true;return castRay(x0,y0,Math.atan2(y1-y0,x1-x0),d,0)>=d-.5;}
function collides(x,y,r){const x0=Math.floor((x-r)/TS),x1=Math.floor((x+r)/TS),y0=Math.floor((y-r)/TS),y1=Math.floor((y+r)/TS);
 for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++)if(solidAt(tx,ty)){const cx=clamp(x,tx*TS,tx*TS+TS),cy=clamp(y,ty*TS,ty*TS+TS);if((x-cx)**2+(y-cy)**2<r*r)return true;}return false;}
function walkLine(x0,y0,x1,y1,r){const d=Math.hypot(x1-x0,y1-y0),n=Math.ceil(d/5);for(let i=1;i<=n;i++){const t=i/n;if(collides(x0+(x1-x0)*t,y0+(y1-y0)*t,r))return false;}return true;}

// ---- A* ----
function findPath(sx,sy,tx,ty,maxN=9000){
 if(!walkable(tx,ty)){let f=null;for(let r=1;r<=3&&!f;r++)for(let dy=-r;dy<=r&&!f;dy++)for(let dx=-r;dx<=r;dx++)if(walkable(tx+dx,ty+dy)){f=[tx+dx,ty+dy];break;}if(!f)return null;tx=f[0];ty=f[1];}
 if(sx===tx&&sy===ty)return[[tx,ty]];
 const N=MW*MH,g=new Float32Array(N).fill(1e9),from=new Int32Array(N).fill(-1),closed=new Uint8Array(N);
 const heap=[];const push=(i,f)=>{heap.push([f,i]);let k=heap.length-1;while(k>0){const p=(k-1)>>1;if(heap[p][0]<=heap[k][0])break;[heap[p],heap[k]]=[heap[k],heap[p]];k=p;}};
 const pop=()=>{const top=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let k=0;for(;;){const a=2*k+1,b=a+1;let m=k;if(a<heap.length&&heap[a][0]<heap[m][0])m=a;if(b<heap.length&&heap[b][0]<heap[m][0])m=b;if(m===k)break;[heap[m],heap[k]]=[heap[k],heap[m]];k=m;}}return top;};
 const h=(x,y)=>{const dx=Math.abs(x-tx),dy=Math.abs(y-ty);return dx+dy-.586*Math.min(dx,dy);};
 const s=I(sx,sy),goal=I(tx,ty);g[s]=0;push(s,h(sx,sy));let n=0;
 while(heap.length&&n++<maxN){const[,i]=pop();if(i===goal)break;if(closed[i])continue;closed[i]=1;const x=i%MW,y=(i/MW)|0;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(!walkable(nx,ny))continue;
   if(dx&&dy&&(!walkable(x+dx,y)||!walkable(x,y+dy)))continue;const j=I(nx,ny);
   let c=(dx&&dy)?1.414:1;if(LV.t[j]===T.DOOR){const d=LV.doorAt[j];if(!d.broken&&d.open<.5)c+=2;}
   const ng=g[i]+c;if(ng<g[j]){g[j]=ng;from[j]=i;push(j,ng+h(nx,ny));}}}
 if(from[goal]<0)return null;const p=[];let k=goal;while(k!==s&&k>=0){p.push([k%MW,(k/MW)|0]);k=from[k];}return p.reverse();}
function floodRoom(sx,sy,lim=300){const out=[],seen=new Set([I(sx,sy)]),q=[[sx,sy]];
 while(q.length&&out.length<lim){const[x,y]=q.shift();const t=tAt(x,y);if(t===T.WALL||t===T.WIN||t===T.DOOR)continue;out.push([x,y]);
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const k=I(x+dx,y+dy);if(inb(x+dx,y+dy)&&!seen.has(k)){seen.add(k);q.push([x+dx,y+dy]);}}}return out;}

// ================= TEXTURES / BAKE =================
const world=document.createElement('canvas');world.width=MW*TS;world.height=MH*TS;const wc=world.getContext('2d');
const memory=document.createElement('canvas');memory.width=MW*TS;memory.height=MH*TS;const mc=memory.getContext('2d');
function speck(g,x,y,c,n,r,w=16,h=16){g.fillStyle=c;for(let i=0;i<n;i++)g.fillRect(x+Math.floor(r()*w),y+Math.floor(r()*h),1,1);}
function drawFloor(g,tx,ty,s,r){const x=tx*TS,y=ty*TS;
 switch(s){
 case'schl':{P(g,x,y,16,16,'#bdb8a8');speck(g,x,y,'#c8c3b4',14,r);speck(g,x,y,'#aea998',10,r);P(g,x,y,16,1,'#a9a493');P(g,x,y,1,16,'#a9a493');if(((tx*7+ty*13)%11)===0)P(g,x+1,y+1,15,15,'rgba(90,110,150,.22)');if(r()<.05)P(g,x+4,y+6,6,3,'rgba(80,70,50,.18)');break;}
 case'schc':{P(g,x,y,16,16,'#c9c3b2');speck(g,x,y,'#b4ad9a',18,r);speck(g,x,y,'#ddd8c8',12,r);speck(g,x,y,'#8a8478',4,r);if(tx%4===0)P(g,x,y,1,16,'#9e9888');if(((ty)%2)===0)P(g,x,y,16,1,'#b0aa9a');break;}
 case'schk':{const k=((tx+ty)%2)===0;P(g,x,y,16,16,k?'#d8d4c8':'#9a3a34');speck(g,x,y,k?'#c8c4b8':'#8a3230',10,r);P(g,x,y,16,1,'rgba(0,0,0,.12)');P(g,x,y,1,16,'rgba(0,0,0,.12)');break;}
 case'schb':{P(g,x,y,16,16,'#3a5068');for(let j=0;j<16;j+=2)for(let i=(j/2)%2*2;i<16;i+=4)P(g,x+i,y+j,1,1,'#45607a');speck(g,x,y,'#2e4256',8,r);break;}
 case'lino':P(g,x,y,16,16,'#3a4641');speck(g,x,y,'#34403b',12,r);speck(g,x,y,'#43504a',8,r);P(g,x,y,16,1,'#2f3934');P(g,x,y,1,16,'#2f3934');if(r()<.07){for(let i=0;i<6;i++)P(g,x+3+i*2,y+5+(i%2),2,1,'#2b342f');}if(r()<.05)P(g,x+4,y+6,6,4,'rgba(60,50,30,.35)');break;
 case'tileW':P(g,x,y,16,16,'#6e7977');P(g,x,y,16,1,'#5a6361');P(g,x,y+8,16,1,'#5a6361');P(g,x,y,1,16,'#5a6361');P(g,x+8,y,1,16,'#5a6361');speck(g,x,y,'#626b69',10,r);speck(g,x,y,'#7a8482',6,r);if(r()<.12)P(g,x+2+r()*8|0,y+2+r()*8|0,4,3,'rgba(70,60,40,.35)');break;
 case'wood':for(let k=0;k<4;k++){P(g,x,y+k*4,16,4,k%2?'#48332a':'#51392d');P(g,x,y+k*4,16,1,'#3a2a21');P(g,x+((r()*14)|0),y+k*4,1,4,'#35261d');}speck(g,x,y,'#5a4233',6,r);break;
 case'carpet':P(g,x,y,16,16,'#4a1d22');for(let j=0;j<16;j+=2)for(let i=(j/2)%2*2;i<16;i+=4)P(g,x+i,y+j,1,1,'#56252b');speck(g,x,y,'#3a161a',10,r);break;
 case'pad':P(g,x,y,16,16,'#867e6c');for(let k=0;k<16;k++){P(g,x+k,y+k,1,1,'#736c5c');P(g,x+15-k,y+k,1,1,'#736c5c');}P(g,x+7,y+7,2,2,'#655f50');speck(g,x,y,'#7a7362',6,r);break;
 case'conc':P(g,x,y,16,16,'#454645');speck(g,x,y,'#3d3e3d',26,r);speck(g,x,y,'#505150',14,r);break;
 case'lobby':{const a='#58544c',b='#3c3a35';P(g,x,y,8,8,a);P(g,x+8,y+8,8,8,a);P(g,x+8,y,8,8,b);P(g,x,y+8,8,8,b);speck(g,x,y,'#625e55',6,r);break;}
 case'grass':P(g,x,y,16,16,'#1a2517');speck(g,x,y,'#22301e',30,r);speck(g,x,y,'#141d12',20,r);speck(g,x,y,'#2c3c25',6,r);break;
 case'asph':P(g,x,y,16,16,'#27282b');speck(g,x,y,'#2f3034',30,r);speck(g,x,y,'#212225',30,r);break;
 }}
const WH=12,WR=[];
function isWallT(x,y){const t=tAt(x,y);return t===T.WALL||t===T.WIN;}
function drawWallTall(g,tx,ty,r){const x=tx*TS,t=tAt(tx,ty),b=tAt(tx,ty+1),face=b!==T.WALL&&b!==T.WIN,outB=b===T.GRASS||b===T.ASPH;
 P(g,x,0,16,16,'#3a3f45');speck(g,x,0,'#434950',12,r);speck(g,x,0,'#33383d',10,r);
 if(!isWallT(tx-1,ty))P(g,x,0,1,16,'#565c64');if(!isWallT(tx+1,ty))P(g,x+15,0,1,16,'#26292d');if(!isWallT(tx,ty-1))P(g,x,0,16,2,'#5e656d');if(!isWallT(tx,ty+1))P(g,x,15,16,1,'#2a2e33');
 if(t===T.WIN&&!face&&isPat()){P(g,x+5,0,6,16,'#24323e');P(g,x+6,1,1,14,'#4a6478');}
 else if(t===T.WIN&&!face){P(g,x+5,0,6,16,'#1a2632');P(g,x+6,2,1,8,'#3a5468');for(let i=1;i<16;i+=3)P(g,x+5,i,6,1,'#4f5357');}
 if(!face)return;const y=16;
 if(outB&&isPat()&&LD().ext!=='siding'){extWall(g,x,y,tx,ty,r);}
 else if(outB&&isPat()){if(HOUSE_GDOOR(tx)&&ty===34){P(g,x,y,16,WH,'#8e9296');for(let k=1;k<WH;k+=3)P(g,x,y+k,16,1,'#6e7276');P(g,x,y,16,1,'#b0b4b8');if(tx===54||tx===55)P(g,x+(tx===54?14:0),y+6,2,1,'#3a3e42');}else{P(g,x,y,16,WH,'#6f757c');for(let k=2;k<WH;k+=3)P(g,x,y+k,16,1,'#5a6066');P(g,x,y,16,1,'#a8adb2');P(g,x,y+WH-1,16,1,'#3a3e42');speck(g,x,y,'#787e85',5,r,16,WH);}}
 else if(outB){P(g,x,y,16,WH,'#4a3029');for(let k=0;k<4;k++){P(g,x,y+2+k*3,16,1,'#36221d');for(let j=(k%2)*4;j<16;j+=8)P(g,x+j,y+k*3,1,3,'#36221d');}speck(g,x,y,'#563830',8,r,16,WH);P(g,x,y,16,1,'#5e3d34');}
 else{const rb=LV.room[I(tx,ty+1)],corr=rb>=0&&ROOMS[rb].n.startsWith('Korytarz'),pad=rb>=0&&ROOMS[rb].f==='pad';
  const wp=isPat()?(LD().wallCol||houseWallCol)(rb):null;if(wp){P(g,x,y,16,WH,wp[0]);P(g,x,y,16,1,shadeC(wp[0],14));P(g,x,y+8,16,3,wp[1]);P(g,x,y+11,16,1,'#1c1a18');speck(g,x,y+1,shadeC(wp[0],-8),6,r,16,6);(LD().wallDeco||houseWallDeco)(g,x,y,rb>=0?ROOMS[rb].n:'',r);}
  else{P(g,x,y,16,7,'#5b655c');P(g,x,y,16,1,'#6c776d');P(g,x,y+7,16,4,'#3e4740');P(g,x,y+7,16,1,'#2f3631');P(g,x,y+11,16,1,'#1c201d');speck(g,x,y+1,'#535c54',8,r,16,6);}
  if(isPat()){}else{if(pad){P(g,x,y,16,WH,'#7d7563');for(let i=2;i<16;i+=4)P(g,x+i,y+1,1,10,'#6c6555');}
  if(corr){P(g,x,y+6,16,1,'#8a8f86');P(g,x,y+7,16,1,'#3a403b');}
  const k=r();if(!pad){if(k<.05){P(g,x+4,y+1,8,5,'#7a6a4a');P(g,x+5,y+2,2,2,'#d9d4c4');P(g,x+8,y+2,3,1,'#cfc9b6');P(g,x+8,y+4,2,1,'#b33');}
   else if(k<.07&&corr){P(g,x+6,y+1,3,6,'#a01e1a');P(g,x+6,y+1,3,1,'#c83a30');}
   else if(k<.085&&corr){P(g,x+3,y,10,3,'#1d5a2e');P(g,x+4,y+1,8,1,'#7fe09a');}
   else if(k<.1){for(let i=0;i<7;i++)P(g,x+2+i*2,y+2+((i*7)%3),2,1,'#6a1414');}
   else if(k<.17){for(let i=0;i<4;i++)P(g,x+3+i,y+1+i*2,1,2,'#3f4740');}
   else if(k<.22)P(g,x+2,y+3,10,3,'rgba(70,55,35,.45)');}}}
 if(!isWallT(tx-1,ty))P(g,x,y,1,WH,'rgba(255,255,255,.06)');if(!isWallT(tx+1,ty))P(g,x+15,y,1,WH,'rgba(0,0,0,.25)');
 if(t===T.WIN&&isPat()){const lit=outB&&r()<.45;P(g,x+1,y+1,14,10,'#c8c8c0');P(g,x+2,y+2,12,8,lit?'#6a5432':'#1c2a36');P(g,x+2,y+2,12,1,lit?'#8a7040':'#2a3a48');P(g,x+8,y+2,1,8,'#c8c8c0');P(g,x+3,y+3,3,1,lit?'#b09050':'#4a6478');if(!outB){P(g,x+2,y+2,3,8,'#6a5a5a');P(g,x+11,y+2,3,8,'#6a5a5a');}}
 else if(t===T.WIN){P(g,x+2,y+2,12,8,'#1a2632');P(g,x+3,y+3,4,1,'#3a5468');P(g,x+2,y+2,12,1,'#2a2d31');for(let i=4;i<14;i+=3)P(g,x+i,y+2,1,8,'#4f5357');}}
function bakeWalls(){const r=rng(2024);for(let y=0;y<MH;y++){let c=WR[y];if(!c){c=document.createElement('canvas');c.width=MW*TS;c.height=TS+WH;WR[y]=c;}const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);for(let x=0;x<MW;x++)if(isWallT(x,y))drawWallTall(g,x,y,r);}}
function wallMark(x,y,col,w,h){const tx=x/TS|0,ty=y/TS|0;if(!inb(tx,ty)||!WR[ty])return false;const g=WR[ty].getContext('2d'),face=!isWallT(tx,ty+1);g.fillStyle=col;g.fillRect(Math.round(x),face?16+((Math.random()*9)|0):2+((Math.random()*12)|0),w||1,h||1);return true;}
function drawWall(g,tx,ty,r){const x=tx*TS,y=ty*TS,t=tAt(tx,ty),b=tAt(tx,ty+1);
 const face=b!==T.WALL&&b!==T.WIN,outB=b===T.GRASS||b===T.ASPH;
 if(face){P(g,x,y,16,6,'#25282c');P(g,x,y,16,1,'#33373c');
  if(outB){P(g,x,y+6,16,10,'#4a3029');for(let k=0;k<3;k++){P(g,x,y+8+k*3,16,1,'#36221d');for(let j=(k%2)*4;j<16;j+=8)P(g,x+j,y+6+k*3,1,3,'#36221d');}speck(g,x,y+6,'#563830',6,r,16,10);}
  else{P(g,x,y+6,16,6,'#5b655c');P(g,x,y+12,16,3,'#3e4740');P(g,x,y+12,16,1,'#2f3631');P(g,x,y+15,16,1,'#1c201d');speck(g,x,y+6,'#535c54',8,r,16,6);
   const rb=LV.room[I(tx,ty+1)],corr=rb>=0&&ROOMS[rb].n.startsWith('Korytarz');
   if(corr){P(g,x,y+10,16,1,'#8a8f86');P(g,x,y+11,16,1,'#3a403b');if(tx%3===0)P(g,x+7,y+11,1,2,'#6a6f68');}
   if(rb>=0&&ROOMS[rb].f==='pad'){P(g,x,y+6,16,10,'#7d7563');for(let i=2;i<16;i+=4)P(g,x+i,y+7,1,8,'#6c6555');}
   const k=r();if(k<.05){P(g,x+4,y+7,8,4,'#7a6a4a');P(g,x+5,y+8,2,2,'#d9d4c4');P(g,x+8,y+8,3,1,'#cfc9b6');P(g,x+8,y+10,2,1,'#b33');}
   else if(k<.07&&corr){P(g,x+6,y+8,3,5,'#a01e1a');P(g,x+6,y+8,3,1,'#c83a30');P(g,x+7,y+7,1,1,'#333');}
   else if(k<.085&&corr){P(g,x+3,y+6,10,3,'#1d5a2e');P(g,x+4,y+7,8,1,'#7fe09a');}
   else if(k<.1){for(let i=0;i<7;i++)P(g,x+2+i*2,y+8+((i*7)%3),2,1,'#6a1414');}
   else if(k<.09){P(g,x+6,y+7,4,4,'#2b2b2b');P(g,x+7,y+8,2,2,'#d9d4c4');}
   else if(k<.17){for(let i=0;i<4;i++)P(g,x+3+i,y+7+i*2,1,2,'#3f4740');}
   else if(k<.22)P(g,x+2,y+9,10,3,'rgba(70,55,35,.45)');}
  if(t===T.WIN){P(g,x+2,y+7,12,7,'#1a2632');P(g,x+3,y+8,4,1,'#3a5468');P(g,x+2,y+7,12,1,'#2a2d31');for(let i=4;i<14;i+=3)P(g,x+i,y+7,1,7,'#4f5357');}
 }else{P(g,x,y,16,16,'#25282c');if(tAt(tx-1,ty)!==T.WALL&&tAt(tx-1,ty)!==T.WIN)P(g,x,y,1,16,'#30343a');if(tAt(tx+1,ty)!==T.WALL&&tAt(tx+1,ty)!==T.WIN)P(g,x+15,y,1,16,'#1b1d20');if(tAt(tx,ty-1)!==T.WALL&&tAt(tx,ty-1)!==T.WIN)P(g,x,y,16,1,'#33373c');
  if(t===T.WIN){P(g,x+5,y,6,16,'#1a2632');P(g,x+6,y+2,1,6,'#3a5468');for(let i=1;i<16;i+=3)P(g,x+5,y+i,6,1,'#4f5357');}}
}
// ---- furniture art ----
const SH='rgba(0,0,0,.38)';
function F(k,w,h,s,o,d){FT[k]={w,h,s,o,d};}
F('bed',1,2,1,0,(g,x,y)=>{P(g,x+2,y+29,13,3,SH);P(g,x+1,y+1,14,29,'#5d6166');P(g,x+1,y,14,3,'#787d84');P(g,x+2,y+3,12,26,'#a9aca6');P(g,x+3,y+4,10,5,'#d0d2cb');P(g,x+3,y+4,10,1,'#e2e3dd');P(g,x+2,y+12,12,17,'#5f7080');P(g,x+2,y+12,12,2,'#7a8b9a');P(g,x+1,y+18,14,1,'#5a4a32');P(g,x+1,y+25,14,1,'#5a4a32');P(g,x+1,y+29,2,2,'#333');P(g,x+13,y+29,2,2,'#333');});
F('bedH',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,3,SH);P(g,x+1,y+2,30,11,'#5d6166');P(g,x+3,y+3,26,9,'#b9bcb6');P(g,x+4,y+4,5,7,'#d6d8d1');P(g,x+12,y+2,1,11,'#4a3a26');P(g,x+20,y+2,1,11,'#4a3a26');P(g,x+12,y+6,1,2,'#9a8a5a');P(g,x+20,y+6,1,2,'#9a8a5a');});
F('mattress',2,1,0,0,(g,x,y)=>{P(g,x+2,y+3,26,10,'#8d8676');P(g,x+2,y+3,26,1,'#a09886');P(g,x+10,y+7,4,2,'#6d6555');P(g,x+16,y+4,9,8,'#5b6470');P(g,x+17,y+5,6,2,'#6a7480');});
F('toilet',1,1,1,0,(g,x,y)=>{P(g,x+4,y+1,8,5,'#c4c9c8');P(g,x+4,y+6,8,8,'#b4b9b8');P(g,x+5,y+7,6,6,'#7d8786');P(g,x+4,y+14,8,1,SH);});
F('sink',1,1,1,0,(g,x,y)=>{P(g,x+2,y+1,12,9,'#c0c5c4');P(g,x+4,y+3,8,5,'#7a8686');P(g,x+7,y+1,2,2,'#8a8f92');P(g,x+2,y+10,12,2,SH);});
F('tub',2,1,1,0,(g,x,y)=>{P(g,x+1,y+2,30,13,'#c2c6c5');P(g,x+3,y+4,26,9,'#6c7878');P(g,x+12,y+6,8,4,'#5a5240');P(g,x+1,y+15,30,1,SH);});
F('drain',1,1,0,0,(g,x,y)=>{P(g,x+3,y+3,10,10,'rgba(40,60,70,.25)');P(g,x+6,y+6,4,4,'#3b4442');P(g,x+7,y+7,2,2,'#1b1f1e');});
F('table',2,2,1,0,(g,x,y)=>{P(g,x+2,y+26,29,4,SH);P(g,x+1,y+3,30,22,'#5e4a38');P(g,x+1,y+3,30,1,'#705a46');P(g,x+1,y+25,30,3,'#45362a');P(g,x+2,y+28,2,3,'#2e241c');P(g,x+28,y+28,2,3,'#2e241c');P(g,x+8,y+8,3,3,'#d9d6cc');P(g,x+9,y+9,1,1,'#5a3a20');P(g,x+18,y+12,7,5,'#cfcab8');P(g,x+19,y+13,5,1,'#888');});
F('tableL',3,1,1,0,(g,x,y)=>{P(g,x+1,y+12,46,3,SH);P(g,x,y+2,48,9,'#5f6468');P(g,x,y+2,48,1,'#73787c');P(g,x,y+11,48,2,'#3f4448');P(g,x+6,y+4,6,4,'#7a6a4a');P(g,x+26,y+5,6,4,'#7a6a4a');P(g,x+38,y+4,3,3,'#c9c4b4');});
F('tableS',1,1,1,0,(g,x,y)=>{P(g,x+2,y+12,13,3,SH);P(g,x+2,y+3,12,9,'#5e4a38');P(g,x+2,y+12,12,2,'#45362a');P(g,x+5,y+5,4,3,'#cfcab8');});
F('chair',1,1,0,0,(g,x,y)=>{P(g,x+4,y+13,9,2,SH);P(g,x+4,y+6,8,6,'#4b4f55');P(g,x+4,y+2,8,4,'#3a3e43');P(g,x+4,y+12,1,3,'#222');P(g,x+11,y+12,1,3,'#222');});
F('chairD',1,1,0,0,(g,x,y)=>{P(g,x+4,y+12,9,2,SH);P(g,x+4,y+3,8,6,'#4b4f55');P(g,x+4,y+9,8,4,'#3a3e43');});
F('chairX',1,1,0,0,(g,x,y)=>{P(g,x+2,y+8,12,4,'#3a3e43');P(g,x+3,y+5,2,8,'#4b4f55');P(g,x+11,y+4,1,4,'#222');P(g,x+13,y+6,1,4,'#222');});
F('desk',2,1,1,0,(g,x,y)=>{P(g,x+1,y+14,31,2,SH);P(g,x,y+2,32,9,'#583f2f');P(g,x,y+2,32,1,'#6a4f3c');P(g,x,y+11,32,4,'#45311f');P(g,x+22,y+12,8,1,'#2e2015');});
F('deskPC',2,1,1,0,(g,x,y)=>{FT.desk.d(g,x,y);P(g,x+10,y-4,11,8,'#1a1d22');P(g,x+11,y-3,9,5,'#26424e');P(g,x+12,y-2,3,1,'#4a7a8a');P(g,x+14,y+4,3,2,'#222');P(g,x+10,y+7,9,2,'#2a2a2a');P(g,x+24,y+4,5,4,'#d8d4c4');P(g,x+3,y+3,2,5,'#333');P(g,x+2,y+2,4,2,'#c9a74a');});
F('sofa',2,1,1,0,(g,x,y)=>{P(g,x+1,y+14,31,2,SH);P(g,x,y,32,6,'#4e3434');P(g,x+2,y+6,28,7,'#5f3f3f');P(g,x+15,y+6,1,7,'#4a3030');P(g,x,y+3,3,11,'#452e2e');P(g,x+29,y+3,3,11,'#452e2e');});
F('shelf',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x,y-10,16,24,'#4a3626');P(g,x,y-10,16,3,'#5c4532');for(const ry of [-6,0,6]){P(g,x+1,y+ry+5,14,1,'#2e2118');for(let i=1;i<15;i+=2)P(g,x+i,y+ry,2,5,pick(['#6a2a2a','#2a4a5a','#5a5a3a','#3a3a3a','#7a6a4a','#2a3a2a']));}});
F('rack',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x,y-10,16,24,'#3d4247');P(g,x,y-10,16,2,'#565c62');for(const ry of [-7,-1,5]){P(g,x,y+ry+5,16,1,'#2a2e32');for(let i=1;i<14;i+=5)if(Math.random()<.85)P(g,x+i,y+ry+1,4,4,pick(['#8a7556','#7a6a50','#9a8a68']));}P(g,x,y-10,1,24,'#2a2e32');P(g,x+15,y-10,1,24,'#2a2e32');});
F('cab',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#59606a');P(g,x+1,y-10,14,2,'#6c747e');P(g,x+8,y-7,1,20,'#3e444c');P(g,x+6,y,1,3,'#999');P(g,x+10,y,1,3,'#999');P(g,x+3,y-6,4,2,'#d8d4c4');});
F('locker',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#3d5660');P(g,x+1,y-10,14,2,'#4e6a75');P(g,x+8,y-9,1,23,'#2a3c43');for(let i=0;i<3;i++){P(g,x+3,y-7+i*2,3,1,'#2a3c43');P(g,x+10,y-7+i*2,3,1,'#2a3c43');}P(g,x+6,y+2,1,2,'#aaa');P(g,x+10,y+2,1,2,'#aaa');});
F('medshelf',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#b8bdbb');P(g,x+2,y-8,12,18,'#2a3a40');for(const ry of [-7,-1,5])for(let i=3;i<13;i+=2)if(Math.random()<.8)P(g,x+i,y+ry,1,3,pick(['#d84','#8c4','#c33','#ddd','#48c']));P(g,x+8,y-8,1,18,'#8a9090');});
F('fridge',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-10,14,24,'#bfc3c1');P(g,x+1,y-10,14,1,'#d5d8d6');P(g,x+1,y-2,14,1,'#8a8e8c');P(g,x+12,y-7,1,3,'#777');P(g,x+12,y+2,1,4,'#777');});
F('counter',1,1,1,0,(g,x,y)=>{P(g,x,y+1,16,10,'#787b7a');P(g,x,y+1,16,1,'#909392');P(g,x,y+11,16,4,'#4a4d4e');P(g,x+7,y+11,1,4,'#3a3d3e');if(Math.random()<.3)P(g,x+4,y+3,5,4,pick(['#555','#8a6a4a','#c9c4b4']));});
F('stove',1,1,1,0,(g,x,y)=>{FT.counter.d(g,x,y);P(g,x+2,y+2,5,4,'#1e1e1e');P(g,x+9,y+2,5,4,'#1e1e1e');P(g,x+2,y+6,5,4,'#1e1e1e');P(g,x+9,y+6,5,4,'#1e1e1e');});
F('vending',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-12,14,26,'#6a1a1e');P(g,x+1,y-12,14,2,'#8a2a2e');P(g,x+3,y-9,8,15,'#16222c');for(let r=0;r<4;r++)for(let c=0;c<3;c++)P(g,x+4+c*2,y-8+r*4,1,2,pick(['#d84','#4a8','#cc4','#c44']));P(g,x+12,y-6,2,4,'#222');P(g,x+3,y+8,8,3,'#111');});
F('plant',1,1,1,0,(g,x,y)=>{P(g,x+4,y+13,9,2,SH);P(g,x+5,y+8,6,6,'#5a3e2a');P(g,x+5,y+8,6,1,'#6e4e36');P(g,x+3,y,10,9,'#203a20');P(g,x+2,y+3,3,4,'#1c321c');P(g,x+11,y+2,3,5,'#1c321c');P(g,x+5,y+1,3,2,'#2f5230');P(g,x+9,y+3,2,2,'#2f5230');P(g,x+6,y+5,1,3,'#3a2a1a');});
F('tv',1,1,1,0,(g,x,y)=>{P(g,x+1,y+3,14,11,'#3a2e24');P(g,x+1,y+3,14,1,'#4a3c30');P(g,x+2,y-6,12,9,'#111');P(g,x+3,y-5,10,7,'#1c2832');P(g,x+4,y-4,4,1,'#34495a');});
F('gurney',2,1,1,0,(g,x,y)=>{P(g,x+1,y+13,30,3,SH);P(g,x+1,y+3,30,8,'#8a9096');P(g,x+3,y+3,26,7,'#cbcec8');P(g,x+4,y+4,6,5,'#dcdfd8');P(g,x+18,y+3,1,8,'#4a3a26');P(g,x+2,y+12,2,2,'#222');P(g,x+28,y+12,2,2,'#222');});
F('gurneyV',1,2,1,0,(g,x,y)=>{P(g,x+2,y+29,12,3,SH);P(g,x+3,y+1,10,28,'#8a9096');P(g,x+4,y+2,8,26,'#cbcec8');P(g,x+5,y+3,6,5,'#dcdfd8');P(g,x+4,y+20,8,1,'#4a3a26');});
F('wheel',1,1,1,0,(g,x,y)=>{P(g,x+3,y+13,10,2,SH);P(g,x+4,y+4,8,7,'#3d4247');P(g,x+3,y+5,1,8,'#111');P(g,x+12,y+5,1,8,'#111');P(g,x+4,y+2,8,3,'#2a2e33');P(g,x+5,y+11,6,1,'#555');});
F('ect',1,1,1,0,(g,x,y)=>{P(g,x+2,y+13,12,2,SH);P(g,x+2,y-4,12,17,'#5f6457');P(g,x+2,y-4,12,1,'#757a6c');P(g,x+4,y-1,3,3,'#c9b458');P(g,x+9,y-1,3,3,'#a33');P(g,x+4,y+4,8,3,'#1a2a20');P(g,x+5,y+5,4,1,'#4c8a5c');line(g,x+2,y+6,x-6,y+4,'#222');});
F('cart',1,1,1,0,(g,x,y)=>{P(g,x+3,y+13,11,2,SH);P(g,x+3,y+2,10,11,'#9aa3a8');P(g,x+3,y+7,10,1,'#6a7378');for(let i=4;i<12;i+=2)P(g,x+i,y+3,1,3,pick(['#d84','#8c4','#c33','#ddd']));});
F('monitors',3,1,1,0,(g,x,y)=>{P(g,x,y+14,48,2,SH);P(g,x,y+4,48,10,'#2e3136');P(g,x,y+4,48,1,'#41454b');for(let i=0;i<3;i++){P(g,x+3+i*15,y-7,13,10,'#111');P(g,x+4+i*15,y-6,11,7,'#1c3830');}P(g,x+16,y+8,12,2,'#1e1e1e');});
F('reception',4,1,1,0,(g,x,y)=>{P(g,x,y+14,64,2,SH);P(g,x,y,64,13,'#55432f');P(g,x,y,64,3,'#77614a');for(let i=6;i<64;i+=10)P(g,x+i,y+4,1,9,'#46372a');P(g,x+20,y-6,10,7,'#1a1d22');P(g,x+21,y-5,8,4,'#26424e');P(g,x+44,y+1,6,2,'#d8d4c4');P(g,x+10,y+1,2,2,'#c9b458');});
F('bench',2,1,1,0,(g,x,y)=>{P(g,x+1,y+11,30,3,SH);P(g,x+1,y+4,30,6,'#4f4232');P(g,x+1,y+6,30,1,'#3e3326');P(g,x+2,y+10,2,3,'#222');P(g,x+28,y+10,2,3,'#222');});
F('benchL',3,1,1,0,(g,x,y)=>{P(g,x+1,y+11,46,3,SH);P(g,x+1,y+4,46,6,'#3a4048');for(let i=4;i<46;i+=8)P(g,x+i,y+4,1,6,'#2c3138');P(g,x+2,y+10,2,3,'#222');P(g,x+44,y+10,2,3,'#222');});
F('rug',1,1,0,0,(g,x,y,w,h)=>{const W=w*16,H=h*16;P(g,x+2,y+2,W-4,H-4,'#3c2a26');P(g,x+4,y+4,W-8,H-8,'#4a332c');P(g,x+4,y+4,W-8,1,'#6a4a3a');P(g,x+4,y+H-5,W-8,1,'#6a4a3a');});
F('scratch',1,1,0,0,(g,x,y)=>{for(let i=0;i<5;i++)P(g,x+3+i*2,y+3,1,6,'#5f5848');P(g,x+2,y+6,11,1,'#5f5848');});
F('papers',1,1,0,0,(g,x,y)=>{for(let i=0;i<4;i++)P(g,x+Math.random()*11|0,y+Math.random()*11|0,4,3,pick(['#cfcab8','#bdb7a4','#d8d4c4']));});
F('bins',1,1,1,0,(g,x,y)=>{P(g,x+2,y+13,12,2,SH);P(g,x+2,y+2,12,11,'#2f4a32');P(g,x+1,y+1,14,3,'#3b5a3e');P(g,x+5,y+6,6,1,'#22382a');});
F('pline',1,2,0,0,(g,x,y)=>{P(g,x,y,1,32,'rgba(190,190,170,.28)');});
F('puddle',2,1,0,0,(g,x,y)=>{P(g,x+3,y+4,22,7,'#1b2733');P(g,x+6,y+3,14,1,'#1b2733');P(g,x+6,y+11,15,1,'#1b2733');P(g,x+7,y+5,8,1,'#2f4558');});
F('car',3,2,1,0,(g,x,y,w,h,s)=>{const c=['#3a3f48','#4a2a2a','#2e3a2e','#55524a'][s%4];P(g,x+4,y+28,42,3,SH);P(g,x+2,y+4,44,24,c);P(g,x+2,y+4,44,1,shade(c,20));P(g,x+12,y+7,22,18,shade(c,-14));P(g,x+34,y+7,5,18,'#16202a');P(g,x+8,y+7,4,18,'#16202a');P(g,x+35,y+8,1,6,'#2f4558');P(g,x+8,y+2,8,3,'#111');P(g,x+32,y+2,8,3,'#111');P(g,x+8,y+27,8,3,'#111');P(g,x+32,y+27,8,3,'#111');P(g,x+45,y+6,1,4,'#bba');P(g,x+45,y+22,1,4,'#bba');});
F('van',4,2,1,0,(g,x,y)=>{P(g,x+4,y+29,58,3,SH);P(g,x+2,y+3,60,26,'#1c232c');P(g,x+2,y+3,60,1,'#2e3844');P(g,x+6,y+6,42,20,'#252e39');P(g,x+52,y+6,6,20,'#141c24');P(g,x+53,y+7,1,7,'#2f4558');P(g,x+2,y+15,60,2,'#3a4a5a');P(g,x+2,y+15,60,1,'#c9b458');P(g,x+8,y+1,9,3,'#0e0e0e');P(g,x+44,y+1,9,3,'#0e0e0e');P(g,x+8,y+28,9,3,'#0e0e0e');P(g,x+44,y+28,9,3,'#0e0e0e');P(g,x+20,y+9,14,4,'#1a2028');P(g,x+20,y+19,14,4,'#1a2028');});
F('police',3,2,1,0,(g,x,y)=>{P(g,x+4,y+28,42,3,SH);P(g,x+2,y+4,44,24,'#d2d5d6');P(g,x+12,y+7,22,18,'#b9bcbe');P(g,x+2,y+14,44,4,'#2b4fa0');P(g,x+34,y+7,5,18,'#16202a');P(g,x+8,y+7,4,18,'#16202a');P(g,x+21,y+10,4,12,'#333');P(g,x+8,y+2,8,3,'#111');P(g,x+32,y+2,8,3,'#111');P(g,x+8,y+27,8,3,'#111');P(g,x+32,y+27,8,3,'#111');});
F('tree',1,1,1,0,(g,x,y,w,h,s)=>{const TP=LD().autumn?[['#4a2410','#7a3c14','#a85a1c','#c8782a'],['#5a4010','#86621a','#b08a28','#d0aa40'],['#3a1810','#6a2616','#963a1c','#b85428'],['#2a3014','#4a4a18','#7a6a20','#9a8a30']][(s>>>0)%4]:['#14200f','#14200f','#1b2b14','#22361a'];
 P(g,x-1,y+11,18,5,'rgba(0,0,0,.45)');P(g,x+7,y+9,3,6,'#2a1d14');P(g,x-2,y-8,20,16,TP[0]);P(g,x,y-10,16,4,TP[0]);P(g,x+1,y-8,12,10,TP[1]);P(g,x+3,y-9,7,5,TP[2]);P(g,x+11,y-4,4,4,TP[1]);if(LD().autumn){P(g,x+5,y-8,3,2,TP[3]);P(g,x+12,y-3,2,2,TP[3]);P(g,x,y-2,3,2,TP[2]);P(g,x+8,y-1,2,4,'#2a1d14');P(g,x+4,y+1,4,1,'#2a1d14');}});
F('bush',1,1,1,0,(g,x,y)=>{const h=!!LD().autumn;P(g,x+1,y+11,15,4,'rgba(0,0,0,.4)');P(g,x+1,y+2,14,10,h?'#3a3414':'#16230f');P(g,x+3,y+1,9,4,h?'#5a4418':'#1e2f15');P(g,x+4,y+3,3,2,h?'#8a5a20':'#28401b');if(h){P(g,x+10,y+4,2,2,'#9a4a1c');P(g,x+6,y+7,2,1,'#7a3a16');}});
F('lamp',1,1,1,0,(g,x,y)=>{P(g,x+6,y+12,5,3,SH);P(g,x+7,y-14,2,27,'#2e3236');P(g,x+4,y-16,8,3,'#45494e');P(g,x+5,y-14,6,1,'#e8c070');});
const FR=[],FRH=64,FH={bed:5,bedH:5,bench:4,benchL:4,table:6,tableL:6,tableS:6,desk:6,deskPC:6,reception:8,counter:8,sofa:5,gurney:5,gurneyV:5,cart:6,crate:7,bins:6,car:8,police:0,van:11,ambul:11,bearcat:11,sink:6,stove:7,washer:8,tub:4,toilet:4,crib:5,incub:6,slab:5,ect:5,barr:4,monitors:6,ekg:3,tv:3,wheel:3,plant:3};
function furn3D(f){const ft=FT[f.k],h=FH[f.k]||0,W=f.w*TS+32,H=f.h*TS+48,ox=16,oy=32;
 const tc=document.createElement('canvas');tc.width=W;tc.height=H;const tg=tc.getContext('2d');ft.d(tg,ox,oy,f.w,f.h,f.seed);
 const src=tg.getImageData(0,0,W,H),S=src.data,oc=document.createElement('canvas');oc.width=W;oc.height=H;const og=oc.getContext('2d'),out=og.createImageData(W,H),O=out.data;
 const solid=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&S[(y*W+x)*4+3]>=200;
 const sh=new Uint8ClampedArray(S.length);
 for(let i=0;i<S.length;i+=4)if(S[i+3]>0&&S[i+3]<200){sh[i]=S[i];sh[i+1]=S[i+1];sh[i+2]=S[i+2];sh[i+3]=S[i+3];}
 const set=(x,y,r,g2,b)=>{if(x<0||y<0||x>=W||y>=H)return;const i=(y*W+x)*4;O[i]=r;O[i+1]=g2;O[i+2]=b;O[i+3]=255;};
 if(h){for(let x=0;x<W;x++)for(let y=0;y<H;y++){if(!solid(x,y)||solid(x,y+1))continue;const i=(y*W+x)*4;
   for(let k=0;k<h;k++){const yy=y-h+1+k,f2=k===h-1?.32:.58-.18*k/h,side=(x>0&&!solid(x-1,y))?.85:(x<W-1&&!solid(x+1,y))?1.08:1;set(x,yy,S[i]*f2*side,S[i+1]*f2*side,S[i+2]*f2*side);}}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(solid(x,y)){const i=(y*W+x)*4,up=!solid(x,y-1)?1.12:1;set(x,y-h,Math.min(255,S[i]*up+2),Math.min(255,S[i+1]*up+2),Math.min(255,S[i+2]*up+2));}}
 else for(let i=0;i<S.length;i+=4)if(S[i+3]>=200){O[i]=S[i];O[i+1]=S[i+1];O[i+2]=S[i+2];O[i+3]=255;}
 og.putImageData(out,0,0);
 // shadows stay on the floor
 const scv=document.createElement('canvas');scv.width=W;scv.height=H;scv.getContext('2d').putImageData(new ImageData(sh,W,H),0,0);
 const bx=f.x*TS-ox,by=f.y*TS-oy;wc.drawImage(scv,bx,by);
 if(h)P(wc,f.x*TS+1,(f.y+f.h)*TS-2,f.w*TS-2,2,'rgba(0,0,0,.3)');
 const row=f.y+f.h-1;let c=FR[row];if(!c){c=document.createElement('canvas');c.width=MW*TS;c.height=FRH;FR[row]=c;}
 c.getContext('2d').drawImage(oc,bx,by-(row*TS+TS-FRH));}
function bakeWorld(){const r=rng(1337);wc.clearRect(0,0,world.width,world.height);
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t!==T.WALL&&t!==T.WIN)drawFloor(wc,x,y,LV.fs[I(x,y)],r);}
 for(const f of LV.furn){const ft=FT[f.k];if(!ft.s)ft.d(wc,f.x*TS,f.y*TS,f.w,f.h,f.seed);}
 {const rr=rng(4242);for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const i=I(x,y);if(LV.t[i]!==T.FLOOR||LV.fsolid[i])continue;if(rr()<.08){const k=DECALS[(rr()*DECALS.length)|0];FT[k].d(wc,x*TS,y*TS,1,1,0);}
  if(LV.fs[i]!=='pad'&&rr()<.04){const ox=(rr()*10)|0,oy=(rr()*10)|0;P(wc,x*TS+ox,y*TS+oy,4,1,'rgba(30,25,20,.35)');P(wc,x*TS+ox+1,y*TS+oy+3,3,1,'rgba(30,25,20,.3)');}}}
 // ambient occlusion along walls
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const t=tAt(x,y);if(t===T.WALL||t===T.WIN||t===T.GRASS)continue;
  if(tAt(x,y-1)===T.WALL||tAt(x,y-1)===T.WIN)P(wc,x*TS,y*TS,16,3,'rgba(0,0,0,.28)');
  if(tAt(x-1,y)===T.WALL)P(wc,x*TS,y*TS,2,16,'rgba(0,0,0,.2)');if(tAt(x+1,y)===T.WALL)P(wc,x*TS+14,y*TS,2,16,'rgba(0,0,0,.2)');}
 const solids=LV.furn.filter(f=>FT[f.k].s).sort((a,b)=>(a.y+a.h)-(b.y+b.h));
 bakeWalls();for(const r of FR)if(r)r.getContext('2d').clearRect(0,0,r.width,r.height);
 for(const f of solids)furn3D(f);
 if(LD().autumn)autumnDecor();else if(isPat())buildOUTM();if(LD().decor)LD().decor();
 // parking text-like marks & entrance sign
 if(G.lvl==='hosp')P(wc,29*TS,41*TS+4,48,2,'rgba(200,200,180,.25)');
}

// ---- extra furniture / decals ----
F('jacket',1,1,0,0,(g,x,y)=>{P(g,x+3,y+4,9,8,'#cfc9b4');P(g,x+1,y+6,14,2,'#bdb6a0');P(g,x+4,y+7,7,1,'#6a5a3a');P(g,x+4,y+9,7,1,'#6a5a3a');});
F('iv',1,1,0,0,(g,x,y)=>{P(g,x+6,y+12,5,2,SH);P(g,x+8,y-8,1,21,'#9aa0a6');P(g,x+5,y-9,7,1,'#9aa0a6');P(g,x+5,y-8,3,5,'rgba(200,220,230,.6)');P(g,x+6,y+12,5,1,'#444');});
F('linen',1,1,0,0,(g,x,y)=>{P(g,x+2,y+5,11,7,'#bfc3bf');P(g,x+4,y+4,7,3,'#d4d7d2');P(g,x+3,y+8,8,1,'#9ea29e');});
F('glass',1,1,0,0,(g,x,y)=>{for(let i=0;i<9;i++)P(g,x+2+(i*5)%12,y+3+(i*7)%10,1,1,i%3?'#7c95a5':'#c8e0ee');});
F('pills',1,1,0,0,(g,x,y)=>{for(let i=0;i<7;i++)P(g,x+3+(i*5)%10,y+4+(i*3)%8,1,1,['#e8e8e0','#d84','#8bd'][i%3]);P(g,x+8,y+9,3,4,'#e0e0d8');});
F('trash',1,1,0,0,(g,x,y)=>{P(g,x+3,y+6,4,3,'#5a5040');P(g,x+8,y+9,3,2,'#c9c4b4');P(g,x+10,y+4,2,2,'#7a3a2a');P(g,x+5,y+11,5,1,'#3a3a30');});
F('stain',1,1,0,0,(g,x,y)=>{P(g,x+3,y+4,9,7,'rgba(50,30,20,.35)');P(g,x+5,y+3,5,10,'rgba(50,30,20,.25)');});
F('pipes',1,1,0,0,(g,x,y)=>{P(g,x,y+3,16,2,'#5a5e60');P(g,x,y+9,16,2,'#4a4e50');P(g,x+5,y+2,2,10,'#6a5040');});
F('stairs',1,1,0,0,(g,x,y,w,h)=>{for(let i=0;i<h*16;i+=3){P(g,x,y+i,w*16,2,'#3a3b3c');P(g,x,y+i+2,w*16,1,'#222');}P(g,x,y,2,h*16,'#6a6e70');P(g,x+w*16-2,y,2,h*16,'#6a6e70');});
F('tape',1,1,0,0,(g,x,y,w)=>{for(let i=0;i<w*16;i+=6){P(g,x+i,y+8,3,2,'#e0c020');P(g,x+i+3,y+8,3,2,'#1a1a1a');}});
F('barr',2,1,1,0,(g,x,y)=>{P(g,x+1,y+12,30,3,SH);P(g,x+1,y+3,14,9,'#5e4a38');P(g,x+1,y+3,14,1,'#705a46');P(g,x+13,y,9,12,'#4b4f55');P(g,x+20,y+5,11,7,'#3a3e43');P(g,x+4,y+1,2,4,'#2e241c');P(g,x+24,y+2,1,4,'#222');P(g,x+8,y+6,6,2,'#cfcab8');});
F('washer',1,1,1,0,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+1,y-2,14,16,'#c5c9c7');P(g,x+1,y-2,14,3,'#a8acaa');P(g,x+4,y+3,8,8,'#555b5e');P(g,x+5,y+4,6,6,'#2a3a44');P(g,x+6,y+5,2,2,'#4f6a7a');P(g,x+3,y-1,2,1,'#3a3');});
F('boiler',3,2,1,1,(g,x,y)=>{P(g,x,y+30,48,3,SH);P(g,x+2,y-10,44,40,'#4a3a30');P(g,x+2,y-10,44,3,'#5f4c3e');for(let i=0;i<5;i++)P(g,x+4+i*9,y-6,4,34,'#3a2e26');P(g,x+18,y+6,12,10,'#2a2220');P(g,x+21,y+9,6,4,'#ff7a30');P(g,x+30,y-4,8,4,'#bfae80');P(g,x+33,y-3,2,2,'#222');});
F('tank',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+2,y-10,12,24,'#5a6066');P(g,x+2,y-10,12,2,'#70767c');P(g,x+4,y-8,2,20,'#6a7076');P(g,x+7,y,2,2,'#c9b458');});
F('slab',1,2,1,0,(g,x,y)=>{P(g,x+1,y+29,14,3,SH);P(g,x+1,y+2,14,27,'#8f979c');P(g,x+2,y+3,12,25,'#cfd2cd');P(g,x+4,y+5,8,6,'#bfc2bd');P(g,x+3,y+12,10,14,'#c6c9c4');P(g,x+5,y+26,2,2,'#a8aba6');P(g,x+9,y+26,2,2,'#a8aba6');P(g,x+2,y+29,2,2,'#333');P(g,x+12,y+29,2,2,'#333');});
F('morgue',1,1,1,1,(g,x,y)=>{P(g,x,y-10,16,26,'#7a8287');P(g,x,y-10,16,2,'#8f979c');P(g,x+2,y-6,12,8,'#6a7277');P(g,x+2,y+4,12,8,'#6a7277');P(g,x+6,y-3,4,1,'#c8ccd0');P(g,x+6,y+7,4,1,'#c8ccd0');});
F('crate',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,15,3,SH);P(g,x+1,y+1,14,13,'#6a5038');P(g,x+1,y+1,14,1,'#7e6248');P(g,x+1,y+6,14,1,'#4e3a28');P(g,x+2,y+2,1,11,'#4e3a28');P(g,x+13,y+2,1,11,'#4e3a28');});
F('ambul',4,2,1,0,(g,x,y)=>{P(g,x+4,y+29,58,3,SH);P(g,x+2,y+3,60,26,'#e2e4e5');P(g,x+4,y+5,40,22,'#d4d6d7');P(g,x+2,y+3,60,2,'#d8602a');P(g,x+2,y+27,60,2,'#d8602a');P(g,x+44,y+3,18,26,'#e8eaeb');P(g,x+52,y+6,6,20,'#16202a');P(g,x+18,y+10,12,12,'#2a5ab0');P(g,x+23,y+11,2,10,'#e8eaeb');P(g,x+19,y+15,10,2,'#e8eaeb');P(g,x+4,y+5,2,4,'#c02a24');P(g,x+4,y+23,2,4,'#c02a24');P(g,x+40,y+6,2,20,'#c02a24');P(g,x+8,y+1,9,3,'#0e0e0e');P(g,x+44,y+1,9,3,'#0e0e0e');P(g,x+8,y+28,9,3,'#0e0e0e');P(g,x+44,y+28,9,3,'#0e0e0e');});
F('bearcat',4,2,1,0,(g,x,y)=>{P(g,x+4,y+29,58,3,SH);P(g,x+1,y+2,62,27,'#15191c');P(g,x+3,y+4,58,23,'#22282c');P(g,x+8,y+6,38,19,'#2c3338');P(g,x+20,y+11,10,9,'#1a1f22');P(g,x+21,y+12,8,1,'#3a4248');P(g,x+50,y+5,7,21,'#0e1418');P(g,x+51,y+6,1,8,'#2f4558');P(g,x+1,y+14,62,3,'#2a3a5a');P(g,x+1,y+15,62,1,'#d8d8d0');P(g,x+59,y+3,4,25,'#0c0e10');for(const wx of [8,22,42])P(g,x+wx,y,10,3,'#0a0a0a'),P(g,x+wx,y+28,10,3,'#0a0a0a');P(g,x+12,y+8,4,4,'#3a4046');P(g,x+36,y+8,4,4,'#3a4046');});
F('vent',1,1,1,1,(g,x,y)=>{P(g,x,y+14,16,2,SH);P(g,x+2,y-8,12,22,'#c9cdd0');P(g,x+2,y-8,12,2,'#e0e3e5');P(g,x+3,y-6,10,6,'#0d1a14');P(g,x+4,y+2,8,8,'#9aa3a8');P(g,x+5,y+3,6,6,'#7a8a96');P(g,x+3,y+11,2,2,'#333');P(g,x+11,y+11,2,2,'#333');});
F('ekg',1,1,1,0,(g,x,y)=>{P(g,x+6,y+13,5,2,SH);P(g,x+7,y+2,2,12,'#8a9096');P(g,x+2,y-6,12,9,'#2a2e33');P(g,x+3,y-5,10,7,'#06120a');P(g,x+5,y+13,6,1,'#444');});
F('crib',1,1,1,0,(g,x,y)=>{P(g,x+2,y+13,13,2,SH);P(g,x+2,y+2,12,11,'#d8dcdf');P(g,x+3,y+3,10,9,'#eef0f2');P(g,x+5,y+5,6,6,'#e8c8d8');P(g,x+6,y+4,4,3,'#d8b098');P(g,x+2,y+2,12,1,'#b8bcc0');for(let i=3;i<14;i+=3)P(g,x+i,y+12,1,1,'#9aa');});
F('incub',1,1,1,0,(g,x,y)=>{P(g,x+1,y+13,15,2,SH);P(g,x+2,y+6,12,7,'#8a9096');P(g,x+2,y-2,12,8,'rgba(170,210,230,.55)');P(g,x+2,y-2,12,1,'#d8e8f0');P(g,x+5,y+1,6,4,'#e8d0d8');P(g,x+6,y+1,3,2,'#d8b098');P(g,x+12,y+8,1,1,'#3f3');});
F('curtain',1,1,0,0,(g,x,y,w,h)=>{for(let i=0;i<h*16;i+=2)P(g,x+7,y+i,2,1,i%4?'#6f8fa0':'#5a7888');});
const DECALS=['papers','trash','glass','stain','pills'];
