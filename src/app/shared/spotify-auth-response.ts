export class SpotifyAuthResponse {
    access_token!: string;
    expires_in!: number;
    public state: string | undefined;
    public token_type: string | undefined;
}