import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({ keyword: [''] });
    this.searchForm
      .get('keyword')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log(value);
      });
  }
}
