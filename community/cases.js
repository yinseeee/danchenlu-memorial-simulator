"use strict";

window.danchenluMemorialCases = [
  {
    id: "river",
    title: "河工亏空案",
    summary: "数道奏折对决口时辰、灾银去向说法不一。",
    rumor: "“都察院近日频查河道衙门，内阁却催着尽快拨银。”",
    clues: ["河堤究竟在初二还是初三夜决口", "赈粮实发三千石或仅一千二百石", "巡检声称先报灾，总督却称先见其折", "河工银账上少了八万两"],
    contradiction: "总督称初三决堤、赈粮三千石；知县密奏初二已决、实发仅一千二百石。巡检的驿程也证明总督不可能先得消息。",
    people: [
      { name: "沈敬修", office: "直隶总督", stance: "清流倚重", tone: "neutral" },
      { name: "周秉正", office: "河间知县", stance: "密折弹劾", tone: "hostile" },
      { name: "陆惟谦", office: "内阁首辅", stance: "主张拨银", tone: "neutral" }
    ],
    memorials: [
      {
        id: "river-relief", type: "formal", region: "直隶 · 河间府", title: "请开仓赈济河工灾民折", lead: "河患冲决、流民待哺",
        sender: "沈敬修", office: "直隶总督", date: "三月初五日", time: "巳时入递",
        body: ["本月<span class='fact-mark'>初三子夜</span>，滹沱河东堤骤溃二十余丈，淹没村庄一十七处。臣已会同藩司开常平仓，<span class='fact-mark'>实发赈粮三千石</span>，灾民暂得安顿。", "惟库粮将尽，伏请户部速拨银十万两修堤。至御史所称河工侵蚀，皆系<span class='attack-mark'>风闻无据、沽名邀直</span>，若因浮言迟误河防，臣不敢任其咎。"],
        cabinet: "拟依议，着户部拨银十万两，工部遣员协修。", reveal: [0, 1], effects: { "阅": [0,0,-1], "知道了": [0,0,0], "依议": [1,-9,5], "着查": [2,-1,-1] }, suspicious: true
      },
      {
        id: "river-secret", type: "secret", region: "直隶 · 河间县", title: "密陈河工冒赈侵帑折", lead: "上宪欺罔、灾民失所",
        sender: "周秉正", office: "河间知县", date: "三月初四日", time: "午时入递",
        body: ["臣冒死密奏：河堤实于<span class='fact-mark'>初二亥时</span>先溃，督臣沈敬修压报一日，以便改易河工册簿。所谓赈粮三千石，臣逐仓验看，<span class='fact-mark'>百姓实领一千二百石</span>，余粮不知所往。", "沈敬修又令府县共结无弊，声言首辅已允拨银。臣以为<span class='attack-mark'>其欺君蠹国，罪在不赦</span>，请密遣钦差查账，勿令内阁先闻。"],
        cabinet: null, reveal: [0, 1, 3], effects: { "阅": [0,0,-2], "知道了": [0,0,-1], "依议": [-2,-2,-3], "着查": [4,-2,2] }, suspicious: false
      },
      {
        id: "river-censor", type: "formal", region: "都察院", title: "劾直隶河道积弊疏", lead: "河员朋比、岁修虚报",
        sender: "高文济", office: "左佥都御史", date: "三月初六日", time: "辰时入递",
        body: ["臣查直隶河工三年账册，岁修共领银二十四万两，而堤身所用桩石不足其半。去年尾册与今春底册相较，<span class='fact-mark'>短少银八万两</span>，经手诸员皆为督臣门生故吏。", "今堤一决，沈敬修不思自劾，反诋言官。伏乞将其解任候勘；若再拨巨款，无异<span class='attack-mark'>以民脂填墨吏之壑</span>。"],
        cabinet: "拟交直隶总督自查具奏，拨银事仍如前议。", reveal: [3], effects: { "阅": [-1,0,-1], "知道了": [0,0,-1], "依议": [-3,-5,1], "着查": [3,-1,1] }, suspicious: true
      },
      {
        id: "river-dispatch", type: "secret", region: "兵部驿站", title: "驿丞密报递折时刻单", lead: "急递迟误、前后可疑",
        sender: "许三保", office: "河间驿丞", date: "三月初五日", time: "酉时入递",
        body: ["初二夜四更，河防巡检持红签急报到驿，言东堤已溃。小人即发六百里加急，<span class='fact-mark'>初三午后方送入总督行辕</span>。", "然总督所上奏稿落款初三卯时，称已亲临勘视。卯时在午时之前，其所据何报，小人不敢妄猜，只将驿簿封呈。"],
        cabinet: null, reveal: [0, 2], effects: { "阅": [1,0,0], "知道了": [1,0,0], "依议": [-1,0,-1], "着查": [2,-1,0] }, suspicious: false
      },
      {
        id: "river-grain", type: "formal", region: "户部", title: "覆核直隶仓储数目题本", lead: "仓粮支放、账册待核",
        sender: "钱若谷", office: "户部侍郎", date: "三月初六日", time: "申时入递",
        body: ["据直隶藩司报，河间常平仓原存四千八百石，今报发赈三千石，尚余一千八百石。然户部去岁冬盘册载该仓实存仅<span class='fact-mark'>三千石有奇</span>，两册相差一千七百余石。", "请暂缓拨银，令藩司将出纳仓票解部。惟首辅谕称灾情紧急，臣不敢壅滞，谨将疑处一并陈明。"],
        cabinet: "拟先拨五万两救急，仓储差额容后查办。", reveal: [1, 3], effects: { "阅": [0,1,-1], "知道了": [0,0,0], "依议": [1,-5,3], "着查": [2,-1,0] }, suspicious: true
      }
    ]
  },
  {
    id: "frontier",
    title: "西陲军饷案",
    summary: "捷报、败报与粮台账目彼此冲突，将军和巡抚互相攻讦。",
    rumor: "“西北来的捷报写得太快，伤亡簿却迟迟不肯送进京。”",
    clues: ["所谓大捷发生在二十日还是二十二日", "军中存粮能支两月或不足十日", "阵亡名册多出八百余人", "巡抚与主将互称对方截留军饷"],
    contradiction: "主将称二十日大捷且粮足两月；监军密报二十二日战败、存粮不足十日。兵部名册证明伤亡被刻意压低。",
    people: [
      { name: "岳崇烈", office: "定西将军", stance: "勋贵领袖", tone: "neutral" },
      { name: "顾云开", office: "陕西巡抚", stance: "文官一派", tone: "hostile" },
      { name: "韩守节", office: "御前监军", stance: "只对御前", tone: "neutral" }
    ],
    memorials: [
      {
        id: "front-victory", type: "formal", region: "甘肃 · 凉州", title: "奏报黑水川大捷折", lead: "边军奋勇、斩获甚众",
        sender: "岳崇烈", office: "定西将军", date: "三月二十六日", time: "辰时入递",
        body: ["本月<span class='fact-mark'>二十日</span>，臣率骑兵三千出黑水川，斩首六百，俘获马匹千余，我军仅亡七十三人。现敌已远遁，边圉无虞。", "军仓尚有粮<span class='fact-mark'>足支两月</span>。惟陕西巡抚顾云开屡迟军饷，以文牍掣肘军机，请敕其速解银二十万两。"],
        cabinet: "拟优叙将士，敕陕西巡抚速解军饷。", reveal: [0,1], effects: { "阅": [1,0,0], "知道了": [1,0,0], "依议": [3,-8,0], "着查": [0,-1,-2] }, suspicious: true
      },
      {
        id: "front-secret", type: "secret", region: "甘肃军营", title: "密陈黑水川败状折", lead: "主帅匿败、军心将溃",
        sender: "韩守节", office: "御前监军", date: "三月二十四日", time: "子时入递",
        body: ["臣泣血密陈：黑水川之战实在<span class='fact-mark'>二十二日</span>，我军中伏，死者逾九百。岳崇烈将退敌小队首级冒作大捷，禁伤兵出营。", "营中粮草<span class='fact-mark'>不支十日</span>，并非巡抚未解，乃军需官高价倒卖。若捷报先至，愿陛下勿为所蔽。"],
        cabinet: null, reveal: [0,1,2], effects: { "阅": [-1,0,-2], "知道了": [0,0,-1], "依议": [-3,-3,-4], "着查": [4,-2,1] }, suspicious: false
      },
      {
        id: "front-roster", type: "formal", region: "兵部", title: "覆核西军伤亡清册", lead: "名册错漏、恤银难发",
        sender: "章如海", office: "兵部尚书", date: "三月二十七日", time: "午时入递",
        body: ["定西将军报阵亡七十三人，然凉州各卫报请恤银者共<span class='fact-mark'>九百一十六名</span>。其中八百四十三人称病故，日期俱为二十二日，显系规避败绩之名。", "请暂缓叙功，遣员核点。内阁催臣先办封赏，臣未敢擅专。"],
        cabinet: "拟伤亡容后查核，捷报既明，封赏不宜迟。", reveal: [2], effects: { "阅": [-1,0,-1], "知道了": [0,0,-1], "依议": [-3,-5,-1], "着查": [3,-2,1] }, suspicious: true
      },
      {
        id: "front-governor", type: "secret", region: "陕西 · 西安", title: "巡抚密劾将军侵饷折", lead: "军饷有去无回、反诬地方",
        sender: "顾云开", office: "陕西巡抚", date: "三月二十五日", time: "酉时入递",
        body: ["臣于正月、二月分三批解饷<span class='fact-mark'>共十八万两</span>，俱有凉州粮台收讫。岳崇烈今日反称臣扣饷，实欲掩其倒卖军粮。", "但臣家人与军需商号确有远亲，臣不敢隐。请将双方账册一并封查，以白曲直。"],
        cabinet: null, reveal: [3], effects: { "阅": [0,0,-1], "知道了": [0,0,0], "依议": [-1,-1,-2], "着查": [3,-2,1] }, suspicious: true
      },
      {
        id: "front-grain", type: "formal", region: "陕西粮台", title: "请补西军粮料题本", lead: "粮价腾贵、转运艰难",
        sender: "卢应时", office: "陕西布政使", date: "三月二十六日", time: "未时入递",
        body: ["凉州粮台今存米麦一万二千石，照额可支二十八日；然军报称存粮八万石、足支两月，<span class='fact-mark'>两数悬殊</span>。", "定西将军催地方再购四万石，市价已较常年腾贵三倍。臣恐商人囤积，请先查现仓再议采买。"],
        cabinet: "拟准采买二万石，毋误军需。", reveal: [1,3], effects: { "阅": [0,0,-1], "知道了": [0,0,0], "依议": [1,-8,2], "着查": [2,-1,0] }, suspicious: false
      }
    ]
  },
  {
    id: "salt",
    title: "两淮盐引案",
    summary: "盐价暴涨，各衙门却报称课额充足，盐商与巡盐御史互指舞弊。",
    rumor: "“盐商昨夜往首辅府送了四口箱子，说是江南土仪。”",
    clues: ["盐价究竟上涨三成还是翻了一倍", "二十万张盐引中有六万张重号", "缉私营所获私盐竟盖官印", "盐商、运司与京官之间有馈赠账簿"],
    contradiction: "运司淡化盐价涨幅且隐瞒重号盐引；县令查获的‘私盐’带有官封，盐商账簿又直指京官收受馈赠。",
    people: [
      { name: "汪鹤亭", office: "两淮盐运使", stance: "内阁门生", tone: "neutral" },
      { name: "方砚秋", office: "巡盐御史", stance: "言官清议", tone: "hostile" },
      { name: "程万金", office: "扬州总商", stance: "盐商首领", tone: "neutral" }
    ],
    memorials: [
      {
        id: "salt-office", type: "formal", region: "江南 · 扬州", title: "奏陈盐课足额民食无虞折", lead: "盐务平稳、流言失实",
        sender: "汪鹤亭", office: "两淮盐运使", date: "四月初三日", time: "卯时入递",
        body: ["今岁盐课已完七成，市盐每斤较往岁仅贵<span class='fact-mark'>三成</span>，实因漕河水浅转运稍迟。盐引二十万张，逐号可稽，并无重复。", "巡盐御史方砚秋未谙盐法，纵役惊商，致市井流言。请敕其<span class='attack-mark'>停止妄拿，毋伤国课</span>。"],
        cabinet: "拟申饬巡盐御史，仍令运司平抑盐价。", reveal: [0,1], effects: { "阅": [0,1,-2], "知道了": [0,0,-1], "依议": [1,4,-5], "着查": [2,-2,0] }, suspicious: true
      },
      {
        id: "salt-censor", type: "secret", region: "江南 · 扬州", title: "密劾运司卖引通商折", lead: "官商勾结、盐课暗亏",
        sender: "方砚秋", office: "巡盐御史", date: "四月初二日", time: "戌时入递",
        body: ["臣微服访市，百姓所买之盐已较去年<span class='fact-mark'>贵逾一倍</span>。查运司发出二十万引，内有<span class='fact-mark'>六万张号码重复</span>，均流入程万金等大商之手。", "汪鹤亭以盐课足额为辞，实则把重引所得分润京官。臣已获私账一本，恐遭灭口，密封另递。"],
        cabinet: null, reveal: [0,1,3], effects: { "阅": [-1,1,-2], "知道了": [0,0,-1], "依议": [-2,2,-4], "着查": [4,-3,3] }, suspicious: false
      },
      {
        id: "salt-county", type: "formal", region: "江南 · 泰州", title: "查获私盐请奖题本", lead: "缉获私枭、请叙官兵",
        sender: "陶茂先", office: "泰州知州", date: "四月初四日", time: "巳时入递",
        body: ["本州缉私营获船七艘、盐一万四千斤。奇在盐包虽由夜航私运，却俱盖<span class='fact-mark'>两淮运司朱印</span>，引纸亦为官式。", "运司来文命即行焚毁，臣以案情未明，暂封库中。请遣部员验看。"],
        cabinet: "拟令两淮盐运使会同查办。", reveal: [2], effects: { "阅": [0,0,-1], "知道了": [0,0,0], "依议": [-2,1,-2], "着查": [3,-1,2] }, suspicious: true
      },
      {
        id: "salt-merchant", type: "secret", region: "江南商籍", title: "盐商请罪密呈馈送簿", lead: "受勒捐输、愿缴私账",
        sender: "程万金", office: "扬州总商", date: "四月初三日", time: "子时入递",
        body: ["草民有死罪。三年来依运司指令，按每引银二钱凑作‘冰敬’，转送京中诸公。今春已送<span class='fact-mark'>首辅门下银三万两</span>，并非草民自愿。", "方御史亦曾索银五千，草民未允，旋即被查。官商各执一词，惟账簿逐笔具在，乞陛下密验。"],
        cabinet: null, reveal: [3], effects: { "阅": [-1,0,-1], "知道了": [0,0,0], "依议": [-3,-1,-2], "着查": [3,-2,1] }, suspicious: true
      },
      {
        id: "salt-revenue", type: "formal", region: "户部", title: "核两淮盐课增收疏", lead: "课银溢额、请奖运臣",
        sender: "钱若谷", office: "户部侍郎", date: "四月初五日", time: "申时入递",
        body: ["两淮本季盐课较额多<span class='fact-mark'>入银十二万两</span>，表面可喜。然盐斤销量反较去年少两成，所增之银从何而来，部中主事不能解释。", "首辅票示盐务有功，催请议叙汪鹤亭。臣请先缓一月，复核引号与商账。"],
        cabinet: "拟汪鹤亭加一级，余交户部照例核销。", reveal: [0,1,3], effects: { "阅": [-1,1,-1], "知道了": [0,0,0], "依议": [-3,3,-3], "着查": [3,-1,1] }, suspicious: true
      }
    ]
  }
];

if (false) {
const state = {
  day: 1,
  stats: { authority: 62, treasury: 54, stability: 58 },
  dayStartStats: { authority: 62, treasury: 54, stability: 58 },
  caseIndex: 0,
  activeId: null,
  filter: "all",
  reviewed: {},
  replies: {},
  doubts: new Set(),
  revealed: new Set(),
  selectedReply: "",
  isOpen: true,
  isSwitching: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const currentCase = () => cases[state.caseIndex % cases.length];
const currentMemorial = () => currentCase().memorials.find(m => m.id === state.activeId);
const numerals = ["壹", "贰", "叁", "肆", "伍"];
const dates = ["三月初七", "三月二十八", "四月初六", "四月十六", "四月二十七"];

function clamp(value) { return Math.max(0, Math.min(100, value)); }

function renderStats() {
  Object.entries(state.stats).forEach(([key, value]) => {
    $(`#${key}Value`).textContent = value;
    const dial = $(`#${key}Value`).closest(".dial-stat");
    dial.querySelector("img").style.transform = `rotate(${(value - 50) * 1.35}deg)`;
    dial.querySelector("img").style.transition = "transform .55s ease";
  });
}

function renderList() {
  const memorials = currentCase().memorials.filter(m => state.filter === "all" || m.type === state.filter);
  $("#memorialList").innerHTML = memorials.map(m => {
    const active = m.id === state.activeId ? "active" : "";
    const reviewed = state.reviewed[m.id] ? "reviewed" : "";
    const doubt = state.doubts.has(m.id) ? "<span class='tally-doubt'>疑</span>" : "";
    return `<button class="memorial-tally ${active} ${reviewed}" data-id="${m.id}" aria-label="${m.type === "secret" ? "密折" : "题本"} ${m.title}">
      <span class="tally-type">${m.type === "secret" ? "密折" : "题本"}</span>
      <span class="tally-copy"><strong>${m.title}</strong><small>${m.sender}</small></span>
      ${doubt}
    </button>`;
  }).join("");
  $$(".memorial-tally").forEach(card => card.addEventListener("click", () => selectMemorial(card.dataset.id)));
}

function selectMemorial(id) {
  if (id === state.activeId || state.isSwitching) return;
  state.isSwitching = true;
  const book = $("#memorialBook");
  book.classList.add("switching");
  setFoldState(false, false);
  setTimeout(() => {
    state.activeId = id;
    const memorial = currentMemorial();
    memorial.reveal.forEach(index => state.revealed.add(index));
    state.selectedReply = "";
    renderList();
    renderPaper();
    renderClues();
    book.classList.remove("switching");
    setTimeout(() => {
      setFoldState(true, false);
      state.isSwitching = false;
    }, 120);
  }, 760);
}

function setFoldState(open, announce = true) {
  state.isOpen = open;
  $("#memorialBook").classList.toggle("is-open", open);
  $("#bookStage").classList.toggle("is-closed", !open);
  if (announce) showToast(open ? "奏折已启" : "奏折已合");
}

function renderPaper() {
  const m = currentMemorial();
  const index = currentCase().memorials.findIndex(item => item.id === m.id);
  $("#documentKind").textContent = m.type === "secret" ? "密折 · 直达御前" : "正式题本 · 通政司验封";
  $("#folioNumber").textContent = `第${numerals[index]}件`;
  $("#regionLabel").textContent = m.region;
  $("#memorialTitle").textContent = m.title;
  $("#coverTitle").textContent = m.title;
  $("#coverType").textContent = m.type === "secret" ? "密折" : "题本";
  $("#subjectLead").textContent = m.lead;
  $("#senderOffice").textContent = m.office;
  $("#senderName").textContent = m.sender;
  $("#submitDate").textContent = `承熙十二年${m.date}`;
  $("#senderSeal").textContent = m.type === "secret" ? "密奏" : "恭呈";
  $("#cabinetNote").classList.toggle("hidden", !m.cabinet);
  if (m.cabinet) $("#cabinetText").textContent = m.cabinet;

  const chunks = splitMemorialText(m.body);
  $$('[data-writing-panel]').forEach((panel, panelIndex) => {
    panel.innerHTML = chunks[panelIndex] ? `<p>${chunks[panelIndex]}</p>` : "";
  });

  const reviewed = Boolean(state.reviewed[m.id]);
  $("#memorialBook").classList.toggle("has-verdict", reviewed);
  $("#vermilionWriting").textContent = reviewed ? state.replies[m.id] : "";
  $("#customReply").value = reviewed ? state.replies[m.id] : "";
  $("#customReply").disabled = reviewed;
  $("#charCount").textContent = $("#customReply").value.length;
  $("#submitVerdict").disabled = true;
  $("#submitVerdict").textContent = reviewed ? "已落朱批" : "落朱批";
  $("#bookmarkButton").disabled = reviewed;
  $("#bookmarkButton").classList.toggle("active", state.doubts.has(m.id));
  $$("#quickReplies button").forEach(btn => {
    btn.disabled = reviewed;
    btn.classList.toggle("selected", reviewed && btn.dataset.reply === state.replies[m.id]);
  });
  $("#replyHint").textContent = reviewed ? `御批既下 · ${state.replies[m.id]}` : "选用成批，或亲书御旨";
}

function splitMemorialText(paragraphs) {
  const holder = document.createElement("div");
  holder.innerHTML = paragraphs.join("。\n");
  const plain = holder.textContent.replace(/\s+/g, "");
  const target = Math.ceil(plain.length / 4);
  const chunks = [];
  let rest = plain;
  for (let i = 0; i < 3; i += 1) {
    let cut = Math.min(rest.length, target);
    while (cut < rest.length && /[^，。；！？]/.test(rest[cut]) && cut < target + 24) cut += 1;
    chunks.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }
  chunks.push(rest);
  return chunks;
}

function renderCase() {
  const item = currentCase();
  $("#caseTitle").textContent = item.title;
  $("#caseSummary").textContent = item.summary;
  renderClues();
}

function renderClues() {
  const item = currentCase();
  $("#clueList").innerHTML = item.clues.map((clue, index) => `<div class="clue-slip ${state.revealed.has(index) ? "found" : ""}" style="--tilt:${index % 2 ? "1.5deg" : "-1.2deg"}">
    <b>${state.revealed.has(index) ? "见" : "未"}</b><span>${state.revealed.has(index) ? clue : "尚待翻阅相关奏折"}</span>
  </div>`).join("");
  const count = state.revealed.size;
  $("#contradictionBar").style.width = `${count / item.clues.length * 100}%`;
  $("#contradictionLevel").textContent = ["未察", "略有蹊跷", "疑点渐显", "互有攻讦", "矛盾昭然"][count];
}

function setReply(reply) {
  if (state.reviewed[state.activeId]) return;
  state.selectedReply = reply;
  $("#customReply").value = reply;
  $("#charCount").textContent = reply.length;
  $("#submitVerdict").disabled = !reply.trim();
  $$("#quickReplies button").forEach(btn => btn.classList.toggle("selected", btn.dataset.reply === reply));
}

function toggleDoubt() {
  if (state.reviewed[state.activeId]) return;
  if (state.doubts.has(state.activeId)) {
    state.doubts.delete(state.activeId);
    showToast("已取消留中标记");
  } else {
    state.doubts.add(state.activeId);
    showToast("已标为存疑，日结时将据此断案");
  }
  renderList();
  $("#bookmarkButton").classList.toggle("active", state.doubts.has(state.activeId));
}

function submitVerdict() {
  const m = currentMemorial();
  const reply = $("#customReply").value.trim();
  if (!reply || state.reviewed[m.id]) return;
  state.reviewed[m.id] = true;
  state.replies[m.id] = reply;

  const effectKey = ["阅", "知道了", "依议", "着查"].includes(reply) ? reply : inferCustomEffect(reply);
  const [authority, treasury, stability] = m.effects[effectKey] || [1, -1, 0];
  state.stats.authority = clamp(state.stats.authority + authority);
  state.stats.treasury = clamp(state.stats.treasury + treasury);
  state.stats.stability = clamp(state.stats.stability + stability);
  renderStats();
  renderPaper();
  renderList();
  updateProgress();
  showToast(`朱批已发：${reply}`);

  const next = currentCase().memorials.find(item => !state.reviewed[item.id]);
  if (next) setTimeout(() => selectMemorial(next.id), 1550);
}

function inferCustomEffect(reply) {
  if (/查|审|核|勘|拿问|严办/.test(reply)) return "着查";
  if (/准|依|照办|拨|可/.test(reply)) return "依议";
  if (/知|悉/.test(reply)) return "知道了";
  return "阅";
}

function updateProgress() {
  const reviewedCount = Object.keys(state.reviewed).length;
  const total = currentCase().memorials.length;
  const chineseNumbers = ["零", "一", "二", "三", "四", "五"];
  $("#reviewCounter").textContent = `${reviewedCount} / ${total}`;
  $("#progressText").textContent = reviewedCount === total ? "诸折已封" : `尚余${chineseNumbers[total - reviewedCount]}件`;
  $("#endDayButton").disabled = reviewedCount !== total;
}

function showSummary() {
  const item = currentCase();
  const suspiciousIds = item.memorials.filter(m => m.suspicious).map(m => m.id);
  const correct = suspiciousIds.filter(id => state.doubts.has(id)).length;
  const falseFlags = [...state.doubts].filter(id => !suspiciousIds.includes(id)).length;
  const investigationReplies = Object.values(state.replies).filter(r => inferCustomEffect(r) === "着查").length;
  const score = correct * 2 - falseFlags + investigationReplies;
  const grade = score >= 7 ? "明" : score >= 4 ? "慎" : score >= 2 ? "平" : "昏";
  const narrative = score >= 7 ? "陛下洞察奏牍相欺，命有司封账拿人，朝野皆知天听不壅。" : score >= 4 ? "陛下看出几处破绽，虽未尽得其情，已足使朋党不敢肆行。" : score >= 2 ? "今日处置尚称持重，但几道相互矛盾的证词仍被轻轻放过。" : "群臣窥知圣意宽纵，各自以华辞遮掩真相，案情反被党争吞没。";
  $("#summaryGrade").textContent = grade;
  $("#summaryTitle").textContent = score >= 4 ? "烛照幽隐" : "疑案未明";
  $("#summaryNarrative").textContent = narrative;
  $("#summaryStats").innerHTML = [
    ["威望", state.stats.authority - state.dayStartStats.authority],
    ["国帑", state.stats.treasury - state.dayStartStats.treasury],
    ["民心", state.stats.stability - state.dayStartStats.stability]
  ].map(([label, diff]) => `<div class="summary-stat"><span>${label}变化</span><b class="${diff >= 0 ? "good" : "bad"}">${diff >= 0 ? "+" : ""}${diff}</b></div>`).join("");
  $("#contradictionReview").innerHTML = `<b>本案真相</b><br>${item.contradiction}<br><br><b>你的判断</b><br>标出 ${state.doubts.size} 份存疑奏折，其中 ${correct} 份确有矛盾；下令核查 ${investigationReplies} 次。`;
  $("#summaryDialog").showModal();
}

function nextDay() {
  $("#summaryDialog").close();
  state.day += 1;
  state.caseIndex = (state.caseIndex + 1) % cases.length;
  state.dayStartStats = { ...state.stats };
  state.activeId = currentCase().memorials[0].id;
  state.filter = "all";
  state.reviewed = {};
  state.replies = {};
  state.doubts = new Set();
  state.revealed = new Set(currentMemorial().reveal);
  state.selectedReply = "";
  state.isOpen = true;
  $("#dayCount").textContent = `第 ${state.day} 日`;
  $("#eraDate").textContent = `承熙十二年 · ${dates[(state.day - 1) % dates.length]}`;
  $$(".filter").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === "all"));
  renderAll();
  setFoldState(true, false);
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("新一日奏折已送至御前");
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function renderAll() {
  renderStats();
  renderList();
  renderPaper();
  renderCase();
  updateProgress();
}

function bindEvents() {
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    $$(".filter").forEach(b => b.classList.toggle("active", b === btn));
    renderList();
  }));
  $$("#quickReplies button").forEach(btn => btn.addEventListener("click", () => setReply(btn.dataset.reply)));
  $("#customReply").addEventListener("input", event => {
    state.selectedReply = event.target.value;
    $("#charCount").textContent = event.target.value.length;
    $("#submitVerdict").disabled = !event.target.value.trim();
    $$("#quickReplies button").forEach(btn => btn.classList.toggle("selected", btn.dataset.reply === event.target.value));
  });
  $("#bookmarkButton").addEventListener("click", toggleDoubt);
  $("#closeFoldButton").addEventListener("click", () => setFoldState(false));
  $("#openFoldButton").addEventListener("click", () => setFoldState(true));
  $("#submitVerdict").addEventListener("click", submitVerdict);
  $("#endDayButton").addEventListener("click", showSummary);
  $("#nextDayButton").addEventListener("click", nextDay);
  $("#helpButton").addEventListener("click", () => $("#helpDialog").showModal());
  $("#closeHelp").addEventListener("click", () => $("#helpDialog").close());
  $("#startButton").addEventListener("click", () => {
    if ($("#skipIntro").checked) localStorage.setItem("memorial-intro-seen", "1");
    $("#welcomeDialog").close();
    setTimeout(() => setFoldState(true, false), 120);
  });
}

function init() {
  state.activeId = currentCase().memorials[0].id;
  currentMemorial().reveal.forEach(index => state.revealed.add(index));
  bindEvents();
  renderAll();
  setFoldState(false, false);
  if (!localStorage.getItem("memorial-intro-seen")) {
    $("#welcomeDialog").showModal();
  } else {
    setTimeout(() => setFoldState(true, false), 180);
  }
}

init();
}
