import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { SpotifyAuthResponse } from "../shared/spotify-auth-response";

@Injectable()
export class TokenService {

    public token: string = '';
    private token$ = new BehaviorSubject(this.token);

    public get oAuthToken(): string {
        return this.token;
    }

    public clearToken(): void {
        this.token = "";
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        this.token$.next(this.token);
    }

    public get authHeader(): { [name: string]: string } {
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    public get authTokens(): Observable<string> {
        this.token = localStorage.getItem('access_token') ?? '';
        this.token$.next(this.token);
        return this.token$.asObservable();
    }

    public setAuthToken(spotifyResponse: SpotifyAuthResponse): boolean {
        if (spotifyResponse.access_token) {
            this.token = spotifyResponse.access_token;
        } else {
            this.token = "";
        }
        this.token$.next(this.token);

        return !!this.token
    }

}