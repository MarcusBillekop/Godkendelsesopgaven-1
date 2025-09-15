import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { ROOMS } from '../data/rooms';

export default function ResultsScreen({ route, navigation }) {
  const q = (route.params?.query || '').trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return ROOMS.slice(0, 10);
    return ROOMS.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.building.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Resultater {q ? `for "${q}"` : ''}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Map', { room: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.pSmall}>{item.building} • Etage {item.floor}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.p}>Ingen match.</Text>}
      />
    </View>
  );
}
