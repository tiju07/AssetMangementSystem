import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser';
import { Observable, of } from 'rxjs';
import { ɵparseCookieValue } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get('http://localhost:7234/api/v1/Employees', { withCredentials: true })
    }

    getEmployeeByID(id: number) {
        return this.http.get("http://localhost:7234/api/v1/Employees/" + id, { withCredentials: true })
    }

    deleteEmployee(id: number) {
        return this.http.get<HttpResponse<any>>('https://jsonplaceholder.typicode.com/posts/1', { withCredentials: true, observe: 'response' });
    }
}
