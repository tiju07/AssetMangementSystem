import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtDecryptorService } from './helpers/jwt-decryptor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private cookieService: CookieService, private jwtService: JwtDecryptorService) { }
    isAuthenticated!: boolean;
    user!: string | undefined;
    ngOnInit() {
        this.isAuthenticated = this.cookieService.check('auth-token');
        this.user = this.cookieService.get('name');
        if (this.isAuthenticated) {
            this.jwtService.setSubject({ isAuthenticated: this.isAuthenticated, user: this.user });
        }
        else {
            this.jwtService.setSubject({ isAuthenticated: false, user: undefined });
        }
    }

    onActivate(_event: any) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}
