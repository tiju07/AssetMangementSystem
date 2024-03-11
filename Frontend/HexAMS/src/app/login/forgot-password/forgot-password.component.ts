import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtDecryptorService } from '../../helpers/jwt-decryptor.service';
import { LastActivePageService } from '../../services/last-active-page/last-active-page.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    roles: any[] = [{ label: 'Admin', value: 'admin' }, { label: 'Employee', value: 'employee' }];
    selectedRole!: string;
    // isValid = false;
    strongPassword = false;
    currPwd = '';

    pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService, private router: Router, private cookieService: CookieService, private jwtService: JwtDecryptorService, private lastActivePageService: LastActivePageService) {
    }

    form = this.fb.group({
        username: new FormControl('', [Validators.required, Validators.min(5)]),
        password: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
        confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator })

    onPasswordChange() {
        this.currPwd = this.form.get('password')?.value as string;
    }

    // ngOnInit() {
    //     this.form.get('password')?.disable();
    //     this.form.get('confirmPassword')?.disable();
    // }

    passwordMatchValidator(control: FormGroup) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { passwordsDoNotMatch: true };
    }

    onPasswordStrengthChanged(event: boolean) {
        this.strongPassword = event;
    }

    passwordVisible = false;
    confirmPasswordVisible = false;

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    toggleConfirmPasswordVisibility() {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    updatePassword() {
        if (this.selectedRole == undefined) {
            console.log("Select role!")
            this.messageService.add({ key: 'success', severity: 'error', summary: 'Error', detail: 'Please select a role!' });
            return;
        }
        if (!this.form.valid) {
            this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'Please enter all required details' });
            return;
        }
        this.authService.updatePassword(this.form.getRawValue(), this.selectedRole).subscribe({
            next: (data) => {
                if (data.status == 200) {
                    this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: 'Password changed successfully!' });
                    setTimeout(() => this.router.navigate(['/login']), 1500);
                }
                else {
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: "Failed Updating Password!" });
                }
            },
            error: (err) => {
                this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: err.error });
                console.log(err)
            }
        })
    }
}
