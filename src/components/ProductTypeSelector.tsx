import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const PRODUCT_TYPES = [
  { label: 'Fashion', value: 'fashion', help: 'Clothing and apparel' },
  { label: 'Jewelry', value: 'jewelry', help: 'Accessories and jewelry' },
  { label: 'Electronics', value: 'electronics', help: 'Tech products' },
  { label: 'Home & Decor', value: 'home', help: 'Home goods and decor' },
];

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
            options={PRODUCT_TYPES}
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
