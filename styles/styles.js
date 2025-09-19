// Fælles styling anvendt på tværs af skærme
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', gap: 12 },
  h1: { fontSize: 24, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '600' },
  h3: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  p: { fontSize: 14, lineHeight: 20 },
  pSmall: { fontSize: 13, color: '#333' },
  code: { fontFamily: 'monospace' },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16
  },
  btnPrimary: {
    backgroundColor: '#1f6feb', paddingVertical: 12, borderRadius: 10, alignItems: 'center'
  },
  btnSecondary: {
    backgroundColor: '#444', paddingVertical: 12, borderRadius: 10, alignItems: 'center'
  },
  btnText: { color: '#fff', fontWeight: '600' },
  card: {
    borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12,
    backgroundColor: '#fafafa'
  },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  mapBox: {
    width: '100%', height: 220, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: '#eee', backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center'
  },
  mapImage: { width: '100%', height: '100%' }
});
