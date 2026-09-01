// מייצר 10 שרטוטי מקרה ל"פטור או היתר", בסגנון חזית/חתך אחיד.
// בלי טקסט בעברית בתוך השרטוט - רק מידות במספרים, כדי להימנע מבעיות RTL בגופנים.
import fs from "node:fs";
import path from "node:path";

const OUT = new URL("../images/", import.meta.url).pathname.replace(/^//, "");
const W = 800, H = 600;

const C = {
  sky: "#dce8f2",
  skyTop: "#c3d9ea",
  ground: "#c7b9a4",
  groundDark: "#a8977e",
  wall: "#e8e2d6",
  wallShade: "#cfc7b7",
  wallLine: "#6d6558",
  roof: "#9c5f4a",
  element: "#e0a12b",
  elementDark: "#b8801c",
  metal: "#8a95a3",
  glass: "#a8cadd",
  glassSolid: "#7fa9bd",
  dim: "#c0392b",
  green: "#7f9e6a",
  road: "#9aa0a6",
};

const head = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${C.skyTop}"/><stop offset="1" stop-color="${C.sky}"/>
  </linearGradient>
  <pattern id="hatch" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="10" stroke="${C.groundDark}" stroke-width="2"/>
  </pattern>
  <marker id="ar" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
    <path d="M0,0 L9,4.5 L0,9 z" fill="${C.dim}"/>
  </marker>
  <marker id="arS" markerWidth="9" markerHeight="9" refX="1" refY="4.5" orient="auto">
    <path d="M9,0 L0,4.5 L9,9 z" fill="${C.dim}"/>
  </marker>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>`;

const groundAt = (y) => `
<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${C.ground}"/>
<rect x="0" y="${y}" width="${W}" height="14" fill="url(#hatch)" opacity=".5"/>
<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.wallLine}" stroke-width="3"/>`;

// קו מידה אנכי עם מספר
const dimV = (x, y1, y2, label) => {
  const my = (y1 + y2) / 2;
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.dim}" stroke-width="2" marker-start="url(#arS)" marker-end="url(#ar)"/>
<line x1="${x - 14}" y1="${y1}" x2="${x + 14}" y2="${y1}" stroke="${C.dim}" stroke-width="1.5"/>
<line x1="${x - 14}" y1="${y2}" x2="${x + 14}" y2="${y2}" stroke="${C.dim}" stroke-width="1.5"/>
<rect x="${x - 42}" y="${my - 15}" width="84" height="30" rx="6" fill="#fff" stroke="${C.dim}" stroke-width="2"/>
<text x="${x}" y="${my + 8}" font-family="Arial" font-size="20" font-weight="bold" fill="${C.dim}" text-anchor="middle">${label}</text>`;
};

// קו מידה אופקי עם מספר
const dimH = (y, x1, x2, label) => {
  const mx = (x1 + x2) / 2;
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.dim}" stroke-width="2" marker-start="url(#arS)" marker-end="url(#ar)"/>
<line x1="${x1}" y1="${y - 14}" x2="${x1}" y2="${y + 14}" stroke="${C.dim}" stroke-width="1.5"/>
<line x1="${x2}" y1="${y - 14}" x2="${x2}" y2="${y + 14}" stroke="${C.dim}" stroke-width="1.5"/>
<rect x="${mx - 46}" y="${y - 16}" width="92" height="32" rx="6" fill="#fff" stroke="${C.dim}" stroke-width="2"/>
<text x="${mx}" y="${y + 8}" font-family="Arial" font-size="20" font-weight="bold" fill="${C.dim}" text-anchor="middle">${label}</text>`;
};

// תגית שטח: שטח לא מסומן בחץ מידה, רק בתווית
const areaTag = (x, y, label) =>
  `<rect x="${x - 52}" y="${y - 20}" width="104" height="40" rx="8" fill="#fff" stroke="${C.dim}" stroke-width="2.5"/>
<text x="${x}" y="${y + 9}" font-family="Arial" font-size="23" font-weight="bold" fill="${C.dim}" text-anchor="middle">${label}</text>`;

const wall = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.wall}" stroke="${C.wallLine}" stroke-width="3"/>`;

const window_ = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.glass}" stroke="${C.wallLine}" stroke-width="2.5"/>
   <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${C.wallLine}" stroke-width="2"/>`;

const door = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="2.5"/>
   <circle cx="${x + w - 10}" cy="${y + h / 2}" r="4" fill="${C.wallLine}"/>`;

const bush = (cx, cy, r) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.green}" opacity=".85"/>
   <circle cx="${cx - r * .6}" cy="${cy + r * .3}" r="${r * .7}" fill="${C.green}" opacity=".7"/>
   <circle cx="${cx + r * .6}" cy="${cy + r * .3}" r="${r * .65}" fill="${C.green}" opacity=".75"/>`;

const S = {};

/* ---------- 1. מצללת עץ בחצר ---------- */
S.case1 = () => {
  const g = 470;
  let s = head() + groundAt(g);
  s += wall(40, 150, 190, g - 150);
  s += window_(80, 220, 100, 90);
  // עמודי המצללה
  const beamY = 250, posts = [300, 420, 540, 660];
  posts.forEach((x) => s += `<rect x="${x - 9}" y="${beamY}" width="18" height="${g - beamY}" fill="${C.element}" stroke="${C.elementDark}" stroke-width="2.5"/>`);
  // קורות ראשיות
  s += `<rect x="270" y="${beamY - 20}" width="420" height="20" fill="${C.elementDark}"/>`;
  // לוחות הצללה עם מרווחים שווים (40% פתוח)
  for (let i = 0; i < 13; i++) {
    const x = 275 + i * 32;
    s += `<rect x="${x}" y="${beamY - 34}" width="19" height="14" fill="${C.element}" stroke="${C.elementDark}" stroke-width="1.5"/>`;
  }
  s += bush(255, g - 22, 26) + bush(715, g - 18, 22);
  s += areaTag(480, g + 62, '24 \u33A1');
  return s + "</svg>";
};

/* ---------- 2. מחסן גינה עם חיבור למים וביוב ---------- */
S.case2 = () => {
  const g = 470;
  let s = head() + groundAt(g);
  s += wall(600, 170, 170, g - 170);
  s += window_(640, 240, 90, 80);
  // המחסן
  const sx = 210, sw = 260, sy = 250;
  s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${g - sy}" fill="#d9b98a" stroke="${C.wallLine}" stroke-width="3"/>`;
  for (let i = 1; i < 9; i++) s += `<line x1="${sx}" y1="${sy + i * 24}" x2="${sx + sw}" y2="${sy + i * 24}" stroke="#b9945f" stroke-width="1.5"/>`;
  s += `<path d="M${sx - 22} ${sy} L${sx + sw / 2} ${sy - 52} L${sx + sw + 22} ${sy} z" fill="#c49a63" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += door(sx + 95, sy + 70, 70, g - sy - 70);
  // צנרת מים וביוב מהבית אל המחסן - זה מה שמפיל את הפטור
  s += `<path d="M660 ${g + 4} L660 ${g + 30} L${sx + sw / 2} ${g + 30} L${sx + sw / 2} ${g + 4}" stroke="#2f7fbf" stroke-width="9" fill="none"/>`;
  s += `<path d="M690 ${g + 4} L690 ${g + 58} L${sx + sw / 2 + 34} ${g + 58} L${sx + sw / 2 + 34} ${g + 4}" stroke="#6b6b6b" stroke-width="13" fill="none"/>`;
  s += `<circle cx="${sx + sw / 2}" cy="${g + 2}" r="9" fill="#2f7fbf"/>`;
  s += `<circle cx="${sx + sw / 2 + 34}" cy="${g + 2}" r="11" fill="#6b6b6b"/>`;
  s += areaTag(sx + sw / 2, g + 100, '5.5 \u33A1');
  s += bush(140, g - 20, 24);
  return s + "</svg>";
};

/* ---------- 3. גדר בגבול המגרש ---------- */
S.case3 = () => {
  const g = 440;
  let s = head() + groundAt(g);
  s += wall(30, 190, 210, g - 190) + window_(70, 250, 110, 80);
  // הגדר
  const fy = 250, fx1 = 300, fx2 = 760;
  s += `<rect x="${fx1}" y="${fy}" width="${fx2 - fx1}" height="${g - fy}" fill="${C.wall}" stroke="${C.wallLine}" stroke-width="3"/>`;
  // מישקי בלוקים
  for (let r = 0; r < 6; r++) {
    const y = fy + 10 + r * 30;
    if (y > g - 4) break;
    s += `<line x1="${fx1}" y1="${y}" x2="${fx2}" y2="${y}" stroke="${C.wallShade}" stroke-width="2.5"/>`;
    for (let c = 0; c < 8; c++) {
      const x = fx1 + (r % 2 ? 30 : 60) + c * 58;
      if (x < fx2) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${Math.min(y + 30, g)}" stroke="${C.wallShade}" stroke-width="2.5"/>`;
    }
  }
  s += `<rect x="${fx1 - 6}" y="${fy - 12}" width="${fx2 - fx1 + 12}" height="14" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="2.5"/>`;
  s += dimV(268, fy - 12, g, "1.4 m");
  s += bush(560, g - 18, 20);
  return s + "</svg>";
};

/* ---------- 4. מזגן בחזית הפונה לרחוב ---------- */
S.case4 = () => {
  const g = 500;
  let s = head() + groundAt(g);
  // חזית בניין
  s += wall(90, 60, 620, g - 60);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      s += window_(150 + c * 200, 110 + r * 130, 110, 85);
  // חנות בקומת הקרקע
  s += `<rect x="150" y="${g - 120}" width="500" height="120" fill="${C.glass}" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += `<line x1="400" y1="${g - 120}" x2="400" y2="${g}" stroke="${C.wallLine}" stroke-width="3"/>`;
  // המזגן על החזית
  const mx = 292, my = 236;
  const mw = 130, mh = 86;
  s += `<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" fill="${C.metal}" stroke="${C.wallLine}" stroke-width="3.5"/>`;
  s += `<circle cx="${mx + mw / 2}" cy="${my + mh / 2}" r="30" fill="none" stroke="#4c5663" stroke-width="5"/>`;
  s += `<path d="M${mx + mw / 2} ${my + 13} A30 30 0 0 1 ${mx + mw / 2 + 26} ${my + 58}" stroke="#4c5663" stroke-width="5" fill="none"/>`;
  s += `<path d="M${mx + mw / 2} ${my + mh - 13} A30 30 0 0 1 ${mx + mw / 2 - 26} ${my + 28}" stroke="#4c5663" stroke-width="5" fill="none"/>`;
  s += `<rect x="${mx + 10}" y="${my + mh}" width="${mw - 20}" height="12" fill="#6f7a86"/>`;
  s += `<rect x="${mx + 24}" y="${my + mh + 12}" width="12" height="26" fill="#6f7a86"/>`;
  s += `<rect x="${mx + mw - 36}" y="${my + mh + 12}" width="12" height="26" fill="#6f7a86"/>`;
  // כביש ומדרכה מלפנים - כדי שיהיה ברור שהחזית פונה לרחוב
  s += `<rect x="0" y="${g}" width="${W}" height="34" fill="#cfc9bd"/>`;
  s += `<rect x="0" y="${g + 34}" width="${W}" height="${H - g - 34}" fill="${C.road}"/>`;
  for (let i = 0; i < 7; i++) s += `<rect x="${20 + i * 120}" y="${g + 78}" width="62" height="7" fill="#fff" opacity=".85"/>`;
  return s + "</svg>";
};

/* ---------- 5. פאנלים על גג רעפים ---------- */
S.case5 = () => {
  const g = 500;
  let s = head() + groundAt(g);
  s += wall(160, 300, 480, g - 300);
  s += window_(220, 350, 100, 80) + window_(480, 350, 100, 80) + door(370, 380, 70, g - 380);
  // גג רעפים
  s += `<path d="M130 300 L400 150 L670 300 z" fill="${C.roof}" stroke="${C.wallLine}" stroke-width="3"/>`;
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    s += `<line x1="${130 + (400 - 130) * t}" y1="${300 - (300 - 150) * t}" x2="${670 - (670 - 400) * t}" y2="${300 - (300 - 150) * t}" stroke="#7d4636" stroke-width="2"/>`;
  }
  // פאנלים צמודים למישור הגג ובכיוון השיפוע
  const ridge = { x: 400, y: 150 }, eaveL = { x: 130, y: 300 }, eaveR = { x: 670, y: 300 };
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const slopePanels = (eave) => {
    let o = "";
    for (let i = 0; i < 3; i++) {
      const t1 = 0.18 + i * 0.24, t2 = t1 + 0.2;   // לאורך השיפוע
      const u1 = 0.14, u2 = 0.62;                   // מרחק מהרכס כלפי מטה
      const a = lerp(lerp(ridge, eave, t1), lerp(ridge, eave, t1), 0);
      const top1 = lerp(ridge, eave, t1), top2 = lerp(ridge, eave, t2);
      const down = { x: (eave.x - ridge.x) * 0, y: 0 };
      // נקודה על מישור הגג: מזיזים אנכית כלפי מטה לאורך המדרון
      const p = (top, u) => ({ x: top.x + (eave.x - ridge.x) * 0.0, y: top.y + (300 - top.y) * u });
      const q1 = p(top1, u1), q2 = p(top2, u1), q3 = p(top2, u2), q4 = p(top1, u2);
      o += `<polygon points="${q1.x},${q1.y} ${q2.x},${q2.y} ${q3.x},${q3.y} ${q4.x},${q4.y}" fill="#2e4b78" stroke="#16233a" stroke-width="2.5"/>`;
      o += `<line x1="${(q1.x + q4.x) / 2}" y1="${(q1.y + q4.y) / 2}" x2="${(q2.x + q3.x) / 2}" y2="${(q2.y + q3.y) / 2}" stroke="#4a6ea8" stroke-width="2"/>`;
    }
    return o;
  };
  s += slopePanels(eaveL) + slopePanels(eaveR);
  s += bush(110, g - 20, 26) + bush(700, g - 18, 22);
  return s + "</svg>";
};

/* ---------- 6. סגירת מרפסת בקירוי אטום ---------- */
S.case6 = () => {
  const g = 540;
  let s = head() + groundAt(g);
  s += wall(60, 40, 680, g - 40);
  for (let c = 0; c < 3; c++) s += window_(110 + c * 210, 90, 110, 85);
  // המרפסת הסגורה
  const bx = 260, by = 250, bw = 300, bh = 200;
  s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${C.glass}" stroke="${C.wallLine}" stroke-width="3"/>`;
  for (let i = 1; i < 5; i++) s += `<line x1="${bx + i * (bw / 5)}" y1="${by}" x2="${bx + i * (bw / 5)}" y2="${by + bh}" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += `<line x1="${bx}" y1="${by + 70}" x2="${bx + bw}" y2="${by + 70}" stroke="${C.wallLine}" stroke-width="3"/>`;
  // קירוי אטום מעליה - זה מה שהופך אותה לשטח בנוי
  s += `<rect x="${bx - 22}" y="${by - 34}" width="${bw + 44}" height="34" fill="${C.glassSolid}" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += `<line x1="${bx - 22}" y1="${by - 17}" x2="${bx + bw + 22}" y2="${by - 17}" stroke="#5b8296" stroke-width="2"/>`;
  s += `<rect x="${bx}" y="${by + bh}" width="${bw}" height="16" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="2.5"/>`;
  return s + "</svg>";
};

/* ---------- 7. סורגים בחלונות ---------- */
S.case7 = () => {
  const g = 520;
  let s = head() + groundAt(g);
  s += wall(80, 90, 640, g - 90);
  const barred = (x, y, w, h, escape) => {
    let o = window_(x, y, w, h);
    for (let i = 1; i < 6; i++) o += `<line x1="${x + i * (w / 6)}" y1="${y}" x2="${x + i * (w / 6)}" y2="${y + h}" stroke="${C.metal}" stroke-width="5"/>`;
    for (let i = 1; i < 3; i++) o += `<line x1="${x}" y1="${y + i * (h / 3)}" x2="${x + w}" y2="${y + i * (h / 3)}" stroke="${C.metal}" stroke-width="5"/>`;
    o += `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" fill="none" stroke="${escape ? C.element : C.metal}" stroke-width="${escape ? 6 : 4}"/>`;
    if (escape) o += `<circle cx="${x + w - 12}" cy="${y + h / 2}" r="9" fill="${C.element}" stroke="${C.elementDark}" stroke-width="2.5"/>`;
    return o;
  };
  s += barred(140, 170, 150, 120, false);
  s += barred(340, 170, 150, 120, true);
  s += barred(540, 170, 150, 120, false);
  s += barred(140, 350, 150, 120, false);
  s += barred(340, 350, 150, 120, false);
  s += barred(540, 350, 150, 120, false);
  return s + "</svg>";
};

/* ---------- 8. מכולה זמנית בחצר ---------- */
S.case8 = () => {
  const g = 470;
  let s = head() + groundAt(g);
  s += wall(590, 150, 180, g - 150) + window_(630, 220, 100, 80);
  // המכולה
  const cx = 110, cy = 290, cw = 400, ch = g - cy;
  s += `<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" fill="#c1663f" stroke="${C.wallLine}" stroke-width="3"/>`;
  for (let i = 1; i < 16; i++) s += `<line x1="${cx + i * (cw / 16)}" y1="${cy + 6}" x2="${cx + i * (cw / 16)}" y2="${g - 6}" stroke="#9e4f30" stroke-width="4"/>`;
  s += `<rect x="${cx}" y="${cy}" width="${cw}" height="14" fill="#a85535" stroke="${C.wallLine}" stroke-width="2.5"/>`;
  s += `<rect x="${cx}" y="${g - 14}" width="${cw}" height="14" fill="#a85535" stroke="${C.wallLine}" stroke-width="2.5"/>`;
  // ידיות דלת
  s += `<rect x="${cx + cw - 60}" y="${cy + 30}" width="7" height="${ch - 60}" fill="#7d3f26"/>`;
  s += `<rect x="${cx + cw - 44}" y="${cy + 30}" width="7" height="${ch - 60}" fill="#7d3f26"/>`;
  s += areaTag(cx + cw / 2, g + 62, '15 \u33A1');
  s += bush(545, g - 18, 22);
  return s + "</svg>";
};

/* ---------- 9. מצללה בבניין לשימור ---------- */
S.case9 = () => {
  const g = 500;
  let s = head() + groundAt(g);
  // בניין בסגנון היסטורי: אף אמצעי, קרניז, תריסים
  s += wall(150, 70, 500, g - 70);
  s += `<rect x="132" y="52" width="536" height="24" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += `<rect x="140" y="250" width="520" height="16" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="2.5"/>`;
  const shutter = (x, y) => `<rect x="${x}" y="${y}" width="90" height="110" fill="${C.glass}" stroke="${C.wallLine}" stroke-width="2.5"/>` +
    Array.from({ length: 7 }, (_, i) => `<line x1="${x + 4}" y1="${y + 12 + i * 14}" x2="${x + 86}" y2="${y + 12 + i * 14}" stroke="#6f8fa0" stroke-width="3"/>`).join("");
  s += shutter(200, 110) + shutter(360, 110) + shutter(520, 110);
  s += shutter(200, 290) + shutter(520, 290);
  s += door(370, 330, 90, g - 330);
  // מצללה בחצר שלפני הבניין
  const py = 372, pcols = [95, 190];
  pcols.forEach((x) => s += `<rect x="${x - 8}" y="${py}" width="16" height="${g - py}" fill="${C.element}" stroke="${C.elementDark}" stroke-width="2.5"/>`);
  s += `<rect x="78" y="${py - 16}" width="129" height="16" fill="${C.elementDark}"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${82 + i * 21}" y="${py - 30}" width="12" height="14" fill="${C.element}" stroke="${C.elementDark}" stroke-width="1.5"/>`;
  s += areaTag(142, g + 62, '16 ㎡');
  // תג שימור על החזית
  s += `<circle cx="700" cy="120" r="42" fill="#fff" stroke="${C.dim}" stroke-width="5"/>`;
  s += `<path d="M700 96 L718 110 L711 136 L689 136 L682 110 z" fill="${C.dim}"/>`;
  return s + "</svg>";
};

/* ---------- 10. גגון קשיח מעל כניסה ---------- */
S.case10 = () => {
  const g = 500;
  let s = head() + groundAt(g);
  s += wall(360, 60, 400, g - 60);
  s += window_(430, 120, 110, 85) + window_(610, 120, 110, 85);
  s += door(470, 320, 90, g - 320);
  s += `<rect x="440" y="${g}" width="150" height="12" fill="${C.wallShade}" stroke="${C.wallLine}" stroke-width="2"/>`;
  // הגגון בולט מהקיר, לוח אופקי עם שיפוע קל לניקוז
  const gy2 = 268, tip2 = 150;
  s += `<polygon points="360,${gy2} 360,${gy2 + 26} ${tip2},${gy2 + 44} ${tip2},${gy2 + 16}" fill="${C.metal}" stroke="${C.wallLine}" stroke-width="3"/>`;
  s += `<rect x="${tip2}" y="${gy2 + 16}" width="8" height="28" fill="#6f7a86" stroke="${C.wallLine}" stroke-width="2"/>`;
  s += `<line x1="${tip2}" y1="${gy2 + 16}" x2="360" y2="${gy2}" stroke="#b9c2cc" stroke-width="3"/>`;
  // מוטות מתיחה מהקיר אל קצה הגגון
  s += `<line x1="356" y1="${gy2 - 74}" x2="${tip2 + 12}" y2="${gy2 + 15}" stroke="#6f7a86" stroke-width="6"/>`;
  s += `<line x1="356" y1="${gy2 - 74}" x2="${tip2 + 108}" y2="${gy2 + 20}" stroke="#6f7a86" stroke-width="6"/>`;
  s += `<rect x="348" y="${gy2 - 84}" width="16" height="18" fill="#5d6773"/>`;
  s += dimH(gy2 + 104, tip2, 360, "1.8 m");
  s += bush(200, g - 20, 26);
  return s + "</svg>";
};

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const [name, fn] of Object.entries(S)) {
  fs.writeFileSync(path.join(OUT, name + ".svg"), fn(), "utf8");
  n++;
}
console.log("נוצרו " + n + " שרטוטים ב-" + OUT);
