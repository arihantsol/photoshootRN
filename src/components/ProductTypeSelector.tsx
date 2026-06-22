import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface ProductTypeSelectorProps {
  control: any;
  errors: any;
  options?: any[];
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  control,
  errors,
  options,
}) => {
  const defaultOptions = options || [];

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="productType"
        render={({ field: { value, onChange } }) => (
          <FormSelect
            label="Product Type"
            value={value}
            onValueChange={onChange}
            options={defaultOptions}
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
});
