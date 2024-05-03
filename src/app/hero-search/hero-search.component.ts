import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero'; // Importa la interfaz Hero
import { HeroService } from '../hero.service'; // Importa el servicio HeroService

@Component({
  selector: 'app-hero-search', // Selector del componente
  templateUrl: './hero-search.component.html', // Ruta del archivo HTML del componente
  styleUrls: [ './hero-search.component.css' ] // Rutas de los archivos CSS del componente
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>; // Observable de héroes
  private searchTerms = new Subject<string>(); // Subject para los términos de búsqueda

  constructor(private heroService: HeroService) {} // Constructor del componente que inyecta el servicio HeroService

  // Método para enviar un término de búsqueda al flujo de observables
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // El observable de héroes se asigna al flujo de términos de búsqueda
    this.heroes$ = this.searchTerms.pipe(
      // Espera 300ms después de cada pulsación de tecla antes de considerar el término
      debounceTime(300),

      // Ignora el nuevo término si es igual al término anterior
      distinctUntilChanged(),

      // Cambia al nuevo observable de búsqueda cada vez que el término cambia
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
