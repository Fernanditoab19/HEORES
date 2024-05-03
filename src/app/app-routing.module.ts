import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirige a la ruta '/dashboard' cuando la URL está vacía
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el componente DashboardComponent
  { path: 'detail/:id', component: HeroDetailComponent }, // Ruta para el componente HeroDetailComponent con un parámetro ':id'
  { path: 'heroes', component: HeroesComponent } // Ruta para el componente HeroesComponent
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // Importa y configura las rutas principales de la aplicación
  exports: [ RouterModule ] // Exporta el módulo de enrutamiento para su uso en otros módulos
})
export class AppRoutingModule {}
