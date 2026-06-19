import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';

interface AdvancedOptionsSelectorProps {
  control: any;
  errors: any;
  photoshootOptions: any;
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
  errors,
  photoshootOptions,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    if (expandedSections.includes(title)) {
      setExpandedSections(expandedSections.filter((s) => s !== title));
    } else {
      setExpandedSections([...expandedSections, title]);
    }
  };

  const getOptions = (optionKey: string) => {
    return photoshootOptions?.options?.[optionKey] || [];
  };

  return (
    <View style={styles.container}>
      {sections.map((section) => {
        const isExpanded = expandedSections.includes(section.title);
        return (
          <View key={section.title} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.title)}
            >
              <Text style={styles.sectionTitle}>
                {isExpanded ? '▼' : '▶'} {section.title}
              </Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.sectionContent}>
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
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  section: {
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
});
