import { Routes } from '@angular/router';
import { Kurser } from './pages/kurser/kurser';
import { Ramschema } from './pages/ramschema/ramschema';

export const routes: Routes = [
  { path: '', component: Kurser },
  { path: 'ramschema', component: Ramschema }
];
