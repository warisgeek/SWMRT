import { Injectable } from '@angular/core';
import { FireBaseService } from '../shared/services/firebase.service';
import { FormControl } from '@angular/forms';
import { SurveyModel } from '../shared/models/survey.model';
import * as moment from 'moment';
@Injectable()
export class AddSurveyService {
    geocoder;
    doyoucompostIfYes = [{ selected: false, text: 'At home' }, { selected: false, text: 'In my apartment/villa/layout community' }, { selected: false, text: 'In my lane' }, { selected: false, text: 'In my office/ school /temple /organization' }];
    doyoucompostIfNo = [{ selected: false, text: 'Not aware of how to do it' }, { selected: false, text: 'No space' }, { selected: false, text: 'No time' }, { selected: false, text: 'I tried but discontinued' }, { selected: false, text: 'Other:' }];
    constructor(private fb: FireBaseService) {
        this.geocoder = new google.maps.Geocoder();
    }
    getById(key): Promise<SurveyModel> {
        return new Promise((resolve) => {
            return this.fb.getById(key).subscribe(data => {
                console.log(data);
                if (key === '') {
                    data.timestamp = this.getDateTime();
                }
                resolve(data);
            });
        });

    }
    update(key, data) {
        return this.fb.update(key, data);
    }
    save(key, data): Promise<SurveyModel> {
        if (data.doyoucompost === 'Yes') {
            data.doyoucompostAns = this.doyoucompostIfYes.filter(x => x.selected === true).map(x => {
                return {
                    text: x.text
                };
            });
        } else {
            data.doyoucompostAns = this.doyoucompostIfNo.filter(x => x.selected === true).map(x => {
                return {
                    text: x.text
                };
            });
        }
        return this.getGoogleLat(data).then((result: any) => {
            if (key !== '' && key !== undefined) {
                return this.update(key, result);
            } else {
                return this.fb.add(result);
            }

        });

    }
    getGoogleLat(element) {
        return new Promise((resolve) => {
            const address = element.houseno + ',' + element.apartment + ',' + element.street;
            return this.geocoder.geocode({ address, componentRestrictions: { country: element.country === undefined ? 'IN' : element.country, postalCode: element.pincode.toString(), locality: element.area } }, (results, status) => {
                if (status === 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lang = results[0].geometry.location.lng();
                    element.lat = lat;
                    element.lang = lang;
                    element.formatted_address = results[0].formatted_address;
                    resolve(element);
                }

                else {
                    if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {

                    }
                    else {
                        const reason = 'Code ' + status;
                        resolve(element);
                    }
                }
            });
        });
    }

    buildDoyoucompostAns(value, selcetedItem: any, isReadOnly) {
        if (value === 'Yes') {
            const arr = this.doyoucompostIfYes.map(item => {
                if (selcetedItem !== undefined && selcetedItem !== '' && selcetedItem.length > 0) {
                    item.selected = selcetedItem.findIndex(x => x.text === item.text) >= 0 ? true : false;
                }
                return new FormControl({ value: item.selected, disabled: isReadOnly });
            });
            return arr;
        }
        else {
            const arr = this.doyoucompostIfNo.map(item => {
                return new FormControl({ value: item.selected, disabled: isReadOnly });
            });
            return arr;
        }
    }

    getDateTime() {
        return moment().format('MM-DD-YYYY HH:mm:ss');
    }
    getCache() {
        return this.fb.cacheData;
    }
}
