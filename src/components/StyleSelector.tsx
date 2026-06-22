import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

interface StyleSelectorProps {
  control: any;
  errors: any;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name="photoshootStyle"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Photoshoot Style"
          value={value}
          onValueChange={onChange}
          options={PHOTOSHOOT_OPTIONS.photoshootStyle}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
