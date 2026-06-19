import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const OUTPUT_TYPES = [
  { label: 'On Human', value: 'on-human', help: 'Product shown on a model' },
  { label: 'Mannequin', value: 'mannequin', help: 'Product on mannequin' },
  { label: 'Standalone', value: 'standalone', help: 'Product only' },
];

interface OutputTypeSelectorProps {
  control: any;
  errors: any;
}

export const OutputTypeSelector: React.FC<OutputTypeSelectorProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name="outputType"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Output Type"
          value={value}
          onValueChange={onChange}
          options={OUTPUT_TYPES}
        />
      )}
    />
  );
};
