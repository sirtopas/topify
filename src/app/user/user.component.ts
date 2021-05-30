import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
    selector: 'user-info',
    template: 'Hello'
})
export class UserComponent implements OnInit {

    public constructor(private tokenService: TokenService) { }

    ngOnInit(): void {
    }
}
