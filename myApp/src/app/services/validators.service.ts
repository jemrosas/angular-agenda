import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  birthdateAgeMatch: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    const birthDate = control.get('birthdate');
    const age = control.get('age');
  
    const timeDiff = Math.abs(Date.now() - new Date(birthDate!.value).getTime());
    const calculatedAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  
    return calculatedAge != age!.value ? { dateAndAgeDontMatch: true} : null;
  }
}
