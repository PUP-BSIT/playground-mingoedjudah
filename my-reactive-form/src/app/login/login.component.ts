import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

/*
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    console.log(this.loginForm.value);
  }

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passControl() {
    return this.loginForm.get('password')!;
  }
}
*/

/*
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.failIfHasTest]],
      password: ['', Validators.required],
    });
  }

  failIfHasTest(control: AbstractControl) {
    if (!control.value.toLowerCase().includes('test')) {
      return null;
    }
    return { test_data: 'value is invalid' };
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    console.log(this.loginForm.value);
  }

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passControl() {
    return this.loginForm.get('password')!;
  }
}
*/

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [this.failIfHasWord('bad', 'bad_word', 'Contain bad word!')]],
      password: ['', Validators.required],
    });
  }

  failIfHasWord(word: string, errCode: string, errMsg: String): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value.toLowerCase().includes(word)) {
        return null;
      }
      return { [errCode]: errMsg };
    };
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    console.log(this.loginForm.value);
  }

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passControl() {
    return this.loginForm.get('password')!;
  }
}