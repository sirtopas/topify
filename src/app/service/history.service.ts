import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class HistoryService {

    public history: string = "";

    constructor(private http: HttpClient) { }

    public getHistory(): Observable<any> {
        return this.http.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term');
    }
}