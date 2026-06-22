import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from './AppHeader';
import { PhotoshootSettings, settingsStorage } from '../utils/settingsStorage';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSettings: (settings: PhotoshootSettings) => void;
  currentSettings?: PhotoshootSettings | null;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onSelectSettings,
  currentSettings,
}) => {
  const [settings, setSettings] = useState<PhotoshootSettings[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'saved'>('presets');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [settingName, setSettingName] = useState('');
  const [settingDescription, setSettingDescription] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSettingDetails, setSelectedSettingDetails] = useState<PhotoshootSettings | null>(null);

  useEffect(() => {
    if (visible) {
      loadSettings();
    }
  }, [visible]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const allSettings = await settingsStorage.getAllSettings();
      setSettings(allSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCurrentSettings = async () => {
    if (!settingName.trim()) {
      Alert.alert('Error', 'Please enter a setting name');
      return;
    }

    if (!currentSettings) {
      Alert.alert('Error', 'No settings to save');
      return;
    }

    try {
      await settingsStorage.saveSettings({
        name: settingName,
        description: settingDescription,
        settings: currentSettings.settings,
      });

      Alert.alert('Success', 'Settings saved successfully');
      setSettingName('');
      setSettingDescription('');
      setShowSaveDialog(false);
      loadSettings();
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleDeleteSettings = (id: string, name: string) => {
    Alert.alert(
      'Delete Settings',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await settingsStorage.deleteSettings(id);
              loadSettings();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete settings');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const filterSettings = settings.filter((s) => {
    if (activeTab === 'presets') return s.isPreset;
    return !s.isPreset;
  });

  const renderSettingItem = ({ item }: { item: PhotoshootSettings }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => {
        onSelectSettings(item);
        onClose();
      }}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingName}>{item.name}</Text>
          {item.isPreset && (
            <Text style={styles.presetBadge}>PRESET</Text>
          )}
        </View>
        {item.description && (
          <Text style={styles.settingDescription}>{item.description}</Text>
        )}
        <Text style={styles.settingDetails}>
          Style: {item.settings.photoshootStyle} • Options: {item.settings.numberOfOptions}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSettingDetails(item);
            setShowDetailModal(true);
          }}
          style={styles.infoButton}
        >
          <Icon name="information-outline" size={20} color="#0066CC" />
        </TouchableOpacity>
        {!item.isPreset && (
          <TouchableOpacity
            onPress={() => handleDeleteSettings(item.id, item.name)}
            style={styles.deleteButton}
          >
            <Icon name="trash-can-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        {/* Header */}
        <AppHeader
          title="Settings"
          leftIcon="close"
          onLeftPress={onClose}
          rightIcon="content-save-plus"
          onRightPress={() => {
            if (!currentSettings) {
              Alert.alert('Info', 'No settings to save yet');
              return;
            }
            setShowSaveDialog(true);
          }}
        />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'presets' && styles.activeTab]}
            onPress={() => setActiveTab('presets')}
          >
            <Text style={[styles.tabText, activeTab === 'presets' && styles.activeTabText]}>
              Presets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved ({settings.filter((s) => !s.isPreset).length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : filterSettings.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'presets' ? 'No presets available' : 'No saved settings yet'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filterSettings}
            renderItem={renderSettingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Save Dialog */}
        {showSaveDialog && (
          <View style={styles.saveDialog}>
            <View style={styles.dialogContent}>
              <Text style={styles.dialogTitle}>Save Current Settings</Text>

              <Text style={styles.inputLabel}>Setting Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Fashion Studio Pro"
                value={settingName}
                onChangeText={setSettingName}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.descriptionInput]}
                placeholder="e.g., Clean studio lighting for fashion"
                value={settingDescription}
                onChangeText={setSettingDescription}
                placeholderTextColor="#999"
                multiline
              />

              <View style={styles.dialogButtons}>
                <TouchableOpacity
                  style={[styles.dialogButton, styles.cancelButton]}
                  onPress={() => {
                    setShowSaveDialog(false);
                    setSettingName('');
                    setSettingDescription('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dialogButton, styles.saveButton]}
                  onPress={handleSaveCurrentSettings}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Details Modal */}
        <Modal visible={showDetailModal} animationType="slide" onRequestClose={() => setShowDetailModal(false)}>
          <SafeAreaView style={styles.detailModalContainer} edges={['top', 'left', 'right']}>
            <View style={styles.detailModalHeader}>
              <Text style={styles.detailModalTitle}>{selectedSettingDetails?.name}</Text>
              <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedSettingDetails ? Object.entries(selectedSettingDetails.settings) : []}
              renderItem={({ item: [key, value] }) => (
                <View style={styles.detailItem}>
                  <Text style={styles.detailKey}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                  <Text style={styles.detailValue}>{String(value)}</Text>
                </View>
              )}
              keyExtractor={([key]) => key}
              contentContainerStyle={styles.detailListContent}
              scrollEnabled={true}
            />

            <SafeAreaView style={styles.detailFooter} edges={['bottom', 'left', 'right']}>
              <TouchableOpacity
                style={styles.detailCloseButton}
                onPress={() => setShowDetailModal(false)}
              >
                <Text style={styles.detailCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  settingName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  presetBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  settingDetails: {
    fontSize: 11,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  saveDialog: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dialogContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    paddingBottom: 24,
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#F2F2F7',
    marginBottom: 14,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  dialogButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  detailModalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  detailModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  detailListContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  detailItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginBottom: 0,
  },
  detailKey: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    textTransform: 'capitalize',
  },
  detailFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  detailCloseButton: {
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailCloseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
