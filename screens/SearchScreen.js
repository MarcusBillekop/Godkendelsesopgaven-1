import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Indoor Navigation (CBS)</Text>
      <Text style={styles.p}>
        Søg efter lokale (fx <Text style={styles.code}>SPs10.01</Text>).
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Indtast lokalesøgning..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => navigation.navigate('Results', { query })}
      >
        <Text style={styles.btnText}>Søg</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => navigation.navigate('Map', { room: {
          id: 'FH-B',
          name: 'Auditorium FH-B',
          building: 'Flintholm (FH)',
          floor: 'Stueplan',
          steps: ['Gå ind ad hovedindgang', 'Fortsæt forbi Lokale FH-A', 'Find FH-B forbi det hævede repos med trapper'],
          coords: { x: 0.55, y: 0.45 }
        }})}
      >
        <Text style={styles.btnText}>Demo: FH-B på kort</Text>
      </TouchableOpacity>
    </View>
  );
}
