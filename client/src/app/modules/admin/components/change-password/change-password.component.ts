import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectAdmin } from 'app/modules/admin/store';
import { PasswordMatch } from 'app/shared/validators';
import { FormControlModel } from 'app/shared/components/ui-elements/form-control/form-control.model';
import { changePassword } from '../../store/change-password/change-password.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) ngForm: NgForm;

  response$ = this.store.pipe(
    select(selectAdmin),
    withLatestFrom((state) => state.changePassword.response)
  );
  subscription: Subscription;
  passwordForm = new FormGroup(
    {
      old_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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
      type: 'password',
      name: 'old_password',
      placeholder: 'Old password',
    }),
    new FormControlModel({
      type: 'password',
      name: 'password',
      placeholder: 'New password',
    }),
    new FormControlModel({
      type: 'password',
      name: 'confirm_password',
      placeholder: 'Confirm new password',
    }),
  ];

  constructor(private store: Store) {}

  get controls(): object {
    return this.formTemplateControls;
  }

  ngOnInit() {
    this.subscription = this.response$.subscribe((res) =>
      res ? this.ngForm.resetForm() : null
    );
  }

  onSubmit(): void {
    const {
      old_password,
      password,
      confirm_password,
    } = this.passwordForm.controls;
    if (this.passwordForm.invalid) {
      return;
    }
    this.store.dispatch(
      changePassword({
        payload: {
          old_password: old_password.value,
          new_password: password.value,
          confirm_new_password: confirm_password.value,
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
