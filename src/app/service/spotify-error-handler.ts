import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { TokenService } from "./token.service";

@Injectable()
export class SpotifyErrorHandler implements ErrorHandler {

    constructor(private tokenService: TokenService) {
    }

    handleError(error: HttpErrorResponse) {
        console.log('HERE!', error);
        if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_in');
            this.tokenService.clearToken();
        }
        // do something with the exception
    }
}