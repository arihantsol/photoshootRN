# Photoshoot Generator React Native - Project Overview

A complete React Native mobile application for AI-powered product photoshoot generation with the same API integration as the web version.

## 📂 Project Structure

```
getmycatalogueweb-rn/
│
├── 📄 Core Files
│   ├── App.tsx                     # Main app component
│   ├── app.json                    # App configuration
│   ├── package.json                # Dependencies
│   ├── index.js                    # Entry point
│   ├── babel.config.js             # Babel configuration
│   ├── metro.config.js             # Metro bundler config
│   ├── tsconfig.json               # TypeScript config
│   └── .env.example                # Environment template
│
├── 📚 Documentation
│   ├── README.md                   # Full documentation
│   ├── SETUP.md                    # Detailed setup guide
│   ├── QUICKSTART.md               # 5-minute quick start
│   ├── PROJECT_OVERVIEW.md         # This file
│   ├── .editorconfig               # Editor settings
│   ├── .prettierrc                 # Code formatting
│   ├── .eslintrc.json              # Linting rules
│   └── .gitignore                  # Git ignore patterns
│
├── 📱 Source Code (src/)
│   ├── components/                 # Reusable UI components
│   │   ├── ImagePicker.tsx         # Image selection (gallery & camera)
│   │   └── FormSelect.tsx          # Dropdown select component
│   │
│   ├── screens/                    # App screens
│   │   └── PhotoshootScreen.tsx    # Main photoshoot generator screen
│   │
│   ├── services/                   # API & external services
│   │   └── api.ts                  # Axios API client + endpoints
│   │
│   ├── store/                      # State management (Zustand)
│   │   └── photoshootStore.ts      # Photoshoot state & actions
│   │
│   └── types/                      # TypeScript definitions
│       └── index.ts                # All type definitions
│
├── 🍎 iOS Configuration (ios/)
│   └── PhotoshootGenerator/
│       └── Info.plist              # iOS permissions & config
│
└── 🤖 Android Configuration (android/)
    └── app/
        ├── build.gradle            # Android build config
        └── src/main/
            └── AndroidManifest.xml # Android permissions & config
```

## 🚀 Getting Started

### 1. Installation (5 minutes)

```bash
# Clone/navigate to project
cd getmycatalogueweb-rn

# Install dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Configure API
cp .env.example .env
# Edit .env with your API base URL
```

### 2. Run the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Development (Metro Server):**
```bash
npm start
# Then press: i (iOS) or a (Android)
```

## 🏗️ Architecture

### State Management
- **Zustand Store** (`src/store/photoshootStore.ts`)
  - Manages: images, loading state, errors, options
  - Actions: generatePhotoshoot, fetchOptions, clearImages
  - Simple, lightweight alternative to Redux/Context

### API Integration
- **Axios Client** (`src/services/api.ts`)
- **Endpoints:**
  - `GET /finalbooksai/photoshoot_options` - Fetch available options
  - `POST /finalbooksai/photoshoot` - Generate photoshoots

### UI Components
- **ImagePicker**: Handles gallery & camera access with permissions
- **FormSelect**: Native picker component with TypeScript support
- **PhotoshootScreen**: Main app interface with tabs for product and settings

### Type Safety
- Full TypeScript support
- Type definitions for: API payloads, responses, UI props
- No `any` types in core code

## 📋 Features Implemented

✅ **Core Functionality**
- Product image uploads (front, back views)
- Optional model image upload
- Real-time image generation
- Generated image display gallery

✅ **Customization Options**
- Photoshoot styles (Modern, Classic, Studio, Lifestyle, Minimalist)
- Output types (on-human, mannequin, standalone)
- Aspect ratios (1:1, 16:9, 9:16, 4:3)
- AI providers (Google, OpenAI)
- Watermark options
- Number of images (1-5)
- Custom prompts
- Advanced settings

✅ **Mobile Features**
- Native image picker (gallery & camera)
- Runtime permissions handling
- Loading states & error messages
- Tab-based navigation
- Responsive UI

✅ **Developer Features**
- TypeScript for type safety
- ESLint & Prettier configured
- Zustand for state management
- React Hook Form for forms
- Environment variables support

## 🔧 Configuration

### Environment Variables
Create `.env` file with:
```env
REACT_APP_BASE_URL=https://your-api-base-url.com
```

### iOS Permissions
Configured in `ios/PhotoshootGenerator/Info.plist`:
- Camera access
- Photo library access
- Photo library write access

### Android Permissions
Configured in `android/app/src/main/AndroidManifest.xml`:
- Camera
- Read external storage
- Write external storage
- Internet

## 📦 Dependencies

**Core Libraries:**
- `react`: UI framework
- `react-native`: Mobile framework
- `react-hook-form`: Form handling
- `axios`: HTTP client
- `zustand`: State management

**Native Libraries:**
- `react-native-image-picker`: Image selection
- `react-native-permissions`: Permission handling
- `react-native-gesture-handler`: Gesture support
- `react-native-reanimated`: Animations
- `react-native-safe-area-context`: Safe area support

**Development:**
- `typescript`: Type checking
- `metro-react-native-babel-preset`: Bundling
- `jest`: Testing
- `eslint`: Linting

## 🔄 API Integration

### Request Format
```typescript
{
  // Required
  aiProvider: "google" | "openai"
  frontViewImage: string (base64)
  productName: string
  productType: string
  photoshootStyle: string
  outputType: "on-human" | "mannequin" | "standalone"
  numberOfOptions: number (1-5)
  aspectRatio: string
  watermarkType: string

  // Optional (25+ enhancement options)
  backViewImage?: string
  modelImage?: string
  customPrompt?: string
  modelType?: string
  // ... and more
}
```

### Response Format
```typescript
{
  meta: {
    code: number (200 = success)
    message: string
  }
  images: string[] (array of image URLs)
  metadata?: object
  usage?: object
}
```

## 🧪 Testing & Quality

### Code Quality
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Testing
npm test
```

## 📱 Platform-Specific Notes

### iOS
- Requires Xcode 12+
- CocoaPods for dependency management
- Automatic code signing support
- iOS 12+ support

### Android
- API Level 21+ (Android 5.0)
- Gradle for build system
- Support for multiple architectures (arm64-v8a, armeabi-v7a)

## 🚀 Building for Production

### iOS App Store
```bash
cd ios
xcodebuild -workspace PhotoshootGenerator.xcworkspace \
  -scheme PhotoshootGenerator \
  -configuration Release
```

### Android Google Play
```bash
cd android
./gradlew assembleRelease
# Generate signing key and configure in build.gradle
```

## 🎯 Future Enhancements (Roadmap)

- [ ] Image editing/cropping before upload
- [ ] Preview before generation
- [ ] Batch processing multiple products
- [ ] Download/share generated images
- [ ] Saved presets/templates
- [ ] Generation history & caching
- [ ] Advanced parameter tuning UI
- [ ] Offline mode support
- [ ] Dark mode theme
- [ ] Multi-language support (i18n)
- [ ] Push notifications for generation complete
- [ ] Image gallery integration

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Complete documentation |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute quick start |
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | This file - architecture overview |

## 🐛 Troubleshooting

**Common Issues:**
- See [SETUP.md Troubleshooting section](SETUP.md#troubleshooting)
- Check [README.md Troubleshooting section](README.md#troubleshooting)
- Run `npx react-native doctor` for environment diagnostics

## 👥 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**
   - Edit files in `src/`
   - Follow existing code style
   - Use TypeScript for type safety

3. **Test Changes**
   - Test on iOS: `npm run ios`
   - Test on Android: `npm run android`
   - Check logs with Metro server

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   git push origin feature/my-feature
   ```

## 📞 Support

- React Native Docs: https://reactnative.dev/
- Metro Docs: https://facebook.github.io/metro/
- Zustand Docs: https://github.com/pmndrs/zustand
- React Hook Form: https://react-hook-form.com/

## 📄 License

Same as parent getmycatalogueweb project

---

**Created:** June 2026
**Version:** 1.0.0
**Status:** Ready for development
