const ids=['temp','flow','nut','doo'];
const get=id=>document.getElementById(id);
function update(){
  const temp=+get('temp').value, flow=+get('flow').value, nut=+get('nut').value, d=+get('doo').value/10;
  get('tempOut').value=`${temp} °C`; get('flowOut').value=`${flow}%`; get('nutOut').value=`${nut}%`; get('doOut').value=`${d.toFixed(1)} mg/L`;
  const warm=Math.max(0,Math.min(100,(temp-15)*5));
  const still=100-flow;
  const nutrient=nut;
  const oxygenContext=Math.max(0,Math.min(100,Math.abs(d-7)*12));
  const score=Math.round(warm*.36+still*.30+nutrient*.29+oxygenContext*.05);
  get('riskScore').textContent=score; get('gauge').style.setProperty('--score',score);
  let label,text;
  if(score<35){label='Lower-favorability mix';text='These settings are less aligned with the team’s simplified growth-condition hypothesis. Keep measuring; one reading never proves safety.'}
  else if(score<65){label='Watch conditions';text='Several conditions may support growth. Keep measuring and compare the trend over time.'}
  else{label='High-favorability mix';text='Warm, slow-moving and nutrient-rich conditions line up strongly in this simplified model. This still does not indicate toxin presence.'}
  get('riskLabel').textContent=label; get('riskText').textContent=text;
}
ids.forEach(id=>get(id).addEventListener('input',update)); update();
