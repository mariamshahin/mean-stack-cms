import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

// custom validator to check that email field matchs tha pattern
export function EmailPattern(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const email = control.value;
  // set error on matchingControl if validation fails
  if (!email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
    return { email: true };
  }
  return;
}
