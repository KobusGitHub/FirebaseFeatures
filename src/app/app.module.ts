import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Type } from '@angular/core';
import 'hammerjs';
import { CommonModule } from '@angular/common';
import { CovalentHttpModule } from '@covalent/http';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './app.interceptor';
import { routedComponents, AppRoutingModule } from './app.routing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule, CustomModule } from '../modules';
import { RouteGuard } from '../guards/route.guard';
import { AuthService, HttpErrorService, RolesService, UsersService } from '../services';
import { AppStore, AuthStore, UsersStore } from '../stores';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { DynamicDashboardsModule } from '@sgits/dynamic-dashboards';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent, UserDetailComponent, UserRolesComponent } from './users';

import { MatDialogModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';
import { PersonFirebaseServiceProvider } from '../services/firebase/person-firebase-service-provider';

const httpInterceptorProviders: Type<any>[] = [RequestInterceptor];

@NgModule({
    declarations: [AppComponent, routedComponents, HomeComponent, CreateUserComponent, UserDetailComponent, UserRolesComponent,
        PersonsComponent, PersonComponent],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        // AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        // DynamicDashboardsModule.forRoot(environment.webApiBaseAddress),
        CommonModule,
        InfiniteScrollModule,
        CustomModule,
        CovalentHttpModule.forRoot({
            interceptors: [
                {
                    interceptor: RequestInterceptor,
                    paths: ['**']
                }
            ]
        }),
        MatDialogModule
    ],
    providers: [
        httpInterceptorProviders,
        Title,
        RouteGuard,
        AuthService,
        HttpErrorService,
        AppStore,
        AuthStore,
        RolesService,
        UsersService,
        UsersStore,
        PersonFirebaseServiceProvider
    ],
    exports: [],
    bootstrap: [AppComponent],
    entryComponents: [CreateUserComponent]
})
export class AppModule { }
