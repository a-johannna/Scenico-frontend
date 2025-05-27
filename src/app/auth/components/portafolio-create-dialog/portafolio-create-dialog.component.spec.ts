import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioCreateDialogComponent } from './portafolio-create-dialog.component';

describe('PortafolioCreateDialogComponent', () => {
  let component: PortafolioCreateDialogComponent;
  let fixture: ComponentFixture<PortafolioCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortafolioCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortafolioCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
