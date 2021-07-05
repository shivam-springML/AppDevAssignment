import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BASE_URL = environment.BASE_URL;
  API_ENDPOINT = environment.BASE_URL;
  constructor(private http:HttpClient) { }

  uploadFile(file):any{
    return this.http.post(`${this.API_ENDPOINT}/upload/uploadFile`, file);
  }
  getFiles(payload):any{
    return this.http.post(`${this.API_ENDPOINT}/upload/getFiles`, payload)
  }
}