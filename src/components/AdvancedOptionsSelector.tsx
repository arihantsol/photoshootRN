import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface AdvancedOptionsSelectorProps {
  control: any;
  errors: any;
  options?: any;
}

interface SectionConfig {
  title: string;
  fields: {
    name: string;
    label: string;
    optionKey: string;
  }[];
}

const sections: SectionConfig[] = [
  {
    title: 'Product View',
    fields: [
      { name: 'productCount', label: 'Product Count', optionKey: 'productCount' },
      { name: 'productAngle', label: 'Product Angle', optionKey: 'productAngle' },
    ],
  },
  {
    title: 'Environment & Background',
    fields: [
      { name: 'backgroundType', label: 'Background Type', optionKey: 'backgroundType' },
      { name: 'environmentStyle', label: 'Environment Style', optionKey: 'environmentStyle' },
    ],
  },
  {
    title: 'Color & Mood',
    fields: [
      { name: 'colorScheme', label: 'Color Scheme', optionKey: 'colorScheme' },
      { name: 'moodTone', label: 'Mood Tone', optionKey: 'moodTone' },
    ],
  },
  {
    title: 'Lighting',
    fields: [
      { name: 'lightingType', label: 'Lighting Type', optionKey: 'lightingType' },
      { name: 'lightDirection', label: 'Light Direction', optionKey: 'lightDirection' },
    ],
  },
  {
    title: 'Camera & Composition',
    fields: [
      { name: 'shotComposition', label: 'Shot Composition', optionKey: 'shotComposition' },
      { name: 'cameraAngle', label: 'Camera Angle', optionKey: 'cameraAngle' },
      { name: 'depthOfField', label: 'Depth of Field', optionKey: 'depthOfField' },
    ],
  },
  {
    title: 'Context & Timing',
    fields: [
      { name: 'season', label: 'Season', optionKey: 'season' },
      { name: 'occasion', label: 'Occasion', optionKey: 'occasion' },
      { name: 'timeOfDay', label: 'Time of Day', optionKey: 'timeOfDay' },
    ],
  },
  {
    title: 'Target Demographics',
    fields: [
      { name: 'targetAudience', label: 'Target Audience', optionKey: 'targetAudience' },
      { name: 'marketSegment', label: 'Market Segment', optionKey: 'marketSegment' },
    ],
  },
  {
    title: 'Props & Styling',
    fields: [
      { name: 'propDensity', label: 'Prop Density', optionKey: 'propDensity' },
      { name: 'textureEmphasis', label: 'Texture Emphasis', optionKey: 'textureEmphasis' },
      { name: 'materialFocus', label: 'Material Focus', optionKey: 'materialFocus' },
    ],
  },
  {
    title: 'Industry & Brand Context',
    fields: [
      { name: 'industryType', label: 'Industry Type', optionKey: 'industryType' },
      { name: 'brandPersonality', label: 'Brand Personality', optionKey: 'brandPersonality' },
    ],
  },
];

export const AdvancedOptionsSelector: React.FC<AdvancedOptionsSelectorProps> = ({
  control,
  options,
}) => {
  const getOptions = (optionKey: string) => {
    return options?.[optionKey] || [];
  };

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <View key={section.title} style={styles.card}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          {section.fields.map((field) => (
            <Controller
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: { value, onChange } }) => (
                <FormSelect
                  label={field.label}
                  value={value}
                  onValueChange={onChange}
                  options={getOptions(field.optionKey)}
                />
              )}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 0,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 0,
  },
  sectionTitleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  fieldsContainer: {
    gap: 0,
  },
});
