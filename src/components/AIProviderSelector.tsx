import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

interface AIProviderSelectorProps {
  control: any;
  errors: any;
}

export const AIProviderSelector: React.FC<AIProviderSelectorProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="aiProvider"
        render={({ field: { value, onChange } }) => (
          <FormSelect
            label="AI Provider"
            value={value}
            onValueChange={onChange}
            options={PHOTOSHOOT_OPTIONS.aiProvider}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});
