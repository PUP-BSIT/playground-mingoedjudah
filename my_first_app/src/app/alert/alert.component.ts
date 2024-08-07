import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() alertType: '' | 'primary' | 'secondary' | 
'warn' = '';
}

export class AppComponent {
  parentValue = 0;
}
