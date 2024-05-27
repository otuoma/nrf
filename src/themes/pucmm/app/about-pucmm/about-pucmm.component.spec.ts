import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPucmmComponent } from './about-pucmm.component';

describe('AboutPucmmComponent', () => {
  let component: AboutPucmmComponent;
  let fixture: ComponentFixture<AboutPucmmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPucmmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPucmmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
