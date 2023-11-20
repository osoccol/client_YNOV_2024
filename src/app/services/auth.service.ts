import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private $g_token: string = '';

  constructor(private http: HttpClient) {
    this.$g_token = window.sessionStorage.getItem('g_token') || '';
  }

  hasToken() {
    return this.$g_token != '';
  }


  loginWithGoogle() {    
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseUrl + '/api/users/loginwithgoogle', { token: this.$g_token }).subscribe((response) => {
        console.log(response);
        resolve(response);
      })
    })
  }
}
