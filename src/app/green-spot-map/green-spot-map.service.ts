import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { promise } from 'protractor';

@Injectable()
export class GreenSpotMapService {

  constructor(private db: AngularFireDatabase) { }

  getSwmrtMap() {
    return this.db.object('addresslist').valueChanges();
}
}
