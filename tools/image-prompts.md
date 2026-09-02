# פרומפטים לתמונות המקרים

עשר תמונות, אחת לכל מקרה. השרטוטים הנוכחיים ב-`images/case1.svg` עד `case10.svg` הם ברירת מחדל שעובדת; התמונות האלה נועדו להחליף אותן.

## איך להשתמש

1. לכל מקרה: להדביק את **בלוק הסגנון** ואז את **הפרומפט של המקרה**, בסדר הזה, כפרומפט אחד.
2. לשמור בשם `case1.jpg` עד `case10.jpg` בתיקיית `images/`.
3. להחליף ב-`js/gameData.js` את הסיומות: `sed -i 's/\.svg"/\.jpg"/g' js/gameData.js`
4. להסתכל על כל תמונה לפני שממשיכים. למודלים יש נטייה לצייר טקסט מזויף גם כשמבקשים במפורש שלא, ובעברית זה יוצא ג'יבריש קריא למחצה שסטודנט ישים לב אליו.

יחס גובה-רוחב: **4:3 לרוחב**. זה מה שמסך המרצה ומסך הסולו מצפים לו.

---

## בלוק הסגנון (זהה לכל עשר התמונות)

```
Flat vector editorial illustration. Clean geometric shapes, strong readable
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
no readable writing anywhere in the image.
```

---

## 1. מצללת עץ בחצר

הפרט שהשאלה נשענת עליו: **המרווחים בין השלבים**, מחולקים שווה ומהווים לפחות 40% מהמשטח.

> **הגרסה הראשונה נפסלה**: המודל מילא את המרווחים בזיגוג תכלת, והתמונה נקראה כגג מזוגג ולא כמרווחים פתוחים. זה סותר ישירות את התשובה לשאלה, ולכן נוסף הסעיף שמתחיל ב-CRITICAL. מקרה 1 הוא היחיד שנשאר בינתיים על השרטוט.

```
A wooden pergola in the private back garden of a single-family house, attached
along one side to the house wall. The pergola roof is made of evenly spaced wooden
slats with clear, equal gaps between them, so open sky is visible through roughly
half of the roof surface. Four square timber posts stand on a concrete patio floor.

The gaps between the slats are the single most important detail: they must be
obviously open, evenly distributed, and impossible to mistake for a solid roof.

CRITICAL: the spaces between the slats are empty air. There is no glass, no
polycarbonate, no transparent sheet, no mesh and no roofing material of any kind
between the slats or above them. The exact same sky colour shows straight through
the gaps, so the roof reads as half open sky and half timber. Nothing spans between
one slat and the next.

Low shrubs at the base of the corner posts.
```

## 2. מחסן גינה מעץ

הפרט: **הצנרת**. המידות תקינות, החיבור למים ולביוב הוא שמפיל את הפטור.

```
A small prefabricated wooden garden shed standing in a back yard, roughly the
footprint of a single parking space, with a simple pitched roof and one door.
Horizontal timber cladding boards.

Running along the ground from the main house to the shed are two exposed utility
connections: a blue water pipe and a thicker grey sewage pipe, both clearly visible
where they rise and enter the base of the shed. The pipes are the critical detail
and must be unmistakable, not hidden behind planting.
```

## 3. גדר בלוקים בגבול המגרש

הפרט: **הגובה** ביחס לאדם, והעובדה שהקרקע מפולסת משני הצדדים, כלומר זו גדר ולא קיר תומך.

```
A rendered concrete-block boundary wall running along the rear property line of a
private plot. The wall reaches roughly chest height on an adult, is continuous and
solid along its entire length, and has a simple flat coping on top. The block
coursing shows faintly through the plaster render.

The ground is level on both sides of the wall, at the same height, so it is clearly
a boundary fence and not a retaining wall. Part of a house is visible at one edge
of the frame for scale.
```

## 4. מזגן בחזית הפונה לרחוב

הפרט: **המיקום**. יחידה חשופה לגמרי על חזית שפונה לרחוב, בלי מסתור.

```
The street-facing facade of a three-storey residential apartment building, with a
shopfront at ground level. A large air-conditioning condenser unit is mounted on
the bare plaster wall of the first floor, fully exposed and prominent, directly
above the shopfront, with its refrigerant pipes and condensate line running visibly
down the facade.

The unit is completely unhidden: no laundry screen, no louvre box, nothing
concealing it. A pavement and a road with lane markings run along the bottom of the
frame, making it obvious this facade faces the street.

The shopfront glazing is blank. No signage, no lettering, no brand marks anywhere.
```

## 5. פאנלים סולאריים על גג רעפים

הפרט: הפאנלים **צמודים לשיפוע** ובאותו כיוון, בלי קונסטרוקציה מוגבהת.

```
A single-family house with a pitched clay-tile roof, seen straight on from the
front. Photovoltaic solar panels are laid flat and flush directly onto the tiles,
following the exact slope of the roof, arranged in two neat rectangular arrays, one
on each roof plane.

The panels sit tight against the tiles: no raised support frame, no visible gap or
shadow underneath, no tilt of their own. They do not project above the ridge and do
not overhang the eaves. Dark blue-grey panels against warm terracotta tiles.
```

## 6. סגירת מרפסת בקירוי אטום

הפרט: **הניגוד** בין המרפסת הסגורה למרפסות הפתוחות באותה חזית.

```
The facade of a residential apartment building with three balconies stacked or side
by side. One single balcony has been fully enclosed: floor-to-ceiling aluminium-
framed glazing fills the entire balcony opening, and above it sits a completely
solid, opaque roof panel covering the balcony from the wall right out to its edge,
with no gaps at all.

The neighbouring balconies on the same facade remain open, with simple railings and
nothing above them. The contrast between the one sealed balcony and the open ones
is the whole point of the image and must be immediately obvious.
```

## 7. סורגים בחלונות דירת קרקע

הפרט: **סורג מילוט אחד** מול חמישה קבועים. באמבר, כדי שהעין תיפול עליו.

```
The ground-floor facade of a residential building with six windows arranged in two
rows of three. All six are fitted with fixed steel security bars in a dense grid
pattern.

One single window is different: its bar frame is hinged as an escape hatch, with a
visible release handle at one side, and it is rendered in warm amber while the other
five remain plain grey steel. The contrast between the one openable window and the
five fixed ones is the subject of the image.
```

## 8. מכולה זמנית בחצר

הפרט: **זמניות**. יושבת על הקרקע, לא מחוברת לכלום, ליד מבנה בשיפוץ.

```
A corrugated steel shipping container placed on open ground in the yard of a
property, beside a building undergoing renovation. Standard storage container with
double doors at one end and pronounced vertical corrugations along its side.

It sits directly on the ground with no foundation and no connection to any
services. Scaffolding poles and a few stacked material pallets in the background
hint at renovation work. The container is clearly a temporary object placed in the
yard, not part of the building.
```

## 9. מצללה בבניין לשימור

הפרט: **הבניין**, לא המצללה. המידות מושלמות והפטור נופל בגלל תקנה 2.

```
A 1930s Bauhaus-style apartment building in Tel Aviv: smooth white plaster,
strong horizontal lines, rounded balcony corners, narrow horizontal ribbon windows
with louvred shutters, a thin projecting cornice, a raised ground floor on pilotis.
The building is clearly historic and carefully preserved.

In the small front garden stands a modest new wooden pergola with evenly spaced
slats, obviously a recent addition. The contrast between the white heritage
building and the new timber structure in front of it is the subject.

No preservation plaque, no sign, no lettering on the building.
```

## 10. גגון קשיח מעל כניסה

הפרט: **עומק הבליטה** מהקיר. זווית צד, כדי שיהיה אפשר לראות כמה הוא בולט.

```
A rigid aluminium entrance canopy mounted above the front door of a private house,
seen from the side so the projection depth is clearly readable.

The canopy is a flat horizontal slab cantilevering straight out from the wall,
projecting roughly the height of an adult, with a slight fall away from the wall for
drainage and a visible edge fascia along its outer rim. Two diagonal steel tie rods
run from a bracket higher up the wall down to the outer corners of the canopy,
carrying it.

The door below is closed and plain. A low shrub at the base of the wall for scale.
```
