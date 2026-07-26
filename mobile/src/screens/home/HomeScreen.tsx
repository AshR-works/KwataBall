import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀 KwataBall</Text>
      <Text style={styles.subtitle}>Matchs & Ligues</Text>
      <Text style={styles.soon}>Bientôt disponible</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#E63946', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#fff', marginBottom: 16 },
  soon: { fontSize: 14, color: '#888' },
});