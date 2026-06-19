# Next Steps - Getting Ready to Use

Your React Native Photoshoot Generator app is created and ready! Here's what to do next.

## ✅ Immediate Next Steps

### 1. Install Dependencies
```bash
cd /Users/macmini007/Documents/getmycatalogueweb-rn
npm install
```

This downloads all required packages including React Native, TypeScript, etc.

### 2. Setup iOS (if developing on macOS)
```bash
cd ios
pod install
cd ..
```

This installs native iOS dependencies.

### 3. Configure API Connection
```bash
cp .env.example .env
```

Edit `.env` and add your API base URL:
```
REACT_APP_BASE_URL=https://your-backend-api.com
```

### 4. Run the App

**For iOS Simulator:**
```bash
npm run ios
```
- Select a simulator from Xcode when prompted
- App will launch in simulator

**For Android Emulator:**
```bash
npm run android
```
- Make sure Android emulator is running first
- App will launch in emulator

**For Development Mode:**
```bash
npm start
```
- Press `i` for iOS
- Press `a` for Android
- Press `r` to reload
- Press `q` to quit

## 📖 Learn the Codebase

### Start Here
1. **[QUICKSTART.md](QUICKSTART.md)** - 5-minute overview
2. **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Architecture & structure
3. **[README.md](README.md)** - Full documentation

### Key Files to Understand
- **[App.tsx](App.tsx)** - Main app entry point (10 lines)
- **[src/screens/PhotoshootScreen.tsx](src/screens/PhotoshootScreen.tsx)** - Main UI (600+ lines)
- **[src/store/photoshootStore.ts](src/store/photoshootStore.ts)** - State management (70 lines)
- **[src/services/api.ts](src/services/api.ts)** - API client (80 lines)

## 🛠️ Development Tasks

### Current Features ✅
- [x] Product image uploads
- [x] Photoshoot style selection
- [x] Output type selection
- [x] AI provider selection
- [x] Aspect ratio selection
- [x] Image generation
- [x] Results display
- [x] Full TypeScript support

### Recommended Next Features
1. **Image Editing**
   - Add image cropping before upload
   - File: `src/components/ImageEditor.tsx` (new)

2. **History Screen**
   - Save generated images locally
   - Display generation history
   - File: `src/screens/HistoryScreen.tsx` (new)

3. **Settings Screen**
   - Save user preferences
   - API endpoint configuration
   - File: `src/screens/SettingsScreen.tsx` (new)

4. **Image Download**
   - Save generated images to device
   - Share functionality
   - File: Add to `src/services/storage.ts` (new)

## 📝 Making Changes

### File Structure for Changes

**Add a new component:**
```bash
src/components/MyComponent.tsx
```

**Add a new screen:**
```bash
src/screens/MyScreen.tsx
```

**Add a new service:**
```bash
src/services/myService.ts
```

**Add a new store:**
```bash
src/store/myStore.ts
```

### Code Style
- Use TypeScript for all code
- Follow existing naming conventions
- Add JSDoc comments for functions
- Use React hooks (no class components)

### Testing Changes

1. **Edit a file**
2. **Save** (Metro watches for changes)
3. **See changes instantly** in running app
4. **Reload manually** if needed (press `r` in Metro)

## 🚀 Deployment

### For Local Testing
Already covered above - just run `npm start` or `npm run ios`/`npm run android`

### For Beta Testing
```bash
# Android APK
cd android && ./gradlew assembleDebug && cd ..
# APK in: android/app/build/outputs/apk/debug/

# iOS - use Xcode or Testflight
```

### For Production
See [SETUP.md Building for Production](SETUP.md#building-for-production)

## 🔌 API Integration Tips

### API Base URL
Make sure your `.env` has the correct API base URL. The app makes requests like:
```
GET {REACT_APP_BASE_URL}/finalbooksai/photoshoot_options
POST {REACT_APP_BASE_URL}/finalbooksai/photoshoot
```

### Debugging API Calls
1. Start metro: `npm start`
2. Open developer menu: `Cmd+D` (iOS) or `Ctrl+M` (Android)
3. Select "Debug Remote JS"
4. Browser console shows all API calls
5. Check network tab for request/response details

### Testing Without Real API
1. Edit `src/services/api.ts`
2. Add mock data for development
3. Example:
```typescript
export const photoshootAPI = {
  generatePhotoshoot: async (payload) => {
    // Return mock data for testing
    return {
      meta: { code: 200, message: "Success" },
      images: [
        "https://via.placeholder.com/400x600",
        "https://via.placeholder.com/400x600",
      ],
    };
  },
};
```

## 🔒 Security Checklist

- [ ] API base URL is set in `.env`
- [ ] `.env` file is in `.gitignore` (already done)
- [ ] No hardcoded secrets in code
- [ ] API client validates responses
- [ ] Image data is base64 (safe to transmit)
- [ ] Permissions requested at runtime

## 📚 Useful Commands

```bash
# Start development
npm start

# Run on specific platform
npm run ios                    # iOS simulator
npm run android               # Android emulator
react-native run-ios --device # Real iOS device

# Type checking
npx tsc --noEmit

# Lint code
npm run lint

# Format code
npx prettier --write src/

# Clear cache
npm start -- --reset-cache

# Clean everything
rm -rf node_modules ios/Pods package-lock.json
npm install && cd ios && pod install && cd ..
```

## 🐛 Debugging

### Metro Console
Shows all logs from app:
```bash
npm start
```

### React DevTools (optional)
```bash
npm install -g react-devtools
react-devtools
```

### Debug Menu
- **iOS**: Press `Cmd+D`
- **Android**: Press `Ctrl+M`

Options:
- Reload
- Debug Remote JS
- Enable Live Reload
- Enable Hot Reload
- Show Performance Monitor

## 📞 Getting Help

### Common Issues

**"Cannot find API"**
- Check `.env` file has correct URL
- Verify API is running and accessible
- Check network connectivity

**"Permission denied for camera/gallery"**
- Check device permissions settings
- iOS: Settings > Privacy > Camera/Photos
- Android: Settings > Apps > Photoshoot Generator > Permissions

**"Module not found"**
- Run `npm install` again
- Run `npm start -- --reset-cache`
- Delete `node_modules` and reinstall

### Resources
- React Native: https://reactnative.dev/docs/
- Metro: https://facebook.github.io/metro/
- TypeScript: https://www.typescriptlang.org/docs/

## ✨ Pro Tips

1. **Hot Reload**: Save files and app updates instantly
2. **Console Logs**: Use `console.log()` - appears in Metro terminal
3. **Debugging**: Press `Cmd+D` / `Ctrl+M` to open debug menu
4. **Performance**: Use React DevTools to monitor renders
5. **TypeScript**: Use types everywhere - catch bugs early!

## 🎉 You're All Set!

Your React Native Photoshoot Generator app is ready to:
- ✅ Upload product images
- ✅ Configure photoshoot settings
- ✅ Generate AI photoshoots
- ✅ View and manage results

Start with the **[QUICKSTART.md](QUICKSTART.md)** if you haven't already!

Questions? Check the relevant documentation file or React Native docs.

Happy coding! 🚀
