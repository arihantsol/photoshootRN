# Quick Start Guide

Get the app running in 5 minutes.

## 1. Install & Configure

```bash
# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Setup environment
cp .env.example .env
# Edit .env with your API URL
```

## 2. Choose Platform

### iOS (macOS only)
```bash
npm run ios
```
Or with specific device:
```bash
react-native run-ios --simulator="iPhone 14"
```

### Android
```bash
# Make sure emulator is running or device is connected
npm run android
```

### Metro Dev Server
```bash
npm start
```
Then press `i` for iOS or `a` for Android.

## 3. Done!

The app should now be running with the Photoshoot Generator interface.

### Key Features
- 📷 Upload product images
- ✨ Choose photoshoot style
- 🤖 Select AI provider
- 🎯 Generate images

### Test Flow

1. **Product Tab:**
   - Enter product name
   - Select product type
   - Upload front view image

2. **Settings Tab:**
   - Choose photoshoot style
   - Pick output type (on-human, mannequin, standalone)
   - Select number of images to generate
   - Choose AI provider

3. **Generate:**
   - Click "Generate" button
   - Wait for images to be generated
   - View results below

## Development

### Hot Reload
Edit any file and see changes instantly (shake device to reload if needed).

### Debug Menu
- iOS: `Cmd+D`
- Android: `Ctrl+M`

### Logs
Check terminal running `npm start` for console output.

## Troubleshooting

**App crashes on startup?**
- Run `npm start -- --reset-cache`
- Verify `REACT_APP_BASE_URL` in `.env`

**Image picker not working?**
- Check permission settings on device
- Ensure permissions are granted in app

**API calls failing?**
- Verify API URL is correct in `.env`
- Check network connectivity
- Ensure API is accessible from your network

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup
- Check [README.md](README.md) for full documentation
- See [src/screens/PhotoshootScreen.tsx](src/screens/PhotoshootScreen.tsx) for main app logic
- Explore [src/services/api.ts](src/services/api.ts) for API integration

## Commands Reference

```bash
npm start              # Start Metro bundler
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator/device
npm test               # Run tests
npm run lint           # Lint code
```

Happy coding! 🚀
