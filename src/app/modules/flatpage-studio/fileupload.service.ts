import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  
  baseApiUrl = 'http://localhost:3000/studio';

  constructor(private http: HttpClient) {}
  upload(file: File): Observable<any> {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');  
    // Create form data
    let formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'))
  
    return this.http.post(this.baseApiUrl, formData);
  }
}
