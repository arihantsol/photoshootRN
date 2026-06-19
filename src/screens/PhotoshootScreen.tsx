import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { ImagePickerComponent } from '../components/ImagePicker';
import { FormSelect } from '../components/FormSelect';
import { StyleSelector } from '../components/StyleSelector';
import { OutputTypeSelector } from '../components/OutputTypeSelector';
import { AspectRatioSelector } from '../components/AspectRatioSelector';
import { WatermarkSelector } from '../components/WatermarkSelector';
import { AIProviderSelector } from '../components/AIProviderSelector';
import { OptionsSlider } from '../components/OptionsSlider';
import { CustomPromptInput } from '../components/CustomPromptInput';
import { AdvancedOptionsSelector } from '../components/AdvancedOptionsSelector';
import { ProductTypeSelector } from '../components/ProductTypeSelector';
import { CompositionTypeSelector } from '../components/CompositionTypeSelector';
import { ResultsGrid } from '../components/ResultsGrid';

// Store
import { usePhotoshootStore } from '../store/photoshootStore';

interface FormData {
  productName: string;
  productType: string;
  photoshootStyle: string;
  outputType: string;
  numberOfOptions: number;
  aiProvider: string;
  aspectRatio: string;
  watermarkType: string;
  frontViewImage: string;
  backViewImage?: string;
  modelImage?: string;
  customPrompt?: string;
  modelType?: string;
  modelAge?: string;
  watermarkText?: string;
  compositionType?: string;
  backgroundType?: string;
  environmentStyle?: string;
  colorScheme?: string;
  moodTone?: string;
  lightingType?: string;
  lightDirection?: string;
  shotComposition?: string;
  cameraAngle?: string;
  depthOfField?: string;
  season?: string;
  occasion?: string;
  timeOfDay?: string;
  targetAudience?: string;
  marketSegment?: string;
  propDensity?: string;
  textureEmphasis?: string;
  materialFocus?: string;
  industryType?: string;
  brandPersonality?: string;
  [key: string]: any;
}

export const PhotoshootScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm<FormData>({
    defaultValues: {
      productName: '',
      productType: 'fashion',
      photoshootStyle: 'modern',
      outputType: 'on-human',
      numberOfOptions: 1,
      aiProvider: 'google',
      aspectRatio: '1:1',
      watermarkType: 'none',
      customPrompt: '',
      watermarkText: '',
      compositionType: '',
    },
  });

  const { generatePhotoshoot, images, loading, error, fetchOptions, options } = usePhotoshootStore();
  const [activeTab, setActiveTab] = useState<'product' | 'settings'>('product');

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const handleGeneratePhotoshoot = async (data: FormData) => {
    if (!data.frontViewImage) {
      Alert.alert('Error', 'Front view image is required');
      return;
    }

    if (!data.productName.trim()) {
      Alert.alert('Error', 'Product name is required');
      return;
    }

    const payload: any = {
      aiProvider: data.aiProvider,
      frontViewImage: data.frontViewImage,
      productName: data.productName,
      productType: data.productType,
      photoshootStyle: data.photoshootStyle,
      outputType: data.outputType,
      numberOfOptions: parseInt(String(data.numberOfOptions)) || 1,
      aspectRatio: data.aspectRatio,
      watermarkType: data.watermarkType,
    };

    // Optional fields
    if (data.backViewImage) payload.backViewImage = data.backViewImage;
    if (data.modelImage) payload.modelImage = data.modelImage;
    if (data.customPrompt) payload.customPrompt = data.customPrompt;
    if (data.modelType) payload.modelType = data.modelType;
    if (data.modelAge) payload.modelAge = parseInt(data.modelAge);
    if (data.watermarkText) payload.watermarkText = data.watermarkText;
    if (data.compositionType) payload.compositionType = data.compositionType;

    // Advanced options
    const advancedFields = [
      'backgroundType', 'environmentStyle', 'colorScheme', 'moodTone',
      'lightingType', 'lightDirection', 'shotComposition', 'cameraAngle',
      'depthOfField', 'season', 'occasion', 'timeOfDay',
      'targetAudience', 'marketSegment', 'propDensity', 'textureEmphasis',
      'materialFocus', 'industryType', 'brandPersonality',
    ];

    advancedFields.forEach((field) => {
      if (data[field]) {
        payload[field] = data[field];
      }
    });

    const result = await generatePhotoshoot(payload);
    if (!result) {
      Alert.alert('Error', error || 'Failed to generate photoshoot');
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ Photoshoot Generator</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'product' && styles.activeTab]}
          onPress={() => setActiveTab('product')}
        >
          <Text style={[styles.tabText, activeTab === 'product' && styles.activeTabText]}>
            Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        {/* PRODUCT TAB */}
        {activeTab === 'product' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Information</Text>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="productName"
                rules={{ required: 'Product name is required' }}
                render={({ field: { value, onChange } }) => (
                  <View>
                    <Text style={styles.label}>Product Name *</Text>
                    <View
                      style={[
                        styles.textInput,
                        errors.productName && styles.inputError,
                      ]}
                    >
                      <Text
                        onPress={() => {}}
                        style={{
                          color: value ? '#333' : '#999',
                          fontSize: 16,
                          padding: 10,
                        }}
                      >
                        {value || 'Enter product name'}
                      </Text>
                    </View>
                    {errors.productName && (
                      <Text style={styles.errorText}>
                        {errors.productName.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            <ProductTypeSelector control={control} errors={errors} />

            <Controller
              control={control}
              name="frontViewImage"
              render={({ field: { value, onChange } }) => (
                <ImagePickerComponent
                  label="Front View Image *"
                  onImageSelected={onChange}
                  disabled={loading}
                />
              )}
            />

            <Controller
              control={control}
              name="backViewImage"
              render={({ field: { value, onChange } }) => (
                <ImagePickerComponent
                  label="Back View Image (Optional)"
                  onImageSelected={onChange}
                  disabled={loading}
                />
              )}
            />

            <Controller
              control={control}
              name="modelImage"
              render={({ field: { value, onChange } }) => (
                <ImagePickerComponent
                  label="Model Image (Optional)"
                  onImageSelected={onChange}
                  disabled={loading}
                />
              )}
            />
          </View>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Studio Settings</Text>

            {/* Style */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Style</Text>
              <StyleSelector
                control={control}
                errors={errors}
                options={options?.options?.photoshootStyle || []}
              />
            </View>

            {/* Display Format */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Display Format</Text>
              <OutputTypeSelector control={control} errors={errors} />
            </View>

            {/* Image Dimensions */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Image Dimensions</Text>
              <AspectRatioSelector control={control} errors={errors} />
            </View>

            {/* Generation Settings */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Generation Settings</Text>
              <OptionsSlider control={control} watch={watch} setValue={setValue} />
              <AIProviderSelector control={control} errors={errors} />
            </View>

            {/* Watermark */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Watermark</Text>
              <WatermarkSelector control={control} watch={watch} errors={errors} />
            </View>

            {/* Custom Prompt */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Custom Prompt</Text>
              <CustomPromptInput control={control} errors={errors} />
            </View>

            {/* Advanced Options */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Advanced Options</Text>
              <AdvancedOptionsSelector
                control={control}
                errors={errors}
                photoshootOptions={options}
              />
            </View>

            {/* Image Composition */}
            {watch('backViewImage') && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Image Composition</Text>
                <CompositionTypeSelector
                  control={control}
                  errors={errors}
                  hasMultipleImages={!!watch('backViewImage')}
                />
              </View>
            )}
          </View>
        )}

        {/* Results Section */}
        {(images.length > 0 || loading) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {loading ? 'Generating...' : `Generated Images (${images.length})`}
            </Text>
            <ResultsGrid
              images={images}
              isLoading={loading}
              numberOfOptions={watch('numberOfOptions')}
            />
          </View>
        )}

        {/* Error Display */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Error</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton, loading && styles.disabled]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton, loading && styles.disabled]}
          onPress={handleSubmit(handleGeneratePhotoshoot)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Generate</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 12,
    color: '#D32F2F',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  disabled: {
    opacity: 0.6,
  },
});
