import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarPortafoliosComponent } from './explorar-portafolios.component';

describe('ExplorarPortafoliosComponent', () => {
  let component: ExplorarPortafoliosComponent;
  let fixture: ComponentFixture<ExplorarPortafoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarPortafoliosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarPortafoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
