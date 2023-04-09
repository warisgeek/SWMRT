import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LoaderService, LoaderState } from './shared/services/loader.service';
import { Subscription } from 'rxjs';
import { AppSettingService } from './shared/services/app.setting.service';
import { AppSettingModel } from './shared/models/setting.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  subscription: Subscription;
  show = false;
  setting: AppSettingModel;
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private appSettingService: AppSettingService) {
    if (window.location.href.indexOf('gcsa') > -1) {
      this.setting = this.appSettingService.getAppSetting();
      if (this.setting === null) {
        this.setting = { title: 'SWMRT Applications', appName: '', url: '/' };
      }
    } else {
      this.setting = { title: 'SWMRT Applications', appName: '', url: '/' };
    }

  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.authService.user.subscribe(data => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isAuthenticated = user !== null;
    });
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        setTimeout(() => {
          this.show = state.show;
        });
      });
    this.appSettingService.appSubjectState.subscribe(data => {
      this.setting = data;
    });
  }
  logout() {
    this.authService.logout();
    localStorage.clear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
