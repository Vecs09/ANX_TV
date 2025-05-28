import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

export default function CustomHeader({ title }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
