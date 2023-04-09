import { Injectable } from '@angular/core';
import { FireBaseService } from '../shared/services/firebase.service';
import { map } from 'rxjs/operators';
import { SurveyModel } from '../shared/models/survey.model';
import { promise } from 'protractor';

@Injectable()
export class BulkUploadService {
    /**
     *
     */
    constructor(
        private fb: FireBaseService
    ) {
    }

    save(key, data) {
        if (data.name !== '' && data.name !== undefined) {
            if (key !== '' && key !== undefined) {
                return this.fb.update(key, data);
            } else {
                return this.fb.add(data);
            }
        } else {
            return new Promise((resolve, reject) => {
                resolve('empty');
            });
        }
    }
    exists(element) {
        return this.fb.filter('email', element.Email).query.once('value').then(x => {
            const data = [];
            x.forEach(d => {
                data.push({ key: d.key, ...d.val() });
            });
            return data;
        });
    }

    addObject(elemnt) {
        let DoYouCompostAns = elemnt.DoYouCompostAnsNo;
        if (DoYouCompostAns === undefined || DoYouCompostAns === '') {
            DoYouCompostAns = elemnt.DoYouCompostAnsYes === undefined ? '' : elemnt.DoYouCompostAnsYes;
        }
        if (DoYouCompostAns !== undefined && DoYouCompostAns !== '') {
            DoYouCompostAns = DoYouCompostAns.split(',').map((x) => {
                return { text: x.trim() };

            });
        }
        const data: SurveyModel = {
            street: elemnt.Street === undefined ? '' : elemnt.Street,
            pincode: elemnt.Pincode === undefined ? '' : elemnt.Pincode,
            area: elemnt.Area === undefined ? '' : elemnt.Area,
            houseno: elemnt.HouseNo === undefined ? '' : elemnt.HouseNo,
            apartment: elemnt.Apartment === undefined ? '' : elemnt.Apartment,
            name: elemnt.Name === undefined ? '' : elemnt.Name,
            country: elemnt.Country === undefined ? 'IN' : elemnt.Country,
            city: elemnt.City === undefined ? 'Bengaluru' : elemnt.City,
            doyoucompost: elemnt.DoYouCompost === undefined ? '' : elemnt.DoYouCompost,
            doyoucompostAns: DoYouCompostAns,
            apartmentcommunitylanehouseholdunit: elemnt.ApartmentCommunityLaneHouseHoldUnit === undefined ? '' : elemnt.ApartmentCommunityLaneHouseHoldUnit,
            ifathomeans: elemnt.IfAtHomeAns === undefined ? '' : elemnt.IfAtHomeAns,
            howlongcomposting: elemnt.HowLongComposting === undefined ? '' : elemnt.HowLongComposting,
            whatcomposterdoyouuse: elemnt.WhatComposterDoYouUse === undefined ? '' : elemnt.WhatComposterDoYouUse,
            doyoudowithyourcompost: elemnt.DoYouDoWithYourCompost === undefined ? '' : elemnt.DoYouDoWithYourCompost,
            doyouhaveexcesscompost: elemnt.DoYouHaveExcessCompost === undefined ? '' : elemnt.DoYouHaveExcessCompost,
            willingsignupswachagraha: elemnt.WillingSignupSwachagraha === undefined ? '' : elemnt.WillingSignupSwachagraha,
            doyouexclusivelycompostleavesflowers: elemnt.DoyouExclusivelyCompostLeavesFlowers === undefined ? '' : elemnt.DoyouExclusivelyCompostLeavesFlowers,
            leavesflowerscompostertype: elemnt.LeaveFlowerComposterType === undefined ? '' : elemnt.LeaveFlowerComposterType,
            stayconnectedwhatsapp: elemnt.StayConnectedWhatsapp === undefined ? '' : elemnt.StayConnectedWhatsapp,
            contactno: elemnt.ContactNo === undefined ? '' : elemnt.ContactNo,
            wardnumber: elemnt.WardNumber === undefined ? '' : elemnt.WardNumber,
            wardname: elemnt.WardName === undefined ? '' : elemnt.WardName,
            constituencyname: elemnt.ConstituencyName === undefined ? '' : elemnt.ConstituencyName,
            constituencynumber: elemnt.ConstituencyNumber === undefined ? '' : elemnt.ConstituencyNumber,
            customertype: elemnt.CustomerType === undefined ? '' : elemnt.CustomerType,
            email: elemnt.Email === undefined ? '' : elemnt.Email,
            formatted_address: elemnt.formatted_address,
            lang: elemnt.lang,
            lat: elemnt.lat,
            source: elemnt.Source === undefined ? '' : elemnt.Source,
            timestamp: elemnt.Timestamp === undefined ? '' : elemnt.Timestamp,
            state: elemnt.State === undefined ? '' : elemnt.State,
        };

        return data;
    }
    getByKey(key) {
        return this.fb.getById(key);
    }
    updateObject(elemnt) {
        let DoYouCompostAns = elemnt.DoYouCompostAnsNo;
        if (DoYouCompostAns === undefined || DoYouCompostAns === '') {
            DoYouCompostAns = elemnt.DoYouCompostAnsYes === undefined ? '' : elemnt.DoYouCompostAnsYes;
        }
        if (DoYouCompostAns !== undefined && DoYouCompostAns !== '') {
            DoYouCompostAns = DoYouCompostAns.split(',').map((x) => {
                return { text: x.trim() };

            });
        }
        const data = {
            street: elemnt.Street === undefined ? '' : elemnt.Street,
            pincode: elemnt.Pincode === undefined ? '' : elemnt.Pincode,
            area: elemnt.Area === undefined ? '' : elemnt.Area,
            houseno: elemnt.HouseNo === undefined ? '' : elemnt.HouseNo,
            apartment: elemnt.Apartment === undefined ? '' : elemnt.Apartment,
            name: elemnt.Name === undefined ? '' : elemnt.Name,
            country: elemnt.Country === undefined ? 'IN' : elemnt.Country,
            city: elemnt.City === undefined ? 'Bengaluru' : elemnt.City,
            doyoucompost: elemnt.DoYouCompost === undefined ? '' : elemnt.DoYouCompost,
            doyoucompostAns: DoYouCompostAns,
            apartmentcommunitylanehouseholdunit: elemnt.ApartmentCommunityLaneHouseHoldUnit === undefined ? '' : elemnt.ApartmentCommunityLaneHouseHoldUnit,
            ifathomeans: elemnt.IfAtHomeAns === undefined ? '' : elemnt.IfAtHomeAns,
            howlongcomposting: elemnt.HowLongComposting === undefined ? '' : elemnt.HowLongComposting,
            whatcomposterdoyouuse: elemnt.WhatComposterDoYouUse === undefined ? '' : elemnt.WhatComposterDoYouUse,
            doyoudowithyourcompost: elemnt.DoYouDoWithYourCompost === undefined ? '' : elemnt.DoYouDoWithYourCompost,
            doyouhaveexcesscompost: elemnt.DoYouHaveExcessCompost === undefined ? '' : elemnt.DoYouHaveExcessCompost,
            willingsignupswachagraha: elemnt.WillingSignupSwachagraha === undefined ? '' : elemnt.WillingSignupSwachagraha,
            doyouexclusivelycompostleavesflowers: elemnt.DoyouExclusivelyCompostLeavesFlowers === undefined ? '' : elemnt.DoyouExclusivelyCompostLeavesFlowers,
            leavesflowerscompostertype: elemnt.LeaveFlowerComposterType === undefined ? '' : elemnt.LeaveFlowerComposterType,
            stayconnectedwhatsapp: elemnt.StayConnectedWhatsapp === undefined ? '' : elemnt.StayConnectedWhatsapp,
            contactno: elemnt.ContactNo === undefined ? '' : elemnt.ContactNo,
            wardnumber: elemnt.WardNumber === undefined ? '' : elemnt.WardNumber,
            wardname: elemnt.WardName === undefined ? '' : elemnt.WardName,
            constituencyname: elemnt.ConstituencyName === undefined ? '' : elemnt.ConstituencyName,
            constituencynumber: elemnt.ConstituencyNumber === undefined ? '' : elemnt.ConstituencyNumber
        };
        return data;
    }
}
