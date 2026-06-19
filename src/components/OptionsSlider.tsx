import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
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
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={value}
            onValueChange={(val) => setValue('numberOfOptions', val)}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#007AFF"
          />
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>1</Text>
            <Text style={styles.rangeLabel}>5</Text>
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
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    minWidth: 30,
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#999',
  },
});
