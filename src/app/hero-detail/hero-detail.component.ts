import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero'; // Importa la interfaz Hero
import { HeroService } from '../hero.service'; // Importa el servicio HeroService

@Component({
  selector: 'app-hero-detail', // Selector del componente
  templateUrl: './hero-detail.component.html', // Ruta del archivo HTML del componente
  styleUrls: [ './hero-detail.component.css' ] // Rutas de los archivos CSS del componente
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined; // Héroe actual

  constructor(
    private route: ActivatedRoute, // Servicio para acceder a los parámetros de la ruta
    private heroService: HeroService, // Servicio para obtener datos de los héroes
    private location: Location // Servicio para interactuar con la ubicación del navegador
  ) {}

  ngOnInit(): void {
    this.getHero(); // Obtiene el héroe al inicializar el componente
  }

  // Método para obtener el héroe según el ID de la ruta
  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10); // Obtiene el ID de la ruta
    this.heroService.getHero(id) // Llama al servicio para obtener el héroe con el ID especificado
      .subscribe(hero => this.hero = hero); // Asigna el héroe obtenido a la propiedad hero
  }

  // Método para retroceder en la historia del navegador
  goBack(): void {
    this.location.back(); // Utiliza el servicio Location para retroceder en la historia del navegador
  }

  // Método para guardar los cambios en el héroe
  save(): void {
    if (this.hero) { // Verifica si hay un héroe definido
      this.heroService.updateHero(this.hero) // Llama al servicio para actualizar el héroe
        .subscribe(() => this.goBack()); // Después de guardar, retrocede en la historia del navegador
    }
  }
}
