import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() myCard?: Card;
  @Input() index: number = 0;
  @Output() cardClicked = new EventEmitter<number>();

  onImageClick() {
    this.cardClicked.emit(this.index);
  }
}
