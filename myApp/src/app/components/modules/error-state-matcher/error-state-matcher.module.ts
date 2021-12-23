import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ErrorStateMatcherModule implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null, 
    form: FormGroupDirective | NgForm | null): boolean {
      //Especificamos que salte el error cuando el control haya sido tocado y el formulario contenga un error específico
      return control?.dirty && form!.errors?.dateAndAgeDontMatch
  } 
}
