import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

interface ProductTypeSelectorProps {
  control: any;
  errors: any;
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  control,
  errors,
}) => {
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
            options={PHOTOSHOOT_OPTIONS.productType}
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
