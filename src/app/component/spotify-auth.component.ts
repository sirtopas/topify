import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'spotify-auth',
    template: `<h3>Authorizing</h3>`
})
export class SpotifyAuthComponent implements OnInit {

    public constructor(
        private authService: AuthService,
        private router: Router) { }

    public ngOnInit(): void {
        this.authService.authorized();
        this.router.navigate(['/']);
    }
}
