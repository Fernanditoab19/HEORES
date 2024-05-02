import { Component, Input } from '@angular/core'; // Importa Component y Input desde '@angular/core' para utilizar en el componente
import { NgIf, UpperCasePipe } from '@angular/common'; // Importa NgIf y UpperCasePipe desde '@angular/common' para utilizar en el componente
import { FormsModule } from '@angular/forms'; // Importa FormsModule desde '@angular/forms' para utilizar en el componente
import { Hero } from '../hero'; // Importa la interfaz Hero desde el archivo '../hero'

@Component({
  standalone: true, // Indica que este componente es independiente y no necesita otros servicios ni módulos
  selector: 'app-hero-detail', // Selector de este componente, utilizado en otras partes del código HTML para incluir este componente
  templateUrl: './hero-detail.component.html', // Ruta al archivo HTML que define la plantilla de este componente
  styleUrls: ['./hero-detail.component.css'], // Rutas a los archivos CSS que aplican estilos a este componente
  imports: [FormsModule, NgIf, UpperCasePipe], // Importa módulos que son necesarios para este componente
})
export class HeroDetailComponent {
  @Input() hero?: Hero; // Declara una propiedad de entrada 'hero' que puede ser pasada desde otro componente
}
