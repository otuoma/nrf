import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelfArchivingComponent } from './custom-self-archiving.component';

describe('CustomSelfArchivingComponent', () => {
  let component: CustomSelfArchivingComponent;
  let fixture: ComponentFixture<CustomSelfArchivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSelfArchivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelfArchivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
