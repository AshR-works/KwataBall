import client from './client';
import { Player } from '../types';

export async function getPlayers(): Promise<Player[]> {
  const res = await client.get('/players');
  return res.data;
}

export async function createPlayer(player: Partial<Player>): Promise<Player> {
  const res = await client.post('/players', player);
  return res.data;
}

export async function updatePlayer(id: number, player: Partial<Player>): Promise<Player> {
  const res = await client.put(`/players/${id}`, player);
  return res.data;
}

export async function deletePlayer(id: number): Promise<void> {
  await client.delete(`/players/${id}`);
}
