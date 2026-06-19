import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface StyleSelectorProps {
  control: any;
  errors: any;
  options: any[];
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  control,
  errors,
  options,
}) => {
  const styleOptions = options || [];

  return (
    <Controller
      control={control}
      name="photoshootStyle"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Photoshoot Style"
          value={value}
          onValueChange={onChange}
          options={styleOptions}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
