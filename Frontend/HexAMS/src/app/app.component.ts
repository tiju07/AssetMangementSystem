import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'HexAMS';

    onActivate(_event: any) {
        // window.scroll(0,0);

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        //or document.body.scrollTop = 0;
        //or document.querySelector('body').scrollTo(0,0)
    }
}
