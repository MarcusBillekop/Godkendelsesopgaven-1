// Kantine-menu: Simpel tekstmenu med "læg i kurv" og persistent lagring
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MENU = [
  { id: 'sandwich-chicken', name: 'Sandwich med kylling' },
  { id: 'sandwich-veggie', name: 'Sandwich vegetar' },
  { id: 'salad', name: 'Dagens salat' },
  { id: 'coffee', name: 'Kaffe' },
  { id: 'water', name: 'Vand' }
];

const STORAGE_KEY = 'canteen_cart_v1';

export default function CanteenMenuScreen() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setCart(JSON.parse(raw));
      } catch (e) {
        console.warn('Kunne ikke læse kurv', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Kunne ikke gemme kurv', e);
      }
    })();
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => [...prev, { id: item.id, name: item.name, ts: Date.now() }]);
  };

  const clearCart = () => {
    Alert.alert('Tøm kurv', 'Er du sikker?', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Tøm', style: 'destructive', onPress: () => setCart([]) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Kantine – Menu</Text>
      <FlatList
        data={MENU}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => addToCart(item)}>
              <Text style={styles.btnText}>Læg i kurv</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={{ marginTop: 8 }}>
            <Text style={styles.h3}>Kurv</Text>
            {cart.length === 0 ? (
              <Text style={styles.pSmall}>Din kurv er tom.</Text>
            ) : (
              cart.map((c) => (
                <Text key={c.ts} style={styles.pSmall}>• {c.name}</Text>
              ))
            )}
          </View>
        }
      />

      <TouchableOpacity style={styles.btnSecondary} onPress={clearCart}>
        <Text style={styles.btnText}>Tøm kurv</Text>
      </TouchableOpacity>
    </View>
  );
}
