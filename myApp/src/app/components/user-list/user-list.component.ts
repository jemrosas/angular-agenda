import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() user: any = [{}]
  @Input() index: number = 0;

  @Output() userSelected = new EventEmitter<any>()
  @Output() userDeleted  = new EventEmitter<any>()

  
  constructor() {}

  ngOnInit(): void {}

  // Funciones presentes en las tarjetas que emitiran un evento y recibirán datos del componente padre "form"

  findUser(){
    this.userSelected.emit( this.user )
  }

  removeUser(){
    this.userDeleted.emit( this.user)
  }
}
