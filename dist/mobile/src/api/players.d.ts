import { Player } from '../types';
export declare function getPlayers(): Promise<Player[]>;
export declare function createPlayer(player: Partial<Player>): Promise<Player>;
export declare function updatePlayer(id: number, player: Partial<Player>): Promise<Player>;
export declare function deletePlayer(id: number): Promise<void>;
