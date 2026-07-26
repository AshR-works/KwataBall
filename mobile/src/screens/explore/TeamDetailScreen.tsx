import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { teamsApi } from '../../api/teams.api';
import { playersApi } from '../../api/players.api';
import { Team, Player } from '../../types';

const POSITION_LABELS: Record<Player['position'], string> = {
  POINT_GUARD: 'Meneur',
  SHOOTING_GUARD: 'Arrière',
  SMALL_FORWARD: 'Ailier',
  POWER_FORWARD: 'Ailier Fort',
  CENTER: 'Pivot',
};

export default function TeamDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { teamId } = route.params;

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState<'Effectif' | 'Option2' | 'Option3'>('Effectif');
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teamData, playersData] = await Promise.all([
        teamsApi.getById(teamId),
        playersApi.getByTeam(teamId),
      ]);
      setTeam(teamData);
      setPlayers(playersData);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  const renderPlayer = ({ item }: { item: Player }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => navigation.navigate('PlayerDetail', { playerId: item.id })}
    >
      <Text style={styles.jerseyNumber}>#{item.jerseyNumber}</Text>
      <Text style={styles.playerName}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.playerPosition}>
        {POSITION_LABELS[item.position]}
      </Text>
      <View style={[styles.statusBadge, item.isActive ? styles.statusActive : styles.statusInactive]}>
        <Text style={styles.statusText}>{item.isActive ? 'Actif' : 'Inactif'}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#888" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={isFavorite ? '#FFD700' : '#000'}
          />
        </TouchableOpacity>
      </View>

      {/* Info équipe */}
      <View style={styles.teamInfo}>
        <View style={styles.teamLogo} />
        <Text style={styles.teamName}>{team?.name}</Text>
        <Text style={styles.teamCity}>{team?.city}</Text>
        <Text style={styles.playerCount}>{players.length} joueurs</Text>
      </View>

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        {(['Effectif', 'Option2', 'Option3'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenu */}
      {activeTab === 'Effectif' ? (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={renderPlayer}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>Bientôt disponible</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  teamInfo: { alignItems: 'center', paddingVertical: 20 },
  teamLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  teamName: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  teamCity: { fontSize: 16, color: '#555', marginBottom: 4 },
  playerCount: { fontSize: 13, color: '#888' },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
    borderRadius: 30,
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  tabActive: { backgroundColor: '#555' },
  tabText: { fontSize: 14, color: '#555', fontWeight: '500' },
  tabTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 20 },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  jerseyNumber: { fontSize: 14, fontWeight: 'bold', color: '#555', width: 30 },
  playerName: { flex: 1, fontSize: 15, fontWeight: '500', color: '#000' },
  playerPosition: { fontSize: 13, color: '#555' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 11, fontWeight: '500' },
  comingSoon: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  comingSoonText: { fontSize: 16, color: '#888' },
});