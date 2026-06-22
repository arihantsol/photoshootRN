import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePhotoshootStore } from '../store/photoshootStore';
import { settingsStorage } from '../utils/settingsStorage';
import { FormSelect } from '../components/FormSelect';

interface SettingsScreenProps {
  onClose?: () => void;
  onPresetSelected?: (preset: any) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose, onPresetSelected }) => {
  const { appSettings, setAppSettings, options, fetchOptions, optionsLoading } =
    usePhotoshootStore();
  const [aiProviderOptions, setAiProviderOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [presets, setPresets] = useState<any[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  useEffect(() => {
    // Fetch options if not already loaded
    if (!options) {
      fetchOptions();
    } else {
      extractAIProviders();
    }
    loadPresets();
  }, []);

  const extractAIProviders = () => {
    if (options?.aiProvider) {
      try {
        let providers: { label: string; value: string }[] = [];

        // Handle if aiProvider is an array of objects with label/value
        if (Array.isArray(options.aiProvider)) {
          if (options.aiProvider.length > 0 && typeof options.aiProvider[0] === 'object') {
            providers = options.aiProvider as { label: string; value: string }[];
          } else {
            // Handle if aiProvider is an array of strings
            providers = options.aiProvider.map((provider: string) => ({
              label:
                typeof provider === 'string'
                  ? provider.charAt(0).toUpperCase() + provider.slice(1)
                  : String(provider),
              value: String(provider),
            }));
          }
        }

        setAiProviderOptions(providers);
      } catch (error) {
        console.error('Error extracting AI providers:', error);
      }
    }
  };

  useEffect(() => {
    if (options) {
      extractAIProviders();
    }
  }, [options]);

  const loadPresets = async () => {
    setLoadingPresets(true);
    try {
      const allSettings = await settingsStorage.getPresets();
      setPresets(allSettings);
    } catch (error) {
      console.error('Error loading presets:', error);
      Alert.alert('Error', 'Failed to load presets');
    } finally {
      setLoadingPresets(false);
    }
  };

  const handleAIProviderChange = (value: string) => {
    setAppSettings({ aiProvider: value });
  };

  const handleEnhancePromptToggle = (value: boolean) => {
    setAppSettings({ enhancePrompt: value });
  };

  const handlePresetSelect = (value: string) => {
    setSelectedPreset(value);
  };

  const presetOptions = presets.map((preset) => ({
    label: preset.name,
    value: preset.id,
    help: preset.description,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Provider Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Provider</Text>
          <Text style={styles.sectionDescription}>
            Select which AI provider to use for image generation
          </Text>

          {optionsLoading && aiProviderOptions.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : (
            <FormSelect
              label="Provider"
              value={appSettings.aiProvider}
              onValueChange={handleAIProviderChange}
              options={aiProviderOptions}
              required={true}
            />
          )}
        </View>

        {/* Enhance Prompt Section */}
        <View style={styles.section}>
          <View style={styles.toggleHeader}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.sectionTitle}>Enhance Prompt</Text>
              <Text style={styles.sectionDescription}>
                Automatically enhance your prompts for better results
              </Text>
            </View>
            <Switch
              style={styles.toggle}
              value={appSettings.enhancePrompt}
              onValueChange={handleEnhancePromptToggle}
              trackColor={{ false: '#D1D1D6', true: '#81C784' }}
              thumbColor={appSettings.enhancePrompt ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Presets Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presets</Text>
          <Text style={styles.sectionDescription}>
            Quick-load preset configurations for different use cases
          </Text>

          {loadingPresets ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : presets.length > 0 ? (
            <View>
              <FormSelect
                label="Select Preset"
                value={selectedPreset}
                onValueChange={handlePresetSelect}
                options={presetOptions}
              />

              {selectedPreset && (
                <View style={styles.presetDetails}>
                  {(() => {
                    const selectedPresetData = presets.find(
                      (p) => p.id === selectedPreset
                    );
                    return (
                      <>
                        <Text style={styles.presetName}>
                          {selectedPresetData?.name}
                        </Text>
                        <Text style={styles.presetDescription}>
                          {selectedPresetData?.description}
                        </Text>

                        <View style={styles.presetSettings}>
                          <Text style={styles.presetSettingsTitle}>
                            Configuration:
                          </Text>
                          {Object.entries(
                            selectedPresetData?.settings || {}
                          ).map(([key, value]) => (
                            <View key={key} style={styles.settingRow}>
                              <Text style={styles.settingKey}>
                                {formatSettingKey(key)}
                              </Text>
                              <Text style={styles.settingValue}>
                                {String(value)}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <TouchableOpacity
                          style={styles.loadPresetButton}
                          onPress={() => {
                            Alert.alert(
                              'Load Preset',
                              `Load "${selectedPresetData?.name}" preset?`,
                              [
                                { text: 'Cancel', onPress: () => {} },
                                {
                                  text: 'Load',
                                  onPress: () => {
                                    if (onPresetSelected && selectedPresetData) {
                                      onPresetSelected(selectedPresetData);
                                    }
                                    if (onClose) onClose();
                                  },
                                },
                              ]
                            );
                          }}
                        >
                          <Icon
                            name="check-circle"
                            size={18}
                            color="white"
                            style={styles.buttonIcon}
                          />
                          <Text style={styles.loadPresetButtonText}>
                            Load This Preset
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  })()}
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.noPresetsText}>No presets available</Text>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

function formatSettingKey(key: string): string {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholderView: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabelContainer: {
    flex: 1,
  },
  toggle: {
    marginLeft: 16,
  },
  loadingContainer: {
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presetDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  presetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  presetDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  presetSettings: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  presetSettingsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  settingKey: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  settingValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  loadPresetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  loadPresetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  noPresetsText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});
