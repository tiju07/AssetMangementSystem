import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { JwtDecryptorService } from '../helpers/jwt-decryptor.service';
import { LastActivePageService } from '../services/last-active-page/last-active-page.service';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    ngOnInit(): void {
        this.router.onSameUrlNavigation = 'reload';
    }
    passwordVisible = false;
    
    constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService, private router: Router, private cookieService: CookieService, private location: Location, private jwtService: JwtDecryptorService, private lastActivePageService: LastActivePageService) {
    }

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
