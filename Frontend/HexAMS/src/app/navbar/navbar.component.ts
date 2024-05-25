import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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

    @ViewChild('navbar') navbar!: ElementRef;

    nav = document.querySelector('#navbar') as HTMLElement;

    @HostListener('click', ['$event', '$event.target'])
    toggleDropdown(event: Event, targetElement: HTMLElement) {
        console.log("Clicked!")
        const nav = document.querySelector('#navbar') as HTMLElement;
        console.log(nav);
        if (event.target instanceof HTMLElement && targetElement.parentElement?.classList.contains('dropdown') && nav.classList.contains('navbar-mobile')) {
            console.log("Clicked2!")
            event.preventDefault();
            targetElement.nextElementSibling?.classList.toggle('dropdown-active');
        }
    }




    user!: string | undefined;
    isAuthenticatd!: boolean;
    ngOnInit() {
        this.jwtService._demoSubject.subscribe(res => {
            this.isAuthenticatd = res.isAuthenticated;
            this.user = res.user.toString().split(' ')[0];
            console.log("State: " + JSON.stringify(res))
        });
    }

    onActivateRequestUrls() {
        const currentUrl = this.router.url;
        if (currentUrl.includes("request")) {
            return true;
        }
        return false;
    }

    onActivateAssetUrls() {
        const currentUrl = this.router.url;
        if ((currentUrl.includes("asset") || currentUrl.includes('allocation')) && !currentUrl.includes('audit') && !currentUrl.includes('borrow') && !currentUrl.includes('service')) {
            return true;
        }
        return false;
    }

    logout() {
        this.authService.logout().subscribe(data => console.log(data));
        this.cookieService.set('auth-token', '', { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), secure: true, path: '/' });
        this.cookieService.set('name', '', { sameSite: 'None', expires: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), secure: true, path: '/' });
        if (!this.cookieService.check('auth-token') && !this.cookieService.check('name')) {
            this.messageService.add({ key: 'success', severity: "success", summary: "Success", detail: "Logout Successful!", life: 1500 });
            this.jwtService.setSubject({ isAuthenticated: false, user: undefined });
            this.router.navigate(['/login']);
        }
        else {
            this.messageService.add({ key: 'error', severity: "error", summary: "Error", detail: "Logout Failed!" });
        }
    }
}
