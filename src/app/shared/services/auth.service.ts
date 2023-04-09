import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
@Injectable({ providedIn: 'root' })
export class AuthService {
    user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
        this.user = firebaseAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    localStorage.setItem(Constants.StorageKey.User, JSON.stringify(this.userDetails));
                    console.log(this.userDetails);
                }
                else {
                    this.userDetails = null;
                    localStorage.setItem(Constants.StorageKey.User, null);
                }
            }
        );
    }
    signInWithTwitter() {
        return this.firebaseAuth.signInWithPopup(
            new firebase.auth.TwitterAuthProvider()
        );
    }
    signInWithFaceBook() {
        return this.firebaseAuth.signInWithPopup(
            new firebase.auth.FacebookAuthProvider()
        );
    }
    signInWithGoogle() {
        return this.firebaseAuth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
    }
    signInWithEmailPassword(username, password) {
        return this.firebaseAuth.signInWithEmailAndPassword(username, password);
    }
    signInWithAzureAD() {
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            // Optional "tenant" parameter in case you are using an Azure AD tenant.
            // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
            // or "common" for tenant-independent tokens.
            // The default value is "common".
            tenant: '3ed73d73-f1de-4829-9200-21be7d37ee85'
        });
        return this.firebaseAuth.signInWithPopup(provider);
    }
    isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }
    logout() {
        localStorage.removeItem('user');
        this.firebaseAuth.signOut()
            .then((res) => this.router.navigate(['auth/login']));
    }
}
