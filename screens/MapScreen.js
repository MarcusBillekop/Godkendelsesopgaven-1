import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '../styles/styles';

// Fast mapping mellem id/etage og tilhørende etagebillede
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
  // Standardvalg hvis intet matcher
  'default': require('../assets/SPs.png')
};

function getSolbjergKey(room) {
  const id = (room?.id || '').toUpperCase();
  const floor = (room?.floor || '').toString().toLowerCase();

  // Brug ID-prefix hvis muligt
  if (/^SPS/.test(id)) return 'SPs'; // fx SPs01, SPs00.10
  const m = id.match(/^SP([1-5])/);  // fx SP101 -> 1, SP201 -> 2
  if (m) return `SP${m[1]}`;

  // Ellers afled ud fra etage-tekst
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


  {/* Vejledende rute som liste */}
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
