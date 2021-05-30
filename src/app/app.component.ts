import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { HistoryService } from './service/history.service';
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
        private authService: AuthService,
        private historyService: HistoryService,
        private router: Router
    ) {
        this.tokenSvc.authTokens.subscribe(token => {
            if (token) {
                this.authorized = true;
                this.historyService.getHistory().subscribe(history => {
                    console.log(history);
                })
            }
        });
        this.authService.authorized
    }

    public logout(): void {
        this.tokenSvc.clearToken();
        this.router.navigate(['login']);
    }
}
