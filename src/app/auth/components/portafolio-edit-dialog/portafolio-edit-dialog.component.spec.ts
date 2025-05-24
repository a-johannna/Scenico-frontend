import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioEditDialogComponent } from './portafolio-edit-dialog.component';

describe('PortafolioEditDialogComponent', () => {
  let component: PortafolioEditDialogComponent;
  let fixture: ComponentFixture<PortafolioEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortafolioEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortafolioEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
