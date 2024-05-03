import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // Importa la función platformBrowserDynamic para cargar la aplicación en un navegador

import { AppModule } from './app/app.module'; // Importa el módulo principal de la aplicación

platformBrowserDynamic().bootstrapModule(AppModule) // Inicializa la aplicación cargando el AppModule
  .catch(err => console.error(err)); // Captura y maneja cualquier error que ocurra durante la inicialización
