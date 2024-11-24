import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code',
  template: `
    <div class="qr-container">
      <h2>Escanea este código QR para acceder al Chat</h2>
      <qrcode [qrdata]="'http://192.168.0.34:4200/chat'" [width]="256"></qrcode>
    </div>
  `,
  standalone: true,
  imports: [QRCodeModule, CommonModule],
  styleUrls: ['./qr.component.css'],
})
export class QrCodeComponent {}
