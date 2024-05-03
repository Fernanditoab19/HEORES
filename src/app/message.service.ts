import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  // Arreglo para almacenar los mensajes
  messages: string[] = [];
 // Método para agregar un mensaje al arreglo
  add(message: string) {
    this.messages.push(message);
  }
 // Método para limpiar el arreglo de mensajes
  clear() {
    this.messages = [];
  }
}
