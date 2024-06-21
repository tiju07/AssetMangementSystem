import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { ILogin } from '../../interfaces/ilogin';
import { CookieService } from 'ngx-cookie-service';
import { IForgotPassword } from '../../interfaces/iforgotpassword';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { IExternalAuth } from '../../interfaces/iexternalauth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private cookieService: CookieService, private externalAuthService: SocialAuthService) { 
        this.externalAuthService.authState.subscribe((user) => {
            console.log(user)
            this.extAuthChangeSub.next(user);
          })
    }

    url = environment.apiUrl;
    private extAuthChangeSub = new Subject<SocialUser>();
    public extAuthChanged = this.extAuthChangeSub.asObservable();


    login(credentials: ILogin) {
        return this.http.post<any>(`${this.url}/Login`, credentials, { withCredentials: true, observe: 'response' });
    }

    public loginWithGoogle() {
        this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    public externalLogin(data: IExternalAuth){
        return this.http.post<any>(`${this.url}/Login/Google`, data, { withCredentials: true, observe: 'response' });
    }

    register(userData: IUser, role: string) {
        if (role == 'admin') {
            return this.http.post<any>(`${this.url}/Admin/Register`, userData, { observe: 'response' });
        }
        else {
            return this.http.post<any>(`${this.url}/Employee/Register`, userData, { observe: 'response' });
        }
    }

    validateUsernameOrEmail(email: string, role: string) {
        if (role == 'admin') {
            return this.http.post<any>(`${this.url}/Admins/ValidateUsernameOrEmail`, email, { observe: 'response' });
        }
        else {
            return this.http.post<any>(`${this.url}/Employees/ValidateUsernameOrEmail`, email, { observe: 'response' });
        }
    }

    updatePassword(credentials: ILogin, role: string) {
        console.log(role);
        if (role == 'Admin' || role == 'admin') {
            return this.http.post<any>(`${this.url}/Admins/UpdatePassword`, credentials, { observe: 'response' });
        }
        else {
            return this.http.post<any>(`${this.url}/Employees/UpdatePassword`, credentials, { observe: 'response' });
        }
    }

    sendPasswordResetLink(data: IForgotPassword) {
        console.log(data);
        return this.http.post<any>(`${this.url}/ForgotPassword`, data, { observe: 'response' });
    }

    logout() {
        return this.http.post(`${this.url}/Logout`, { withCredentials: true, observe: 'response' });
    }
}
