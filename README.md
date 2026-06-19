# Photoshoot Generator React Native App

A React Native mobile app for generating AI-powered photoshoots using the same API endpoints as the web application. Built with native React Native (no Expo).

## Features

- 📷 Upload product images (front, back views)
- 👤 Optional model image upload
- ✨ Multiple photoshoot styles (Modern, Classic, Studio, Lifestyle, Minimalist)
- 🎨 Customizable output options (on-human, mannequin, standalone)
- 🎯 Multiple aspect ratios and dimensions
- 💧 Watermark support
- 🤖 Multiple AI providers (Google, OpenAI)
- 📱 Native image gallery picker and camera support
- ⚡ Real-time image generation with progress

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Xcode (for iOS development)
- Android Studio or Android SDK (for Android development)
- Java Development Kit (JDK 11+)

## Installation

1. Navigate to the project:
```bash
cd getmycatalogueweb-rn
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS pods (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Create `.env` file from template:
```bash
cp .env.example .env
```

5. Update `.env` with your API base URL:
```
REACT_APP_BASE_URL=https://your-api-base-url.com
```

## Running the App

### Development Server
```bash
npm start
```

### iOS
```bash
npm run ios
```
Or with specific simulator:
```bash
react-native run-ios --simulator="iPhone 14"
```

### Android
```bash
npm run android
```

### Release Builds

**iOS:**
```bash
cd ios
xcodebuild -workspace PhotoshootGenerator.xcworkspace -scheme PhotoshootGenerator -configuration Release
```

**Android:**
```bash
cd android
./gradlew assembleRelease
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ImagePicker.tsx  # Image selection component
│   └── FormSelect.tsx   # Select dropdown component
├── screens/             # Main app screens
│   └── PhotoshootScreen.tsx  # Main photoshoot generator screen
├── services/            # API client and services
│   └── api.ts           # API client configuration
└── store/               # State management (Zustand)
    └── photoshootStore.ts  # Photoshoot state
```

## API Integration

The app connects to the same endpoints as the web version:

- **Fetch Options**: `GET /finalbooksai/photoshoot_options`
- **Generate Photoshoot**: `POST /finalbooksai/photoshoot`

### Request Payload

```typescript
{
  aiProvider: string;           // "google" | "openai"
  frontViewImage: string;       // Base64 encoded image
  productName: string;
  productType: string;          // "fashion" | "jewelry" | "electronics" | "home"
  photoshootStyle: string;      // "modern" | "classic" | "studio" | "lifestyle" | "minimalist"
  outputType: string;           // "on-human" | "mannequin" | "standalone"
  numberOfOptions: number;      // 1-5
  aspectRatio: string;          // "1:1" | "16:9" | "9:16" | "4:3"
  watermarkType: string;        // "none" | "logo" | "text"
  
  // Optional fields
  backViewImage?: string;
  modelImage?: string;
  customPrompt?: string;
  modelType?: string;
  modelAge?: number;
  // ... plus 20+ additional enhancement options
}
```

## State Management

Using Zustand for simple, efficient state management:

```typescript
const { 
  images,           // Generated images
  loading,          // Loading state
  error,           // Error message
  options,         // Available options from API
  generatePhotoshoot,  // Action to generate
  fetchOptions,    // Action to fetch options
} = usePhotoshootStore();
```

## Future Enhancements

- [ ] Image editing/cropping before upload
- [ ] Preview before generation
- [ ] Batch processing multiple products
- [ ] Download/share generated images
- [ ] Saved presets for quick generation
- [ ] Generation history
- [ ] Advanced parameter tuning
- [ ] Offline mode support
- [ ] Dark mode
- [ ] Internationalization

## Environment Variables

```env
REACT_APP_BASE_URL=       # API base URL (required)
```

## Troubleshooting

### Camera/Gallery Permission Issues
The app requests permissions when needed. On iOS, add the following to `app.json`:
```json
{
  "ios": {
    "infoPlist": {
      "NSPhotoLibraryUsageDescription": "Allow access to photos",
      "NSCameraUsageDescription": "Allow access to camera"
    }
  }
}
```

### API Connection Issues
1. Verify `.env` file has correct `REACT_APP_BASE_URL`
2. Check network connectivity
3. Ensure API is accessible from your network
4. Check browser console/device logs for detailed errors

## Development

### Adding a New Feature
1. Create components in `src/components/`
2. Update state in `src/store/photoshootStore.ts` if needed
3. Add API methods in `src/services/api.ts` if needed
4. Update the main screen component

## License

Same as parent getmycatalogueweb project

## Support

For issues related to the API, check the main web app repository.
For React Native specific issues, refer to React Native documentation.
