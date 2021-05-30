import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { SpotifyAuthResponse } from "../shared/spotify-auth-response";

@Injectable()
export class TokenService {

    public token: string = "";
    private token$ = new BehaviorSubject(this.token);

    public get oAuthToken(): string {
        return this.token;
    }

    public clearToken(): void {
        this.token = "";
        this.token$.next(this.token);
    }

    public get authHeader(): { [name: string]: string } {
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    public get authTokens(): Observable<string> {
        return this.token$.asObservable();
    }

    public setAuthToken(spotifyResponse: SpotifyAuthResponse): boolean {
        alert(spotifyResponse.access_token)
        if (spotifyResponse.access_token) {
            this.token = spotifyResponse.access_token;
            console.log('the token has been fuckjing set: ', this.token);

        } else {
            this.token = "";
        }
        this.token$.next(this.token);

        return !!this.token
    }

}