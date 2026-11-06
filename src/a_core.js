'use strict';
// ================= CORE =================
const TS=16,VW=384,VH=216;
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const $=id=>document.getElementById(id);
const rand=(a,b)=>a+Math.random()*(b-a), randi=(a,b)=>Math.floor(a+Math.random()*(b-a+1));
const clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t;
const dist=(a,b,c,d)=>Math.hypot(c-a,d-b);
const pick=a=>a[Math.floor(Math.random()*a.length)];
function angDiff(a,b){let d=(b-a)%(Math.PI*2);if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;return d;}
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function P(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h);}
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,gg=(n>>8&255)+amt,b=(n&255)+amt;r=clamp(r,0,255);gg=clamp(gg,0,255);b=clamp(b,0,255);return'#'+((1<<24)|(r<<16)|(gg<<8)|b).toString(16).slice(1);}
function line(g,x0,y0,x1,y1,c){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);g.fillStyle=c;
 const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy,n=0;
 while(n++<200){g.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx;}if(e2<=dx){e+=dx;y0+=sy;}}}
const G={running:false,paused:false,ended:false,time:0,players:1,p1Spec:0,p2Spec:1,entry:0,units:[],police:[],squad:[],enemies:[],civs:[],hostage:null,
 cam:{x:0,y:0},mouse:{sx:0,sy:0,wx:0,wy:0,down:false,clicked:false},keys:{},fx:[],tracers:[],lights:[],nades:[],ops:[],order:'follow',map:false};

// ================= AUDIO =================
const A={ctx:null,vol:.8,voice:'static',lx:0,ly:0};
function audioInit(){
 if(A.ctx){if(A.ctx.state!=='running')A.ctx.resume();return;}
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
 const c=new AC();A.ctx=c;
 A.master=c.createGain();A.master.gain.value=A.vol;
 A.duck=c.createBiquadFilter();A.duck.type='lowpass';A.duck.frequency.value=20000;
 const comp=c.createDynamicsCompressor();comp.threshold.value=-16;comp.knee.value=10;comp.ratio.value=5;comp.attack.value=.003;comp.release.value=.25;
 A.master.connect(A.duck);A.duck.connect(comp);comp.connect(c.destination);
 const mk=k=>{const n=1024,cu=new Float32Array(n);for(let i=0;i<n;i++){const x=i/n*2-1;cu[i]=Math.tanh(k*x)/Math.tanh(k);}return cu;};A.dist=mk(4);A.dist2=mk(7);
 A.revIn=c.createGain();A.revIn.gain.value=.9;
 A.rev=c.createConvolver();A.rev.buffer=makeImpulse(3.4,2.6);
 A.revSIn=c.createGain();const rS=c.createConvolver();rS.buffer=makeImpulse(.75,3.2);const lS=c.createBiquadFilter();lS.type='lowpass';lS.frequency.value=6000;A.revSIn.connect(rS);rS.connect(lS);lS.connect(A.master);
 A.revMIn=c.createGain();const rM=c.createConvolver();rM.buffer=makeImpulse(1.9,2.8);const lM=c.createBiquadFilter();lM.type='lowpass';lM.frequency.value=4800;A.revMIn.connect(rM);rM.connect(lM);lM.connect(A.master);
 const rlp=c.createBiquadFilter();rlp.type='lowpass';rlp.frequency.value=4200;
 A.revIn.connect(A.rev);A.rev.connect(rlp);rlp.connect(A.master);
 const sr=c.sampleRate,n=c.createBuffer(1,sr*3,sr),d=n.getChannelData(0);
 for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;A.noise=n;
 const b=c.createBuffer(1,sr*4,sr),bd=b.getChannelData(0);let last=0;
 for(let i=0;i<bd.length;i++){last=(last+.02*(Math.random()*2-1))/1.02;bd[i]=last*3.5;}A.brown=b;
 startAmbient();loadScanner();loadSamples();
}
function playSmp(o,k,t0,rate,gain,lp){const b=A.smp&&A.smp[k];if(!b||!o)return false;const c=A.ctx,sr=c.createBufferSource();sr.buffer=b;sr.playbackRate.value=rate||1;const g=c.createGain();g.gain.value=gain||1;
 if(lp){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;sr.connect(f);f.connect(g);}else sr.connect(g);g.connect(o);sr.start(t0||c.currentTime);return true;}
function loadSamples(){A.smp={};if(typeof SAMPLES==='undefined')return;for(const k in SAMPLES){try{const bin=atob(SAMPLES[k]),u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);A.ctx.decodeAudioData(u8.buffer,b=>{A.smp[k]=b;},()=>{});}catch(_){}}}
function loadScanner(){if(typeof SCANNER_B64==='undefined')return;try{const bin=atob(SCANNER_B64),u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
 A.ctx.decodeAudioData(u8.buffer,buf=>{const c=A.ctx,s=c.createBufferSource();s.buffer=buf;s.loop=true;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=250;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3800;
  A.scanG=c.createGain();A.scanG.gain.value=0;s.connect(hp);hp.connect(lp);lp.connect(A.scanG);A.scanG.connect(A.master);s.start(0,Math.random()*buf.duration);A.scanOK=true;},()=>{});}catch(_){}}
function makeImpulse(dur,decay){const c=A.ctx,sr=c.sampleRate,len=Math.floor(sr*dur),b=c.createBuffer(2,len,sr);
 for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);
  for(let i=0;i<len;i++){const t=i/len;d[i]=(Math.random()*2-1)*Math.pow(1-t,decay)*(i<sr*.008?i/(sr*.008):1)*.6;}
  for(let k=0;k<10;k++){const p=Math.floor(sr*(.01+Math.random()*.09));if(p<len)d[p]+=(Math.random()<.5?-1:1)*(.7-k*.05);}
 }return b;}
function acoustic(x,y){if(x==null||!G.running||typeof LV==='undefined')return{bus:A.revIn,amt:1,slap:.12,k:'L'};const tx=x/TS|0,ty=y/TS|0;
 if(typeof isOutdoor==='function'&&isOutdoor(x,y))return{bus:A.revMIn,amt:.35,slap:.32,k:'O'};const r=LV.room[I(tx,ty)];if(r<0)return{bus:A.revMIn,amt:.8,slap:.1,k:'M'};
 const n=LV.roomTiles[r].length;if(ROOMS[r].n.startsWith('Korytarz'))return{bus:A.revMIn,amt:1.1,slap:.09,k:'C'};if(n<36)return{bus:A.revSIn,amt:1.2,slap:.04,k:'S'};if(n<110)return{bus:A.revMIn,amt:1,slap:.08,k:'M'};return{bus:A.revIn,amt:1,slap:.14,k:'L'};}
function out(x,y,vol,o={}){if(!A.ctx)return null;
 const c=A.ctx;let v=vol,pan=0,lpF=20000,rev=o.rev==null?.4:o.rev;
 if(x!=null){const dx=x-A.lx,dy=y-A.ly,d=Math.hypot(dx,dy)/TS;
  if(o.max&&d>o.max)return null;
  v=vol/(1+d*.12+d*d*.012);if(v<.004)return null;
  pan=clamp(dx/(TS*12),-.9,.9);
  const los=(G.running&&typeof losClear==='function')?losClear(A.lx,A.ly,x,y):true;
  lpF=los?clamp(16000-d*400,2500,16000):clamp(1500-d*30,320,1500);
  if(!los){v*=.6;rev*=1.4;}
 }
 const g=c.createGain();g.gain.value=v;
 const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=lpF;g.connect(lp);
 let last=lp;if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=pan;lp.connect(p);last=p;}
 last.connect(A.master);
 if(rev>0){const ac=acoustic(x,y),s=c.createGain();s.gain.value=rev*ac.amt;last.connect(s);s.connect(ac.bus);}
 return g;
}
function nz(dest,t0,dur,o={}){const c=A.ctx,s=c.createBufferSource();s.buffer=o.brown?A.brown:A.noise;s.playbackRate.value=o.rate||1;
 const f=c.createBiquadFilter();f.type=o.type||'bandpass';f.frequency.setValueAtTime(o.f||1000,t0);if(o.f2)f.frequency.exponentialRampToValueAtTime(o.f2,t0+dur);f.Q.value=o.q||1;
 const e=c.createGain();e.gain.setValueAtTime(.0001,t0);e.gain.linearRampToValueAtTime(o.g||1,t0+(o.attack||.002));e.gain.exponentialRampToValueAtTime(.0001,t0+dur);
 s.connect(f);f.connect(e);e.connect(dest);s.start(t0,Math.random()*2);s.stop(t0+dur+.05);}
function tone(dest,t0,dur,o={}){const c=A.ctx,os=c.createOscillator();os.type=o.type||'sine';os.frequency.setValueAtTime(o.f||440,t0);if(o.f2)os.frequency.exponentialRampToValueAtTime(o.f2,t0+dur);
 const e=c.createGain();e.gain.setValueAtTime(.0001,t0);e.gain.linearRampToValueAtTime(o.g||.5,t0+(o.attack||.002));e.gain.exponentialRampToValueAtTime(.0001,t0+dur);
 os.connect(e);e.connect(dest);os.start(t0);os.stop(t0+dur+.05);}
function ui(v=.3){const g=A.ctx.createGain();g.gain.value=v;g.connect(A.master);return g;}
const SND={
 gun(t,x,y){if(!A.ctx)return;const C={rifle:[1.25,1900,.18,72,1],smg:[1,2300,.13,90,.9],pistol:[.85,2100,.13,100,.85],shotgun:[1.6,1300,.32,50,1.2],silenced:[.22,800,.07,160,.1],enemy:[1.2,1600,.22,66,1.05],epistol:[.95,1900,.15,92,.95]}[t];
  const o=out(x,y,C[0],{rev:C[4]});if(!o)return;const c=A.ctx,t0=c.currentTime,sil=t==='silenced';
  const SM={pistol:['p9',1,1.1],smg:['p9',1.04,1],epistol:['p9',.97,1.05],rifle:['r308',1.12,1.05],enemy:['r308',1,1.15],shotgun:['sg20',.92,1.3],silenced:['p9',1.35,.3]}[t],buf=SM&&A.smp&&A.smp[SM[0]];
  if(buf){playSmp(o,SM[0],t0,SM[1]*rand(.96,1.04),SM[2]*1.15,sil?1100:0);}
  else{const ws=c.createWaveShaper();ws.curve=A.dist;ws.connect(o);
  nz(ws,t0,C[2],{f:C[1],q:.55,g:1.8,rate:rand(.85,1.15)});
  nz(o,t0,.03,{type:'highpass',f:2600,g:sil?.2:1.1});
  tone(ws,t0,.3,{f:C[3]*2.2,f2:C[3]*.4,g:1.2});}
  if(!sil){tone(o,t0,.42,{f:58,f2:32,g:1.1});nz(o,t0+.015,.95,{type:'lowpass',f:900,f2:110,g:.65,attack:.012});
   const ac=acoustic(x,y),dl=c.createDelay(1);dl.delayTime.value=ac.slap*rand(.9,1.1);const fb=c.createGain();fb.gain.value=.32;const dlp=c.createBiquadFilter();dlp.type='lowpass';dlp.frequency.value=2200;
   o.connect(dl);dl.connect(dlp);dlp.connect(fb);fb.connect(dl);const wet=c.createGain();wet.gain.value=ac.k==='S'?.2:.45;dlp.connect(wet);wet.connect(ac.bus);setTimeout(()=>{try{fb.disconnect();}catch(_){}},1800);}
  if(t==='shotgun')nz(o,t0+.01,.5,{type:'lowpass',f:900,g:.8});
  if(sil)nz(o,t0,.05,{type:'lowpass',f:500,g:.8});
  if(t!=='enemy'&&t!=='epistol')setTimeout(()=>SND.tink(x,y),rand(250,520));else if(Math.random()<.5)setTimeout(()=>SND.tink(x,y),rand(300,600));},
 tink(x,y){const o=out(x,y,.07,{rev:.15,max:14});if(!o)return;const t0=A.ctx.currentTime;tone(o,t0,.06,{f:rand(4200,5600),g:.5});tone(o,t0+.07,.05,{f:rand(3800,5000),g:.3});tone(o,t0+.13,.04,{f:rand(4000,5200),g:.15});},
 step(x,y,surf,vol){const o=out(x,y,vol,{rev:.16,max:22});if(!o)return;const t0=A.ctx.currentTime;
  const S={lino:[1300,.05],tileW:[2600,.045],wood:[900,.06],carpet:[420,.07],pad:[350,.08],conc:[1700,.05],lobby:[2200,.05],grass:[600,.09],asph:[3200,.08]}[surf]||[1200,.05];
  nz(o,t0,S[1],{f:S[0]*rand(.85,1.15),q:1.2,g:.9});tone(o,t0,.05,{f:rand(70,95),f2:45,g:.7});
  if(surf==='asph'||surf==='grass')nz(o,t0+.01,.12,{type:'highpass',f:2500,g:.28});},
 door(x,y,open){const o=out(x,y,.5,{rev:.5});if(!o)return;const t0=A.ctx.currentTime;
  if(open){nz(o,t0,.05,{f:1800,g:.6});tone(o,t0+.03,.38,{type:'sawtooth',f:rand(170,230),f2:rand(300,420),g:.05});}
  else{tone(o,t0,.12,{f:90,f2:50,g:.9});nz(o,t0,.08,{type:'lowpass',f:700,g:.8});nz(o,t0+.01,.03,{f:2500,g:.4});}},
 rattle(x,y){const o=out(x,y,.4,{rev:.3});if(!o)return;const t0=A.ctx.currentTime;for(let i=0;i<3;i++)nz(o,t0+i*.07,.05,{f:2600,q:3,g:.7});},
 pick(x,y){const o=out(x,y,.12,{rev:.05,max:8});if(!o)return;const t0=A.ctx.currentTime;tone(o,t0,.03,{type:'square',f:rand(3000,4500),g:.15});},
 kick(x,y){const o=out(x,y,1.1,{rev:.9});if(!o)return;const t0=A.ctx.currentTime;tone(o,t0,.25,{f:120,f2:40,g:1});nz(o,t0,.3,{type:'lowpass',f:1200,g:1});nz(o,t0+.02,.4,{f:2500,q:.5,g:.4});},
 boom(x,y){const o=out(x,y,1.9,{rev:1.3});if(!o)return;const t0=A.ctx.currentTime;tone(o,t0,.9,{f:90,f2:22,g:1.2});nz(o,t0,1.5,{type:'lowpass',f:1400,f2:150,g:1.3});nz(o,t0,.08,{type:'highpass',f:2000,g:1});},
 bang(x,y){const o=out(x,y,1.8,{rev:1.4});if(!o)return;const t0=A.ctx.currentTime;nz(o,t0,.25,{type:'highpass',f:1500,g:1.4});tone(o,t0,.5,{f:110,f2:30,g:1});nz(o,t0,1.1,{type:'lowpass',f:900,f2:200,g:.8});},
 tinnitus(s){if(!A.ctx)return;const t0=A.ctx.currentTime;tone(ui(1),t0,4*s+.5,{f:3900,g:.1*s,attack:.05});A.duck.frequency.cancelScheduledValues(t0);A.duck.frequency.setValueAtTime(320,t0);A.duck.frequency.exponentialRampToValueAtTime(20000,t0+3.5*s+.6);},
 bounce(x,y){const o=out(x,y,.3,{rev:.4,max:16});if(!o)return;tone(o,A.ctx.currentTime,.06,{f:rand(500,800),g:.5});},
 reload(x,y,w){const o=out(x,y,.3,{rev:.12,max:12});if(!o)return;const t0=A.ctx.currentTime;
  if(A.smp&&A.smp.rel){if(w==='shotgun'){for(let i=0;i<4;i++)playSmp(o,'sgl',t0+.25+i*.55,rand(.95,1.05),1.4);playSmp(o,'rack',t0+2.5,.95,1.2);}else{playSmp(o,'rel',t0+.2,1,1.4);playSmp(o,'rack',t0+(w==='silenced'||w==='pistol'?.9:1.3),1,1.1);}return;}nz(o,t0,.03,{f:3000,q:2,g:.8});nz(o,t0+.55,.05,{f:1800,q:2,g:.9});nz(o,t0+1.2,.03,{f:3500,q:3,g:.8});},
 dry(x,y){const o=out(x,y,.25,{rev:.05,max:10});if(!o)return;if(playSmp(o,'dry',A.ctx.currentTime,1,1.5))return;nz(o,A.ctx.currentTime,.02,{f:4000,q:4,g:.8});},
 body(x,y){const o=out(x,y,.5,{rev:.4,max:20});if(!o)return;const t0=A.ctx.currentTime+.25;tone(o,t0,.15,{f:75,f2:40,g:.9});nz(o,t0,.12,{type:'lowpass',f:500,g:.6});},
 beep(x,y){const o=out(x,y,.25,{rev:.2,max:16});if(!o)return;tone(o,A.ctx.currentTime,.05,{type:'square',f:2300,g:.25});},
 shoutFx(d){if(!A.ctx)return;const g=ui(.25),t0=A.ctx.currentTime;nz(g,t0,.25,{f:900,q:1.5,g:.6});nz(g,t0+.3,.3,{f:1100,q:1.5,g:.5});},
 hurt(x,y){const o=out(x,y,.7,{rev:.3});if(!o)return;const t0=A.ctx.currentTime;tone(o,t0,.12,{f:110,f2:60,g:1});nz(o,t0,.1,{type:'lowpass',f:700,g:.8});nz(o,t0+.05,.3,{f:500,q:2,g:.35});},
 breath(x,y,v){const o=out(x,y,v,{rev:.05,max:6});if(!o)return;const t0=A.ctx.currentTime;nz(o,t0,.75,{f:900,q:.6,g:.5,attack:.35});nz(o,t0+1,.9,{f:650,q:.6,g:.4,attack:.25});},
 scare(x,y){const k=randi(0,4),o=out(x,y,k===0?.9:.5,{rev:1.3});if(!o)return;const t0=A.ctx.currentTime;
  if(k===0){tone(o,t0,.2,{f:80,f2:40,g:1});nz(o,t0,.25,{type:'lowpass',f:600,g:1});}
  else if(k===1){for(let i=0;i<3;i++){tone(o,t0+i*.32,.08,{f:140,f2:90,g:.8});nz(o,t0+i*.32,.06,{type:'lowpass',f:900,g:.6});}}
  else if(k===2){tone(o,t0,1.4,{type:'sawtooth',f:rand(180,260),f2:rand(120,160),g:.05,attack:.3});nz(o,t0,1.4,{f:500,q:4,g:.15,attack:.3});}
  else if(k===3){for(let i=0;i<5;i++)tone(o,t0+i*rand(.4,.9),.04,{f:rand(1800,2600),g:.25});}
  else{[311,467,689].forEach((f,i)=>tone(o,t0,1.6-i*.3,{f,g:.15}));}},
 squelch(){if(!A.ctx)return;const g=ui(.22),t0=A.ctx.currentTime;nz(g,t0,.13,{f:2200,q:2,g:.7});tone(g,t0+.12,.06,{type:'square',f:1250,g:.1});},
 squelchEnd(){if(!A.ctx)return;const g=ui(.2);nz(g,A.ctx.currentTime,.2,{f:1800,q:1.5,g:.6});},
 click(){if(!A.ctx)return;tone(ui(.12),A.ctx.currentTime,.04,{type:'square',f:880,g:.4});},
 heart(){if(!A.ctx)return;const g=ui(.5),t0=A.ctx.currentTime;tone(g,t0,.14,{f:58,f2:40,g:.9});tone(g,t0+.24,.12,{f:52,f2:38,g:.6});},
 thunder(){if(!A.ctx)return;const g=ui(.55),t0=A.ctx.currentTime+rand(.3,1.4);nz(g,t0,4,{brown:1,type:'lowpass',f:400,f2:80,g:1,attack:.25});nz(g,t0,.5,{type:'lowpass',f:1200,g:.4,attack:.05});},
 clank(x,y){const o=out(x,y,.35,{rev:1.6});if(!o)return;const t0=A.ctx.currentTime;[311,487,733,1021].forEach((f,i)=>tone(o,t0,1.2-i*.2,{f,g:.25-i*.04}));},
 ecg(x,y,v,f){const o=out(x,y,v,{rev:.15,max:13});if(!o)return;tone(o,A.ctx.currentTime,.07,{f,g:.6});},
 vent(x,y){const o=out(x,y,.12,{rev:.2,max:13});if(!o)return;const t0=A.ctx.currentTime;nz(o,t0,1.4,{type:'lowpass',f:700,g:.6,attack:.7});nz(o,t0+1.6,1.2,{f:1800,q:.6,g:.25,attack:.1});},
 baby(x,y){const o=out(x,y,.2,{rev:.6});if(!o)return;const c=A.ctx;let t=c.currentTime;for(let k=0;k<randi(2,4);k++){const os=c.createOscillator();os.type='sawtooth';const p=rand(400,520);os.frequency.setValueAtTime(p*.9,t);os.frequency.linearRampToValueAtTime(p*1.15,t+.2);os.frequency.linearRampToValueAtTime(p*.8,t+.55);
  const v=c.createOscillator();v.frequency.value=8;const vg=c.createGain();vg.gain.value=18;v.connect(vg);vg.connect(os.frequency);const f1=c.createBiquadFilter();f1.type='bandpass';f1.frequency.value=1150;f1.Q.value=3;const f2=c.createBiquadFilter();f2.type='bandpass';f2.frequency.value=2600;f2.Q.value=4;
  const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.8,t+.06);g.gain.linearRampToValueAtTime(.5,t+.4);g.gain.linearRampToValueAtTime(0,t+.6);os.connect(f1);os.connect(f2);f1.connect(g);f2.connect(g);g.connect(o);os.start(t);v.start(t);os.stop(t+.65);v.stop(t+.65);t+=rand(.75,1.1);}},
 scream(x,y,vv){const o=out(x,y,vv||.5,{rev:1.5});if(!o)return;const c=A.ctx,t0=c.currentTime,os=c.createOscillator();os.type='sawtooth';const p=rand(520,820);os.frequency.setValueAtTime(p*.8,t0);os.frequency.linearRampToValueAtTime(p,t0+.2);os.frequency.linearRampToValueAtTime(p*.7,t0+rand(.9,1.5));
  const v=c.createOscillator();v.frequency.value=rand(5,7);const vg=c.createGain();vg.gain.value=p*.04;v.connect(vg);vg.connect(os.frequency);const f1=c.createBiquadFilter();f1.type='bandpass';f1.frequency.value=900;f1.Q.value=4;const f2=c.createBiquadFilter();f2.type='bandpass';f2.frequency.value=1400;f2.Q.value=5;
  const g=c.createGain();g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(.7,t0+.08);g.gain.linearRampToValueAtTime(.4,t0+.8);g.gain.linearRampToValueAtTime(0,t0+1.5);os.connect(f1);os.connect(f2);f1.connect(g);f2.connect(g);g.connect(o);os.start(t0);v.start(t0);os.stop(t0+1.6);v.stop(t0+1.6);},
 hit(){if(!A.ctx)return;const g=ui(.35),t0=A.ctx.currentTime;tone(g,t0,3,{f:52,f2:38,g:.9,attack:.02});nz(g,t0,2.2,{brown:1,type:'lowpass',f:220,f2:60,g:.8,attack:.03});const s=A.ctx.createGain();s.gain.value=.5;g.connect(s);s.connect(A.revIn);},
 pulse(){if(!A.ctx)return;const g=ui(.12),t0=A.ctx.currentTime;tone(g,t0,.5,{f:62,f2:48,g:.8,attack:.04});tone(g,t0+.42,.45,{f:60,f2:46,g:.5,attack:.04});},
 ring(){if(!A.ctx)return;const o=ui(.12),t0=A.ctx.currentTime;for(let k=0;k<2;k++){tone(o,t0+k*.5,.35,{f:440,g:.3});tone(o,t0+k*.5,.35,{f:480,g:.3});}},
 clang(x,y){const o=out(x,y,.6,{rev:.4});if(!o)return;const t0=A.ctx.currentTime;[820,1290,2100].forEach((f,i)=>tone(o,t0,.35-i*.08,{f,g:.3}));nz(o,t0,.04,{type:'highpass',f:3000,g:.8});},
 glass(x,y){const o=out(x,y,.3,{rev:.6,max:16});if(!o)return;const t0=A.ctx.currentTime;nz(o,t0,.15,{type:'highpass',f:4000,g:.6});tone(o,t0,.2,{f:2800,g:.1});},
};
function babble(text,who,vol){if(!A.ctx)return 1;const c=A.ctx,t0=c.currentTime+.04;
 const n=Math.max(4,Math.min(48,Math.round(text.length/3.1)));let h=0;for(const ch of who)h=(h*31+ch.charCodeAt(0))|0;
 const f0=who==='TOC'?88:(108+Math.abs(h)%55),o=ui(.55*(vol||1));
 const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1500;bp.Q.value=.75;const ws=c.createWaveShaper();ws.curve=A.dist2;bp.connect(ws);ws.connect(o);
 const osc=c.createOscillator();osc.type='sawtooth';const og=c.createGain();og.gain.value=0;
 const f1=c.createBiquadFilter();f1.type='bandpass';f1.Q.value=5;const f2=c.createBiquadFilter();f2.type='bandpass';f2.Q.value=7;
 const m1=c.createGain();m1.gain.value=1.3;const m2=c.createGain();m2.gain.value=.9;osc.connect(og);og.connect(f1);og.connect(f2);f1.connect(m1);f2.connect(m2);m1.connect(bp);m2.connect(bp);
 const VW_=[[730,1090],[270,2290],[530,1840],[570,840],[300,870],[660,1720],[440,1020],[400,2000],[350,1500]];let t=t0;
 for(let i=0;i<n;i++){const v=VW_[(Math.random()*VW_.length)|0],d=.062*rand(.7,1.35),pause=Math.random()<.1&&i>1&&i<n-2,p=f0*(1+.14*Math.sin(i*.8)+rand(-.07,.07))*(i>n-3?.86:1);
  osc.frequency.setValueAtTime(p,t);f1.frequency.setValueAtTime(v[0],t);f2.frequency.setValueAtTime(v[1],t);og.gain.setValueAtTime(0,t);
  if(!pause){og.gain.linearRampToValueAtTime(.9,t+d*.22);og.gain.linearRampToValueAtTime(.6,t+d*.7);og.gain.linearRampToValueAtTime(0,t+d*.97);if(Math.random()<.45)nz(bp,t,.028,{type:'highpass',f:3200,g:.5});}
  t+=pause?d*1.6:d;}
 osc.start(t0);osc.stop(t+.05);nz(o,t0,t-t0+.08,{f:2300,q:.5,g:.05,attack:.04});return t-t0+.08;}
function mdc(o,t0,len){const c=A.ctx,os=c.createOscillator();os.type='square';let t=t0;while(t<t0+len){os.frequency.setValueAtTime(Math.random()<.5?1200:1800,t);t+=1/600;}
 const g=c.createGain();g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.09,t0+.01);g.gain.setValueAtTime(.09,t0+len-.01);g.gain.linearRampToValueAtTime(.0001,t0+len);os.connect(g);g.connect(o);os.start(t0);os.stop(t0+len+.02);}
function radioFx(dur,vol,data){if(!A.ctx)return dur;const c=A.ctx,t0=c.currentTime,o=ui(.22*(vol||1));
 tone(o,t0,.035,{type:'sine',f:1180,g:.12});
 const s=t0+.06;nz(o,s,dur,{f:1700,q:.6,g:.07,attack:.08});
 for(let k=0;k<dur*3;k++)nz(o,s+Math.random()*dur,.03,{type:'lowpass',f:2200,g:rand(.02,.05),attack:.008});
 tone(o,s+dur,.06,{type:'sine',f:980,g:.07});tone(o,s+dur+.07,.06,{type:'sine',f:1310,g:.06});
 nz(o,s+dur+.12,.12,{type:'lowpass',f:2000,g:.06,attack:.03});return s+dur+.25-t0;}
function blackoutSfx(){if(!A.ctx)return;const o=ui(.25),t0=A.ctx.currentTime;tone(o,t0,.5,{type:'sawtooth',f:100,g:.5});nz(o,t0,.08,{type:'highpass',f:2500,g:.9});tone(o,t0+.02,.25,{f:60,f2:40,g:.6});}
function siren(vol,dur){if(!A.ctx)return;const c=A.ctx,t0=c.currentTime,yelp=Math.random()<.35;
 const o=c.createOscillator(),o2=c.createOscillator();o.type='sawtooth';o2.type='square';o.frequency.value=900;o2.frequency.value=904;
 const lfo=c.createOscillator();lfo.frequency.value=yelp?3.3:.24;const lg=c.createGain();lg.gain.value=yelp?260:370;lfo.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);
 const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1500;const g=c.createGain();g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+dur*.4);g.gain.linearRampToValueAtTime(0,t0+dur);
 o.connect(lp);o2.connect(lp);lp.connect(g);let last=g;if(c.createStereoPanner){const p=c.createStereoPanner();const s=Math.random()<.5?-1:1;p.pan.setValueAtTime(-.85*s,t0);p.pan.linearRampToValueAtTime(.85*s,t0+dur);g.connect(p);last=p;}
 last.connect(A.master);const sw=c.createGain();sw.gain.value=.7;last.connect(sw);sw.connect(A.revIn);
 for(const x of [o,o2,lfo]){x.start(t0);x.stop(t0+dur+.1);}}
function startAmbient(){const c=A.ctx;
 const r=c.createBufferSource();r.buffer=A.noise;r.loop=true;
 const rh=c.createBiquadFilter();rh.type='highpass';rh.frequency.value=400;const rl=c.createBiquadFilter();rl.type='lowpass';rl.frequency.value=2600;
 A.rainG=c.createGain();A.rainG.gain.value=0;r.connect(rh);rh.connect(rl);rl.connect(A.rainG);A.rainG.connect(A.master);r.start();
 A.droneG=c.createGain();A.droneG.gain.value=0;const dl=c.createBiquadFilter();dl.type='lowpass';dl.frequency.value=160;dl.Q.value=4;
 [41,41.6,61.8].forEach(f=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;o.connect(dl);o.start();});
 const lfo=c.createOscillator();lfo.frequency.value=.07;const lg=c.createGain();lg.gain.value=60;lfo.connect(lg);lg.connect(dl.frequency);lfo.start();
 dl.connect(A.droneG);A.droneG.connect(A.master);
 const h=c.createOscillator();h.type='sawtooth';h.frequency.value=100;const hb=c.createBiquadFilter();hb.type='bandpass';hb.frequency.value=300;hb.Q.value=3;
 A.humG=c.createGain();A.humG.gain.value=0;h.connect(hb);hb.connect(A.humG);A.humG.connect(A.master);h.start();
 const w=c.createBufferSource();w.buffer=A.brown;w.loop=true;const wl=c.createBiquadFilter();wl.type='lowpass';wl.frequency.value=300;
 A.windG=c.createGain();A.windG.gain.value=0;w.connect(wl);wl.connect(A.windG);A.windG.connect(A.master);w.start();
}
function ambient(outdoor,hum,tension,menu,heli){if(!A.ctx||!A.rainG)return;const t=A.ctx.currentTime;
 if(!A.tensG){const c=A.ctx;A.tensG=c.createGain();A.tensG.gain.value=0;A.tensG.connect(A.master);[[55,.5],[77.8,.4],[1661,.025],[1760,.02]].forEach(([f,v])=>{const o=c.createOscillator();o.frequency.value=f;const g=c.createGain();g.gain.value=v;const l=c.createOscillator();l.frequency.value=rand(.05,.2);const lg=c.createGain();lg.gain.value=v*.5;l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(A.tensG);o.start();l.start();});
  A.heliG=c.createGain();A.heliG.gain.value=0;const hs=c.createBufferSource();hs.buffer=A.brown;hs.loop=true;const hl=c.createBiquadFilter();hl.type='lowpass';hl.frequency.value=260;const am=c.createGain();am.gain.value=.5;
  const lfo=c.createOscillator();lfo.type='sawtooth';lfo.frequency.value=11.5;const lg=c.createGain();lg.gain.value=.5;lfo.connect(lg);lg.connect(am.gain);hs.connect(hl);hl.connect(am);am.connect(A.heliG);
  const wh=c.createOscillator();wh.frequency.value=1870;const wg=c.createGain();wg.gain.value=.012;wh.connect(wg);wg.connect(A.heliG);A.heliG.connect(A.master);hs.start();lfo.start();wh.start();}
 A.tensG.gain.setTargetAtTime(menu?.06:.035+tension*.09,t,1.5);A.heliG.gain.setTargetAtTime(menu?0:(heli||0),t,1);
 const morn=!menu&&G.lvl==='house';if(menu||G.lvl!=='house'||!G.running){for(const k of ['dreadG','tvG','flyG'])if(A[k])A[k].gain.setTargetAtTime(0,t,.6);}A.rainG.gain.setTargetAtTime(menu?.03:morn?0:(outdoor?.075:.02),t,.6);
 A.windG.gain.setTargetAtTime(menu?.08:(outdoor?(morn?.12:.16):.07),t,.8);
 A.droneG.gain.setTargetAtTime(menu?.035:.045+tension*.06,t,1);
 A.humG.gain.setTargetAtTime(hum*.02,t,.1);if(A.scanG)A.scanG.gain.setTargetAtTime(menu?.16:0,t,menu?1.5:.4);}
function setVol(v){A.vol=v;if(A.master)A.master.gain.value=v;}

// ================= RADIO =================
const R={q:[],busy:false,voice:null};
function loadVoices(){if(!('speechSynthesis' in window))return;const vs=speechSynthesis.getVoices();R.voice=vs.find(v=>/^pl/i.test(v.lang))||null;
 const el=$('o-vinfo');if(el)el.textContent=R.voice?('Głos radia: '+R.voice.name):'Brak polskiego głosu syntezy w tej przeglądarce — komunikaty będą tylko w napisach.';}
if('speechSynthesis' in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}
function say(who,text,o={}){radio(who,text,Object.assign({},o,{say:1}));}
function radio(who,text,o={}){
 if(G.lvl==='house'&&!o.radio&&G.squad&&G.squad.some(s=>s&&s.name===who))o.say=1;
 if(R.q.some(m=>m.text===text))return;
 if(!o.prio&&R.q.length>2)return;
 const m={who,text,o};if(o.prio)R.q.unshift(m);else R.q.push(m);pump();}
function pump(){if(R.busy||!R.q.length)return;const m=R.q.shift();R.busy=true;
 if(m.o.say||m.o.raw){const el=$('say');el.innerHTML='<span class="sn">'+m.who+'</span>'+(m.o.raw?'<span class="sh">'+m.text+'</span>':m.text);el.classList.add('on');
  if(m.o.raw&&A.ctx)SND.shoutFx(clamp(m.text.length*.05,.8,2.4));
  setTimeout(()=>{el.classList.remove('on');setTimeout(()=>{R.busy=false;pump();},260);},1300+m.text.length*58);return;}
 const el=$('radio');el.innerHTML='<b>'+m.who+'</b>'+m.text;el.classList.add('on');
 if(!m.o.raw&&A.voice!=='static')SND.squelch();
 let done=false;const fin=()=>{if(done)return;done=true;if(!m.o.raw&&A.voice!=='static')SND.squelchEnd();setTimeout(()=>{el.classList.remove('on');R.busy=false;pump();},380);};
 if(A.voice==='static'&&A.ctx){const d=clamp(m.text.length*.055,1,3.6);if(m.o.raw){SND.shoutFx(d);}else radioFx(d,1,m.who==='TOC');setTimeout(fin,(d+.6)*1000);}
 else if(A.voice==='tts'&&R.voice&&'speechSynthesis' in window){
  setTimeout(()=>{if(done)return;const u=new SpeechSynthesisUtterance(m.text);u.lang='pl-PL';u.voice=R.voice;u.rate=m.o.rate||1.12;
   u.pitch=m.who==='TOC'?.6:(m.o.pitch||.85);u.volume=Math.min(1,(m.o.vol||.9)*A.vol+.1);u.onend=fin;u.onerror=fin;speechSynthesis.speak(u);},m.o.raw?0:170);
  setTimeout(fin,2600+m.text.length*110);
 }else setTimeout(fin,1000+m.text.length*55);}
function radioClear(){R.q.length=0;if('speechSynthesis' in window)speechSynthesis.cancel();R.busy=false;for(const id of ['radio','say']){const el=$(id);if(el)el.classList.remove('on');}}
let toastT=0;function toast(t){const el=$('toast');el.textContent=t;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('on'),1800);}
