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
      <Text style={styles.title}>Additional Instructions</Text>
      <Controller
        control={control}
        name="customPrompt"
        render={({ field: { value, onChange } }) => (
          <View>
            <TextInput
              style={[styles.textInput, errors.customPrompt && styles.inputError]}
              placeholder="Add any special instructions for the generation..."
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            {errors.customPrompt && (
              <Text style={styles.errorText}>{errors.customPrompt.message}</Text>
            )}
          </View>
        )}
      />
      <Text style={styles.help}>
        E.g., "Make the product look premium, add luxury background, focus on
        details"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
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
    backgroundColor: '#FAFAFA',
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
  help: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
