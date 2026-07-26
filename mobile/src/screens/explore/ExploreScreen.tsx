import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator,Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { teamsApi } from '../../api/teams.api';
import { playersApi } from '../../api/players.api';
import { Team, Player } from '../../types';

export default function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'Equipes' | 'Joueurs'>('Equipes');
  const [search, setSearch] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'Equipes') fetchTeams();
    else fetchPlayers();
  }, [activeTab]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await teamsApi.getAll();
      setTeams(response.data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les équipes');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await playersApi.getAll(1, 50);
      setPlayers(response.data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les joueurs');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlayers = players.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const renderTeam = ({ item }: { item: Team }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TeamDetail', { teamId: item.id })}
    >
      <View style={styles.avatar} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPlayer = ({ item }: { item: Player }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PlayerDetail', { playerId: item.id })}
    >
      <View style={styles.avatar} />
      <Text style={styles.cardText}>
        {item.firstName} {item.lastName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.avatarButton} />
      </View>

      {/* Toggle Équipes / Joueurs */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Equipes' && styles.toggleActive]}
          onPress={() => setActiveTab('Equipes')}
        >
          <Text style={[styles.toggleText, activeTab === 'Equipes' && styles.toggleTextActive]}>
            Équipes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Joueurs' && styles.toggleActive]}
          onPress={() => setActiveTab('Joueurs')}
        >
          <Text style={[styles.toggleText, activeTab === 'Joueurs' && styles.toggleTextActive]}>
            Joueurs
          </Text>
        </TouchableOpacity>
      </View>

     {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#E63946" style={{ marginTop: 40 }} />
      ) : activeTab === 'Equipes' ? (
        <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item.id}
          renderItem={renderTeam}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredPlayers}
          keyExtractor={(item) => item.id}
          renderItem={renderPlayer}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}   
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  toggleActive: { backgroundColor: '#555' },
  toggleText: { fontSize: 15, color: '#555', fontWeight: '500' },
  toggleTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 30,
    padding: 12,
    gap: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  cardText: { fontSize: 16, fontWeight: '500', color: '#000' },
});