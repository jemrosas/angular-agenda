import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';
import { UserDataService } from '../../services/user-data.service';
import { Observable } from 'rxjs';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ErrorStateMatcherModule } from '../modules/error-state-matcher/error-state-matcher.module';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})


export class FormComponent implements OnInit {

  // Declaramos el tipo de valores a usar para el datepicker
  minDate: Date;
  maxDate: Date;

  // Declaramos la variable que contendrá la lista de usuarios
  usersList : Array <User> = []

  // Declaramos la variable del FormGroup
  userModel!: FormGroup;

  // Establecemos los valores iniciales del usuario
  user : User = {
    id             : '',
    name            : '',
    surname         : '',
    age             : '',
    idCard          : '',
    birthdate       : '',
    favouriteColor  : '',
    gender          : ''
  }

  // Establecemos la variable que mostrará el error en el input datepicker 
  customErrorStateMatcher = new ErrorStateMatcherModule()


  constructor(
    private dataService: UserDataService,
    private validators: ValidatorsService,
    public dialog: MatDialog
    ) {
    // Establecemos la fecha mínima en el 1 de enero de hace 125 años, respecto a la fecha actual.
    const currentYear = new Date().getFullYear();
    const currentDate = new Date()
    this.minDate = new Date(currentYear - 125, 0, 1);
    this.maxDate = new Date(currentDate);
    }


  ngOnInit(): void {

      this.userModel= new FormGroup ({
        id            : new FormControl(this.user.id),
        name          : new FormControl(this.user.name,           [ Validators.required, Validators.minLength(3) ]) ,
        surname       : new FormControl(this.user.surname,        [ Validators.required, Validators.minLength(3) ]) ,
        age           : new FormControl(this.user.age,            [ Validators.required, Validators.min(0), Validators.max(125) ]),
        idCard        : new FormControl(this.user.idCard,         [ Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i) ]),
        birthdate     : new FormControl(this.user.birthdate,      [ Validators.required ]),
        favouriteColor: new FormControl(this.user.favouriteColor, [ Validators.required, Validators.minLength(3) ]),
        gender        : new FormControl(this.user.gender,         [ Validators.required ])
      }, 
      {
        validators: this.validators.birthdateAgeMatch
      })

  this.loadUsers()

  }



  //Funciones del formulario

  loadUsers(){
    return this.dataService.getUsers()
    .subscribe(res => this.usersList = res)
  }

  registerUser() : void {

    let user = this.userModel.value
    // Declaramos un observable que supervise las llamadas, para no repetir código en el if de abajo
    let call : Observable < any >
  
    // Buscamos en el array de usuarios si existe alguno con esa id
    let valor = this.usersList.some(element => element.id === user.id)
    // Establecemos la condición para crear o actualizar un usuario
    if( valor === false ){
      call = this.dataService.createUser( user )
    }else{
      call = this.dataService.updateUser( user )
    }
    // Recogemos la info resultante de la llamada y la mostramos en una modal
    call.subscribe( res =>{
      this.dialog.open(DialogResultComponent,{
        data: res
      });
    // Llamamos de nuevo a la BD para actualizar los datos
      this.loadUsers()
    })
      
    }

  //Funciones para los botones de las tarjetas de usuario

  findUser( user:User ) {

    this.dataService.findUser( user.id )
    .subscribe(res => this.userModel.reset(res))
  }

  removeUser ( user:User, index:number ) {
    //Eliminamos el usuario del array
    this.usersList.splice(index, 1)

    //llamamos a la DB para que borre el usuario
    this.dataService.removeUser( user.id )
    .subscribe( res =>{
      this.dialog.open(DialogResultComponent,{
        data: res
      });
    })
  }

}


