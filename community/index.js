import './cases.js';

const MODULE_NAME = 'danchenlu';
const META_KEY = 'danchenlu_state';
const PANEL_URL = new URL('./panel.html', import.meta.url);
const ASSET_ROOT = new URL('./assets/', import.meta.url);
const CASES = Array.isArray(window.danchenluMemorialCases) ? window.danchenluMemorialCases : [];
const ALL_MEMORIAL_IDS = new Set(CASES.flatMap(item => item.memorials.map(memorial => memorial.id)));

const PROVINCES = [
  { name: '京畿道', meta: '4 府 · 19 州 · 76 县', trend: '中枢章奏 128 起', severity: '案情密度：中' },
  { name: '西陲道', meta: '6 府 · 31 州 · 94 县', trend: '本年军报 36 起 ↑18%', severity: '案情密度：高' },
  { name: '江南道', meta: '8 府 · 52 州 · 201 县', trend: '本年上报案件 47 起 ↑23%', severity: '案情密度：高' },
];

const OFFICIALS = [
  { name: '沈敬修', office: '直隶总督', faction: '务实', rank: '正二品', origin: '河西道·临洮府', exam: '承熙二年进士', portrait: 1, x: 50, y: 47 },
  { name: '周秉正', office: '河间知县', faction: '清流', rank: '正七品', origin: '江东道·常州府', exam: '承熙八年进士', portrait: 12, x: 27, y: 24 },
  { name: '陆惟谦', office: '内阁首辅', faction: '务实', rank: '正一品', origin: '江南道·苏州府', exam: '景和末科进士', portrait: 2, x: 73, y: 25 },
  { name: '高文济', office: '左佥都御史', faction: '清流', rank: '正四品', origin: '山东道·济南府', exam: '承熙元年进士', portrait: 4, x: 19, y: 54 },
  { name: '钱若谷', office: '户部侍郎', faction: '务实', rank: '正三品', origin: '中州道·开封府', exam: '承熙二年进士', portrait: 6, x: 79, y: 55 },
  { name: '岳崇烈', office: '定西将军', faction: '勋贵', rank: '从一品', origin: '京畿道', exam: '世袭武职', portrait: 3, x: 52, y: 79 },
  { name: '顾云开', office: '陕西巡抚', faction: '清流', rank: '从二品', origin: '湖广道', exam: '景和十八年进士', portrait: 5, x: 10, y: 31 },
  { name: '韩守节', office: '御前监军', faction: '内廷', rank: '正四品', origin: '京畿道', exam: '内廷简拔', portrait: 7, x: 89, y: 32 },
  { name: '方砚秋', office: '巡盐御史', faction: '清流', rank: '正五品', origin: '福建道', exam: '承熙六年进士', portrait: 8, x: 11, y: 73 },
  { name: '汪鹤亭', office: '两淮盐运使', faction: '务实', rank: '从三品', origin: '江南道', exam: '承熙三年进士', portrait: 10, x: 89, y: 74 },
  { name: '程万金', office: '扬州总商', faction: '盐商', rank: '布衣', origin: '江南道·扬州府', exam: '捐纳候选', portrait: 11, x: 33, y: 86 },
  { name: '许三保', office: '河间驿丞', faction: '无党', rank: '未入流', origin: '直隶', exam: '吏员出身', portrait: 9, x: 70, y: 88 },
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

const NETWORK_EDGES = [
  [0, 1, 'hostile', '压报互讦'], [0, 2, 'patron', '首辅荐举'], [0, 3, 'hostile', '河工弹劾'], [0, 4, 'cohort', '同科进士'],
  [0, 5, 'kin', '姻亲通家'], [1, 3, 'patron', '言官援引'], [1, 6, 'cohort', '同乡'], [2, 4, 'patron', '座主门生'],
  [2, 7, 'hostile', '票拟冲突'], [2, 9, 'kin', '姻亲'], [3, 6, 'cohort', '都察院同僚'], [3, 8, 'patron', '荐举巡盐'],
  [4, 9, 'cohort', '财赋同僚'], [5, 7, 'hostile', '军饷互讦'], [5, 11, 'patron', '驿传旧部'], [8, 9, 'hostile', '盐案攻讦'],
  [9, 10, 'patron', '官商关照'], [10, 2, 'patron', '岁馈门包'], [10, 8, 'hostile', '索银反目'], [11, 1, 'cohort', '灾情递报'],
];

const DEFAULT_STATE = Object.freeze({
  schemaVersion: 2,
  day: 1,
  caseIndex: 0,
  activeId: CASES[0]?.memorials?.[0]?.id ?? null,
  filter: 'all',
  view: 'map',
  open: true,
  stats: { authority: 62, treasury: 54, stability: 58 },
  reviewed: {},
  replies: {},
  dispatched: {},
  doubts: [],
  history: [],
});

let panelReady = false;
let toastTimer = 0;
let initialized = false;
let bodyOverflowBefore = '';
let selectedOfficialIndex = 0;
let networkMode = 'officials';
let dragState = null;
let panelResizeTimer = 0;

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
  const sourceVersion = clampInt(state.schemaVersion, 1, 2, 1);
  base.schemaVersion = 2;
  base.day = clampInt(state.day, 1, 9999, 1);
  base.caseIndex = clampInt(state.caseIndex, 0, Math.max(0, CASES.length - 1), 0);
  base.activeId = typeof state.activeId === 'string' ? state.activeId : CASES[base.caseIndex]?.memorials?.[0]?.id ?? null;
  base.filter = ['all', 'formal', 'secret'].includes(state.filter) ? state.filter : 'all';
  base.view = ['map', 'desk', 'officials', 'factions', 'archive'].includes(state.view) ? state.view : 'map';
  base.open = state.open !== false;
  base.stats.authority = clampInt(state.stats?.authority, 0, 100, 62);
  base.stats.treasury = clampInt(state.stats?.treasury, 0, 100, 54);
  base.stats.stability = clampInt(state.stats?.stability, 0, 100, 58);
  base.reviewed = Object.fromEntries(Object.entries(plainRecord(state.reviewed))
    .filter(([id, value]) => ALL_MEMORIAL_IDS.has(id) && value === true));
  base.replies = Object.fromEntries(Object.entries(plainRecord(state.replies))
    .filter(([id, value]) => ALL_MEMORIAL_IDS.has(id) && typeof value === 'string')
    .map(([id, value]) => [id, value.slice(0, 80)]));
  const storedDispatched = Object.fromEntries(Object.entries(plainRecord(state.dispatched))
    .filter(([id, value]) => ALL_MEMORIAL_IDS.has(id) && value === true));
  base.dispatched = sourceVersion < 2 ? deepClone(base.reviewed) : storedDispatched;
  base.doubts = [...new Set(Array.isArray(state.doubts)
    ? state.doubts.filter(id => typeof id === 'string' && ALL_MEMORIAL_IDS.has(id))
    : [])].slice(-30);
  base.history = Array.isArray(state.history) ? state.history.filter(x => x && typeof x === 'object').slice(-12) : [];
  if (!currentCase(base)?.memorials.some(m => m.id === base.activeId)) {
    base.activeId = currentCase(base)?.memorials?.[0]?.id ?? null;
  }
  return base;
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
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.action === 'close') return closePanel();
    if (button.dataset.view) return switchView(button.dataset.view);
    if (button.dataset.filter) return setFilter(button.dataset.filter);
    if (button.dataset.memorial) return selectMemorial(button.dataset.memorial);
    if (button.dataset.case) return selectCase(button.dataset.case);
    if (button.dataset.reply) return setReply(button.dataset.reply);
    if (button.dataset.relation) return filterRelations(button.dataset.relation);
    if (button.dataset.person !== undefined) return selectOfficial(Number(button.dataset.person));
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
      case 'next-day': nextDay(); break;
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
  state.open = true;
  state.view = 'desk';
  persistState(state);
  renderAll();
}

function selectCase(caseId) {
  const index = CASES.findIndex(item => item.id === caseId);
  if (index < 0) return;
  const state = getState();
  state.caseIndex = index;
  state.activeId = CASES[index].memorials[0].id;
  state.view = 'map';
  state.open = true;
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
    state.open = true;
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
  if (nextButton) nextButton.hidden = sent.length !== memorials.length;
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
  });
}

function nextDay() {
  const previous = getState();
  const memorials = currentCase(previous).memorials;
  if (!memorials.every(item => previous.dispatched[item.id])) {
    toast('本案尚有御批未发下');
    openSummary();
    return;
  }
  const archived = {
    day: previous.day,
    caseId: currentCase(previous).id,
    caseTitle: currentCase(previous).title,
    reviewed: memorials.filter(item => previous.dispatched[item.id]).length,
    doubts: currentCase(previous).memorials.filter(item => previous.doubts.includes(item.id)).length,
    stats: deepClone(previous.stats),
  };
  const state = normalizeState(previous);
  state.history.push(archived);
  state.history = state.history.slice(-12);
  state.day += 1;
  state.caseIndex = (state.caseIndex + 1) % CASES.length;
  state.activeId = currentCase(state).memorials[0].id;
  state.reviewed = {};
  state.replies = {};
  state.dispatched = {};
  state.doubts = [];
  state.open = true;
  state.view = 'map';
  persistState(state);
  document.getElementById('dcl-summary-dialog')?.close();
  renderAll();
  toast('翌日新折已送至御前');
}

async function sendUserAction(text, onSent) {
  const ctx = context();
  if (!ctx) return false;
  let messageSent = false;
  try {
    if (typeof ctx.executeSlashCommandsWithOptions !== 'function') throw new Error('slash command API unavailable');
    await ctx.executeSlashCommandsWithOptions(`/send ${JSON.stringify(text)}`);
    messageSent = true;
    onSent?.();
    closePanel();
    if (typeof ctx.generate === 'function') {
      await ctx.generate('normal');
    } else {
      notify('朱批已写入聊天，请点击酒馆发送按钮继续生成。', 'info');
    }
    return true;
  } catch (error) {
    console.error('[丹宸录] 发送朱批失败', error);
    if (messageSent) {
      notify('御批已经发入聊天，但 AI 回复生成失败，请在酒馆中重试生成。', 'warning');
      return true;
    }
    const textarea = document.querySelector('#send_textarea');
    if (textarea) {
      textarea.value = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      closePanel();
      notify('已把朱批放入输入框，请手动发送。', 'warning');
    } else {
      notify('无法发送朱批，请复制后在聊天中发送。', 'error');
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
  if (getState().view === 'officials') renderNetwork();
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
  const province = PROVINCES[state.caseIndex] ?? PROVINCES[0];
  document.getElementById('dcl-province-name').textContent = province.name;
  document.getElementById('dcl-province-meta').textContent = province.meta;
  document.getElementById('dcl-case-trend').textContent = province.trend;
  document.getElementById('dcl-case-severity').textContent = province.severity;
  document.getElementById('dcl-case-list').innerHTML = item.memorials.slice(0, 3).map((memorial, index) => `
    <button class="dcl-case-row" data-memorial="${escapeHtml(memorial.id)}"><i>${index ? '中' : '重'}</i><b>${escapeHtml(memorial.title.replace(/[折疏题本]/g, '').slice(0, 11))}</b><small>矛盾线索 ${memorial.reveal.length} 处</small></button>`).join('');
  document.getElementById('dcl-official-list').innerHTML = item.people.map((person, index) => `
    <button class="dcl-official-row" data-view="officials"><img class="dcl-portrait" src="${portraitUrl(Math.min(12, state.caseIndex * 3 + index + 1))}" alt="${escapeHtml(person.name)}画像"><div><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.office)}</small></div><em>政声 ${72 - index * 7}</em></button>`).join('');
  const labels = state.caseIndex === 0 ? ['清望', '务实', '循理', '持重'] : state.caseIndex === 1 ? ['勋贵', '文官', '内廷', '边党'] : ['盐商', '清流', '内阁', '地方'];
  document.getElementById('dcl-faction-meter').innerHTML = labels.map((name, index) => `<span><i>${name[0]}</i><b>${[42, 28, 17, 13][index]}%</b><small>${name}</small></span>`).join('');
  document.getElementById('dcl-conflict-count').textContent = item.memorials.filter(memorial => memorial.suspicious).length;
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
  document.getElementById('dcl-cover-title').textContent = memorial.title;
  document.getElementById('dcl-cover-type').textContent = memorial.type === 'secret' ? '密折' : '题本';
  document.getElementById('dcl-paper-folds').innerHTML = semanticSections(memorial).reverse().map(([heading, text]) => `
    <section class="dcl-paper-panel"><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p>${heading === '具名日期' && memorial.cabinet ? `<aside>内阁票拟：${escapeHtml(memorial.cabinet)}</aside>` : ''}</section>`).join('');
  document.getElementById('dcl-vermilion').textContent = state.replies[memorial.id] ?? '';
  const textarea = document.getElementById('dcl-custom-reply');
  textarea.value = state.replies[memorial.id] ?? '';
  textarea.disabled = dispatched;
  document.getElementById('dcl-fold-button').textContent = state.open ? '合折' : '开折';
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
  document.querySelectorAll('#danchenlu-root .dcl-map-node').forEach(node => node.classList.toggle('active', node.dataset.case === currentCase(state).id));
}

function renderNetwork() {
  const board = document.getElementById('dcl-network-board');
  if (!board) return;
  networkMode = 'officials';
  board.dataset.mode = networkMode;
  board.innerHTML = `<svg class="dcl-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${NETWORK_EDGES.map(([a, b, type, label]) => `<line data-edge="${type}" class="${type}" x1="${OFFICIALS[a].x}" y1="${OFFICIALS[a].y}" x2="${OFFICIALS[b].x}" y2="${OFFICIALS[b].y}"><title>${escapeHtml(label)}</title></line>`).join('')}</svg>${OFFICIALS.map((person, index) => `<button class="dcl-person-node ${index === selectedOfficialIndex ? 'selected' : ''}" data-person="${index}" data-name="${escapeHtml(person.name)}" style="--x:${person.x}%;--y:${person.y}%"><img src="${portraitUrl(person.portrait)}" alt="${escapeHtml(person.name)}画像"><span><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.office)}</small></span></button>`).join('')}`;
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === 'all'));
  selectOfficial(selectedOfficialIndex);
}

function selectOfficial(index) {
  const person = OFFICIALS[index];
  if (!person) return;
  selectedOfficialIndex = index;
  const connected = new Set([index]);
  NETWORK_EDGES.forEach(edge => { if (edge[0] === index) connected.add(edge[1]); if (edge[1] === index) connected.add(edge[0]); });
  document.querySelectorAll('#danchenlu-root .dcl-person-node').forEach((node, nodeIndex) => {
    const nodeOfficial = Number(node.dataset.person);
    node.classList.toggle('selected', nodeOfficial === index);
    if (networkMode === 'officials') node.classList.toggle('relation-muted', !connected.has(nodeIndex));
  });
  if (networkMode === 'officials') document.querySelectorAll('#danchenlu-root .dcl-network-lines line').forEach((line, edgeIndex) => {
      line.classList.toggle('relation-muted', NETWORK_EDGES[edgeIndex][0] !== index && NETWORK_EDGES[edgeIndex][1] !== index);
    });
  const ties = NETWORK_EDGES.filter(edge => edge[0] === index || edge[1] === index).map(edge => {
    const other = OFFICIALS[edge[0] === index ? edge[1] : edge[0]];
    return `<li><i class="${edge[2]}"></i><b>${escapeHtml(other.name)}</b><span>${escapeHtml(edge[3])}</span></li>`;
  }).join('');
  const family = FAMILY_MEMBERS.map((member, familyIndex) => ({ member, familyIndex })).filter(item => item.member.official === index);
  const familyCards = family.map(({ member, familyIndex }) => `<button class="dcl-family-chip" data-family-member="${familyIndex}" data-name="${escapeHtml(member.name)}"><img src="${familyPortraitUrl(member.portrait)}" alt="${escapeHtml(member.name)}"><span><b>${escapeHtml(member.name)}</b><small>${escapeHtml(member.relation)} · ${escapeHtml(member.role)}</small></span></button>`).join('');
  document.getElementById('dcl-official-dossier').innerHTML = `<div class="dcl-dossier-portrait"><img src="${portraitUrl(person.portrait)}" alt="${escapeHtml(person.name)}"></div><small>${escapeHtml(person.rank)} · ${escapeHtml(person.faction)}</small><h2>${escapeHtml(person.name)}</h2><b>${escapeHtml(person.office)}</b><dl><dt>籍贯</dt><dd>${escapeHtml(person.origin)}</dd><dt>入仕</dt><dd>${escapeHtml(person.exam)}</dd><dt>政声</dt><dd>${72 - index * 2}</dd><dt>可信度</dt><dd>${Math.max(43, 84 - index * 3)}%</dd></dl><div class="dcl-dossier-title"><h3>内宅关系</h3><button data-open-family="${index}">展开家眷图</button></div><div class="dcl-family-list">${familyCards}</div><h3>官场关系</h3><ul>${ties}</ul>`;
}

function renderFamilyNetwork(officialIndex = selectedOfficialIndex, selectedFamilyIndex = null) {
  const board = document.getElementById('dcl-network-board');
  const official = OFFICIALS[officialIndex];
  if (!board || !official) return;
  selectedOfficialIndex = officialIndex;
  networkMode = 'family';
  board.dataset.mode = networkMode;
  const family = FAMILY_MEMBERS.map((member, index) => ({ member, index })).filter(item => item.member.official === officialIndex);
  const positions = family.length === 3 ? [[24, 29], [76, 29], [50, 78]] : [[27, 32], [73, 68]];
  const lines = family.map(({ member }, localIndex) => {
    const [x, y] = positions[localIndex];
    const type = member.relation.includes('女') ? 'daughter' : member.relation === '正妻' ? 'spouse' : 'concubine';
    return `<line data-edge="family" class="${type}" x1="50" y1="50" x2="${x}" y2="${y}"><title>${escapeHtml(member.relation)}</title></line>`;
  }).join('');
  const nodes = family.map(({ member, index }, localIndex) => {
    const [x, y] = positions[localIndex];
    return `<button class="dcl-person-node dcl-family-node" data-family-member="${index}" data-name="${escapeHtml(member.name)}" style="--x:${x}%;--y:${y}%"><img src="${familyPortraitUrl(member.portrait)}" alt="${escapeHtml(member.name)}画像"><span><b>${escapeHtml(member.name)}</b><small>${escapeHtml(member.relation)} · ${escapeHtml(member.role)}</small></span></button>`;
  }).join('');
  board.innerHTML = `<div class="dcl-house-label"><small>内宅关系</small><b>${escapeHtml(official.name)}家</b><button data-relation="all">返回官场网</button></div><svg class="dcl-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg><button class="dcl-person-node dcl-house-anchor selected" data-person="${officialIndex}" data-name="${escapeHtml(official.name)}" style="--x:50%;--y:50%"><img src="${portraitUrl(official.portrait)}" alt="${escapeHtml(official.name)}画像"><span><b>${escapeHtml(official.name)}</b><small>${escapeHtml(official.office)}</small></span></button>${nodes}`;
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === 'family'));
  if (selectedFamilyIndex === null) selectOfficial(officialIndex); else selectFamilyMember(selectedFamilyIndex);
}

function selectFamilyMember(index) {
  const member = FAMILY_MEMBERS[index];
  if (!member) return;
  if (networkMode !== 'family' || member.official !== selectedOfficialIndex) {
    renderFamilyNetwork(member.official, index);
    return;
  }
  const official = OFFICIALS[member.official];
  document.querySelectorAll('#danchenlu-root .dcl-person-node').forEach(node => {
    node.classList.toggle('selected', Number(node.dataset.familyMember) === index);
    node.classList.toggle('relation-muted', node.dataset.person === undefined && Number(node.dataset.familyMember) !== index);
  });
  const crossTies = (member.connections ?? []).map(tie => `<li><i class="kin"></i><b>${escapeHtml(OFFICIALS[tie.official].name)}</b><span>${escapeHtml(tie.label)}</span></li>`).join('');
  document.getElementById('dcl-official-dossier').innerHTML = `<div class="dcl-dossier-portrait dcl-family-portrait"><img src="${familyPortraitUrl(member.portrait)}" alt="${escapeHtml(member.name)}"></div><small>成年家眷 · ${escapeHtml(member.relation)}</small><h2>${escapeHtml(member.name)}</h2><b>${escapeHtml(member.role)}</b><dl><dt>年龄</dt><dd>${member.age}岁</dd><dt>出身</dt><dd>${escapeHtml(member.origin)}</dd><dt>关系</dt><dd>${escapeHtml(official.name)}之${escapeHtml(member.relation)}</dd><dt>立场</dt><dd>独立判断</dd></dl><h3>所求与所惧</h3><p class="dcl-family-motive">${escapeHtml(member.motive)}</p><h3>直接关系</h3><ul><li><i class="${member.relation.includes('女') ? 'daughter' : 'spouse'}"></i><b>${escapeHtml(official.name)}</b><span>${escapeHtml(member.relation)}</span></li>${crossTies}</ul>`;
}

function filterRelations(type) {
  if (type === 'family') {
    renderFamilyNetwork(selectedOfficialIndex);
    return;
  }
  if (networkMode === 'family') renderNetwork();
  document.querySelectorAll('#danchenlu-root [data-relation]').forEach(button => button.classList.toggle('active', button.dataset.relation === type));
  document.querySelectorAll('#danchenlu-root .dcl-network-lines line').forEach(line => line.classList.toggle('muted', type !== 'all' && line.dataset.edge !== type));
}

function renderFactions() {
  const factions = [
    ['清流', '主张清查河工，重言官风骨', '沈敬修', '高文济'],
    ['务实', '先赈后查，维持地方运转', '陆惟谦', '钱若谷'],
    ['勋贵', '看重边功与军饷', '岳崇烈', '韩守节'],
    ['内廷', '只对御前负责，掌密报', '周秉正', '顾云开'],
  ];
  document.getElementById('dcl-faction-board').innerHTML = factions.map((faction, index) => `<section class="dcl-faction-column"><h2>${faction[0]}党</h2><p>${faction[1]}</p><ul><li>${faction[2]}</li><li>${faction[3]}</li></ul><b>当前影响 ${[42, 28, 17, 13][index]}%</b></section>`).join('');
}

function renderArchive() {
  const state = getState();
  const prior = state.history.map(item => `<article class="dcl-archive-card"><small>第${escapeHtml(item.day)}日 · 已封匣</small><h2>${escapeHtml(item.caseTitle)}</h2><p>已阅 ${escapeHtml(item.reviewed)} 道，留中 ${escapeHtml(item.doubts)} 道。</p><b>威望 ${escapeHtml(item.stats.authority)} · 国帑 ${escapeHtml(item.stats.treasury)} · 民心 ${escapeHtml(item.stats.stability)}</b></article>`);
  const reference = CASES.map((item, index) => `<article class="dcl-archive-card"><small>承熙十二年 · 卷 ${index + 1}</small><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.summary)}</p><b>${item.memorials.length} 道奏折 · ${item.clues.length} 处矛盾</b></article>`);
  document.getElementById('dcl-archive-board').innerHTML = [...prior, ...reference].join('');
}

function buildStatePrompt() {
  const state = getState();
  const caseItem = currentCase(state);
  const memorial = currentMemorial(state);
  if (!caseItem || !memorial) return '';
  const dispatched = caseItem.memorials.filter(item => state.dispatched[item.id]).map(item => `${item.title}→${state.replies[item.id]}`).join('；') || '无';
  const pending = caseItem.memorials.filter(item => !state.dispatched[item.id]).map(item => item.title).join('、') || '无';
  return `<danchenlu_runtime>
当前是丹宸录奏折模拟器的第${state.day}日。玩家身份为大晟皇帝，拥有最终裁断权；你负责扮演朝堂、官员、文书与后果，不替玩家决定。
朝局：威望 ${state.stats.authority}/100；国帑 ${state.stats.treasury}/100；民心 ${state.stats.stability}/100。
当前案件：${caseItem.title}。公开摘要：${caseItem.summary}
幕后事实（只用于保持因果一致，除非玩家查得证据或日结，不可直接揭底）：${caseItem.contradiction}
当前奏折：${memorial.title}；${memorial.sender}（${memorial.office}）；${memorial.region}；${memorial.type === 'secret' ? '密折，未经内阁' : `题本，票拟为：${memorial.cabinet ?? '无'}`}。
奏折正文：${memorial.body.map(stripMarkup).join('')}
已经发下并生效的朱批：${dispatched}
尚未发下：${pending}
留中存疑：${state.doubts.map(id => caseItem.memorials.find(item => item.id === id)?.title).filter(Boolean).join('、') || '无'}
叙事约束：每次回应先承接玩家最新行为，再呈现可观察后果；官员有利益、信息盲区和自保逻辑；不把所有冲突简化成忠奸二分；不输出变量代码、状态标签或操作教程；结尾保留一个可行动钩子，但不强迫选择。
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
    ctx.eventSource.on(events.MESSAGE_RECEIVED, () => panelReady && renderAll());
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
