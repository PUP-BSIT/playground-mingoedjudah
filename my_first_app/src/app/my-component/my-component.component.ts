import { Component, OnChanges, Input, ViewChild, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css'
})
export class MyComponentComponent implements OnChanges, AfterViewInit, AfterViewChecked {
  @Input() myValue = 0;

  ngOnChanges() {
    console.log('ngOnChanges', this.myValue);
  }

  @ViewChild('myDiv') myDiv!: ElementRef;
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit',  this.myDiv.nativeElement.innerHTML);
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }
}
