import React from 'react';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface AspectRatioSelectorProps {
  control: any;
  errors: any;
  options?: any[];
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  control,
  errors,
  options,
}) => {
  const defaultOptions = options || [];

  return (
    <Controller
      control={control}
      name="aspectRatio"
      render={({ field: { value, onChange } }) => (
        <FormSelect
          label="Aspect Ratio"
          value={value}
          onValueChange={onChange}
          options={defaultOptions}
        />
      )}
    />
  );
};
