"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayers = getPlayers;
exports.createPlayer = createPlayer;
exports.updatePlayer = updatePlayer;
exports.deletePlayer = deletePlayer;
const client_1 = __importDefault(require("./client"));
async function getPlayers() {
    const res = await client_1.default.get('/players');
    return res.data;
}
async function createPlayer(player) {
    const res = await client_1.default.post('/players', player);
    return res.data;
}
async function updatePlayer(id, player) {
    const res = await client_1.default.put(`/players/${id}`, player);
    return res.data;
}
async function deletePlayer(id) {
    await client_1.default.delete(`/players/${id}`);
}
//# sourceMappingURL=players.js.map