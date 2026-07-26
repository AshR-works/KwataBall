// src/screens/explore/PlayerDetailScreen.tsx
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { playersApi } from '../../api/players.api';
import type { Player } from '../../types';

type PlayerDetailRouteParams = {
  playerId: string;
};

export default function PlayerDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { playerId } = route.params as PlayerDetailRouteParams;

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'matches'>('info');

  useEffect(() => {
    loadPlayer();
  }, [playerId]);

  async function loadPlayer() {
    try {
      setLoading(true);
      const data = await playersApi.getById(playerId);
      setPlayer(data);
    } catch (error) {
      console.error('Erreur chargement joueur:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  if (!player) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Joueur introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header : retour + favori */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={isFavorite ? '#E63946' : '#888'}
          />
        </TouchableOpacity>
      </View>

      {/* Identité */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>
            {player.firstName[0]}{player.lastName[0]}
          </Text>
        </View>
        <Text style={styles.playerName}>{player.firstName} {player.lastName}</Text>
        <Text style={styles.playerSubtitle}>
          {formatPosition(player.position)} - #{player.jerseyNumber}
        </Text>
      </View>

      {/* Naissance / Taille */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Naissance</Text>
          <Text style={styles.infoValue}>{formatDate(player.dateOfBirth)}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Taille</Text>
          <Text style={styles.infoValue}>
            {player.height ? `${(player.height / 100).toFixed(2)} m` : '—'}
          </Text>
        </View>
      </View>

      {/* Stats — placeholder tant que PlayerStat n'est pas branché côté backend */}
      <View style={styles.statsRow}>
        <StatCard value="—" label="Pts" />
        <StatCard value="—" label="Reb" />
        <StatCard value="—" label="Pds" />
      </View>

      {/* Onglets */}
      <View style={styles.tabs}>
        <TabButton label="Infos" active={activeTab === 'info'} onPress={() => setActiveTab('info')} />
        <TabButton label="Stats" active={activeTab === 'stats'} onPress={() => setActiveTab('stats')} />
        <TabButton label="Matchs" active={activeTab === 'matches'} onPress={() => setActiveTab('matches')} />
      </View>

      <View style={styles.tabContent}>
        {activeTab === 'info' && (
          <>
            <InfoLine label="Nationalité" value={player.nationality ?? '—'} />
            <InfoLine label="Poids" value={player.weight ? `${player.weight} kg` : '—'} />
            <InfoLine label="Équipe" value={player.team?.name ?? '—'} />
          </>
        )}
        {activeTab === 'stats' && (
          <Text style={styles.comingSoon}>Statistiques détaillées bientôt disponibles</Text>
        )}
        {activeTab === 'matches' && (
          <Text style={styles.comingSoon}>Historique des matchs bientôt disponible</Text>
        )}
      </View>
    </ScrollView>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.tabButton, active && styles.tabButtonActive]} onPress={onPress}>
      <Text style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLineLabel}>{label}</Text>
      <Text style={styles.infoLineValue}>{value}</Text>
    </View>
  );
}

function formatPosition(position: string) {
  const labels: Record<string, string> = {
    POINT_GUARD: 'Meneur',
    SHOOTING_GUARD: 'Arrière',
    SMALL_FORWARD: 'Ailier',
    POWER_FORWARD: 'Ailier fort',
    CENTER: 'Pivot',
  };
  return labels[position] ?? position;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' },
  errorText: { color: '#fff', fontSize: 16 },
  comingSoon: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 16 },

  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },

  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarInitials: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  playerName: { color: '#fff', fontSize: 19, fontWeight: '600' },
  playerSubtitle: { color: '#888', fontSize: 13, marginTop: 4 },

  infoRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  infoCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 10, padding: 12 },
  infoLabel: { color: '#888', fontSize: 11 },
  infoValue: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 10, padding: 10, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#888', fontSize: 10, marginTop: 2 },

  tabs: { flexDirection: 'row', backgroundColor: '#16213e', borderRadius: 10, padding: 4, marginBottom: 12 },
  tabButton: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabButtonActive: { backgroundColor: '#22283f' },
  tabButtonText: { color: '#888', fontSize: 12 },
  tabButtonTextActive: { color: '#fff', fontWeight: '600' },

  tabContent: { paddingVertical: 8 },
  infoLine: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2a2a40',
  },
  infoLineLabel: { color: '#888', fontSize: 13 },
  infoLineValue: { color: '#fff', fontSize: 13, fontWeight: '500' },
});