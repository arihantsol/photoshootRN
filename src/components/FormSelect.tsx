import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OptionPickerModal } from './OptionPickerModal';

interface SelectOption {
  label: string;
  value: string;
  help?: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  required = false,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || `Select ${label}`;

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setModalVisible(false);
  };

  const handleClear = () => {
    onValueChange('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TouchableOpacity
        style={[styles.selectButton, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.selectButtonText, !value && styles.placeholderText]}>
          {displayValue}
        </Text>
        {value ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
            <Icon name="close-circle" size={18} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <Icon name="chevron-right" size={24} color="#007AFF" />
        )}
      </TouchableOpacity>

      <OptionPickerModal
        visible={modalVisible}
        title={label}
        options={options}
        selectedValue={value}
        onSelect={handleSelect}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  required: {
    color: '#FF3B30',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 15,
    color: '#000',
    flex: 1,
    fontWeight: '400',
  },
  placeholderText: {
    color: '#999',
  },
  disabled: {
    backgroundColor: '#F2F2F7',
    opacity: 0.6,
  },
  clearIcon: {
    padding: 4,
  },
});
