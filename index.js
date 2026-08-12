import './cases.js';

const MODULE_NAME = 'danchenlu';
const META_KEY = 'danchenlu_state';
const PROFILE_EXPORT_VERSION = 1;
const CASES = Array.isArray(window.danchenluMemorialCases) ? window.danchenluMemorialCases : [];
const INTRO_CASE_COUNT = CASES.length;
const GENERATED_CASE_TAG = 'dcl_generated_case';
const WORLD_CHANGE_TAG = 'dcl_world_change';
const PANEL_URL = new URL('./panel.html', import.meta.url);
const ASSET_ROOT = new URL('./assets/', import.meta.url);

const REGISTRY_LIMIT = 60;
const EDGES_LIMIT = 100;
const FACTIONS_LIMIT = 10;
const MAP_NODES_LIMIT = 16;
const EDGE_TYPES = new Set(['patron', 'cohort', 'kin', 'hostile', 'family']);
const PERSON_KINDS = new Set(['official', 'family', 'harem', 'case']);
const SEVERITY_LEVELS = ['高', '中', '低'];
const DYNAMIC_FACTION_COLORS = ['#6f8f6a', '#8a5f8f', '#5f7f8f', '#8f7a5f', '#7a8f5f', '#8f5f6a', '#5f8f85', '#8f6f5f'];
const PLACEHOLDER_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#3a3228"/><circle cx="32" cy="24" r="10" fill="#c8b48a"/><path d="M14 54c2-12 10-18 18-18s16 6 18 18z" fill="#c8b48a"/></svg>');
const PROVINCE_ZONES = Object.freeze({
  '京畿': { x: 53.5, y: 43 },
  '陇右': { x: 22, y: 46 },
  '河西': { x: 37, y: 28 },
  '西陲': { x: 29, y: 30 },
  '中州': { x: 48, y: 56 },
  '山东': { x: 66, y: 31 },
  '江东': { x: 79, y: 47 },
  '江南': { x: 72, y: 53 },
  '湖广': { x: 40, y: 73 },
  '岭南': { x: 61, y: 78 },
});

const PROVINCES = [
  { name: '京畿道', meta: '4 府 · 19 州 · 76 县', trend: '中枢章奏 128 起', severity: '案情密度：中' },
  { name: '西陲道', meta: '6 府 · 31 州 · 94 县', trend: '本年军报 36 起 ↑18%', severity: '案情密度：高' },
  { name: '江南道', meta: '8 府 · 52 州 · 201 县', trend: '本年上报案件 47 起 ↑23%', severity: '案情密度：高' },
];

const OFFICIALS = [
  { name: '沈敬修', office: '直隶总督', faction: '务实', rank: '正二品', origin: '河西道·临洮府', exam: '承熙二年进士', portrait: 1, x: 50, y: 47, reputation: '能臣干吏，赈务勤勉' },
  { name: '周秉正', office: '河间知县', faction: '清流', rank: '正七品', origin: '江东道·常州府', exam: '承熙八年进士', portrait: 12, x: 27, y: 24, reputation: '孤直敢言，不畏上官' },
  { name: '陆惟谦', office: '内阁首辅', faction: '务实', rank: '正一品', origin: '江南道·苏州府', exam: '景和末科进士', portrait: 2, x: 73, y: 25, reputation: '老成持重，门生满朝' },
  { name: '高文济', office: '左佥都御史', faction: '清流', rank: '正四品', origin: '山东道·济南府', exam: '承熙元年进士', portrait: 4, x: 19, y: 54, reputation: '铁面言官，风骨峻厉' },
  { name: '钱若谷', office: '户部侍郎', faction: '务实', rank: '正三品', origin: '中州道·开封府', exam: '承熙二年进士', portrait: 6, x: 79, y: 55, reputation: '精于财赋，谨小慎微' },
  { name: '岳崇烈', office: '定西将军', faction: '勋贵', rank: '从一品', origin: '京畿道', exam: '世袭武职', portrait: 3, x: 52, y: 79, reputation: '宿将威名，治军严整' },
  { name: '顾云开', office: '陕西巡抚', faction: '清流', rank: '从二品', origin: '湖广道', exam: '景和十八年进士', portrait: 5, x: 10, y: 31, reputation: '清介自守，边事持重' },
  { name: '韩守节', office: '御前监军', faction: '内廷', rank: '正四品', origin: '京畿道', exam: '内廷简拔', portrait: 7, x: 89, y: 32, reputation: '御前耳目，行踪难测' },
  { name: '方砚秋', office: '巡盐御史', faction: '清流', rank: '正五品', origin: '福建道', exam: '承熙六年进士', portrait: 8, x: 11, y: 73, reputation: '操守清严，盐商侧目' },
  { name: '汪鹤亭', office: '两淮盐运使', faction: '务实', rank: '从三品', origin: '江南道', exam: '承熙三年进士', portrait: 10, x: 89, y: 74, reputation: '长袖善舞，官商两通' },
  { name: '程万金', office: '扬州总商', faction: '盐商', rank: '布衣', origin: '江南道·扬州府', exam: '捐纳候选', portrait: 11, x: 33, y: 86, reputation: '豪商巨贾，手面阔绰' },
  { name: '许三保', office: '河间驿丞', faction: '无党', rank: '未入流', origin: '直隶', exam: '吏员出身', portrait: 9, x: 70, y: 88, reputation: '微末小吏，忠谨本分' },
];

const FAMILY_MEMBERS = [
  { official: 0, name: '裴毓贞', relation: '正妻', age: 46, origin: '河西裴氏', portrait: 'wife-01.webp', role: '总督府内账主事', motive: '守住赈务名声，也要查清谁借沈家的印信改了粮契。' },
  { official: 0, name: '沈令仪', relation: '长女', age: 22, origin: '沈氏本家', portrait: 'daughter-01.webp', role: '待字闺中，通仓储算学', motive: '能看懂仓票与折色，反感父亲把家眷隔绝在案情之外。' },
  { official: 0, name: '柳素弦', relation: '妾室', age: 31, origin: '临洮商户', portrait: 'concubine-01.webp', role: '掌外庄书信', motive: '出身粮商，知道借粮商号的旧账，但先保护自己的弟弟。' },
  { official: 1, name: '许兰因', relation: '正妻', age: 34, origin: '常州许氏', portrait: 'wife-02.webp', role: '知县内眷', motive: '替周秉正誊过密折底稿，最怕越级上奏牵连全家。' },
  { official: 1, name: '周小棠', relation: '独女', age: 19, origin: '周氏本家', portrait: 'daughter-02.webp', role: '随任河间', motive: '亲眼见过灾民领粮，记得官仓门前与账册不符的人数。' },
  { official: 2, name: '姚静徽', relation: '正妻', age: 56, origin: '江南姚氏', portrait: 'wife-03.webp', role: '首辅府宗妇', motive: '维持陆氏与江南士绅的往来，不替丈夫承担门生的私债。' },
  { official: 2, name: '陆明珠', relation: '长女', age: 27, origin: '陆氏本家', portrait: 'daughter-03.webp', role: '嫁入汪氏', motive: '夹在父家与夫家之间，会隐瞒私情，却不愿盐案吞掉两家。', connections: [{ official: 9, label: '婚入汪氏' }] },
  { official: 2, name: '陈疏影', relation: '侧室', age: 38, origin: '苏州乐籍赎身', portrait: 'concubine-02.webp', role: '掌内院往来帖', motive: '熟悉首辅府谁能越过门房递信，以消息换取安稳。' },
  { official: 3, name: '崔素屏', relation: '正妻', age: 43, origin: '济南崔氏', portrait: 'wife-04.webp', role: '都御史府内眷', motive: '保存丈夫历年弹章副本，重证据，也清楚清名能伤人。' },
  { official: 3, name: '高素问', relation: '长女', age: 20, origin: '高氏本家', portrait: 'daughter-04.webp', role: '协理京中义诊', motive: '从伤患口中听到河工役夫的不同证词，不肯把传闻当铁证。' },
  { official: 4, name: '宋宜春', relation: '正妻', age: 45, origin: '开封宋氏', portrait: 'wife-05.webp', role: '钱府田庄总理', motive: '嫁资与户部往来银号相连，维护家产但拒绝替亏空填账。' },
  { official: 4, name: '钱令嘉', relation: '次女', age: 23, origin: '钱氏本家', portrait: 'daughter-05.webp', role: '掌嫁资账册', motive: '发现一笔没有收货人的赈银兑票，想先确认父亲是否知情。' },
  { official: 4, name: '孙柔嘉', relation: '妾室', age: 29, origin: '京畿小吏之家', portrait: 'concubine-03.webp', role: '掌钱府药材采买', motive: '兄长在户部书办房任职，她的安全取决于账目没有被追到娘家。' },
  { official: 5, name: '杜明霜', relation: '正妻', age: 42, origin: '京畿武勋杜氏', portrait: 'wife-06.webp', role: '将军府主母', motive: '亲自核发阵亡抚恤，不能容忍有人用死人名册冒领军饷。' },
  { official: 5, name: '岳含章', relation: '长女', age: 21, origin: '岳氏本家', portrait: 'daughter-06.webp', role: '协理军眷名册', motive: '会骑射也会核册，忠于父亲但不会替失踪士卒造假。' },
  { official: 6, name: '叶端容', relation: '正妻', age: 40, origin: '湖广叶氏', portrait: 'wife-07.webp', role: '巡抚家眷留京', motive: '维系顾家在京关系，担心清流同僚把丈夫推成替罪羊。' },
  { official: 6, name: '顾清和', relation: '长女', age: 18, origin: '顾氏本家', portrait: 'daughter-07.webp', role: '随母居京', motive: '替母亲整理边地家书，能辨认被拆封后重新粘合的信封。' },
  { official: 7, name: '魏秋蘅', relation: '正妻', age: 38, origin: '京畿魏氏', portrait: 'wife-08.webp', role: '监军府内眷', motive: '知道丈夫依赖御前信任，不愿让内廷密报变成私斗工具。' },
  { official: 7, name: '韩绛雪', relation: '独女', age: 19, origin: '韩氏本家', portrait: 'daughter-08.webp', role: '候选宫学女官', motive: '从内廷女眷处听到战报递送时差，但不肯轻易泄露消息源。' },
  { official: 8, name: '林知微', relation: '正妻', age: 36, origin: '福建林氏', portrait: 'wife-09.webp', role: '巡盐御史家眷', motive: '娘家经营海运，既能核航程，也怕盐案牵出林氏船队。' },
  { official: 8, name: '方幼宁', relation: '长女', age: 18, origin: '方氏本家', portrait: 'daughter-09.webp', role: '随任扬州', motive: '抄录过父亲没收的船引，记得六张重号盐引的纸纹不同。' },
  { official: 9, name: '薛蕴华', relation: '正妻', age: 46, origin: '江南薛氏', portrait: 'wife-10.webp', role: '运使府主母', motive: '主持官眷宴饮，知道谁与盐商私交，却优先保全儿媳陆明珠。' },
  { official: 9, name: '汪清漪', relation: '长女', age: 24, origin: '汪氏本家', portrait: 'daughter-10.webp', role: '掌女眷礼单', motive: '礼单能串起官商馈送，她会区分人情与真正的利益输送。' },
  { official: 9, name: '苏月蘅', relation: '妾室', age: 30, origin: '扬州书商之家', portrait: 'concubine-04.webp', role: '掌运使私库钥匙', motive: '握有一把不在公册上的库钥，谋求让亲生子脱离盐务。' },
  { official: 10, name: '吴宝娘', relation: '正妻', age: 49, origin: '扬州吴氏', portrait: 'wife-11.webp', role: '程氏商号共同东主', motive: '程家第一笔本钱出自她的嫁资，她比丈夫更清楚每笔暗股。' },
  { official: 10, name: '程湘君', relation: '长女', age: 22, origin: '程氏本家', portrait: 'daughter-11.webp', role: '商号账房总核', motive: '擅长辨认账房笔迹，想保商号而不是无条件保父亲。' },
  { official: 10, name: '秦采薇', relation: '妾室', age: 26, origin: '泰州牙行之家', portrait: 'concubine-05.webp', role: '掌客院与礼物登记', motive: '知道哪些礼盒只是空壳，准备以真账换自己离开程府。' },
  { official: 11, name: '赵春娘', relation: '正妻', age: 39, origin: '直隶民户', portrait: 'wife-12.webp', role: '驿舍内外管事', motive: '管马料、灶房与脚夫工钱，比许三保更早察觉异常驿使。' },
  { official: 11, name: '许小满', relation: '独女', age: 18, origin: '许氏本家', portrait: 'daughter-12.webp', role: '驿舍记时与收牌', motive: '记得每匹急递马归槽时辰，能证明一封文书是否真走了六百里加急。' },
];

const HAREM_MEMBERS = [
  {
    id: 'empress', name: '姜明徽', rank: '皇后', age: 36, palace: '凤仪宫', portrait: 'empress-01.webp',
    origin: '京畿姜氏，已故太傅姜彦之女', standing: '中宫正位', duty: '统摄六宫、核验宫账、主持祭祀与命妇朝见',
    publicFace: '端凝守礼，少以喜怒示人；凡宫务先问旧例、凭据与经手人。',
    core: '她相信规矩必须能约束最得势的人，也明白过分倚重规矩会让真实苦衷无处申说。',
    motive: '守住中宫裁处的公信力，使后宫不成为前朝派系的第二座衙门。',
    fear: '最忌有人绕过宫规借御前私恩处置他人，也警惕姜氏旧门生借她的名义求进。',
    knows: '宫账、女官任免、命妇请见与公开赏赐；不自动知晓密折和外朝密议。',
    voice: '语速平稳，先问事实再表态；维护体面，但不会用空泛贤德压住争议。',
  },
  {
    id: 'noble-consort', name: '容韶华', rank: '贵妃', age: 28, palace: '昭阳宫', portrait: 'noble-consort-02.webp',
    origin: '河西将门容氏，父兄久镇西陲', standing: '协理六宫', duty: '协理宫宴、节赏与内廷骑射仪典',
    publicFace: '明艳爽利，敢当面追问含糊之处；受礼也受得坦然，不故作谦退。',
    core: '她珍视家门与边军，却拒绝被家族当作替战报背书的宫中凭证。',
    motive: '保住容氏将门的体面，同时证明自己的判断不附属于父兄。',
    fear: '怕边事一败便被视为勋贵耳目，也怕御前只把她当作一时新鲜。',
    knows: '宫宴往来、勋贵命妇消息和公开军功传闻；未获明示时不知道御前密报。',
    voice: '措辞直接而不失礼，高兴时会笑，受疑时先索要证据而非哭诉。',
  },
  {
    id: 'virtuous-consort', name: '谢云蘅', rank: '贤妃', age: 27, palace: '永和宫', portrait: 'virtuous-consort-03.webp',
    origin: '江南谢氏，母族经营书坊与药材行', standing: '四妃之首', duty: '掌宫学、典籍修补与太医院女科药册',
    publicFace: '温静细致，常从纸张、墨色、药性和抄写习惯里发现不合常理之处。',
    core: '她擅长旁观与求证，却担心每一次说出真相都把亲近之人推到风口。',
    motive: '让宫学和药册成为真正可追溯的记录，而非替权势润色的清名。',
    fear: '母族商路与盐务有旧往来；她不愿包庇，也不愿仅凭出身被定罪。',
    knows: '宫学名册、药材采买、书坊纸墨与女眷间可核实的往来。',
    voice: '少作断言，常指出一处可复核的细节；温和不等于顺从。',
  },
  {
    id: 'zhaoyi', name: '唐映微', rank: '昭仪', age: 24, palace: '披香殿', portrait: 'zhaoyi-04.webp',
    origin: '山东寒门进士之家，选秀入宫', standing: '九嫔之首', duty: '协管女官考校、节令诗笺与内廷文书誊录',
    publicFace: '仪态清整，记性极好；在人前守分寸，遇到轻慢会用准确措辞当场纠正。',
    core: '她想凭才干站稳，却知道越显得有用，越容易成为别人安插文书的手。',
    motive: '为寒门出身的女官争得按才考校的路径，也给自己留下一席可信的位置。',
    fear: '最怕被推去传递不该经手的消息，事后又成为唯一可弃的证人。',
    knows: '公开诏令副本、女官轮值、誊录笔迹和宫门收发时刻。',
    voice: '言辞简洁，讲究名分与措辞；被逼迫时会先指出程序漏洞。',
  },
  {
    id: 'beauty', name: '乔棠梨', rank: '美人', age: 21, palace: '蘅芜苑', portrait: 'beauty-05.webp',
    origin: '江南织造属官之家，今春新入宫', standing: '新承恩眷', duty: '随班习礼，偶在春宴献舞并协辨香料与织样',
    publicFace: '鲜活爱笑，擅长记住人的衣香、口音与小动作；不把天真当成无知。',
    core: '她享受被看见，又担心所有人只把她当作漂亮而安全的摆设。',
    motive: '先在陌生宫廷中保住选择权，再弄清谁是真心相助、谁在借她递话。',
    fear: '位卑使她难以拒绝高位者的差遣；她尤其怕一句无心传话牵连旧家。',
    knows: '新入宫女眷的闲谈、衣料香品、宴席座次与亲眼所见；消息真假需复核。',
    voice: '语气轻快但观察具体；紧张时会转谈细节，不用撒娇替代判断。',
  },
];

const HAREM_IDS = new Set(HAREM_MEMBERS.map(member => member.id));

const PROFILE_FIELDS = {
  official: [
    ['name', '姓名'], ['office', '官职'], ['faction', '派系'], ['rank', '品秩'], ['origin', '籍贯'], ['exam', '入仕'],
    ['reputation', '朝野风评'], ['publicFace', '外在行事'], ['core', '内在矛盾'], ['motive', '主要动机'], ['fear', '所惧与红线'], ['knows', '信息边界'], ['voice', '说话方式'],
  ],
  family: [
    ['name', '姓名'], ['relation', '关系'], ['age', '年龄'], ['origin', '出身'], ['role', '身份与职责'], ['motive', '所求与所惧'], ['knows', '信息边界'], ['voice', '说话方式'],
  ],
  harem: [
    ['name', '姓名'], ['rank', '位份'], ['age', '年龄'], ['palace', '宫居'], ['origin', '出身'], ['standing', '宫中地位'], ['duty', '所掌宫务'],
    ['publicFace', '仪态与行事'], ['core', '内在矛盾'], ['motive', '主要动机'], ['fear', '所惧与红线'], ['knows', '信息边界'], ['voice', '说话方式'],
  ],
  dynamic: [
    ['name', '姓名'], ['office', '官职'], ['rank', '品秩'], ['faction', '派系'], ['origin', '籍贯'], ['role', '身份与职责'],
    ['reputation', '朝野风评'],
    ['publicFace', '外在行事'], ['core', '内在矛盾'], ['motive', '主要动机'], ['fear', '所惧与红线'], ['knows', '信息边界'], ['voice', '说话方式'],
  ],
};

const OFFICIAL_PERSONAS = [
  ['外圆内稳，遇急务先分清人命、钱粮与程序的先后。', '愿替地方担责，却容易把能运转当作正当，低估惯例里藏着的侵吞。', '保住河防与赈务，不让一场清查先毁掉地方运转。', '最怕赈灾失控与属员借他的名义营私同时坐实。', '知道直隶公开河工、总督衙门账册和属员回报；不知御前密折原文。', '陈述简明，先给可执行办法；受疑时交账册而非先诉忠心。'],
  ['克制认真，对日期、人数和收发手续异常敏感。', '相信越级上奏是守土之责，也担心自己的清名使家人与证人先受牵连。', '让灾民实领与官仓账目被朝廷看见。', '最怕密折泄露后证据未到、全家先被地方拿住。', '知道河间亲见灾情、县衙底册和自己经手的密折；不知总督府全部安排。', '措辞谨慎而具体，会区分亲见、听闻与推断。'],
  ['从容守制，习惯把激烈主张改写成可执行的朝廷程序。', '重视秩序与中枢信用，却可能为了避免朝局震荡而容忍灰色妥协。', '维持内阁能协调各部并承担票拟责任。', '最怕御令含糊导致各方各取所需，也怕门生故旧败坏首辅公信。', '知道公开题本、票拟和内阁往来；不自动知道密折与御前私议。', '语气平稳，常提出程序代价，不以拖延冒充中立。'],
  ['锋利重证，宁可暂缓定罪也不肯让关键账册流失。', '相信清查能保护制度，却清楚清名和弹章同样可能被当作兵器。', '把可复核证据留在案卷，让权势不能靠口供脱身。', '最怕证据链被政治口号替代，也怕自己误伤无辜。', '知道都察院弹章、扣押文册与公开讯问；不知未获授权的密报。', '追问短而准，先问证据来源、经手人与时间。'],
  ['精于财赋，习惯计算一道旨意会卡在哪个银号、仓口与文书环节。', '愿维持国用，却容易先把损失视作可摊平的数字，之后才看见具体的人。', '保住财政周转并查清银粮去向。', '最怕停拨引发动荡，也怕多年便利做法被证明就是亏空通道。', '知道户部拨款、牌票和公开财册；不知地方暗账与密折。', '先报成本和时限，再给选择；被质疑时会要求对账。'],
  ['直率果断，把军令、补给和士卒生死看得比文饰体面更重。', '珍惜战功与军心，却可能因怕朝廷迟疑而把败讯压成可承受的数字。', '守住边线并让军队得到足额粮饷。', '最怕军心因欠饷崩溃，也怕虚报被坐实后真实战功一并抹去。', '知道本部战况、军粮和将领回报；不知监军密折全文。', '军令式短句，谈损失时给数字，不靠豪言掩盖补给问题。'],
  ['清峻寡言，善从地方官回报之间找出时间差。', '想守住清议与边务真实，却担心同道把复杂局势推成一场表态竞赛。', '让边地责任落实到经手者而非抽象派系。', '最怕证据未明便拿人，反使真正账册被毁。', '知道巡抚衙门与地方公开军政回报；不知御前密报。', '少形容，多列事实；反对时会给替代执行步骤。'],
  ['谨慎敏锐，习惯记录递送时刻和口供前后差异。', '依赖御前信任才能制衡边将，也担心密报制度沦为内廷私斗。', '让皇帝得到不经地方修饰的边情。', '最怕消息源暴露和监军被视为只会掣肘军务。', '知道自己查得的军营情况、密折与内廷递送；不知边将全部私令。', '低声陈明差异，明确哪些是亲验、哪些是线报。'],
  ['冷静细密，对纸纹、编号、航程和盐引流转极敏感。', '相信编号能揭穿人情网，却知道娘家海运背景会使自己的证据先被怀疑。', '查出重号盐引与暗股链条。', '最怕证据被说成派系攻讦，也怕牵连无关船户。', '知道巡盐查验、扣押盐引与公开商册；不知运使私库全貌。', '语言克制，常指出一项可复验的物证。'],
  ['圆熟周到，善于维持官商之间不写在公文里的日常秩序。', '认为财赋需要地方合作，却容易把多年互惠当成理所当然的权限。', '保住盐运收入与官府信用。', '最怕查案使盐路停摆，也怕私库和礼单相互印证。', '知道盐运衙门、公引与常例往来；不知御史私下掌握的全部证据。', '答话周全，先解释惯例；被追紧时才区分公账与私账。'],
  ['热络豪爽，谈买卖时比官员更直接。', '把商号存续视为数百人饭碗，也会以此为自己暗股和送礼辩护。', '保住程氏商号与盐路经营资格。', '最怕官府把所有人情支出定成行贿，也怕真账落入对手。', '知道商号内账、牙行和送礼登记；不知官员之间的密议。', '口气实在，爱报成本与行情；受压时会拿行业后果谈条件。'],
  ['不起眼却记性极好，靠马匹、牌符和灶房时辰判断驿递真假。', '想保住小吏饭碗，又厌恶上级把伪造递送全推到驿站。', '证明每封急递真实经过与经手人。', '最怕权贵灭口，也怕如实作证牵连妻女。', '知道河间驿舍的马牌、脚夫、到离时刻；不知道文书内文。', '说话朴直，以具体时刻和人名作答，不擅长揣测朝局。'],
];

OFFICIALS.forEach((person, index) => {
  const persona = OFFICIAL_PERSONAS[index] ?? [];
  [person.publicFace, person.core, person.motive, person.fear, person.knows, person.voice] = persona;
});

FAMILY_MEMBERS.forEach(member => {
  member.knows ??= `只知道本人亲见、经手的${member.role}相关事务、家书与可靠私交；不自动知道亲属的奏折、密折或全部公务。`;
  member.voice ??= '依其出身与职责自然说话，能区分亲见、转述与猜测；不会只替亲属辩护。';
});

const PROFILE_DEFAULTS = Object.freeze({
  official: OFFICIALS.map(person => deepClone(person)),
  family: FAMILY_MEMBERS.map(member => deepClone(member)),
  harem: HAREM_MEMBERS.map(member => deepClone(member)),
});

const NETWORK_EDGES = [
  [0, 1, 'hostile', '压报互讦'], [0, 2, 'patron', '首辅荐举'], [0, 3, 'hostile', '河工弹劾'], [0, 4, 'cohort', '同科进士'],
  [0, 5, 'kin', '姻亲通家'], [1, 3, 'patron', '言官援引'], [1, 6, 'cohort', '同乡'], [2, 4, 'patron', '座主门生'],
  [2, 7, 'hostile', '票拟冲突'], [2, 9, 'kin', '姻亲'], [3, 6, 'cohort', '都察院同僚'], [3, 8, 'patron', '荐举巡盐'],
  [4, 9, 'cohort', '财赋同僚'], [5, 7, 'hostile', '军饷互讦'], [5, 11, 'patron', '驿传旧部'], [8, 9, 'hostile', '盐案攻讦'],
  [9, 10, 'patron', '官商关照'], [10, 2, 'patron', '岁馈门包'], [10, 8, 'hostile', '索银反目'], [11, 1, 'cohort', '灾情递报'],
];

const DEFAULT_STATE = Object.freeze({
  schemaVersion: 6,
  day: 1,
  phase: 'intro',
  caseIndex: 0,
  dynamicCase: null,
  peopleRegistry: [],
  dynamicEdges: [],
  dynamicFactions: [],
  mapNodes: [],
  worldLog: [],
  staticFactionInfluence: { '清流': 42, '务实': 28, '勋贵': 17, '内廷': 13 },
  invasion: { enabled: false, triggered: false, triggerDay: 15, result: null },
  casualties: { officials: [], harem: [] },
  harem: { selectedId: 'empress', visits: {}, log: [], removed: [] },
  freeplay: { awaiting: false, pendingDay: null, lastError: '', generatedCount: 0 },
  activeId: CASES[0]?.memorials?.[0]?.id ?? null,
  filter: 'all',
  view: 'map',
  open: false,
  stats: { authority: 62, treasury: 54, stability: 58 },
  reviewed: {},
  replies: {},
  dispatched: {},
  doubts: [],
  history: [],
  profileOverrides: { official: {}, family: {}, harem: {} },
});

let panelReady = false;
let toastTimer = 0;
let initialized = false;
let bodyOverflowBefore = '';
let selectedOfficialIndex = 0;
let networkMode = 'officials';
let dragState = null;
let panelResizeTimer = 0;
let profileEditorTarget = null;
let selectedOfficialRef = '0';

const MOBILE_LAYOUT = '(max-width: 820px)';
const PANEL_EDGE_GAP = 10;
const LAUNCHER_POSITION_KEY = 'danchenlu_launcher_position_v1';
const LAUNCHER_EDGE_GAP = 8;

function context() {
  return globalThis.SillyTavern?.getContext?.();
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function activeCharacterConfig() {
  const ctx = context();
  if (!ctx || ctx.groupId || ctx.characterId === undefined) return null;
  const character = ctx.characters?.[ctx.characterId];
  return character?.data?.extensions?.[MODULE_NAME]
    ?? character?.extensions?.[MODULE_NAME]
    ?? null;
}

function isActiveCard() {
  return Boolean(activeCharacterConfig()?.enabled);
}

function normalizeState(input) {
  const base = deepClone(DEFAULT_STATE);
  const state = input && typeof input === 'object' ? input : {};
  const sourceVersion = clampInt(state.schemaVersion, 1, 6, 1);
  base.schemaVersion = 6;
  base.day = clampInt(state.day, 1, 9999, 1);
  base.dynamicCase = normalizeGeneratedCase(state.dynamicCase, base.day);
  base.phase = state.phase === 'freeplay' && base.dynamicCase ? 'freeplay' : 'intro';
  base.caseIndex = clampInt(state.caseIndex, 0, Math.max(0, CASES.length - 1), 0);
  const legacyPeople = sourceVersion < 6 && base.dynamicCase?.people ? base.dynamicCase.people : [];
  base.peopleRegistry = normalizeRegistryPeople([
    ...(Array.isArray(state.peopleRegistry) ? state.peopleRegistry : []),
    ...legacyPeople,
  ], base.day);
  base.dynamicEdges = normalizeDynamicEdges(state.dynamicEdges, base.day);
  base.dynamicFactions = normalizeDynamicFactions(state.dynamicFactions, base.day);
  base.mapNodes = normalizeMapNodes(state.mapNodes, base.day);
  base.staticFactionInfluence = Object.fromEntries(['清流', '务实', '勋贵', '内廷'].map(name => [
    name,
    clampInt(state.staticFactionInfluence?.[name], 0, 100, { '清流': 42, '务实': 28, '勋贵': 17, '内廷': 13 }[name]),
  ]));
  base.invasion = {
    enabled: state.invasion?.enabled === true,
    triggered: state.invasion?.triggered === true,
    triggerDay: clampInt(state.invasion?.triggerDay, 1, 9999, 15),
    result: state.invasion?.result && typeof state.invasion.result === 'object' ? state.invasion.result : null,
  };
  base.casualties = {
    officials: Array.isArray(state.casualties?.officials) ? [...new Set(state.casualties.officials.map(name => cleanGeneratedText(name, 40)).filter(Boolean))] : [],
    harem: Array.isArray(state.casualties?.harem) ? [...new Set(state.casualties.harem.map(name => cleanGeneratedText(name, 40)).filter(Boolean))] : [],
  };
  base.worldLog = Array.isArray(state.worldLog)
    ? state.worldLog
        .filter(entry => entry && typeof entry === 'object')
        .map(entry => ({
          messageId: clampInt(entry.messageId, 0, 999999, null),
          fingerprint: String(entry.fingerprint ?? '').slice(0, 80),
          day: clampInt(entry.day, 1, 9999, base.day),
          people: Array.isArray(entry.people) ? entry.people.map(name => cleanGeneratedText(name, 40)).filter(Boolean) : [],
          edges: Array.isArray(entry.edges) ? entry.edges.map(key => String(key).slice(0, 120)) : [],
          factions: Array.isArray(entry.factions) ? entry.factions.map(id => cleanGeneratedText(id, 60)).filter(Boolean) : [],
          nodes: Array.isArray(entry.nodes) ? entry.nodes.map(id => cleanGeneratedText(id, 60)).filter(Boolean) : [],
        }))
        .filter(entry => entry.messageId !== null && entry.fingerprint)
        .slice(-40)
    : [];
  const activeCase = base.phase === 'freeplay' ? base.dynamicCase : CASES[base.caseIndex];
  const validMemorialIds = new Set(activeCase?.memorials?.map(item => item.id) ?? []);
  base.activeId = typeof state.activeId === 'string' && validMemorialIds.has(state.activeId) ? state.activeId : activeCase?.memorials?.[0]?.id ?? null;
  base.filter = ['all', 'formal', 'secret'].includes(state.filter) ? state.filter : 'all';
  base.view = ['map', 'desk', 'officials', 'harem', 'profiles', 'factions', 'archive'].includes(state.view) ? state.view : 'map';
  base.open = state.open === true;
  base.stats.authority = clampInt(state.stats?.authority, 0, 100, 62);
  base.stats.treasury = clampInt(state.stats?.treasury, 0, 100, 54);
  base.stats.stability = clampInt(state.stats?.stability, 0, 100, 58);
  base.reviewed = Object.fromEntries(Object.entries(plainRecord(state.reviewed))
    .filter(([id, value]) => validMemorialIds.has(id) && value === true));
  base.replies = Object.fromEntries(Object.entries(plainRecord(state.replies))
    .filter(([id, value]) => validMemorialIds.has(id) && typeof value === 'string')
    .map(([id, value]) => [id, value.slice(0, 80)]));
  const storedDispatched = Object.fromEntries(Object.entries(plainRecord(state.dispatched))
    .filter(([id, value]) => validMemorialIds.has(id) && value === true));
  base.dispatched = sourceVersion < 2 ? deepClone(base.reviewed) : storedDispatched;
  base.doubts = [...new Set(Array.isArray(state.doubts)
    ? state.doubts.filter(id => typeof id === 'string' && validMemorialIds.has(id))
    : [])].slice(-30);
  base.history = Array.isArray(state.history) ? state.history.filter(x => x && typeof x === 'object').slice(-12) : [];
  const registryHaremIds = new Set(base.peopleRegistry.filter(item => item.kind === 'harem').map(item => item.name));
  const allowedConsortIds = new Set([...HAREM_IDS, ...registryHaremIds]);
  base.harem.removed = Array.isArray(state.harem?.removed)
    ? [...new Set(state.harem.removed.map(name => cleanGeneratedText(name, 40)).filter(Boolean))]
    : [];
  const inactiveHarem = new Set([...(base.casualties?.harem ?? []), ...base.harem.removed]);
  const activeConsortIds = [...allowedConsortIds].filter(id => {
    const memberName = HAREM_MEMBERS.find(member => member.id === id)?.name ?? base.peopleRegistry.find(item => item.name === id)?.name;
    return !inactiveHarem.has(memberName);
  });
  base.harem.selectedId = activeConsortIds.includes(state.harem?.selectedId) ? state.harem.selectedId : (activeConsortIds[0] ?? 'empress');
  base.harem.visits = Object.fromEntries(Object.entries(plainRecord(state.harem?.visits))
    .filter(([id, value]) => allowedConsortIds.has(id) && value && typeof value === 'object')
    .map(([id, value]) => [id, {
      count: clampInt(value.count, 0, 9999, 0),
      lastDay: value.lastDay === null || value.lastDay === undefined ? null : clampInt(value.lastDay, 1, 9999, null),
      lastType: ['summon', 'dine'].includes(value.lastType) ? value.lastType : null,
    }]));
  base.harem.log = (Array.isArray(state.harem?.log) ? state.harem.log : [])
    .filter(item => item && allowedConsortIds.has(item.consortId) && ['summon', 'dine'].includes(item.type))
    .map(item => ({ day: clampInt(item.day, 1, 9999, 1), consortId: item.consortId, type: item.type }))
    .slice(-12);
  base.profileOverrides = normalizeProfileOverrides(state.profileOverrides);
  base.freeplay.awaiting = state.freeplay?.awaiting === true;
  base.freeplay.pendingDay = state.freeplay?.pendingDay === null || state.freeplay?.pendingDay === undefined
    ? null : clampInt(state.freeplay.pendingDay, 2, 9999, null);
  base.freeplay.lastError = String(state.freeplay?.lastError ?? '').slice(0, 160);
  base.freeplay.generatedCount = clampInt(state.freeplay?.generatedCount, 0, 9999, 0);
  if (!currentCase(base)?.memorials.some(m => m.id === base.activeId)) {
    base.activeId = currentCase(base)?.memorials?.[0]?.id ?? null;
  }
  return base;
}

function cleanGeneratedText(value, maxLength = 240) {
  return String(value ?? '').replaceAll(/<[^>]*>/g, '').replaceAll(/[\u0000-\u001f]/g, ' ').trim().slice(0, maxLength);
}

function normalizeGeneratedCase(value, day) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const rawMemorials = Array.isArray(value.memorials) ? value.memorials.slice(0, 5) : [];
  if (rawMemorials.length < 3) return null;
  const memorials = rawMemorials.map((item, index) => {
    const type = item?.type === 'secret' ? 'secret' : 'formal';
    const body = (Array.isArray(item?.body) ? item.body : [item?.body]).slice(0, 3)
      .map(part => cleanGeneratedText(part, 700)).filter(Boolean);
    if (!body.length) body.push('此折正文残缺，须命通政司补录原件。');
    return {
      id: `free-${clampInt(day, 1, 9999, 1)}-${index + 1}`,
      type,
      region: cleanGeneratedText(item?.region, 60) || '京师',
      title: cleanGeneratedText(item?.title, 80) || `第${index + 1}道待核奏折`,
      lead: cleanGeneratedText(item?.lead, 100) || '案情待核',
      sender: cleanGeneratedText(item?.sender, 40) || '通政司代呈',
      office: cleanGeneratedText(item?.office, 60) || '官职待核',
      date: cleanGeneratedText(item?.date, 30) || `第${day}日`,
      time: cleanGeneratedText(item?.time, 30) || '辰时入递',
      body,
      cabinet: type === 'secret' ? null : cleanGeneratedText(item?.cabinet, 180) || '拟请圣裁。',
      reveal: [...new Set((Array.isArray(item?.reveal) ? item.reveal : []).map(value => clampInt(value, 0, 7, 0)))].slice(0, 5),
      suspicious: item?.suspicious === true,
      effects: {
        '阅': [0, 0, -1], '知道了': [0, 0, 0], '依议': [1, -2, 0], '着查': [2, -1, 1],
      },
    };
  });
  const people = (Array.isArray(value.people) ? value.people : []).slice(0, 8).map(item => ({
    name: cleanGeneratedText(item?.name, 40),
    kind: PERSON_KINDS.has(item?.kind) ? item.kind : 'official',
    rank: cleanGeneratedText(item?.rank, 20) || '品秩待核',
    faction: cleanGeneratedText(item?.faction, 30) || '未定',
    origin: cleanGeneratedText(item?.origin, 60) || '',
    role: cleanGeneratedText(item?.role, 60) || '',
    reputation: cleanGeneratedText(item?.reputation, 80) || '',
    palace: cleanGeneratedText(item?.palace, 30) || '',
    standing: cleanGeneratedText(item?.standing, 40) || '',
    duty: cleanGeneratedText(item?.duty, 80) || '',
    portrait: cleanGeneratedText(item?.portrait, 80) || '',
    office: cleanGeneratedText(item?.office, 60),
    stance: cleanGeneratedText(item?.stance, 80) || '立场待察',
    tone: ['hostile', 'neutral'].includes(item?.tone) ? item.tone : 'neutral',
    publicFace: cleanGeneratedText(item?.publicFace, 220),
    core: cleanGeneratedText(item?.core, 220),
    motive: cleanGeneratedText(item?.motive, 220),
    fear: cleanGeneratedText(item?.fear, 220),
    knows: cleanGeneratedText(item?.knows, 240),
    voice: cleanGeneratedText(item?.voice, 180),
  })).filter(item => item.name);
  if (!people.length) memorials.slice(0, 3).forEach(item => people.push({ name: item.sender, office: item.office, stance: '具折陈奏', tone: 'neutral' }));
  return {
    id: `free-day-${clampInt(day, 1, 9999, 1)}`,
    title: cleanGeneratedText(value.title, 90) || `承熙朝第${day}日朝政`,
    summary: cleanGeneratedText(value.summary, 220) || '通政司送来数道互有关联的新折。',
    rumor: cleanGeneratedText(value.rumor, 180),
    clues: (Array.isArray(value.clues) ? value.clues : []).slice(0, 8).map(item => cleanGeneratedText(item, 120)).filter(Boolean),
    contradiction: cleanGeneratedText(value.contradiction, 500) || '各折在时序、数字或利益关系上存在尚未查明的冲突。',
    people,
    memorials,
    generated: true,
  };
}

function extractWorldChanges(value, day) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { people: [], edges: [], factions: [], nodes: [] };
  return {
    people: Array.isArray(value.people) ? value.people : [],
    edges: Array.isArray(value.relations) ? value.relations : [],
    factions: Array.isArray(value.factions) ? value.factions : [],
    nodes: Array.isArray(value.nodes) ? value.nodes : [],
  };
}

function normalizeRegistryPeople(value, day) {
  const byName = new Map();
  const staticNames = new Set(OFFICIALS.map(person => person.name));
  (Array.isArray(value) ? value : []).forEach(item => {
    if (!item || typeof item !== 'object') return;
    const name = cleanGeneratedText(item.name, 40);
    if (!name || staticNames.has(name)) return;
    const previous = byName.get(name);
    const seen = clampInt(item.lastSeenDay ?? item.day ?? day, 1, 9999, day);
    const isHarem = item.kind === 'harem' || previous?.kind === 'harem';
    const merged = {
      kind: PERSON_KINDS.has(item.kind) ? item.kind : (previous?.kind ?? 'official'),
      id: name,
      name,
      office: cleanGeneratedText(item.office, 60) || previous?.office || '官职待核',
      rank: cleanGeneratedText(item.rank, 20) || previous?.rank || (isHarem ? '宫人' : '品秩待核'),
      faction: cleanGeneratedText(item.faction, 30) || previous?.faction || '未定',
      origin: cleanGeneratedText(item.origin, 60) || previous?.origin || '',
      role: cleanGeneratedText(item.role, 60) || previous?.role || '',
      reputation: cleanGeneratedText(item.reputation, 80) || previous?.reputation || '风评未显',
      age: clampInt(item.age, 18, 99, previous?.age ?? null),
      palace: isHarem ? (cleanGeneratedText(item.palace, 30) || previous?.palace || '待定宫居') : previous?.palace ?? '',
      standing: isHarem ? (cleanGeneratedText(item.standing, 40) || previous?.standing || '新涉宫人') : previous?.standing ?? '',
      duty: isHarem ? (cleanGeneratedText(item.duty, 80) || previous?.duty || '宫务待核') : previous?.duty ?? '',
      portrait: (typeof item.portrait === 'string' && item.portrait.startsWith('data:image/')
        ? item.portrait.slice(0, 400000)
        : cleanGeneratedText(item.portrait, 80)) || previous?.portrait || '',
      publicFace: cleanGeneratedText(item.publicFace, 220) || previous?.publicFace || '',
      core: cleanGeneratedText(item.core, 220) || previous?.core || '',
      motive: cleanGeneratedText(item.motive, 220) || previous?.motive || '',
      fear: cleanGeneratedText(item.fear, 220) || previous?.fear || '',
      knows: cleanGeneratedText(item.knows, 240) || previous?.knows || '只知道本人亲见、经手与官职范围内的事务。',
      voice: cleanGeneratedText(item.voice, 180) || previous?.voice || '依官职与处境自然陈奏，区分事实、推断与传闻。',
      firstSeenDay: previous?.firstSeenDay ?? seen,
      lastSeenDay: Math.max(previous?.lastSeenDay ?? seen, seen),
    };
    byName.set(name, merged);
  });
  return [...byName.values()]
    .sort((a, b) => b.lastSeenDay - a.lastSeenDay || a.name.localeCompare(b.name, 'zh'))
    .slice(0, REGISTRY_LIMIT);
}

function normalizeDynamicEdges(value, day) {
  const seen = new Set();
  const edges = [];
  (Array.isArray(value) ? value : []).forEach(item => {
    if (!item || typeof item !== 'object') return;
    const a = cleanGeneratedText(item.a, 40);
    const b = cleanGeneratedText(item.b, 40);
    if (!a || !b || a === b) return;
    const type = EDGE_TYPES.has(item.type) ? item.type : 'patron';
    const key = `${a}\u0001${b}\u0001${type}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({
      a,
      b,
      type,
      label: cleanGeneratedText(item.label, 60) || '新结关系',
      day: clampInt(item.day ?? day, 1, 9999, day),
    });
  });
  return edges.sort((a, b) => b.day - a.day).slice(0, EDGES_LIMIT);
}

function normalizeDynamicFactions(value, day) {
  const seen = new Set();
  const factions = [];
  (Array.isArray(value) ? value : []).forEach(item => {
    if (!item || typeof item !== 'object') return;
    const name = cleanGeneratedText(item.name, 40);
    if (!name || seen.has(name)) return;
    seen.add(name);
    factions.push({
      id: cleanGeneratedText(item.id, 60) || name,
      name,
      description: cleanGeneratedText(item.description, 220) || '主张未明',
      members: (Array.isArray(item.members) ? item.members : []).map(member => cleanGeneratedText(member, 40)).filter(Boolean).slice(0, 12),
      rivals: (Array.isArray(item.rivals) ? item.rivals : []).map(rival => cleanGeneratedText(rival, 40)).filter(Boolean).slice(0, 4),
      influence: clampInt(item.influence, 0, 100, 30),
      day: clampInt(item.day ?? day, 1, 9999, day),
    });
  });
  return factions.sort((a, b) => b.day - a.day).slice(0, FACTIONS_LIMIT);
}

function normalizeMapNodes(value, day) {
  const seen = new Set();
  const nodes = [];
  (Array.isArray(value) ? value : []).forEach(item => {
    if (!item || typeof item !== 'object') return;
    const name = cleanGeneratedText(item.name, 40);
    if (!name || seen.has(name)) return;
    seen.add(name);
    nodes.push({
      id: cleanGeneratedText(item.id, 60) || name,
      name,
      region: cleanGeneratedText(item.region, 40) || name,
      severity: SEVERITY_LEVELS.includes(item.severity) ? item.severity : '中',
      x: clampInt(item.x, 0, 100, null),
      y: clampInt(item.y, 0, 100, null),
      day: clampInt(item.day ?? day, 1, 9999, day),
    });
  });
  return nodes.sort((a, b) => b.day - a.day).slice(0, MAP_NODES_LIMIT);
}

function mergeDynamicWorld(state, world, day) {
  state.peopleRegistry = normalizeRegistryPeople([...(state.peopleRegistry ?? []), ...(world?.people ?? [])], day);
  state.dynamicEdges = normalizeDynamicEdges([...(state.dynamicEdges ?? []), ...(world?.edges ?? [])], day);
  state.dynamicFactions = normalizeDynamicFactions([...(state.dynamicFactions ?? []), ...(world?.factions ?? [])], day);
  state.mapNodes = normalizeMapNodes([...(state.mapNodes ?? []), ...(world?.nodes ?? [])], day);
  (world?.factions ?? []).forEach(item => {
    const staticKey = ['清流', '务实', '勋贵', '内廷'].find(name => item?.name === name);
    if (staticKey) {
      state.staticFactionInfluence ??= {};
      state.staticFactionInfluence[staticKey] = clampInt(item.influence, 0, 100, state.staticFactionInfluence[staticKey] ?? 30);
    }
  });
  return {
    people: (world?.people ?? []).map(item => item?.name).filter(Boolean),
    edges: (world?.edges ?? []).map(item => [item?.a, item?.b, item?.type].join('\u0001')).filter(Boolean),
    factions: (world?.factions ?? []).map(item => item?.id || item?.name).filter(Boolean),
    nodes: (world?.nodes ?? []).map(item => item?.id || item?.name).filter(Boolean),
  };
}

function normalizeProfileOverrides(value) {
  const source = plainRecord(value);
  return Object.fromEntries(Object.keys(PROFILE_DEFAULTS).map(type => {
    const collection = plainRecord(source[type]);
    const limit = PROFILE_DEFAULTS[type].length;
    const normalized = Object.fromEntries(Object.entries(collection).flatMap(([rawIndex, rawFields]) => {
      const index = Number(rawIndex);
      if (!Number.isInteger(index) || index < 0 || index >= limit) return [];
      const allowed = new Set(PROFILE_FIELDS[type].map(([key]) => key));
      allowed.add('portrait');
      const fields = Object.fromEntries(Object.entries(plainRecord(rawFields)).flatMap(([key, rawValue]) => {
        if (!allowed.has(key)) return [];
        const defaultValue = PROFILE_DEFAULTS[type][index][key];
        const cleanValue = key === 'age'
          ? clampInt(rawValue, 18, 99, defaultValue)
          : key === 'portrait'
            ? (typeof rawValue === 'string' && rawValue.startsWith('data:image/') ? rawValue.slice(0, 400000) : '')
            : String(rawValue ?? '').trim().slice(0, 600);
        return cleanValue === defaultValue ? [] : [[key, cleanValue]];
      }));
      return Object.keys(fields).length ? [[String(index), fields]] : [];
    }));
    return [type, normalized];
  }));
}

function profileAt(type, index, state = getState()) {
  const source = PROFILE_DEFAULTS[type]?.[index];
  if (!source) return null;
  return { ...source, ...(state.profileOverrides?.[type]?.[index] ?? {}) };
}

function profilesOf(type, state = getState()) {
  return (PROFILE_DEFAULTS[type] ?? []).map((_, index) => profileAt(type, index, state));
}

function profileIndexByDefaultName(type, name) {
  return (PROFILE_DEFAULTS[type] ?? []).findIndex(item => item.name === name);
}

function clampInt(value, min, max, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(min, Math.min(max, Math.round(number))) : fallback;
}

function plainRecord(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key]) => typeof key === 'string').slice(-100));
}

function getState() {
  const ctx = context();
  if (!ctx?.chatMetadata) return deepClone(DEFAULT_STATE);
  const normalized = normalizeState(ctx.chatMetadata[META_KEY]);
  ctx.chatMetadata[META_KEY] = normalized;
  return normalized;
}

function persistState(state) {
  const ctx = context();
  if (!ctx?.chatMetadata || !isActiveCard()) return;
  ctx.chatMetadata[META_KEY] = normalizeState(state);
  ctx.saveMetadataDebounced?.();
  syncPrompt();
}

function currentCase(state = getState()) {
  if (state.phase === 'freeplay' && state.dynamicCase) return state.dynamicCase;
  return CASES[state.caseIndex] ?? CASES[0];
}

function currentMemorial(state = getState()) {
  return currentCase(state)?.memorials.find(m => m.id === state.activeId) ?? currentCase(state)?.memorials?.[0];
}

function stripMarkup(html) {
  const holder = document.createElement('div');
  holder.innerHTML = String(html ?? '');
  return holder.textContent ?? '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function portraitUrl(number) {
  return new URL(`officials/official-${String(number).padStart(2, '0')}.webp`, ASSET_ROOT).href;
}

function familyPortraitUrl(file) {
  return new URL(`families/${file}`, ASSET_ROOT).href;
}

function haremPortraitUrl(file) {
  if (!file) return PLACEHOLDER_AVATAR;
  return new URL(`harem/${file}`, ASSET_ROOT).href;
}

function resolvePortraitUrl(portrait, kind = 'official') {
  if (!portrait) return PLACEHOLDER_AVATAR;
  if (typeof portrait === 'number') return portraitUrl(portrait);
  const text = String(portrait);
  if (text.startsWith('data:image/')) return text;
  if (kind === 'family') return familyPortraitUrl(text);
  if (kind === 'harem') return haremPortraitUrl(text);
  return portraitUrl(text);
}

function selectedConsort(state = getState()) {
  const id = state.harem?.selectedId ?? 'empress';
  const index = HAREM_MEMBERS.findIndex(member => member.id === id);
  if (index >= 0) {
    const member = profileAt('harem', index, state);
    const inactive = new Set([...(state.casualties?.harem ?? []), ...(state.harem?.removed ?? [])]);
    if (!inactive.has(member.name)) return member;
  }
  const dynamic = (state.peopleRegistry ?? []).find(item => item.kind === 'harem' && item.name === id);
  if (dynamic) {
    const inactive = new Set([...(state.casualties?.harem ?? []), ...(state.harem?.removed ?? [])]);
    if (!inactive.has(dynamic.name)) return dynamic;
  }
  const inactive = new Set([...(state.casualties?.harem ?? []), ...(state.harem?.removed ?? [])]);
  const fallback = profilesOf('harem', state).find(item => !inactive.has(item.name));
  const fallbackDynamic = (state.peopleRegistry ?? []).find(item => item.kind === 'harem' && !inactive.has(item.name));
  return fallback ?? fallbackDynamic ?? profileAt('harem', 0, state);
}

function visitRecord(state, consortId) {
  return state.harem.visits[consortId] ?? { count: 0, lastDay: null, lastType: null };
}

function assetUrl(file) {
  return new URL(file, ASSET_ROOT).href;
}

function chineseDay(day) {
  const numerals = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  if (day < 10) return numerals[day];
  if (day < 20) return `拾${day % 10 ? numerals[day % 10] : ''}`;
  return String(day);
}

async function ensurePanel() {
  if (panelReady) return;
  const html = await fetch(PANEL_URL).then(response => {
    if (!response.ok) throw new Error(`panel fetch failed: ${response.status}`);
    return response.text();
  });
  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelectorAll('#danchenlu-root [data-asset]').forEach(node => {
    node.src = assetUrl(node.dataset.asset);
  });
  bindPanelEvents();
  panelReady = true;
}

function ensureLauncher() {
  let launcher = document.getElementById('danchenlu-launcher');
  if (!launcher) {
    launcher = document.createElement('button');
    launcher.id = 'danchenlu-launcher';
    launcher.type = 'button';
    launcher.textContent = '宸';
    launcher.title = '打开丹宸录';
    launcher.setAttribute('aria-label', '打开丹宸录奏折模拟器');
    document.body.append(launcher);
  }
  launcher.onclick = openPanel;
  bindLauncherDrag(launcher);
  launcher.classList.toggle('dcl-launcher-hidden', !isActiveCard());
}

function bindLauncherDrag(launcher) {
  if (launcher.dataset.dragBound === 'true') return;
  launcher.dataset.dragBound = 'true';
  let pointer = null;
  let suppressClick = false;

  applyLauncherPosition(launcher);

  launcher.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    const rect = launcher.getBoundingClientRect();
    launcher.style.left = `${rect.left}px`;
    launcher.style.top = `${rect.top}px`;
    launcher.style.right = 'auto';
    launcher.style.bottom = 'auto';
    launcher.classList.add('dcl-launcher-dragging');
    pointer = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      moved: false,
    };
    launcher.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  launcher.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (Math.hypot(dx, dy) > 4) pointer.moved = true;
    const maxLeft = Math.max(LAUNCHER_EDGE_GAP, window.innerWidth - pointer.width - LAUNCHER_EDGE_GAP);
    const maxTop = Math.max(LAUNCHER_EDGE_GAP, window.innerHeight - pointer.height - LAUNCHER_EDGE_GAP);
    launcher.style.left = `${Math.max(LAUNCHER_EDGE_GAP, Math.min(maxLeft, pointer.left + dx))}px`;
    launcher.style.top = `${Math.max(LAUNCHER_EDGE_GAP, Math.min(maxTop, pointer.top + dy))}px`;
  });

  const finish = event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    launcher.releasePointerCapture?.(event.pointerId);
    suppressClick = pointer.moved;
    if (pointer.moved) saveLauncherPosition(launcher);
    pointer = null;
    launcher.classList.remove('dcl-launcher-dragging');
  };
  launcher.addEventListener('pointerup', finish);
  launcher.addEventListener('pointercancel', finish);
  launcher.addEventListener('click', event => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  window.addEventListener('resize', () => applyLauncherPosition(launcher));
}

function launcherLayoutKey() {
  return window.matchMedia(MOBILE_LAYOUT).matches ? 'mobile' : 'desktop';
}

function readLauncherPositions() {
  try {
    const value = JSON.parse(localStorage.getItem(LAUNCHER_POSITION_KEY) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function applyLauncherPosition(launcher) {
  const saved = readLauncherPositions()[launcherLayoutKey()];
  if (!saved || !Number.isFinite(saved.x) || !Number.isFinite(saved.y)) {
    ['left', 'top', 'right', 'bottom'].forEach(property => launcher.style.removeProperty(property));
    return;
  }
  const width = launcher.offsetWidth || 54;
  const height = launcher.offsetHeight || 58;
  const availableX = Math.max(0, window.innerWidth - width - LAUNCHER_EDGE_GAP * 2);
  const availableY = Math.max(0, window.innerHeight - height - LAUNCHER_EDGE_GAP * 2);
  launcher.style.left = `${LAUNCHER_EDGE_GAP + Math.max(0, Math.min(1, saved.x)) * availableX}px`;
  launcher.style.top = `${LAUNCHER_EDGE_GAP + Math.max(0, Math.min(1, saved.y)) * availableY}px`;
  launcher.style.right = 'auto';
  launcher.style.bottom = 'auto';
}

function saveLauncherPosition(launcher) {
  const rect = launcher.getBoundingClientRect();
  const availableX = Math.max(1, window.innerWidth - rect.width - LAUNCHER_EDGE_GAP * 2);
  const availableY = Math.max(1, window.innerHeight - rect.height - LAUNCHER_EDGE_GAP * 2);
  const positions = readLauncherPositions();
  positions[launcherLayoutKey()] = {
    x: Math.max(0, Math.min(1, (rect.left - LAUNCHER_EDGE_GAP) / availableX)),
    y: Math.max(0, Math.min(1, (rect.top - LAUNCHER_EDGE_GAP) / availableY)),
  };
  try {
    localStorage.setItem(LAUNCHER_POSITION_KEY, JSON.stringify(positions));
  } catch {
    // Storage can be unavailable in privacy-restricted WebViews; dragging still works for this session.
  }
}

async function openPanel() {
  if (!isActiveCard()) {
    notify('当前角色卡未启用丹宸录。', 'warning');
    return;
  }
  await ensurePanel();
  const root = document.getElementById('danchenlu-root');
  root.classList.remove('dcl-hidden');
  root.setAttribute('aria-hidden', 'false');
  bodyOverflowBefore = document.body.style.overflow || '';
  document.body.style.overflow = 'hidden';
  renderAll();
  root.querySelector('.dcl-close')?.focus();
}

function closePanel() {
  const root = document.getElementById('danchenlu-root');
  if (!root) return;
  root.classList.add('dcl-hidden');
  root.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = bodyOverflowBefore;
  document.getElementById('danchenlu-launcher')?.focus();
}

function bindPanelEvents() {
  const root = document.getElementById('danchenlu-root');
  bindPanelDrag(root);
  root.addEventListener('click', async event => {
    const archiveCard = event.target.closest('[data-archive]');
    if (archiveCard) return toggleArchive(archiveCard);
    const factionTarget = event.target.closest('[data-faction]');
    if (factionTarget) return openFactionDetail(factionTarget.dataset.faction);
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.action === 'close') return closePanel();
    if (button.dataset.view) return switchView(button.dataset.view);
    if (button.dataset.filter) return setFilter(button.dataset.filter);
    if (button.dataset.memorial) return selectMemorial(button.dataset.memorial);
    if (button.dataset.case) return selectCase(button.dataset.case);
    if (button.dataset.mapNode) return selectMapNode(button.dataset.mapNode);
    if (button.dataset.reply) return setReply(button.dataset.reply);
    if (button.dataset.consort !== undefined) return selectConsort(button.dataset.consort);
    if (button.dataset.haremAction) return runHaremAction(button.dataset.haremAction);
    if (button.dataset.profileKind) return selectProfileKind(button.dataset.profileKind);
    if (button.dataset.profileIndex !== undefined) return selectProfile(Number(button.dataset.profileIndex), button.dataset.profileDynamic === '1');
    if (button.dataset.relation) return filterRelations(button.dataset.relation);
    if (button.dataset.faction !== undefined) return openFactionDetail(button.dataset.faction);
    if (button.dataset.factionSwitch) return openFactionDetail(button.dataset.factionSwitch);
    if (button.dataset.person !== undefined) return selectOfficial(button.dataset.person);
    if (button.dataset.familyMember !== undefined) return selectFamilyMember(Number(button.dataset.familyMember));
    if (button.dataset.openFamily !== undefined) return renderFamilyNetwork(Number(button.dataset.openFamily));
    switch (button.dataset.action) {
      case 'routes': toggleRoutes(button); break;
      case 'heat': toggleHeat(button); break;
      case 'reset-map': selectCase(CASES[0]?.id); break;
      case 'toggle-fold': toggleFold(); break;
      case 'doubt': toggleDoubt(); break;
      case 'submit': submitVerdict(); break;
      case 'summary': openSummary(); break;
      case 'batch-send': await sendPendingVerdicts(); break;
      case 'summary-close': document.getElementById('dcl-summary-dialog')?.close(); break;
      case 'faction-close': closeFactionDetail(); break;
      case 'manage-harem': openManageDialog(); break;
      case 'manage-close': document.getElementById('dcl-manage-dialog')?.close(); break;
      case 'toggle-invasion': toggleInvasion(); break;
      case 'remove-harem': removeHaremMember(button.dataset.name); break;
      case 'restore-harem': restoreHaremMember(button.dataset.name); break;
      case 'next-day': await nextDay(); break;
      case 'export-profiles': exportProfiles(); break;
      case 'import-profiles': root.querySelector('#dcl-profile-import')?.click(); break;
      case 'upload-portrait': root.querySelector('#dcl-portrait-import')?.click(); break;
      case 'reset-portrait': resetPortrait(); break;
      case 'reset-profile': resetCurrentProfile(); break;
      case 'reset-all-profiles': resetAllProfiles(); break;
      case 'cancel-profile': renderProfileEditor(); break;
    }
  });

  root.querySelector('#dcl-profile-editor')?.addEventListener('submit', event => {
    event.preventDefault();
    saveCurrentProfile(new FormData(event.currentTarget));
  });

  root.querySelector('#dcl-profile-import')?.addEventListener('change', importProfiles);
  root.addEventListener('submit', event => {
    if (event.target?.id === 'dcl-harem-add-form') {
      event.preventDefault();
      addHaremMember(new FormData(event.target));
      event.target.reset();
    }
  });
  root.addEventListener('change', event => {
    if (event.target?.id === 'dcl-portrait-import') handlePortraitUpload(event.target);
    if (event.target?.id === 'dcl-harem-portrait-input') {
      const file = event.target.files?.[0];
      const preview = document.getElementById('dcl-harem-portrait-preview');
      if (file && /^image\//.test(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (preview) {
            preview.src = reader.result;
            preview.hidden = false;
          }
        };
        reader.readAsDataURL(file);
      } else if (preview) {
        preview.hidden = true;
      }
    }
  });

  root.querySelector('#dcl-custom-reply').addEventListener('input', event => {
    root.querySelectorAll('[data-reply]').forEach(button => button.classList.toggle('selected', button.dataset.reply === event.target.value));
    updateSubmitState();
  });

  root.querySelector('#dcl-official-search').addEventListener('input', event => {
    root.querySelectorAll('.dcl-person-node').forEach(node => {
      node.classList.toggle('search-muted', Boolean(event.target.value) && !node.dataset.name.includes(event.target.value));
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !root.classList.contains('dcl-hidden')) closePanel();
  });
}

function bindPanelDrag(root) {
  const app = root.querySelector('.dcl-app');
  const handle = root.querySelector('.dcl-topbar');
  if (!app || !handle) return;

  const isInteractive = target => target instanceof Element
    && Boolean(target.closest('button, a, input, textarea, select, [contenteditable="true"]'));

  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0 || window.matchMedia(MOBILE_LAYOUT).matches || isInteractive(event.target)) return;

    const rect = app.getBoundingClientRect();
    app.style.left = `${rect.left}px`;
    app.style.top = `${rect.top}px`;
    app.style.width = `${rect.width}px`;
    app.style.height = `${rect.height}px`;
    app.style.right = 'auto';
    app.style.bottom = 'auto';
    app.style.transform = 'none';
    app.classList.add('dcl-positioned', 'dcl-dragging');
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
    };
    handle.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  handle.addEventListener('pointermove', event => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    const rect = app.getBoundingClientRect();
    const maxLeft = Math.max(PANEL_EDGE_GAP, window.innerWidth - rect.width - PANEL_EDGE_GAP);
    const maxTop = Math.max(PANEL_EDGE_GAP, window.innerHeight - rect.height - PANEL_EDGE_GAP);
    app.style.left = `${Math.max(PANEL_EDGE_GAP, Math.min(maxLeft, dragState.left + event.clientX - dragState.startX))}px`;
    app.style.top = `${Math.max(PANEL_EDGE_GAP, Math.min(maxTop, dragState.top + event.clientY - dragState.startY))}px`;
  });

  const finishDrag = event => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    handle.releasePointerCapture?.(event.pointerId);
    dragState = null;
    app.classList.remove('dcl-dragging');
  };
  handle.addEventListener('pointerup', finishDrag);
  handle.addEventListener('pointercancel', finishDrag);

  handle.addEventListener('dblclick', event => {
    if (window.matchMedia(MOBILE_LAYOUT).matches || isInteractive(event.target)) return;
    resetPanelPosition(app);
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(panelResizeTimer);
    panelResizeTimer = window.setTimeout(() => {
      if (window.matchMedia(MOBILE_LAYOUT).matches) resetPanelPosition(app);
      else clampPanelPosition(app);
    }, 80);
  });
}

function resetPanelPosition(app = document.querySelector('#danchenlu-root .dcl-app')) {
  if (!app) return;
  dragState = null;
  app.classList.remove('dcl-positioned', 'dcl-dragging');
  ['left', 'top', 'right', 'bottom', 'width', 'height', 'transform'].forEach(property => app.style.removeProperty(property));
}

function clampPanelPosition(app) {
  if (!app?.classList.contains('dcl-positioned')) return;
  const rect = app.getBoundingClientRect();
  const width = Math.min(rect.width, Math.max(320, window.innerWidth - PANEL_EDGE_GAP * 2));
  const height = Math.min(rect.height, Math.max(360, window.innerHeight - PANEL_EDGE_GAP * 2));
  const left = Math.max(PANEL_EDGE_GAP, Math.min(window.innerWidth - width - PANEL_EDGE_GAP, rect.left));
  const top = Math.max(PANEL_EDGE_GAP, Math.min(window.innerHeight - height - PANEL_EDGE_GAP, rect.top));
  app.style.width = `${width}px`;
  app.style.height = `${height}px`;
  app.style.left = `${left}px`;
  app.style.top = `${top}px`;
}

function switchView(view) {
  const state = getState();
  state.view = view;
  persistState(state);
  renderView();
  if (view === 'officials') renderNetwork();
  if (view === 'harem') renderHarem();
  if (view === 'profiles') renderProfiles();
  if (view === 'factions') renderFactions();
  if (view === 'archive') renderArchive();
}

function renderView() {
  const state = getState();
  const root = document.getElementById('danchenlu-root');
  if (!root) return;
  root.dataset.activeView = state.view;
  root.querySelectorAll('.dcl-view').forEach(view => view.classList.toggle('active', view.id === `dcl-${state.view}-view`));
  root.querySelectorAll('.dcl-tabs [data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
  root.querySelector('.dcl-intelligence').style.display = ['map'].includes(state.view) ? '' : 'none';
}

function setFilter(filter) {
  const state = getState();
  state.filter = filter;
  persistState(state);
  renderMemorialList();
}

function selectMemorial(id) {
  const state = getState();
  if (!currentCase(state).memorials.some(m => m.id === id)) return;
  state.activeId = id;
  state.open = false;
  state.view = 'desk';
  persistState(state);
  renderAll();
}

function selectCase(caseId) {
  const current = getState();
  if (current.phase === 'freeplay') {
    toast('引子案已归档，请在案牍中回看');
    return;
  }
  const index = CASES.findIndex(item => item.id === caseId);
  if (index < 0) return;
  const state = getState();
  state.caseIndex = index;
  state.activeId = CASES[index].memorials[0].id;
  state.view = 'map';
  state.open = false;
  persistState(state);
  renderAll();
}

function toggleRoutes(button) {
  document.querySelector('#danchenlu-root .dcl-routes')?.classList.toggle('hidden');
  button.classList.toggle('active');
}

function toggleHeat(button) {
  document.getElementById('dcl-map-frame')?.classList.toggle('heat');
  button.classList.toggle('active');
  toast('已切换案情热度');
}

function toggleFold() {
  const state = getState();
  state.open = !state.open;
  persistState(state);
  renderDocument();
}

function setReply(reply) {
  const state = getState();
  if (state.dispatched[state.activeId]) return;
  const textarea = document.getElementById('dcl-custom-reply');
  textarea.value = reply;
  document.querySelectorAll('#danchenlu-root [data-reply]').forEach(button => button.classList.toggle('selected', button.dataset.reply === reply));
  updateSubmitState();
}

function toggleDoubt() {
  const state = getState();
  if (state.dispatched[state.activeId]) return;
  const set = new Set(state.doubts);
  if (set.has(state.activeId)) set.delete(state.activeId); else set.add(state.activeId);
  state.doubts = [...set];
  persistState(state);
  renderMemorialList();
  renderDocument();
  toast(set.has(state.activeId) ? '已留中存疑' : '已取消存疑');
}

function verdictEffect(memorial, reply) {
  const key = ['阅', '知道了'].includes(reply)
    ? reply
    : (reply === '核议' ? '依议' : (reply === '督查' || /查|核|勘|审|封/.test(reply) ? '着查' : '阅'));
  return memorial.effects?.[key] ?? [1, -1, 0];
}

function submitVerdict() {
  const state = getState();
  const memorial = currentMemorial(state);
  const textarea = document.getElementById('dcl-custom-reply');
  const reply = textarea.value.trim();
  if (!reply || !memorial || state.dispatched[memorial.id]) return;

  state.reviewed[memorial.id] = true;
  state.replies[memorial.id] = reply;
  persistState(state);
  renderAll();
  const vermilion = document.getElementById('dcl-vermilion');
  vermilion.classList.remove('writing');
  void vermilion.offsetWidth;
  vermilion.classList.add('writing');
  toast(`朱批已暂存：${reply}`);
  window.setTimeout(advanceAfterVerdict, 420);
}

function advanceAfterVerdict() {
  const state = getState();
  const next = currentCase(state).memorials.find(item => !state.reviewed[item.id]);
  if (next) {
    state.activeId = next.id;
    state.open = false;
    persistState(state);
    renderAll();
    return;
  }
  openSummary();
}

function openSummary() {
  renderSummary();
  const dialog = document.getElementById('dcl-summary-dialog');
  if (dialog && !dialog.open) dialog.showModal();
}

function renderSummary() {
  const state = getState();
  const memorials = currentCase(state).memorials;
  const staged = memorials.filter(item => state.reviewed[item.id]);
  const pending = staged.filter(item => !state.dispatched[item.id]);
  const sent = memorials.filter(item => state.dispatched[item.id]);
  const summary = document.getElementById('dcl-summary-text');
  const list = document.getElementById('dcl-summary-list');
  if (!summary || !list) return;

  summary.textContent = `已暂存 ${staged.length}/${memorials.length} 道，待发送 ${pending.length} 道，已发下 ${sent.length} 道。暂存不会改变朝局，也不会请求 AI。`;
  list.innerHTML = memorials.map(item => {
    const isSent = Boolean(state.dispatched[item.id]);
    const isStaged = Boolean(state.reviewed[item.id]);
    const status = isSent ? '已发下' : isStaged ? '待发送' : '未批';
    const reply = state.replies[item.id] || '尚未朱批';
    return `<article class="dcl-summary-item ${item.type} ${isSent ? 'dispatched' : ''}"><i>${item.type === 'secret' ? '密' : '题'}</i><div><b>${escapeHtml(item.title)}</b><span>${escapeHtml(reply)}</span></div><em>${status}${state.doubts.includes(item.id) ? ' · 留中' : ''}</em></article>`;
  }).join('');

  const sendButton = document.getElementById('dcl-batch-send');
  const nextButton = document.getElementById('dcl-next-day');
  if (sendButton) {
    sendButton.disabled = pending.length === 0;
    sendButton.textContent = pending.length ? `发送待发御批（${pending.length}）` : '没有待发御批';
  }
  if (nextButton) {
    nextButton.hidden = sent.length !== memorials.length;
    nextButton.disabled = state.freeplay.awaiting;
    const entersFreeplay = state.phase === 'intro' && state.caseIndex === INTRO_CASE_COUNT - 1;
    nextButton.textContent = state.freeplay.awaiting
      ? '通政司正在汇编新折…'
      : state.freeplay.lastError
        ? '重新生成翌日奏折'
        : entersFreeplay || state.phase === 'freeplay'
          ? '生成翌日新折'
          : '翌日再览';
  }
  if (state.freeplay.lastError) summary.textContent += ` 上次生成未收录：${state.freeplay.lastError}。`;
}

async function sendPendingVerdicts() {
  const state = getState();
  const caseItem = currentCase(state);
  const pending = caseItem.memorials.filter(item => state.reviewed[item.id] && !state.dispatched[item.id] && state.replies[item.id]);
  if (!pending.length) return;

  const message = [
    `【御前汇总朱批｜${caseItem.title}】`,
    ...pending.map((item, index) => `${index + 1}. 《${item.title}》：${state.replies[item.id]}${state.doubts.includes(item.id) ? '（留中存疑，相关文册不得销毁）' : ''}`),
    '以上御批一并发下。请综合呈现这些旨意相互作用后的即时朝堂反应、相关官员的真实行动与一项尚未解决的新线索；不要逐条机械复述，也不要替朕追加决定。',
  ].join('\n');

  await sendUserAction(message, () => {
    const committed = getState();
    pending.forEach(item => {
      if (committed.dispatched[item.id]) return;
      const reply = committed.replies[item.id] ?? state.replies[item.id];
      const effect = verdictEffect(item, reply);
      committed.dispatched[item.id] = true;
      ['authority', 'treasury', 'stability'].forEach((key, index) => {
        committed.stats[key] = clampInt(committed.stats[key] + effect[index], 0, 100, committed.stats[key]);
      });
    });
    persistState(committed);
    renderAll();
    renderSummary();
  }, buildCaseProfileContext(caseItem, pending));
}

function archiveCurrentDay(state) {
  const caseItem = currentCase(state);
  return {
    day: state.day,
    caseId: caseItem.id,
    caseTitle: caseItem.title,
    summary: caseItem.summary,
    reviewed: caseItem.memorials.filter(item => state.dispatched[item.id]).length,
    doubts: caseItem.memorials.filter(item => state.doubts.includes(item.id)).length,
    stats: deepClone(state.stats),
  };
}

function advanceToPresetDay(previous) {
  const state = normalizeState(previous);
  state.history.push(archiveCurrentDay(previous));
  state.history = state.history.slice(-12);
  state.day += 1;
  state.caseIndex += 1;
  state.activeId = CASES[state.caseIndex].memorials[0].id;
  state.reviewed = {};
  state.replies = {};
  state.dispatched = {};
  state.doubts = [];
  state.open = false;
  state.view = 'map';
  persistState(state);
  document.getElementById('dcl-summary-dialog')?.close();
  renderAll();
  toast('翌日新折已送至御前');
}

function generatedCaseRequest(state, nextDayNumber) {
  const caseItem = currentCase(state);
  const recent = state.history.slice(-4).map(item => `第${item.day}日《${item.caseTitle}》：${item.summary ?? ''}`).join('\n') || '尚无旧案归档';
  const worldContext = generatedWorldContext(state);
  return `【进入开放朝政｜请拟第${nextDayNumber}日奏折】
前三卷河工、军饷、盐引只是玩法引子。从现在开始进入自由朝政，请依据当前朝局、既有事件后果与人物利益，自行生成次日送达御前的一组新奏折。

要求：
1. 生成3—5道奏折，至少两道在数字、时序、证据或利益上互相冲突；题材可为吏治、科举、漕运、灾荒、外交、宗室、宫务牵动前朝、地方民变、财政或旧案后续，不要机械重演前三案。
2. 可继续使用既有官员，也可引入新官员；每个人只陈述其实际可能知道的部分。
3. summary必须是独立可读的案卷简要说明（结案后会进入案牍前情归档供玩家点开回看），contradiction是幕后因果，只用于之后保持一致。
4. people可继续沿用既有官员（不重复输出完整档案即可），也可引入新人物；新人物建议提供kind（official/family/harem/case）、office、rank、faction、origin、role与publicFace/core/motive/fear/knows/voice。faction使用既有党派名或提出新党派。
5. relations用于登记新结或改变的人物关系：a、b为人名，type限patron/cohort/kin/hostile/family，label为关系说明；只写确有剧情依据的关系。
6. factions用于提出或更新党派：name、description、members（人名）、rivals（对立派系名，最多4个）、influence（0—100整数）；members只列实际相关人物，rivals只写确有朝堂对立的派系。
7. nodes用于地图上新增或变动的地点/衙门：name、region（所在道府或衙门）、severity（高/中/低）；尽量与奏折region一致，便于御前按图索卷。
8. 只输出下面标签包裹的严格JSON，不要代码围栏、解释或额外正文。

<${GENERATED_CASE_TAG}>
{"title":"当日总案名","summary":"公开摘要","rumor":"朝野传闻","clues":["待查矛盾1","待查矛盾2"],"contradiction":"幕后真实因果","people":[{"name":"姓名","kind":"official","office":"官职","rank":"品秩","faction":"党派","origin":"籍贯","role":"身份职责","reputation":"朝野风评","stance":"本案立场","tone":"neutral","publicFace":"外在行事","core":"内在矛盾","motive":"动机","fear":"所惧","knows":"信息边界","voice":"说话方式"}],"relations":[{"a":"人名甲","b":"人名乙","type":"patron","label":"关系说明"}],"factions":[{"name":"党名","description":"主张","members":["人名"],"influence":30}],"nodes":[{"name":"地点或衙门","region":"道府","severity":"中"}],"memorials":[{"type":"formal","region":"地区或衙门","title":"奏折标题","lead":"事由短句","sender":"具折人","office":"官职","date":"月日","time":"递送时辰","body":["第一段正文","第二段正文"],"cabinet":"题本票拟；密折写空字符串","reveal":[0,1],"suspicious":true}]}
</${GENERATED_CASE_TAG}>

${worldContext}
刚结案：《${caseItem.title}》；${caseItem.summary}
近期归档：\n${recent}`;
}

function generatedWorldContext(state) {
  const stats = state.stats ?? {};
  const semantics = statBandSemantics(stats);
  const invasionLine = invasionContextLine(state);
  const hardRequirements = [];
  const authority = stats.authority ?? 62;
  const treasury = stats.treasury ?? 54;
  const stability = stats.stability ?? 58;
  if (authority < 40) hardRequirements.push('【硬性要求·威望低迷】至少一道奏折必须体现官员顶撞、拖延执行或阳奉阴违，可含抗旨、借故推诿或廷议争执。');
  if (authority >= 80) hardRequirements.push('【硬性要求·威望极高】至少一道奏折体现令出必行或官员争相表现，可含主动请缨、密折表忠或地方闻风而动。');
  if (treasury < 40) hardRequirements.push('【硬性要求·国帑支绌】至少一道奏折必须涉及钱粮亏空、加派私征、挪借周转或兵饷官俸拖欠，正文须出现具体银钱布粮数字。');
  if (treasury >= 80) hardRequirements.push('【硬性要求·国帑充盈】至少一道奏折体现库储充裕：可含大额拨银、工程兴办或库房盘盈，正文仍须给具体财物。');
  if (stability < 40) hardRequirements.push('【硬性要求·民心浮动】至少一道奏折必须涉及民变、抗税抗粮、流民或地方骚动，并让奏报者因舆情失真或夸大而立场分歧。');
  if (stability >= 80) hardRequirements.push('【硬性要求·民心安稳】至少一道奏折体现市井安稳或百姓称颂，可含颂圣、祥瑞或减税请愿，但不得强行制造动乱。');
  const factionOverviewText = factionOverview(state).slice(0, 8)
    .map(faction => `${faction.name}${faction.static ? '' : '（新起）'}${faction.influence}%`)
    .join('、');
  const factionRule = '党派影响力代表朝局实际分量：高影响力党派的主张更易进票拟、其成员更受保护、查其案阻力更大；低影响力党派易被压折、门生难升。生成奏折时必须让党派格局可见——票拟倾向、官员站队与案件阻力应反映当前影响力，但影响力高不等于正确，不得因此免罪。';
  return `当前朝局：\n${semantics}\n党派影响：${factionOverviewText}。\n${factionRule}\n${invasionLine ? `${invasionLine}\n` : ''}${hardRequirements.join('\n')}`;
}

async function requestGeneratedDay(previous) {
  const state = normalizeState(previous);
  state.freeplay.awaiting = true;
  state.freeplay.pendingDay = previous.day + 1;
  state.freeplay.lastError = '';
  persistState(state);
  renderSummary();
  const visibleMessage = `【通政司制折｜第${state.freeplay.pendingDay}日】前三卷引子已毕，请依据当前朝局与既有后果，汇编翌日送达御前的新折。`;
  const sent = await sendUserAction(visibleMessage, null, generatedCaseRequest(previous, state.freeplay.pendingDay));
  if (!sent) {
    const failed = getState();
    failed.freeplay.awaiting = false;
    failed.freeplay.lastError = '制折请求未成功发送';
    persistState(failed);
    renderSummary();
  }
}

async function nextDay() {
  const previous = getState();
  const memorials = currentCase(previous).memorials;
  if (!memorials.every(item => previous.dispatched[item.id])) {
    toast('本案尚有御批未发下');
    openSummary();
    return;
  }
  if (previous.phase === 'intro' && previous.caseIndex < INTRO_CASE_COUNT - 1) {
    advanceToPresetDay(previous);
    return;
  }
  if (previous.freeplay.awaiting) {
    toast('通政司正在汇编次日新折');
    return;
  }
  await requestGeneratedDay(previous);
}

function extractGeneratedCase(message) {
  const match = String(message ?? '').match(new RegExp(`<${GENERATED_CASE_TAG}>\\s*([\\s\\S]*?)\\s*<\\/${GENERATED_CASE_TAG}>`, 'i'));
  if (!match) throw new Error('未找到结构化案卷标签');
  return JSON.parse(match[1].trim());
}

function extractWorldChange(message) {
  const match = String(message ?? '').match(new RegExp(`<${WORLD_CHANGE_TAG}>\\s*([\\s\\S]*?)\\s*<\\/${WORLD_CHANGE_TAG}>`, 'i'));
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    console.warn('[丹宸录] 世界变化标签 JSON 解析失败，忽略本次登记。');
    return null;
  }
}

function messageFingerprint(text) {
  let hash = 0;
  const value = String(text ?? '');
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return `${hash >>> 0}-${value.length}`;
}

function recordWorldLog(state, messageId, added, day) {
  const message = context()?.chat?.[Number(messageId)]?.mes;
  if (!message) return;
  state.worldLog ??= [];
  state.worldLog.push({
    messageId: Number(messageId),
    fingerprint: messageFingerprint(message),
    day,
    people: added.people,
    edges: added.edges,
    factions: added.factions,
    nodes: added.nodes,
  });
  state.worldLog = state.worldLog.slice(-40);
}

function rollbackWorldEntry(state, entry) {
  let changed = false;
  const later = (state.worldLog ?? []).filter(log => log !== entry && log.day >= entry.day);
  const laterPeople = new Set(later.flatMap(log => log.people ?? []));
  const laterEdges = new Set(later.flatMap(log => log.edges ?? []));
  const laterFactions = new Set(later.flatMap(log => log.factions ?? []));
  const laterNodes = new Set(later.flatMap(log => log.nodes ?? []));
  const people = new Set(entry.people ?? []);
  const edges = new Set(entry.edges ?? []);
  const factions = new Set(entry.factions ?? []);
  const nodes = new Set(entry.nodes ?? []);
  const beforePeople = state.peopleRegistry.length;
  state.peopleRegistry = (state.peopleRegistry ?? []).filter(person => !(people.has(person.name) && person.lastSeenDay === entry.day && !laterPeople.has(person.name)));
  changed ||= state.peopleRegistry.length !== beforePeople;
  const beforeEdges = state.dynamicEdges.length;
  state.dynamicEdges = (state.dynamicEdges ?? []).filter(edge => {
    const key = [edge.a, edge.b, edge.type].join('\u0001');
    return !(edges.has(key) && edge.day === entry.day && !laterEdges.has(key));
  });
  changed ||= state.dynamicEdges.length !== beforeEdges;
  const beforeFactions = state.dynamicFactions.length;
  state.dynamicFactions = (state.dynamicFactions ?? []).filter(faction => !(factions.has(faction.id) && faction.day === entry.day && !laterFactions.has(faction.id)));
  changed ||= state.dynamicFactions.length !== beforeFactions;
  const beforeNodes = state.mapNodes.length;
  state.mapNodes = (state.mapNodes ?? []).filter(node => !(nodes.has(node.id) && node.day === entry.day && !laterNodes.has(node.id)));
  changed ||= state.mapNodes.length !== beforeNodes;
  return changed;
}

function handleMessageDeleted() {
  if (!isActiveCard()) return;
  const state = getState();
  const chat = context()?.chat ?? [];
  const chatFingerprints = new Set(chat.map(message => messageFingerprint(message?.mes)));
  const before = [...(state.worldLog ?? [])];
  const kept = [];
  let changed = false;
  for (const entry of before) {
    if (chatFingerprints.has(entry.fingerprint)) {
      kept.push(entry);
      continue;
    }
    changed = rollbackWorldEntry(state, entry) || changed;
  }
  if (changed || kept.length !== before.length) {
    state.worldLog = kept;
    persistState(state);
    if (panelReady) renderAll();
    notify('已撤销被删除消息登记的世界变化。', 'info');
  }
}

function maybeTriggerInvasion(state) {
  if (!state.invasion?.enabled || state.invasion?.triggered) return null;
  if (state.day < (state.invasion?.triggerDay ?? 15)) return null;
  const authority = state.stats?.authority ?? 0;
  const treasury = state.stats?.treasury ?? 0;
  const stability = state.stats?.stability ?? 0;
  const factionValues = [
    ...Object.values(state.staticFactionInfluence ?? {}),
    ...(state.dynamicFactions ?? []).map(faction => faction.influence ?? 0),
  ].filter(value => Number.isFinite(value));
  const topFaction = factionValues.length ? Math.max(...factionValues) : 30;
  const defenseScore = Math.round(
    authority * 0.3 + stability * 0.25 + treasury * 0.25 + (100 - topFaction) * 0.2,
  );
  const band = defenseScore >= 70 ? 'crush'
    : defenseScore >= 45 ? 'hold'
    : defenseScore >= 25 ? 'breach'
    : 'collapse';
  const result = {
    day: state.day,
    score: defenseScore,
    band,
    topFaction,
    casualties: { officials: [], harem: [] },
  };
  if (band === 'collapse') {
    result.casualties = randomizeCasualties(state);
    state.casualties.officials = [...new Set([...(state.casualties.officials ?? []), ...result.casualties.officials])];
    state.casualties.harem = [...new Set([...(state.casualties.harem ?? []), ...result.casualties.harem])];
  }
  state.invasion.triggered = true;
  state.invasion.result = result;
  return result;
}

function randomizeCasualties(state) {
  const staticOfficials = OFFICIALS.map(person => person.name);
  const dynamicOfficials = (state.peopleRegistry ?? [])
    .filter(item => (item.kind === 'official' || item.kind === 'case') && !state.casualties?.officials?.includes(item.name))
    .map(item => item.name);
  const officialPool = [...new Set([...staticOfficials, ...dynamicOfficials])]
    .filter(name => !(state.casualties?.officials ?? []).includes(name));
  const staticHarem = HAREM_MEMBERS.map(member => member.name);
  const dynamicHarem = (state.peopleRegistry ?? [])
    .filter(item => item.kind === 'harem' && !(state.casualties?.harem ?? []).includes(item.name) && !(state.harem?.removed ?? []).includes(item.name))
    .map(item => item.name);
  const haremPool = [...new Set([...staticHarem, ...dynamicHarem])]
    .filter(name => !(state.casualties?.harem ?? []).includes(name) && !(state.harem?.removed ?? []).includes(name));
  const pickHalf = pool => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.ceil(shuffled.length / 2));
  };
  return { officials: pickHalf(officialPool), harem: pickHalf(haremPool) };
}

function invasionMessage(result) {
  const labels = {
    crush: '异族入侵被击退：边墙无事，但军费见绌。',
    hold: '异族入侵苦战得守：伤亡有限，边境州县被掠。',
    breach: '异族入侵边备崩坏：失地数处，军饷挪用暴露。',
    collapse: '异族入侵溃败：异族长驱直入，朝堂宫闱折损惨重。',
  };
  const loss = result.band === 'collapse' && (result.casualties?.officials?.length || result.casualties?.harem?.length)
    ? ` 官员折损${result.casualties.officials.length}人、宫闱折损${result.casualties.harem.length}人。`
    : '';
  return `${labels[result.band] ?? '异族入侵发生。'}守御分${result.score}。${loss}`;
}

function invasionContextLine(state) {
  const lines = [];
  if (state.invasion?.triggered && state.invasion?.result) {
    const result = state.invasion.result;
    const labels = {
      crush: '异族入侵已被击退',
      hold: '异族入侵刚被苦战挡住',
      breach: '异族入侵造成边备崩坏',
      collapse: '异族入侵曾致朝野溃败',
    };
    lines.push(`重大事件：${labels[result.band] ?? '异族入侵已发生'}（第${result.day}日，守御分${result.score}）。`);
  }
  if ((state.casualties?.officials ?? []).length || (state.casualties?.harem ?? []).length) {
    const officials = (state.casualties?.officials ?? []).join('、') || '无';
    const harem = (state.casualties?.harem ?? []).join('、') || '无';
    lines.push(`战殁或失踪：官员——${officials}；宫闱——${harem}。这些人不再主动出场或递折，除非剧情明确让其回归。`);
  }
  return lines.join('\n');
}

function handleGeneratedCaseMessage(messageId) {
  if (!isActiveCard()) return;
  const state = getState();
  const message = context()?.chat?.[Number(messageId)]?.mes;
  const worldChange = extractWorldChange(message);
  if (worldChange) {
    const world = extractWorldChanges(worldChange, state.day);
    const hasContent = (world.people?.length || world.edges?.length || world.factions?.length || world.nodes?.length);
    if (hasContent) {
      const added = mergeDynamicWorld(state, world, state.day);
      recordWorldLog(state, messageId, added, state.day);
      persistState(state);
      if (panelReady) renderAll();
      notify('御案已登记新的世界变化（人物/关系/党派/地点）。', 'success');
    }
  }
  if (!state.freeplay.awaiting || !state.freeplay.pendingDay) {
    if (panelReady) renderAll();
    return;
  }
  try {
    const parsed = extractGeneratedCase(message);
    const nextCase = normalizeGeneratedCase(parsed, state.freeplay.pendingDay);
    if (!nextCase) throw new Error('案卷少于三道有效奏折');
    state.history.push(archiveCurrentDay(state));
    state.history = state.history.slice(-12);
    state.day = state.freeplay.pendingDay;
    state.phase = 'freeplay';
    const added = mergeDynamicWorld(state, extractWorldChanges(parsed, state.freeplay.pendingDay), state.freeplay.pendingDay);
    recordWorldLog(state, messageId, added, state.freeplay.pendingDay);
    state.dynamicCase = nextCase;
    state.activeId = nextCase.memorials[0].id;
    state.reviewed = {};
    state.replies = {};
    state.dispatched = {};
    state.doubts = [];
    state.open = false;
    state.view = 'map';
    state.freeplay.awaiting = false;
    state.freeplay.pendingDay = null;
    state.freeplay.lastError = '';
    state.freeplay.generatedCount += 1;
    const invasionResult = maybeTriggerInvasion(state);
    persistState(state);
    document.getElementById('dcl-summary-dialog')?.close();
    if (panelReady) renderAll();
    if (invasionResult) notify(invasionMessage(invasionResult), invasionResult.band === 'collapse' ? 'warning' : 'info');
    notify(`第${state.day}日新折已收入御案。`, 'success');
  } catch (error) {
    console.error('[丹宸录] AI 奏折解析失败', error);
    state.freeplay.awaiting = false;
    state.freeplay.lastError = String(error?.message ?? '案卷格式无效').slice(0, 160);
    persistState(state);
    if (panelReady) {
      renderAll();
      renderSummary();
    }
    notify('AI返回的奏折格式不完整，可在御批汇总中重新生成。', 'warning');
  }
}

function safePromptValue(value) {
  return String(value ?? '').replaceAll(/<\/?dcl_hidden_context>/gi, '').trim();
}

function formatOfficialProfile(person, stance = '') {
  return [
    `${person.name}｜${person.office}｜${person.rank}｜${person.faction}｜朝野风评：${person.reputation ?? '风评未显'}${stance ? `｜本案位置：${stance}` : ''}`,
    `外在行事：${person.publicFace}`,
    `内在矛盾：${person.core}`,
    `主要动机：${person.motive}`,
    `所惧与红线：${person.fear}`,
    `信息边界：${person.knows}`,
    `说话方式：${person.voice}`,
  ].map(safePromptValue).join('\n');
}

function formatFamilyProfile(member, official) {
  return [
    `${member.name}｜${official.name}之${member.relation}｜${member.age}岁｜${member.role}`,
    `所求与所惧：${member.motive}`,
    `信息边界：${member.knows}`,
    `说话方式：${member.voice}`,
  ].map(safePromptValue).join('\n');
}

function formatHaremProfile(member) {
  return [
    `${member.rank}${member.name}｜${member.age ?? '？'}岁｜${member.palace ?? '待定宫居'}｜${member.origin ?? ''}`,
    `所掌：${member.duty ?? member.role ?? ''}`,
    `外在行事：${member.publicFace}`,
    `内在矛盾：${member.core}`,
    `主要动机：${member.motive}`,
    `所惧与红线：${member.fear}`,
    `信息边界：${member.knows}`,
    `说话方式：${member.voice}`,
  ].map(safePromptValue).join('\n');
}

function buildCaseProfileContext(caseItem, pending) {
  const state = getState();
  const names = new Set([...caseItem.people.map(item => item.name), ...pending.map(item => item.sender)]);
  const sections = [];
  names.forEach(name => {
    const index = profileIndexByDefaultName('official', name);
    const casePerson = caseItem.people.find(item => item.name === name);
    const registryPerson = state.peopleRegistry?.find(item => item.name === name);
    if (index >= 0) {
      sections.push(formatOfficialProfile(profileAt('official', index, state), casePerson?.stance ?? ''));
      return;
    }
    if (registryPerson) {
      sections.push(formatOfficialProfile({
        name: registryPerson.name, office: registryPerson.office, rank: registryPerson.rank, faction: registryPerson.faction,
        reputation: registryPerson.reputation || '风评未显',
        publicFace: registryPerson.publicFace || '言行须由本案立场与官职推导，不套用既有官员模板。',
        core: registryPerson.core || '公开立场与实际自保之间存在尚待剧情显露的张力。',
        motive: registryPerson.motive || casePerson?.stance || '依官职与处境自行推导。',
        fear: registryPerson.fear || '惧失职、失势或案情牵连，具体依证据推进。',
        knows: registryPerson.knows || '只知道本人经手、亲见与官职范围内的事务。',
        voice: registryPerson.voice || '依官职与处境自然陈奏，区分事实、推断与传闻。',
      }, casePerson?.stance ?? ''));
      return;
    }
    if (casePerson) sections.push(formatOfficialProfile({
      name: casePerson.name, office: casePerson.office, rank: '品秩待核', faction: '未定',
      reputation: casePerson.reputation || '风评未显',
      publicFace: casePerson.publicFace || '言行须由本案立场与官职推导，不套用既有官员模板。',
      core: casePerson.core || '公开立场与实际自保之间存在尚待剧情显露的张力。',
      motive: casePerson.motive || casePerson.stance,
      fear: casePerson.fear || '惧失职、失势或案情牵连，具体依证据推进。',
      knows: casePerson.knows || '只知道本人经手、亲见与官职范围内的事务。',
      voice: casePerson.voice || '依官职与处境自然陈奏，区分事实、推断与传闻。',
    }, casePerson.stance));
  });
  return sections.length ? `本轮相关官员档案：\n\n${sections.join('\n\n')}` : '';
}

function hiddenContextBlock(contextText) {
  if (!contextText?.trim()) return '';
  return `<dcl_hidden_context>\n用途：以下为本轮相关人物的当前档案，只用于保持人物一致与信息边界。不得在正文中复述档案、提及此标签或声称看见隐藏信息。\n${safePromptValue(contextText)}\n</dcl_hidden_context>`;
}

async function sendUserAction(text, onSent, profileContext = '') {
  const ctx = context();
  if (!ctx) return false;
  const hidden = hiddenContextBlock(profileContext);
  const outgoingText = hidden ? `${text}\n\n${hidden}` : text;
  let messageSent = false;
  try {
    if (typeof ctx.executeSlashCommandsWithOptions !== 'function') throw new Error('slash command API unavailable');
    await ctx.executeSlashCommandsWithOptions(`/send ${JSON.stringify(outgoingText)}`);
    messageSent = true;
    onSent?.();
    closePanel();
    if (typeof ctx.generate === 'function') {
      await ctx.generate('normal');
    } else {
      notify('御前指令已写入聊天，请点击酒馆发送按钮继续生成。', 'info');
    }
    return true;
  } catch (error) {
    console.error('[丹宸录] 发送御前指令失败', error);
    if (messageSent) {
      notify('御前指令已经发入聊天，但 AI 回复生成失败，请在酒馆中重试生成。', 'warning');
      return true;
    }
    const textarea = document.querySelector('#send_textarea');
    if (textarea) {
      textarea.value = outgoingText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      closePanel();
      notify('已把御前指令放入输入框，请手动发送。', 'warning');
    } else {
      notify('无法发送御前指令，请复制后在聊天中发送。', 'error');
    }
    return false;
  }
}

function renderAll() {
  if (!panelReady || !isActiveCard()) return;
  renderHeader();
  renderView();
  renderMemorialList();
  renderIntel();
  renderDocument();
  renderMapSelection();
  renderInvasionToggle();
  if (getState().view === 'officials') renderNetwork();
  if (getState().view === 'harem') renderHarem();
  if (getState().view === 'profiles') renderProfiles();
  if (getState().view === 'factions') renderFactions();
  if (getState().view === 'archive') renderArchive();
}

function renderHeader() {
  const state = getState();
  const values = { authority: 'dcl-authority', treasury: 'dcl-treasury', stability: 'dcl-stability' };
  Object.entries(values).forEach(([key, id]) => { document.getElementById(id).textContent = state.stats[key]; });
  document.getElementById('dcl-day-label').textContent = `第${chineseDay(state.day)}日`;
  document.getElementById('dcl-date-label').textContent = `承熙十二年 · ${currentMemorial(state)?.date ?? '三月初七日'}`;
  document.getElementById('dcl-timeline-current').textContent = `承熙十二年 春 · ${currentCase(state).title}`;
}

function renderMemorialList() {
  const state = getState();
  const root = document.getElementById('danchenlu-root');
  if (!root) return;
  const list = currentCase(state).memorials.filter(item => state.filter === 'all' || item.type === state.filter);
  root.querySelectorAll('.dcl-filters button').forEach(button => button.classList.toggle('active', button.dataset.filter === state.filter));
  document.getElementById('dcl-memorial-list').innerHTML = list.map((item, index) => `
    <button class="dcl-memorial-card ${item.type} ${item.id === state.activeId ? 'active' : ''} ${state.reviewed[item.id] ? 'reviewed' : ''} ${state.dispatched[item.id] ? 'dispatched' : ''} ${state.doubts.includes(item.id) ? 'doubt' : ''}" data-memorial="${escapeHtml(item.id)}">
      <span class="dcl-doc-thumb"><i>${item.type === 'secret' ? '御前亲启' : '题本'}</i></span>
      <span class="dcl-memorial-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.region)} · ${escapeHtml(item.sender)}</small><em>${state.dispatched[item.id] ? '已发下' : state.reviewed[item.id] ? '待发送' : index === 0 ? '紧急' : '待阅'}</em></span>
    </button>`).join('');
  const ids = new Set(currentCase(state).memorials.map(item => item.id));
  const reviewed = Object.keys(state.reviewed).filter(id => ids.has(id)).length;
  document.getElementById('dcl-review-counter').textContent = `${reviewed} / ${currentCase(state).memorials.length}`;
  document.getElementById('dcl-pending-count').textContent = `${currentCase(state).memorials.length - reviewed} 件`;
}

function renderIntel() {
  const state = getState();
  const item = currentCase(state);
  const province = state.phase === 'freeplay'
    ? { name: '天下奏报', meta: `${item.memorials.length} 道 · AI续写第${state.freeplay.generatedCount}卷`, trend: '开放朝政 · 因果承接', severity: '案情密度：动态' }
    : PROVINCES[state.caseIndex] ?? PROVINCES[0];
  document.getElementById('dcl-province-name').textContent = province.name;
  document.getElementById('dcl-province-meta').textContent = province.meta;
  document.getElementById('dcl-case-trend').textContent = province.trend;
  document.getElementById('dcl-case-severity').textContent = province.severity;
  document.getElementById('dcl-case-list').innerHTML = item.memorials.slice(0, 3).map((memorial, index) => `
    <button class="dcl-case-row" data-memorial="${escapeHtml(memorial.id)}"><i>${index ? '中' : '重'}</i><b>${escapeHtml(memorial.title.replace(/[折疏题本]/g, '').slice(0, 11))}</b><small>矛盾线索 ${memorial.reveal.length} 处</small></button>`).join('');
  document.getElementById('dcl-official-list').innerHTML = item.people.map((person, index) => {
    const staticIndex = profileIndexByDefaultName('official', person.name);
    const registryPerson = state.peopleRegistry?.find(item => item.name === person.name);
    const reputation = staticIndex >= 0
      ? (profileAt('official', staticIndex, state).reputation ?? '风评未显')
      : (registryPerson?.reputation || person.reputation || '风评未显');
    const avatar = staticIndex >= 0
      ? resolvePortraitUrl(profileAt('official', staticIndex, state).portrait, 'official')
      : registryPerson?.portrait
        ? resolvePortraitUrl(registryPerson.portrait, registryPerson.kind === 'harem' ? 'harem' : registryPerson.kind === 'family' ? 'family' : 'official')
        : PLACEHOLDER_AVATAR;
    return `<button class="dcl-official-row" data-view="officials"><img class="dcl-portrait" src="${avatar}" alt="${escapeHtml(person.name)}画像"><div><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.office)}</small></div><em>${escapeHtml(reputation)}</em></button>`;
  }).join('');
  document.getElementById('dcl-faction-meter').innerHTML = factionOverview(state).slice(0, 4).map(faction => `<span><i>${escapeHtml(faction.name.slice(0, 1))}</i><b>${faction.influence}%</b><small>${escapeHtml(faction.name)}</small></span>`).join('');
  document.getElementById('dcl-conflict-count').textContent = item.memorials.filter(memorial => memorial.suspicious).length;
}

function factionOverview(state) {
  const staticRivals = {
    '清流': ['务实', '勋贵'],
    '务实': ['清流', '内廷'],
    '勋贵': ['清流', '内廷'],
    '内廷': ['务实', '勋贵'],
  };
  const staticFactions = [
    ['清流', '清查攻讦', state.staticFactionInfluence?.['清流'] ?? 42],
    ['务实', '先赈后查', state.staticFactionInfluence?.['务实'] ?? 28],
    ['勋贵', '边功军饷', state.staticFactionInfluence?.['勋贵'] ?? 17],
    ['内廷', '御前密报', state.staticFactionInfluence?.['内廷'] ?? 13],
  ].map(([name, description, influence]) => ({
    id: name, name, description, influence, members: [], static: true,
    rivals: (staticRivals[name] ?? []).map(rival => {
      const rivalFaction = staticRivals[rival] ? { id: rival, name: rival, static: true } : { id: rival, name: rival, static: false };
      return rivalFaction;
    }),
  }));
  const dynamic = (state.dynamicFactions ?? []).map(faction => ({ ...faction, static: false }));
  return [...dynamic, ...staticFactions];
}

function polarToCartesian(cx, cy, radius, angleDegrees) {
  const radians = ((angleDegrees - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function factionSectorPath(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`;
}

function factionLabelTransform(cx, cy, radius, midAngle) {
  const pos = polarToCartesian(cx, cy, radius, midAngle);
  const rotation = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;
  return `translate(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}) rotate(${rotation.toFixed(1)})`;
}

function dynamicFactionColor(name) {
  const hash = [...String(name)].reduce((sum, char) => sum + char.codePointAt(0), 0);
  return DYNAMIC_FACTION_COLORS[hash % DYNAMIC_FACTION_COLORS.length];
}

function semanticSections(memorial) {
  const all = memorial.body.map(stripMarkup).join('');
  const sentences = all.split(/(?<=[。！？；])/).filter(Boolean);
  const midpoint = Math.ceil(sentences.length / 2);
  return [
    ['起因时地', `${memorial.date}，${memorial.region}。${sentences[0] ?? ''}`],
    ['经过与数字', sentences.slice(1, midpoint).join('') || sentences[0]],
    ['证据与攻讦', sentences.slice(midpoint).join('') || '诸臣所奏互有抵牾，请核验文册。'],
    ['所请处分', `${memorial.lead}。伏乞圣裁。`],
    ['具名日期', `${memorial.office} ${memorial.sender} 谨奏。承熙十二年${memorial.date}`],
  ];
}

function renderDocument() {
  const state = getState();
  const memorial = currentMemorial(state);
  if (!memorial || !panelReady) return;
  const documentElement = document.getElementById('dcl-document');
  const reviewed = Boolean(state.reviewed[memorial.id]);
  const dispatched = Boolean(state.dispatched[memorial.id]);
  documentElement.className = `dcl-document ${memorial.type} ${state.open ? 'open' : 'closed'} ${reviewed ? 'reviewed' : ''} ${dispatched ? 'dispatched' : ''}`;
  document.getElementById('dcl-document-kind').textContent = memorial.type === 'secret' ? '密折 · 直达御前 · 未经内阁' : '正式题本 · 通政司验封 · 附内阁票拟';
  document.getElementById('dcl-memorial-title').textContent = memorial.title;
  const coverInscription = `臣${memorial.sender}谨奏`;
  document.getElementById('dcl-cover-title').textContent = coverInscription;
  document.getElementById('dcl-cover-type').textContent = memorial.type === 'secret' ? '密折' : '题本';
  document.getElementById('dcl-secret-cover-title').textContent = coverInscription;
  document.getElementById('dcl-paper-folds').innerHTML = semanticSections(memorial).reverse().map(([heading, text]) => `
    <section class="dcl-paper-panel"><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p>${heading === '具名日期' && memorial.cabinet ? `<aside>内阁票拟：${escapeHtml(memorial.cabinet)}</aside>` : ''}</section>`).join('');
  document.getElementById('dcl-vermilion').textContent = state.replies[memorial.id] ?? '';
  const textarea = document.getElementById('dcl-custom-reply');
  textarea.value = state.replies[memorial.id] ?? '';
  textarea.disabled = dispatched;
  const foldButton = document.getElementById('dcl-fold-button');
  foldButton.textContent = state.open ? '合卷' : '开折';
  foldButton.setAttribute('aria-expanded', String(state.open));
  const doubtButton = document.getElementById('dcl-doubt-button');
  doubtButton.textContent = state.doubts.includes(memorial.id) ? '已留中' : '留中存疑';
  doubtButton.classList.toggle('active', state.doubts.includes(memorial.id));
  doubtButton.disabled = dispatched;
  document.querySelectorAll('#danchenlu-root [data-reply]').forEach(button => button.classList.toggle('selected', button.dataset.reply === textarea.value));
  updateSubmitState();
}

function updateSubmitState() {
  const state = getState();
  const reply = document.getElementById('dcl-custom-reply')?.value.trim();
  const button = document.getElementById('dcl-submit');
  if (button) {
    button.disabled = Boolean(state.dispatched[state.activeId]) || !reply;
    button.textContent = state.dispatched[state.activeId] ? '已发下' : state.reviewed[state.activeId] ? '更新暂存' : '暂存朱批';
  }
}

function renderMapSelection() {
  const state = getState();
  document.querySelectorAll('#danchenlu-root .dcl-map-node[data-case]').forEach(node => {
    node.classList.toggle('active', state.phase === 'intro' && node.dataset.case === currentCase(state).id);
    node.classList.toggle('archived', state.phase === 'freeplay');
  });
  const frame = document.getElementById('dcl-map-frame');
  if (!frame) return;
  let host = frame.querySelector('.dcl-map-dynamic-nodes');
  if (!host) {
    host = document.createElement('div');
    host.className = 'dcl-map-dynamic-nodes';
    frame.append(host);
  }
  const zoneCounts = new Map();
  host.innerHTML = state.mapNodes.map((node, index) => {
    const zoneKey = provinceZoneKey(node.region);
    const zoneIndex = zoneCounts.get(zoneKey) ?? 0;
    zoneCounts.set(zoneKey, zoneIndex + 1);
    const position = node.x !== null && node.x !== undefined && node.y !== null && node.y !== undefined
      ? { x: node.x, y: node.y }
      : dynamicNodePosition(node.name, node.region, zoneIndex);
    const matched = state.phase === 'freeplay' && state.dynamicCase?.memorials?.some(item => item.region === node.region || node.region.includes(item.region));
    return `<button class="dcl-map-node dynamic ${matched ? 'active' : ''}" data-map-node="${escapeHtml(node.id)}" style="--x:${position.x}%;--y:${position.y}%"><i>${node.severity === '高' ? '急' : node.severity === '中' ? '重' : '缓'}</i><span>${escapeHtml(node.name)}</span><small>${escapeHtml(node.region)}</small></button>`;
  }).join('');
}

function provinceZoneKey(region) {
  const text = String(region ?? '');
  for (const key of Object.keys(PROVINCE_ZONES)) {
    if (text.includes(key)) return key;
  }
  return '';
}

function dynamicNodePosition(name, region, zoneIndex = 0) {
  const zoneKey = provinceZoneKey(region);
  const zone = PROVINCE_ZONES[zoneKey];
  if (zone) {
    const goldenAngle = 137.508;
    const angle = zoneIndex * goldenAngle;
    const radius = 4.5 + Math.floor(zoneIndex / 6) * 4 + (zoneIndex % 6) * 1.1;
    const radians = (angle * Math.PI) / 180;
    const x = Math.min(94, Math.max(6, zone.x + Math.cos(radians) * radius));
    const y = Math.min(92, Math.max(8, zone.y + Math.sin(radians) * radius));
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  }
  const hash = [...String(name)].reduce((sum, char) => sum + char.codePointAt(0), 0);
  const x = 16 + ((hash * 37) % 68);
  const y = 20 + ((hash * 19) % 60);
  return { x, y };
}

function selectMapNode(nodeId) {
  const state = getState();
  const node = state.mapNodes.find(item => item.id === nodeId);
  if (!node || state.phase !== 'freeplay' || !state.dynamicCase) return;
  const memorial = state.dynamicCase.memorials.find(item => item.region === node.region || node.region.includes(item.region));
  state.activeId = memorial?.id ?? state.dynamicCase.memorials[0].id;
  state.view = 'desk';
  state.open = false;
  persistState(state);
  renderAll();
}

function renderNetwork() {
  const board = document.getElementById('dcl-network-board');
  if (!board) return;
  networkMode = 'officials';
  board.dataset.mode = networkMode;
  const state = getState();
  const nodes = officialNodeList(state);
  const nodeByRef = new Map(nodes.map(node => [node.ref, node]));
  const nameToRef = new Map(nodes.map(node => [node.name, node.ref]));
  const staticLines = NETWORK_EDGES.map(([a, b, type, label]) => {
    const from = nodeByRef.get(String(a));
    const to = nodeByRef.get(String(b));
    if (!from || !to) return '';
    return `<line data-edge="${type}" class="${type}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"><title>${escapeHtml(label)}</title></line>`;
  }).join('');
  const dynamicLines = state.dynamicEdges.map(edge => {
    const fromRef = nameToRef.get(edge.a);
    const toRef = nameToRef.get(edge.b);
    const from = fromRef ? nodeByRef.get(fromRef) : null;
    const to = toRef ? nodeByRef.get(toRef) : null;
    if (!from || !to) return '';
    return `<line data-edge="${edge.type}" class="${edge.type}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"><title>${escapeHtml(edge.label)}</title></line>`;
  }).join('');
  board.innerHTML = `<svg class="dcl-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${staticLines}${dynamicLines}</svg>${nodes.map(node => `<button class="dcl-person-node ${node.ref === selectedOfficialRef ? 'selected' : ''} ${node.dynamic ? 'dcl-person-dynamic' : ''}" data-person="${escapeHtml(node.ref)}" data-name="${escapeHtml(node.name)}" style="--x:${node.x}%;--y:${node.y}%">${node.portrait ? `<img src="${resolvePortraitUrl(node.portrait, 'official')}" alt="${escapeHtml(node.name)}画像">` : `<i class="dcl-avatar-letter">${escapeHtml(node.name.slice(0, 1))}</i>`}<span><b>${escapeHtml(node.name)}</b><small>${escapeHtml(node.office)}</small></span></button>`).join('')}`;
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === 'all'));
  selectOfficial(selectedOfficialRef);
}

function officialNodeList(state) {
  const casualties = new Set(state.casualties?.officials ?? []);
  const statics = profilesOf('official', state)
    .filter(person => !casualties.has(person.name))
    .map((person, index) => {
      const originalIndex = OFFICIALS.findIndex(item => item.name === person.name);
      return {
        ref: String(originalIndex),
        staticIndex: originalIndex,
        name: person.name,
        office: person.office,
        portrait: person.portrait,
        x: person.x,
        y: person.y,
        dynamic: false,
      };
    });
  const dynamics = (state.peopleRegistry ?? [])
    .filter(item => (item.kind === 'official' || item.kind === 'case') && !casualties.has(item.name))
    .map((person, index) => {
      const position = dynamicNodePosition(person.name, statics.length + index);
      return {
        ref: `d${index}`,
        staticIndex: null,
        name: person.name,
        office: person.office,
        portrait: person.portrait || '',
        x: person.x ?? position.x,
        y: person.y ?? position.y,
        dynamic: true,
      };
    });
  return [...statics, ...dynamics];
}

function selectOfficial(ref) {
  const state = getState();
  const nodes = officialNodeList(state);
  const node = nodes.find(item => item.ref === String(ref));
  if (!node) return;
  selectedOfficialRef = String(ref);
  const connected = new Set([String(ref)]);
  const nameToRef = new Map(nodes.map(item => [item.name, item.ref]));
  NETWORK_EDGES.forEach(edge => {
    if (String(edge[0]) === String(ref)) connected.add(String(edge[1]));
    if (String(edge[1]) === String(ref)) connected.add(String(edge[0]));
  });
  state.dynamicEdges.forEach(edge => {
    if (edge.a === node.name) connected.add(nameToRef.get(edge.b) ?? edge.b);
    if (edge.b === node.name) connected.add(nameToRef.get(edge.a) ?? edge.a);
  });
  document.querySelectorAll('#danchenlu-root .dcl-person-node').forEach((node, nodeIndex) => {
    const nodeRef = node.dataset.person;
    node.classList.toggle('selected', nodeRef === selectedOfficialRef);
    if (networkMode === 'officials') node.classList.toggle('relation-muted', !connected.has(nodeRef));
  });
  if (networkMode === 'officials') document.querySelectorAll('#danchenlu-root .dcl-network-lines line').forEach((line, edgeIndex) => {
      const lineEdges = [...NETWORK_EDGES, ...(state.dynamicEdges ?? [])];
      const edge = lineEdges[edgeIndex];
      if (!edge) return;
      const aRef = typeof edge[0] === 'number' ? String(edge[0]) : nameToRef.get(edge.a) ?? edge.a;
      const bRef = typeof edge[1] === 'number' ? String(edge[1]) : nameToRef.get(edge.b) ?? edge.b;
      line.classList.toggle('relation-muted', aRef !== selectedOfficialRef && bRef !== selectedOfficialRef);
    });
  const staticIndex = node.staticIndex;
  const ties = NETWORK_EDGES.filter(edge => edge[0] === staticIndex || edge[1] === staticIndex).map(edge => {
    const other = profileAt('official', edge[0] === staticIndex ? edge[1] : edge[0], state);
    return `<li><i class="${edge[2]}"></i><b>${escapeHtml(other.name)}</b><span>${escapeHtml(edge[3])}</span></li>`;
  }).join('');
  const dynamicTies = (state.dynamicEdges ?? []).filter(edge => edge.a === node.name || edge.b === node.name).map(edge => {
    const otherName = edge.a === node.name ? edge.b : edge.a;
    return `<li><i class="${edge.type}"></i><b>${escapeHtml(otherName)}</b><span>${escapeHtml(edge.label)}</span></li>`;
  }).join('');
  if (staticIndex === null) {
    const dynamicPerson = state.peopleRegistry.find(item => item.name === node.name);
    if (dynamicPerson) {
      const dynamicAvatar = dynamicPerson.portrait ? `<img src="${resolvePortraitUrl(dynamicPerson.portrait, dynamicPerson.kind === 'harem' ? 'harem' : dynamicPerson.kind === 'family' ? 'family' : 'official')}" alt="${escapeHtml(dynamicPerson.name)}">` : `<i class="dcl-avatar-letter large">${escapeHtml(dynamicPerson.name.slice(0, 1))}</i>`;
      document.getElementById('dcl-official-dossier').innerHTML = `<div class="dcl-dossier-portrait dcl-family-portrait">${dynamicAvatar}</div><small>${escapeHtml(dynamicPerson.rank)} · ${escapeHtml(dynamicPerson.faction)}</small><h2>${escapeHtml(dynamicPerson.name)}</h2><b>${escapeHtml(dynamicPerson.office)}</b><dl><dt>籍贯</dt><dd>${escapeHtml(dynamicPerson.origin || '待考')}</dd><dt>出身</dt><dd>${escapeHtml(dynamicPerson.role || '待考')}</dd><dt>朝野风评</dt><dd>${escapeHtml(dynamicPerson.reputation || '风评未显')}</dd><dt>首见</dt><dd>第${chineseDay(dynamicPerson.firstSeenDay)}日</dd><dt>最近</dt><dd>第${chineseDay(dynamicPerson.lastSeenDay)}日</dd></dl><p class="dcl-reputation-note">风评是朝野眼中的形象，不等于其真实品格与作为。</p><h3>外在行事</h3><p>${escapeHtml(dynamicPerson.publicFace || '言行由官职与处境推导。')}</p><h3>内在矛盾</h3><p>${escapeHtml(dynamicPerson.core || '公开立场与实际自保之间存在张力。')}</p><h3>所求与所惧</h3><p>${escapeHtml(dynamicPerson.motive || '')} ${escapeHtml(dynamicPerson.fear || '')}</p><h3>信息边界</h3><p>${escapeHtml(dynamicPerson.knows)}</p><small>说话方式：${escapeHtml(dynamicPerson.voice)}</small><h3>官场关系</h3><ul>${dynamicTies || '<li><span>暂无已登记关系</span></li>'}</ul>`;
      return;
    }
  }
  const person = profileAt('official', staticIndex, state);
  if (!person) return;
  const family = profilesOf('family', state).map((member, familyIndex) => ({ member, familyIndex })).filter(item => item.member.official === staticIndex);
  const familyCards = family.map(({ member, familyIndex }) => `<button class="dcl-family-chip" data-family-member="${familyIndex}" data-name="${escapeHtml(member.name)}"><img src="${resolvePortraitUrl(member.portrait, 'family')}" alt="${escapeHtml(member.name)}"><span><b>${escapeHtml(member.name)}</b><small>${escapeHtml(member.relation)} · ${escapeHtml(member.role)}</small></span></button>`).join('');
  document.getElementById('dcl-official-dossier').innerHTML = `<div class="dcl-dossier-portrait"><img src="${resolvePortraitUrl(person.portrait, 'official')}" alt="${escapeHtml(person.name)}"></div><small>${escapeHtml(person.rank)} · ${escapeHtml(person.faction)}</small><h2>${escapeHtml(person.name)}</h2><b>${escapeHtml(person.office)}</b><dl><dt>籍贯</dt><dd>${escapeHtml(person.origin)}</dd><dt>入仕</dt><dd>${escapeHtml(person.exam)}</dd><dt>朝野风评</dt><dd>${escapeHtml(person.reputation ?? '风评未显')}</dd></dl><p class="dcl-reputation-note">风评是朝野眼中的形象，不等于其真实品格与作为。</p><div class="dcl-dossier-title"><h3>内宅关系</h3><button data-open-family="${staticIndex}">展开家眷图</button></div><div class="dcl-family-list">${familyCards}</div><h3>官场关系</h3><ul>${ties}${dynamicTies}</ul>`;
}

function renderFamilyNetwork(officialIndex = selectedOfficialIndex, selectedFamilyIndex = null) {
  const board = document.getElementById('dcl-network-board');
  const state = getState();
  const official = profileAt('official', officialIndex, state);
  if (!board || !official) return;
  selectedOfficialIndex = officialIndex;
  networkMode = 'family';
  board.dataset.mode = networkMode;
  const family = profilesOf('family', state).map((member, index) => ({ member, index })).filter(item => item.member.official === officialIndex);
  const positions = family.length === 3 ? [[24, 29], [76, 29], [50, 78]] : [[27, 32], [73, 68]];
  const lines = family.map(({ member }, localIndex) => {
    const [x, y] = positions[localIndex];
    const type = member.relation.includes('女') ? 'daughter' : member.relation === '正妻' ? 'spouse' : 'concubine';
    return `<line data-edge="family" class="${type}" x1="50" y1="50" x2="${x}" y2="${y}"><title>${escapeHtml(member.relation)}</title></line>`;
  }).join('');
  const nodes = family.map(({ member, index }, localIndex) => {
    const [x, y] = positions[localIndex];
    return `<button class="dcl-person-node dcl-family-node" data-family-member="${index}" data-name="${escapeHtml(member.name)}" style="--x:${x}%;--y:${y}%"><img src="${resolvePortraitUrl(member.portrait, 'family')}" alt="${escapeHtml(member.name)}画像"><span><b>${escapeHtml(member.name)}</b><small>${escapeHtml(member.relation)} · ${escapeHtml(member.role)}</small></span></button>`;
  }).join('');
  board.innerHTML = `<div class="dcl-house-label"><small>内宅关系</small><b>${escapeHtml(official.name)}家</b><button data-relation="all">返回官场网</button></div><svg class="dcl-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg><button class="dcl-person-node dcl-house-anchor selected" data-person="${officialIndex}" data-name="${escapeHtml(official.name)}" style="--x:50%;--y:50%"><img src="${resolvePortraitUrl(official.portrait, 'official')}" alt="${escapeHtml(official.name)}画像"><span><b>${escapeHtml(official.name)}</b><small>${escapeHtml(official.office)}</small></span></button>${nodes}`;
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === 'family'));
  if (selectedFamilyIndex === null) selectOfficial(officialIndex); else selectFamilyMember(selectedFamilyIndex);
}

function selectFamilyMember(index) {
  const state = getState();
  const member = profileAt('family', index, state);
  if (!member) return;
  if (networkMode !== 'family' || member.official !== selectedOfficialIndex) {
    renderFamilyNetwork(member.official, index);
    return;
  }
  const official = profileAt('official', member.official, state);
  document.querySelectorAll('#danchenlu-root .dcl-person-node').forEach(node => {
    node.classList.toggle('selected', Number(node.dataset.familyMember) === index);
    node.classList.toggle('relation-muted', node.dataset.person === undefined && Number(node.dataset.familyMember) !== index);
  });
  const crossTies = (member.connections ?? []).map(tie => `<li><i class="kin"></i><b>${escapeHtml(profileAt('official', tie.official, state).name)}</b><span>${escapeHtml(tie.label)}</span></li>`).join('');
  document.getElementById('dcl-official-dossier').innerHTML = `<div class="dcl-dossier-portrait dcl-family-portrait"><img src="${resolvePortraitUrl(member.portrait, 'family')}" alt="${escapeHtml(member.name)}"></div><small>成年家眷 · ${escapeHtml(member.relation)}</small><h2>${escapeHtml(member.name)}</h2><b>${escapeHtml(member.role)}</b><dl><dt>年龄</dt><dd>${member.age}岁</dd><dt>出身</dt><dd>${escapeHtml(member.origin)}</dd><dt>关系</dt><dd>${escapeHtml(official.name)}之${escapeHtml(member.relation)}</dd><dt>立场</dt><dd>独立判断</dd></dl><h3>所求与所惧</h3><p class="dcl-family-motive">${escapeHtml(member.motive)}</p><h3>直接关系</h3><ul><li><i class="${member.relation.includes('女') ? 'daughter' : 'spouse'}"></i><b>${escapeHtml(official.name)}</b><span>${escapeHtml(member.relation)}</span></li>${crossTies}</ul>`;
}

function filterRelations(type) {
  if (type === 'family') {
    const node = officialNodeList(getState()).find(item => item.ref === selectedOfficialRef);
    if (node?.staticIndex !== null && node?.staticIndex !== undefined) {
      renderFamilyNetwork(node.staticIndex);
    } else {
      toast('新涉人物暂无家眷档案，已回到官场网络');
      renderNetwork();
    }
    return;
  }
  if (networkMode === 'family') renderNetwork();
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === type));
  document.querySelectorAll('#danchenlu-root .dcl-network-lines line').forEach(line => line.classList.toggle('muted', type !== 'all' && line.dataset.edge !== type));
}

function defaultProfileTarget() {
  return { type: 'official', index: 0 };
}

function selectProfileKind(type) {
  if (!PROFILE_FIELDS[type]) return;
  profileEditorTarget = { type, index: 0 };
  renderProfiles();
}

function selectProfile(index, dynamic = false) {
  const type = profileEditorTarget?.type ?? 'official';
  if (dynamic || type === 'dynamic') {
    const state = getState();
    if (!state.peopleRegistry?.[index]) return;
    profileEditorTarget = { type: 'dynamic', index };
    renderProfiles();
    return;
  }
  if (!PROFILE_DEFAULTS[type]?.[index]) return;
  profileEditorTarget = { type, index };
  renderProfiles();
}

function profileKindLabel(type) {
  return ({ official: '官员', family: '家眷', harem: '后宫', dynamic: '新涉人物' })[type] ?? type;
}

function renderProfiles() {
  const currentState = getState();
  const casualtiesSet = new Set(currentState.casualties?.officials ?? []);
  const visibleRegistry = (currentState.peopleRegistry ?? [])
    .map((profile, registryIndex) => ({ profile, registryIndex }))
    .filter(item => !casualtiesSet.has(item.profile.name));
  const dynamicCount = visibleRegistry.length;
  const validTarget = profileEditorTarget && (profileEditorTarget.type === 'dynamic'
    ? visibleRegistry.some(item => item.registryIndex === profileEditorTarget.index)
    : Boolean(PROFILE_DEFAULTS[profileEditorTarget.type]?.[profileEditorTarget.index]));
  if (!validTarget) {
    profileEditorTarget = defaultProfileTarget();
  }
  const { type, index } = profileEditorTarget;
  const state = getState();
  const list = document.getElementById('dcl-profile-list');
  if (!list) return;
  document.querySelectorAll('#danchenlu-root [data-profile-kind]').forEach(button => {
    button.classList.toggle('active', button.dataset.profileKind === type);
  });
  const dynamicKindMap = { official: ['official', 'case'], family: ['family'], harem: ['harem'], dynamic: null };
  const profiles = type === 'dynamic'
    ? visibleRegistry.map(item => ({ profile: item.profile, profileIndex: item.registryIndex, dynamic: true }))
    : [
        ...profilesOf(type, state).map((profile, profileIndex) => ({ profile, profileIndex, dynamic: false })),
        ...visibleRegistry
          .filter(item => (dynamicKindMap[type] ?? []).includes(item.profile.kind))
          .map(item => ({ profile: item.profile, profileIndex: item.registryIndex, dynamic: true })),
      ];
  list.innerHTML = profiles.map(({ profile, profileIndex, dynamic }) => {
    const changed = dynamic ? false : Boolean(state.profileOverrides?.[type]?.[profileIndex]);
    const statusLabel = dynamic ? '新涉' : changed ? '已修改' : '原始';
    const subtitle = type === 'official' ? profile.office
      : type === 'family' ? `${profile.relation} · ${profile.role}`
      : type === 'harem' ? `${profile.rank} · ${profile.palace}`
      : `${profile.office}${profile.role ? ` · ${profile.role}` : ''}`;
    const selected = dynamic
      ? (profileEditorTarget?.type === 'dynamic' && profileEditorTarget.index === profileIndex)
      : profileIndex === index;
    return `<button class="dcl-profile-row ${selected ? 'selected' : ''}" data-profile-index="${profileIndex}" ${dynamic ? 'data-profile-dynamic="1"' : ''}><span><b>${escapeHtml(profile.name)}</b><small>${escapeHtml(subtitle)}</small></span><em>${statusLabel}</em></button>`;
  }).join('');
  renderProfileEditor();
}

function renderProfileEditor() {
  if (!profileEditorTarget) return;
  const { type, index } = profileEditorTarget;
  const state = getState();
  const dynamic = type === 'dynamic';
  const profile = dynamic ? state.peopleRegistry?.[index] : profileAt(type, index, state);
  const overrides = dynamic ? {} : (state.profileOverrides?.[type]?.[index] ?? {});
  if (!profile) return;
  document.getElementById('dcl-profile-source').textContent = dynamic
    ? `新涉人物 · 首见第${chineseDay(profile.firstSeenDay)}日`
    : Object.keys(overrides).length ? `玩家自定 · ${Object.keys(overrides).length} 项改动` : '原始档案';
  document.getElementById('dcl-profile-title').textContent = `${profileKindLabel(type)} · ${profile.name}`;
  const resetButton = document.querySelector('#danchenlu-root [data-action="reset-profile"]');
  if (resetButton) resetButton.textContent = dynamic ? '移除此人' : '恢复此人默认';
  const avatarKind = type === 'family' ? 'family'
    : type === 'harem' ? 'harem'
    : type === 'dynamic' && profile.kind === 'harem' ? 'harem'
    : type === 'dynamic' && profile.kind === 'family' ? 'family'
    : 'official';
  const avatarUrl = resolvePortraitUrl(profile.portrait, avatarKind);
  document.getElementById('dcl-profile-fields').innerHTML = `
    <div class="dcl-profile-portrait">
      <img src="${avatarUrl}" alt="${escapeHtml(profile.name)}立绘">
      <div>
        <small>立绘会同步到关系网、后宫与人物列表</small>
        <button type="button" data-action="upload-portrait">上传立绘</button>
        <button type="button" data-action="reset-portrait">恢复默认</button>
        <input type="file" id="dcl-portrait-import" accept="image/*" hidden>
      </div>
    </div>` + PROFILE_FIELDS[type].map(([key, label]) => {
    const value = profile[key] ?? '';
    const original = dynamic ? '' : (PROFILE_DEFAULTS[type][index][key] ?? '');
    const changed = dynamic ? false : Object.hasOwn(overrides, key);
    const input = key === 'age'
      ? `<input name="${key}" type="number" min="18" max="99" value="${escapeHtml(value)}">`
      : key === 'name' && dynamic
        ? `<input name="${key}" value="${escapeHtml(value)}" disabled>`
      : `<textarea name="${key}" maxlength="600" rows="${String(value).length > 80 ? 4 : 2}">${escapeHtml(value)}</textarea>`;
    return `<label class="${changed ? 'changed' : ''}"><span>${escapeHtml(label)}${changed ? '<em>已修改</em>' : ''}</span>${input}${dynamic ? '' : `<small>原始：${escapeHtml(original)}</small>`}</label>`;
  }).join('');
}

function saveCurrentProfile(formData) {
  if (!profileEditorTarget) return;
  const { type, index } = profileEditorTarget;
  if (type === 'dynamic') {
    const state = getState();
    const target = state.peopleRegistry?.[index];
    if (!target) return;
    const keptName = target.name;
    PROFILE_FIELDS.dynamic.forEach(([key]) => {
      if (key === 'name') return;
      const raw = formData.get(key);
      target[key] = String(raw ?? '').trim().slice(0, 600);
    });
    state.peopleRegistry = normalizeRegistryPeople(state.peopleRegistry, state.day);
    persistState(state);
    const newIndex = state.peopleRegistry.findIndex(item => item.name === keptName);
    if (newIndex >= 0) profileEditorTarget = { type, index: newIndex };
    renderProfiles();
    toast('新涉人物档案已保存');
    return;
  }
  const defaults = PROFILE_DEFAULTS[type][index];
  const fields = Object.fromEntries(PROFILE_FIELDS[type].flatMap(([key]) => {
    const raw = formData.get(key);
    const value = key === 'age' ? clampInt(raw, 18, 99, defaults[key]) : String(raw ?? '').trim().slice(0, 600);
    return value === defaults[key] ? [] : [[key, value]];
  }));
  const state = getState();
  const existing = state.profileOverrides?.[type]?.[index] ?? {};
  const merged = { ...existing, ...fields };
  if (Object.keys(merged).length) state.profileOverrides[type][index] = merged;
  else delete state.profileOverrides[type][index];
  persistState(state);
  renderProfiles();
  toast('人物档案已保存');
}

function resetCurrentProfile() {
  if (!profileEditorTarget) return;
  const { type, index } = profileEditorTarget;
  const state = getState();
  if (type === 'dynamic') {
    state.peopleRegistry.splice(index, 1);
    state.peopleRegistry = normalizeRegistryPeople(state.peopleRegistry, state.day);
    profileEditorTarget = defaultProfileTarget();
    persistState(state);
    renderProfiles();
    toast('该新涉人物已从档案馆移除');
    return;
  }
  delete state.profileOverrides[type][index];
  persistState(state);
  renderProfiles();
  toast('已恢复此人的原始档案');
}

function resetAllProfiles() {
  const state = getState();
  state.profileOverrides = { official: {}, family: {}, harem: {} };
  persistState(state);
  renderProfiles();
  toast('全部人物已恢复原始档案');
}

async function compressPortrait(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read failed'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('decode failed'));
      image.onload = () => {
        const maxSide = 320;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const webp = canvas.toDataURL('image/webp', 0.84);
        resolve(webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', 0.85));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  if (dataUrl.length > 400000) throw new Error('compressed image too large');
  return dataUrl;
}

async function handlePortraitUpload(input) {
  const file = input?.files?.[0];
  input.value = '';
  if (!file || !profileEditorTarget) return;
  if (!/^image\//.test(file.type)) {
    notify('请选择图片文件。', 'error');
    return;
  }
  try {
    const dataUrl = await compressPortrait(file);
    const { type, index } = profileEditorTarget;
    const state = getState();
    if (type === 'dynamic') {
      const target = state.peopleRegistry?.[index];
      if (!target) return;
      target.portrait = dataUrl;
      state.peopleRegistry = normalizeRegistryPeople(state.peopleRegistry, state.day);
      persistState(state);
      const newIndex = state.peopleRegistry.findIndex(item => item.name === target.name);
      if (newIndex >= 0) profileEditorTarget = { type, index: newIndex };
    } else {
      state.profileOverrides[type] ??= {};
      state.profileOverrides[type][index] ??= {};
      state.profileOverrides[type][index].portrait = dataUrl;
      persistState(state);
    }
    renderProfiles();
    toast('立绘已更新');
  } catch (error) {
    console.error('[丹宸录] 立绘上传失败', error);
    notify('图片处理失败，请换一张较小图片重试。', 'error');
  }
}

function resetPortrait() {
  if (!profileEditorTarget) return;
  const { type, index } = profileEditorTarget;
  const state = getState();
  if (type === 'dynamic') {
    const target = state.peopleRegistry?.[index];
    if (!target) return;
    delete target.portrait;
    state.peopleRegistry = normalizeRegistryPeople(state.peopleRegistry, state.day);
  } else {
    delete state.profileOverrides?.[type]?.[index]?.portrait;
  }
  persistState(state);
  renderProfiles();
  toast('已恢复默认立绘');
}

function exportProfiles() {
  const state = getState();
  const payload = JSON.stringify({ format: 'danchenlu-profiles', version: PROFILE_EXPORT_VERSION, profileOverrides: state.profileOverrides }, null, 2);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  link.download = `丹宸录-人物档案-第${state.day}日.json`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 0);
  toast('人物改动已导出');
}

async function importProfiles(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (payload?.format !== 'danchenlu-profiles' || payload?.version !== PROFILE_EXPORT_VERSION) throw new Error('unsupported profile file');
    const state = getState();
    state.profileOverrides = normalizeProfileOverrides(payload.profileOverrides);
    persistState(state);
    renderProfiles();
    toast('人物档案已导入');
  } catch (error) {
    console.error('[丹宸录] 导入人物档案失败', error);
    notify('人物档案文件无法识别，未改动当前设定。', 'error');
  }
}

function selectConsort(consortId) {
  const state = getState();
  const dynamicIds = new Set((state.peopleRegistry ?? []).filter(item => item.kind === 'harem').map(item => item.name));
  if (!HAREM_IDS.has(consortId) && !dynamicIds.has(consortId)) return;
  state.harem.selectedId = consortId;
  persistState(state);
  renderHarem();
}

function haremActionLabel(type) {
  return type === 'dine' ? '同席用膳' : '召见问话';
}

function renderHarem() {
  const state = getState();
  const member = selectedConsort(state);
  const casualties = new Set(state.casualties?.harem ?? []);
  const removed = new Set(state.harem?.removed ?? []);
  const haremMembers = [
    ...profilesOf('harem', state).filter(item => !casualties.has(item.name) && !removed.has(item.name)),
    ...(state.peopleRegistry ?? []).filter(item => item.kind === 'harem' && !casualties.has(item.name) && !removed.has(item.name)),
  ];
  const roster = document.getElementById('dcl-harem-roster');
  const overview = document.getElementById('dcl-harem-overview');
  const dossier = document.getElementById('dcl-harem-dossier');
  if (!roster || !overview || !dossier || !member) return;

  const todayCount = state.harem.log.filter(item => item.day === state.day).length;
  const latest = state.harem.log.at(-1);
  const latestMember = latest ? haremMembers.find(item => item.id === latest.consortId) : null;
  const latestLabel = latestMember ? `第${chineseDay(latest.day)}日 · ${escapeHtml(latestMember.rank ?? '')}${escapeHtml(latestMember.name)} · ${haremActionLabel(latest.type)}` : '尚无记录';
  overview.innerHTML = `
    <span><small>宫册在位</small><b>${haremMembers.length} 人</b></span>
    <span><small>今日召见</small><b>${todayCount} 次</b></span>
    <span><small>最近宫务</small><b>${latestLabel}</b></span>
    <em>次数只记宫务事实，不等同爱意、忠诚或人物全部性格</em>`;

  roster.innerHTML = haremMembers.map(item => {
    const record = visitRecord(state, item.id);
    const visit = record.lastDay ? `第${chineseDay(record.lastDay)}日 · ${haremActionLabel(record.lastType)}` : '尚未召见';
    return `<button class="dcl-consort-card ${item.id === member.id ? 'selected' : ''}" data-consort="${escapeHtml(item.id)}" aria-pressed="${item.id === member.id}">
      <img src="${resolvePortraitUrl(item.portrait, 'harem')}" alt="${escapeHtml(item.rank)}${escapeHtml(item.name)}画像">
      <span><i>${escapeHtml(item.rank ?? '宫人')}</i><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.palace ?? '待定宫居')} · ${escapeHtml(item.standing ?? (item.kind === 'harem' ? '新涉宫人' : '在册'))}</small><em>${escapeHtml(visit)}</em></span>
    </button>`;
  }).join('');

  const record = visitRecord(state, member.id);
  const memberRank = member.rank ?? '宫人';
  const memberPalace = member.palace ?? '待定宫居';
  const memberStanding = member.standing ?? (member.kind === 'harem' ? '新涉宫人' : '在册');
  const memberOrigin = member.origin ?? '';
  const memberDuty = member.duty ?? member.role ?? '';
  dossier.innerHTML = `
    <div class="dcl-harem-feature"><img src="${resolvePortraitUrl(member.portrait, 'harem')}" alt="${escapeHtml(member.name)}画像"><span><i>${escapeHtml(memberRank)}</i><b>${escapeHtml(member.name)}</b><small>${escapeHtml(memberPalace)}</small></span></div>
    <section class="dcl-harem-register"><small>${escapeHtml(memberStanding)} · ${member.age ?? '？'}岁</small><h2>${escapeHtml(memberRank)} · ${escapeHtml(member.name)}</h2><b>${escapeHtml(memberOrigin)}</b>
      <dl><dt>宫居</dt><dd>${escapeHtml(memberPalace)}</dd><dt>所掌</dt><dd>${escapeHtml(memberDuty)}</dd><dt>召见</dt><dd>${record.count} 次${record.lastDay ? ` · 最近第${chineseDay(record.lastDay)}日` : ''}</dd><dt>知情</dt><dd>${escapeHtml(member.knows)}</dd></dl>
    </section>
    <section class="dcl-harem-character"><h3>仪态与行事</h3><p>${escapeHtml(member.publicFace)}</p><h3>内在矛盾</h3><p>${escapeHtml(member.core)}</p><h3>所求与所惧</h3><p>${escapeHtml(member.motive)} ${escapeHtml(member.fear)}</p><small>说话方式：${escapeHtml(member.voice)}</small></section>
    <aside class="dcl-harem-actions"><small>御前传召</small><h3>召见 ${escapeHtml(memberRank)}${escapeHtml(member.name)}</h3><p>传召会写入聊天并触发一次生成；人物只依据亲见、公开宫务与御前明确告知的内容回应。</p><button class="dcl-primary" data-harem-action="summon">召见问话</button><button data-harem-action="dine">同席用膳</button></aside>`;
}

async function runHaremAction(type) {
  if (!['summon', 'dine'].includes(type)) return;
  const state = getState();
  const member = selectedConsort(state);
  if (!member) return;
  const actionText = type === 'dine'
    ? `传旨：今夜往${member.palace}，与${member.rank}${member.name}同席用膳。`
    : `传${member.rank}${member.name}至养心殿，朕要召见问话。`;
  const message = `${actionText}\n请从传旨、候见或入殿的可观察过程开始，依${member.name}的身份、信息边界和当前关系自然回应。不要把召见次数当作爱意或忠诚，不要替朕指定谈话内容，也不要让她无端知晓密折。`;
  await sendUserAction(message, () => {
    const committed = getState();
    const prior = visitRecord(committed, member.id);
    committed.harem.visits[member.id] = {
      count: clampInt(prior.count + 1, 0, 9999, prior.count),
      lastDay: committed.day,
      lastType: type,
    };
    committed.harem.log.push({ day: committed.day, consortId: member.id, type });
    committed.harem.log = committed.harem.log.slice(-12);
    committed.harem.selectedId = member.id;
    persistState(committed);
    renderAll();
  }, `本轮相关后妃档案：\n${formatHaremProfile(member)}`);
}

function openManageDialog() {
  const state = getState();
  const casualties = new Set(state.casualties?.harem ?? []);
  const removed = new Set(state.harem?.removed ?? []);
  const removedMembers = [
    ...HAREM_MEMBERS.filter(member => removed.has(member.name)),
    ...(state.peopleRegistry ?? []).filter(item => item.kind === 'harem' && removed.has(item.name)),
  ];
  const activeHarem = [
    ...profilesOf('harem', state).filter(item => !casualties.has(item.name) && !removed.has(item.name)),
    ...(state.peopleRegistry ?? []).filter(item => item.kind === 'harem' && !casualties.has(item.name) && !removed.has(item.name)),
  ];
  document.getElementById('dcl-manage-body').innerHTML = `
    <section class="dcl-manage-block">
      <h3>增添宫人</h3>
      <form id="dcl-harem-add-form" class="dcl-harem-add-form">
        <input name="name" placeholder="姓名" required maxlength="40">
        <input name="rank" placeholder="位份（如美人）" maxlength="20">
        <input name="age" type="number" min="18" max="99" placeholder="年龄">
        <input name="palace" placeholder="宫居" maxlength="30">
        <input name="origin" placeholder="出身" maxlength="60">
        <input name="reputation" placeholder="朝野风评" maxlength="80">
        <textarea name="knows" placeholder="信息边界（可选）" maxlength="240" rows="2"></textarea>
        <label class="dcl-harem-portrait-field"><span>立绘（可选）</span><input type="file" name="portrait" accept="image/*" id="dcl-harem-portrait-input"><img id="dcl-harem-portrait-preview" alt="" hidden></label>
        <button type="submit" class="dcl-primary">登记入册</button>
      </form>
    </section>
    <section class="dcl-manage-block">
      <h3>在册宫人（${activeHarem.length}）</h3>
      <ul class="dcl-manage-harem-list">
        ${activeHarem.map(item => `<li><span><b>${escapeHtml(item.rank ?? '宫人')} ${escapeHtml(item.name)}</b><small>${escapeHtml(item.palace ?? '待定宫居')}</small></span><button type="button" data-action="remove-harem" data-name="${escapeHtml(item.name)}">黜退</button></li>`).join('')}
      </ul>
    </section>
    ${removedMembers.length ? `<section class="dcl-manage-block">
      <h3>已黜退（${removedMembers.length}）</h3>
      <ul class="dcl-manage-harem-list">
        ${removedMembers.map(item => `<li><span><b>${escapeHtml(item.rank ?? '宫人')} ${escapeHtml(item.name)}</b><small>${escapeHtml(item.palace ?? '待定宫居')}</small></span><button type="button" data-action="restore-harem" data-name="${escapeHtml(item.name)}">复位入册</button></li>`).join('')}
      </ul>
    </section>` : ''}`;
  document.getElementById('dcl-manage-dialog')?.showModal();
}

function toggleInvasion() {
  const state = getState();
  if (state.invasion?.triggered) {
    notify('异族入侵已经发生，不能重新关闭或开启。', 'warning');
    return;
  }
  state.invasion.enabled = !state.invasion?.enabled;
  persistState(state);
  renderInvasionToggle();
  toast(state.invasion.enabled ? '异族入侵已开启' : '异族入侵已关闭');
}

function renderInvasionToggle() {
  const state = getState();
  const button = document.getElementById('dcl-invasion-toggle');
  if (!button) return;
  const active = state.invasion?.enabled === true;
  button.classList.toggle('active', active);
  button.textContent = state.invasion?.triggered ? '入侵已发' : active ? '入侵·开' : '入侵·关';
  button.disabled = Boolean(state.invasion?.triggered);
  button.title = state.invasion?.triggered
    ? `异族入侵已发生（第${state.invasion.result?.day ?? '?'}日 · 守御分${state.invasion.result?.score ?? '?'}）`
    : active ? `已开启，待第${state.invasion?.triggerDay ?? 15}日结案后判定` : '已关闭，不会触发';
}

function removeHaremMember(name) {
  const state = getState();
  state.harem.removed = [...new Set([...(state.harem.removed ?? []), name])];
  delete state.harem.visits?.[name];
  state.harem.log = (state.harem.log ?? []).filter(item => item.consortId !== name);
  if (state.harem.selectedId === name) state.harem.selectedId = 'empress';
  persistState(state);
  openManageDialog();
  renderHarem();
  toast(`${name}已黜退`);
}

function restoreHaremMember(name) {
  const state = getState();
  state.harem.removed = (state.harem.removed ?? []).filter(item => item !== name);
  if (HAREM_MEMBERS.some(member => member.name === name) || (state.peopleRegistry ?? []).some(item => item.kind === 'harem' && item.name === name)) {
    state.harem.selectedId = name;
  }
  persistState(state);
  openManageDialog();
  renderHarem();
  toast(`${name}已复位入册`);
}

async function addHaremMember(formData) {
  const state = getState();
  const name = String(formData.get('name') ?? '').trim().slice(0, 40);
  if (!name) return;
  const staticMember = HAREM_MEMBERS.find(member => member.name === name);
  if (staticMember) {
    if (!(state.harem?.removed ?? []).includes(name)) {
      notify('该宫人已在册。', 'warning');
      return;
    }
    restoreHaremMember(name);
    return;
  }
  if ((state.peopleRegistry ?? []).some(item => item.kind === 'harem' && item.name === name)) {
    notify('同名宫人已在册。', 'warning');
    return;
  }
  const rawAge = formData.get('age');
  const member = {
    kind: 'harem',
    id: name,
    name,
    rank: String(formData.get('rank') ?? '').trim().slice(0, 20) || '美人',
    age: rawAge ? clampInt(rawAge, 18, 99, null) : null,
    palace: String(formData.get('palace') ?? '').trim().slice(0, 30) || '待定宫居',
    origin: String(formData.get('origin') ?? '').trim().slice(0, 60),
    role: '新入宫',
    reputation: String(formData.get('reputation') ?? '').trim().slice(0, 80) || '风评未显',
    duty: '宫务待核',
    standing: '新承恩眷',
    knows: String(formData.get('knows') ?? '').trim().slice(0, 240) || '只知道本人亲见、经手的宫务与可靠私交；不自动知道密折与外朝密议。',
    publicFace: '鲜活谨慎，先察言观色，再决定如何应对。',
    core: '想在后宫站稳，又担心每一句真话都可能被当作把柄。',
    motive: '先弄清谁是真心相助，再决定依附与自保。',
    fear: '位份低微，怕被高位者差遣后成为可弃的证人。',
    voice: '语气柔和但观察具体；紧张时会转谈细节。',
    firstSeenDay: state.day,
    lastSeenDay: state.day,
    portrait: '',
  };
  const portraitFile = formData.get('portrait');
  if (portraitFile instanceof File && /^image\//.test(portraitFile.type)) {
    try {
      member.portrait = await compressPortrait(portraitFile);
    } catch (error) {
      console.error('[丹宸录] 宫人立绘处理失败', error);
      notify('立绘处理失败，宫人将不带立绘入册。', 'warning');
    }
  }
  state.peopleRegistry = normalizeRegistryPeople([...(state.peopleRegistry ?? []), member], state.day);
  persistState(state);
  openManageDialog();
  renderHarem();
  toast(`${name}已登记入册`);
}

function renderFactions() {
  const state = getState();
  const factions = factionOverview(state);
  const totalInfluence = factions.reduce((sum, faction) => sum + Math.max(0, faction.influence), 0) || 1;
  const cx = 200;
  const cy = 150;
  const radius = 112;
  let cursor = 0;
  const sectors = factions.map(faction => {
    const sweep = (Math.max(0, faction.influence) / totalInfluence) * 360;
    const start = cursor;
    const end = cursor + sweep;
    cursor = end;
    const mid = (start + end) / 2;
    const labelPos = polarToCartesian(cx, cy, radius * 0.58, mid);
    const labelRotation = mid > 90 && mid < 270 ? mid + 180 : mid;
    return {
      faction, start, end, mid,
      path: factionSectorPath(cx, cy, radius, start, end),
      labelPos, labelRotation,
      fill: faction.static ? '' : dynamicFactionColor(faction.id),
    };
  });
  const svg = `<svg class="dcl-faction-chart" viewBox="0 0 400 300" role="img" aria-label="党派势力扇形图">
    ${sectors.map(({ faction, path, labelPos, labelRotation, fill }) => `
      <path data-faction="${escapeHtml(faction.id)}" d="${path}" class="dcl-faction-sector ${faction.static ? '' : 'dynamic'}" ${fill ? `fill="${fill}"` : ''}>
        <title>${escapeHtml(faction.name)} · 影响 ${faction.influence}%</title>
      </path>
      <text data-faction="${escapeHtml(faction.id)}" x="${labelPos.x.toFixed(1)}" y="${labelPos.y.toFixed(1)}" transform="rotate(${labelRotation.toFixed(1)} ${labelPos.x.toFixed(1)} ${labelPos.y.toFixed(1)})" text-anchor="middle" dominant-baseline="middle" class="dcl-faction-label">${escapeHtml(faction.name)}</text>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#51432f" stroke-width="1.5" />
  </svg>`;
  const legend = factions.map(faction => `
    <button class="dcl-faction-legend-item" data-faction="${escapeHtml(faction.id)}">
      <i class="${faction.static ? '' : 'dynamic'}"></i><span>${escapeHtml(faction.name)}</span><em>${faction.influence}%</em>
    </button>`).join('');
  document.getElementById('dcl-faction-board').innerHTML = `${svg}<div class="dcl-faction-legend">${legend}</div>`;
}

function openFactionDetail(factionId) {
  const state = getState();
  const faction = factionOverview(state).find(item => item.id === factionId);
  if (!faction) return;
  const staticNames = new Set(OFFICIALS.map(person => person.name));
  const registryNames = new Set((state.peopleRegistry ?? []).map(person => person.name));
  let members = faction.members ?? [];
  if (faction.static) {
    members = OFFICIALS.filter(person => person.faction === faction.name).map(person => person.name);
  } else {
    members = members.filter(name => staticNames.has(name) || registryNames.has(name));
  }
  const membersDetail = members.length
    ? members.map(name => {
        const staticIndex = profileIndexByDefaultName('official', name);
        const person = staticIndex >= 0
          ? profileAt('official', staticIndex, state)
          : state.peopleRegistry?.find(item => item.name === name);
        return person
          ? `<li><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.office || person.role || '身份待考')}</small></li>`
          : `<li><b>${escapeHtml(name)}</b><small>身份待考</small></li>`;
      }).join('')
    : '<li class="muted">暂无登记成员</li>';
  const rivals = (faction.rivals ?? []).map(rival => {
    const rivalName = typeof rival === 'string' ? rival : rival?.name;
    const rivalId = typeof rival === 'string' ? rival : (rival?.id ?? rivalName);
    return `<button type="button" class="dcl-faction-rival" data-faction-switch="${escapeHtml(rivalId)}">${escapeHtml(rivalName)}</button>`;
  }).join('') || '<span class="muted">暂无明确对立派系</span>';
  const label = faction.static ? `${faction.name}党` : faction.name;
  const badge = faction.static ? '固有党系' : `新起 · 第${chineseDay(faction.day)}日`;
  document.getElementById('dcl-faction-dialog-title').textContent = label;
  document.getElementById('dcl-faction-dialog-badge').textContent = badge;
  document.getElementById('dcl-faction-dialog-body').innerHTML = `
    <section class="dcl-faction-dialog-block"><h3>主张</h3><p>${escapeHtml(faction.description)}</p></section>
    <section class="dcl-faction-dialog-block"><h3>党众名册</h3><ul>${membersDetail}</ul></section>
    <section class="dcl-faction-dialog-block"><h3>对立派系</h3><div class="dcl-faction-rivals">${rivals}</div></section>`;
  document.getElementById('dcl-faction-dialog')?.showModal();
}

function closeFactionDetail() {
  document.getElementById('dcl-faction-dialog')?.close();
}

function renderArchive() {
  const state = getState();
  const prior = state.history.map((item, index) => {
    const stats = item.stats ?? {};
    return `<article class="dcl-archive-card clickable" data-archive="prior-${index}" tabindex="0">
      <small>第${escapeHtml(item.day)}日 · 已封匣</small><h2>${escapeHtml(item.caseTitle)}</h2>
      <p>${escapeHtml(item.summary ?? '')}</p><b>已阅 ${escapeHtml(item.reviewed)} · 留中 ${escapeHtml(item.doubts)} · 威望 ${escapeHtml(stats.authority)}</b>
      <div class="dcl-archive-detail">
        <h3>简要说明</h3>
        <p>${escapeHtml(item.summary ?? '')}</p>
        <dl><dt>案卷编号</dt><dd>${escapeHtml(item.caseId ?? '—')}</dd><dt>已发下</dt><dd>${escapeHtml(item.reviewed)} 道</dd><dt>留中存疑</dt><dd>${escapeHtml(item.doubts)} 道</dd><dt>结案朝局</dt><dd>威望 ${escapeHtml(stats.authority)} · 国帑 ${escapeHtml(stats.treasury)} · 民心 ${escapeHtml(stats.stability)}</dd></dl>
      </div>
    </article>`;
  });
  const reference = CASES.map((item, index) => `
    <article class="dcl-archive-card clickable" data-archive="ref-${index}" tabindex="0">
      <small>引子卷 ${index + 1}</small><h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.summary)}</p><b>点击查看案卷说明</b>
      <div class="dcl-archive-detail">
        <h3>案卷说明</h3>
        <p>${escapeHtml(item.summary)}</p>
        ${item.rumor ? `<p>朝野传闻：${escapeHtml(item.rumor)}</p>` : ''}
        ${item.clues?.length ? `<h4>待查矛盾</h4><ul>${item.clues.map(clue => `<li>${escapeHtml(clue)}</li>`).join('')}</ul>` : ''}
      </div>
    </article>`);
  document.getElementById('dcl-archive-board').innerHTML = [...prior, ...reference].join('');
}

function toggleArchive(card) {
  if (!card) return;
  const willOpen = !card.classList.contains('open');
  document.querySelectorAll('#danchenlu-root .dcl-archive-card.open').forEach(other => {
    if (other !== card) {
      other.classList.remove('open');
      other.setAttribute('aria-expanded', 'false');
    }
  });
  card.classList.toggle('open', willOpen);
  card.setAttribute('aria-expanded', String(willOpen));
}

function statBandSemantics(stats) {
  const band = (value, bands) => {
    const entry = bands.find(([min]) => value >= min);
    return entry ? entry[1] : bands[bands.length - 1][1];
  };
  const authority = band(stats?.authority ?? 0, [
    [80, '威望极高：令出必行，官员慎言欺瞒，密折增多'],
    [60, '威望尚固：政令大体奉行，偶有拖延曲解'],
    [40, '威望中平：需催办督责，言官敢讽谏，地方观望'],
    [20, '威望受损：执行打折，官员结党自保、虚应故事'],
    [0, '威望扫地：政令难行，廷议敢抗旨，有废立兵变之虞'],
  ]);
  const treasury = band(stats?.treasury ?? 0, [
    [80, '帑藏充盈：金银成库、仓粮充足、布匹无缺'],
    [60, '收支相抵：库储可支急务'],
    [40, '库储渐薄：常以铜钱折银、布粮抵饷'],
    [20, '库空物乏：靠盐课关税与挪借周转'],
    [0, '无钱可支：官俸兵饷拖欠，地方加派私征'],
  ]);
  const stability = band(stats?.stability ?? 0, [
    [80, '民心安稳：市井太平，路不拾遗'],
    [60, '民心平顺：百业平稳，偶有讼案'],
    [40, '民心浮动：物价上涨、流民渐现、盗案增多'],
    [20, '民心怨愤：抗税抗粮、地方骚动'],
    [0, '民心离析：民变蜂起，有揭竿之势'],
  ]);
  return `威望 ${stats?.authority ?? 0}/100（${authority}）；国帑 ${stats?.treasury ?? 0}/100（${treasury}）；民心 ${stats?.stability ?? 0}/100（${stability}）。描写国帑须落到银两、铜钱、布匹、粮食等具体财物，不得只写数字。`;
}

function buildStatePrompt() {
  const state = getState();
  const caseItem = currentCase(state);
  const memorial = currentMemorial(state);
  if (!caseItem || !memorial) return '';
  const dispatched = caseItem.memorials.filter(item => state.dispatched[item.id]).map(item => `${item.title}→${state.replies[item.id]}`).join('；') || '无';
  const pending = caseItem.memorials.filter(item => !state.dispatched[item.id]).map(item => item.title).join('、') || '无';
  const consort = selectedConsort(state);
  const visit = visitRecord(state, consort.id);
  const inactiveHarem = new Set([...(state.casualties?.harem ?? []), ...(state.harem?.removed ?? [])]);
  const haremRoster = profilesOf('harem', state).filter(item => !inactiveHarem.has(item.name)).map(item => `${item.rank}${item.name}（${item.palace}）`).join('；');
  const dynamicRoster = (state.peopleRegistry ?? []).filter(item => item.kind === 'harem' && !inactiveHarem.has(item.name)).map(item => `${item.rank}${item.name}（${item.palace}）`).join('；');
  const fullHaremRoster = [haremRoster, dynamicRoster].filter(Boolean).join('；');
  const inactivePeople = new Set([...(state.casualties?.officials ?? []), ...(state.casualties?.harem ?? []), ...(state.harem?.removed ?? [])]);
  const recentPeople = (state.peopleRegistry ?? [])
    .filter(item => item.lastSeenDay >= state.day - 3 && !inactivePeople.has(item.name))
    .slice(0, 6)
    .map(item => `${item.name}（${item.office}${item.role ? ` · ${item.role}` : ''}）`)
    .join('、');
  const factionLine = factionOverview(state).slice(0, 4)
    .map(faction => `${faction.name}${faction.static ? '' : '（新起）'}${faction.influence}%`)
    .join('、');
  const dynamicEdgeCount = state.dynamicEdges?.length ?? 0;
  const statSemantics = statBandSemantics(state.stats);
  const invasionLine = invasionContextLine(state);
  const haremContext = state.view === 'harem' ? `
当前正在处理后宫宫务。
当前人物：${consort.rank}${consort.name}，${consort.age ?? '？'}岁，居${consort.palace ?? '待定宫居'}。${consort.publicFace}${consort.core}
她所求：${consort.motive} 她所惧：${consort.fear}
她实际可能知道：${consort.knows} 说话方式：${consort.voice}
宫务记录：共召见${visit.count}次${visit.lastDay ? `，最近为第${visit.lastDay}日${haremActionLabel(visit.lastType)}` : '，此前尚未召见'}。次数只是客观记录，不代表爱意、忠诚、嫉妒或人格阶段。
后宫叙事约束：五位妃嫔都是有独立利益与信息边界的成年人物；位份约束礼制和宫权，不预设善恶；不因一次召见自动倾心，不因他人受召自动争宠；任何关系升温、裂痕或结盟都须由正文事件自然过渡。
` : '';
  return `<danchenlu_runtime>
当前是丹宸录奏折模拟器的第${state.day}日，阶段为${state.phase === 'freeplay' ? '开放朝政；后续奏折由你依据旧案后果持续创作，不得复位或循环前三卷' : '前三卷玩法引子'}。玩家身份为大晟皇帝，拥有最终裁断权；你负责扮演朝堂、官员、文书与后果，不替玩家决定。
朝局数值：${statSemantics}
党派影响（0—100，高影响力不等于正确）：${factionLine}。
当前案件：${caseItem.title}。公开摘要：${caseItem.summary}
幕后事实（只用于保持因果一致，除非玩家查得证据或日结，不可直接揭底）：${caseItem.contradiction}
当前奏折：${memorial.title}；${memorial.sender}（${memorial.office}）；${memorial.region}；${memorial.type === 'secret' ? '密折，未经内阁' : `题本，票拟为：${memorial.cabinet ?? '无'}`}。
奏折正文：${memorial.body.map(stripMarkup).join('')}
已经发下并生效的朱批：${dispatched}
尚未发下：${pending}
留中存疑：${state.doubts.map(id => caseItem.memorials.find(item => item.id === id)?.title).filter(Boolean).join('、') || '无'}
后宫名册：${fullHaremRoster}。位份决定礼制，不直接决定善恶或忠诚。
${recentPeople ? `近期新涉或活跃人物：${recentPeople}。` : ''}${dynamicEdgeCount ? `已登记动态关系 ${dynamicEdgeCount} 条，涉及新旧人物；关系变化以正文事件为准，不得凭空否认或滥用。` : ''}
${invasionLine ? `${invasionLine}\n` : ''}
${haremContext}
叙事约束：每次回应先承接玩家最新行为，再呈现可观察后果；官员有利益、信息盲区和自保逻辑；不把所有冲突简化成忠奸二分；不输出变量代码、状态标签或操作教程；结尾保留一个可行动钩子，但不强迫选择。
世界登记（仅在本轮剧情确实引入了新人物、新关系、新党派或新地点时才附带，其余情况绝不输出）：在回复末尾追加一行
<dcl_world_change>{"people":[{"name":"姓名","kind":"official","office":"官职","rank":"品秩","faction":"党派","origin":"籍贯","role":"身份职责","reputation":"朝野风评","publicFace":"外在行事","core":"内在矛盾","motive":"动机","fear":"所惧","knows":"信息边界","voice":"说话方式"}],"relations":[{"a":"人名甲","b":"人名乙","type":"patron","label":"关系说明"}],"factions":[{"name":"党名","description":"主张","members":["人名"],"influence":30}],"nodes":[{"name":"地点或衙门","region":"道府","severity":"中"}]}</dcl_world_change>
该标签只用于御案登记，不进入剧情正文；已有默认档案的十二官员不必重复登记。
</danchenlu_runtime>`;
}

function syncPrompt() {
  const ctx = context();
  if (!ctx?.setExtensionPrompt) return;
  if (!isActiveCard()) {
    ctx.setExtensionPrompt(MODULE_NAME, '', 1, 1, false, 0);
    return;
  }
  ctx.setExtensionPrompt(MODULE_NAME, buildStatePrompt(), 1, 1, false, 0);
}

function toast(message) {
  const element = document.getElementById('dcl-toast');
  if (!element) return;
  element.textContent = message;
  element.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => element.classList.remove('show'), 1900);
}

function notify(message, level = 'info') {
  const toastr = globalThis.toastr;
  if (toastr?.[level]) toastr[level](message, '丹宸录');
  else console[level === 'error' ? 'error' : 'log'](`[丹宸录] ${message}`);
}

function handleChatChanged() {
  ensureLauncher();
  syncPrompt();
  if (!isActiveCard()) closePanel();
  else if (panelReady) renderAll();
}

async function initialize() {
  if (initialized) return;
  initialized = true;
  if (!CASES.length) {
    console.error('[丹宸录] 案件数据未加载。');
    return;
  }
  ensureLauncher();
  syncPrompt();
  const ctx = context();
  const events = ctx?.eventTypes ?? ctx?.event_types;
  if (ctx?.eventSource && events) {
    ctx.eventSource.on(events.CHAT_CHANGED, handleChatChanged);
    ctx.eventSource.on(events.CHARACTER_EDITED, handleChatChanged);
    ctx.eventSource.on(events.MESSAGE_RECEIVED, handleGeneratedCaseMessage);
    ctx.eventSource.on(events.MESSAGE_DELETED, handleMessageDeleted);
  }
  console.log('[丹宸录] 扩展已加载。');
}

export function onActivate() {
  window.setTimeout(initialize, 0);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.setTimeout(initialize, 0), { once: true });
} else {
  window.setTimeout(initialize, 0);
}
