import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const COMPOSITION_TYPES = [
  { label: 'Side by Side', value: 'side-by-side', help: 'Images placed side by side' },
  { label: 'Stacked', value: 'stacked', help: 'Images stacked vertically' },
  { label: 'Grid', value: 'grid', help: 'Images in grid layout' },
  { label: 'Collage', value: 'collage', help: 'Creative collage layout' },
];

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
            options={COMPOSITION_TYPES}
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
