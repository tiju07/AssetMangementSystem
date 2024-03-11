import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser';
import { Observable, of } from 'rxjs';
import { ɵparseCookieValue } from '@angular/common';
import { IEmployee } from '../../interfaces/iemployee';
import { IUserProfile } from '../../interfaces/iuserprofile';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get('http://localhost:7234/api/v1/Employees', { withCredentials: true, observe: 'response' })
    }

    getEmployeeByID(id: number) {
        return this.http.get("http://localhost:7234/api/v1/Employees/" + id, { withCredentials: true, observe: 'response' })
    }

    updateEmployee(id: number, employee: IUserProfile) {
        return this.http.put<any>("http://localhost:7234/api/v1/Employees/" + id, employee, { withCredentials: true, observe: 'response' })
    }

    deleteEmployee(id: number) {
        return this.http.delete<any>("http://localhost:7234/api/v1/Employees/" + id, { withCredentials: true, observe: 'response' });
    }
}
