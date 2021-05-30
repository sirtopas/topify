import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SpotifyAuthResponse } from '../shared/spotify-auth-response';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private tokenSvc: TokenService) { }

    public canActivate(
        next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivateChild(next, state);
    }

    public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const response = this.extractApiResponse(next.fragment);
        if (response) {
            this.tokenSvc.setAuthToken(response);
        }
        return !!response;
    }

    private extractApiResponse(fragment: any): SpotifyAuthResponse | null {
        console.log(fragment);

        if (!!fragment) {
            const test = new SpotifyAuthResponse();
            //todo: take from response
            test.access_token = 'BQAzzf_xD800EVgP_7vkieueOXnO8VjJN3rFeS0mQiUSdtvzxaIvTEp_FVUDUkEXXVYZ7n_RYvcsBC3ClNyEcvQafxR7Ny69MLlQiRu8bIt1MPWzJNTi72zLfV79OmgCBEw1XujAfv00srgwI2BHlibCXA';
            return test;
        }
        return null;
    }
}
