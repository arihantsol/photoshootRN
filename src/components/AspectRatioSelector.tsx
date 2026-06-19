import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const ASPECT_RATIOS = [
  { label: '1:1 (Square)', value: '1:1', help: 'Square format' },
  { label: '16:9 (Wide)', value: '16:9', help: 'Wide landscape' },
  { label: '9:16 (Portrait)', value: '9:16', help: 'Tall portrait' },
  { label: '4:3 (Standard)', value: '4:3', help: 'Standard format' },
];

interface AspectRatioSelectorProps {
  control: any;
  errors: any;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name="aspectRatio"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Aspect Ratio"
          value={value}
          onValueChange={onChange}
          options={ASPECT_RATIOS}
        />
      )}
    />
  );
};
