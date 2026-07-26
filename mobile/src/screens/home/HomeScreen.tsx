import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Données mockées
const MOCK_MATCHES = [
  {
    id: '1',
    league: 'Ligue Professionnelle Cameroun',
    country: 'Cameroun',
    matches: [
      { id: 'm1', time: '18:00', homeTeam: 'FAP de Yaoundé', awayTeam: 'Douala Firebirds', homeScore: null, awayScore: null, status: 'upcoming' },
      { id: 'm2', time: '20:00', homeTeam: 'BEAC de Yaoundé', awayTeam: 'Falcons de Yaoundé', homeScore: null, awayScore: null, status: 'upcoming' },
    ],
  },
  {
    id: '2',
    league: 'Championnat Régional Littoral',
    country: 'Cameroun',
    matches: [
      { id: 'm3', time: 'FT', homeTeam: 'Ecole de Basket Douala', awayTeam: 'Moungo Zone', homeScore: 78, awayScore: 65, status: 'finished' },
      { id: 'm4', time: 'FT', homeTeam: 'ALP de Yaoundé', awayTeam: 'ACPBA de Yaoundé', homeScore: 88, awayScore: 91, status: 'finished' },
    ],
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'MATCHS' | 'LIGUES'>('MATCHS');
  const [search, setSearch] = useState('');

  const renderMatch = (match: any) => (
    <View key={match.id} style={styles.matchCard}>
      <View style={styles.matchTime}>
        <Text style={styles.matchTimeText}>{match.time}</Text>
      </View>
      <View style={styles.matchTeams}>
        <Text style={styles.teamName}>{match.homeTeam}</Text>
        <Text style={styles.teamName}>{match.awayTeam}</Text>
      </View>
      {match.status === 'finished' ? (
        <View style={styles.matchScore}>
          <Text style={styles.scoreText}>{match.homeScore}</Text>
          <Text style={styles.scoreText}>{match.awayScore}</Text>
        </View>
      ) : (
        <View style={styles.matchScore}>
          <Text style={styles.scoreText}>-</Text>
        </View>
      )}
      <TouchableOpacity style={styles.favoriteBtn}>
        <Ionicons name="star-outline" size={18} color="#888" />
      </TouchableOpacity>
    </View>
  );

  const renderLeagueGroup = ({ item }: { item: any }) => (
    <View style={styles.leagueGroup}>
      <View style={styles.leagueHeader}>
        <View style={styles.leagueLogo} />
        <View>
          <Text style={styles.leagueName}>{item.league}</Text>
          <Text style={styles.leagueCountry}>{item.country}</Text>
        </View>
        <TouchableOpacity style={styles.leagueFavorite}>
          <Ionicons name="star-outline" size={18} color="#888" />
        </TouchableOpacity>
      </View>
      {item.matches.map(renderMatch)}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher sur KwataBall"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.avatarCircle} />
      </View>

      {/* Toggle MATCHS / LIGUES */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'MATCHS' && styles.toggleActive]}
          onPress={() => setActiveTab('MATCHS')}
        >
          <Text style={[styles.toggleText, activeTab === 'MATCHS' && styles.toggleTextActive]}>
            MATCHS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'LIGUES' && styles.toggleActive]}
          onPress={() => setActiveTab('LIGUES')}
        >
          <Text style={[styles.toggleText, activeTab === 'LIGUES' && styles.toggleTextActive]}>
            LIGUES
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'MATCHS' ? (
        <>
          {/* Filtres */}
          <View style={styles.filtersRow}>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="options-outline" size={14} color="#000" />
              <Text style={styles.filterText}>Filtre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>En direct</Text>
            </TouchableOpacity>
            <View style={styles.dateNav}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={18} color="#000" />
              </TouchableOpacity>
              <Text style={styles.dateText}>Aujourd'hui</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Liste des matchs */}
          <FlatList
            data={MOCK_MATCHES}
            keyExtractor={(item) => item.id}
            renderItem={renderLeagueGroup}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>Ligues — Bientôt disponible</Text>
        </View>
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
    marginBottom: 12,
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
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
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
  toggleText: { fontSize: 14, fontWeight: '600', color: '#555' },
  toggleTextActive: { color: '#fff' },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  filterText: { fontSize: 13, color: '#000' },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
    marginLeft: 'auto',
  },
  dateText: { fontSize: 13, fontWeight: '500' },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },
  leagueGroup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  leagueLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  leagueName: { fontSize: 14, fontWeight: '600', color: '#000' },
  leagueCountry: { fontSize: 12, color: '#888' },
  leagueFavorite: { marginLeft: 'auto' },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 10,
  },
  matchTime: { width: 40 },
  matchTimeText: { fontSize: 12, color: '#888', textAlign: 'center' },
  matchTeams: { flex: 1, gap: 4 },
  teamName: { fontSize: 14, color: '#000' },
  matchScore: { alignItems: 'flex-end', gap: 4 },
  scoreText: { fontSize: 14, fontWeight: '600', color: '#000' },
  favoriteBtn: { padding: 4 },
  comingSoon: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  comingSoonText: { fontSize: 16, color: '#888' },
});