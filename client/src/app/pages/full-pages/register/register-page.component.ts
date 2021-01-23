import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordMatch } from 'app/shared/validators/password-match.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerFormSubmitted = false;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl('', [Validators.required]),
    },
    {
      validators: PasswordMatch,
    }
  );

  constructor(private router: Router) {}

  get rf() {
    return this.registerForm.controls;
  }

  //  On submit click, reset field value
  onSubmit() {
    this.registerFormSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    //this.router.navigate(['/login']);
  }
}
