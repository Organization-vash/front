import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ChatBoxComponent {
  messages: { sender: string; text: string; options?: string[] }[] = [];
  userMessage: string = '';

  constructor(private http: HttpClient) {
    this.greetUser();
  }

  greetUser() {
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: '¡Hola! Soy POKEANGEL,  el asistente virtual de ENTEL. ¿En qué puedo ayudarte?',
        options: ['¿Cuál es el código de mi ticket?', '¿Cuál es el servicio de mi ticket?', '¿Cuándo saque mi ticket?'],
      });
    }, 500);
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Agregar mensaje del usuario al chat
    this.messages.push({ sender: 'user', text: this.userMessage });

    // Realizar la solicitud al backend
    this.http.post<{ message: string }>('http://localhost:8080/api/v1/chat/pregunta', {
      pregunta: this.userMessage // Solo se envía la pregunta
    }).subscribe(
      (response) => {
        this.messages.push({ sender: 'bot', text: response.message });
      },
      (error) => {
        this.messages.push({
          sender: 'bot',
          text: 'Hubo un error al procesar tu solicitud. Intenta de nuevo.',
        });
      }
    );

    // Limpiar el input del usuario
    this.userMessage = '';
  }

    // Método para manejar las opciones
    selectOption(option: string) {
      this.userMessage = option; // Asigna la opción seleccionada al input
      this.sendMessage(); // Envía el mensaje automáticamente
    }
}
