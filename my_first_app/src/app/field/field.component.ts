import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent {
  @Input() mode = 'display';
}

