import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { TokenService } from './token.service';
import { SpotifyAuthResponse } from '../shared/spotify-auth-response';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private tokenService: TokenService) { }

    public canActivate(
        next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivateChild(next, state);
    }

    public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const response = this.extractApiResponse(next.fragment);
        if (response) {
            this.tokenService.setAuthToken(response);
        }
        return !!response;
    }

    private extractApiResponse(fragment: any): SpotifyAuthResponse | null {
        console.log(fragment);

        if (!!fragment) {
            const response = new SpotifyAuthResponse();
            //todo: make better -_-
            var access_token = fragment.substring(
                fragment.indexOf("=") + 1,
                fragment.indexOf("&")
            );

            var expiresIn = fragment.substring(
                fragment.indexOf("expires_in=") + 11,
                fragment.lastIndexOf("&")
            );

            response.access_token = access_token;
            response.expires_in = expiresIn;
            this.setAuthInLocalStorage(response);

            return response;
        }
        return null;
    }

    private setAuthInLocalStorage(response: SpotifyAuthResponse): void {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('expires_in', response.expires_in.toString());
    }
}
