import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { JwtDecryptorService } from '../helpers/jwt-decryptor.service';
import { LastActivePageService } from '../services/last-active-page/last-active-page.service';
import { environment as env} from '../../environments/environment.development';
import { IExternalAuth } from '../interfaces/iexternalauth';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService, private router: Router, private cookieService: CookieService, private location: Location, private jwtService: JwtDecryptorService, private lastActivePageService: LastActivePageService, private socialAuthService: SocialAuthService) {}
    
    clientID = env.clientID;
    
    ngOnInit(): void {
        // this.router.onSameUrlNavigation = 'reload';
        // this.authService.extAuthChanged.subscribe( user => {
        //     this.authService.loginWithGoogle();
        //     this.authService.extAuthChanged.subscribe( user => {
        //         const externalAuth: IExternalAuth = {
        //         email: user.email,
        //         name: user.name,
        //         photoUrl: user.photoUrl,
        //         idToken: user.idToken,
        //         provider: user.provider
        //         }
        //     this.validateExternalAuth(externalAuth);
        // })
        // })
        // this.socialAuthService.authState.subscribe((user) => {
        //     console.log("User: "+user);
        //     const externalAuth: IExternalAuth = {
        //         email: user.email,
        //         name: user.name,
        //         photoUrl: user.photoUrl,
        //         idToken: user.idToken,
        //         provider: user.provider
        //         }
        //     this.validateExternalAuth(externalAuth);
        // });
        this.authService.extAuthChanged.subscribe( user => {
            const externalAuth: IExternalAuth = {
                email: user.email,
                name: user.name,
                photoUrl: user.photoUrl,
                idToken: user.idToken,
                provider: user.provider
            }
            this.validateExternalAuth(externalAuth);
        })
    }
    
    
    externalLogin = () => {
        console.log("Google Login Clicked");
        this.authService.loginWithGoogle();
        this.authService.extAuthChanged.subscribe( user => {
            const externalAuth: IExternalAuth = {
            email: user.email,
            name: user.name,
            photoUrl: user.photoUrl,
            idToken: user.idToken,
            provider: user.provider
            }
            this.validateExternalAuth(externalAuth);
        })
    }
    private validateExternalAuth(externalAuth: IExternalAuth) {
        this.authService.externalLogin(externalAuth).subscribe({
            next: (data) => {
                console.log(JSON.stringify(data));
                if (data.status == 200) {
                    this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: 'Login Successful!', life: 1500 });
                    this.cookieService.set('auth-token', data.body.token, { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), secure: true, path: '/' });
                    this.cookieService.set('name', data.body.name, { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), secure: true, path: '/' });
                    this.jwtService.setSubject({ isAuthenticated: true, user: this.cookieService.get('name') });
                    const lastActivePage = this.lastActivePageService.getLastActivePage();
                    this.lastActivePageService.clearLastActivePage()
                    this.router.navigateByUrl(lastActivePage);
                }
                else {
                    console.log(JSON.stringify(data.body));
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: data.body });
                }
          },
            error: (err) => {
              console.log(err);
            }
          });
      }

    passwordVisible = false;

    form = this.fb.group({
        userName: new FormControl('', [Validators.required, Validators.min(5)]),
        password: new FormControl('', [Validators.required]),
    })

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }
    login() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter all required details' });
            return;
        }
        else {
            this.authService.login(this.form.getRawValue()).subscribe({
                next: data => {
                    console.log(JSON.stringify(data));
                    if (data.status == 200) {
                        this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: 'Login Successful!', life: 1500 });
                        this.cookieService.set('auth-token', data.body.token, { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), secure: true, path: '/' });
                        this.cookieService.set('name', data.body.name, { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), secure: true, path: '/' });
                        this.jwtService.setSubject({ isAuthenticated: true, user: this.cookieService.get('name') });
                        const lastActivePage = this.lastActivePageService.getLastActivePage();
                        this.lastActivePageService.clearLastActivePage()
                        this.router.navigateByUrl(lastActivePage);
                    }
                    else {
                        console.log(JSON.stringify(data.body));
                        this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: data.body });
                    }
                },
                error: err => {
                    console.log(JSON.stringify(err));
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: err.error });
                }
            })
        }
    }
}
