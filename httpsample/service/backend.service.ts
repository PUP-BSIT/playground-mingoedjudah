import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IsEvenApiResponse } from '../src/model/http_response';

@Injectable({
  providedIn: 'root'
})

/*
export class BackendService {
  private apiUrl = 'https://api.isevenapi.xyz/api/iseven/';

  constructor(private http: HttpClient) { }

  getIsEven(num: number) {
    const url = this.apiUrl + num;
    return this.http.get(url);
  }
}
*/

/*
export class BackendService {
  private apiUrl = 'https://api.isevenapi.xyz/api/iseven/';

  constructor(private http: HttpClient) { }

  getIsEven(num: number) {
    const url = this.apiUrl + num;
    return this.http.get(url);
  }

  checkNumber(num: number) {
    this.backendService.getIsEven(num)
    .subscribe((data) => {
      console.log(data['iseven']);
    });
  }
}
*/

export class BackendService {
  private apiUrl = 'https://api.isevenapi.xyz/api/iseven/';

  constructor(private http: HttpClient) { }

  getIsEven(num: number) {
    const url = this.apiUrl + num;
    return this.http.get<IsEvenApiResponse>(url);
  }

  getHello() {
    return this.http.get('http://localhost/api/hello.php', {
      responseType: 'text',
    });
  }
}
