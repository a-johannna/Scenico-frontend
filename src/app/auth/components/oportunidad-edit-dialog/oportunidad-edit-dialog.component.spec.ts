import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadEditDialogComponent } from './oportunidad-edit-dialog.component';

describe('OportunidadEditDialogComponent', () => {
  let component: OportunidadEditDialogComponent;
  let fixture: ComponentFixture<OportunidadEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
