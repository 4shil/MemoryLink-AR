# Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Git Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Configure environment variables (if needed)
5. Deploy

### Option 2: CLI

```bash
npm install -g vercel
vercel
```

## Environment Setup

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## Pre-deployment Checklist

- [ ] All tests passing (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] No console errors
- [ ] AR tracking `.mind` file in `public/assets/`
- [ ] Sample videos/photos in correct folders
- [ ] QR codes generated and tested

## Post-deployment

1. Test on mobile devices
2. Verify camera permissions work
3. Test AR tracking with physical Polaroid
4. Check performance on slow networks

## Troubleshooting

### Camera not working
- Check browser permissions
- Ensure HTTPS (required for camera API)
- Test in incognito mode

### AR not detecting marker
- Verify `.mind` file is in `public/assets/`
- Check lighting conditions
- Ensure Polaroid image is clear

### Slow performance
- Optimize video file sizes
- Use WebM format for better compression
- Check bundle size with `npm run build -- --profile`
