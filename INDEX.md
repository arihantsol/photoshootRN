# 📑 File Index - React Native Photoshoot Generator

Complete list of all files created with descriptions.

## 📚 Documentation Files (6)

| File | Size | Purpose |
|------|------|---------|
| [README.md](README.md) | 4.5KB | Complete documentation with API details |
| [SETUP.md](SETUP.md) | 5.4KB | Detailed setup guide with troubleshooting |
| [QUICKSTART.md](QUICKSTART.md) | 2.1KB | 5-minute quick start guide |
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | 6.8KB | Architecture and structure overview |
| [NEXT_STEPS.md](NEXT_STEPS.md) | 5.2KB | Development guidelines and next steps |
| [CREATED.md](CREATED.md) | 4.0KB | Summary of what was created |

## ⚙️ Configuration Files (12)

### App Configuration
| File | Purpose |
|------|---------|
| [app.json](app.json) | App name and metadata |
| [package.json](package.json) | Dependencies and scripts |
| [tsconfig.json](tsconfig.json) | TypeScript compiler options |

### Build Configuration
| File | Purpose |
|------|---------|
| [babel.config.js](babel.config.js) | Babel transpiler configuration |
| [metro.config.js](metro.config.js) | Metro bundler configuration |
| [index.js](index.js) | React Native app registration |
| [App.tsx](App.tsx) | Main app component with safe area |

### Code Quality
| File | Purpose |
|------|---------|
| [.prettierrc](.prettierrc) | Code formatting rules |
| [.eslintrc.json](.eslintrc.json) | Linting rules |
| [.editorconfig](.editorconfig) | Editor formatting standards |
| [.gitignore](.gitignore) | Git ignore patterns |
| [.env.example](.env.example) | Environment variable template |

## 📱 Source Code Files (7)

### Components (2 files)

**[src/components/ImagePicker.tsx](src/components/ImagePicker.tsx)**
- Image selection from gallery or camera
- Base64 conversion for API transmission
- Permission handling for iOS/Android
- Image preview and removal
- Uses `react-native-image-picker` library
- **Size**: ~200 lines

**[src/components/FormSelect.tsx](src/components/FormSelect.tsx)**
- Native picker dropdown component
- Reusable form field
- Label and error display
- **Size**: ~70 lines

### Screens (1 file)

**[src/screens/PhotoshootScreen.tsx](src/screens/PhotoshootScreen.tsx)**
- Main app screen with complete UI
- Two tabs: Product Information and Studio Settings
- Form with React Hook Form
- Image upload integration
- Settings configuration
- Generation control
- Results display
- Error handling
- **Size**: 600+ lines

### Services (1 file)

**[src/services/api.ts](src/services/api.ts)**
- Axios HTTP client configuration
- API endpoint definitions
- Request/response types
- Error handling interceptors
- Methods:
  - `fetchOptions()` - Get available options
  - `generatePhotoshoot()` - Generate images
- **Size**: ~80 lines

### State Management (1 file)

**[src/store/photoshootStore.ts](src/store/photoshootStore.ts)**
- Zustand store for app state
- Managed state:
  - `images` - Generated images
  - `loading` - Loading state
  - `error` - Error messages
  - `options` - Available options from API
- Actions:
  - `setLoading()` - Update loading state
  - `setError()` - Update error message
  - `setImages()` - Update generated images
  - `clearImages()` - Clear results
  - `fetchOptions()` - Async: fetch options
  - `generatePhotoshoot()` - Async: generate images
- **Size**: ~70 lines

### Type Definitions (1 file)

**[src/types/index.ts](src/types/index.ts)**
- TypeScript interfaces for:
  - `GeneratedImage` - Image object with id and url
  - `PhotoshootPayload` - API request data
  - `SelectOption` - Dropdown option
  - `PhotoshootOptions` - Available options
  - `APIResponse<T>` - API response wrapper
- **Size**: ~80 lines

### Routing (1 file)

**[app/(tabs)/index.tsx](app/(tabs)/index.tsx)**
- Expo Router placeholder for future navigation
- Renders PhotoshootScreen
- **Size**: ~5 lines

## 🍎 iOS Configuration (2 files)

### Info.plist Permissions
**[ios/PhotoshootGenerator/Info.plist](ios/PhotoshootGenerator/Info.plist)**
- Camera permission request
- Photo library permission request
- Photo library write permission request
- Device capability configuration
- UI orientation settings
- Status bar styling

## 🤖 Android Configuration (2 files)

### Build Configuration
**[android/app/build.gradle](android/app/build.gradle)**
- Gradle build configuration
- SDK versions (compileSdk: 33, minSdk: 21, targetSdk: 33)
- App ID: `com.photoshootgenerator`
- React Native integration

### Manifest and Permissions
**[android/app/src/main/AndroidManifest.xml](android/app/src/main/AndroidManifest.xml)**
- App name and icon
- Permissions:
  - INTERNET
  - CAMERA
  - READ_EXTERNAL_STORAGE
  - WRITE_EXTERNAL_STORAGE
- MainActivity configuration
- Launch mode and orientation

## 📊 File Statistics

### By Type
| Type | Count | Total Lines |
|------|-------|------------|
| Documentation | 6 | ~2,000 |
| TypeScript/TSX | 7 | ~1,500 |
| JavaScript/JSX | 3 | ~100 |
| Configuration | 12 | ~200 |
| XML/PLIST | 3 | ~100 |
| **TOTAL** | **31** | **~3,900** |

### By Category
| Category | Count |
|----------|-------|
| Source Code | 7 |
| Configuration | 12 |
| Documentation | 6 |
| Platform Config | 3 |
| Other Files | 3 |

## 🔍 Quick Navigation

### To Get Started
1. **First time?** → [QUICKSTART.md](QUICKSTART.md)
2. **Need details?** → [SETUP.md](SETUP.md)
3. **Understand architecture?** → [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

### To Develop
1. **Main screen code** → [src/screens/PhotoshootScreen.tsx](src/screens/PhotoshootScreen.tsx)
2. **API calls** → [src/services/api.ts](src/services/api.ts)
3. **State management** → [src/store/photoshootStore.ts](src/store/photoshootStore.ts)
4. **Custom components** → [src/components/](src/components/)

### To Configure
1. **Dependencies** → [package.json](package.json)
2. **API URL** → [.env.example](.env.example)
3. **TypeScript** → [tsconfig.json](tsconfig.json)
4. **Code style** → [.prettierrc](.prettierrc)

### For Deployment
1. **iOS** → [ios/PhotoshootGenerator/Info.plist](ios/PhotoshootGenerator/Info.plist)
2. **Android** → [android/app/src/main/AndroidManifest.xml](android/app/src/main/AndroidManifest.xml)

## 📝 What's in Each File

### Entry Points
- **index.js** - Registers React Native app component
- **App.tsx** - Root component with Safe Area provider
- **app/(tabs)/index.tsx** - Current app screen (PhotoshootScreen)

### Main Features
- **PhotoshootScreen.tsx** - All UI and form logic
- **photoshootStore.ts** - State and async operations
- **api.ts** - Backend communication

### Utilities
- **ImagePicker.tsx** - Image selection and preview
- **FormSelect.tsx** - Dropdown for options

### Project Config
- **package.json** - All dependencies listed
- **.env.example** - Template for configuration
- **babel.config.js** - Code transformation rules
- **metro.config.js** - Bundler configuration

### Platform Specific
- **Info.plist** - iOS permissions and settings
- **AndroidManifest.xml** - Android permissions and settings
- **build.gradle** - Android build rules

## 🎯 File Dependencies

```
App.tsx
  └── PhotoshootScreen.tsx
      ├── ImagePicker.tsx
      │   └── react-native-image-picker
      │   └── react-native-permissions
      ├── FormSelect.tsx
      │   └── @react-native-picker/picker
      ├── usePhotoshootStore()
      │   ├── photoshootStore.ts
      │   │   └── api.ts
      │   │       └── axios
      │   └── types/index.ts
      └── react-hook-form
```

## 🚀 Installation Order

1. **Clone/Navigate** - Go to `getmycatalogueweb-rn/`
2. **Install** - `npm install`
3. **Configure** - `cp .env.example .env` and edit
4. **Build** - `cd ios && pod install && cd ..`
5. **Run** - `npm start` or `npm run ios/android`

## 🔄 Update Locations

| What to Change | File |
|---|---|
| App name | app.json |
| API endpoint | .env |
| Dependencies | package.json |
| Permission requests | Info.plist, AndroidManifest.xml |
| Types | src/types/index.ts |
| API methods | src/services/api.ts |
| State | src/store/photoshootStore.ts |

## 📞 Documentation Quick Links

- **Full Setup**: [SETUP.md](SETUP.md)
- **Architecture**: [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- **Development**: [NEXT_STEPS.md](NEXT_STEPS.md)
- **API Details**: [README.md](README.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)

---

**Total Files**: 31
**Total Size**: ~3,900 lines of code and documentation
**Status**: READY FOR DEVELOPMENT ✅
