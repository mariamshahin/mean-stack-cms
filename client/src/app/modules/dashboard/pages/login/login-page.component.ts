import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControlModel } from 'app/shared/components/ui-elements/form-control/form-control.model';
import { EmailPattern } from 'app/shared/validators';
import { DashboardState } from '../../store';
import { login } from '../../store/login/login.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, EmailPattern]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  formTemplateControls = [
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
  ];

  constructor(private store: Store<DashboardState>) {}

  get controls(): object {
    return this.formTemplateControls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(login({ payload: this.loginForm.value }));
  }
}
