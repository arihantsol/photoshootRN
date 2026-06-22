import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import { ImagePickerComponent } from './ImagePicker';

interface ModelCardProps {
  control: any;
  watch: any;
  setValue: any;
  options?: any;
  loading?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  control,
  watch,
  setValue,
  options,
  loading = false,
}) => {
  const getOptions = (key: string) => {
    return options?.[key] || [];
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Model</Text>

      {/* Model Type */}
      <FormSelect
        label="Model Type"
        value={watch('modelType') || 'ai_generated'}
        onValueChange={(value) => setValue('modelType', value)}
        options={getOptions('modelType')}
      />

      {/* Custom Model Image Upload */}
      {watch('modelType') === 'custom' && (
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

      {/* Model options only for non-custom types */}
      {watch('modelType') !== 'custom' && (
        <>
          {/* Model Origin */}
          <FormSelect
            label="Model Origin"
            value={watch('modelOrigin') || ''}
            onValueChange={(value) => setValue('modelOrigin', value)}
            options={getOptions('modelOrigin')}
          />

          {/* Model Body Type */}
          <FormSelect
            label="Model Body Type"
            value={watch('modelBodyType') || ''}
            onValueChange={(value) => setValue('modelBodyType', value)}
            options={getOptions('modelBodyType')}
          />

          {/* Model Pose */}
          <FormSelect
            label="Model Pose"
            value={watch('modelPose') || ''}
            onValueChange={(value) => setValue('modelPose', value)}
            options={getOptions('modelPose')}
          />

          {/* Model Expression */}
          <FormSelect
            label="Model Expression"
            value={watch('modelExpression') || ''}
            onValueChange={(value) => setValue('modelExpression', value)}
            options={getOptions('modelExpression')}
          />

          {/* Model Age */}
          <Controller
            control={control}
            name="modelAge"
            render={({ field: { value, onChange } }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Model Age</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter age (1-100)"
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              </View>
            )}
          />

          {/* Model Prompt */}
          <Controller
            control={control}
            name="modelPrompt"
            render={({ field: { value, onChange } }) => (
              <View>
                <Text style={styles.label}>Model Description (Optional)</Text>
                <TextInput
                  style={[styles.textInput, { height: 80 }]}
                  placeholder="Add custom description for the model..."
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                />
                <Text style={styles.charCount}>
                  {(value?.length || 0)}/300
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 12,
    marginHorizontal: 0,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textAlign: 'right',
  },
});
