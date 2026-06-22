import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateFormData } from '../utils/validation';
import { SettingsModal } from '../components/SettingsModal';
import AppHeader from '../components/AppHeader';
import { PhotoshootSettings } from '../utils/settingsStorage';
import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_CONTENT_TYPES,
  SOCIAL_MEDIA_ASPECT_RATIOS,
  SOCIAL_MEDIA_STYLES,
  MODEL_TYPES,
  BACKGROUND_STYLES,
} from '../constants/socialMediaOptions';

// Components
import { ImagePickerComponent } from '../components/ImagePicker';
import { FormSelect } from '../components/FormSelect';
import { StyleSelector } from '../components/StyleSelector';
import { OutputTypeSelector } from '../components/OutputTypeSelector';
import { AspectRatioSelector } from '../components/AspectRatioSelector';
import { WatermarkSelector } from '../components/WatermarkSelector';
import { OptionsSlider } from '../components/OptionsSlider';
import { CustomPromptInput } from '../components/CustomPromptInput';
import { ProductTypeSelector } from '../components/ProductTypeSelector';
import { CompositionTypeSelector } from '../components/CompositionTypeSelector';
import { AdvancedOptionsSelector } from '../components/AdvancedOptionsSelector';
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
  const [mainMode, setMainMode] = useState<'product' | 'social'>('product');
  const [activeTab, setActiveTab] = useState<'product' | 'settings'>('product');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<PhotoshootSettings | null>(null);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const handleGeneratePhotoshoot = async (data: FormData) => {
    // Validate form data
    const validationErrors = validateFormData(data);
    if (validationErrors.length > 0) {
      Alert.alert('Validation Error', validationErrors.join('\n'));
      return;
    }

    try {
      const payload: any = {
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

      // Call API via store
      await generatePhotoshoot(payload);

      if (error) {
        Alert.alert('Error', error);
      } else if (images && images.length > 0) {
        Alert.alert(
          'Success',
          `Generated ${images.length} image(s) successfully!`,
          [{ text: 'OK' }]
        );
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to generate photoshoot';
      Alert.alert('Error', errorMsg);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <AppHeader
        title="Image Generator"
        rightIcon="cog"
        onRightPress={() => setSettingsModalVisible(true)}
      />

      {/* Main Mode Tabs - Product vs Social */}
      <View style={styles.mainModeContainer}>
        <TouchableOpacity
          style={[styles.modeTab, mainMode === 'product' && styles.activeModeTab]}
          onPress={() => setMainMode('product')}
        >
          <Text style={[styles.modeTabText, mainMode === 'product' && styles.activeModeTabText]}>
            Product Images
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, mainMode === 'social' && styles.activeModeTab]}
          onPress={() => setMainMode('social')}
        >
          <Text style={[styles.modeTabText, mainMode === 'social' && styles.activeModeTabText]}>
            Social Media
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sub Tabs - Product/Settings */}
      {mainMode === 'product' && (
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
      )}

      {mainMode === 'social' && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'product' && styles.activeTab]}
            onPress={() => setActiveTab('product')}
          >
            <Text style={[styles.tabText, activeTab === 'product' && styles.activeTabText]}>
              Content
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
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        {/* PRODUCT TAB */}
        {mainMode === 'product' && activeTab === 'product' && (
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
                    <TextInput
                      style={[
                        styles.textInput,
                        errors.productName && styles.inputError,
                      ]}
                      placeholder="Enter product name"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.productName && (
                      <Text style={styles.errorText}>
                        {errors.productName.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            <ProductTypeSelector
              control={control}
              errors={errors}
            />

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
        {/* Social Media Mode */}
        {mainMode === 'social' && activeTab === 'product' && (
          <ScrollView style={styles.content}>
            {/* Image Setup Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Image Setup</Text>

              {/* Platform Selection */}
              <FormSelect
                label="Platform"
                value={watch('socialPlatform') || ''}
                onValueChange={(value) => setValue('socialPlatform', value)}
                options={SOCIAL_MEDIA_PLATFORMS}
                required
              />

              {/* Content Type */}
              <FormSelect
                label="Content Type"
                value={watch('socialContentType') || ''}
                onValueChange={(value) => setValue('socialContentType', value)}
                options={SOCIAL_MEDIA_CONTENT_TYPES}
                required
              />

              {/* Aspect Ratio */}
              <FormSelect
                label="Aspect Ratio"
                value={watch('aspectRatio') || '1:1'}
                onValueChange={(value) => setValue('aspectRatio', value)}
                options={SOCIAL_MEDIA_ASPECT_RATIOS[watch('socialPlatform') as keyof typeof SOCIAL_MEDIA_ASPECT_RATIOS] || SOCIAL_MEDIA_ASPECT_RATIOS.instagram}
                required
              />

              {/* Background Style */}
              <FormSelect
                label="Background Style"
                value={watch('backgroundStyle') || 'solid'}
                onValueChange={(value) => setValue('backgroundStyle', value)}
                options={BACKGROUND_STYLES}
              />
            </View>

            {/* Model & Logo Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Model & Logo</Text>

              {/* Model Type */}
              <FormSelect
                label="Model Type"
                value={watch('modelTypeForSocial') || 'product_only'}
                onValueChange={(value) => setValue('modelTypeForSocial', value)}
                options={MODEL_TYPES}
              />

              {/* Custom Model Image Upload */}
              {watch('modelTypeForSocial') === 'custom' && (
                <Controller
                  control={control}
                  name="customModelImage"
                  render={({ field: { value, onChange } }) => (
                    <ImagePickerComponent
                      label="Model Image *"
                      onImageSelected={onChange}
                      disabled={loading}
                    />
                  )}
                />
              )}

              {/* Logo Upload */}
              <Controller
                control={control}
                name="companyLogo"
                render={({ field: { value, onChange } }) => (
                  <ImagePickerComponent
                    label="Company Logo (Optional)"
                    onImageSelected={onChange}
                    disabled={loading}
                  />
                )}
              />
            </View>

            {/* Style Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Style</Text>

              {/* Visual Style */}
              <FormSelect
                label="Visual Style"
                value={watch('socialStyle') || 'modern'}
                onValueChange={(value) => setValue('socialStyle', value)}
                options={SOCIAL_MEDIA_STYLES}
              />
            </View>
          </ScrollView>
        )}

        {/* SOCIAL MEDIA SETTINGS TAB */}
        {mainMode === 'social' && activeTab === 'settings' && (
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Generation Settings</Text>

              {/* Number of Variations */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Number of Variations</Text>
                <OptionsSlider
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              </View>

              {/* Custom Prompt */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Custom Instructions</Text>
                <View style={styles.inputGroup}>
                  <Controller
                    control={control}
                    name="customPromptSocial"
                    render={({ field: { value, onChange } }) => (
                      <View>
                        <Text style={styles.label}>Additional Instructions (Optional)</Text>
                        <TextInput
                          style={[styles.textInput, { height: 100 }]}
                          placeholder="Add any custom instructions for image generation..."
                          placeholderTextColor="#999"
                          value={value}
                          onChangeText={onChange}
                          multiline
                          numberOfLines={4}
                        />
                        <Text style={styles.charCount}>
                          {(value?.length || 0)}/500
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        {mainMode === 'product' && activeTab === 'settings' && (
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Image Settings</Text>

              {/* Style */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Style</Text>
                <StyleSelector
                  control={control}
                  errors={errors}
                />
              </View>

              {/* Display Format */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Display Format</Text>
                <OutputTypeSelector
                  control={control}
                  errors={errors}
                />
              </View>

              {/* Image Dimensions */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Image Dimensions</Text>
                <AspectRatioSelector
                  control={control}
                  errors={errors}
                />
              </View>

              {/* Watermark */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Watermark</Text>
                <WatermarkSelector
                  control={control}
                  watch={watch}
                  errors={errors}
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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Generation Settings</Text>

              {/* Number of Variations */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Number of Variations</Text>
                <OptionsSlider control={control} watch={watch} setValue={setValue} />
              </View>

              {/* Custom Prompt */}
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Custom Instructions</Text>
                <CustomPromptInput control={control} errors={errors} />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Advanced Options</Text>
              <AdvancedOptionsSelector
                control={control}
                errors={errors}
              />
            </View>
          </ScrollView>
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
      <SafeAreaView style={styles.footer} edges={['bottom', 'left', 'right']}>
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
      </SafeAreaView>

      {/* Settings Modal */}
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        onSelectSettings={(settings) => {
          setCurrentSettings(settings);
          // Apply settings to form
          Object.entries(settings.settings).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              setValue(key as any, value);
            }
          });
        }}
        currentSettings={currentSettings}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  mainModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  activeModeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeModeTabText: {
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7CC',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  subsection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 11,
    marginTop: 3,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 3,
  },
  errorMessage: {
    fontSize: 11,
    color: '#D32F2F',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#C7C7CC',
    backgroundColor: 'white',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  resetButtonText: {
    color: '#000',
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
  placeholder: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 13,
    color: '#999',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  socialIconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    marginBottom: 12,
  },
  socialIconButton: {
    width: '48%',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  socialIconButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});
