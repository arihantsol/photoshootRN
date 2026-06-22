# iOS Permissions Setup

## Overview
This document describes the iOS permissions configured for the React Native Photoshoot Generator app.

## Permissions Added

### 1. Photo Library Access
- **Key**: `NSPhotoLibraryUsageDescription`
- **Purpose**: Allow users to select images from their photo library for photoshoot generation
- **Prompt**: "This app needs access to your photo library to select images for photoshoots"

### 2. Photo Library Write Access
- **Key**: `NSPhotoLibraryAddOnlyUsageDescription`
- **Purpose**: Allow users to save generated photos to their photo library
- **Prompt**: "This app needs access to save photos to your photo library"

### 3. Camera Access
- **Key**: `NSCameraUsageDescription`
- **Purpose**: Allow users to take photos directly from the camera
- **Prompt**: "This app needs access to your camera to take photos for photoshoots"

### 4. Microphone Access
- **Key**: `NSMicrophoneUsageDescription`
- **Purpose**: Reserved for potential future video features
- **Prompt**: "This app may need microphone access for video features"

## Files Modified

### 1. `ios/FinalBooksMarketing/Info.plist`
Added permission keys with user-facing descriptions required by iOS for app store submission.

### 2. Removed `react-native-permissions`
The app no longer uses `react-native-permissions` as a dependency. Instead:
- `react-native-image-picker` handles all permission requests internally
- Permission prompts are shown automatically when needed
- No native linking configuration required

## How It Works

When users tap "Choose from Gallery" or "Take a Photo":
1. `react-native-image-picker` handles the permission request internally
2. iOS shows the standard permission prompt
3. The photo library or camera opens after permission is granted
4. No manual permission management needed in the code

## After Making Changes

1. **Clean build files**:
   ```bash
   cd ios
   rm -rf Pods
   rm Podfile.lock
   cd ..
   ```

2. **Reinstall pods**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Rebuild the app**:
   ```bash
   yarn ios
   ```

## Testing Permissions

To test permissions on iOS simulator:
1. Launch the app
2. Try to select an image from photo library
3. Accept/deny the permission prompt
4. iOS will remember your choice for future app launches

To reset permissions on simulator:
- **Settings** > **General** > **Reset** > **Reset Location & Privacy**
- OR delete the app and reinstall
