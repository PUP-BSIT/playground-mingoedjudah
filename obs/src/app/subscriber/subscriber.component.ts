import { Component, OnDestroy, OnInit } from '@angular/core';
import { NumberGeneratorService } from '../../../service/number-generator.service';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/*
@Component({
  selector: 'app-subscriber',
  styleUrl: './subscriber.component.css',
  template: `{{ generateNumber }}`,
})
*/

@Component({
  selector: 'app-subscriber',
  styleUrl: './subscriber.component.css',
  template: `{{ numberGeneratorService.numberListener | async }}`,
})

/*
export class SubscriberComponent implements OnInit {
  generateNumber = 0;

  constructor(protected numberGeneratorService: NumberGeneratorService) {}

  ngOnInit(): void {
    this.numberGeneratorService.numberListener.subscribe((num) => {
      this.generateNumber = num;
      console.log(`The generated number is ${this.generateNumber}`);
    });
  }

}
*/

/*
export class SubscriberComponent implements OnInit, OnDestroy {
  generateNumber = 0;
  unsubscribe = new Subject<void>();

  constructor(protected numberGeneratorService: NumberGeneratorService) {}

  ngOnInit(): void {
    this.numberGeneratorService.numberListener
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((num) => {
      this.generateNumber = num;
      console.log(`The generated number is ${this.generateNumber}`);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
*/

/*
export class SubscriberComponent {
  generateNumber = 0;

  constructor(protected numberGeneratorService: NumberGeneratorService) {
    this.numberGeneratorService.numberListener
    .pipe(takeUntilDestroyed())
    .subscribe((num) => {
      this.generateNumber = num;
      console.log(`The generated number is ${this.generateNumber}`);
    });
  }
}
*/

export class SubscriberComponent {
  constructor(protected numberGeneratorService: NumberGeneratorService) {}
}