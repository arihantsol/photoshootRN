import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

interface OptionsSliderProps {
  control: any;
  watch: any;
  setValue: any;
}

export const OptionsSlider: React.FC<OptionsSliderProps> = ({
  control,
  watch,
  setValue,
}) => {
  const numberOfOptions = watch('numberOfOptions');

  const handleChange = (value: number) => {
    setValue('numberOfOptions', value);
  };

  const options = [1, 2, 3, 4, 5];

  return (
    <Controller
      control={control}
      name="numberOfOptions"
      render={({ field: { value } }) => (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Number of Images to Generate</Text>
            <Text style={styles.value}>{value}</Text>
          </View>

          {/* Custom slider using buttons */}
          <View style={styles.sliderContainer}>
            {options.map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.sliderButton,
                  value === num && styles.sliderButtonActive,
                ]}
                onPress={() => handleChange(num)}
              >
                <Text
                  style={[
                    styles.sliderButtonText,
                    value === num && styles.sliderButtonTextActive,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>1 (Fast)</Text>
            <Text style={styles.rangeLabel}>5 (Comprehensive)</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    minWidth: 30,
    textAlign: 'right',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  sliderButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sliderButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  sliderButtonTextActive: {
    color: 'white',
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: 6,
  },
  rangeLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '400',
  },
});
