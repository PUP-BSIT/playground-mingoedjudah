import { Subject } from "rxjs";


export class CounterService {
  private count = 0;
  onUpdate = new Subject<number>();

  increment() {
    this.count++;
    this.onUpdate.next(this.count);
  }

  getCount() {
    return this.count;
  }
}
