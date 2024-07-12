import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-first',
  styleUrl: './first.component.css',
  template: `The passed parameters are {{ queryParamString | json }}`,
})
export class FirstComponent implements OnInit {
  queryParamString = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.queryParamString = JSON.stringify(params);
    });
  }

}
