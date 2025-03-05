import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  imports: [CommonModule],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailboxComponent {
  activeTab: 'messages' | 'notifications' = 'messages';

  // Datos de ejemplo
  messages = [
    {
      subject: 'Nueva oferta recibida',
      preview: 'Tienes una nueva oferta por tu producto "Cámara DSLR..."',
      date: 'Hace 2 horas',
      read: false
    },
    {
      subject: 'Pedido enviado',
      preview: 'Tu pedido #12345 ha sido enviado',
      date: 'Ayer',
      read: true
    }
  ];

  notifications = [
    {
      icon: 'bi-check-circle',
      text: 'Tu producto "Zapatillas Running" ha sido aprobado',
      date: 'Hace 30 minutos',
      read: false
    },
    {
      icon: 'bi-exclamation-triangle',
      text: 'Actualiza tu método de pago para continuar vendiendo',
      date: 'Hace 3 días',
      read: true
    }
  ];

  setActiveTab(tab: 'messages' | 'notifications') {
    this.activeTab = tab;
  }
}
