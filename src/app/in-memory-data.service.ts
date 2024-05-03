import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero'; // Importa la clase Hero desde './hero'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // Método para crear la base de datos simulada  
  createDb() {
    const heroes = [
      { id: 1, name: 'Vorágine V-15', descripcion: 'Fusil de asalto con alta cadencia de fuego y precisión a larga distancia.'},
      { id: 2, name: 'Martillo M-22:', descripcion: 'Metralleta compacta y ligera, ideal para combate urbano debido a su maniobrabilidad.' },
      { id: 3, name: 'Triturador T-30', descripcion: 'Fusil pesado con capacidad de penetración de blindaje y gran potencia de fuego.' },
      { id: 4, name: 'Fénix F-10', descripcion: 'Fusil de precisión con sistema de mira telescópica integrada, perfecto para francotiradores.' },
      { id: 5, name: 'Eclipse E-5', descripcion: 'Metralleta silenciosa diseñada para operaciones encubiertas, con bajo retroceso y capacidad de disparo en ráfaga.' },
      { id: 6, name: 'Avalancha A-12', descripcion: 'Fusil de asalto con lanzagranadas integrado, adecuado para enfrentamientos en terrenos difíciles.' },
      { id: 7, name: 'Sable S-7:', descripcion: 'Metralleta de diseño modular, con capacidad de personalización según las necesidades del usuario.' },
      { id: 8, name: 'Tormenta T-25', descripcion: 'Fusil automático con sistema de refrigeración avanzado, ideal para mantener la precisión en combates prolongados' },
      { id: 9, name: 'Cerbero C-40', descripcion: 'Fusil de asalto multipropósito con capacidad de cambiar entre modo automático y semiautomático, adaptándose a diferentes situaciones de combate.' }
    ];
    return {heroes};
  }

  // Sobrescribe el método genId para asegurar que un héroe siempre tenga un id.
  // Si el arreglo de héroes está vacío,
  // el método devuelve el número inicial (1).
  // Si el arreglo de héroes no está vacío, el método devuelve el id más alto + 1
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
