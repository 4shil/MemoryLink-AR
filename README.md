# MemoryLink AR

Web-based AR platform that turns physical Polaroids into portals to digital memories. Scan a QR code on a printed photo and watch videos and images overlay on the physical print through your camera.

No app install required — runs entirely in the browser.

![demo](https://media.giphy.com/media/l0HlTsBt3VQMd2v72/giphy.gif)

---

## How it works

1. Print a Polaroid
2. Generate a QR code pointing to `/m/{memory-id}` and attach it
3. Scan with any phone camera
4. Grant camera access
5. AR overlay appears anchored to the photo — swipe through the memory stack

---

## Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- MindAR.js — marker-based image tracking
- Three.js — 3D overlay rendering
- html5-qrcode — in-browser QR scanning
- qrcode — QR generation
- Framer Motion — swipe animations

---

## Getting started

```bash
git clone https://github.com/4shil/MemoryLink-AR.git
cd MemoryLink-AR
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Adding memories

1. Place your Polaroid reference image at `public/assets/target.jpg`
2. Compile it to `.mind` format with [MindAR Web Compiler](https://github.com/hiukim/mind-ar-js)
3. Save as `public/assets/target.mind`
4. Drop videos/photos in `public/assets/videos/` and `public/assets/photos/`

Memory pages live at `/m/{id}`:

```
/m/seniors_farewell
/m/birthday_2025
```

Generate a QR code for any memory:

```typescript
import { generateQRCode } from './utils/qr';
const qr = await generateQRCode('https://yoursite.com/m/seniors_farewell');
```

---

## Project structure

```
app/
  page.tsx              # Landing page
  layout.tsx
  m/[id]/page.tsx       # Dynamic memory experience
components/
  ARViewport.tsx        # AR rendering (Three.js + MindAR)
  CameraPermission.tsx
  DigitalStack.tsx      # Swipeable memory stack
  QRDisplay.tsx
  QRScanner.tsx
  ScanningOverlay.tsx
utils/
  qr.ts
  media.ts
public/assets/
  photos/
  videos/
```

---

## Build

```bash
npm run build
npm start
```

Requires WebGL, camera access, JS enabled. Tested on Chrome 90+, Safari 14+, Firefox 88+, iOS Safari, Chrome Android.

---

## License

MIT
