import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmailPattern, PasswordMatch } from 'app/shared/validators';
import { FormControlModel } from 'app/shared/components/ui-elements/form-control/form-control.model';
import { DashboardState } from '../../store';
import { register } from '../../store/register/register.actions';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerFormSubmitted = false;
  subscription: Subscription;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, EmailPattern]),
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
      errors: [{ errName: 'PasswordMatch', errMsg: 'pa' }],
    }),
  ];

  constructor(private store: Store<DashboardState>) {}

  get controls(): object {
    return this.formTemplateControls;
  }

  onSubmit(): void {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(register({ payload: this.registerForm.value }));
  }
}
