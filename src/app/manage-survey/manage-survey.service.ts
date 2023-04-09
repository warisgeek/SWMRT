import { AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FireBaseService } from '../shared/services/firebase.service';
import { SurveyModel } from '../shared/models/survey.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Constants } from '../shared/util/constants';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ManageSurveyService {
    excel;
    constructor(private fb: FireBaseService) {
    }
    getAllSurvey(): AngularFireList<SurveyModel> {
        return this.fb.getAll();
    }
    remove(key) {
        return this.fb.delete(key);
    }
    downloadExcel(surveyData) {
        this.exportAsExcelFile(surveyData, 'sample_data');
    }
    setCache(cacheData) {
        this.fb.cacheData = cacheData;
    }
    exportAsExcelFile(json: any[], excelFileName: string): void {
        /* force the order columns */
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
            header: ['timestamp',
                'name', 'email', 'houseno', 'apartment', 'street', 'pincode', 'area', 'doyoucompost',
                'apartmentcommunitylanehouseholdunit', 'ifathomeans', 'howlongcomposting', 'whatcomposterdoyouuse',
                'doyoudowithyourcompost', 'doyouhaveexcesscompost', 'willingsignupswachagraha',
                'doyouexclusivelycompostleavesflowers', 'leavesflowerscompostertype', 'stayconnectedwhatsapp',
                'contactno', 'wardnumber', 'wardname', 'constituencynumber', 'constituencyname', 'city', 'state',
                'country', 'lat', 'lang'
            ]
        });
        worksheet['!cols'] = [];
        /* Rename Columns */
        delete worksheet.A1.w; worksheet.A1.v = 'Timestamp'; delete worksheet.B1.w; worksheet.B1.v = 'Name';
        delete worksheet.C1.w; worksheet.C1.v = 'Email'; delete worksheet.D1.w; worksheet.D1.v = 'HouseNo';
        delete worksheet.E1.w; worksheet.E1.v = 'Apartment'; delete worksheet.F1.w; worksheet.F1.v = 'Street';
        delete worksheet.G1.w; worksheet.G1.v = 'Pincode'; delete worksheet.H1.w; worksheet.H1.v = 'Area';
        delete worksheet.I1.w; worksheet.I1.v = 'Do You Compost'; delete worksheet.J1.w; worksheet.J1.v = 'Apartment Community Lane HouseHold Unit';
        delete worksheet.K1.w; worksheet.K1.v = 'If At Home'; delete worksheet.L1.w; worksheet.L1.v = 'How Long Composting';
        delete worksheet.M1.w; worksheet.M1.v = 'What Composter Do You Use'; delete worksheet.N1.w; worksheet.N1.v = 'What do you do with your compost';
        delete worksheet.O1.w; worksheet.O1.v = 'Do you have excess compost'; delete worksheet.P1.w; worksheet.P1.v = 'Willing to signup swachagraha';
        delete worksheet.Q1.w; worksheet.Q1.v = 'Do you exclusively compost leaves flowers'; delete worksheet.R1.w; worksheet.R1.v = 'Leaves flowers composter type';
        delete worksheet.S1.w; worksheet.S1.v = 'Stay connected on whatsapp'; delete worksheet.T1.w; worksheet.T1.v = 'Contact No';
        delete worksheet.U1.w; worksheet.U1.v = 'Ward Number'; delete worksheet.V1.w; worksheet.V1.v = 'Ward Name';
        delete worksheet.W1.w; worksheet.W1.v = 'Constituency Number'; delete worksheet.X1.w; worksheet.X1.v = 'Constituency Name';
        delete worksheet.Y1.w; worksheet.Y1.v = 'City'; delete worksheet.Z1.w; worksheet.Z1.v = 'State';
        delete worksheet.Y1.w; worksheet.AA1.v = 'Country'; delete worksheet.AB1.w; worksheet.AB1.v = 'Latitude';
        delete worksheet.AA1.w; worksheet.AC1.v = 'Longitude';

        // const center  =  worksheet.add_format({wrapText: true});
        // worksheet.write_rich_string(center);

        // if (!worksheet['!cols']['AD']) { worksheet['!cols']['AD'] = {}; }
        // worksheet['!cols']['AD'].hidden = true;
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    rememberFilter(data) {
        localStorage.setItem(Constants.StorageKey.SurveyFilter, data);
    }
    getRememberFilter() {
        localStorage.getItem(Constants.StorageKey.SurveyFilter);
        let rememberFilter = JSON.parse(localStorage.getItem(Constants.StorageKey.SurveyFilter));
        if (rememberFilter == null) {
            rememberFilter = {};
        }
        if (rememberFilter == null || rememberFilter.name === undefined) {
            rememberFilter.name = '';
        }
        if (rememberFilter == null || rememberFilter.apartment === undefined) {
            rememberFilter.apartment = '';
        }
        if (rememberFilter == null || rememberFilter.street === undefined) {
            rememberFilter.street = '';
        }
        if (rememberFilter == null || rememberFilter.area === undefined) {
            rememberFilter.area = '';
        }
        if (rememberFilter == null || rememberFilter.wardnumber === undefined) {
            rememberFilter.wardnumber = '';
        }
        if (rememberFilter == null || rememberFilter.wardname === undefined) {
            rememberFilter.wardname = '';
        }
        if (rememberFilter == null || rememberFilter.constituencynumber === undefined) {
            rememberFilter.constituencynumber = '';
        }
        if (rememberFilter == null || rememberFilter.constituencyname === undefined) {
            rememberFilter.constituencyname = '';
        }
        if (rememberFilter == null || rememberFilter.city === undefined) {
            rememberFilter.city = '';
        }
        if (rememberFilter == null || rememberFilter.pincode === undefined) {
            rememberFilter.pincode = '';
        }
        if (rememberFilter == null || rememberFilter.customertype === undefined) {
            rememberFilter.customertype = '';
        }

        return rememberFilter;

    }
}
