import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';

@Component({
  selector: 'app-second',
  styleUrl: './second.component.css',
  template: `the value of ID is {{ id }}`, 
})
export class SecondComponent implements OnInit {
  id = '';

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }
}
