import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadCreateDialogComponent } from './oportunidad-create-dialog.component';

describe('OportunidadCreateDialogComponent', () => {
  let component: OportunidadCreateDialogComponent;
  let fixture: ComponentFixture<OportunidadCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
