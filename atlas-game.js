"use strict";

const cases = window.memorialCases;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const state = { caseIndex:0, activeId:null, filter:"all", view:"map", reviewed:{}, replies:{}, doubts:new Set(), stats:{authority:62,treasury:54,stability:58}, open:true };
const provinces = [
  {name:"京畿道",meta:"4 府 · 19 州 · 76 县",trend:"中枢章奏 128 起",severity:"案情密度：中"},
  {name:"西陲道",meta:"6 府 · 31 州 · 94 县",trend:"本年军报 36 起 ↑18%",severity:"案情密度：高"},
  {name:"江南道",meta:"8 府 · 52 州 · 201 县",trend:"本年上报案件 47 起 ↑23%",severity:"案情密度：高"}
];
const networkPeople = [
  {name:"沈敬修",office:"直隶总督",faction:"务实",rank:"正二品",origin:"河西道·临洮府",exam:"承熙二年进士",portrait:1,x:50,y:47},
  {name:"周秉正",office:"河间知县",faction:"清流",rank:"正七品",origin:"江东道·常州府",exam:"承熙八年进士",portrait:12,x:27,y:24},
  {name:"陆惟谦",office:"内阁首辅",faction:"务实",rank:"正一品",origin:"江南道·苏州府",exam:"景和末科进士",portrait:2,x:73,y:25},
  {name:"高文济",office:"左佥都御史",faction:"清流",rank:"正四品",origin:"山东道·济南府",exam:"承熙元年进士",portrait:4,x:19,y:54},
  {name:"钱若谷",office:"户部侍郎",faction:"务实",rank:"正三品",origin:"中州道·开封府",exam:"承熙二年进士",portrait:6,x:79,y:55},
  {name:"岳崇烈",office:"定西将军",faction:"勋贵",rank:"从一品",origin:"京畿道",exam:"世袭武职",portrait:3,x:52,y:79},
  {name:"顾云开",office:"陕西巡抚",faction:"清流",rank:"从二品",origin:"湖广道",exam:"景和十八年进士",portrait:5,x:10,y:31},
  {name:"韩守节",office:"御前监军",faction:"内廷",rank:"正四品",origin:"京畿道",exam:"内廷简拔",portrait:7,x:89,y:32},
  {name:"方砚秋",office:"巡盐御史",faction:"清流",rank:"正五品",origin:"福建道",exam:"承熙六年进士",portrait:8,x:11,y:73},
  {name:"汪鹤亭",office:"两淮盐运使",faction:"务实",rank:"从三品",origin:"江南道",exam:"承熙三年进士",portrait:10,x:89,y:74},
  {name:"程万金",office:"扬州总商",faction:"盐商",rank:"布衣",origin:"江南道·扬州府",exam:"捐纳候选",portrait:11,x:33,y:86},
  {name:"许三保",office:"河间驿丞",faction:"无党",rank:"未入流",origin:"直隶",exam:"吏员出身",portrait:9,x:70,y:88}
];
const networkEdges = [
  [0,1,"hostile","压报互讦"],[0,2,"patron","首辅荐举"],[0,3,"hostile","河工弹劾"],[0,4,"cohort","同科进士"],[0,5,"kin","姻亲通家"],[1,3,"patron","言官援引"],[1,6,"cohort","同乡"],[2,4,"patron","座主门生"],[2,7,"hostile","票拟冲突"],[2,9,"kin","姻亲"],[3,6,"cohort","都察院同僚"],[3,8,"patron","荐举巡盐"],[4,9,"cohort","财赋同僚"],[5,7,"hostile","军饷互讦"],[5,11,"patron","驿传旧部"],[8,9,"hostile","盐案攻讦"],[9,10,"patron","官商关照"],[10,2,"patron","岁馈门包"],[10,8,"hostile","索银反目"],[11,1,"cohort","灾情递报"]
];
const currentCase=()=>cases[state.caseIndex];
const currentMemorial=()=>currentCase().memorials.find(m=>m.id===state.activeId);
const clean=html=>{const t=document.createElement("div");t.innerHTML=html;return t.textContent};

function switchView(view){
  state.view=view;
  document.body.dataset.activeView=view;
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===`${view}View`));
  $$(".main-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  if(view==="officials") renderNetwork();
  if(view==="factions") renderFactions();
  if(view==="archive") renderArchive();
}

function selectCase(index, openDesk=false){
  state.caseIndex=index;state.activeId=currentCase().memorials[0].id;
  $$(".map-node").forEach((n,i)=>n.classList.toggle("active",i===index));
  renderList();renderIntel();renderDocument();
  if(openDesk)switchView("desk");
}

function renderList(){
  const list=currentCase().memorials.filter(m=>state.filter==="all"||m.type===state.filter);
  $("#memorialList").innerHTML=list.map((m,i)=>`<button class="memorial-card ${m.type} ${m.id===state.activeId?"active":""} ${state.reviewed[m.id]?"reviewed":""}" data-id="${m.id}"><span class="doc-thumb"><i>${m.type==="secret"?"御前亲启":"题本"}</i></span><span class="memorial-copy"><strong>${m.title}</strong><small>${m.region} · ${m.sender}</small><em>${state.reviewed[m.id]?"已朱批":i===0?"紧急":"待阅"}</em></span></button>`).join("");
  $$(".memorial-card").forEach(b=>b.onclick=()=>{state.activeId=b.dataset.id;renderList();renderDocument();switchView("desk")});
  const reviewed=Object.keys(state.reviewed).length;
  $("#reviewCounter").textContent=`${reviewed} / ${currentCase().memorials.length}`;
  $("#pendingCount").textContent=`${currentCase().memorials.length-reviewed} 件`;
}

function renderIntel(){
  const c=currentCase(), p=provinces[state.caseIndex];
  $("#provinceName").textContent=p.name;$("#provinceMeta").textContent=p.meta;$("#caseTrend").textContent=p.trend;$("#caseSeverity").textContent=p.severity;
  $("#caseList").innerHTML=c.memorials.slice(0,3).map((m,i)=>`<button class="case-row" data-id="${m.id}"><i>${i?"中":"重"}</i><b>${m.title.replace(/[折疏题本]/g,"").slice(0,11)}</b><small>矛盾报告 ${m.reveal.length} 份</small></button>`).join("");
  $$(".case-row").forEach(b=>b.onclick=()=>{state.activeId=b.dataset.id;renderList();renderDocument();switchView("desk")});
  $("#officialList").innerHTML=c.people.map((p,i)=>`<button class="official-row map-official" data-official="${i}"><img class="portrait" src="assets/officials/official-${String(state.caseIndex*3+i+1).padStart(2,"0")}.webp" alt="${p.name}画像"><div><b>${p.name}</b><small>${p.office}</small></div><em>政声 ${72-i*7}<i>${["清流","务实","内廷"][i]}</i></em></button>`).join("");
  $$(".map-official").forEach((b,i)=>b.onclick=()=>{switchView("officials");setTimeout(()=>selectOfficial(Math.min(state.caseIndex*3+i,networkPeople.length-1)),0)});
  const labels=state.caseIndex===0?["清望","务实","循理","持重"]:state.caseIndex===1?["勋贵","文官","内廷","边党"]:["盐商","清流","内阁","地方"];
  $("#factionMeter").innerHTML=labels.map((n,i)=>`<span><i>${n[0]}</i><b>${[42,28,17,13][i]}%</b><small>${n}</small></span>`).join("");
  $("#conflictCount").textContent=c.memorials.filter(m=>m.suspicious).length;
}

function semanticSections(m){
  const all=m.body.map(clean).join("");
  const sentences=all.split(/(?<=[。！？；])/).filter(Boolean);
  const midpoint=Math.ceil(sentences.length/2);
  return [
    ["起因时地",`${m.date}，${m.region}。${sentences[0]||""}`],
    ["经过与数字",sentences.slice(1,midpoint).join("")||sentences[0]],
    ["证据与攻讦",sentences.slice(midpoint).join("")||"诸臣所奏互有抵牾，请核验文册。"],
    ["所请处分",m.lead+"。伏乞圣裁。"],
    ["具名日期",`${m.office} ${m.sender} 谨奏。承熙十二年${m.date}`]
  ];
}

function renderDocument(){
  const m=currentMemorial(), doc=$("#document");
  doc.className=`document ${m.type} ${state.open?"open":"closed"}`;
  $("#documentKind").textContent=m.type==="secret"?"密折 · 直达御前 · 未经内阁":"正式题本 · 通政司验封 · 附内阁票拟";
  $("#memorialTitle").textContent=m.title;$("#coverTitle").textContent=m.title;$("#coverType").textContent=m.type==="secret"?"密折":"题本";
  $("#paperFolds").innerHTML=semanticSections(m).reverse().map(([h,p])=>`<section class="paper-panel"><h3>${h}</h3><p>${p}</p>${h==="具名日期"?`<span class="paper-terminal-mark">谨奏</span>`:""}</section>`).join("");
  $("#cabinetReply").classList.toggle("hidden",!m.cabinet);$("#cabinetReplyText").textContent=m.cabinet||"密折未过内阁，无票拟批答。";
  $("#routeSummary").textContent=`${m.region.replace(" · "," ")} → 京师（驿程 ${[6,15,8][state.caseIndex]} 日）`;
  renderDeskEvidence();
  $("#vermilionWriting").textContent=state.replies[m.id]||"";
  $("#customReply").value=state.replies[m.id]||"";$("#customReply").disabled=!!state.reviewed[m.id];
  $("#submitVerdict").disabled=!!state.reviewed[m.id]||!$("#customReply").value.trim();
  $("#markDoubt").textContent=state.doubts.has(m.id)?"已留中":"留中存疑";
}
function renderDeskEvidence(){
  const c=currentCase(),m=currentMemorial();
  const evidence=[
    {kind:"起因",title:c.clues[0],meta:m.date,tone:"origin"},
    {kind:"官方报奏",title:m.title,meta:`${m.office} · ${m.sender}`,tone:"formal"},
    {kind:"证人证词",title:c.clues[1],meta:"驿丞与仓书供述",tone:"witness"},
    {kind:"密报佐证",title:c.clues[2],meta:"御前密封",tone:"secret"},
    {kind:"矛盾点",title:c.clues[3],meta:"账册日期前后不符",tone:"conflict"},
    {kind:"延宕后果",title:"案情若拖延，将引发党争与民变",meta:"五日后显现",tone:"effect"}
  ];
  $("#threadFlow").innerHTML=evidence.map((e,i)=>`${i?'<i class="thread-arrow">→</i>':''}<button class="thread-node ${e.tone}" data-evidence="${i}"><small>${e.kind}</small><b>${e.title}</b><span>${e.meta}</span></button>`).join("");
  $("#deskIntel").innerHTML=`<section><small>涉案核心</small><div class="intel-person"><img src="assets/officials/official-${String(state.caseIndex*3+1).padStart(2,"0")}.webp" alt="${c.people[0].name}"><b>${c.people[0].name}</b><span>${c.people[0].office}</span><em>恶名昭著</em></div></section><section><small>关联人物</small>${c.people.slice(1).map((p,i)=>`<div class="intel-person compact"><img src="assets/officials/official-${String(state.caseIndex*3+i+2).padStart(2,"0")}.webp" alt="${p.name}"><b>${p.name}</b><span>${p.office}</span><em>${i?"利害关系":"同乡结党"}</em></div>`).join("")}</section><section><small>党派关联</small><p><i>清</i> 清流　<span>牵制</span>　<i>务</i> 务实</p></section>`;
  $$(".thread-node").forEach((n,i)=>n.onclick=()=>{$$(".thread-node").forEach(x=>x.classList.toggle("selected",x===n));$$(".paper-panel",$("#document")).forEach((panel,panelIndex)=>panel.classList.toggle("evidence-focus",panelIndex===Math.min(i,4)));toast(`已聚焦证据：${evidence[i].kind}`)});
}

function submitVerdict(){
  const m=currentMemorial(),reply=$("#customReply").value.trim();if(!reply||state.reviewed[m.id])return;
  state.reviewed[m.id]=true;state.replies[m.id]=reply;
  const key=["阅","知道了","核议","督查"].includes(reply)?reply:/查|核|勘/.test(reply)?"督查":"阅";
  const source=m.effects[key==="核议"?"依议":key==="督查"?"着查":key]||[1,-1,0];
  ["authority","treasury","stability"].forEach((k,i)=>state.stats[k]=Math.max(0,Math.min(100,state.stats[k]+source[i])));
  renderStats();renderList();renderDocument();toast(`朱批已下：${reply}`);
  const next=currentCase().memorials.find(x=>!state.reviewed[x.id]);if(next)setTimeout(()=>{state.activeId=next.id;renderList();renderDocument()},700);
  else setTimeout(()=>{ $("#summaryText").textContent=`本案诸折已毕。你标记了 ${state.doubts.size} 份存疑文书，朝局将在翌日反馈。`;$("#summaryDialog").showModal()},500);
}

function renderStats(){Object.entries(state.stats).forEach(([k,v])=>$(`#${k}Value`).textContent=v)}
function renderNetwork(){
  $("#networkBoard").innerHTML=`<div class="faction-halo halo-qing"></div><div class="faction-halo halo-shi"></div><div class="faction-halo halo-xun"></div><svg class="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${networkEdges.map(([a,b,type,label],i)=>`<line data-edge="${type}" class="${type}" x1="${networkPeople[a].x}" y1="${networkPeople[a].y}" x2="${networkPeople[b].x}" y2="${networkPeople[b].y}"><title>${label}</title></line>`).join("")}</svg>`+networkPeople.map((p,i)=>`<button class="person-node ${i===0?"core selected":""}" data-person="${i}" data-name="${p.name}" style="--x:${p.x}%;--y:${p.y}%"><img src="assets/officials/official-${String(p.portrait).padStart(2,"0")}.webp" alt="${p.name}画像"><span><b>${p.name}</b><small>${p.office}</small></span></button>`).join("");
  $$(".person-node").forEach(node=>node.onclick=()=>selectOfficial(Number(node.dataset.person)));
  selectOfficial(0);
}
function selectOfficial(index){
  const p=networkPeople[index];
  $$(".person-node").forEach((n,i)=>n.classList.toggle("selected",i===index));
  const connected=new Set([index]);networkEdges.forEach(e=>{if(e[0]===index)connected.add(e[1]);if(e[1]===index)connected.add(e[0])});
  $$(".person-node").forEach((n,i)=>n.classList.toggle("relation-muted",!connected.has(i)));
  $$(".network-lines line").forEach((line,i)=>line.classList.toggle("relation-muted",networkEdges[i][0]!==index&&networkEdges[i][1]!==index));
  const ties=networkEdges.filter(e=>e[0]===index||e[1]===index).map(e=>{const other=networkPeople[e[0]===index?e[1]:e[0]];return `<li><i class="${e[2]}"></i><b>${other.name}</b><span>${e[3]}</span></li>`}).join("");
  $("#officialDossier").innerHTML=`<div class="dossier-portrait"><img src="assets/officials/official-${String(p.portrait).padStart(2,"0")}.webp" alt="${p.name}"></div><small>${p.rank} · ${p.faction}</small><h2>${p.name}</h2><b>${p.office}</b><dl><dt>籍贯</dt><dd>${p.origin}</dd><dt>入仕</dt><dd>${p.exam}</dd><dt>政声</dt><dd>${72-index*2}</dd><dt>可信度</dt><dd>${Math.max(43,84-index*3)}%</dd></dl><h3>直接关系</h3><ul>${ties}</ul><button class="primary-dossier">追查相关奏折</button>`;
}
function filterRelations(type){
  $$(".network-controls button").forEach(b=>b.classList.toggle("active",b.dataset.relation===type));
  $$(".network-lines line").forEach(line=>line.classList.toggle("muted",type!=="all"&&line.dataset.edge!==type));
}
function renderFactions(){const data=[["清流","主张清查河工，重言官风骨","沈敬修","高文济"],["务实","先赈后查，维持地方运转","陆惟谦","钱若谦"],["勋贵","看重边功与军饷","岳崇烈","韩守节"],["内廷","只对御前负责，掌密报","周秉正","顾云开"]];$("#factionBoard").innerHTML=data.map((f,i)=>`<section class="faction-column ${["malachite","cinnabar","ochre","ink"][i]}"><h2>${f[0]}党</h2><p>${f[1]}</p><ul><li>${f[2]}</li><li>${f[3]}</li></ul><b>当前影响 ${[42,28,17,13][i]}%</b></section>`).join("")}
function renderArchive(){$("#archiveBoard").innerHTML=cases.map((c,i)=>`<article class="archive-card"><small>承熙十二年 · 卷 ${i+1}</small><h2>${c.title}</h2><p>${c.summary}</p><b>${c.memorials.length} 道奏折 · ${c.clues.length} 处矛盾</b></article>`).join("")}
let timer;function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>t.classList.remove("show"),1800)}

function bind(){
  $$(".main-tabs button").forEach(b=>b.onclick=()=>switchView(b.dataset.view));
  $$(".network-controls button").forEach(b=>b.onclick=()=>filterRelations(b.dataset.relation));
  $("#officialSearch").oninput=e=>{$$(".person-node").forEach(n=>n.classList.toggle("search-muted",e.target.value&&!n.dataset.name.includes(e.target.value)))};
  $$(".filters button").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;$$(".filters button").forEach(x=>x.classList.toggle("active",x===b));renderList()});
  $$(".map-node").forEach((b,i)=>b.onclick=()=>selectCase(i));
  $("#routeToggle").onclick=()=>{$(".routes").classList.toggle("hidden");$("#routeToggle").classList.toggle("active")};
  $("#heatToggle").onclick=()=>{$(".map-frame").classList.toggle("heat");$("#heatToggle").classList.toggle("active");toast("已切换案情热度")};
  $("#resetMap").onclick=()=>selectCase(0);
  $("#openCase").onclick=()=>switchView("desk");$$("[data-view-jump]").forEach(b=>b.onclick=()=>switchView(b.dataset.viewJump));
  $$(".back-map").forEach(b=>b.onclick=()=>switchView("map"));
  $("#closeMemorial").onclick=()=>{state.open=false;renderDocument()};$("#openMemorial").onclick=()=>{state.open=true;renderDocument()};
  $$(".quick-replies button").forEach(b=>b.onclick=()=>{$("#customReply").value=b.textContent;$("#submitVerdict").disabled=false});
  $("#customReply").oninput=e=>$("#submitVerdict").disabled=!e.target.value.trim();
  $("#markDoubt").onclick=()=>{const id=state.activeId;state.doubts.has(id)?state.doubts.delete(id):state.doubts.add(id);renderDocument();renderList();toast(state.doubts.has(id)?"已留中存疑":"已取消存疑")};
  $("#submitVerdict").onclick=submitVerdict;$("#nextDay").onclick=()=>{$("#summaryDialog").close();toast("翌日新折已送至御前")};
}

function init(){state.activeId=currentCase().memorials[0].id;bind();renderStats();renderList();renderIntel();renderDocument();renderFactions();renderArchive()}
init();
