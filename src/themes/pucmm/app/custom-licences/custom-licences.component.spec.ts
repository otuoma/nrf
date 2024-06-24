import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLicencesComponent } from './custom-licences.component';

describe('CustomLicencesComponent', () => {
  let component: CustomLicencesComponent;
  let fixture: ComponentFixture<CustomLicencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLicencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLicencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
