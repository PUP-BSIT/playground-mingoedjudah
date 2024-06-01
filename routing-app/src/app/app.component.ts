import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  onButton1Click() {
    this.router.navigate(['/first'], {
      queryParams: { order: 'desc', page: 2 },
    });
  }
}
