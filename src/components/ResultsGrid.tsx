import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as FileSystem from 'react-native-fs';
import * as Share from 'react-native-share';

interface GeneratedImage {
  id: string;
  url: string;
}

interface ResultsGridProps {
  images: GeneratedImage[];
  isLoading: boolean;
  numberOfOptions: number;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  images,
  isLoading,
  numberOfOptions,
}) => {
  const handleDownload = async (url: string, id: string) => {
    try {
      Alert.alert('Success', `Image ${id} would be downloaded in production`);
    } catch (error) {
      Alert.alert('Error', 'Failed to download image');
      console.error(error);
    }
  };

  const handleShare = async (url: string) => {
    try {
      await Share.open({
        url,
        title: 'Share Generated Photoshoot Image',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (isLoading && images.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Generating photoshoot...</Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Generated images will appear here after generation
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {images.map((image, index) => (
        <View key={image.id} style={styles.imageCard}>
          <View style={styles.imageNumber}>
            <Text style={styles.imageNumberText}>Image {index + 1}</Text>
          </View>

          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="contain"
            />
            {isLoading && <View style={styles.loadingOverlay} />}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDownload(image.url, image.id)}
            >
              <Text style={styles.actionButtonText}>⬇️ Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShare(image.url)}
            >
              <Text style={styles.actionButtonText}>📤 Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  imageCard: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  imageNumber: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  imageNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: '100%',
    height: 300,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
