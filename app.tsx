import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PhotoshootScreen } from './src/screens/PhotoshootScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PhotoshootScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
