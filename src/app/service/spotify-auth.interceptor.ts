import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { TokenService } from './token.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({ setHeaders: this.tokenService.authHeader });
        return next.handle(authReq);
    }
}
