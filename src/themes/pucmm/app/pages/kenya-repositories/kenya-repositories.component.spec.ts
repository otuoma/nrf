import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KenyaRepositoriesComponent } from './kenya-repositories.component';

describe('KenyaRepositoriesComponent', () => {
  let component: KenyaRepositoriesComponent;
  let fixture: ComponentFixture<KenyaRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KenyaRepositoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KenyaRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
