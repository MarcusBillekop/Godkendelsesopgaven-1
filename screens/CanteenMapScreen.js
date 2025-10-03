// Kort (WebView + Leaflet): Find nærmeste Jespers Torvekøkken (SP, DH, FH)
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';

const CANTEENS = [
  { id: 'SP', name: 'Jespers Torvekøkken – SP', lat: 55.68154, lon: 12.53036 },
  { id: 'DH', name: 'Jespers Torvekøkken – Dalgas', lat: 55.68255, lon: 12.51159 },
  { id: 'FH', name: 'Jespers Torvekøkken – Flintholm', lat: 55.68926, lon: 12.49243 }
];

function haversine(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const c = 2 * Math.asin(Math.sqrt(
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
  ));
  return R * c; // meter
}

export default function CanteenMapScreen() {
  const [permission, setPermission] = useState(null);
  const [coords, setCoords] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  // Toggle for statisk OSM-billede som fallback (hook placeres altid her for stabil rækkefølge)
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status !== 'granted') {
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const pos = { lat: loc.coords.latitude, lon: loc.coords.longitude };
      setCoords(pos);
      setRegion({
        latitude: pos.lat,
        longitude: pos.lon,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });
      setLoading(false);
    })();
  }, []);

  const nearest = useMemo(() => {
    if (!coords) return null;
    let best = null;
    for (const c of CANTEENS) {
      const d = haversine(coords, { lat: c.lat, lon: c.lon });
      if (!best || d < best.d) best = { ...c, d };
    }
    return best;
  }, [coords]);

  // Byg en statisk OSM URL som backup (viser brugers placering og kantiner)
  const staticUrl = useMemo(() => {
    const c = coords || { lat: 55.68154, lon: 12.53036 };
    const base = 'https://staticmap.openstreetmap.de/staticmap.php';
    const size = '600x400';
    const zoom = 15;
    const markers = [
      `markers=${c.lat},${c.lon},lightblue-pushpin`,
      ...CANTEENS.map(k => `markers=${k.lat},${k.lon},red-pushpin`)
    ].join('&');
    return `${base}?center=${c.lat},${c.lon}&zoom=${zoom}&size=${size}&${markers}`;
  }, [coords]);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator />
        <Text style={styles.pSmall}>Henter placering…</Text>
      </View>
    );
  }

  if (permission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.h2}>Placering ikke tilladt</Text>
        <Text style={styles.p}>Giv adgang til lokation for at se nærmeste kantine.</Text>
      </View>
    );
  }

  const html = `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100vh; width: 100vw; }
      .nearest{ color: tomato; font-weight: 700; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const map = L.map('map');
      const user = ${coords ? JSON.stringify({ lat: coords.lat, lon: coords.lon }) : 'null'};
      const canteens = ${JSON.stringify(CANTEENS)};
      const nearest = ${nearest ? JSON.stringify(nearest) : 'null'};
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
      tiles.addTo(map);
      let center = [55.68154, 12.53036];
      if (user) center = [user.lat, user.lon];
      map.setView(center, 15);
      if (user) { L.marker([user.lat, user.lon]).addTo(map).bindPopup('Din placering'); }
      canteens.forEach(c => {
        const m = L.marker([c.lat, c.lon]).addTo(map).bindPopup(c.name);
        if (nearest && nearest.id === c.id) { m.bindPopup('<span class="nearest">' + c.name + ' (nærmest)</span>'); }
      });
      setTimeout(() => { map.invalidateSize(); }, 150);
    </script>
  </body>
  </html>`;

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Nærmeste kantine</Text>
      {nearest && (
        <Text style={styles.pSmall}>Tættest på: {nearest.name} ({Math.round(nearest.d)} m)</Text>
      )}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setUseStatic(s => !s)} style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>{useStatic ? 'Vis interaktivt kort' : 'Vis statisk kort'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapBox}>
        {useStatic ? (
          <Image source={{ uri: staticUrl }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
        ) : (
          <WebView
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            cacheEnabled={false}
            style={{ width: '100%', height: '100%' }}
            source={{ html }}
          />
        )}
      </View>
    </View>
  );
}
