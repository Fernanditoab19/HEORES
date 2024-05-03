import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // Importa la interfaz Hero
import { HeroService } from '../hero.service'; // Importa el servicio HeroService

@Component({
  selector: 'app-dashboard', // Selector del componente
  templateUrl: './dashboard.component.html', // Ruta del archivo HTML del componente
  styleUrls: [ './dashboard.component.css' ] // Rutas de los archivos CSS del componente
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []; // Array para almacenar los héroes que se mostrarán en el dashboard

  constructor(private heroService: HeroService) { } // Inyecta el servicio HeroService en el constructor

  ngOnInit(): void {
    this.getHeroes(); // Al inicializar el componente, obtiene los héroes para mostrar en el dashboard
  }

  // Método para obtener los héroes que se mostrarán en el dashboard
  getHeroes(): void {
    this.heroService.getHeroes() // Llama al método getHeroes del servicio HeroService para obtener los héroes
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); // Suscribe al observable y asigna los héroes al array, limitando a los primeros 4 héroes
  }
}
