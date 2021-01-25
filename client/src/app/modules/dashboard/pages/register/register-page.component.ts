import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordMatch } from 'app/shared/validators/password-match.validator';
import { FormControlModel } from 'app/shared/components/ui-elements/form-control/form-control.model';

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

  formTemplateControls = [
    new FormControlModel({
      name: 'username',
      placeholder: 'Username',
    }),
    new FormControlModel({
      type: 'email',
      name: 'email',
      placeholder: 'Email',
    }),
    new FormControlModel({
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    }),
    new FormControlModel({
      type: 'password',
      name: 'confirm_password',
      placeholder: 'Confirm password',
    }),
  ];
  constructor(private router: Router) {}

  get rf() {
    return this.registerForm.controls;
  }

  get controls() {
    return this.formTemplateControls;
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
