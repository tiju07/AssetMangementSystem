import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import $ from 'jquery';

declare var bootstrap: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

    roles: any[] = [{ label: 'Admin', value: 'admin' }, { label: 'Employee', value: 'employee' }];
    selectedRole!: string;
    weak: RegExp = new RegExp("/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/");
    medium: RegExp = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/");
    strong: RegExp = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/");

    constructor(private fb: FormBuilder) {
    }

    gender = ['Male', 'Female', 'Others'];
    pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    @ViewChild('passwordPopover') el!: ElementRef;

    form = this.fb.group({
        id: new FormControl(0),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.pattern)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        gender: new FormControl('', [Validators.required]),
        contactNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
        address: new FormControl('')
    }, { validators: this.passwordMatchValidator });

    passwordMatchValidator(control: FormGroup) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { passwordsDoNotMatch: true };
    }

    registerUser() {
        console.log(this.form.value);
    }


    calculatePasswordStrength(password: string): number {
        // Implement your logic to calculate password strength
        // For example, you can calculate it based on the length of the password
        let upperCase = new RegExp('[A-Z]').test(password);
        let lowerCase = new RegExp('[a-z]').test(password);
        let number = new RegExp('[0-9]').test(password);
        let symbol = new RegExp('[!@#$%^&*?_~-]').test(password);
        let score = 0;
        if (upperCase) score += 10;
        if (lowerCase) score += 10;
        if (number) score += 20;
        if (symbol) score += 20;
        if (password.length >= 8) score += 20;
        return Math.min(100, score);
    }

    getPasswordSuggestions(password: string): string {
        return `
                <p>Suggestions for a stronger password:</p>
                <ul>
                    <li>Use a mix of uppercase and lowercase letters</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character</li>
                    <li>Make it at least 8 characters long</li>
                </ul>
            `;
    }


    ngOnInit(): void {

        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popover => {
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            let popoverInstance: any;
            const createPopover = () => {
                const passwordStrength = calculatePasswordStrength(passwordInput.value);
                const suggestions = getPasswordSuggestions(passwordInput.value);
                const popoverContent = `
                    <style>
                    .password-strength-meter {
                        width: 100%;
                        height: 10px;
                        background-color: lightgray;
                        border-radius: 5px;
                        margin-bottom: 5px;
                        overflow: hidden; /* Ensure strength bar does not overflow */
                    }
                    
                    .strength {
                        height: 100%;
                        border-radius: 5px;
                        transition: width 0.3s ease-in-out;
                    }
                    
                    /* Define strength levels and colors */
                    .weak {
                        background-color: red;
                    }
                    
                    .medium {
                        background-color: orange;
                    }
                    
                    .strong {
                        background-color: green;
                    }
                    
                    </style>
                    <div>
                        <div class="password-strength-meter">
                            <div class="strength" style="width: ${passwordStrength}%"></div>
                        </div>
                        <div class="password-strength-text">Strength: ${passwordStrength}%</div>
                        <div class="password-suggestions">${suggestions}</div>
                    </div>
                `;
                popoverInstance = new bootstrap.Popover(popover, {
                    html: true,
                    container: 'body',
                    placement: 'right',
                    trigger: 'focus',
                    content: popoverContent
                });
            };

            createPopover();
            // const popoverInstance = new bootstrap.Popover(popover, {
            //     html: true,
            //     container: 'body',
            //     placement: 'right',
            //     trigger: 'focus',
            //     content: function () {
            //         const passwordStrength = calculatePasswordStrength(password.value);
            //         const suggestions = getPasswordSuggestions(password.value);
            //         console.log("Password: " + password.value);
            //         console.log("Password strength: " + passwordStrength);
            //         return `
            //             <div>
            //                 <div class="password-strength-meter">
            //                     <div class="strength" style="width: ${passwordStrength}%">${passwordStrength}</div>
            //                 </div>
            //                 <div class="password-suggestions">${suggestions}</div>
            //             </div>
            //         `;

            //     }
            // });

            passwordInput.addEventListener('input', () => {
                var elm = bootstrap.Popover.getInstance(popover);
                const passwordStrength = calculatePasswordStrength(this.form.get('password')?.value);
                console.log("Password Strength: " + passwordStrength)
                const suggestions = getPasswordSuggestions(this.form.get('password')?.value);
                console.log(elm);
                elm.tip.innerHTML = `
                <style>
                .password-strength-meter {
                    width: 100%;
                    height: 10px;
                    background-color: lightgray;
                    border-radius: 5px;
                    margin-bottom: 5px;
                    overflow: hidden; /* Ensure strength bar does not overflow */
                }
                
                .strength {
                    height: 100%;
                    border-radius: 5px;
                    transition: width 0.3s ease-in-out;
                }
                
                /* Define strength levels and colors */
                .weak {
                    background-color: red;
                }
                
                .medium {
                    background-color: orange;
                }
                
                .strong {
                    background-color: green;
                }
                
                </style>
                <div class="popover-arrow" style="position: absolute; top: 0px; transform: translate3d(0px, 98.4px, 0px);"></div><div class="popover-body"><div>
                        <div class="password-strength-meter">
                            <div class="strength" style="width: ${passwordStrength}%"></div>
                        </div>
                        <div class="password-strength-text">Strength: ${passwordStrength}%</div>
                        <div class="password-suggestions">
                    <div class="password-suggestions">${suggestions}</div>
                </div>
                    </div>
                </div>
                `;
            })

            function calculatePasswordStrength(password: string): number {
                // Implement your logic to calculate password strength
                // For example, you can calculate it based on the length of the password
                let upperCase = new RegExp('[A-Z]').test(password);
                let lowerCase = new RegExp('[a-z]').test(password);
                let number = new RegExp('[0-9]').test(password);
                let symbol = new RegExp('[!@#$%^&*?_~-]').test(password);
                let score = 0;
                if (upperCase) score += 20;
                if (lowerCase) score += 20;
                if (number) score += 20;
                if (symbol) score += 20;
                if (password.length >= 8) score += 20;
                return Math.min(100, score);
            }

            function getPasswordSuggestions(password: string): string {
                // Implement your logic to generate suggestions for a stronger password
                // For example, you can check for the presence of uppercase, lowercase, numbers, special characters, etc.
                return `
                    <p>Suggestions for a stronger password:</p>
                    <ul>
                        <li>Use a mix of uppercase and lowercase letters</li>
                        <li>Include at least one number</li>
                        <li>Include at least one special character</li>
                        <li>Make it at least 8 characters long</li>
                    </ul>
                `;
            }
        });
    }
}