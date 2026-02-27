# 📸 MemoryLink AR

<div align="center">

![MemoryLink AR Banner](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXE5NzJrMW1uNGVuM3N1ZHJlMW0wcHF5eHEwNDRiZm0yMzI3Z2s3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlTsBt3VQMd2v72/giphy.gif)

**Turn physical Polaroids into portals. Scan a photo. Unlock a memory.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![MindAR](https://img.shields.io/badge/MindAR.js-AR%20Engine-FF6B6B?style=for-the-badge)](https://hiukim.github.io/mind-ar-js-doc/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## The Idea

Physical photos collect dust. Digital memories get buried in albums nobody opens.

MemoryLink AR bridges the two worlds — you print a Polaroid, stick a QR code on the back, and anyone who scans it gets an AR experience overlaid right on the photo. Videos, photos, moments — all anchored to the real world through the camera lens.

Think of it as a living photo album that exists halfway between paper and screen.

---

## ✨ How It Works

```
1. 📸 Print a Polaroid  →  2. 🔗 Attach a QR code  →  3. 📱 Scan with phone  →  4. ✨ AR memories appear
```

- Point your phone at the QR code
- Grant camera access
- Watch digital memories overlay on the physical Polaroid
- Swipe through the memory stack

No app install needed. Just a browser and a camera.

---

## 🛠️ Tech Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| Framework | Next.js 14 | File-based routing, SSR |
| Language | TypeScript | Type safety everywhere |
| Styling | Tailwind CSS | Rapid utility-first styling |
| AR Engine | MindAR.js | Marker-based image tracking |
| 3D Renderer | Three.js | Digital memory overlays |
| QR Scanning | html5-qrcode | In-browser QR detection |
| QR Generation | qrcode | Shareable memory links |
| Animations | Framer Motion | Smooth swipe transitions |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A webcam or phone camera

### Install

```bash
git clone https://github.com/4shil/MemoryLink-AR.git
cd MemoryLink-AR
npm install
```

### Run Locally

```bash
npm run dev
# Visit http://localhost:3000
```

### Add Your Own Memories

1. Place your Polaroid reference image at `public/assets/target.jpg`
2. Compile it to `.mind` format using [MindAR Web Compiler](https://github.com/hiukim/mind-ar-js)
3. Save as `public/assets/target.mind`
4. Drop your videos/photos into `public/assets/videos/` and `public/assets/photos/`

### Create a Memory Link

Memory experiences live at `/m/{memory-id}`. Examples:

```
/m/seniors_farewell
/m/birthday_2025
/m/road_trip_goa
```

### Generate QR Codes

```typescript
import { generateQRCode } from './utils/qr';

const qr = await generateQRCode('https://yoursite.com/m/seniors_farewell');
```

Print it, stick it on a Polaroid, and you're done.

---

## 📁 Project Structure

```
MemoryLink-AR/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout & metadata
│   ├── globals.css           # Global styles
│   └── m/[id]/
│       └── page.tsx          # Dynamic memory experience page
├── components/
│   ├── ARViewport.tsx        # Core AR rendering with Three.js + MindAR
│   ├── CameraPermission.tsx  # Permission request UI
│   ├── DigitalStack.tsx      # Swipeable memory card stack
│   ├── QRDisplay.tsx         # QR code display
│   ├── QRScanner.tsx         # In-browser QR scanner
│   └── ScanningOverlay.tsx   # AR scanning guide overlay
├── utils/
│   ├── qr.ts                 # QR generation utilities
│   └── media.ts              # Media loading & optimization
├── public/
│   └── assets/
│       ├── photos/           # Memory photos (add yours here)
│       └── videos/           # Memory videos (add yours here)
├── DEPLOYMENT.md             # Hosting & deployment guide
└── CONTRIBUTING.md           # How to contribute
```

---

## 📦 Build & Deploy

```bash
# Production build
npm run build
npm start
```

### Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ |
| Safari 14+ | ✅ |
| Firefox 88+ | ✅ |
| iOS Safari | ✅ |
| Chrome Android | ✅ |

Requires: WebGL, Camera access, JavaScript enabled.

---

## ⚡ Performance

- Mobile-first and optimized
- Lazy loaded assets
- Adaptive video bitrate based on connection
- AR tracking at 30+ FPS on mobile
- ~400KB gzipped bundle

---

## 🗺️ Roadmap

- [ ] Cloud media storage (Cloudinary integration)
- [ ] Admin dashboard to create/manage memories without code
- [ ] Multiple markers per memory set
- [ ] 3D model overlays
- [ ] Background audio & sound effects
- [ ] Analytics (how many times a memory was scanned)

---

## 🤝 Contributing

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. PRs are welcome — especially around performance, AR accuracy, and new memory types.

---

## 📜 License

MIT — build your own memory platform on top of this.

---

<div align="center">
  Made with 🎞️ and a love for physical things in a digital world by <a href="https://github.com/4shil">4shil</a>
</div>
