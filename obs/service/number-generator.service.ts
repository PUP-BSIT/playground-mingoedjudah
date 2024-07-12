import { Subject } from 'rxjs';

export class NumberGeneratorService {
  numberListener = new Subject<number>();

  generate() {
    const randomNumber = Math.round(Math.random() * 100);
    this.numberListener.next(randomNumber);
  }

  constructor() { }
}
