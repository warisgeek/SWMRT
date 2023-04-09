import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { SurveyModel } from '../models/survey.model';

@Injectable({
    providedIn: 'root'
})
export class FireBaseService {

    private dbPath = '/addresslist';
    cacheData = [];
    addressListRef: AngularFireList<SurveyModel> = null;

    constructor(private db: AngularFireDatabase) {
        this.addressListRef = db.list(this.dbPath);
    }

    add(addressList: SurveyModel): Promise<SurveyModel> {
        return new Promise((resolve, reject) => {
            this.addressListRef.push(addressList).then(() => {
                resolve(addressList);
            }).catch(error => {
                reject(error);
            });
        });

    }

    update(key: string, value: any): Promise<SurveyModel> {
        return new Promise((resolve, reject) => {
            this.addressListRef.update(key, value).then(() => {
                resolve(value);
            }).catch(error => {
                reject(error);
            });
        });

    }

    delete(key: string): Promise<void> {
        return this.addressListRef.remove(key);
    }

    getAll(): AngularFireList<SurveyModel> {
        return this.addressListRef;
    }

    deleteAll(): Promise<void> {
        return this.addressListRef.remove();
    }
    getById(id: string) {
        return this.db.object<SurveyModel>(this.dbPath + '/' + id).valueChanges();
    }
    filter(columnName, data): AngularFireList<SurveyModel> {
        return this.db.list(this.dbPath, ref => ref.orderByChild(columnName).equalTo(data));
    }
}
