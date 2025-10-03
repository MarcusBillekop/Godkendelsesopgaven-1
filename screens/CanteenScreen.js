// Kantine-info: Viser info om Jespers Torvekøkken på CBS og link til menu
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const LOCATIONS = [
  { id: 'SP', name: 'Solbjerg Plads (SP)', opening: 'Hverdage ca. 8-16', note: 'Stort udvalg i stueplan' },
  { id: 'DH', name: 'Dalgas Have (DH)', opening: 'Hverdage ca. 8-15', note: 'Mindre udvalg' },
  { id: 'FH', name: 'Flintholm (FH)', opening: 'Hverdage ca. 8-15', note: 'Udvalg varierer' }
];

export default function CanteenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Jespers Torvekøkken</Text>
      <Text style={styles.p}>Kantinen på CBS-afdelingerne. Se åbningstider og gå til menu.</Text>

      <FlatList
        data={LOCATIONS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.pSmall}>Åbningstider: {item.opening}</Text>
            <Text style={styles.pSmall}>{item.note}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('CanteenMenu')}>
        <Text style={styles.btnText}>Gå til menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('CanteenMap')}>
        <Text style={styles.btnText}>Find nærmeste kantine på kort</Text>
      </TouchableOpacity>
    </View>
  );
}
