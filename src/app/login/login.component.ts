import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';
import { Constants } from '../shared/util/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loader: LoaderService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/landing';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (await this.authService.isLoggedIn()) {
      await this.router.navigate([this.returnUrl]);
    }
  }
  onReset() {
    this.form.reset();
  }
  onSignInWithGoogle() {
    this.authService.signInWithGoogle().then((res) => {
      this.router.navigate(['landing']);
    })
      .catch((err) => console.log(err));
  }
  onSignInWithTwitter() {
    this.authService.signInWithTwitter().then((res) => {
      this.router.navigate(['landing']);
    })
      .catch((err) => console.log(err));
  }
  onSignInWithAzureAD() {
    this.authService.signInWithAzureAD().then((res) => {
      this.router.navigate(['landing']);
    })
      .catch((err) => console.log(err));
  }
  onSignInWithFaceBook() {
    this.authService.signInWithFaceBook().then((res) => {
      this.router.navigate(['landing']);
    })
      .catch((err) => console.log(err));
  }
  onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      this.loader.show();
      try {
        this.authService.signInWithEmailPassword(this.form.controls.username.value, this.form.controls.password.value).then((res) => {
          this.loader.hide();
          localStorage.setItem(Constants.StorageKey.User, JSON.stringify(res.user));
          this.router.navigate(['landing']);
        })
          .catch((err) => {
            this.loginInvalid = true;
            this.loader.hide();
            console.log(err);
          });
      } catch (err) {
        this.loader.hide();
        this.loginInvalid = true;
      }
    } else {
    }
  }
}
