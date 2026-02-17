# MemoryLink AR

A minimalist WebAR platform for scanning physical Polaroids and unlocking digital memories.

## How It Works

1. **Scan QR Code** - Point your phone at the QR code on a physical Polaroid
2. **Grant Camera Access** - Allow browser to access camera
3. **View Memories** - AR overlay displays videos/photos anchored to the Polaroid
4. **Swipe Through** - Drag left/right to navigate through the memory stack

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **AR Engine**: MindAR.js for marker-based image tracking
- **3D**: Three.js for rendering digital overlays
- **QR Scanning**: html5-qrcode for QR code detection
- **QR Generation**: qrcode for creating shareable links
- **Animation**: Framer Motion for smooth interactions

## Project Structure

```
├── app/
│   ├── m/[id]/page.tsx          # Dynamic memory page route
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── ARViewport.tsx            # AR rendering engine
│   ├── CameraPermission.tsx      # Camera access request
│   ├── DigitalStack.tsx          # Memory card stack UI
│   ├── QRDisplay.tsx             # QR code display component
│   ├── QRScanner.tsx             # QR code scanner
│   └── ScanningOverlay.tsx       # AR scanning guide
├── utils/
│   ├── qr.ts                     # QR code utilities
│   └── media.ts                  # Media optimization
├── public/assets/                # Polaroid target images & media
└── package.json
```

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Add Memory Assets

1. Place your Polaroid reference image at `public/assets/target.jpg`
2. Compile it to `.mind` format using [MindAR Web](https://github.com/hiukim/mind-ar-js)
3. Save as `public/assets/target.mind`
4. Place videos/photos in `public/assets/videos/` and `public/assets/photos/`

### Create Memory Links

Visit `/m/{memory-id}` to access a memory experience. Example:
- `/m/seniors_farewell` - Senior farewell memories
- `/m/birthday_2025` - Birthday memories

### Generate QR Codes

Use the `generateQRCode()` utility from `utils/qr.ts` to create scannable codes for each memory link.

## Building for Production

```bash
npm run build
npm start
```

## Browser Requirements

- Modern browsers with WebGL support
- Camera access enabled
- JavaScript enabled

Tested on:
- Chrome 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- Mobile-optimized with lazy loading
- Video bitrate adapts to connection speed
- AR tracking runs at 30+ FPS on mobile devices
- Minimal bundle size (~400KB gzipped)

## Future Enhancements

- [ ] Cloud storage for media assets (Cloudinary integration)
- [ ] Admin dashboard for creating/managing memories
- [ ] Multiple target markers per memory
- [ ] 3D model overlays
- [ ] Sound effects and background music
- [ ] Analytics tracking

## License

MIT
