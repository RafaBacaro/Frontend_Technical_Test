import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { EmergencyDialogComponent } from './emergency-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EmergencyDialogComponent', () => {
  let component: EmergencyDialogComponent;
  let fixture: ComponentFixture<EmergencyDialogComponent>;
  let data = {
    temperature: 10,
    humidity:  80
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyDialogComponent ],
      imports: [
        HttpClientTestingModule, 
        MatDialogModule,
        AppModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check dialog was opened', () => {
    component.dialog.open(EmergencyDialogComponent, {
      data: {
        cityName: 'Example City',
        temperature: 26,
        humidity: 80
      }
    });
    fixture.detectChanges();
    const title: DebugElement = fixture.debugElement.query(
      By.css('h2')
    );
    const el: Element = title.nativeElement;
    expect(el.textContent).toEqual('Emergency Alert');
  });
});
