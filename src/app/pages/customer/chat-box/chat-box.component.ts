import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: { sender: string; text: string; options?: string[] }[] = [];
  userMessage: string = '';

    // Tabla de respuestas predeterminadas
    predefinedResponses: { [key: string]: string } = {
      'qué es entel': 'Entel es una empresa líder en telecomunicaciones que ofrece servicios de telefonía móvil, internet y soluciones digitales.',
      'que es entel': 'Entel es una empresa líder en telecomunicaciones que ofrece servicios de telefonía móvil, internet y soluciones digitales.',
      'quiénes son': 'Somos Entel, comprometidos a conectar a las personas con tecnología innovadora.',
      'quienes son': 'Somos Entel, comprometidos a conectar a las personas con tecnología innovadora.',
      'dónde están ubicados': 'Estamos ubicados en múltiples ciudades de Latinoamérica. Visita nuestra página oficial para más detalles.',
      'donde estan ubicados': 'Estamos ubicados en múltiples ciudades de Latinoamérica. Visita nuestra página oficial para más detalles.',
      'cuál es tu nombre': 'Mi nombre es POKEANGEL, soy el asistente virtual de ENTEL.',
      'cual es tu nombre': 'Mi nombre es POKEANGEL, soy el asistente virtual de ENTEL.',
      'cómo te llamas': 'Mi nombre es POKEANGEL, soy el asistente virtual de ENTEL.',
      'como te llamas': 'Mi nombre es POKEANGEL, soy el asistente virtual de ENTEL.',
    };

  constructor(private http: HttpClient) {
    this.greetUser();
  }

  greetUser() {
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: '¡Hola! Soy POKEANGEL, el asistente virtual de ENTEL. ¿En qué puedo ayudarte?',
        options: ['¿Cuál es el código de mi ticket?', '¿Cuál es el servicio de mi ticket?', '¿cuándo saque mi ticket?'],
      });
      this.scrollToBottom(); // Hacer scroll al fondo
    }, 500);
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Agregar mensaje del usuario al chat
    this.messages.push({ sender: 'user', text: this.userMessage });

    // Lógica para manejar respuestas predeterminadas
    const lowerCaseMessage = this.userMessage.toLowerCase();
    for (const key in this.predefinedResponses) {
      if (lowerCaseMessage.includes(key)) {
        this.messages.push({ sender: 'bot', text: this.predefinedResponses[key] });
        this.userMessage = ''; // Limpiar el input del usuario
        return;
      }
      this.scrollToBottom(); // Hacer scroll al fondo
    }

    // Si no hay coincidencia, realizar la solicitud al backend
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
        this.scrollToBottom(); // Hacer scroll al fondo
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

  // Método para hacer scroll al fondo del contenedor
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }, 100);
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }
}
