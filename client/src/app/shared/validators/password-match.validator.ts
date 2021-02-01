import { FormGroup, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function PasswordMatch(formGroup: FormGroup): ValidatorFn {
  const password = formGroup.controls.password;
  const confirmPassword = formGroup.controls.confirm_password;
  // set error on matchingControl if validation fails
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mustMatch: true });
  }
  return;
}
