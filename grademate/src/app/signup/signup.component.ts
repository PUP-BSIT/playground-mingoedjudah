import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SignupService } from '../service.service';

// Custom validator function for name fields
function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  // Check if the name includes numbers or symbols
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return { 'invalidCharacters': true };
  }

  // Check if the name includes punctuation marks that don't have phonetic significance
  if (/[`~+=_\-[\]\\;:/{}|\\",<>]/.test(value)) {
    return { 'invalidPunctuation': true };
  }

  return null;  // Return null if validation passes
}

// Custom validator function for password complexity
function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  // Password pattern: 8-16 characters, at least one lowercase letter, one uppercase letter, one number, and one special character
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]).{8,16}/.test(value)) {
    return { 'invalidPassword': true };
  }

  return null;  // Return null if validation passes
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  // Academic levels mapped with IDs
  academicLevels = [
    { id: 1, name: 'High School' },
    { id: 2, name: 'College' }
  ];

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required, nameValidator]],
      middle_name: ['', [Validators.required, nameValidator]],
      surname: ['', [Validators.required, nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator]],
      confirm_password: ['', Validators.required],
      university: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Only characters and spaces
      academic_level: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-])[a-zA-Z\d!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]{8,16}$/),
      ]],
    }, {
      validators: this.passwordMatchValidator // Validator for matching password and confirm_password
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.showSnackbar('Please fill in all required fields correctly.', 'Close');
      return;
    }

    const formData = this.signupForm.value;

    // Map academic level name to its corresponding ID
    const academicLevel = this.academicLevels.find(level => level.name === formData.academic_level);
    if (academicLevel) {
      formData.academic_level = academicLevel.id; // Assign the ID to academic_level field
    }

    this.signupService.signup(formData).subscribe(
      response => {
        if (response.status === 201) {
          this.showSnackbar('Signup successful!', 'Close');
          this.signupForm.reset();
        } else {
          this.showSnackbar(`Unexpected response status: ${response.status}`, 'Close');
        }
      },
      error => {
        if (error.message.includes('409')) {
          this.showSnackbar('Account already exists. Please choose another email or username.', 'Close');
        } else {
          this.showSnackbar(`Error during signup: ${error.message}`, 'Close');
        }
      }
    );
  }

  private showSnackbar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Center horizontally
    config.verticalPosition = 'bottom'; // Align bottom vertically
  
    this.snackBar.open(message, action, config);
  }  

  // Custom validator for matching password and confirm_password
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}
