import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent registrerer App som rodenhed for både Expo Go og native builds,
// så miljøet sættes korrekt op.
registerRootComponent(App);
