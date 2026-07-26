import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/auth.store';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      await login(response.access_token, response.user);
    } catch (error: any) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Connexion</Text>
      </View>

      {/* Formulaire */}
      <View style={styles.form}>
        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Mot de passe */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Bouton Connexion */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Connexion</Text>
          )}
        </TouchableOpacity>

        {/* Mot de passe oublié */}
        <TouchableOpacity>
          <Text style={styles.link}>Mot de passe oublié</Text>
        </TouchableOpacity>
        {/* Lien vers l'inscription */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Pas de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    gap: 16,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#000' },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 40, gap: 16 },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: { paddingRight: 16 },
  button: {
    backgroundColor: '#555',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { textAlign: 'center', color: '#555', fontSize: 14, marginTop: 8 },
});