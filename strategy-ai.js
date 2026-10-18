const MISSIONS = [
  {id:'M01',name:'Drone Survey',max:30,time:18,diff:2,att:'launcher',attName:'Low-profile launcher',attTip:'A short guided lever or springless motor arm that releases the drone cleanly without lifting the robot.',status:'testing',rel:72,desc:'Launch drone + LiDAR bonus.', group:'solo'},
  {id:'M02',name:'Exploding Seeds',max:30,time:14,diff:1,att:'fork',attName:'Wide fork / seed scoop',attTip:'Two rails capture multiple seeds at once; add side walls so seeds cannot roll away on the return trip.',status:'ready',rel:85,desc:'3 seeds × 10. Save them for M14.', group:'seeds'},
  {id:'M03',name:'Flip the Rock',max:30,time:16,diff:2,att:'pusher',attName:'Rigid pusher / slider',attTip:'A broad flat face with a hard stop. Keep it low so it cannot ride over mission levers.',status:'ready',rel:82,desc:'Flag down + return rock.', group:'solo'},
  {id:'M04',name:'Lucky Leaves',max:30,time:23,diff:4,att:'collector',attName:'Funnel collector',attTip:'A wide V-shaped mouth tolerates randomized positions better than a narrow grabber.',status:'testing',rel:58,desc:'Randomized leaf/katydid setup.', group:'leaves'},
  {id:'M05',name:'Reaching Roots',max:20,time:13,diff:2,att:'pusher',attName:'Rigid pusher / slider',attTip:'A broad flat face with a hard stop. Keep it low so it cannot ride over mission levers.',status:'ready',rel:88,desc:'Full root extension.', group:'fungus'},
  {id:'M06',name:'Leafcutter Frenzy',max:30,time:19,diff:3,att:'guard',attName:'Corral / containment guard',attTip:'A passive fence or U-shaped cage keeps loose pieces contained while the robot backs away.',status:'testing',rel:68,desc:'Keep 3 leaf fragments contained.', group:'solo'},
  {id:'M07',name:'Humongous Fungus',max:40,time:18,diff:3,att:'pusher',attName:'Rigid pusher / slider',attTip:'A broad flat face with a hard stop. Keep it low so it cannot ride over mission levers.',status:'testing',rel:65,desc:'Mycelium + possible coop bonuses.', group:'fungus'},
  {id:'M08',name:'Tangled',max:30,time:20,diff:3,att:'tree',attName:'Tree multi-tool',attTip:'Combine a hook, lift face and alignment rails so M08 and M09 can be handled on the same visit.',status:'testing',rel:67,desc:'Vine touches mat.', group:'tree'},
  {id:'M09',name:'Research Platform',max:30,time:22,diff:3,att:'tree',attName:'Tree multi-tool',attTip:'Combine a hook, lift face and alignment rails so M08 and M09 can be handled on the same visit.',status:'testing',rel:64,desc:'Platform + camera + seed.', group:'tree'},
  {id:'M10',name:'Fragile Microhabitats',max:20,time:2,diff:1,att:'none',attName:'No attachment — route protection',attTip:'Treat this as a navigation mission: keep the robot path away from the fragile models.',status:'ready',rel:96,desc:'Leave spider and snail untouched.', group:'passive'},
  {id:'M11',name:'Window to the Past',max:20,time:12,diff:1,att:'pusher',attName:'Rigid pusher / slider',attTip:'A broad flat face with a hard stop. Keep it low so it cannot ride over mission levers.',status:'ready',rel:90,desc:'Root cover down.', group:'solo'},
  {id:'M12',name:'Forest Elder',max:30,time:22,diff:4,att:'tree2',attName:'Vertical lift / cane hook',attTip:'Use a tall, braced hook with a mechanical stop so the lift height is consistent.',status:'testing',rel:60,desc:'Raise cane + support tie.', group:'solo'},
  {id:'M13',name:'Keystone Species',max:30,time:18,diff:2,att:'dock',attName:'Dock latch + delivery tray',attTip:'A narrow latch tool releases the dock model while a tray/funnel carries pieces without dropping them.',status:'ready',rel:80,desc:'Deliver species + raise trees.', group:'dock'},
  {id:'M14',name:'Seeds of Renewal',max:50,time:24,diff:3,att:'dock',attName:'Dock latch + delivery tray',attTip:'A narrow latch tool releases the dock model while a tray/funnel carries pieces without dropping them.',status:'testing',rel:65,desc:'Up to 5 seeds; double if touching mat.', group:'dock'},
  {id:'M15',name:'Biocentric Architecture',max:40,time:24,diff:4,att:'dock',attName:'Dock latch + delivery tray',attTip:'A narrow latch tool releases the dock model while a tray/funnel carries pieces without dropping them.',status:'testing',rel:57,desc:'3 changes + environmental dock bonus.', group:'dock'}
];
const STATUS_REL={ready:90,testing:65,later:25};
const el=id=>document.getElementById(id);
const state={missions:JSON.parse(JSON.stringify(MISSIONS))};

function renderMissions(){
  el('missionGrid').innerHTML=state.missions.map((m,i)=>`<article class="mission-card" data-status="${m.status}">
    <div class="mission-top"><div><span class="mission-id">${m.id}</span><h3>${m.name}</h3></div><span class="pts">${m.max} max</span></div>
    <p>${m.desc}</p>
    <div class="attachment-mini"><span>Suggested</span><b>${m.attName}</b><small>${m.attTip}</small></div>
    <div class="mission-controls">
      <label>Status<select data-i="${i}" class="status-select"><option value="ready" ${m.status==='ready'?'selected':''}>Ready</option><option value="testing" ${m.status==='testing'?'selected':''}>Testing</option><option value="later" ${m.status==='later'?'selected':''}>Later</option></select></label>
      <label>Avg sec<input data-i="${i}" class="time-input" type="number" min="2" max="90" value="${m.time}"></label>
    </div>
    <div class="reliability-row"><span>Reliability</span><b class="reltext">${m.rel}%</b></div><div class="relbar"><i style="width:${m.rel}%"></i></div>
    <input data-i="${i}" class="rel-input" type="range" min="10" max="99" value="${m.rel}" aria-label="${m.name} reliability" style="width:100%;margin-top:5px;accent-color:#24b57e">
  </article>`).join('');
  document.querySelectorAll('.status-select').forEach(x=>x.onchange=e=>{const i=+e.target.dataset.i;state.missions[i].status=e.target.value;state.missions[i].rel=STATUS_REL[e.target.value];renderMissions();});
  document.querySelectorAll('.time-input').forEach(x=>x.onchange=e=>{state.missions[+e.target.dataset.i].time=+e.target.value;generate();});
  document.querySelectorAll('.rel-input').forEach(x=>x.oninput=e=>{const i=+e.target.dataset.i;state.missions[i].rel=+e.target.value;const card=e.target.closest('.mission-card');card.querySelector('.reltext').textContent=e.target.value+'%';card.querySelector('.relbar i').style.width=e.target.value+'%';});
}

function missionValue(m,style){
  const r=m.rel/100, expected=m.max*r;
  const timeEff=m.max/Math.max(m.time,5);
  const ready=m.status==='ready'?1:m.status==='testing'?.72:.2;
  const risk=m.diff*(1-r)*8;
  const weights={
    safe:{score:.62,rel:1.45,time:.25,risk:1.5},
    balanced:{score:1,rel:.8,time:.4,risk:.7},
    max:{score:1.45,rel:.35,time:.18,risk:.25},
    simple:{score:.72,rel:.9,time:.78,risk:.9},
    synergy:{score:.95,rel:.65,time:.3,risk:.5}
  }[style];
  return expected*weights.score + m.rel*weights.rel/10 + timeEff*weights.time*5 + ready*8 - risk*weights.risk;
}

function synergize(list){
  const ids=new Set(list.map(m=>m.id));let bonus=0,notes=[];
  if(ids.has('M02')&&ids.has('M14')){bonus+=16;notes.push('M02 seeds feed M14');}
  if(ids.has('M05')&&ids.has('M07')){bonus+=12;notes.push('M05 supports M07 coop');}
  if(ids.has('M08')&&ids.has('M09')){bonus+=15;notes.push('one tree attachment can target both');}
  const docks=['M13','M14','M15'].filter(x=>ids.has(x)).length;if(docks>=2){bonus+=10*docks;notes.push('dock missions share setup/approach');}
  return {bonus,notes};
}

function selectMissions(style){
  const tolerance=el('attachmentTolerance').value;
  const priority=el('priority').value;
  const scored=state.missions.filter(m=>m.status!=='later'||style==='max').map(m=>({m,v:missionValue(m,style)}));
  if(priority==='score') scored.forEach(x=>x.v+=x.m.max*.25);
  if(priority==='reliable') scored.forEach(x=>x.v+=x.m.rel*.18);
  if(priority==='speed') scored.forEach(x=>x.v+=(30-x.m.time)*.8);
  scored.sort((a,b)=>b.v-a.v);
  let timeBudget=130, chosen=[], attachments=new Set();
  for(const {m} of scored){
    const changeCost=attachments.size && !attachments.has(m.att) ? (tolerance==='low'?12:tolerance==='medium'?7:3):0;
    const cost=m.time+changeCost;
    if(timeBudget-cost<0) continue;
    if(tolerance==='low' && attachments.size>=3 && !attachments.has(m.att) && style!=='max') continue;
    chosen.push(m);timeBudget-=cost;attachments.add(m.att);
  }
  // Encourage key synergy pairs if practical.
  const pairs=style==='synergy'?[['M08','M09'],['M02','M14'],['M05','M07'],['M13','M15']]:[];
  for(const pair of pairs){
    for(const id of pair){const m=state.missions.find(x=>x.id===id);if(m.status!=='later'&&!chosen.includes(m)&&timeBudget>=m.time){chosen.push(m);timeBudget-=m.time;attachments.add(m.att);}}
  }
  return chosen;
}

function bundleRuns(missions,desiredRuns){
  // Place compatible missions together before distributing remaining missions.
  const groupOrder=['tree','seeds','dock','fungus','solo','passive','leaves'];
  const grouped={};missions.forEach(m=>(grouped[m.group]??=[]).push(m));
  let bundles=[];
  for(const g of groupOrder){if(grouped[g]?.length) bundles.push([...grouped[g]]);}
  // Split oversized bundles.
  bundles=bundles.flatMap(b=>b.length>3?[b.slice(0,3),b.slice(3)]:[b]).filter(b=>b.length);
  while(bundles.length<desiredRuns){
    let idx=bundles.findIndex(b=>b.length>1);if(idx<0)break;const x=bundles[idx].pop();bundles.push([x]);
  }
  while(bundles.length>desiredRuns){
    bundles.sort((a,b)=>a.reduce((s,m)=>s+m.time,0)-b.reduce((s,m)=>s+m.time,0));
    const a=bundles.shift(),b=bundles.shift();bundles.push([...a,...b]);
  }
  bundles.sort((a,b)=>b.reduce((s,m)=>s+m.max*(m.rel/100),0)-a.reduce((s,m)=>s+m.max*(m.rel/100),0));
  return bundles;
}

const ATTACHMENTS = [
  {key:'quick',icon:'🔩',name:'Universal Quick-Swap Mount',missions:'All active attachments',type:'foundation',desc:'A standard two-pin/axle interface that lets technicians change tools in one motion.',build:['Use the same connection height on every tool','Add a physical stop so it cannot be installed crooked','Color-code each attachment to its program/run']},
  {key:'pusher',icon:'🧱',name:'Rigid Pusher / Slider',missions:'M03 · M05 · M07 · M11',type:'passive',desc:'Simple flat or stepped face for levers, roots and sliding actions. High reliability with no extra motor.',build:['Wide contact surface','Low center of force','Side guide to prevent slipping']},
  {key:'fork',icon:'🍴',name:'Fork / Scoop / Corral',missions:'M02 · M04 · M06 · M14',type:'passive',desc:'Captures loose pieces with a wide mouth and keeps them controlled during travel.',build:['V-shaped funnel entrance','Raised side walls','Smooth floor with no snag points']},
  {key:'tree',icon:'🌳',name:'Tree Multi-Tool',missions:'M08 · M09',type:'combo',desc:'One aligned mechanism for the shared tree area: push, hook or lift without changing attachments between the two missions.',build:['Tree-facing alignment rails','Separate contact points for each scoring action','Practice taped and untaped tree setups']},
  {key:'dock',icon:'⚓',name:'Dock Latch + Delivery Tray',missions:'M13 · M14 · M15',type:'combo',desc:'A latch-release feature paired with a tray or funnel for carrying the interchangeable model/seeds.',build:['Narrow latch finger','Deep tray with backstop','Use the same approach angle for multiple dock missions']},
  {key:'lift',icon:'🪝',name:'Vertical Hook / Lift',missions:'M12 + selected tree actions',type:'powered-or-passive',desc:'A braced hook or fork for upward movement when a flat pusher cannot reach.',build:['Triangulate tall beams','Mechanical upper/lower stops','Slow final motor movement if powered']},
  {key:'launcher',icon:'🎯',name:'Guided Launcher',missions:'M01',type:'specialized',desc:'A compact mechanism that releases the drone consistently while keeping robot recoil low.',build:['Guide rails before release','Hard start position','Avoid a large swinging arm if a short lever works']},
  {key:'alignment',icon:'📐',name:'Wall-Squaring Guides',missions:'Every launch',type:'navigation',desc:'Side/back jigs that let the robot start square to home walls and make autonomous runs repeatable.',build:['Rigid flat surfaces','Do not flex under hand pressure','Match guides to one obvious robot placement']}
];

const MATCH_ROLES = [
  {icon:'▶️',name:'Launch Technician',best:'Calm, consistent hands',does:'Squares the robot, confirms the correct program, launches without nudging the robot, and calls “go” only when setup is complete.',eff:'Use the same 3-step launch routine every time: square → program → hands clear.'},
  {icon:'🔧',name:'Attachment / Setup Technician',best:'Fast visual checker',does:'Prepares the next attachment and mission pieces, verifies orientation, and keeps the launch area uncluttered.',eff:'Lay attachments in run order and use color/number labels matching the program names.'},
  {icon:'🔁',name:'Backup Technician',best:'Knows every run',does:'Can take over either table job if a teammate freezes or a run plan changes.',eff:'Practice at least one full match in the backup position each meeting.'},
  {icon:'🧠',name:'Run Captain',best:'Strong rule/strategy knowledge',does:'Before the match, confirms run order, fallback plan and which mission to skip if time is lost. During official play, follows event/table access rules.',eff:'Memorize only three calls: NORMAL, FALLBACK, STOP.'}
];

const TEAM_ROLES = [
  {icon:'💻',name:'Coder',does:'Owns program naming, gyro resets, motor speeds and clean code versions.',eff:'One program per run; never edit the competition version without saving a tested backup.'},
  {icon:'🧱',name:'Attachment Engineer',does:'Builds quick-swap mechanisms, checks rigidity and removes unnecessary parts.',eff:'Measure attachment-change time; target a smooth swap rather than a complicated “perfect” tool.'},
  {icon:'🗺️',name:'Mission Strategist',does:'Studies scoring, mission combinations, routes and Challenge Updates.',eff:'Ranks missions by expected points = score × reliability, not just maximum score.'},
  {icon:'📊',name:'Reliability / Data Lead',does:'Records 5–10 attempts per run, success/failure reason and actual time.',eff:'Update the AI reliability sliders from evidence instead of guesses.'},
  {icon:'🧪',name:'Test Lead',does:'Creates repeatable test conditions: robot placement, mat position, battery level and model reset.',eff:'Change only one variable at a time so the team knows what fixed the problem.'},
  {icon:'📋',name:'Rules & Inspection Lead',does:'Checks robot/equipment against current official rules and watches Challenge Updates.',eff:'Keep a one-page pre-event checklist and re-check it whenever the robot changes.'},
  {icon:'🎤',name:'Communicator / Documentation Lead',does:'Captures design iterations and explains why strategy or attachments changed.',eff:'Take one photo + one sentence after every meaningful design change for judging evidence.'},
  {icon:'🤝',name:'Team / Coop Coordinator',does:'Makes sure everyone understands the plan and handles any cooperation discussion for missions that involve the other team.',eff:'Agree on cooperation expectations before the match; do not improvise at the last second.'}
];

const STRATEGIES=[
  {key:'safe',name:'Tournament Safe',icon:'🛡️',desc:'Protect precision tokens and favor missions that already work.',why:'Best when consistency matters more than theoretical maximum.'},
  {key:'balanced',name:'Balanced Best Score',icon:'⚖️',desc:'Mix dependable points with a few higher-value missions.',why:'Good default for qualifying rounds and normal practice.'},
  {key:'max',name:'High-Score Attack',icon:'🚀',desc:'Chase the largest available mission total, accepting more risk.',why:'Use only after the team proves the mechanisms under match pressure.'},
  {key:'simple',name:'Low-Attachment Plan',icon:'🧩',desc:'Prefer fast missions and fewer mechanism changes.',why:'Useful when attachment swaps are costing too much time.'},
  {key:'synergy',name:'Combo / Synergy Plan',icon:'🔗',desc:'Prioritize mission chains and shared mechanisms.',why:'Targets points that can be earned from one collection, attachment or model visit.'}
];

function plan(styleObj){
  const selected=selectMissions(styleObj.key);const runs=bundleRuns(selected,+el('runCount').value);
  const missionExpected=selected.reduce((s,m)=>s+m.max*(m.rel/100),0);
  const missionMax=selected.reduce((s,m)=>s+m.max,0);
  const syn=synergize(selected);
  const inspection=el('includeInspection').checked?20:0;
  const tokenTarget=el('protectTokens').checked?(styleObj.key==='max'?35:50):25;
  const expected=Math.round(missionExpected+inspection+tokenTarget);
  const uniqueAtt=new Set(selected.map(m=>m.att).filter(x=>x!=='none')).size;
  const avgRel=Math.round(selected.reduce((s,m)=>s+m.rel,0)/Math.max(selected.length,1));
  const totalTime=selected.reduce((s,m)=>s+m.time,0)+Math.max(0,uniqueAtt-1)*5;
  return {...styleObj,selected,runs,expected,missionMax:missionMax+inspection+50,uniqueAtt,avgRel,totalTime,syn};
}

function renderPlan(p,index){
  const runHtml=p.runs.map((r,i)=>{const pts=Math.round(r.reduce((s,m)=>s+m.max*m.rel/100,0));const atts=[...new Set(r.map(m=>m.attName).filter(Boolean))];return `<div class="run"><span class="run-tag">RUN ${i+1}</span><div class="run-main"><div class="run-missions">${r.map(m=>`<b>${m.id}</b> ${m.name}`).join(' · ')}</div><small class="run-attachment">🔧 ${atts.join(' + ')}</small></div><span class="run-points">≈${pts} pts</span></div>`}).join('');
  const target=+el('targetScore').value;const targetText=p.expected>=target?`This plan clears the ${target}-point target on expected value.`:`Expected value is ${target-p.expected} points below the ${target}-point target; improve reliability or add one more mission.`;
  return `<article class="strategy-card ${index===1?'featured':''}">
    <div class="strategy-head"><div class="strategy-name"><div class="strategy-icon">${p.icon}</div><div><h3>${p.name}</h3><p class="strategy-desc">${p.desc}</p></div></div><div class="score-chip">≈ ${p.expected} pts</div></div>
    <div class="stats"><div class="stat"><b>${p.avgRel}%</b><small>avg reliability</small></div><div class="stat"><b>${p.selected.length}</b><small>missions</small></div><div class="stat"><b>${p.uniqueAtt}</b><small>attachment types</small></div><div class="stat"><b>${Math.min(150,p.totalTime)}s</b><small>est. action time</small></div></div>
    <div class="run-list">${runHtml}</div>
    <p class="why"><strong>Why:</strong> ${p.why} ${p.syn.notes.length?'Synergy found: '+p.syn.notes.join('; ')+'. ':''}${targetText}</p>
  </article>`;
}

function renderAttachmentsAndRoles(){
  const ag=document.getElementById('attachmentGrid');
  if(ag) ag.innerHTML=ATTACHMENTS.map(a=>`<article class="attachment-card"><div class="attachment-icon">${a.icon}</div><span class="attachment-type">${a.type}</span><h3>${a.name}</h3><b class="mission-use">${a.missions}</b><p>${a.desc}</p><ul>${a.build.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');
  const mg=document.getElementById('matchRoleGrid');
  if(mg) mg.innerHTML=MATCH_ROLES.map(r=>`<article class="role-card"><div class="role-icon">${r.icon}</div><h4>${r.name}</h4><span class="role-best">Best fit: ${r.best}</span><p>${r.does}</p><div class="eff-tip"><b>Efficiency:</b> ${r.eff}</div></article>`).join('');
  const tg=document.getElementById('teamRoleGrid');
  if(tg) tg.innerHTML=TEAM_ROLES.map(r=>`<article class="role-card"><div class="role-icon">${r.icon}</div><h4>${r.name}</h4><p>${r.does}</p><div class="eff-tip"><b>Efficiency:</b> ${r.eff}</div></article>`).join('');
}

function generate(){
  const plans=STRATEGIES.map(plan);el('strategyResults').innerHTML=plans.map(renderPlan).join('');
  const ready=state.missions.filter(m=>m.status==='ready').length,testing=state.missions.filter(m=>m.status==='testing').length;
  el('profileSummary').textContent=`${ready} ready · ${testing} testing · ${el('priority').selectedOptions[0].text}`;
}

function reset(){state.missions=JSON.parse(JSON.stringify(MISSIONS));el('runCount').value='4';el('attachmentTolerance').value='medium';el('priority').value='balanced';el('targetScore').value=300;el('includeInspection').checked=true;el('protectTokens').checked=true;renderMissions();renderAttachmentsAndRoles();generate();}

el('generateBtn').onclick=generate;el('resetBtn').onclick=reset;
['runCount','attachmentTolerance','priority','targetScore','includeInspection','protectTokens'].forEach(id=>el(id).addEventListener('change',generate));
renderMissions();renderAttachmentsAndRoles();generate();
