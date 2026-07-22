import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getPlayers, createPlayer } from '../../api/players';
import { Player } from '../../types';

export default function HomeScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState<Player['position']>('POINT_GUARD'); // typé directement

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Erreur lors du fetch des joueurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlayer = async () => {
    if (!firstName || !lastName || !position) return;
    try {
      const newPlayer = await createPlayer({
        firstName,
        lastName,
        position,
        jerseyNumber: 0,
        nationality: 'Cameroun',
        dateOfBirth: new Date().toISOString(),
        isActive: true,
      });
      setPlayers((prev) => [...prev, newPlayer]);
      setFirstName('');
      setLastName('');
      setPosition('POINT_GUARD');
    } catch (error) {
      console.error('Erreur lors de la création du joueur:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des joueurs 🏀</Text>

      {/* Formulaire */}
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />

      <Picker
        selectedValue={position}
        style={styles.input}
        onValueChange={(itemValue) => setPosition(itemValue)}
      >
        <Picker.Item label="Meneur (PG)" value="POINT_GUARD" />
        <Picker.Item label="Arrière (SG)" value="SHOOTING_GUARD" />
        <Picker.Item label="Ailier (SF)" value="SMALL_FORWARD" />
        <Picker.Item label="Ailier fort (PF)" value="POWER_FORWARD" />
        <Picker.Item label="Pivot (C)" value="CENTER" />
      </Picker>

      <Button title="Ajouter joueur" onPress={handleCreatePlayer} />

      {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.details}>Position: {item.position}</Text>
              <Text style={styles.details}>Équipe: {item.team?.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 6 },
  card: { padding: 12, marginBottom: 8, backgroundColor: '#f2f2f2', borderRadius: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  details: { fontSize: 14, color: '#555' },
});
