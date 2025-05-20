import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSettingsDialogComponent } from './advanced-settings-dialog.component';

describe('AdvancedSettingsDialogComponent', () => {
  let component: AdvancedSettingsDialogComponent;
  let fixture: ComponentFixture<AdvancedSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
