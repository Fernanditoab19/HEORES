import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'; // Importa la interfaz Hero
import { HeroService } from '../hero.service'; // Importa el servicio HeroService

@Component({
  selector: 'app-heroes', // Selector del componente
  templateUrl: './heroes.component.html', // Ruta del archivo HTML del componente
  styleUrls: ['./heroes.component.css'] // Rutas de los archivos CSS del componente
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []; // Arreglo de héroes inicializado como vacío

  constructor(private heroService: HeroService) { } // Constructor del componente que inyecta el servicio HeroService

  ngOnInit(): void { // Método del ciclo de vida OnInit, se ejecuta después de que Angular haya inicializado todas las propiedades del componente
    this.getHeroes(); // Llama al método getHeroes() para obtener la lista de héroes al inicializar el componente
  }

  getHeroes(): void { // Método para obtener la lista de héroes
    this.heroService.getHeroes() // Llama al método getHeroes del servicio HeroService
    .subscribe(heroes => this.heroes = heroes); // Suscribe al observable devuelto por getHeroes y actualiza el arreglo de héroes con la lista obtenida
  }

  add(name: string): void { // Método para agregar un nuevo héroe
    name = name.trim(); // Elimina los espacios en blanco al principio y al final del nombre
    if (!name) { return; } // Retorna si el nombre está vacío
    this.heroService.addHero({ name } as Hero) // Llama al método addHero del servicio HeroService para agregar el héroe
      .subscribe(hero => { // Suscribe al observable devuelto por addHero y agrega el nuevo héroe al arreglo de héroes
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void { // Método para eliminar un héroe
    this.heroes = this.heroes.filter(h => h !== hero); // Filtra el arreglo de héroes y remueve el héroe a eliminar
    this.heroService.deleteHero(hero.id).subscribe(); // Llama al método deleteHero del servicio HeroService para eliminar el héroe
  }

}
