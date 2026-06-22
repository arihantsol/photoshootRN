import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

interface CompositionTypeSelectorProps {
  control: any;
  errors: any;
  hasMultipleImages: boolean;
}

export const CompositionTypeSelector: React.FC<CompositionTypeSelectorProps> = ({
  control,
  errors,
  hasMultipleImages,
}) => {
  if (!hasMultipleImages) {
    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>
          Upload multiple product images to enable composition options
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="compositionType"
        render={({ field: { value, onChange } }) => (
          <FormSelect
            label="Image Composition"
            value={value}
            onValueChange={onChange}
            options={PHOTOSHOOT_OPTIONS.compositionType}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
  },
});
