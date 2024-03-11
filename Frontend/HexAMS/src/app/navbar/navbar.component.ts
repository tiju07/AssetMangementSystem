import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { JwtDecryptorService } from '../helpers/jwt-decryptor.service';
import { AuthService } from '../services/auth/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    constructor(private cookieService: CookieService, private messageService: MessageService, private router: Router, private jwtService: JwtDecryptorService, private authService: AuthService) {

    }

    toggleNavbarMobile(event: Event) {
        const navbar = document.querySelector('#navbar') as HTMLElement;
        navbar.classList.toggle('navbar-mobile');
        (event.currentTarget as HTMLElement).classList.toggle('bi-list');
        (event.currentTarget as HTMLElement).classList.toggle('bi-x');
    }


    user!: string | undefined;
    isAuthenticatd!: boolean;
    ngOnInit() {
        this.jwtService._demoSubject.subscribe(res => {
            this.isAuthenticatd = res.isAuthenticated;
            this.user = res.user;
            console.log("State: " + JSON.stringify(res))
        });
    }

    logout() {
        this.authService.logout().subscribe();
        console.log("Cookies present before?:" + this.cookieService.check('auth-token') && this.cookieService.check('name'));
        this.cookieService.deleteAll('/', 'localhost', false, 'Lax');
        console.log("Cookies present after?:" + this.cookieService.check('auth-token') && this.cookieService.check('name'));
        if (!this.cookieService.check('auth-token') && !this.cookieService.check('name')) {
            this.messageService.add({ key: 'success', severity: "success", summary: "Success", detail: "Logout Successful!", life: 1500 });
            this.jwtService.setSubject({ isAuthenticatd: false, user: undefined });
            this.router.navigate(['/login']);
        }
        else {
            this.messageService.add({ key: 'error', severity: "error", summary: "Error", detail: "Logout Failed!" });
        }
    }
}
