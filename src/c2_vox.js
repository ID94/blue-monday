
// ================= VOXEL CHARACTERS (pseudo-3D models) =================
const VOX={cache:new Map(),palId:new WeakMap(),palN:0,YS:.72,W:36,H:46,AX:18,AY:38,DIRS:16};
function voxPalKey(p){let k=VOX.palId.get(p);if(k==null){k=JSON.stringify(p);VOX.palId.set(p,k);}return k;}
function hexRGB(c){if(c[0]!=='#')return[128,128,128];if(c.length===4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1),16);return[n>>16&255,n>>8&255,n&255];}
function voxModel(o){const M=new Map();const B=(x0,x1,y0,y1,z0,z1,col)=>{if(!col)return;for(let x=Math.round(x0);x<=Math.round(x1);x++)for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)M.set(x+','+y+','+z,col);};
 const p=o.pal,sq=o.team==='squad',en=o.team==='enemy',low=o.pose==='kneel'||o.pose==='hands',zo=low?-4:0;
 const legs=p.legs,boot='#121416',body=p.body,skin=p.skin||p.face||'#b08868',glove=p.glove||skin;
 // ---- legs ----
 if(low){B(-4,-1,0,1,0,1,legs);B(-4,-4,0,1,0,1,boot);B(-1,-1,0,1,2,3,legs);B(1,2,-2,-1,0,0,boot);B(1,2,-2,-1,1,3,legs);B(0,0,-2,-1,3,4,legs);if(sq)B(2,2,-2,-1,2,3,'#3f4650');}
 else{const s=o.s||0;B(-1+s,0+s,-2,-1,0,6,legs);B(-1-s,0-s,0,1,0,6,legs);B(-1+s,1+s,-2,-1,0,1,boot);B(-1-s,1-s,0,1,0,1,boot);
  if(sq){B(1+s,1+s,-2,-1,3,3,'#3f4650');B(1-s,1-s,0,1,3,3,'#3f4650');B(-1,-1,2,2,4,6,'#121416');}
  if(o.kind==='doctor'||o.kind==='cook'){B(-1,1,-3,2,3,6,body);}}
 // ---- torso ----
 const z=k=>k+zo;
 B(-1,1,-3,2,z(6),z(6),sq?'#16191d':shadeC(legs,-12));
 B(-1,1,-3,2,z(7),z(12),body);
 B(-1,1,-3,2,z(12),z(12),shadeC(body,14));
 if(p.vest&&!sq){B(2,2,-2,1,z(8),z(11),p.vest);B(-2,-2,-2,1,z(8),z(11),p.vest);}
 if(sq){B(-2,2,-3,2,z(7),z(11),p.vest);B(2,2,-3,2,z(11),z(11),'#2c3239');
  B(3,3,-2,-1,z(8),z(9),'#262b31');B(3,3,0,1,z(8),z(9),'#30363d');B(3,3,-2,1,z(10),z(10),'#3a414a');
  B(-2,-2,-3,2,z(9),z(10),'#d6d9d2');B(-2,-2,-2,-2,z(9),z(9),'#3a4048');B(-2,-2,0,0,z(10),z(10),'#3a4048');B(-2,-2,2,2,z(9),z(9),'#3a4048');
  B(-3,-3,-2,1,z(7),z(8),'#1a1e23');
  if(o.spec==='medic'){B(-2,-2,-1,1,z(9),z(11),'#e8e8e4');B(-2,-2,0,0,z(9),z(11),'#c22');B(-2,-2,-1,1,z(10),z(10),'#c22');B(3,3,-1,0,z(10),z(10),'#c22');}
  if(o.spec==='lead'||o.spec==='tech')B(-3,-3,-2,-2,z(11),z(16),'#0c0d0f');
  if(o.spec==='breach'){B(-3,-3,1,2,z(6),z(12),'#5a4a30');B(-3,-3,1,2,z(12),z(12),'#3a3020');}
  if(o.spec==='scout')B(-3,-3,-2,1,z(9),z(11),'#20262c');}
 if(o.kind==='director'&&p.vest){B(2,2,-1,0,z(8),z(11),p.vest);B(2,2,-1,-1,z(9),z(10),'#7a1c1c');}
 // ---- head ----
 B(0,0,-1,0,z(13),z(13),sq?'#15181c':skin);
 B(-1,1,-2,1,z(14),z(17),p.head);
 if(sq){B(-2,1,-3,2,z(16),z(17),p.head);B(-1,1,-2,1,z(18),z(18),shadeC(p.head,10));B(2,2,-2,1,z(15),z(15),'#0c0f12');B(2,2,-2,-2,z(15),z(15),'#6a8fa5');B(2,2,-2,1,z(14),z(14),'#1e2226');B(2,2,-1,0,z(17),z(17),'#121417');
  if(o.spec==='lead'||o.spec==='tech'||o.spec==='scout')B(2,2,-1,0,z(18),z(18),'#0c0d0f');}
 else{
  if(p.eyes){B(2,2,-1,-1,z(15),z(15),p.visor);B(2,2,1,1,z(15),z(15),p.visor);B(2,2,0,0,z(14),z(14),shadeC(skin,-18));}
  else B(2,2,-2,1,z(15),z(15),p.visor);
  if(p.hair){B(-1,1,-2,1,z(17),z(18),p.hair);B(-2,-2,-2,1,z(14),z(17),p.hair);if(o.kind==='nurse'||o.kind==='mother')B(-3,-3,-1,0,z(14),z(15),p.hair);}
  if(p.cap){B(-1,1,-2,1,z(17),z(18),p.cap);B(2,3,-2,1,z(17),z(17),p.cap);}
  if(en&&!p.cap){B(-1,1,-2,1,z(18),z(18),p.head);}}
 // ---- arms / weapon ----
 const sl=sq?shadeC(body,-6):body;
 if(o.hands){B(0,0,-4,-4,z(11),z(18),sl);B(0,0,3,3,z(11),z(18),sl);B(0,0,-4,-4,z(19),z(19),glove);B(0,0,3,3,z(19),z(19),glove);}
 else if(o.wl){const L=o.wl;
  B(-1,0,3,3,z(10),z(12),sl);B(1,2,2,2,z(10),z(10),sl);B(3,3,1,1,z(10),z(10),glove);
  B(-1,0,-4,-4,z(10),z(12),sl);B(1,2,-3,-3,z(10),z(10),sl);B(3,Math.round(L*.55),-2,-2,z(10),z(10),sl);B(Math.round(L*.55)+1,Math.round(L*.55)+1,-1,0,z(10),z(10),glove);
  B(-1,L,0,0,z(11),z(11),'#0b0b0d');
  if(o.wt){B(-2,-1,0,0,z(10),z(11),'#1d1d21');B(2,3,0,0,z(9),z(10),'#1d1d21');B(1,L-2,0,0,z(12),z(12),'#1a1a1e');}
  if(sq&&o.wt)B(Math.round(L*.6),Math.round(L*.6),1,1,z(11),z(11),'#2a2e33');
  if(o.shield){B(5,5,-4,4,z(4),z(16),'#16191d');B(5,5,-4,4,z(16),z(16),'#3a4048');B(5,5,-2,2,z(14),z(14),'#3a5468');B(5,5,-3,3,z(8),z(8),'#d6d9d2');B(4,4,-4,4,z(15),z(15),'#24282d');}}
 else{B(0,0,-4,-4,z(7),z(12),sl);B(0,0,3,3,z(7),z(12),sl);B(0,0,-4,-4,z(6),z(6),o.cuffed?skin:glove);B(0,0,3,3,z(6),z(6),o.cuffed?skin:glove);
  if(o.cuffed){B(-2,-2,-1,0,z(7),z(7),'#bbb');}}
 if(sq&&o.acc){M.set('0,-4,'+z(12),o.acc);M.set('0,3,'+z(12),o.acc);}
 if(en&&p.acc)M.set('0,-4,'+z(11),p.acc);
 return M;}
function shadeC(c,n){const r=hexRGB(c);return'#'+r.map(v=>clamp(Math.round(v+n),0,255).toString(16).padStart(2,'0')).join('');}
function voxRender(M,ang){const cv=document.createElement('canvas');cv.width=VOX.W;cv.height=VOX.H;const g=cv.getContext('2d');
 const ca=Math.cos(ang),sa=Math.sin(ang),YS=VOX.YS,pts=[];
 const lx=-.62,ly=.48,has=(x,y,z)=>M.has(x+','+y+','+z);
 const nrm=[[1,0,ca,sa],[-1,0,-ca,-sa],[0,1,-sa,ca],[0,-1,sa,-ca]];
 for(const[k,col]of M){const[x,y,z]=k.split(',').map(Number);let best=-2,lam=.5;
  for(const[dx,dy,nx,ny]of nrm){if(has(x+dx,y+dy,z))continue;if(ny>best){best=ny;lam=Math.max(0,nx*lx+ny*ly);}}
  const top=!has(x,y,z+1),rgb=hexRGB(col),f=best<-1?.85:.76+.5*lam;
  const fc=rgb.map(v=>clamp(Math.round(v*f+4),0,255)),tc=rgb.map(v=>clamp(Math.round(v*1.2+14),0,255));
  for(const ox of[.25,.75])for(const oy of[.25,.75]){const mx=x+ox-.5,my=y+oy-.5,wx=mx*ca-my*sa,wy=mx*sa+my*ca;pts.push([wy,z,VOX.AX+wx,VOX.AY+wy*YS-z,fc,top?tc:null]);}}
 pts.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
 const id=g.createImageData(VOX.W,VOX.H),D=id.data,put=(px,py,c)=>{px|=0;py|=0;if(px<0||py<0||px>=VOX.W||py>=VOX.H)return;const i=(py*VOX.W+px)*4;D[i]=c[0];D[i+1]=c[1];D[i+2]=c[2];D[i+3]=255;};
 for(const p of pts){put(Math.floor(p[2]),Math.floor(p[3]),p[4]);if(p[5])put(Math.floor(p[2]),Math.floor(p[3]-1),p[5]);}
 // outline
 const A=new Uint8Array(VOX.W*VOX.H);for(let i=0;i<A.length;i++)A[i]=D[i*4+3];
 for(let y=0;y<VOX.H;y++)for(let x=0;x<VOX.W;x++){const i=y*VOX.W+x;if(A[i])continue;if((x>0&&A[i-1])||(x<VOX.W-1&&A[i+1])||(y>0&&A[i-VOX.W])||(y<VOX.H-1&&A[i+VOX.W])){D[i*4]=7;D[i*4+1]=8;D[i*4+2]=10;D[i*4+3]=150;}}
 g.putImageData(id,0,0);return cv;}
function voxSprite(o,ang){const di=((Math.round(ang/(2*Math.PI)*VOX.DIRS)%VOX.DIRS)+VOX.DIRS)%VOX.DIRS;
 const key=[voxPalKey(o.pal),o.team,o.kind||'',o.spec||'',o.acc||'',o.pose,o.wl||0,o.wt||0,o.shield?1:0,o.hands?1:0,o.cuffed?1:0,o.s||0,di].join('|');
 let c=VOX.cache.get(key);if(!c){c=voxRender(voxModel(o),di/VOX.DIRS*2*Math.PI);VOX.cache.set(key,c);}return c;}
function drawVox(g,u,sx,sy){const a=u.ang;
 let s=0;if(u.moving&&u.pose!=='kneel'&&u.pose!=='hands'){const ph=((u.walkP%(2*Math.PI))+2*Math.PI)%(2*Math.PI),f=Math.floor(ph/(Math.PI/4));s=Math.round(2*Math.sin((f+.5)*Math.PI/4));}
 const armed=u.W&&u.pose!=='hands'&&u.state!=='surr'&&u.pose!=='sit';
 const o={pal:u.pal,team:u.team,kind:u.kind,spec:u.spec,acc:u.team==='squad'?u.acc:null,pose:u.pose==='kneel'||u.pose==='hands'?u.pose:'stand',wl:armed?Math.max(5,u.W.len-1):0,wt:armed&&u.W.thick?1:0,shield:!!u.shield&&armed,hands:u.pose==='hands',cuffed:u.state==='cuffed',s};
 const spr=voxSprite(o,a),bob=u.moving&&Math.abs(s)<2?1:0;
 P(g,sx-5,sy-1,11,3,'rgba(0,0,0,.42)');P(g,sx-3,sy-2,7,1,'rgba(0,0,0,.25)');
 const rk=u.recoil?Math.round(u.recoil):0;
 g.drawImage(spr,sx-VOX.AX-Math.round(Math.cos(a)*rk),sy-VOX.AY-bob-Math.round(Math.sin(a)*rk*.7));
 if(armed){const L=o.wl+1,z=11+(o.pose==='kneel'?-4:0),wx=L*Math.cos(a),wy=L*Math.sin(a);u.mzx=sx+wx+G.cam.rx;u.mzy=sy+wy*VOX.YS-z-bob+G.cam.ry;}else u.mzx=null;}
