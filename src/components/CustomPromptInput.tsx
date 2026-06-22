import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

interface CustomPromptInputProps {
  control: any;
  errors: any;
}

export const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="customPrompt"
        render={({ field: { value, onChange } }) => (
          <View>
            <Text style={styles.label}>Additional Instructions (Max 500 characters)</Text>
            <TextInput
              style={[styles.textInput, errors.customPrompt && styles.inputError]}
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
            {errors.customPrompt && (
              <Text style={styles.errorText}>{errors.customPrompt.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FFFFFF',
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 11,
    marginTop: 3,
  },
});
