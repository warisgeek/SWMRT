import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMapComponent } from './geo-map.component';

describe('GeoMapComponent', () => {
  let component: GeoMapComponent;
  let fixture: ComponentFixture<GeoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
