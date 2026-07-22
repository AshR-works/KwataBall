"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const players_1 = require("../../api/players");
function HomeScreen() {
    const [players, setPlayers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [firstName, setFirstName] = (0, react_1.useState)('');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [position, setPosition] = (0, react_1.useState)('POINT_GUARD');
    (0, react_1.useEffect)(() => {
        fetchPlayers();
    }, []);
    const fetchPlayers = async () => {
        try {
            const data = await (0, players_1.getPlayers)();
            setPlayers(data);
        }
        catch (error) {
            console.error('Erreur lors du fetch des joueurs:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreatePlayer = async () => {
        if (!firstName || !lastName || !position)
            return;
        try {
            const newPlayer = await (0, players_1.createPlayer)({
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
        }
        catch (error) {
            console.error('Erreur lors de la création du joueur:', error);
        }
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Liste des joueurs 🏀</react_native_1.Text>

      
      <react_native_1.TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName}/>
      <react_native_1.TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName}/>

      <picker_1.Picker selectedValue={position} style={styles.input} onValueChange={(itemValue) => setPosition(itemValue)}>
        <picker_1.Picker.Item label="Meneur (PG)" value="POINT_GUARD"/>
        <picker_1.Picker.Item label="Arrière (SG)" value="SHOOTING_GUARD"/>
        <picker_1.Picker.Item label="Ailier (SF)" value="SMALL_FORWARD"/>
        <picker_1.Picker.Item label="Ailier fort (PF)" value="POWER_FORWARD"/>
        <picker_1.Picker.Item label="Pivot (C)" value="CENTER"/>
      </picker_1.Picker>

      <react_native_1.Button title="Ajouter joueur" onPress={handleCreatePlayer}/>

      
      {loading ? (<react_native_1.ActivityIndicator size="large" color="#0000ff"/>) : (<react_native_1.FlatList data={players} keyExtractor={(item) => item.id} renderItem={({ item }) => (<react_native_1.View style={styles.card}>
              <react_native_1.Text style={styles.name}>{item.firstName} {item.lastName}</react_native_1.Text>
              <react_native_1.Text style={styles.details}>Position: {item.position}</react_native_1.Text>
              <react_native_1.Text style={styles.details}>Équipe: {item.team?.name}</react_native_1.Text>
            </react_native_1.View>)}/>)}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 6 },
    card: { padding: 12, marginBottom: 8, backgroundColor: '#f2f2f2', borderRadius: 8 },
    name: { fontSize: 16, fontWeight: '600' },
    details: { fontSize: 14, color: '#555' },
});
//# sourceMappingURL=HomeScreen.js.map