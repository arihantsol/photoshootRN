import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface OutputTypeSelectorProps {
  control: any;
  errors: any;
  options?: any[];
}

export const OutputTypeSelector: React.FC<OutputTypeSelectorProps> = ({
  control,
  errors,
  options,
}) => {
  const defaultOptions = options || [];

  return (
    <Controller
      control={control}
      name="outputType"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Output Type"
          value={value}
          onValueChange={onChange}
          options={defaultOptions}
        />
      )}
    />
  );
};
