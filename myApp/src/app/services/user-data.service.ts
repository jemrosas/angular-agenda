import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor( private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(`${ environment.url }/users`)
  }

  createUser( user: User ){
     //Eliminamos el campo id antes de enviar la info a la DB
    const userDB = {
      ...user
    };
    delete userDB.id;
      return this.http.post(`${ environment.url }/users`, userDB)
    }
  

  findUser( id: String ){
    return this.http.get(`${ environment.url }/users/${ id }`)
  }

  updateUser ( user: User ){
    //Eliminamos el campo id antes de enviar la info a la DB
    const userDB = {
      ...user
    };
    delete userDB.id;

    return this.http.put(`${ environment.url }/users/${ user.id }`, userDB)
  }

  removeUser( id: String ){
    return this.http.delete(`${ environment.url }/users/${ id }`)
  }
  
}
