import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const SkeletonCard = ({ index }: { index: number }) => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage}>
      <View style={styles.skeletonSpinner}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.skeletonText}>Generating {index + 1}…</Text>
      </View>
    </View>
    <View style={styles.skeletonActions} />
  </View>
);

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  images,
  isLoading,
  numberOfOptions,
}) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavorite = (imageId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(imageId)) {
        next.delete(imageId);
      } else {
        next.add(imageId);
      }
      return next;
    });
  };

  const handleDownload = async (url: string, id: string) => {
    try {
      Alert.alert('Success', `Image ${id} would be downloaded in production`);
    } catch (error) {
      Alert.alert('Error', 'Failed to download image');
      console.error(error);
    }
  };

  const handleShare = async (image: GeneratedImage) => {
    try {
      await Share.open({
        url: image.url,
        title: 'Share Generated Photoshoot Image',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const emptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyPlaceholder}>
        {[1, 2, 3, 4].map((n) => (
          <View key={n} style={styles.emptyPlaceholderTile} />
        ))}
      </View>
      <Text style={styles.emptyTitle}>Ready to Generate?</Text>
      <Text style={styles.emptySubtitle}>
        Configure your settings and click Generate — your AI photoshoot images will appear here.
      </Text>
    </View>
  );

  if (!isLoading && images.length === 0) {
    return emptyState();
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {/* Skeleton loaders while generating */}
          {isLoading &&
            Array.from({ length: numberOfOptions }).map((_, i) => (
              <View key={`skeleton-${i}`} style={styles.gridItem}>
                <SkeletonCard index={i} />
              </View>
            ))}

          {/* Generated images */}
          {!isLoading &&
            images.map((image, index) => {
              const isFavorite = favorites.has(image.id);
              return (
                <View key={image.id} style={styles.gridItem}>
                  <View style={styles.imageCard}>
                    {/* Image Container */}
                    <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => setSelectedImage(image)}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={{ uri: image.url }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <View style={styles.imageOverlay} />

                      {/* Top right actions */}
                      <View style={styles.topActions}>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleFavorite(image.id)}
                        >
                          <Icon
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={16}
                            color={isFavorite ? '#FF3B30' : '#333'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => setSelectedImage(image)}
                        >
                          <Icon name="fullscreen" size={16} color="#333" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>

                    {/* Image Number */}
                    <View style={styles.imageNumber}>
                      <Text style={styles.imageNumberText}>Image {index + 1}</Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                      <TouchableOpacity
                        style={styles.shareButton}
                        onPress={() => handleShare(image)}
                      >
                        <Icon name="share-variant" size={18} color="#007AFF" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => handleDownload(image.url, image.id)}
                      >
                        <Icon name="download" size={14} color="white" />
                        <Text style={styles.downloadButtonText}>Download</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>

      {/* Fullscreen Preview Modal */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Preview</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() =>
                selectedImage && handleDownload(selectedImage.url, selectedImage.id)
              }
            >
              <Icon name="download" size={18} color="white" />
              <Text style={styles.modalButtonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalShareButton]}
              onPress={() => selectedImage && handleShare(selectedImage)}
            >
              <Icon name="share-variant" size={18} color="#007AFF" />
              <Text style={[styles.modalButtonText, styles.modalShareButtonText]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
  },
  gridItem: {
    width: itemWidth,
  },
  imageCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 4 / 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  topActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNumber: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  imageNumberText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  shareButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  downloadButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  skeletonCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  skeletonImage: {
    aspectRatio: 4 / 3,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonSpinner: {
    alignItems: 'center',
    gap: 8,
  },
  skeletonText: {
    fontSize: 12,
    color: '#999',
  },
  skeletonActions: {
    height: 46,
    backgroundColor: '#F9F9F9',
  },
  emptyContainer: {
    minHeight: 320,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyPlaceholder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    gap: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  emptyPlaceholderTile: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    opacity: 0.1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  modalShareButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  modalShareButtonText: {
    color: '#007AFF',
  },
});
