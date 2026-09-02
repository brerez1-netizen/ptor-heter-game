import fs from "node:fs";
const GAME = "d:/קלוד קוד my-workspace/תחיקת-הבניה-משחקים/ptor-heter-game";
const OUT = "C:/Users/brere/AppData/Local/Temp/claude/d-----------my-workspace/8cdcc8d5-d036-4e6f-8243-900bad780522/scratchpad/image-prompts.html";

const STYLE = `Flat vector editorial illustration. Clean geometric shapes, strong readable
silhouettes, thick confident outlines. Straight-on architectural elevation view,
no perspective distortion, camera at eye level.

Israeli residential setting: off-white and sand-beige plaster walls, occasional
Jerusalem-stone cladding, flat concrete roofs carrying white water tanks and solar
collectors, aluminium window frames, olive-green shrubs and bougainvillea.

Warm late-afternoon Mediterranean daylight, soft long shadows, muted teal-blue sky.
Limited palette: sand beige, off-white plaster, terracotta, muted teal, warm amber.
The element the scene is about is rendered in warm amber so it reads instantly as
the subject. Everything else stays quiet and neutral.

Uncluttered composition, generous empty space, no crowd, no vehicles unless asked.
Must read clearly from across a lecture hall when projected.

4:3 landscape.

No text, no words, no letters, no numbers, no logos, no signage, no house numbers,
no readable writing anywhere in the image.`;

const CASES = [
  {
    t: "מצללת עץ בחצר",
    key: "המרווחים בין השלבים, מחולקים שווה ומהווים לפחות 40% מהמשטח",
    p: `A wooden pergola in the private back garden of a single-family house, attached
along one side to the house wall. The pergola roof is made of evenly spaced wooden
slats with clear, equal gaps between them, so open sky is visible through roughly
half of the roof surface. Four square timber posts stand on a concrete patio floor.

The gaps between the slats are the single most important detail: they must be
obviously open, evenly distributed, and impossible to mistake for a solid roof.
CRITICAL: the spaces between the slats are empty air. There is no glass, no polycarbonate, no transparent sheet, no mesh and no roofing material of any kind between the slats or above them. The exact same sky colour shows straight through the gaps, so the roof reads as half open sky and half timber. Nothing spans between one slat and the next.

Low shrubs at the base of the corner posts.`,
  },
  {
    t: "מחסן גינה מעץ",
    key: "הצנרת. המידות תקינות, החיבור למים ולביוב הוא שמפיל את הפטור",
    p: `A small prefabricated wooden garden shed standing in a back yard, roughly the
footprint of a single parking space, with a simple pitched roof and one door.
Horizontal timber cladding boards.

Running along the ground from the main house to the shed are two exposed utility
connections: a blue water pipe and a thicker grey sewage pipe, both clearly visible
where they rise and enter the base of the shed. The pipes are the critical detail
and must be unmistakable, not hidden behind planting.`,
  },
  {
    t: "גדר בלוקים בגבול המגרש",
    key: "הגובה ביחס לאדם, והקרקע המפולסת משני הצדדים. זו גדר ולא קיר תומך",
    p: `A rendered concrete-block boundary wall running along the rear property line of a
private plot. The wall reaches roughly chest height on an adult, is continuous and
solid along its entire length, and has a simple flat coping on top. The block
coursing shows faintly through the plaster render.

The ground is level on both sides of the wall, at the same height, so it is clearly
a boundary fence and not a retaining wall. Part of a house is visible at one edge
of the frame for scale.`,
  },
  {
    t: "מזגן בחזית הפונה לרחוב",
    key: "המיקום. יחידה חשופה לגמרי על חזית שפונה לרחוב, בלי מסתור",
    p: `The street-facing facade of a three-storey residential apartment building, with a
shopfront at ground level. A large air-conditioning condenser unit is mounted on
the bare plaster wall of the first floor, fully exposed and prominent, directly
above the shopfront, with its refrigerant pipes and condensate line running visibly
down the facade.

The unit is completely unhidden: no laundry screen, no louvre box, nothing
concealing it. A pavement and a road with lane markings run along the bottom of the
frame, making it obvious this facade faces the street.

The shopfront glazing is blank. No signage, no lettering, no brand marks anywhere.`,
  },
  {
    t: "פאנלים סולאריים על גג רעפים",
    key: "הפאנלים צמודים לשיפוע ובאותו כיוון, בלי קונסטרוקציה מוגבהת",
    p: `A single-family house with a pitched clay-tile roof, seen straight on from the
front. Photovoltaic solar panels are laid flat and flush directly onto the tiles,
following the exact slope of the roof, arranged in two neat rectangular arrays, one
on each roof plane.

The panels sit tight against the tiles: no raised support frame, no visible gap or
shadow underneath, no tilt of their own. They do not project above the ridge and do
not overhang the eaves. Dark blue-grey panels against warm terracotta tiles.`,
  },
  {
    t: "סגירת מרפסת בקירוי אטום",
    key: "הניגוד בין המרפסת הסגורה למרפסות הפתוחות באותה חזית",
    p: `The facade of a residential apartment building with three balconies stacked or side
by side. One single balcony has been fully enclosed: floor-to-ceiling aluminium-
framed glazing fills the entire balcony opening, and above it sits a completely
solid, opaque roof panel covering the balcony from the wall right out to its edge,
with no gaps at all.

The neighbouring balconies on the same facade remain open, with simple railings and
nothing above them. The contrast between the one sealed balcony and the open ones
is the whole point of the image and must be immediately obvious.`,
  },
  {
    t: "סורגים בחלונות דירת קרקע",
    key: "סורג מילוט אחד מול חמישה קבועים, באמבר, כדי שהעין תיפול עליו",
    p: `The ground-floor facade of a residential building with six windows arranged in two
rows of three. All six are fitted with fixed steel security bars in a dense grid
pattern.

One single window is different: its bar frame is hinged as an escape hatch, with a
visible release handle at one side, and it is rendered in warm amber while the other
five remain plain grey steel. The contrast between the one openable window and the
five fixed ones is the subject of the image.`,
  },
  {
    t: "מכולה זמנית בחצר",
    key: "זמניות. יושבת על הקרקע, לא מחוברת לכלום, ליד מבנה בשיפוץ",
    p: `A corrugated steel shipping container placed on open ground in the yard of a
property, beside a building undergoing renovation. Standard storage container with
double doors at one end and pronounced vertical corrugations along its side.

It sits directly on the ground with no foundation and no connection to any
services. Scaffolding poles and a few stacked material pallets in the background
hint at renovation work. The container is clearly a temporary object placed in the
yard, not part of the building.`,
  },
  {
    t: "מצללה בבניין לשימור",
    key: "הבניין, לא המצללה. המידות מושלמות והפטור נופל בגלל תקנה 2",
    p: `A 1930s Bauhaus-style apartment building in Tel Aviv: smooth white plaster,
strong horizontal lines, rounded balcony corners, narrow horizontal ribbon windows
with louvred shutters, a thin projecting cornice, a raised ground floor on pilotis.
The building is clearly historic and carefully preserved.

In the small front garden stands a modest new wooden pergola with evenly spaced
slats, obviously a recent addition. The contrast between the white heritage
building and the new timber structure in front of it is the subject.

No preservation plaque, no sign, no lettering on the building.`,
  },
  {
    t: "גגון קשיח מעל כניסה",
    key: "עומק הבליטה מהקיר. זווית צד, כדי שיהיה אפשר לראות כמה הוא בולט",
    p: `A rigid aluminium entrance canopy mounted above the front door of a private house,
seen from the side so the projection depth is clearly readable.

The canopy is a flat horizontal slab cantilevering straight out from the wall,
projecting roughly the height of an adult, with a slight fall away from the wall for
drainage and a visible edge fascia along its outer rim. Two diagonal steel tie rods
run from a bracket higher up the wall down to the outer corners of the canopy,
carrying it.

The door below is closed and plain. A low shrub at the base of the wall for scale.`,
  },
];

// שבירת השורות בקוד המקור נועדה לקריאות, לא לפלט. מאחדים כל פסקה לשורה אחת
// ונותנים ל-pre-wrap לגלוש בעצמו, אחרת מקבלים שבירה כפולה ומרופטת.
const NL = String.fromCharCode(10);
const reflow = (t) =>
  t.trim().split(NL + NL).map((par) => par.split(NL).join(" ").trim()).join(NL + NL);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// הטמעת השרטוט הקיים כתמונה ממוזערת, עם מרחב שמות ייחודי כדי שה-defs לא יתנגשו
function inlineSvg(i) {
  let s = fs.readFileSync(`${GAME}/images/case${i}.svg`, "utf8");
  ["sky", "hatch", "ar", "arS"].forEach((id) => {
    s = s.split(`id="${id}"`).join(`id="c${i}-${id}"`).split(`url(#${id})`).join(`url(#c${i}-${id})`);
  });
  return s.replace(/^<svg /, `<svg class="thumb" role="img" aria-label="השרטוט הנוכחי" `)
          .replace(/ width="\d+" height="\d+"/, "");
}

const cards = CASES.map((c, i) => {
  const n = i + 1;
  return `<article class="case" id="case${n}">
  <header class="case-head">
    <span class="num">${n}</span>
    <div>
      <h3>${esc(c.t)}</h3>
      <p class="key"><span class="key-label">הפרט הקובע</span>${esc(c.key)}</p>
    </div>
  </header>
  <div class="case-body">
    <figure class="now">
      ${inlineSvg(n)}
      <figcaption>מה שיש עכשיו · <code>case${n}.svg</code></figcaption>
    </figure>
    <div class="prompt">
      <pre dir="ltr" id="p${n}">${esc(reflow(c.p))}</pre>
      <div class="acts">
        <button class="btn primary" data-full="${n}">העתקת הפרומפט המלא</button>
        <button class="btn" data-only="${n}">רק הקטע הזה</button>
      </div>
    </div>
  </div>
</article>`;
}).join("\n");

const html = `<title>תמונות פטור או היתר</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Assistant:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root{
    --ground:#f6f1e8;
    --surface:#fffdf9;
    --sunk:#efe8db;
    --line:#ddd2be;
    --ink:#2b2721;
    --muted:#6f6558;
    --amber:#b7791a;
    --teal:#2f6b72;
    --terra:#a04e2c;
    --code-bg:#fbf8f2;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --ground:#15120e;
      --surface:#1d1913;
      --sunk:#241f18;
      --line:#3a3227;
      --ink:#ece5d8;
      --muted:#a09584;
      --amber:#e0a93c;
      --teal:#6bb3ba;
      --terra:#d98255;
      --code-bg:#221d16;
    }
  }
  :root[data-theme="dark"]{
    --ground:#15120e;
    --surface:#1d1913;
    --sunk:#241f18;
    --line:#3a3227;
    --ink:#ece5d8;
    --muted:#a09584;
    --amber:#e0a93c;
    --teal:#6bb3ba;
    --terra:#d98255;
    --code-bg:#221d16;
  }

  *{box-sizing:border-box}
  body{
    direction:rtl;
    background:var(--ground);
    color:var(--ink);
    font-family:"Assistant","Segoe UI",Arial,sans-serif;
    font-size:16px;line-height:1.65;
    padding:0 20px 80px;
  }
  .page{max-width:900px;margin:0 auto}

  /* ---------- כותרת ---------- */
  header.top{padding:56px 0 30px;border-bottom:2px solid var(--line)}
  .eyebrow{
    font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;
    color:var(--muted);font-weight:600;margin:0 0 12px;
  }
  h1{
    font-family:"Frank Ruhl Libre",Georgia,serif;font-weight:700;
    font-size:clamp(30px,5vw,44px);line-height:1.15;margin:0;text-wrap:balance;
  }
  .lede{margin:14px 0 0;max-width:62ch;color:var(--muted);font-size:17px}

  h2{
    font-family:"Frank Ruhl Libre",Georgia,serif;font-weight:700;
    font-size:24px;margin:52px 0 4px;text-wrap:balance;
  }
  .sub{margin:0 0 18px;color:var(--muted);font-size:15px}

  /* ---------- שלבי העבודה ---------- */
  ol.steps{
    margin:0;padding:0;list-style:none;
    display:flex;flex-direction:column;gap:10px;counter-reset:s;
  }
  ol.steps li{
    counter-increment:s;position:relative;padding-inline-start:38px;
    color:var(--ink);
  }
  ol.steps li::before{
    content:counter(s);position:absolute;inset-inline-start:0;top:2px;
    width:25px;height:25px;border-radius:50%;
    background:var(--sunk);border:1px solid var(--line);
    display:grid;place-items:center;
    font-size:13px;font-weight:600;color:var(--muted);
    font-variant-numeric:tabular-nums;
  }
  code{
    font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.88em;
    background:var(--sunk);border:1px solid var(--line);border-radius:4px;
    padding:1px 6px;direction:ltr;display:inline-block;
  }

  /* ---------- בלוקי טקסט ---------- */
  pre{
    font-family:"IBM Plex Mono",ui-monospace,monospace;
    font-size:13.5px;line-height:1.62;
    background:var(--code-bg);border:1px solid var(--line);border-radius:8px;
    padding:16px 18px;margin:0;
    white-space:pre-wrap;overflow-x:auto;text-align:left;
    color:var(--ink);
  }

  .styleblock{
    background:var(--surface);border:1px solid var(--line);border-radius:12px;
    padding:20px;display:flex;flex-direction:column;gap:14px;
  }
  .styleblock .note{margin:0;font-size:14.5px;color:var(--muted)}

  /* ---------- כרטיס מקרה ---------- */
  .cases{display:flex;flex-direction:column;gap:14px;margin-top:20px}
  .case{
    background:var(--surface);border:1px solid var(--line);border-radius:12px;
    padding:20px;display:flex;flex-direction:column;gap:16px;
  }
  .case-head{display:flex;gap:14px;align-items:flex-start}
  .num{
    flex:none;width:34px;height:34px;border-radius:8px;
    background:var(--amber);color:var(--ground);
    display:grid;place-items:center;
    font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:16px;
    font-variant-numeric:tabular-nums;
  }
  .case h3{
    font-family:"Frank Ruhl Libre",Georgia,serif;font-weight:700;
    font-size:21px;margin:2px 0 6px;
  }
  .key{margin:0;font-size:14.5px;color:var(--muted);line-height:1.55}
  .key-label{
    color:var(--terra);font-weight:600;font-size:12px;letter-spacing:.1em;
    text-transform:uppercase;margin-inline-end:9px;
  }

  .case-body{display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr);gap:18px;align-items:start}
  @media (max-width:720px){ .case-body{grid-template-columns:1fr} }

  figure.now{margin:0;display:flex;flex-direction:column;gap:7px}
  .thumb{
    width:100%;height:auto;display:block;
    border:1px solid var(--line);border-radius:8px;background:var(--sunk);
  }
  figcaption{font-size:12.5px;color:var(--muted)}

  .prompt{display:flex;flex-direction:column;gap:10px;min-width:0}
  .acts{display:flex;gap:8px;flex-wrap:wrap}
  .btn{
    font-family:inherit;font-size:14px;font-weight:600;
    padding:8px 15px;border-radius:7px;cursor:pointer;
    background:var(--sunk);color:var(--ink);border:1px solid var(--line);
    transition:background .15s ease,border-color .15s ease;
  }
  .btn:hover{border-color:var(--amber)}
  .btn.primary{background:var(--amber);color:var(--ground);border-color:var(--amber)}
  .btn.primary:hover{filter:brightness(1.07)}
  .btn.done{background:var(--teal);border-color:var(--teal);color:var(--ground)}
  .btn:focus-visible{outline:2px solid var(--teal);outline-offset:2px}
  @media (prefers-reduced-motion:reduce){ *{transition:none!important} }

  footer.end{
    margin-top:56px;padding-top:22px;border-top:1px solid var(--line);
    color:var(--muted);font-size:14.5px;
  }
  footer.end p{margin:0 0 8px}
</style>

<div class="page">
  <header class="top">
    <p class="eyebrow">תחיקת הבנייה · שיעור 9 · פטור מהיתר בנייה</p>
    <h1>תמונות המקרים למשחק "פטור או היתר"</h1>
    <p class="lede">
      עשרה פרומפטים, אחד לכל מקרה במשחק. השרטוטים שמוצגים כאן הם מה שרץ במשחק עכשיו והם עובדים,
      אז אין דחיפות. כל פרומפט בנוי סביב הפרט האחד שהשאלה נשענת עליו, כי תמונה שלא מראה אותו
      הופכת את המקרה לניחוש.
    </p>
  </header>

  <h2>איך עובדים</h2>
  <p class="sub">כל תמונה היא הדבקה אחת: בלוק הסגנון ואחריו הפרומפט של המקרה. הכפתור הכתום מעתיק את שניהם ביחד.</p>
  <ol class="steps">
    <li>להעתיק את הפרומפט המלא של מקרה, ולהדביק בכלי יצירת התמונות.</li>
    <li>לשמור בשם <code>case1.jpg</code> עד <code>case10.jpg</code> בתיקיית <code>images/</code>.</li>
    <li>להחליף את הסיומות ב-gameData: <code>sed -i 's/\\.svg"/\\.jpg"/g' js/gameData.js</code></li>
    <li>להסתכל על כל תמונה לפני שממשיכים. למודלים יש נטייה לצייר טקסט מזויף גם כשמבקשים במפורש שלא, ובעברית זה יוצא ג'יבריש שסטודנט ישים לב אליו.</li>
  </ol>

  <h2>בלוק הסגנון</h2>
  <p class="sub">זהה לכל עשר התמונות. זה מה שישמור עליהן כסדרה אחת ולא עשר תמונות שנראה שהגיעו ממקומות שונים. יחס גובה-רוחב 4:3 לרוחב, כי זה מה שמסך המרצה ומסך הסולו מצפים לו.</p>
  <div class="styleblock">
    <pre dir="ltr" id="style-src">${esc(reflow(STYLE))}</pre>
    <button class="btn" data-style="1">העתקת בלוק הסגנון בלבד</button>
    <p class="note">האמבר בסוף הבלוק הוא מה שגורם לאלמנט שבשאלה לקפוץ לעין מהשורה האחרונה בכיתה. שווה לשמור עליו.</p>
  </div>

  <h2>עשרת המקרים</h2>
  <p class="sub">המספור תואם את שמות הקבצים ואת סדר המקרים במשחק.</p>
  <div class="cases">
${cards}
  </div>

  <footer class="end">
    <p>הפרומפטים שמורים גם בריפו, ב-<code>tools/image-prompts.md</code>, יחד עם <code>tools/make-svgs.mjs</code> שמייצר את השרטוטים הנוכחיים.</p>
    <p>אם תמונה יוצאת טוב אבל פרט אחד לא נכון, עדיף לתקן את המשפט שמתאר את הפרט ולייצר מחדש, מאשר לוותר עליו. הפרט הוא כל הסיבה שהמקרה קיים.</p>
  </footer>
</div>

<script>
  const STYLE_TEXT = document.getElementById("style-src").textContent;
  function flash(btn, label){
    const was = btn.textContent;
    btn.textContent = label;
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = was; btn.classList.remove("done"); }, 1600);
  }
  async function copy(text, btn){
    try {
      await navigator.clipboard.writeText(text);
      flash(btn, "הועתק");
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); flash(btn, "הועתק"); }
      catch (e2) { flash(btn, "ההעתקה נחסמה, סמן ידנית"); }
      ta.remove();
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.style) return copy(STYLE_TEXT, b);
    if (b.dataset.only) return copy(document.getElementById("p" + b.dataset.only).textContent, b);
    if (b.dataset.full) {
      const body = document.getElementById("p" + b.dataset.full).textContent;
      return copy(STYLE_TEXT + "\\n\\n" + body, b);
    }
  });
</script>
`;

fs.writeFileSync(OUT, html, "utf8");
console.log("נכתב:", OUT, "(" + Math.round(html.length / 1024) + " KB)");
