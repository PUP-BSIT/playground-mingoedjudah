import { Component } from '@angular/core';
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-root',
  template: `
  <input #num />
  <button (click)="checkNumber(num.value)">
    Check Number
  </button>
  <button (click)="getHello()">Get Hello</button>`,
})

export class AppComponent {
  constructor(private backendService: BackendService) {}

  checkNumber(num: number) {
    this.backendService.getIsEven(num)
    .subscribe((data) => {
      console.log(data);
    });
  }

  getHello() {
    this.backendService.getHello().subscribe((data) => {
      console.log(data);
    })
  }
}
