// Simpelt datasæt med lokaler, deres bygning, etage og vejledning
export const ROOMS = [
  {
    id: 'SPs10.01',
    name: 'SPs10.01',
    building: 'Solbjerg Plads',
    floor: '10',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 10.', 'Højre ad gangen', 'Lokale til venstre'],
    coords: { x: 0.6, y: 0.4 }
  },
  {
    id: 'SPs05.12',
    name: 'SPs05.12',
    building: 'Solbjerg Plads',
    floor: '5',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 5.', 'Ligeud 30m', 'Lokale til højre'],
    coords: { x: 0.3, y: 0.7 }
  },
  {
    id: 'Dalgas-2.15',
    name: 'Dalgas 2.15',
    building: 'Dalgas Have',
    floor: '2',
    steps: ['Indgang Dalgas', 'Trappe 2 etager op', 'Venstre ad korridor', 'Lokale for enden'],
    coords: { x: 0.5, y: 0.5 }
  },
  {
    id: 'FH-B',
    name: 'Auditorium FH-B',
    building: 'Flintholm (FH)',
    floor: 'Stueplan',
    steps: ['Gå ind ad hovedindgang', 'Fortsæt forbi Lokale FH-A', 'Find FH-B forbi det hævede repos med trapper'],
    coords: { x: 0.55, y: 0.45 }
  },
  // Solbjerg Plads - stue (SPs)
  {
    id: 'SPs00.10',
    name: 'SPs00.10',
    building: 'Solbjerg Plads',
    floor: 'Stue',
    steps: ['Indgang Solbjerg Plads', 'Følg gangen ligeud', 'Lokale på højre hånd'],
    coords: { x: 0.42, y: 0.58 }
  },
  {
    id: 'SPs00.22',
    name: 'SPs00.22',
    building: 'Solbjerg Plads',
    floor: 'Stue',
    steps: ['Indgang Solbjerg Plads', 'Til venstre for reception', 'Lokale ned ad gangen'],
    coords: { x: 0.3, y: 0.5 }
  },
  // Solbjerg Plads - 1. sal (SP1)
  {
    id: 'SP1.01',
    name: 'SP1.01',
    building: 'Solbjerg Plads',
    floor: '1',
    steps: ['Indgang Solbjerg Plads', 'Elevator/trappe til 1.', 'Lokale til venstre'],
    coords: { x: 0.55, y: 0.35 }
  },
  {
    id: 'SP1.15',
    name: 'SP1.15',
    building: 'Solbjerg Plads',
    floor: '1',
    steps: ['Indgang Solbjerg Plads', 'Elevator/trappe til 1.', 'Følg gang til højre', 'Lokale for enden'],
    coords: { x: 0.2, y: 0.35 }
  },
  // Solbjerg Plads - 2. sal (SP2)
  {
    id: 'SP2.06',
    name: 'SP2.06',
    building: 'Solbjerg Plads',
    floor: '2',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 2.', 'Ligeud 20m', 'Lokale til venstre'],
    coords: { x: 0.65, y: 0.42 }
  },
  {
    id: 'SP2.20',
    name: 'SP2.20',
    building: 'Solbjerg Plads',
    floor: '2',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 2.', 'Til højre ad korridor', 'Lokale midtvejs'],
    coords: { x: 0.35, y: 0.42 }
  },
  // Solbjerg Plads - 3. sal (SP3)
  {
    id: 'SP3.02',
    name: 'SP3.02',
    building: 'Solbjerg Plads',
    floor: '3',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 3.', 'Lokale over for elevator'],
    coords: { x: 0.5, y: 0.3 }
  },
  {
    id: 'SP3.18',
    name: 'SP3.18',
    building: 'Solbjerg Plads',
    floor: '3',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 3.', 'Til venstre ad gangen', 'Lokale ved vinduerne'],
    coords: { x: 0.25, y: 0.28 }
  },
  // Solbjerg Plads - nye eksempler uden punktum (SPs01, SP101, SP201 ...)
  {
    id: 'SPs01',
    name: 'SPs01',
    building: 'Solbjerg Plads',
    floor: 'Stue',
    steps: ['Indgang Solbjerg Plads', 'Fortsæt forbi reception', 'Lokale SPs01 ved atrium'],
    coords: { x: 0.48, y: 0.62 }
  },
  {
    id: 'SPs02',
    name: 'SPs02',
    building: 'Solbjerg Plads',
    floor: 'Stue',
    steps: ['Indgang Solbjerg Plads', 'Til højre for reception', 'Lokale SPs02 ned ad gangen'],
    coords: { x: 0.6, y: 0.6 }
  },
  {
    id: 'SP101',
    name: 'SP101',
    building: 'Solbjerg Plads',
    floor: '1',
    steps: ['Indgang Solbjerg Plads', 'Trappe/Elevator til 1.', 'Lokale SP101 tæt ved trappen'],
    coords: { x: 0.52, y: 0.38 }
  },
  {
    id: 'SP102',
    name: 'SP102',
    building: 'Solbjerg Plads',
    floor: '1',
    steps: ['Indgang Solbjerg Plads', 'Trappe/Elevator til 1.', 'Til højre ad gangen', 'Lokale SP102 på højre hånd'],
    coords: { x: 0.35, y: 0.36 }
  },
  {
    id: 'SP201',
    name: 'SP201',
    building: 'Solbjerg Plads',
    floor: '2',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 2.', 'Ligeud 15m', 'Lokale SP201 til venstre'],
    coords: { x: 0.58, y: 0.42 }
  },
  {
    id: 'SP202',
    name: 'SP202',
    building: 'Solbjerg Plads',
    floor: '2',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 2.', 'Til venstre ad gangen', 'Lokale SP202 ved glasfacaden'],
    coords: { x: 0.28, y: 0.44 }
  },
  {
    id: 'SP301',
    name: 'SP301',
    building: 'Solbjerg Plads',
    floor: '3',
    steps: ['Indgang Solbjerg Plads', 'Elevator til 3.', 'Lokale SP301 over for elevator'],
    coords: { x: 0.5, y: 0.3 }
  }
];

// Tilføj flere lokaler efter behov...