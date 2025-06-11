import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarOportunidadesComponent } from './explorar-oportunidades.component';

describe('ExplorarOportunidadesComponent', () => {
  let component: ExplorarOportunidadesComponent;
  let fixture: ComponentFixture<ExplorarOportunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarOportunidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
