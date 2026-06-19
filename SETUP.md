# React Native Setup Guide

This is a standard React Native project (not using Expo). Follow these steps to get started.

## Prerequisites

### macOS / Linux

1. **Node.js & npm**
   ```bash
   # Install via Homebrew
   brew install node
   ```

2. **For iOS Development:**
   - Xcode 12+ (from App Store)
   - CocoaPods: `sudo gem install cocoapods`
   
3. **For Android Development:**
   - Android Studio
   - JDK 11+: `brew install openjdk@11`
   - Set ANDROID_HOME: `export ANDROID_HOME=$HOME/Library/Android/sdk`

### Windows

1. **Node.js & npm** from nodejs.org
2. **For Android:**
   - Android Studio
   - JDK 11+
   - Set ANDROID_HOME environment variable

## Quick Start

### 1. Install Dependencies
```bash
npm install
# Install iOS native dependencies
cd ios && pod install && cd ..
```

### 2. Configure API
```bash
cp .env.example .env
# Edit .env with your API base URL
```

### 3. Run on iOS
```bash
npm run ios
```
Or specify a simulator:
```bash
react-native run-ios --simulator="iPhone 14"
```

### 4. Run on Android
```bash
# Make sure Android emulator is running or device is connected
npm run android
```

### 5. Development Server
```bash
npm start
```
This starts the Metro bundler. Press:
- `i` to open iOS simulator
- `a` to open Android emulator
- `w` to open web (requires web support setup)
- `r` to reload
- `q` to quit

## Project Structure

```
.
├── App.tsx                    # Main app entry point
├── index.js                   # App registration
├── app.json                   # App config
├── package.json               # Dependencies
├── metro.config.js            # Metro bundler config
│
├── src/
│   ├── components/            # Reusable components
│   │   ├── ImagePicker.tsx    # Image selection
│   │   └── FormSelect.tsx     # Dropdown select
│   ├── screens/               # App screens
│   │   └── PhotoshootScreen.tsx
│   ├── services/              # API clients
│   │   └── api.ts
│   ├── store/                 # State management
│   │   └── photoshootStore.ts
│   └── types/                 # TypeScript types
│       └── index.ts
│
├── ios/                       # iOS native code
│   ├── Podfile
│   └── PhotoshootGenerator/
│
└── android/                   # Android native code
    ├── build.gradle
    └── app/
```

## Common Commands

```bash
# Clean and rebuild
npm run clean-all

# Run with debugging
react-native run-ios --verbose
react-native run-android --verbose

# Clear cache
npm start -- --reset-cache

# Install specific version
npm install react-native@0.72.0

# Check environment
npx react-native doctor
```

## Troubleshooting

### iOS Build Issues

**"Pod install failed"**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

**Xcode build fails**
```bash
# Clean Xcode build
cd ios
xcodebuild clean -workspace PhotoshootGenerator.xcworkspace -scheme PhotoshootGenerator
cd ..
npm run ios
```

### Android Build Issues

**Gradle build fails**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Cannot find SDK/NDK**
- Open Android Studio
- Go to Preferences > Appearance & Behavior > System Settings > Android SDK
- Install required SDK and NDK versions
- Set ANDROID_HOME environment variable

### Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache

# Or manually clear
rm -rf /tmp/metro-*
```

### Permission Errors (Android)

If you get permission errors, make sure `android/app/src/main/AndroidManifest.xml` includes:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Development Tips

1. **Hot Reload**: React Native supports hot reload. Edit files and the app updates automatically.

2. **Debugging**: Shake device or press `Ctrl+M` (Android) / `Cmd+D` (iOS) to open debug menu.

3. **Console Logs**: Logs appear in Metro terminal and VS Code React Native Tools.

4. **TypeScript**: The project uses TypeScript. Check types with:
   ```bash
   npx tsc --noEmit
   ```

5. **Testing**: Run tests with:
   ```bash
   npm test
   ```

## Building for Production

### iOS
```bash
cd ios
xcodebuild -workspace PhotoshootGenerator.xcworkspace \
  -scheme PhotoshootGenerator \
  -configuration Release \
  -derivedDataPath build
cd ..
```

### Android
```bash
cd android
./gradlew assembleRelease
# APK will be at: android/app/build/outputs/apk/release/app-release.apk
cd ..
```

## Environment Variables

Create a `.env` file in the root:
```
REACT_APP_BASE_URL=https://your-api-url.com
```

Access in code:
```typescript
import { process } from '@babel/runtime';
const baseURL = process.env.REACT_APP_BASE_URL;
```

## Additional Resources

- [React Native Docs](https://reactnative.dev/)
- [Metro Documentation](https://facebook.github.io/metro/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)

## Getting Help

If you encounter issues:
1. Check React Native Troubleshooting guide
2. Search GitHub issues for your error
3. Try cleaning caches: `npm run clean-all`
4. Update all dependencies: `npm update`
5. Check environment variables and paths
