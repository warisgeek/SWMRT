import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSettingModel } from '../models/setting.model';
import { Constants } from '../util/constants';
@Injectable({
    providedIn: 'root'
})
export class AppSettingService {
    private appSubject = new Subject<AppSettingModel>();
    appSubjectState = this.appSubject.asObservable();
    constructor() { }
    setAppSetting(data: AppSettingModel) {
        const json = JSON.stringify(data);
        localStorage.setItem(Constants.StorageKey.Setting, json);
        this.appSubject.next(data as AppSettingModel);
    }
    getAppSetting(): AppSettingModel {
        const json = localStorage.getItem(Constants.StorageKey.Setting);
        return JSON.parse(json);
    }
}
