import { FormControl } from '@angular/forms';

export function matchInput(otherInput : string) {
  let mainControl : FormControl;
  let otherControl : FormControl;

  return function validateInputs(control : FormControl) {
    if (!control.parent) return null;

    if (!mainControl) {
      mainControl = control;
      otherControl = mainControl.parent.get(otherInput) as FormControl;
      if (!otherControl) throw new Error('validateInputs(): Other input not found')
      otherControl.valueChanges.subscribe(value => {
        mainControl.updateValueAndValidity();
      })
    }

    if (!otherControl) return null;

    if (otherControl.value !== mainControl.value) return {match: "Whoops! Your passwords don't match!"}

    return null;
  }
}
