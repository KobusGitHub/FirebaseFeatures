import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RouteGuard } from '../guards/route.guard';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { DynamicDashboardsContainerComponent, DynamicWidgetDetailComponent } from '@sgits/dynamic-dashboards';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SendEmailComponent } from './send-email/send-email.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { roles: [], url: '/login', title: 'Login', icon: 'exit_to_app', show: false, seq: 0 }
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [RouteGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/', title: 'Home', icon: 'home', show: true, seq: 1 }
            },
            // {
            //     path: '',
            //     component: DynamicDashboardsContainerComponent,
            //     canActivate: [RouteGuard],
            //     data: { roles: [], url: '/', title: 'Dashboards', icon: 'widgets', show: true, seq: 1 }
            // },
            // {
            //     path: 'widget-detail',
            //     component: DynamicWidgetDetailComponent,
            //     canActivate: [RouteGuard],
            //     data: { roles: [], url: '', title: 'Widget Detail', icon: '', show: false, seq: 0 }
            // },
            {
                path: 'file-upload',
                component: FileUploadComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/file-upload', title: 'file-upload', icon: 'person', show: true, seq: 3 }
            },
            {
                path: 'send-email',
                component: SendEmailComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/send-email', title: 'send-email', icon: 'person', show: true, seq: 3 }
            },
            {
                path: 'persons',
                component: PersonsComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/persons', title: 'Persons', icon: 'person', show: true, seq: 3 }
            },
            {
                path: 'persons/:id',
                component: PersonComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '', title: 'Person', icon: 'person', show: false, seq: 0 }
            },

            {
                path: 'users',
                component: UsersComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/users', title: 'Users', icon: 'person', show: true, seq: 3 }
            },
            {
                path: 'users/:id',
                component: UserComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '', title: 'User', icon: 'person', show: false, seq: 0 }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [RouteGuard],
                data: { roles: [], url: '/profile', title: 'Profile', icon: 'account_circle', show: false, seq: 0 }
            }
        ]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { roles: [], url: '/forgot-password', title: 'Forgot Password', icon: 'lock_outline', show: false, seq: 0 }
    },
    {
        path: 'reset-password/:userId/:token',
        component: ResetPasswordComponent,
        data: { roles: [], url: '/reset-password', title: 'Forgot Password', icon: 'lock_outline', show: false, seq: 0 }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

export const routedComponents: any[] = [
    MainComponent,
    LoginComponent,
    UserComponent,
    UsersComponent,
    ProfileComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
];
