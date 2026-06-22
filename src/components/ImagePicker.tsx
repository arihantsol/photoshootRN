import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ImagePickerProps {
  onImageSelected: (base64: string) => void;
  label: string;
  disabled?: boolean;
}

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  onImageSelected,
  label,
  disabled = false,
}) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const convertToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image'));
        }
      };
      reader.onerror = reject;
    });
  };

  const pickImage = async () => {
    setLoading(true);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets && result.assets[0]) {
        const uri = result.assets[0].uri;
        if (uri) {
          setImage(uri);
          const base64 = await convertToBase64(uri);
          onImageSelected(base64);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    setLoading(true);
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets && result.assets[0]) {
        const uri = result.assets[0].uri;
        if (uri) {
          setImage(uri);
          const base64 = await convertToBase64(uri);
          onImageSelected(base64);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    onImageSelected('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearImage}
            disabled={disabled || loading}
          >
            <Text style={styles.clearButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.uploadArea}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <View style={styles.cardsContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={pickImage}
                disabled={disabled}
              >
                <Icon name="image-multiple" size={48} color="#007AFF" />
                <Text style={styles.cardTitle}>Gallery</Text>
                <Text style={styles.cardSubtitle}>Choose from photos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={takePhoto}
                disabled={disabled}
              >
                <Icon name="camera" size={48} color="#007AFF" />
                <Text style={styles.cardTitle}>Camera</Text>
                <Text style={styles.cardSubtitle}>Take a new photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  uploadArea: {
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  card: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  separator: {
    color: '#999',
    marginVertical: 8,
    fontSize: 13,
  },
  previewContainer: {
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
