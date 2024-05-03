import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages', // Selector del componente
  templateUrl: './messages.component.html', // Ruta del archivo HTML del componente
  styleUrls: ['./messages.component.css'] // Rutas de los archivos CSS del componente
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {} // Constructor del componente que inyecta el servicio de mensajes
}
