import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { TdLoadingService } from '@covalent/core';
import { AuthStore } from '../../stores';
import { HttpErrorService } from '../../services';
import { SgNotificationService } from '../../components';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthFirebaseServiceProvider } from '../../services/firebase/auth-firebase-service-provider';
import { FirebaseCallbackModel } from '../../models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../main/main.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

    appTitle: string = environment.appTitle;
    email: string;
    password: string;

    constructor(
        private _router: Router,
        private _titleService: Title,
        private _loadingService: TdLoadingService,
        private _notificationService: SgNotificationService,
        private _authStore: AuthStore,
        private _sgNotificationService: SgNotificationService,
        private _httpErrorService: HttpErrorService,
        private afAuth: AngularFireAuth,
        private authFirebaseService: AuthFirebaseServiceProvider) {
        this.authFirebaseService.logout((e) => this.logoutCallback(e));
    }

    logoutCallback(sqliteCallbackModel: FirebaseCallbackModel) {
        if (sqliteCallbackModel.success) {
            this._notificationService.displayMessage('Logged out successfully');
            return;
        }
        this._notificationService.displayMessage('Logged in unsuccessfully');
    }
    login(): void {
        // un: jacobusjonker@gmail.com
        // pw: Passw0rd!
        this.authFirebaseService.loginWithEmailPassword(this.email, this.password, (e) => this.loginWithEmailPasswordCallback(e));
    }

    loginWithEmailPasswordCallback(sqliteCallbackModel: FirebaseCallbackModel) {
        if (sqliteCallbackModel.success) {
            this._notificationService.displayMessage('Logged in successfully');
            localStorage.setItem('shareToken', sqliteCallbackModel.data.uid);
            this._router.navigate(['/']);
        } else {
            this._notificationService.displayMessage(sqliteCallbackModel.data.message);
        }
    }

    forgotPassword() {
        this._router.navigate(['/forgot-password']);
    }

    ngOnInit(): void {
        this._titleService.setTitle(this.appTitle + ' | ' + 'Login');
    }
}
