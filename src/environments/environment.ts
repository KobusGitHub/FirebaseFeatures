import { IThemeModel } from '../models';

export const environment: { production: boolean, appTitle: string, webApiBaseAddress: string, themes: IThemeModel[], firebase: any } = {
    production: false,
    appTitle: 'FirebaseFeatures',
    webApiBaseAddress: 'http://localhost:5000/api/',
    themes: [
        {
            name: 'Light',
            className: 'light-theme'
        },
        {
            name: 'Dark',
            className: 'dark-theme'
        },
        {
            name: 'Other',
            className: 'other-theme'
        }
    ],
    firebase: {
        apiKey: 'AIzaSyB8vwNoMvMk2fGZ3IIEC900Gyu4QOzWWdA',
        authDomain: 'kobusfirebasefeatures.firebaseapp.com',
        databaseURL: 'https://kobusfirebasefeatures.firebaseio.com',
        projectId: 'kobusfirebasefeatures',
        storageBucket: 'kobusfirebasefeatures.appspot.com',
        messagingSenderId: '491000310137'
    }
};
