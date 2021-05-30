import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { HistoryService } from './service/history.service';
import { SpotifyAuthInterceptor } from './service/spotify-auth.interceptor';
import { TokenService } from './service/token.service';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpotifyAuthInterceptor,
            multi: true
        },
        TokenService,
        AuthService,
        AuthGuard,
        HistoryService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
