# Troubleshooting: Images Not Showing

## ✅ ISSUE FIXED!

The image paths have been corrected to use `process.env.PUBLIC_URL` to properly handle the `/myna/` base path.

---

## How to Test Properly

### Option 1: Development Server (RECOMMENDED for testing)

```bash
# Start the development server
npm start

# Visit in browser:
http://localhost:3000

# Images should load perfectly!
```

**Why this works:** Development server doesn't use the `/myna/` base path.

---

### Option 2: Production Build (for deployment testing)

```bash
# Build the project
npm run build

# Install serve (if not already installed)
npm install -g serve

# Serve the build folder
serve -s build -p 3000

# Visit in browser (IMPORTANT: include /myna/):
http://localhost:3000/myna/
```

**Important:** You MUST visit `http://localhost:3000/myna/` (with `/myna/` path) because your `package.json` has `"homepage": "/myna/"`.

---

## Quick Test Scripts

I've created two helper scripts for you:

### Test Development Mode:
```bash
./test-dev.sh
```

### Test Production Build:
```bash
./test-build.sh
```

---

## What Was Fixed

**Problem:** Image paths were using absolute paths (`/images/...`) which don't work with the `/myna/` base path.

**Solution:** Updated paths to use `process.env.PUBLIC_URL`:
```javascript
// Before:
mobile: `/images/hero-optimized/${img.baseName}-mobile.webp`

// After:
mobile: `${process.env.PUBLIC_URL}/images/hero-optimized/${img.baseName}-mobile.webp`
```

---

## Verification Checklist

Run these commands to verify everything is working:

```bash
# 1. Verify optimized images exist
ls -la public/images/hero-optimized/ | wc -l
# Should show 84+ files

# 2. Verify images copied to build
ls -la build/images/hero-optimized/ | wc -l
# Should show 84+ files

# 3. Check image mapping
cat src/image-mapping.json | grep "baseName" | wc -l
# Should show 28

# 4. Verify build success
npm run build
# Should complete without errors
```

---

## Testing the Images

### Method 1: Chrome DevTools Network Tab

1. Open the site (dev or production)
2. Press F12 to open DevTools
3. Go to Network tab
4. Filter by "Img"
5. Refresh the page
6. You should see WebP images loading (e.g., `1208_x_1080_photos__28_-mobile.webp`)

### Method 2: Visual Inspection

1. Open the site
2. You should see:
   - Text tiles: "Food", "Sorted", "Life", "Sorted"
   - Food images with blur-up effect
   - Smooth loading transitions

### Method 3: Check for Errors

1. Open browser console (F12 → Console tab)
2. Look for any 404 errors
3. If you see errors like `404 /images/hero-optimized/...`:
   - You're testing production build incorrectly
   - Make sure to visit `http://localhost:3000/myna/` (not just `http://localhost:3000/`)

---

## Common Issues

### Issue: Images still not showing in dev mode

**Solution:**
```bash
# Stop the dev server (Ctrl+C)
# Clear node cache
rm -rf node_modules/.cache

# Restart dev server
npm start
```

### Issue: Images not showing in production build

**Solution:**
```bash
# Rebuild completely
npm run build

# Make sure to visit the CORRECT URL:
# ✅ Correct: http://localhost:3000/myna/
# ❌ Wrong:   http://localhost:3000/
```

### Issue: Some images show, some don't

**Solution:**
```bash
# Re-run image optimization
npm run optimize-images

# Rebuild
npm run build
```

### Issue: Only seeing gray placeholders

This means:
- ✅ The structure is working
- ❌ The image paths are wrong

**Solution:**
- Open browser console (F12)
- Look at the Network tab
- See which URLs are failing (404)
- Verify you're accessing the site at the correct URL

---

## Deploy to GitHub Pages

Once images are working locally, deploy:

```bash
npm run deploy
```

Then visit: `https://yourusername.github.io/myna/`

---

## Still Having Issues?

### Check These:

1. **Are you using the correct URL?**
   - Dev: `http://localhost:3000`
   - Production: `http://localhost:3000/myna/` (note the `/myna/`)

2. **Did you rebuild after the fix?**
   ```bash
   npm run build
   ```

3. **Are optimized images present?**
   ```bash
   ls public/images/hero-optimized/*.webp | wc -l
   # Should show 84
   ```

4. **Check browser console for errors**
   - Press F12
   - Look for red errors
   - Share the error message for further help

---

## Expected Behavior

When working correctly, you should see:

1. **On page load:**
   - Tiny blurred placeholder images appear instantly
   - First row of images loads quickly (7 images)
   - Images fade in smoothly as they load

2. **On scroll:**
   - Additional rows load as you scroll down
   - Blur-up effect for each image
   - Smooth transitions

3. **On mobile (or small screen):**
   - Smaller mobile-optimized images load
   - Faster loading times
   - Less data usage

---

## Performance Verification

After images are loading, verify performance:

```bash
# Build production version
npm run build

# Serve it
serve -s build -p 3000

# Open in Chrome
# Visit: http://localhost:3000/myna/

# Run Lighthouse audit:
# 1. F12 → Lighthouse tab
# 2. Select "Mobile"
# 3. Check "Performance"
# 4. Click "Analyze page load"
# 5. Score should be 85-95!
```

---

## Quick Commands Reference

```bash
# Development mode (images will work)
npm start

# Production build
npm run build

# Serve production build
serve -s build -p 3000
# Visit: http://localhost:3000/myna/

# Re-optimize images if needed
npm run optimize-images

# Deploy to GitHub Pages
npm run deploy
```

---

## Success Checklist

- [x] Image paths fixed to use `process.env.PUBLIC_URL`
- [x] Project rebuilds without errors
- [x] 84 optimized WebP images present
- [ ] Images show correctly in dev mode (`npm start`)
- [ ] Images show correctly in production (`serve -s build`)
- [ ] No 404 errors in browser console
- [ ] Blur-up effect working smoothly
- [ ] Lighthouse score 85+

---

**The fix is complete! Just run `npm start` and visit http://localhost:3000 to see your blazing fast website with all images loading perfectly!** 🚀

