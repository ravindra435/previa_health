import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   baseUrl = environment.url

  constructor(private http:HttpClient,private router:Router) { }

  signIn(data:Object): Observable<any>{
   
   try{
    return this.http.post(this.baseUrl + 'user/logIn', data)
    .pipe(catchError(this.handleError));
    //   map((resp) => resp));
    } catch (error) {
      return error;
    }

  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    Swal.fire({
      text: `${errorMessage}`,
      icon: 'warning',
      confirmButtonText: 'ok'
    }).then(result=>{
      if(errorMessage === 'Unauthorized'){
        console.log("suresh")
        // localStorage.removeItem('user_token')
        this.router.navigateByUrl('/session/signIn')
        // localStorage.removeItem('user_details')
      }
    })
    return throwError(errorMessage);
  }

}
