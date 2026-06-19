import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const WATERMARK_TYPES = [
  { label: 'None', value: 'none', help: 'No watermark' },
  { label: 'Logo', value: 'logo', help: 'Logo watermark' },
  { label: 'Text', value: 'text', help: 'Text watermark' },
];

interface WatermarkSelectorProps {
  control: any;
  watch: any;
  errors: any;
}

export const WatermarkSelector: React.FC<WatermarkSelectorProps> = ({
  control,
  watch,
  errors,
}) => {
  const watermarkType = watch('watermarkType');

  return (
    <View>
      <Controller
        control={control}
        name="watermarkType"
        render={({ field: { value, onChange } }) => (
          <FormSelect
            label="Watermark Type"
            value={value}
            onValueChange={onChange}
            options={WATERMARK_TYPES}
          />
        )}
      />

      {watermarkType === 'text' && (
        <Controller
          control={control}
          name="watermarkText"
          render={({ field: { value, onChange } }) => (
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Watermark Text</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter watermark text"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#999"
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputGroup: {
    marginTop: 12,
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
    fontSize: 14,
    color: '#333',
  },
});
