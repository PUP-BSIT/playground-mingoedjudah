import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NumberGeneratorService } from '../../service/number-generator.service';

@Component({
  selector: 'app-root',
  styleUrl: './app.component.css',
  template: `
    <button (click)="generate()">Generate</button>
    <button (click)="showSubscriber = !showSubscriber">
      Toggle Subscriber
    </button>
    @if(showSubscriber) {
      <app-subscriber></app-subscriber>
    }`,
})

/*
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const observable1 =  from([1, 2, 3, 4, 5]);
    observable1.subscribe((data) => console.log(data));
  }
}
*/

/*
export class AppComponent implements OnInit {
  contructor(private numberGeneratorService: NumberGeneratorService) {}

  generate() {
    this.numberGeneratorService.generate();
  }

  ngOnInit(): void {
    const observable1 =  from([1, 2, 3, 4, 5]);
    observable1.subscribe((data) => console.log(data));
  }
}
*/

export class AppComponent implements OnInit {
  showSubscriber = true;

  constructor(private numberGeneratorService: NumberGeneratorService) {}

  generate() {
    this.numberGeneratorService.generate();
  }

  ngOnInit(): void {
    const observable1 =  from([1, 2, 3, 4, 5]);
    observable1.subscribe((data) => console.log(data));
  }
}
