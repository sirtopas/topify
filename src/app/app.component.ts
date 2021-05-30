import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'topify';
    authorized = false;

    constructor(
        private tokenSvc: TokenService,
        private authService: AuthService
    ) {
        this.tokenSvc.authTokens.subscribe(token => {
            if (token) {
                this.authorized = true;
            }
        });
        this.authService.authorized;
    }

    public logout(): void {
        this.tokenSvc.clearToken();
    }

    public login(): void {
        this.authService.authorize();
    }
}
