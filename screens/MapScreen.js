import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '../styles/styles';

// Static mapping for floor images (React Native requires static paths)
const floorImages = {
  // Flintholm
  'FH-B': require('../assets/floor_FH-B.png'),
  'FH': require('../assets/floor_FH.png'),
  // Solbjerg Plads
  'SPs': require('../assets/SPs.png'),
  'SP1': require('../assets/SP1.png'),
  'SP2': require('../assets/SP2.png'),
  'SP3': require('../assets/SP3.png'),
  'SP4': require('../assets/SP4.png'),
  'SP5': require('../assets/SP5.png'),
  // Fallback
  'default': require('../assets/SPs.png')
};

function getSolbjergKey(room) {
  const id = (room?.id || '').toUpperCase();
  const floor = (room?.floor || '').toString().toLowerCase();

  // Prefer prefix from id if present
  if (/^SPS/.test(id)) return 'SPs'; // e.g., SPs01, SPs00.10
  const m = id.match(/^SP([1-5])/);  // e.g., SP101 -> 1, SP201 -> 2
  if (m) return `SP${m[1]}`;

  // Otherwise fall back to readable floor
  if (floor.startsWith('s') || floor.includes('stue')) return 'SPs';
  if (['1','2','3','4','5'].includes(floor)) return `SP${floor}`;

  return null;
}



export default function MapScreen({ route }) {
  const room = route.params?.room;
  let imageSource = floorImages.default;
  const building = (room?.building || '').toLowerCase();
  if (building.includes('flintholm')) {
    imageSource = floorImages[room?.id] || floorImages['FH'];
  } else if (building.includes('solbjerg')) {
    const key = getSolbjergKey(room);
    imageSource = (key && floorImages[key]) || floorImages.default;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>{room?.name || 'Ukendt lokale'}</Text>
      <Text style={styles.p}>
        {room?.building || 'Bygning'} • Etage {room?.floor || '?'}
      </Text>

      <View style={styles.mapBox}>
        <Image
          source={imageSource}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>


      <Text style={styles.h3}>Vejledende rute:</Text>
      <FlatList
        data={room?.steps || []}
        keyExtractor={(s, i) => `${i}`}
        renderItem={({ item, index }) => (
          <Text style={styles.pSmall}>{index + 1}. {item}</Text>
        )}
        ListEmptyComponent={<Text style={styles.pSmall}>Ingen rute tilgængelig.</Text>}
      />
    </View>
  );
}
