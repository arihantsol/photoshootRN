import React from 'react';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

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
          options={PHOTOSHOOT_OPTIONS.aspectRatio}
        />
      )}
    />
  );
};
