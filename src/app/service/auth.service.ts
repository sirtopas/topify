import { Injectable } from '@angular/core';

import { AuthConfig } from '../shared/spotify-auth-config.i';
import { ScopesBuilder } from '../shared/scopes-builder';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    private requestAuthUrl = 'https://accounts.spotify.com/authorize'; //todo move to environment
    private authorized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private authConfig: AuthConfig = {
        client_id: "a5ea6bcd8d39473ea31a9b70831d700c",  // move to config
        response_type: "token",
        redirect_uri: environment.redirect_uri,
        state: "",
        show_dialog: true,
        scope: new ScopesBuilder().withScopes(ScopesBuilder.HISTORY).build()
    };

    public authorize() {
        window.location.href = this.buildAuthUrl();
    }

    public authorized(): void {
        this.authorized$.next(true);
    }

    public get authorizedStream(): Observable<boolean> {
        return this.authorized$.asObservable();
    }

    private buildAuthUrl(): string {
        let params = [];
        for (const [key, value] of Object.entries(this.authConfig)) {
            if (typeof (value) == 'object') {
                params.push(`${key}=${(value as string[]).join(" ")}`);
            } else {
                params.push(`${key}=${value}`);
            }
        }

        return `${this.requestAuthUrl}?${params.join('&')}`;
    }
}
