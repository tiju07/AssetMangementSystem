import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { ILogin } from '../../interfaces/ilogin';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    login(credentials: ILogin, role: string) {
        if (role == 'admin') {
            return this.http.post<any>('http://localhost:7234/api/v1/Admin/Login', credentials, { withCredentials: true, observe: 'response' });
        }
        else {
            return this.http.post<any>('http://localhost:7234/api/v1/Employee/Login', credentials, { withCredentials: true, observe: 'response' });
        }
    }

    register(userData: IUser, role: string) {
        if (role == 'admin') {
            return this.http.post<any>('http://localhost:7234/api/v1/Admin/Register', userData, { observe: 'response' });
        }
        else {
            return this.http.post<any>('http://localhost:7234/api/v1/Employee/Register', userData, { observe: 'response' });
        }
    }

    validateUsernameOrEmail(email: string, role: string) {
        if (role == 'admin') {
            return this.http.post<any>('http://localhost:7234/api/v1/Admins/ValidateUsernameOrEmail', email, { observe: 'response' });
        }
        else {
            return this.http.post<any>('http://localhost:7234/api/v1/Employees/ValidateUsernameOrEmail', email, { observe: 'response' });
        }
    }

    updatePassword(credentials: ILogin, role: string) {
        if (role == 'admin') {
            return this.http.post<any>('http://localhost:7234/api/v1/Admins/UpdatePassword', credentials, { observe: 'response' });
        }
        else {
            return this.http.post<any>('http://localhost:7234/api/v1/Employees/UpdatePassword', credentials, { observe: 'response' });
        }
    }

    logout() {
        return this.http.post('http://localhost:7234/api/v1/Auth/Logout', { withCredentials: true, observe: 'response' });
    }
}
