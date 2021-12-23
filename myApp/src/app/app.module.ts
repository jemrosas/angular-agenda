import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './components/modules/angular-material/angular-material.module';
import { DateAdapterModule } from './components/modules/date-adapter/date-adapter.module';
import { MatDialogModule }  from '@angular/material/dialog';
import { DialogResultComponent } from './components/dialog-result/dialog-result.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { UppercasePipe } from './pipes/uppercase.pipe'



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UserListComponent,
    DialogResultComponent,
    CapitalizePipe,
    UppercasePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    DateAdapterModule,
    MatDialogModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
