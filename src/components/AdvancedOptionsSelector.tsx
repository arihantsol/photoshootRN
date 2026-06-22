import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

interface AdvancedOptionsSelectorProps {
  control: any;
  errors: any;
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
    title: 'Model',
    fields: [
      { name: 'modelType', label: 'Model Type', optionKey: 'modelType' },
      { name: 'modelOrigin', label: 'Model Origin', optionKey: 'modelOrigin' },
      { name: 'modelBodyType', label: 'Model Body Type', optionKey: 'modelBodyType' },
      { name: 'modelPose', label: 'Model Pose', optionKey: 'modelPose' },
      { name: 'modelExpression', label: 'Model Expression', optionKey: 'modelExpression' },
    ],
  },
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
  errors,
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
    return PHOTOSHOOT_OPTIONS[optionKey as keyof typeof PHOTOSHOOT_OPTIONS] || [];
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
                {isExpanded ? '▼' : '▶'}
              </Text>
              <Text style={styles.sectionTitleText}>{section.title}</Text>
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
    marginTop: 0,
  },
  section: {
    marginBottom: 6,
    borderRadius: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    width: 12,
    textAlign: 'center',
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingTop: 10,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
});
