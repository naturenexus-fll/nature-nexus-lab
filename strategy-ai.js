const $ = id => document.getElementById(id);

const MISSIONS = [
  {id:'M01',name:'Mighty Microbiomes',readiness:70,icon:'🧬',focus:'keystone placement',summary:'Place keystone species in Young Forest, Grand Tree and Hollow Tree microbiomes. Young Forest can trigger a bonus involving the opposite-side invasive queen.',roles:['Technician','Driver'],tools:['Technician Precision Launcher','Driver Scoop + Retention Gate']},
  {id:'M02',name:'Roots of Renewal',readiness:65,icon:'🌳',focus:'resource pipeline',summary:'Deliver resources to the Grand Tree base and cycle them upward into the canopy chamber.',roles:['Operator','Specialist'],tools:['Operator Adjustable Resource Launcher','Specialist Cycle/Rotate Presets']},
  {id:'M03',name:'Cave Waterfall',readiness:55,icon:'💧',focus:'high-throughput cycling',summary:'Cycle keystone species through the Cave Waterfall; the counter determines the result.',roles:['Specialist','Driver','Technician'],tools:['Driver Token Funnel','Technician Feed Guide','Specialist Waterfall Preset']},
  {id:'M04',name:'Rainforest Awakening',readiness:80,icon:'🌱',focus:'release pieces',summary:'Release all keystone species from the Nest and all resources from the Hollow Tree.',roles:['Driver','Technician'],tools:['Driver Low-Profile Release Pusher','Technician Base Attachment']},
  {id:'M05',name:'Central Haven',readiness:75,icon:'🤝',focus:'shared alliance scoring',summary:'Deliver keystone species/resources to the shared Central Haven. Both teams receive the full shared score.',roles:['Driver','Operator'],tools:['Driver Wide-Mouth Collector','Operator Retrieval Rake']},
  {id:'LU',name:'Level Up: Invasive Attack',readiness:45,icon:'👑',focus:'optional risk bonus',summary:'Add invasive species during setup, then remove/deliver them to the containment zone for additional scoring opportunities.',roles:['Driver','Technician'],tools:['Driver Containment Plow','Technician Capture Gate']}
];

const TOOLS = [
  {role:'Driver',icon:'🚙',name:'Wide-Mouth Scoop + Retention Gate',legal:'Non-electric LEGO attachment on the driving base',best:'M01 · M03 · M05',why:'A funnel-shaped front gathers loose keystone/resource tokens and a passive backstop keeps them from rolling out.',build:['Wide V-shaped mouth','Low floor that slides under tokens','Passive rear gate/backstop','Side rails that do not snag models'],risk:'Keep it compact so it does not interfere with the other team.'},
  {role:'Driver',icon:'📦',name:'Delivery Tray / Drop Gate',legal:'Driver-base attachment changed by the Technician inside the Technician Area',best:'M01 · M05',why:'Carries multiple tokens and releases them with a simple passive gate or fixed-angle dump.',build:['Deep tray','Hard loading stop','One-direction drop gate','Color-coded attachment interface'],risk:'Driver may not touch the base during the match; attachment handling belongs to the Technician when legal.'},
  {role:'Driver',icon:'🧹',name:'Containment Plow',legal:'Non-electric LEGO attachment on the driving base',best:'Level Up',why:'Guides invasive species toward the containment zone with a broad, low front instead of trying to grab each one.',build:['Angled side wings','Rounded/roller contact if useful','No sharp protrusions','Short enough for turns'],risk:'Avoid interference or blocking the opposing team.'},
  {role:'Driver + Technician',icon:'🧲',name:'Robotic-Tool Docking Cradle',legal:'Mechanical cradle on driving base; Technician robotic tool remains legal hardware',best:'M01 · M03',why:'Lets the driving base move the Technician robotic tool outside the Technician Area, as the rulebook specifically allows.',build:['Self-centering rails','Mechanical stop','Easy release back in Technician Area','No extra electronics'],risk:'Practice recovery if the carried tool becomes stranded.'},
  {role:'Operator',icon:'🎯',name:'Adjustable Resource Launcher',legal:'Entirely non-electric LEGO and remains inside Operator Area',best:'M02',why:'Uses a repeatable track/lever with angle and power stops for consistent delivery into the Grand Tree base.',build:['Numbered aim positions','Mechanical power stop','Smooth token track','Stable wide base'],risk:'Steady repeatable shots usually beat maximum power.'},
  {role:'Operator',icon:'🌿',name:'Mangrove Root Comb / Retrieval Rake',legal:'Non-electric tool used from inside Operator Area',best:'M05 support',why:'Helps collect allowed keystone/resource tokens from the mangrove roots or retrieval zone and stages them for the next action.',build:['Thin fingers spaced around tokens','Handle that stays inside area','Collection pocket','No contact with prohibited items'],risk:'Only handle items allowed by the Operator rules.'},
  {role:'Technician',icon:'🤖',name:'Color-Triggered Precision Launcher',legal:'Robotic tool: one single motor + one color sensor',best:'M01',why:'Uses a fixed loading position, hard aim stop and color-sensor trigger to launch repeatably toward the Young Forest.',build:['Fixed loading chute','Hard angle stop','Stabilizing feet','One-revolution motor code'],risk:'Tune distance and aim from the exact same placement each time.'},
  {role:'Technician',icon:'🔧',name:'Quick-Swap Driver Attachments',legal:'Technician may modify the driving base when completely inside Technician Area',best:'All Driver routes',why:'One common pin/axle interface lets the Technician swap scoop, tray or plow quickly without rebuilding the robot.',build:['Same mounting geometry for every tool','One obvious orientation','Captive pins/axles where possible','Run-number labels'],risk:'Every extra swap costs time; combine functions when practical.'},
  {role:'Specialist',icon:'💻',name:'Cycle / Rotate Software Presets',legal:'Software + Specialist controller/device; not a physical game-action controller attachment',best:'M02 · M03',why:'Dedicated buttons/programs for “cycle one resource,” “rotate to waterfall,” and “safe stop” reduce input mistakes.',build:['Large on-screen buttons','Clear program names','Safe default motor stop','Optional automation of other allowed tools'],risk:'Test pairing and reconnect procedure before every match.'},
  {role:'Specialist',icon:'🎮',name:'Controller Grip / Guard',legal:'Functional grip/guard allowed; cannot act as a tool for other game actions',best:'Control comfort',why:'Improves consistent control without becoming a field-action mechanism.',build:['Comfortable grip','Button access','No field-reaching extensions'],risk:'Do not design it to manipulate game pieces.'}
];

const ROLES = [
  {name:'Driver',icon:'🚙',official:'Controls the driving base with its double motor and controller, or lets it run autonomously.',efficient:['Own field navigation and roaming pickup/delivery','Use one repeatable path for Central Haven deliveries','Coordinate closely with Technician for attachment swaps','Carry the Technician robotic tool only when the strategy gains enough value'],bestFit:'Calm driver with strong spatial awareness and smooth corrections',avoid:'The Driver cannot handle equipment or mission models other than the controller and may not touch/modify the driving base during play.'},
  {name:'Operator',icon:'🎯',official:'Uses mechanical non-electric LEGO tool(s) that stay completely inside the Operator Area.',efficient:['Become the team’s high-volume resource feeder','Tune aim + power with physical stops','Stage tokens in a repeatable order','Use the retrieval-zone and mangrove-root allowances efficiently'],bestFit:'Accurate, patient player who can repeat the same motion under pressure',avoid:'Operator tools stay inside the Operator Area; only permitted tokens may leave the area.'},
  {name:'Technician',icon:'🤖',official:'Runs a robotic tool with one single motor + one color sensor and may modify the driving base when it is fully inside the Technician Area.',efficient:['Own attachment swaps and base setup','Run precision keystone launches','Recover/reconfigure the mobile tool quickly','Keep a numbered attachment checklist for the match'],bestFit:'Fast hands, strong builder, understands mechanisms and reset positions',avoid:'Items may leave the Technician Area only by the robotic tool or driving base.'},
  {name:'Specialist',icon:'🌳',official:'Controls the Grand Tree double motor and may run programs on the team laptop/tablet, including programs that operate other player tools.',efficient:['Run the M02 resource cycle continuously','Rotate the tree to open Cave Waterfall at the right moment','Use simple one-purpose control presets','Watch whole-field timing and trigger automation at agreed cues'],bestFit:'Best coder / systems thinker who stays calm while tracking multiple actions',avoid:'Specialist cannot handle equipment or mission models except the Specialist tool; use the token recycler only under the stated courtesy rule.'}
];

const STRATEGY_TYPES = [
  {key:'safe',icon:'🛡️',name:'Reliable Foundation',goal:'Lock in dependable points with simple actions before attempting throughput-heavy or Level Up play.'},
  {key:'keystone',icon:'🧬',name:'Keystone Engine',goal:'Build the match around M01 placement, M03 cycling and M04 keystone release.'},
  {key:'resource',icon:'🌳',name:'Resource Pipeline',goal:'Maximize Operator + Specialist teamwork through M02 and M04 resource flow.'},
  {key:'coop',icon:'🤝',name:'Coopertition Finish',goal:'Keep a strong core plan while reserving time and tokens for the shared Central Haven.'},
  {key:'attack',icon:'🚀',name:'High-Upside Level Up',goal:'Use the optional invasive species challenge only when the team can contain the added complexity.'}
];

function missionScore(m, style){
  let s=m.readiness;
  if(style==='safe') s += (m.id==='M04'||m.id==='M05')?20:0;
  if(style==='keystone') s += ['M01','M03','M04'].includes(m.id)?28:0;
  if(style==='resource') s += ['M02','M04','M05'].includes(m.id)?28:0;
  if(style==='coop') s += m.id==='M05'?40:0;
  if(style==='attack') s += m.id==='LU'?35:0;
  const p=$('priority').value;
  if(p==='reliable') s += m.readiness*.2;
  if(p==='coop' && m.id==='M05') s+=25;
  if(p==='simple' && ['M04','M05'].includes(m.id)) s+=20;
  if(p==='score' && ['M01','M03','LU'].includes(m.id)) s+=15;
  if($('favorAutomation').checked && ['M02','M03'].includes(m.id)) s+=12;
  return s;
}

function renderMissionGrid(){
  $('missionGrid').innerHTML=MISSIONS.map((m,i)=>`<article class="future-mission-card">
    <div class="future-mission-head"><span class="mission-emoji">${m.icon}</span><div><b>${m.id}</b><h3>${m.name}</h3></div><span class="readout" id="readout-${i}">${m.readiness}%</span></div>
    <p>${m.summary}</p>
    <div class="mission-meta"><span>Focus: ${m.focus}</span><span>${m.roles.join(' + ')}</span></div>
    <input class="readiness" data-i="${i}" type="range" min="0" max="100" step="5" value="${m.readiness}" aria-label="${m.name} readiness">
  </article>`).join('');
  document.querySelectorAll('.readiness').forEach(r=>r.addEventListener('input',e=>{
    const i=+e.target.dataset.i; MISSIONS[i].readiness=+e.target.value; $(`readout-${i}`).textContent=e.target.value+'%'; generate();
  }));
}

function pickMissions(style){
  return [...MISSIONS]
    .filter(m=>m.id!=='LU' || +$('levelUp').value>0)
    .sort((a,b)=>missionScore(b,style)-missionScore(a,style));
}

function strategySequence(style, ranked){
  const top=ranked.slice(0, style==='attack'?6:5);
  if(style==='safe') return ['Start with M04 releases','Driver handles easy token delivery / M05','Technician attempts M01 only from a proven aim point','Operator + Specialist run M02 if stable','Skip anything that becomes unreliable'];
  if(style==='keystone') return ['M04: release Nest keystones early','M01: Technician feeds Young Forest; Driver distributes other keystones','Specialist exposes Cave Waterfall','M03: begin repeated keystone cycling','Finish with remaining keystones toward M05 or microbiomes'];
  if(style==='resource') return ['M04: release Hollow Tree resources','Operator continuously feeds Grand Tree base','Specialist cycles resources into canopy chamber','Driver gathers loose resources and supports M05','Rotate tree for M03 only after resource rhythm is stable'];
  if(style==='coop') return ['Secure one team-owned mission first','Coordinate Central Haven plan with the other team','Driver prioritizes clean deliveries that do not block shared access','Operator/Technician stage tokens for late M05 scoring','Protect final 20–30 seconds for Central Haven cleanup'];
  return [`Pre-match: add ${$('levelUp').value} invasive species only if practiced`,'M04 release to increase available pieces','Run strongest high-value engine (M01 or M02)','Driver/Technician move invasives toward containment','Use M05 as fallback for loose tokens near endgame'];
}

function rolePlan(style){
  const common={
    Driver:'Collect, transport and deliver; use the fewest route reversals possible.',
    Operator:'Run a repeatable resource-launch rhythm; focus on accuracy over speed.',
    Technician:'Own attachment swaps and precision robotic-tool launches.',
    Specialist:'Control tree cycling/rotation and coordinate software timing.'
  };
  if(style==='keystone'){common.Technician='Primary scorer: precision-launch Young Forest keystones and manage Driver attachments.';common.Driver='Distribute keystones to reachable microbiomes and support Waterfall feed.';common.Specialist='Expose Waterfall at the planned cue and keep M03 available.';}
  if(style==='resource'){common.Operator='Primary scorer: feed Grand Tree base at a steady cadence.';common.Specialist='Primary scorer: cycle each resource to canopy, then rotate tree only when called.';}
  if(style==='coop'){common.Driver='Primary Central Haven transporter; watch the other team and avoid blocking.';common.Operator='Stage allowed tokens near retrieval/launch points to support shared scoring.';}
  if(style==='attack'){common.Driver='Handle containment routing and high-value transport.';common.Technician='Use fast swap plan: plow/capture tool + proven mission attachment.';}
  return common;
}

function chooseTools(style, ranked){
  let names=[];
  ranked.slice(0,4).forEach(m=>names.push(...m.tools));
  if(style==='attack') names.push('Driver Containment Plow','Technician Capture Gate');
  if($('favorFewerTools').checked){
    // Prefer multipurpose legal concepts over one-off tools.
    names=names.filter(n=>!n.includes('Capture Gate'));
    names.unshift('Driver Scoop + Retention Gate','Quick-Swap Driver Attachments');
  }
  return [...new Set(names)].slice(0,5);
}

function fallback(style){
  if(style==='attack') return 'If Level Up pieces become congested, abandon containment and convert the remaining time to M05 shared deliveries or the strongest proven mission.';
  if(style==='resource') return 'If Grand Tree cycling jams, stop feeding new resources; Driver shifts to M05 while Specialist clears/rotates only if legal and useful.';
  if(style==='keystone') return 'If Young Forest accuracy drops, stop wasting keystones. Redirect them to Central Haven or another reachable microbiome.';
  if(style==='coop') return 'If the other team cannot coordinate M05, execute your own reliable missions first and use Central Haven only when field access is clear.';
  return 'If a mission fails twice, skip it. Protect time for M04/M05 and avoid a cascading recovery problem.';
}

function risk(style){
  return ({safe:'Low',keystone:'Medium',resource:'Medium',coop:'Medium / alliance-dependent',attack:'High'})[style];
}

function renderStrategy(s){
  const ranked=pickMissions(s.key); const roles=rolePlan(s.key); const tools=chooseTools(s.key,ranked); const seq=strategySequence(s.key,ranked);
  const avg=Math.round(ranked.slice(0,4).reduce((a,m)=>a+m.readiness,0)/Math.min(4,ranked.length));
  return `<article class="future-strategy-card">
    <div class="future-strategy-title"><span>${s.icon}</span><div><h3>${s.name}</h3><p>${s.goal}</p></div><b class="confidence">${avg}% core readiness</b></div>
    <div class="pattern-grid">
      <section><h4>🎯 Goal</h4><p>${s.goal}</p></section>
      <section><h4>🧭 Recommended mission emphasis</h4><p>${ranked.slice(0,4).map(m=>`<b>${m.id}</b> ${m.name}`).join(' → ')}</p></section>
      <section><h4>🔧 Best tool / attachment set</h4><ul>${tools.map(t=>`<li>${t}</li>`).join('')}</ul></section>
      <section><h4>👥 Who handles what</h4><ul>${Object.entries(roles).map(([r,v])=>`<li><b>${r}:</b> ${v}</li>`).join('')}</ul></section>
      <section class="wide"><h4>▶️ Suggested sequence</h4><ol>${seq.map(x=>`<li>${x}</li>`).join('')}</ol></section>
      <section><h4>⚠️ Main risk</h4><p>${risk(s.key)}</p></section>
      <section><h4>🛟 Backup plan</h4><p>${fallback(s.key)}</p></section>
    </div>
  </article>`;
}

function renderTools(){
  $('attachmentGrid').innerHTML=TOOLS.map(t=>`<article class="future-tool-card">
    <div class="tool-top"><span>${t.icon}</span><div><small>${t.role}</small><h3>${t.name}</h3></div></div>
    <span class="legal-chip">${t.legal}</span><b class="mission-use">Best for: ${t.best}</b>
    <p>${t.why}</p><h4>Build it with</h4><ul>${t.build.map(x=>`<li>${x}</li>`).join('')}</ul><div class="risk-tip"><b>Watch:</b> ${t.risk}</div>
  </article>`).join('');
}

function renderRoles(){
  $('officialRoleGrid').innerHTML=ROLES.map(r=>`<article class="future-role-card">
    <div class="role-title"><span>${r.icon}</span><h3>${r.name}</h3></div>
    <p class="official"><b>Official job:</b> ${r.official}</p>
    <p><b>Best fit:</b> ${r.bestFit}</p>
    <h4>Efficient match jobs</h4><ul>${r.efficient.map(x=>`<li>${x}</li>`).join('')}</ul>
    <div class="role-limit"><b>Do not forget:</b> ${r.avoid}</div>
  </article>`).join('');
}

function generate(){
  $('strategyResults').innerHTML=STRATEGY_TYPES.map(renderStrategy).join('');
  const avg=Math.round(MISSIONS.slice(0,5).reduce((a,m)=>a+m.readiness,0)/5);
  $('profileSummary').textContent=`${$('priority').selectedOptions[0].text} · ${avg}% avg readiness`;
}

function reset(){
  [70,65,55,80,75,45].forEach((v,i)=>MISSIONS[i].readiness=v);
  $('priority').value='balanced';$('levelUp').value='2';$('favorFewerTools').checked=true;$('favorAutomation').checked=false;
  renderMissionGrid(); generate();
}

$('generateBtn').addEventListener('click',generate);
$('resetBtn').addEventListener('click',reset);
['priority','levelUp','favorFewerTools','favorAutomation'].forEach(id=>$(id).addEventListener('change',generate));
renderMissionGrid();renderTools();renderRoles();generate();
