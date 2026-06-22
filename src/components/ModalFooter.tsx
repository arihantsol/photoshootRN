import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ModalFooterProps {
  text: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F2F2F7',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  text: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
