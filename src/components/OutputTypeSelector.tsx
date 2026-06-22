import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

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
          options={PHOTOSHOOT_OPTIONS.outputType}
        />
      )}
    />
  );
};
