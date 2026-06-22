import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';

interface SelectOption {
  label: string;
  value: string;
  help?: string;
}

interface OptionPickerModalProps {
  visible: boolean;
  title: string;
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const OptionPickerModal: React.FC<OptionPickerModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase()) ||
        option.value.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, options]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setSearchText('');
  };

  const renderOption = ({ item }: { item: SelectOption }) => {
    const isSelected = item.value === selectedValue;
    // Support both 'help' (component format) and 'description' (API format)
    const helpText = item.help || (item as any).description;

    return (
      <TouchableOpacity
        style={[styles.optionItem, isSelected && styles.selectedOption]}
        onPress={() => handleSelect(item.value)}
      >
        <View style={styles.optionContent}>
          <Text style={[styles.optionLabel, isSelected && styles.selectedLabel]}>
            {item.label}
          </Text>
          {helpText && (
            <Text style={[styles.optionHelp, isSelected && styles.selectedHelp]}>
              {helpText}
            </Text>
          )}
        </View>
        {isSelected && <Icon name="check-circle" size={22} color="#007AFF" style={styles.checkmark} />}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <ModalHeader title={title} onClose={onClose} />

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Icon name="magnify" size={18} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search options..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchText('')}
              >
                <Icon name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Options List */}
        {filteredOptions.length > 0 ? (
          <FlatList
            data={filteredOptions}
            renderItem={renderOption}
            keyExtractor={(item) => item.value}
            contentContainerStyle={styles.listContent}
            scrollEnabled={true}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No options found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search terms
            </Text>
          </View>
        )}

        <ModalFooter text={`${filteredOptions.length} option${filteredOptions.length !== 1 ? 's' : ''}`} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 0,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 44,
  },
  searchIcon: {
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: '#333',
    paddingVertical: 0,
    paddingHorizontal: 4,
    height: '100%',
  },
  clearButton: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 0,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  selectedOption: {
    backgroundColor: '#F5F5F5',
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  selectedLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  optionHelp: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
    fontWeight: '400',
  },
  selectedHelp: {
    color: '#007AFF',
  },
  checkmark: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
